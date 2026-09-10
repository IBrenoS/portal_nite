# Arquitetura do Portal NITE

## Limite do repositório

O Portal NITE é um monorepo npm responsável exclusivamente pela experiência institucional pública. O workspace não contém aplicação administrativa, banco de dados editorial, autenticação editorial, migrations, credenciais de escrita ou implementação da fonte de notícias.

```text
portal_nite
├── apps/web
├── apps/web-preview
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

apps/web-preview ── API HTTPS v2 ──> CMS API pública
                 └─ token curto ──> CMS Admin /api/preview/resolve
Vercel Functions ──> Draft Mode, cookie privado e revisão editorial
```

`@nite/news` define o schema Zod esperado pelo consumidor, valida as respostas em runtime, fornece o client HTTP, cache e uma fixture estática explícita. Não importa código, tipos ou arquivos da fonte editorial. A fonte é escolhida por `NITE_NEWS_SOURCE=api|static`; o modo `static` é um fallback operacional explícito, nunca automático.

A API retorna envelopes `version: 2`, `ETag` e `Cache-Control`. O corpo da matéria aceita `EditorialDocumentV1` e `EditorialDocumentV2`, validados de forma estrita pelo consumidor antes da renderização. Mudanças incompatíveis exigem uma nova versão da API. O Portal mantém schemas e fixtures próprios para detectar incompatibilidade antes da renderização.

No app estático, prévia editorial e revalidação não estão configuradas: `GET /api/preview` responde `401` e `POST /api/revalidate/news` responde `503`. `POST /api/preview/exit` apenas remove o cookie legado e retorna a `/atualizacoes`. O runtime dinâmico de prévia existe exclusivamente em `apps/web-preview`: ele valida o token no CMS Admin por HTTPS, habilita Draft Mode e mantém a revisão em cookie seguro por no máximo dez minutos. O Portal nunca recebe `PREVIEW_HMAC_SECRET`, banco ou credenciais editoriais.

## Workspaces do Portal

### `@nite/web`

Rotas, metadata, sitemap, robots, layout, componentes, tema, assets e testes da vitrine pública. O alias `@/*` aponta apenas para `apps/web/src/*`. A aplicação consome `@nite/content`, `@nite/news` e `@nite/ui` pelas entradas públicas.

### `@nite/web-preview`

Aplicação Next.js dinâmica implantada na Vercel. As rotas de Nite News usam exclusivamente a API HTTPS v2 do CMS para matérias publicadas; os fixtures permanecem exclusivos do Portal estático e dos testes determinísticos. O app também adiciona a rota dinâmica de matéria, `GET /api/preview` e `POST /api/preview/exit`. Aceita os contratos v1 de revisão salva e v2 de snapshot temporário; no v2, o slug e o conteúdo vêm das alterações atuais do editor. Todas as respostas recebem `X-Robots-Tag: noindex, nofollow, noarchive`; `robots.txt` bloqueia crawlers e páginas públicas apontam canonical para `https://nite.tec.br`. Uma prévia privada não emite canonical, Open Graph nem JSON-LD.

### `@nite/content`

Dados e consultas institucionais de pessoas, projetos e linha do tempo. Não contém domínio editorial nem integrações privadas.

### `@nite/news`

Contrato consumidor de notícias, client HTTP, repository assíncrono, filtros, ordenação, relacionadas, cache, revalidação e fixture estática. É independente de implementações de persistência e de mídia administrativa.

### `@nite/ui`

Tokens, primitives, shell compartilhado (header, footer e container) e views de notícias do Portal. `apps/web` mantém reexports retrocompatíveis para os imports internos existentes; os dois apps consomem a implementação canônica em `@nite/ui`. As rotas públicas determinísticas são expostas por `@nite/web` para garantir paridade sem duplicação; a rota dinâmica de matéria, a resolução privada, a metadata de preview e o Draft Mode pertencem exclusivamente a `apps/web-preview`.

## Validação e evolução

- Testes do Portal cobrem a fixture pública, filtros client-side, slug, SEO, sitemap, redirects e os contratos mínimos do Worker.
- A homologação dinâmica deve cobrir API v2, Draft Mode entre os projetos e mídia pública real. A listagem publicada é consultada por request e não depende de webhook de revalidação.
- Toda versão publicada precisa continuar compatível até o Portal em produção migrar para uma nova versão.
- Não criar packages compartilhados sem necessidade recorrente comprovada.
- Imports físicos entre workspaces são bloqueados por ESLint e CI.

## Hospedagem pública

O Portal possui dois destinos independentes e permanentes:

- Cloudflare Workers é o destino canônico de `https://nite.tec.br`, publicado
  por Workers Builds a partir de commits na `main`. O `next build` gera `out/`
  e Workers Static Assets entrega o portal sem executar o Worker na navegação
  pública.
- O projeto Vercel `portal-nite`, com Root Directory `apps/web-preview`, atende
  `https://portal-nite.vercel.app` como ambiente dinâmico privado de testes.
  Ele não participa do DNS ou do roteamento do domínio público.

No Cloudflare, `NITE_NEWS_SOURCE=static` permanece obrigatório e o Worker executa apenas os três endpoints mínimos e os cinco redirects legados; não há binding de R2,
KV, D1, Durable Objects, Cloudflare Images ou cache incremental. Imagens são
arquivos estáticos não otimizados em runtime. Uma futura troca para `api` exige
uma arquitetura dinâmica separada antes do corte editorial. Na Vercel,
`NITE_NEWS_SOURCE=api` é obrigatório: matérias publicadas vêm da CMS API e a
resolução de revisões usa o CMS Admin publicado. Quick Tunnel não faz parte da
operação normal.
