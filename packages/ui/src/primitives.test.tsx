import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  NewsArticleBody,
  StatusBadge,
  Textarea,
} from "./index";

afterEach(cleanup);

describe("@nite/ui", () => {
  it("preserva semantica e estado pendente das acoes", () => {
    render(
      <>
        <Button loading>Salvar</Button>
        <Card>
          <CardHeader>
            <CardTitle>Materia</CardTitle>
          </CardHeader>
          <CardContent>Conteudo</CardContent>
        </Card>
      </>,
    );

    expect(screen.getByRole("button", { name: "Salvar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Salvar" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(
      screen.getByText("Materia").closest("[data-slot='card']"),
    ).not.toHaveAttribute("tabindex");
  });

  it("expoe campos e status por semantica acessivel", () => {
    render(
      <>
        <Input aria-label="Titulo" />
        <Textarea aria-label="Resumo" />
        <StatusBadge status="draft" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Titulo" })).toHaveAttribute(
      "data-slot",
      "input",
    );
    expect(screen.getByRole("textbox", { name: "Resumo" })).toHaveAttribute(
      "data-slot",
      "textarea",
    );
    expect(screen.getByText("Em estruturação")).toBeVisible();
  });

  it("renderiza o documento editorial rico com semântica e links seguros", () => {
    render(
      <NewsArticleBody
        document={{
          schemaVersion: 1,
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Um parágrafo editorial com ",
                },
                { type: "text", text: "ênfase", marks: [{ type: "bold" }] },
                {
                  type: "text",
                  text: " e um link seguro.",
                  marks: [
                    {
                      type: "link",
                      attrs: { href: "https://nite.tec.br/atualizacoes" },
                    },
                  ],
                },
              ],
            },
            {
              type: "heading",
              attrs: { level: 2 },
              content: [{ type: "text", text: "Contexto acadêmico" }],
            },
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Uma citação editorial estruturada e acessível.",
                      marks: [{ type: "italic" }],
                    },
                  ],
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Item principal" }],
                    },
                    {
                      type: "orderedList",
                      content: [
                        {
                          type: "listItem",
                          content: [
                            {
                              type: "paragraph",
                              content: [
                                { type: "text", text: "Item aninhado" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "image",
              attrs: {
                mediaId: "30000000-0000-4000-8000-000000000001",
                src: "https://images.nite.test/editorial.webp",
                width: 1200,
                height: 800,
                alt: "Estudantes conversam diante de uma instalação tecnológica.",
              },
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Contexto acadêmico" }),
    ).toBeVisible();
    expect(screen.getByRole("blockquote")).toBeVisible();
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(screen.getByRole("img")).toHaveAttribute("width", "1200");
    expect(
      screen.getByRole("link", { name: "e um link seguro." }),
    ).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText(/Estudantes conversam diante/)).toBeNull();
  });

  it("separa alt, legenda e crédito e aplica a largura editorial da imagem", () => {
    render(
      <NewsArticleBody
        document={{
          schemaVersion: 2,
          type: "doc",
          content: [
            {
              type: "image",
              attrs: {
                mediaId: "30000000-0000-4000-8000-000000000001",
                src: "https://images.nite.test/editorial.webp",
                width: 1600,
                height: 900,
                alt: "Estudantes acompanham uma apresentação no campus.",
                caption: "A atividade reuniu estudantes de diferentes cursos.",
                credit: "Foto: Redação NITE",
                layout: "full",
              },
            },
          ],
        }}
      />,
    );

    const image = screen.getByRole("img", {
      name: "Estudantes acompanham uma apresentação no campus.",
    });
    expect(image.closest("figure")).toHaveAttribute(
      "data-editorial-layout",
      "full",
    );
    expect(screen.getByText(/A atividade reuniu/)).toBeVisible();
    expect(screen.getByText(/Foto: Redação NITE/)).toBeVisible();
  });
});
