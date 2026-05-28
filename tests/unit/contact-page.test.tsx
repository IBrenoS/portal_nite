import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import ContactPage, { metadata } from "@/app/contato/page";

const contactEmail = "unijorge.nite@gmail.com";

afterEach(() => {
  cleanup();
});

describe("ContactPage", () => {
  it("renderiza o fluxo direto de contato inspirado na Resend", () => {
    render(<ContactPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fale com o NITE" }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(main.getByLabelText("E-mail")).toHaveAttribute("type", "email");
    expect(main.getByLabelText("Como podemos ajudar?")).toHaveAttribute(
      "name",
      "message",
    );
    expect(main.getByRole("button", { name: "Submit" })).toBeDisabled();
    expect(main.getByText("Get help")).toBeInTheDocument();
    expect(main.getByRole("link", { name: contactEmail })).toHaveAttribute(
      "href",
      `mailto:${contactEmail}`,
    );

    expect(document.querySelector("main a[href='/projetos']")).toBeNull();
    expect(document.querySelector("main a[href='/oportunidades']")).toBeNull();
    expect(document.querySelector("main a[href='/atualizacoes']")).toBeNull();
  });

  it("habilita Submit apenas depois dos dois campos preenchidos", async () => {
    const user = userEvent.setup();

    render(<ContactPage />);

    const emailInput = screen.getByLabelText("E-mail");
    const messageInput = screen.getByLabelText("Como podemos ajudar?");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();

    await user.type(emailInput, "aluna@example.com");

    expect(submitButton).toBeDisabled();

    await user.type(messageInput, "Quero falar com o NITE sobre um projeto.");

    expect(submitButton).toBeEnabled();
  });

  it("declara metadata institucional de contato", () => {
    expect(metadata.title).toBe("Contato | NITE");
    expect(metadata.description).toContain("fluxo simples de contato");
    expect(metadata.alternates?.canonical?.toString()).toContain("/contato");
  });
});
