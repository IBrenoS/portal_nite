import type { Project } from "@/biblioteca/esquemas";
import { Container } from "@/components/layout/container";
import {
  ProjectCard,
  type ProjectCardStatus,
  type ProjectCardVisual,
} from "@/components/sections/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectsOperatingSectionProps = {
  projects: Project[];
};

const projectCardStatusByProjectStatus = {
  placeholder: "draft",
  planejado: "draft",
  "em-descoberta": "in_progress",
  "em-prototipo": "in_progress",
  ativo: "in_progress",
  concluido: "done",
} satisfies Record<Project["status"], ProjectCardStatus>;

const publicationReadyContentStates = new Set<Project["contentState"]>([
  "real",
]);

const projectDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
  year: "numeric",
});

function getProjectVisual(
  project: Project,
  isPublicationReady: boolean,
): ProjectCardVisual | undefined {
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

export function ProjectsOperatingSection({
  projects,
}: ProjectsOperatingSectionProps) {
  return (
    <section
      id="projetos"
      className="py-16 sm:py-24 lg:py-28"
      data-projects-operating-section=""
      data-surface="clean"
      data-testid="projects-operating-section"
    >
      <Container size="xl" className="flex flex-col gap-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(22rem,34rem)_minmax(0,1fr)] lg:items-end">
          <SectionHeader
            className="lg:pl-16"
            eyebrow="Projetos"
            title="Projetos em destaque"
            description="Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos."
          />
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => {
              const isPublicationReady = publicationReadyContentStates.has(
                project.contentState,
              );
              const hasPublicEvidence =
                isPublicationReady &&
                (project.deliverables.some(
                  (deliverable) =>
                    deliverable.status === "disponivel" &&
                    Boolean(deliverable.href),
                ) ||
                  project.gallery.length > 0 ||
                  project.links.length > 0);

              return (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  summary={project.summary}
                  area={project.category}
                  status={projectCardStatusByProjectStatus[project.status]}
                  problem={project.problem}
                  objective={
                    project.objective ??
                    "Objetivo em validação editorial antes de publicação pública."
                  }
                  stack={project.technologies}
                  nextStep={project.nextStep}
                  updatedAt={
                    isPublicationReady
                      ? projectDateFormatter.format(
                          new Date(`${project.lastUpdated}T00:00:00Z`),
                        )
                      : undefined
                  }
                  href={`/projetos/${project.slug}`}
                  visual={getProjectVisual(project, isPublicationReady)}
                  hasPublicEvidence={hasPublicEvidence}
                  density="compact"
                  headingLevel={3}
                />
              );
            })}
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
