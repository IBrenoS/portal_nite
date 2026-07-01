# Projects Hero Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o topo de `/projetos` em um hero animado com fundo do design system NITE, teal da referência Resend e o painel real de filtros sobreposto.

**Architecture:** `ProjectsPage` continua server-side e recebe um novo componente cliente isolado para o canvas decorativo. `ProjectsFilterableList` mantém seu estado e comportamento; apenas o painel de controles recebe cena inversa e o wrapper do catálogo é deslocado para sobrepor o hero. O canvas usa API 2D nativa, observers e fallback estático, sem dependências novas.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Canvas 2D, Testing Library, Vitest, Playwright.

---

## File Map

**Create**

- `components/sections/projects-hero-canvas.tsx`
  - Renderiza e controla grade, trilhas, pulsos, resize, pausa e fallback.
- `tests/unit/projects-hero-canvas.test.tsx`
  - Valida fallback, movimento reduzido, animação e cleanup.

**Modify**

- `app/projetos/page.tsx`
  - Cria o hero inverso e posiciona o catálogo sobre sua borda inferior.
- `components/sections/projects-filterable-list.tsx`
  - Marca e estiliza somente o painel de filtros como cena inversa.
- `tests/unit/project-list-page.test.tsx`
  - Trava o contrato estrutural do novo hero sem perder o catálogo.
- `tests/visual/design-system.visual.spec.ts`
  - Valida fundo, sobreposição e ausência de overflow em desktop e mobile.

**Preserve**

- `biblioteca/conteudo.ts`
- `conteudo/projetos/projetos.json`
- `components/sections/project-discovery-card.tsx`
- metadata e JSON-LD de `app/projetos/page.tsx`

---

### Task 1: Lock the Page Composition Contract

**Files:**

- Modify: `tests/unit/project-list-page.test.tsx`
- Test: `tests/unit/project-list-page.test.tsx`

- [ ] **Step 1: Add failing hero assertions**

Dentro do primeiro teste de `ProjectsPage`, antes das asserções do catálogo,
adicionar:

```tsx
const hero = screen.getByTestId("projects-hero");

expect(hero).toHaveAttribute("data-nite-scene", "inverse");
expect(hero).toHaveClass("bg-nite-background");
expect(hero.querySelector("[data-projects-hero-canvas]")).toHaveAttribute(
  "aria-hidden",
  "true",
);
expect(hero.querySelector("[data-projects-hero-light]")).toHaveStyle({
  backgroundColor: "#2DCFBF",
});

const filterPanel = document.querySelector("[data-projects-filter-panel]");

expect(filterPanel).toHaveAttribute("data-nite-scene", "inverse");
expect(filterPanel).toHaveClass("bg-nite-surface/80");
expect(screen.getByTestId("projects-catalog")).toHaveClass(
  "-mt-36",
  "lg:-mt-48",
);
```

Manter todas as asserções existentes de texto, filtros, cards, links e footer.

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```bash
npm test -- tests/unit/project-list-page.test.tsx
```

Expected: FAIL porque `projects-hero`, `projects-hero-canvas`,
`projects-hero-light`, `projects-filter-panel` e `projects-catalog` ainda não
existem.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/unit/project-list-page.test.tsx
git commit -m "test: define projects hero contract"
```

---

### Task 2: Implement the Canvas With Lifecycle Tests

**Files:**

- Create: `tests/unit/projects-hero-canvas.test.tsx`
- Create: `components/sections/projects-hero-canvas.tsx`
- Test: `tests/unit/projects-hero-canvas.test.tsx`

- [ ] **Step 1: Write lifecycle tests**

Criar o teste com mocks explícitos:

```tsx
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProjectsHeroCanvas } from "@/components/sections/projects-hero-canvas";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function installCanvasContext() {
  const gradient = { addColorStop: vi.fn() };
  const context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    createLinearGradient: vi.fn(() => gradient),
    fill: vi.fn(),
    fillRect: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    setTransform: vi.fn(),
    stroke: vi.fn(),
    fillStyle: "",
    globalAlpha: 1,
    lineWidth: 1,
    strokeStyle: "",
  } as unknown as CanvasRenderingContext2D;

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context);

  return context;
}

describe("ProjectsHeroCanvas", () => {
  it("mantem a grade CSS quando canvas 2D nao esta disponivel", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { container } = render(<ProjectsHeroCanvas />);

    expect(
      container.querySelector("[data-projects-hero-canvas]"),
    ).toHaveAttribute("data-animation-state", "fallback");
    expect(
      container.querySelector("[data-projects-hero-static-grid]"),
    ).toBeInTheDocument();
  });

  it("desenha uma composicao estatica quando movimento reduzido esta ativo", async () => {
    const context = installCanvasContext();
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { container } = render(<ProjectsHeroCanvas />);

    await waitFor(() =>
      expect(
        container.querySelector("[data-projects-hero-canvas]"),
      ).toHaveAttribute("data-animation-state", "static"),
    );
    expect(context.stroke).toHaveBeenCalled();
  });

  it("inicia e encerra frame, observers e listeners", async () => {
    installCanvasContext();
    const cancelFrame = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => undefined);
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(17);
    const disconnectResize = vi.fn();
    const disconnectIntersection = vi.fn();

    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe = vi.fn();
        disconnect = disconnectResize;
      },
    );
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = disconnectIntersection;
      },
    );

    const { container, unmount } = render(<ProjectsHeroCanvas />);

    await waitFor(() =>
      expect(
        container.querySelector("[data-projects-hero-canvas]"),
      ).toHaveAttribute("data-animation-state", "running"),
    );

    unmount();

    expect(cancelFrame).toHaveBeenCalledWith(17);
    expect(disconnectResize).toHaveBeenCalled();
    expect(disconnectIntersection).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the canvas test and verify failure**

Run:

```bash
npm test -- tests/unit/projects-hero-canvas.test.tsx
```

Expected: FAIL com erro de import porque `ProjectsHeroCanvas` ainda não existe.

- [ ] **Step 3: Implement the canvas component**

Criar `components/sections/projects-hero-canvas.tsx` com:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 20;
const TRAIL_COUNT = 7;
const RESEND_TEAL = "#2DCFBF";
const GRID_COLOR = "rgba(170, 170, 170, 0.10)";
const TRAIL_COLOR = "rgba(255, 255, 255, 0.50)";
const TRANSPARENT_TRAIL = "rgba(255, 255, 255, 0)";
const NODE_COLOR = "rgba(255, 255, 255, 1)";
const MAX_GLOW_RADIUS = 10;
const GLOW_DURATION = 60;

type AnimationState = "fallback" | "static" | "running";
type Point = { x: number; y: number };
type Trail = {
  alpha: number;
  fading: boolean;
  glowFrame: number;
  glowing: boolean;
  points: Point[];
  speedFactor: number;
  targetX: number;
  targetY: number;
  trailLength: number;
  visited: Set<string>;
  x: number;
  y: number;
};

function clampToGrid(value: number, limit: number) {
  return Math.min(
    Math.max(0, Math.floor(value / GRID_SIZE) * GRID_SIZE),
    Math.max(0, Math.floor(limit / GRID_SIZE) * GRID_SIZE),
  );
}

function createTrail(width: number, height: number): Trail {
  const centerX = width / 2;
  const centerY = height / 2;
  const halfAxis = Math.min(centerX, centerY);
  const minRadius = halfAxis * 0.3;
  const maxRadius = halfAxis * 0.8;
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(
    Math.random() * (maxRadius ** 2 - minRadius ** 2) + minRadius ** 2,
  );
  const x = clampToGrid(centerX + radius * Math.cos(angle), width);
  const y = clampToGrid(centerY + radius * Math.sin(angle), height);

  return {
    alpha: 1,
    fading: false,
    glowFrame: 0,
    glowing: false,
    points: [{ x, y }],
    speedFactor: Math.random() * 0.5 + 0.75,
    targetX: x,
    targetY: y,
    trailLength: Math.floor(Math.random() * 401) + 100,
    visited: new Set([`${x},${y}`]),
    x,
    y,
  };
}

function chooseTarget(trail: Trail, width: number, height: number) {
  const options = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ].filter(({ dx, dy }) => {
    const x = trail.x + dx * GRID_SIZE;
    const y = trail.y + dy * GRID_SIZE;

    return (
      x >= 0 &&
      x <= width &&
      y >= 0 &&
      y <= height &&
      !trail.visited.has(`${x},${y}`)
    );
  });

  const direction = options[Math.floor(Math.random() * options.length)];

  if (!direction) {
    trail.fading = true;
    return;
  }

  trail.targetX = trail.x + direction.dx * GRID_SIZE;
  trail.targetY = trail.y + direction.dy * GRID_SIZE;
}

function drawGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.strokeStyle = GRID_COLOR;
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += GRID_SIZE) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += GRID_SIZE) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawStaticRoutes(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const routes = [
    [
      { x: width * 0.18, y: height * 0.48 },
      { x: width * 0.32, y: height * 0.48 },
      { x: width * 0.32, y: height * 0.36 },
    ],
    [
      { x: width * 0.55, y: height * 0.3 },
      { x: width * 0.55, y: height * 0.46 },
      { x: width * 0.7, y: height * 0.46 },
    ],
  ];

  context.strokeStyle = RESEND_TEAL;
  context.lineWidth = 2;

  for (const route of routes) {
    context.beginPath();
    context.moveTo(route[0].x, route[0].y);

    for (const point of route.slice(1)) {
      context.lineTo(point.x, point.y);
    }

    context.stroke();
    const head = route.at(-1);

    if (head) {
      context.fillStyle = NODE_COLOR;
      context.fillRect(head.x - 1.5, head.y - 1.5, 3, 3);
    }
  }
}

export function ProjectsHeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationState, setAnimationState] =
    useState<AnimationState>("fallback");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!root || !canvas || !context) {
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    let width = 1;
    let height = 1;
    let frameId: number | null = null;
    let inViewport = true;
    let trails: Trail[] = [];

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      trails = Array.from({ length: TRAIL_COUNT }, () =>
        createTrail(width, height),
      );
    };

    const clearAndDrawGrid = () => {
      context.clearRect(0, 0, width, height);
      drawGrid(context, width, height);
    };

    const drawStatic = () => {
      clearAndDrawGrid();
      drawStaticRoutes(context, width, height);
      setAnimationState("static");
    };

    const drawTrail = (trail: Trail) => {
      if (trail.points.length < 2) {
        return;
      }

      const tail = trail.points[trail.points.length - 1];
      const gradient = context.createLinearGradient(
        trail.points[0].x,
        trail.points[0].y,
        tail.x,
        tail.y,
      );
      gradient.addColorStop(0, TRAIL_COLOR);
      gradient.addColorStop(1, TRANSPARENT_TRAIL);
      context.beginPath();
      context.moveTo(trail.points[0].x, trail.points[0].y);

      for (const point of trail.points.slice(1)) {
        context.lineTo(point.x, point.y);
      }

      context.strokeStyle = gradient;
      context.lineWidth = 2;
      context.globalAlpha = trail.alpha;
      context.stroke();
      context.fillStyle = NODE_COLOR;
      context.fillRect(trail.x - 1.5, trail.y - 1.5, 3, 3);

      if (trail.glowing) {
        const progress = trail.glowFrame / GLOW_DURATION;
        const radius = Math.sin(progress * Math.PI) * MAX_GLOW_RADIUS;
        const opacity = Math.sin(progress * Math.PI) * 0.3;
        context.beginPath();
        context.arc(trail.x, trail.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const updateTrail = (trail: Trail) => {
      if (trail.fading) {
        trail.alpha -= 0.02;

        if (trail.alpha <= 0.1) {
          return createTrail(width, height);
        }
      }

      const deltaX = trail.targetX - trail.x;
      const deltaY = trail.targetY - trail.y;

      if (Math.abs(deltaX) < 0.1 && Math.abs(deltaY) < 0.1) {
        trail.x = trail.targetX;
        trail.y = trail.targetY;
        chooseTarget(trail, width, height);
        trail.visited.add(`${trail.x},${trail.y}`);
      } else {
        trail.x += deltaX * 0.1 * trail.speedFactor;
        trail.y += deltaY * 0.1 * trail.speedFactor;
      }

      trail.points.unshift({ x: trail.x, y: trail.y });

      if (trail.points.length > trail.trailLength) {
        trail.points.pop();
      }

      if (Math.random() < 0.003) {
        trail.fading = true;
      }

      if (!trail.glowing && Math.random() < 0.001) {
        trail.glowing = true;
        trail.glowFrame = 0;
      }

      if (trail.glowing) {
        trail.glowFrame += 1;

        if (trail.glowFrame >= GLOW_DURATION) {
          trail.glowing = false;
        }
      }

      return trail;
    };

    const drawFrame = () => {
      if (reducedMotion || !inViewport || document.hidden) {
        frameId = null;
        return;
      }

      clearAndDrawGrid();
      trails = trails.map((trail) => {
        const nextTrail = updateTrail(trail);
        drawTrail(nextTrail);
        return nextTrail;
      });
      frameId = window.requestAnimationFrame(drawFrame);
    };

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const start = () => {
      if (
        frameId === null &&
        !reducedMotion &&
        inViewport &&
        !document.hidden
      ) {
        setAnimationState("running");
        frameId = window.requestAnimationFrame(drawFrame);
      }
    };

    const syncAnimation = () => {
      stop();

      if (reducedMotion) {
        drawStatic();
      } else {
        start();
      }
    };

    resize();
    syncAnimation();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resize();
            syncAnimation();
          });
    resizeObserver?.observe(root);

    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            inViewport = entry?.isIntersecting ?? true;
            syncAnimation();
          });
    intersectionObserver?.observe(root);

    const handleVisibility = () => syncAnimation();
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      syncAnimation();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-animation-state={animationState}
      data-projects-hero-canvas=""
    >
      {animationState === "fallback" ? (
        <div
          className="absolute inset-0 opacity-70"
          data-projects-hero-static-grid=""
          style={{
            backgroundImage:
              "linear-gradient(rgba(170,170,170,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(170,170,170,.10) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(closest-side, #000 30%, #000 31%, transparent 100%)",
          }}
        />
      ) : null}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full"
        style={{
          maskImage:
            "radial-gradient(closest-side, #000 30%, #000 31%, transparent 100%)",
        }}
      />
    </div>
  );
}
```

Não exportar estado de animação nem adicionar dependências.

- [ ] **Step 4: Run canvas tests**

Run:

```bash
npm test -- tests/unit/projects-hero-canvas.test.tsx
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit canvas and tests**

```bash
git add components/sections/projects-hero-canvas.tsx tests/unit/projects-hero-canvas.test.tsx
git commit -m "feat: add projects hero canvas"
```

---

### Task 3: Integrate the Hero and Overlapping Filter Panel

**Files:**

- Modify: `app/projetos/page.tsx`
- Modify: `components/sections/projects-filterable-list.tsx`
- Test: `tests/unit/project-list-page.test.tsx`

- [ ] **Step 1: Build the semantic hero**

Importar o componente:

```tsx
import { ProjectsHeroCanvas } from "@/components/sections/projects-hero-canvas";
```

Substituir a seção atual por:

```tsx
<main id="conteudo-principal">
  <section
    className="relative isolate flex h-[min(42rem,calc(90svh-3.625rem))] min-h-[34rem] items-center overflow-hidden bg-nite-background"
    data-nite-scene="inverse"
    data-testid="projects-hero"
  >
    <ProjectsHeroCanvas />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[15%] bottom-0 h-[68%] bg-[#2DCFBF] opacity-35 mix-blend-screen blur-3xl"
      data-projects-hero-light=""
      style={{
        maskImage:
          "radial-gradient(circle at 50% 78%, #000 0%, rgba(0,0,0,.72) 34%, transparent 74%)",
      }}
    />
    <Container
      size="xl"
      className="relative z-10 flex justify-center pb-28 text-center sm:pb-32 lg:pb-40"
    >
      <div className="grid max-w-[46rem] justify-items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2DCFBF]">
          Explorer
        </p>
        <h1 className="font-heading text-5xl font-semibold leading-[1.02] text-nite-text-primary sm:text-6xl lg:text-7xl">
          Projetos
        </h1>
        <p className="max-w-2xl text-base leading-7 text-nite-text-secondary sm:text-lg sm:leading-8">
          Encontre iniciativas, pesquisas, protótipos e soluções do NITE.
        </p>
      </div>
    </Container>
  </section>

  <section className="pb-16 sm:pb-20 lg:pb-24">
    <Container
      size="xl"
      className="relative z-20 -mt-36 sm:-mt-40 lg:-mt-48"
      data-testid="projects-catalog"
    >
      <ProjectsFilterableList projects={projects} />
    </Container>
  </section>
</main>
```

Manter header, JSON-LD, footer e metadata sem alteração.

- [ ] **Step 2: Mark the real filter panel**

No primeiro painel interno de `ProjectsFilterableList`, adicionar:

```tsx
<div
  className="grid gap-4 rounded-2xl border border-nite-border-subtle bg-nite-surface/80 p-3 shadow-nite-lift backdrop-blur-2xl sm:p-4"
  data-nite-scene="inverse"
  data-projects-filter-panel=""
>
```

Não mover estado, handlers, selects, busca, contagem ou resultados.

- [ ] **Step 3: Run page and canvas tests**

Run:

```bash
npm test -- tests/unit/project-list-page.test.tsx tests/unit/projects-hero-canvas.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Run typecheck and lint**

Run:

```bash
npm run typecheck
npm run lint
```

Expected: ambos terminam com exit code `0`.

- [ ] **Step 5: Commit integration**

```bash
git add app/projetos/page.tsx components/sections/projects-filterable-list.tsx tests/unit/project-list-page.test.tsx
git commit -m "feat: redesign projects hero"
```

---

### Task 4: Add Visual Regression Coverage and Finish Verification

**Files:**

- Modify: `tests/visual/design-system.visual.spec.ts`
- Test: `tests/visual/design-system.visual.spec.ts`

- [ ] **Step 1: Add desktop and mobile layout assertions**

Adicionar:

```ts
test("projects hero integrates canvas and catalog without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 958 });
  await openStablePage(page, "/projetos", "dark");

  const desktop = await page.evaluate(() => {
    const hero = document.querySelector(
      "[data-testid='projects-hero']",
    ) as HTMLElement | null;
    const catalog = document.querySelector(
      "[data-testid='projects-catalog']",
    ) as HTMLElement | null;
    const panel = document.querySelector(
      "[data-projects-filter-panel]",
    ) as HTMLElement | null;

    if (!hero || !catalog || !panel) {
      throw new Error("Projects hero contract not found.");
    }

    const heroRect = hero.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    return {
      backgroundColor: getComputedStyle(hero).backgroundColor,
      hasCanvas: Boolean(hero.querySelector("canvas")),
      overlaps: panelRect.top < heroRect.bottom,
      panelEndsAfterHero: panelRect.bottom > heroRect.bottom,
      overflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    };
  });

  expect(desktop).toEqual({
    backgroundColor: "rgb(9, 9, 10)",
    hasCanvas: true,
    overlaps: true,
    panelEndsAfterHero: true,
    overflow: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();

  const mobileOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(mobileOverflow).toBe(false);
});
```

- [ ] **Step 2: Run the targeted visual test**

Run:

```bash
npm run test:visual -- --grep "projects hero integrates"
```

Expected: PASS.

- [ ] **Step 3: Run the complete verification suite**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run format:check
```

Expected: todos os comandos terminam com exit code `0`.

- [ ] **Step 4: Verify in Chrome**

Abrir `http://localhost:3000/projetos` e verificar:

- desktop e mobile;
- temas escuro e claro;
- animação ativa e pausa fora da viewport;
- movimento reduzido;
- busca, cada filtro, ordenação e limpeza;
- ausência de overflow, erros de console e falhas de hidratação.

- [ ] **Step 5: Commit visual coverage**

```bash
git add tests/visual/design-system.visual.spec.ts
git commit -m "test: cover projects hero layout"
```

---

## Completion Criteria

- O hero usa `var(--nite-background)` por `bg-nite-background` dentro da cena
  inversa.
- O teal do efeito é exatamente `#2DCFBF`.
- O painel real de filtros sobrepõe o hero.
- O canvas tem fallback, movimento reduzido, pausa e cleanup.
- Dados, cards, filtros, links, metadata e JSON-LD permanecem corretos.
- Testes unitários, teste visual, typecheck, lint, build e formatação passam.
