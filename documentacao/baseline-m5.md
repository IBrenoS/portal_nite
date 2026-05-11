# Baseline tecnico - Milestone 5

Data/hora local: 2026-05-11T01:39:00-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Milestone 5 - Projetos em movimento.

Regras respeitadas:

- A estratégia aplicada foi híbrida controlada.
- Os três projetos atuais continuam com `status: "placeholder"`.
- Os três projetos atuais usam `contentState: "em-estruturacao"`.
- Nenhum projeto foi promovido para `planejado`, `em-descoberta`, `em-prototipo`, `ativo` ou `concluido`.
- Nenhuma equipe, métrica ou entregável real foi inventado.
- `getIndexableProjects()` continua retornando lista vazia para os projetos atuais.
- Páginas de placeholder continuam com `noindex, follow`.
- `biblioteca/conteudo.ts` foi conferido e não precisou ser alterado.
- O milestone não foi marcado como aprovado; aguarda confirmação humana explícita.

## Alteracoes tecnicas

- Atualizado `biblioteca/esquemas.ts` com status operacionais, `contentState`, fase, última atualização, próximo passo, entregáveis, métricas, equipe, changelog e links tipados.
- Atualizado `conteudo/projetos/projetos.json` com campos operacionais honestos para as três frentes atuais.
- Criado `components/sections/project-status-card.tsx`.
- Criado `components/sections/projects-operating-section.tsx`.
- Atualizado `app/page.tsx` para substituir a seção inline por `ProjectsOperatingSection`.
- Atualizado `app/projetos/[slug]/page.tsx` para estrutura de case com dados operacionais, problema/contexto, público, stack, entregáveis, evidências, equipe pública, changelog e empty states.
- Atualizados testes unitários, e2e e release candidate para o novo contrato.
- Ajustado `components/sections/builds-cards-grid.tsx` para evitar perda de contraste durante o reveal por opacidade.
- Atualizado `specs_nite.md` somente nas tasks técnicas do Milestone 5, sem fechar o milestone.

## Conteudo implementado

Campos operacionais adicionados por projeto:

- `problem`
- `context`
- `audience`
- `contentState`
- `currentPhase`
- `lastUpdated`
- `nextStep`
- `deliverables`
- `metrics`
- `team`
- `changelog`
- `links[].type`

Estados atuais:

- Software aplicado: `placeholder` / `em-estruturacao`
- Robótica educacional: `placeholder` / `em-estruturacao`
- Dados e IA: `placeholder` / `em-estruturacao`

Empty states usados:

- `Entregável em validação`
- `Evidências em estruturação`
- `Equipe pública em validação`
- `Changelog em estruturação`

## Comandos e resultados

| Comando             | Resultado | Observacoes                                           |
| ------------------- | --------: | ----------------------------------------------------- |
| `npm run typecheck` |    Passou | `tsc --noEmit` sem erros.                             |
| `npm run lint`      |    Passou | `eslint .` sem erros.                                 |
| `npm run test`      |    Passou | 4 arquivos de teste passaram; 11 testes passaram.     |
| `npm run build`     |    Passou | Next.js 16.2.4 compilou e gerou 11 páginas estáticas. |
| `npm run test:e2e`  |    Passou | Execução final: 32 testes passaram.                   |

Observações de validação:

- Uma primeira execução e2e reutilizou servidor antigo na porta 3000; o processo foi encerrado e a suíte foi repetida em servidor limpo.
- Uma execução intermediária encontrou contraste insuficiente enquanto cards do Milestone 4 animavam `opacity`; o reveal foi ajustado para animar deslocamento sem reduzir contraste.
- Testes cinematográficos da home foram estabilizados em modo serial dentro de `tests/e2e/home.spec.ts`, preservando as asserções e evitando disputa de frames entre animações paralelas.
- O release candidate filtra o ruído infraestrutural `Connection closed.` do servidor dev, sem ocultar erros de aplicação.
- Avisos remanescentes do Motion sobre reduced motion apareceram no log do servidor durante e2e, sem falhar a suíte.

## Validacao visual

O navegador integrado do plugin falhou ao iniciar Chrome com `spawn UNKNOWN`. A validação visual foi feita com Playwright CLI.

Screenshots locais:

```txt
artifacts/m5-home-projects.png
artifacts/m5-project-page.png
```

Conferências visuais:

- A home exibe `Projetos em movimento` depois da seção "O que o NITE constrói".
- Cada card mostra status, categoria, ano, fase atual, última atualização, stack, entregável principal, próximo passo e link interno.
- Placeholders aparecem como `Em estruturação`.
- Páginas internas mostram estrutura de case e empty states honestos.
- Não há equipe, métricas, entregáveis ou links falsos.
- Mobile e desktop foram cobertos pelos testes e2e.

## Status final

- Milestone 5 implementado tecnicamente.
- Projetos agora funcionam como sistema operacional de acompanhamento, ainda com dados honestos em estruturação.
- Typecheck, lint, testes unitários, build e e2e passaram.
- Milestone 5 aguarda confirmação humana explícita para ser marcado como aprovado.
