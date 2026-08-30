import { describe, expect, it, vi } from "vitest";

import { createPreviewSession, resolvePreviewArticle } from "./news-preview";
import type { PreviewArticle } from "./news-preview";

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

describe("prévia editorial", () => {
  it("só cria sessão após validar a resposta privada e limita o TTL ao token", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(preview));
    const article = await resolvePreviewArticle({
      token,
      endpointUrl: "https://cms-admin.nite.test/api/preview/resolve",
      fetch: fetcher,
    });
    const session = createPreviewSession({ token, article, now });

    expect(session).toMatchObject({
      slug: preview.slug,
      revisionId: claims.revisionId,
    });
    expect(session?.maxAge).toBe(120);
    expect(fetcher).toHaveBeenCalledWith(
      "https://cms-admin.nite.test/api/preview/resolve",
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: expect.objectContaining({ authorization: `Bearer ${token}` }),
      }),
    );
  });

  it("rejeita token expirado ou que não corresponda à revisão validada", () => {
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
        token: `v1.${Buffer.from(JSON.stringify({ ...claims, expiresAt: now.getTime() - 1 })).toString("base64url")}.signature`,
        article: preview,
        now,
      }),
    ).toBeUndefined();
  });
});
