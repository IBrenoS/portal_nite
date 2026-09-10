import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => ({
  preview: {
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
      width: 1600,
      height: 900,
      alt: "Estudantes participam de uma atividade no campus.",
      caption: "Encontro realizado no laboratório de inovação.",
      credit: "Foto: Redação NITE",
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
  },
  publicArticle: undefined as
    | {
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
      }
    | undefined,
}));

vi.mock("~/lib/news", () => ({
  getNewsArticleBySlug: async (slug: string) =>
    controls.publicArticle?.slug === slug ? controls.publicArticle : undefined,
  getRelatedNewsArticles: async () => [],
}));

vi.mock("~/lib/news-preview", () => ({
  getPreviewArticleForSlug: async (slug: string) =>
    slug === controls.preview.slug ? controls.preview : undefined,
}));

import NewsArticlePage, { generateMetadata } from "./page";

afterEach(cleanup);

describe("matéria em prévia", () => {
  it("não herda Open Graph de uma rota de imagem global", () => {
    expect(
      existsSync(resolve(process.cwd(), "src/app/opengraph-image.tsx")),
    ).toBe(false);
  });

  it("exibe faixa privada e omite compartilhamento e dados estruturados", async () => {
    render(
      await NewsArticlePage({
        params: Promise.resolve({ slug: controls.preview.slug }),
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Prévia privada — ainda não publicada.",
    );
    expect(
      screen.getByRole("button", { name: "Sair da prévia" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Compartilhar matéria" }),
    ).toBeNull();
    expect(
      document.querySelector("script[type='application/ld+json']"),
    ).toBeNull();
    expect(
      screen.getByText("Encontro realizado no laboratório de inovação."),
    ).toBeVisible();
    expect(screen.getByText("Foto: Redação NITE")).toBeVisible();
  });

  it("não publica canonical, Open Graph ou Twitter na metadata privada", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: controls.preview.slug }),
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.openGraph).toBeUndefined();
    expect(metadata.twitter).toBeUndefined();
    expect(metadata.referrer).toBe("no-referrer");
  });

  it("renderiza a matéria publicada retornada pela API do CMS", async () => {
    controls.publicArticle = {
      slug: "materia-publicada-pelo-cms",
      title: "Matéria publicada pelo CMS aparece no detalhe",
      summary:
        "Resumo editorial suficientemente descritivo para validar o detalhe público no Portal de preview.",
      category: "inovacao",
      publishedAt: "2026-09-10",
      readTimeMinutes: 4,
      byline: "Redação NITE",
      cover: {
        src: "https://media.nite.test/news/capa-detalhe.webp",
        alt: "Equipe editorial revisa a matéria publicada pelo CMS",
      },
      featured: false,
      contentState: "real",
      public: true,
      body: {
        schemaVersion: 2,
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Conteúdo publicado pelo CMS." }],
          },
        ],
      },
    };

    render(
      await NewsArticlePage({
        params: Promise.resolve({ slug: controls.publicArticle.slug }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: controls.publicArticle.title }),
    ).toBeVisible();
    expect(screen.getByText("Conteúdo publicado pelo CMS.")).toBeVisible();
  });
});
