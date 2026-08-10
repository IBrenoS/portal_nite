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
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("expõe filtros compartilháveis e marca a seleção atual", async () => {
    await renderUpdatesPage("comunidade");

    const filters = screen.getByRole("navigation", {
      name: "Filtros de notícias",
    });
    const activeFilter = within(filters).getByRole("link", {
      name: "Comunidade",
    });

    expect(activeFilter).toHaveAttribute("aria-current", "page");
    expect(
      within(filters).getByRole("link", { name: "Agenda" }),
    ).toHaveAttribute("href", "/atualizacoes?filtro=agenda");
    expect(screen.getByRole("main").querySelectorAll("article")).toHaveLength(
      3,
    );
  });

  it("trata filtro desconhecido como destaques", async () => {
    await renderUpdatesPage("desconhecido");

    expect(
      within(
        screen.getByRole("navigation", { name: "Filtros de notícias" }),
      ).getByRole("link", { name: "Destaques" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("heading", { level: 2, name: "Últimas notícias" }),
    ).toBeInTheDocument();
  });

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
