# Task 5 — contrato v2, renderer e Draft Mode no Portal

## Resultado

- O consumidor `@nite/news` usa exclusivamente envelopes `/v2/news` e `NewsArticle.body` como `EditorialDocumentV1`; fixtures e consumidores foram migrados e o body legado não é aceito.
- O renderer do Portal cobre parágrafos, headings, blockquotes, listas, texto com bold/italic/link e imagens. O contrato público exige imagem já resolvida (`src`, dimensões e alt), como o CMS entrega; links aceitam apenas caminhos internos seguros e `https`, `http` ou `mailto`.
- Revalidações aceitam publicação, despublicação e arquivamento e invalidam cache, rota editorial, artigo e sitemap.
- `GET /api/preview` valida o token com o Admin por HTTPS server-to-server antes de habilitar Draft Mode. A sessão é curta e HttpOnly/Secure; a página só mostra a revisão cujo slug e IDs correspondem, sem JSON-LD, canonical, related items ou compartilhamento. Metadata usa `noindex,nofollow` e `no-referrer`; resolver e handlers usam `no-store`.
- `POST /api/preview/exit` desabilita Draft Mode, expira a sessão e impede `returnTo` externo. A página possui faixa de saída explícita.
- O gitlink do CMS foi atualizado para `25c76d61eba9b55256c45fd8a217201f6a6f2da3`.

## Revisão e correções desta retomada

- O AST do consumidor aceitava imagem somente com `mediaId`, embora o renderer não conseguisse exibi-la. Agora a API pública deve fornecer a imagem resolvida, coerente com `cms/packages/editorial/src/public-news.ts`.
- Um caminho com barra invertida após `/` podia passar pelo filtro de links e ser interpretado pelo navegador como outra origem; ele agora é rejeitado.
- A prévia ainda exibia compartilhamento. O botão foi omitido para evitar compartilhar título ou URL de uma revisão privada.

## RED/GREEN desta retomada

1. RED: teste de link `"/\\\\externo.test/materia"` foi aceito; GREEN: passou após rejeitar a forma com barra invertida.
2. RED: `EditorialDocumentV1` aceitou imagem não resolvida; GREEN: passou após tornar `src`, `width` e `height` obrigatórios no contrato público.
3. RED: a página de prévia ainda expunha `Compartilhar matéria`; GREEN: passou após restringir o botão à matéria pública.

## Arquivos principais

- `packages/news/src/schema.ts`, `client.ts`, `revalidation.ts` e fixtures/testes
- `packages/ui/src/news-article-body.tsx`
- `apps/web/src/app/atualizacoes/[slug]/page.tsx` e `apps/web/package.json`
- `apps/web/src/app/api/preview/*` e `apps/web/src/lib/news-preview.ts`
- `apps/web/src/app/api/revalidate/news/route.ts`
- `docs/architecture.md`

## Validações

- Testes RED dirigidos: falharam pelos motivos esperados acima.
- Testes GREEN dirigidos: `@nite/news` schema (2/2), `@nite/ui` renderer (3/3) e prévia da página (1/1) aprovados.
- `npm run test:affected`: 4 workspaces concluídos; `@nite/news` 20, `@nite/ui` 3 e `@nite/web` 120 testes aprovados. O aviso de configuração ESM do Vite já existia e não falha a suíte.
- `npm run typecheck`: aprovado nos 4 workspaces após a alteração final.
- `npm run check:deadcode`: não aponta mais arquivos, exports ou dependências da Task 5; permanece apenas a varredura indevida de 100 arquivos em `cms/**`, pendência da Task 6.
- `npm run check`: interrompido no `format:check` por `docs/plans/2026-08-28-cms-editorial-mvp-pendencies-2-5.md`, arquivo preexistente fora desta tarefa. Por isso lint, testes e builds dentro desse comando não foram executados novamente; typecheck e testes afetados acima são a evidência válida do código final.
- `npm run test:visual` com `NITE_NEWS_SOURCE=static`: 164 passaram; 8 falharam apenas por baselines inexistentes de `updates` e `update-detail` em desktop/mobile e light/dark. Não houve comparação de imagem disponível. Conforme decisão explícita, nenhum baseline foi criado/adicionado e os diretórios PNG não rastreados foram removidos.
- `git diff --check`: aprovado antes da validação final.

## Pendências e limites reais

- A prévia real depende de `CMS_PREVIEW_RESOLVE_URL` e da autenticação/configuração do Admin em homologação; esta tarefa só valida contratos e mocks locais.
- A regressão visual de News permanece sem baseline intencionalmente. O resultado não é um verde visual completo e não deve ser apresentado como tal.
- `npm run check` não alcançou os estágios posteriores porque o Prettier encontrou arquivo preexistente fora da Task 5. A configuração do Knip para o submódulo `cms/**` continua pertencendo à Task 6 e não foi alterada.
