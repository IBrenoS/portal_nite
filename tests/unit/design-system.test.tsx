import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";

describe("design system base", () => {
  it("renderiza componentes essenciais do M2", () => {
    render(
      <Container>
        <SectionHeader title="Componentes base" description="Descricao acessivel." />
        <ButtonPrimary>Acao primaria</ButtonPrimary>
        <ButtonSecondary>Acao secundaria</ButtonSecondary>
        <Chip>Token</Chip>
        <EmptyState title="Sem conteudo" description="Conteudo ainda nao cadastrado." />
      </Container>,
    );

    expect(screen.getByRole("heading", { level: 2, name: "Componentes base" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acao primaria" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acao secundaria" })).toBeInTheDocument();
    expect(screen.getByText("Token")).toBeInTheDocument();
    expect(screen.getByText("Sem conteudo")).toBeInTheDocument();
  });
});
