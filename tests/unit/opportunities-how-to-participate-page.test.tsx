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
      main.getByRole("heading", { level: 2, name: "Sinais de prontidão" }),
    ).toBeInTheDocument();
    expect(
      main.queryByRole("heading", {
        level: 2,
        name: "Da aproximação ao projeto",
      }),
    ).not.toBeInTheDocument();
    expect(main.queryByText("Como participar")).not.toBeInTheDocument();

    expect(main.queryByRole("link")).not.toBeInTheDocument();
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

  it("usa tokens do design system nas superficies visuais da pagina", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const serializedVisualContracts = Array.from(
      mainElement.querySelectorAll<HTMLElement>("*"),
    )
      .map((element) => `${element.className} ${element.getAttribute("style")}`)
      .join(" ");

    expect(serializedVisualContracts).not.toMatch(
      /bg-black|border-white|text-white|from-white|via-zinc|to-white|sky-\d|#[0-9a-f]{3,8}|rgba?\(/i,
    );
    expect(serializedVisualContracts).toContain("--nite-");
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
  });

  it("mantem o palco SYNC como transicao visual antes dos principios", () => {
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

    const syncStage = document.querySelector("[data-component='sync-key-stage']");

    expect(document.querySelector("[data-webgl-intent]")).toHaveAttribute(
      "data-webgl-intent",
      "resend-inspired-sync-key-scene",
    );
    expect(
      document.querySelector("[data-component='sync-key-webgl-canvas']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-component='sync-key-static-fallback']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-component='process-object-visual']"),
    ).not.toBeInTheDocument();
    expect(
      syncStage,
    ).toHaveClass("mt-8", "h-[22rem]", "lg:h-[34rem]");
    expect(syncStage).toHaveAttribute("aria-hidden", "true");
    expect(syncStage).toHaveAttribute("data-asset-source", "blender-glb");
    expect(syncStage).toHaveAttribute("data-orbit-control", "free-360");
    expect(syncStage).toHaveAttribute("data-pointer-cursor", "default");
    expect(syncStage).not.toHaveAttribute("data-interaction-boundary");
    expect(
      syncStage,
    ).toHaveAttribute(
      "data-blender-asset",
      "/models/oportunidades/sync-key-stage-blender.glb",
    );
    expect(
      document.querySelector("[data-component='sync-key-mobile-poster']"),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("sync-key-stage-poster-blender.png"),
    );
    expect(
      document.querySelector("[data-component='sync-key-interaction-band']"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector("[data-component='sync-key-interaction-line']"),
    ).not.toBeInTheDocument();
    expect(
      Array.from(syncStage!.children).filter(
        (child) => child.tagName.toLowerCase() === "div",
      ),
    ).toHaveLength(1);
    expect(
      document.querySelector("[data-component='sync-key-webgl-canvas']"),
    ).toHaveClass("cursor-default");
    expect(
      screen.queryByRole("list", { name: "Etapas de aproximação ao projeto" }),
    ).not.toBeInTheDocument();

    const firstArticle = screen.getAllByRole("article")[0];

    expect(firstArticle.parentElement).toHaveClass("mt-12", "sm:mt-16");

    const keys = Array.from(document.querySelectorAll("[data-sync-key]")).map(
      (element) => element.textContent,
    );

    expect(keys).toEqual(["S", "Y", "N", "C"]);

    const motionProfiles = Array.from(
      document.querySelectorAll("[data-sync-motion-profile]"),
    ).map((element) => element.getAttribute("data-sync-motion-profile"));

    expect(motionProfiles).toEqual([
      "heavy-drift",
      "loose-tumble",
      "steady-hover",
      "deep-orbit",
    ]);
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
