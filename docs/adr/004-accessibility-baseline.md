# ADR-004 - Baseline de Acessibilidade

## Status

Aceito

## Historico

- 2026-05-14: Aprovada pelo gestor do projeto apos Readiness Audit para primeira implementacao controlada.

## Contexto

A Spec 007 define acessibilidade, responsividade, SEO e performance como requisitos minimos para todas as features do portal.

WCAG 2.2 e a referencia de acessibilidade. Contraste minimo e baseline universal de legibilidade, nao um modo acessivel opcional.

## Decisao aceita

Exigir baseline minima de acessibilidade para entregas do MVP:

- WCAG 2.2 como referencia.
- WCAG AA como referencia minima de contraste.
- 4.5:1 para texto normal.
- 3:1 para texto grande.
- Navegacao por teclado.
- Foco visivel.
- Semantica HTML.
- Headings logicos.
- Landmarks semanticos.
- Texto alternativo em imagens informativas.
- Labels e mensagens claras em formularios.
- Estados vazio, erro, loading e sucesso compreensiveis.
- Suporte a `prefers-reduced-motion`.
- Padrao de disclosure navigation para controles expansivos quando aplicavel: botoes reais, estado expandido comunicado e conteudo expansivel previsivel.
- Nao usar `role="menu"` ou `role="menubar"` sem necessidade em navegacao comum.

A validacao final ocorre na implementacao e release. Esta ADR foi aprovada para orientar a primeira implementacao controlada de base visual e tokens.

## Alternativas consideradas

- Validar acessibilidade apenas no fim da release.
- Aplicar baseline minimo por feature.
- Depender apenas de revisao visual manual.

## Consequencias positivas

- Reduz regressao em componentes compartilhados.
- Torna validacao mais objetiva.
- Alinha produto institucional com acesso universal.
- Evita tratar legibilidade como preferencia opcional do usuario.

## Consequencias negativas

- Aumenta custo de validacao por entrega.
- Exige disciplina para registrar evidencias.
- Exige revisao real em componentes, rotas e estados.

## Impacto no Portal NITE

Nenhuma feature interativa deve ser considerada pronta sem validacao minima de teclado, foco, contraste, semantica, responsividade e comportamento com movimento reduzido quando aplicavel.

Header, MegaMenu desktop e menu mobile em camadas devem preservar navegacao por teclado, foco visivel, controles expansivos com botoes reais, links reais para navegacao, fechamento previsivel e suporte a `prefers-reduced-motion`.
