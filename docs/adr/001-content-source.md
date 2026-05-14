# ADR-001 - Fonte de Conteudo

## Status

Proposto

## Contexto

O Portal NITE precisa exibir projetos, atualizacoes, oportunidades, depoimentos e registros institucionais sem inventar dados publicos. As specs aprovadas tambem definem que conteudo ficticio nao pode ser apresentado como real.

Projetos, oportunidades e atualizacoes dependem de conteudo validado, autorizacao quando houver nomes/imagens/depoimentos e governanca minima de revisao. A governanca minima de conteudo permanece Pendente de validacao coletiva com o nucleo.

## Decisao proposta

Quando a implementacao depender de fonte de conteudo, esta ADR deve ser aprovada ou ajustada antes do codigo.

A implementacao inicial pode usar conteudo local/versionado como fonte de verdade se essa for a decisao tecnica futura. Placeholders so podem existir quando estiverem explicitamente sinalizados como placeholder, rascunho ou pendente, sem parecer conteudo institucional real.

## Alternativas consideradas

- Conteudo local versionado.
- CMS avancado desde a primeira versao.
- Dados mockados sem sinalizacao publica.
- Conteudo vindo de canal externo sem governanca minima.

## Consequencias positivas

- Reduz risco de publicar informacao nao validada.
- Mantem rastreabilidade no repositorio quando conteudo local/versionado for usado.
- Permite evoluir para CMS depois sem bloquear o MVP.
- Reforca que conteudo real precisa de autorizacao e revisao.

## Consequencias negativas

- Conteudo local/versionado exige edicao tecnica ou fluxo operacional simples.
- CMS futuro exigira nova decisao tecnica.
- Nao resolve sozinho a governanca editorial final do nucleo.

## Impacto no Portal NITE

Toda feature que exibir dados institucionais deve deixar clara a origem do conteudo, evitar metricas nao validadas, sinalizar placeholders quando existirem e manter conteudo dependente do nucleo como Pendente de validacao coletiva ate decisao formal.
