---
target: "http://localhost:3000/oportunidades"
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-06-20T02-22-20Z
slug: app-oportunidades-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | The closed status is explicit once reached, but the hero CTA does not preframe that state. |
| 2 | Match System / Real World | 3 | Mostly plain institutional language; some internal phrasing like backend/formulario futuro leaks into user-facing copy. |
| 3 | User Control and Freedom | 2 | Navigation exists, but the main path funnels users into a closed state with limited alternatives. |
| 4 | Consistency and Standards | 2 | Footer labels imply actions/routes that do not match the page state, especially Como participar and Enviar curriculo. |
| 5 | Error Prevention | 3 | Strong honesty guardrails prevent fake applications, but some labels still imply unavailable actions. |
| 6 | Recognition Rather Than Recall | 3 | Main routes are visible, though Processos and Projetos cards read more like showcase cards than direct next steps. |
| 7 | Flexibility and Efficiency | 2 | Public page is simple, but there is no efficient path for notification, saved interest, or a clear return action. |
| 8 | Aesthetic and Minimalist Design | 2 | Clean, but card grids, gradient text, repeated policy copy, and clipped marquee make the page feel templated. |
| 9 | Error Recovery | 2 | The closed state gives context, but no strong recovery path beyond a generic contact action. |
| 10 | Help and Documentation | 3 | Como participar exists as a route and the page explains constraints, but route/copy hierarchy weakens it. |
| **Total** | | **25/40** | **Acceptable: solid baseline, but the primary journey needs correction.** |

## Anti-Patterns Verdict

**LLM assessment**: This does not look broken, but it does read more generic than the NITE system deserves. The strongest AI tells are gradient text on headline/subtitles, two oversized symmetric cards, a 3x3 benefits grid, and a marquee of repeated cards. The page is honest, but the emotional shape is weak: it opens with "Faca parte" and "Ver oportunidades", then spends most of the page explaining why there is nothing to do right now.

**Deterministic scan**: CLI scan on `app/oportunidades/page.tsx` returned `[]`. Browser overlay found 72 rendered findings: 3 `gradient-text`, 61 `ai-color-palette`, 7 `body-text-viewport-edge`, 1 `overused-font`. The `ai-color-palette` and `overused-font` counts are mostly false positives against NITE's committed cyan accent and Geist/Sora system. The gradient text findings are real. The viewport-edge findings point at the marquee; the horizontal overflow is intentional, but the first visible state is clipped enough to be a real UX issue.

**Visual overlays**: Overlay injection succeeded in the Browser tab named `[Human] Impeccable critique: oportunidades`; console reported the detector findings. The live-server used for injection was stopped after the overlay loaded.

## Overall Impression

The page is operationally honest and visually controlled, but it currently over-indexes on the absence of open processes. The biggest opportunity is to reframe `/oportunidades` as an entry point into participation, with the closed/open status as a clear module inside that journey instead of the emotional endpoint.

## What's Working

- The page refuses fake maturity: no invented vacancies, dates, criteria, or data collection.
- The main routes, `Como participar`, `Projetos`, `Contato`, and current status, are findable without hunting.
- Both light and dark themes render coherently, and the dark mode aligns better with the documented NITE identity.

## Priority Issues

### [P1] Primary promise leads to disappointment

**Why it matters**: `Faca parte do NITE` plus `Ver oportunidades` promises action. The destination is a closed-state block, so students hit an emotional dead end after the primary click.

**Fix**: Make the hero primary action `Como participar` or `Entender o fluxo`; make `Ver estado atual` the secondary action. Reframe the closed-state section as a transparent status panel, not the page's main payoff.

**Suggested command**: `$impeccable clarify http://localhost:3000/oportunidades`

### [P1] Footer actions contradict the honest-state policy

**Why it matters**: Footer links show `Como participar`, `Processos abertos`, and `Enviar curriculo`, but the DOM currently routes `Como participar` and `Enviar curriculo` back to `/oportunidades`. That implies actions the page explicitly says are not active.

**Fix**: Point `Como participar` to `/oportunidades/como-participar`; rename or remove `Enviar curriculo` until an actual submission flow exists; keep `Processos abertos` as the status route only if it lands on the status section.

**Suggested command**: `$impeccable polish http://localhost:3000/oportunidades`

### [P2] The page structure is too card-grid driven

**Why it matters**: Two giant cards, eight area labels, nine benefit cells, and moving cards create a common landing-page rhythm. It is clean, but not very specific to an institutional technology nucleus.

**Fix**: Collapse the benefits grid into 3-4 governing principles, then use one stronger NITE-specific participation narrative: status, preparation, route, contact. Let one visual system carry the page instead of several card patterns.

**Suggested command**: `$impeccable layout http://localhost:3000/oportunidades`

### [P2] Gradient text is a real slop signal here

**Why it matters**: The detector caught the H1 and card subtitles using `background-clip: text`. The local Impeccable rules ban gradient text because it reads decorative rather than meaningful.

**Fix**: Use solid text color for H1/subtitles. If the page needs a metallic feel, put the gradient into a surrounding surface, divider, icon treatment, or light sweep rather than the glyph fill.

**Suggested command**: `$impeccable typeset http://localhost:3000/oportunidades`

### [P2] Marquee is visually clipped and weak as guidance

**Why it matters**: On desktop and mobile, the principles marquee starts with cards partly offscreen. It looks accidental in screenshots and gives mobile users a moving, low-control reading surface near the end of a long page.

**Fix**: Replace with a static 4-item row/list or a scroll-snap strip with visible affordance. If motion stays, start with a complete card in view and keep reduced-motion as a readable static state.

**Suggested command**: `$impeccable adapt http://localhost:3000/oportunidades`

## Persona Red Flags

**Jordan (first-timer)**: Jordan clicks `Ver oportunidades` expecting a way to participate, then reaches `No momento, nao ha oportunidades abertas`. The copy explains honesty well, but the primary path creates confusion before it creates trust.

**Sam (accessibility-dependent)**: Sam gets many section-level headings from repeated cards and a moving marquee. The marquee's duplicated articles are partly hidden visually; even when duplicates are aria-hidden, the first readable set is not introduced by a strong visible heading.

**Casey (mobile)**: Casey has to scroll roughly 4,400px before the actual status block, then sees a clipped horizontal marquee. Footer links are small and several are below 44px tap height.

## Minor Observations

- Next.js logged that `/images/projetos/programacao-lab-card.png` was detected as LCP and should likely be `priority`/eager if it remains above the fold.
- Light mode is valid because theme follows system preference, but this page is noticeably less NITE-specific in light mode than dark mode.
- `Beneficios & garantias` is honest but sounds defensive; a more confident label could carry the same governance without explaining the absence so often.

## Questions to Consider

- What should the page optimize for when no process is open: preparing students, reporting status, or routing to projects?
- Which single promise should the first viewport make: participation, transparency, or current opportunities?
- Should the page keep a broad policy explanation, or should policy move into `Como participar` while `/oportunidades` stays lighter?
