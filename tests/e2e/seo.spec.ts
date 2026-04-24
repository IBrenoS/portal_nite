import { expect, test } from "@playwright/test";

test("expõe metadata, canonical e schema da home", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("NITE UNIJORGE | Inovação, tecnologia e projetos aplicados");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /NITE da UNIJORGE/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^http:\/\/localhost:3000\/?$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "http://localhost:3000/opengraph-image",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const jsonLd = await page.locator("#structured-data-home").textContent();
  expect(jsonLd).not.toBeNull();

  const parsed = JSON.parse(jsonLd!);
  expect(parsed["@graph"].map((entry: { "@type": string }) => entry["@type"])).toEqual(["Organization", "WebSite"]);
});

test("expoe robots, sitemap, manifest e imagem social", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toMatch(/Sitemap: http:\/\/localhost:3000\/sitemap.xml/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapXml = await sitemap.text();
  expect(sitemapXml).toContain("<loc>http://localhost:3000/</loc>");
  expect(sitemapXml).not.toContain("/projetos/software-aplicado");

  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBe(true);
  expect(await manifest.json()).toMatchObject({
    short_name: "NITE",
    start_url: "/",
  });

  const socialImage = await request.get("/opengraph-image");
  expect(socialImage.ok()).toBe(true);
  expect(socialImage.headers()["content-type"]).toContain("image/png");
});

test("preserva SEO seguro nas páginas provisórias de projeto", async ({ page }) => {
  await page.goto("/projetos/software-aplicado");

  await expect(page).toHaveTitle("Software aplicado em projetos do NITE | NITE");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000/projetos/software-aplicado",
  );

  const jsonLd = await page.locator("#structured-data-breadcrumb").textContent();
  expect(jsonLd).not.toBeNull();
  expect(JSON.parse(jsonLd!)["@type"]).toBe("BreadcrumbList");
});

test("redireciona slugs antigos para URLs limpas", async ({ page }) => {
  await page.goto("/projetos/software-aplicado-demonstrativo");

  await expect(page).toHaveURL(/\/projetos\/software-aplicado$/);
  await expect(page.getByRole("heading", { level: 1, name: "Software aplicado" })).toBeVisible();
});
