import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";

afterEach(cleanup);

describe("UI primitives", () => {
  it("preserva semântica e estados de Button e Card", () => {
    render(
      <>
        <Button>Continuar</Button>
        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
          </CardHeader>
          <CardContent>Conteúdo</CardContent>
        </Card>
      </>,
    );

    expect(screen.getByRole("button", { name: "Continuar" })).toHaveClass(
      "focus-visible:ring-ring/50",
    );
    expect(
      screen.getByText("Registro").closest("[data-slot='card']"),
    ).not.toHaveAttribute("tabindex");
  });

  it("expõe campos rotulados e estilos canônicos", () => {
    render(
      <>
        <Input aria-label="Nome" />
        <Textarea aria-label="Mensagem" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Nome" })).toHaveAttribute(
      "data-slot",
      "input",
    );
    expect(screen.getByRole("textbox", { name: "Mensagem" })).toHaveAttribute(
      "data-slot",
      "textarea",
    );
  });

  it("mapeia status para labels visíveis e data attributes", () => {
    render(
      <>
        <StatusBadge status="draft" />
        <StatusBadge status="in_progress" />
        <StatusBadge status="done" />
      </>,
    );

    expect(
      screen.getByText("Em estruturação").closest("[data-slot='status-badge']"),
    ).toHaveAttribute("data-status", "draft");
    expect(
      screen.getByText("Em andamento").closest("[data-slot='status-badge']"),
    ).toHaveAttribute("data-status", "in_progress");
    expect(
      screen.getByText("Finalizado").closest("[data-slot='status-badge']"),
    ).toHaveAttribute("data-status", "done");
  });
});
