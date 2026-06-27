import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/biblioteca/esquemas";
import { Chip } from "@/components/ui/chip";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type ProjectShowcaseProps = {
  project: Project;
  href: Route;
};

function ProjectShowcaseMeta({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge
          status="draft"
          size="sm"
          className="border-nite-border-subtle bg-nite-surface-subtle text-nite-text-secondary"
        />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-nite-text-muted">
          {project.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((technology) => (
          <Chip
            key={technology}
            variant="quiet"
            className="min-h-6 border-nite-border-subtle bg-transparent px-2.5 py-1 text-[0.65rem] text-nite-text-secondary"
          >
            {technology}
          </Chip>
        ))}
      </div>
    </>
  );
}

function SoftwareInterfaceVisual() {
  const logs = [
    ["POST", "/api/context", "200"],
    ["GET", "/api/evidence", "200"],
    ["POST", "/api/records", "201"],
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="grid min-h-[22rem] gap-4 bg-nite-section p-5 sm:grid-cols-[1.15fr_0.85fr] sm:p-8"
    >
      <div className="overflow-hidden rounded-xl border border-nite-border-subtle bg-nite-background">
        <div className="flex gap-4 border-b border-nite-border-subtle px-4 py-3 font-mono text-[0.65rem] text-nite-text-muted">
          <span>routes.ts</span>
          <span>events.ts</span>
          <span>tests.ts</span>
        </div>
        <pre className="overflow-hidden p-5 font-mono text-xs leading-6 text-nite-text-secondary">
          <code>{`export async function publish(context) {
  const evidence = await validate(context)
  return registry.create({
    context,
    evidence,
    state: "structured"
  })
}`}</code>
        </pre>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-nite-border-subtle bg-nite-surface-subtle p-5">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-nite-text-muted">
            Activity
          </p>
          <div className="mt-5 grid gap-3">
            {logs.map(([method, path, status]) => (
              <div
                key={path}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-nite-border-subtle pb-3 font-mono text-[0.68rem]"
              >
                <span className="text-nite-text-muted">{method}</span>
                <span className="text-nite-text-secondary">{path}</span>
                <span className="text-status-done">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-nite-border-strong to-transparent" />
      </div>
    </div>
  );
}

export function FeaturedProjectShowcase({
  project,
  href,
}: ProjectShowcaseProps) {
  return (
    <article
      data-project-role="protagonist"
      className="overflow-hidden rounded-[1.35rem] border border-nite-border-subtle bg-nite-section"
    >
      <SoftwareInterfaceVisual />
      <div className="grid gap-6 border-t border-nite-border-subtle p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid max-w-[46rem] gap-4">
          <ProjectShowcaseMeta project={project} />
          <h3 className="text-2xl font-medium text-nite-text-primary sm:text-3xl">
            {project.title}
          </h3>
          <p className="max-w-[42rem] text-sm leading-6 text-nite-text-secondary sm:text-base sm:leading-7">
            {project.summary}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-nite-text-primary transition-opacity hover:opacity-70"
        >
          Ver projeto
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function SupportingProjectModule({
  project,
  href,
  className,
}: ProjectShowcaseProps & { className?: string }) {
  const visual = project.illustration ?? {
    alt: project.alt,
    src: project.coverImage,
  };

  return (
    <article
      data-project-role="supporting"
      className={cn(
        "overflow-hidden rounded-[1.35rem] border border-nite-border-subtle bg-nite-section",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-nite-border-subtle bg-nite-section">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale contrast-110 brightness-[0.58]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--nite-section)_100%)]" />
      </div>
      <div className="grid gap-4 p-6 sm:p-7">
        <ProjectShowcaseMeta project={project} />
        <h3 className="text-xl font-medium text-nite-text-primary sm:text-2xl">
          {project.title}
        </h3>
        <p className="text-sm leading-6 text-nite-text-secondary">
          {project.summary}
        </p>
        <Link
          href={href}
          className="mt-2 inline-flex min-h-10 w-fit items-center gap-2 text-sm font-medium text-nite-text-primary transition-opacity hover:opacity-70"
        >
          Ver projeto
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
