import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const urls = ["/", "/projetos/software-aplicado"] as const;

for (const url of urls) {
  test(`nao tem violacoes criticas de acessibilidade em ${url}`, async ({ page }) => {
    await page.goto(url);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const criticalViolations = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    expect(criticalViolations).toEqual([]);
  });
}
