import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import NewsArticlePage, {
  generateMetadata,
} from "@/app/atualizacoes/[slug]/page";

afterEach(() => {
  cleanup();
});

const featuredSlug = "novas-conexoes-transformam-experiencia-campus";

async function renderArticle(slug = featuredSlug) {
  render(
    await NewsArticlePage({
      params: Promise.resolve({ slug }),
    }),
  );
}

describe("NewsArticlePage", () => {
  it("renderiza a matéria dedicada com estrutura editorial completa", async () => {
    await renderArticle();

    expect(screen.getByRole("banner")).toHaveAttribute("data-site-header");
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-footer-variant",
      "plain",
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Novas conexões transformam a experiência no campus",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Contexto para acompanhar",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("blockquote")).toHaveTextContent(
      "Informar também é desenhar uma experiência de descoberta",
    );
    expect(
      screen.getByRole("button", { name: "Compartilhar matéria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para Nite News" }),
    ).toHaveAttribute("href", "/atualizacoes");

    const related = within(
      screen.getByRole("region", { name: "Matérias relacionadas" }),
    );
    expect(related.getAllByRole("article")).toHaveLength(3);
    expect(document.querySelector("#structured-data-news-article")).toBeNull();
  });

  it("marca matéria demonstrativa como noindex na metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: featuredSlug }),
    });

    expect(metadata.title).toBe(
      "Novas conexões transformam a experiência no campus | NITE",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
    expect(metadata.alternates?.canonical?.toString()).toContain(
      `/atualizacoes/${featuredSlug}`,
    );
    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });

  it("renderiza 404 editorial e metadata noindex para slug desconhecido", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "materia-inexistente" }),
    });

    await renderArticle("materia-inexistente");

    expect(
      screen.getByRole("heading", { name: "Matéria não encontrada" }),
    ).toBeInTheDocument();
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("gera todos os slugs públicos no build", async () => {
    const { generateStaticParams } =
      await import("@/app/atualizacoes/[slug]/page");

    expect(await generateStaticParams()).toContainEqual({ slug: featuredSlug });
  });
});
