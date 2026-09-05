import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { syncPublicAssets } from "./sync-public-assets.mjs";

test("copia a árvore pública canônica e remove resíduos do destino", async () => {
  const root = join(tmpdir(), `nite-public-assets-${crypto.randomUUID()}`);
  const source = join(root, "source");
  const destination = join(root, "destination");
  await mkdir(join(source, "brand"), { recursive: true });
  await mkdir(destination, { recursive: true });
  await writeFile(join(source, "brand", "logo.svg"), "canonical", "utf8");
  await writeFile(join(destination, "stale.txt"), "stale", "utf8");

  await syncPublicAssets(source, destination);

  assert.equal(
    await readFile(join(destination, "brand", "logo.svg"), "utf8"),
    "canonical",
  );
  await assert.rejects(readFile(join(destination, "stale.txt"), "utf8"));
});
