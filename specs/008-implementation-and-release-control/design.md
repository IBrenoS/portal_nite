# Design - Implementation & Release Control

## Direcao operacional

Esta spec funciona como guia de trabalho para sair da documentacao SDD e iniciar implementacao controlada. O objetivo e manter rastreabilidade entre decisao, task, codigo, validacao e evidencia.

## Ordem recomendada de implementacao

1. Base visual e navegacao.
2. Home premium.
3. Projetos.
4. Oportunidades.
5. Atualizacoes.
6. Qualidade e release.

Essa ordem reduz risco porque implementa primeiro tokens, componentes, navegacao e estrutura base antes das paginas dependentes.

## Modelo de execucao de task

Cada task de implementacao deve seguir o fluxo:

1. Confirmar spec vinculada.
2. Confirmar criterios de aceite.
3. Confirmar dependencias e ADRs aplicaveis.
4. Identificar arquivos provaveis de alteracao.
5. Implementar somente o escopo da task.
6. Validar desktop e mobile quando visual.
7. Validar teclado/foco quando interativo.
8. Validar SEO/performance quando aplicavel.
9. Registrar evidencias.
10. Declarar pendencias.

## Matriz de validacao por spec

| Spec | Validacao obrigatoria na implementacao |
|---|---|
| Spec 002 - Information Architecture & Navigation | Rotas, header, mega menu, mobile accordion, CTAs e estados de navegacao |
| Spec 003 - Visual Identity & Design System | Tokens, componentes base, variantes, estados, contraste, motion e responsividade visual |
| Spec 004 - Project Portfolio & Detail Pages | Modelo de projeto, ProjectCard, status, filtros, paginas de detalhe e conteudo autorizado |
| Spec 005 - Opportunities & Selection Flow | Estado sem oportunidades, formulario integrado, e-mail institucional, privacidade e dependencias tecnicas |
| Spec 006 - News, Community & Timeline | Atualizacoes, UpdateCard, timeline, fotos/depoimentos autorizados e rotas futuras |
| Spec 007 - Accessibility, SEO & Performance Baseline | Teclado, foco, contraste, headings, alt text, SEO, performance, responsividade e estados |

## Fluxo de PR

Todo PR deve:

- Referenciar spec, milestone e task.
- Explicar objetivo e escopo.
- Listar arquivos alterados.
- Informar criterios de aceite atendidos.
- Anexar evidencia visual quando houver UI.
- Registrar validacao desktop/mobile.
- Registrar validacao de teclado/foco quando aplicavel.
- Registrar revisao de SEO/performance quando aplicavel.
- Declarar pendencias e decisoes externas.
- Confirmar que nao publicou conteudo ficticio como real.

## Fluxo de release

Release MVP Premium deve seguir:

1. Revisar todas as rotas MVP.
2. Revisar CTAs aprovados.
3. Revisar conteudo real vs placeholder.
4. Revisar acessibilidade minima.
5. Revisar SEO basico.
6. Revisar performance e mobile.
7. Revisar ADRs necessarias.
8. Revisar governanca pendente.
9. Registrar pendencias conhecidas.
10. Preparar release apenas com evidencias reais.

## Politica de pendencias

- Pendencia nao deve ser escondida em texto generico.
- Pendencia deve ter motivo, impacto e proximo passo.
- Pendencia externa deve indicar dependencia, como validacao coletiva do nucleo.
- Pendencia tecnica deve indicar spec, ADR ou tarefa futura relacionada.
- Pendencia nao pode ser convertida em task concluida sem evidencia.

## Controle de conteudo

- Conteudo real precisa de validacao/autorizacao.
- Placeholder publico precisa estar sinalizado.
- Conteudo sem autorizacao deve ficar oculto, pendente ou com fallback honesto.
- Fotos, depoimentos, nomes, autores, datas, metricas e responsaveis nao devem ser inventados.
- Estado vazio e preferivel a conteudo ficticio.

## Controle de ADR

- ADR Proposto nao e decisao aprovada.
- Implementacao que depende de ADR deve pausar para aprovar ou rejeitar a ADR.
- ADR aprovado deve explicar contexto, decisao, alternativas e consequencias.
- Mudanca tecnica relevante sem ADR aplicavel deve registrar se ADR e necessaria antes da implementacao.

## Controle de regressao

Antes de concluir uma task, revisar:

- A mudanca contradiz alguma spec anterior?
- A mudanca quebrou navegacao, layout, foco, teclado ou responsividade?
- A mudanca publicou conteudo nao validado?
- A mudanca removeu estado vazio, erro, loading ou sucesso?
- A mudanca exige ADR antes de continuar?
- A mudanca gerou nova pendencia que precisa ser documentada?

## Primeira task de implementacao

A primeira task recomendada deve vir da Fase 1 - Base visual e navegacao. Ela deve ser pequena, referenciar Specs 002, 003 e 007, e validar pelo menos:

- Tokens aplicados sem alterar valores aprovados.
- Componente base ou navegacao com foco visivel.
- Responsividade inicial.
- Ausencia de conteudo ficticio.
- Evidencia visual ou checklist manual.

Essa recomendacao nao inicia implementacao; apenas orienta a primeira escolha quando a etapa de codigo for autorizada.
