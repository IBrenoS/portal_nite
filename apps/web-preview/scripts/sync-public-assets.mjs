import { cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export async function syncPublicAssets(source, destination) {
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await syncPublicAssets(
    fileURLToPath(new URL("../../web/public/", import.meta.url)),
    fileURLToPath(new URL("../public/", import.meta.url)),
  );
}
