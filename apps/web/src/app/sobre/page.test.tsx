import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import AboutPage, { metadata } from "@/app/sobre/page";

afterEach(() => {
  cleanup();
});

describe("AboutPage", () => {
  it("renderiza uma página institucional própria para conhecer o NITE", () => {
    render(<AboutPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "NITE é a interface entre aprendizagem, tecnologia e aplicação pública.",
      }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(main.getByText("Sobre o NITE")).toBeInTheDocument();
    expect(
      main.getByText(
        "O Núcleo de Inovação, Tecnologia e Experiência da UNIJORGE organiza demandas acadêmicas, projetos aplicados e oportunidades de participação com contexto público e transparência sobre o que ainda está em evolução.",
      ),
    ).toBeInTheDocument();
    expect(main.getByText("Por que existe")).toBeInTheDocument();
    expect(main.getByText("Como atua")).toBeInTheDocument();
    expect(main.getByText("O que está público hoje")).toBeInTheDocument();
    expect(main.getByText("Limites honestos")).toBeInTheDocument();
    expect(
      main.getByText(
        "A home apresenta a porta de entrada. Esta página explica o núcleo sem disputar a função dos projetos.",
      ),
    ).toBeInTheDocument();
  });

  it("oferece caminhos públicos reais sem prometer operação inexistente", () => {
    render(<AboutPage />);

    const main = within(screen.getByRole("main"));

    for (const [name, href] of [
      ["Explorar projetos", "/projetos"],
      ["Ver oportunidades", "/oportunidades"],
      ["Ler atualizações", "/atualizacoes"],
      ["Conhecer pessoas", "/pessoas"],
      ["Falar com o NITE", "/contato"],
    ] as const) {
      expect(main.getByRole("link", { name })).toHaveAttribute("href", href);
    }

    for (const forbidden of [
      "vagas abertas",
      "inscrição garantida",
      "resposta automática",
      "cases validados",
      "depoimentos",
      "clientes",
      "100%",
      "mil alunos",
      "resultados comprovados",
      "projetos concluídos",
    ]) {
      expect(
        screen.queryByText(forbidden, { exact: false }),
      ).not.toBeInTheDocument();
    }
  });

  it("declara metadata institucional da página Sobre", () => {
    expect(metadata.title).toBe("Sobre | NITE");
    expect(metadata.description).toBe(
      "Entenda o papel institucional do NITE UNIJORGE, seus caminhos públicos e os limites honestos do portal.",
    );
    expect(metadata.alternates?.canonical?.toString()).toContain("/sobre");
  });
});
