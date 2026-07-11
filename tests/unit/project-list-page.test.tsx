import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import type { Project } from "@/biblioteca/esquemas";
import ProjectsPage, { metadata } from "@/app/projetos/page";
import { ProjectsFilterableList } from "@/components/sections/projects-filterable-list";

afterEach(() => {
  cleanup();
});

const realProjectFixture = {
  slug: "projeto-real-lista",
  title: "Projeto real na lista",
  summary:
    "Resumo controlado para validar card real com capa publica autorizada.",
  description:
    "Descricao controlada para validar a listagem de projetos em modo real.",
  problem:
    "Confirmar que a listagem usa uma capa unica, sem diferenciar origem visual.",
  context:
    "Fixture unitaria isolada do JSON oficial para preparar o caminho de publicacao real.",
  audience: ["Estudantes"],
  category: "Programação",
  year: 2026,
  status: "ativo",
  contentState: "real",
  currentPhase: "Validação pública",
  lastUpdated: "2026-05-18",
  nextStep: "Manter evidências públicas revisadas antes de ampliar a página.",
  coverImage: "/images/projetos/programacao-lab-card.png",
  alt: "Capa autorizada de teste para projeto real na lista.",
  featured: true,
  technologies: ["Next.js", "TypeScript", "API", "Dados extras"],
  deliverables: [
    {
      type: "demo",
      label: "Demo validada",
      href: "https://example.com/demo",
      status: "disponivel",
    },
  ],
  metrics: [],
  team: [],
  changelog: [],
  gallery: [
    {
      src: "/images/projetos/programacao-lab-card.png",
      alt: "Galeria autorizada de teste para projeto real na lista.",
    },
  ],
  highlights: [],
  objective:
    "Objetivo validado de teste para comprovar a renderizacao real do card.",
  results: "Resultado validado de teste para a listagem.",
  links: [],
} satisfies Project;

function makeProject(
  overrides: Partial<Project> & Pick<Project, "slug" | "title">,
): Project {
  const { slug, title, ...rest } = overrides;

  return {
    ...realProjectFixture,
    slug,
    title,
    summary: `Resumo curto do ${title} para validar o Explorer.`,
    description: `Descricao detalhada do ${title} para fixture controlada.`,
    problem: `Problema do ${title} para busca e filtros.`,
    context: `Contexto do ${title} para busca e filtros.`,
    coverImage: `/images/projetos/${slug}.png`,
    alt: `Capa do ${title} usada no Explorer.`,
    technologies: ["Next.js"],
    ...rest,
  };
}

async function chooseFilter(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  option: RegExp | string,
) {
  await user.click(screen.getByRole("combobox", { name: label }));
  await user.click(await screen.findByRole("option", { name: option }));
}

function explorerCards() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-component='project-explorer-card']",
    ),
  );
}

describe("ProjectsPage", () => {
  it("renderiza a pagina como Explorer/Catalogo, sem repetir a vitrine da Home", () => {
    render(<ProjectsPage />);

    const pattern = screen.getByTestId("projects-pattern-grid-trail");
    const canvas = screen.getByTestId("projects-pattern-grid-trail-canvas");
    const heroCopy = screen.getByTestId("projects-hero-copy");
    const lightBloom = screen.getByTestId("projects-hero-light-bloom");
    const greenLight = screen.getByTestId("projects-hero-green-field");
    const searchPanelShell = screen.getByTestId("projects-search-panel-shell");
    const projectsPage = pattern.closest("section");
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Ideias em movimento. Projetos em construção.",
    });
    const description = screen.getByText(
      "Veja como estudantes, professores e o NITE transformam desafios em experiências práticas.",
    );

    expect(projectsPage).toHaveAttribute("data-projects-page", "");
    expect(projectsPage).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(projectsPage).toHaveClass(
      "projectsPage",
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(pattern).toHaveAttribute(
      "data-background-source",
      "nite-design-system",
    );
    expect(pattern).toHaveAttribute(
      "data-background-color",
      "var(--projects-hero-canvas-background)",
    );
    expect(pattern).toHaveAttribute(
      "data-grid-color",
      "var(--projects-hero-grid-color)",
    );
    expect(pattern).toHaveAttribute(
      "data-trail-color",
      "var(--projects-hero-trail-color)",
    );
    expect(pattern).toHaveAttribute(
      "data-circle-color",
      "var(--projects-hero-node-color)",
    );
    expect(pattern).toHaveAttribute("data-grid-size", "20");
    expect(pattern).toHaveAttribute("data-trail-count", "7");
    expect(pattern).toHaveAttribute("data-min-trail-length", "100");
    expect(pattern).toHaveAttribute("data-max-trail-length", "500");
    expect(pattern).toHaveClass("bg-nite-background");
    expect(canvas).toHaveClass("absolute", "left-0", "top-0");
    expect(canvas).toHaveStyle({
      maskImage:
        "radial-gradient(closest-side, #000000 30%, #000000 31%, #00000000 100%)",
    });
    expect(heroCopy).toHaveClass(
      "z-10",
      "items-center",
      "justify-center",
      "text-center",
      "w-[calc(100%-3rem)]",
      "max-w-[47.5rem]",
      "md:absolute",
      "md:left-1/2",
      "md:top-[258px]",
      "md:w-[47.5rem]",
      "md:-translate-x-1/2",
    );
    expect(heading).toHaveClass(
      "text-[clamp(3.15rem,8vw,4rem)]",
      "font-semibold",
      "leading-[1]",
      "tracking-normal",
    );
    expect(description).toHaveClass(
      "max-w-[34rem]",
      "sm:text-lg",
      "sm:leading-8",
    );
    expect(lightBloom).toHaveAttribute("aria-hidden", "true");
    expect(lightBloom.getAttribute("src")).toContain("projects-hero-light.png");
    expect(lightBloom).toHaveAttribute("width", "868");
    expect(lightBloom).toHaveAttribute("height", "582");
    expect(lightBloom).toHaveClass(
      "absolute",
      "bottom-20",
      "left-1/2",
      "z-[1]",
      "-translate-x-1/2",
      "translate-y-1/3",
      "rotate-[235deg]",
      "pointer-events-none",
    );
    expect(greenLight).toHaveClass(
      "absolute",
      "inset-0",
      "left-1/2",
      "-translate-x-1/2",
      "h-full",
      "w-full",
      "md:w-[70vw]",
      "z-[2]",
      "projectsHeroGreenField",
      "pointer-events-none",
    );
    expect(greenLight.className).not.toContain("bg-[#2DCFBF]");
    expect(greenLight.className).not.toContain("mix-blend-color");
    expect(greenLight).toHaveStyle({
      maskImage:
        "radial-gradient(circle, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 90%)",
      maskSize: "100% 100%",
    });
    expect(searchPanelShell).toHaveClass(
      "relative",
      "z-10",
      "-mt-24",
      "lg:-mt-[270px]",
    );
    expect(
      document.querySelector("[src*='/static/product-pages/light.png']"),
    ).toBeNull();
    expect(screen.queryByTestId("projects-resend-light-bloom")).toBeNull();
    expect(screen.queryByTestId("projects-resend-green-light")).toBeNull();
    expect(
      document.querySelector("[src*='projects-hero-light.png']"),
    ).toBeInTheDocument();
    expect(
      document.querySelector("[src*='resend.com/static/product-pages']"),
    ).toBeNull();
    expect(
      document.querySelector("[style*='/static/product-pages/noise.png']"),
    ).toBeNull();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.queryByText("Explorer")).not.toBeInTheDocument();
    expect(screen.queryByText("Projetos do NITE")).not.toBeInTheDocument();
    expect(screen.queryByText("Lista de projetos")).not.toBeInTheDocument();
    expect(screen.queryByText("Projetos em destaque")).not.toBeInTheDocument();

    const main = within(screen.getByRole("main"));
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("data-footer-variant", "plain");
    expect(footer).not.toHaveClass("border-t", "sm:-mt-[7vh]");
    expect(footer.querySelector("[data-footer-transition-divider]")).toBeNull();
    expect(footer.querySelector("[data-footer-transition-glow]")).toBeNull();

    expect(screen.getByTestId("projects-filterable-list")).toHaveAttribute(
      "data-projects-explorer",
      "true",
    );
    expect(explorerCards()).toHaveLength(3);
    expect(
      document.querySelector("[data-component='project-card']"),
    ).toBeNull();
    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(0);
    expect(
      document.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ).length,
    ).toBe(3);

    expect(
      main.getByPlaceholderText("Pesquisar projetos..."),
    ).toBeInTheDocument();
    expect(main.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
    expect(
      main.getByRole("combobox", { name: "Tecnologia" }),
    ).toBeInTheDocument();
    expect(main.getByRole("combobox", { name: "Área" })).toBeInTheDocument();
    expect(main.getByRole("combobox", { name: "Ano" })).toBeInTheDocument();
    expect(
      main.getByRole("combobox", { name: "Ordenar por" }),
    ).toBeInTheDocument();

    expect(
      main.getByAltText(/Racks de servidores, rede e console de operação/i),
    ).toBeInTheDocument();
    expect(main.queryByText("Evidência pública")).not.toBeInTheDocument();
    expect(main.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(main.queryByText("Objetivo")).not.toBeInTheDocument();
    expect(main.queryByText("Próximo passo")).not.toBeInTheDocument();
    expect(main.queryByText("Stack")).not.toBeInTheDocument();
    expect(
      main.queryByText("Última atualização pendente de dado validado."),
    ).not.toBeInTheDocument();

    expect(
      main.getByRole("link", { name: /Data Center/i }),
    ).toHaveAttribute("href", "/projetos/data-center");
    expect(
      main.getByRole("link", { name: /Jogos Embarcados/i }),
    ).toHaveAttribute("href", "/projetos/jogos-embarcados");
    const embeddedGamesCard = main.getByRole("link", {
      name: /Jogos Embarcados/i,
    });
    expect(embeddedGamesCard?.querySelector("img")?.getAttribute("src")).toContain(
      "jogos-embarcados.png",
    );
    expect(main.getByRole("link", { name: /Dados e IA/i })).toHaveAttribute(
      "href",
      "/projetos/dados-e-ia",
    );
    expect(main.getAllByText("Ver projeto")).toHaveLength(3);
  });

  it("filtra por busca, status, area, tecnologia e ano via toolbar compacta", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    const main = within(screen.getByRole("main"));
    const search = main.getByRole("searchbox", {
      name: "Pesquisar projetos",
    });

    expect(explorerCards()).toHaveLength(3);
    expect(main.getByText("3 resultados exibidos.")).toBeInTheDocument();

    await user.type(search, "python");

    expect(explorerCards()).toHaveLength(1);
    expect(main.getByRole("link", { name: /Dados e IA/i })).toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: /Data Center/i }),
    ).not.toBeInTheDocument();

    await user.clear(search);
    await chooseFilter(user, "Status", /Em andamento/);

    expect(explorerCards()).toHaveLength(0);
    expect(
      main.getByText("Nenhum projeto corresponde aos filtros atuais.", {
        exact: false,
      }),
    ).toBeInTheDocument();

    await chooseFilter(user, "Status", /^Todos$/);
    await chooseFilter(user, "Área", /Robótica/);

    expect(explorerCards()).toHaveLength(1);
    expect(
      main.getByRole("link", { name: /Jogos Embarcados/i }),
    ).toBeInTheDocument();

    await chooseFilter(user, "Tecnologia", /Arduino/);

    expect(explorerCards()).toHaveLength(1);
    expect(
      main.getByRole("link", { name: /Jogos Embarcados/i }),
    ).toBeInTheDocument();

    await chooseFilter(user, "Ano", "2026");

    expect(explorerCards()).toHaveLength(1);

    await user.click(main.getByRole("button", { name: "Limpar filtros" }));

    expect(search).toHaveValue("");
    expect(explorerCards()).toHaveLength(3);
    expect(main.getByText("3 resultados exibidos.")).toBeInTheDocument();
  });

  it("ordena mantendo ordem editorial, mais recentes e A-Z", async () => {
    const user = userEvent.setup();
    const alpha = makeProject({
      slug: "alpha",
      title: "Alpha",
      lastUpdated: "2026-05-01",
      year: 2025,
    });
    const zeta = makeProject({
      slug: "zeta",
      title: "Zeta",
      lastUpdated: "2026-06-01",
      year: 2026,
    });
    const beta = makeProject({
      slug: "beta",
      title: "Beta",
      lastUpdated: "2026-04-01",
      year: 2024,
    });

    render(<ProjectsFilterableList projects={[zeta, beta, alpha]} />);

    expect(
      explorerCards().map(
        (card) => within(card).getByRole("heading").textContent,
      ),
    ).toEqual(["Zeta", "Beta", "Alpha"]);

    await chooseFilter(user, "Ordenar por", "Mais recentes");

    expect(
      explorerCards().map(
        (card) => within(card).getByRole("heading").textContent,
      ),
    ).toEqual(["Zeta", "Alpha", "Beta"]);

    await chooseFilter(user, "Ordenar por", "A-Z");

    expect(
      explorerCards().map(
        (card) => within(card).getByRole("heading").textContent,
      ),
    ).toEqual(["Alpha", "Beta", "Zeta"]);
  });

  it("declara metadata institucional de catalogo", () => {
    expect(metadata.title).toBe("Projetos | NITE");
    expect(metadata.description).toContain("iniciativas, pesquisas");
    expect(metadata.alternates?.canonical?.toString()).toContain("/projetos");
  });

  it("renderiza card de catalogo com capa unica, tres tags e sem metadados narrativos", () => {
    render(<ProjectsFilterableList projects={[realProjectFixture]} />);

    const card = screen.getByRole("link", { name: /Projeto real na lista/i });
    const cardContent = within(card);
    const category = cardContent.getByText("Programação").closest("span");
    const status = cardContent
      .getByText("Em andamento")
      .closest("[data-slot='status-badge']");

    expect(card).toHaveAttribute("href", "/projetos/projeto-real-lista");
    expect(card).toHaveAttribute("data-component", "project-explorer-card");
    expect(card).toHaveAttribute("data-card-family", "project-discovery");
    expect(card).toHaveAttribute("data-card-variant", "catalog");
    expect(card.className).toContain("hover:shadow-nite-lift");
    expect(card.className).toContain("duration-nite-micro");
    expect(card.className).toContain("ease-nite-out");
    expect(card.className).not.toContain("hover:shadow-[0_18px_54px");
    expect(screen.getByAltText(realProjectFixture.alt)).toBeInTheDocument();
    expect(category).toHaveClass("bg-nite-surface-subtle");
    expect(status).toHaveClass("bg-muted/40", "text-muted-foreground");
    expect(status?.className).not.toContain("bg-nite-background/35");
    expect(cardContent.getByText("Next.js")).toBeInTheDocument();
    expect(cardContent.getByText("TypeScript")).toBeInTheDocument();
    expect(cardContent.getByText("API")).toBeInTheDocument();
    expect(cardContent.queryByText("Dados extras")).not.toBeInTheDocument();
    expect(cardContent.getByText("Ver projeto")).toBeInTheDocument();
    expect(screen.queryByText("Evidência pública")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Última atualização: 18/05/2026"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Objetivo")).not.toBeInTheDocument();
    expect(screen.queryByText("Próximo passo")).not.toBeInTheDocument();
  });

  it("mantem o canvas preparado para redesenhar quando o tema muda", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "components",
        "sections",
        "projects-pattern-grid-trail.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('THEME_CHANGE_EVENT');
    expect(source).toContain('window.addEventListener(THEME_CHANGE_EVENT');
    expect(source).toContain('window.removeEventListener(THEME_CHANGE_EVENT');
    expect(source).toContain('new MutationObserver');
    expect(source).toContain('attributeFilter: ["data-theme"]');
    expect(source).toContain(
      "if (prefersReducedMotion) {\n              renderFrame();\n            }",
    );
  });
});
