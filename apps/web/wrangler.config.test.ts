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
});
