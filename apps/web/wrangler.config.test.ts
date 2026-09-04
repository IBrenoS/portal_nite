import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

describe("wrangler configuration", () => {
  it("preserves runtime variables managed by the Cloudflare dashboard", () => {
    const configuration = readFileSync(
      resolve(process.cwd(), "wrangler.jsonc"),
      "utf8",
    );

    expect(configuration).toMatch(/"keep_vars"\s*:\s*true/);
  });

  it("publishes only the apex nite.tec.br as a custom domain", () => {
    const configuration = readFileSync(
      resolve(process.cwd(), "wrangler.jsonc"),
      "utf8",
    );

    expect(configuration).toMatch(
      /"routes"\s*:\s*\[\s*\{\s*"pattern"\s*:\s*"nite\.tec\.br"\s*,\s*"custom_domain"\s*:\s*true\s*\}\s*\]/,
    );
    expect(configuration).not.toContain("www.nite.tec.br");
  });
});
