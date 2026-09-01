import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("./setup-local-env.mjs", import.meta.url),
);

function parseEnvironment(path) {
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/u)
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );
}

test("cria ambientes locais com secrets fortes, compartilhados e idempotentes", () => {
  const root = mkdtempSync(join(tmpdir(), "nite-env-"));
  const firstRun = spawnSync(process.execPath, [scriptPath, "--root", root], {
    encoding: "utf8",
  });

  assert.equal(firstRun.status, 0, firstRun.stderr);
  assert.equal(firstRun.stdout.includes("="), false);

  const portalPath = join(root, "apps", "web", ".env.local");
  const adminPath = join(root, "cms", "apps", "admin", ".env.local");
  const apiPath = join(root, "cms", "apps", "api", ".env.local");
  const migrationPath = join(root, "cms", "packages", "db", ".env.local");
  const postgresTestPath = join(
    root,
    "cms",
    "packages",
    "editorial",
    ".env.postgres.local",
  );
  const postgresServicePath = join(root, "cms", ".env.postgres-test.local");
  const adminE2ePath = join(root, "cms", "apps", "admin", ".env.e2e.local");

  const portal = parseEnvironment(portalPath);
  const admin = parseEnvironment(adminPath);
  const api = parseEnvironment(apiPath);
  const migration = parseEnvironment(migrationPath);
  assert.equal(existsSync(postgresTestPath), true);
  const postgresTest = parseEnvironment(postgresTestPath);
  assert.equal(existsSync(postgresServicePath), true);
  const postgresService = parseEnvironment(postgresServicePath);
  const adminE2e = parseEnvironment(adminE2ePath);

  assert.match(admin.BETTER_AUTH_SECRET, /^[A-Za-z0-9_-]{64}$/u);
  assert.match(admin.PREVIEW_HMAC_SECRET, /^[A-Za-z0-9_-]{64}$/u);
  assert.match(admin.CRON_SECRET, /^[A-Za-z0-9_-]{64}$/u);
  assert.match(admin.REVALIDATION_SECRET, /^[A-Za-z0-9_-]{64}$/u);
  assert.equal(portal.REVALIDATION_SECRET, admin.REVALIDATION_SECRET);
  assert.equal(portal.NITE_NEWS_SOURCE, "static");
  assert.equal(admin.BETTER_AUTH_URL, "http://localhost:3001");
  assert.equal(
    admin.WEB_REVALIDATION_URL,
    "http://localhost:3000/api/revalidate/news",
  );
  assert.equal(api.DATABASE_PUBLIC_URL, "");
  assert.equal(migration.DATABASE_MIGRATION_URL, "");
  const postgresTestUrl = new URL(postgresTest.CMS_TEST_DATABASE_URL);
  assert.equal(postgresTestUrl.hostname, "127.0.0.1");
  assert.equal(postgresTestUrl.port, "55432");
  assert.equal(postgresTestUrl.pathname, "/nite_cms_test");
  assert.match(postgresService.POSTGRES_PASSWORD, /^[A-Za-z0-9_-]{64}$/u);
  assert.equal(postgresTestUrl.password, postgresService.POSTGRES_PASSWORD);
  assert.equal(postgresTest.CMS_TEST_ALLOW_DATABASE_RESET, "1");
  assert.equal(adminE2e.ADMIN_E2E_BASE_URL, "");

  writeFileSync(
    apiPath,
    readFileSync(apiPath, "utf8").replace(
      "DATABASE_PUBLIC_URL=",
      "DATABASE_PUBLIC_URL=postgresql://external.example/nite",
    ),
  );
  const adminBefore = readFileSync(adminPath, "utf8");
  const portalBefore = readFileSync(portalPath, "utf8");

  execFileSync(process.execPath, [scriptPath, "--root", root]);

  assert.equal(readFileSync(adminPath, "utf8"), adminBefore);
  assert.equal(readFileSync(portalPath, "utf8"), portalBefore);
  assert.match(
    readFileSync(apiPath, "utf8"),
    /DATABASE_PUBLIC_URL=postgresql:\/\/external\.example\/nite/u,
  );
});
