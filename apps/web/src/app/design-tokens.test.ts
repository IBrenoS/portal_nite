import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const globalStyles = readFileSync(
  join(process.cwd(), "src", "app", "globals.css"),
  "utf8",
);
const sharedThemeStyles = readFileSync(
  fileURLToPath(import.meta.resolve("@nite/ui/theme.css")),
  "utf8",
);

describe("design tokens", () => {
  it("expõe as superfícies semânticas globais", () => {
    expect(sharedThemeStyles).toContain(
      "--color-nite-section: var(--nite-section);",
    );
    expect(sharedThemeStyles).toContain(
      "--color-nite-surface-elevated: var(--nite-surface-elevated);",
    );
    expect(sharedThemeStyles).toContain(
      "--color-nite-brand-primary: var(--nite-brand-primary);",
    );
  });

  it("mantém tokens locais das cenas de projetos e timeline", () => {
    expect(globalStyles).toContain(".projectsPage {");
    expect(globalStyles).toContain("--projects-hero-accent: #2dcfbf;");
    expect(globalStyles).toContain(".timeline-premium-section {");
    expect(globalStyles).toContain("--timeline-frame-background:");
  });

  it("mantém o wordmark sem superfície opaca", () => {
    expect(globalStyles).toContain(".nite-final-wordmark-image");
    expect(globalStyles).not.toContain(
      ".nite-final-wordmark-image {\n  background:",
    );
  });
});
