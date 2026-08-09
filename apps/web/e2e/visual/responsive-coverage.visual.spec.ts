import { expect, test, type Page } from "@playwright/test";

type NavigationMode = "desktop" | "mobile";

const responsiveViewports = [
  { name: "small-mobile", width: 320, height: 568, navigation: "mobile" },
  { name: "compact-mobile", width: 360, height: 640, navigation: "mobile" },
  { name: "standard-mobile", width: 390, height: 844, navigation: "mobile" },
  { name: "large-mobile", width: 430, height: 932, navigation: "mobile" },
  { name: "tablet-portrait", width: 768, height: 1024, navigation: "mobile" },
  {
    name: "tablet-landscape",
    width: 1024,
    height: 768,
    navigation: "desktop",
  },
  {
    name: "compact-desktop",
    width: 1280,
    height: 720,
    navigation: "desktop",
  },
  {
    name: "university-desktop",
    width: 1366,
    height: 768,
    navigation: "desktop",
  },
  {
    name: "standard-desktop",
    width: 1440,
    height: 1000,
    navigation: "desktop",
  },
  {
    name: "wide-desktop",
    width: 1920,
    height: 1080,
    navigation: "desktop",
  },
] as const satisfies readonly {
  name: string;
  width: number;
  height: number;
  navigation: NavigationMode;
}[];

const responsiveRoutes = [
  { name: "home", path: "/" },
  { name: "about", path: "/sobre" },
  { name: "projects", path: "/projetos" },
  { name: "project-detail", path: "/projetos/data-center" },
  { name: "updates", path: "/atualizacoes" },
  { name: "people", path: "/pessoas" },
  { name: "person-profile", path: "/pessoas/breno-cerqueira" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "how-to-participate", path: "/oportunidades/como-participar" },
  { name: "contact", path: "/contato" },
] as const;

async function openResponsivePage(
  page: Page,
  path: string,
  viewport: { width: number; height: number },
) {
  const browserErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.localStorage.setItem("nite-theme", "dark");
  });

  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.locator("body").waitFor();
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);

  return { browserErrors, response };
}

async function prepareResponsiveScreenshot(page: Page) {
  await page.evaluate(async () => {
    const viewportHeight = window.innerHeight;

    for (
      let offset = 0;
      offset < document.documentElement.scrollHeight;
      offset += viewportHeight
    ) {
      window.scrollTo(0, offset);
      await new Promise((resolve) => window.setTimeout(resolve, 45));
    }

    await Promise.all(
      Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              const timeout = window.setTimeout(resolve, 3000);
              const finish = () => {
                window.clearTimeout(timeout);
                resolve();
              };

              image.addEventListener("load", finish, { once: true });
              image.addEventListener("error", finish, { once: true });
            }),
        ),
    );
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(120);
}

async function measureResponsiveLayout(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const isVisible = (element: Element) => {
      const style = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) > 0 &&
        bounds.width > 0 &&
        bounds.height > 0
      );
    };
    const isInsideIntentionalScroller = (element: Element) => {
      for (
        let ancestor = element.parentElement;
        ancestor && ancestor !== document.body;
        ancestor = ancestor.parentElement
      ) {
        const style = getComputedStyle(ancestor);

        if (
          (style.overflowX === "auto" || style.overflowX === "scroll") &&
          ancestor.scrollWidth > ancestor.clientWidth
        ) {
          return true;
        }
      }

      return false;
    };
    const clippedElements = Array.from(
      document.querySelectorAll(
        "main a, main button, main input, main textarea, main h1, main h2, main h3, footer a",
      ),
    )
      .filter(isVisible)
      .filter((element) => !isInsideIntentionalScroller(element))
      .map((element) => {
        const bounds = element.getBoundingClientRect();

        return {
          label: (element.textContent ?? "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 80),
          left: Math.round(bounds.left),
          right: Math.round(bounds.right),
          tag: element.tagName.toLowerCase(),
        };
      })
      .filter(({ left, right }) => left < -1 || right > viewportWidth + 1);
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const desktopNavigation =
      document.querySelector<HTMLElement>("[data-site-nav]");
    const menuButton = Array.from(
      document.querySelectorAll<HTMLButtonElement>("button"),
    ).find((button) => button.textContent?.trim() === "Menu");
    const desktopNavigationVisible = desktopNavigation
      ? getComputedStyle(desktopNavigation).display !== "none"
      : false;
    const menuButtonVisible = menuButton
      ? getComputedStyle(menuButton).display !== "none"
      : false;

    return {
      clippedElements,
      documentOverflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      headerOverflow: header ? header.scrollWidth - header.clientWidth : 0,
      navigationMode: desktopNavigationVisible
        ? "desktop"
        : menuButtonVisible
          ? "mobile"
          : "missing",
    };
  });
}

test.describe("responsive structural route sweep", () => {
  for (const viewport of responsiveViewports) {
    for (const route of responsiveRoutes) {
      test(`${viewport.name} ${route.name}`, async ({ page }) => {
        const { browserErrors, response } = await openResponsivePage(
          page,
          route.path,
          viewport,
        );
        const layout = await measureResponsiveLayout(page);

        expect(response?.status(), "route response").toBeLessThan(400);
        expect(browserErrors, "browser errors").toEqual([]);
        expect(
          layout.documentOverflow,
          "page-level horizontal overflow",
        ).toBeLessThanOrEqual(1);
        expect(
          layout.clippedElements,
          "visible content outside viewport",
        ).toEqual([]);
        expect(layout.headerOverflow, "header overflow").toBeLessThanOrEqual(1);
        expect(layout.navigationMode).toBe(viewport.navigation);
      });
    }
  }
});

const projectsCompactDesktopViewports = [
  { name: "very-short-desktop", width: 1280, height: 600 },
  { name: "short-desktop", width: 1280, height: 720 },
  { name: "reported-desktop", width: 1280, height: 800 },
  { name: "university-desktop", width: 1366, height: 768 },
] as const;

test.describe("projects hero compact desktop clearance", () => {
  for (const viewport of projectsCompactDesktopViewports) {
    test(viewport.name, async ({ page }) => {
      await openResponsivePage(page, "/projetos", viewport);

      const measurements = await page.evaluate(() => {
        const description = document.querySelector<HTMLElement>(
          '[data-testid="projects-hero-copy"] p',
        );
        const panel = document.querySelector<HTMLElement>(
          '[data-testid="projects-search-panel-shell"]',
        );

        if (!description || !panel) {
          throw new Error("Projects hero clearance contract not found.");
        }

        return {
          descriptionBottom: description.getBoundingClientRect().bottom,
          panelTop: panel.getBoundingClientRect().top,
        };
      });

      expect(
        measurements.panelTop - measurements.descriptionBottom,
        "clearance between hero description and filter panel",
      ).toBeGreaterThanOrEqual(24);
    });
  }
});

const visualCases = [
  {
    route: "/sobre",
    name: "about-small-mobile",
    width: 320,
    height: 568,
  },
  {
    route: "/oportunidades/como-participar",
    name: "how-to-small-mobile",
    width: 320,
    height: 568,
  },
  { route: "/", name: "home-tablet", width: 768, height: 1024 },
  {
    route: "/pessoas",
    name: "people-tablet",
    width: 768,
    height: 1024,
  },
  {
    route: "/contato",
    name: "contact-tablet-landscape",
    width: 1024,
    height: 768,
  },
  {
    route: "/",
    name: "home-compact-desktop",
    width: 1280,
    height: 720,
  },
  {
    route: "/projetos",
    name: "projects-university-desktop",
    width: 1366,
    height: 768,
  },
  {
    route: "/pessoas/breno-cerqueira",
    name: "person-university-desktop",
    width: 1366,
    height: 768,
  },
] as const;

test.describe("targeted responsive snapshots", () => {
  for (const testCase of visualCases) {
    test(testCase.name, async ({ page }) => {
      await openResponsivePage(page, testCase.route, testCase);
      await prepareResponsiveScreenshot(page);

      await expect(page).toHaveScreenshot(`${testCase.name}.png`, {
        animations: "disabled",
        fullPage: true,
      });
    });
  }
});

test.describe("responsive navigation boundaries", () => {
  test("tablet portrait keeps the layered mobile navigation operable", async ({
    page,
  }) => {
    await openResponsivePage(page, "/", { width: 768, height: 1024 });

    const menuButton = page.getByRole("button", { name: "Menu", exact: true });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

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
  });

  for (const viewport of [
    { name: "tablet-landscape", width: 1024, height: 768 },
    { name: "compact-desktop", width: 1280, height: 720 },
    { name: "university-desktop", width: 1366, height: 768 },
  ] as const) {
    test(`${viewport.name} keeps desktop navigation operable`, async ({
      page,
    }) => {
      await openResponsivePage(page, "/", viewport);

      const header = page.locator("[data-site-header]");
      const navigation = page.locator("[data-site-nav]");
      const themeToggle = page
        .getByRole("button", { name: /Alterar tema da interface/ })
        .first();

      await expect(navigation).toBeVisible();
      await expect(themeToggle).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Menu", exact: true }),
      ).toBeHidden();

      await page
        .locator("[data-nav-trigger]")
        .first()
        .getByRole("button")
        .focus();
      await expect(page.locator("[data-mega-menu-shell]")).toBeVisible();

      expect(
        await header.evaluate(
          (element) => element.scrollWidth - element.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    });
  }
});

export { openResponsivePage, responsiveRoutes, responsiveViewports };
