import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import HowToParticipatePage, {
  metadata,
} from "@/app/oportunidades/como-participar/page";

afterEach(() => {
  cleanup();
});

describe("OpportunitiesHowToParticipatePage", () => {
  it("renderiza a rota dedicada como pagina editorial sem CTA principal", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    expect(mainElement).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(
      main.getByRole("heading", {
        level: 1,
        name: "O caminho para construir com o NITE",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Como estudantes se aproximam do núcleo, desenvolvem repertório e entram em projetos com orientação, ritmo e responsabilidade.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "O caminho de entrada" }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", {
        level: 2,
        name: "Da aproximação ao projeto",
      }),
    ).toBeInTheDocument();
    expect(
      main.getByRole("heading", { level: 2, name: "Sinais de prontidão" }),
    ).toBeInTheDocument();

    expect(main.queryByRole("link")).not.toBeInTheDocument();
    expect(mainElement.querySelector("form")).not.toBeInTheDocument();
    expect(
      mainElement.querySelectorAll("input, textarea, select, button"),
    ).toHaveLength(0);
  });

  it("mantem a linguagem aprovada e evita termos rejeitados no conteudo visivel", () => {
    render(<HowToParticipatePage />);

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    for (const heading of [
      "Interesse vira construção.",
      "Ritmo sustenta evolução.",
      "Registro cria continuidade.",
      "Contexto define onde começar.",
    ]) {
      expect(
        main.getByRole("heading", { level: 3, name: heading }),
      ).toBeInTheDocument();
    }

    expect(
      main.getByText(
        "SYNC representa o ponto em que curiosidade, entrega e necessidade do projeto passam a trabalhar na mesma direção.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText("memória compartilhada", { exact: false }),
    ).toBeInTheDocument();
    expect(main.queryByText(/filosofia/i)).not.toBeInTheDocument();
    expect(main.queryByText(/\bfrente\b/i)).not.toBeInTheDocument();
    expect(
      main.queryByText(/sem promessa|sem formulário|sem vaga/i),
    ).not.toBeInTheDocument();
  });

  it("renderiza os objetos visuais como decorativos e preserva as teclas SYNC", () => {
    render(<HowToParticipatePage />);

    expect(
      document.querySelector("[data-component='nite-hero-symbol']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-component='process-object-visual']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[data-component='sync-key-stage']"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByRole("list", { name: "Etapas de aproximação ao projeto" }),
    ).toBeInTheDocument();

    const keys = Array.from(document.querySelectorAll("[data-sync-key]")).map(
      (element) => element.textContent,
    );

    expect(keys).toEqual(["S", "Y", "N", "C"]);
  });

  it("declara metadata e breadcrumb da rota dedicada", () => {
    render(<HowToParticipatePage />);

    expect(metadata.title).toBe("Como participar | Oportunidades | NITE");
    expect(metadata.description).toBe(
      "Entenda como estudantes se aproximam do núcleo de desenvolvimento do NITE, ganham repertório e passam a atuar em projetos com ritmo e responsabilidade.",
    );
    expect(metadata.alternates?.canonical?.toString()).toContain(
      "/oportunidades/como-participar",
    );

    const structuredData = document.querySelector(
      "#structured-data-opportunities-how-to-participate-breadcrumb",
    );

    expect(structuredData).toBeInTheDocument();
    expect(structuredData?.textContent).toContain('"Oportunidades"');
    expect(structuredData?.textContent).toContain('"Como participar"');
    expect(structuredData?.textContent).toContain(
      "/oportunidades/como-participar",
    );
  });
});
