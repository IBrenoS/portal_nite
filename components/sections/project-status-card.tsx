import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  FlaskConicalIcon,
  Layers3Icon,
  ListChecksIcon,
  RouteIcon,
  SearchIcon,
} from "lucide-react";

import type {
  Project,
  ProjectContentState,
  ProjectStatus,
} from "@/biblioteca/esquemas";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type ProjectStatusCardProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

type StatusMeta = {
  label: string;
  shortLabel: string;
  icon: typeof CircleDashedIcon;
  className: string;
};

const statusMeta = {
  placeholder: {
    label: "Em estruturação",
    shortLabel: "Estruturação",
    icon: CircleDashedIcon,
    className: "border-white/[0.08] bg-white/[0.035] text-brand-steel",
  },
  planejado: {
    label: "Planejado",
    shortLabel: "Planejado",
    icon: ListChecksIcon,
    className: "border-brand-metal/35 bg-brand-metal/10 text-brand-metal",
  },
  "em-descoberta": {
    label: "Em descoberta",
    shortLabel: "Descoberta",
    icon: SearchIcon,
    className: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  },
  "em-prototipo": {
    label: "Em protótipo",
    shortLabel: "Protótipo",
    icon: FlaskConicalIcon,
    className: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  },
  ativo: {
    label: "Ativo",
    shortLabel: "Ativo",
    icon: RouteIcon,
    className: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  },
  concluido: {
    label: "Concluído",
    shortLabel: "Concluído",
    icon: CheckCircle2Icon,
    className: "border-violet-300/30 bg-violet-300/10 text-violet-200",
  },
} satisfies Record<ProjectStatus, StatusMeta>;

const contentStateLabels = {
  real: "Real",
  demonstrativo: "Demonstrativo",
  "em-estruturacao": "Em estruturação",
} satisfies Record<ProjectContentState, string>;

export function getProjectStatusMeta(status: ProjectStatus) {
  return statusMeta[status];
}

export function getProjectContentStateLabel(contentState: ProjectContentState) {
  return contentStateLabels[contentState];
}

export function getProjectPrimaryDeliverable(project: Project) {
  return project.deliverables.find(
    (deliverable) => deliverable.status !== "indisponivel",
  );
}

export function formatProjectDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function ProjectStatusCard({
  project,
  className,
  priority = false,
}: ProjectStatusCardProps) {
  const status = getProjectStatusMeta(project.status);
  const StatusIcon = status.icon;
  const primaryDeliverable = getProjectPrimaryDeliverable(project);
  const visibleTechnologies = project.technologies.slice(0, 3);

  return (
    <article
      className={cn(
        "group flex min-h-full flex-col overflow-hidden rounded-lg border border-white/[0.07] bg-card/66 transition-colors duration-brand-micro ease-brand-out hover:border-brand-circuit-bright/28 hover:bg-card/82",
        className,
      )}
      data-project-status-card=""
      data-project-status={project.status}
      data-content-state={project.contentState}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.07]">
        <Image
          src={project.coverImage}
          alt={project.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          className="object-cover transition-transform duration-500 ease-brand-out group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/86 via-background/18 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={cn(
              "inline-flex min-h-8 items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]",
              status.className,
            )}
          >
            <StatusIcon className="size-3.5" aria-hidden="true" />
            {status.label}
          </span>
        </div>
        <Chip variant="metal" className="absolute bottom-4 left-4">
          {getProjectContentStateLabel(project.contentState)}
        </Chip>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <Chip>{project.category}</Chip>
            <Chip variant="quiet">{project.year}</Chip>
          </div>
          <div className="grid gap-2">
            <h3 className="font-heading text-xl font-semibold leading-snug text-foreground">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {project.summary}
            </p>
          </div>
        </div>

        <dl className="grid gap-3 text-sm">
          <div className="rounded-lg border border-white/[0.06] bg-background/42 p-3">
            <dt className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-steel">
              <Layers3Icon className="size-3.5" aria-hidden="true" />
              Fase atual
            </dt>
            <dd className="mt-1.5 font-medium leading-6 text-foreground">
              {project.currentPhase}
            </dd>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-background/42 p-3">
            <dt className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-steel">
              <CalendarClockIcon className="size-3.5" aria-hidden="true" />
              Última atualização
            </dt>
            <dd className="mt-1.5 font-medium leading-6 text-foreground">
              {formatProjectDate(project.lastUpdated)}
            </dd>
          </div>
        </dl>

        <div className="grid gap-3">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-steel">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {visibleTechnologies.map((technology) => (
                <Chip key={technology} variant="metal">
                  {technology}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2 rounded-lg border border-white/[0.06] bg-background/36 p-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-steel">
              Entregável principal
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {primaryDeliverable
                ? primaryDeliverable.label
                : "Entregável em validação."}
            </p>
          </div>

          <div className="grid gap-2 rounded-lg border border-white/[0.06] bg-background/36 p-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-steel">
              Próximo passo
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {project.nextStep}
            </p>
          </div>
        </div>

        <Link
          href={`/projetos/${project.slug}` as Route}
          aria-label={`Ver projeto: ${project.title}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground"
        >
          Ver projeto
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
