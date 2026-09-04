# Arquitetura do Portal NITE

## Limite do repositório

O Portal NITE é um monorepo npm responsável exclusivamente pela experiência institucional pública. O workspace não contém aplicação administrativa, banco de dados editorial, autenticação editorial, migrations, credenciais de escrita ou implementação da fonte de notícias.

```text
portal_nite
├── apps/web
├── packages/content       # dados institucionais
├── packages/news          # client e contrato HTTP das notícias
├── packages/ui            # UI do Portal
└── docs
```

O npm e o Turbo executam somente `apps/*` e `packages/*`. Instalação, CI, testes e deploy do Portal não dependem de outro repositório.

## Fronteira editorial pública

As notícias chegam por uma API HTTPS versionada. O Portal consulta somente conteúdo publicado e mídia pública; ações privadas, dados de persistência e regras operacionais permanecem fora deste repositório.

```text
apps/web ── HTTPS GET /v2/news ──> apps/api do CMS
apps/admin do CMS ── HMAC POST /api/revalidate/news ──> apps/web
GET /api/preview do Portal ── HTTPS POST /api/preview/resolve ──> apps/admin do CMS
apps/web ── mídia pública imutável ──> CDN/R2 público
```

`@nite/news` define o schema Zod esperado pelo consumidor, valida as respostas em runtime, fornece o client HTTP, cache e uma fixture estática explícita. Não importa código, tipos ou arquivos da fonte editorial. A fonte é escolhida por `NITE_NEWS_SOURCE=api|static`; o modo `static` é um fallback operacional explícito, nunca automático.

A API retorna envelopes `version: 2`, `ETag` e `Cache-Control`. O corpo da matéria é exclusivamente `EditorialDocumentV1`, validado de forma estrita pelo consumidor antes da renderização. Mudanças incompatíveis exigem uma nova versão. O Portal mantém schemas e fixtures próprios para detectar incompatibilidade antes da renderização.

O webhook editorial aceita publicação, despublicação e arquivamento em um corpo JSON assinado com HMAC-SHA256, timestamp, limite de tamanho e proteção contra adulteração; ele invalida o cache de dados, lista/filtros, artigo e sitemap. A compatibilidade é validada em homologação pela API e pelo webhook reais, sem biblioteca compartilhada.

A prévia privada é resolvida exclusivamente pelo Admin via HTTPS server-to-server. Após a validação remota, o Portal habilita Draft Mode e grava um cookie HttpOnly, Secure e curto, limitado à revisão e ao slug retornados. Prévia não produz canonical nem JSON-LD indexável, usa `noindex,nofollow` e não altera a cache pública.

O Portal configura `CMS_PUBLIC_API_URL` para a API v2, `CMS_PREVIEW_RESOLVE_URL` para o Route Handler privado do Admin e `NITE_NEWS_MEDIA_URL` para autorizar o host público de imagens no Next.js. `PREVIEW_HMAC_SECRET`, credenciais de banco e credenciais R2 nunca pertencem ao Portal. A assinatura do token de prévia é verificada pelo Admin; o Portal só habilita Draft Mode depois que o mesmo token resolve uma revisão válida.

## Workspaces do Portal

### `@nite/web`

Rotas, metadata, sitemap, robots, layout, componentes, tema, assets e testes da vitrine pública. O alias `@/*` aponta apenas para `apps/web/src/*`. A aplicação consome `@nite/content`, `@nite/news` e `@nite/ui` pelas entradas públicas.

### `@nite/content`

Dados e consultas institucionais de pessoas, projetos e linha do tempo. Não contém domínio editorial nem integrações privadas.

### `@nite/news`

Contrato consumidor de notícias, client HTTP, repository assíncrono, filtros, ordenação, relacionadas, cache, revalidação e fixture estática. É independente de implementações de persistência e de mídia administrativa.

### `@nite/ui`

Tokens, primitives e renderer de notícia do Portal. Componentes e estilos pertencem à vitrine pública e não pressupõem outro workspace consumidor.

## Validação e evolução

- Testes do Portal cobrem schema HTTP inválido, filtros, slug, SEO, sitemap e revalidação.
- Homologação cobre API v2, webhook de revalidação, Draft Mode entre os projetos e mídia pública real.
- Toda versão publicada precisa continuar compatível até o Portal em produção migrar para uma nova versão.
- Não criar packages compartilhados sem necessidade recorrente comprovada.
- Imports físicos entre workspaces são bloqueados por ESLint e CI.

## Hospedagem pública

O Portal possui dois destinos independentes durante a estabilização:

- Cloudflare Workers é o destino canônico de `https://nite.tec.br`, empacotado
  pelo OpenNext e publicado por Workers Builds a partir de commits na `main`.
- O deployment existente na Vercel permanece como fallback operacional até uma
  decisão explícita de desativação; ele não participa do roteamento do domínio.

No Cloudflare, o modo inicial `NITE_NEWS_SOURCE=static` usa o cache incremental
read-only em Workers Static Assets. Não existem bindings de R2, KV, D1 ou
Durable Objects. Uma futura troca para `api` exige revisar essa estratégia antes
do corte editorial, além de configurar os endpoints HTTPS e o HMAC do CMS.
