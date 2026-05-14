# ADR-003 - Estrategia de Animacao

## Status

Aceito

## Historico

- 2026-05-14: Aprovada pelo gestor do projeto para liberar motion controlado no Header final do MVP, incluindo mega menu desktop e menu mobile em camadas.

## Contexto

A identidade visual consolidada do Portal NITE e dark premium, tecnologica e institucional. A logo animada pode ser mantida como ativo de marca, e recursos como grid, glow e gradientes devem ser usados com moderacao e intencao.

Animacoes precisam orientar atencao sem distrair, prejudicar leitura, bloquear navegacao ou degradar performance em mobile.

O Header final do MVP tera mega menu desktop com interacao premium inspirada em padroes de mercado como referencia de comportamento, sem copiar identidade visual, textos, imagens, assets ou layout proprietario de terceiros. A referencia externa deve ser tratada apenas como inspiracao de interacao.

## Decisao aceita

Usar motion controlado como apoio visual, nao como requisito para compreender conteudo.

Diretrizes:

- Animacoes devem guiar atencao, nao distrair.
- Motion deve ser curto, funcional e elegante.
- Grid, glow e gradientes devem ser moderados e intencionais.
- `prefers-reduced-motion` deve reduzir ou desativar animacoes nao essenciais.
- Em reduced motion, transicoes devem ser removidas ou reduzidas ao minimo.
- Evitar animacoes constantes, pesadas, scroll hijacking, delays longos, spring exagerado e efeitos que prejudiquem leitura ou interacao.
- A logo animada pode ser mantida como ativo de marca se houver fallback ou reducao quando aplicavel.
- Movimento nao deve ser o unico meio de comunicar estado.
- Desktop pode usar transicao discreta de opacidade e translate horizontal entre grupos do mega menu.
- Desktop pode usar abertura e fechamento suave do painel do mega menu.
- Mobile pode usar transicao simples entre camadas do menu.
- Menu mobile em camadas deve preservar botao de voltar e botao de fechar quando implementado.
- Motion de Header, MegaMenu e menu mobile deve ser funcional, acessivel e subordinado a navegacao.

Esta ADR libera motion controlado para Header final, mega menu desktop e menu mobile em camadas, mantendo a obrigacao de validacao na implementacao e release.

## Alternativas consideradas

- Remover animacoes por completo.
- Usar animacoes intensas como linguagem dominante.
- Usar animacoes moderadas com fallback acessivel.
- Copiar diretamente layout, assets ou identidade de uma referencia externa.

## Consequencias positivas

- Preserva personalidade tecnologica do portal.
- Reduz risco de prejudicar leitura e acessibilidade.
- Controla custo de performance em mobile.
- Alinha movimento com a baseline de acessibilidade da Spec 007.
- Libera uma interacao de Header mais premium sem comprometer semantica, foco e teclado.

## Consequencias negativas

- Exige validacao extra em acessibilidade e performance.
- Pode limitar efeitos visuais mais chamativos.
- Exige disciplina para nao transformar motion em decoracao excessiva.
- Exige cuidado para inspiracao externa nao virar copia de identidade, layout, assets ou conteudo.

## Impacto no Portal NITE

Componentes animados devem ter comportamento reduzido, nao bloquear leitura, nao prejudicar interacao e ser revisados em desktop, mobile, teclado e preferencia de movimento reduzido quando houver interacao.

O Header final, o MegaMenu desktop e o menu mobile em camadas podem usar motion discreto para orientar transicoes entre estados, desde que o conteudo continue acessivel sem motion, o foco permaneca visivel e a navegacao nao dependa de animacao para ser compreendida.
