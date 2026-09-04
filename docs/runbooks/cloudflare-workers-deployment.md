# Deploy do Portal no Cloudflare Workers

## Arquitetura e limites

O Worker `portal-nite` é gerado pelo OpenNext e serve o Portal em
`https://nite.tec.br`. O repositório e o lockfile ficam na raiz do monorepo; por
isso o Workers Builds também deve executar a partir de `/`.

Esta fase usa somente recursos do plano Free:

- Worker e Workers Static Assets;
- binding `IMAGES` para o `next/image`;
- cache incremental read-only em Static Assets;
- nenhum R2, KV, D1 ou Durable Object.

Não prossiga com o domínio se o dry-run exceder o limite comprimido do plano
Free, se a inicialização ultrapassar o limite da plataforma ou se os smokes
indicarem CPU recorrente próxima ao limite gratuito. Não habilite assinatura ou
plano pago como fallback.

## Workers Builds

Conecte exclusivamente o repositório privado `IBrenoS/portal_nite` e limite o
GitHub App a esse repositório. Use token Cloudflare restrito à conta e à zona
`nite.tec.br`, com somente Workers Scripts e Workers Routes necessários.

| Campo                  | Valor                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| Production branch      | `main`                                                                  |
| Root directory         | `/`                                                                     |
| Build command          | `npm install --global npm@11.6.2 && npm ci && npm run cloudflare:build` |
| Deploy command         | `npm run cloudflare:deploy`                                             |
| Preview deploy command | `npm run cloudflare:upload`                                             |

Configure `SKIP_DEPENDENCY_INSTALL=1` como build variable. Configure as três
variáveis abaixo tanto para o build quanto para o runtime:

| Variável                | Valor                 |
| ----------------------- | --------------------- |
| `PORTAL_DEPLOYMENT_ENV` | `production`          |
| `NEXT_PUBLIC_SITE_URL`  | `https://nite.tec.br` |
| `NITE_NEWS_SOURCE`      | `static`              |

Configure também `NODE_VERSION=24.12.0` somente no build. O comando instala npm
`11.6.2` explicitamente para manter o lockfile reproduzível.

O `wrangler.jsonc` mantém `keep_vars: true` porque as variáveis de runtime são
administradas no dashboard. Sem essa opção, cada `wrangler deploy` substituiria
as variáveis do dashboard pelas variáveis declaradas no arquivo de configuração.

Não configure nesta fase `CMS_PUBLIC_API_URL`, `NITE_NEWS_MEDIA_URL`,
`CMS_PREVIEW_RESOLVE_URL` ou `REVALIDATION_SECRET`.

O deploy inicial deve usar somente `portal-nite.<conta>.workers.dev`. Depois de
validado, adicione ao `wrangler.jsonc`, em commit separado:

```json
"routes": [{ "pattern": "nite.tec.br", "custom_domain": true }]
```

Não crie rota para `www.nite.tec.br` e não altere outros registros da zona.

## Comandos locais e de CI

O build OpenNext deve rodar em Linux, WSL ou CI:

```sh
npm ci
PORTAL_DEPLOYMENT_ENV=production \
NEXT_PUBLIC_SITE_URL=https://nite.tec.br \
NITE_NEWS_SOURCE=static \
npm run cloudflare:build
npm run cloudflare:dry-run
```

O script Cloudflare usa webpack intencionalmente e depois adapta o output com
`--skipNextBuild`. No estado de implantação inicial, isso reduziu o bundle de
`3795,18 KiB` para `2184,02 KiB` comprimidos. Não substitua esse caminho pelo
build Turbopack sem repetir o dry-run e o gate de 3 MiB.

Para preview local no runtime Workers, use `npm run cloudflare:preview`. Os
comandos `cloudflare:deploy` e `cloudflare:upload` pressupõem que
`.open-next/` já foi gerado pelo passo de build.

Para executar a suíte visual contra um deployment externo:

```powershell
$env:PORTAL_E2E_BASE_URL = "https://portal-nite.<conta>.workers.dev"
npm run test:visual
```

## Smoke e promoção do domínio

Antes de adicionar o custom domain, valide no endereço `workers.dev`:

- `/`, `/sobre`, `/projetos`, `/projetos/data-center` e uma pessoa pública;
- `/atualizacoes`, uma notícia por slug, `/sitemap.xml`, `/robots.txt` e
  `/opengraph-image`;
- otimização de imagens, redirects legados e resposta 404;
- canonical, sitemap e robots apontando para `https://nite.tec.br`;
- `/api/preview` não configurado e `/api/revalidate/news` indisponível, como
  esperado enquanto o CMS permanece fora desta fase;
- ausência de erro de runtime, hidratação ou console no Playwright.

Depois do commit que conecta `nite.tec.br`, repita os mesmos smokes no domínio,
confirme DNS e certificado e monitore por 72 horas requests, erros, CPU p95/p99,
minutos de build e transformações de imagens.

## Rollback

Para regressão de aplicação, restaure a versão anterior em Workers & Pages. Para
problema de DNS, certificado ou custom domain, reverta somente o commit que
adiciona `routes`. Mantenha `https://portal-nite.vercel.app` ativo durante a
estabilização; removê-lo exige decisão separada.
