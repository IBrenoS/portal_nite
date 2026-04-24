import projectsJson from "@/conteudo/projetos/projetos.json";
import timelineJson from "@/conteudo/linha-do-tempo/eventos.json";
import {
  projectCollectionSchema,
  timelineCollectionSchema,
  type Project,
  type ProjectStatus,
  type TimelineEvent,
} from "@/biblioteca/esquemas";

const projectStatusLabels: Record<ProjectStatus, string> = {
  placeholder: "Placeholder",
  planejado: "Planejado",
  "em-andamento": "Em andamento",
  ativo: "Ativo",
  concluido: "Concluido",
};

function parseContent<T>(label: string, parser: { parse: (input: unknown) => T }, input: unknown) {
  try {
    return parser.parse(input);
  } catch (error) {
    throw new Error(`Conteudo invalido em ${label}: ${error instanceof Error ? error.message : "erro desconhecido"}`);
  }
}

export function getProjects(): Project[] {
  return parseContent("conteudo/projetos/projetos.json", projectCollectionSchema, projectsJson);
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

export function getProjectStatusLabel(status: ProjectStatus) {
  return projectStatusLabels[status];
}

export function getTimelineEvents(): TimelineEvent[] {
  return parseContent("conteudo/linha-do-tempo/eventos.json", timelineCollectionSchema, timelineJson).toSorted(
    (current, next) => current.year - next.year || current.sequence - next.sequence,
  );
}
