# Arquitetura do Portal NITE

## Visão geral

O Portal NITE é um monorepo npm com uma aplicação Next.js responsiva e um package source-only de conteúdo. Desktop e mobile compartilham a mesma aplicação e os mesmos contratos; não há um app mobile separado.

```text
portal-nite
├── apps
│   └── web
│       ├── e2e/visual
│       ├── public
│       └── src
│           ├── app
│           ├── components
│           └── lib
├── packages
│   └── content
│       ├── data
│       └── src
└── docs
    └── specs
```

Turbo executa tarefas por workspace e reutiliza resultados quando entradas e configuração não mudam. O npm mantém um único `package-lock.json` na raiz.

## Limites dos workspaces

### `@nite/web`

Contém rotas, metadata, redirects, headers, componentes, tema, SEO, navegação, assets públicos e testes visuais. O alias `@/*` aponta exclusivamente para `apps/web/src/*`.

Configurações de Next.js, PostCSS, shadcn, Vitest e Playwright pertencem ao workspace web porque não têm consumidores fora da aplicação.

### `@nite/content`

Contém os JSONs canônicos, schemas Zod, tipos derivados e consultas de leitura. É um package privado e source-only, transpilado pelo Next.js, sem etapa própria de publicação ou build.

A entrada `@nite/content` expõe:

- `Project`, `Person`, `PersonEntryCategory` e `TimelineEvent`;
- schemas e valores compartilhados;
- consultas de projetos, pessoas e linha do tempo.

`src/index.ts` é a única API pública. Imports como `@nite/content/*` e caminhos físicos entre `apps/` e `packages/` são proibidos pelo ESLint. Uma mudança nessa API exige typecheck e testes dos dois workspaces.

## Fluxo de conteúdo

```text
packages/content/data/*.json
        ↓ validação Zod
packages/content/src/repository.ts
        ↓ API pública
        @nite/content
        ↓
apps/web/src/app e components
```

Filtragem editorial, autorização de perfis, ordenação e resolução por slug permanecem no package de conteúdo. Componentes web recebem dados já tipados e não acessam JSONs diretamente.

## Estratégia de testes

- Testes unitários ficam ao lado da página, componente ou módulo que validam.
- Testes do conteúdo usam ambiente Node em `packages/content`.
- Vitest permite paralelismo entre arquivos com no máximo quatro workers.
- Playwright e snapshots ficam em `apps/web/e2e/visual` e são executados manualmente.
- `npm run test:affected` usa o grafo do Turbo para limitar testes aos workspaces afetados.
- `npm run check:deadcode` impede que arquivos, exports ou dependências sem uso permaneçam no monorepo.

O fluxo normal usa testes dirigidos durante a implementação e `npm run check` no encerramento. A suíte visual completa deve ser reservada para checkpoints que possam alterar renderização ou para a validação final.

## Regras de evolução

- Criar um novo package somente quando houver um limite de domínio estável ou mais de um consumidor real.
- Manter UI, configurações e integrações específicas dentro do workspace consumidor.
- Não criar `packages/ui`, `packages/config` ou um app mobile apenas para antecipar reutilização.
- Preservar URLs públicas e contratos de conteúdo ao reorganizar diretórios.
- Manter specs ainda não implementadas em `docs/specs/`; decisões duráveis devem ser incorporadas à documentação viva depois da entrega.

Docker, CI/CD, healthcheck e deploy não fazem parte desta arquitetura. Esses contratos devem ser definidos separadamente quando o ambiente do data center universitário estiver estabelecido.
