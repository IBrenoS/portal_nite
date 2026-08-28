import { describe, expect, it } from "vitest";

import { createRevalidationSignature } from "@nite/news/revalidation";
import { handleNewsRevalidationRequest } from "./news-revalidation";

const secret = "test-secret-0000000000000000000000";
const payload = {
  eventId: "40000000-0000-4000-8000-000000000001",
  topic: "news.article.published" as const,
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  slug: "materia-publicada",
};

function createSignedRequest(body = JSON.stringify(payload)) {
  const timestamp = "1787860800";
  return new Request("https://nite.test/api/revalidate/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-NITE-Timestamp": timestamp,
      "X-NITE-Signature": createRevalidationSignature({
        body,
        timestamp,
        secret,
      }),
    },
    body,
  });
}

describe("endpoint de revalidação do News", () => {
  it("invalida somente um evento assinado e validado", async () => {
    const invalidated: string[] = [];
    const response = await handleNewsRevalidationRequest(
      createSignedRequest(),
      {
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
        async invalidate(event) {
          invalidated.push(event.slug);
        },
      },
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(invalidated).toEqual(["materia-publicada"]);
  });

  it("rejeita assinatura alterada, payload inválido e corpo excessivo", async () => {
    const signed = createSignedRequest();
    const altered = new Request(signed, {
      body: JSON.stringify({ ...payload, slug: "outra-materia" }),
    });
    await expect(
      handleNewsRevalidationRequest(altered, {
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
        async invalidate() {},
      }),
    ).resolves.toMatchObject({ status: 401 });

    await expect(
      handleNewsRevalidationRequest(createSignedRequest("{}"), {
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
        async invalidate() {},
      }),
    ).resolves.toMatchObject({ status: 400 });

    const excessiveBody = JSON.stringify({
      ...payload,
      padding: "x".repeat(5_000),
    });
    await expect(
      handleNewsRevalidationRequest(createSignedRequest(excessiveBody), {
        secret,
        now: new Date("2026-08-27T20:00:30.000Z"),
        async invalidate() {},
      }),
    ).resolves.toMatchObject({ status: 413 });
  });
});
