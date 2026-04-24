import { expect, test } from "@playwright/test";

test("carrega a homepage com hardening M7", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /NITE transforma ideias em projetos/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("M7 - SEO, acessibilidade e performance").first()).toBeVisible();
  await expect(page.getByText("Um nucleo para tirar tecnologia do discurso e colocar em movimento.")).toBeVisible();
  await expect(page.getByText("Cards com cara de vitrine, sem perder rastreabilidade editorial.")).toBeVisible();
  await expect(page.getByText("A evolucao do NITE vira uma narrativa visual.")).toBeVisible();
  await expect(page.getByText("Marco demonstrativo: vitrine para comunidade")).toBeVisible();
  await expect(page.getByText("Quer acompanhar a evolucao do NITE?")).toBeVisible();
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
  const brandPanelBox = await page
    .getByText("Tech institucional premium")
    .locator("xpath=ancestor::div[contains(@class,'brand-panel')][1]")
    .boundingBox();

  expect(secondaryBox).not.toBeNull();
  expect(brandPanelBox).not.toBeNull();
  expect(secondaryBox!.y + secondaryBox!.height).toBeLessThanOrEqual(brandPanelBox!.y);
});

test("abre uma pagina interna de projeto a partir do slug estruturado", async ({ page }) => {
  await page.goto("/projetos/software-aplicado-demonstrativo");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Projeto demonstrativo: Software aplicado",
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
