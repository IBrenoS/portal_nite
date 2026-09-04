import { expect, test, type Locator, type Page } from "@playwright/test";

type Theme = "dark" | "light";

const themes = ["dark", "light"] as const satisfies readonly Theme[];

const desktopRoutes = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projetos" },
  { name: "project-detail", path: "/projetos/data-center" },
  { name: "updates", path: "/atualizacoes" },
  {
    name: "update-detail",
    path: "/atualizacoes/novas-conexoes-transformam-experiencia-campus",
  },
  { name: "people", path: "/pessoas" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "contact", path: "/contato" },
] as const;

const mobileRoutes = [
  { name: "home", path: "/" },
  { name: "updates", path: "/atualizacoes" },
  {
    name: "update-detail",
    path: "/atualizacoes/novas-conexoes-transformam-experiencia-campus",
  },
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

  for (const theme of themes) {
    test(`news card titles preserve their editorial color on hover in ${theme} mode`, async ({
      page,
    }) => {
      await openStablePage(page, "/atualizacoes", theme);

      const leadTitle = page.locator('[data-news-layout="lead"] h2');
      const colorBeforeHover = await leadTitle.evaluate(
        (element) => getComputedStyle(element).color,
      );

      await leadTitle.hover();

      await expect
        .poll(() =>
          leadTitle.evaluate((element) => getComputedStyle(element).color),
        )
        .toBe(colorBeforeHover);
    });
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

  for (const theme of themes) {
    test(`mobile menu layers match the clean navigation hierarchy in ${theme} mode`, async ({
      page,
    }) => {
      await openStablePage(page, "/", theme);
      await openExpandable(
        page.getByRole("button", { name: "Menu", exact: true }),
      );

      const menu = page.locator("[data-mobile-layered-menu]");
      const rootLayer = page.locator("[data-mobile-layer-root]");

      await expect(rootLayer).toHaveCSS("opacity", "1");

      await expect(page).toHaveScreenshot(`mobile-menu-root-${theme}.png`, {
        animations: "disabled",
      });

      await page.getByRole("button", { name: "Projetos", exact: true }).click();
      const projectsLayer = page.locator(
        '[data-mobile-layer-detail="projetos"]',
      );

      await expect(projectsLayer).toHaveCSS("opacity", "1");
      await expect(
        page.getByRole("heading", {
          name: "Projetos",
          exact: true,
          level: 2,
        }),
      ).toBeVisible();
      await expect(
        projectsLayer.getByText("NITE", { exact: true }),
      ).toBeVisible();
      await expect(
        projectsLayer.getByRole("button", { name: "Fechar menu" }),
      ).toBeVisible();
      await expect(page).toHaveScreenshot(`mobile-menu-projects-${theme}.png`, {
        animations: "disabled",
      });

      await page
        .getByRole("button", { name: "Voltar ao menu principal" })
        .click();
      await expect(rootLayer).toHaveCSS("opacity", "1");
      await page.getByRole("button", { name: "Aparência" }).click();
      const appearanceLayer = page.locator(
        '[data-mobile-layer-detail="appearance"]',
      );

      await expect(appearanceLayer).toHaveCSS("opacity", "1");
      await expect(
        page.getByRole("heading", {
          name: "Aparência",
          exact: true,
          level: 2,
        }),
      ).toBeVisible();
      await expect(
        appearanceLayer.getByText("NITE", { exact: true }),
      ).toBeVisible();
      await expect(
        appearanceLayer.getByRole("button", { name: "Fechar menu" }),
      ).toBeVisible();
      expect(
        await appearanceLayer
          .getByRole("heading", { name: "Aparência", exact: true, level: 2 })
          .boundingBox(),
      ).toMatchObject({ y: 144 });
      await expect(menu.getByRole("radio")).toHaveCount(3);
      await expect(page).toHaveScreenshot(
        `mobile-menu-appearance-${theme}.png`,
        { animations: "disabled" },
      );
    });
  }

  test("mobile menu preserves Resend-derived geometry at 414px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 414, height: 896 });
    await openStablePage(page, "/", "dark");
    await openExpandable(
      page.getByRole("button", { name: "Menu", exact: true }),
    );

    const firstRow = page.locator("[data-mobile-menu-row]").first();
    const arrow = firstRow.locator("[data-mobile-menu-arrow]");
    const rowBox = await firstRow.boundingBox();
    const arrowBox = await arrow.boundingBox();
    const rowStyle = await firstRow.evaluate((element) => {
      const style = getComputedStyle(element);

      return {
        backgroundColor: style.backgroundColor,
        borderBottomWidth: style.borderBottomWidth,
        borderRadius: style.borderRadius,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
      };
    });

    expect(rowBox).toMatchObject({ x: 24, width: 366, height: 57 });
    expect(arrowBox).toMatchObject({ width: 20, height: 20 });
    expect(rowStyle).toEqual({
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderBottomWidth: "1px",
      borderRadius: "0px",
      fontSize: "16px",
      fontWeight: "600",
    });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  });
});

test.describe("resend-inspired footer layout", () => {
  for (const theme of themes) {
    test(`wordmark masks the pointer spotlight in ${theme} mode`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1920, height: 958 });
      await openStablePage(page, "/", theme);
      await page.emulateMedia({
        colorScheme: theme,
        reducedMotion: "no-preference",
      });

      const wordmark = page.locator(".nite-final-wordmark");
      const wordmarkStage = page.locator("[data-wordmark-stage]");
      const finalCtaSection = page.getByTestId("final-cta-section");
      const wordmarkFooter = page.locator('[data-footer-variant="wordmark"]');
      const spotlight = await wordmark.evaluate((wordmark) => {
        const style = getComputedStyle(wordmark, "::after");
        const bounds = wordmark.getBoundingClientRect();
        const image = wordmark.querySelector(".nite-final-wordmark-image");

        return {
          backgroundImage: style.backgroundImage,
          content: style.content,
          height: Number.parseFloat(style.height),
          imageFilter: image ? getComputedStyle(image).filter : null,
          imageOpacity: image ? getComputedStyle(image).opacity : null,
          maskImage: style.maskImage,
          mixBlendMode: style.mixBlendMode,
          spotlightColor: style.getPropertyValue("--wordmark-spotlight-color"),
          width: Number.parseFloat(style.width),
          wordmarkHeight: bounds.height,
          wordmarkWidth: bounds.width,
        };
      });
      const stage = await wordmarkStage.evaluate((element) => {
        const style = getComputedStyle(element);

        return {
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage,
          paddingTop: style.paddingTop,
        };
      });

      expect(spotlight.backgroundImage).toContain("radial-gradient");
      expect(spotlight.backgroundImage).toContain("128px");
      expect(spotlight.backgroundImage).toContain("/ 0.76");
      expect(spotlight.backgroundImage).toContain("/ 0.36");
      expect(spotlight.content).toBe('""');
      expect(spotlight.imageOpacity).toBe(theme === "dark" ? "0.55" : "0.75");
      expect(spotlight.imageFilter).toBe(
        theme === "dark"
          ? "brightness(0.72) saturate(0.82)"
          : "brightness(0.58) contrast(1.2) saturate(0.72)",
      );
      expect(spotlight.maskImage).toContain("nite-logo-footer.webp");
      expect(spotlight.mixBlendMode).toBe("normal");
      await expect(finalCtaSection).not.toHaveAttribute(
        "data-nite-scene",
        "inverse",
      );
      expect(stage.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      expect(stage.backgroundImage).toBe("none");
      expect(stage.paddingTop).toBe("0px");
      await expect(finalCtaSection).toHaveCSS(
        "background-color",
        theme === "dark" ? "rgb(9, 9, 10)" : "rgb(244, 247, 250)",
      );
      await expect(wordmarkFooter).toHaveCSS("background-image", "none");
      expect(spotlight.spotlightColor.trim()).toBe("#f8fafc");
      expect(spotlight.width).toBeCloseTo(spotlight.wordmarkWidth, 0);
      expect(spotlight.height).toBeCloseTo(spotlight.wordmarkHeight, 0);

      await wordmark.hover({ position: { x: 1072, y: 96 } });
      await expect(wordmark).toHaveAttribute("data-spotlight-active", "true");
      await expect
        .poll(() =>
          wordmark.evaluate(
            (element) => getComputedStyle(element, "::after").opacity,
          ),
        )
        .toBe(theme === "dark" ? "0.92" : "0.48");
    });
  }

  test("mobile footer stays on the global theme without an empty dark transition", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openStablePage(page, "/", "light");

    const wordmark = page.locator('[data-component="nite-final-wordmark"]');
    const wordmarkFooter = page.locator('[data-footer-variant="wordmark"]');

    await expect(wordmark).toBeHidden();
    await expect(wordmarkFooter).toHaveCSS("background-image", "none");
    await expect(wordmarkFooter).toHaveCSS(
      "background-color",
      "rgb(244, 247, 250)",
    );
  });

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

    expect(measurements.footerHeight).toBeGreaterThanOrEqual(560);
    expect(new Set(measurements.headingTops).size).toBe(1);
    expect(measurements.hasTransitionDivider).toBe(true);
    expect(measurements.hasTransitionGlow).toBe(true);
    expect(measurements.overlap).toBeGreaterThanOrEqual(45);
    expect(measurements.overlap).toBeLessThanOrEqual(51);
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
      const scene = document.querySelector<HTMLElement>("[data-projects-page]");
      const pattern = document.querySelector<HTMLElement>(
        "[data-testid='projects-pattern-grid-trail']",
      );
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-testid='projects-pattern-grid-trail-canvas']",
      );
      const lightBloom = document.querySelector<HTMLElement>(
        "[data-testid='projects-hero-light-bloom']",
      );
      const greenLight = document.querySelector<HTMLElement>(
        "[data-testid='projects-hero-green-field']",
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
        hasInverseScene: scene.hasAttribute("data-nite-scene"),
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
      hasInverseScene: false,
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

  test("news signal hero localizes light, animates and overlaps the lead story", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 958 });
    await openStablePage(page, "/atualizacoes", "dark");

    const signal = page.getByTestId("news-signal-canvas");
    const canvas = page.getByTestId("news-signal-canvas-element");

    await expect(signal).toHaveAttribute("data-news-signal-motion", "reduced");
    const reducedFrame = await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    );
    await page.waitForTimeout(180);
    expect(
      await canvas.evaluate((element) =>
        (element as HTMLCanvasElement).toDataURL(),
      ),
    ).toBe(reducedFrame);

    const desktop = await page.evaluate(() => {
      const stage = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-stage']",
      );
      const lead = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-lead']",
      );
      const field = document.querySelector(
        "[data-testid='news-hero-signal-field']",
      );
      const bloom = document.querySelector<HTMLImageElement>(
        "[data-testid='news-hero-light-bloom']",
      );
      const lightMask = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-light-mask']",
      );
      const noise = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-noise']",
      );
      const signal = document.querySelector<HTMLElement>(
        "[data-testid='news-signal-canvas']",
      );
      const signalCanvas = document.querySelector<HTMLCanvasElement>(
        "[data-testid='news-signal-canvas-element']",
      );

      if (
        !stage ||
        !lead ||
        !signal ||
        !signalCanvas ||
        !field ||
        !bloom ||
        !lightMask ||
        !noise
      ) {
        throw new Error("News signal hero contract not found.");
      }

      const stageRect = stage.getBoundingClientRect();
      const leadRect = lead.getBoundingClientRect();
      const fieldStyle = getComputedStyle(field);
      const noiseStyle = getComputedStyle(noise);
      const signalContext = signalCanvas.getContext("2d");

      if (!signalContext) {
        throw new Error("News signal canvas context not found.");
      }

      return {
        canvasCornerPixel: Array.from(
          signalContext.getImageData(0, 0, 1, 1).data,
        ),
        canvasHeight: signalCanvas.height,
        canvasWidth: signalCanvas.width,
        bloomDisplay: getComputedStyle(bloom).display,
        bloomSource: bloom.getAttribute("src"),
        fieldColor: fieldStyle.backgroundColor,
        fieldDisplay: fieldStyle.display,
        fieldMask: fieldStyle.maskImage,
        fieldMixBlendMode: fieldStyle.mixBlendMode,
        hasHorizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        leadEndsAfterStage: leadRect.bottom > stageRect.bottom,
        leadOverlapsStage: leadRect.top < stageRect.bottom,
        lightMaskDisplay: getComputedStyle(lightMask).display,
        noiseBackgroundImage: noiseStyle.backgroundImage,
        noiseBackgroundPosition: noiseStyle.backgroundPosition,
        noiseBackgroundSize: noiseStyle.backgroundSize,
        noiseDisplay: noiseStyle.display,
        noiseOpacity: noiseStyle.opacity,
        orbitCount: signal.dataset.newsSignalOrbitCount,
      };
    });

    expect(desktop.canvasCornerPixel).toEqual([0, 0, 0, 255]);
    expect(desktop.canvasHeight).toBe(958);
    expect(desktop.canvasWidth).toBe(1920);
    expect(desktop.bloomDisplay).not.toBe("none");
    expect(desktop.bloomSource).toContain("projects-hero-light.png");
    expect(desktop.fieldColor).toBe("rgb(37, 99, 235)");
    expect(desktop.fieldDisplay).not.toBe("none");
    expect(desktop.fieldMask).toContain("radial-gradient");
    expect(desktop.fieldMixBlendMode).toBe("color");
    expect(desktop.hasHorizontalOverflow).toBe(false);
    expect(desktop.leadEndsAfterStage).toBe(true);
    expect(desktop.leadOverlapsStage).toBe(true);
    expect(desktop.lightMaskDisplay).toBe("none");
    expect(desktop.noiseBackgroundImage).toContain("news-hero-noise.png");
    expect(desktop.noiseBackgroundPosition).toBe("50% 50%");
    expect(desktop.noiseBackgroundSize).toBe("cover");
    expect(desktop.noiseDisplay).not.toBe("none");
    expect(desktop.noiseOpacity).toBe("0.3");
    expect(desktop.orbitCount).toBe("10");
    expect(desktop.canvasHeight).toBeGreaterThan(0);
    expect(desktop.canvasWidth).toBeGreaterThan(0);

    await page.emulateMedia({
      colorScheme: "dark",
      reducedMotion: "no-preference",
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(signal).toHaveAttribute("data-news-signal-motion", "running");

    const firstFrame = await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    );
    await page.waitForTimeout(240);
    const secondFrame = await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    );

    expect(secondFrame).not.toBe(firstFrame);

    await page.locator("#news-agenda").scrollIntoViewIfNeeded();
    await expect(signal).toHaveAttribute("data-news-signal-motion", "paused");
    const pausedFrame = await canvas.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    );
    await page.waitForTimeout(180);
    expect(
      await canvas.evaluate((element) =>
        (element as HTMLCanvasElement).toDataURL(),
      ),
    ).toBe(pausedFrame);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator("body").waitFor();
    await expect(signal).toHaveAttribute("data-news-signal-orbit-count", "10");

    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      ),
    ).toBe(false);

    await openStablePage(page, "/atualizacoes", "light");
    const lightComposition = await page.evaluate(() => {
      const bloom = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-light-bloom']",
      );
      const field = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-signal-field']",
      );
      const lightMask = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-light-mask']",
      );
      const noise = document.querySelector<HTMLElement>(
        "[data-testid='news-hero-noise']",
      );

      if (!bloom || !field || !lightMask || !noise) {
        throw new Error("News signal light composition not found.");
      }

      const maskStyle = getComputedStyle(lightMask);

      return {
        bloomDisplay: getComputedStyle(bloom).display,
        fieldDisplay: getComputedStyle(field).display,
        lightMaskDisplay: maskStyle.display,
        lightMaskImage: maskStyle.maskImage,
        lightMaskOpacity: maskStyle.opacity,
        noiseDisplay: getComputedStyle(noise).display,
      };
    });

    expect(lightComposition.bloomDisplay).toBe("none");
    expect(lightComposition.fieldDisplay).toBe("none");
    expect(lightComposition.lightMaskDisplay).not.toBe("none");
    expect(lightComposition.lightMaskImage).toContain(
      "projects-hero-light.png",
    );
    expect(lightComposition.lightMaskOpacity).toBe("0.18");
    expect(lightComposition.noiseDisplay).toBe("none");
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
