import type { Route } from "next";
import Image from "next/image";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import {
  DomainCardCta,
  DomainCardMediaFallback,
  DomainCardRoot,
  MetadataPanel,
} from "@/components/ui/domain-card";
import {
  StatusBadge,
  statusBadgeLabels,
  type StatusBadgeStatus,
} from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type ProjectCardStatus = Extract<
  StatusBadgeStatus,
  "draft" | "in_progress" | "validated" | "done" | "archived"
>;

type ProjectCardImage = {
  src: string;
  alt: string;
};

type ProjectCardVisual = ProjectCardImage & {
  kind: "evidence" | "illustration";
};

type ProjectCardProps = {
  title: string;
  summary: string;
  area: string;
  status: ProjectCardStatus;
  problem: string;
  objective: string;
  stack: readonly string[];
  nextStep: string;
  updatedAt?: string;
  href?: Route | string;
  visual?: ProjectCardVisual;
  hasPublicEvidence?: boolean;
  density?: "standard" | "compact";
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

const projectStatusLabels = {
  draft: statusBadgeLabels.draft,
  in_progress: statusBadgeLabels.in_progress,
  validated: statusBadgeLabels.validated,
  done: statusBadgeLabels.done,
  archived: statusBadgeLabels.archived,
} satisfies Record<ProjectCardStatus, string>;

function ProjectCard({
  title,
  summary,
  area,
  status,
  problem,
  objective,
  stack,
  nextStep,
  updatedAt,
  href,
  visual,
  hasPublicEvidence = false,
  density = "standard",
  headingLevel = 3,
  className,
}: ProjectCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const isCompact = density === "compact";
  const visibleStack = stack.slice(0, isCompact ? 3 : 4);
  const hiddenStackCount = Math.max(stack.length - visibleStack.length, 0);

  return (
    <DomainCardRoot
      component="project-card"
      href={href}
      className={cn(
        "bg-card/70 shadow-[0_18px_48px_rgb(0_0_0/0.16)] hover:shadow-nite-lift",
        isCompact && "gap-3",
        className,
      )}
    >
      <ProjectCardMedia
        visual={visual}
        hasPublicEvidence={hasPublicEvidence}
        title={title}
      />

      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>{area}</Chip>
          <StatusBadge
            status={status}
            label={projectStatusLabels[status]}
            size="sm"
          />
        </div>

        <CardTitle>
          <Heading className="font-heading text-xl font-semibold leading-snug text-foreground">
            {title}
          </Heading>
        </CardTitle>
      </CardHeader>

      <CardContent className={cn("grid flex-1 gap-4", isCompact && "gap-3")}>
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>

        {!isCompact ? (
          <dl className="grid gap-3 text-sm">
            <MetadataPanel>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                Objetivo
              </dt>
              <dd className="mt-1.5 leading-6 text-foreground">{objective}</dd>
            </MetadataPanel>

            <MetadataPanel>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                Próximo passo
              </dt>
              <dd className="mt-1.5 leading-6 text-foreground">{nextStep}</dd>
            </MetadataPanel>
          </dl>
        ) : null}

        {visibleStack.length > 0 ? (
          <div className="grid gap-2">
            {!isCompact ? (
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                Stack
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {visibleStack.map((technology) => (
                <Chip key={technology} variant="metal">
                  {technology}
                </Chip>
              ))}
              {hiddenStackCount > 0 ? (
                <Chip variant="quiet">+{hiddenStackCount}</Chip>
              ) : null}
            </div>
          </div>
        ) : null}

        {!isCompact ? (
          <p className="sr-only">Problema ou contexto: {problem}</p>
        ) : null}
      </CardContent>

      <CardFooter
        className={cn(
          "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between",
          isCompact && "justify-end",
        )}
      >
        {!isCompact ? (
          updatedAt ? (
            <p className="text-xs leading-5 text-muted-foreground">
              Última atualização: {updatedAt}
            </p>
          ) : (
            <p className="text-xs leading-5 text-muted-foreground">
              Última atualização pendente de dado validado.
            </p>
          )
        ) : null}

        {href ? (
          <DomainCardCta>Ver projeto</DomainCardCta>
        ) : null}
      </CardFooter>
    </DomainCardRoot>
  );
}

function ProjectCardMedia({
  visual,
  hasPublicEvidence,
  title,
}: {
  visual?: ProjectCardVisual;
  hasPublicEvidence: boolean;
  title: string;
}) {
  if (visual) {
    const label = visual.kind === "evidence" ? "Evidência pública" : null;

    return (
      <div
        className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted"
        data-visual-kind={visual.kind}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-nite-micro ease-nite-out group-hover/card:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/16 to-transparent" />
        {label ? (
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/78 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-foreground backdrop-blur">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <DomainCardMediaFallback slot="project-card-media-fallback">
      {hasPublicEvidence
        ? `Evidência pública sem imagem de capa para ${title}.`
        : "Imagem ou evidência pública ainda indisponível."}
    </DomainCardMediaFallback>
  );
}

export { ProjectCard, projectStatusLabels };
export type { ProjectCardProps, ProjectCardStatus, ProjectCardVisual };
