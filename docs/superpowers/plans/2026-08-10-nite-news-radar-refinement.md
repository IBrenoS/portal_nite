# Nite News Radar Refinement Implementation Plan

> **Status:** superado em 2026-08-10 pela direção de fidelidade geométrica à Resend. O contrato vigente usa dez órbitas circulares, canvas lógico da viewport e restaura o halo local; este arquivo permanece apenas como registro da iteração anterior.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar o Radar de Sinais NITE com cinco órbitas perceptíveis no desktop, luz restrita aos traços, cometas com velocidade orgânica e poeira reposicionada sem saltos visíveis.

**Architecture:** `NewsSignalCanvas` continua como a única ilha cliente e passa a controlar estados mutáveis de pulsos e poeira em memória, sem provocar renders React. A iluminação deixa de ser uma camada DOM e passa a ser uma segunda passagem de stroke no Canvas 2D, usando gradiente radial e glow apenas sobre as órbitas.

**Tech Stack:** Next.js 16, React 19, TypeScript estrito, Canvas 2D, Vitest e Playwright.

## Global Constraints

- Não adicionar dependências.
- Preservar o limite de 30 FPS, DPR máximo de 2, pausa fora da viewport e com aba oculta.
- `prefers-reduced-motion` deve produzir um frame completamente estático.
- Canvas e efeitos continuam decorativos e `aria-hidden`.
- Mobile mantém três órbitas; desktop usa seis órbitas lógicas para cinco linhas perceptíveis.
- Não alterar APIs, schemas ou ordenação de `@nite/content`.
- Não criar commit, branch ou push sem solicitação explícita.

---

### Task 1: Geometria e estados orgânicos

**Files:**

- Modify: `apps/web/src/components/news/news-signal-canvas.test.tsx`
- Modify: `apps/web/src/components/news/news-signal-canvas.tsx`

**Interfaces:**

- Produces: `createSignalOrbitLayout(width, height): SignalOrbit[]`
- Produces: `createSignalMotionProfiles(orbits, seed): SignalMotionProfile[]`
- Produces: `advanceSignalMotion(profile, deltaMs, elapsedMs): void`
- Produces: `advanceSignalDust(points, deltaMs, elapsedMs): void`

- [ ] **Step 1: Escrever testes falhando** para seis órbitas desktop, três mobile, distribuição de velocidades sem papel fixo por órbita, transições limitadas e reposicionamento da poeira somente quando invisível.
- [ ] **Step 2: Executar** `npm run test --workspace=@nite/web -- src/components/news/news-signal-canvas.test.tsx` e confirmar falhas causadas pelos contratos ausentes.
- [ ] **Step 3: Implementar o estado mínimo** com seed por sessão, velocidades-alvo entre `0.65` e `1.45`, transição amortecida, janelas independentes de `3500` a `9000` ms e poeira com fade antes da relocação.
- [ ] **Step 4: Reexecutar o teste direcionado** e confirmar ausência de warnings novos.

### Task 2: Luz restrita às órbitas

**Files:**

- Modify: `apps/web/src/components/news/news-hero.tsx`
- Modify: `apps/web/src/components/news/news-signal-canvas.tsx`
- Modify: `apps/web/src/app/globals.css`
- Modify: `apps/web/src/app/atualizacoes/page.test.tsx`

**Interfaces:**

- Consumes: estado de órbitas e pulsos da Task 1.
- Produces: uma passagem neutra de linha e uma passagem azul/ciano iluminada por gradiente radial inferior.

- [ ] **Step 1: Escrever teste falhando** exigindo a ausência do asset `projects-hero-light.png` e da camada `news-hero-signal-field` no Nite News, mantendo canvas, filtros e lead.
- [ ] **Step 2: Executar** `npm run test --workspace=@nite/web -- src/app/atualizacoes/page.test.tsx` e confirmar a falha contra a composição atual.
- [ ] **Step 3: Remover as duas camadas DOM** e desenhar a luz somente no stroke das órbitas com gradiente radial vindo do centro inferior, `shadowBlur` controlado e paleta dark/light via variáveis da `.newsPage`.
- [ ] **Step 4: Reexecutar os testes da página e do canvas** e confirmar o contrato estrutural.

### Task 3: QA visual, documentação e gate final

**Files:**

- Modify: `apps/web/e2e/visual/design-system.visual.spec.ts`
- Modify: `apps/web/e2e/visual/responsive-coverage.visual.spec.ts`
- Modify: snapshots de `/atualizacoes`
- Modify: `docs/product.md`
- Modify: `docs/design-system.md`

**Interfaces:**

- Consumes: cena final das Tasks 1 e 2.
- Produces: regressões automatizadas para motion, reduced motion, clipping, temas e ausência de campo retangular.

- [ ] **Step 1: Atualizar o Playwright** para verificar seis órbitas lógicas no desktop, fundo sem camada cromática DOM, frames diferentes em movimento, frame estático em reduced motion e pausa fora da viewport.
- [ ] **Step 2: Executar** `npm run test:visual -- --grep "updates -|news signal hero"` antes de atualizar snapshots e revisar as diferenças intencionais.
- [ ] **Step 3: Atualizar somente os quatro snapshots de `/atualizacoes`** e repetir o comando visual.
- [ ] **Step 4: Atualizar os contratos de produto e design system** para luz localizada, velocidades orgânicas e poeira mutável.
- [ ] **Step 5: Executar** `npm run check` uma vez na árvore final e `git diff --check`.
