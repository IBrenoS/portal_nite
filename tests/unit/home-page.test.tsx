import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { validateNiteSvgContract } from "@/components/ui/validate-nite-svg-contract";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-preference");
  document.documentElement.classList.remove("dark");
});

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
    const timeline = document.querySelector(
      "[data-component='living-timeline-section']",
    ) as HTMLElement;

    expect(timeline).toBeInTheDocument();
    expect(timeline).toHaveAttribute("data-scroll", "section");
    expect(timeline).toHaveAttribute("data-public-milestones", "0");
    expect(within(timeline).getByText("Timeline")).toBeInTheDocument();
    expect(
      within(timeline).getByText("O NITE em trajetória"),
    ).toBeInTheDocument();
    expect(
      within(timeline).getByText(
        "Uma leitura visual dos marcos que estruturam o núcleo, suas frentes e seus próximos passos.",
      ),
    ).toBeInTheDocument();
    expect(within(timeline).getByText("Continuar leitura")).toBeInTheDocument();
    expect(
      within(timeline).getByRole("link", {
        name: "Continuar leitura sobre a timeline do NITE",
      }),
    ).toHaveAttribute("href", "/atualizacoes");
    expect(timeline.querySelector("[data-scroll='bg']")).toBeInTheDocument();
    expect(
      timeline.querySelector("[data-scroll='container']"),
    ).toBeInTheDocument();
    expect(timeline.querySelector(".timeline-premium-asset-image")).toBeNull();
    expect(within(timeline).queryByText("Acervo em curadoria")).toBeNull();
    expect(within(timeline).queryByText("Marcos validados")).toBeNull();
    expect(screen.queryByText("Marcos ainda não publicados")).toBeNull();
    expect(screen.queryByText("Primeiros projetos aplicados")).toBeNull();
    expect(screen.queryByText("Estruturação do NITE")).toBeNull();
    expect(screen.queryByText("Vitrine para a comunidade")).toBeNull();
    expect(
      screen.queryByAltText(
        "Mesa de trabalho tecnológica com notebook, placa eletrônica e luzes azuis em ambiente institucional.",
      ),
    ).toBeNull();
    expect(
      screen.getByText("Quer acompanhar a evolução do NITE?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Comece pelos projetos e pela área de Atualizações. A Timeline do NITE dará forma aos marcos validados do núcleo.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver Timeline" })).toHaveAttribute(
      "href",
      "#timeline",
    );
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
      header.queryByRole("link", { name: "Falar com o NITE" }),
    ).not.toBeInTheDocument();
    expect(
      header.getByRole("button", { name: /Alterar tema da interface/i }),
    ).toHaveAttribute("aria-expanded", "false");

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

  it("mantem o foco dentro do menu mobile em camadas", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const menuButton = screen.getByRole("button", { name: "Menu" });

    await user.click(menuButton);

    const mobileMenu = screen.getByRole("dialog", {
      name: "Navegação principal mobile",
    });
    const closeButton = within(mobileMenu).getByRole("button", {
      name: "Fechar menu",
    });
    const darkThemeOption = within(mobileMenu).getByRole("radio", {
      name: "Escuro",
    });

    await waitFor(() => expect(closeButton).toHaveFocus());

    await user.tab({ shift: true });

    expect(darkThemeOption).toHaveFocus();

    await user.tab();

    expect(closeButton).toHaveFocus();

    await user.click(
      within(mobileMenu).getByRole("button", { name: "Projetos" }),
    );

    const backButton = await within(mobileMenu).findByRole("button", {
      name: /Voltar/i,
    });

    await waitFor(() => expect(backButton).toHaveFocus());

    await user.click(backButton);

    await waitFor(() =>
      expect(
        within(mobileMenu).getByRole("button", { name: "Fechar menu" }),
      ).toHaveFocus(),
    );

    const lightThemeOption = within(mobileMenu).getByRole("radio", {
      name: "Claro",
    });

    await user.click(lightThemeOption);

    expect(window.localStorage.getItem("nite-theme")).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Navegação principal mobile" }),
      ).not.toBeInTheDocument(),
    );

    await waitFor(() => expect(menuButton).toHaveFocus());

    await user.click(menuButton);

    const reopenedMobileMenu = screen.getByRole("dialog", {
      name: "Navegação principal mobile",
    });

    await user.click(
      within(reopenedMobileMenu).getByRole("button", { name: "Fechar menu" }),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Navegação principal mobile" }),
      ).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(menuButton).toHaveFocus());
  });
});
