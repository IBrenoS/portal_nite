# ADR-006 - Modelo de Status de Projetos

## Status

Proposto

## Contexto

A spec de portfolio define um modelo de projeto com status publicos para evitar que projetos em estruturacao parecam concluidos.

## Decisao

Adotar os estados internos `draft`, `in_progress`, `validated`, `done` e `archived`, com labels publicas definidas na spec de portfolio antes da implementacao.

## Alternativas consideradas

- Status livre em texto.
- Apenas ativo/inativo.
- Estados controlados com labels publicas.

## Consequencias positivas

- Evita ambiguidade sobre maturidade do projeto.
- Facilita filtros e badges.
- Ajuda a nao apresentar entrega incompleta como concluida.

## Consequencias negativas

- Exige mapeamento publico cuidadoso dos labels.
- Pode precisar de migracao se estados futuros forem adicionados.

## Impacto no Portal NITE

Cards e paginas de projeto devem exibir status real, com fallback honesto quando faltarem evidencias publicas.
