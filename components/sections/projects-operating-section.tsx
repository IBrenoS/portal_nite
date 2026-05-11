import type { Project } from "@/biblioteca/esquemas";
import { Container } from "@/components/layout/container";
import { ProjectStatusCard } from "@/components/sections/project-status-card";
import { SectionHeader } from "@/components/sections/section-header";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectsOperatingSectionProps = {
  projects: Project[];
};

export function ProjectsOperatingSection({
  projects,
}: ProjectsOperatingSectionProps) {
  return (
    <section
      id="projetos"
      className="py-16 sm:py-24 lg:py-28"
      data-projects-operating-section=""
      data-surface="grid"
      data-testid="projects-operating-section"
    >
      <Container size="xl" className="flex flex-col gap-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(22rem,34rem)_minmax(0,1fr)] lg:items-end">
          <SectionHeader
            eyebrow="Projetos"
            title="Projetos em movimento"
            description="Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos."
          />
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            Projetos em estruturação permanecem sinalizados até que existam
            evidências públicas, entregáveis reais e contexto validado para
            publicação.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectStatusCard
                key={project.slug}
                project={project}
                priority={index === 0}
              />
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
