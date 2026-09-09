import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import {
  createPreviewSession,
  PREVIEW_COOKIE_NAME,
  readPreviewConfiguration,
  reportPreviewResolutionFailure,
  resolvePreviewArticle,
  PreviewResolutionError,
} from "~/lib/news-preview";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

function unavailable() {
  return new Response("Prévia indisponível.", {
    status: 401,
    headers: privateHeaders,
  });
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
    const session = createPreviewSession({ token, article });
    if (!session) {
      reportPreviewResolutionFailure(
        new PreviewResolutionError("invalid_session"),
      );
      return unavailable();
    }

    const draft = await draftMode();
    draft.enable();
    const response = NextResponse.redirect(
      new URL("/atualizacoes", request.url),
    );
    response.headers.set("Cache-Control", privateHeaders["Cache-Control"]);
    response.headers.set("Referrer-Policy", privateHeaders["Referrer-Policy"]);
    response.cookies.set(PREVIEW_COOKIE_NAME, session.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: session.maxAge,
    });
    return response;
  } catch (error) {
    reportPreviewResolutionFailure(error);
    return unavailable();
  }
}
