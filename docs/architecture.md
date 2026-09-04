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

As notícias podem chegar por uma API HTTPS versionada, mas a implantação estática atual usa exclusivamente a fixture pública versionada no repositório. Ações privadas, dados de persistência e regras operacionais permanecem fora deste repositório.

```text
apps/web ── fixture estática ──> @nite/news
Workers Static Assets ──> HTML, RSC, fontes, imagens e 404
Worker mínimo ──> endpoints explicitamente indisponíveis e redirects legados
```

`@nite/news` define o schema Zod esperado pelo consumidor, valida as respostas em runtime, fornece o client HTTP, cache e uma fixture estática explícita. Não importa código, tipos ou arquivos da fonte editorial. A fonte é escolhida por `NITE_NEWS_SOURCE=api|static`; o modo `static` é um fallback operacional explícito, nunca automático.

A API retorna envelopes `version: 2`, `ETag` e `Cache-Control`. O corpo da matéria é exclusivamente `EditorialDocumentV1`, validado de forma estrita pelo consumidor antes da renderização. Mudanças incompatíveis exigem uma nova versão. O Portal mantém schemas e fixtures próprios para detectar incompatibilidade antes da renderização.

No modo estático, prévia editorial e revalidação não estão configuradas: `GET /api/preview` responde `401` e `POST /api/revalidate/news` responde `503`. `POST /api/preview/exit` apenas remove o cookie legado e retorna a `/atualizacoes`. Uma futura integração CMS/API exigirá um destino com runtime dinâmico, cache persistente conscientemente escolhido e a reintrodução de HTTPS e HMAC; ela não é ativada implicitamente pelo Portal.

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

- Testes do Portal cobrem a fixture pública, filtros client-side, slug, SEO, sitemap, redirects e os contratos mínimos do Worker.
- Uma futura homologação dinâmica deve cobrir API v2, webhook de revalidação, Draft Mode entre os projetos e mídia pública real.
- Toda versão publicada precisa continuar compatível até o Portal em produção migrar para uma nova versão.
- Não criar packages compartilhados sem necessidade recorrente comprovada.
- Imports físicos entre workspaces são bloqueados por ESLint e CI.

## Hospedagem pública

O Portal possui dois destinos independentes durante a estabilização:

- Cloudflare Workers é o destino canônico de `https://nite.tec.br`, publicado
  por Workers Builds a partir de commits na `main`. O `next build` gera `out/`
  e Workers Static Assets entrega o portal sem executar o Worker na navegação
  pública.
- O deployment existente na Vercel permanece como fallback operacional até uma
  decisão explícita de desativação; ele não participa do roteamento do domínio.

No Cloudflare, `NITE_NEWS_SOURCE=static` é obrigatório. O Worker executa apenas
os três endpoints mínimos e os cinco redirects legados; não há binding de R2,
KV, D1, Durable Objects, Cloudflare Images ou cache incremental. Imagens são
arquivos estáticos não otimizados em runtime. Uma futura troca para `api` exige
uma arquitetura dinâmica separada antes do corte editorial.
