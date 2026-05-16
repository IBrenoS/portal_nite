import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import ProjectsPage, { metadata } from "@/app/projetos/page";

afterEach(() => {
  cleanup();
});

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
        name: "Lista de projetos e frentes",
      }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(document.querySelectorAll("[data-slot='card']")).toHaveLength(3);
    expect(
      document.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ).length,
    ).toBe(3);
    expect(
      main.getAllByText("Imagem ou evidência pública ainda indisponível."),
    ).toHaveLength(3);
    expect(
      main.getAllByText("Última atualização pendente de dado validado."),
    ).toHaveLength(3);

    expect(
      screen.getByRole("link", { name: /Software aplicado/i }),
    ).toHaveAttribute("href", "/projetos/software-aplicado");
    expect(
      screen.getByRole("link", { name: /Robótica educacional/i }),
    ).toHaveAttribute("href", "/projetos/robotica-educacional");
    expect(screen.getByRole("link", { name: /Dados e IA/i })).toHaveAttribute(
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
      screen.getByRole("link", { name: /Robótica educacional/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Software aplicado/i }),
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

  it("declara metadata institucional de portfolio", () => {
    expect(metadata.title).toBe("Projetos | NITE");
    expect(metadata.description).toContain("frentes e projetos do NITE");
    expect(metadata.alternates?.canonical?.toString()).toContain("/projetos");
  });
});
