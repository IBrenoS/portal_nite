import { describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => {
  const cache = vi.fn(
    <T extends (...args: unknown[]) => Promise<unknown>>(loader: T) => {
      const values = new Map<string, Promise<unknown>>();
      return (...args: unknown[]) => {
        const key = JSON.stringify(args);
        const value = values.get(key) ?? loader(...args);
        values.set(key, value);
        return value;
      };
    },
  );
  return { cache };
});
const token = `v2.${Buffer.from(JSON.stringify({ version: 2, articleId: "10000000-0000-4000-8000-000000000001", snapshotId: "40000000-0000-4000-8000-000000000001", expiresAt: Date.now() + 120_000, nonce: "1234567890123456789012" })).toString("base64url")}.signature`;

vi.mock("react", () => ({ cache: controls.cache }));
vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: true }),
  cookies: async () => ({ get: () => ({ value: token }) }),
}));

import { getPreviewArticle, getPreviewArticleForSlug } from "./news-preview";

const preview = {
  schemaVersion: 2,
  articleId: "10000000-0000-4000-8000-000000000001",
  snapshotId: "40000000-0000-4000-8000-000000000001",
  baseRevisionId: "20000000-0000-4000-8000-000000000001",
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
  it("mantém o snapshot v2 no refresh e compartilha uma resolução no request", async () => {
    vi.stubEnv(
      "CMS_PREVIEW_RESOLVE_URL",
      "https://cms-admin.nite.test/api/preview/resolve",
    );
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(preview));
    vi.stubGlobal("fetch", fetcher);

    const [listingPreview, metadataPreview, pagePreview] = await Promise.all([
      getPreviewArticle(),
      getPreviewArticleForSlug(preview.slug),
      getPreviewArticleForSlug(preview.slug),
    ]);

    expect(controls.cache).toHaveBeenCalledTimes(2);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(listingPreview).toBe(pagePreview);
    expect(metadataPreview).toBe(pagePreview);
    expect(listingPreview).toEqual(preview);
  });
});
