import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import UpdatesPage, { metadata } from "@/app/atualizacoes/page";

afterEach(() => cleanup());

describe("UpdatesPage", () => {
  it("renderiza o portal editorial estático com header e footer padrão", async () => {
    render(await UpdatesPage());

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
    expect(
      screen.queryByRole("navigation", { name: "Filtros de notícias" }),
    ).toBeNull();
  });

  it("declara metadata editorial do Nite News", () => {
    expect(metadata.title).toBe("Nite News | NITE");
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/atualizacoes",
    );
  });
});
