# ADR-005 - Canal de Inscricao em Oportunidades

## Status

Aceito

## Historico

- 2026-05-15: Aprovada pelo gestor do projeto para liberar a Spec 005 - Opportunities & Selection Flow, com formulario integrado como canal principal do MVP.

## Contexto

A Spec 005 consolidou a decisao de produto para oportunidades: o MVP usara formulario integrado no proprio portal como canal principal quando houver oportunidade aberta. O formulario deve priorizar e-mail institucional quando aplicavel e permitir manifestacao de interesse, envio de curriculo ou dados necessarios ao processo seletivo.

Backend, armazenamento, notificacao, envio efetivo e definicao tecnica de upload/link de curriculo ainda sao dependencias tecnicas futuras.

## Decisao aceita

Usar formulario integrado no proprio portal como canal principal do MVP para oportunidades abertas.

Regras:

- E-mail institucional deve ser priorizado quando aplicavel.
- Google Forms nao sera canal principal do MVP.
- Link externo nao sera canal principal do MVP.
- WhatsApp nao sera canal principal do MVP.
- Google Forms, link externo ou WhatsApp podem existir apenas como contingencia ou canal complementar, se houver decisao operacional futura.
- O formulario deve permitir manifestacao de interesse, envio de curriculo ou dados necessarios ao processo seletivo quando houver oportunidade aberta.
- A pagina `/oportunidades` deve suportar estado sem oportunidades abertas.
- O fluxo deve explicar o que acontece apos o envio.
- O envio de interesse, curriculo ou dados nao garante aprovacao.
- O portal nao deve prometer resposta automatica.
- O portal nao deve prometer acompanhamento completo de candidatura no MVP.
- Backend, armazenamento, notificacao, envio efetivo, upload ou link de curriculo e fluxo operacional devem ser definidos antes da implementacao completa.
- Esta ADR nao escolhe servico externo, webhook, API, banco de dados, automacao, provedor de e-mail ou arquitetura definitiva de backend.
- Privacidade e transparencia devem ser consideradas desde o inicio.
- Nenhum dado sensivel deve ser solicitado sem necessidade.
- Nenhuma vaga, prazo, responsavel, metrica, regra institucional de selecao ou automacao deve ser inventada.

## Premissas de acessibilidade

- Campos precisam ter labels programaticamente associados.
- Instrucoes devem ser claras.
- Erros devem ser textuais, nao apenas por cor.
- Foco visivel deve ser preservado.
- O formulario deve ser operavel por teclado.
- Mensagens de sucesso, erro e fallback devem ser compreensiveis.
- Campos obrigatorios devem ser indicados visual e programaticamente.

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
- Preserva transparencia sobre etapas posteriores ao envio.

## Consequencias negativas

- Exige decisao tecnica futura de backend, armazenamento e notificacao.
- Exige validacao de privacidade e protecao de dados antes de envio real.
- Pode exigir fallback se o backend nao estiver pronto no momento de uma oportunidade aberta.

## Impacto no Portal NITE

A pagina de oportunidades deve indicar claramente se ha processo aberto, usar estado coerente quando nao houver oportunidades e nao exibir canal de inscricao como funcional sem backend/canal operacional definido.

A implementacao da Spec 005 pode iniciar pela estrutura da pagina, estados e componentes, mas a captura real de dados depende de decisao tecnica posterior sobre backend, armazenamento, notificacao, privacidade e fluxo operacional.
