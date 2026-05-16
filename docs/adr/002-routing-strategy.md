# ADR-002 - Estrategia de Rotas

## Status

Aceito

## Historico

- 2026-05-14: Aprovada pelo gestor do projeto para liberar implementacao do Header final do MVP com MegaMenu desktop compacto e menu mobile em camadas.

## Contexto

A arquitetura de informacao consolidada define rotas publicas para home, projetos, oportunidades, atualizacoes e contato. O label publico do MVP para registros do nucleo e Atualizacoes, com rota `/atualizacoes` e titulo sugerido "NITE em movimento".

Termos equivalentes podem aparecer apenas como contexto editorial, nunca como label principal nem rota principal do MVP.

Para a implementacao do Header final do MVP, a Spec 002 descarta o header simples e exige navegacao com logo, links principais, CTA principal, MegaMenu desktop compacto com grupos expansivos e menu mobile em camadas com os mesmos grupos.

Essa decisao substitui a nomenclatura anterior de mobile accordion para o Header final. No mobile, o usuario abre o painel principal, visualiza os grupos principais, acessa uma segunda camada com os links do grupo selecionado e pode voltar ou fechar o menu.

## Decisao aceita

Adotar rotas publicas previsiveis no MVP:

- `/`
- `/projetos`
- `/projetos/[slug]`
- `/oportunidades`
- `/atualizacoes`
- `/contato`
- `/#sobre`

Adotar os labels principais do Header MVP:

- O NITE.
- Projetos.
- Atualizacoes.
- Oportunidades.
- Contato.

Adotar o CTA principal do Header:

- Falar com o NITE -> `/contato`.

Implementar o Header final do MVP com:

- Logo.
- Links principais.
- CTA principal.
- MegaMenu desktop compacto, nao full-width, com grupos expansivos.
- Menu mobile em camadas com os mesmos grupos.
- Separacao clara entre rotas MVP e rotas futuras.
- Itens futuros sem aparencia de funcionalidade pronta.

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

Manter fora de escopo do MVP:

- Area autenticada.
- Dashboard administrativo.
- Rotas internas de gestao.
- Candidatura completa com acompanhamento.

`/sobre` nao e rota MVP pronta; no MVP, a area Sobre permanece como secao `/#sobre`. `/contato?tipo=desafio` e fluxo futuro ou equivalente planejado, nao rota MVP pronta.

`/noticias` nao e rota nem label principal do MVP. Noticias pode aparecer apenas como termo contextual ou equivalente editorial; a rota aprovada e `/atualizacoes`.

## Alternativas consideradas

- Manter apenas landing page unica.
- Criar rotas profundas para todas as secoes desde o inicio.
- Adotar rotas principais do MVP e manter paginas de detalhe/comunidade como futuras.
- Manter header simples sem MegaMenu nem menu mobile em camadas.

## Consequencias positivas

- Melhora navegacao e SEO.
- Separa jornadas por intencao do usuario.
- Permite crescimento incremental do portal.
- Evita publicar rotas futuras como se estivessem prontas.
- Libera implementacao do Header final sem contradizer a Spec 002.
- Garante que desktop e mobile compartilhem a mesma arquitetura de grupos.

## Consequencias negativas

- Aumenta necessidade de validacao de regressao por rota.
- Exige estado vazio coerente para paginas sem conteudo real.
- Exige atualizacao da spec se alguma rota futura virar MVP.
- Exige validacao de teclado, foco, fechamento e responsividade do MegaMenu desktop e do menu mobile em camadas.

## Impacto no Portal NITE

Toda nova rota publica deve estar ligada a uma spec, ter estado vazio coerente quando aplicavel, nao fingir conteudo real inexistente e respeitar Atualizacoes como label principal do MVP para registros, novidades e bastidores.

O Header final do MVP deve usar esta ADR como referencia para links principais, CTA, separacao de rotas MVP/futuras e grupos de navegacao. Itens futuros podem aparecer apenas quando forem apresentados como roadmap, pendente ou nao disponivel, sem parecer funcionalidade pronta.

O MegaMenu desktop deve permanecer compacto e acessivel, fechando por mouseleave, Escape e clique fora. O menu mobile em camadas deve usar botoes reais para grupos expansivos, links reais para navegacao, botao voltar na segunda camada, botao fechar, foco visivel e estado expandido comunicado quando aplicavel.
