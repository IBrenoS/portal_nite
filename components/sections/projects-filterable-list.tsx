"use client";

import { useMemo, useState } from "react";

import type { Project } from "@/biblioteca/esquemas";
import {
  ProjectCard,
  projectStatusLabels,
  type ProjectCardStatus,
} from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type ProjectsFilterableListProps = {
  projects: Project[];
};

type StatusFilter = ProjectCardStatus | "all";
type AreaFilter = string | "all";

const statusFilterLabels = {
  all: "Todos",
  draft: projectStatusLabels.draft,
  in_progress: projectStatusLabels.in_progress,
  validated: projectStatusLabels.validated,
  done: projectStatusLabels.done,
  archived: projectStatusLabels.archived,
} satisfies Record<StatusFilter, string>;

const projectCardStatusByProjectStatus = {
  placeholder: "draft",
  planejado: "draft",
  "em-descoberta": "in_progress",
  "em-prototipo": "in_progress",
  ativo: "in_progress",
  concluido: "done",
} satisfies Record<Project["status"], ProjectCardStatus>;

const statusFilterOrder: readonly ProjectCardStatus[] = [
  "draft",
  "in_progress",
  "validated",
  "done",
  "archived",
];

const projectDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
  year: "numeric",
});

function isProjectPublicationReady(project: Project) {
  return project.contentState === "real";
}

function hasProjectPublicEvidence(project: Project) {
  return (
    isProjectPublicationReady(project) &&
    (project.deliverables.some(
      (deliverable) =>
        deliverable.status === "disponivel" && Boolean(deliverable.href),
    ) ||
      project.gallery.length > 0 ||
      project.links.length > 0)
  );
}

function formatProjectDate(date: string) {
  return projectDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function getProjectCardStatus(project: Project) {
  return projectCardStatusByProjectStatus[project.status];
}

function getUniqueAreas(projects: Project[]) {
  return Array.from(new Set(projects.map((project) => project.category))).sort(
    (current, next) => current.localeCompare(next, "pt-BR"),
  );
}

function getStatusCounts(projects: Project[]) {
  const counts = Object.fromEntries(
    statusFilterOrder.map((status) => [status, 0]),
  ) as Record<ProjectCardStatus, number>;

  for (const project of projects) {
    counts[getProjectCardStatus(project)] += 1;
  }

  return counts;
}

function getAreaCounts(projects: Project[]) {
  return projects.reduce<Record<string, number>>((counts, project) => {
    counts[project.category] = (counts[project.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function ProjectsFilterableList({
  projects,
}: ProjectsFilterableListProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedArea, setSelectedArea] = useState<AreaFilter>("all");

  const areas = useMemo(() => getUniqueAreas(projects), [projects]);
  const statusCounts = useMemo(() => getStatusCounts(projects), [projects]);
  const areaCounts = useMemo(() => getAreaCounts(projects), [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const statusMatches =
          selectedStatus === "all" ||
          getProjectCardStatus(project) === selectedStatus;
        const areaMatches =
          selectedArea === "all" || project.category === selectedArea;

        return statusMatches && areaMatches;
      }),
    [projects, selectedArea, selectedStatus],
  );

  const hasActiveFilters = selectedStatus !== "all" || selectedArea !== "all";

  function clearFilters() {
    setSelectedStatus("all");
    setSelectedArea("all");
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="Projetos em estruturação"
        description="Nenhum projeto público foi cadastrado ainda. Quando houver conteúdo validado ou frentes em estruturação, a listagem aparecerá aqui."
      />
    );
  }

  return (
    <div className="grid gap-8" data-testid="projects-filterable-list">
      <div className="grid gap-5 rounded-lg border border-border bg-card/58 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Filtros
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Combine status e área para refinar a listagem.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!hasActiveFilters}
            onClick={clearFilters}
          >
            Limpar filtros
          </Button>
        </div>

        <fieldset className="grid gap-3">
          <legend className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Status
          </legend>
          <div className="flex flex-wrap gap-2" aria-label="Filtrar por status">
            <FilterButton
              active={selectedStatus === "all"}
              count={projects.length}
              label={statusFilterLabels.all}
              onClick={() => setSelectedStatus("all")}
            />
            {statusFilterOrder.map((status) => (
              <FilterButton
                key={status}
                active={selectedStatus === status}
                count={statusCounts[status]}
                label={statusFilterLabels[status]}
                onClick={() => setSelectedStatus(status)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Área
          </legend>
          <div className="flex flex-wrap gap-2" aria-label="Filtrar por área">
            <FilterButton
              active={selectedArea === "all"}
              count={projects.length}
              label="Todas"
              onClick={() => setSelectedArea("all")}
            />
            {areas.map((area) => (
              <FilterButton
                key={area}
                active={selectedArea === area}
                count={areaCounts[area] ?? 0}
                label={area}
                onClick={() => setSelectedArea(area)}
              />
            ))}
          </div>
        </fieldset>

        <p
          className="text-sm leading-6 text-muted-foreground"
          aria-live="polite"
        >
          {filteredProjects.length === 1
            ? "1 resultado exibido."
            : `${filteredProjects.length} resultados exibidos.`}
        </p>
      </div>

      <div id="project-list-results">
        {filteredProjects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => {
              const isPublicationReady = isProjectPublicationReady(project);

              return (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  summary={project.summary}
                  area={project.category}
                  status={getProjectCardStatus(project)}
                  problem={project.problem}
                  objective={
                    project.objective ??
                    "Objetivo em validação editorial antes de publicação pública."
                  }
                  stack={project.technologies}
                  nextStep={project.nextStep}
                  updatedAt={
                    isPublicationReady
                      ? formatProjectDate(project.lastUpdated)
                      : undefined
                  }
                  href={`/projetos/${project.slug}`}
                  image={
                    isPublicationReady
                      ? { src: project.coverImage, alt: project.alt }
                      : undefined
                  }
                  hasPublicEvidence={hasProjectPublicEvidence(project)}
                  headingLevel={3}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Nenhum projeto encontrado"
            description="Nenhum projeto corresponde aos filtros atuais. Limpe os filtros ou escolha outra combinação de status e área."
          />
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  label: string;
  onClick: () => void;
}) {
  const countLabel = count === 1 ? "1 item" : `${count} itens`;
  const accessibleLabel = active
    ? `${label}, ${countLabel}, ativo`
    : `${label}, ${countLabel}`;

  return (
    <Button
      type="button"
      variant={active ? "secondary" : "outline"}
      size="sm"
      aria-label={accessibleLabel}
      aria-pressed={active}
      aria-controls="project-list-results"
      onClick={onClick}
      className={cn(
        "min-h-10 gap-2",
        active && "border-brand-circuit-bright/45",
      )}
    >
      <span>{label}</span>
      <span className="rounded-full border border-border px-1.5 py-0.5 text-[0.68rem] leading-none text-muted-foreground">
        {count}
      </span>
      {active ? (
        <span className="rounded-full bg-brand-circuit-bright/12 px-1.5 py-0.5 text-[0.64rem] uppercase tracking-[0.12em] text-brand-circuit-bright">
          Ativo
        </span>
      ) : null}
    </Button>
  );
}
