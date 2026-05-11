import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  ExternalLinkIcon,
  SparklesIcon,
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
  formatProjectDate,
  getProjectContentStateLabel,
  getProjectPrimaryDeliverable,
  getProjectStatusMeta,
  ProjectStatusCard,
} from "@/components/sections/project-status-card";
import {
  ButtonPrimaryLink,
  ButtonSecondaryLink,
} from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import ProjectNotFound from "./not-found";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const deliverableStatusLabels = {
  disponivel: "Disponível",
  "em-validacao": "Em validação",
  interno: "Interno",
  indisponivel: "Indisponível",
} satisfies Record<Project["deliverables"][number]["status"], string>;

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

  const relatedProjects = getRelatedProjects(project.slug);
  const status = getProjectStatusMeta(project.status);
  const StatusIcon = status.icon;
  const primaryDeliverable = getProjectPrimaryDeliverable(project);
  const publicTeam = project.team.filter((member) => member.public);
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
        <section className="border-b border-border py-12 sm:py-16 lg:py-20">
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
                <span
                  className={`inline-flex min-h-8 items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] ${status.className}`}
                >
                  <StatusIcon className="size-3.5" aria-hidden="true" />
                  {status.label}
                </span>
                <Chip>{project.category}</Chip>
                <Chip variant="metal">
                  {getProjectContentStateLabel(project.contentState)}
                </Chip>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  {siteConfig.name} / Projeto
                </p>
                <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  {project.title}
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              {project.contentNotice ? (
                <p className="rounded-lg border border-white/[0.07] bg-card/58 p-4 text-sm leading-6 text-muted-foreground">
                  {project.contentNotice}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonPrimaryLink href="#detalhes" className="w-fit">
                  Ver detalhes
                  <SparklesIcon data-icon="inline-end" />
                </ButtonPrimaryLink>
                <ButtonSecondaryLink href="/#projetos" className="w-fit">
                  <ArrowLeftIcon data-icon="inline-start" />
                  Voltar para projetos
                </ButtonSecondaryLink>
              </div>
            </div>

            <div className="brand-panel overflow-hidden rounded-lg border border-border">
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.coverImage}
                  alt={project.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="detalhes" className="py-16 sm:py-24">
          <Container
            size="xl"
            className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]"
          >
            <aside className="grid h-fit gap-5 rounded-lg border border-border bg-card p-5 lg:sticky lg:top-28">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Dados do projeto
              </h2>
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="mt-1 text-foreground">{status.label}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Fase atual</dt>
                  <dd className="mt-1 text-foreground">
                    {project.currentPhase}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Última atualização</dt>
                  <dd className="mt-1 text-foreground">
                    {formatProjectDate(project.lastUpdated)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Categoria</dt>
                  <dd className="mt-1 text-foreground">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ano</dt>
                  <dd className="mt-1 text-foreground">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">
                    Entregável principal
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {primaryDeliverable
                      ? primaryDeliverable.label
                      : "Entregável em validação"}
                  </dd>
                </div>
              </dl>
            </aside>

            <div className="flex flex-col gap-10">
              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Descrição
                </h2>
                <p className="text-base leading-8 text-muted-foreground">
                  {project.description}
                </p>
              </section>

              <section className="grid gap-4">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Problema e contexto
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-lg border border-border bg-card p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Problema
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.problem}
                    </p>
                  </article>
                  <article className="rounded-lg border border-border bg-card p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Contexto
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.context}
                    </p>
                  </article>
                </div>
              </section>

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Público envolvido
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.audience.map((audience) => (
                    <Chip key={audience} variant="quiet">
                      {audience}
                    </Chip>
                  ))}
                </div>
              </section>

              {project.highlights.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Destaques
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.highlights.map((highlight) => (
                      <article
                        key={highlight}
                        className="rounded-lg border border-border bg-card p-4"
                      >
                        <p className="text-sm leading-6 text-muted-foreground">
                          {highlight}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Próximo passo
                </h2>
                <div className="rounded-lg border border-border bg-card p-5">
                  <p className="text-base leading-8 text-muted-foreground">
                    {project.nextStep}
                  </p>
                </div>
              </section>

              {project.technologies.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Chip key={technology} variant="metal">
                        {technology}
                      </Chip>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Entregáveis
                </h2>
                {project.deliverables.length > 0 ? (
                  <div className="grid gap-3">
                    {project.deliverables.map((deliverable) => (
                      <article
                        key={`${deliverable.type}-${deliverable.label}`}
                        className="rounded-lg border border-border bg-card p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {deliverable.label}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {deliverableStatusLabels[deliverable.status]}
                            </p>
                          </div>
                          {deliverable.href ? (
                            <a
                              href={deliverable.href}
                              className="inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Abrir
                              <ExternalLinkIcon
                                className="size-4"
                                aria-hidden="true"
                              />
                            </a>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="Entregável em validação"
                    description="Nenhum entregável público foi associado a esta frente. Quando houver material aprovado, ele será exibido aqui sem link falso."
                  />
                )}
              </section>

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Evidências e métricas
                </h2>
                {project.metrics.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <article
                        key={`${metric.label}-${metric.value}`}
                        className="rounded-lg border border-border bg-card p-5"
                      >
                        <p className="font-heading text-2xl font-semibold text-foreground">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {metric.label}
                        </p>
                        {metric.source ? (
                          <p className="mt-3 text-xs text-brand-steel">
                            Fonte: {metric.source}
                          </p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="Evidências em estruturação"
                    description="Métricas e resultados só serão publicados quando houver fonte validada. Esta página não inventa números."
                  />
                )}
              </section>

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Equipe pública
                </h2>
                {publicTeam.length > 0 ? (
                  <ul className="grid gap-3">
                    {publicTeam.map((member) => (
                      <li
                        key={`${member.name}-${member.role}`}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                      >
                        <UsersIcon
                          className="mt-0.5 size-4 text-brand-circuit-bright"
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
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    title="Equipe pública em validação"
                    description="Nomes e grupos só serão exibidos quando houver autorização e contexto público suficiente."
                  />
                )}
              </section>

              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Changelog
                </h2>
                {project.changelog.length > 0 ? (
                  <ol className="grid gap-3">
                    {project.changelog.map((entry) => (
                      <li
                        key={`${entry.date}-${entry.title}`}
                        className="rounded-lg border border-border bg-card p-5"
                      >
                        <div className="flex flex-wrap items-center gap-2 text-sm text-brand-steel">
                          <CalendarClockIcon
                            className="size-4"
                            aria-hidden="true"
                          />
                          {formatProjectDate(entry.date)}
                        </div>
                        <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                          {entry.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {entry.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <EmptyState
                    title="Changelog em estruturação"
                    description="As evoluções públicas serão registradas quando houver mudança validada no projeto."
                  />
                )}
              </section>

              {project.objective ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Objetivo
                  </h2>
                  <p className="text-base leading-8 text-muted-foreground">
                    {project.objective}
                  </p>
                </section>
              ) : null}

              {project.results ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Resultados
                  </h2>
                  <p className="text-base leading-8 text-muted-foreground">
                    {project.results}
                  </p>
                </section>
              ) : null}

              {project.gallery.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Galeria
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((image) => (
                      <figure
                        key={image.src}
                        className="brand-panel overflow-hidden rounded-lg border border-border"
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
                      </figure>
                    ))}
                  </div>
                </section>
              ) : null}

              {project.links.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Links
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                        <ExternalLinkIcon aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </Container>
        </section>

        {relatedProjects.length > 0 ? (
          <section className="border-t border-border py-16 sm:py-24">
            <Container size="xl" className="grid gap-8">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  Projetos relacionados
                </p>
                <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  Continue explorando os projetos do NITE.
                </h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <ProjectStatusCard
                    key={relatedProject.slug}
                    project={relatedProject}
                  />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
