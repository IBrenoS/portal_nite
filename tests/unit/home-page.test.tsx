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
    const heroPrimaryCta = hero.getByRole("link", {
      name: /Explorar projetos/i,
    });
    const heroSecondaryCta = hero.getByRole("link", {
      name: /Conhecer o NITE/i,
    });
    const heroCtaGroup = heroPrimaryCta.parentElement;

    expect(heroPrimaryCta).toHaveAttribute("href", "/projetos");
    expect(heroPrimaryCta).toHaveClass(
      "nite-glass-action",
      "rounded-[1rem]",
    );
    expect(heroPrimaryCta).not.toHaveClass(
      "nite-button-texture",
      "after:absolute",
    );
    expect(heroPrimaryCta).not.toHaveClass("rounded-md");
    expect(heroSecondaryCta).toHaveAttribute("href", "#sobre");
    expect(heroSecondaryCta).toHaveClass(
      "w-fit",
      "border-transparent",
      "bg-transparent",
      "!px-0",
    );
    expect(heroSecondaryCta).not.toHaveClass("border-nite-border-soft");
    expect(heroCtaGroup).toHaveClass("gap-4");
    expect(heroCtaGroup).not.toHaveClass("gap-3");

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
    expect(
      projects.queryByText(
        "Projetos em estruturação permanecem sinalizados até que existam evidências públicas, entregáveis reais e contexto validado para publicação.",
      ),
    ).not.toBeInTheDocument();
    expect(projects.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(
      projects.getByAltText(
        /Ilustração editorial da frente de software aplicado/i,
      ),
    ).toBeInTheDocument();
    expect(projects.queryByText("Objetivo")).not.toBeInTheDocument();
    expect(projects.queryByText("Próximo passo")).not.toBeInTheDocument();
    expect(projects.queryByText("Stack")).not.toBeInTheDocument();
    expect(
      projects.queryByText(/Problema ou contexto/i),
    ).not.toBeInTheDocument();
    expect(
      projects.queryByText("Imagem ou evidência pública ainda indisponível."),
    ).not.toBeInTheDocument();
    expect(
      projects.queryByText("Última atualização pendente de dado validado."),
    ).not.toBeInTheDocument();
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
    expect(timeline).toHaveAttribute("data-nite-scene", "timeline");
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
    const timelineCta = within(timeline).getByRole("link", {
      name: "Continuar leitura sobre a timeline do NITE",
    });

    expect(timelineCta).toHaveAttribute("href", "/atualizacoes");
    expect(timelineCta).toHaveClass(
      "timeline-premium-button",
      "w-fit",
      "border-transparent",
      "bg-transparent",
      "!px-0",
    );
    expect(timeline.querySelector(".timeline-premium-clickable")).toBeNull();
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
    const finalCtaSection = screen.getByTestId("final-cta-section");
    const finalCta = within(finalCtaSection);

    expect(finalCtaSection).toHaveAttribute("data-nite-scene", "inverse");
    expect(
      finalCta.getByRole("heading", {
        level: 2,
        name: /NITE em evolução\.\s*Disponível para construir\./i,
      }),
    ).toBeInTheDocument();
    const finalPrimaryCta = finalCta.getByRole("link", {
      name: /Explorar projetos/i,
    });
    const finalSecondaryCta = finalCta.getByRole("link", {
      name: /Falar com o NITE/i,
    });

    expect(finalPrimaryCta).toHaveAttribute("href", "/projetos");
    expect(finalPrimaryCta).toHaveClass(
      "nite-glass-action",
      "group",
      "h-12",
      "rounded-2xl",
    );
    expect(finalPrimaryCta).not.toHaveClass("after:absolute");
    expect(finalPrimaryCta.querySelector("svg")).toBeInTheDocument();
    expect(finalSecondaryCta).toHaveAttribute("href", "/contato");
    expect(finalSecondaryCta).toHaveClass(
      "group",
      "h-12",
      "rounded-2xl",
      "bg-transparent",
      "text-nite-text-secondary",
    );
    expect(finalSecondaryCta).not.toHaveClass("!px-0");
    expect(finalSecondaryCta.querySelector("svg")).toBeInTheDocument();
    expect(document.querySelector(".nite-final-wordmark")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(
      document.querySelector(".nite-final-wordmark-image"),
    ).toHaveAttribute("src", expect.stringContaining("nite-logo-footer.webp"));
    expect(document.querySelectorAll(".nite-final-wordmark-text")).toHaveLength(
      0,
    );
    expect(screen.queryByText("@nite.uj")).toBeNull();

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
      document.querySelector("#logo-final")?.closest(".nite-panel"),
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
    expect(footerElement).toHaveAttribute("data-footer-variant", "wordmark");
    expect(footerElement).toHaveClass(
      "border-t",
      "border-nite-border-subtle",
      "sm:-mt-[5vh]",
    );
    expect(footerElement).not.toHaveClass("sm:-mt-[9vh]");
    expect(
      footerElement.querySelector("[data-footer-transition-divider]"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      footerElement.querySelector("[data-footer-transition-glow]"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(footerElement.children).toHaveLength(3);

    const footerLayout = footerElement.lastElementChild as HTMLElement;
    expect(footerLayout).toHaveClass(
      "mx-auto",
      "flex",
      "max-w-5xl",
      "flex-col",
      "gap-12",
      "px-6",
      "py-36",
      "md:max-w-7xl",
      "md:min-h-[35rem]",
      "md:flex-row",
      "md:gap-8",
    );

    const footerIdentity = footerLayout.firstElementChild as HTMLElement;
    expect(
      Array.from(footerIdentity.children).map((child) => child.tagName),
    ).toEqual(["SPAN", "NAV", "P"]);
    expect(footerIdentity.lastElementChild).toHaveTextContent(
      "© 2026 NITE UNIJORGE.",
    );

    const footerNavigation = footer.getByRole("navigation", {
      name: "Navegação institucional do rodapé",
    });
    expect(footerNavigation).toHaveClass(
      "grid-cols-2",
      "gap-8",
      "lg:grid-cols-5",
    );
    expect(footerNavigation).not.toHaveClass("sm:grid-cols-3");
    expect(
      Array.from(footerNavigation.children).map(
        (group) => group.querySelector("p")?.textContent,
      ),
    ).toEqual([
      "O NITE",
      "Projetos",
      "Atualizações",
      "Oportunidades",
      "Contato",
    ]);
    expect(
      footerElement.querySelector("[data-nite-scene='unijorge-brand-text']"),
    ).toHaveAttribute("aria-label", "UNIJORGE");
    expect(footer.queryByText("NITE | UNIJORGE")).toBeNull();
    expect(
      footer.queryByText(
        "Portal institucional do Núcleo de Inovação, Tecnologia e Empreendedorismo.",
      ),
    ).toBeNull();
    expect(
      footer.queryByText(
        "Conteúdos e oportunidades dependem de validação/autorização institucional.",
      ),
    ).toBeNull();
    expect(footer.getByRole("link", { name: "Sobre" })).toHaveAttribute(
      "href",
      "/#sobre",
    );
    expect(footer.getByRole("link", { name: "Timeline" })).toHaveAttribute(
      "href",
      "/#timeline",
    );
    expect(
      footer.getByRole("link", { name: "Todos os projetos" }),
    ).toHaveAttribute("href", "/projetos");
    expect(footer.getByRole("link", { name: "NIT News" })).toHaveAttribute(
      "href",
      "/atualizacoes",
    );
    expect(
      footer.getByRole("link", { name: "Como participar" }),
    ).toHaveAttribute("href", "/oportunidades");
    expect(
      footer.getByRole("link", { name: "Falar com o NITE" }),
    ).toHaveAttribute("href", "/contato");
    expect(
      footer.getByRole("link", { name: "Acompanhar o NITE no Instagram" }),
    ).toHaveAttribute("href", expect.stringContaining("instagram.com"));
    expect(footer.queryByText("Propor desafio")).toBeNull();
    expect(footer.queryByText("E-mail")).toBeNull();
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
  }, 10_000);

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
