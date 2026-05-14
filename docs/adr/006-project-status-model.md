# ADR-006 - Modelo de Status de Projetos

## Status

Proposto

## Contexto

A Spec 004 define um modelo de projeto com status publicos para evitar que projetos em estruturacao parecam concluidos ou validados sem evidencia.

Status de projeto tambem orientam filtros, badges, cards e paginas individuais.

## Decisao proposta

Adotar os estados internos e labels publicas abaixo:

| Status tecnico | Label publica |
|---|---|
| `draft` | Em estruturacao |
| `in_progress` | Em andamento |
| `validated` | Validado |
| `done` | Finalizado |
| `archived` | Arquivado |

Regras:

- Status deve usar label textual.
- Status nao pode depender apenas de cor.
- Status pode usar cor/icone apenas como apoio.
- Projetos em estruturacao nao devem parecer finalizados.
- Projetos sem evidencias publicas devem usar fallback honesto.
- Mudancas futuras no modelo de status exigem atualizacao da Spec 004 e revisao desta ADR.

Esta ADR deve ser candidata a aprovacao antes de implementar StatusBadge, filtros ou paginas de projeto.

## Alternativas consideradas

- Status livre em texto.
- Apenas ativo/inativo.
- Estados controlados com labels publicas.

## Consequencias positivas

- Evita ambiguidade sobre maturidade do projeto.
- Facilita filtros e badges.
- Ajuda a nao apresentar entrega incompleta como concluida.
- Mantem linguagem publica consistente.

## Consequencias negativas

- Exige mapeamento publico cuidadoso dos labels.
- Pode precisar de migracao se estados futuros forem adicionados.
- Exige disciplina para manter status real atualizado.

## Impacto no Portal NITE

Cards e paginas de projeto devem exibir status real com label textual, apoio visual acessivel e fallback honesto quando faltarem evidencias publicas.
