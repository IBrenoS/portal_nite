# Deploy dinâmico de preview na Vercel

## Escopo

O projeto Vercel `portal-nite` publica `apps/web-preview` no alias
`https://portal-nite.vercel.app`. Este ambiente existe para revisar conteúdo
editorial privado e não substitui o Portal público `https://nite.tec.br`, que
continua independente na Cloudflare.

## Configuração do projeto

- Root Directory: `apps/web-preview`
- Framework Preset: Next.js
- Production Branch: `main`
- `NEXT_PUBLIC_SITE_URL=https://nite.tec.br`
- `NITE_NEWS_SOURCE=api`
- `CMS_PUBLIC_API_URL=https://nite-cms-api.vercel.app/`
- `CMS_PREVIEW_RESOLVE_URL=https://nite-cms-admin.vercel.app/api/preview/resolve`
- `NITE_NEWS_MEDIA_URL`: a mesma base pública R2 usada pelo Portal/CMS

Não registre `PREVIEW_HMAC_SECRET`, URLs de banco ou credenciais R2 no Portal.
No CMS Admin, `PORTAL_PREVIEW_URL` deve ser
`https://portal-nite.vercel.app/api/preview`.

## Validação

1. Confirme que `GET /api/preview` sem token retorna `401`, nunca `404`.
2. Confirme `X-Robots-Tag: noindex, nofollow, noarchive` em uma página pública.
3. Confirme que `/robots.txt` contém `Disallow: /`.
4. Confirme que `GET /v2/news` na origem configurada em `CMS_PUBLIC_API_URL`
   responde sem autenticação da Vercel e que `/atualizacoes` exibe somente as
   matérias publicadas retornadas pela API.
5. Abra uma matéria publicada por slug e valide capa, corpo, metadata e mídia
   pública real.
6. Pelo CMS autenticado, abra uma revisão não publicada e valide faixa de
   prévia, conteúdo, imagem e saída por `POST /api/preview/exit`.
7. Teste tokens adulterado e expirado; ambos devem retornar `401` genérico.
8. Durante o smoke, observe logs dos três projetos sem copiar token ou conteúdo
   privado para tickets, terminal ou chat.

## Rollback

Promova o deployment Vercel anterior e restaure temporariamente o Root
Directory anterior. Não altere DNS, `nite.tec.br`, Cloudflare, banco, migrations
ou conteúdo editorial. A indisponibilidade da prévia não deve afetar o Portal
público.

## Quick Tunnel

O Quick Tunnel é apenas uma alternativa histórica para desenvolvimento local.
Ele não integra a operação normal, não deve aparecer em variáveis da Vercel e
não substitui o CMS Admin publicado.
