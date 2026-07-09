import type { Metadata } from "next";
import Image from "next/image";

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
import { ProjectsPatternGridTrail } from "@/components/sections/projects-pattern-grid-trail";

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
        <section
          className="projectsPage relative isolate overflow-hidden bg-nite-background text-nite-text-primary"
          data-projects-page=""
        >
          <div className="relative mt-0 flex h-[90vh] min-h-[34rem] w-full max-w-full flex-col items-center justify-center overflow-hidden pt-16 md:h-[calc(100vh-3.75rem)] md:min-h-0">
            <ProjectsPatternGridTrail
              className="z-0"
              backgroundColor="var(--projects-hero-canvas-background)"
              circleColor="var(--projects-hero-node-color)"
              gridColor="var(--projects-hero-grid-color)"
              trailColor="var(--projects-hero-trail-color)"
            />
            <Image
              aria-hidden="true"
              alt=""
              className="pointer-events-none absolute bottom-20 left-1/2 z-[1] -translate-x-1/2 translate-y-1/3 rotate-[235deg] select-none"
              data-testid="projects-hero-light-bloom"
              height={582}
              priority
              quality={100}
              src="/images/projetos/projects-hero-light.png"
              width={868}
            />
            <div
              aria-hidden="true"
              className="projectsHeroGreenField pointer-events-none absolute inset-0 left-1/2 z-[2] h-full w-full -translate-x-1/2 md:w-[70vw]"
              data-testid="projects-hero-green-field"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 90%)",
                WebkitMaskSize: "100% 100%",
                maskImage:
                  "radial-gradient(circle, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 90%)",
                maskSize: "100% 100%",
              }}
            />

            <div
              className="relative z-10 flex w-[calc(100%-3rem)] max-w-[47.5rem] flex-col items-center justify-center gap-5 text-center md:absolute md:left-1/2 md:top-[258px] md:w-[47.5rem] md:-translate-x-1/2"
              data-testid="projects-hero-copy"
            >
              <h1
                aria-label="Ideias em movimento. Projetos em construção."
                className="font-heading text-[clamp(3.15rem,8vw,4rem)] font-semibold leading-[1] tracking-normal text-foreground"
              >
                <span className="block">Ideias em movimento.</span>
                <span className="block">Projetos em construção.</span>
              </h1>
              <p className="max-w-[34rem] text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Veja como estudantes, professores e o NITE transformam desafios
                em experiências práticas.
              </p>
            </div>
          </div>

          <Container
            size="xl"
            className="relative z-10 -mt-24 grid gap-10 pb-16 sm:pb-20 lg:-mt-[270px] lg:pb-24"
            data-testid="projects-search-panel-shell"
          >
            <ProjectsFilterableList projects={projects} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
