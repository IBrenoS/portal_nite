# ADR-003 - Estrategia de Animacao

## Status

Proposto

## Contexto

A identidade visual inicial recomenda manter a logo animada como ativo de marca, usar grid e glow com moderacao e respeitar `prefers-reduced-motion`.

## Decisao

Manter animacoes como reforco de identidade e orientacao visual, sem tornar conteudo principal dependente delas. Animacoes nao essenciais devem ser reduzidas ou desativadas quando `prefers-reduced-motion` estiver ativo.

## Alternativas consideradas

- Remover animacoes por completo.
- Usar animacoes intensas como linguagem dominante.
- Usar animacoes moderadas com fallback acessivel.

## Consequencias positivas

- Preserva personalidade tecnologica do portal.
- Reduz risco de prejudicar leitura e acessibilidade.
- Controla custo de performance em mobile.

## Consequencias negativas

- Exige validacao extra em acessibilidade e performance.
- Pode limitar efeitos visuais mais chamativos.

## Impacto no Portal NITE

Componentes animados devem ter comportamento reduzido, nao bloquear leitura e ser revisados em desktop, mobile e teclado quando houver interacao.
