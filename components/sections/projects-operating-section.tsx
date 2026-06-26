import type { Route } from "next";

import type { Project } from "@/biblioteca/esquemas";
import { Container } from "@/components/layout/container";
import {
  FeaturedProjectShowcase,
  SupportingProjectModule,
} from "@/components/sections/project-showcase";
import { SectionHeader } from "@/components/sections/section-header";
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

  return (
    <section
      id="projetos"
      className="resend-dark-scene border-t border-white/8 py-24 sm:py-32 lg:py-40"
      data-projects-operating-section=""
      data-nite-scene="inverse"
      data-surface="resend-dark"
      data-testid="projects-operating-section"
    >
      <Container size="xl" className="flex flex-col gap-12 sm:gap-16">
        <SectionHeader
          className="max-w-[42rem] [&_h2]:font-resend-display [&_h2]:text-[clamp(3.25rem,6vw,5.5rem)] [&_h2]:font-normal [&_h2]:leading-[0.96] [&_p]:text-[#8a8a8a]"
          title="Projetos em destaque"
          description="Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos."
        />

        {protagonist ? (
          <div className="grid gap-5">
            <FeaturedProjectShowcase
              project={protagonist}
              href={projectHref(protagonist)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {supportingProjects.map((project) => (
                <SupportingProjectModule
                  key={project.slug}
                  project={project}
                  href={projectHref(project)}
                />
              ))}
            </div>
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
