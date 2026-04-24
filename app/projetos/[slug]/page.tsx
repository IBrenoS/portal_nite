import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon, SparklesIcon } from "lucide-react";

import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from "@/biblioteca/conteudo";
import { buildBreadcrumbJsonLd, buildPageTitle, buildProjectMetadata, serializeJsonLd } from "@/biblioteca/seo";
import { siteConfig } from "@/biblioteca/site-config";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/sections/project-card";
import { ButtonPrimaryLink, ButtonSecondaryLink } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import ProjectNotFound from "./not-found";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
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
          <Container className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col gap-6">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link className="rounded-md transition-colors hover:text-foreground" href="/">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link className="rounded-md transition-colors hover:text-foreground" href="/#projetos">
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
                <Chip>{project.category}</Chip>
                <Chip variant="metal">{project.year}</Chip>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-circuit-bright">
                  {siteConfig.name} / Projeto
                </p>
                <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  {project.title}
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">{project.summary}</p>
              </div>

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
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="detalhes" className="py-16 sm:py-24">
          <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="grid h-fit gap-5 rounded-lg border border-border bg-card p-5">
              <h2 className="font-heading text-lg font-semibold text-foreground">Dados do projeto</h2>
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Categoria</dt>
                  <dd className="mt-1 text-foreground">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ano</dt>
                  <dd className="mt-1 text-foreground">{project.year}</dd>
                </div>
              </dl>
            </aside>

            <div className="flex flex-col gap-10">
              <section className="grid gap-3">
                <h2 className="font-heading text-2xl font-semibold text-foreground">Descrição</h2>
                <p className="text-base leading-8 text-muted-foreground">{project.description}</p>
              </section>

              {project.highlights.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Destaques</h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.highlights.map((highlight) => (
                      <article key={highlight} className="rounded-lg border border-border bg-card p-4">
                        <p className="text-sm leading-6 text-muted-foreground">{highlight}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {project.objective ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Objetivo</h2>
                  <p className="text-base leading-8 text-muted-foreground">{project.objective}</p>
                </section>
              ) : null}

              {project.results ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Resultados</h2>
                  <p className="text-base leading-8 text-muted-foreground">{project.results}</p>
                </section>
              ) : null}

              {project.technologies.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Tecnologias</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Chip key={technology} variant="metal">
                        {technology}
                      </Chip>
                    ))}
                  </div>
                </section>
              ) : null}

              {project.team.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Equipe</h2>
                  <ul className="grid gap-2 text-base leading-7 text-muted-foreground">
                    {project.team.map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {project.gallery.length > 0 ? (
                <section className="grid gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Galeria</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((image) => (
                      <figure key={image.src} className="brand-panel overflow-hidden rounded-lg border border-border">
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
                  <h2 className="font-heading text-2xl font-semibold text-foreground">Links</h2>
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
            <Container className="grid gap-8">
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
                  <ProjectCard
                    key={relatedProject.slug}
                    title={relatedProject.title}
                    summary={relatedProject.summary}
                    category={relatedProject.category}
                    href={`/projetos/${relatedProject.slug}`}
                    year={relatedProject.year}
                    technologies={relatedProject.technologies}
                    image={{
                      src: relatedProject.coverImage,
                      alt: relatedProject.alt,
                    }}
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
