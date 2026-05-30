import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ContactPage, { metadata } from "@/app/contato/page";

const contactEmail = "unijorge.nite@gmail.com";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ContactPage", () => {
  it("renderiza o fluxo direto de contato inspirado na Resend", () => {
    render(<ContactPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fale com o NITE" }),
    ).toBeInTheDocument();

    const mainElement = screen.getByRole("main");
    const main = within(mainElement);

    expect(mainElement).toHaveClass(
      "bg-nite-background",
      "text-nite-text-primary",
    );
    expect(main.getByLabelText("E-mail")).toHaveAttribute("type", "email");
    expect(main.getByLabelText("E-mail")).toHaveAttribute("data-slot", "input");
    expect(main.getByLabelText("E-mail")).toHaveClass("nite-form-field");
    expect(main.getByLabelText("Como podemos ajudar?")).toHaveAttribute(
      "name",
      "message",
    );
    expect(main.getByLabelText("Como podemos ajudar?")).toHaveAttribute(
      "data-slot",
      "textarea",
    );
    expect(main.getByLabelText("Como podemos ajudar?")).toHaveClass(
      "nite-form-field",
    );
    const submitButton = main.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute("data-slot", "button");
    expect(submitButton).toHaveClass("nite-glass-action");
    expect(submitButton.querySelector("svg")).toHaveClass(
      "lucide-chevron-right",
    );
    expect(main.getByText("Get help")).toBeInTheDocument();
    expect(main.getByText(contactEmail)).toBeInTheDocument();
    expect(
      main.getByRole("button", { name: "Copy to clipboard" }),
    ).toBeInTheDocument();

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

  it("copia o e-mail institucional pelo atalho lateral", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: {
        writeText,
      },
    });

    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: "Copy to clipboard" }));

    expect(writeText).toHaveBeenCalledWith(contactEmail);
    expect(screen.getByText("E-mail copiado.")).toBeInTheDocument();
  });

  it("revela o atalho de cópia ao interagir com o e-mail", async () => {
    const user = userEvent.setup();

    render(<ContactPage />);

    const emailText = screen.getByText(contactEmail);
    const copyButton = screen.getByRole("button", {
      name: "Copy to clipboard",
    });

    expect(copyButton).toHaveClass("sm:opacity-0");
    expect(copyButton).not.toHaveClass("sm:opacity-100");

    await user.hover(emailText);

    expect(copyButton).not.toHaveClass("sm:opacity-0");
    expect(copyButton).toHaveClass("sm:opacity-100");
  });

  it("declara metadata institucional de contato", () => {
    expect(metadata.title).toBe("Contato | NITE");
    expect(metadata.description).toContain("fluxo simples de contato");
    expect(metadata.alternates?.canonical?.toString()).toContain("/contato");
  });
});
