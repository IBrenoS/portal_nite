import { expect, test } from "@playwright/test";

test("carrega a home bootstrap do M1", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "NITE",
    }),
  ).toBeVisible();

  await expect(page.getByText("M1 - fundacao tecnica")).toBeVisible();
  await expect(page.getByText("Scripts de qualidade")).toBeVisible();
});
