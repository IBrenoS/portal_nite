import { z } from "zod";

import type { NewsPublicDataSource } from "./repository";
import {
  newsArticleResponseSchema,
  newsListResponseSchema,
  type NewsArticle,
} from "./schema";

type FetchImplementation = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export interface NewsApiClient extends NewsPublicDataSource {
  getArticleBySlug(slug: string): Promise<NewsArticle | undefined>;
}

function normalizeBaseUrl(value: string) {
  const url = new URL(value.endsWith("/") ? value : `${value}/`);
  if (url.protocol !== "https:") {
    throw new Error("A URL da API pública de News deve usar HTTPS.");
  }
  return url;
}

async function readJson(response: Response) {
  if (!response.ok) {
    throw new Error(
      `A API pública de News respondeu com status ${response.status}.`,
    );
  }

  return response.json() as Promise<unknown>;
}

function parseResponse<T>(
  parser: { safeParse: (input: unknown) => z.ZodSafeParseResult<T> },
  input: unknown,
): T {
  const result = parser.safeParse(input);
  if (!result.success) {
    throw new Error(
      `Resposta incompatível da API pública de News: ${result.error.message}`,
    );
  }
  return result.data;
}

export function createNewsApiClient(options: {
  baseUrl: string;
  fetch?: FetchImplementation;
}): NewsApiClient {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetchImplementation = options.fetch ?? fetch;

  return {
    async listPublishedArticles() {
      const response = await fetchImplementation(
        new URL("v2/news", baseUrl).toString(),
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );
      const payload = parseResponse(
        newsListResponseSchema,
        await readJson(response),
      );
      return payload.articles;
    },
    async getArticleBySlug(slug) {
      const parsedSlug = z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .parse(slug);
      const response = await fetchImplementation(
        new URL(
          `v2/news/${encodeURIComponent(parsedSlug)}`,
          baseUrl,
        ).toString(),
        { method: "GET", headers: { accept: "application/json" } },
      );
      if (response.status === 404) return undefined;
      const payload = parseResponse(
        newsArticleResponseSchema,
        await readJson(response),
      );
      return payload.article;
    },
  };
}
