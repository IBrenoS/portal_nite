# Arquitetura do Portal NITE

## Visão geral

O Portal NITE é um monorepo npm com duas aplicações Next.js e packages source-only de conteúdo, persistência editorial e UI compartilhada. `apps/web` continua sendo a vitrine pública; `apps/admin` é o CMS autenticado e não expõe rascunhos ou contratos administrativos ao portal.

```text
portal-nite
├── apps
│   ├── admin
│   │   └── src
│   └── web
│       ├── e2e/visual
│       ├── public
│       └── src
│           ├── app
│           ├── components
│           └── lib
├── packages
│   ├── content
│   │   ├── data
│   │   ├── drizzle
│   │   └── src
│   └── ui
│       └── src
└── docs
    └── specs
```

Turbo executa tarefas por workspace e reutiliza resultados quando entradas e configuração não mudam. O npm mantém um único `package-lock.json` na raiz.

## Limites dos workspaces

### `@nite/web`

Contém rotas, metadata, redirects, headers, componentes, tema, SEO, navegação, assets públicos e testes visuais. O alias `@/*` aponta exclusivamente para `apps/web/src/*`.

Configurações de Next.js, PostCSS, Vitest e Playwright permanecem no workspace consumidor. Tokens e primitives estáveis usados pelas duas aplicações vivem em `@nite/ui`; cenas, navegação e componentes específicos continuam locais.

### `@nite/admin`

Aplicação Next.js server-first do CMS. Ela integra Better Auth com Microsoft Entra ID, executa ações editoriais autenticadas, assina uploads diretos ao R2 e renderiza editor e preview. A configuração é lida apenas no runtime; builds sem secrets permanecem herméticos e as rotas administrativas são dinâmicas e `no-store`.

### `@nite/ui`

Package source-only com tokens, `Button`, campos, cards, estados e o renderer estruturado do corpo de notícia. `apps/web` mantém reexports locais para preservar seus imports; `apps/admin` consome o package diretamente.

### `@nite/content`

Contém schemas Zod, tipos derivados, regras editoriais, consultas de leitura e o schema Drizzle do CMS. É um package privado e source-only, transpilado pelo Next.js, sem etapa própria de publicação ou build. Os JSONs continuam atendendo os domínios institucionais atuais; no Nite News, a fonte estática demonstrativa existe apenas como modo explícito de teste, desenvolvimento local e rollback.

A API do package é dividida por capacidade:

- `@nite/content` expõe tipos e schemas compartilhados, além das consultas de projetos, pessoas e linha do tempo;
- `@nite/content/public` expõe as consultas assíncronas do Nite News e os adapters de leitura publicada;
- `@nite/content/admin` expõe schema Drizzle, identidade, comandos, consultas, revisões e ports de mídia usados pelo painel.

`apps/web` não pode importar `@nite/content/admin`. Imports profundos fora das entradas declaradas e caminhos físicos entre `apps/` e `packages/` são proibidos pelo ESLint. Uma mudança nessas APIs exige typecheck e testes dos dois workspaces.

## Fluxo de conteúdo

```text
Neon PostgreSQL ─→ published_articles ─→ @nite/content/public ─→ apps/web
                                               ↑
                                         validação Zod

JSON demonstrativo ─→ modo explícito NITE_NEWS_SOURCE=static
```

Filtragem editorial, autorização de perfis, ordenação e resolução por slug permanecem no package de conteúdo. Componentes web recebem dados já tipados e não acessam JSONs diretamente.

### Fluxo do Nite News

O estado editorial persistente vive em PostgreSQL nas tabelas `articles`, `article_revisions`, `media_assets`, `cms_memberships`, `audit_events` e `outbox_events`; Better Auth usa as tabelas `auth_*`. `published_articles` é o único read model concedido à role `nite_public`; ela seleciona somente a revisão fixada como publicada e exclui artigos não publicados ou com data futura.

No CMS, cada ação revalida a sessão e a membership no servidor. A identidade editorial usa o tenant configurado (`tid`) e o `accountId` verificado do provider Microsoft (`oid`); e-mail e nome são apenas metadados. O primeiro admin é criado idempotentemente somente quando esse par corresponde a `MICROSOFT_TENANT_ID + CMS_BOOTSTRAP_ADMIN_OID`.

Cada salvamento cria uma revisão imutável. O update do ponteiro atual inclui o `expectedRevisionId`; uma revisão obsoleta gera conflito e a transação é revertida. Publicar fixa a revisão e, na mesma transação PostgreSQL, registra auditoria e produz um evento de outbox. Nenhuma revalidação remota participa dessa transação.

Após o commit, `apps/admin` tenta despachar a outbox em `after()`. Um cron autenticado por `CRON_SECRET` faz a recuperação durável: os workers reivindicam lotes com `FOR UPDATE SKIP LOCKED`, lease e token exclusivos; falhas recebem backoff exponencial e claims expirados podem ser retomados. O dispatcher assina o corpo JSON exato com HMAC-SHA256 e envia ao endpoint fixo do portal. O portal valida timestamp, assinatura, tamanho e schema antes de expirar a tag de notícias e revalidar a listagem, o slug publicado e o sitemap.

Uploads de JPEG, PNG ou WebP de até 10 MB usam URL PUT curta e assinada para uma chave aleatória `incoming/`. O servidor confere tamanho e assinatura binária, processa com Sharp, limita a 2000 px, converte para WebP e só então promove para `news/`. Objetos divergentes ficam em quarentena; somente mídia `ready` pode ser publicada.

O repository público é assíncrono e concentra filtros, ordenação cronológica, agenda crescente, resolução por slug, relacionadas e indexação. `apps/web` compõe esse repository com a view `published_articles` por padrão para renderizar `/atualizacoes`, `/atualizacoes/[slug]`, metadata e sitemap. As páginas são dinâmicas e compartilham um cache server-side com TTL de cinco minutos e tag editorial. O JSON não é fallback silencioso: só é selecionado por `NITE_NEWS_SOURCE=static` e não será migrado como notícia oficial.

Registros `demonstrativo` podem ser públicos para validação da interface, mas são devolvidos por `getIndexableNewsArticles()` somente após migrarem para `contentState: "real"`. A home `/atualizacoes` entra no sitemap; slugs demonstrativos usam `robots.index = false`. Breadcrumb JSON-LD existe em todas as matérias, enquanto Article JSON-LD fica restrito ao conteúdo real e indexável.

### Acesso ao banco

`DATABASE_MIGRATION_URL`, `DATABASE_ADMIN_URL` e `DATABASE_PUBLIC_URL` são credenciais separadas por responsabilidade. Migrations usam a primeira; o painel usa `nite_admin`; o portal usa `nite_public`, que recebe `SELECT` apenas na view. As roles versionadas são `NOLOGIN`: logins e secrets pertencem ao provisionamento do ambiente, não ao repositório. O procedimento de corte, smoke test e rollback está em `docs/runbooks/cms-rollout.md`.

## Estratégia de testes

- Testes unitários ficam ao lado da página, componente ou módulo que validam.
- Testes do conteúdo usam ambiente Node em `packages/content`.
- Migrations e privilégios são exercitados em PostgreSQL real em memória com PGlite; os testes verificam a view sob a role pública, não apenas o texto SQL.
- Vitest permite paralelismo entre arquivos com no máximo quatro workers.
- Playwright e snapshots ficam em `apps/web/e2e/visual` e são executados manualmente.
- `npm run test:affected` usa o grafo do Turbo para limitar testes aos workspaces afetados.
- `npm run check:deadcode` impede que arquivos, exports ou dependências sem uso permaneçam no monorepo.

O fluxo normal usa testes dirigidos durante a implementação e `npm run check` no encerramento. A suíte visual completa deve ser reservada para checkpoints que possam alterar renderização ou para a validação final.

## Regras de evolução

- Criar um novo package somente quando houver um limite de domínio estável ou mais de um consumidor real.
- Manter UI, configurações e integrações específicas dentro do workspace consumidor.
- Não criar `packages/db`, `packages/auth`, `apps/api` ou um app mobile apenas para antecipar reutilização. `packages/ui` existe porque web e admin já compartilham primitives e tokens estáveis.
- Preservar URLs públicas e contratos de conteúdo ao reorganizar diretórios.
- Manter specs ainda não implementadas em `docs/specs/`; decisões duráveis devem ser incorporadas à documentação viva depois da entrega.

Docker, CI/CD e healthchecks externos continuam fora desta arquitetura. O repositório contém somente a configuração versionada do cron do projeto Admin; o provisionamento dos dois projetos, banco, domínios, secrets e observabilidade permanece uma operação de ambiente.
