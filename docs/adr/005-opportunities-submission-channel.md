# ADR-005 - Canal de Inscricao em Oportunidades

## Status

Proposto

## Contexto

A Spec 005 consolidou a decisao de produto para oportunidades: o MVP usara formulario integrado no proprio portal quando houver oportunidade aberta. O formulario deve priorizar e-mail institucional e permitir envio de interesse, curriculo ou dados necessarios ao processo seletivo.

Backend, armazenamento, notificacao, envio efetivo e definicao tecnica de upload/link de curriculo ainda sao dependencias tecnicas futuras.

## Decisao proposta

Usar formulario integrado no proprio portal como canal principal do MVP para oportunidades abertas.

Regras:

- E-mail institucional deve ser priorizado.
- Google Forms nao sera canal principal do MVP.
- Link externo nao sera canal principal do MVP.
- O formulario deve permitir envio de interesse, curriculo ou dados necessarios ao processo seletivo quando houver oportunidade aberta.
- O portal nao deve prometer resposta automatica.
- O portal nao deve prometer aprovacao.
- O portal nao deve prometer acompanhamento completo de candidatura no MVP.
- Backend, armazenamento, notificacao e envio efetivo devem ser definidos antes da implementacao completa.

Esta ADR deve ser candidata a aprovacao antes da implementacao completa do formulario e do fluxo operacional de submissao.

## Alternativas consideradas

- Formulario integrado no portal.
- E-mail institucional.
- Canal externo validado.
- CTA placeholder sem canal real.

## Consequencias positivas

- Evita prometer fluxo de inscricao inexistente.
- Preserva experiencia institucional dentro do portal.
- Permite pagina com estado sem oportunidades abertas.
- Torna dependencia tecnica explicita antes de capturar dados.

## Consequencias negativas

- Exige decisao tecnica futura de backend, armazenamento e notificacao.
- Exige validacao de privacidade e protecao de dados antes de envio real.
- Pode exigir fallback se o backend nao estiver pronto no momento de uma oportunidade aberta.

## Impacto no Portal NITE

A pagina de oportunidades deve indicar claramente se ha processo aberto, usar estado coerente quando nao houver oportunidades e nao exibir canal de inscricao como funcional sem backend/canal operacional definido.
