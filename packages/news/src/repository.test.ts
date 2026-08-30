import { describe, expect, it } from "vitest";

import {
  createNewsPublicRepository,
  getAgendaNewsArticles,
  getFeaturedNewsArticle,
  getFilteredNewsArticles,
  getIndexableNewsArticles,
  getLatestNewsArticles,
  getNewsArticleBySlug,
  getNewsArticleSlugs,
  getPublishedNewsArticles,
  getRelatedNewsArticles,
  normalizeNewsFilter,
  type NewsPublicDataSource,
} from "@nite/news";
import { newsCollectionSchema, type NewsArticle } from "@nite/news";

const expectedNewsSlugs = [
  "novas-conexoes-transformam-experiencia-campus",
  "semana-cultura-ideias-encontros",
  "projetos-estudantis-compartilham-descobertas",
  "conversas-tecnologia-novos-caminhos",
  "bastidores-iniciativa-colaboracao",
  "encontros-criativos-novos-espacos",
  "roda-conversa-futuros-possiveis",
  "atividade-aberta-convida-colaboracao",
] as const;

describe("Nite News", () => {
  it("carrega oito materias publicas e resolve cada slug", async () => {
    const articles = await getPublishedNewsArticles();

    expect(articles.map((article) => article.slug)).toEqual(expectedNewsSlugs);
    await expect(getNewsArticleSlugs()).resolves.toEqual(
      expectedNewsSlugs.map((slug) => ({ slug })),
    );
    expect(
      (
        await getNewsArticleBySlug(
          "novas-conexoes-transformam-experiencia-campus",
        )
      )?.title,
    ).toBe("Novas conexões transformam a experiência no campus");
  });

  it("separa destaque, ultimas noticias e agenda na ordem editorial", async () => {
    const featured = await getFeaturedNewsArticle();

    expect(featured?.slug).toBe(
      "novas-conexoes-transformam-experiencia-campus",
    );
    expect(
      (await getLatestNewsArticles(4, featured?.slug)).map(
        (article) => article.slug,
      ),
    ).toEqual([
      "semana-cultura-ideias-encontros",
      "projetos-estudantis-compartilham-descobertas",
      "conversas-tecnologia-novos-caminhos",
      "bastidores-iniciativa-colaboracao",
    ]);
    expect(
      (await getAgendaNewsArticles(3)).map((article) => article.eventDate),
    ).toEqual(["2026-08-12", "2026-08-14", "2026-08-16"]);
  });

  it("normaliza filtros e retorna apenas o conjunto solicitado", async () => {
    expect(normalizeNewsFilter(undefined)).toBe("destaques");
    expect(normalizeNewsFilter(["agenda", "comunidade"])).toBe("agenda");
    expect(normalizeNewsFilter("desconhecido")).toBe("destaques");
    expect(
      (await getFilteredNewsArticles("agenda")).every(
        (article) => article.eventDate,
      ),
    ).toBe(true);
    expect(
      (await getFilteredNewsArticles("comunidade")).every(
        (article) => article.category === "comunidade",
      ),
    ).toBe(true);
    await expect(getFilteredNewsArticles("todas")).resolves.toHaveLength(8);
    expect(
      (await getFilteredNewsArticles("destaques")).map(
        ({ featured }) => featured,
      ),
    ).toEqual([true]);
  });

  it("prioriza materias relacionadas da mesma categoria", async () => {
    const related = await getRelatedNewsArticles(
      "novas-conexoes-transformam-experiencia-campus",
      3,
    );

    expect(related).toHaveLength(3);
    expect(related[0]).toMatchObject({
      slug: "bastidores-iniciativa-colaboracao",
      category: "comunidade",
    });
    expect(
      related.some(
        ({ slug }) => slug === "novas-conexoes-transformam-experiencia-campus",
      ),
    ).toBe(false);
  });

  it("mantem materias demonstrativas fora do conjunto indexavel", async () => {
    await expect(getIndexableNewsArticles()).resolves.toEqual([]);
    expect(
      (await getPublishedNewsArticles()).every(
        (article) => article.contentState === "demonstrativo" && article.public,
      ),
    ).toBe(true);
  });

  it("mantem regras editoriais ao trocar a fonte publica", async () => {
    const articles = (await getPublishedNewsArticles()).slice(0, 3);
    const dataSource: NewsPublicDataSource = {
      async listPublishedArticles() {
        return articles.toReversed();
      },
    };
    const repository = createNewsPublicRepository(dataSource);

    await expect(repository.getPublishedNewsArticles()).resolves.toEqual(
      articles,
    );
    await expect(
      repository.getNewsArticleBySlug(articles[1].slug),
    ).resolves.toEqual(articles[1]);
    await expect(repository.getLatestNewsArticles(1)).resolves.toEqual([
      articles[0],
    ]);
  });

  it("rejeita slugs duplicados", () => {
    const article = {
      slug: "materia-demonstrativa",
      title: "Matéria demonstrativa completa",
      summary:
        "Resumo editorial suficientemente descritivo para validar o contrato.",
      category: "agenda",
      publishedAt: "2026-08-10",
      readTimeMinutes: 4,
      byline: "Redação Nite News",
      cover: {
        src: "/images/atualizacoes/materia.webp",
        alt: "Pessoas reunidas em um ambiente universitário iluminado.",
      },
      featured: false,
      contentState: "demonstrativo",
      public: true,
      body: {
        schemaVersion: 1,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Texto editorial usado somente para validar o contrato de conteúdo da matéria.",
              },
            ],
          },
        ],
      },
    } satisfies Omit<NewsArticle, "eventDate">;

    expect(() =>
      newsCollectionSchema.parse([
        { ...article, category: "comunidade" },
        { ...article, category: "projetos" },
      ]),
    ).toThrow("Slugs de notícias devem ser únicos.");
  });
});
