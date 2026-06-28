import type { Route } from "next";
import { Fragment } from "react";

import type { Project } from "@/biblioteca/esquemas";
import { Container } from "@/components/layout/container";
import { ProjectShowcaseRow } from "@/components/sections/project-showcase";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectsOperatingSectionProps = {
  projects: Project[];
};

function projectHref(project: Project) {
  return `/projetos/${project.slug}` as Route;
}

export function ProjectsOperatingSection({
  projects,
}: ProjectsOperatingSectionProps) {
  const protagonist =
    projects.find((project) => project.slug === "software-aplicado") ??
    projects[0];
  const supportingProjects = protagonist
    ? projects
        .filter((project) => project.slug !== protagonist.slug)
        .slice(0, 2)
    : [];
  const showcasedProjects = protagonist
    ? [protagonist, ...supportingProjects]
    : [];

  return (
    <section
      id="projetos"
      className="relative isolate bg-nite-background py-24 text-nite-text-primary sm:py-32 lg:py-40"
      data-projects-operating-section=""
      data-projects-layout="resend-editorial"
      data-nite-scene="inverse"
      data-surface="nite-background"
      data-testid="projects-operating-section"
    >
      <Container size="xl" className="flex flex-col gap-10 sm:gap-14">
        <div className="grid max-w-[42rem] gap-4 text-left [&_h2]:font-heading">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-nite-brand-accent">
            PROJETOS
          </p>
          <h2 className="font-heading text-[clamp(2.25rem,4vw,3.35rem)] leading-[1.08] font-semibold tracking-normal text-nite-text-primary">
            Projetos em destaque
          </h2>
          <p className="max-w-[31rem] text-base leading-7 text-nite-text-secondary">
            Acompanhe frentes, protótipos e entregas do NITE com contexto,
            status, stack e próximos passos.
          </p>
        </div>

        {showcasedProjects.length > 0 ? (
          <div className="grid">
            {showcasedProjects.map((project, index) => (
              <Fragment key={project.slug}>
                {index > 0 ? (
                  <div
                    aria-hidden="true"
                    data-project-divider=""
                    className="h-px bg-gradient-to-r from-transparent via-nite-border-subtle to-transparent"
                  />
                ) : null}
                <ProjectShowcaseRow
                  project={project}
                  href={projectHref(project)}
                  role={index === 0 ? "protagonist" : "supporting"}
                  layout={index === 1 ? "copy-first" : "visual-first"}
                />
              </Fragment>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Projetos em estruturação"
            description="As frentes do NITE serão publicadas aqui quando tiverem contexto, status e evidências aprovadas para consulta pública."
          />
        )}
      </Container>
    </section>
  );
}
