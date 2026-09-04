import "server-only";

import {
  createNewsPublicRepository,
  createStaticNewsPublicDataSource,
  type NewsPublicRepository,
  readPublicNewsConfiguration,
} from "@nite/news";

let repository: NewsPublicRepository | undefined;

function createRepository() {
  const environment = process.env.NITE_NEWS_SOURCE
    ? process.env
    : { ...process.env, NITE_NEWS_SOURCE: "static" };
  const result = readPublicNewsConfiguration(environment);
  if (!result.configured) {
    throw new Error(
      `Fonte pública do News não configurada: ${result.missing.join(", ")}.`,
    );
  }
  if (result.configuration.source !== "static") {
    throw new Error(
      "O export estático do Portal exige NITE_NEWS_SOURCE=static.",
    );
  }
  return createNewsPublicRepository(createStaticNewsPublicDataSource());
}

function getRepository() {
  repository ??= createRepository();
  return repository;
}

export async function getNewsArticleBySlug(slug: string) {
  return getRepository().getNewsArticleBySlug(slug);
}

export async function getNewsArticleSlugs() {
  return getRepository().getNewsArticleSlugs();
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

export async function getIndexableNewsArticles() {
  return getRepository().getIndexableNewsArticles();
}
