import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("redirecionamentos de Jogos Embarcados", () => {
  it("redireciona permanentemente as URLs anteriores", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/projetos/robotica-educacional",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
        {
          source: "/projetos/robotica-educacional-demonstrativo",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
      ]),
    );
  });
});
