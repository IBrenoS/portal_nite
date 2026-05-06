import { expect, test } from "@playwright/test";

test("carrega a home pública sem rótulos internos", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /NITE transforma ideias em projetos/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("M7 - SEO, acessibilidade e performance")).toHaveCount(0);
  await expect(page.getByText("Landing institucional")).toHaveCount(0);
  await expect(page.getByText("Um núcleo para tirar tecnologia do discurso e colocar em movimento.")).toBeVisible();
  await expect(page.getByText("Projetos em destaque para explorar tecnologia em movimento.")).toBeVisible();
  await expect(page.getByText("A evolução do NITE em uma narrativa visual.")).toBeVisible();
  await expect(page.getByText("Vitrine para a comunidade")).toBeVisible();
  await expect(page.getByText("Quer acompanhar a evolução do NITE?")).toBeVisible();
  await expect(page.getByRole("link", { name: "Acompanhar o NITE no Instagram" }).first()).toHaveText(/@nite\.uj/);
});

test("mantem layout mobile sem scroll horizontal e com alvos de toque acessiveis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalScroll).toBe(false);

  const primaryCta = page.getByRole("link", { name: /ver projetos/i });
  const secondaryCta = page.getByRole("link", { name: /conhecer o nite/i });

  await expect(primaryCta).toBeVisible();
  await expect(secondaryCta).toBeVisible();

  for (const target of [primaryCta, secondaryCta]) {
    const box = await target.boundingBox();

    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }

  const secondaryBox = await secondaryCta.boundingBox();
  const logoBox = await page.locator("#logo-final").boundingBox();

  expect(secondaryBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(secondaryBox!.y + secondaryBox!.height).toBeLessThanOrEqual(logoBox!.y);
});

test("mantem o hero responsivo, decorativo e navegavel por teclado", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");

  const heroState = await page.evaluate(() => {
    const logo = document.querySelector("#logo-final");
    const logoBox = logo?.getBoundingClientRect();
    const primaryCta = [...document.querySelectorAll("a")].find((link) => link.textContent?.includes("Ver projetos"));
    const secondaryCta = [...document.querySelectorAll("a")].find((link) =>
      link.textContent?.includes("Conhecer o NITE"),
    );

    return {
      logoVisible: Boolean(logoBox && logoBox.width > 0 && logoBox.height > 0),
      logoOutsidePanel: !logo?.closest(".brand-panel"),
      logoDecorative: logo?.closest(".animated-nite-logo")?.getAttribute("aria-hidden") === "true",
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
      primaryText: primaryCta?.textContent ?? "",
      secondaryText: secondaryCta?.textContent ?? "",
    };
  });

  expect(heroState).toMatchObject({
    logoVisible: true,
    logoOutsidePanel: true,
    logoDecorative: true,
    hasHorizontalScroll: false,
  });
  expect(heroState.primaryText).toMatch(/Ver projetos/);
  expect(heroState.secondaryText).toMatch(/Conhecer o NITE/);

  const primaryCta = page.getByRole("link", { name: /ver projetos/i }).first();

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");

    if (await primaryCta.evaluate((element) => document.activeElement === element)) {
      break;
    }
  }

  await expect(primaryCta).toBeFocused();
});

test("respeita prefers-reduced-motion sem esconder ou deslocar o logo", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const before = await page.locator("#logo-final").boundingBox();
  await page.waitForTimeout(1200);
  const after = await page.locator("#logo-final").boundingBox();
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
});

test("abre uma pagina interna de projeto a partir do slug estruturado", async ({ page }) => {
  await page.goto("/projetos/software-aplicado");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Software aplicado",
    }),
  ).toBeVisible();
  await expect(page.getByText("Dados do projeto")).toBeVisible();
  await expect(page.getByText("Destaques")).toBeVisible();
  await expect(page.getByText("Galeria")).toBeVisible();
  await expect(page.getByText("Projetos relacionados")).toBeVisible();
});

test("trata slug inexistente sem quebrar a aplicacao", async ({ page }) => {
  await page.goto("/projetos/slug-inexistente");

  await expect(page.getByRole("heading", { level: 1, name: "Nao encontramos esse projeto." })).toBeVisible();
});
