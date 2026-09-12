import { revalidatePath } from "next/cache";

import {
  newsRevalidationPayloadSchema,
  verifyRevalidationSignature,
} from "@nite/news/revalidation";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

function errorResponse(message: string, status: 400 | 401 | 503) {
  return Response.json({ error: message }, { status, headers: privateHeaders });
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret || secret.length < 32) {
    return errorResponse("Revalidação indisponível.", 503);
  }

  const body = await request.text();
  const timestamp = request.headers.get("x-nite-timestamp") ?? "";
  const signature = request.headers.get("x-nite-signature") ?? "";
  if (!verifyRevalidationSignature({ body, timestamp, signature, secret })) {
    return errorResponse("Não autorizado.", 401);
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    return errorResponse("Evento inválido.", 400);
  }

  const payload = newsRevalidationPayloadSchema.safeParse(parsedBody);
  if (!payload.success) {
    return errorResponse("Evento inválido.", 400);
  }

  revalidatePath("/atualizacoes");
  revalidatePath(`/atualizacoes/${payload.data.slug}`);
  revalidatePath("/sitemap.xml");

  return new Response(null, { status: 204, headers: privateHeaders });
}
