import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { THEME_STORAGE_KEY } from "@/biblioteca/theme";
import { Container } from "@/components/layout/container";
import { OpportunityBanner } from "@/components/sections/opportunity-banner";
import { OpportunityInterestFormPreview } from "@/components/sections/opportunity-interest-form-preview";
import {
  OpportunityStatus,
  opportunityStatusLabels,
  type OpportunityStatusValue,
} from "@/components/sections/opportunity-status";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { TimelineItem } from "@/components/sections/timeline-item";
import { UpdateCard } from "@/components/sections/update-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle, ThemeToggleButton } from "@/components/ui/theme-toggle";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-preference");
  document.documentElement.classList.remove("dark");
});

describe("design system base", () => {
  it("expoe as superficies semanticas do tema para utilitarios Tailwind", () => {
    const globalStyles = readFileSync(
      join(process.cwd(), "app", "globals.css"),
      "utf8",
    );

    expect(globalStyles).toContain(
      "--color-nite-section: var(--nite-section);",
    );
    expect(globalStyles).toContain(
      "--color-nite-surface-elevated: var(--nite-surface-elevated);",
    );
    expect(globalStyles).toContain(
      "--color-nite-brand-primary: var(--nite-brand-primary);",
    );
  });

  it("mantem tokens locais da hero da pagina de projetos sem promover o verde ao tema global", () => {
    const globalStyles = readFileSync(
      join(process.cwd(), "app", "globals.css"),
      "utf8",
    );

    expect(globalStyles).toContain(".projectsPage {");
    expect(globalStyles).toContain("--projects-hero-accent: #2DCFBF;");
    expect(globalStyles).toContain(
      "--projects-hero-canvas-background: var(--nite-background);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-grid-color: rgba(170, 170, 170, 0.1);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-trail-color: rgba(255, 255, 255, 0.5);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-node-color: rgba(255, 255, 255, 1);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-green-field-opacity: 1;",
    );
    expect(globalStyles).toContain(
      "--projects-hero-green-field-blend: color;",
    );
    expect(globalStyles).toContain(':root[data-theme="light"] .projectsPage {');
    expect(globalStyles).toContain(
      "--projects-hero-grid-color: rgba(15, 118, 110, 0.16);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-trail-color: rgba(15, 118, 110, 0.62);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-node-color: rgba(15, 118, 110, 0.95);",
    );
    expect(globalStyles).toContain(
      "--projects-hero-green-field-opacity: 0.24;",
    );
    expect(globalStyles).toContain(
      "--projects-hero-green-field-blend: multiply;",
    );
    expect(globalStyles).toContain(".projectsHeroGreenField {");
    expect(globalStyles).toContain("background: var(--projects-hero-accent);");
    expect(globalStyles).toContain(
      "mix-blend-mode: var(--projects-hero-green-field-blend);",
    );
    expect(globalStyles).toContain(
      "opacity: var(--projects-hero-green-field-opacity);",
    );
    expect(globalStyles).not.toContain(
      "--color-nite-brand-accent: #2DCFBF;",
    );
  });

  it("mantem a timeline como subcena escura local sobre superficie global", () => {
    const globalStyles = readFileSync(
      join(process.cwd(), "app", "globals.css"),
      "utf8",
    );

    expect(globalStyles).toContain("--timeline-frame-background: #141413;");
    expect(globalStyles).toContain("min-height: auto;");
    expect(globalStyles).toContain(
      "padding-block: clamp(2.5rem, 6vw, 4rem) 0;",
    );
    expect(globalStyles).toContain("--timeline-frame-text-primary: #faf9f5;");
    expect(globalStyles).toContain(
      "--timeline-frame-text-secondary: rgb(250 249 245 / 0.72);",
    );
    expect(globalStyles).toContain(
      "--timeline-frame-border: rgb(255 255 255 / 0.08);",
    );
    expect(globalStyles).toContain(
      "--timeline-frame-divider: rgb(250 249 245 / 0.38);",
    );
    expect(globalStyles).toContain(
      "--timeline-frame-shadow: 0 28px 90px rgb(0 0 0 / 0.38);",
    );
    expect(globalStyles).toContain(
      "background: var(--timeline-frame-background);",
    );
    expect(globalStyles).toContain(
      "margin: clamp(2.5rem, 5vw, 4rem) auto 0;",
    );
    expect(globalStyles).toContain(
      "color: var(--timeline-frame-text-primary);",
    );
    expect(globalStyles).toContain(
      "border-color: var(--timeline-frame-border);",
    );
    expect(globalStyles).toContain("box-shadow: var(--timeline-frame-shadow);");
    expect(globalStyles).toContain(
      "background: var(--timeline-frame-background);\n}",
    );
    expect(globalStyles).toContain(
      "border-bottom: 1px solid var(--timeline-frame-divider);",
    );
    expect(globalStyles).toContain(
      "color: var(--timeline-frame-text-secondary);",
    );
    expect(globalStyles).toContain(
      ".timeline-premium-scroll-bg .timeline-premium-button {\n  color: var(--timeline-cta-text);",
    );
    expect(globalStyles).toContain(
      ".timeline-premium-scroll-bg .timeline-premium-button:hover,\n.timeline-premium-scroll-bg .timeline-premium-button:focus-visible",
    );
    expect(globalStyles).not.toContain(
      "border: 1px solid rgb(255 255 255 / 0.08);",
    );
    expect(globalStyles).not.toContain("\n  background: #141413;");
    expect(globalStyles).not.toContain("\n  color: #faf9f5;");
  });

  it("mantem o wordmark transparente e limita o spotlight as letras", () => {
    const globalStyles = readFileSync(
      join(process.cwd(), "app", "globals.css"),
      "utf8",
    );

    expect(globalStyles).toContain(
      ".nite-final-wordmark {\n  --wordmark-spotlight-x: 50%;",
    );
    expect(globalStyles).toContain("--wordmark-spotlight-color: #f8fafc;");
    expect(globalStyles).toContain("--wordmark-spotlight-radius: 8rem;");
    expect(globalStyles).toContain(
      "--wordmark-spotlight-active-opacity: 0.92;",
    );
    expect(globalStyles).toContain(
      "--wordmark-image-filter: brightness(0.72) saturate(0.82);",
    );
    expect(globalStyles).toContain(
      ':root[data-theme="light"] .nite-final-wordmark {',
    );
    expect(globalStyles).toContain(
      "--wordmark-image-filter: brightness(0.58) contrast(1.2) saturate(0.72);",
    );
    expect(globalStyles).toContain("--wordmark-image-opacity: 0.75;");
    expect(globalStyles).toContain(
      "--wordmark-spotlight-active-opacity: 0.48;",
    );
    expect(globalStyles).toContain(
      'mask-image: url("/images/brand/nite-logo-footer.webp");',
    );
    expect(globalStyles).toContain("filter: var(--wordmark-image-filter);");
    expect(globalStyles).not.toContain("--wordmark-stage-background:");
    expect(globalStyles).not.toContain("--footer-transition-from:");
    expect(globalStyles).not.toContain("--footer-transition-to:");
  });

  it("renderiza componentes essenciais do M2", () => {
    render(
      <Container>
        <SectionHeader
          title="Componentes base"
          description="Descricao acessivel."
        />
        <Button size="lg">Acao primaria</Button>
        <Button size="lg" variant="outline">
          Acao secundaria
        </Button>
        <Chip>Token</Chip>
        <EmptyState
          title="Sem conteudo"
          description="Conteudo ainda nao cadastrado."
        />
      </Container>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Componentes base" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Acao primaria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Acao secundaria" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Token")).toBeInTheDocument();
    expect(screen.getByText("Sem conteudo")).toBeInTheDocument();
  });

  it("preserva hierarquia semantica configuravel no SectionHeader", () => {
    render(
      <>
        <SectionHeader
          eyebrow="Kicker"
          title="Titulo padrao"
          description="Descricao complementar."
        />
        <SectionHeader
          as="h3"
          align="center"
          title="Titulo secundario"
          actions={<Button variant="link">Acao contextual</Button>}
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Titulo padrao" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Titulo secundario" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Kicker" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Descricao complementar.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Acao contextual" }),
    ).toBeInTheDocument();
  });

  it("mantem nome acessivel e semantica no estado loading", () => {
    render(<Button loading>Enviar interesse</Button>);

    const button = screen.getByRole("button", { name: "Enviar interesse" });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
  });

  it("aplica primitives de campo com o contrato visual canonico", () => {
    render(
      <>
        <Input aria-label="E-mail institucional" />
        <Textarea aria-label="Mensagem institucional" />
      </>,
    );

    expect(screen.getByLabelText("E-mail institucional")).toHaveAttribute(
      "data-slot",
      "input",
    );
    expect(screen.getByLabelText("E-mail institucional")).toHaveClass(
      "nite-form-field",
    );
    expect(screen.getByLabelText("Mensagem institucional")).toHaveAttribute(
      "data-slot",
      "textarea",
    );
    expect(screen.getByLabelText("Mensagem institucional")).toHaveClass(
      "nite-form-field",
    );
  });

  it("disponibiliza variantes e tamanhos minimos do Button", () => {
    render(
      <>
        <Button variant="primary" size="sm">
          Primario
        </Button>
        <Button variant="secondary" size="md">
          Secundario
        </Button>
        <Button variant="ghost" size="lg">
          Discreto
        </Button>
        <Button variant="spotlight" size="lg">
          Destaque
        </Button>
        <Button variant="invisible" size="lg">
          Invisivel
        </Button>
        <Button variant="quiet">Busca discreta</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="link">Link visual</Button>
      </>,
    );

    expect(
      screen.getByRole("button", { name: "Primario" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Secundario" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Discreto" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Busca discreta" })).toHaveClass(
      "text-nite-text-secondary",
    );
    expect(screen.getByRole("button", { name: "Destaque" })).toHaveClass(
      "nite-glass-action",
      "rounded-[1rem]",
    );
    expect(screen.getByRole("button", { name: "Destaque" })).not.toHaveClass(
      "nite-button-texture",
      "after:absolute",
    );
    expect(screen.getByRole("button", { name: "Invisivel" })).toHaveClass(
      "w-fit",
      "border-transparent",
      "bg-transparent",
      "!px-0",
    );
    expect(
      screen.getByRole("button", { name: "Contorno" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Link visual" }),
    ).toBeInTheDocument();
  });

  it("permite escolher e persistir tema visual manualmente", async () => {
    const user = userEvent.setup();

    render(<ThemeToggle id="theme-toggle-test" />);

    const group = screen.getByRole("group", { name: "Tema da interface" });
    const systemOption = within(group).getByRole("radio", {
      name: "Sistema",
    });
    const lightOption = within(group).getByRole("radio", { name: "Claro" });
    const darkOption = within(group).getByRole("radio", { name: "Escuro" });

    expect(systemOption).toBeChecked();

    await user.click(lightOption);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.documentElement).toHaveAttribute(
      "data-theme-preference",
      "light",
    );
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(darkOption);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement).toHaveAttribute(
      "data-theme-preference",
      "dark",
    );
    expect(document.documentElement).toHaveClass("dark");

    await user.click(systemOption);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("system");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement).toHaveAttribute(
      "data-theme-preference",
      "system",
    );
    expect(document.documentElement).toHaveClass("dark");
  });

  it("abre o seletor compacto de tema sem expor as opcoes na barra", async () => {
    const user = userEvent.setup();

    render(<ThemeToggleButton id="theme-toggle-button-test" />);

    const trigger = screen.getByRole("button", {
      name: /Alterar tema da interface/i,
    });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("group", { name: "Tema da interface" }),
    ).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("group", { name: "Tema da interface" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Claro" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("renderiza Card nao interativo sem foco desnecessario", () => {
    render(
      <Card data-testid="base-card">
        <CardHeader>
          <CardTitle>Titulo do card</CardTitle>
          <CardDescription>Descricao curta.</CardDescription>
        </CardHeader>
        <CardContent>Conteudo do card.</CardContent>
        <CardFooter>Rodape do card.</CardFooter>
      </Card>,
    );

    const card = screen.getByTestId("base-card");

    expect(card).not.toHaveAttribute("tabindex");
    expect(card).toHaveClass("bg-transparent");
    expect(screen.getByText("Titulo do card")).toBeInTheDocument();
    expect(screen.getByText("Descricao curta.")).toBeInTheDocument();
    expect(screen.getByText("Conteudo do card.")).toBeInTheDocument();
    expect(screen.getByText("Rodape do card.")).toBeInTheDocument();
  });

  it("preserva semantica e foco previsto em Card interativo", () => {
    render(
      <>
        <Card as="a" href="/projetos" variant="interactive">
          Abrir projetos
        </Card>
        <Card as="button" variant="interactive" disabled>
          Acao indisponivel
        </Card>
      </>,
    );

    const linkCard = screen.getByRole("link", { name: "Abrir projetos" });
    const buttonCard = screen.getByRole("button", {
      name: "Acao indisponivel",
    });

    expect(linkCard).toHaveAttribute("href", "/projetos");
    expect(linkCard.className).toContain("focus-visible:ring-ring/50");
    expect(buttonCard).toBeDisabled();
  });

  it("mapeia StatusBadge com labels visiveis e status de projeto", () => {
    render(
      <>
        <StatusBadge status="draft" />
        <StatusBadge status="in_progress" variant="outline" />
        <StatusBadge status="validated" />
        <StatusBadge status="done" size="sm" />
        <StatusBadge status="archived" />
        <StatusBadge status="warning" label="Atenção manual" />
        <StatusBadge
          status="error"
          icon={<svg data-testid="status-badge-icon" />}
        />
      </>,
    );

    expect(screen.getByText("Em estruturação")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
    expect(screen.getByText("Validado")).toBeInTheDocument();
    expect(screen.getByText("Finalizado")).toBeInTheDocument();
    expect(screen.getByText("Arquivado")).toBeInTheDocument();
    expect(screen.getByText("Atenção manual")).toBeInTheDocument();
    expect(screen.getByText("Erro")).toBeInTheDocument();

    const progressBadge = screen
      .getByText("Em andamento")
      .closest("[data-slot='status-badge']");
    const iconWrapper = screen
      .getByTestId("status-badge-icon")
      .closest("[aria-hidden='true']");

    expect(progressBadge).not.toHaveAttribute("tabindex");
    expect(progressBadge).toHaveAttribute("data-status", "in_progress");
    expect(iconWrapper).toBeInTheDocument();
  });

  it("renderiza ProjectCard com ilustracao editorial separada de evidencia", () => {
    render(
      <ProjectCard
        title="Portal de testes"
        summary="Resumo validado usado apenas como fixture de teste."
        area="Software aplicado"
        status="draft"
        problem="Contexto do projeto mantido como informacao estrutural."
        objective="Organizar uma experiencia de portfolio acessivel."
        stack={[
          "Next.js",
          "TypeScript",
          "Design System",
          "Acessibilidade",
          "Pesquisa",
        ]}
        nextStep="Validar conteudo real antes de publicar evidencias."
        href="/projetos/portal-de-testes"
        visual={{
          kind: "illustration",
          src: "/images/projetos/ilustracao-software-aplicado.webp",
          alt: "Ilustração editorial da frente de software aplicado.",
        }}
        headingLevel={3}
      />,
    );

    const card = screen.getByRole("link", {
      name: /Portal de testes/i,
    });
    const status = screen
      .getByText("Em estruturação")
      .closest("[data-slot='status-badge']");

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-variant", "interactive");
    expect(card).toHaveAttribute("href", "/projetos/portal-de-testes");
    expect(card.className).toContain("focus-visible:ring-ring/50");
    expect(
      screen.getByRole("heading", { level: 3, name: "Portal de testes" }),
    ).toBeInTheDocument();
    expect(status).toHaveAttribute("data-status", "draft");
    expect(screen.getByText("Software aplicado")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Ilustração editorial da frente de software aplicado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Última atualização pendente de dado validado."),
    ).toBeInTheDocument();
  });

  it("renderiza OpportunityBanner com Card base, estado textual e CTA real", () => {
    const { container } = render(
      <>
        <OpportunityBanner
          title="No momento, não há oportunidades abertas."
          description="Acompanhe esta página para futuros processos seletivos."
          note="O envio de interesse ou currículo não garante aprovação."
          cta={{ label: "Falar com o NITE", href: "/#contato" }}
          headingLevel="h3"
        />
        <OpportunityBanner
          status="open"
          title="Estado de processo aberto"
          description="Variante estrutural para oportunidades validadas."
          headingLevel="h3"
        />
      </>,
    );

    const banners = container.querySelectorAll(
      "[data-component='opportunity-banner']",
    );
    const closedBanner = banners[0];
    const openBanner = banners[1];
    const cta = screen.getByRole("link", { name: /Falar com o NITE/i });
    const closedStatus = screen
      .getByText("Sem oportunidades abertas")
      .closest("[data-slot='opportunity-status']");
    const openStatus = screen
      .getByText("Processo aberto")
      .closest("[data-slot='opportunity-status']");

    expect(banners).toHaveLength(2);
    expect(closedBanner).toHaveAttribute("data-slot", "card");
    expect(closedBanner).toHaveAttribute("data-status", "closed");
    expect(openBanner).toHaveAttribute("data-status", "open");
    expect(closedStatus).toBeInTheDocument();
    expect(openStatus).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "No momento, não há oportunidades abertas.",
      }),
    ).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/#contato");
    expect(document.querySelector("form")).not.toBeInTheDocument();
  });

  it("renderiza OpportunityStatus com texto acessivel para os estados da Spec 005", () => {
    const entries = Object.entries(opportunityStatusLabels) as Array<
      [OpportunityStatusValue, string]
    >;

    render(
      <>
        {entries.map(([status]) => (
          <OpportunityStatus key={status} status={status} />
        ))}
      </>,
    );

    for (const [status, label] of entries) {
      const statusElement = screen
        .getByText(label)
        .closest("[data-slot='opportunity-status']");

      expect(statusElement).toHaveAttribute("data-status", status);
      expect(statusElement).toHaveAttribute(
        "aria-label",
        `Status da oportunidade: ${label}`,
      );
      expect(
        statusElement?.querySelector("[aria-hidden='true']"),
      ).toBeInTheDocument();
    }
  });

  it("renderiza OpportunityInterestFormPreview sem formulario ou campos ativos", () => {
    const { container } = render(
      <OpportunityInterestFormPreview
        headingLevel="h3"
        titleId="preview-formulario"
      />,
    );

    const preview = container.querySelector(
      "[data-component='opportunity-interest-form-preview']",
    );

    expect(preview).toHaveAttribute("data-slot", "card");
    expect(preview).toHaveAttribute("data-status", "inactive");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Estrutura futura do formulário",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Formulário em preparação")).toBeInTheDocument();
    expect(screen.getByText("Nome completo")).toBeInTheDocument();
    expect(screen.getByText("E-mail institucional")).toBeInTheDocument();
    expect(screen.getByText("Currículo")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhum dado é solicitado, capturado", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(document.querySelector("form")).not.toBeInTheDocument();
    expect(document.querySelectorAll("input, textarea, select")).toHaveLength(
      0,
    );
    expect(
      screen.queryByRole("button", { name: /enviar/i }),
    ).not.toBeInTheDocument();
  });

  it("renderiza UpdateCard com Card base e fallback honesto sem imagem", () => {
    const { container } = render(
      <UpdateCard
        title="Card estrutural"
        summary="Resumo usado apenas para validar o componente sem publicar atualização real."
        category="registro"
        headingLevel="h3"
      />,
    );

    const card = container.querySelector("[data-component='update-card']");
    const category = screen
      .getByText("Registro")
      .closest("[data-slot='update-card-category']");

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-variant", "default");
    expect(card).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Card estrutural" }),
    ).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(
      screen.getByText("Imagem não publicada.", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();
    expect(screen.queryByText("Autor")).not.toBeInTheDocument();
  });

  it("renderiza UpdateCard interativo apenas quando href existe", () => {
    render(
      <UpdateCard
        title="Registro com destino"
        summary="Resumo estrutural para validar semântica de link real."
        category="projeto"
        publishedAt="Data validada"
        author="Autoria validada"
        href="/atualizacoes"
        headingLevel="h4"
      />,
    );

    const card = screen.getByRole("link", {
      name: /Registro com destino/i,
    });

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-variant", "interactive");
    expect(card).toHaveAttribute("href", "/atualizacoes");
    expect(card.className).toContain("focus-visible:ring-ring/50");
    expect(
      screen.getByRole("heading", { level: 4, name: "Registro com destino" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Projeto")).toBeInTheDocument();
    expect(screen.getByText("Data validada")).toBeInTheDocument();
    expect(screen.getByText("Autoria validada")).toBeInTheDocument();
    expect(screen.getByText("Abrir atualização")).toBeInTheDocument();
  });

  it("renderiza TimelineItem com estado textual e fallback sem evidencia", () => {
    const { container } = render(
      <TimelineItem
        title="Item estrutural"
        description="Descrição usada apenas para validar o componente sem publicar marco real."
        dateLabel="Período validado"
        category="Estrutura"
        status="planned"
        headingLevel="h3"
      />,
    );

    const item = container.querySelector("[data-component='timeline-item']");
    const status = screen
      .getByText("Planejado")
      .closest("[data-slot='timeline-item-status']");

    expect(item).toHaveAttribute("data-slot", "card");
    expect(item).toHaveAttribute("data-status", "planned");
    expect(item).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Item estrutural" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Período validado")).toBeInTheDocument();
    expect(screen.getByText("Estrutura")).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(
      screen.getByText("Evidência pública ainda não vinculada."),
    ).toBeInTheDocument();
  });

  it("renderiza TimelineItem interativo apenas quando href existe", () => {
    render(
      <TimelineItem
        title="Registro estrutural"
        description="Descrição estrutural para validar semântica de link real."
        dateLabel="Período validado"
        category="Registro"
        status="validated"
        href="/atualizacoes"
        headingLevel="h4"
      />,
    );

    const item = screen.getByRole("link", {
      name: /Registro estrutural/i,
    });

    expect(item).toHaveAttribute("data-slot", "card");
    expect(item).toHaveAttribute("data-variant", "interactive");
    expect(item).toHaveAttribute("data-status", "validated");
    expect(item).toHaveAttribute("href", "/atualizacoes");
    expect(item.className).toContain("focus-visible:ring-ring/50");
    expect(
      screen.getByRole("heading", { level: 4, name: "Registro estrutural" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Validado")).toBeInTheDocument();
    expect(screen.getByText("Abrir registro")).toBeInTheDocument();
    expect(
      screen.queryByText("Evidência pública ainda não vinculada."),
    ).not.toBeInTheDocument();
  });

  it("mantem ProjectCard sem href como card nao interativo", () => {
    const { container } = render(
      <ProjectCard
        title="Projeto sem destino"
        summary="Resumo estrutural sem link de detalhe publicado."
        area="Dados e IA"
        status="archived"
        problem="Contexto arquivado sem evolucao ativa."
        objective="Preservar historico sem parecer projeto ativo."
        stack={[]}
        updatedAt="15/05/2026"
        nextStep="Manter registro historico sem publicar nova rota."
        headingLevel={4}
      />,
    );

    const card = container.querySelector("[data-slot='card']");

    expect(card).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "Projeto sem destino" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Arquivado")).toBeInTheDocument();
    expect(screen.queryByText("Stack")).not.toBeInTheDocument();
    expect(
      screen.getByText("Última atualização: 15/05/2026"),
    ).toBeInTheDocument();
  });
});
