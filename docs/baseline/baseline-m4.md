# Baseline tecnico - Milestone 4

Data/hora local: 2026-05-10T00:41:58-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Milestone 4 - Secao "O que o NITE constroi".

Regras respeitadas:

- A secao antiga "O que e o NITE" foi substituida por uma secao concreta de frentes e saidas do NITE.
- O `id="sobre"` foi preservado para manter o header validado.
- `BuildsSection` permanece Server Component.
- O reveal/stagger discreto ficou isolado em `components/sections/builds-cards-grid.tsx`, um client component pequeno.
- O fundo preto/grid aprovado foi preservado; nao houve wash azul amplo nem alteracao do background global.
- Os cards usam superficie escura, borda sutil e hover discreto.
- Os cards representam frentes e saidas do NITE, nao projetos, status, stack, metricas ou dados operacionais.
- Header, hero, projetos, timeline, schema, JSON, SEO/metadata, `AGENTS.md`, `specs_svg.md` e milestones aprovados nao foram alterados por este patch.
- O milestone nao foi marcado como aprovado; aguarda confirmacao humana explicita.

## Alteracoes tecnicas

- Criado `components/sections/builds-section.tsx`.
- Criado `components/sections/builds-cards-grid.tsx`.
- Atualizado `app/page.tsx` para renderizar `BuildsSection` no ponto da antiga secao `sobre`.
- Removido o array local `workFronts` e os tres cards antigos.
- Atualizado `tests/unit/home-page.test.tsx` para validar a nova secao, os seis cards, seis ocorrencias de `Saidas:` e ausencia dos textos antigos.
- Atualizado `tests/e2e/home.spec.ts` para validar a nova secao, responsividade mobile e ausencia de scroll horizontal.
- Atualizado `specs_nite.md` somente nas tasks do Milestone 4, sem declarar aprovacao.

## Conteudo implementado

Cards do M4:

- Software aplicado
- Dados e IA
- Robotica e prototipagem
- Experiencia digital
- Automacao e processos
- Oficinas e aprendizagem pratica

Cada card contem:

- titulo;
- descricao especifica;
- icone discreto;
- linha de saidas concretas.

## Comandos e resultados

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | `eslint .` sem erros. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |
| `npm run test:e2e` | Passou | Execucao final: 30 testes passaram. |

Observacoes de validacao:

- Uma primeira execucao e2e reutilizou servidor antigo na porta 3000 e falhou em testes de header/logo ja sensiveis a hidratacao. O listener antigo (`PID 26620`) foi encerrado e a suite foi repetida.
- A execucao final de `npm run test:e2e` iniciou ambiente limpo e passou com 30/30.
- Avisos remanescentes do e2e ficaram fora do escopo do M4:
  - Next.js recomendou `loading="eager"` para imagem LCP de projeto.
  - Motion avisou quando testes emularam `prefers-reduced-motion: reduce` no header do M2.

## Buscas de contrato

| Conferencia | Resultado |
|---|---:|
| `id="sobre"` preservado em `BuildsSection` | Passou. |
| Seis cards em `[data-builds-section]` | Passou. |
| Seis ocorrencias de `Saidas:` | Passou. |
| Textos antigos `Aprendizado aplicado`, `Tecnologia em pratica`, `Ponte institucional` | Ausentes. |
| Textos operacionais `Status`, `Stack`, `Ultima atualizacao`, `Proximo passo` na secao M4 | Ausentes. |

## Validacao visual

Screenshots locais:

```txt
artifacts/m4-builds-desktop.png
artifacts/m4-builds-mobile.png
```

Observacao: os screenshots da secao M4 foram capturados com o header oculto apenas no contexto de captura para evitar que o sticky header atravessasse a imagem da secao isolada.

Conferencias visuais:

- Desktop com grid de seis cards em duas linhas.
- Mobile com cards empilhados e sem scroll horizontal.
- Cards sobrios, com borda sutil, superficie escura e hover discreto.
- Fundo preto/grid preservado.
- Nenhum glow exagerado, tilt 3D, badge, status, stack, metrica ou dado operacional foi introduzido.

## Status final

- Milestone 4 implementado tecnicamente.
- Secao "O que o NITE constroi" substitui a antiga secao generica.
- Testes unitarios, build e e2e passaram.
- Milestone 4 aguarda confirmacao humana explicita para ser marcado como aprovado.
