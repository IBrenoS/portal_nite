# Responsive Coverage and Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Portal NITE responsive coverage across ten representative viewports and fix the three confirmed layout failures without changing unrelated visual contracts.

**Architecture:** Add a data-driven Playwright structural sweep in a focused spec file, then use its route-and-viewport failures as regression tests for local Tailwind fixes. Keep expensive screenshots limited to the repaired and breakpoint-sensitive compositions, while the structural sweep covers every public route.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Playwright 1.60, Vitest 4.

## Global Constraints

- Cover 320 x 568, 360 x 640, 390 x 844, 430 x 932, 768 x 1024, 1024 x 768, 1280 x 720, 1366 x 768, 1440 x 1000, and 1920 x 1080.
- Sweep every public route in the design specification, using `/projetos/software-aplicado` and `/pessoas/breno-cerqueira` as stable dynamic representatives.
- Fix only responsive failures reproduced by browser evidence.
- Preserve current content, identity, routes, large-desktop composition, and existing 390px mobile composition.
- Keep intentional horizontal scrollers locally scrollable and exclude them from page-level clipping failures.
- Do not modify, stage, or commit the pre-existing deletion of `resend.md`.
- Follow red-green-refactor for every production change.

## File Structure

- Create `tests/visual/responsive-coverage.visual.spec.ts`: viewport matrix, public route matrix, browser error collection, clipping detection, navigation-mode assertions, and targeted screenshots.
- Modify `app/sobre/page.tsx`: allow the hero copy and actions to shrink at 320px and use a small-mobile heading size.
- Modify `app/oportunidades/como-participar/page.tsx`: constrain the final CTA heading to the small-mobile content width.
- Modify `app/contato/page.tsx`: delay the widest gap and non-wrapping title treatment until `xl`.

---

### Task 1: Add the structural responsive route sweep

**Files:**

- Create: `tests/visual/responsive-coverage.visual.spec.ts`

**Interfaces:**

- Consumes: the existing app at `http://localhost:3000` and stable public routes.
- Produces: `responsiveViewports`, `responsiveRoutes`, `openResponsivePage(page, route, viewport)`, and one Playwright test per route and viewport.

- [ ] **Step 1: Write the structural browser tests**

Create the viewport and route constants with stable names:

```ts
const responsiveViewports = [
  { name: "small-mobile", width: 320, height: 568, navigation: "mobile" },
  { name: "compact-mobile", width: 360, height: 640, navigation: "mobile" },
  { name: "standard-mobile", width: 390, height: 844, navigation: "mobile" },
  { name: "large-mobile", width: 430, height: 932, navigation: "mobile" },
  { name: "tablet-portrait", width: 768, height: 1024, navigation: "mobile" },
  { name: "tablet-landscape", width: 1024, height: 768, navigation: "desktop" },
  { name: "compact-desktop", width: 1280, height: 720, navigation: "desktop" },
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
  { name: "wide-desktop", width: 1920, height: 1080, navigation: "desktop" },
] as const;

const responsiveRoutes = [
  { name: "home", path: "/" },
  { name: "about", path: "/sobre" },
  { name: "projects", path: "/projetos" },
  { name: "project-detail", path: "/projetos/software-aplicado" },
  { name: "updates", path: "/atualizacoes" },
  { name: "people", path: "/pessoas" },
  { name: "person-profile", path: "/pessoas/breno-cerqueira" },
  { name: "opportunities", path: "/oportunidades" },
  { name: "how-to-participate", path: "/oportunidades/como-participar" },
  { name: "contact", path: "/contato" },
] as const;
```

For each combination, collect `pageerror` and console error messages before navigation, set reduced motion, wait for fonts and visible images, and assert:

```ts
expect(response?.status(), "route response").toBeLessThan(400);
expect(browserErrors, "browser errors").toEqual([]);
expect(
  layout.documentOverflow,
  "page-level horizontal overflow",
).toBeLessThanOrEqual(1);
expect(layout.clippedElements, "visible content outside viewport").toEqual([]);
expect(layout.headerOverflow, "header overflow").toBeLessThanOrEqual(1);
expect(layout.navigationMode).toBe(viewport.navigation);
```

The in-page measurement must inspect visible `main a`, `main button`, `main input`, `main textarea`, `main h1`, `main h2`, `main h3`, and `footer a`. Exclude an element only when an ancestor has computed `overflow-x` equal to `auto` or `scroll` and its `scrollWidth` is greater than its `clientWidth`.

- [ ] **Step 2: Run the structural tests and verify RED**

Run:

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "small-mobile|tablet-landscape"
```

Expected failures:

- `/sobre` at 320 x 568 reports its `h1` and hero actions outside the viewport.
- `/oportunidades/como-participar` at 320 x 568 reports “Leve seus sinais para oportunidades” outside the viewport.
- `/contato` at 1024 x 768 reports approximately 33px of page-level horizontal overflow.

- [ ] **Step 3: Commit the failing regression coverage**

```powershell
git add tests/visual/responsive-coverage.visual.spec.ts
git commit -m "test: amplia matriz responsiva"
```

---

### Task 2: Repair small-mobile content clipping

**Files:**

- Modify: `app/sobre/page.tsx:120-124`
- Modify: `app/oportunidades/como-participar/page.tsx:101-105`
- Test: `tests/visual/responsive-coverage.visual.spec.ts`

**Interfaces:**

- Consumes: the small-mobile structural cases created in Task 1.
- Produces: hero and CTA headings whose rendered bounds stay inside a 320px viewport.

- [ ] **Step 1: Re-run only the two small-mobile failures**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "small-mobile.*(about|how-to-participate)"
```

Expected: FAIL with the clipped heading/action evidence recorded in Task 1.

- [ ] **Step 2: Make the about hero shrink and scale at small-mobile widths**

In `app/sobre/page.tsx`, change the copy wrapper and heading classes to:

```tsx
<div className="min-w-0 max-w-[48rem]">
  <p className="font-mono text-xs uppercase tracking-[0.18em] text-nite-brand-accent">
    Sobre o NITE
  </p>
  <h1 className="mt-5 text-balance font-heading text-[2.25rem] font-semibold leading-[1.02] tracking-normal text-foreground min-[390px]:text-[clamp(2.75rem,7vw,5.45rem)]">
```

The existing action links remain full width on mobile; constraining the grid item makes those widths resolve against the actual content track.

- [ ] **Step 3: Constrain and scale the final opportunity CTA heading**

In `app/oportunidades/como-participar/page.tsx`, change the final CTA heading utility string to:

```tsx
"mb-2 w-full max-w-[14ch] text-center text-[2.5rem] leading-[120%] tracking-tighter min-[390px]:text-[3rem] md:text-[3.5rem]";
```

- [ ] **Step 4: Verify GREEN across small and large mobile widths**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "(small-mobile|compact-mobile|standard-mobile|large-mobile).*(about|how-to-participate)"
```

Expected: all eight route-and-viewport cases PASS with no clipped visible content.

- [ ] **Step 5: Commit the small-mobile fixes**

```powershell
git add app/sobre/page.tsx app/oportunidades/como-participar/page.tsx
git commit -m "fix: ajusta conteúdo em mobiles pequenos"
```

---

### Task 3: Repair contact overflow at the desktop boundary

**Files:**

- Modify: `app/contato/page.tsx:60-65`
- Test: `tests/visual/responsive-coverage.visual.spec.ts`

**Interfaces:**

- Consumes: the contact cases at 768, 1024, 1280, 1366, and 1440 widths.
- Produces: a contact layout that wraps at 1024 and preserves its wide title treatment from 1280 upward.

- [ ] **Step 1: Re-run the contact boundary failure**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "tablet-landscape.*contact"
```

Expected: FAIL with page-level horizontal overflow near 33px.

- [ ] **Step 2: Delay the widest gap and title constraints until `xl`**

Change the container classes in `app/contato/page.tsx` to:

```tsx
className =
  "flex max-w-4xl flex-col px-6 py-16 sm:flex-row sm:gap-8 sm:px-6 sm:py-48 md:max-w-7xl md:gap-36 lg:px-6 xl:gap-72";
```

Change the heading classes to:

```tsx
className =
  "nite-gradient-text mb-2 mt-2 text-balance pb-3 font-heading text-[4rem] font-normal leading-none tracking-normal md:text-[4.8rem] xl:w-max xl:max-w-[calc(100vw-3rem)] xl:whitespace-nowrap";
```

- [ ] **Step 3: Verify GREEN across the tablet and compact desktop boundary**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "(tablet-portrait|tablet-landscape|compact-desktop|university-desktop|standard-desktop).*contact"
```

Expected: all five cases PASS without page-level overflow or clipped controls.

- [ ] **Step 4: Commit the contact fix**

```powershell
git add app/contato/page.tsx
git commit -m "fix: estabiliza contato em desktops compactos"
```

---

### Task 4: Add targeted visual baselines and interaction boundaries

**Files:**

- Modify: `tests/visual/responsive-coverage.visual.spec.ts`
- Create: generated snapshots under `tests/visual/responsive-coverage.visual.spec.ts-snapshots/`

**Interfaces:**

- Consumes: `openResponsivePage`, responsive route data, and the repaired layouts from Tasks 2 and 3.
- Produces: eight focused screenshots plus breakpoint interaction checks.

- [ ] **Step 1: Add focused screenshot cases**

Add screenshots for these combinations in dark mode with reduced motion:

```ts
const visualCases = [
  { route: "/sobre", name: "about-small-mobile", width: 320, height: 568 },
  {
    route: "/oportunidades/como-participar",
    name: "how-to-small-mobile",
    width: 320,
    height: 568,
  },
  { route: "/", name: "home-tablet", width: 768, height: 1024 },
  { route: "/pessoas", name: "people-tablet", width: 768, height: 1024 },
  {
    route: "/contato",
    name: "contact-tablet-landscape",
    width: 1024,
    height: 768,
  },
  { route: "/", name: "home-compact-desktop", width: 1280, height: 720 },
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
```

Use `toHaveScreenshot(`${testCase.name}.png`, { animations: "disabled", fullPage: true })`.

- [ ] **Step 2: Verify the screenshot tests fail because baselines are absent**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "targeted responsive snapshots"
```

Expected: FAIL with missing snapshot baselines and actual images written to the Playwright output directory.

- [ ] **Step 3: Generate and review the new baselines**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "targeted responsive snapshots" --update-snapshots
```

Expected: eight screenshot cases PASS and eight PNG baselines are created. Inspect the generated contact, about, and how-to images first because they protect confirmed repairs.

- [ ] **Step 4: Add header boundary interaction checks**

At 768px, assert the Menu button opens the layered mobile dialog and focus remains inside it. At 1024px, assert the desktop navigation and theme control are visible, the Menu button is hidden, and focusing the first navigation trigger opens the mega menu without horizontal header overflow. At 1280px and 1366px, repeat the no-overflow and mega-menu visibility assertions.

- [ ] **Step 5: Run the focused visual and interaction group**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "targeted responsive snapshots|responsive navigation boundaries"
```

Expected: all targeted snapshots and navigation boundary tests PASS.

- [ ] **Step 6: Commit visual baselines and interactions**

```powershell
git add tests/visual/responsive-coverage.visual.spec.ts tests/visual/responsive-coverage.visual.spec.ts-snapshots
git commit -m "test: protege layouts responsivos críticos"
```

---

### Task 5: Run the complete verification chain

**Files:**

- Verify all files changed by Tasks 1-4.

**Interfaces:**

- Consumes: the completed responsive implementation.
- Produces: fresh evidence that responsive, unit, type, lint, formatting, and production-build contracts pass together.

- [ ] **Step 1: Run the complete responsive matrix**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts
```

Expected: all 100 structural combinations, eight screenshots, and navigation boundary tests PASS.

- [ ] **Step 2: Run existing visual coverage**

```powershell
npx playwright test tests/visual/design-system.visual.spec.ts
```

Expected: existing mobile and desktop snapshots and interactions PASS.

- [ ] **Step 3: Run repository validation**

```powershell
git diff --check
npm test
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Expected: every command exits with code 0.

- [ ] **Step 4: Audit the final scope**

```powershell
git status --short
git diff --stat HEAD~4..HEAD
git diff --name-status HEAD~4..HEAD
```

Expected: responsive tests, their snapshots, and the three scoped page files are the only implementation files; `resend.md` remains an unstaged pre-existing deletion.

---

### Task 6: Prevent projects hero collisions in short desktop viewports

**Files:**

- Modify: `tests/visual/responsive-coverage.visual.spec.ts`
- Modify: `app/projetos/page.tsx:62`
- Update: `tests/visual/responsive-coverage.visual.spec.ts-snapshots/projects-university-desktop-chromium-win32.png`

**Interfaces:**

- Consumes: `openResponsivePage` and the stable `/projetos` route from Task 1.
- Produces: a geometric clearance contract between the hero description and filter panel at 1280 x 600, 1280 x 720, 1280 x 800, and 1366 x 768.

- [ ] **Step 1: Write the failing geometric collision test**

Add a `projects hero compact desktop clearance` describe with these viewports:

```ts
const projectsCompactDesktopViewports = [
  { name: "very-short-desktop", width: 1280, height: 600 },
  { name: "short-desktop", width: 1280, height: 720 },
  { name: "reported-desktop", width: 1280, height: 800 },
  { name: "university-desktop", width: 1366, height: 768 },
] as const;
```

For each viewport, navigate to `/projetos`, measure the description bottom and panel top, and assert:

```ts
expect(
  measurements.panelTop - measurements.descriptionBottom,
  "clearance between hero description and filter panel",
).toBeGreaterThanOrEqual(24);
```

- [ ] **Step 2: Run the geometric test and verify RED**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "projects hero compact desktop clearance" --reporter=line
```

Expected: all four cases FAIL with negative clearance. The measured 1280 x 720 clearance is approximately -144px, 1280 x 800 is approximately -64px, and 1366 x 768 is approximately -96px.

- [ ] **Step 3: Establish the minimum desktop hero height**

In `app/projetos/page.tsx`, replace `md:min-h-0` with `md:min-h-[52.25rem]`:

```tsx
<div className="relative mt-0 flex h-[90vh] min-h-[34rem] w-full max-w-full flex-col items-center justify-center overflow-hidden pt-16 md:h-[calc(100vh-3.75rem)] md:min-h-[52.25rem]">
```

The 836px minimum comes from 258px copy offset + 276px rendered copy height + 32px clearance + 270px panel overlap. It preserves the existing composition and allows short viewports to scroll instead of collapsing layers.

- [ ] **Step 4: Verify GREEN across short and standard desktops**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "projects hero compact desktop clearance|compact-desktop projects|university-desktop projects|standard-desktop projects" --reporter=line
```

Expected: all geometric and structural project cases PASS with at least 24px clearance.

- [ ] **Step 5: Update and inspect only the affected projects baseline**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --grep "projects-university-desktop" --update-snapshots --reporter=line
```

Expected: one snapshot PASS; the description remains fully visible above the filter panel.

- [ ] **Step 6: Run verification and commit**

```powershell
npx playwright test tests/visual/responsive-coverage.visual.spec.ts --reporter=line
npm test
npm run typecheck
npm run lint
npm run build
git add app/projetos/page.tsx tests/visual/responsive-coverage.visual.spec.ts tests/visual/responsive-coverage.visual.spec.ts-snapshots/projects-university-desktop-chromium-win32.png docs/superpowers/plans/2026-07-11-responsive-coverage-hardening.md
git commit -m "fix: evita colisão no hero de projetos"
```
