import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import OpportunitiesPage, { metadata } from "@/app/oportunidades/page";

afterEach(() => {
  cleanup();
});

describe("OpportunitiesPage", () => {
  it("renderiza estado sem oportunidades, CTA seguro e nenhum formulario real", () => {
    render(<OpportunitiesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Faça parte do NITE",
      }),
    ).toBeInTheDocument();

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);
    const banner = document.querySelector(
      "[data-component='opportunity-banner']",
    );

    expect(mainElement).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(
      main.getByRole("heading", {
        level: 1,
        name: "Faça parte do NITE",
      }),
    ).toHaveClass("nite-gradient-text");
    expect(main.getByRole("link", { name: "Ver oportunidades" })).toHaveClass(
      "nite-glass-action",
    );
    expect(banner).toHaveAttribute("data-slot", "card");
    expect(banner).toHaveAttribute("data-status", "closed");
    const status = document.querySelector("[data-slot='opportunity-status']");

    expect(status).toHaveAttribute("data-status", "closed");
    expect(status).toHaveAttribute(
      "aria-label",
      "Status da oportunidade: Sem oportunidades abertas",
    );
    expect(
      document.querySelector(
        "[data-component='opportunity-interest-form-preview']",
      ),
    ).not.toBeInTheDocument();
    expect(
      main.queryByText("Formulário em preparação"),
    ).not.toBeInTheDocument();
    expect(
      main.queryByRole("heading", {
        name: "Estrutura futura do formulário",
      }),
    ).not.toBeInTheDocument();
    expect(
      main.getByRole("heading", {
        level: 3,
        name: "No momento, não há oportunidades abertas.",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Quando houver processo seletivo, esta página será o canal principal para acompanhar orientações e manifestar interesse.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText("O envio futuro não garante aprovação.", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText("use e-mail institucional se aplicável", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("link", { name: /Falar com o NITE/i }),
    ).toHaveAttribute("href", "/contato");

    expect(document.querySelector("form")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/nome completo/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/currículo/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /enviar/i }),
    ).not.toBeInTheDocument();
    expect(document.querySelectorAll("input, textarea, select")).toHaveLength(
      0,
    );
  });

  it("explica fluxo futuro sem publicar vagas, prazos ou automacoes", () => {
    render(<OpportunitiesPage />);

    const main = within(screen.getByRole("main"));

    expect(
      main.getByRole("heading", {
        level: 2,
        name: "Benefícios & garantias",
      }),
    ).toBeInTheDocument();
    expect(main.getAllByRole("listitem")).toHaveLength(17);
    expect(
      main.getByRole("heading", {
        level: 3,
        name: "Estado público claro",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "O formulário integrado será exibido apenas se o processo estiver aberto e o canal técnico estiver definido.",
      ),
    ).toBeInTheDocument();
    expect(
      main.queryByText(
        "Este bloco antecipa os campos esperados, mas o formulário ainda não está ativo.",
        { exact: false },
      ),
    ).not.toBeInTheDocument();
    for (const futureField of [
      "Nome completo",
      "E-mail institucional",
      "Curso ou vínculo com a universidade",
      "Área de interesse",
      "Mensagem ou objetivo de participação",
      "Currículo",
    ]) {
      expect(main.queryByText(futureField)).not.toBeInTheDocument();
    }
    expect(
      main.getByText(
        "Esta página não anuncia vagas, datas, prazos, responsáveis, métricas ou critérios de aprovação sem confirmação.",
      ),
    ).toBeInTheDocument();

    for (const forbidden of [
      "vaga aberta",
      "inscrições abertas",
      "prazo até",
      "responsável:",
      "aprovação automática",
      "enviar currículo agora",
      "upload",
      "Google Forms",
      "WhatsApp",
    ]) {
      expect(
        screen.queryByText(forbidden, { exact: false }),
      ).not.toBeInTheDocument();
    }
  });

  it("declara metadata institucional de oportunidades", () => {
    expect(metadata.title).toBe("Oportunidades | NITE");
    expect(metadata.description).toContain("oportunidades do NITE");
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/oportunidades",
    );
  });
});
