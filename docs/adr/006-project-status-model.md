# ADR-006 - Modelo de Status de Projetos

## Status

Aceito

## Historico

- 2026-05-15: Aprovada pelo gestor do projeto para liberar ProjectCard, StatusBadge aplicado e portfolio de projetos.

## Contexto

A Spec 004 define um modelo de projeto com status publicos para evitar que projetos em estruturacao parecam concluidos ou validados sem evidencia.

Status de projeto tambem orientam filtros, badges, cards e paginas individuais.

O StatusBadge ja esta consolidado na Spec 003 como componente visual para status com label textual visivel, apoio visual opcional e sem dependencia exclusiva de cor. A proxima implementacao de ProjectCard e portfolio de projetos depende de uma taxonomia aceita para aplicar esse componente em dados reais ou pendentes de forma honesta.

## Decisao aceita

Adotar os estados internos e labels publicas abaixo:

| Status tecnico | Label publica   |
| -------------- | --------------- |
| `draft`        | Em estruturacao |
| `in_progress`  | Em andamento    |
| `validated`    | Validado        |
| `done`         | Finalizado      |
| `archived`     | Arquivado       |

Regras:

- Status deve usar label textual.
- Status nao pode depender apenas de cor.
- Status pode usar cor/icone apenas como apoio.
- Status deve ser compativel com o StatusBadge consolidado na Spec 003.
- `archived` deve existir para preservar historico sem parecer projeto ativo.
- `draft` deve indicar projeto ainda em estruturacao, sem parecer entrega final.
- Projetos em estruturacao nao devem parecer finalizados.
- Projetos sem evidencias publicas devem usar fallback honesto.
- Nenhum status deve ser usado para inventar andamento, validacao, conclusao, evidencias ou resultado real nao validado.
- Campos opcionais de projeto continuam opcionais conforme a Spec 004; esta ADR nao torna evidencias, responsaveis, repositorio, demo, depoimentos, resultados, galeria ou documentos obrigatorios.
- Estados vazios, ausentes e pendentes da Spec 004 devem ser preservados.
- Mudancas futuras no modelo de status exigem atualizacao da Spec 004 e revisao desta ADR.

Esta ADR libera a aplicacao real de StatusBadge em ProjectCard, filtros e paginas de projeto, sem criar ProjectCard, rotas, conteudo institucional ou dados reais nesta etapa.

## Alternativas consideradas

- Status livre em texto.
- Apenas ativo/inativo.
- Estados controlados com labels publicas.

## Consequencias positivas

- Evita ambiguidade sobre maturidade do projeto.
- Facilita filtros e badges.
- Ajuda a nao apresentar entrega incompleta como concluida.
- Mantem linguagem publica consistente.
- Libera ProjectCard e portfolio de projetos com uma taxonomia rastreavel e coerente com a Spec 004.

## Consequencias negativas

- Exige mapeamento publico cuidadoso dos labels.
- Pode precisar de migracao se estados futuros forem adicionados.
- Exige disciplina para manter status real atualizado.
- Exige validacao para impedir que status visual sugira evidencia, resultado ou maturidade nao documentada.

## Impacto no Portal NITE

Cards e paginas de projeto devem exibir status real com label textual, apoio visual acessivel e fallback honesto quando faltarem evidencias publicas.

ProjectCard, filtros e paginas de projeto podem aplicar StatusBadge aos status aceitos, desde que cada status represente o estado real validado ou explicitamente pendente do projeto e nao substitua evidencias, responsaveis autorizados, resultados ou proximos passos.
