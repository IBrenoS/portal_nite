# Integração do CMS Editorial NITE

**Status:** implementação local; homologação com recursos reais pendente

## Decisão

O CMS é um repositório independente. O Portal não importa código, migrations,
tipos privados nem credenciais editoriais do CMS. As únicas integrações são:

- leitura pública por HTTPS em `/v2/news` e `/v2/news/{slug}`;
- revalidação do Portal por webhook HMAC;
- resolução server-to-server da prévia pelo Admin;
- leitura de WebPs imutáveis no domínio público de mídia.

`@nite/news` mantém o contrato consumidor local e valida envelopes
`version: 2`. O corpo é somente `EditorialDocumentV1`; não existe parser ou
adapter `/v1` em paralelo.

## Contrato editorial

O documento aceita parágrafos, H2/H3, listas ordenadas e não ordenadas,
citações e imagens, além de bold, italic e links HTTP(S), `mailto:` ou caminhos
internos seguros. HTML livre, vídeo, embeds, links perigosos e imagens não
resolvidas são rejeitados. O tempo de leitura é derivado no servidor a 200
palavras por minuto e limitado a 1–30 minutos.

O ciclo é `draft -> published`, `published -> draft` ao despublicar,
`draft|published -> archived` e `archived -> draft` ao restaurar. Toda mutação
usa `expectedRevisionId`. `publishedAt` registra a primeira publicação e o slug
fica bloqueado permanentemente depois dela.

## Acesso e mídia

Os papéis finais são `publisher | admin`. Ambos operam qualquer matéria; só
`admin` administra memberships por `tid + oid`, sem exclusão, com proteções
contra auto-bloqueio e remoção do último admin ativo.

Uploads raster JPEG/PNG/WebP de até 10 MB entram em `R2_STAGING_BUCKET`,
privado. O processamento verifica bytes e MIME, remove EXIF, limita a 2400 px e
grava WebP sob chave imutável em `R2_PUBLIC_BUCKET`, servido por
`R2_PUBLIC_BASE_URL`. O original é retido e o MVP não requer `DeleteObject`.
Capa e imagens inline exigem asset `ready` e alt.

## Preview e cache público

O Admin emite um token HMAC de até dez minutos com `articleId`, `revisionId`,
`expiresAt` e `nonce`. O Portal encaminha o token para
`CMS_PREVIEW_RESOLVE_URL`; só uma resposta válida habilita Draft Mode e o cookie
temporário `HttpOnly`, `Secure` e `SameSite=Lax`. Apenas o slug e a revisão do
token recebem dados privados. Preview usa `private, no-store`,
`noindex,nofollow`, `Referrer-Policy: no-referrer`, não gera canonical nem
JSON-LD e possui saída explícita por POST.

Publicação, despublicação e arquivamento produzem eventos de outbox e invalidam
cache de News, lista, artigo, filtros/categoria e sitemap. Nenhuma alteração de
secret, migration ou deploy faz parte desta especificação.

## Configuração da fronteira

- CMS Admin: `PORTAL_PREVIEW_URL`, `PREVIEW_HMAC_SECRET` e os dois buckets R2.
- CMS API: `DATABASE_PUBLIC_URL` e `R2_PUBLIC_BASE_URL`.
- Portal: `CMS_PUBLIC_API_URL`, `CMS_PREVIEW_RESOLVE_URL` e
  `NITE_NEWS_MEDIA_URL`.
- Admin e Portal: `REVALIDATION_SECRET` no canal de webhook.

Valores e credenciais ficam exclusivamente no provedor de cada aplicação.

## Aceite operacional pendente

Antes da primeira matéria real, homologar login Entra autorizado e não
autorizado, gestão de memberships, PostgreSQL com papéis separados, upload e
processamento nos dois buckets, API v2, preview entre projetos, revalidação e
saída do Draft Mode usando domínios reais.
