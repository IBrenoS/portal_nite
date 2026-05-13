# ADR-005 - Canal de Inscricao em Oportunidades

## Status

Proposto

## Contexto

A spec de oportunidades preve CTA para envio de curriculo ou contato e deixa formulario de candidatura como possibilidade futura.

## Decisao

Na primeira versao, definir explicitamente um canal real antes de publicar qualquer oportunidade. O canal pode ser formulario, e-mail ou link externo, mas nao deve ser simulado como funcional sem validacao.

## Alternativas consideradas

- Formulario proprio desde a primeira versao.
- E-mail institucional.
- Link externo validado.
- CTA placeholder sem canal real.

## Consequencias positivas

- Evita prometer fluxo de inscricao inexistente.
- Permite lancar pagina com estado sem vagas abertas.
- Mantem flexibilidade para formulario futuro.

## Consequencias negativas

- A decisao final do canal ainda depende de validacao operacional.
- Pode exigir revisao quando houver processo seletivo real.

## Impacto no Portal NITE

A pagina de oportunidades deve indicar claramente se ha vagas abertas e qual e o proximo passo real do usuario.
