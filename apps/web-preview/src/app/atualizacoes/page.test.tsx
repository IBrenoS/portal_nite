import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { PreviewArticle } from "~/lib/news-preview";

const controls = vi.hoisted(() => ({
  activePreview: undefined as PreviewArticle | undefined,
  publicArticles: [] as Array<{
    slug: string;
    title: string;
    summary: string;
    category: "inovacao";
    publishedAt: string;
    readTimeMinutes: number;
    byline: string;
    cover: { src: string; alt: string };
    featured: boolean;
    contentState: "real";
    public: true;
    body: {
      schemaVersion: 2;
      type: "doc";
      content: Array<{
        type: "paragraph";
        content: Array<{ type: "text"; text: string }>;
      }>;
    };
  }>,
}));

vi.mock("~/lib/news", () => ({
  getFilteredNewsArticles: async () => controls.publicArticles,
  getAgendaNewsArticles: async () => [],
  getFeaturedNewsArticle: async () =>
    controls.publicArticles.find((article) => article.featured),
}));

vi.mock("~/lib/news-preview", async (importOriginal) => {
  const actual = await importOriginal<typeof import("~/lib/news-preview")>();
  return {
    ...actual,
    getPreviewArticle: async () => controls.activePreview,
  };
});

import UpdatesPage, { generateMetadata } from "./page";

afterEach(cleanup);

const mockPreview = {
  schemaVersion: 1 as const,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  slug: "materia-em-previa",
  publishedAt: null,
  title: "Matéria em prévia com título editorial válido",
  summary:
    "Resumo editorial suficientemente descritivo para validar uma prévia privada no Portal NITE.",
  category: "inovacao" as const,
  readTimeMinutes: 3,
  byline: "Redação NITE",
  featured: false,
  cover: {
    src: "https://media.nite.test/capa.webp",
    width: 1200,
    height: 630,
    alt: "Capa do artigo em prévia editorial",
  },
  body: {
    schemaVersion: 1 as const,
    type: "doc" as const,
    content: [
      {
        type: "paragraph" as const,
        content: [
          { type: "text" as const, text: "Conteúdo privado da revisão." },
        ],
      },
    ],
  },
};

const publishedArticle = {
  slug: "materia-publicada-pelo-cms",
  title: "Matéria publicada pelo CMS aparece no Portal de preview",
  summary:
    "Resumo editorial suficientemente descritivo para validar a matéria publicada na listagem do Portal de preview.",
  category: "inovacao" as const,
  publishedAt: "2026-09-10",
  readTimeMinutes: 3,
  byline: "Redação NITE",
  cover: {
    src: "https://media.nite.test/news/capa-publicada.webp",
    alt: "Equipe do NITE reunida durante a publicação da matéria",
  },
  featured: true,
  contentState: "real" as const,
  public: true as const,
  body: {
    schemaVersion: 2 as const,
    type: "doc" as const,
    content: [
      {
        type: "paragraph" as const,
        content: [{ type: "text" as const, text: "Conteúdo publicado." }],
      },
    ],
  },
};

describe("página /atualizacoes em prévia", () => {
  it("exibe faixa privada, botão de saída e insere card editorial com link para detalhe", async () => {
    controls.activePreview = mockPreview;

    render(await UpdatesPage());

    expect(screen.getByRole("status")).toHaveTextContent(
      "Prévia privada — ainda não publicada: Matéria em prévia com título editorial válido.",
    );
    expect(
      screen.getByRole("button", { name: "Sair da prévia" }),
    ).toBeInTheDocument();

    const previewLink = screen.getByRole("link", {
      name: new RegExp(mockPreview.title, "i"),
    });
    expect(previewLink).toHaveAttribute(
      "href",
      `/atualizacoes/${mockPreview.slug}`,
    );

    expect(
      document.querySelector("script[id='structured-data-updates-breadcrumb']"),
    ).toBeNull();
  });

  it("aplica robots restritivo e no-referrer na metadata durante a prévia", async () => {
    controls.activePreview = mockPreview;

    const metadata = await generateMetadata();

    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.referrer).toBe("no-referrer");
    expect(metadata.alternates).toBeUndefined();
  });

  it("renderiza normalmente sem faixa privada quando não há prévia ativa", async () => {
    controls.activePreview = undefined;
    controls.publicArticles = [publishedArticle];

    render(await UpdatesPage());

    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("button", { name: "Sair da prévia" })).toBeNull();
    expect(
      document.querySelector("script[id='structured-data-updates-breadcrumb']"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: new RegExp(publishedArticle.title, "i"),
      }),
    ).toHaveAttribute("href", `/atualizacoes/${publishedArticle.slug}`);

    const metadata = await generateMetadata();
    expect(metadata.alternates?.canonical).toContain("/atualizacoes");
  });
});
