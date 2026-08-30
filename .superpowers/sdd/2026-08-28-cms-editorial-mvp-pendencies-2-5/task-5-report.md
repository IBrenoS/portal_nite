# Task 5 — contrato v2, renderer e Draft Mode no Portal

## Resultado

- O consumidor `@nite/news` usa exclusivamente envelopes `/v2/news` e `NewsArticle.body` como `EditorialDocumentV1`; fixtures e consumidores foram migrados e o body legado não é aceito.
- O renderer do Portal cobre parágrafos, headings, blockquotes, listas, texto com bold/italic/link e imagens. O contrato público exige imagem já resolvida (`src`, dimensões e alt), como o CMS entrega; links aceitam apenas caminhos internos seguros e `https`, `http` ou `mailto`.
- Revalidações aceitam publicação, despublicação e arquivamento e invalidam cache, rota editorial, artigo e sitemap.
- `GET /api/preview` valida o token com o Admin por HTTPS server-to-server antes de habilitar Draft Mode. A sessão é curta e HttpOnly/Secure; a página só mostra a revisão cujo slug e IDs correspondem, sem JSON-LD, canonical, related items ou compartilhamento. Metadata usa `noindex,nofollow` e `no-referrer`; resolver e handlers usam `no-store`.
- `POST /api/preview/exit` desabilita Draft Mode, expira a sessão e impede `returnTo` externo. A página possui faixa de saída explícita.
- O gitlink do CMS foi atualizado para `3e5e3e8c0f813c69bca224996d77d58d92b11a32`.

## Revisão e correções desta retomada

- O AST do consumidor aceitava imagem somente com `mediaId`, embora o renderer não conseguisse exibi-la. Agora a API pública deve fornecer a imagem resolvida, coerente com `cms/packages/editorial/src/public-news.ts`.
- Um caminho com barra invertida após `/` podia passar pelo filtro de links e ser interpretado pelo navegador como outra origem; ele agora é rejeitado.
- A prévia ainda exibia compartilhamento. O botão foi omitido para evitar compartilhar título ou URL de uma revisão privada.

## RED/GREEN desta retomada

1. RED: teste de link `"/\\\\externo.test/materia"` foi aceito; GREEN: passou após rejeitar a forma com barra invertida.
2. RED: `EditorialDocumentV1` aceitou imagem não resolvida; GREEN: passou após tornar `src`, `width` e `height` obrigatórios no contrato público.
3. RED: a página de prévia ainda expunha `Compartilhar matéria`; GREEN: passou após restringir o botão à matéria pública.

## Rodada de correções da revisão

1. `POST /api/preview/exit` agora rejeita qualquer barra invertida e só aceita um destino que, após ser resolvido, mantém a mesma `origin` da requisição. Os casos `/%5Cevil.test/path` e `//evil.test/path` redirecionam para `/atualizacoes`.
2. `getPreviewArticleForSlug` passou a usar `cache()` do React. Assim, `generateMetadata` e a página compartilham uma única resolução da prévia por request, sem cache entre requests. O teste verifica uma única chamada ao resolver e a mesma revisão para ambos os consumidores.
3. O consumidor e o produtor CMS rejeitam qualquer barra invertida em caminhos internos. A correção do CMS foi commitada em `3e5e3e8` antes da atualização do gitlink.
4. `EditorialContentNode` não inclui mais `listItem`: ele é um tipo recursivo separado e só é válido como filho direto de `bulletList` ou `orderedList`. Casos no nível raiz e dentro de `blockquote` são rejeitados pelo schema, enquanto o renderer continua a receber itens apenas das listas.
5. A faixa da prévia usa “ainda não publicada” somente quando `publishedAt` é `null`. Para revisões de matéria já publicada, também normaliza o timestamp ISO antes de formatar a data editorial.

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
- Correção de revisão: testes RED dirigidos confirmaram os cinco defeitos; GREEN dirigido aprovou `@nite/editorial` (16), `@nite/news` schema (3), `@nite/ui` renderer (3) e os três arquivos web de preview/exit/cache (6).
- Correção de revisão: `npm run typecheck` foi aprovado nos 4 workspaces e `npm run test:affected` foi executado após a correção, sem falhas. O aviso ESM do Vite continua apenas informativo.
- Não executei `npm run test:visual` nesta rodada por instrução explícita: os baselines permanecem ausentes intencionalmente e nenhum snapshot foi alterado.

## Pendências e limites reais

- A prévia real depende de `CMS_PREVIEW_RESOLVE_URL` e da autenticação/configuração do Admin em homologação; esta tarefa só valida contratos e mocks locais.
- A regressão visual de News permanece sem baseline intencionalmente. O resultado não é um verde visual completo e não deve ser apresentado como tal.
- `npm run check` não alcançou os estágios posteriores porque o Prettier encontrou arquivo preexistente fora da Task 5. A configuração do Knip para o submódulo `cms/**` continua pertencendo à Task 6 e não foi alterada.
