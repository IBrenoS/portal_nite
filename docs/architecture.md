# Arquitetura do Portal NITE

## Limite do repositório

O Portal NITE é um monorepo npm, responsável exclusivamente pela experiência institucional pública. O CMS NITE é outro repositório, com banco, migrations, autenticação, editor, mídia e API próprios. A pasta `cms/` será um Git submodule opcional quando o repositório privado `nite-unijorge/nite-cms` estiver publicado; ela não integra este workspace, lockfile, build, testes ou imports.

```text
portal_nite
├── apps/web
├── packages/content       # dados institucionais
├── packages/news          # client e contrato HTTP do consumidor
├── packages/ui            # UI do Portal
├── cms/                   # submodule opcional, fora do workspace
└── docs
```

O npm e o Turbo executam apenas `apps/*` e `packages/*`. Clone, instalação, CI e deploy do Portal funcionam sem inicializar `cms/`.

## Fronteira editorial

O Portal não possui acesso PostgreSQL, schema Drizzle, migrations, roles, Better Auth, Entra ID ou credenciais de escrita no R2. Notícias chegam exclusivamente pela API pública versionada do CMS:

```text
Portal apps/web ── HTTPS GET /v1/news ──> CMS apps/api ──> published_articles
CMS apps/admin ── HMAC POST /api/revalidate/news ──> Portal apps/web
Portal apps/web ── mídia pública ──> R2/CDN
```

`@nite/news` é propriedade do Portal: define o schema Zod esperado pelo consumidor, valida as respostas em runtime, fornece o client HTTP, cache e a fixture estática explícita. Ele não importa código, tipos ou arquivos do CMS. A fonte é escolhida por `NITE_NEWS_SOURCE=api|static`; `api` requer `CMS_PUBLIC_API_URL`. O modo `static` é um fallback operacional explícito, nunca automático.

A API `/v1` retorna somente artigos publicados e mídia pronta, além de `version: 1`, `ETag` e `Cache-Control: public, s-maxage=300, stale-while-revalidate=86400`. Campos existentes não mudam de tipo ou semântica em `/v1`; mudanças incompatíveis exigem `/v2`. O Portal mantém schema e fixtures próprios para detectar incompatibilidade antes da renderização.

O webhook de publicação usa um corpo JSON versionado assinado com HMAC-SHA256. CMS e Portal implementam localmente a mesma regra de protocolo, com timestamp, limite de tamanho e proteção contra adulteração. Não há biblioteca compartilhada: a compatibilidade é validada em homologação contra a API e o webhook reais.

## Workspaces do Portal

### `@nite/web`

Rotas, metadata, sitemap, robots, layout, componentes, tema, assets e testes da vitrine pública. O alias `@/*` aponta apenas para `apps/web/src/*`. A aplicação consome `@nite/content`, `@nite/news` e `@nite/ui` pelas entradas públicas.

### `@nite/content`

Dados e consultas institucionais de pessoas, projetos e linha do tempo. Não contém domínio editorial, banco, autenticação ou implementação CMS.

### `@nite/news`

Contrato consumidor de notícias, client HTTP, repository assíncrono, filtros, ordenação, relacionadas, cache, revalidação e fixture estática. É independente de Drizzle, Neon e R2 administrativo.

### `@nite/ui`

Tokens, primitives e renderer de notícia do Portal. O CMS tem renderer e UI próprios; paridade visual é uma decisão de produto, não um acoplamento de código.

## Contrato operacional

O Portal recebe apenas `CMS_PUBLIC_API_URL`, `NITE_NEWS_SOURCE`, `NITE_NEWS_MEDIA_URL` e `REVALIDATION_SECRET`. O CMS é proprietário de `DATABASE_MIGRATION_URL`, `DATABASE_ADMIN_URL`, `DATABASE_PUBLIC_URL`, credenciais R2 e credenciais de autenticação.

O CMS é implantado a partir do seu próprio repositório: Admin e API são projetos separados. O deploy do Portal não inicializa nem implanta o submodule. Uma atualização do Gitlink registra apenas um commit CMS já validado e publicado; nunca acompanha branch remotamente.

## Validação e evolução

- Testes do Portal cobrem schema HTTP inválido, filtros, slug, SEO, sitemap e revalidação.
- Homologação cobre Portal consumindo API real e publicação CMS acionando o webhook real.
- Toda versão `/v1` precisa continuar compatível até o Portal em produção migrar para uma nova versão.
- Não criar registry ou package compartilhado sem uma necessidade recorrente comprovada. Um registry privado só será reavaliado se mais consumidores ou drift de contrato tornarem os testes de compatibilidade insuficientes.
- Imports físicos entre workspaces e referências a `cms/` são bloqueados por ESLint e CI.
