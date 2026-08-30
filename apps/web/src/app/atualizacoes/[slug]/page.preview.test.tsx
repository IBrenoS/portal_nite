import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const preview = {
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

vi.mock("@/lib/news-preview", () => ({
  getPreviewArticleForSlug: async () => preview,
}));

import NewsArticlePage, { generateMetadata } from "./page";

afterEach(cleanup);

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
});
