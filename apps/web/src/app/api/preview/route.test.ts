import { beforeEach, describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => ({
  enable: vi.fn(),
  disable: vi.fn(),
}));

vi.mock("next/headers", () => ({
  draftMode: async () => ({
    isEnabled: false,
    enable: controls.enable,
    disable: controls.disable,
  }),
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

  it("valida a revisão privada antes de habilitar Draft Mode e grava sessão curta", async () => {
    const response = await GET(
      new Request(
        `https://nite.test/api/preview?token=${encodeURIComponent(token)}`,
      ),
    );

    expect(response.headers.get("location")).toBe(
      "https://nite.test/atualizacoes/materia-em-previa",
    );
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("set-cookie")).toContain("nite-news-preview=");
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("Secure");
    expect(controls.enable).toHaveBeenCalledTimes(1);
  });

  it("não habilita Draft Mode quando o Admin rejeita o token", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response(null, { status: 401 })),
    );

    const response = await GET(
      new Request(`https://nite.test/api/preview?token=${token}`),
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(controls.enable).not.toHaveBeenCalled();
  });
});
