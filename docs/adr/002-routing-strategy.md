# ADR-002 - Estrategia de Rotas

## Status

Proposto

## Contexto

A arquitetura de informacao proposta define rotas para home, projetos, oportunidades, noticias, comunidade e contato.

## Decisao

Adotar rotas publicas previsiveis: `/`, `/projetos`, `/projetos/[slug]`, `/oportunidades`, `/noticias`, `/noticias/[slug]`, `/comunidade` e `/contato`.

## Alternativas consideradas

- Manter apenas landing page unica.
- Criar rotas profundas para todas as secoes desde o inicio.
- Adotar rotas principais com paginas dinamicas para projetos e noticias.

## Consequencias positivas

- Melhora navegacao e SEO.
- Separa jornadas por intencao do usuario.
- Permite crescimento incremental do portal.

## Consequencias negativas

- Aumenta necessidade de validacao de regressao por rota.
- Exige conteudo minimo coerente para evitar paginas vazias.

## Impacto no Portal NITE

Toda nova rota publica deve estar ligada a uma spec, ter estado vazio coerente quando aplicavel e nao fingir conteudo real inexistente.
