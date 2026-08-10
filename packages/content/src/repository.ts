import projectsJson from "../data/projects.json";
import timelineJson from "../data/timeline.json";
import peopleJson from "../data/people.json";
import newsJson from "../data/news.json";
import {
  newsCollectionSchema,
  newsFilterValues,
  peopleCollectionSchema,
  projectCollectionSchema,
  timelineCollectionSchema,
  type NewsArticle,
  type NewsFilter,
  type Person,
  type Project,
  type TimelineEvent,
} from "./schemas";

function parseContent<T>(
  label: string,
  parser: { parse: (input: unknown) => T },
  input: unknown,
) {
  try {
    return parser.parse(input);
  } catch (error) {
    throw new Error(
      `Conteudo invalido em ${label}: ${error instanceof Error ? error.message : "erro desconhecido"}`,
    );
  }
}

export function getProjects(): Project[] {
  return parseContent(
    "conteudo/projetos/projetos.json",
    projectCollectionSchema,
    projectsJson,
  );
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  return getProjects()
    .filter((project) => project.slug !== slug)
    .slice(0, limit);
}

export function getIndexableProjects(): Project[] {
  return getProjects().filter((project) => project.status !== "placeholder");
}

export function getPeople(): Person[] {
  return parseContent(
    "conteudo/pessoas/pessoas.json",
    peopleCollectionSchema,
    peopleJson,
  );
}

export function getPersonSlugs() {
  return getPeople().map((person) => ({ slug: person.slug }));
}

export function getPersonBySlug(slug: string): Person | undefined {
  return getPeople().find((person) => person.slug === slug);
}

export function isPersonPublic(person: Person): boolean {
  return person.public && person.authorized;
}

export function getPublicPeople(people = getPeople()): Person[] {
  return people.filter(isPersonPublic);
}

export function getIndexablePeople(people = getPeople()): Person[] {
  return getPublicPeople(people).filter(
    (person) => person.contentState === "real",
  );
}

export function getTimelineEvents(): TimelineEvent[] {
  return parseContent(
    "conteudo/linha-do-tempo/eventos.json",
    timelineCollectionSchema,
    timelineJson,
  ).toSorted(
    (current, next) =>
      current.year - next.year || current.sequence - next.sequence,
  );
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

export function getNewsArticles(): NewsArticle[] {
  return parseContent(
    "conteudo/atualizacoes/news.json",
    newsCollectionSchema,
    newsJson,
  );
}

export function getPublishedNewsArticles(): NewsArticle[] {
  return getNewsArticles()
    .filter((article) => article.public)
    .toSorted(compareNewsByPublication);
}

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return getPublishedNewsArticles().find((article) => article.slug === slug);
}

export function getNewsArticleSlugs() {
  return getPublishedNewsArticles().map((article) => ({ slug: article.slug }));
}

export function getFeaturedNewsArticle(): NewsArticle | undefined {
  return getPublishedNewsArticles().find((article) => article.featured);
}

export function getLatestNewsArticles(
  limit = 4,
  excludeSlug?: string,
): NewsArticle[] {
  return getPublishedNewsArticles()
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, Math.max(0, limit));
}

export function getAgendaNewsArticles(limit = 3): NewsArticle[] {
  return getPublishedNewsArticles()
    .filter((article): article is NewsArticle & { eventDate: string } =>
      Boolean(article.eventDate),
    )
    .toSorted(
      (current, next) =>
        current.eventDate.localeCompare(next.eventDate) ||
        compareNewsByPublication(current, next),
    )
    .slice(0, Math.max(0, limit));
}

export function normalizeNewsFilter(
  filter: string | string[] | undefined,
): NewsFilter {
  const candidate = Array.isArray(filter) ? filter[0] : filter;

  return newsFilterValues.includes(candidate as NewsFilter)
    ? (candidate as NewsFilter)
    : "destaques";
}

export function getFilteredNewsArticles(filter: NewsFilter): NewsArticle[] {
  const articles = getPublishedNewsArticles();

  switch (filter) {
    case "todas":
      return articles;
    case "agenda":
      return articles.filter((article) => article.eventDate);
    case "comunidade":
      return articles.filter((article) => article.category === "comunidade");
    case "destaques":
      return articles.filter((article) => article.featured);
  }
}

export function getRelatedNewsArticles(slug: string, limit = 3): NewsArticle[] {
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return [];
  }

  return getPublishedNewsArticles()
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
}

export function getIndexableNewsArticles(): NewsArticle[] {
  return getPublishedNewsArticles().filter(
    (article) => article.contentState === "real",
  );
}
