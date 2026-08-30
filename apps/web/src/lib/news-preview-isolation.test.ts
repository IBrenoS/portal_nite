import { describe, expect, it, vi } from "vitest";

const token = `v1.${Buffer.from(
  JSON.stringify({
    version: 1,
    articleId: "10000000-0000-4000-8000-000000000001",
    revisionId: "20000000-0000-4000-8000-000000000001",
    expiresAt: Date.now() + 120_000,
    nonce: "1234567890123456789012",
  }),
).toString("base64url")}.signature`;

vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: true }),
  cookies: async () => ({ get: () => ({ value: token }) }),
}));

import { getPreviewArticleForSlug } from "./news-preview";

describe("isolamento de prévia", () => {
  it("não expõe a revisão em um slug diferente", async () => {
    vi.stubEnv(
      "CMS_PREVIEW_RESOLVE_URL",
      "https://cms-admin.nite.test/api/preview/resolve",
    );
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(
        Response.json({
          schemaVersion: 1,
          articleId: "10000000-0000-4000-8000-000000000001",
          revisionId: "20000000-0000-4000-8000-000000000001",
          slug: "somente-esta-revisao",
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
                content: [{ type: "text", text: "Conteúdo privado." }],
              },
            ],
          },
        }),
      ),
    );

    await expect(
      getPreviewArticleForSlug("outro-slug-publico"),
    ).resolves.toBeUndefined();
  });
});
