import { expect, test, type Locator, type Page } from "@playwright/test";

type Theme = "dark" | "light";

const themes = ["dark", "light"] as const satisfies readonly Theme[];

const desktopRoutes = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projetos" },
  { name: "project-detail", path: "/projetos/software-aplicado" },
  { name: "updates", path: "/atualizacoes" },
  { name: "people", path: "/pessoas" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "contact", path: "/contato" },
] as const;

const mobileRoutes = [
  { name: "home", path: "/" },
  { name: "people", path: "/pessoas" },
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
        .filter((image) => image.offsetParent !== null && !image.complete)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
              image.loading = "eager";
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

test.describe("resend-inspired footer layout", () => {
  test("desktop footer preserves the Resend proportions and wordmark overlap", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 958 });
    await openStablePage(page, "/", "dark");

    const measurements = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      const wordmark = document.querySelector(".nite-final-wordmark");
      const divider = footer?.querySelector("[data-footer-transition-divider]");
      const glow = footer?.querySelector("[data-footer-transition-glow]");
      const headings = Array.from(
        document.querySelectorAll(
          "footer nav[aria-label='Navegação institucional do rodapé'] > div > p",
        ),
      );

      if (!footer || !wordmark) {
        throw new Error("Footer or wordmark not found");
      }

      const footerRect = footer.getBoundingClientRect();
      const wordmarkRect = wordmark.getBoundingClientRect();

      return {
        footerHeight: footerRect.height,
        headingTops: headings.map((heading) =>
          Math.round(heading.getBoundingClientRect().top),
        ),
        hasTransitionDivider: Boolean(divider),
        hasTransitionGlow: Boolean(glow),
        overlap: wordmarkRect.bottom - footerRect.top,
      };
    });

    expect(measurements.footerHeight).toBeGreaterThanOrEqual(636);
    expect(new Set(measurements.headingTops).size).toBe(1);
    expect(measurements.hasTransitionDivider).toBe(true);
    expect(measurements.hasTransitionGlow).toBe(true);
    expect(measurements.overlap).toBeGreaterThanOrEqual(65);
    expect(measurements.overlap).toBeLessThanOrEqual(71);
  });

  test("projects hero integrates pattern canvas and catalog without overflow", async ({
    page,
  }) => {
    const projectsUrl = process.env.PROJECTS_VISUAL_BASE_URL
      ? new URL("/projetos", process.env.PROJECTS_VISUAL_BASE_URL).toString()
      : "/projetos";

    await page.setViewportSize({ width: 1920, height: 958 });
    await openStablePage(page, projectsUrl, "dark");

    const desktop = await page.evaluate(() => {
      const scene = document.querySelector<HTMLElement>(
        "[data-nite-scene='inverse']",
      );
      const pattern = document.querySelector<HTMLElement>(
        "[data-testid='projects-pattern-grid-trail']",
      );
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-testid='projects-pattern-grid-trail-canvas']",
      );
      const lightBloom = document.querySelector<HTMLElement>(
        "[data-testid='projects-resend-light-bloom']",
      );
      const greenLight = document.querySelector<HTMLElement>(
        "[data-testid='projects-resend-green-light']",
      );
      const heroCopy = document.querySelector<HTMLElement>(
        "[data-testid='projects-hero-copy']",
      );
      const panel = document.querySelector<HTMLElement>(
        "[data-testid='projects-search-panel-shell']",
      );
      const catalog = document.querySelector<HTMLElement>(
        "[data-testid='projects-filterable-list']",
      );
      const heroStage = pattern?.parentElement;

      if (
        !scene ||
        !pattern ||
        !canvas ||
        !lightBloom ||
        !greenLight ||
        !heroCopy ||
        !panel ||
        !catalog ||
        !heroStage
      ) {
        throw new Error("Projects hero contract not found.");
      }

      const heroRect = heroStage.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      return {
        backgroundColor: getComputedStyle(scene).backgroundColor,
        canvasHeight: canvas.height,
        canvasWidth: canvas.width,
        hasHorizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        panelEndsAfterHero: panelRect.bottom > heroRect.bottom,
        panelOverlapsHero: panelRect.top < heroRect.bottom,
        patternSource: pattern.getAttribute("data-background-source"),
      };
    });

    expect(desktop).toEqual({
      backgroundColor: "rgb(9, 9, 10)",
      canvasHeight: expect.any(Number),
      canvasWidth: expect.any(Number),
      hasHorizontalOverflow: false,
      panelEndsAfterHero: true,
      panelOverlapsHero: true,
      patternSource: "nite-design-system",
    });
    expect(desktop.canvasHeight).toBeGreaterThan(0);
    expect(desktop.canvasWidth).toBeGreaterThan(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator("body").waitFor();

    const mobileOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );

    expect(mobileOverflow).toBe(false);
  });

  test("internal route footer remains clean", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 958 });
    await openStablePage(page, "/projetos", "dark");

    const footerState = await page.evaluate(() => {
      const footer = document.querySelector("footer");

      if (!footer) {
        throw new Error("Footer not found.");
      }

      return {
        borderTopWidth: getComputedStyle(footer).borderTopWidth,
        hasTransitionDivider: Boolean(
          footer.querySelector("[data-footer-transition-divider]"),
        ),
        hasTransitionGlow: Boolean(
          footer.querySelector("[data-footer-transition-glow]"),
        ),
        variant: footer.getAttribute("data-footer-variant"),
      };
    });

    expect(footerState).toEqual({
      borderTopWidth: "0px",
      hasTransitionDivider: false,
      hasTransitionGlow: false,
      variant: "plain",
    });
  });

  test("mobile footer keeps the wordmark hidden and navigation in two columns", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openStablePage(page, "/", "dark");

    const measurements = await page.evaluate(() => {
      const wordmark = document.querySelector(".nite-final-wordmark");
      const navigation = document.querySelector(
        "footer nav[aria-label='Navegação institucional do rodapé']",
      );

      if (!wordmark || !navigation) {
        throw new Error("Footer navigation or wordmark not found");
      }

      return {
        gridColumns:
          getComputedStyle(navigation).gridTemplateColumns.split(" ").length,
        hasHorizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        wordmarkDisplay: getComputedStyle(wordmark).display,
      };
    });

    expect(measurements.wordmarkDisplay).toBe("none");
    expect(measurements.gridColumns).toBe(2);
    expect(measurements.hasHorizontalOverflow).toBe(false);
  });
});
