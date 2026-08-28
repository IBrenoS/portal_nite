import newsJson from "../data/news.json";
import {
  newsCollectionSchema,
  newsFilterValues,
  type NewsArticle,
  type NewsFilter,
} from "./schema";

export interface NewsPublicDataSource {
  listPublishedArticles(): Promise<readonly NewsArticle[]>;
}

export interface NewsPublicRepository {
  getPublishedNewsArticles(): Promise<NewsArticle[]>;
  getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined>;
  getNewsArticleSlugs(): Promise<Array<{ slug: string }>>;
  getFeaturedNewsArticle(): Promise<NewsArticle | undefined>;
  getLatestNewsArticles(
    limit?: number,
    excludeSlug?: string,
  ): Promise<NewsArticle[]>;
  getAgendaNewsArticles(limit?: number): Promise<NewsArticle[]>;
  getFilteredNewsArticles(filter: NewsFilter): Promise<NewsArticle[]>;
  getRelatedNewsArticles(slug: string, limit?: number): Promise<NewsArticle[]>;
  getIndexableNewsArticles(): Promise<NewsArticle[]>;
}

function compareNewsByPublication(
  current: NewsArticle,
  next: NewsArticle,
): number {
  return (
    next.publishedAt.localeCompare(current.publishedAt) ||
    Number(next.featured) - Number(current.featured) ||
    current.slug.localeCompare(next.slug)
  );
}

function parsePublishedArticles(input: readonly NewsArticle[]): NewsArticle[] {
  if (input.length === 0) {
    return [];
  }

  return newsCollectionSchema.parse(input).filter((article) => article.public);
}

async function loadPublishedArticles(
  dataSource: NewsPublicDataSource,
): Promise<NewsArticle[]> {
  return parsePublishedArticles(
    await dataSource.listPublishedArticles(),
  ).toSorted(compareNewsByPublication);
}

export function createNewsPublicRepository(
  dataSource: NewsPublicDataSource,
): NewsPublicRepository {
  return {
    async getPublishedNewsArticles() {
      return loadPublishedArticles(dataSource);
    },
    async getNewsArticleBySlug(slug) {
      return (await loadPublishedArticles(dataSource)).find(
        (article) => article.slug === slug,
      );
    },
    async getNewsArticleSlugs() {
      return (await loadPublishedArticles(dataSource)).map((article) => ({
        slug: article.slug,
      }));
    },
    async getFeaturedNewsArticle() {
      return (await loadPublishedArticles(dataSource)).find(
        (article) => article.featured,
      );
    },
    async getLatestNewsArticles(limit = 4, excludeSlug) {
      return (await loadPublishedArticles(dataSource))
        .filter((article) => article.slug !== excludeSlug)
        .slice(0, Math.max(0, limit));
    },
    async getAgendaNewsArticles(limit = 3) {
      return (await loadPublishedArticles(dataSource))
        .filter((article): article is NewsArticle & { eventDate: string } =>
          Boolean(article.eventDate),
        )
        .toSorted(
          (current, next) =>
            current.eventDate.localeCompare(next.eventDate) ||
            compareNewsByPublication(current, next),
        )
        .slice(0, Math.max(0, limit));
    },
    async getFilteredNewsArticles(filter) {
      const articles = await loadPublishedArticles(dataSource);

      switch (filter) {
        case "todas":
          return articles;
        case "agenda":
          return articles.filter((article) => article.eventDate);
        case "comunidade":
          return articles.filter(
            (article) => article.category === "comunidade",
          );
        case "destaques":
          return articles.filter((article) => article.featured);
      }
    },
    async getRelatedNewsArticles(slug, limit = 3) {
      const articles = await loadPublishedArticles(dataSource);
      const article = articles.find((candidate) => candidate.slug === slug);

      if (!article) {
        return [];
      }

      return articles
        .filter((candidate) => candidate.slug !== article.slug)
        .toSorted((current, next) => {
          const currentMatches = current.category === article.category;
          const nextMatches = next.category === article.category;

          return (
            Number(nextMatches) - Number(currentMatches) ||
            compareNewsByPublication(current, next)
          );
        })
        .slice(0, Math.max(0, limit));
    },
    async getIndexableNewsArticles() {
      return (await loadPublishedArticles(dataSource)).filter(
        (article) => article.contentState === "real",
      );
    },
  };
}

export function createStaticNewsPublicDataSource(
  input: unknown = newsJson,
): NewsPublicDataSource {
  return {
    async listPublishedArticles() {
      return newsCollectionSchema.parse(input);
    },
  };
}

export function normalizeNewsFilter(
  filter: string | string[] | undefined,
): NewsFilter {
  const candidate = Array.isArray(filter) ? filter[0] : filter;

  return newsFilterValues.includes(candidate as NewsFilter)
    ? (candidate as NewsFilter)
    : "destaques";
}

const defaultRepository = createNewsPublicRepository(
  createStaticNewsPublicDataSource(),
);

export const getPublishedNewsArticles =
  defaultRepository.getPublishedNewsArticles;
export const getNewsArticleBySlug = defaultRepository.getNewsArticleBySlug;
export const getNewsArticleSlugs = defaultRepository.getNewsArticleSlugs;
export const getFeaturedNewsArticle = defaultRepository.getFeaturedNewsArticle;
export const getLatestNewsArticles = defaultRepository.getLatestNewsArticles;
export const getAgendaNewsArticles = defaultRepository.getAgendaNewsArticles;
export const getFilteredNewsArticles =
  defaultRepository.getFilteredNewsArticles;
export const getRelatedNewsArticles = defaultRepository.getRelatedNewsArticles;
export const getIndexableNewsArticles =
  defaultRepository.getIndexableNewsArticles;
