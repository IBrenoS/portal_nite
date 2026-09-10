import "server-only";

import {
  createNewsApiClient,
  createNewsPublicRepository,
  readPublicNewsConfiguration,
  type NewsPublicRepository,
} from "@nite/news";

type EnvironmentSource = Readonly<Record<string, string | undefined>>;
type FetchImplementation = typeof fetch;

export function createPreviewNewsRepository(
  environment: EnvironmentSource,
  fetchImplementation?: FetchImplementation,
): NewsPublicRepository {
  const result = readPublicNewsConfiguration(environment);

  if (!result.configured) {
    throw new Error(
      `Fonte pública do Web Preview não configurada: ${result.missing.join(", ")}.`,
    );
  }
  if (result.configuration.source !== "api") {
    throw new Error("O Web Preview exige NITE_NEWS_SOURCE=api.");
  }

  return createNewsPublicRepository(
    createNewsApiClient({
      baseUrl: result.configuration.apiUrl,
      fetch: fetchImplementation,
    }),
  );
}

let repository: NewsPublicRepository | undefined;

function getRepository() {
  repository ??= createPreviewNewsRepository(process.env);
  return repository;
}

export async function getNewsArticleBySlug(slug: string) {
  return getRepository().getNewsArticleBySlug(slug);
}

export async function getFeaturedNewsArticle() {
  return getRepository().getFeaturedNewsArticle();
}

export async function getAgendaNewsArticles(limit?: number) {
  return getRepository().getAgendaNewsArticles(limit);
}

export async function getFilteredNewsArticles(
  filter: Parameters<NewsPublicRepository["getFilteredNewsArticles"]>[0],
) {
  return getRepository().getFilteredNewsArticles(filter);
}

export async function getRelatedNewsArticles(slug: string, limit?: number) {
  return getRepository().getRelatedNewsArticles(slug, limit);
}
