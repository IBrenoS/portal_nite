import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { PREVIEW_COOKIE_NAME } from "~/lib/news-preview";

function internalReturnPath(requestUrl: URL, value: string | null) {
  let decodedValue: string;
  try {
    decodedValue = value ? decodeURIComponent(value) : "";
  } catch {
    return "/atualizacoes";
  }
  if (
    !value ||
    !value.startsWith("/") ||
    value.includes("\\") ||
    decodedValue.includes("\\")
  ) {
    return "/atualizacoes";
  }
  try {
    const destination = new URL(value, requestUrl);
    if (destination.origin !== requestUrl.origin) return "/atualizacoes";
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return "/atualizacoes";
  }
}

export async function POST(request: Request) {
  const draft = await draftMode();
  draft.disable();
  const url = new URL(request.url);
  const response = NextResponse.redirect(
    new URL(internalReturnPath(url, url.searchParams.get("returnTo")), url),
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
