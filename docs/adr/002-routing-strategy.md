# ADR-002 - Estrategia de Rotas

## Status

Proposto

## Contexto

A arquitetura de informacao consolidada define rotas publicas para home, projetos, oportunidades, atualizacoes e contato. O label publico do MVP para registros do nucleo e Atualizacoes, com rota `/atualizacoes` e titulo sugerido "NITE em movimento".

Termos equivalentes podem aparecer apenas como contexto editorial, nunca como label principal nem rota principal do MVP.

## Decisao proposta

Adotar rotas publicas previsiveis no MVP:

- `/`
- `/projetos`
- `/projetos/[slug]`
- `/oportunidades`
- `/atualizacoes`
- `/contato`
- `/#sobre`

Manter como rotas futuras possiveis, sem tratar como funcionalidades prontas:

- `/sobre`
- `/atualizacoes/[slug]`
- `/comunidade`
- `/eventos`
- `/oficinas`
- `/galeria`
- `/oportunidades/[slug]`
- `/candidatura`
- `/contato?tipo=desafio`

A aprovacao formal desta ADR deve ocorrer quando a implementacao das rotas exigir decisao tecnica de roteamento, estrutura de paginas ou geracao de metadados.

## Alternativas consideradas

- Manter apenas landing page unica.
- Criar rotas profundas para todas as secoes desde o inicio.
- Adotar rotas principais do MVP e manter paginas de detalhe/comunidade como futuras.

## Consequencias positivas

- Melhora navegacao e SEO.
- Separa jornadas por intencao do usuario.
- Permite crescimento incremental do portal.
- Evita publicar rotas futuras como se estivessem prontas.

## Consequencias negativas

- Aumenta necessidade de validacao de regressao por rota.
- Exige estado vazio coerente para paginas sem conteudo real.
- Exige atualizacao da spec se alguma rota futura virar MVP.

## Impacto no Portal NITE

Toda nova rota publica deve estar ligada a uma spec, ter estado vazio coerente quando aplicavel, nao fingir conteudo real inexistente e respeitar Atualizacoes como label principal do MVP para registros, novidades e bastidores.
