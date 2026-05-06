import { expect, test } from "@playwright/test";

test("fluxo principal home -> projeto -> retorno funciona", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Ver projeto: Software aplicado" }).click();

  await expect(page).toHaveURL(/\/projetos\/software-aplicado$/);
  await expect(page.getByRole("heading", { level: 1, name: "Software aplicado" })).toBeVisible();

  await page.getByRole("link", { name: /voltar para projetos/i }).click();

  await expect(page).toHaveURL(/\/#projetos$/);
  await expect(page.getByRole("heading", { name: "Projetos em destaque para explorar tecnologia em movimento." })).toBeVisible();
});

test("release candidate mantem animacao estavel em reload, idle e navegacao repetida", async ({ page }) => {
  const runtimeErrors: string[] = [];
  const trackRuntimeError = (message: string) => {
    if (message.includes("/_next/webpack-hmr") && message.includes("WebSocket connection")) {
      return;
    }

    runtimeErrors.push(message);
  };

  page.on("console", (message) => {
    if (message.type() === "error") {
      trackRuntimeError(message.text());
    }
  });
  page.on("pageerror", (error) => trackRuntimeError(error.message));

  await page.goto("/");
  await expect(page.locator(".animated-nite-logo")).toHaveCount(1);
  await expect(page.locator("#logo-final")).toBeVisible();

  await page.waitForTimeout(4300);
  const logoAfterIntro = await page.locator("#logo-final").boundingBox();
  await page.waitForTimeout(7000);
  const logoAfterIdle = await page.locator("#logo-final").boundingBox();

  expect(logoAfterIntro).not.toBeNull();
  expect(logoAfterIdle).not.toBeNull();
  expect(Math.abs(logoAfterIntro!.x - logoAfterIdle!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(logoAfterIntro!.y - logoAfterIdle!.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(logoAfterIntro!.width - logoAfterIdle!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(logoAfterIntro!.height - logoAfterIdle!.height)).toBeLessThanOrEqual(1);

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator(".animated-nite-logo")).toHaveCount(1);
  await expect(page.locator("#logo-final")).toBeVisible();

  const logoOutsidePanel = await page.locator("#logo-final").evaluate((logo) => !logo.closest(".brand-panel"));
  expect(logoOutsidePanel).toBe(true);

  for (let index = 0; index < 2; index += 1) {
    await page.getByRole("link", { name: "Ver projeto: Software aplicado" }).click();
    await expect(page).toHaveURL(/\/projetos\/software-aplicado$/);
    await expect(page.getByRole("heading", { level: 1, name: "Software aplicado" })).toBeVisible();

    await page.getByRole("link", { name: /voltar para projetos/i }).click();
    await expect(page).toHaveURL(/\/#projetos$/);
    await expect(page.getByRole("heading", { name: "Projetos em destaque para explorar tecnologia em movimento." })).toBeVisible();
    await expect(page.locator(".animated-nite-logo")).toHaveCount(1);
  }

  expect(runtimeErrors).toEqual([]);
});

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1100 },
] as const) {
  test(`release candidate nao quebra layout em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /NITE transforma ideias em projetos/i,
      }),
    ).toBeVisible();

    const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasHorizontalScroll).toBe(false);
  });
}
