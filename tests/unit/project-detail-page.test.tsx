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
  it("renderiza detalhe de projeto com StatusBadge real", async () => {
    await renderProjectPage("software-aplicado");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Software aplicado",
      }),
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
      screen.getAllByText("Imagem ou evidência pública ainda indisponível.")
        .length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText("Pendente de validação pública"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Conteúdo em estruturação editorial; não representa um projeto ativo validado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Resultados" }),
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
      screen.queryByRole("heading", { level: 2, name: "Entregáveis" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Galeria" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Links" }),
    ).not.toBeInTheDocument();
  });

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
    expect(screen.getByText("Última atualização")).toBeInTheDocument();
    expect(screen.getAllByText("18/05/2026").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Demo validada").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(
      within(
        screen.getByRole("heading", { level: 2, name: "Entregáveis" })
          .parentElement as HTMLElement,
      ).getByRole("link", { name: "Abrir" }),
    ).toHaveAttribute("href", "https://example.com/demo");
    expect(
      screen.getByRole("heading", { level: 2, name: "Resultados" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Resultado real validado de teste para comprovar a seção pública de resultados.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Entregas validadas")).toBeInTheDocument();
    expect(
      screen.getByText("Fonte: Fonte validada de teste"),
    ).toBeInTheDocument();
    expect(screen.getByText("Equipe autorizada de teste")).toBeInTheDocument();
    expect(
      screen.queryByText("Equipe interna sem autorização pública"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Registro validado")).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Galeria autorizada de teste para projeto real validado.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Documento público/i }),
    ).toHaveAttribute("href", "https://example.com/documento");
  });
});
