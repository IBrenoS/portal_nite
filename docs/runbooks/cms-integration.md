# Integração Portal–CMS

Este runbook cobre a fronteira entre os dois repositórios. Migrations, banco, autenticação, mídia e deploy do Admin/API pertencem ao runbook do repositório `nite-cms`; não os execute a partir deste Portal.

## Pré-requisitos de homologação

- A API CMS está implantada e responde a `GET /health` e `GET /v1/news`.
- O Portal recebe `CMS_PUBLIC_API_URL` apontando para a origem HTTPS da API.
- O Portal recebe `NITE_NEWS_SOURCE=api`, `NITE_NEWS_MEDIA_URL` e `REVALIDATION_SECRET`.
- O CMS Admin recebe a URL HTTPS exata de `/api/revalidate/news` e o mesmo `REVALIDATION_SECRET`.
- Há uma matéria aprovada, publicada e mídia processada para o smoke test.

## Corte

1. Implante primeiro API e Admin pelo repositório CMS.
2. Verifique `GET /v1/news` e `GET /v1/news/{slug}` contra uma matéria publicada. Confirme `version`, ETag, cache e ausência de dados administrativos.
3. Implante o Portal com `NITE_NEWS_SOURCE=api`.
4. Verifique `/atualizacoes`, um slug, metadata, canonical, JSON-LD, robots e sitemap.
5. Publique uma nova matéria pelo CMS e confirme o evento HMAC, a revalidação do Portal e a atualização do sitemap.

## Rollback do Portal

Se a API CMS estiver indisponível ou incompatível, configure explicitamente `NITE_NEWS_SOURCE=static` e reimplante o Portal. Isso restaura apenas a fixture demonstrativa; não altera publicação, banco, outbox ou auditoria do CMS. Não reverta migrations automaticamente.

## Submodule

O Portal funciona sem submodule. Após o CMS existir em `nite-unijorge/nite-cms`, o gitlink será adicionado em `cms/` para registrar um commit já validado. Clone completo: `git clone --recurse-submodules …`; inicialização posterior: `git submodule update --init --recursive cms`. Para editar pelo submodule, troque deliberadamente para uma branch; não edite em detached HEAD. O CI e o deploy do Portal não inicializam nem atualizam o submodule.
