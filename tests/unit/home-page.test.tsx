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
      "Tecnologia aplicada, aprendizagem e projetos em evolução.",
    );

    const hero = within(screen.getByTestId("hero-section"));
    expect(
      hero.getByText("UNIJORGE / Núcleo de Inovação & Tecnologia"),
    ).toBeInTheDocument();
    expect(
      hero.getByText(
        "O NITE conecta estudantes, professores e desafios institucionais em um portal para acompanhar frentes, oportunidades e movimentos do núcleo com contexto e transparência.",
      ),
    ).toBeInTheDocument();
    expect(
      hero.getByRole("link", { name: /Explorar projetos/i }),
    ).toHaveAttribute("href", "/projetos");
    expect(
      hero.getByRole("link", { name: /Conhecer o NITE/i }),
    ).toHaveAttribute("href", "#sobre");

    for (const forbidden of [
      "Explorar frentes do NITE",
      "Propor um desafio",
      "projetos reais",
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
    expect(projects.getByText("Projetos em destaque")).toBeInTheDocument();
    expect(
      projects.getByText(
        "Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos.",
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getByTestId("projects-operating-section")
        .querySelectorAll("[data-slot='card']"),
    ).toHaveLength(3);
    expect(
      screen
        .getByTestId("projects-operating-section")
        .querySelectorAll("[data-slot='status-badge'][data-status='draft']"),
    ).toHaveLength(3);
    expect(projects.getAllByText("Em estruturação")).toHaveLength(3);
    expect(projects.getAllByText("Objetivo")).toHaveLength(3);
    expect(projects.getAllByText("Próximo passo")).toHaveLength(3);
    expect(projects.getAllByText("Stack")).toHaveLength(3);
    expect(
      projects.getAllByText("Imagem ou evidência pública ainda indisponível."),
    ).toHaveLength(3);
    expect(
      projects.getAllByText("Última atualização pendente de dado validado."),
    ).toHaveLength(3);
    expect(projects.getAllByText("Ver projeto")).toHaveLength(3);
    expect(
      projects.getAllByRole("link", { name: /Ver projeto/i }),
    ).toHaveLength(3);
    expect(
      projects.queryByText("Entregável principal"),
    ).not.toBeInTheDocument();
    expect(
      projects.queryByText("Entregável em validação."),
    ).not.toBeInTheDocument();
    expect(projects.queryByText("Equipe")).not.toBeInTheDocument();
    expect(projects.queryByText("Métrica")).not.toBeInTheDocument();
    expect(
      screen.getByText("Linha do tempo em preparação."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Marcos históricos do NITE serão publicados nesta seção apenas após validação/autorização institucional.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Marcos ainda não publicados")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Os registros demonstrativos permanecem fora da interface pública para não parecerem histórico real validado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Conteúdos reais serão adicionados quando houver marcos, datas e evidências confirmadas.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("Primeiros projetos aplicados")).toBeNull();
    expect(screen.queryByText("Estruturação do NITE")).toBeNull();
    expect(screen.queryByText("Vitrine para a comunidade")).toBeNull();
    expect(
      screen.getByText("Quer acompanhar a evolução do NITE?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Comece pelos projetos e pela área de Atualizações. A linha do tempo institucional será exibida quando houver marcos validados.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver linha do tempo" }),
    ).toHaveAttribute("href", "#timeline");
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
      document.querySelector("[data-header-logo-morph]")?.querySelector("svg"),
    ).not.toBeInTheDocument();
    const header = within(document.querySelector("header") as HTMLElement);
    for (const group of [
      "O NITE",
      "Projetos",
      "Atualizações",
      "Oportunidades",
      "Contato",
    ]) {
      expect(header.getByRole("button", { name: group })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
    expect(
      header.getByRole("link", { name: "Falar com o NITE" }),
    ).toHaveAttribute("href", "/contato");
    const themeGroup = header.getByRole("group", {
      name: "Tema da interface",
    });
    for (const themeOption of ["Sistema", "Claro", "Escuro"]) {
      expect(
        within(themeGroup).getByRole("radio", { name: themeOption }),
      ).toBeInTheDocument();
    }

    const footerElement = screen.getByRole("contentinfo");
    const footer = within(footerElement);
    expect(footer.getByText("NITE | UNIJORGE")).toBeInTheDocument();
    expect(
      footer.getByText(
        "Portal institucional do Núcleo de Inovação, Tecnologia e Empreendedorismo.",
      ),
    ).toBeInTheDocument();
    expect(
      footer.getByText(
        "Conteúdos e oportunidades dependem de validação/autorização institucional.",
      ),
    ).toBeInTheDocument();
    expect(footer.getByRole("link", { name: "Início" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(footer.getByRole("link", { name: "Projetos" })).toHaveAttribute(
      "href",
      "/projetos",
    );
    expect(footer.getByRole("link", { name: "Oportunidades" })).toHaveAttribute(
      "href",
      "/oportunidades",
    );
    expect(footer.getByRole("link", { name: "Atualizações" })).toHaveAttribute(
      "href",
      "/atualizacoes",
    );
    expect(footer.getByRole("link", { name: "Contato" })).toHaveAttribute(
      "href",
      "/contato",
    );
    expect(footer.queryByRole("link", { name: "Sobre" })).toBeNull();
    expect(footer.queryByRole("link", { name: "Timeline" })).toBeNull();
    expect(document.querySelector("footer a[href='/noticias']")).toBeNull();
    expect(document.querySelector("footer a[href='/sobre']")).toBeNull();
    expect(
      document.querySelector("footer a[href='/contato?tipo=desafio']"),
    ).toBeNull();

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
