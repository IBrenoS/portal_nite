import projectsJson from "@/conteudo/projetos/projetos.json";
import timelineJson from "@/conteudo/linha-do-tempo/eventos.json";
import peopleJson from "@/conteudo/pessoas/pessoas.json";
import {
  peopleCollectionSchema,
  projectCollectionSchema,
  timelineCollectionSchema,
  type Person,
  type Project,
  type TimelineEvent,
} from "@/biblioteca/esquemas";

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
