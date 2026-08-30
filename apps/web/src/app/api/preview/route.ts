import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import {
  createPreviewSession,
  readPreviewConfiguration,
  resolvePreviewArticle,
} from "@/lib/news-preview";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

function unavailable() {
  return Response.json(
    { error: "Prévia indisponível." },
    { status: 401, headers: privateHeaders },
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const configuration = readPreviewConfiguration(process.env);
  if (!token || !configuration.configured) return unavailable();

  try {
    const article = await resolvePreviewArticle({
      token,
      endpointUrl: configuration.endpointUrl,
    });
    // O Admin já autenticou o token antes que os claims locais sejam lidos.
    const session = createPreviewSession({ token, article });
    if (!session) return unavailable();

    const draft = await draftMode();
    draft.enable();
    const response = NextResponse.redirect(
      new URL(`/atualizacoes/${session.slug}`, request.url),
    );
    response.headers.set("Cache-Control", privateHeaders["Cache-Control"]);
    response.headers.set("Referrer-Policy", privateHeaders["Referrer-Policy"]);
    response.cookies.set("nite-news-preview", session.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: session.maxAge,
    });
    return response;
  } catch {
    return unavailable();
  }
}
