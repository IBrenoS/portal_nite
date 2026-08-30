import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { PreviewArticle } from "@/lib/news-preview";

const preview: PreviewArticle = {
  schemaVersion: 1,
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

let resolvedPreview: PreviewArticle = preview;

vi.mock("@/lib/news-preview", () => ({
  getPreviewArticleForSlug: async () => resolvedPreview,
}));

import NewsArticlePage, { generateMetadata } from "./page";

afterEach(() => {
  cleanup();
  resolvedPreview = preview;
});

describe("NewsArticlePage em prévia", () => {
  it("renderiza somente a revisão autorizada, sem JSON-LD ou metadata indexável", async () => {
    render(
      await NewsArticlePage({
        params: Promise.resolve({ slug: preview.slug }),
      }),
    );
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: preview.slug }),
    });

    expect(screen.getByText(/Prévia privada/)).toHaveAttribute(
      "role",
      "status",
    );
    expect(
      screen.getByRole("button", { name: "Sair da prévia" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Compartilhar matéria" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Conteúdo privado da revisão.")).toBeVisible();
    expect(
      document.querySelector("script[type='application/ld+json']"),
    ).toBeNull();
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.referrer).toBe("no-referrer");
  });

  it("não afirma que uma revisão de matéria publicada ainda não foi publicada", async () => {
    resolvedPreview = {
      ...preview,
      publishedAt: "2026-08-28T12:00:00.000Z",
    };

    render(
      await NewsArticlePage({
        params: Promise.resolve({ slug: preview.slug }),
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent("Prévia privada.");
    expect(screen.getByRole("status")).not.toHaveTextContent(
      "ainda não publicada",
    );
  });
});
