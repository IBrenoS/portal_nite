import { createHmac } from "node:crypto";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => ({ revalidatePath: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: controls.revalidatePath }));

import { POST } from "./route";

const secret = "test-secret-0000000000000000000000";
const timestamp = "1789172400";
const payload = {
  eventId: "40000000-0000-4000-8000-000000000001",
  topic: "news.article.published",
  articleId: "10000000-0000-4000-8000-000000000001",
  revisionId: "20000000-0000-4000-8000-000000000001",
  slug: "materia-publicada",
  category: "inovacao",
};

function signedRequest(input: unknown = payload, signatureOverride?: string) {
  const body = JSON.stringify(input);
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");

  return new Request("https://portal.nite.test/api/revalidate/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-NITE-Timestamp": timestamp,
      "X-NITE-Signature": signatureOverride ?? signature,
    },
    body,
  });
}

describe("POST /api/revalidate/news", () => {
  beforeEach(() => {
    vi.stubEnv("REVALIDATION_SECRET", secret);
    vi.setSystemTime(new Date(Number(timestamp) * 1_000));
    controls.revalidatePath.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("autentica o evento e invalida lista, matéria e sitemap", async () => {
    const response = await POST(signedRequest());

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(controls.revalidatePath.mock.calls).toEqual([
      ["/atualizacoes"],
      ["/atualizacoes/materia-publicada"],
      ["/sitemap.xml"],
    ]);
  });

  it("rejeita assinatura inválida sem invalidar conteúdo", async () => {
    const response = await POST(signedRequest(payload, "0".repeat(64)));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "Não autorizado." });
    expect(controls.revalidatePath).not.toHaveBeenCalled();
  });

  it("rejeita payload autenticado incompatível sem invalidar conteúdo", async () => {
    const response = await POST(
      signedRequest({ ...payload, topic: "news.article.deleted" }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Evento inválido." });
    expect(controls.revalidatePath).not.toHaveBeenCalled();
  });

  it("retorna indisponível quando o secret não está configurado", async () => {
    vi.stubEnv("REVALIDATION_SECRET", "");

    const response = await POST(signedRequest());

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "Revalidação indisponível.",
    });
    expect(controls.revalidatePath).not.toHaveBeenCalled();
  });
});
