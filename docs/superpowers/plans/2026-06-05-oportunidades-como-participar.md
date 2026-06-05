# Oportunidades Como Participar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the dedicated `/oportunidades/como-participar` route and make the existing "Processos / Como participar" card navigate to it.

**Architecture:** Keep the feature route-local: a new App Router page owns the editorial sections and visual objects, while `/oportunidades` only changes the card destination. Use existing layout, SEO, theme tokens, and testing patterns instead of adding a new design system layer.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind classes, Vitest, Testing Library, Playwright/manual browser verification.

---

## Scope Check

This plan covers one cohesive feature: a dedicated explanation page for how to participate in the NITE development nucleus. It does not add forms, backend, authentication, opportunity data models, or a new submission flow.

## File Structure

- Create `app/oportunidades/como-participar/page.tsx`
  - Owns the route metadata, breadcrumb JSON-LD, editorial sections, 3D NITE process object, and `SYNC` key object.
  - Keeps helper arrays and helper visual components local to the route because the visual language is currently page-specific.

- Modify `app/oportunidades/page.tsx`
  - Changes only the "Processos / Como participar" card from an anchor to the dedicated route.
  - Leaves "Ver oportunidades", "Oportunidades abertas", and the closed opportunity state intact.

- Create `tests/unit/opportunities-how-to-participate-page.test.tsx`
  - Guards the approved page copy, lack of main CTA, absence of form fields, metadata, breadcrumb JSON-LD, and `SYNC` key letters.

- Modify `tests/unit/opportunities-page.test.tsx`
  - Adds a focused assertion that the process card links to `/oportunidades/como-participar`.

---

### Task 1: Add Failing Coverage For The New Flow

**Files:**
- Create: `tests/unit/opportunities-how-to-participate-page.test.tsx`
- Modify: `tests/unit/opportunities-page.test.tsx`

- [ ] **Step 1: Create the route test file**

Create `tests/unit/opportunities-how-to-participate-page.test.tsx` with this content:

```tsx
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import HowToParticipatePage, {
  metadata,
} from "@/app/oportunidades/como-participar/page";

afterEach(() => {
  cleanup();
});

describe("OpportunitiesHowToParticipatePage", () => {
  it("renderiza a rota dedicada como pagina editorial sem CTA principal", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    expect(mainElement).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(
      main.getByRole("heading", {
        level: 1,
        name: "O caminho para construir com o NITE",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Como estudantes se aproximam do núcleo, desenvolvem repertório e entram em projetos com orientação, ritmo e responsabilidade.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "O caminho de entrada" }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "Da aproximação ao projeto" }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "Sinais de prontidão" }),
    ).toBeInTheDocument();

    expect(main.queryByRole("link")).not.toBeInTheDocument();
    expect(mainElement.querySelector("form")).not.toBeInTheDocument();
    expect(
      mainElement.querySelectorAll("input, textarea, select, button"),
    ).toHaveLength(0);
  });

  it("mantem a linguagem aprovada e evita termos rejeitados no conteudo visivel", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    for (const heading of [
      "Interesse vira construção.",
      "Ritmo sustenta evolução.",
      "Registro cria continuidade.",
      "Contexto define onde começar.",
    ]) {
      expect(main.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
    }

    expect(
      main.getByText(
        "SYNC representa o ponto em que curiosidade, entrega e necessidade do projeto passam a trabalhar na mesma direção.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText("memória compartilhada", { exact: false }),
    ).toBeInTheDocument();
    expect(
      main.queryByText(/filosofia/i),
    ).not.toBeInTheDocument();
    expect(
      main.queryByText(/\bfrente\b/i),
    ).not.toBeInTheDocument();
    expect(
      main.queryByText(/sem promessa|sem formulário|sem vaga/i),
    ).not.toBeInTheDocument();
  });

  it("renderiza os objetos visuais como decorativos e preserva as teclas SYNC", () => {
    render(<HowToParticipatePage />);

    expect(
      document.querySelector("[data-component='nite-hero-symbol']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-component='process-object-visual']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-component='sync-key-stage']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByRole("list", { name: "Etapas de aproximação ao projeto" }),
    ).toBeInTheDocument();

    const keys = Array.from(document.querySelectorAll("[data-sync-key]")).map(
      (element) => element.textContent,
    );

    expect(keys).toEqual(["S", "Y", "N", "C"]);
  });

  it("declara metadata e breadcrumb da rota dedicada", () => {
    render(<HowToParticipatePage />);

    expect(metadata.title).toBe("Como participar | Oportunidades | NITE");
    expect(metadata.description).toBe(
      "Entenda como estudantes se aproximam do núcleo de desenvolvimento do NITE, ganham repertório e passam a atuar em projetos com ritmo e responsabilidade.",
    );
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/oportunidades/como-participar",
    );

    const structuredData = document.querySelector(
      "#structured-data-opportunities-how-to-participate-breadcrumb",
    );

    expect(structuredData).toBeInTheDocument();
    expect(structuredData?.textContent).toContain('"Oportunidades"');
    expect(structuredData?.textContent).toContain('"Como participar"');
    expect(structuredData?.textContent).toContain(
      "/oportunidades/como-participar",
    );
  });
});
```

- [ ] **Step 2: Add the CTA routing assertion to the existing opportunities test**

In `tests/unit/opportunities-page.test.tsx`, inside the first test after the `Ver oportunidades` assertion, add:

```tsx
    expect(
      main.getByRole("link", { name: /Processos\s+Como participar/i }),
    ).toHaveAttribute("href", "/oportunidades/como-participar");
```

Keep the existing `Ver oportunidades` expectation as `#open-positions`.

- [ ] **Step 3: Run the focused tests and verify the red state**

Run:

```powershell
npm test -- tests/unit/opportunities-page.test.tsx tests/unit/opportunities-how-to-participate-page.test.tsx
```

Expected result: FAIL. The new route import should fail because `@/app/oportunidades/como-participar/page` does not exist yet, and the existing card assertion should fail until the card link changes.

---

### Task 2: Implement The Route And Card Navigation

**Files:**
- Create: `app/oportunidades/como-participar/page.tsx`
- Modify: `app/oportunidades/page.tsx`
- Test: `tests/unit/opportunities-page.test.tsx`
- Test: `tests/unit/opportunities-how-to-participate-page.test.tsx`

- [ ] **Step 1: Create the route directory and page**

Create `app/oportunidades/como-participar/page.tsx` with this structure:

```tsx
import type { Metadata } from "next";

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
import { NiteSymbol } from "@/components/ui/nite-symbol";
import { cn } from "@/lib/utils";

const pageTitle = "Como participar | Oportunidades";
const pageDescription =
  "Entenda como estudantes se aproximam do núcleo de desenvolvimento do NITE, ganham repertório e passam a atuar em projetos com ritmo e responsabilidade.";
const heroDescription =
  "Como estudantes se aproximam do núcleo, desenvolvem repertório e entram em projetos com orientação, ritmo e responsabilidade.";

const narrativeParagraphs = [
  <>
    Entrar no NITE começa antes de uma seleção formal. Começa quando o estudante
    entende que o núcleo trabalha com <strong>problemas reais</strong>,
    colaboração entre áreas e entregas que precisam de continuidade.
  </>,
  <>
    A aproximação acontece pelo interesse em <strong>construir com método</strong>:
    observar uma demanda, aprender a organizar uma solução, testar caminhos,
    documentar decisões e evoluir junto com um contexto de projeto.
  </>,
  <>
    O processo valoriza repertório, disponibilidade e postura. Mais do que saber
    tudo de início, importa demonstrar <strong>curiosidade técnica</strong>,
    responsabilidade com o grupo e abertura para aprender em ciclos curtos.
  </>,
] as const;

const processSteps = [
  {
    title: "Aproximação",
    description: "conhecer o núcleo e seus campos de atuação",
  },
  {
    title: "Repertório",
    description: "organizar base técnica e disponibilidade",
  },
  {
    title: "Compatibilidade",
    description: "encontrar contexto, momento e ritmo",
  },
  {
    title: "Integração",
    description: "entrar em ciclos de entrega e revisão",
  },
] as const;

const readinessPrinciples = [
  {
    title: "Interesse vira construção.",
    paragraphs: [
      "O primeiro sinal não é dominar tudo. É transformar curiosidade em movimento: observar uma demanda, pesquisar, testar uma hipótese e voltar com algo que possa ser discutido.",
      "O NITE olha para esse gesto porque ele revela autonomia inicial, critério de aprendizado e vontade de aproximar estudo de projeto real.",
    ],
  },
  {
    title: "Ritmo sustenta evolução.",
    paragraphs: [
      "Ideias boas não seguram um projeto sozinhas. O que cria confiança é a capacidade de manter combinados, aparecer nas revisões e comunicar progresso antes que o trabalho dependa de cobrança.",
      "Participar do núcleo pede continuidade, leitura de prioridade e maturidade para dizer onde avançou, onde travou e o que precisa de decisão.",
    ],
  },
  {
    title: "Registro cria continuidade.",
    paragraphs: [
      "Projeto sério deixa rastro. Código, protótipo, decisão técnica, experimento, dado e processo precisam ser compreendidos por quem chega depois.",
      "No NITE, registro não é formalidade. É uma forma de transformar execução em memória compartilhada, reduzindo retrabalho e aumentando a qualidade do que o grupo consegue manter.",
    ],
  },
  {
    title: "Contexto define onde começar.",
    paragraphs: [
      "Desenvolvimento, dados, IA, UX, automação, robótica e documentação pedem repertórios diferentes. A entrada fica mais forte quando o estudante entende qual problema está diante dele, não apenas qual área parece mais interessante.",
      "Por isso, o processo observa compatibilidade entre pessoa, momento e contexto de projeto. O melhor lugar para começar é aquele em que o estudante cresce e o núcleo ganha contribuição real.",
    ],
  },
] as const;

const syncKeys = ["S", "Y", "N", "C"] as const;

const supportText = "text-nite-text-secondary";
const serifTitle =
  "font-heading font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/45";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: buildPageTitle(pageTitle),
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/oportunidades/como-participar"),
  },
  openGraph: {
    title: buildPageTitle(pageTitle),
    description: pageDescription,
    url: absoluteUrl("/oportunidades/como-participar"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: buildPageTitle(pageTitle),
    description: pageDescription,
  },
};

function HeroSymbol() {
  return (
    <div
      data-component="nite-hero-symbol"
      aria-hidden="true"
      className="relative mx-auto mt-20 grid size-44 place-items-center overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,.22),transparent_32%),linear-gradient(145deg,#242424,#050505_58%,#151515)] text-nite-brand-accent shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_32px_90px_rgba(0,0,0,.75)] grayscale sm:size-52"
      style={{ transform: "rotateX(4deg) rotateY(8deg)" }}
    >
      <span className="absolute -left-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.68),transparent_64%)] mix-blend-soft-light" />
      <NiteSymbol className="relative size-28 text-current sm:size-32" />
    </div>
  );
}

function ProcessObject() {
  return (
    <div
      data-component="process-object"
      className="relative mx-auto mt-12 max-w-5xl overflow-hidden"
    >
      <div
        data-component="process-object-visual"
        aria-hidden="true"
        className="relative h-[23rem] sm:h-[28rem]"
      >
        <div className="absolute inset-x-0 top-14 mx-auto h-80 max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.17),transparent_62%)] blur-xl" />
        <div
          className="absolute left-1/2 top-1/2 h-72 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[inset_0_0_42px_rgba(56,189,248,.08)]"
          style={{ transform: "translate(-50%, -50%) rotateX(58deg) rotateZ(-18deg)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-48 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f15a4d]/20"
          style={{ transform: "translate(-50%, -50%) rotateX(58deg) rotateZ(-18deg)" }}
        />
        <div className="absolute left-1/2 top-1/2 h-px w-[38rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300/80 to-transparent shadow-[0_0_24px_rgba(56,189,248,.35)]" />
        <div className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,.25),transparent_31%),linear-gradient(145deg,#272727,#050505_58%,#151515)] shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_32px_110px_rgba(0,0,0,.78),0_0_80px_rgba(56,189,248,.18)] grayscale">
          <span className="font-heading text-7xl text-white">N</span>
        </div>
      </div>
      <ol
        aria-label="Etapas de aproximação ao projeto"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-black/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_60px_rgba(0,0,0,.45)]"
          >
            <p className="text-xs text-nite-text-secondary">0{index + 1}</p>
            <h3 className="mt-2 font-heading text-lg font-normal text-nite-text-primary">
              {step.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-nite-text-secondary">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SyncKeyStage() {
  return (
    <div
      data-component="sync-key-stage"
      aria-hidden="true"
      className="relative mx-auto mt-10 h-72 w-full max-w-4xl"
    >
      <div className="absolute left-1/2 bottom-8 h-14 w-[34rem] max-w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,.2),transparent_68%)] blur-xl" />
      <div className="absolute inset-x-0 top-10 grid grid-cols-4 items-start gap-3 sm:gap-6">
        {syncKeys.map((letter, index) => (
          <div
            key={letter}
            data-sync-key={letter}
            className={cn(
              "grid aspect-square place-items-center rounded-[1.8rem] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,.2),rgba(255,255,255,.035)_24%,rgba(0,0,0,.72)_80%),radial-gradient(circle_at_38%_20%,rgba(255,255,255,.42),transparent_34%),#070707] shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-28px_50px_rgba(0,0,0,.78),0_38px_95px_rgba(0,0,0,.8)] grayscale",
              index === 0 && "mt-16 rotate-[-11deg] opacity-70",
              index === 1 && "rotate-[5deg]",
              index === 2 && "mt-8 rotate-[-4deg]",
              index === 3 && "mt-4 rotate-[13deg] opacity-60",
            )}
          >
            <span className="bg-gradient-to-br from-white via-zinc-400 to-white bg-clip-text text-5xl font-bold text-transparent sm:text-7xl">
              {letter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OpportunitiesHowToParticipatePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Oportunidades", path: "/oportunidades" },
    { name: "Como participar", path: "/oportunidades/como-participar" },
  ]);

  return (
    <>
      <SiteHeader />
      <script
        id="structured-data-opportunities-how-to-participate-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main
        id="conteudo-principal"
        className="overflow-hidden bg-nite-background text-nite-text-primary"
      >
        <section className="relative px-6 pb-24 pt-16 text-center sm:pt-24">
          <div className="absolute inset-x-0 top-28 -z-0 mx-auto h-[34rem] max-w-6xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_58%)]" />
          <Container size="xl" className="relative z-10">
            <HeroSymbol />
            <h1 className={cn(serifTitle, "mx-auto mt-12 max-w-4xl text-balance text-[clamp(3.4rem,8vw,6.5rem)] leading-none")}>
              O caminho para construir com o NITE
            </h1>
            <p className={cn(supportText, "mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg")}>
              {heroDescription}
            </p>
          </Container>
        </section>

        <section className="px-6 py-20 sm:py-28" aria-labelledby="caminho-entrada">
          <Container size="lg">
            <h2 id="caminho-entrada" className="text-center font-heading text-4xl font-normal text-nite-text-primary">
              O caminho de entrada
            </h2>
            <div className="mx-auto mt-12 grid max-w-[30rem] gap-7 text-lg leading-8 text-nite-text-secondary">
              {narrativeParagraphs.map((paragraph, index) => (
                <p key={index} className="[&_strong]:font-medium [&_strong]:text-nite-text-primary">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative px-6 py-20 sm:py-28" aria-labelledby="processo-projeto">
          <Container size="xl">
            <div className="text-center">
              <h2 id="processo-projeto" className={cn(serifTitle, "text-[clamp(2.8rem,5.4vw,4.5rem)] leading-none")}>
                Da aproximação ao projeto
              </h2>
              <p className={cn(supportText, "mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg")}>
                Uma jornada visual para entender como interesse, repertório e maturidade se conectam aos projetos de desenvolvimento do NITE.
              </p>
            </div>
            <ProcessObject />
            <p className={cn(supportText, "mx-auto mt-8 max-w-2xl text-center text-sm leading-7")}>
              De <strong className="text-nite-text-primary">aproximação</strong> a <strong className="text-nite-text-primary">integração</strong>, o processo é apresentado como um sistema de maturidade: o estudante se aproxima, ganha repertório, encontra compatibilidade e passa a atuar no ritmo de projeto do núcleo.
            </p>
          </Container>
        </section>

        <section className="px-6 py-20 sm:py-28" aria-labelledby="sinais-prontidao">
          <Container size="xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-nite-text-secondary">Como participar</p>
              <h2 id="sinais-prontidao" className={cn(serifTitle, "mx-auto mt-3 max-w-4xl text-[clamp(3rem,7vw,5.8rem)] leading-none")}>
                Sinais de prontidão
              </h2>
              <p className={cn(supportText, "mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg")}>
                Entrar no NITE não é escolher um rótulo. É encontrar sincronia entre interesse, repertório, ritmo e contexto de projeto.
              </p>
              <SyncKeyStage />
              <p className={cn(supportText, "mx-auto mt-3 max-w-xl text-sm leading-6")}>
                SYNC representa o ponto em que curiosidade, entrega e necessidade do projeto passam a trabalhar na mesma direção.
              </p>
            </div>

            <div className="mx-auto mt-20 grid max-w-5xl gap-0">
              {readinessPrinciples.map((principle, index) => (
                <article key={principle.title} className="grid gap-8 border-t border-nite-border-subtle py-14 lg:grid-cols-[minmax(18rem,27rem)_1fr] lg:gap-14">
                  <div className="relative min-h-72 overflow-hidden border border-white/8 bg-[radial-gradient(circle_at_20%_26%,rgba(255,255,255,.08),transparent_34%),linear-gradient(145deg,#171717,#090909_60%,#141414)] p-8">
                    <span className="font-heading text-8xl text-white sm:text-9xl">{index + 1}</span>
                    <h3 className="absolute bottom-8 left-8 right-8 font-heading text-4xl font-normal leading-tight text-nite-text-primary">
                      {principle.title}
                    </h3>
                  </div>
                  <div className="grid content-center gap-6 text-lg leading-8 text-nite-text-secondary">
                    {principle.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Update the process card destination**

In `app/oportunidades/page.tsx`, replace the opening tag for the process card:

```tsx
            <a href="#open-positions" className={niteCardFrame}>
```

with:

```tsx
            <Link href="/oportunidades/como-participar" className={niteCardFrame}>
```

Replace the matching closing tag:

```tsx
            </a>
```

with:

```tsx
            </Link>
```

Do not change the hero "Ver oportunidades" link; it should continue to point to `#open-positions`.

- [ ] **Step 3: Run the focused tests and verify green state**

Run:

```powershell
npm test -- tests/unit/opportunities-page.test.tsx tests/unit/opportunities-how-to-participate-page.test.tsx
```

Expected result: PASS for both files.

- [ ] **Step 4: Commit route and test implementation**

Run:

```powershell
git add -- app/oportunidades/page.tsx app/oportunidades/como-participar/page.tsx tests/unit/opportunities-page.test.tsx tests/unit/opportunities-how-to-participate-page.test.tsx
git commit -m "feat: adicionar pagina de como participar"
```

Expected result: one commit containing only the route, card link, and tests.

---

### Task 3: Run Quality Gates And Browser Verification

**Files:**
- Verify: `app/oportunidades/page.tsx`
- Verify: `app/oportunidades/como-participar/page.tsx`

- [ ] **Step 1: Run lint**

Run:

```powershell
npm run lint
```

Expected result: PASS with no ESLint errors.

- [ ] **Step 2: Run typecheck**

Run:

```powershell
npm run typecheck
```

Expected result: PASS with no TypeScript errors.

- [ ] **Step 3: Run the focused unit tests again**

Run:

```powershell
npm test -- tests/unit/opportunities-page.test.tsx tests/unit/opportunities-how-to-participate-page.test.tsx
```

Expected result: PASS.

- [ ] **Step 4: Start or reuse the local dev server**

If no server is running on port 3000, run:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Expected result: Next.js serves `http://127.0.0.1:3000`.

- [ ] **Step 5: Verify the browser flow**

Open `http://127.0.0.1:3000/oportunidades`.

Check:

- the "Processos / Como participar" card navigates to `/oportunidades/como-participar`;
- "Ver oportunidades" still scrolls to the open positions section;
- the new route renders the hero, narrative block, 3D process object, and `SYNC` section;
- the main content has no form, no input, no textarea, no select, no button, and no main CTA link;
- visible page text does not include "filosofia" or "frente";
- the key letters render in order as `S`, `Y`, `N`, `C`;
- no horizontal overflow appears on a 390px mobile viewport.

- [ ] **Step 6: Capture final status**

Run:

```powershell
git status --short
```

Expected result: no uncommitted files from the implementation. Local design artifacts such as `.superpowers/` or `output/` may remain untracked if they existed before implementation; do not stage them.

---

## Self-Review Notes

- Spec coverage: the plan covers the dedicated route, card navigation, no extra CTA, Resend-inspired hero, narrative block, 3D process object, `SYNC` key object, metadata, breadcrumb, accessibility, and verification.
- File boundaries: the new route owns its visual helpers locally; the existing opportunities route only changes navigation.
- Test coverage: unit tests guard the flow, approved copy, rejected visible terms, decorative visual objects, and metadata.
- Out of scope: no form, backend, authentication, opportunity model, or open positions logic is added.
