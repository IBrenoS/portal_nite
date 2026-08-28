import { describe, expect, it } from "vitest";

import {
  createRevalidationSignature,
  newsRevalidationPayloadSchema,
  verifyRevalidationSignature,
} from "./revalidation";

const payload = {
  eventId: "40000000-0000-4000-8000-000000000001",
  topic: "news.article.published" as const,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  slug: "materia-publicada",
};

describe("protocolo de revalidacao", () => {
  it("autentica o corpo exato dentro da janela permitida", () => {
    const body = JSON.stringify(payload);
    const timestamp = "1787860800";
    const signature = createRevalidationSignature({
      body,
      timestamp,
      secret: "segredo-de-revalidacao-com-32-caracteres",
    });

    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature,
        secret: "segredo-de-revalidacao-com-32-caracteres",
        now: new Date("2026-08-27T20:00:30.000Z"),
      }),
    ).toBe(true);
    expect(newsRevalidationPayloadSchema.parse(JSON.parse(body))).toEqual(
      payload,
    );
  });

  it("rejeita corpo alterado, assinatura invalida e timestamp expirado", () => {
    const body = JSON.stringify(payload);
    const timestamp = "1787860800";
    const secret = "segredo-de-revalidacao-com-32-caracteres";
    const signature = createRevalidationSignature({
      body,
      timestamp,
      secret,
    });

    expect(
      verifyRevalidationSignature({
        body: body.replace("materia-publicada", "outra-materia"),
        timestamp,
        signature,
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
      }),
    ).toBe(false);
    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature: `${signature.slice(0, -1)}0`,
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
      }),
    ).toBe(false);
    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature,
        secret,
        now: new Date("2026-08-27T20:10:01.000Z"),
      }),
    ).toBe(false);
  });
});
