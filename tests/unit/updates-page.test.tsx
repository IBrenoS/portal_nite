import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import UpdatesPage, { metadata } from "@/app/atualizacoes/page";

afterEach(() => {
  cleanup();
});

describe("UpdatesPage", () => {
  it("renderiza base de Atualizações com estado vazio honesto", () => {
    render(<UpdatesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "NITE em movimento" }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));
    const emptyState = document.querySelector(
      "[data-component='updates-empty-state']",
    );

    expect(main.getByText("Atualizações")).toBeInTheDocument();
    expect(
      main.getByText("Registros, novidades e bastidores das ações do núcleo."),
    ).toBeInTheDocument();
    expect(emptyState).toHaveAttribute("data-slot", "card");
    expect(emptyState).toHaveAttribute("data-status", "empty");
    expect(
      main.getByRole("heading", {
        level: 2,
        name: "No momento, ainda não há atualizações publicadas.",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Esta seção será usada para organizar atualizações validadas do NITE.",
        { exact: false },
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Conteúdos reais serão adicionados após validação/autorização.",
        { exact: false },
      ),
    ).toBeInTheDocument();
  });

  it("mantém conteúdo fictício e rotas futuras fora da página", () => {
    render(<UpdatesPage />);

    const main = within(screen.getByRole("main"));
    const instagramLink = main.getByRole("link", {
      name: "Acompanhar o NITE no Instagram",
    });

    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/nite.uj?igsh=c3JzbHRxdWZnNzN2",
    );
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(
      screen.getByText(
        "Nenhuma atualização, evento, foto, depoimento, autor, data ou métrica será exibida sem validação/autorização.",
      ),
    ).toBeInTheDocument();

    for (const forbidden of [
      "notícias",
      "Publicado em",
      "Autor:",
      "Evento confirmado",
      "Oficina confirmada",
      "/noticias",
      "/atualizacoes/",
    ]) {
      expect(
        screen.queryByText(forbidden, { exact: false }),
      ).not.toBeInTheDocument();
    }

    expect(document.querySelector("a[href='/noticias']")).toBeNull();
    expect(document.querySelector("a[href^='/atualizacoes/']")).toBeNull();
  });

  it("declara metadata institucional de atualizações", () => {
    expect(metadata.title).toBe("Atualizações | NITE");
    expect(metadata.description).toBe(
      "Registros, novidades e bastidores das ações do núcleo.",
    );
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/atualizacoes",
    );
  });
});
