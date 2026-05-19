import { expect, test, type Page } from "@playwright/test";

const homeHeadingName =
  "Tecnologia aplicada, aprendizagem e projetos em evolução.";

const expectedBodyBackgroundByTheme = {
  dark: "rgb(9, 9, 10)",
  light: "rgb(247, 243, 234)",
} as const;
const themeStorageKey = "nite-theme";

type HomeVisualTheme = keyof typeof expectedBodyBackgroundByTheme;

async function prepareHomeVisual(page: Page, theme: HomeVisualTheme) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
  await page.addInitScript(
    ({ activeTheme, storageKey }) => {
      window.localStorage.setItem(storageKey, activeTheme);
      document.documentElement.dataset.theme = activeTheme;
      document.documentElement.dataset.themePreference = activeTheme;
      document.documentElement.classList.toggle("dark", activeTheme === "dark");
    },
    { activeTheme: theme, storageKey: themeStorageKey },
  );
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate((activeTheme) => {
    document.documentElement.dataset.theme = activeTheme;
    document.documentElement.dataset.themePreference = activeTheme;
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, theme);
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-dev-overlay] {
        display: none !important;
      }
    `,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });

  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    expectedBodyBackgroundByTheme[theme],
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: homeHeadingName,
    }),
  ).toBeVisible();
}

test("home visual baseline - dark", async ({ page }) => {
  await prepareHomeVisual(page, "dark");

  await expect(page).toHaveScreenshot("home-dark.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true,
  });
});

test("home visual baseline - light", async ({ page }) => {
  await prepareHomeVisual(page, "light");

  await expect(page).toHaveScreenshot("home-light.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true,
  });
});
