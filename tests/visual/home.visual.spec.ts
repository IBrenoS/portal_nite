import { expect, test } from "@playwright/test";

test("home visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tecnologia aplicada, aprendizagem e projetos em evolução.",
    }),
  ).toBeVisible();

  await expect(page).toHaveScreenshot("home-desktop.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true,
  });
});
