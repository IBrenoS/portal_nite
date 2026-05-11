# Baseline tecnico - Milestone 2

Data/hora local: 2026-05-09T01:58:06-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Milestone 2 - Header premium com logo morph.

Regras respeitadas:

- Header mantido como `sticky top-0`; `fixed` nao foi usado.
- Logo morph implementado como marca textual, sem icone circular.
- Estado expandido: `NITE` + `UNIJORGE`.
- Estado colapsado: `N` textual.
- Textos visuais internos do morph usam `aria-hidden="true"`.
- Link da marca usa `aria-label="Ir para a página inicial do NITE UniJorge"`.
- O header/morph nao usa PNG, imagem, `<img>`, `next/image`, `NiteSymbol` ou SVG visual.
- `motion/react` foi usado somente no escopo do header/morph.
- Navegacao real atual preservada: `Sobre`, `Projetos`, `Timeline`, `Contato`.
- Comportamento mobile existente preservado; nenhuma nova arquitetura mobile foi criada.
- Hero, cards, timeline, projetos, CTAs de pagina, `AGENTS.md`, `specs_svg.md`, `logo_final.svg` e checkboxes de conclusao nao foram alterados.
- O milestone foi validado por confirmacao humana explicita em 2026-05-09.

## Alteracoes tecnicas

- Criado `components/ui/header-logo-morph.tsx`.
- Atualizado `components/layout/site-header.tsx` para client component com Motion.
- Header reorganizado com slot fixo de marca no desktop (`15rem`) para evitar deslocamento da navegacao.
- Blur/borda/fundo do header passam a reforcar o estado de scroll sem mudar layout.
- Reduced motion usa colapso textual simplificado.
- Testes unitarios e e2e atualizados para cobrir contrato ARIA, ausencia de imagem/SVG no header, sticky header, mobile e deslocamento maximo da navegacao.

## Comandos e resultados

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | Primeira execucao apontou `react-hooks/set-state-in-effect`; corrigido com hidratacao via `requestAnimationFrame` e reexecutado sem erros. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |
| `npm run test:e2e` | Passou | Execucao final: 28 testes passaram. |

Observacoes de e2e:

- Uma primeira execucao completa falhou porque havia um servidor dev anterior na porta 3000 servindo JS sem hidratacao correta; o processo local foi reiniciado e a validacao foi repetida.
- Uma execucao intermediaria apontou mismatch de hidratacao no header; o header foi ajustado para evitar estilos inline divergentes entre servidor e cliente.
- A execucao final de `npm run test:e2e` passou com 28/28.
- Avisos remanescentes do e2e ficaram fora do escopo do M2:
  - Next.js recomendou `loading="eager"` para imagem LCP de projeto.
  - Motion avisou quando testes emularam `prefers-reduced-motion: reduce`.

## Buscas de contrato

| Comando | Resultado |
|---|---:|
| `rg "next/image\|NiteSymbol\|<img\|<svg" components/layout/site-header.tsx components/ui/header-logo-morph.tsx` | Passou, sem resultados. |
| `rg "from ['\"]framer-motion\|framer-motion" .` | Passou, sem resultados em codigo-fonte do projeto. |
| `rg "motion/react" components app` | Passou; resultados apenas em `components/layout/site-header.tsx` e `components/ui/header-logo-morph.tsx`. |

## Validacao visual

Tentativa com a ferramenta Browser falhou antes de abrir o Chrome:

```txt
async initializeServer: spawn UNKNOWN
```

Fallback usado:

- Playwright via Node, contra servidor local `http://127.0.0.1:3000`.
- Servidor dev iniciado temporariamente e encerrado apos capturas.

Resultados medidos:

```json
{
  "topState": "expanded",
  "collapsedState": "collapsed",
  "navShiftPx": 0,
  "topNavX": 721.578125,
  "collapsedNavX": 721.578125,
  "mobileState": {
    "height": 65,
    "position": "sticky",
    "navDisplay": "none",
    "hasHorizontalScroll": false
  }
}
```

Screenshots locais:

```txt
artifacts/m2-header-top.png
artifacts/m2-header-collapsed.png
artifacts/m2-header-mobile.png
```

## Status final

- Header textual premium implementado.
- Logo morph textual funcionando no scroll.
- Navegacao nao deslocou horizontalmente (`0px`, limite aprovado: `2px`).
- Mobile segue sem nav nova e sem scroll horizontal.
- GSAP permaneceu integro: testes cinematograficos do logo passaram na suite e2e final.
- Milestone 2 aprovado em 2026-05-09 por confirmacao humana explicita.
