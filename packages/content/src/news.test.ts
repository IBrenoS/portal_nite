import { describe, expect, it } from "vitest";

import {
  getAgendaNewsArticles,
  getFeaturedNewsArticle,
  getFilteredNewsArticles,
  getIndexableNewsArticles,
  getLatestNewsArticles,
  getNewsArticleBySlug,
  getNewsArticleSlugs,
  getPublishedNewsArticles,
  getRelatedNewsArticles,
  newsCollectionSchema,
  normalizeNewsFilter,
  type NewsArticle,
} from "@nite/content";

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
  it("carrega oito materias publicas e resolve cada slug", () => {
    const articles = getPublishedNewsArticles();

    expect(articles.map((article) => article.slug)).toEqual(expectedNewsSlugs);
    expect(getNewsArticleSlugs()).toEqual(
      expectedNewsSlugs.map((slug) => ({ slug })),
    );
    expect(
      getNewsArticleBySlug("novas-conexoes-transformam-experiencia-campus")
        ?.title,
    ).toBe("Novas conexões transformam a experiência no campus");
  });

  it("separa destaque, ultimas noticias e agenda na ordem editorial", () => {
    const featured = getFeaturedNewsArticle();

    expect(featured?.slug).toBe(
      "novas-conexoes-transformam-experiencia-campus",
    );
    expect(
      getLatestNewsArticles(4, featured?.slug).map((article) => article.slug),
    ).toEqual([
      "semana-cultura-ideias-encontros",
      "projetos-estudantis-compartilham-descobertas",
      "conversas-tecnologia-novos-caminhos",
      "bastidores-iniciativa-colaboracao",
    ]);
    expect(
      getAgendaNewsArticles(3).map((article) => article.eventDate),
    ).toEqual(["2026-08-12", "2026-08-14", "2026-08-16"]);
  });

  it("normaliza filtros e retorna apenas o conjunto solicitado", () => {
    expect(normalizeNewsFilter(undefined)).toBe("destaques");
    expect(normalizeNewsFilter(["agenda", "comunidade"])).toBe("agenda");
    expect(normalizeNewsFilter("desconhecido")).toBe("destaques");
    expect(
      getFilteredNewsArticles("agenda").every((article) => article.eventDate),
    ).toBe(true);
    expect(
      getFilteredNewsArticles("comunidade").every(
        (article) => article.category === "comunidade",
      ),
    ).toBe(true);
    expect(getFilteredNewsArticles("todas")).toHaveLength(8);
    expect(
      getFilteredNewsArticles("destaques").map(({ featured }) => featured),
    ).toEqual([true]);
  });

  it("prioriza materias relacionadas da mesma categoria", () => {
    const related = getRelatedNewsArticles(
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

  it("mantem materias demonstrativas fora do conjunto indexavel", () => {
    expect(getIndexableNewsArticles()).toEqual([]);
    expect(
      getPublishedNewsArticles().every(
        (article) => article.contentState === "demonstrativo" && article.public,
      ),
    ).toBe(true);
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
      body: [
        {
          type: "paragraph",
          text: "Texto editorial usado somente para validar o contrato de conteúdo da matéria.",
        },
      ],
    } satisfies Omit<NewsArticle, "eventDate">;

    expect(() =>
      newsCollectionSchema.parse([
        { ...article, category: "comunidade" },
        { ...article, category: "projetos" },
      ]),
    ).toThrow("Slugs de notícias devem ser únicos.");
  });
});
