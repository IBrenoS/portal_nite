import { describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => {
  const cache = vi.fn(
    <T extends (slug: string) => Promise<unknown>>(loader: T) => {
      const values = new Map<string, Promise<unknown>>();
      return (slug: string) => {
        const value = values.get(slug) ?? loader(slug);
        values.set(slug, value);
        return value;
      };
    },
  );
  return { cache };
});
const token = `v1.${Buffer.from(JSON.stringify({ version: 1, articleId: "10000000-0000-4000-8000-000000000001", revisionId: "20000000-0000-4000-8000-000000000001", expiresAt: Date.now() + 120_000, nonce: "1234567890123456789012" })).toString("base64url")}.signature`;

vi.mock("react", () => ({ cache: controls.cache }));
vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: true }),
  cookies: async () => ({ get: () => ({ value: token }) }),
}));

import { getPreviewArticleForSlug } from "./news-preview";

const preview = {
  schemaVersion: 1,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
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
        content: [{ type: "text", text: "Conteúdo privado." }],
      },
    ],
  },
};

describe("memoização da prévia editorial", () => {
  it("compartilha uma única resolução entre metadata e corpo no request", async () => {
    vi.stubEnv(
      "CMS_PREVIEW_RESOLVE_URL",
      "https://cms-admin.nite.test/api/preview/resolve",
    );
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(preview));
    vi.stubGlobal("fetch", fetcher);

    const [metadataPreview, pagePreview] = await Promise.all([
      getPreviewArticleForSlug(preview.slug),
      getPreviewArticleForSlug(preview.slug),
    ]);

    expect(controls.cache).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(metadataPreview).toBe(pagePreview);
  });
});
