import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "serial" });

type NiteAnimationSample = {
  t: number;
  bulbFilter: string;
  bulbTransform: string;
  textFilter: string;
  textTransform: string;
  textOpacity: number;
  mainRiseOpacity: number;
  mainRiseDashoffset: number;
  primaryRoutesOpacity: number;
  secondaryRoutesOpacity: number;
  microRoutesOpacity: number;
  routesOpacity: number;
  arcsOpacity: number;
  sparksOpacity: number;
  shimmerOpacity: number;
  shimmerDashoffset: number;
};

type NiteIdleSample = {
  t: number;
  bulbFilter: string;
  brainFilter: string;
  textFilter: string;
  mainRiseOpacity: number;
  primaryRoutesOpacity: number;
  routesOpacity: number;
  arcsOpacity: number;
  sparksOpacity: number;
  shimmerOpacity: number;
  highArcCount: number;
  highSparkCount: number;
};

type NiteLifecycleSample = NiteIdleSample & {
  scrollY: number;
  lifecycleIntro: string | null;
  lifecycleIdle: string | null;
  lifecycleMotion: string | null;
  lifecycleViewport: string | null;
  lifecycleVisibility: string | null;
};

type NiteMobileSample = NiteAnimationSample & {
  highPrimaryRouteCount: number;
  highSecondaryRouteCount: number;
  highMicroRouteCount: number;
  highArcCount: number;
  highSparkCount: number;
};

declare global {
  interface Window {
    __niteM4Samples?: NiteAnimationSample[];
    __niteM7Samples?: NiteIdleSample[];
  }
}

const collectNiteLifecycleSamples = (page: Page, durationMs: number) =>
  page.evaluate(
    (duration) =>
      new Promise<NiteLifecycleSample[]>((resolve) => {
        const samples: NiteLifecycleSample[] = [];
        let origin: number | null = null;

        const opacities = (selector: string) =>
          [...document.querySelectorAll(selector)].map((element) =>
            Number(window.getComputedStyle(element).opacity),
          );
        const maxOpacity = (selector: string) =>
          Math.max(0, ...opacities(selector));
        const countAbove = (selector: string, threshold: number) =>
          opacities(selector).filter((opacity) => opacity > threshold).length;
        const collect = () => {
          const root = document.querySelector<HTMLElement>(
            ".animated-nite-logo",
          );
          const bulb = document.querySelector("#bulb");
          const brain = document.querySelector("#brain");
          const text = document.querySelector("#text");

          if (!root || !bulb || !brain || !text) {
            requestAnimationFrame(collect);
            return;
          }

          origin ??= performance.now();
          samples.push({
            t: performance.now() - origin,
            bulbFilter: window.getComputedStyle(bulb).filter,
            brainFilter: window.getComputedStyle(brain).filter,
            textFilter: window.getComputedStyle(text).filter,
            mainRiseOpacity: maxOpacity("#energy-main-rise path"),
            primaryRoutesOpacity: maxOpacity(
              '#energy-routes path[data-route="primary"]',
            ),
            routesOpacity: maxOpacity("#energy-routes path"),
            arcsOpacity: maxOpacity("#electric-arcs path"),
            sparksOpacity: maxOpacity("#spark-heads circle"),
            shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
            highArcCount: countAbove("#electric-arcs path", 0.28),
            highSparkCount: countAbove("#spark-heads circle", 0.26),
            scrollY: window.scrollY,
            lifecycleIntro: root.dataset.niteIntro ?? null,
            lifecycleIdle: root.dataset.niteIdle ?? null,
            lifecycleMotion: root.dataset.niteMotion ?? null,
            lifecycleViewport: root.dataset.niteViewport ?? null,
            lifecycleVisibility: root.dataset.niteVisibility ?? null,
          });

          if (performance.now() - origin < duration) {
            requestAnimationFrame(collect);
          } else {
            resolve(samples);
          }
        };

        requestAnimationFrame(collect);
      }),
    durationMs,
  );

const maxLifecycleValue = (
  samples: NiteLifecycleSample[],
  key:
    | "highArcCount"
    | "highSparkCount"
    | "mainRiseOpacity"
    | "primaryRoutesOpacity",
) => Math.max(0, ...samples.map((sample) => Number(sample[key])));

const collectNiteMobileSamples = (page: Page, durationMs: number) =>
  page.evaluate(
    (duration) =>
      new Promise<NiteMobileSample[]>((resolve) => {
        const samples: NiteMobileSample[] = [];
        let origin: number | null = null;

        const opacities = (selector: string) =>
          [...document.querySelectorAll(selector)].map((element) =>
            Number(window.getComputedStyle(element).opacity),
          );
        const maxOpacity = (selector: string) =>
          Math.max(0, ...opacities(selector));
        const countAbove = (selector: string, threshold: number) =>
          opacities(selector).filter((opacity) => opacity > threshold).length;
        const firstDashoffset = (selector: string) => {
          const element = document.querySelector(selector);

          if (!element) {
            return 0;
          }

          return (
            Number.parseFloat(
              window.getComputedStyle(element).strokeDashoffset,
            ) || 0
          );
        };
        const collect = () => {
          const bulb = document.querySelector("#bulb");
          const text = document.querySelector("#text");

          if (!bulb || !text) {
            requestAnimationFrame(collect);
            return;
          }

          origin ??= performance.now();

          const bulbStyles = window.getComputedStyle(bulb);
          const textStyles = window.getComputedStyle(text);

          samples.push({
            t: performance.now() - origin,
            bulbFilter: bulbStyles.filter,
            bulbTransform: bulbStyles.transform,
            textFilter: textStyles.filter,
            textTransform: textStyles.transform,
            textOpacity: Number(textStyles.opacity),
            mainRiseOpacity: maxOpacity("#energy-main-rise path"),
            mainRiseDashoffset: firstDashoffset("#energy-main-rise path"),
            primaryRoutesOpacity: maxOpacity(
              '#energy-routes path[data-route="primary"]',
            ),
            secondaryRoutesOpacity: maxOpacity(
              '#energy-routes path[data-route="secondary"]',
            ),
            microRoutesOpacity: maxOpacity(
              '#energy-routes path[data-route="micro"]',
            ),
            routesOpacity: maxOpacity("#energy-routes path"),
            arcsOpacity: maxOpacity("#electric-arcs path"),
            sparksOpacity: maxOpacity("#spark-heads circle"),
            shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
            shimmerDashoffset: firstDashoffset("#text-shimmer-mask path"),
            highPrimaryRouteCount: countAbove(
              '#energy-routes path[data-route="primary"]',
              0.5,
            ),
            highSecondaryRouteCount: countAbove(
              '#energy-routes path[data-route="secondary"]',
              0.5,
            ),
            highMicroRouteCount: countAbove(
              '#energy-routes path[data-route="micro"]',
              0.45,
            ),
            highArcCount: countAbove("#electric-arcs path", 0.5),
            highSparkCount: countAbove("#spark-heads circle", 0.5),
          });

          if (performance.now() - origin < duration) {
            requestAnimationFrame(collect);
          } else {
            resolve(samples);
          }
        };

        requestAnimationFrame(collect);
      }),
    durationMs,
  );

const maxMobileValue = (
  samples: NiteMobileSample[],
  key:
    | "highPrimaryRouteCount"
    | "highSecondaryRouteCount"
    | "highMicroRouteCount"
    | "highArcCount"
    | "highSparkCount"
    | "mainRiseOpacity"
    | "primaryRoutesOpacity"
    | "secondaryRoutesOpacity"
    | "microRoutesOpacity"
    | "shimmerOpacity",
) => Math.max(0, ...samples.map((sample) => Number(sample[key])));

test("carrega a home pública sem rótulos internos", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tecnologia aplicada, projetos reais e aprendizagem em movimento.",
    }),
  ).toBeVisible();

  const hero = page.locator("[data-hero-section]");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    hero.getByText("UNIJORGE / Núcleo de Inovação & Tecnologia"),
  ).toBeVisible();
  await expect(
    hero.getByText(
      "O NITE conecta estudantes, professores e gestão para transformar desafios acadêmicos em protótipos, produtos digitais, automações e experiências tecnológicas reais.",
    ),
  ).toBeVisible();
  await expect(
    hero.getByRole("link", { name: "Explorar frentes do NITE" }),
  ).toHaveAttribute("href", "#projetos");
  await expect(
    hero.getByRole("link", { name: "Propor um desafio" }),
  ).toHaveAttribute("href", "#contato");

  const heroContract = await hero.evaluate((element) => {
    const text = element.textContent ?? "";

    return {
      hasForbiddenText: [
        "Projetos aplicados",
        "Aprendizagem prática",
        "Tecnologia responsável",
        "Demonstrativo",
        "Em estruturação",
        "Em protótipo",
        "Status",
        "Categoria",
        "Stack",
        "Última atualização",
        "Próximo passo",
        "dashboard",
        "painel operacional",
      ].some((forbidden) => text.includes(forbidden)),
      operationalPanels: element.querySelectorAll("article, [role='table']")
        .length,
      logoCount: element.querySelectorAll(".animated-nite-logo").length,
    };
  });

  expect(heroContract).toEqual({
    hasForbiddenText: false,
    operationalPanels: 0,
    logoCount: 1,
  });

  await expect(
    page.getByText("M7 - SEO, acessibilidade e performance"),
  ).toHaveCount(0);
  await expect(page.getByText("Landing institucional")).toHaveCount(0);

  const builds = page.locator("[data-builds-section]");
  await expect(builds).toHaveAttribute("id", "sobre");
  await expect(builds.getByText("O que o NITE constrói")).toBeVisible();
  await expect(
    builds.getByRole("heading", {
      level: 2,
      name: "Saídas concretas para transformar desafios acadêmicos em tecnologia aplicada.",
    }),
  ).toBeVisible();
  await expect(builds.locator("article")).toHaveCount(6);
  await expect(builds.getByText("Saídas:")).toHaveCount(6);

  for (const title of [
    "Software aplicado",
    "Dados e IA",
    "Robótica e prototipagem",
    "Experiência digital",
    "Automação e processos",
    "Oficinas e aprendizagem prática",
  ]) {
    await expect(builds.getByText(title)).toBeVisible();
  }

  await expect(page.getByText("Aprendizado aplicado")).toHaveCount(0);
  await expect(page.getByText("Tecnologia em prática")).toHaveCount(0);
  await expect(page.getByText("Ponte institucional")).toHaveCount(0);
  const projects = page.locator("[data-projects-operating-section]");
  await expect(projects).toHaveAttribute("id", "projetos");
  await expect(
    projects.getByRole("heading", {
      level: 2,
      name: "Projetos em movimento",
    }),
  ).toBeVisible();
  await expect(
    projects.getByText(
      "Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos.",
    ),
  ).toBeVisible();
  await expect(projects.locator("[data-project-status-card]")).toHaveCount(3);
  await expect(projects.getByText("Mapeamento da frente")).toHaveCount(3);
  await expect(projects.getByText("Última atualização")).toHaveCount(3);
  await expect(projects.getByText("Entregável principal")).toHaveCount(3);
  await expect(projects.getByText("Entregável em validação.")).toHaveCount(3);
  await expect(projects.getByText("Próximo passo")).toHaveCount(3);
  await expect(
    page.getByText("A evolução do NITE em uma narrativa visual."),
  ).toBeVisible();
  await expect(page.getByText("Vitrine para a comunidade")).toBeVisible();
  await expect(
    page.getByText("Quer acompanhar a evolução do NITE?"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Acompanhar o NITE no Instagram" }).first(),
  ).toHaveText(/@nite\.uj/);
});

test("aplica contrato visual de superfícies da home", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(page.locator("[data-hero-section]")).toHaveAttribute(
    "data-surface",
    "grid",
  );
  await expect(page.locator("[data-builds-section]")).toHaveAttribute(
    "data-surface",
    "clean",
  );

  for (const selector of ["#projetos", "#contato"]) {
    await expect(page.locator(selector)).toHaveAttribute(
      "data-surface",
      "grid",
    );
  }

  for (const selector of ["#timeline", "footer"]) {
    await expect(page.locator(selector)).toHaveAttribute(
      "data-surface",
      "clean",
    );
  }

  const surfaceState = await page.evaluate(() => {
    const cleanSelectors = ["[data-builds-section]", "#timeline", "footer"];
    const cleanBackgrounds = cleanSelectors.map((selector) => {
      const element = document.querySelector<HTMLElement>(selector);

      return element ? window.getComputedStyle(element).backgroundColor : null;
    });
    const alphaFromColor = (color: string) => {
      const slashAlpha = color.match(/\/\s*([\d.]+)/);

      if (slashAlpha) {
        return Number(slashAlpha[1]);
      }

      const match = color.match(/rgba?\(([^)]+)\)/);

      if (!match) {
        return 1;
      }

      const parts = match[1].split(",").map((part) => part.trim());

      return parts.length === 4 ? Number(parts[3]) : 1;
    };
    const heroScanline = document.querySelector<HTMLElement>(
      "[data-hero-section] .brand-scanline",
    );
    const buildsScanline = document.querySelector<HTMLElement>(
      "[data-builds-section] .brand-scanline",
    );
    const gridBackgrounds = [
      "[data-hero-section]",
      "#projetos",
      "#contato",
    ].map((selector) => {
      const element = document.querySelector<HTMLElement>(selector);

      return element ? window.getComputedStyle(element).backgroundColor : null;
    });
    const footer = document.querySelector<HTMLElement>("footer");
    const cards = [
      ...document.querySelectorAll<HTMLElement>(
        "[data-builds-section] article",
      ),
    ];
    const cardWidths = cards.map((card) => card.getBoundingClientRect().width);

    return {
      cleanBackgrounds,
      heroScanlineOpacity: heroScanline
        ? Number(window.getComputedStyle(heroScanline).opacity)
        : 0,
      buildsHasScanline: Boolean(buildsScanline),
      gridBackgrounds,
      footerBorderTopAlpha: footer
        ? alphaFromColor(window.getComputedStyle(footer).borderTopColor)
        : 1,
      minBuildCardWidth: Math.min(...cardWidths),
    };
  });

  expect(surfaceState.cleanBackgrounds).toEqual([
    "rgb(3, 5, 7)",
    "rgb(3, 5, 7)",
    "rgb(3, 5, 7)",
  ]);
  expect(surfaceState.gridBackgrounds).toEqual([
    "rgba(0, 0, 0, 0)",
    "rgba(0, 0, 0, 0)",
    "rgba(0, 0, 0, 0)",
  ]);
  expect(surfaceState.heroScanlineOpacity).toBeGreaterThanOrEqual(0.25);
  expect(surfaceState.buildsHasScanline).toBe(false);
  expect(surfaceState.footerBorderTopAlpha).toBeLessThanOrEqual(0.08);
  expect(surfaceState.minBuildCardWidth).toBeGreaterThanOrEqual(250);
});

test("mantem a seção de construções responsiva e sem scroll horizontal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const buildsState = await page
    .locator("[data-builds-section]")
    .evaluate((section) => {
      const cards = [...section.querySelectorAll("article")];
      const cardBoxes = cards.map((card) => card.getBoundingClientRect());
      const sectionText = section.textContent ?? "";

      return {
        hasHorizontalScroll:
          document.documentElement.scrollWidth > window.innerWidth,
        cardCount: cards.length,
        minCardWidth: Math.min(...cardBoxes.map((box) => box.width)),
        maxCardRight: Math.max(...cardBoxes.map((box) => box.right)),
        oldCopyIsGone: [
          "Aprendizado aplicado",
          "Tecnologia em prática",
          "Ponte institucional",
        ].every((text) => !sectionText.includes(text)),
        outputCount: (sectionText.match(/Saídas:/g) ?? []).length,
      };
    });

  expect(buildsState.hasHorizontalScroll).toBe(false);
  expect(buildsState.cardCount).toBe(6);
  expect(buildsState.outputCount).toBe(6);
  expect(buildsState.oldCopyIsGone).toBe(true);
  expect(buildsState.minCardWidth).toBeGreaterThanOrEqual(300);
  expect(buildsState.maxCardRight).toBeLessThanOrEqual(390);
});

test("mantem projetos operacionais legiveis no mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const projectsState = await page
    .locator("[data-projects-operating-section]")
    .evaluate((section) => {
      const cards = [...section.querySelectorAll("[data-project-status-card]")];
      const cardBoxes = cards.map((card) => card.getBoundingClientRect());
      const sectionText = section.textContent ?? "";

      return {
        hasHorizontalScroll:
          document.documentElement.scrollWidth > window.innerWidth,
        cardCount: cards.length,
        outputCount: (sectionText.match(/Entregável principal/g) ?? []).length,
        nextStepCount: (sectionText.match(/Próximo passo/g) ?? []).length,
        minCardWidth: Math.min(...cardBoxes.map((box) => box.width)),
        maxCardRight: Math.max(...cardBoxes.map((box) => box.right)),
        hasFakeMetrics:
          sectionText.includes("Métrica") || sectionText.includes("Equipe"),
      };
    });

  expect(projectsState.hasHorizontalScroll).toBe(false);
  expect(projectsState.cardCount).toBe(3);
  expect(projectsState.outputCount).toBe(3);
  expect(projectsState.nextStepCount).toBe(3);
  expect(projectsState.minCardWidth).toBeGreaterThanOrEqual(300);
  expect(projectsState.maxCardRight).toBeLessThanOrEqual(390);
  expect(projectsState.hasFakeMetrics).toBe(false);
});

test("mantem headline em coluna propria com gutter antes do visual", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const layout = await page.locator("[data-hero-section]").evaluate((hero) => {
    const heading = hero.querySelector("h1");
    const visual = hero.querySelector("[data-hero-visual]");
    const logo = hero.querySelector(".animated-nite-logo");
    const headingBox = heading?.getBoundingClientRect();
    const visualBox = visual?.getBoundingClientRect();
    const logoBox = logo?.getBoundingClientRect();

    return {
      heading: headingBox
        ? {
            left: headingBox.left,
            right: headingBox.right,
            width: headingBox.width,
          }
        : null,
      visual: visualBox
        ? {
            left: visualBox.left,
            right: visualBox.right,
            width: visualBox.width,
          }
        : null,
      logo: logoBox
        ? {
            left: logoBox.left,
            right: logoBox.right,
            width: logoBox.width,
          }
        : null,
    };
  });

  expect(layout.heading).not.toBeNull();
  expect(layout.visual).not.toBeNull();
  expect(layout.logo).not.toBeNull();
  expect(layout.visual!.width).toBeGreaterThanOrEqual(320);
  expect(layout.logo!.width).toBeLessThanOrEqual(layout.visual!.width);
  expect(layout.heading!.right).toBeLessThanOrEqual(layout.visual!.left - 32);
});

test("executa logo morph textual do header sem deslocar a navegacao", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const brandLink = page.getByRole("link", {
    name: "Ir para a página inicial do NITE UniJorge",
  });
  const logo = page.locator("[data-header-logo-morph]");
  const nav = page.locator("[data-site-nav]");

  await expect(brandLink).toBeVisible();
  await expect(logo).toHaveAttribute("data-header-logo-state", "expanded");
  await expect(nav).toBeVisible();

  const headerMarkup = await page
    .locator("[data-site-header]")
    .evaluate((header) => ({
      hasImage: Boolean(header.querySelector("img")),
      hasSvg: Boolean(header.querySelector("svg")),
      hasHiddenLogoText: [...header.querySelectorAll("span")].some(
        (element) =>
          element.textContent?.trim() === "NITE" &&
          element.getAttribute("aria-hidden") === "true",
      ),
      position: window.getComputedStyle(header).position,
    }));

  expect(headerMarkup).toEqual({
    hasImage: false,
    hasSvg: false,
    hasHiddenLogoText: true,
    position: "sticky",
  });

  const expandedNavBox = await nav.boundingBox();
  expect(expandedNavBox).not.toBeNull();

  await page.evaluate(() => window.scrollTo(0, 120));
  await expect(logo).toHaveAttribute("data-header-logo-state", "collapsed");

  const collapsedNavBox = await nav.boundingBox();
  expect(collapsedNavBox).not.toBeNull();
  expect(Math.abs(collapsedNavBox!.x - expandedNavBox!.x)).toBeLessThanOrEqual(
    2,
  );
});

test("mantem o header mobile sem nova arquitetura ou scroll horizontal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const headerState = await page
    .locator("[data-site-header]")
    .evaluate((header) => {
      const headerBox = header.getBoundingClientRect();
      const nav = header.querySelector("[data-site-nav]");

      return {
        height: headerBox.height,
        navDisplay: nav ? window.getComputedStyle(nav).display : null,
        hasHorizontalScroll:
          document.documentElement.scrollWidth > window.innerWidth,
        position: window.getComputedStyle(header).position,
      };
    });

  expect(headerState.position).toBe("sticky");
  expect(headerState.height).toBeGreaterThanOrEqual(64);
  expect(headerState.height).toBeLessThanOrEqual(72);
  expect(headerState.navDisplay).toBe("none");
  expect(headerState.hasHorizontalScroll).toBe(false);

  await page.evaluate(() => window.scrollTo(0, 120));
  await expect(page.locator("[data-header-logo-morph]")).toHaveAttribute(
    "data-header-logo-state",
    "collapsed",
  );
});

test("mantem layout mobile sem scroll horizontal e com alvos de toque acessiveis", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalScroll).toBe(false);

  const primaryCta = page.getByRole("link", {
    name: /explorar frentes do nite/i,
  });
  const secondaryCta = page.getByRole("link", { name: /propor um desafio/i });

  await expect(primaryCta).toBeVisible();
  await expect(secondaryCta).toBeVisible();

  for (const target of [primaryCta, secondaryCta]) {
    const box = await target.boundingBox();

    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }

  const headingBox = await page
    .getByRole("heading", {
      level: 1,
      name: "Tecnologia aplicada, projetos reais e aprendizagem em movimento.",
    })
    .boundingBox();
  const logoBox = await page.locator("#logo-final").boundingBox();
  const primaryBox = await primaryCta.boundingBox();
  const secondaryBox = await secondaryCta.boundingBox();

  expect(headingBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(primaryBox).not.toBeNull();
  expect(secondaryBox).not.toBeNull();
  expect(logoBox!.y + logoBox!.height).toBeLessThan(headingBox!.y);
  expect(headingBox!.y + headingBox!.height).toBeLessThan(primaryBox!.y);
  expect(primaryBox!.y + primaryBox!.height).toBeLessThanOrEqual(
    secondaryBox!.y + 1,
  );
});

test("mantem narrativa e densidade mobile no primeiro impacto", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const firstViewportState = await page.evaluate(() => {
    const logo = document.querySelector("#logo-final");
    const logoBox = logo?.getBoundingClientRect();
    const heading = document.querySelector("h1");
    const headingBox = heading?.getBoundingClientRect();
    const primaryCta = [...document.querySelectorAll("a")].find((link) =>
      link.textContent?.includes("Explorar frentes do NITE"),
    );
    const secondaryCta = [...document.querySelectorAll("a")].find((link) =>
      link.textContent?.includes("Propor um desafio"),
    );
    const primaryBox = primaryCta?.getBoundingClientRect();
    const secondaryBox = secondaryCta?.getBoundingClientRect();

    return {
      hasHorizontalScroll:
        document.documentElement.scrollWidth > window.innerWidth,
      heading: headingBox
        ? { y: headingBox.y, bottom: headingBox.bottom }
        : null,
      logo: logoBox
        ? {
            x: logoBox.x,
            y: logoBox.y,
            width: logoBox.width,
            height: logoBox.height,
            bottom: logoBox.bottom,
          }
        : null,
      primaryCta: primaryBox
        ? {
            y: primaryBox.y,
            bottom: primaryBox.bottom,
            width: primaryBox.width,
            height: primaryBox.height,
          }
        : null,
      secondaryCta: secondaryBox
        ? {
            y: secondaryBox.y,
            bottom: secondaryBox.bottom,
            width: secondaryBox.width,
            height: secondaryBox.height,
          }
        : null,
      heroText:
        document.querySelector("[data-hero-section]")?.textContent ?? "",
      viewportHeight: window.innerHeight,
    };
  });

  expect(firstViewportState.hasHorizontalScroll).toBe(false);
  expect(firstViewportState.heading).not.toBeNull();
  expect(firstViewportState.logo).not.toBeNull();
  expect(firstViewportState.logo!.width).toBeGreaterThanOrEqual(128);
  expect(firstViewportState.logo!.height).toBeGreaterThanOrEqual(200);
  expect(firstViewportState.logo!.y).toBeGreaterThanOrEqual(0);
  expect(firstViewportState.primaryCta?.height).toBeGreaterThanOrEqual(44);
  expect(firstViewportState.secondaryCta?.height).toBeGreaterThanOrEqual(44);
  expect(firstViewportState.logo!.bottom).toBeLessThan(
    firstViewportState.heading!.y,
  );
  expect(firstViewportState.heading!.bottom).toBeLessThan(
    firstViewportState.primaryCta!.y,
  );
  expect(firstViewportState.primaryCta!.bottom).toBeLessThanOrEqual(
    firstViewportState.secondaryCta!.y + 1,
  );
  expect(firstViewportState.logo!.y).toBeLessThan(
    firstViewportState.viewportHeight,
  );
  expect(firstViewportState.heroText).not.toContain("Demonstrativo");
  expect(firstViewportState.heroText).not.toContain("Em estruturação");

  const mobileSamples = await collectNiteMobileSamples(page, 8800);
  const firstBulbFilter = mobileSamples[0]?.bulbFilter ?? "";
  const firstBulbTransform = mobileSamples[0]?.bulbTransform ?? "";
  const firstBulbChangeAt =
    mobileSamples.find(
      (sample) =>
        sample.bulbFilter !== firstBulbFilter ||
        sample.bulbTransform !== firstBulbTransform,
    )?.t ?? null;
  const firstMainRiseAt =
    mobileSamples.find((sample) => sample.mainRiseOpacity > 0.08)?.t ?? null;
  const firstPrimaryAt =
    mobileSamples.find((sample) => sample.primaryRoutesOpacity > 0.08)?.t ??
    null;
  const firstSparkAt =
    mobileSamples.find((sample) => sample.sparksOpacity > 0.08)?.t ?? null;
  const firstShimmerAt =
    mobileSamples.find((sample) => sample.shimmerOpacity > 0.08)?.t ?? null;

  expect(firstBulbChangeAt).not.toBeNull();
  expect(firstMainRiseAt).not.toBeNull();
  expect(firstPrimaryAt).not.toBeNull();
  expect(firstSparkAt).not.toBeNull();
  expect(firstShimmerAt).not.toBeNull();
  expect(firstBulbChangeAt!).toBeLessThan(firstMainRiseAt!);
  expect(firstMainRiseAt!).toBeLessThan(firstPrimaryAt!);
  expect(firstPrimaryAt!).toBeLessThan(firstSparkAt!);
  expect(firstSparkAt!).toBeLessThan(firstShimmerAt!);
  expect(maxMobileValue(mobileSamples, "highPrimaryRouteCount")).toBe(4);
  expect(
    maxMobileValue(mobileSamples, "highSecondaryRouteCount"),
  ).toBeLessThanOrEqual(3);
  expect(
    maxMobileValue(mobileSamples, "highMicroRouteCount"),
  ).toBeLessThanOrEqual(2);
  expect(maxMobileValue(mobileSamples, "highArcCount")).toBeLessThanOrEqual(2);
  expect(maxMobileValue(mobileSamples, "highSparkCount")).toBeLessThanOrEqual(
    5,
  );
  expect(
    maxMobileValue(mobileSamples, "secondaryRoutesOpacity"),
  ).toBeGreaterThan(0.7);
  expect(maxMobileValue(mobileSamples, "microRoutesOpacity")).toBeGreaterThan(
    0.55,
  );
  expect(maxMobileValue(mobileSamples, "shimmerOpacity")).toBeGreaterThan(0.5);
});

test("mantem idle e protecoes de ciclo de vida no mobile", async ({ page }) => {
  test.setTimeout(45000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");
      const text = document.querySelector("#text");

      return (
        root?.getAttribute("data-nite-motion") === "reduced" &&
        Boolean(
          text &&
          window.getComputedStyle(text).filter.includes("brightness(1.03)"),
        )
      );
    },
    undefined,
    { timeout: 5000 },
  );

  const reducedMobileState = await page.evaluate(() => {
    const maxOpacity = (selector: string) =>
      Math.max(
        0,
        ...[...document.querySelectorAll(selector)].map((element) =>
          Number(window.getComputedStyle(element).opacity),
        ),
      );
    const root = document.querySelector(".animated-nite-logo");

    return {
      motion: root?.getAttribute("data-nite-motion"),
      idle: root?.getAttribute("data-nite-idle"),
      overlayOpacity: maxOpacity("#energy-overlay"),
      arcsOpacity: maxOpacity("#electric-arcs path"),
      sparksOpacity: maxOpacity("#spark-heads circle"),
      textFilter: window.getComputedStyle(document.querySelector("#text")!)
        .filter,
    };
  });

  expect(reducedMobileState).toMatchObject({
    motion: "reduced",
    idle: "disabled",
    overlayOpacity: 0,
    arcsOpacity: 0,
    sparksOpacity: 0,
  });
  expect(reducedMobileState.textFilter).toContain("brightness(1.03)");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForFunction(
    () =>
      document
        .querySelector(".animated-nite-logo")
        ?.getAttribute("data-nite-idle") === "running",
    undefined,
    { timeout: 12000 },
  );

  const idleSamples = await collectNiteLifecycleSamples(page, 8200);
  const idleActiveSamples = idleSamples.filter(
    (sample) => sample.highArcCount > 0 || sample.highSparkCount > 0,
  );

  expect(maxLifecycleValue(idleSamples, "highArcCount")).toBeLessThanOrEqual(2);
  expect(maxLifecycleValue(idleSamples, "highSparkCount")).toBeLessThanOrEqual(
    2,
  );
  expect(
    idleActiveSamples.length / Math.max(idleSamples.length, 1),
  ).toBeLessThan(0.16);

  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-viewport") === "hidden" &&
        root.getAttribute("data-nite-idle") === "paused"
      );
    },
    undefined,
    { timeout: 8000 },
  );

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-viewport") === "visible" &&
        root.getAttribute("data-nite-idle") === "running"
      );
    },
    undefined,
    { timeout: 8000 },
  );

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-visibility") === "hidden" &&
        root.getAttribute("data-nite-idle") === "paused"
      );
    },
    undefined,
    { timeout: 5000 },
  );

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-visibility") === "visible" &&
        root.getAttribute("data-nite-idle") === "running"
      );
    },
    undefined,
    { timeout: 8000 },
  );
});

test("mantem o hero responsivo, decorativo e navegavel por teclado", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");

  const heroState = await page.evaluate(() => {
    const hero = document.querySelector("[data-hero-section]");
    const logo = document.querySelector("#logo-final");
    const logoBox = logo?.getBoundingClientRect();
    const primaryCta = [...document.querySelectorAll("a")].find((link) =>
      link.textContent?.includes("Explorar frentes do NITE"),
    );
    const secondaryCta = [...document.querySelectorAll("a")].find((link) =>
      link.textContent?.includes("Propor um desafio"),
    );
    const heroText = hero?.textContent ?? "";

    return {
      logoVisible: Boolean(logoBox && logoBox.width > 0 && logoBox.height > 0),
      logoOutsidePanel: !logo?.closest(".brand-panel"),
      logoDecorative:
        logo?.closest(".animated-nite-logo")?.getAttribute("aria-hidden") ===
        "true",
      hasHorizontalScroll:
        document.documentElement.scrollWidth > window.innerWidth,
      primaryText: primaryCta?.textContent ?? "",
      secondaryText: secondaryCta?.textContent ?? "",
      heroHasOperationalText: [
        "Demonstrativo",
        "Em estruturação",
        "Em protótipo",
        "Status",
        "Categoria",
        "Stack",
        "Última atualização",
        "Próximo passo",
      ].some((forbidden) => heroText.includes(forbidden)),
      heroHasPanel: Boolean(hero?.querySelector("article, [role='table']")),
    };
  });

  expect(heroState).toMatchObject({
    logoVisible: true,
    logoOutsidePanel: true,
    logoDecorative: true,
    hasHorizontalScroll: false,
    heroHasOperationalText: false,
    heroHasPanel: false,
  });
  expect(heroState.primaryText).toMatch(/Explorar frentes do NITE/);
  expect(heroState.secondaryText).toMatch(/Propor um desafio/);

  const primaryCta = page
    .getByRole("link", { name: /explorar frentes do nite/i })
    .first();

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");

    if (
      await primaryCta.evaluate((element) => document.activeElement === element)
    ) {
      break;
    }
  }

  await expect(primaryCta).toBeFocused();
});

test("respeita prefers-reduced-motion sem esconder ou deslocar o logo", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const readReducedMotionState = () =>
    page.evaluate(() => {
      const root = document.querySelector<HTMLElement>(".animated-nite-logo");
      const maxOpacity = (selector: string) =>
        Math.max(
          0,
          ...[...document.querySelectorAll(selector)].map((element) =>
            Number(window.getComputedStyle(element).opacity),
          ),
        );
      const readFilter = (selector: string) =>
        window.getComputedStyle(document.querySelector(selector)!).filter;

      return {
        motion: root?.dataset.niteMotion ?? null,
        intro: root?.dataset.niteIntro ?? null,
        idle: root?.dataset.niteIdle ?? null,
        viewport: root?.dataset.niteViewport ?? null,
        overlayOpacity: maxOpacity("#energy-overlay"),
        mainRiseOpacity: maxOpacity("#energy-main-rise path"),
        routesOpacity: maxOpacity("#energy-routes path"),
        arcsOpacity: maxOpacity("#electric-arcs path"),
        sparksOpacity: maxOpacity("#spark-heads circle"),
        shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
        bulbFilter: readFilter("#bulb"),
        textFilter: readFilter("#text"),
      };
    });

  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");
      const text = document.querySelector("#text");

      return (
        root?.getAttribute("data-nite-motion") === "reduced" &&
        Boolean(
          text &&
          window.getComputedStyle(text).filter.includes("brightness(1.03)"),
        )
      );
    },
    undefined,
    { timeout: 5000 },
  );

  const before = await page.locator("#logo-final").boundingBox();
  const staticStateBefore = await readReducedMotionState();
  await page.waitForTimeout(1200);
  const after = await page.locator("#logo-final").boundingBox();
  const staticStateAfter = await readReducedMotionState();
  const reducedState = await page.evaluate(() => {
    const logo = document.querySelector("#nite-logo");
    const bulb = document.querySelector("#bulb");
    const brain = document.querySelector("#brain");
    const text = document.querySelector("#text");

    return [logo, bulb, brain, text].every((element) => {
      if (!element) {
        return false;
      }

      const box = element.getBoundingClientRect();
      const styles = window.getComputedStyle(element);

      return box.width > 0 && box.height > 0 && Number(styles.opacity) > 0.98;
    });
  });

  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(before!.x - after!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(before!.y - after!.y)).toBeLessThanOrEqual(1);
  expect(reducedState).toBe(true);
  expect(staticStateBefore).toMatchObject({
    motion: "reduced",
    intro: "static",
    idle: "disabled",
    viewport: "not-observed",
    overlayOpacity: 0,
    mainRiseOpacity: 0,
    routesOpacity: 0,
    arcsOpacity: 0,
    sparksOpacity: 0,
    shimmerOpacity: 0,
  });
  expect(staticStateAfter).toEqual(staticStateBefore);
  expect(staticStateAfter.bulbFilter).toContain("drop-shadow");
  expect(staticStateAfter.textFilter).toContain("drop-shadow");
  expect(staticStateAfter.textFilter).toContain("brightness(1.03)");
});

test("mantem a camada eletrica invisivel e preparada no estado inicial", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForFunction(() =>
    [
      ...document.querySelectorAll(
        "#energy-main-rise path, #energy-routes path, #electric-arcs path, #text-shimmer-mask path",
      ),
    ].every((element) => {
      const styles = window.getComputedStyle(element);

      return (
        styles.strokeDasharray !== "none" && styles.strokeDashoffset !== "0px"
      );
    }),
  );

  const electricState = await page.evaluate(() => {
    const read = (selector: string) =>
      [...document.querySelectorAll(selector)].map((element) => {
        const styles = window.getComputedStyle(element);

        return {
          opacity: styles.opacity,
          strokeDasharray: styles.strokeDasharray,
          strokeDashoffset: styles.strokeDashoffset,
          transform: styles.transform,
        };
      });
    const overlay = read("#energy-overlay");
    const mainRise = read("#energy-main-rise path");
    const routes = read("#energy-routes path");
    const arcs = read("#electric-arcs path");
    const sparks = read("#spark-heads circle");
    const shimmer = read("#text-shimmer-mask path");
    const electricPaths = [...mainRise, ...routes, ...arcs, ...shimmer];

    return {
      overlayInlineStyle:
        document.querySelector("#energy-overlay")?.getAttribute("style") ?? "",
      hidden: [...overlay, ...electricPaths, ...sparks].every(
        (item) => Number(item.opacity) === 0,
      ),
      dashed: electricPaths.every(
        (item) =>
          item.strokeDasharray !== "none" &&
          item.strokeDashoffset !== "0" &&
          item.strokeDashoffset !== "0px",
      ),
      sparksScaledDown: sparks.every((item) => {
        if (item.transform === "none") {
          return false;
        }

        const matrix = new DOMMatrixReadOnly(item.transform);

        return matrix.a === 0 && matrix.d === 0;
      }),
      counts: {
        mainRise: mainRise.length,
        routes: routes.length,
        arcs: arcs.length,
        sparks: sparks.length,
        shimmer: shimmer.length,
      },
    };
  });

  expect(electricState.overlayInlineStyle).toContain("opacity");
  expect(electricState.hidden).toBe(true);
  expect(electricState.dashed).toBe(true);
  expect(electricState.sparksScaledDown).toBe(true);
  expect(electricState.counts).toEqual({
    mainRise: 3,
    routes: 11,
    arcs: 4,
    sparks: 14,
    shimmer: 3,
  });
});

test("executa ignition da lampada antes da subida principal sem acender rotas cerebrais", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const samples: Array<{
      t: number;
      bulbFilter: string;
      bulbTransform: string;
      textFilter: string;
      textTransform: string;
      textOpacity: number;
      mainRiseOpacity: number;
      mainRiseDashoffset: number;
      primaryRoutesOpacity: number;
      secondaryRoutesOpacity: number;
      microRoutesOpacity: number;
      routesOpacity: number;
      arcsOpacity: number;
      sparksOpacity: number;
      shimmerOpacity: number;
      shimmerDashoffset: number;
    }> = [];
    let origin: number | null = null;

    const maxOpacity = (selector: string) =>
      Math.max(
        0,
        ...[...document.querySelectorAll(selector)].map((element) =>
          Number(window.getComputedStyle(element).opacity),
        ),
      );
    const firstDashoffset = (selector: string) => {
      const element = document.querySelector(selector);

      if (!element) {
        return 0;
      }

      return (
        Number.parseFloat(window.getComputedStyle(element).strokeDashoffset) ||
        0
      );
    };
    const collect = () => {
      const bulb = document.querySelector("#bulb");
      const text = document.querySelector("#text");

      if (!bulb || !text) {
        requestAnimationFrame(collect);
        return;
      }

      origin ??= performance.now();

      const styles = window.getComputedStyle(bulb);
      const textStyles = window.getComputedStyle(text);

      samples.push({
        t: performance.now() - origin,
        bulbFilter: styles.filter,
        bulbTransform: styles.transform,
        textFilter: textStyles.filter,
        textTransform: textStyles.transform,
        textOpacity: Number(textStyles.opacity),
        mainRiseOpacity: maxOpacity("#energy-main-rise path"),
        mainRiseDashoffset: firstDashoffset("#energy-main-rise path"),
        primaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="primary"]',
        ),
        secondaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="secondary"]',
        ),
        microRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="micro"]',
        ),
        routesOpacity: maxOpacity("#energy-routes path"),
        arcsOpacity: maxOpacity("#electric-arcs path"),
        sparksOpacity: maxOpacity("#spark-heads circle"),
        shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
        shimmerDashoffset: firstDashoffset("#text-shimmer-mask path"),
      });

      if (performance.now() - origin < 5600) {
        requestAnimationFrame(collect);
      }
    };

    requestAnimationFrame(collect);
    window.__niteM4Samples = samples;
  });
  await page.goto("/");
  await page.waitForTimeout(8000);

  const ignitionState = await page.evaluate(() => {
    const samples = window.__niteM4Samples ?? [];
    const firstSample = samples[0];
    const initialBulbFilter = firstSample?.bulbFilter ?? "";
    const initialBulbTransform = firstSample?.bulbTransform ?? "";
    const initialDashSample = samples.find(
      (sample) => sample.mainRiseDashoffset > 0,
    );
    const firstBulbChange = samples.find(
      (sample) =>
        sample.bulbFilter !== initialBulbFilter ||
        sample.bulbTransform !== initialBulbTransform,
    );
    const firstMainRiseVisible = samples.find(
      (sample) => sample.mainRiseOpacity > 0.08,
    );
    const firstRouteVisible = samples.find(
      (sample) => sample.routesOpacity > 0.08,
    );
    const finalDrawnSample = [...samples]
      .reverse()
      .find((sample) => sample.mainRiseOpacity > 0.08);
    const ignitionSamples = samples.filter(
      (sample) => sample.t <= (firstRouteVisible?.t ?? 950),
    );

    return {
      sampleCount: samples.length,
      firstBulbChangeAt: firstBulbChange?.t ?? null,
      firstMainRiseVisibleAt: firstMainRiseVisible?.t ?? null,
      firstRouteVisibleAt: firstRouteVisible?.t ?? null,
      mainRiseMaxOpacity: Math.max(
        0,
        ...samples.map((sample) => sample.mainRiseOpacity),
      ),
      dashoffsetMoved:
        Boolean(initialDashSample && finalDrawnSample) &&
        finalDrawnSample!.mainRiseDashoffset <
          initialDashSample!.mainRiseDashoffset,
      textShimmerStayedHiddenDuringIgnition: ignitionSamples.every(
        (sample) => sample.shimmerOpacity === 0,
      ),
    };
  });

  expect(ignitionState.sampleCount).toBeGreaterThan(10);
  expect(ignitionState.firstBulbChangeAt).not.toBeNull();
  expect(ignitionState.firstMainRiseVisibleAt).not.toBeNull();
  expect(ignitionState.firstRouteVisibleAt).not.toBeNull();
  expect(ignitionState.firstBulbChangeAt!).toBeLessThan(
    ignitionState.firstMainRiseVisibleAt!,
  );
  expect(
    ignitionState.firstMainRiseVisibleAt! - ignitionState.firstBulbChangeAt!,
  ).toBeGreaterThanOrEqual(100);
  expect(ignitionState.firstMainRiseVisibleAt!).toBeLessThan(
    ignitionState.firstRouteVisibleAt!,
  );
  expect(ignitionState.mainRiseMaxOpacity).toBeGreaterThan(0.7);
  expect(ignitionState.dashoffsetMoved).toBe(true);
  expect(ignitionState.textShimmerStayedHiddenDuringIgnition).toBe(true);
});

test("executa neural storm em grupos antes da ascensao do texto", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const samples: NiteAnimationSample[] = [];
    let origin: number | null = null;

    const maxOpacity = (selector: string) =>
      Math.max(
        0,
        ...[...document.querySelectorAll(selector)].map((element) =>
          Number(window.getComputedStyle(element).opacity),
        ),
      );
    const firstDashoffset = (selector: string) => {
      const element = document.querySelector(selector);

      if (!element) {
        return 0;
      }

      return (
        Number.parseFloat(window.getComputedStyle(element).strokeDashoffset) ||
        0
      );
    };
    const collect = () => {
      const bulb = document.querySelector("#bulb");
      const text = document.querySelector("#text");

      if (!bulb || !text) {
        requestAnimationFrame(collect);
        return;
      }

      origin ??= performance.now();

      const styles = window.getComputedStyle(bulb);
      const textStyles = window.getComputedStyle(text);

      samples.push({
        t: performance.now() - origin,
        bulbFilter: styles.filter,
        bulbTransform: styles.transform,
        textFilter: textStyles.filter,
        textTransform: textStyles.transform,
        textOpacity: Number(textStyles.opacity),
        mainRiseOpacity: maxOpacity("#energy-main-rise path"),
        mainRiseDashoffset: firstDashoffset("#energy-main-rise path"),
        primaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="primary"]',
        ),
        secondaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="secondary"]',
        ),
        microRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="micro"]',
        ),
        routesOpacity: maxOpacity("#energy-routes path"),
        arcsOpacity: maxOpacity("#electric-arcs path"),
        sparksOpacity: maxOpacity("#spark-heads circle"),
        shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
        shimmerDashoffset: firstDashoffset("#text-shimmer-mask path"),
      });

      if (performance.now() - origin < 7200) {
        requestAnimationFrame(collect);
      }
    };

    requestAnimationFrame(collect);
    window.__niteM4Samples = samples;
  });
  await page.goto("/");
  await page.waitForTimeout(9500);

  const neuralState = await page.evaluate(() => {
    const samples = window.__niteM4Samples ?? [];
    const firstAt = (key: keyof NiteAnimationSample, threshold: number) =>
      samples.find((sample) => Number(sample[key]) > threshold)?.t ?? null;
    const maxOf = (key: keyof NiteAnimationSample) =>
      Math.max(0, ...samples.map((sample) => Number(sample[key])));
    const lastActive = (key: keyof NiteAnimationSample, threshold: number) =>
      [...samples].reverse().find((sample) => Number(sample[key]) > threshold)
        ?.t ?? null;
    const firstSparkAt = firstAt("sparksOpacity", 0.08);
    const firstShimmerAt = firstAt("shimmerOpacity", 0.08);

    return {
      firstPrimaryAt: firstAt("primaryRoutesOpacity", 0.08),
      firstSecondaryAt: firstAt("secondaryRoutesOpacity", 0.08),
      firstMicroAt: firstAt("microRoutesOpacity", 0.08),
      firstArcAt: firstAt("arcsOpacity", 0.08),
      firstSparkAt,
      firstShimmerAt,
      primaryMax: maxOf("primaryRoutesOpacity"),
      secondaryMax: maxOf("secondaryRoutesOpacity"),
      microMax: maxOf("microRoutesOpacity"),
      arcsMax: maxOf("arcsOpacity"),
      sparksMax: maxOf("sparksOpacity"),
      microDuration:
        (lastActive("microRoutesOpacity", 0.5) ?? 0) -
        (firstAt("microRoutesOpacity", 0.5) ?? 0),
      afterglowSample: [...samples]
        .reverse()
        .find((sample) => sample.routesOpacity > 0),
      shimmerStayedHiddenBeforeSparks: samples
        .filter((sample) => sample.t < (firstSparkAt ?? 0))
        .every((sample) => sample.shimmerOpacity === 0),
    };
  });

  expect(neuralState.firstPrimaryAt).not.toBeNull();
  expect(neuralState.firstSecondaryAt).not.toBeNull();
  expect(neuralState.firstMicroAt).not.toBeNull();
  expect(neuralState.firstArcAt).not.toBeNull();
  expect(neuralState.firstSparkAt).not.toBeNull();
  expect(neuralState.firstPrimaryAt!).toBeLessThan(
    neuralState.firstSecondaryAt!,
  );
  expect(neuralState.firstSecondaryAt!).toBeLessThan(neuralState.firstMicroAt!);
  expect(neuralState.firstMicroAt!).toBeLessThan(neuralState.firstArcAt!);
  expect(neuralState.firstArcAt!).toBeLessThan(neuralState.firstSparkAt!);
  expect(neuralState.primaryMax).toBeGreaterThan(0.9);
  expect(neuralState.secondaryMax).toBeGreaterThan(0.7);
  expect(neuralState.microMax).toBeGreaterThan(0.55);
  expect(neuralState.arcsMax).toBeGreaterThan(0.75);
  expect(neuralState.sparksMax).toBeGreaterThan(0.85);
  expect(neuralState.microDuration).toBeLessThan(950);
  expect(neuralState.afterglowSample?.routesOpacity).toBeGreaterThan(0);
  expect(neuralState.afterglowSample?.routesOpacity).toBeLessThanOrEqual(0.32);
  expect(neuralState.firstShimmerAt).not.toBeNull();
  expect(neuralState.firstSparkAt!).toBeLessThan(neuralState.firstShimmerAt!);
  expect(
    neuralState.firstShimmerAt! - neuralState.firstSparkAt!,
  ).toBeGreaterThanOrEqual(250);
  expect(neuralState.shimmerStayedHiddenBeforeSparks).toBe(true);
});

test("executa NITE Ascension com shimmer, pico metalico e decaimento premium", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const samples: NiteAnimationSample[] = [];
    let origin: number | null = null;

    const maxOpacity = (selector: string) =>
      Math.max(
        0,
        ...[...document.querySelectorAll(selector)].map((element) =>
          Number(window.getComputedStyle(element).opacity),
        ),
      );
    const firstDashoffset = (selector: string) => {
      const element = document.querySelector(selector);

      if (!element) {
        return 0;
      }

      return (
        Number.parseFloat(window.getComputedStyle(element).strokeDashoffset) ||
        0
      );
    };
    const collect = () => {
      const bulb = document.querySelector("#bulb");
      const text = document.querySelector("#text");

      if (!bulb || !text) {
        requestAnimationFrame(collect);
        return;
      }

      origin ??= performance.now();

      const bulbStyles = window.getComputedStyle(bulb);
      const textStyles = window.getComputedStyle(text);

      samples.push({
        t: performance.now() - origin,
        bulbFilter: bulbStyles.filter,
        bulbTransform: bulbStyles.transform,
        textFilter: textStyles.filter,
        textTransform: textStyles.transform,
        textOpacity: Number(textStyles.opacity),
        mainRiseOpacity: maxOpacity("#energy-main-rise path"),
        mainRiseDashoffset: firstDashoffset("#energy-main-rise path"),
        primaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="primary"]',
        ),
        secondaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="secondary"]',
        ),
        microRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="micro"]',
        ),
        routesOpacity: maxOpacity("#energy-routes path"),
        arcsOpacity: maxOpacity("#electric-arcs path"),
        sparksOpacity: maxOpacity("#spark-heads circle"),
        shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
        shimmerDashoffset: firstDashoffset("#text-shimmer-mask path"),
      });

      if (performance.now() - origin < 6500) {
        requestAnimationFrame(collect);
      }
    };

    requestAnimationFrame(collect);
    window.__niteM4Samples = samples;
  });
  await page.goto("/");
  await page.waitForTimeout(8500);

  const ascensionState = await page.evaluate(() => {
    const samples = window.__niteM4Samples ?? [];
    if (samples.length === 0) {
      return {
        initialShimmerHidden: false,
        firstSparkAt: null,
        firstShimmerAt: null,
        shimmerActivationCount: 0,
        initialShimmerDashoffset: 0,
        minVisibleShimmerDashoffset: Number.POSITIVE_INFINITY,
        peakTextAt: null,
        peakTextBrightness: 1,
        finalTextBrightness: 1,
        finalShimmerOpacity: 1,
        textReceivesGlow: false,
        textLegible: false,
      };
    }

    const brightnessOf = (filter: string) => {
      const match = filter.match(/brightness\(([\d.]+)\)/);

      return match ? Number(match[1]) : 1;
    };
    const firstAt = (key: keyof NiteAnimationSample, threshold: number) =>
      samples.find((sample) => Number(sample[key]) > threshold)?.t ?? null;
    const firstSparkAt = firstAt("sparksOpacity", 0.08);
    const firstShimmerAt = firstAt("shimmerOpacity", 0.08);
    const shimmerVisibleSamples = samples.filter(
      (sample) => sample.shimmerOpacity > 0.1,
    );
    const peakTextSample = samples.reduce(
      (peak, sample) =>
        brightnessOf(sample.textFilter) > brightnessOf(peak.textFilter)
          ? sample
          : peak,
      samples[0],
    );
    const finalSample = samples[samples.length - 1];
    let shimmerActivationCount = 0;
    let shimmerWasActive = false;

    for (const sample of samples) {
      const shimmerIsActive = sample.shimmerOpacity > 0.08;

      if (shimmerIsActive && !shimmerWasActive) {
        shimmerActivationCount += 1;
      }

      shimmerWasActive = shimmerIsActive;
    }

    const text = document.querySelector("#text");
    const textBox = text?.getBoundingClientRect();

    return {
      initialShimmerHidden: samples
        .slice(0, 4)
        .every((sample) => sample.shimmerOpacity === 0),
      firstSparkAt,
      firstShimmerAt,
      shimmerActivationCount,
      initialShimmerDashoffset:
        samples.find((sample) => sample.shimmerDashoffset > 0)
          ?.shimmerDashoffset ?? 0,
      minVisibleShimmerDashoffset: Math.min(
        Number.POSITIVE_INFINITY,
        ...shimmerVisibleSamples.map((sample) => sample.shimmerDashoffset),
      ),
      peakTextAt: peakTextSample?.t ?? null,
      peakTextBrightness: brightnessOf(peakTextSample?.textFilter ?? "none"),
      finalTextBrightness: brightnessOf(finalSample?.textFilter ?? "none"),
      finalShimmerOpacity: finalSample?.shimmerOpacity ?? 1,
      textReceivesGlow: shimmerVisibleSamples.some((sample) =>
        sample.textFilter.includes("drop-shadow"),
      ),
      textLegible:
        Boolean(textBox && textBox.width > 0 && textBox.height > 0) &&
        (finalSample?.textOpacity ?? 0) > 0.98,
    };
  });

  expect(ascensionState.initialShimmerHidden).toBe(true);
  expect(ascensionState.firstSparkAt).not.toBeNull();
  expect(ascensionState.firstShimmerAt).not.toBeNull();
  expect(ascensionState.firstSparkAt!).toBeLessThan(
    ascensionState.firstShimmerAt!,
  );
  expect(ascensionState.initialShimmerDashoffset).toBeGreaterThan(0);
  expect(ascensionState.minVisibleShimmerDashoffset).toBeLessThan(
    ascensionState.initialShimmerDashoffset * 0.35,
  );
  expect(ascensionState.textReceivesGlow).toBe(true);
  expect(ascensionState.peakTextAt).not.toBeNull();
  expect(ascensionState.firstShimmerAt!).toBeLessThanOrEqual(
    ascensionState.peakTextAt!,
  );
  expect(ascensionState.peakTextBrightness).toBeGreaterThan(1.15);
  expect(ascensionState.finalTextBrightness).toBeGreaterThan(1.02);
  expect(ascensionState.finalTextBrightness).toBeLessThan(
    ascensionState.peakTextBrightness - 0.08,
  );
  expect(ascensionState.finalTextBrightness).toBeLessThan(1.09);
  expect(ascensionState.finalShimmerOpacity).toBeLessThan(0.04);
  expect(ascensionState.shimmerActivationCount).toBe(1);
  expect(ascensionState.textLegible).toBe(true);
});

test("executa Signature Pulse depois da intro sem repetir a tempestade", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const samples: NiteIdleSample[] = [];
    let origin: number | null = null;

    const opacities = (selector: string) =>
      [...document.querySelectorAll(selector)].map((element) =>
        Number(window.getComputedStyle(element).opacity),
      );
    const maxOpacity = (selector: string) =>
      Math.max(0, ...opacities(selector));
    const countAbove = (selector: string, threshold: number) =>
      opacities(selector).filter((opacity) => opacity > threshold).length;
    const collect = () => {
      const bulb = document.querySelector("#bulb");
      const brain = document.querySelector("#brain");
      const text = document.querySelector("#text");

      if (!bulb || !brain || !text) {
        requestAnimationFrame(collect);
        return;
      }

      origin ??= performance.now();

      samples.push({
        t: performance.now() - origin,
        bulbFilter: window.getComputedStyle(bulb).filter,
        brainFilter: window.getComputedStyle(brain).filter,
        textFilter: window.getComputedStyle(text).filter,
        mainRiseOpacity: maxOpacity("#energy-main-rise path"),
        primaryRoutesOpacity: maxOpacity(
          '#energy-routes path[data-route="primary"]',
        ),
        routesOpacity: maxOpacity("#energy-routes path"),
        arcsOpacity: maxOpacity("#electric-arcs path"),
        sparksOpacity: maxOpacity("#spark-heads circle"),
        shimmerOpacity: maxOpacity("#text-shimmer-mask path"),
        highArcCount: countAbove("#electric-arcs path", 0.28),
        highSparkCount: countAbove("#spark-heads circle", 0.26),
      });

      if (performance.now() - origin < 15500) {
        requestAnimationFrame(collect);
      }
    };

    requestAnimationFrame(collect);
    window.__niteM7Samples = samples;
  });
  await page.goto("/");
  await page.waitForTimeout(17500);

  const idleState = await page.evaluate(() => {
    const samples = window.__niteM7Samples ?? [];
    const brightnessOf = (filter: string) => {
      const match = filter.match(/brightness\(([\d.]+)\)/);

      return match ? Number(match[1]) : 1;
    };
    const activationCount = (
      list: NiteIdleSample[],
      key: "highArcCount" | "highSparkCount",
    ) => {
      let count = 0;
      let wasActive = false;

      for (const sample of list) {
        const isActive = sample[key] > 0;

        if (isActive && !wasActive) {
          count += 1;
        }

        wasActive = isActive;
      }

      return count;
    };
    const lastIntroShimmerAt =
      [...samples].reverse().find((sample) => sample.shimmerOpacity > 0.08)
        ?.t ?? null;
    const idleWindowStart = (lastIntroShimmerAt ?? 3600) + 600;
    const idleSamples = samples.filter((sample) => sample.t > idleWindowStart);
    const firstIdleArcAt =
      idleSamples.find((sample) => sample.highArcCount > 0)?.t ?? null;
    const firstIdleSparkAt =
      idleSamples.find((sample) => sample.highSparkCount > 0)?.t ?? null;
    const brainBrightness = idleSamples.map((sample) =>
      brightnessOf(sample.brainFilter),
    );
    const bulbBrightness = idleSamples.map((sample) =>
      brightnessOf(sample.bulbFilter),
    );
    const textBrightness = idleSamples.map((sample) =>
      brightnessOf(sample.textFilter),
    );
    const maxOf = (values: number[]) => Math.max(0, ...values);
    const minOf = (values: number[]) =>
      values.length > 0 ? Math.min(...values) : 0;
    const arcActiveSamples = idleSamples.filter(
      (sample) => sample.highArcCount > 0,
    );
    const sparkActiveSamples = idleSamples.filter(
      (sample) => sample.highSparkCount > 0,
    );

    return {
      sampleCount: samples.length,
      lastIntroShimmerAt,
      firstIdleArcAt,
      firstIdleSparkAt,
      idleStartsAfterIntro:
        lastIntroShimmerAt !== null &&
        firstIdleArcAt !== null &&
        firstIdleArcAt > lastIntroShimmerAt + 600,
      highMainRiseAfterIntro: idleSamples.some(
        (sample) => sample.mainRiseOpacity > 0.45,
      ),
      highPrimaryRoutesAfterIntro: idleSamples.some(
        (sample) => sample.primaryRoutesOpacity > 0.45,
      ),
      maxHighArcCount: maxOf(idleSamples.map((sample) => sample.highArcCount)),
      maxHighSparkCount: maxOf(
        idleSamples.map((sample) => sample.highSparkCount),
      ),
      arcActivationCount: activationCount(idleSamples, "highArcCount"),
      sparkActivationCount: activationCount(idleSamples, "highSparkCount"),
      arcDutyRatio: arcActiveSamples.length / Math.max(idleSamples.length, 1),
      sparkDutyRatio:
        sparkActiveSamples.length / Math.max(idleSamples.length, 1),
      brainBreathRange: maxOf(brainBrightness) - minOf(brainBrightness),
      bulbMinBrightness: minOf(bulbBrightness),
      textMaxBrightness: maxOf(textBrightness),
      shimmerActivatesInIdle: idleSamples.some(
        (sample) => sample.shimmerOpacity > 0.08,
      ),
    };
  });

  expect(idleState.sampleCount).toBeGreaterThan(120);
  expect(idleState.lastIntroShimmerAt).not.toBeNull();
  expect(idleState.firstIdleArcAt).not.toBeNull();
  expect(idleState.firstIdleSparkAt).not.toBeNull();
  expect(idleState.idleStartsAfterIntro).toBe(true);
  expect(idleState.highMainRiseAfterIntro).toBe(false);
  expect(idleState.highPrimaryRoutesAfterIntro).toBe(false);
  expect(idleState.maxHighArcCount).toBeLessThanOrEqual(2);
  expect(idleState.maxHighSparkCount).toBeLessThanOrEqual(3);
  expect(idleState.arcActivationCount).toBeGreaterThanOrEqual(2);
  expect(idleState.arcActivationCount).toBeLessThanOrEqual(4);
  expect(idleState.sparkActivationCount).toBeGreaterThanOrEqual(2);
  expect(idleState.sparkActivationCount).toBeLessThanOrEqual(4);
  expect(idleState.arcDutyRatio).toBeLessThan(0.12);
  expect(idleState.sparkDutyRatio).toBeLessThan(0.14);
  expect(idleState.brainBreathRange).toBeGreaterThan(0.015);
  expect(idleState.brainBreathRange).toBeLessThan(0.08);
  expect(idleState.bulbMinBrightness).toBeGreaterThan(1.06);
  expect(idleState.textMaxBrightness).toBeLessThan(1.09);
  expect(idleState.shimmerActivatesInIdle).toBe(false);
});

test("pausa e retoma o signature pulse por viewport sem reiniciar a intro", async ({
  page,
}) => {
  test.setTimeout(45000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForFunction(
    () =>
      document
        .querySelector(".animated-nite-logo")
        ?.getAttribute("data-nite-idle") === "running",
    undefined,
    { timeout: 12000 },
  );

  const visibleSamples = await collectNiteLifecycleSamples(page, 8200);

  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-viewport") === "hidden" &&
        root.getAttribute("data-nite-idle") === "paused"
      );
    },
    undefined,
    { timeout: 8000 },
  );

  const hiddenSamples = await collectNiteLifecycleSamples(page, 2200);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-viewport") === "visible" &&
        root.getAttribute("data-nite-idle") === "running"
      );
    },
    undefined,
    { timeout: 8000 },
  );

  const resumedSamples = await collectNiteLifecycleSamples(page, 8200);

  expect(
    visibleSamples.some(
      (sample) => sample.highArcCount > 0 || sample.highSparkCount > 0,
    ),
  ).toBe(true);
  expect(
    hiddenSamples.every(
      (sample) =>
        sample.lifecycleViewport === "hidden" &&
        sample.lifecycleIdle === "paused",
    ),
  ).toBe(true);
  expect(maxLifecycleValue(hiddenSamples, "highArcCount")).toBe(0);
  expect(maxLifecycleValue(hiddenSamples, "highSparkCount")).toBe(0);
  expect(
    resumedSamples.some(
      (sample) => sample.highArcCount > 0 || sample.highSparkCount > 0,
    ),
  ).toBe(true);
  expect(
    resumedSamples.every((sample) => sample.lifecycleIntro === "complete"),
  ).toBe(true);
  expect(maxLifecycleValue(resumedSamples, "mainRiseOpacity")).toBeLessThan(
    0.45,
  );
  expect(
    maxLifecycleValue(resumedSamples, "primaryRoutesOpacity"),
  ).toBeLessThan(0.45);
});

test("pausa e retoma timelines com document.hidden sem duplicar lifecycle", async ({
  page,
}) => {
  test.setTimeout(45000);
  const runtimeErrors: string[] = [];

  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForFunction(
    () =>
      document
        .querySelector(".animated-nite-logo")
        ?.getAttribute("data-nite-intro") === "running",
    undefined,
    { timeout: 5000 },
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-visibility") === "hidden" &&
        root.getAttribute("data-nite-intro") === "paused"
      );
    },
    undefined,
    { timeout: 5000 },
  );

  const hiddenIntroSamples = await collectNiteLifecycleSamples(page, 1100);

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () =>
      document
        .querySelector(".animated-nite-logo")
        ?.getAttribute("data-nite-idle") === "running",
    undefined,
    { timeout: 12000 },
  );

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-visibility") === "hidden" &&
        root.getAttribute("data-nite-idle") === "paused"
      );
    },
    undefined,
    { timeout: 5000 },
  );

  const hiddenIdleSamples = await collectNiteLifecycleSamples(page, 1400);

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => {
      const root = document.querySelector(".animated-nite-logo");

      return (
        root?.getAttribute("data-nite-visibility") === "visible" &&
        root.getAttribute("data-nite-idle") === "running"
      );
    },
    undefined,
    { timeout: 8000 },
  );

  const resumedIdleSamples = await collectNiteLifecycleSamples(page, 8200);
  const logoCount = await page.locator(".animated-nite-logo").count();

  expect(
    hiddenIntroSamples.every(
      (sample) =>
        sample.lifecycleVisibility === "hidden" &&
        sample.lifecycleIntro === "paused",
    ),
  ).toBe(true);
  expect(
    hiddenIdleSamples.every(
      (sample) =>
        sample.lifecycleVisibility === "hidden" &&
        sample.lifecycleIdle === "paused",
    ),
  ).toBe(true);
  expect(maxLifecycleValue(hiddenIdleSamples, "highArcCount")).toBe(0);
  expect(maxLifecycleValue(hiddenIdleSamples, "highSparkCount")).toBe(0);
  expect(
    resumedIdleSamples.some(
      (sample) => sample.highArcCount > 0 || sample.highSparkCount > 0,
    ),
  ).toBe(true);
  expect(logoCount).toBe(1);
  expect(runtimeErrors).toEqual([]);
});

test("abre uma pagina interna de projeto a partir do slug estruturado", async ({
  page,
}) => {
  await page.goto("/projetos/software-aplicado");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Software aplicado",
    }),
  ).toBeVisible();
  await expect(page.getByText("Dados do projeto")).toBeVisible();
  await expect(page.getByText("Status").first()).toBeVisible();
  await expect(page.getByText("Em estruturação").first()).toBeVisible();
  await expect(page.getByText("Mapeamento da frente").first()).toBeVisible();
  await expect(page.getByText("Problema e contexto")).toBeVisible();
  await expect(page.getByText("Público envolvido")).toBeVisible();
  await expect(page.getByText("Destaques")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Stack" })).toBeVisible();
  await expect(page.getByText("Entregável em validação").first()).toBeVisible();
  await expect(page.getByText("Evidências em estruturação")).toBeVisible();
  await expect(page.getByText("Equipe pública em validação")).toBeVisible();
  await expect(page.getByText("Changelog em estruturação")).toBeVisible();
  await expect(page.getByText("Galeria")).toBeVisible();
  await expect(page.getByText("Projetos relacionados")).toBeVisible();
});

test("trata slug inexistente sem quebrar a aplicacao", async ({ page }) => {
  await page.goto("/projetos/slug-inexistente");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Nao encontramos esse projeto.",
    }),
  ).toBeVisible();
});
