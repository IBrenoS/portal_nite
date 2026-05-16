import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ContactPage, { metadata } from "@/app/contato/page";
import { siteConfig } from "@/biblioteca/site-config";

afterEach(() => {
  cleanup();
});

describe("ContactPage", () => {
  it("renderiza contato institucional sem formulario funcional", () => {
    render(<ContactPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fale com o NITE" }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(
      main.getByText(
        "Use esta página para encontrar caminhos institucionais de contato com o Núcleo.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Propostas de desafio, dúvidas sobre projetos e interesse em oportunidades podem ser direcionados por este canal.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Canais reais serão exibidos apenas quando estiverem validados.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText("Nenhum dado pessoal é solicitado nesta etapa.", {
        exact: false,
      }),
    ).toBeInTheDocument();

    expect(document.querySelector("form")).not.toBeInTheDocument();
    expect(document.querySelectorAll("input, textarea, select")).toHaveLength(
      0,
    );
    expect(
      screen.queryByRole("button", { name: /enviar/i }),
    ).not.toBeInTheDocument();
  });

  it("usa somente rotas reais e canais configurados", () => {
    render(<ContactPage />);

    const main = within(screen.getByRole("main"));

    for (const route of ["/projetos", "/oportunidades", "/atualizacoes"]) {
      expect(
        document.querySelector(`main a[href='${route}']`),
      ).toBeInTheDocument();
    }

    for (const channel of siteConfig.publicChannels) {
      expect(
        main.getByRole("link", { name: channel.ariaLabel }),
      ).toHaveAttribute("href", channel.href);
    }

    for (const href of ["/noticias", "/sobre", "/contato?tipo=desafio"]) {
      expect(document.querySelector(`main a[href='${href}']`)).toBeNull();
    }

    expect(document.querySelector("main a[href^='mailto:']")).toBeNull();
  });

  it("declara metadata institucional de contato", () => {
    expect(metadata.title).toBe("Contato | NITE");
    expect(metadata.description).toContain("caminhos institucionais");
    expect(metadata.alternates?.canonical?.toString()).toContain("/contato");
  });
});
