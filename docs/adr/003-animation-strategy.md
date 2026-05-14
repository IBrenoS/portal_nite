# ADR-003 - Estrategia de Animacao

## Status

Proposto

## Contexto

A identidade visual consolidada do Portal NITE e dark premium, tecnologica e institucional. A logo animada pode ser mantida como ativo de marca, e recursos como grid, glow e gradientes devem ser usados com moderacao e intencao.

Animacoes precisam orientar atencao sem distrair, prejudicar leitura, bloquear navegacao ou degradar performance em mobile.

## Decisao proposta

Usar motion controlado como apoio visual, nao como requisito para compreender conteudo.

Diretrizes:

- Animacoes devem guiar atencao, nao distrair.
- Grid, glow e gradientes devem ser moderados e intencionais.
- `prefers-reduced-motion` deve reduzir ou desativar animacoes nao essenciais.
- Evitar animacoes constantes, pesadas, scroll hijacking e efeitos que prejudiquem leitura.
- A logo animada pode ser mantida como ativo de marca se houver fallback ou reducao quando aplicavel.
- Movimento nao deve ser o unico meio de comunicar estado.

Esta ADR deve ser candidata a aprovacao antes de implementar motion ou animacoes em escala.

## Alternativas consideradas

- Remover animacoes por completo.
- Usar animacoes intensas como linguagem dominante.
- Usar animacoes moderadas com fallback acessivel.

## Consequencias positivas

- Preserva personalidade tecnologica do portal.
- Reduz risco de prejudicar leitura e acessibilidade.
- Controla custo de performance em mobile.
- Alinha movimento com a baseline de acessibilidade da Spec 007.

## Consequencias negativas

- Exige validacao extra em acessibilidade e performance.
- Pode limitar efeitos visuais mais chamativos.
- Exige disciplina para nao transformar motion em decoracao excessiva.

## Impacto no Portal NITE

Componentes animados devem ter comportamento reduzido, nao bloquear leitura, nao prejudicar interacao e ser revisados em desktop, mobile, teclado e preferencia de movimento reduzido quando houver interacao.
