import { expect, test } from "@playwright/test";

test("carrega a home bootstrap do M2", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "NITE",
    }),
  ).toBeVisible();

  await expect(page.getByText("M2 - branding e design system").first()).toBeVisible();
  await expect(page.getByText("Base visual pronta para M3")).toBeVisible();
});

test("mantem layout mobile sem scroll horizontal e com alvos de toque acessiveis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalScroll).toBe(false);

  const primaryCta = page.getByRole("link", { name: /ver identidade/i });
  const secondaryCta = page.getByRole("link", { name: /componentes base/i });

  await expect(primaryCta).toBeVisible();
  await expect(secondaryCta).toBeVisible();

  for (const target of [primaryCta, secondaryCta]) {
    const box = await target.boundingBox();

    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
});
