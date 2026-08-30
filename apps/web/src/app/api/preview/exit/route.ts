import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { PREVIEW_COOKIE_NAME } from "@/lib/news-preview";

function internalReturnPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/atualizacoes";
  }
  return value;
}

export async function POST(request: Request) {
  const draft = await draftMode();
  draft.disable();
  const url = new URL(request.url);
  const response = NextResponse.redirect(
    new URL(internalReturnPath(url.searchParams.get("returnTo")), url),
    { status: 303 },
  );
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.cookies.set(PREVIEW_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
