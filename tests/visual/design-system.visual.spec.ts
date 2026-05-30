import { expect, test, type Locator, type Page } from "@playwright/test";

type Theme = "dark" | "light";

const themes = ["dark", "light"] as const satisfies readonly Theme[];

const desktopRoutes = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projetos" },
  { name: "project-detail", path: "/projetos/software-aplicado" },
  { name: "updates", path: "/atualizacoes" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "contact", path: "/contato" },
] as const;

const mobileRoutes = [
  { name: "home", path: "/" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "contact", path: "/contato" },
] as const;

async function openStablePage(page: Page, path: string, theme: Theme) {
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
  await page.addInitScript((nextTheme) => {
    window.localStorage.setItem("nite-theme", nextTheme);
  }, theme);
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.locator("body").waitFor();
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
        ),
    );
  });
  await page.waitForTimeout(120);

  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
}

async function openExpandable(trigger: Locator) {
  await expect
    .poll(
      async () => {
        if ((await trigger.getAttribute("aria-expanded")) !== "true") {
          await trigger.click();
        }

        return trigger.getAttribute("aria-expanded");
      },
      { timeout: 5000 },
    )
    .toBe("true");
}

test.describe("desktop design system snapshots", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  for (const route of desktopRoutes) {
    for (const theme of themes) {
      test(`${route.name} - ${theme}`, async ({ page }) => {
        await openStablePage(page, route.path, theme);
        await expect(page).toHaveScreenshot(
          `desktop-${route.name}-${theme}.png`,
          {
            animations: "disabled",
            fullPage: true,
          },
        );
      });
    }
  }

  test("theme toggle and mega menu remain operable", async ({ page }) => {
    await openStablePage(page, "/", "dark");

    const themeToggle = page
      .getByRole("button", { name: /Alterar tema da interface/ })
      .first();
    await openExpandable(themeToggle);
    await page.getByText("Claro", { exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    const firstNavTrigger = page.locator("[data-nav-trigger]").first();
    await firstNavTrigger.getByRole("button").focus();
    await expect(page.locator("[data-mega-menu-shell]")).toBeVisible();
  });
});

test.describe("mobile design system snapshots", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  for (const route of mobileRoutes) {
    for (const theme of themes) {
      test(`${route.name} - ${theme}`, async ({ page }) => {
        await openStablePage(page, route.path, theme);
        await expect(page).toHaveScreenshot(
          `mobile-${route.name}-${theme}.png`,
          {
            animations: "disabled",
            fullPage: true,
          },
        );
      });
    }
  }

  test("mobile menu keeps keyboard focus inside the overlay", async ({
    page,
  }) => {
    await openStablePage(page, "/", "dark");
    await openExpandable(
      page.getByRole("button", { name: "Menu", exact: true }),
    );

    const menu = page.locator("[data-mobile-layered-menu]");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Tab");

    expect(
      await page.evaluate(() =>
        document
          .querySelector("[data-mobile-layered-menu]")
          ?.contains(document.activeElement),
      ),
    ).toBe(true);

    await page.getByRole("button", { name: "Fechar menu" }).click();
    await expect(menu).toBeHidden();
  });
});
