import { describe, expect, it, vi } from "vitest";

import { createPreviewNewsRepository } from "./news";

const article = {
  slug: "materia-publicada",
  title: "Matéria publicada pela redação do Nite News",
  summary:
    "Resumo editorial suficientemente descritivo para validar o consumo público pelo Portal de preview.",
  category: "inovacao" as const,
  publishedAt: "2026-09-09",
  readTimeMinutes: 3,
  byline: "Redação NITE",
  cover: {
    src: "https://media.nite.test/news/capa.webp",
    alt: "Estudantes reunidos durante atividade editorial do NITE",
  },
  featured: true,
  contentState: "real" as const,
  public: true as const,
  body: {
    schemaVersion: 2 as const,
    type: "doc" as const,
    content: [
      {
        type: "paragraph" as const,
        content: [{ type: "text" as const, text: "Conteúdo publicado." }],
      },
    ],
  },
};

describe("fonte pública do Web Preview", () => {
  it("consulta a API v2 do CMS e expõe somente matérias publicadas válidas", async () => {
    const fetchImplementation = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ version: 2, articles: [article] }));
    const repository = createPreviewNewsRepository(
      {
        NITE_NEWS_SOURCE: "api",
        CMS_PUBLIC_API_URL: "https://nite-cms-api.vercel.app/",
      },
      fetchImplementation,
    );

    await expect(repository.getPublishedNewsArticles()).resolves.toEqual([
      article,
    ]);
    expect(fetchImplementation).toHaveBeenCalledWith(
      "https://nite-cms-api.vercel.app/v2/news",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("não permite regressão silenciosa para os mockups estáticos", () => {
    expect(() =>
      createPreviewNewsRepository({ NITE_NEWS_SOURCE: "static" }),
    ).toThrow(/NITE_NEWS_SOURCE=api/u);
  });
});
