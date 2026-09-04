# Ambiente do Portal e CMS Editorial

## Preparação automática segura

Na raiz de `D:\portal_nite`, execute:

```text
npm run env:setup
```

O comando cria os arquivos locais ignorados pelo Git, preserva qualquer valor
não vazio já preenchido e não imprime secrets:

- `apps/web/.env.local`;
- `cms/apps/admin/.env.local`;
- `cms/apps/api/.env.local`;
- `cms/packages/db/.env.local`;
- `cms/packages/editorial/.env.postgres.local`;
- `cms/.env.postgres-test.local`;
- `cms/apps/admin/.env.e2e.local`.

Ele gera 48 bytes aleatórios em Base64URL para cada secret interno:

- `BETTER_AUTH_SECRET`, exclusivo do CMS Admin;
- `PREVIEW_HMAC_SECRET`, exclusivo do CMS Admin;
- `CRON_SECRET`, exclusivo do cron do CMS Admin;
- `REVALIDATION_SECRET`, gravado com o mesmo valor no CMS Admin e no Portal.

O mesmo mecanismo gera `POSTGRES_PASSWORD` somente para o container local de
teste e monta `CMS_TEST_DATABASE_URL` com essa senha. Esse valor não pertence a
staging ou produção.

O setup é idempotente. Se os dois arquivos já contiverem valores diferentes
para `REVALIDATION_SECRET`, ele interrompe sem escolher um deles. Para gerar
novos secrets intencionalmente, remova somente os valores correspondentes dos
arquivos locais e execute o comando novamente. A rotação em ambiente implantado
deve ser coordenada e não é realizada por este script.

## Valores que exigem serviço externo

### PostgreSQL/Neon

**Status: concluído em 31/08/2026.** O projeto Neon `nite-cms` está criado na
região de São Paulo com PostgreSQL 16; a conexão direta de migration e as
conexões pooled de Admin e API pública estão preenchidas localmente. Os logins
restritos `nite_admin_app` e `nite_public_api` foram validados com as
memberships e permissões previstas, sem privilégios administrativos.

Obtenha três URLs PostgreSQL distintas, sempre com SSL no ambiente remoto:

| Variável                 | Arquivo                      | Permissão                                     |
| ------------------------ | ---------------------------- | --------------------------------------------- |
| `DATABASE_MIGRATION_URL` | `cms/packages/db/.env.local` | ownership e DDL                               |
| `DATABASE_ADMIN_URL`     | `cms/apps/admin/.env.local`  | role `nite_admin` de runtime                  |
| `DATABASE_PUBLIC_URL`    | `cms/apps/api/.env.local`    | `SELECT` somente na view `published_articles` |

Não reutilize a credencial de migration no Admin ou na API. A aplicação de
migrations continua sendo uma operação manual e autorizada:

```text
cd cms
npm run db:migrate:local
```

### Microsoft Entra

**Status: concluído em 01/09/2026.** A App Registration `NITE CMS Admin` foi
criada como single tenant; Client ID, Client Secret, Tenant ID e bootstrap
Admin OID estão preenchidos localmente. O fluxo OAuth foi validado com uma
identidade institucional e criou a primeira membership ativa com papel
`admin`.

Na App Registration usada pelo CMS Admin, obtenha:

- `MICROSOFT_CLIENT_ID`: Application (client) ID;
- `MICROSOFT_CLIENT_SECRET`: valor do client secret, não seu identificador;
- `MICROSOFT_TENANT_ID`: Directory (tenant) ID institucional;
- `CMS_BOOTSTRAP_ADMIN_OID`: Object ID do primeiro administrador autorizado.

Defina `BETTER_AUTH_URL` como a origem exata do Admin. Cadastre no Entra o
redirect URI `${BETTER_AUTH_URL}/api/auth/callback/microsoft`. Em execução local
o setup usa `http://localhost:3001`; em staging/produção substitua pela origem
HTTPS implantada.

### Cloudflare R2

**Status: concluído em 01/09/2026 para desenvolvimento local.** Os buckets
`nite-cms-staging` e `nite-cms-public` foram criados. O staging permanece
privado e aceita CORS somente de `http://localhost:3001`, com método `PUT` e
header `Content-Type`; o bucket público está disponível temporariamente pela
URL de desenvolvimento `r2.dev`. Uma credencial Account S3 com permissão de
leitura/gravação de objetos foi restringida aos dois buckets e preenchida nos
arquivos locais necessários. O smoke test confirmou listagem nos dois buckets,
`PUT`/`GET` no staging e `PUT`/HTTP 200 no público com cache immutable. Para
staging/produção ainda será necessário substituir `r2.dev` por um domínio
personalizado HTTPS.

Crie dois buckets e uma credencial S3/R2 restrita, então preencha no CMS Admin:

- `R2_ACCOUNT_ID`;
- `R2_ACCESS_KEY_ID`;
- `R2_SECRET_ACCESS_KEY`;
- `R2_STAGING_BUCKET`, privado;
- `R2_PUBLIC_BUCKET`, público por domínio/base HTTPS;
- `R2_PUBLIC_BASE_URL`.

A credencial precisa escrever e ler o staging e escrever o bucket público. Ela
não precisa de `DeleteObject`. Configure o CORS do staging para a origem do CMS
Admin. Repita `R2_PUBLIC_BASE_URL` na CMS API e use essa mesma base como
`NITE_NEWS_MEDIA_URL` no Portal.

### URLs implantadas

Depois que os projetos e domínios HTTPS existirem, preencha:

| Variável                  | Valor esperado                                        |
| ------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | origem pública do Portal                              |
| `BETTER_AUTH_URL`         | origem pública do CMS Admin                           |
| `CMS_PUBLIC_API_URL`      | origem pública da CMS API, sem acrescentar `/v2/news` |
| `NITE_NEWS_MEDIA_URL`     | mesma base de `R2_PUBLIC_BASE_URL`                    |
| `PORTAL_PREVIEW_URL`      | `https://<portal>/api/preview`                        |
| `CMS_PREVIEW_RESOLVE_URL` | `https://<admin>/api/preview/resolve`                 |
| `WEB_REVALIDATION_URL`    | `https://<portal>/api/revalidate/news`                |

O setup mantém `NITE_NEWS_SOURCE=static` enquanto os endpoints estão vazios,
permitindo desenvolvimento e checks locais. Depois de preencher e validar a CMS
API HTTPS, altere para `NITE_NEWS_SOURCE=api`; esse é o modo da integração real.
O valor `static` permanece como fallback explícito e fonte determinística da
regressão visual.

### Preview temporário pelo Portal na Vercel

Antes do deploy do CMS Admin, o Preview no Portal pode usar exclusivamente
`https://portal-nite.vercel.app` com um Cloudflare Quick Tunnel. No Admin local,
defina:

```text
PORTAL_PREVIEW_URL=https://portal-nite.vercel.app/api/preview
```

Reinicie o Admin e, em terminais separados na raiz de `cms`, execute:

```text
npm run dev
npm run dev:preview-proxy
cloudflared tunnel --url http://127.0.0.1:3011
```

O proxy local publica somente `POST /api/preview/resolve`; login, workspace e
demais rotas do Admin retornam `404` antes de alcançar a porta `3001`. Copie a
origem HTTPS aleatória informada pelo `cloudflared` e configure no ambiente
Production do projeto Vercel `portal-nite`:

```text
CMS_PREVIEW_RESOLVE_URL=https://<origem-gerada>.trycloudflare.com/api/preview/resolve
```

Faça redeploy do Portal depois da alteração. A URL `trycloudflare.com` muda a
cada nova execução, portanto variável e deployment precisam ser atualizados a
cada sessão. Nenhum domínio `nite.tec.br` participa deste fluxo, que é somente
para desenvolvimento e depende do Admin, proxy e túnel permanecerem ativos.

Antes de testar uma revisão, confirme `401` para um `POST` sem token no endpoint
local e público e `404` para `/`, `/articles` e `/api/auth/session` pelo túnel.
Para desativar, remova a variável da Vercel, redeploye o Portal, esvazie
`PORTAL_PREVIEW_URL`, reinicie o Admin e encerre proxy e `cloudflared`.

## Valores necessários somente para testes

### PostgreSQL real local

Com Docker Desktop instalado e em execução, o setup já preenche a URL e a senha
de um PostgreSQL descartável em `127.0.0.1:55432/nite_cms_test`. O database usa
`tmpfs` e não persiste após o container ser removido.
`CMS_TEST_ALLOW_DATABASE_RESET=1` é intencional porque o teste derruba e recria
schemas desse database.

Execute:

```text
cd cms
npm run test:postgres:up
npm run test:postgres:local
npm run test:postgres:down
```

`test:postgres:down` remove somente o container e a rede desse Compose; os dados
de teste em memória são descartados. Se Docker não estiver disponível, use um
PostgreSQL local equivalente e mantenha as proteções de hostname e sufixo
`_test` exigidas pelo código.

### Playwright do CMS Admin

Após staging estar funcional, preencha `cms/apps/admin/.env.e2e.local`:

- `ADMIN_E2E_BASE_URL`: origem do CMS Admin de homologação;
- `ADMIN_E2E_ADMIN_STORAGE_STATE`: caminho para o storage state obtido após
  login com uma identidade `admin` de teste;
- `ADMIN_E2E_PUBLISHER_STORAGE_STATE`: caminho para o storage state de uma
  identidade `publisher` de teste;
- `ADMIN_E2E_ARTICLE_ID`: UUID de uma matéria descartável criada para o teste.

Storage states contêm sessão autenticada: mantenha-os fora do Git e renove-os
quando expirarem. Com os quatro valores preenchidos:

```text
cd cms
npm run test:e2e:configured
```

A regressão visual do Portal usa a fixture estática no servidor Playwright e,
portanto, não requer as credenciais do CMS:

```text
npm run test:visual
```

No checkout atual, as baselines Windows ainda não estão versionadas. A primeira
execução chega aos casos, mas falha nos `toHaveScreenshot` ausentes. Não aceite
as imagens automaticamente: revise os PNGs gerados e somente então execute
`npm run test:visual:update` para promover diferenças intencionais.

## O que o setup não faz

O comando não cria projetos Vercel, App Registration Entra, databases/roles,
buckets R2, domínios, CORS, contas de teste, storage states nem matéria de
homologação. Também não aplica migrations, não registra variáveis em provedores,
não faz deploy e não executa smoke de staging. Esses passos exigem acesso e
autorização operacional aos serviços externos.
