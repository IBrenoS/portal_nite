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
import { SectionHeader } from "@/components/sections/section-header";

const pageTitle = "Projetos";
const pageDescription =
  "Conheça as frentes e projetos do NITE, com status público, contexto, stack e próximos passos sem simular evidências ou resultados não validados.";

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
        <section className="py-14 sm:py-16 lg:py-20">
          <Container size="xl" className="grid gap-6">
            <SectionHeader
              as="h1"
              eyebrow="Portfólio"
              title="Projetos do NITE"
              description={pageDescription}
            />
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              As frentes em estruturação permanecem identificadas até que
              evidências públicas, responsáveis autorizados, entregáveis e
              resultados possam ser publicados com validação.
            </p>
          </Container>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="lista-projetos">
          <Container size="xl" className="grid gap-10">
            <div className="grid gap-3">
              <h2
                id="lista-projetos"
                className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
              >
                Lista de projetos
              </h2>
            </div>

            <ProjectsFilterableList projects={projects} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
