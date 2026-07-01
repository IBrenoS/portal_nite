import type { Metadata } from "next";

import { getProjects } from "@/biblioteca/conteudo";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  defaultMetadata,
  serializeJsonLd,
} from "@/biblioteca/seo";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectsFilterableList } from "@/components/sections/projects-filterable-list";

const pageTitle = "Projetos";
const pageDescription =
  "Encontre iniciativas, pesquisas, protótipos e soluções do NITE em um catálogo com busca, filtros por status, tecnologia, área e ano.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/projetos"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/projetos"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Projetos", path: "/projetos" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-projects-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main id="conteudo-principal">
        <section className="py-16 sm:py-20 lg:py-24">
          <Container size="xl" className="grid gap-10">
            <div className="grid max-w-[46rem] gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
                Explorer
              </p>
              <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Projetos
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Encontre iniciativas, pesquisas, protótipos e soluções do NITE.
              </p>
            </div>
            <ProjectsFilterableList projects={projects} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
