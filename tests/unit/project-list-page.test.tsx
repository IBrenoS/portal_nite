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
    "Resumo controlado para validar card real com capa pública autorizada.",
  description:
    "Descrição controlada para validar a listagem de projetos em modo real.",
  problem:
    "Confirmar que a listagem usa imagem e data somente para conteúdo real.",
  context:
    "Fixture unitária isolada do JSON oficial para preparar o caminho de publicação real.",
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
  technologies: ["Next.js", "TypeScript"],
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
    "Objetivo validado de teste para comprovar a renderização real do card.",
  results: "Resultado validado de teste para a listagem.",
  links: [],
} satisfies Project;

describe("ProjectsPage", () => {
  it("renderiza listagem com ProjectCard, StatusBadge e links reais", () => {
    render(<ProjectsPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projetos do NITE" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Lista de projetos",
      }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("data-footer-variant", "plain");
    expect(footer).not.toHaveClass("border-t", "sm:-mt-[7vh]");
    expect(footer.querySelector("[data-footer-transition-divider]")).toBeNull();
    expect(footer.querySelector("[data-footer-transition-glow]")).toBeNull();

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(3);
    expect(
      document.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ).length,
    ).toBe(3);
    expect(main.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(
      main.getByAltText(
        /Ilustração editorial da frente de software aplicado/i,
      ),
    ).toBeInTheDocument();
    expect(
      main.queryByText("Imagem ou evidência pública ainda indisponível."),
    ).not.toBeInTheDocument();
    expect(
      main.getAllByText("Última atualização pendente de dado validado."),
    ).toHaveLength(3);

    expect(
      main.getByRole("link", { name: /Software aplicado/i }),
    ).toHaveAttribute("href", "/projetos/software-aplicado");
    expect(
      main.getByRole("link", { name: /Robótica educacional/i }),
    ).toHaveAttribute("href", "/projetos/robotica-educacional");
    expect(main.getByRole("link", { name: /Dados e IA/i })).toHaveAttribute(
      "href",
      "/projetos/dados-e-ia",
    );

    expect(screen.queryByText("Responsável")).not.toBeInTheDocument();
    expect(screen.queryByText("Métrica")).not.toBeInTheDocument();
  });

  it("filtra por status, área, combinação e permite limpar filtros", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    const main = within(screen.getByRole("main"));

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(3);
    expect(
      main.getByRole("button", { name: /Todos, 3 itens, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      main.getByRole("button", { name: /Todas, 3 itens, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(
      main.getByRole("button", { name: /Em andamento, 0 itens/i }),
    );

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(0);
    expect(
      main.getByText("Nenhum projeto corresponde aos filtros atuais.", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("button", { name: /Em andamento, 0 itens, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(main.getByRole("button", { name: /Todos, 3 itens/i }));
    await user.click(main.getByRole("button", { name: /Robótica, 1 item/i }));

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(1);
    expect(
      main.getByRole("link", { name: /Robótica educacional/i }),
    ).toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: /Software aplicado/i }),
    ).not.toBeInTheDocument();

    await user.click(
      main.getByRole("button", { name: /Em estruturação, 3 itens/i }),
    );

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(1);
    expect(
      main.getByRole("button", {
        name: /Em estruturação, 3 itens, ativo/i,
      }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      main.getByRole("button", { name: /Robótica, 1 item, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(main.getByRole("button", { name: "Limpar filtros" }));

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(3);
    expect(
      main.getByRole("button", { name: /Todos, 3 itens, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      main.getByRole("button", { name: /Todas, 3 itens, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("filtra por busca textual e tecnologia sem criar rotas de tag", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    const main = within(screen.getByRole("main"));
    const search = main.getByRole("searchbox", {
      name: "Buscar projetos por nome, resumo, categoria ou tecnologia",
    });

    await user.type(search, "python");

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(1);
    expect(main.getByRole("link", { name: /Dados e IA/i })).toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: /Software aplicado/i }),
    ).not.toBeInTheDocument();

    await user.clear(search);
    await user.click(main.getByRole("button", { name: /Arduino, 1 item/i }));

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(1);
    expect(
      main.getByRole("link", { name: /Robótica educacional/i }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("button", { name: /Arduino, 1 item, ativo/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(main.getByRole("button", { name: "Limpar filtros" }));

    expect(search).toHaveValue("");
    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(3);
  });

  it("declara metadata institucional de portfolio", () => {
    expect(metadata.title).toBe("Projetos | NITE");
    expect(metadata.description).toContain("frentes e projetos do NITE");
    expect(metadata.alternates?.canonical?.toString()).toContain("/projetos");
  });

  it("renderiza ProjectCard em modo real com capa e data via fixture controlada", () => {
    render(<ProjectsFilterableList projects={[realProjectFixture]} />);

    const card = screen.getByRole("link", { name: /Projeto real na lista/i });
    const cardContent = within(card);

    expect(card).toHaveAttribute("href", "/projetos/projeto-real-lista");
    expect(screen.getByAltText(realProjectFixture.alt)).toBeInTheDocument();
    expect(cardContent.getByText("Em andamento")).toBeInTheDocument();
    expect(
      cardContent.getByText("Última atualização: 18/05/2026"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Imagem ou evidência pública ainda indisponível."),
    ).not.toBeInTheDocument();
  });
});
