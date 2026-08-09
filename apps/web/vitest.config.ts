import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDirectory, "src"),
    },
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    fileParallelism: true,
    maxWorkers: 4,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "*.test.ts"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
