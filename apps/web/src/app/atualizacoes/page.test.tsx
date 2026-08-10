import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import UpdatesPage, { metadata } from "@/app/atualizacoes/page";

afterEach(() => {
  cleanup();
});

async function renderUpdatesPage(filtro?: string | string[]) {
  render(
    await UpdatesPage({
      searchParams: Promise.resolve({ filtro }),
    }),
  );
}

describe("UpdatesPage", () => {
  it("renderiza o portal editorial completo com header e footer padrão", async () => {
    await renderUpdatesPage();

    expect(
      screen.getByRole("heading", { level: 1, name: "Nite News" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveAttribute("data-site-header");
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-footer-variant",
      "plain",
    );

    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 2, name: "Últimas notícias" }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "Na agenda" }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", {
        level: 2,
        name: "Novas conexões transformam a experiência no campus",
      }),
    ).toBeInTheDocument();

    const articleLinks = screen
      .getByRole("main")
      .querySelectorAll("a[href^='/atualizacoes/']");

    expect(articleLinks).toHaveLength(8);
    expect(
      main.getByRole("link", {
        name: /Novas conexões transformam a experiência no campus/i,
      }),
    ).toHaveAttribute(
      "href",
      "/atualizacoes/novas-conexoes-transformam-experiencia-campus",
    );

    const signalLayer = screen.getByTestId("news-signal-canvas");
    const signalCanvas = screen.getByTestId("news-signal-canvas-element");
    const heroLead = screen.getByTestId("news-hero-lead");
    const halo = screen.getByTestId("news-hero-light-bloom");
    const signalField = screen.getByTestId("news-hero-signal-field");
    const lightMask = screen.getByTestId("news-hero-light-mask");
    expect(signalLayer).toHaveAttribute("aria-hidden", "true");
    expect(signalCanvas.tagName).toBe("CANVAS");
    expect(halo).toHaveAttribute("aria-hidden", "true");
    expect(halo).toHaveAttribute("alt", "");
    expect(halo).toHaveAttribute(
      "src",
      expect.stringContaining("projects-hero-light.png"),
    );
    expect(signalField).toHaveAttribute("aria-hidden", "true");
    expect(lightMask).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-testid^='news-hero-'][src^='http']"),
    ).toBeNull();
    expect(
      screen.queryByRole("navigation", { name: "Filtros de notícias" }),
    ).toBeNull();
    expect(heroLead).toContainElement(
      main.getByRole("link", {
        name: /Novas conexões transformam a experiência no campus/i,
      }),
    );
  });

  it("aplica filtro compartilhado pela URL sem exibir navegação no hero", async () => {
    await renderUpdatesPage("comunidade");

    expect(
      screen.queryByRole("navigation", { name: "Filtros de notícias" }),
    ).toBeNull();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Novas conexões transformam a experiência no campus",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main").querySelectorAll("article")).toHaveLength(
      3,
    );
  });

  it("trata filtro desconhecido como destaques", async () => {
    await renderUpdatesPage("desconhecido");

    expect(
      screen.queryByRole("navigation", { name: "Filtros de notícias" }),
    ).toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Últimas notícias" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["todas", 8],
    ["agenda", 3],
    ["comunidade", 3],
  ] as const)(
    "promove o primeiro resultado de %s sem duplicar materias",
    async (filter, expectedArticleCount) => {
      await renderUpdatesPage(filter);

      const main = screen.getByRole("main");
      const heroLead = screen.getByTestId("news-hero-lead");
      const leadLink = heroLead.querySelector<HTMLAnchorElement>(
        "a[href^='/atualizacoes/']",
      );
      const articleLinks = Array.from(
        main.querySelectorAll<HTMLAnchorElement>("a[href^='/atualizacoes/']"),
      );
      const articleHrefs = articleLinks.map((link) =>
        link.getAttribute("href"),
      );

      expect(leadLink).toHaveAttribute("data-news-layout", "lead");
      expect(articleLinks).toHaveLength(expectedArticleCount);
      expect(new Set(articleHrefs)).toHaveLength(expectedArticleCount);
    },
  );

  it("declara metadata editorial do Nite News", () => {
    expect(metadata.title).toBe("Nite News | NITE");
    expect(metadata.description).toBe(
      "Notícias, eventos e histórias da comunidade universitária reunidos pelo Nite News.",
    );
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/atualizacoes",
    );
  });
});
