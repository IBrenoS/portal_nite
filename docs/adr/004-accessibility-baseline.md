# ADR-004 - Baseline de Acessibilidade

## Status

Proposto

## Contexto

A spec de baseline define acessibilidade, responsividade, SEO e performance como requisitos minimos para todas as features do portal.

## Decisao

Exigir baseline minimo de acessibilidade para entregas: navegacao por teclado, foco visivel, contraste adequado, headings logicos, landmarks semanticos, texto alternativo em imagens informativas e suporte a `prefers-reduced-motion`.

## Alternativas consideradas

- Validar acessibilidade apenas no fim da release.
- Aplicar baseline minimo por feature.
- Depender apenas de revisao visual manual.

## Consequencias positivas

- Reduz regressao em componentes compartilhados.
- Torna validacao mais objetiva.
- Alinha produto institucional com acesso universal.

## Consequencias negativas

- Aumenta custo de validacao por entrega.
- Exige disciplina para registrar evidencias.

## Impacto no Portal NITE

Nenhuma feature interativa deve ser considerada pronta sem validacao minima de teclado, foco e comportamento responsivo.
