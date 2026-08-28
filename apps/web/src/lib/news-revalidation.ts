import type { NewsRevalidationPayload } from "@nite/content/revalidation";
import {
  newsRevalidationPayloadSchema,
  verifyRevalidationSignature,
} from "@nite/content/revalidation";

const maximumBodyBytes = 4_096;

function response(status: number, body?: { error: string }) {
  return body
    ? Response.json(body, {
        status,
        headers: { "Cache-Control": "private, no-store" },
      })
    : new Response(null, {
        status,
        headers: { "Cache-Control": "private, no-store" },
      });
}

export async function handleNewsRevalidationRequest(
  request: Request,
  input: {
    secret: string;
    now?: Date;
    invalidate(payload: NewsRevalidationPayload): Promise<void>;
  },
) {
  const contentType = request.headers.get("content-type");
  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return response(415, { error: "Tipo de conteúdo não suportado." });
  }
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) {
    return response(413, { error: "Corpo excede o limite permitido." });
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > maximumBodyBytes) {
    return response(413, { error: "Corpo excede o limite permitido." });
  }
  if (
    !verifyRevalidationSignature({
      body,
      timestamp: request.headers.get("x-nite-timestamp") ?? "",
      signature: request.headers.get("x-nite-signature") ?? "",
      secret: input.secret,
      now: input.now,
    })
  ) {
    return response(401, { error: "Assinatura inválida." });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    return response(400, { error: "Payload inválido." });
  }
  const payload = newsRevalidationPayloadSchema.safeParse(parsedBody);
  if (!payload.success) {
    return response(400, { error: "Payload inválido." });
  }

  try {
    await input.invalidate(payload.data);
    return response(204);
  } catch {
    return response(503, {
      error: "Revalidação temporariamente indisponível.",
    });
  }
}
