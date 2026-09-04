import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createNewsPublicRepository,
  createStaticNewsPublicDataSource,
} from "@nite/news";

const controls = vi.hoisted(() => ({ filtro: "destaques" }));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(`filtro=${controls.filtro}`),
}));

import { NewsListing } from "./news-listing";

afterEach(() => {
  cleanup();
  controls.filtro = "destaques";
});

async function renderListing() {
  const repository = createNewsPublicRepository(
    createStaticNewsPublicDataSource(),
  );
  const [articles, agenda, featured] = await Promise.all([
    repository.getFilteredNewsArticles("todas"),
    repository.getAgendaNewsArticles(3),
    repository.getFeaturedNewsArticle(),
  ]);
  render(
    <NewsListing articles={articles} agenda={agenda} featured={featured} />,
  );
}

describe("NewsListing", () => {
  it.each([
    ["todas", 8],
    ["agenda", 3],
    ["comunidade", 3],
  ])("filtra o conteúdo estático no cliente para %s", async (filter, count) => {
    controls.filtro = filter;
    await renderListing();

    const links = document.querySelectorAll("a[href^='/atualizacoes/']");
    expect(links).toHaveLength(count);
  });

  it("trata um filtro desconhecido como destaques", async () => {
    controls.filtro = "inexistente";
    await renderListing();

    expect(
      screen.getByRole("heading", { level: 2, name: "Últimas notícias" }),
    ).toBeInTheDocument();
  });
});
