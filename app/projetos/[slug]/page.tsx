import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  ExternalLinkIcon,
  UsersIcon,
} from "lucide-react";

import type { Project } from "@/biblioteca/esquemas";
import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/biblioteca/conteudo";
import {
  buildBreadcrumbJsonLd,
  buildPageTitle,
  buildProjectMetadata,
  serializeJsonLd,
} from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  RelatedProjectsDiscovery,
  type RelatedProjectDiscoveryItem,
} from "@/components/sections/related-projects-discovery";
import { buttonVariants } from "@/components/ui/button";
import { cardVariants } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import {
  StatusBadge,
  statusBadgeLabels,
  type StatusBadgeStatus,
} from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import ProjectNotFound from "./not-found";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectExternalAction = {
  label: string;
  href: string;
};

type ProjectVisual = {
  kind: "evidence" | "illustration";
  src: string;
  alt: string;
};

type ProjectStatusBadge = Extract<
  StatusBadgeStatus,
  "draft" | "in_progress" | "validated" | "done" | "archived"
>;

const deliverableStatusLabels = {
  disponivel: "Disponível",
  "em-validacao": "Em validação",
  interno: "Interno",
  indisponivel: "Indisponível",
} satisfies Record<Project["deliverables"][number]["status"], string>;

const projectStatusBadgeByProjectStatus = {
  placeholder: "draft",
  planejado: "draft",
  "em-descoberta": "in_progress",
  "em-prototipo": "in_progress",
  ativo: "in_progress",
  concluido: "done",
} satisfies Record<Project["status"], ProjectStatusBadge>;

const projectContentStateLabels = {
  real: "Real",
  demonstrativo: "Demonstrativo",
  "em-estruturacao": "Em estruturação",
} satisfies Record<Project["contentState"], string>;

const projectDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
  year: "numeric",
});

type ProjectDetailPanelProps = ComponentPropsWithoutRef<"article"> & {
  as?: "article" | "aside" | "li";
};

type ProjectDetailMediaPanelProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "figure";
};

function ProjectDetailSection({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("grid gap-5", className)} {...props} />;
}

function ProjectDetailSectionHeader({
  description,
  eyebrow,
  title,
}: {
  description?: ReactNode;
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="grid gap-3">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-nite-brand-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProjectDetailPanel({
  as: Component = "article",
  className,
  ...props
}: ProjectDetailPanelProps) {
  return (
    <Component
      className={cn(cardVariants(), "rounded-lg p-5", className)}
      {...props}
    />
  );
}

function ProjectDetailTextLink({
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-nite-brand-accent transition-colors duration-nite-micro ease-nite-out hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

function ProjectDetailMediaPanel({
  as: Component = "div",
  className,
  ...props
}: ProjectDetailMediaPanelProps) {
  return (
    <Component
      className={cn(
        "nite-panel overflow-hidden rounded-lg border border-border",
        className,
      )}
      {...props}
    />
  );
}

function getProjectContentStateLabel(contentState: Project["contentState"]) {
  return projectContentStateLabels[contentState];
}

function getProjectPrimaryDeliverable(project: Project) {
  return project.deliverables.find(
    (deliverable) => deliverable.status !== "indisponivel",
  );
}

function getProjectExternalAction(
  project: Project,
  isPublicationReady: boolean,
): ProjectExternalAction | undefined {
  if (!isPublicationReady) {
    return undefined;
  }

  const deliverable = project.deliverables.find(
    (item) => item.status === "disponivel" && item.href,
  );

  if (deliverable?.href) {
    return {
      label: `Abrir ${deliverable.label}`,
      href: deliverable.href,
    };
  }

  const link = project.links[0];

  return link
    ? {
        label: link.label,
        href: link.href,
      }
    : undefined;
}

function formatProjectDate(date: string) {
  return projectDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function isProjectPublicationReady(project: Project) {
  return project.contentState === "real";
}

function getProjectVisual(
  project: Project,
  isPublicationReady: boolean,
): ProjectVisual | undefined {
  if (isPublicationReady) {
    return {
      kind: "evidence",
      src: project.coverImage,
      alt: project.alt,
    };
  }

  return project.illustration
    ? {
        kind: "illustration",
        src: project.illustration.src,
        alt: project.illustration.alt,
      }
    : undefined;
}

function hasProjectResults(project: Project) {
  return (
    isProjectPublicationReady(project) &&
    Boolean(project.results?.trim().length)
  );
}

function getRelatedProjectDiscoveryItem(
  project: Project,
): RelatedProjectDiscoveryItem {
  const isPublicationReady = isProjectPublicationReady(project);
  const visual = getProjectVisual(project, isPublicationReady);
  const status = projectStatusBadgeByProjectStatus[project.status];

  return {
    href: `/projetos/${project.slug}` as Route,
    title: project.title,
    summary: project.summary,
    area: project.category,
    status,
    statusLabel: statusBadgeLabels[status],
    currentPhase: project.currentPhase,
    stack: project.technologies.slice(0, 3),
    visual: visual
      ? {
          src: visual.src,
          alt: visual.alt,
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: buildPageTitle("Projeto nao encontrado"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const relatedProjects = getRelatedProjects(project.slug, 10);
  const status = projectStatusBadgeByProjectStatus[project.status];
  const isPublicationReady = isProjectPublicationReady(project);
  const primaryDeliverable = isPublicationReady
    ? getProjectPrimaryDeliverable(project)
    : undefined;
  const externalAction = getProjectExternalAction(project, isPublicationReady);
  const publicTeam = isPublicationReady
    ? project.team.filter((member) => member.public)
    : [];
  const hasDeliverables = isPublicationReady && project.deliverables.length > 0;
  const hasMetrics = isPublicationReady && project.metrics.length > 0;
  const hasChangelog = isPublicationReady && project.changelog.length > 0;
  const hasResults = hasProjectResults(project);
  const hasGallery = isPublicationReady && project.gallery.length > 0;
  const hasLinks = isPublicationReady && project.links.length > 0;
  const hasEvidence =
    hasDeliverables ||
    hasMetrics ||
    hasChangelog ||
    hasResults ||
    hasGallery ||
    hasLinks;
  const projectVisual = getProjectVisual(project, isPublicationReady);
  const lastUpdatedLabel = isPublicationReady
    ? formatProjectDate(project.lastUpdated)
    : "Pendente de validação pública";
  const objectiveText =
    project.objective ??
    "Objetivo em validação editorial antes de publicação pública.";
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Projetos", path: "/#projetos" },
    { name: project.title, path: `/projetos/${project.slug}` },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal">
        <section className="py-12 sm:py-16 lg:py-20">
          <Container
            size="xl"
            className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr]"
          >
            <div className="flex flex-col gap-6">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      className="rounded-md transition-colors hover:text-foreground"
                      href="/"
                    >
                      Início
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      className="rounded-md transition-colors hover:text-foreground"
                      href="/#projetos"
                    >
                      Projetos
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-foreground">
                    {project.title}
                  </li>
                </ol>
              </nav>

              <div className="flex flex-wrap gap-2">
                <StatusBadge status={status} size="sm" />
                <Chip variant="metal">
                  {getProjectContentStateLabel(project.contentState)}
                </Chip>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
                  {siteConfig.name} / Acompanhamento público
                </p>
                <h1 className="max-w-3xl text-wrap font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {externalAction ? (
                  <a
                    href={externalAction.href}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "lg" }),
                      "w-fit",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {externalAction.label}
                    <ExternalLinkIcon data-icon="inline-end" />
                  </a>
                ) : null}
                <Link
                  href="/#projetos"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-fit",
                  )}
                >
                  <ArrowLeftIcon data-icon="inline-start" />
                  Voltar para projetos
                </Link>
              </div>
            </div>

            <ProjectDetailMediaPanel className="!shadow-none">
              {projectVisual ? (
                <div
                  className="relative aspect-[16/10] bg-muted"
                  data-visual-kind={projectVisual.kind}
                >
                  <Image
                    src={projectVisual.src}
                    alt={projectVisual.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <EmptyState
                  className="min-h-full rounded-none border-0 bg-transparent"
                  title="Imagem ou evidência pública ainda indisponível."
                  description="Esta frente está em estruturação editorial. Quando houver imagem, registro ou evidência pública validada, o material será exibido aqui."
                />
              )}
            </ProjectDetailMediaPanel>
          </Container>
        </section>

        <section id="detalhes" className="py-16 sm:py-24">
          <Container
            size="xl"
            className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]"
          >
            <ProjectDetailPanel
              as="aside"
              className="grid h-fit gap-5 lg:sticky lg:top-28"
              aria-label="Painel de acompanhamento do projeto"
            >
              <div className="grid gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-nite-brand-accent">
                  Acompanhamento
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Leitura rápida de estado, fase e próximos passos publicados.
                </p>
              </div>
              <dl className="grid gap-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={status} variant="outline" size="sm" />
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Área</dt>
                  <dd className="mt-1 text-foreground">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Fase atual</dt>
                  <dd className="mt-1 text-foreground">
                    {project.currentPhase}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Última atualização</dt>
                  <dd className="mt-1 text-foreground">{lastUpdatedLabel}</dd>
                </div>
                {project.audience.length > 0 ? (
                  <div>
                    <dt className="text-muted-foreground">Público impactado</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.audience.map((audience) => (
                        <Chip key={audience} variant="quiet">
                          {audience}
                        </Chip>
                      ))}
                    </dd>
                  </div>
                ) : null}
                {project.technologies.length > 0 ? (
                  <div>
                    <dt className="text-muted-foreground">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <Chip key={technology} variant="metal">
                          {technology}
                        </Chip>
                      ))}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-muted-foreground">Próximo passo</dt>
                  <dd className="mt-2 leading-6 text-foreground">
                    {project.nextStep}
                  </dd>
                </div>
              </dl>
            </ProjectDetailPanel>

            <div className="flex flex-col gap-12">
              <ProjectDetailSection>
                <ProjectDetailSectionHeader
                  eyebrow="Frente em acompanhamento"
                  title="O que está sendo construído"
                  description={project.description}
                />

                {project.highlights.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.highlights.map((highlight) => (
                      <ProjectDetailPanel key={highlight} className="p-4">
                        <p className="text-sm leading-6 text-muted-foreground">
                          {highlight}
                        </p>
                      </ProjectDetailPanel>
                    ))}
                  </div>
                ) : null}
              </ProjectDetailSection>

              <ProjectDetailSection>
                <ProjectDetailSectionHeader
                  title="Sobre esta frente"
                  description="O contexto principal fica agrupado para explicar por que a frente existe e o que ela tenta validar agora."
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <ProjectDetailPanel>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Desafio
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.problem}
                    </p>
                  </ProjectDetailPanel>
                  <ProjectDetailPanel>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Contexto
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.context}
                    </p>
                  </ProjectDetailPanel>
                  <ProjectDetailPanel>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Objetivo atual
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {objectiveText}
                    </p>
                  </ProjectDetailPanel>
                </div>
              </ProjectDetailSection>

              <ProjectDetailSection>
                <ProjectDetailSectionHeader
                  title="O que está sendo feito agora"
                  description="A página acompanha a próxima ação pública da frente sem sugerir entregáveis que ainda não foram validados."
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectDetailPanel>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Objetivo de trabalho
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {objectiveText}
                    </p>
                  </ProjectDetailPanel>
                  <ProjectDetailPanel>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Próxima movimentação
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.nextStep}
                    </p>
                  </ProjectDetailPanel>
                  <ProjectDetailPanel className="md:col-span-2">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Entregável em desenvolvimento
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {primaryDeliverable
                        ? primaryDeliverable.label
                        : "Nenhum entregável público foi validado para esta frente ainda."}
                    </p>
                  </ProjectDetailPanel>
                </div>
              </ProjectDetailSection>

              <ProjectDetailSection>
                <ProjectDetailSectionHeader
                  title="Registros e evidências"
                  description="Esta área concentra o que já pode ser conferido publicamente: fotos, entregáveis, métricas, registros e materiais externos."
                />

                {hasEvidence ? (
                  <div className="grid gap-6">
                    {hasResults ? (
                      <ProjectDetailPanel>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Resultado publicado
                        </h3>
                        <p className="mt-3 text-base leading-8 text-muted-foreground">
                          {project.results}
                        </p>
                      </ProjectDetailPanel>
                    ) : null}

                    {hasGallery ? (
                      <section className="grid gap-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Fotografias e materiais
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {project.gallery.map((image) => (
                            <ProjectDetailMediaPanel
                              as="figure"
                              key={image.src}
                            >
                              <div className="relative aspect-[16/10]">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 520px"
                                  className="object-cover"
                                />
                              </div>
                            </ProjectDetailMediaPanel>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {hasDeliverables ? (
                      <section className="grid gap-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Entregáveis
                        </h3>
                        <div className="grid gap-3">
                          {project.deliverables.map((deliverable) => (
                            <ProjectDetailPanel
                              key={`${deliverable.type}-${deliverable.label}`}
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="font-heading text-lg font-semibold text-foreground">
                                    {deliverable.label}
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {
                                      deliverableStatusLabels[
                                        deliverable.status
                                      ]
                                    }
                                  </p>
                                </div>
                                {deliverable.href ? (
                                  <ProjectDetailTextLink
                                    href={deliverable.href}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Abrir entregável {deliverable.label}
                                    <ExternalLinkIcon
                                      className="size-4"
                                      aria-hidden="true"
                                    />
                                  </ProjectDetailTextLink>
                                ) : null}
                              </div>
                            </ProjectDetailPanel>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {hasMetrics ? (
                      <section className="grid gap-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Métricas
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {project.metrics.map((metric) => (
                            <ProjectDetailPanel
                              key={`${metric.label}-${metric.value}`}
                            >
                              <p className="font-heading text-2xl font-semibold text-foreground">
                                {metric.value}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {metric.label}
                              </p>
                              {metric.source ? (
                                <p className="mt-3 text-xs text-muted-foreground">
                                  Fonte: {metric.source}
                                </p>
                              ) : null}
                            </ProjectDetailPanel>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {hasChangelog ? (
                      <section className="grid gap-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Registros
                        </h3>
                        <ol className="grid gap-3">
                          {project.changelog.map((entry) => (
                            <ProjectDetailPanel
                              as="li"
                              key={`${entry.date}-${entry.title}`}
                            >
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <CalendarClockIcon
                                  className="size-4"
                                  aria-hidden="true"
                                />
                                {formatProjectDate(entry.date)}
                              </div>
                              <p className="mt-3 font-heading text-lg font-semibold text-foreground">
                                {entry.title}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {entry.description}
                              </p>
                            </ProjectDetailPanel>
                          ))}
                        </ol>
                      </section>
                    ) : null}

                    {hasLinks ? (
                      <section className="grid gap-3">
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Links públicos
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link) => (
                            <ProjectDetailTextLink
                              key={link.href}
                              href={link.href}
                              className="min-h-11 border border-border px-3 py-2"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {link.label}
                              <ExternalLinkIcon
                                className="size-4"
                                aria-hidden="true"
                              />
                            </ProjectDetailTextLink>
                          ))}
                        </div>
                      </section>
                    ) : null}
                  </div>
                ) : (
                  <EmptyState
                    title="Evidências públicas em validação"
                    description="Fotos, entregáveis, métricas, registros e links só aparecem quando o conteúdo estiver validado para publicação."
                  />
                )}
              </ProjectDetailSection>

              <ProjectDetailSection>
                <ProjectDetailSectionHeader
                  title="Quem está construindo"
                  description="Participantes e colaborações aparecem apenas quando houver autorização e contexto público suficiente."
                />
                {publicTeam.length > 0 ? (
                  <ul className="grid gap-3">
                    {publicTeam.map((member) => (
                      <ProjectDetailPanel
                        as="li"
                        key={`${member.name}-${member.role}`}
                        className="flex-row items-start gap-3 p-4"
                      >
                        <UsersIcon
                          className="mt-0.5 size-4 text-nite-brand-accent"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {member.name}
                          </p>
                          <p className="mt-1 text-sm capitalize text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </ProjectDetailPanel>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    title="Equipe pública em validação"
                    description="Nomes e grupos só serão exibidos quando houver autorização e contexto público suficiente."
                  />
                )}
              </ProjectDetailSection>
            </div>
          </Container>
        </section>

        {relatedProjects.length > 0 ? (
          <RelatedProjectsDiscovery
            projects={relatedProjects.map(getRelatedProjectDiscoveryItem)}
          />
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
