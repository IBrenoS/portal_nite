import { describe, expect, it, vi } from "vitest";

import {
  createPreviewSession,
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
