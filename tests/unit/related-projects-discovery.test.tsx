import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  RelatedProjectsDiscovery,
  type RelatedProjectDiscoveryItem,
} from "@/components/sections/related-projects-discovery";

const baseItem = {
  href: "/projetos/data-center" as RelatedProjectDiscoveryItem["href"],
  title: "Data Center",
  summary:
    "Frente de teste para validar o card compacto de descoberta dos projetos relacionados.",
  area: "Programação",
  status: "draft",
  statusLabel: "Em estruturação",
  currentPhase: "Mapeamento da frente",
  stack: ["Next.js", "TypeScript", "UI responsiva", "Dados extras"],
  visual: {
    src: "/images/projetos/data-center.png",
    alt: "Racks de servidores e equipamentos de rede em um data center.",
  },
} satisfies RelatedProjectDiscoveryItem;

function makeItem(
  index: number,
  overrides: Partial<RelatedProjectDiscoveryItem> = {},
): RelatedProjectDiscoveryItem {
  return {
    ...baseItem,
    href: `/projetos/projeto-${index}` as RelatedProjectDiscoveryItem["href"],
    title: `Projeto relacionado ${index}`,
    summary: `Resumo controlado do projeto relacionado ${index}.`,
    ...overrides,
  };
}

function setOverflow(
  carousel: HTMLElement,
  {
    clientWidth = 320,
    scrollLeft = 0,
    scrollWidth = 960,
  }: {
    clientWidth?: number;
    scrollLeft?: number;
    scrollWidth?: number;
  } = {},
) {
  Object.defineProperty(carousel, "clientWidth", {
    configurable: true,
    value: clientWidth,
  });
  Object.defineProperty(carousel, "scrollWidth", {
    configurable: true,
    value: scrollWidth,
  });
  carousel.scrollLeft = scrollLeft;
  fireEvent.scroll(carousel);
}

beforeEach(() => {
  window.history.replaceState({}, "", "/projetos/data-center");
  window.sessionStorage.clear();
  Element.prototype.scrollBy = vi.fn();
  Element.prototype.scrollTo = vi.fn();
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn(() => true);
  Element.prototype.releasePointerCapture = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("RelatedProjectsDiscovery", () => {
  it("centraliza um card compacto com o NITE Discovery Frame", () => {
    render(<RelatedProjectsDiscovery projects={[makeItem(1)]} />);

    const section = screen.getByTestId("related-projects-discovery");
    const title = screen.getByRole("heading", {
      level: 2,
      name: "Continue explorando os projetos do NITE.",
    });
    const carousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });
    const card = section.querySelector(
      "[data-component='related-project-card']",
    ) as HTMLElement;
    const link = screen.getByRole("link", {
      name: /Projeto relacionado 1/i,
    });
    const visual = card.querySelector(
      "[data-component='related-project-card-visual']",
    ) as HTMLElement;
    const content = card.querySelector(
      "[data-component='related-project-card-content']",
    ) as HTMLElement;
    const topLine = card.querySelector(
      "[data-component='related-project-card-top-line']",
    );
    const borderVeil = card.querySelector(
      "[data-component='related-project-card-border-veil']",
    );
    const image = card.querySelector("img") as HTMLImageElement;
    const summary = screen.getByText(
      "Resumo controlado do projeto relacionado 1.",
    );
    const category = screen.getByText("Programação").closest("span");
    const status = screen
      .getByText("Em estruturação")
      .closest("[data-slot='status-badge']");
    const imageFade = card.querySelector(
      "[data-component='related-project-card-image-fade']",
    );

    expect(section).toHaveAttribute("data-related-projects-layout", "single");
    expect(section).toHaveAttribute("data-related-projects-count", "1");
    expect(section).toHaveAttribute("data-surface", "nite-background");
    expect(section).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(section).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(title).toHaveClass("text-nite-text-primary");
    expect(title).not.toHaveClass("text-foreground");
    expect(carousel).toHaveAttribute("data-related-projects-carousel", "false");
    expect(carousel).not.toHaveAttribute("tabindex");
    expect(carousel).toHaveClass("justify-center", "gap-6");

    expect(card).toHaveClass(
      "relative",
      "isolate",
      "flex",
      "w-[min(86vw,22rem)]",
      "flex-none",
      "flex-col",
      "gap-4",
      "rounded-3xl",
      "border",
      "border-b-0",
      "border-[var(--related-card-border)]",
      "bg-nite-background",
      "sm:w-[22rem]",
    );
    expect(card).not.toHaveAttribute("style");
    expect(card.getAttribute("class")).not.toContain("min-h");
    expect(card.getAttribute("class")).not.toContain("shadow");
    expect(card.getAttribute("class")).not.toContain("radial-gradient");
    expect(card.getAttribute("class")).not.toContain("mask-image");

    expect(topLine).toHaveClass(
      "absolute",
      "left-1/2",
      "top-0",
      "h-px",
      "w-[150px]",
      "-translate-x-1/2",
      "-translate-y-1/2",
    );
    expect(topLine?.getAttribute("class")).not.toContain("linear-gradient");
    expect(
      card.querySelectorAll("[data-component*='card-top-line']"),
    ).toHaveLength(1);
    expect(topLine?.getAttribute("class")).not.toContain("blur");

    expect(borderVeil).toHaveClass(
      "absolute",
      "-left-0.5",
      "-top-0.5",
      "h-[calc(100%_+_4px)]",
      "w-[calc(100%_+_4px)]",
    );
    expect(borderVeil?.getAttribute("class")).not.toContain("linear-gradient");

    expect(link).toHaveAttribute("data-card-family", "project-discovery");
    expect(link).toHaveAttribute("data-card-variant", "related");
    expect(link).toHaveClass(
      "relative",
      "z-10",
      "overflow-hidden",
      "rounded-3xl",
    );
    expect(visual).toHaveClass("aspect-[50/27]", "overflow-hidden");
    expect(content).toHaveClass("gap-3", "p-4");
    expect(summary).toHaveClass("[-webkit-line-clamp:2]");
    expect(image.getAttribute("class")).toContain(
      "group-hover/card:scale-[1.025]",
    );
    expect(image.getAttribute("class")).toContain("duration-nite-micro");
    expect(image.getAttribute("class")).toContain("ease-nite-out");
    expect(image.getAttribute("class")).toContain(
      "motion-reduce:group-hover/card:scale-100",
    );
    expect(imageFade?.getAttribute("class")).not.toContain("linear-gradient");

    expect(category).toHaveClass("bg-[var(--related-chip-background)]");
    expect(status).toHaveClass("bg-muted/40", "text-muted-foreground");
    expect(status?.className).not.toContain("bg-nite-background/35");
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("UI responsiva")).toBeInTheDocument();
    expect(screen.queryByText("Dados extras")).not.toBeInTheDocument();
    expect(screen.queryByText("Mapeamento da frente")).not.toBeInTheDocument();
    expect(screen.getByText("Ver projeto")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Projeto anterior" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Próximo projeto" }),
    ).not.toBeInTheDocument();
  });

  it("exibe dois cards no desktop e mantém carrossel somente no mobile", () => {
    render(<RelatedProjectsDiscovery projects={[makeItem(1), makeItem(2)]} />);

    const section = screen.getByTestId("related-projects-discovery");
    const carousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });

    expect(section).toHaveAttribute("data-related-projects-layout", "paired");
    expect(carousel).toHaveAttribute("data-related-projects-carousel", "true");
    expect(carousel).toHaveClass(
      "flex",
      "gap-6",
      "min-w-0",
      "overflow-x-auto",
      "snap-x",
      "md:grid",
      "md:grid-cols-[repeat(2,22rem)]",
      "md:justify-center",
      "md:overflow-visible",
      "md:snap-none",
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.queryByRole("button", { name: "Projeto anterior" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Próximo projeto" }),
    ).not.toBeInTheDocument();
  });

  it("ativa controles acessíveis apenas quando o carrossel possui overflow", () => {
    render(
      <RelatedProjectsDiscovery
        projects={[makeItem(1), makeItem(2), makeItem(3), makeItem(4)]}
      />,
    );

    const section = screen.getByTestId("related-projects-discovery");
    const carousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });

    expect(section).toHaveAttribute("data-related-projects-layout", "carousel");
    expect(carousel).toHaveAttribute("data-related-projects-carousel", "true");
    expect(carousel).toHaveAttribute("data-related-projects-preview", "true");
    expect(carousel).not.toHaveAttribute("tabindex");

    setOverflow(carousel);

    const previous = screen.getByRole("button", {
      name: "Projeto anterior",
    });
    const next = screen.getByRole("button", { name: "Próximo projeto" });

    expect(carousel).toHaveAttribute("tabindex", "0");
    expect(carousel).toHaveClass("cursor-grab", "snap-x", "snap-mandatory");
    expect(previous).toHaveClass("hidden", "md:inline-flex");
    expect(previous).toBeDisabled();
    expect(next).not.toBeDisabled();

    fireEvent.click(next);
    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
    fireEvent.keyDown(carousel, { key: "End" });
    fireEvent.keyDown(carousel, { key: "Home" });

    expect(Element.prototype.scrollBy).toHaveBeenCalledTimes(3);
    expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(2);

    setOverflow(carousel, { scrollLeft: 640 });

    expect(
      screen.getByRole("button", { name: "Próximo projeto" }),
    ).toBeDisabled();
  });

  it("suporta drag por mouse e touch sem transformar o gesto em navegação", () => {
    render(
      <RelatedProjectsDiscovery
        projects={[makeItem(1), makeItem(2), makeItem(3)]}
      />,
    );

    const carousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });
    const firstLink = screen.getAllByRole("link", {
      name: /Projeto relacionado/i,
    })[0];

    setOverflow(carousel);

    fireEvent.pointerDown(firstLink, {
      button: 0,
      clientX: 180,
      pointerId: 1,
      pointerType: "mouse",
    });
    fireEvent.pointerMove(firstLink, {
      clientX: 80,
      pointerId: 1,
      pointerType: "mouse",
    });
    fireEvent.pointerUp(firstLink, {
      pointerId: 1,
      pointerType: "mouse",
    });
    fireEvent.click(firstLink);

    expect(carousel.scrollLeft).toBe(100);
    expect(Element.prototype.setPointerCapture).toHaveBeenCalledWith(1);
    expect(Element.prototype.releasePointerCapture).toHaveBeenCalledWith(1);
    expect(window.sessionStorage).toHaveLength(0);

    fireEvent.pointerDown(firstLink, {
      button: 0,
      clientX: 160,
      pointerId: 2,
      pointerType: "touch",
    });
    fireEvent.pointerMove(firstLink, {
      clientX: 110,
      pointerId: 2,
      pointerType: "touch",
    });
    fireEvent.pointerUp(firstLink, {
      pointerId: 2,
      pointerType: "touch",
    });

    expect(carousel.scrollLeft).toBe(150);
    expect(Element.prototype.setPointerCapture).toHaveBeenCalledWith(2);
  });

  it("restaura a posição horizontal ao voltar para a página do projeto", async () => {
    const projects = [makeItem(1), makeItem(2), makeItem(3), makeItem(4)];
    const { unmount } = render(
      <RelatedProjectsDiscovery projects={projects} />,
    );
    const carousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });
    const firstLink = screen.getAllByRole("link", {
      name: /Projeto relacionado/i,
    })[0];

    setOverflow(carousel, { scrollLeft: 144 });
    firstLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(firstLink);

    expect(
      window.sessionStorage.getItem(
        "nite:related-projects-scroll:/projetos/data-center",
      ),
    ).toBe("144");

    unmount();
    render(<RelatedProjectsDiscovery projects={projects} />);

    const restoredCarousel = screen.getByRole("region", {
      name: "Projetos relacionados",
    });

    await waitFor(() => expect(restoredCarousel.scrollLeft).toBe(144));
    expect(
      window.sessionStorage.getItem(
        "nite:related-projects-scroll:/projetos/data-center",
      ),
    ).toBeNull();
  });

  it("define tokens locais do NITE Discovery Frame sem literais dark-first no TSX", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "components",
        "sections",
        "related-projects-discovery.tsx",
      ),
      "utf8",
    );
    const styles = readFileSync(
      join(
        process.cwd(),
        "components",
        "sections",
        "related-projects-discovery.module.css",
      ),
      "utf8",
    );

    expect(source).toContain("relatedProjectsDiscovery");
    expect(source).toContain("border-[var(--related-card-border)]");
    expect(source).toContain("styles.relatedCardTopLine");
    expect(source).toContain("styles.relatedCardBorderVeil");
    expect(source).toContain("styles.relatedCardImageFade");
    expect(source).not.toContain("color(display-p3 0.882 0.949 0.996");
    expect(source).not.toContain("rgba(225,242,254");
    expect(source).not.toContain("rgba(143,143,143");
    expect(styles).toContain(".relatedProjectsDiscovery {");
    expect(styles).toContain(".relatedCardTopLine {");
    expect(styles).toContain(".relatedCardBorderVeil {");
    expect(styles).toContain(".relatedCardImageFade {");
    expect(styles).toContain(
      "--related-card-background: var(--nite-background);",
    );
    expect(styles).toContain("--related-card-border: var(--nite-border-subtle);");
    expect(styles).toContain("--related-card-top-line-gradient:");
    expect(styles).toContain("--related-card-border-veil:");
    expect(styles).toContain("--related-card-image-fade:");
    expect(styles).toContain(
      "background: var(--related-card-top-line-gradient);",
    );
    expect(styles).toContain("background: var(--related-card-border-veil);");
    expect(styles).toContain("background: var(--related-card-image-fade);");
    expect(styles).toContain(
      "--related-chip-background: var(--nite-surface-subtle);",
    );
    expect(styles).toContain(':root[data-theme="dark"] .relatedProjectsDiscovery');
    expect(styles).toContain(
      "--related-card-border: color(display-p3 0.882 0.949 0.996 / 0.183);",
    );
    expect(styles).toContain(
      "--related-card-top-line: rgba(143, 143, 143, 0.67);",
    );
    expect(styles).toContain(':root[data-theme="light"] .relatedProjectsDiscovery');
    expect(styles).toContain("--related-card-image-fade: none;");
  });
});
