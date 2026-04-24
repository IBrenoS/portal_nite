import { expect, test } from "@playwright/test";

test("fluxo principal home -> projeto -> retorno funciona", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Ver projeto: Projeto demonstrativo: Software aplicado" }).click();

  await expect(page).toHaveURL(/\/projetos\/software-aplicado-demonstrativo$/);
  await expect(page.getByRole("heading", { level: 1, name: "Projeto demonstrativo: Software aplicado" })).toBeVisible();

  await page.getByRole("link", { name: /voltar para projetos/i }).click();

  await expect(page).toHaveURL(/\/#projetos$/);
  await expect(page.getByRole("heading", { name: "Cards com cara de vitrine, sem perder rastreabilidade editorial." })).toBeVisible();
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
