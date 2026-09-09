import { beforeEach, describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => ({ enable: vi.fn() }));
vi.mock("next/headers", () => ({
  draftMode: async () => ({ enable: controls.enable }),
}));

import { GET } from "./route";

const now = Date.now();
const claims = {
  version: 1,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  expiresAt: now + 120_000,
  nonce: "1234567890123456789012",
};
const token = `v1.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
const article = {
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
const snapshotClaims = {
  version: 2,
  articleId: claims.articleId,
  snapshotId: "40000000-0000-4000-8000-000000000001",
  expiresAt: now + 120_000,
  nonce: claims.nonce,
};
const snapshotToken = `v2.${Buffer.from(JSON.stringify(snapshotClaims)).toString("base64url")}.signature`;
const { revisionId: _revisionId, ...articleFields } = article;
const snapshotArticle = {
  ...articleFields,
  schemaVersion: 2,
  snapshotId: snapshotClaims.snapshotId,
  baseRevisionId: claims.revisionId,
  slug: "slug-atual-nao-salvo",
};

describe("GET /api/preview", () => {
  beforeEach(() => {
    vi.stubEnv(
      "CMS_PREVIEW_RESOLVE_URL",
      "https://cms-admin.nite.test/api/preview/resolve",
    );
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(Response.json(article)),
    );
    controls.enable.mockReset();
  });

  it("valida a revisão, habilita Draft Mode e grava sessão curta", async () => {
    const response = await GET(
      new Request(
        `https://nite.test/api/preview?token=${encodeURIComponent(token)}`,
      ),
    );
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://nite.test/atualizacoes",
    );
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("set-cookie")).toContain("nite-news-preview=");
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("Secure");
    expect(response.headers.get("set-cookie")).toContain("SameSite=lax");
    expect(controls.enable).toHaveBeenCalledTimes(1);
  });

  it("redireciona o token v2 para a listagem mantendo a sessão do snapshot", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(Response.json(snapshotArticle)),
    );

    const response = await GET(
      new Request(
        `https://nite.test/api/preview?token=${encodeURIComponent(snapshotToken)}`,
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://nite.test/atualizacoes",
    );
    expect(response.headers.get("set-cookie")).toContain("nite-news-preview=");
  });

  it("registra causa, status upstream e código sem expor token ou conteúdo", async () => {
    const logger = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          new Response("detalhe interno sensível", { status: 401 }),
        ),
    );

    const response = await GET(
      new Request(
        `https://nite.test/api/preview?token=${encodeURIComponent(snapshotToken)}`,
      ),
    );

    expect(response.status).toBe(401);
    expect(await response.text()).toBe("Prévia indisponível.");
    expect(logger).toHaveBeenCalledWith(
      "preview_resolution_failed",
      expect.objectContaining({
        cause: "unauthorized",
        upstreamStatus: 401,
        supportCode: expect.stringMatching(/^[0-9a-f-]{36}$/),
      }),
    );
    const log = JSON.stringify(logger.mock.calls);
    expect(log).not.toContain(snapshotToken);
    expect(log).not.toContain("detalhe interno sensível");
    logger.mockRestore();
  });

  it.each(["", "token-invalido"])(
    "retorna 401 genérico para token ausente ou inválido",
    async (candidate) => {
      const response = await GET(
        new Request(`https://nite.test/api/preview?token=${candidate}`),
      );
      expect(response.status).toBe(401);
      expect(await response.text()).toBe("Prévia indisponível.");
      expect(response.headers.get("cache-control")).toBe("private, no-store");
      expect(response.headers.get("set-cookie")).toBeNull();
      expect(controls.enable).not.toHaveBeenCalled();
    },
  );
});
