# Deploy estático do Portal no Cloudflare Workers

## Arquitetura e limites

O Worker `portal-nite` publica o Portal em `https://nite.tec.br`. O `next build`
gera `apps/web/out/`; Workers Static Assets entrega HTML, RSC, fontes, imagens e
404 diretamente, sem executar o Worker na navegação pública.

O script atende somente `GET`/`HEAD /api/preview` (`401`, “Prévia indisponível.”),
`POST /api/preview/exit` (`303` para `/atualizacoes`, removendo o cookie legado),
`POST /api/revalidate/news` (`503`, “Revalidação não configurada.”) e os cinco
redirects legados de projetos (`308`). Não há R2, KV, D1, Durable Objects,
Cloudflare Images, OpenNext, cache incremental ou `next/image` em runtime.

Não prossiga se o artefato exceder os limites gratuitos de Static Assets/Workers,
se o dry-run exceder o bundle permitido ou se o preview executar o Worker em
navegação pública. Não habilite plano pago como fallback.

## Workers Builds

Conecte exclusivamente `IBrenoS/portal_nite`; produção é `main` e branches não
produtivas geram previews.

| Campo                  | Valor                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| Production branch      | `main`                                                                  |
| Root directory         | `/`                                                                     |
| Build command          | `npm install --global npm@11.6.2 && npm ci && npm run cloudflare:build` |
| Deploy command         | `npm run cloudflare:deploy`                                             |
| Preview deploy command | `npm run cloudflare:upload`                                             |

Defina `SKIP_DEPENDENCY_INSTALL=1` e `NODE_VERSION=24.12.0` no build. Defina
somente como build variables: `PORTAL_DEPLOYMENT_ENV=production`,
`NEXT_PUBLIC_SITE_URL=https://nite.tec.br` e `NITE_NEWS_SOURCE=static`.
Não configure `CMS_PUBLIC_API_URL`, `NITE_NEWS_MEDIA_URL`,
`CMS_PREVIEW_RESOLVE_URL` nem `REVALIDATION_SECRET`.

`keep_vars: true` protege variáveis administradas pelo dashboard durante
`wrangler deploy`, embora o artefato estático não consuma variáveis em runtime.

## Comandos locais e CI

```sh
npm ci
PORTAL_DEPLOYMENT_ENV=production \
NEXT_PUBLIC_SITE_URL=https://nite.tec.br \
NITE_NEWS_SOURCE=static \
npm run cloudflare:build
npm run cloudflare:dry-run
```

`cloudflare:deploy` chama `wrangler deploy`; `cloudflare:upload` chama
`wrangler versions upload`; `cloudflare:preview` gera o export e inicia
`wrangler dev`. Antes de publicar, confirme a quantidade/tamanho dos assets, o
tamanho comprimido do script e que `out/` contém páginas públicas, `404.html`,
`sitemap.xml`, `robots.txt`, Open Graph e todos os slugs de News.

Para testes externos:

```powershell
$env:PORTAL_E2E_BASE_URL = "https://portal-nite.<conta>.workers.dev"
npm run test:visual
```

## Preview, domínio e rollback

Antes da branch de migração, desassocie somente `nite.tec.br` do Worker atual.
Isso pausa o domínio; não crie rota para Vercel nem altere outros DNS. Mantenha
`portal-nite.vercel.app` apenas como referência recuperável.

No preview, valide rotas públicas, 404, sitemap, robots, Open Graph, redirects,
filtros por `?filtro=`, artigos, canonicals, imagens diretas sem `/_next/image`,
desktop/mobile, console limpo e ausência de execução do Worker em páginas.

Depois do aceite, adicione em commit separado e faça merge em `main`:

```json
"routes": [{ "pattern": "nite.tec.br", "custom_domain": true }]
```

Não adicione `www.nite.tec.br`. Após o cutover, repita os smokes, confirme
certificado/DNS/cache e monitore 72 horas invocações, erros, CPU p95/p99, assets
e minutos de build. Navegação pública não deve aumentar invocações do Worker.

Para reverter o domínio, reverta o commit da rota e mantenha-o pausado. Para
regressão de aplicação, restaure a versão anterior do Worker. A Vercel não recebe
o domínio nesse procedimento.
