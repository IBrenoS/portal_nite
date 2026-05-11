import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { validateNiteSvgContract } from "@/components/ui/validate-nite-svg-contract";

describe("HomePage", () => {
  it("renderiza a home pública sem rótulos internos", () => {
    render(<HomePage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(
      "Tecnologia aplicada, projetos reais e aprendizagem em movimento.",
    );

    const hero = within(screen.getByTestId("hero-section"));
    expect(
      hero.getByText("UNIJORGE / Núcleo de Inovação & Tecnologia"),
    ).toBeInTheDocument();
    expect(
      hero.getByText(
        "O NITE conecta estudantes, professores e gestão para transformar desafios acadêmicos em protótipos, produtos digitais, automações e experiências tecnológicas reais.",
      ),
    ).toBeInTheDocument();
    expect(
      hero.getByRole("link", { name: /Explorar frentes do NITE/i }),
    ).toHaveAttribute("href", "#projetos");
    expect(
      hero.getByRole("link", { name: /Propor um desafio/i }),
    ).toHaveAttribute("href", "#contato");

    for (const forbidden of [
      "Projetos aplicados",
      "Aprendizagem prática",
      "Tecnologia responsável",
      "Demonstrativo",
      "Em estruturação",
      "Em protótipo",
      "Status",
      "Categoria",
      "Stack",
      "Última atualização",
      "Próximo passo",
      "dashboard",
      "painel operacional",
    ]) {
      expect(hero.queryByText(forbidden)).not.toBeInTheDocument();
    }

    expect(
      screen.queryByText("M7 - SEO, acessibilidade e performance"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Landing institucional")).not.toBeInTheDocument();
    const builds = within(screen.getByTestId("builds-section"));
    expect(builds.getByText("O que o NITE constrói")).toBeInTheDocument();
    expect(
      builds.getByText(
        "Saídas concretas para transformar desafios acadêmicos em tecnologia aplicada.",
      ),
    ).toBeInTheDocument();
    expect(
      builds.getByText(
        "O núcleo organiza frentes de criação que aproximam estudantes, professores e gestão de protótipos, automações, experiências digitais e aprendizagem prática.",
      ),
    ).toBeInTheDocument();

    for (const title of [
      "Software aplicado",
      "Dados e IA",
      "Robótica e prototipagem",
      "Experiência digital",
      "Automação e processos",
      "Oficinas e aprendizagem prática",
    ]) {
      expect(builds.getByText(title)).toBeInTheDocument();
    }

    expect(builds.getAllByText("Saídas:")).toHaveLength(6);

    for (const removed of [
      "Aprendizado aplicado",
      "Tecnologia em prática",
      "Ponte institucional",
    ]) {
      expect(screen.queryByText(removed)).not.toBeInTheDocument();
    }

    const projects = within(screen.getByTestId("projects-operating-section"));
    expect(projects.getByText("Projetos em movimento")).toBeInTheDocument();
    expect(
      projects.getByText(
        "Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos.",
      ),
    ).toBeInTheDocument();
    expect(projects.getAllByText("Em estruturação")).toHaveLength(6);
    expect(projects.getAllByText("Mapeamento da frente")).toHaveLength(3);
    expect(projects.getAllByText("Última atualização")).toHaveLength(3);
    expect(projects.getAllByText("Entregável principal")).toHaveLength(3);
    expect(projects.getAllByText("Entregável em validação.")).toHaveLength(3);
    expect(projects.getAllByText("Próximo passo")).toHaveLength(3);
    expect(projects.queryByText("Equipe")).not.toBeInTheDocument();
    expect(projects.queryByText("Métrica")).not.toBeInTheDocument();
    expect(
      screen.getByText("A evolução do NITE em uma narrativa visual."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Primeiros projetos aplicados"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Quer acompanhar a evolução do NITE?"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("@nite.uj")).toHaveLength(2);

    for (const id of [
      "logo-final",
      "nite-logo",
      "brain",
      "text",
      "text-parte-1",
      "text-parte-2",
      "text-parte-3",
      "text-parte-4",
      "bulb",
      "energy-overlay",
      "energy-main-rise",
      "energy-routes",
      "electric-arcs",
      "spark-heads",
      "text-shimmer-mask",
    ]) {
      expect(document.querySelector(`#${id}`)).toBeInTheDocument();
    }

    expect(document.querySelector(".animated-nite-logo")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(
      document.querySelector("#logo-final")?.closest(".brand-panel"),
    ).toBeNull();
    expect(
      screen.getByRole("link", {
        name: "Ir para a página inicial do NITE UniJorge",
      }),
    ).toBeInTheDocument();
    expect(document.querySelector("[data-header-logo-morph]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.querySelector("[data-header-logo-state]")).toHaveAttribute(
      "data-header-logo-state",
      "expanded",
    );
    expect(
      document.querySelector("header")?.querySelector("img"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector("header")?.querySelector("svg"),
    ).not.toBeInTheDocument();

    expect(validateNiteSvgContract(document.body)).toEqual({
      mainRise: 3,
      routes: 11,
      arcs: 4,
      sparks: 14,
      shimmer: 3,
      overlays: 1,
    });
  });
});
