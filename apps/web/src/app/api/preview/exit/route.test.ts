import { beforeEach, describe, expect, it, vi } from "vitest";

const controls = vi.hoisted(() => ({ disable: vi.fn() }));

vi.mock("next/headers", () => ({
  draftMode: async () => ({ disable: controls.disable }),
}));

import { POST } from "./route";

describe("POST /api/preview/exit", () => {
  beforeEach(() => controls.disable.mockReset());

  it("desabilita Draft Mode, remove a sessão e aceita apenas retorno interno", async () => {
    const response = await POST(
      new Request(
        "https://nite.test/api/preview/exit?returnTo=https://externo.test",
        { method: "POST" },
      ),
    );

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe(
      "https://nite.test/atualizacoes",
    );
    expect(response.headers.get("set-cookie")).toContain("nite-news-preview=;");
    expect(controls.disable).toHaveBeenCalledTimes(1);
  });

  it.each(["/%5Cevil.test/path", "//evil.test/path"])(
    "rejeita retorno externo disfarçado: %s",
    async (returnTo) => {
      const response = await POST(
        new Request(`https://nite.test/api/preview/exit?returnTo=${returnTo}`, {
          method: "POST",
        }),
      );

      expect(response.headers.get("location")).toBe(
        "https://nite.test/atualizacoes",
      );
    },
  );
});
