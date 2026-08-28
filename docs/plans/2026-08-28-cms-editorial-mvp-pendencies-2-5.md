# CMS Editorial NITE — implementação das pendências 2–5

## Objetivo

Completar RBAC e memberships, ciclo editorial, documento rico, mídia em dois
buckets e preview fiel no Portal, preservando a arquitetura aprovada: CMS em
repositório independente, API pública em `apps/api`, integração com o Portal
somente por HTTP e HMAC.

## Restrições globais

- Papéis finais: somente `publisher | admin`.
- Estados: `draft | published | archived`.
- `publishedAt` é a primeira publicação; restauração sempre volta para
  `draft`; slug bloqueia definitivamente após a primeira publicação.
- Toda mutação editorial usa `expectedRevisionId`; conflito não altera estado.
- `NewsArticle.body` passa diretamente para um único `EditorialDocumentV1`,
  sem corpo legado paralelo. A API pública passa de `/v1` para `/v2`.
- Documento v1: parágrafos, H2/H3, listas ordenadas/não ordenadas, citações,
  imagens, negrito, itálico e links HTTP(S), `mailto:` ou internos. Sem HTML,
  vídeo ou embeds.
- Leitura estimada: 200 palavras/minuto, arredondada para cima e limitada a
  1–30 minutos.
- Mídia: raster JPEG/PNG/WebP, até 10 MB, máximo 2400 px, EXIF removido, WebP,
  staging privado e bucket público; chaves imutáveis e nenhuma deleção.
- Preview: token HMAC de 10 minutos com `articleId`, `revisionId`, `expiresAt`
  e `nonce`; Draft Mode, cookie temporário HttpOnly e isolamento por revisão.
- Não executar migrations, deploys ou alterações de secrets em produção.
- Fora do escopo: rearquitetura, compatibilidade `/v1`, UI compartilhada,
  agendamento, aprovação, autosave, exclusão e retry manual genérico da outbox.
- Aplicar TDD: cada comportamento novo deve ter teste observado falhando antes
  do código de produção correspondente.

## Task 1: Domínio de acesso, memberships e ciclo editorial

- Migrar `cms_role` de `admin | editor | author` para `admin | publisher`.
  Converter `editor` para `publisher`; converter eventual `author` para
  `publisher` inativo.
- Implementar serviços administrativos de memberships por `tid + oid`, com
  criação, troca de papel, ativação/desativação, atualização de perfil Entra,
  auditoria, proibição para publisher, proteção contra auto-bloqueio e contra
  remoção do último admin ativo.
- Implementar `unpublishArticle`, `archiveArticle` e `restoreArticle`, com
  transições válidas, `expectedRevisionId`, auditoria e outbox quando conteúdo
  público sair do ar.
- Preservar `publishedAt` na republicação e usar essa existência para bloquear
  o slug permanentemente.
- Cobrir migrations, permissões, transições, concorrência e atomicidade com
  testes PGlite/Vitest antes da implementação.

## Task 2: Documento editorial rico e API pública v2 no CMS

- Definir e validar `EditorialDocumentV1` como corpo canônico versionado.
- Configurar conversão Tiptap, validação de nós/marks/links, referências de
  mídia e cálculo server-side de leitura a 200 palavras/minuto.
- Remover `readTimeMinutes` da entrada administrativa e derivá-lo ao criar cada
  revisão; gerar slug a partir do título enquanto ainda editável.
- Atualizar a view/mapeamento público e substituir `/v1/news` por `/v2/news`,
  com envelopes `version: 2`; remover rotas e contratos v1.
- Cobrir AST, sanitização, leitura, serialização e respostas v2 com testes
  falhando primeiro.

## Task 3: Mídia em dois buckets R2

- Separar `stagingObjectKey` e `publicObjectKey` em `media_assets`, com
  invariantes de status e view pública usando apenas a chave pública.
- Substituir `R2_BUCKET` por `R2_STAGING_BUCKET` e `R2_PUBLIC_BUCKET`.
- Presigned upload e leitura usam staging; processamento grava WebP no bucket
  público e retém o original. Remover `DeleteObject` do contrato.
- Validar MIME/magic bytes/tamanho, remover EXIF, limitar a 2400 px e exigir
  asset `ready` e alt para capa e imagem inline.
- Cobrir seleção de buckets, ausência de deleção, falhas e transformação com
  testes falhando primeiro.

## Task 4: Superfícies administrativas e preview privado do CMS

- Criar tela admin-only de memberships com estados vazio, erro, validação e
  pending; publishers não veem nem acessam ações administrativas.
- Completar toolbar Tiptap para H2/H3, listas, citação, bold, italic, links e
  imagens prontas com alt obrigatório; manter acessibilidade e edição explícita.
- Expor ações de publicar, despublicar, arquivar e restaurar conforme estado,
  com confirmações e mensagens de conflito.
- Emitir token HMAC de 10 minutos e criar `POST /api/preview/resolve`, validando
  assinatura/expiração e retornando a revisão exata com `private, no-store`.
- Preparar Playwright do Admin e cobrir fluxos críticos possíveis localmente;
  manter validação real Entra/R2 para staging.

## Task 5: Contrato v2, renderer e Draft Mode no Portal

- Migrar `@nite/news`, fixtures e consumidores para `NewsArticle.body` como
  `EditorialDocumentV1` e endpoints `/v2/news`; não aceitar body legado.
- Atualizar o renderer semântico para todos os nós/marks, com imagens, links
  seguros, acessibilidade e testes de componente.
- Estender eventos de revalidação para publicação/despublicação/arquivamento e
  invalidar lista, artigo, categoria, rotas e sitemap.
- Criar `GET /api/preview`, cookie temporário seguro, consulta server-to-server
  ao Admin, `await draftMode().enable()`, render isolado da revisão, estado
  “Prévia — ainda não publicada”, noindex/nofollow, no-referrer e no-store.
- Criar `POST /api/preview/exit` e faixa de saída explícita.
- Cobrir contrato, token inválido/expirado, isolamento, metadata e saída com
  testes falhando primeiro e regressão visual aplicável.

## Task 6: Documentação, tooling, validação e rollout

- Atualizar arquitetura, produto, especificação e runbook para a topologia
  independente aprovada, API v2, dois buckets, memberships e preview.
- Documentar `R2_STAGING_BUCKET`, `R2_PUBLIC_BUCKET`, `PORTAL_PREVIEW_URL`,
  `CMS_PREVIEW_RESOLVE_URL` e `PREVIEW_HMAC_SECRET` sem valores secretos.
- Garantir que o tooling raiz ignore o submódulo `cms`, validado separadamente.
- Executar testes direcionados, `npm run check` no CMS, `npm run test:affected`,
  `npm run check` e `npm run test:visual` no Portal.
- Não executar migration nem deploy. Registrar como pendente o smoke test de
  staging com contas Entra, Neon, R2 e domínios reais.

