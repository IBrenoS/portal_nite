import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import HowToParticipatePage, {
  metadata,
} from "@/app/oportunidades/como-participar/page";

afterEach(() => {
  cleanup();
});

describe("OpportunitiesHowToParticipatePage", () => {
  it("renderiza a rota dedicada como pagina editorial com CTA final para oportunidades", () => {
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
      main.getByRole("heading", { level: 2, name: "Sinais de prontidão" }),
    ).toBeInTheDocument();
    expect(main.queryByText("Como ler os sinais")).not.toBeInTheDocument();
    const readinessSection = document.querySelector(
      "[data-component='readiness-section']",
    );

    expect(readinessSection).toBeInTheDocument();
    expect(readinessSection).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(readinessSection).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(
      main.getByText(
        "Entrar no NITE não é escolher um rótulo. É encontrar sincronia entre interesse, repertório, ritmo e contexto de projeto.",
      ),
    ).toHaveClass(
      "text-base",
      "md:text-[1.125rem]",
      "md:leading-[1.5]",
      "font-normal",
      "text-nite-text-secondary",
      "text-balance",
    );
    expect(
      main.queryByRole("heading", {
        level: 2,
        name: "Da aproximação ao projeto",
      }),
    ).not.toBeInTheDocument();
    expect(main.queryByText("Como participar")).not.toBeInTheDocument();

    expect(mainElement.querySelector("form")).not.toBeInTheDocument();
    expect(
      mainElement.querySelectorAll("input, textarea, select, button"),
    ).toHaveLength(0);
  });

  it("mantem o hero como cena escura inspirada na primeira dobra da Resend", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const hero = document.querySelector(
      "[data-component='resend-inspired-hero']",
    );
    const heroGrid = document.querySelector(
      "[data-component='resend-inspired-hero-grid']",
    );
    const heroSymbol = document.querySelector(
      "[data-component='nite-hero-symbol']",
    );
    const heroHeading = screen.getByRole("heading", {
      level: 1,
      name: "O caminho para construir com o NITE",
    });

    expect(mainElement).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveClass("min-h-[calc(100svh-3.625rem)]");
    expect(hero).toHaveClass("bg-nite-background");
    expect(hero).not.toHaveClass("bg-black");
    expect(heroGrid).toHaveAttribute("aria-hidden", "true");
    expect(heroGrid).toHaveClass("bg-nite-background");
    expect(heroGrid).not.toHaveClass("bg-black");
    expect(heroSymbol).toHaveAttribute("data-visual-depth", "premium");
    expect(heroSymbol).toHaveAttribute("data-interaction", "pointer-tilt");
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-tilt-plane']"),
    ).toBeInTheDocument();
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-depth-grid']"),
    ).toBeInTheDocument();
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-light']"),
    ).toBeInTheDocument();
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-image-frame']"),
    ).toBeInTheDocument();
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-image-frame']"),
    ).not.toHaveClass("bg-black");
    expect(
      heroSymbol?.querySelector("[data-component='premium-icon-light']"),
    ).toHaveStyle({
      mixBlendMode: "soft-light",
    });
    expect(heroSymbol?.getAttribute("class")).not.toContain("perspective");
    expect(
      heroSymbol
        ?.querySelector("[data-component='premium-icon-light']")
        ?.getAttribute("style"),
    ).not.toContain("mask-image");
    const heroImage = heroSymbol?.querySelector("img");

    expect(heroImage).toHaveAttribute("alt", "");
    expect(heroImage).toHaveAttribute("data-component", "premium-icon-image");
    expect(heroImage?.getAttribute("src")).toContain("n-icon.png");
    expect(heroImage).toHaveClass("scale-[1.22]");
    expect(heroSymbol?.querySelector("svg")).not.toBeInTheDocument();
    expect(heroHeading).toHaveClass("font-heading", "nite-gradient-text");
  });

  it("replica a formula de rotacao e luz do icone da Resend", () => {
    render(<HowToParticipatePage />);

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1600,
    });

    const heroSymbol = document.querySelector<HTMLElement>(
      "[data-component='nite-hero-symbol']",
    );
    const tiltPlane = document.querySelector<HTMLElement>(
      "[data-component='premium-icon-tilt-plane']",
    );
    const light = document.querySelector<HTMLElement>(
      "[data-component='premium-icon-light']",
    );

    expect(heroSymbol).toBeInTheDocument();
    expect(tiltPlane).toBeInTheDocument();
    expect(light).toBeInTheDocument();
    expect(heroSymbol?.style.getPropertyValue("--hero-rotate-x")).toBe("0deg");
    expect(heroSymbol?.style.getPropertyValue("--hero-rotate-y")).toBe("0deg");
    expect(heroSymbol?.style.getPropertyValue("--pointer-x")).toBe("0px");
    expect(heroSymbol?.style.getPropertyValue("--pointer-y")).toBe("0px");

    heroSymbol!.getBoundingClientRect = () =>
      ({
        bottom: 572,
        height: 450,
        left: 179,
        right: 1411,
        top: 122,
        width: 1232,
        x: 179,
        y: 122,
        toJSON: () => {},
      }) as DOMRect;

    fireEvent.pointerMove(window, { clientX: 795, clientY: 347 });

    expect(heroSymbol?.style.getPropertyValue("--hero-rotate-x")).toBe(
      "1.335deg",
    );
    expect(heroSymbol?.style.getPropertyValue("--hero-rotate-y")).toBe(
      "3.975deg",
    );
    expect(heroSymbol?.style.getPropertyValue("--pointer-x")).toBe("159px");
    expect(heroSymbol?.style.getPropertyValue("--pointer-y")).toBe("89px");

    fireEvent.pointerLeave(heroSymbol!);

    expect(heroSymbol?.style.getPropertyValue("--hero-rotate-x")).toBe(
      "1.335deg",
    );
    expect(heroSymbol?.style.getPropertyValue("--pointer-x")).toBe("159px");
  });

  it("mantem hero e caminho de sinais conectados aos tokens NITE", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const hero = document.querySelector(
      "[data-component='resend-inspired-hero']",
    );
    const signalPath = document.querySelector(
      "[data-component='readiness-signal-path']",
    );
    const heroVisualContracts = Array.from(
      hero?.querySelectorAll<HTMLElement>("*") ?? [],
    )
      .map((element) => `${element.className} ${element.getAttribute("style")}`)
      .join(" ");
    const signalPathVisualContracts = Array.from(
      signalPath?.querySelectorAll<HTMLElement>("*") ?? [],
    )
      .map((element) => `${element.className} ${element.getAttribute("style")}`)
      .join(" ");

    expect(mainElement).toHaveClass("bg-nite-background");
    expect(heroVisualContracts).not.toMatch(
      /bg-black|border-white|text-white|from-white|via-zinc|to-white|sky-\d|#[0-9a-f]{3,8}|rgba?\(/i,
    );
    expect(signalPathVisualContracts).not.toMatch(
      /bg-black|border-white|text-white|from-white|via-zinc|to-white|sky-\d|border-\[#212629\]|text-\[#8C8C8C\]|text-\[#6B6B6B\]|#[0-9a-f]{3,8}|rgba?\(/i,
    );
    expect(signalPathVisualContracts).toContain(
      "border-[var(--readiness-panel-border)]",
    );
    expect(signalPathVisualContracts).toContain(
      "border-[var(--readiness-card-border)]",
    );
    expect(signalPathVisualContracts).toContain(
      "border-[var(--readiness-field-border)]",
    );
    expect(signalPathVisualContracts).toContain(
      "text-[var(--readiness-field-text)]",
    );
    expect(signalPathVisualContracts).toContain("text-nite-text-primary");
    expect(signalPathVisualContracts).toContain("text-nite-text-secondary");
  });

  it("define tokens locais de prontidao sem contaminar o design system global", () => {
    const pageSource = readFileSync(
      join(
        process.cwd(),
        "app",
        "oportunidades",
        "como-participar",
        "page.tsx",
      ),
      "utf8",
    );
    const signalPathSource = readFileSync(
      join(
        process.cwd(),
        "app",
        "oportunidades",
        "como-participar",
        "readiness-signal-path.tsx",
      ),
      "utf8",
    );
    const styles = readFileSync(
      join(
        process.cwd(),
        "app",
        "oportunidades",
        "como-participar",
        "readiness.module.css",
      ),
      "utf8",
    );

    expect(pageSource).toContain("styles.readinessSection");
    expect(pageSource).toContain('data-component="readiness-section"');
    expect(pageSource).not.toContain('data-nite-scene="inverse"');
    expect(pageSource).not.toContain("text-[#8C8C8C]");
    expect(signalPathSource).toContain("styles.pathLine");
    expect(signalPathSource).toContain("styles.pathLineTerminal");
    expect(signalPathSource).toContain("styles.panelHighlight");
    expect(signalPathSource).toContain("styles.cardSurface");
    expect(signalPathSource).toContain(
      "border-[var(--readiness-panel-border)]",
    );
    expect(signalPathSource).toContain("text-[var(--readiness-code-text)]");
    expect(signalPathSource).not.toMatch(
      /border-\[#212629\]|bg-black|text-white|from-white\/5|border-white|bg-white|text-\[#8C8C8C\]|text-\[#6B6B6B\]|#22FF991C|#44FFA493/i,
    );
    expect(styles).toContain(".readinessSection {");
    expect(styles).toContain("--readiness-marker-border:");
    expect(styles).toContain("--readiness-panel-border:");
    expect(styles).toContain("--readiness-card-surface:");
    expect(styles).toContain("--readiness-field-bg:");
    expect(styles).toContain("--readiness-log-bg:");
    expect(styles).toContain("--readiness-accent-green-soft:");
    expect(styles).toContain(':root[data-theme="light"] .readinessSection');
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
      expect(
        main.getByRole("heading", { level: 3, name: heading }),
      ).toBeInTheDocument();
    }

    expect(
      main.queryByText(
        "SYNC representa o ponto em que curiosidade, entrega e necessidade do projeto passam a trabalhar na mesma direção.",
      ),
    ).not.toBeInTheDocument();
    expect(
      main.getByText("memória compartilhada", { exact: false }),
    ).toBeInTheDocument();
    expect(main.queryByText(/filosofia/i)).not.toBeInTheDocument();
    expect(main.queryByText(/\bfrente\b/i)).not.toBeInTheDocument();
    expect(
      main.queryByText(/sem promessa|sem formulário|sem vaga/i),
    ).not.toBeInTheDocument();

    const finalCta = document.querySelector(
      "[data-component='readiness-final-cta']",
    );
    expect(finalCta).toBeInTheDocument();

    const finalCtaScope = within(finalCta as HTMLElement);
    expect(
      finalCtaScope.getByRole("heading", {
        level: 2,
        name: "Leve seus sinais para oportunidades",
      }),
    ).toHaveClass(
      "text-[3rem]",
      "md:text-[3.5rem]",
      "tracking-tighter",
      "text-center",
    );
    expect(
      finalCtaScope.getByText(
        "Interesse, ritmo, registro e contexto já mostram por onde começar. Avance para oportunidades e encontre o ponto de entrada mais alinhado ao seu momento.",
      ),
    ).toHaveClass(
      "text-base",
      "md:text-[1.125rem]",
      "md:leading-[1.5]",
      "text-center",
    );

    const ctaMark = finalCta?.querySelector(
      "[data-component='readiness-final-cta-mark']",
    );
    expect(ctaMark).toHaveAttribute("alt", "");
    expect(ctaMark?.getAttribute("src")).toContain(
      "/images/oportunidades/readiness-cta-mark.svg",
    );
    expect(ctaMark).toHaveClass("mb-8", "h-20", "w-20");

    const opportunityLink = finalCtaScope.getByRole("link", {
      name: "Ver oportunidades",
    });
    expect(opportunityLink).toHaveAttribute("href", "/oportunidades");
    expect(opportunityLink).toHaveClass("h-12", "rounded-2xl");
  });

  it("recria a anatomia vertical do caminho de sinais de prontidão", () => {
    render(<HowToParticipatePage />);

    expect(
      document.querySelector("[data-component='nite-hero-symbol']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-component='process-path-block']"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector("[data-component='process-path-visual']"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelectorAll("[data-component='process-path-node']"),
    ).toHaveLength(0);
    expect(
      document.querySelectorAll("[data-component='process-path-dot']"),
    ).toHaveLength(0);

    const removedDataPrefix = `data-${"bl"}${"ender"}`;
    const removedMarkerSelector = `[data-${"sync"}-${"key"}]`;
    const readinessSignalPath = document.querySelector(
      "[data-component='readiness-signal-path']",
    );
    const rows = document.querySelectorAll(
      "[data-component='readiness-signal-step-row']",
    );

    expect(
      document.querySelector("[data-component='process-object-visual']"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector("[data-component='readiness-visual-gap']"),
    ).not.toBeInTheDocument();
    expect(readinessSignalPath).toBeInTheDocument();
    expect(readinessSignalPath).toHaveAttribute(
      "data-implementation-reference",
      "readiness-signal-path",
    );
    expect(readinessSignalPath).toHaveClass(
      "mx-auto",
      "flex",
      "w-full",
      "flex-col",
      "items-center",
    );
    expect(rows).toHaveLength(4);

    for (const row of rows) {
      expect(row).toHaveClass(
        "grid",
        "w-full",
        "grid-cols-[2rem_1fr]",
        "gap-x-6",
        "md:grid-cols-[6rem_1fr_2fr]",
        "md:gap-x-10",
      );
    }

    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-marker-column']",
      ),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll("[data-component='readiness-signal-dot']"),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll("[data-component='readiness-signal-line']"),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-visual-column']",
      ),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll("[data-component='readiness-signal-panel']"),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-shell-mask-left']",
      ),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-shell-mask-bottom']",
      ),
    ).toHaveLength(4);
    for (const panel of document.querySelectorAll(
      "[data-component='readiness-signal-panel']",
    )) {
      expect(
        panel.querySelector(
          "[data-component='readiness-signal-shell-mask-left']",
        ),
      ).toHaveClass("absolute", "inset-y-0", "left-0", "z-10");
      expect(
        panel.querySelector(
          "[data-component='readiness-signal-shell-mask-bottom']",
        ),
      ).toHaveClass("absolute", "bottom-0", "left-0", "z-10");
      const shell = panel.querySelector(
        "[data-component='readiness-signal-panel-shell']",
      );
      expect(shell).toBeInTheDocument();
      expect(shell).toHaveClass(
        "overflow-visible",
        "rounded-tr-[3rem]",
        "border-x",
        "border-t",
        "border-[var(--readiness-panel-border)]",
      );
    }
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-panel-frame']",
      ),
    ).toHaveLength(4);
    for (const frame of document.querySelectorAll(
      "[data-component='readiness-signal-panel-frame']",
    )) {
      expect(frame).toHaveClass(
        "flex",
        "items-center",
        "justify-end",
        "gap-2",
        "border-b",
        "border-[var(--readiness-panel-border)]",
        "p-5",
        "pl-8",
      );
      expect(frame).not.toHaveClass("relative", "overflow-hidden");
    }
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-panel-fade-left']",
      ),
    ).toHaveLength(0);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-panel-fade-bottom']",
      ),
    ).toHaveLength(0);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-panel-glow']",
      ),
    ).toHaveLength(4);
    expect(
      document.querySelectorAll(
        "[data-component='readiness-signal-window-dot']",
      ),
    ).toHaveLength(0);
    expect(
      document.querySelector("[data-component='readiness-signal-code-panel']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-component='readiness-signal-terminal']"),
    ).toBeInTheDocument();
    for (const heading of document.querySelectorAll(
      "[data-component='readiness-signal-panel'] h4",
    )) {
      expect(heading).not.toHaveClass("font-heading");
    }
    expect(
      document.querySelectorAll("[data-component='readiness-log-row']"),
    ).toHaveLength(4);
    expect(
      document.querySelector("[data-webgl-intent]"),
    ).not.toBeInTheDocument();
    expect(document.querySelector("canvas")).not.toBeInTheDocument();
    expect(
      Array.from(document.querySelectorAll("*")).some((element) =>
        Array.from(element.attributes).some((attribute) =>
          attribute.name.startsWith(removedDataPrefix),
        ),
      ),
    ).toBe(false);
    expect(document.querySelectorAll(removedMarkerSelector)).toHaveLength(0);
    expect(document.querySelector("img[src*='stage']")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("tablist", {
        name: "Sinais de prontidão em abas",
      }),
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(
      screen.getByRole("list", { name: "Etapas de aproximação ao projeto" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("tabpanel", {
        name: "Painel do sinal Contexto",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByText("compatibilidade mapeada").length,
    ).toBeGreaterThan(0);
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
