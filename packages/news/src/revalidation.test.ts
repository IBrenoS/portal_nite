import { describe, expect, it } from "vitest";

import {
  createRevalidationSignature,
  newsRevalidationPayloadSchema,
  verifyRevalidationSignature,
} from "./revalidation";

const testSecret = "test-secret-0000000000000000000000";
const timestamp = "1787860800";
const payload = {
  eventId: "40000000-0000-4000-8000-000000000001",
  topic: "news.article.published" as const,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  slug: "materia-publicada",
  category: "inovacao" as const,
};

function atTimestamp(offsetSeconds = 0) {
  return new Date((Number(timestamp) + offsetSeconds) * 1_000);
}

describe("revalidação do News", () => {
  it.each([
    "news.article.published",
    "news.article.unpublished",
    "news.article.archived",
  ] as const)("aceita o evento atual %s", (topic) => {
    expect(newsRevalidationPayloadSchema.parse({ ...payload, topic })).toEqual({
      ...payload,
      topic,
    });
  });

  it("assina e valida o payload versionado", () => {
    const body = JSON.stringify(payload);
    const signature = createRevalidationSignature({
      body,
      timestamp,
      secret: testSecret,
    });

    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature,
        secret: testSecret,
        now: atTimestamp(),
      }),
    ).toBe(true);
    expect(newsRevalidationPayloadSchema.parse(JSON.parse(body))).toEqual(
      payload,
    );
  });

  it("rejeita corpo, assinatura e timestamp alterados", () => {
    const body = JSON.stringify(payload);
    const signature = createRevalidationSignature({
      body,
      timestamp,
      secret: testSecret,
    });

    expect(
      verifyRevalidationSignature({
        body: body.replace("materia-publicada", "outra-materia"),
        timestamp,
        signature,
        secret: testSecret,
        now: atTimestamp(),
      }),
    ).toBe(false);
    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature: `${signature.slice(0, -1)}0`,
        secret: testSecret,
        now: atTimestamp(),
      }),
    ).toBe(false);
    expect(
      verifyRevalidationSignature({
        body,
        timestamp,
        signature,
        secret: testSecret,
        now: atTimestamp(301),
      }),
    ).toBe(false);
  });
});
