import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectPage from "@/app/projetos/[slug]/page";

describe("ProjectPage", () => {
  it("renderiza detalhe de projeto com StatusBadge real", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "software-aplicado" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Software aplicado",
      }),
    ).toBeInTheDocument();
    expect(
      document.querySelectorAll(
        "[data-slot='status-badge'][data-status='draft']",
      ).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText("Em estruturação").length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText("Imagem ou evidência pública ainda indisponível.")
        .length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText("Pendente de validação pública"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Conteúdo em estruturação editorial; não representa um projeto ativo validado.",
      ),
    ).toBeInTheDocument();
  });
});
