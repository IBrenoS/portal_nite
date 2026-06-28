import type { Route } from "next";
import type { ReactNode } from "react";
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
        size="sm"
        showIndicator={false}
        className="border-nite-border-subtle bg-nite-surface-subtle px-3 py-1.5 text-sm font-normal text-nite-text-secondary"
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
        className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-nite-brand-accent transition-colors hover:text-nite-text-primary focus-visible:text-nite-text-primary"
      >
        Ver projeto
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
      </Link>
    </div>
  );
}

function VisualShell({
  children,
  visual,
  className,
}: {
  children: ReactNode;
  visual: ProjectVisual;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-project-visual={visual}
      className={cn(
        "relative min-h-[23rem] overflow-hidden rounded-[0.55rem] border border-nite-border-subtle bg-nite-section shadow-[0_24px_80px_rgb(0_0_0/0.32)]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(rgb(176_199_217/0.055)_1px,transparent_1px),linear-gradient(90deg,rgb(176_199_217/0.055)_1px,transparent_1px)] before:bg-[length:2rem_2rem] before:content-['']",
        "after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_42%,rgb(0_0_0/0.45)_100%)] after:content-['']",
        className,
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function SoftwareWorkbenchVisual() {
  const files = [
    "EvidenceBoard.tsx",
    "StatusBadge.tsx",
    "EvidenceCard.tsx",
  ] as const;
  const codeLines = [
    "export function Board() {",
    "  const items = useEvidence();",
    "  return (",
    "    <section>",
    "      {items.map((item) => (",
    "        <EvidenceCard",
    "          key={item.id}",
    "          title={item.title}",
    "          status={item.status}",
    "        />",
    "      ))}",
    "    </section>",
    "  );",
    "}",
  ] as const;

  return (
    <VisualShell visual="code-workbench" className="min-h-[24rem]">
      <div className="flex h-full min-h-[24rem] flex-col">
        <div className="flex h-10 items-center gap-2 border-b border-nite-border-subtle px-4">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          data-project-code-grid=""
          className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
        >
          <div
            data-project-file-tree=""
            className="hidden border-r border-nite-border-subtle bg-black/18 p-4 font-mono text-[0.68rem] text-nite-text-muted sm:block"
          >
            <p className="mb-3 text-[0.62rem] uppercase tracking-[0.18em]">
              portal-nite
            </p>
            <div className="grid gap-2.5">
              {files.map((file, index) => (
                <div
                  key={file}
                  className={cn(
                    "rounded px-2 py-1.5",
                    index === 0
                      ? "bg-nite-brand-accent/14 text-nite-text-primary"
                      : "text-nite-text-muted",
                  )}
                >
                  {file}
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex border-b border-nite-border-subtle font-mono text-[0.66rem] text-nite-text-muted">
              <span className="border-r border-nite-border-subtle px-4 py-3 text-nite-text-primary">
                EvidenceBoard.tsx
              </span>
              <span className="px-4 py-3">EvidenceCard.tsx</span>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_8.5rem]">
              <pre className="overflow-hidden px-3 py-4 font-mono text-[0.62rem] leading-[1.8] text-nite-text-secondary sm:px-5 sm:text-[0.72rem]">
                <code>
                  {codeLines.map((line, index) => (
                    <span key={`${line}-${index}`} className="block">
                      <span className="mr-4 inline-block w-4 text-right text-nite-text-muted/70">
                        {index + 1}
                      </span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
              <div className="m-4 hidden rounded-md border border-nite-border-subtle bg-black/18 p-4 font-mono text-[0.65rem] text-nite-text-secondary sm:block">
                <p className="mb-4 uppercase tracking-[0.18em] text-nite-text-muted">
                  Status
                </p>
                <div className="grid gap-2">
                  <span className="text-nite-brand-accent">• Ativo</span>
                  <span>• Em validação</span>
                  <span>• Arquivado</span>
                </div>
                <div className="mt-8 border-t border-nite-border-subtle pt-4">
                  <p className="uppercase tracking-[0.18em] text-nite-text-muted">
                    Atualizado
                  </p>
                  <p className="mt-2 text-nite-text-primary">Hoje 10:42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function RoboticsLabVisual({ project }: { project: Project }) {
  return (
    <VisualShell visual="robotics-lab" className="min-h-[25rem]">
      <Image
        src={project.coverImage}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover opacity-70 saturate-90"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgb(5_8_11/0.3),transparent_42%,rgb(5_8_11/0.84)_100%)]" />
      <div className="absolute right-4 top-4 z-20 grid w-40 gap-3 font-mono text-[0.68rem] text-nite-text-secondary sm:right-6 sm:top-6">
        <div className="rounded-md border border-nite-border-subtle bg-black/36 p-4 backdrop-blur-md">
          <p className="mb-3 uppercase tracking-[0.18em] text-nite-text-muted">
            Dispositivos
          </p>
          <div className="grid gap-2">
            {["Arduino Uno", "Sensor Ultrassônico", "Driver Motor"].map(
              (device) => (
                <span key={device} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-nite-brand-accent" />
                  {device}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="rounded-md border border-nite-border-subtle bg-black/36 p-4 backdrop-blur-md">
          <p className="mb-3 uppercase tracking-[0.18em] text-nite-text-muted">
            Status
          </p>
          <span className="flex items-center gap-2 text-nite-brand-accent">
            <span className="size-1 rounded-full bg-current" />
            Ativo
          </span>
        </div>
      </div>
    </VisualShell>
  );
}

function AnalyticsDashboardVisual() {
  const metrics = [
    ["Registros", "12.458"],
    ["Recortes", "340"],
    ["Evidências", "1.784"],
    ["Ativos", "68%"],
  ] as const;

  return (
    <VisualShell visual="analytics-dashboard" className="min-h-[24rem] p-5">
      <div className="relative z-20 grid h-full min-h-[21.5rem] gap-5 rounded-md border border-nite-border-subtle bg-black/18 p-5 backdrop-blur-sm">
        <p className="font-mono text-[0.72rem] text-nite-text-secondary">
          Painel de análises
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="rounded-md border border-nite-border-subtle bg-black/16 p-4"
            >
              <p className="font-mono text-[0.62rem] text-nite-text-muted">
                {label}
              </p>
              <p className="mt-2 text-2xl font-medium text-nite-text-primary">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-md border border-nite-border-subtle bg-black/16 p-4">
            <p className="mb-4 font-mono text-[0.68rem] text-nite-text-secondary">
              Evidências ao longo do tempo
            </p>
            <svg viewBox="0 0 260 120" className="h-36 w-full overflow-visible">
              <g stroke="rgb(176 199 217 / 0.12)" strokeWidth="1">
                {[20, 50, 80, 110].map((y) => (
                  <line key={y} x1="0" x2="260" y1={y} y2={y} />
                ))}
              </g>
              <polyline
                fill="none"
                points="0,104 18,86 34,92 52,68 70,48 88,72 108,62 126,76 146,42 166,28 184,48 202,38 220,18 238,30 260,0"
                stroke="rgb(56 189 248)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div className="rounded-md border border-nite-border-subtle bg-black/16 p-4">
            <p className="mb-5 font-mono text-[0.68rem] text-nite-text-secondary">
              Categorias
            </p>
            <div className="flex items-center gap-5">
              <div className="size-28 rounded-full bg-[conic-gradient(from_140deg,rgb(56_189_248)_0_42%,rgb(59_130_246)_42%_70%,rgb(176_199_217/0.28)_70%_100%)] p-4">
                <div className="size-full rounded-full bg-[#05080b]" />
              </div>
              <div className="grid gap-2 font-mono text-[0.68rem] text-nite-text-secondary">
                <span>Dados 42%</span>
                <span>IA 28%</span>
                <span>Outros 30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function ProjectVisualPanel({ project }: { project: Project }) {
  const visual = projectVisual(project);

  if (visual === "robotics-lab") {
    return <RoboticsLabVisual project={project} />;
  }

  if (visual === "analytics-dashboard") {
    return <AnalyticsDashboardVisual />;
  }

  return <SoftwareWorkbenchVisual />;
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
