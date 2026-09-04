import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals.map((config) => ({
    ...config,
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
  })),
  ...nextTs,
  {
    files: ["apps/**/*.{js,jsx,ts,tsx}", "packages/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@nite/content/*/*", "@nite/news/*/*"],
              message:
                "Use somente as entradas oficiais dos packages do Portal.",
            },
            {
              group: [
                "apps/*",
                "apps/**",
                "packages/*",
                "packages/**",
                "../apps/**",
                "../../apps/**",
                "../packages/**",
                "../../packages/**",
              ],
              message: "Não importe arquivos físicos entre workspaces.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@nite/cms-*",
                "@nite/editorial",
                "@nite/cms-db",
                "@nite/content/admin",
              ],
              message: "O Portal não pode importar código proprietário do CMS.",
            },
            {
              group: ["@nite/content/*/*", "@nite/news/*/*"],
              message:
                "Use somente as entradas oficiais dos packages do Portal.",
            },
            {
              group: [
                "apps/*",
                "apps/**",
                "packages/*",
                "packages/**",
                "../apps/**",
                "../../apps/**",
                "../packages/**",
                "../../packages/**",
              ],
              message: "Não importe arquivos físicos entre workspaces.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "**/.next/**",
    "**/.open-next/**",
    "**/.wrangler/**",
    "out/**",
    "**/build/**",
    "**/next-env.d.ts",
    "**/coverage/**",
    "**/playwright-report/**",
    "**/test-results/**",
    ".codex_artifacts/**",
    ".codex-artifacts/**",
    "output/**",
    "cms/**",
  ]),
]);

export default eslintConfig;
