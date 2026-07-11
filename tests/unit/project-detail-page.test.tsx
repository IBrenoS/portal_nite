import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { Project } from "@/biblioteca/esquemas";

afterEach(() => {
  cleanup();
  vi.resetModules();
  vi.doUnmock("@/biblioteca/conteudo");
});

async function renderProjectPage(slug: string) {
  const { default: ProjectPage } = await import("@/app/projetos/[slug]/page");
  const page = await ProjectPage({
    params: Promise.resolve({ slug }),
  });

  render(page);
}

const realProjectFixture = {
  slug: "projeto-real-validado",
  title: "Projeto real validado",
  summary:
    "Resumo controlado para validar a estrutura real de um projeto autorizado.",
  description:
    "Descrição controlada de teste para validar a página de projeto quando o conteúdo está aprovado para publicação.",
  problem:
    "Validar que a página de detalhe exibe materiais reais somente quando o projeto está marcado como real.",
  context:
    "Fixture unitária isolada do JSON oficial para cobrir a renderização de campos autorizados.",
  audience: ["Estudantes", "Professores"],
  category: "Programação",
  year: 2026,
  status: "ativo",
  contentState: "real",
  currentPhase: "Validação pública",
  lastUpdated: "2026-05-18",
  nextStep: "Manter evidências públicas revisadas antes de ampliar a página.",
  coverImage: "/images/projetos/programacao-lab-card.png",
  alt: "Imagem autorizada de teste para capa de projeto real validado.",
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
  metrics: [
    {
      label: "Entregas validadas",
      value: "1",
      source: "Fonte validada de teste",
    },
  ],
  team: [
    {
      name: "Equipe autorizada de teste",
      role: "equipe",
      public: true,
    },
    {
      name: "Equipe interna sem autorização pública",
      role: "equipe",
      public: false,
    },
  ],
  changelog: [
    {
      date: "2026-05-18",
      title: "Registro validado",
      description: "Registro público de teste validado para a página.",
    },
  ],
  gallery: [
    {
      src: "/images/projetos/programacao-lab-card.png",
      alt: "Galeria autorizada de teste para projeto real validado.",
    },
  ],
  highlights: ["Destaque público de teste validado para leitura rápida."],
  objective:
    "Objetivo validado de teste para comprovar a renderização real do projeto.",
  results:
    "Resultado real validado de teste para comprovar a seção pública de resultados.",
  seo: {
    title: "Projeto real validado no NITE",
    description:
      "Fixture controlada para validar a estrutura real de páginas de projeto no Portal NITE sem alterar o JSON oficial.",
  },
  links: [
    {
      label: "Documento público",
      href: "https://example.com/documento",
      type: "documentacao",
    },
  ],
} satisfies Project;

describe("ProjectPage", () => {
  it("renderiza frente em estruturação como acompanhamento público honesto", async () => {
    await renderProjectPage("data-center");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Data Center",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Ver detalhes/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Voltar para projetos/i }),
    ).toHaveAttribute("href", "/#projetos");
    expect(
      screen.getByRole("link", { name: /Voltar para projetos/i }),
    ).toHaveClass("rounded-lg");
    expect(
      screen.getByRole("link", { name: /Voltar para projetos/i }),
    ).not.toHaveClass("rounded-md");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "O que está sendo construído",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Sobre esta frente" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "O que está sendo feito agora",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Registros e evidências",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Quem está construindo" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Descrição" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Problema e contexto" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Objetivo" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Desafio" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Contexto" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Objetivo atual" }),
    ).toBeInTheDocument();
    expect(
      document.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText("Em estruturação").length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByAltText(
        /Racks de servidores, rede e console de operação/i,
      ),
    ).toBeInTheDocument();
    const projectVisual = document.querySelector("[data-visual-kind]");
    const projectVisualPanel = projectVisual?.closest(".nite-panel");

    expect(projectVisual).toHaveAttribute("data-visual-kind", "illustration");
    expect(projectVisualPanel).toHaveClass("!shadow-none");
    expect(projectVisual?.querySelector("img")).toHaveClass("object-cover");
    expect(
      projectVisual?.querySelector("[class*='bg-gradient-to-t']"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Visual editorial")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Imagem ou evidência pública ainda indisponível."),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Pendente de validação pública"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Mapeamento da frente")).toHaveLength(1);
    expect(screen.getByText("Programação")).toBeInTheDocument();
    expect(screen.getByText("Estudantes")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Conteúdo em estruturação editorial; não representa um projeto ativo validado.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Resultado publicado" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "A frente está em estruturação editorial e aguarda evidências públicas antes de exibir resultados ou entregáveis reais.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Evidências públicas em validação"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fotos, entregáveis, métricas, registros e links só aparecem quando o conteúdo estiver validado para publicação.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Entregáveis" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: "Fotografias e materiais",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Links públicos" }),
    ).not.toBeInTheDocument();
  }, 10000);

  it("renderiza relacionados como faixa de descoberta compacta", async () => {
    await renderProjectPage("data-center");

    const relatedSection = document.querySelector(
      "[data-component='related-projects-discovery']",
    ) as HTMLElement;
    const related = within(relatedSection);

    expect(relatedSection).toBeInTheDocument();
    expect(relatedSection).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(relatedSection).toHaveAttribute("data-surface", "nite-background");
    expect(relatedSection).toHaveAttribute("data-related-projects-count", "2");
    expect(
      related.getByRole("heading", {
        level: 2,
        name: "Continue explorando os projetos do NITE.",
      }),
    ).toBeInTheDocument();
    expect(related.getByText("Projetos Relacionados")).toBeInTheDocument();
    expect(
      related.queryByText(
        "Conheça outras frentes que dialogam com este projeto.",
      ),
    ).not.toBeInTheDocument();
    expect(
      related.getByRole("heading", {
        level: 3,
        name: "Jogos Embarcados",
      }),
    ).toBeInTheDocument();
    expect(
      related.getByRole("heading", { level: 3, name: "Dados e IA" }),
    ).toBeInTheDocument();
    expect(related.queryAllByText("Mapeamento da frente")).toHaveLength(0);
    expect(related.getAllByRole("link", { name: /Ver projeto/i })).toHaveLength(
      2,
    );
    expect(
      related.getByRole("link", { name: /Ver todos os projetos/i }),
    ).toHaveAttribute("href", "/projetos");
    expect(
      relatedSection.querySelector("[data-component='project-card']"),
    ).not.toBeInTheDocument();
    expect(
      relatedSection.querySelectorAll(
        "[data-component='related-project-card']",
      ),
    ).toHaveLength(2);
    expect(related.queryByText("Objetivo")).not.toBeInTheDocument();
    expect(related.queryByText("Próximo passo")).not.toBeInTheDocument();
    expect(related.queryByText("Última atualização")).not.toBeInTheDocument();
    expect(related.queryByText("Stack")).not.toBeInTheDocument();
  }, 10000);

  it("renderiza campos reais e autorizados quando recebe fixture real", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      getProjectBySlug: (slug: string) =>
        slug === realProjectFixture.slug ? realProjectFixture : undefined,
      getProjectSlugs: () => [{ slug: realProjectFixture.slug }],
      getRelatedProjects: () => [],
    }));

    await renderProjectPage(realProjectFixture.slug);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Projeto real validado",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Imagem autorizada de teste para capa de projeto real validado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Ver detalhes/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Última atualização")).toBeInTheDocument();
    expect(screen.getAllByText("18/05/2026").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "O que está sendo construído",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Sobre esta frente" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Registros e evidências",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Demo validada").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(
      screen.getByRole("link", { name: /Abrir Demo validada/i }),
    ).toHaveAttribute("href", "https://example.com/demo");
    expect(
      screen.getByRole("link", { name: /Abrir Demo validada/i }),
    ).toHaveClass("rounded-lg");
    expect(
      screen.getByRole("link", { name: /Abrir Demo validada/i }),
    ).not.toHaveClass("rounded-md");
    expect(
      screen.getByRole("heading", { level: 3, name: "Entregáveis" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Resultado publicado" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Resultado real validado de teste para comprovar a seção pública de resultados.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Métricas" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Entregas validadas")).toBeInTheDocument();
    expect(
      screen.getByText("Fonte: Fonte validada de teste"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Quem está construindo" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Equipe autorizada de teste")).toBeInTheDocument();
    expect(
      screen.queryByText("Equipe interna sem autorização pública"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Registros" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Registro validado")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Fotografias e materiais",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Galeria autorizada de teste para projeto real validado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Links públicos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Documento público/i }),
    ).toHaveAttribute("href", "https://example.com/documento");
    expect(
      within(
        screen
          .getByRole("heading", { level: 2, name: "Sobre esta frente" })
          .closest("section") as HTMLElement,
      ).getByText(
        "Objetivo validado de teste para comprovar a renderização real do projeto.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Resultados" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Changelog" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Equipe pública" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Entregáveis" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Galeria" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Links" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Evidências públicas em validação"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Fotos, entregáveis, métricas, registros e links só aparecem quando o conteúdo estiver validado para publicação.",
      ),
    ).not.toBeInTheDocument();
  });

  it("formaliza os padroes locais da pagina sem criar tokens novos", () => {
    const source = readFileSync(
      join(process.cwd(), "app", "projetos", "[slug]", "page.tsx"),
      "utf8",
    );

    expect(source).toContain("function ProjectDetailSection(");
    expect(source).toContain("function ProjectDetailSectionHeader(");
    expect(source).toContain("function ProjectDetailPanel(");
    expect(source).toContain("function ProjectDetailTextLink(");
    expect(source).toContain("function ProjectDetailMediaPanel(");
    expect(source).not.toContain("const detailPanelClassName");
    expect(source).not.toMatch(
      /buttonVariants\(\{ variant: "(primary|outline)", size: "lg" \}\),\s*"w-fit rounded-md"/,
    );
    expect(source).not.toContain('className="inline-flex min-h-10');
    expect(source).not.toContain('className="inline-flex min-h-11');
    expect(source).not.toContain("text-nite-text-secondary");
    expect(source).toContain('className={cn("grid gap-5", className)}');
    expect(source).toContain('className={cn(cardVariants(), "rounded-lg p-5"');
    expect(source).toContain("duration-nite-micro");
    expect(source).toContain("ease-nite-out");
  });
});
