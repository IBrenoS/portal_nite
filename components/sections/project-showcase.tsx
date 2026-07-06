import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/biblioteca/esquemas";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type ProjectVisual = "code-workbench" | "robotics-lab" | "analytics-dashboard";
type ProjectLayout = "visual-first" | "copy-first";
type ProjectRole = "protagonist" | "supporting";

type ProjectShowcaseRowProps = {
  project: Project;
  href: Route;
  layout: ProjectLayout;
  role: ProjectRole;
};

const visualBySlug: Record<string, ProjectVisual> = {
  "software-aplicado": "code-workbench",
  "robotica-educacional": "robotics-lab",
  "dados-e-ia": "analytics-dashboard",
};

function projectVisual(project: Project): ProjectVisual {
  return visualBySlug[project.slug] ?? "code-workbench";
}

function ProjectTechnologyTag({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-md border border-nite-border-subtle bg-transparent px-4 py-2 text-sm leading-none text-nite-text-secondary">
      {children}
    </span>
  );
}

function ProjectCopy({ project, href }: { project: Project; href: Route }) {
  return (
    <div
      data-project-copy=""
      className="flex min-w-0 flex-col items-start justify-center gap-6"
    >
      <StatusBadge
        status="draft"
        tone="quiet"
        size="sm"
        showIndicator={false}
      />
      <div className="grid max-w-[31rem] gap-4">
        <h3 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.06] font-semibold tracking-normal text-nite-text-primary">
          {project.title}
        </h3>
        <p className="max-w-[36rem] text-base leading-7 text-nite-text-secondary">
          {project.summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {project.technologies.slice(0, 3).map((technology) => (
          <ProjectTechnologyTag key={technology}>
            {technology}
          </ProjectTechnologyTag>
        ))}
      </div>
      <Link
        href={href}
        className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-nite-brand-accent transition-colors duration-nite-micro ease-nite-out hover:text-nite-text-primary focus-visible:text-nite-text-primary"
      >
        Ver projeto
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-nite-micro ease-nite-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
      </Link>
    </div>
  );
}

function VisualShell({
  project,
  visual,
  className,
}: {
  project: Project;
  visual: ProjectVisual;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-project-visual={visual}
      className={cn(
        "relative min-h-[23rem] overflow-hidden rounded-lg border border-[var(--projects-visual-border)] bg-[var(--projects-visual-background)] shadow-nite-lift",
        "after:absolute after:inset-0 after:z-20 after:[background-image:var(--projects-visual-veil)] after:content-['']",
        className,
      )}
    >
      <Image
        src={project.coverImage}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        data-project-cover-image=""
        className="object-cover opacity-80 saturate-90"
      />
      <div
        data-project-image-overlay=""
        className="absolute inset-0 z-10 [background-image:var(--projects-image-overlay)]"
      />
    </div>
  );
}

function ProjectVisualPanel({ project }: { project: Project }) {
  const visual = projectVisual(project);
  const heightClass =
    visual === "robotics-lab" ? "min-h-[25rem]" : "min-h-[24rem]";

  return (
    <VisualShell project={project} visual={visual} className={heightClass} />
  );
}

export function ProjectShowcaseRow({
  project,
  href,
  layout,
  role,
}: ProjectShowcaseRowProps) {
  const visual = <ProjectVisualPanel project={project} />;
  const copy = <ProjectCopy project={project} href={href} />;

  return (
    <article
      data-project-showcase-row=""
      data-project-role={role}
      data-project-layout={layout}
      className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(19rem,0.42fr)] lg:items-center lg:gap-16"
    >
      {layout === "visual-first" ? (
        <>
          {visual}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {visual}
        </>
      )}
    </article>
  );
}
