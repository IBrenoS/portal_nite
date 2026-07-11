# Responsive Coverage and Hardening Design

## Context

The Portal NITE visual suite currently concentrates coverage at 390 x 844 and
1440 x 1000. Those endpoints represent a common mobile layout and a comfortable
desktop layout, but they leave tablets, compact desktops, short desktop
viewports, and smaller or wider phones underprotected.

This work expands the responsive contract and fixes failures exposed by the new
coverage. It is intentionally limited to responsive behavior; it does not
redesign the product, change content, or introduce unrelated abstractions.

## Goals

- Protect the public product across representative mobile, tablet, compact
  desktop, standard desktop, and wide desktop viewports.
- Reproduce the compact university-computer scenario, with special attention to
  1024 x 768, 1280 x 720, and 1366 x 768.
- Detect horizontal overflow, clipped or off-screen content, visible collisions,
  browser errors, hydration failures, and incorrect navigation modes.
- Correct each confirmed responsive failure with the smallest local change that
  preserves the current design system and established large-desktop and mobile
  behavior.
- Keep the visual suite useful without multiplying full-page snapshots across
  every route and viewport combination.

## Non-goals

- Reworking the visual identity, page copy, information architecture, or routes.
- Replacing Tailwind breakpoints or creating a second responsive design system.
- Guaranteeing a layout for every physical screen size or named device model.
- Snapshotting every route at every viewport.
- Changing unrelated existing worktree changes, including the deleted
  `resend.md` file.

## Responsive Matrix

The matrix uses CSS viewport dimensions rather than physical monitor inches or
device brands.

| Category              | Viewport    |
| --------------------- | ----------- |
| Small mobile          | 320 x 568   |
| Compact mobile        | 360 x 640   |
| Standard mobile       | 390 x 844   |
| Large mobile          | 430 x 932   |
| Portrait tablet       | 768 x 1024  |
| Landscape tablet      | 1024 x 768  |
| Short compact desktop | 1280 x 720  |
| University desktop    | 1366 x 768  |
| Standard desktop      | 1440 x 1000 |
| Wide desktop          | 1920 x 1080 |

The matrix represents layout pressure points. Operating-system scaling and
browser zoom are modeled through the smaller effective CSS viewports instead of
device-specific emulation.

## Coverage Architecture

### Layer 1: Structural route sweep

Every public route is checked at the representative viewport matrix in one
theme. Dynamic routes use stable representative records.

Routes in scope:

- `/`
- `/sobre`
- `/projetos`
- one stable `/projetos/[slug]` route
- `/atualizacoes`
- `/pessoas`
- one stable `/pessoas/[slug]` route
- `/oportunidades`
- `/oportunidades/como-participar`
- `/contato`

The sweep asserts:

- document width does not exceed the viewport width;
- meaningful visible elements do not extend beyond the horizontal viewport;
- no page-level element creates accidental clipping or an unexpected horizontal
  scroll region;
- page navigation completes without uncaught page errors, console errors, or
  hydration errors;
- the expected mobile or desktop header control is visible for the active
  breakpoint.

Intentional horizontal scrollers, such as carousels and tab strips, remain
allowed when their scroll behavior is locally contained.

### Layer 2: Targeted visual coverage

Full-page screenshots remain limited to high-value combinations:

- the existing 390 x 844 mobile and 1440 x 1000 desktop baselines;
- 320 x 568 for small-mobile pressure on the home and high-density routes;
- 768 x 1024 for tablet layouts;
- 1024 x 768 for breakpoint-boundary behavior;
- 1280 x 720 and 1366 x 768 for compact and short desktops.

Critical routes are the home, projects catalog, representative project detail,
people directory, representative person profile, opportunities, and contact.
Snapshots are added only when they protect a meaningful composition that cannot
be expressed reliably through structural assertions.

### Layer 3: Responsive interaction contracts

Interactive checks cover the components whose behavior changes by viewport:

- desktop mega menu and theme control;
- mobile layered navigation and focus containment;
- project filters and search controls;
- people search dialog;
- horizontally scrolling cards or tabs;
- contact and opportunity forms where present.

The checks assert visibility, operability, focus behavior, and absence of
clipping at their relevant layout boundaries.

## Failure and Fix Workflow

Responsive fixes follow test-driven development:

1. Add or isolate a test that fails because of the observed responsive defect.
2. Confirm the failure message describes the missing contract rather than a test
   setup problem.
3. Apply the smallest production change that resolves the defect.
4. Re-run the focused test and the neighboring viewport cases.
5. Run the complete responsive sweep and existing validation chain.

Preferred fixes use existing containers, Tailwind responsive utilities, fluid
dimensions, wrapping, `min-width: 0`, and locally contained overflow. New global
tokens or breakpoints are introduced only if repeated evidence shows the current
contract cannot express the required behavior.

The 1024px header transition is treated as a hypothesis, not a predetermined
fix. Its breakpoint changes only if browser measurements demonstrate that the
desktop navigation cannot fit consistently at that width.

## Test Organization and Runtime

The structural matrix is data-driven so route and viewport coverage remains
easy to audit. Expensive screenshots and interactions are kept in focused
describes rather than repeated in the entire matrix. Tests use reduced motion,
wait for fonts and visible images, and suppress the Next.js development portal
as the existing suite already does.

Failures should report route and viewport in the test title. Browser console and
page errors are collected per navigation and surfaced with their original
messages. The suite must not hide application errors to stabilize screenshots.

## Acceptance Criteria

1. All listed public routes complete the structural sweep at all ten viewports.
2. No tested route has accidental page-level horizontal overflow.
3. Visible primary content, navigation, controls, and footer content remain
   within the horizontal viewport.
4. Mobile and desktop navigation modes remain operable at breakpoint boundaries.
5. Critical routes have targeted visual protection for small mobile, tablet, and
   compact desktop layouts without a full Cartesian snapshot matrix.
6. Confirmed responsive defects found by the new matrix are fixed and protected
   by tests that failed before their production changes.
7. Existing 390px mobile and 1440px desktop contracts remain valid.
8. Unit tests, typecheck, lint, production build, and the relevant Playwright
   suite pass.
9. The pre-existing deletion of `resend.md` remains untouched and excluded from
   responsive commits.
