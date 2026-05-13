# ADR-001 - Fonte de Conteudo

## Status

Proposto

## Contexto

O Portal NITE precisa exibir projetos, noticias, oportunidades, depoimentos e registros institucionais sem inventar dados publicos. A spec mae tambem define que conteudo ficticio nao pode ser apresentado como real.

## Decisao

Usar conteudo local versionado como fonte inicial de verdade e permitir placeholders somente quando estiverem explicitamente sinalizados. A adocao de CMS avancado fica fora do escopo inicial.

## Alternativas consideradas

- Conteudo local versionado.
- CMS avancado desde a primeira versao.
- Dados mockados sem sinalizacao publica.

## Consequencias positivas

- Reduz risco de publicar informacao nao validada.
- Mantem rastreabilidade no repositorio.
- Permite evoluir para CMS depois sem bloquear o MVP.

## Consequencias negativas

- Exige edicao via codigo ou arquivos versionados.
- Nao resolve fluxo editorial completo.

## Impacto no Portal NITE

Toda feature que exibir dados institucionais deve deixar clara a origem do conteudo, evitar metricas nao validadas e sinalizar placeholders quando existirem.
