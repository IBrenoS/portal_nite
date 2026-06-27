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
    expect(heroPrimaryCta).toHaveClass("nite-glass-action", "rounded-[1rem]");
    expect(heroPrimaryCta).not.toHaveClass(
      "nite-button-texture",
      "after:absolute",
    );
    expect(heroPrimaryCta).not.toHaveClass("rounded-md");
    expect(heroSecondaryCta).toHaveAttribute("href", "/sobre");
    expect(heroSecondaryCta).toHaveClass(
      "w-fit",
      "border-transparent",
      "bg-transparent",
      "!px-0",
    );
    expect(heroSecondaryCta).not.toHaveClass("border-nite-border-soft");
    expect(heroCtaGroup).toHaveClass("gap-7");
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
    const buildsSection = screen.getByTestId("builds-section");
    const builds = within(buildsSection);

    expect(buildsSection).toHaveAttribute("id", "metodo");
    expect(buildsSection).toHaveAttribute("data-nite-scene", "inverse");
    expect(buildsSection).toHaveAttribute("data-surface", "nite-background");
    expect(buildsSection).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(buildsSection).not.toHaveClass("resend-dark-scene");
    expect(document.querySelector("#sobre")).toBeNull();
    const buildsHeading = builds.getByRole("heading", { level: 2 });
    expect(buildsHeading).toHaveClass("font-heading", "font-semibold");
    expect(buildsHeading.parentElement?.className).toContain(
      "[&_h2]:font-heading",
    );
    expect(buildsHeading.parentElement?.className).not.toContain(
      "font-resend-display",
    );
    expect(buildsHeading).toHaveTextContent("Método aplicado");
    expect(
      builds.getByText(
        "O NITE organiza desafios acadêmicos em recortes, protótipos e registros públicos.",
      ),
    ).toBeInTheDocument();
    expect(
      builds.queryByRole("link", { name: /Explorar projetos/i }),
    ).not.toBeInTheDocument();
    const methodFeatureIcon = buildsSection.querySelector(
      "img[data-component='method-feature-icon']",
    );
    expect(methodFeatureIcon).toBeInTheDocument();
    expect(methodFeatureIcon).toHaveAttribute(
      "src",
      expect.stringContaining("home_icon.png"),
    );
    expect(methodFeatureIcon).toHaveAttribute("width", "170");
    expect(methodFeatureIcon).toHaveAttribute("height", "170");
    expect(methodFeatureIcon).toHaveClass("size-[170px]");
    expect(methodFeatureIcon).not.toHaveClass(
      "sm:size-[9.5rem]",
      "animate-nite-rise",
    );
    expect(methodFeatureIcon?.getAttribute("style")).not.toMatch(
      /animation|opacity|transform/i,
    );
    expect(
      buildsSection.querySelector("[data-component='nite-method-system']"),
    ).toHaveAttribute("data-media-mode", "resend-react-dom-panel");
    expect(
      buildsSection.querySelector("[data-method-window-controls]"),
    ).toBeInTheDocument();
    expect(
      buildsSection.querySelector("[data-method-code-pane]"),
    ).toBeInTheDocument();
    expect(buildsSection.querySelector("[data-method-content]")).toHaveClass(
      "min-w-0",
    );
    expect(buildsSection.querySelector("[data-method-code-pane]")).toHaveClass(
      "min-w-0",
    );
    expect(
      buildsSection.querySelector("[data-method-preview-pane]"),
    ).toBeInTheDocument();
    expect(buildsSection.querySelector("canvas")).not.toBeInTheDocument();
    expect(
      builds.getByRole("tablist", { name: "Etapas do método aplicado" }),
    ).toBeInTheDocument();
    const methodTablist = builds.getByRole("tablist", {
      name: "Etapas do método aplicado",
    });
    expect(methodTablist).toHaveClass(
      "overflow-x-auto",
      "[scrollbar-width:none]",
    );
    expect(
      builds.getByRole("switch", { name: "Visualização mobile" }),
    ).toHaveAttribute("aria-checked", "false");
    expect(
      builds.getByRole("switch", { name: "Aparência clara do preview" }),
    ).toHaveAttribute("aria-checked", "false");
    expect(
      buildsSection.querySelectorAll("[data-method-segmented-control]"),
    ).toHaveLength(2);
    expect(
      buildsSection.querySelector("[data-method-switch-thumb]"),
    ).not.toBeInTheDocument();
    expect(methodFeatureIcon).toHaveAttribute("alt", "");

    const methodTabs = builds.getAllByRole("tab");
    expect(methodTabs).toHaveLength(4);
    for (const file of [
      "recorte.tsx",
      "prototipo.tsx",
      "evidencia.tsx",
      "circulacao.tsx",
    ]) {
      expect(builds.getByRole("tab", { name: file })).toBeInTheDocument();
    }
    for (const tab of methodTabs) {
      expect(tab).toHaveClass("text-sm");
      expect(tab.querySelector("[data-tsx-file-icon]")).toHaveTextContent("TS");
    }
    expect(builds.getByRole("tab", { name: "recorte.tsx" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(builds.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      "method-tab-recorte",
    );
    expect(buildsSection.querySelector("[data-method-code-pane]")).toHaveClass(
      "hidden",
      "md:block",
    );
    expect(
      buildsSection.querySelector("[data-method-preview-frame]"),
    ).toHaveAttribute("data-device", "desktop");
    expect(
      buildsSection.querySelector("[data-method-preview-frame]"),
    ).toHaveAttribute("data-appearance", "dark");
    expect(
      within(builds.getByRole("tabpanel")).queryByText("NITE"),
    ).not.toBeInTheDocument();
    expect(
      within(builds.getByRole("tabpanel")).queryByText("01 / 04"),
    ).not.toBeInTheDocument();
    expect(
      buildsSection.querySelector("[data-method-preview-header]"),
    ).not.toBeInTheDocument();
    expect(buildsSection.querySelector("[data-method-code-pane]")).toHaveClass(
      "overflow-scroll",
      "[scrollbar-width:thin]",
    );
    expect(
      buildsSection.querySelectorAll("[data-method-code-line]"),
    ).toHaveLength(26);

    expect(
      within(builds.getByRole("tabpanel")).getByRole("heading", {
        name: "Problema publicável",
      }),
    ).toBeInTheDocument();
    const previewHeading = within(builds.getByRole("tabpanel")).getByRole(
      "heading",
      {
        name: "Problema publicável",
      },
    );
    expect(previewHeading).toHaveClass(
      "font-heading",
      "text-[clamp(2rem,3vw,2.875rem)]",
      "leading-[1.08]",
      "font-semibold",
      "text-[var(--method-preview-heading)]",
    );
    expect(previewHeading).not.toHaveClass("text-[clamp(1.75rem,3vw,2.5rem)]");
    const previewDescription = within(builds.getByRole("tabpanel")).getByText(
      "A demanda deixa de ser uma ideia solta e vira um contexto claro, com limites, público e critérios de leitura.",
    );
    expect(previewDescription).toHaveClass(
      "text-base",
      "leading-7",
      "font-medium",
      "text-[var(--method-preview-body)]",
    );
    expect(previewDescription).not.toHaveClass("text-sm", "opacity-65");
    expect(builds.getByRole("tabpanel")).toHaveStyle({
      "--method-preview-heading": "#f5f7fb",
      "--method-preview-body": "rgb(214 224 237 / 0.82)",
      "--method-preview-label": "rgb(176 199 217 / 0.7)",
      "--method-preview-output": "#f2f7ff",
      "--method-preview-rule": "rgb(176 199 217 / 0.16)",
    });
    const methodOutput = within(builds.getByRole("tabpanel"))
      .getByText("brief, hipótese, restrições e próximos passos")
      .closest("[data-method-preview-output]");
    expect(methodOutput).toBeInTheDocument();
    expect(methodOutput).toHaveClass(
      "rounded-xl",
      "border",
      "border-[var(--method-preview-rule)]",
      "bg-[var(--method-preview-output-surface)]",
      "p-5",
    );

    expect(
      within(builds.getByRole("tabpanel")).getByText(
        "brief, hipótese, restrições e próximos passos",
      ),
    ).toBeInTheDocument();

    for (const oldBuildCopy of [
      "Antes de virar projeto, uma demanda precisa virar evidência.",
      "Sistema de método NITE",
      "Uma superfície procedural mostra como uma demanda ganha leitura, forma e rastro público.",
      "Registro gerado",
      "O que o NITE constrói",
      "Um sistema de conversão entre desafio acadêmico e aplicação pública.",
      "Esta dobra mostra o papel do núcleo: transformar demandas, pesquisas e oportunidades de aprendizagem em artefatos testáveis, documentados e honestos sobre seu estágio.",
      "Conversor NITE",
      "Desafio, método, evidência e rota pública na mesma superfície.",
      "Saída esperada",
      "Artefatos possíveis",
      "Saídas concretas para transformar desafios acadêmicos em tecnologia aplicada.",
      "Software aplicado",
      "Dados e IA",
      "Robótica e prototipagem",
      "Experiência digital",
      "Automação e processos",
      "Oficinas e aprendizagem prática",
      "Saídas:",
    ]) {
      expect(builds.queryByText(oldBuildCopy)).not.toBeInTheDocument();
    }

    for (const removed of [
      "Aprendizado aplicado",
      "Tecnologia em prática",
      "Ponte institucional",
    ]) {
      expect(screen.queryByText(removed)).not.toBeInTheDocument();
    }

    const projectsSection = screen.getByTestId("projects-operating-section");
    const projects = within(projectsSection);

    expect(projectsSection).toHaveAttribute("data-nite-scene", "inverse");
    expect(projectsSection).toHaveAttribute("data-surface", "nite-background");
    expect(projectsSection).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(projectsSection).not.toHaveClass(
      "border-t",
      "border-nite-border-subtle",
    );
    expect(projectsSection).not.toHaveClass("resend-dark-scene");
    expect(
      projects.getByRole("heading", {
        level: 2,
        name: "Projetos em destaque",
      }),
    ).toBeInTheDocument();
    const projectsHeading = projects.getByRole("heading", {
      level: 2,
      name: "Projetos em destaque",
    });
    expect(projectsHeading).toHaveClass("font-heading", "font-semibold");
    expect(projectsHeading.parentElement?.className).toContain(
      "[&_h2]:font-heading",
    );
    expect(projectsHeading.parentElement?.className).not.toContain(
      "font-resend-display",
    );
    expect(
      projects.getByText(
        "Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos.",
      ),
    ).toBeInTheDocument();
    expect(
      projectsSection.querySelectorAll("[data-project-role='protagonist']"),
    ).toHaveLength(1);
    expect(
      projectsSection.querySelectorAll("[data-project-role='supporting']"),
    ).toHaveLength(2);
    expect(
      within(
        projectsSection.querySelector(
          "[data-project-role='protagonist']",
        ) as HTMLElement,
      ).getByRole("heading", { name: "Software aplicado" }),
    ).toBeInTheDocument();
    expect(projectsSection.querySelectorAll("[data-slot='card']")).toHaveLength(
      0,
    );
    expect(
      projectsSection.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ),
    ).toHaveLength(3);
    expect(projects.getAllByText("Em estruturação")).toHaveLength(3);
    expect(
      projects.queryByText(
        "Projetos em estruturação permanecem sinalizados até que existam evidências públicas, entregáveis reais e contexto validado para publicação.",
      ),
    ).not.toBeInTheDocument();
    expect(projects.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(
      projects.queryByAltText(
        /Ilustração editorial da frente de software aplicado/i,
      ),
    ).not.toBeInTheDocument();
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
    const supportingModules = projectsSection.querySelectorAll(
      "[data-project-role='supporting']",
    );
    expect(supportingModules).toHaveLength(2);
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
      "Núcleo",
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
    ).toEqual(["O NITE", "Projetos", "Atualizações", "Núcleo", "Contato"]);
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
      "/sobre",
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
    expect(footer.getByRole("link", { name: "Oportunidades" })).toHaveAttribute(
      "href",
      "/oportunidades",
    );
    expect(footer.getByRole("link", { name: "Pessoas" })).toHaveAttribute(
      "href",
      "/pessoas",
    );
    expect(
      footer.getByRole("link", { name: "Falar com o NITE" }),
    ).toHaveAttribute("href", "/contato");
    expect(
      footer.getByRole("link", { name: "Acompanhar o NITE no Instagram" }),
    ).toHaveAttribute("href", expect.stringContaining("instagram.com"));
    expect(footer.queryByText("Propor desafio")).toBeNull();
    expect(footer.queryByText("E-mail")).toBeNull();
    expect(document.querySelector("footer a[href='/noticias']")).toBeNull();
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

  it("atualiza a superfície de método por clique e foco", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const builds = within(screen.getByTestId("builds-section"));
    const recorteTab = builds.getByRole("tab", { name: "recorte.tsx" });
    const prototipoTab = builds.getByRole("tab", { name: "prototipo.tsx" });
    const circulacaoTab = builds.getByRole("tab", {
      name: "circulacao.tsx",
    });
    const mobileSwitch = builds.getByRole("switch", {
      name: "Visualização mobile",
    });
    const lightSwitch = builds.getByRole("switch", {
      name: "Aparência clara do preview",
    });
    const previewFrame = screen
      .getByTestId("builds-section")
      .querySelector("[data-method-preview-frame]");

    expect(recorteTab).toHaveAttribute("aria-selected", "true");

    await user.click(prototipoTab);

    expect(prototipoTab).toHaveAttribute("aria-selected", "true");
    expect(recorteTab).toHaveAttribute("aria-selected", "false");
    expect(builds.getByRole("tabpanel")).toHaveTextContent(
      "interface, prova de conceito, fluxo ou demonstração",
    );
    expect(
      screen
        .getByTestId("builds-section")
        .querySelector("[data-method-code-pane]"),
    ).toHaveTextContent('etapa: "Protótipo"');

    prototipoTab.focus();

    await user.keyboard("{ArrowRight}");

    expect(builds.getByRole("tab", { name: "evidencia.tsx" })).toHaveFocus();

    await user.keyboard("{End}");

    expect(circulacaoTab).toHaveFocus();
    expect(circulacaoTab).toHaveAttribute("aria-selected", "true");
    expect(prototipoTab).toHaveAttribute("aria-selected", "false");
    expect(builds.getByRole("tabpanel")).toHaveTextContent(
      "página pública, chamada, guia ou atualização",
    );

    await user.click(mobileSwitch);

    expect(mobileSwitch).toHaveAttribute("aria-checked", "true");
    expect(previewFrame).toHaveAttribute("data-device", "mobile");

    await user.click(lightSwitch);

    expect(lightSwitch).toHaveAttribute("aria-checked", "true");
    expect(previewFrame).toHaveAttribute("data-appearance", "light");
    expect(previewFrame).toHaveStyle({
      "--method-preview-heading": "#0b1220",
      "--method-preview-body": "rgb(51 65 85 / 0.86)",
      "--method-preview-label": "rgb(51 65 85 / 0.64)",
      "--method-preview-output": "#102033",
      "--method-preview-rule": "rgb(15 23 42 / 0.12)",
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
