# Baseline tecnico - Milestone 3

Data/hora local: 2026-05-09T20:15:26-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Patch corretivo do Milestone 3 - refinamento da Hero Premium.

Regras respeitadas neste patch:

- A hero permanece em `components/sections/hero-section.tsx`.
- A `HeroSection` continua sem props, sem `focusProject` e sem consumo de dados de projeto.
- A hero usa a copy aprovada de eyebrow, H1, subheadline e CTAs.
- As microprovas abaixo dos CTAs foram removidas por decisao editorial.
- A hero nao exibe painel, dashboard, card novo, status operacional, categoria, stack, ultima atualizacao, proximo passo, badge demonstrativo ou texto de construcao.
- `AnimatedNiteLogo` permanece presente como apoio visual limpo, sem card, moldura ou interface ao redor.
- A base cromatica volta a perceber preto; o fundo da hero usa `bg-background` e o glow azul fica localizado no visual direito.
- `framer-motion` nao foi usado.
- Header, logo morph do M2, cards de projeto, timeline, schema, JSON de projetos, SEO/metadata, `logo_final.svg`, `AGENTS.md` e `specs_svg.md` nao foram alterados por este patch corretivo.
- O milestone foi validado por confirmacao humana explicita em 2026-05-09.

## Alteracoes tecnicas

- Atualizado `components/sections/hero-section.tsx` para remover o wash azul amplo, remover microprovas, ajustar grid, `gap`, largura das colunas, tamanho do H1, line-height e largura maxima do visual.
- Adicionado `data-hero-visual` para validar estruturalmente que a headline nao invade a coluna visual.
- Atualizado `tests/unit/home-page.test.tsx` para exigir ausencia das microprovas na hero.
- Atualizado `tests/e2e/home.spec.ts` para exigir ausencia das microprovas e validar gutter minimo entre H1 e area visual.
- Atualizado `specs_nite.md` somente no trecho do Milestone 3 para remover a obrigacao das microprovas.
- Atualizado este baseline com a decisao corretiva, resultados e screenshots.

## Comandos e resultados

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | `eslint .` sem erros. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |
| `npm run test:e2e` | Passou | Execucao final: 29 testes passaram. |

Observacoes de validacao:

- Uma execucao e2e inicial reutilizou servidor dev antigo na porta 3000 e falhou em hidratacao/animações do header/logo; o listener foi encerrado e a suite foi repetida.
- Apos o ajuste final de quebra da headline, uma execucao e2e intermediaria oscilou em testes cinematograficos antigos sob carga; a repeticao final de `npm run test:e2e` passou com 29/29.
- O e2e final manteve avisos ja fora do escopo deste patch:
  - Next.js recomendou `loading="eager"` para imagem LCP de projeto.
  - Motion avisou quando testes emularam `prefers-reduced-motion: reduce` no header do M2.

## Buscas de contrato

| Comando | Resultado |
|---|---:|
| `rg "framer-motion" app components tests package.json` | Passou, sem resultados. |
| `rg "motion/react" components app` | Passou; resultados existentes em `components/layout/site-header.tsx`, `components/ui/header-logo-morph.tsx` e `components/ui/reveal.tsx`. |
| `rg "Demonstrativo\|Em estruturação\|Em protótipo\|Status\|Categoria\|Stack\|Última atualização\|Próximo passo\|dashboard\|painel operacional\|Projetos aplicados\|Aprendizagem prática\|Tecnologia responsável" components/sections/hero-section.tsx` | Passou, sem resultados. |
| `rg "focusProject\|featuredProjects\|status\|technologies\|lastUpdated\|nextStep" components/sections/hero-section.tsx` | Passou, sem resultados. |

## Validacao visual

A ferramenta Browser do app continuou indisponivel para abrir Chrome:

```txt
async initializeServer: spawn UNKNOWN
```

Fallback usado:

- Servidor local em `http://127.0.0.1:3000`.
- Screenshots capturados com Playwright.

Screenshots locais:

```txt
artifacts/m3-corrective-desktop.png
artifacts/m3-corrective-mobile.png
```

Conferencias visuais:

- Desktop com fundo da hero em `rgb(3, 5, 7)`, equivalente ao preto base `#030507`.
- Desktop com headline em tres linhas:
  - `Tecnologia aplicada,`
  - `projetos reais e`
  - `aprendizagem em movimento.`
- Desktop com gutter medido de 53px entre o H1 e a area visual direita.
- Mobile sem scroll horizontal.
- Mobile com copy e CTAs antes do visual pesado.
- Hero sem microprovas, card, painel, dashboard, status ou dados de projeto.
- `AnimatedNiteLogo` continua presente como apoio visual integrado.

## Status final

- Patch corretivo do Milestone 3 implementado.
- Fundo preto preservado com glow azul apenas localizado no visual direito.
- Headline corrigida para nao invadir o logo.
- Microprovas removidas da hero e dos testes.
- Eyebrow aprovada preservada.
- Header do M2 preservado.
- `logo_final.svg` preservado.
- Hook cinematografico GSAP preservado; testes e2e do logo passaram na suite final.
- Milestone 3 aprovado em 2026-05-09 por confirmacao humana explicita.
