# Home Método e Projetos Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o redesign aprovado de `Método aplicado` e `Projetos em destaque`, reproduzindo a linguagem visual monocromática da Resend sem reutilizar seus ativos ou renomear conteúdo em estruturação.

**Architecture:** As duas seções serão cenas escuras isoladas dentro da home. O método combina um ativo raster 3D exclusivo, um canvas 2D decorativo e controles HTML acessíveis; os projetos usam componentes próprios da home, com um protagonista selecionado por slug e dois módulos de apoio, sem alterar o `ProjectCard` usado em outras páginas.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Canvas 2D, Testing Library, Vitest, Chrome extension para QA visual.

---

## File Map

**Create**

- `public/images/metodo/method-applied-icon.png`
  - Ativo 3D exclusivo da seção de método.
- `components/sections/method-feature-icon.tsx`
  - Renderiza o ativo 3D e controla o movimento reduzido.
- `components/sections/method-system-canvas.tsx`
  - Renderiza grade, rotas, trilhas e pulsos no canvas 2D.
- `components/sections/project-showcase.tsx`
  - Contém `FeaturedProjectShowcase` e `SupportingProjectModule`.
- `tests/unit/projects-operating-section.test.tsx`
  - Garante que o protagonista é selecionado pelo slug.

**Modify**

- `app/layout.tsx`
  - Carrega a fonte editorial legal equivalente.
- `app/globals.css`
  - Expõe `font-resend-display` e tokens locais das duas seções.
- `components/sections/builds-section.tsx`
  - Aplica a composição centralizada com ícone, título e canvas.
- `components/sections/builds-cards-grid.tsx`
  - Torna-se o controlador acessível dos quatro estágios.
- `components/sections/projects-operating-section.tsx`
  - Substitui três cards equivalentes pela hierarquia protagonista + apoio.
- `tests/unit/home-page.test.tsx`
  - Atualiza o contrato estrutural e interativo da home.

**Preserve**

- `components/sections/project-card.tsx`
  - Continua atendendo outras superfícies.
- `conteudo/projetos/projetos.json`
  - Nomes, resumos, tecnologias, slugs e estados não mudam.
- `app/globals.css` light-mode changes already present
  - Não reverter nem remodelar alterações preexistentes fora das duas cenas.

---

### Task 1: Lock the New Home Contract With Failing Tests

**Files:**

- Modify: `tests/unit/home-page.test.tsx`
- Create: `tests/unit/projects-operating-section.test.tsx`

- [ ] **Step 1: Replace the old method assertions**

No teste principal da home, substitua as asserções do layout antigo por:

```tsx
const buildsSection = screen.getByTestId("builds-section");
const builds = within(buildsSection);

expect(buildsSection).toHaveAttribute("id", "metodo");
expect(buildsSection).toHaveAttribute("data-nite-scene", "inverse");
expect(builds.getByRole("heading", { level: 2 })).toHaveTextContent(
  "Método aplicado",
);
expect(
  builds.getByText(
    "O NITE organiza desafios acadêmicos em recortes, protótipos e registros públicos.",
  ),
).toBeInTheDocument();
expect(
  buildsSection.querySelector("[data-component='method-feature-icon']"),
).toBeInTheDocument();
expect(
  buildsSection.querySelector("img[src*='method-applied-icon']"),
).toBeInTheDocument();
expect(
  buildsSection.querySelector("[data-method-canvas='resend-method-system']"),
).toBeInTheDocument();
expect(
  buildsSection.querySelector("[data-method-fallback='static-method-system']"),
).toBeInTheDocument();

const methodTabs = builds.getAllByRole("tab");
expect(methodTabs).toHaveLength(4);
expect(methodTabs.map((tab) => tab.textContent)).toEqual(
  expect.arrayContaining(["Recorte", "Protótipo", "Evidência", "Circulação"]),
);
expect(builds.getByRole("tab", { name: /Recorte/i })).toHaveAttribute(
  "aria-selected",
  "true",
);
```

- [ ] **Step 2: Replace the old project-card assertions**

Use este contrato:

```tsx
const projectsSection = screen.getByTestId("projects-operating-section");
const projects = within(projectsSection);

expect(projectsSection).toHaveAttribute("data-nite-scene", "inverse");
expect(
  projects.getByRole("heading", {
    level: 2,
    name: "Projetos em destaque",
  }),
).toBeInTheDocument();
expect(
  projectsSection.querySelectorAll("[data-project-role='protagonist']"),
).toHaveLength(1);
expect(
  projectsSection.querySelectorAll("[data-project-role='supporting']"),
).toHaveLength(2);
expect(
  within(
    projectsSection.querySelector(
      "[data-project-role='protagonist']",
    ) as HTMLElement,
  ).getByRole("heading", { name: "Data Center" }),
).toBeInTheDocument();
expect(projectsSection.querySelectorAll("[data-slot='card']")).toHaveLength(0);
expect(
  projectsSection.querySelectorAll(
    "[data-slot='status-badge'][data-status='draft']",
  ),
).toHaveLength(3);
expect(projects.getAllByText("Em estruturação")).toHaveLength(3);
expect(projects.getAllByText("Ver projeto")).toHaveLength(3);
```

- [ ] **Step 3: Update the interaction test for tabs and keyboard**

Replace button queries with:

```tsx
const recorteTab = builds.getByRole("tab", { name: /Recorte/i });
const prototipoTab = builds.getByRole("tab", { name: /Protótipo/i });
const circulacaoTab = builds.getByRole("tab", { name: /Circulação/i });

expect(recorteTab).toHaveAttribute("aria-selected", "true");

await user.click(prototipoTab);
expect(prototipoTab).toHaveAttribute("aria-selected", "true");
expect(builds.getByRole("tabpanel")).toHaveTextContent(
  "interface, prova de conceito, fluxo ou demonstração.",
);

prototipoTab.focus();
await user.keyboard("{ArrowRight}");
expect(builds.getByRole("tab", { name: /Evidência/i })).toHaveFocus();

await user.keyboard("{End}");
expect(circulacaoTab).toHaveFocus();
expect(circulacaoTab).toHaveAttribute("aria-selected", "true");
```

- [ ] **Step 4: Add the slug-selection regression test**

Create:

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getFeaturedProjects } from "@/biblioteca/conteudo";
import { ProjectsOperatingSection } from "@/components/sections/projects-operating-section";

describe("ProjectsOperatingSection", () => {
  it("seleciona Data Center como protagonista pelo slug", () => {
    render(
      <ProjectsOperatingSection
        projects={[...getFeaturedProjects()].reverse()}
      />,
    );

    const protagonist = document.querySelector(
      "[data-project-role='protagonist']",
    ) as HTMLElement;

    expect(protagonist).toBeInTheDocument();
    expect(
      within(protagonist).getByRole("heading", {
        name: "Data Center",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Ver projeto" })).toHaveLength(
      3,
    );
  });
});
```

- [ ] **Step 5: Run the focused tests and confirm failure**

Run:

```bash
npm test -- tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
```

Expected: FAIL because the new icon, tab roles, project hierarchy and scene
attributes do not exist yet.

- [ ] **Step 6: Commit the failing tests**

```bash
git add tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
git commit -m "test: define home method and project showcase contract"
```

---

### Task 2: Add the Editorial Font and Exclusive Method Icon

**Files:**

- Create: `public/images/metodo/method-applied-icon.png`
- Create: `components/sections/method-feature-icon.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Generate the icon asset**

Use the built-in ImageGen tool with this prompt:

```text
Use case: stylized-concept
Asset type: premium 3D feature icon for a website section
Primary request: Create an exclusive icon for “Método aplicado”, formed by four
interlocking modules around a precise central axis. The object represents
method, orchestration, transformation, evidence and repeatability.
Scene/backdrop: perfectly black square background, no floor and no environment.
Style/medium: high-end dark 3D product render matching the restrained material
language of Resend feature icons without copying any existing Resend object.
Composition: centered isolated object, generous padding, square 1024 x 1024.
Materials: polished black metal, smoked glass and subtle neutral chrome edges.
Lighting: controlled white rim light and faint internal neutral glow.
Constraints: no letter N, no cube, no envelope, no robot, no chart, no code
symbol, no logo, no blue, no purple, no text, no watermark.
```

Copy the selected image to:

```text
public/images/metodo/method-applied-icon.png
```

Do not replace or reference `public/images/oportunidades/n-icon.png`.

- [ ] **Step 2: Load the editorial font**

Update `app/layout.tsx`:

```tsx
import { Geist, Geist_Mono, Instrument_Serif, Sora } from "next/font/google";

const resendDisplayFont = Instrument_Serif({
  variable: "--font-instrument-serif",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});
```

Add the variable to `<html className>`:

```tsx
className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} ${resendDisplayFont.variable}`}
```

- [ ] **Step 3: Add section-local tokens**

Inside `@theme inline` in `app/globals.css`, add:

```css
--font-resend-display:
  var(--font-instrument-serif), "Iowan Old Style", "Times New Roman", serif;
```

Add these utilities after the existing `@layer utilities` block:

```css
.resend-dark-scene {
  --resend-scene-bg: #000;
  --resend-scene-surface: rgb(255 255 255 / 0.025);
  --resend-scene-border: rgb(255 255 255 / 0.1);
  --resend-scene-text: #f5f5f5;
  --resend-scene-muted: #8a8a8a;
  background: var(--resend-scene-bg);
  color: var(--resend-scene-text);
}
```

- [ ] **Step 4: Create the icon component**

Create `components/sections/method-feature-icon.tsx`:

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function MethodFeatureIcon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      data-component="method-feature-icon"
      className="relative isolate size-[8.75rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050505] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_80px_rgb(0_0_0/0.5)] sm:size-[9.5rem]"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: 8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: shouldReduceMotion ? 0 : [0, -3, 0],
        rotateY: shouldReduceMotion ? 0 : [-1.5, 1.5, -1.5],
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.8 },
              scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              y: {
                delay: 0.9,
                duration: 5.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
              rotateY: {
                delay: 0.9,
                duration: 6.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
            }
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      <Image
        src="/images/metodo/method-applied-icon.png"
        alt=""
        fill
        priority
        sizes="152px"
        className="object-cover"
      />
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255/0.12),transparent_45%)]" />
    </motion.div>
  );
}
```

- [ ] **Step 5: Run type checking**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit typography and asset**

```bash
git add app/layout.tsx app/globals.css components/sections/method-feature-icon.tsx public/images/metodo/method-applied-icon.png
git commit -m "feat: add method feature icon and editorial type"
```

---

### Task 3: Build the Procedural Method Canvas

**Files:**

- Create: `components/sections/method-system-canvas.tsx`

- [ ] **Step 1: Create the canvas component**

Create the component with this public contract:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type MethodSystemCanvasProps = {
  activeIndex: number;
  stageCount: number;
};

export function MethodSystemCanvas({
  activeIndex,
  stageCount,
}: MethodSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || process.env.NODE_ENV === "test") {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 1;
    let height = 1;
    let frame = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawGrid = () => {
      context.strokeStyle = "rgba(255,255,255,0.045)";
      context.lineWidth = 1;

      for (let x = 0; x <= width; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += 20) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const getNodes = () =>
      Array.from({ length: stageCount }, (_, index) => ({
        x: width * (0.125 + (index / Math.max(stageCount - 1, 1)) * 0.75),
        y: height * (0.42 + Math.sin(index * 1.35) * 0.08),
      }));

    const drawRoutes = (time: number) => {
      const nodes = getNodes();
      context.lineWidth = 1;

      nodes.slice(0, -1).forEach((node, index) => {
        const next = nodes[index + 1];
        context.strokeStyle = "rgba(255,255,255,0.16)";
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo((node.x + next.x) / 2, node.y);
        context.lineTo((node.x + next.x) / 2, next.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      });

      const activeNode = nodes[activeIndex] ?? nodes[0];
      const pulse = shouldReduceMotion ? 0.5 : (Math.sin(time / 520) + 1) / 2;

      nodes.forEach((node, index) => {
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          index === activeIndex ? 4 + pulse * 3 : 3,
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          index === activeIndex
            ? "rgba(245,245,245,0.95)"
            : "rgba(138,138,138,0.65)";
        context.fill();
      });

      if (activeNode) {
        context.beginPath();
        context.arc(
          activeNode.x,
          activeNode.y,
          18 + pulse * 10,
          0,
          Math.PI * 2,
        );
        context.strokeStyle = "rgba(245,245,245,0.16)";
        context.stroke();
      }
    };

    const drawTrails = (time: number) => {
      if (shouldReduceMotion) {
        return;
      }

      const progress = (time / 4200) % 1;
      const startX = width * 0.125;
      const endX = width * 0.875;
      const x = startX + (endX - startX) * progress;
      const gradient = context.createLinearGradient(x - 80, 0, x, 0);
      gradient.addColorStop(0, "rgba(245,245,245,0)");
      gradient.addColorStop(1, "rgba(245,245,245,0.5)");
      context.strokeStyle = gradient;
      context.beginPath();
      context.moveTo(x - 80, height * 0.64);
      context.lineTo(x, height * 0.64);
      context.stroke();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRoutes(time);
      drawTrails(time);

      if (!shouldReduceMotion && isVisible) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      window.cancelAnimationFrame(frame);
      draw();
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    draw();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [activeIndex, shouldReduceMotion, stageCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-method-canvas="resend-method-system"
      className="pointer-events-none absolute inset-0 size-full opacity-80 [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]"
    />
  );
}
```

- [ ] **Step 2: Run type checking**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit the canvas**

```bash
git add components/sections/method-system-canvas.tsx
git commit -m "feat: add procedural method canvas"
```

---

### Task 4: Rebuild the Method Interaction Surface

**Files:**

- Modify: `components/sections/builds-cards-grid.tsx`
- Modify: `components/sections/builds-section.tsx`

- [ ] **Step 1: Replace the nested method cards with a tab system**

Keep the current `methodStages` content, but replace the component markup and
event handling with:

```tsx
const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

function activateStage(index: number) {
  const stage = methodStages[index];

  if (stage) {
    setActiveStageId(stage.id);
  }
}

function handleTabKeyDown(
  event: React.KeyboardEvent<HTMLButtonElement>,
  index: number,
) {
  const lastIndex = methodStages.length - 1;
  let nextIndex = index;

  if (event.key === "ArrowRight") {
    nextIndex = index === lastIndex ? 0 : index + 1;
  } else if (event.key === "ArrowLeft") {
    nextIndex = index === 0 ? lastIndex : index - 1;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = lastIndex;
  } else {
    return;
  }

  event.preventDefault();
  activateStage(nextIndex);
  tabRefs.current[nextIndex]?.focus();
}
```

Render one continuous surface:

```tsx
<div
  className="relative isolate min-h-[31rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505] text-[#f5f5f5] shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] sm:min-h-[35rem]"
  data-builds-grid=""
  data-component="nite-method-system"
  data-media-mode="canvas-2d-with-html-fallback"
>
  <MethodSystemCanvas
    activeIndex={Math.max(activeIndex, 0)}
    stageCount={methodStages.length}
  />

  <div
    aria-hidden="true"
    data-method-fallback="static-method-system"
    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"
  />

  <div className="relative flex min-h-[31rem] flex-col sm:min-h-[35rem]">
    <div className="grid flex-1 grid-cols-1 divide-y divide-white/10 px-5 pt-16 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
      {methodStages.map((stage, index) => {
        const isActive = stage.id === activeStage.id;

        return (
          <div
            key={stage.id}
            className="flex min-h-36 flex-col justify-end gap-3 px-4 py-5 lg:min-h-64"
          >
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#8a8a8a]">
              0{index + 1} / {stage.label}
            </span>
            <h3 className="text-base font-medium text-[#f5f5f5]">
              {stage.title}
            </h3>
            <p
              className={cn(
                "max-w-[16rem] text-sm leading-6 text-[#8a8a8a] transition-opacity",
                !isActive && "lg:opacity-55",
              )}
            >
              {stage.description}
            </p>
          </div>
        );
      })}
    </div>

    <div className="border-t border-white/10 bg-black/75 p-3 sm:p-4">
      <div
        role="tablist"
        aria-label="Etapas do método aplicado"
        className="flex gap-1 overflow-x-auto"
      >
        {methodStages.map((stage, index) => {
          const isActive = stage.id === activeStage.id;

          return (
            <button
              key={stage.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`method-tab-${stage.id}`}
              type="button"
              role="tab"
              aria-controls="method-active-stage"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                "min-h-10 shrink-0 rounded-lg border px-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                isActive
                  ? "border-white/20 bg-white/8 text-[#f5f5f5]"
                  : "border-transparent text-[#8a8a8a] hover:text-[#f5f5f5]",
              )}
              onClick={() => activateStage(index)}
              onFocus={() => activateStage(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {stage.label}
            </button>
          );
        })}
      </div>

      <div
        id="method-active-stage"
        role="tabpanel"
        aria-labelledby={`method-tab-${activeStage.id}`}
        className="grid gap-2 px-2 pb-2 pt-5 sm:grid-cols-[1fr_auto] sm:items-end"
      >
        <div>
          <p className="text-sm leading-6 text-[#8a8a8a]">
            {activeStage.description}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[#f5f5f5]">
            {activeStage.output}.
          </p>
        </div>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#8a8a8a]">
          Estado ativo
        </span>
      </div>
    </div>
  </div>
</div>
```

Import `MethodSystemCanvas` and remove the old internal
`MethodSignalCanvas`.

- [ ] **Step 2: Recompose the method section**

Replace `BuildsSection` with:

```tsx
import { Container } from "@/components/layout/container";
import { BuildsCardsGrid } from "@/components/sections/builds-cards-grid";
import { MethodFeatureIcon } from "@/components/sections/method-feature-icon";
import { SectionHeader } from "@/components/sections/section-header";

export function BuildsSection() {
  return (
    <section
      id="metodo"
      data-builds-section=""
      data-nite-scene="inverse"
      data-surface="resend-dark"
      data-testid="builds-section"
      className="resend-dark-scene py-24 sm:py-32 lg:py-40"
    >
      <Container size="xl" className="flex flex-col gap-14 sm:gap-18">
        <div className="flex flex-col items-center gap-8">
          <MethodFeatureIcon />
          <SectionHeader
            align="center"
            className="max-w-[42rem] [&_h2]:font-resend-display [&_h2]:text-[clamp(3.5rem,7vw,6.25rem)] [&_h2]:font-normal [&_h2]:leading-[0.94] [&_p]:max-w-[38rem] [&_p]:text-[#8a8a8a]"
            title="Método aplicado"
            description="O NITE organiza desafios acadêmicos em recortes, protótipos e registros públicos."
          />
        </div>
        <BuildsCardsGrid />
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Run focused tests**

Run:

```bash
npm test -- tests/unit/home-page.test.tsx
```

Expected: method assertions and keyboard interaction PASS; project assertions
still FAIL.

- [ ] **Step 4: Commit the method redesign**

```bash
git add components/sections/builds-section.tsx components/sections/builds-cards-grid.tsx
git commit -m "feat: redesign applied method section"
```

---

### Task 5: Build the Project Showcase Components

**Files:**

- Create: `components/sections/project-showcase.tsx`

- [ ] **Step 1: Create shared project metadata**

Start the file with:

```tsx
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
  href: Route | string;
};

function ProjectShowcaseMeta({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge
          status="draft"
          size="sm"
          className="border-white/12 bg-white/4 text-[#a1a1a1]"
        />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#737373]">
          {project.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((technology) => (
          <Chip
            key={technology}
            variant="quiet"
            className="min-h-6 border-white/10 bg-transparent px-2.5 py-1 text-[0.65rem] text-[#8a8a8a]"
          >
            {technology}
          </Chip>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Add the protagonist technical visual**

Use DOM rows that do not claim real project data:

```tsx
function SoftwareInterfaceVisual() {
  const logs = [
    ["POST", "/api/context", "200"],
    ["GET", "/api/evidence", "200"],
    ["POST", "/api/records", "201"],
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="grid min-h-[22rem] gap-4 bg-[#030303] p-5 sm:grid-cols-[1.15fr_0.85fr] sm:p-8"
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
        <div className="flex gap-4 border-b border-white/10 px-4 py-3 font-mono text-[0.65rem] text-[#737373]">
          <span>routes.ts</span>
          <span>events.ts</span>
          <span>tests.ts</span>
        </div>
        <pre className="overflow-hidden p-5 font-mono text-xs leading-6 text-[#9b9b9b]">
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

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.018] p-5">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#737373]">
            Activity
          </p>
          <div className="mt-5 grid gap-3">
            {logs.map(([method, path, status]) => (
              <div
                key={path}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-white/8 pb-3 font-mono text-[0.68rem]"
              >
                <span className="text-[#737373]">{method}</span>
                <span className="text-[#a1a1a1]">{path}</span>
                <span className="text-emerald-400/80">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add `FeaturedProjectShowcase`**

```tsx
export function FeaturedProjectShowcase({
  project,
  href,
}: ProjectShowcaseProps) {
  return (
    <article
      data-project-role="protagonist"
      className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#030303]"
    >
      <SoftwareInterfaceVisual />
      <div className="grid gap-6 border-t border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid max-w-[46rem] gap-4">
          <ProjectShowcaseMeta project={project} />
          <h3 className="text-2xl font-medium text-[#f5f5f5] sm:text-3xl">
            {project.title}
          </h3>
          <p className="max-w-[42rem] text-sm leading-6 text-[#8a8a8a] sm:text-base sm:leading-7">
            {project.summary}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-70"
        >
          Ver projeto
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Add `SupportingProjectModule`**

```tsx
export function SupportingProjectModule({
  project,
  href,
  className,
}: ProjectShowcaseProps & { className?: string }) {
  const visual = project.illustration ?? {
    src: project.coverImage,
    alt: project.alt,
  };

  return (
    <article
      data-project-role="supporting"
      className={cn(
        "overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#030303]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#050505]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale contrast-110 brightness-[0.58]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,#030303_100%)]" />
      </div>
      <div className="grid gap-4 p-6 sm:p-7">
        <ProjectShowcaseMeta project={project} />
        <h3 className="text-xl font-medium text-[#f5f5f5] sm:text-2xl">
          {project.title}
        </h3>
        <p className="text-sm leading-6 text-[#8a8a8a]">{project.summary}</p>
        <Link
          href={href}
          className="mt-2 inline-flex min-h-10 w-fit items-center gap-2 text-sm font-medium text-[#f5f5f5] transition-opacity hover:opacity-70"
        >
          Ver projeto
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Run type checking**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit the showcase components**

```bash
git add components/sections/project-showcase.tsx
git commit -m "feat: add featured project showcase components"
```

---

### Task 6: Recompose Projects in Featured and Supporting Roles

**Files:**

- Modify: `components/sections/projects-operating-section.tsx`

- [ ] **Step 1: Replace ProjectCard imports**

Use:

```tsx
import type { Project } from "@/biblioteca/esquemas";
import { Container } from "@/components/layout/container";
import {
  FeaturedProjectShowcase,
  SupportingProjectModule,
} from "@/components/sections/project-showcase";
import { SectionHeader } from "@/components/sections/section-header";
import { EmptyState } from "@/components/ui/empty-state";
```

Remove status mapping, date formatting, evidence detection and `ProjectCard`
logic from this home-specific section.

- [ ] **Step 2: Add deterministic partitioning**

Inside `ProjectsOperatingSection`:

```tsx
const protagonist =
  projects.find((project) => project.slug === "data-center") ??
  projects[0];
const supportingProjects = protagonist
  ? projects.filter((project) => project.slug !== protagonist.slug).slice(0, 2)
  : [];
```

- [ ] **Step 3: Render the approved hierarchy**

Replace the section markup with:

```tsx
<section
  id="projetos"
  data-projects-operating-section=""
  data-nite-scene="inverse"
  data-surface="resend-dark"
  data-testid="projects-operating-section"
  className="resend-dark-scene border-t border-white/8 py-24 sm:py-32 lg:py-40"
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
          href={`/projetos/${protagonist.slug}`}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {supportingProjects.map((project) => (
            <SupportingProjectModule
              key={project.slug}
              project={project}
              href={`/projetos/${project.slug}`}
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
```

- [ ] **Step 4: Run focused project tests**

Run:

```bash
npm test -- tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit the project hierarchy**

```bash
git add components/sections/projects-operating-section.tsx
git commit -m "feat: redesign featured projects hierarchy"
```

---

### Task 7: Harden Responsive Behavior, Motion and Accessibility

**Files:**

- Modify: `components/sections/method-feature-icon.tsx`
- Modify: `components/sections/method-system-canvas.tsx`
- Modify: `components/sections/builds-cards-grid.tsx`
- Modify: `components/sections/project-showcase.tsx`
- Modify: `tests/unit/home-page.test.tsx`

- [ ] **Step 1: Add accessibility assertions**

Add to the home test:

```tsx
expect(
  builds.getByRole("tablist", { name: "Etapas do método aplicado" }),
).toBeInTheDocument();
expect(builds.getByRole("tabpanel")).toHaveAttribute(
  "aria-labelledby",
  "method-tab-recorte",
);
expect(
  buildsSection.querySelector("[data-method-canvas='resend-method-system']"),
).toHaveAttribute("aria-hidden", "true");
expect(
  buildsSection.querySelector("[data-component='method-feature-icon'] img"),
).toHaveAttribute("alt", "");
```

- [ ] **Step 2: Verify mobile-safe constraints in class contracts**

Add:

```tsx
const methodTablist = builds.getByRole("tablist", {
  name: "Etapas do método aplicado",
});
expect(methodTablist).toHaveClass("overflow-x-auto");

const supportingModules = projectsSection.querySelectorAll(
  "[data-project-role='supporting']",
);
expect(supportingModules).toHaveLength(2);
```

- [ ] **Step 3: Run focused tests**

Run:

```bash
npm test -- tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Run code quality checks**

Run:

```bash
npm run typecheck
npm run lint
npm run format:check
```

Expected: all commands PASS. If `format:check` fails only on touched files,
run:

```bash
npx prettier --write app/layout.tsx app/globals.css components/sections/builds-section.tsx components/sections/builds-cards-grid.tsx components/sections/method-feature-icon.tsx components/sections/method-system-canvas.tsx components/sections/project-showcase.tsx components/sections/projects-operating-section.tsx tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
```

Then rerun the three checks.

- [ ] **Step 5: Commit the hardening pass**

```bash
git add app/layout.tsx app/globals.css components/sections/builds-section.tsx components/sections/builds-cards-grid.tsx components/sections/method-feature-icon.tsx components/sections/method-system-canvas.tsx components/sections/project-showcase.tsx components/sections/projects-operating-section.tsx tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
git commit -m "fix: harden home showcase accessibility and responsiveness"
```

---

### Task 8: Full Verification and Chrome Visual QA

**Files:**

- Modify only files with visible defects found during QA.

- [ ] **Step 1: Run the complete verification suite**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit with code `0`.

- [ ] **Step 2: Start the development server**

Run:

```bash
npm run dev -- --hostname localhost --port 3000
```

Keep the session active until visual QA is complete.

- [ ] **Step 3: Inspect desktop in Chrome**

Use the Chrome plugin selected by the user:

1. open `http://localhost:3000/#metodo`;
2. capture `Método aplicado` at `1440 x 1000`;
3. capture `Projetos em destaque` at `1440 x 1000`;
4. verify no blue accents, cropped copy, nested cards or three equal project
   modules;
5. activate every method tab and verify canvas emphasis, tabpanel content and
   keyboard navigation.

- [ ] **Step 4: Inspect mobile in Chrome**

Use the Chrome DevTools Protocol capability to emulate `390 x 844`:

```text
Emulation.setDeviceMetricsOverride
width: 390
height: 844
deviceScaleFactor: 1
mobile: true
```

Verify:

- tablist scrolls horizontally;
- headings do not clip;
- protagonist precedes both supporting modules;
- all `Ver projeto` links remain visible;
- status remains `Em estruturação`;
- no horizontal page overflow exists.

Clear the emulation after inspection.

- [ ] **Step 5: Compare against the approved mock**

Place these images side by side in the existing visual companion:

- approved mock:
  `.superpowers/brainstorm/125-1782510167/content/direcao-revisada-resend.png`;
- desktop screenshot of the implemented sections;
- mobile screenshot of the implemented sections.

Check typography role, monochrome palette, section rhythm, border radius,
project hierarchy and canvas density. Fix visible mismatches, then recapture.

- [ ] **Step 6: Verify light mode behavior**

Switch the portal to light mode and confirm:

- the rest of the page uses the existing light palette;
- both redesigned sections remain intentionally dark;
- transitions into and out of the dark scenes have no unreadable text;
- no preexisting light-mode token is changed to satisfy these sections.

- [ ] **Step 7: Re-run verification after visual fixes**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit with code `0`.

- [ ] **Step 8: Commit final visual fixes**

Stage only files changed by this redesign:

```bash
git add app/layout.tsx app/globals.css components/sections/builds-section.tsx components/sections/builds-cards-grid.tsx components/sections/method-feature-icon.tsx components/sections/method-system-canvas.tsx components/sections/project-showcase.tsx components/sections/projects-operating-section.tsx public/images/metodo/method-applied-icon.png tests/unit/home-page.test.tsx tests/unit/projects-operating-section.test.tsx
git commit -m "feat: deliver Resend-inspired home showcases"
```

Do not stage or revert unrelated existing changes in `DESIGN.md`, critique
files, or other user-owned worktree changes.
