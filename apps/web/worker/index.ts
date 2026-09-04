const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

const legacyRedirects = {
  "/projetos/software-aplicado": "/projetos/data-center",
  "/projetos/software-aplicado-demonstrativo": "/projetos/data-center",
  "/projetos/robotica-educacional": "/projetos/jogos-embarcados",
  "/projetos/robotica-educacional-demonstrativo": "/projetos/jogos-embarcados",
  "/projetos/dados-ia-demonstrativo": "/projetos/dados-e-ia",
} as const;

function methodNotAllowed(allow: string) {
  return new Response(null, {
    status: 405,
    headers: { Allow: allow },
  });
}

function unavailable(message: string, status: 401 | 503) {
  return Response.json({ error: message }, { status, headers: privateHeaders });
}

function isReadMethod(method: string) {
  return method === "GET" || method === "HEAD";
}

const worker = {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const redirect =
      legacyRedirects[url.pathname as keyof typeof legacyRedirects];

    if (redirect) {
      if (!isReadMethod(request.method)) return methodNotAllowed("GET, HEAD");
      return Response.redirect(new URL(redirect, url), 308);
    }

    if (url.pathname === "/api/preview") {
      if (!isReadMethod(request.method)) return methodNotAllowed("GET, HEAD");
      return unavailable("Prévia indisponível.", 401);
    }

    if (url.pathname === "/api/preview/exit") {
      if (request.method !== "POST") return methodNotAllowed("POST");
      return new Response(null, {
        status: 303,
        headers: {
          ...privateHeaders,
          Location: new URL("/atualizacoes", url).toString(),
          "Set-Cookie":
            "nite-news-preview=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
        },
      });
    }

    if (url.pathname === "/api/revalidate/news") {
      if (request.method !== "POST") return methodNotAllowed("POST");
      return unavailable("Revalidação não configurada.", 503);
    }

    return new Response(null, { status: 404 });
  },
};

export default worker;
export { legacyRedirects };
