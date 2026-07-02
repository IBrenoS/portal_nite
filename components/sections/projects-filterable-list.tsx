"use client";

import type { Route } from "next";
import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import type { Project } from "@/biblioteca/esquemas";
import { ProjectDiscoveryCard } from "@/components/sections/project-discovery-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import {
  statusBadgeLabels,
  type StatusBadgeStatus,
} from "@/components/ui/status-badge";

type ProjectsFilterableListProps = {
  projects: Project[];
};

type ProjectExplorerStatus = Extract<
  StatusBadgeStatus,
  "draft" | "in_progress" | "validated" | "done" | "archived"
>;
type StatusFilter = ProjectExplorerStatus | "all";
type AreaFilter = string | "all";
type TechnologyFilter = string | "all";
type YearFilter = string | "all";
type SortOption = "editorial" | "recent" | "az";

type FilterOption<T extends string> = {
  count?: number;
  label: string;
  value: T;
};

type ProjectExplorerCover = {
  alt: string;
  src: string;
};

const statusFilterLabels = {
  all: "Todos",
  draft: statusBadgeLabels.draft,
  in_progress: statusBadgeLabels.in_progress,
  validated: statusBadgeLabels.validated,
  done: statusBadgeLabels.done,
  archived: statusBadgeLabels.archived,
} satisfies Record<StatusFilter, string>;

const projectCardStatusByProjectStatus = {
  placeholder: "draft",
  planejado: "draft",
  "em-descoberta": "in_progress",
  "em-prototipo": "in_progress",
  ativo: "in_progress",
  concluido: "done",
} satisfies Record<Project["status"], ProjectExplorerStatus>;

const statusFilterOrder: readonly ProjectExplorerStatus[] = [
  "draft",
  "in_progress",
  "validated",
  "done",
  "archived",
];

const sortOptions = [
  { label: "Ordem editorial", value: "editorial" },
  { label: "Mais recentes", value: "recent" },
  { label: "A-Z", value: "az" },
] satisfies readonly FilterOption<SortOption>[];

function getProjectCardStatus(project: Project) {
  return projectCardStatusByProjectStatus[project.status];
}

function getProjectCover(project: Project): ProjectExplorerCover {
  return project.illustration
    ? {
        alt: project.illustration.alt,
        src: project.illustration.src,
      }
    : {
        alt: project.alt,
        src: project.coverImage,
      };
}

function getUniqueAreas(projects: Project[]) {
  return Array.from(new Set(projects.map((project) => project.category))).sort(
    (current, next) => current.localeCompare(next, "pt-BR"),
  );
}

function getUniqueTechnologies(projects: Project[]) {
  return Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  ).sort((current, next) => current.localeCompare(next, "pt-BR"));
}

function getUniqueYears(projects: Project[]) {
  return Array.from(new Set(projects.map((project) => project.year))).sort(
    (current, next) => next - current,
  );
}

function getStatusCounts(projects: Project[]) {
  const counts = Object.fromEntries(
    statusFilterOrder.map((status) => [status, 0]),
  ) as Record<ProjectExplorerStatus, number>;

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

function getTechnologyCounts(projects: Project[]) {
  return projects.reduce<Record<string, number>>((counts, project) => {
    for (const technology of project.technologies) {
      counts[technology] = (counts[technology] ?? 0) + 1;
    }

    return counts;
  }, {});
}

function getYearCounts(projects: Project[]) {
  return projects.reduce<Record<string, number>>((counts, project) => {
    const year = String(project.year);
    counts[year] = (counts[year] ?? 0) + 1;
    return counts;
  }, {});
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function projectMatchesSearch(project: Project, query: string) {
  if (!query) {
    return true;
  }

  const searchableText = normalizeSearch(
    [
      project.title,
      project.summary,
      project.description,
      project.category,
      project.year,
      ...project.technologies,
    ].join(" "),
  );

  return searchableText.includes(query);
}

function sortProjects(projects: Project[], sort: SortOption) {
  if (sort === "editorial") {
    return projects;
  }

  return [...projects].sort((current, next) => {
    if (sort === "az") {
      return current.title.localeCompare(next.title, "pt-BR");
    }

    const dateOrder = next.lastUpdated.localeCompare(current.lastUpdated);

    return dateOrder === 0
      ? current.title.localeCompare(next.title, "pt-BR")
      : dateOrder;
  });
}

export function ProjectsFilterableList({
  projects,
}: ProjectsFilterableListProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedArea, setSelectedArea] = useState<AreaFilter>("all");
  const [selectedTechnology, setSelectedTechnology] =
    useState<TechnologyFilter>("all");
  const [selectedYear, setSelectedYear] = useState<YearFilter>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("editorial");
  const [searchQuery, setSearchQuery] = useState("");

  const areas = useMemo(() => getUniqueAreas(projects), [projects]);
  const technologies = useMemo(
    () => getUniqueTechnologies(projects),
    [projects],
  );
  const years = useMemo(() => getUniqueYears(projects), [projects]);
  const statusCounts = useMemo(() => getStatusCounts(projects), [projects]);
  const areaCounts = useMemo(() => getAreaCounts(projects), [projects]);
  const technologyCounts = useMemo(
    () => getTechnologyCounts(projects),
    [projects],
  );
  const yearCounts = useMemo(() => getYearCounts(projects), [projects]);
  const normalizedSearchQuery = useMemo(
    () => normalizeSearch(searchQuery),
    [searchQuery],
  );

  const statusOptions = useMemo<FilterOption<StatusFilter>[]>(
    () => [
      { count: projects.length, label: statusFilterLabels.all, value: "all" },
      ...statusFilterOrder.map((status) => ({
        count: statusCounts[status],
        label: statusFilterLabels[status],
        value: status,
      })),
    ],
    [projects.length, statusCounts],
  );
  const technologyOptions = useMemo<FilterOption<TechnologyFilter>[]>(
    () => [
      {
        count: projects.length,
        label: "Todas as tecnologias",
        value: "all",
      },
      ...technologies.map((technology) => ({
        count: technologyCounts[technology] ?? 0,
        label: technology,
        value: technology,
      })),
    ],
    [projects.length, technologies, technologyCounts],
  );
  const areaOptions = useMemo<FilterOption<AreaFilter>[]>(
    () => [
      { count: projects.length, label: "Todas as áreas", value: "all" },
      ...areas.map((area) => ({
        count: areaCounts[area] ?? 0,
        label: area,
        value: area,
      })),
    ],
    [areaCounts, areas, projects.length],
  );
  const yearOptions = useMemo<FilterOption<YearFilter>[]>(
    () => [
      { count: projects.length, label: "Todos os anos", value: "all" },
      ...years.map((year) => {
        const value = String(year);

        return {
          count: yearCounts[value] ?? 0,
          label: value,
          value,
        };
      }),
    ],
    [projects.length, yearCounts, years],
  );

  const filteredProjects = useMemo(() => {
    const matches = projects.filter((project) => {
      const statusMatches =
        selectedStatus === "all" ||
        getProjectCardStatus(project) === selectedStatus;
      const areaMatches =
        selectedArea === "all" || project.category === selectedArea;
      const technologyMatches =
        selectedTechnology === "all" ||
        project.technologies.includes(selectedTechnology);
      const yearMatches =
        selectedYear === "all" || String(project.year) === selectedYear;
      const searchMatches = projectMatchesSearch(
        project,
        normalizedSearchQuery,
      );

      return (
        statusMatches &&
        areaMatches &&
        technologyMatches &&
        yearMatches &&
        searchMatches
      );
    });

    return sortProjects(matches, selectedSort);
  }, [
    normalizedSearchQuery,
    projects,
    selectedArea,
    selectedSort,
    selectedStatus,
    selectedTechnology,
    selectedYear,
  ]);

  const hasActiveFilters =
    selectedStatus !== "all" ||
    selectedArea !== "all" ||
    selectedTechnology !== "all" ||
    selectedYear !== "all" ||
    selectedSort !== "editorial" ||
    searchQuery.trim().length > 0;

  function clearFilters() {
    setSelectedStatus("all");
    setSelectedArea("all");
    setSelectedTechnology("all");
    setSelectedYear("all");
    setSelectedSort("editorial");
    setSearchQuery("");
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
    <div
      className="grid gap-7"
      data-projects-explorer="true"
      data-testid="projects-filterable-list"
    >
      <div className="grid gap-4 rounded-2xl border border-nite-border-subtle bg-nite-surface/55 p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(18rem,1fr)_auto] lg:items-center">
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="project-search"
              type="search"
              value={searchQuery}
              aria-label="Pesquisar projetos"
              placeholder="Pesquisar projetos..."
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 pl-10"
            />
          </div>

          <Button
            type="button"
            variant="quiet"
            size="sm"
            disabled={!hasActiveFilters}
            onClick={clearFilters}
            className="min-h-11 justify-self-start lg:justify-self-end"
          >
            Limpar filtros
          </Button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <ExplorerSelect
            label="Status"
            onValueChange={setSelectedStatus}
            options={statusOptions}
            value={selectedStatus}
          />
          <ExplorerSelect
            label="Tecnologia"
            onValueChange={setSelectedTechnology}
            options={technologyOptions}
            value={selectedTechnology}
          />
          <ExplorerSelect
            label="Área"
            onValueChange={setSelectedArea}
            options={areaOptions}
            value={selectedArea}
          />
          <ExplorerSelect
            label="Ano"
            onValueChange={setSelectedYear}
            options={yearOptions}
            value={selectedYear}
          />
          <ExplorerSelect
            label="Ordenar por"
            onValueChange={setSelectedSort}
            options={sortOptions}
            value={selectedSort}
          />
        </div>

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
            {filteredProjects.map((project) => (
              <ProjectExplorerCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum projeto encontrado"
            description="Nenhum projeto corresponde aos filtros atuais. Limpe os filtros ou escolha outra combinação de busca, status, tecnologia, área e ano."
          />
        )}
      </div>
    </div>
  );
}

function ExplorerSelect<T extends string>({
  label,
  onValueChange,
  options,
  value,
}: {
  label: string;
  onValueChange: (value: T) => void;
  options: readonly FilterOption<T>[];
  value: T;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select.Root
      modal={false}
      onValueChange={(nextValue) => {
        if (typeof nextValue === "string") {
          onValueChange(nextValue as T);
        }
      }}
      value={value}
    >
      <Select.Trigger
        aria-label={label}
        className="group/select inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-nite-border-soft bg-transparent px-3 py-2 text-left text-sm text-nite-text-primary outline-none transition-colors hover:border-nite-border-hover hover:bg-nite-surface-subtle focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[popup-open]:border-nite-border-hover data-[popup-open]:bg-nite-surface-subtle"
      >
        <span className="grid min-w-0 gap-0.5">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </span>
          <Select.Value>
            {() => (
              <span className="truncate">
                {selectedOption?.label ?? options[0]?.label ?? label}
              </span>
            )}
          </Select.Value>
        </span>
        <Select.Icon>
          <ChevronDownIcon
            className="size-4 text-muted-foreground transition-transform group-data-[popup-open]/select:rotate-180"
            aria-hidden="true"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          align="start"
          className="z-50"
          collisionPadding={12}
          sideOffset={8}
        >
          <Select.Popup className="min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-nite-border-soft bg-nite-overlay p-1 text-sm text-nite-text-primary shadow-[0_24px_70px_rgb(0_0_0/0.34)] backdrop-blur-md outline-none">
            <Select.List>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="grid cursor-default grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg px-3 py-2 outline-none transition-colors data-[highlighted]:bg-nite-surface-subtle data-[selected]:text-nite-text-primary"
                >
                  <Select.ItemText className="truncate">
                    {option.label}
                  </Select.ItemText>
                  {typeof option.count === "number" ? (
                    <span
                      aria-hidden="true"
                      className="rounded-full border border-nite-border-subtle px-1.5 py-0.5 text-[0.68rem] leading-none text-muted-foreground"
                    >
                      {option.count}
                    </span>
                  ) : null}
                  <Select.ItemIndicator className="text-nite-brand-accent">
                    <CheckIcon className="size-3.5" aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ProjectExplorerCard({ project }: { project: Project }) {
  const status = getProjectCardStatus(project);
  const cover = getProjectCover(project);

  return (
    <ProjectDiscoveryCard
      variant="catalog"
      item={{
        href: `/projetos/${project.slug}` as Route,
        title: project.title,
        summary: project.summary,
        category: project.category,
        status,
        statusLabel: statusFilterLabels[status],
        stack: project.technologies,
        cover,
      }}
    />
  );
}
