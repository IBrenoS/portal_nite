import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import OpportunitiesPage, { metadata } from "@/app/oportunidades/page";

afterEach(() => {
  cleanup();
});

describe("OpportunitiesPage", () => {
  it("renderiza estado sem oportunidades, caminhos seguros e nenhum formulario real", () => {
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
    ).not.toHaveClass("nite-gradient-text");
    expect(
      main.queryByRole("link", { name: "Ver estado atual" }),
    ).not.toBeInTheDocument();
    expect(
      main.getByRole("link", { name: /Processos\s+Como participar/i }),
    ).toHaveAttribute("href", "/oportunidades/como-participar");
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
        name: "Nenhum processo aberto agora.",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Quando uma oportunidade for publicada, você encontrará aqui a área, os requisitos e como participar.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText("não garante aprovação", {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: /Falar com o NITE/i }),
    ).not.toBeInTheDocument();

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

  it("apresenta beneficios e vantagens sem publicar vagas, prazos ou automacoes", () => {
    render(<OpportunitiesPage />);

    const main = within(screen.getByRole("main"));

    expect(main.queryAllByText(/\bfrentes?\b/i)).toHaveLength(0);
    expect(
      main.getByText(
        "Descubra como participar do NITE, conheça os projetos e acompanhe a abertura de processos seletivos.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", {
        level: 2,
        name: "O que fazemos no NITE",
      }),
    ).toBeInTheDocument();
    expect(
      main.queryByRole("heading", {
        level: 3,
        name: "Informação sem confusão",
      }),
    ).not.toBeInTheDocument();

    expect(
      main.getByRole("heading", {
        level: 2,
        name: "Benefícios e vantagens",
      }),
    ).toBeInTheDocument();
    expect(main.getAllByRole("listitem")).toHaveLength(17);
    expect(
      main.queryByRole("heading", {
        level: 2,
        name: "Como cuidamos do processo",
      }),
    ).not.toBeInTheDocument();
    for (const benefitTitle of [
      "Horas curriculares",
      "Projetos reais",
      "Certificado de conclusão",
      "Currículo",
      "Prática guiada",
      "Equipe",
      "Integração",
      "Autonomia",
      "Rotina de projeto",
    ]) {
      expect(
        main.getByRole("heading", {
          level: 3,
          name: benefitTitle,
        }),
      ).toBeInTheDocument();
    }
    expect(
      main.getByText("Acumule horas conforme as regras do seu curso."),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Receba certificado após cumprir a carga horária do núcleo.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Nenhum dado pessoal é solicitado enquanto não houver fluxo operacional aprovado.",
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
    ]) {
      expect(main.queryByText(futureField)).not.toBeInTheDocument();
    }
    expect(
      main.getByText(
        "Nenhuma vaga, data ou critério é publicado sem confirmação institucional.",
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
