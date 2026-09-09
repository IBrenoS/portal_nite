import { describe, expect, it, vi } from "vitest";

import {
  createPreviewSession,
  mergePreviewIntoNewsListings,
  previewArticleToNewsArticle,
  readPreviewConfiguration,
  resolvePreviewArticle,
  type PreviewArticle,
} from "./news-preview";

const now = new Date("2026-08-29T12:00:00.000Z");
const claims = {
  version: 1,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  expiresAt: now.getTime() + 120_000,
  nonce: "1234567890123456789012",
};
const token = `v1.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
const snapshotClaims = {
  version: 2,
  articleId: claims.articleId,
  snapshotId: "40000000-0000-4000-8000-000000000001",
  expiresAt: claims.expiresAt,
  nonce: claims.nonce,
};
const snapshotToken = `v2.${Buffer.from(JSON.stringify(snapshotClaims)).toString("base64url")}.signature`;
const preview: PreviewArticle = {
  schemaVersion: 1,
  articleId: claims.articleId,
  revisionId: claims.revisionId,
  slug: "materia-em-previa",
  publishedAt: null,
  title: "Matéria em prévia com título editorial válido",
  summary:
    "Resumo editorial suficientemente descritivo para validar uma prévia privada no Portal NITE.",
  category: "inovacao",
  readTimeMinutes: 3,
  byline: "Redação NITE",
  featured: false,
  body: {
    schemaVersion: 1,
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Conteúdo privado da revisão." }],
      },
    ],
  },
};
const { revisionId: _revisionId, ...previewFields } = preview;
const snapshotPreview: PreviewArticle = {
  ...previewFields,
  schemaVersion: 2,
  snapshotId: snapshotClaims.snapshotId,
  baseRevisionId: claims.revisionId,
  slug: "slug-atual-ainda-nao-salvo",
  title: "Título atual ainda não salvo no histórico editorial",
};

describe("configuração de prévia", () => {
  it("aceita somente um endpoint HTTPS", () => {
    expect(
      readPreviewConfiguration({
        CMS_PREVIEW_RESOLVE_URL:
          "https://cms-admin.nite.test/api/preview/resolve",
      }),
    ).toMatchObject({ configured: true });
    expect(
      readPreviewConfiguration({ CMS_PREVIEW_RESOLVE_URL: "http://cms.test" }),
    ).toEqual({ configured: false });
    expect(readPreviewConfiguration({})).toEqual({ configured: false });
  });
});

describe("resolução da prévia editorial", () => {
  it("valida a resposta privada e usa política de rede restritiva", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(preview));
    const article = await resolvePreviewArticle({
      token,
      endpointUrl: "https://cms-admin.nite.test/api/preview/resolve",
      fetch: fetcher,
    });

    expect(article).toEqual(preview);
    expect(fetcher).toHaveBeenCalledWith(
      "https://cms-admin.nite.test/api/preview/resolve",
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        redirect: "error",
        signal: expect.any(AbortSignal),
        headers: expect.objectContaining({ authorization: `Bearer ${token}` }),
      }),
    );
  });

  it("aceita o DTO v2 que referencia explicitamente o snapshot", async () => {
    const richSnapshotPreview = {
      ...snapshotPreview,
      body: {
        schemaVersion: 2 as const,
        type: "doc" as const,
        content: [
          {
            type: "image" as const,
            attrs: {
              mediaId: "30000000-0000-4000-8000-000000000101",
              src: "https://media.nite.test/news/oficina.webp",
              width: 1600,
              height: 900,
              alt: "Pessoas participando de uma oficina",
              caption: "Oficina da comunidade.",
              credit: "Foto: NITE",
              layout: "wide" as const,
            },
          },
        ],
      },
    };
    await expect(
      resolvePreviewArticle({
        token: snapshotToken,
        endpointUrl: "https://cms-admin.nite.test/api/preview/resolve",
        fetch: vi
          .fn<typeof fetch>()
          .mockResolvedValue(Response.json(richSnapshotPreview)),
      }),
    ).resolves.toEqual(richSnapshotPreview);
  });

  it.each([
    new Response(null, { status: 401 }),
    new Response(null, { status: 503 }),
    new Response(null, {
      status: 302,
      headers: { location: "https://evil.test" },
    }),
  ])("normaliza respostas HTTP inválidas", async (response) => {
    await expect(
      resolvePreviewArticle({
        token,
        endpointUrl: "https://cms-admin.nite.test/api/preview/resolve",
        fetch: vi.fn<typeof fetch>().mockResolvedValue(response),
      }),
    ).rejects.toThrow("Prévia indisponível.");
  });

  it("normaliza timeout e JSON inválido sem vazar detalhes", async () => {
    const timeout = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("ETIMEDOUT internal"));
    await expect(
      resolvePreviewArticle({
        token,
        endpointUrl: "https://cms.test/resolve",
        fetch: timeout,
      }),
    ).rejects.toThrow("Prévia indisponível.");

    await expect(
      resolvePreviewArticle({
        token,
        endpointUrl: "https://cms.test/resolve",
        fetch: vi
          .fn<typeof fetch>()
          .mockResolvedValue(new Response("not-json")),
      }),
    ).rejects.toThrow("Prévia indisponível.");
  });
});

describe("sessão de prévia", () => {
  it("limita o TTL ao token e ao máximo de dez minutos", () => {
    expect(createPreviewSession({ token, article: preview, now })?.maxAge).toBe(
      120,
    );
    const longToken = `v1.${Buffer.from(
      JSON.stringify({ ...claims, expiresAt: now.getTime() + 3_600_000 }),
    ).toString("base64url")}.signature`;
    expect(
      createPreviewSession({ token: longToken, article: preview, now })?.maxAge,
    ).toBe(600);
  });

  it("cria uma sessão v2 vinculada ao snapshot e ao slug atual", () => {
    expect(
      createPreviewSession({
        token: snapshotToken,
        article: snapshotPreview,
        now,
      }),
    ).toMatchObject({
      articleId: snapshotClaims.articleId,
      snapshotId: snapshotClaims.snapshotId,
      slug: "slug-atual-ainda-nao-salvo",
      maxAge: 120,
    });
  });

  it("rejeita token v2 expirado ou vinculado a outro snapshot", () => {
    const expiredToken = `v2.${Buffer.from(
      JSON.stringify({ ...snapshotClaims, expiresAt: now.getTime() - 1 }),
    ).toString("base64url")}.signature`;
    expect(
      createPreviewSession({
        token: expiredToken,
        article: snapshotPreview,
        now,
      }),
    ).toBeUndefined();
    expect(
      createPreviewSession({
        token: snapshotToken,
        article: {
          ...snapshotPreview,
          snapshotId: "40000000-0000-4000-8000-000000000002",
        },
        now,
      }),
    ).toBeUndefined();
  });

  it("rejeita token ausente, adulterado, expirado ou de outra revisão", () => {
    expect(
      createPreviewSession({ token: "", article: preview, now }),
    ).toBeUndefined();
    expect(
      createPreviewSession({ token: `${token}.extra`, article: preview, now }),
    ).toBeUndefined();
    expect(
      createPreviewSession({
        token: `v1.${Buffer.from(JSON.stringify({ ...claims, expiresAt: now.getTime() - 1 })).toString("base64url")}.signature`,
        article: preview,
        now,
      }),
    ).toBeUndefined();
    expect(
      createPreviewSession({
        token,
        article: {
          ...preview,
          revisionId: "20000000-0000-4000-8000-000000000002",
        },
        now,
      }),
    ).toBeUndefined();
    expect(
      createPreviewSession({
        token,
        article: {
          ...preview,
          articleId: "10000000-0000-4000-8000-000000000002",
        },
        now,
      }),
    ).toBeUndefined();
  });
});

describe("conversão e mesclagem de prévia na listagem", () => {
  const publicArticle = {
    slug: "materia-publica-existente",
    title: "Título de matéria pública existente no portal",
    summary:
      "Resumo da matéria pública para testes de mesclagem e substituição de preview editorial.",
    category: "inovacao" as const,
    publishedAt: "2026-08-15",
    readTimeMinutes: 4,
    byline: "Equipe NITE",
    cover: {
      src: "https://media.nite.test/publica.webp",
      alt: "Capa da matéria pública existente",
    },
    featured: false,
    contentState: "real" as const,
    public: true as const,
    body: {
      schemaVersion: 1 as const,
      type: "doc" as const,
      content: [
        {
          type: "paragraph" as const,
          content: [{ type: "text" as const, text: "Conteúdo público." }],
        },
      ],
    },
  };

  it("converte PreviewArticle em NewsArticle com fallback de data e capa", () => {
    const converted = previewArticleToNewsArticle(preview);
    expect(converted.slug).toBe(preview.slug);
    expect(converted.title).toBe(preview.title);
    expect(converted.contentState).toBe("real");
    expect(converted.public).toBe(true);
    expect(converted.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(converted.cover.src).toBe(
      "/images/atualizacoes/laboratorio-tecnologia.webp",
    );

    const withCoverAndDate = previewArticleToNewsArticle({
      ...preview,
      publishedAt: "2026-09-01T10:00:00.000Z",
      cover: {
        src: "https://media.nite.test/capa.webp",
        width: 1200,
        height: 630,
        alt: "Capa do artigo em prévia editorial",
        caption: "Equipe reunida no laboratório de inovação.",
        credit: "Foto: Redação NITE",
      },
    });
    expect(withCoverAndDate.publishedAt).toBe("2026-09-01");
    expect(withCoverAndDate.cover).toEqual({
      src: "https://media.nite.test/capa.webp",
      alt: "Capa do artigo em prévia editorial",
      caption: "Equipe reunida no laboratório de inovação.",
      credit: "Foto: Redação NITE",
    });
  });

  it("retorna as coleções originais quando não há prévia ativa", () => {
    const result = mergePreviewIntoNewsListings({
      preview: undefined,
      articles: [publicArticle],
      agenda: [],
      featured: undefined,
    });
    expect(result.articles).toEqual([publicArticle]);
    expect(result.agenda).toEqual([]);
    expect(result.featured).toBeUndefined();
  });

  it("insere novo draft no início de articles sem publicar", () => {
    const result = mergePreviewIntoNewsListings({
      preview,
      articles: [publicArticle],
      agenda: [],
      featured: undefined,
    });
    expect(result.articles).toHaveLength(2);
    expect(result.articles[0]?.slug).toBe(preview.slug);
    expect(result.articles[1]?.slug).toBe(publicArticle.slug);
  });

  it("substitui matéria existente quando o slug coincide", () => {
    const updatedDraft: PreviewArticle = {
      ...preview,
      slug: publicArticle.slug,
      title: "Título atualizado da matéria pública em revisão",
    };
    const result = mergePreviewIntoNewsListings({
      preview: updatedDraft,
      articles: [publicArticle],
      agenda: [],
      featured: undefined,
    });
    expect(result.articles).toHaveLength(1);
    expect(result.articles[0]?.slug).toBe(publicArticle.slug);
    expect(result.articles[0]?.title).toBe(
      "Título atualizado da matéria pública em revisão",
    );
  });

  it("promove a destaque e inclui na agenda quando especificado", () => {
    const featuredAgendaDraft: PreviewArticle = {
      ...preview,
      featured: true,
      eventDate: "2026-09-20",
    };
    const result = mergePreviewIntoNewsListings({
      preview: featuredAgendaDraft,
      articles: [publicArticle],
      agenda: [],
      featured: publicArticle,
    });
    expect(result.featured?.slug).toBe(preview.slug);
    expect(result.agenda).toHaveLength(1);
    expect(result.agenda[0]?.slug).toBe(preview.slug);
  });
});
