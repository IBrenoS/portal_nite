import "server-only";

import { unstable_cache } from "next/cache";

import {
  createNeonNewsPublicDataSource,
  createNewsPublicRepository,
  createStaticNewsPublicDataSource,
  type NewsPublicRepository,
} from "@nite/content/public";
import { readPublicNewsConfiguration } from "./news-configuration";

export const NITE_NEWS_CACHE_TAG = "nite-news:published";

let repository: NewsPublicRepository | undefined;

function createRepository() {
  const result = readPublicNewsConfiguration(process.env);
  if (!result.configured) {
    throw new Error(
      `Fonte pública do News não configurada: ${result.missing.join(", ")}.`,
    );
  }
  if (result.configuration.source === "static") {
    return createNewsPublicRepository(createStaticNewsPublicDataSource());
  }

  const databaseSource = createNeonNewsPublicDataSource({
    databaseUrl: result.configuration.databaseUrl,
    mediaBaseUrl: result.configuration.mediaBaseUrl,
  });
  const listPublishedArticles = unstable_cache(
    () => databaseSource.listPublishedArticles(),
    ["nite-news-published-articles"],
    { tags: [NITE_NEWS_CACHE_TAG], revalidate: 300 },
  );
  return createNewsPublicRepository({ listPublishedArticles });
}

function getRepository() {
  repository ??= createRepository();
  return repository;
}

export async function getNewsArticleBySlug(slug: string) {
  return getRepository().getNewsArticleBySlug(slug);
}

export async function getFeaturedNewsArticle() {
  return getRepository().getFeaturedNewsArticle();
}

export async function getLatestNewsArticles(
  limit?: number,
  excludeSlug?: string,
) {
  return getRepository().getLatestNewsArticles(limit, excludeSlug);
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

export async function getIndexableNewsArticles() {
  return getRepository().getIndexableNewsArticles();
}
