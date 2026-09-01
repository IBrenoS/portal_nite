import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

const repositoryRoot = resolve(
  argumentValue("--root") ??
    join(dirname(fileURLToPath(import.meta.url)), ".."),
);

function readEnvironment(path) {
  if (!existsSync(path)) return new Map();
  const values = new Map();
  for (const line of readFileSync(path, "utf8").split(/\r?\n/u)) {
    const match = /^([A-Z][A-Z0-9_]*)=(.*)$/u.exec(line);
    if (match) values.set(match[1], match[2]);
  }
  return values;
}

function secret() {
  return randomBytes(48).toString("base64url");
}

function existingValue(path, name) {
  return readEnvironment(path).get(name)?.trim() ?? "";
}

function writeEnvironment(path, heading, sections) {
  mkdirSync(dirname(path), { recursive: true });
  if (!existsSync(path)) {
    const lines = [
      `# ${heading}`,
      "# Arquivo local ignorado pelo Git. Não versionar valores reais.",
      "",
    ];
    for (const section of sections) {
      lines.push(`# ${section.title}`);
      for (const [name, value] of section.entries) {
        lines.push(`${name}=${value}`);
      }
      lines.push("");
    }
    writeFileSync(path, `${lines.join("\n")}\n`);
    return;
  }

  let contents = readFileSync(path, "utf8");
  const current = readEnvironment(path);
  const additions = [];
  for (const section of sections) {
    for (const [name, desiredValue] of section.entries) {
      if (!current.has(name)) {
        additions.push(`${name}=${desiredValue}`);
        continue;
      }
      if (current.get(name) === "" && desiredValue !== "") {
        contents = contents.replace(
          new RegExp(`^${name}=$`, "mu"),
          `${name}=${desiredValue}`,
        );
      }
    }
  }
  if (additions.length > 0) {
    contents = `${contents.trimEnd()}\n\n# Variáveis adicionadas pelo setup\n${additions.join("\n")}\n`;
  }
  writeFileSync(path, contents);
}

const portalPath = join(repositoryRoot, "apps", "web", ".env.local");
const adminPath = join(repositoryRoot, "cms", "apps", "admin", ".env.local");
const apiPath = join(repositoryRoot, "cms", "apps", "api", ".env.local");
const migrationPath = join(
  repositoryRoot,
  "cms",
  "packages",
  "db",
  ".env.local",
);
const postgresTestPath = join(
  repositoryRoot,
  "cms",
  "packages",
  "editorial",
  ".env.postgres.local",
);
const postgresServicePath = join(
  repositoryRoot,
  "cms",
  ".env.postgres-test.local",
);
const adminE2ePath = join(
  repositoryRoot,
  "cms",
  "apps",
  "admin",
  ".env.e2e.local",
);

const portalRevalidation = existingValue(portalPath, "REVALIDATION_SECRET");
const adminRevalidation = existingValue(adminPath, "REVALIDATION_SECRET");
if (
  portalRevalidation &&
  adminRevalidation &&
  portalRevalidation !== adminRevalidation
) {
  throw new Error(
    "REVALIDATION_SECRET diverge entre Portal e CMS Admin; corrija manualmente antes de executar novamente.",
  );
}
const revalidationSecret = portalRevalidation || adminRevalidation || secret();
const postgresPassword =
  existingValue(postgresServicePath, "POSTGRES_PASSWORD") || secret();

writeEnvironment(portalPath, "Portal NITE", [
  {
    title: "Valores locais",
    entries: [
      ["NEXT_PUBLIC_SITE_URL", "http://localhost:3000"],
      ["NITE_NEWS_SOURCE", "static"],
    ],
  },
  {
    title: "Preencher com endpoints e mídia provisionados",
    entries: [
      ["CMS_PUBLIC_API_URL", ""],
      ["NITE_NEWS_MEDIA_URL", ""],
      ["CMS_PREVIEW_RESOLVE_URL", ""],
    ],
  },
  {
    title: "Secret interno compartilhado somente com o CMS Admin",
    entries: [["REVALIDATION_SECRET", revalidationSecret]],
  },
]);

writeEnvironment(adminPath, "CMS Admin", [
  {
    title: "PostgreSQL e Microsoft Entra",
    entries: [
      ["DATABASE_ADMIN_URL", ""],
      ["MICROSOFT_CLIENT_ID", ""],
      ["MICROSOFT_CLIENT_SECRET", ""],
      ["MICROSOFT_TENANT_ID", ""],
      ["CMS_BOOTSTRAP_ADMIN_OID", ""],
    ],
  },
  {
    title: "Better Auth",
    entries: [
      [
        "BETTER_AUTH_SECRET",
        existingValue(adminPath, "BETTER_AUTH_SECRET") || secret(),
      ],
      ["BETTER_AUTH_URL", "http://localhost:3001"],
    ],
  },
  {
    title: "Cloudflare R2",
    entries: [
      ["R2_ACCOUNT_ID", ""],
      ["R2_ACCESS_KEY_ID", ""],
      ["R2_SECRET_ACCESS_KEY", ""],
      ["R2_STAGING_BUCKET", ""],
      ["R2_PUBLIC_BUCKET", ""],
      ["R2_PUBLIC_BASE_URL", ""],
    ],
  },
  {
    title: "Preview, revalidação e cron",
    entries: [
      ["PORTAL_PREVIEW_URL", ""],
      [
        "PREVIEW_HMAC_SECRET",
        existingValue(adminPath, "PREVIEW_HMAC_SECRET") || secret(),
      ],
      ["WEB_REVALIDATION_URL", "http://localhost:3000/api/revalidate/news"],
      ["REVALIDATION_SECRET", revalidationSecret],
      ["CRON_SECRET", existingValue(adminPath, "CRON_SECRET") || secret()],
    ],
  },
]);

writeEnvironment(apiPath, "CMS API pública", [
  {
    title: "Preencher com recursos provisionados",
    entries: [
      ["DATABASE_PUBLIC_URL", ""],
      ["R2_PUBLIC_BASE_URL", ""],
    ],
  },
]);

writeEnvironment(migrationPath, "CMS migrations", [
  {
    title: "Credencial exclusiva com ownership e DDL",
    entries: [["DATABASE_MIGRATION_URL", ""]],
  },
]);

writeEnvironment(postgresTestPath, "Teste de integração PostgreSQL local", [
  {
    title: "Somente database local descartável com sufixo _test",
    entries: [
      [
        "CMS_TEST_DATABASE_URL",
        `postgresql://postgres:${postgresPassword}@127.0.0.1:55432/nite_cms_test`,
      ],
      ["CMS_TEST_ALLOW_DATABASE_RESET", "1"],
    ],
  },
]);

writeEnvironment(postgresServicePath, "PostgreSQL local descartável", [
  {
    title: "Consumido somente por compose.postgres-test.yml",
    entries: [["POSTGRES_PASSWORD", postgresPassword]],
  },
]);

writeEnvironment(adminE2ePath, "Playwright do CMS Admin", [
  {
    title: "Artefatos e identificadores do ambiente de homologação",
    entries: [
      ["ADMIN_E2E_BASE_URL", ""],
      ["ADMIN_E2E_ADMIN_STORAGE_STATE", ""],
      ["ADMIN_E2E_PUBLISHER_STORAGE_STATE", ""],
      ["ADMIN_E2E_ARTICLE_ID", ""],
    ],
  },
]);

console.log(
  "Ambientes locais preparados. Secrets internos foram gerados sem exibir seus valores.",
);
