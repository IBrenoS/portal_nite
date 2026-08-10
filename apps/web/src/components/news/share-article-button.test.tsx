import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ShareArticleButton } from "@/components/news/share-article-button";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ShareArticleButton", () => {
  it("usa Web Share quando a API está disponível", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    render(
      <ShareArticleButton
        title="Título editorial"
        url="https://nite.example/atualizacoes/materia"
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Compartilhar matéria" }),
    );

    expect(share).toHaveBeenCalledWith({
      title: "Título editorial",
      url: "https://nite.example/atualizacoes/materia",
    });
  });

  it("copia a URL e anuncia o resultado quando Web Share não existe", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <ShareArticleButton
        title="Título editorial"
        url="https://nite.example/atualizacoes/materia"
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Compartilhar matéria" }),
    );

    expect(writeText).toHaveBeenCalledWith(
      "https://nite.example/atualizacoes/materia",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Link copiado");
  });
});
