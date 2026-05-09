# Baseline tecnico - Milestone 1

Data/hora local: 2026-05-09T00:55:12.4595240-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Milestone 1 - Design tokens e marca SVG.

Regras respeitadas:

- Nenhuma mudanca visual estrutural foi feita.
- O logo morph nao foi iniciado.
- `motion` continuou sem uso em componentes.
- `BrandMark` preservou a API atual (`className`, `priority`), mas `priority` nao e repassado ao DOM.
- `NiteSymbol` foi criado como SVG inline.
- `logo_final.svg` foi mantido otimizado porque o contrato do SVG/GSAP continuou passando.
- `AGENTS.md`, `specs_svg.md` e `specs_nite.md` nao foram alterados por esta execucao.
- O milestone nao foi marcado como concluido.

## Estado inicial relevante

```txt
git branch --show-current
main

git rev-parse --short HEAD
281a4dc

git status --short
 M AGENTS.md
 M specs_svg.md
?? specs_nite.md
```

As mudancas acima ja existiam antes da execucao deste milestone e ficaram fora do escopo.

## Auditoria inicial do SVG

Arquivo: `public/brand/nite/logo_final.svg`

```json
{
  "bytes": 675437,
  "viewBox": "0 0 690.261 1118.783",
  "ids": {
    "logo-final": true,
    "nite-logo": true,
    "bulb": true,
    "brain": true,
    "text": true,
    "energy-overlay": true,
    "text-shimmer-mask": true,
    "spark-heads": true,
    "electric-arcs": true,
    "energy-routes": true,
    "energy-main-rise": true
  },
  "counts": {
    "mainRise": 3,
    "routes": 11,
    "arcs": 4,
    "sparks": 14,
    "shimmer": 3,
    "overlays": 1
  }
}
```

## Otimizacao SVG

Comando usado:

```txt
npx svgo --config .\svgo.nite.config.mjs --input .\public\brand\nite\logo_final.svg --output .\public\brand\nite\logo_final.svg
```

Resultado:

- `svgo@4.0.1` foi usado via `npx`.
- A primeira execucao avisou que `removeViewBox` nao faz parte do preset default do SVGO 4.
- `svgo.nite.config.mjs` foi ajustado para remover esse override invalido.
- A validacao final com a config corrigida rodou sem warning.
- `svgo` nao foi adicionado como dependencia persistente (`npm ls svgo --depth=0` retornou vazio).

Tamanho final:

```json
{
  "bytes": 661433,
  "viewBox": "0 0 690.261 1118.783",
  "startsForAnimatedNiteLogo": true,
  "counts": {
    "mainRise": 3,
    "routes": 11,
    "arcs": 4,
    "sparks": 14,
    "shimmer": 3,
    "overlays": 1
  }
}
```

Observacao tecnica:

- O SVG otimizado foi ajustado para continuar iniciando com `<svg id="logo-final"`, porque `components/ui/animated-nite-logo.tsx` usa esse texto como ponto de injecao de acessibilidade.
- O contrato de IDs e contagens usado por `validateNiteSvgContract` foi preservado.

## Marca SVG compacta

- Criado `components/ui/nite-symbol.tsx` com SVG inline, `title` opcional e `aria-hidden` decorativo por padrao.
- Criado `public/brand/nite/nite-symbol.svg` como asset estatico de referencia.
- `components/ui/brand-mark.tsx` passou a renderizar `NiteSymbol`.
- `BrandMark` nao usa mais `next/image`.
- `BrandMark` nao usa mais `brandAssets.logoReference`.
- `biblioteca/brand.ts` agora expoe `logoFinalSvg` e `symbolSvg`, mantendo as referencias antigas apenas como referencias.

Verificacoes:

```txt
rg "motion/react|from ['\"]motion|from ['\"]motion/|import .*motion" app components biblioteca lib tests -S
sem resultados

rg "next/image|brandAssets\.logoReference|priority=|<Image" components\ui\brand-mark.tsx -n
sem resultados
```

## Tokens

`app/globals.css` foi atualizado com os tokens aprovados:

- background principal: `#03070D`
- surface escura: `#07111B`
- surface elevada: `#0B1622`
- foreground: `#F4F8FB`
- muted: `#8AA3B5`
- electric cyan: `#33D4FF`
- electric blue: `#299DFF`
- border cyan soft: `rgb(51 212 255 / 0.14)`
- glow cyan: `rgb(51 212 255 / 0.18)`
- motion: reveal `650ms`, micro `220ms`, medium `560ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`
- ranges: header collapse `96px`, parallax `6%` a `14%`

## Comandos e resultados

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | Primeiro apontou warning no config SVGO; apos ajuste, passou sem warnings. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |
| `npm ls motion gsap --depth=0` | Passou | `gsap@3.15.0` e `motion@12.38.0` instalados. |
| `npm ls svgo --depth=0` | Passou com exit 1 esperado | Confirmou que `svgo` nao ficou como dependencia do projeto. |

## Status final

- Header/footer deixam de depender indiretamente de PNG via `BrandMark`.
- Simbolo compacto esta pronto para o Milestone 2.
- Tokens visuais e de motion existem em CSS.
- Contrato GSAP do logo cinematografico foi preservado.
- Nenhum uso de `motion` foi introduzido em componentes.
- O Milestone 1 aguarda confirmacao humana explicita para ser marcado como concluido.

## Correcao pontual do Milestone 1

Data/hora local: 2026-05-09T01:10:26.0940093-03:00

Motivo:

- O resultado visual do Milestone 1 nao foi aprovado porque o fundo ficou azulado em relacao ao deploy atual.
- O header passou a renderizar simbolo circular, direcao que deixou de estar aprovada.
- A nova direcao aprovada e header textual inspirado na Anthropic, sem icone, imagem, PNG, SVG visual ou simbolo antes do texto.

Alteracoes da correcao:

- `app/globals.css`: restaurados os tokens globais e o `body background` aos valores anteriores do deploy (`#030507`, `#080c11`, `#030507`), mantendo tokens adicionais de motion/suporte sem alterar o fundo principal.
- `components/ui/brand-mark.tsx`: `BrandMark` passou a renderizar apenas `NITE` e `UNIJORGE` como marca textual; nao importa `next/image`, `NiteSymbol`, SVG ou imagem.
- `components/layout/site-header.tsx`: removida duplicacao textual do header para que `BrandMark` seja a unica marca exibida.
- `specs_nite.md`: Milestone 2 atualizado para especificar logo morph textual inspirado na Anthropic: expandido `NITE` + `UNIJORGE`, colapsado `N`, sem simbolo circular, imagem, PNG, SVG visual ou icone antes do texto.

Validacoes esperadas para esta correcao:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `rg "next/image" components/ui/brand-mark.tsx`
- `rg "NiteSymbol" components/ui/brand-mark.tsx components/layout/site-header.tsx`
- `rg "motion" components/ui/brand-mark.tsx components/layout/site-header.tsx`

Resultados executados:

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | Houve warning inicial por `_priority`; corrigido com `void _priority` e reexecutado sem warnings. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |
| `rg "next/image" components/ui/brand-mark.tsx` | Passou | Sem resultados. |
| `rg "NiteSymbol" components/ui/brand-mark.tsx components/layout/site-header.tsx` | Passou | Sem resultados. |
| `rg "motion" components/ui/brand-mark.tsx components/layout/site-header.tsx` | Passou | Sem resultados. |

Contrato GSAP apos a correcao:

```json
{
  "viewBox": "0 0 690.261 1118.783",
  "counts": {
    "mainRise": 3,
    "routes": 11,
    "arcs": 4,
    "sparks": 14,
    "shimmer": 3,
    "overlays": 1
  }
}
```

Screenshot local:

```txt
artifacts/correction-m1-header-hero.png
```

Observacao:

- Esta correcao nao inicia o Milestone 2, nao implementa logo morph e nao usa `motion` em componentes.
