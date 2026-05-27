import type { Route } from "next";
import Image from "next/image";
import { ArrowRightIcon, ImageOffIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import {
  StatusBadge,
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
  image?: ProjectCardImage;
  hasPublicEvidence?: boolean;
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

const projectStatusLabels = {
  draft: "Em estruturação",
  in_progress: "Em andamento",
  validated: "Validado",
  done: "Finalizado",
  archived: "Arquivado",
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
  image,
  hasPublicEvidence = false,
  headingLevel = 3,
  className,
}: ProjectCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const visibleStack = stack.slice(0, 4);
  const hiddenStackCount = Math.max(stack.length - visibleStack.length, 0);
  const CardRoot = href ? LinkedProjectCardRoot : StaticProjectCardRoot;

  return (
    <CardRoot href={href} className={className}>
      <ProjectCardMedia
        image={image}
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

      <CardContent className="grid flex-1 gap-4">
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>

        <dl className="grid gap-3 text-sm">
          <div className="rounded-lg border border-border bg-background/42 p-3">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Objetivo
            </dt>
            <dd className="mt-1.5 leading-6 text-foreground">{objective}</dd>
          </div>

          <div className="rounded-lg border border-border bg-background/42 p-3">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Próximo passo
            </dt>
            <dd className="mt-1.5 leading-6 text-foreground">{nextStep}</dd>
          </div>
        </dl>

        {visibleStack.length > 0 ? (
          <div className="grid gap-2">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Stack
            </p>
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

        <p className="sr-only">Problema ou contexto: {problem}</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        {updatedAt ? (
          <p className="text-xs leading-5 text-muted-foreground">
            Última atualização: {updatedAt}
          </p>
        ) : (
          <p className="text-xs leading-5 text-muted-foreground">
            Última atualização pendente de dado validado.
          </p>
        )}

        {href ? (
          <span className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors group-hover/card:text-foreground">
            Ver projeto
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </CardFooter>
    </CardRoot>
  );
}

function LinkedProjectCardRoot({
  href,
  className,
  children,
}: {
  href?: Route | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      as="a"
      href={href ?? "#"}
      variant="interactive"
      className={cn("min-h-full rounded-lg py-0", className)}
    >
      {children}
    </Card>
  );
}

function StaticProjectCardRoot({
  className,
  children,
}: {
  href?: Route | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn("min-h-full rounded-lg py-0", className)}>
      {children}
    </Card>
  );
}

function ProjectCardMedia({
  image,
  hasPublicEvidence,
  title,
}: {
  image?: ProjectCardImage;
  hasPublicEvidence: boolean;
  title: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-brand-micro ease-brand-out group-hover/card:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/16 to-transparent" />
      </div>
    );
  }

  return (
    <div className="grid aspect-[16/9] place-items-center border-b border-border bg-muted/70 p-5 text-center">
      <div className="grid justify-items-center gap-3">
        <span
          className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
          aria-hidden="true"
        >
          <ImageOffIcon className="size-5" />
        </span>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          {hasPublicEvidence
            ? `Evidência pública sem imagem de capa para ${title}.`
            : "Imagem ou evidência pública ainda indisponível."}
        </p>
      </div>
    </div>
  );
}

export { ProjectCard, projectStatusLabels };
export type { ProjectCardProps, ProjectCardStatus };
