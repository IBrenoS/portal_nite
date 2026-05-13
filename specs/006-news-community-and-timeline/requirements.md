# Requirements - News, Community & Timeline

## Status

Milestone 6 iniciada oficialmente - atualizacoes, comunidade e timeline em consolidacao

## Milestone

Milestone 6 - News, Community & Timeline

## Objetivo

Criar base documental para a area de Atualizacoes, registros de comunidade e timeline institucional do NITE, com conteudo organizado, verificavel e autorizado.

## Escopo

- Pagina `/atualizacoes`.
- Nome publico "Atualizacoes" como label principal do MVP.
- Titulo sugerido "NITE em movimento".
- Descricao sugerida "Registros, novidades e bastidores das acoes do nucleo."
- Cards de atualizacao.
- Modelo de conteudo de atualizacao.
- Timeline institucional.
- Registros de eventos, oficinas e bastidores.
- Depoimentos, apenas quando autorizados.
- Galeria como possibilidade futura.
- Regras para uso de fotos reais.
- Estados vazios, pendentes e ausentes.
- Criterios de acessibilidade, SEO, performance, responsividade, privacidade e manutenibilidade.

Esta Spec consolida requisitos documentais. Nao cria rotas reais, componentes reais, dados ficticios, noticias, eventos, fotos, depoimentos, autores, datas, metricas ou publicacoes.

## Decisao de nome e rota

- Nome publico: Atualizacoes.
- Rota MVP: `/atualizacoes`.
- Titulo sugerido da pagina/secao: NITE em movimento.
- Descricao sugerida: Registros, novidades e bastidores das acoes do nucleo.
- Noticias pode ser citado apenas como termo equivalente/contextual, nao como label principal do MVP.
- Instagram segue como canal de alcance/social media.
- O portal deve funcionar como arquivo organizado e institucional das atualizacoes relevantes do nucleo.

## Rotas futuras

As rotas abaixo permanecem futuras e nao devem ser tratadas como implementadas nesta milestone:

- `/atualizacoes/[slug]`.
- `/eventos`.
- `/oficinas`.
- `/galeria`.
- `/comunidade`.

## Governanca de conteudo

Status: Pendente de validacao coletiva.

A definicao final depende de reuniao com o nucleo. Ate decisao formal, a spec deve prever:

- Responsaveis por atualizacao.
- Revisao de conteudo antes de publicacao.
- Autorizacao de imagens e depoimentos.
- Autorizacao para uso de nomes e registros de pessoas.
- Contexto de uso de fotos reais.
- Manutencao de datas e status publico.
- Remocao ou sinalizacao de conteudo sem validacao.

ADRs relacionados permanecem Proposto ate revisao explicita. A fonte de conteudo para atualizacoes deve ser decidida quando a implementacao exigir essa decisao tecnica.

## Requisitos funcionais - `/atualizacoes`

- Deve exibir a pagina de Atualizacoes com titulo "NITE em movimento".
- Deve usar a descricao "Registros, novidades e bastidores das acoes do nucleo."
- Deve listar atualizacoes publicadas em lista ou grid.
- Deve exibir estado vazio quando ainda nao houver registros publicados.
- Deve apresentar categorias ou agrupamentos simples quando houver conteudo suficiente.
- Deve destacar registros recentes ou relevantes sem inventar prioridade, data ou metrica.
- Deve permitir que cards sejam consistentes mesmo quando nao houver imagem.
- Deve manter link para atualizacao individual como futuro, condicionado a `/atualizacoes/[slug]`.
- Deve orientar o usuario a acompanhar canais oficiais quando nao houver atualizacoes publicadas.

## Requisitos funcionais - cards de atualizacao

Cada UpdateCard deve prever:

- Titulo.
- Resumo.
- Categoria.
- Data de publicacao, quando disponivel.
- Imagem opcional.
- Texto alternativo quando houver imagem.
- Autor opcional, somente quando validado.
- Relacao com projeto ou oportunidade, quando aplicavel e validada.
- Fallback visual consistente quando nao houver imagem.

Cards nao devem parecer links para detalhe enquanto `/atualizacoes/[slug]` nao estiver implementada.

## Requisitos funcionais - timeline institucional

A timeline deve prever:

- Marcos historicos reais do NITE.
- Data ou periodo.
- Titulo do marco.
- Descricao curta.
- Tipo de marco, quando aplicavel.
- Evidencia opcional, quando houver fonte validada.

A timeline nao deve inventar acontecimentos, datas, oficinas, eventos, publicacoes ou resultados. Textos devem ser curtos e permitir entender a evolucao historica sem depender de blocos longos.

## Requisitos funcionais - depoimentos autorizados

Depoimentos sao conteudo opcional.

Para exibir um depoimento, a spec deve exigir:

- Nome da pessoa, quando autorizado.
- Relacao com o NITE.
- Fala real, sem edicao que altere sentido.
- Autorizacao registrada.
- Imagem opcional, apenas quando autorizada.
- Data de publicacao, quando aplicavel.

Depoimentos nao autorizados devem ficar ausentes, pendentes ou ocultos. Nenhuma fala deve ser inventada.

## Requisitos funcionais - fotos reais e galeria futura

Fotos reais e galeria sao conteudo opcional/futuro.

Para usar foto real, deve haver:

- Autorizacao de uso.
- Contexto do registro.
- Texto alternativo adequado.
- Legenda opcional quando ajudar a contextualizar.
- Validacao de que a imagem nao expõe pessoas ou informacoes sem permissao.

Galeria futura nao deve ser tratada como requisito obrigatorio do MVP.

## Requisitos nao funcionais

- Acessibilidade: cards, filtros, links e timeline devem prever foco visivel, navegacao por teclado e labels compreensiveis.
- Imagens: toda imagem publicada deve possuir texto alternativo adequado.
- Contraste: cards, categorias, links e estados devem seguir a baseline visual da Spec 003 e a baseline de acessibilidade da Spec 007.
- SEO institucional: `/atualizacoes` deve prever titulo e descricao adequados para indexacao.
- Performance: a pagina deve ser leve, e imagens futuras devem ser tratadas com cuidado para nao degradar carregamento.
- Responsividade: cards, timeline e estados vazios devem permanecer legiveis em mobile.
- Privacidade: nomes, fotos, depoimentos e registros de pessoas dependem de autorizacao.
- Manutenibilidade: conteudos devem seguir modelos documentais claros e status de publicacao.
- Conteudo honesto: nenhum dado ausente deve ser simulado como real.

## Modelo de atualizacao

```ts
type Update = {
  id: string
  slug?: string
  title: string
  summary: string
  category: 'bastidores' | 'evento' | 'oficina' | 'projeto' | 'comunidade' | 'marco' | 'oportunidade' | 'registro'
  publishedAt?: string
  image?: Media
  author?: string
  relatedProjectSlug?: string
  content?: string
  status: 'draft' | 'published' | 'archived'
}
```

## Modelo de marco da timeline

```ts
type TimelineMilestone = {
  id: string
  title: string
  period: string
  description: string
  type?: 'estruturacao' | 'projeto' | 'evento' | 'oficina' | 'publicacao' | 'marco'
  evidenceUrl?: string
}
```

## Modelo de depoimento

```ts
type Testimonial = {
  id: string
  personName: string
  roleOrRelation: string
  quote: string
  authorized: boolean
  image?: Media
  publishedAt?: string
}
```

## Modelo de midia

```ts
type Media = {
  id: string
  url: string
  alt: string
  caption?: string
  authorized: boolean
}
```

## Categorias sugeridas

- Bastidores.
- Evento.
- Oficina.
- Projeto.
- Comunidade.
- Marco institucional.
- Oportunidade.
- Registro.

Categorias so devem organizar conteudo real validado; nao devem sugerir publicacoes inexistentes.

## Status de atualizacao

| Status tecnico | Label publica | Uso esperado |
|---|---|---|
| `draft` | Em preparacao | Conteudo interno ou pendente de validacao |
| `published` | Publicado | Conteudo validado e publicavel |
| `archived` | Arquivado | Conteudo historico ou retirado de destaque |

## Estados vazios, pendentes e ausentes

- Sem atualizacoes publicadas: informar que ainda nao ha registros publicados.
- Sem imagem: manter card consistente sem simular imagem.
- Sem data validada: nao publicar como registro atual.
- Sem autor validado: ocultar autor.
- Sem autorizacao de foto: nao exibir foto.
- Sem autorizacao de depoimento: nao exibir depoimento.
- Timeline sem marcos validados: exibir estado pendente ou omitir timeline ate haver conteudo confirmado.
- Rota futura nao implementada: indicar que detalhe individual e futuro, sem link ativo obrigatorio.

## Regras de linguagem

- Usar Atualizacoes como label principal do MVP.
- Usar "noticias" apenas como termo contextual/equivalente.
- Manter tom institucional, leve e tecnologico.
- Evitar informalidade excessiva, linguagem infantil ou promessa de impacto nao validado.
- Nao inventar noticias, eventos, oficinas, fotos, depoimentos, autores, datas ou metricas.
- Nao publicar foto real sem autorizacao e contexto.
- Nao publicar depoimento sem autorizacao.
- Manter datas claras para evitar que registros antigos parecam atuais.
- Sinalizar conteudo pendente, ausente ou futuro com honestidade.

## Checklist de validacao

- [ ] Nenhum depoimento e inventado.
- [ ] Nenhuma foto real e publicada sem autorizacao.
- [ ] Nenhuma atualizacao e publicada sem conteudo validado.
- [ ] Atualizacoes possuem data clara quando publicadas.
- [ ] Atualizacoes antigas nao parecem atuais por engano.
- [ ] Timeline conta evolucao real do nucleo.
- [ ] A secao reforca credibilidade institucional.
- [ ] UpdateCards permanecem consistentes com e sem imagem.
- [ ] Rotas futuras permanecem marcadas como futuras.
- [ ] Governanca de conteudo aparece como Pendente de validacao coletiva enquanto nao houver reuniao do nucleo.

## Criterios de aceitacao

- [ ] Dado que o usuario acessa `/atualizacoes`, quando ha registros publicados, entao visualiza titulo, resumo, categoria e data quando disponivel.
- [ ] Dado que nao ha atualizacoes publicadas, quando o usuario acessa `/atualizacoes`, entao ve estado vazio claro e nao uma pagina quebrada.
- [ ] Dado que uma atualizacao possui imagem, quando exibida, entao a imagem possui texto alternativo adequado.
- [ ] Dado que uma atualizacao nao possui imagem, quando exibida, entao o card continua visualmente consistente.
- [ ] Dado que a timeline e exibida, quando o usuario le os marcos, entao entende a evolucao historica do NITE sem depender de textos longos.
- [ ] Dado que um depoimento e exibido, quando o usuario le, entao ha autorizacao registrada e identificacao contextual da pessoa.
- [ ] Dado que uma foto real e usada, quando publicada, entao deve haver autorizacao e contexto de uso.
- [ ] Dado que o usuario esta no mobile, quando acessa Atualizacoes ou Timeline, entao o conteudo permanece legivel e organizado.
- [ ] Dado que o usuario usa teclado, quando navega por cards, filtros ou links, entao os elementos interativos possuem foco visivel.
- [ ] Dado que uma rota futura como `/atualizacoes/[slug]` ainda nao foi implementada, quando documentada, entao permanece claramente marcada como futura.

## Criterios documentais da Milestone 6

- [x] Requisitos de `/atualizacoes` documentados.
- [x] Nome, rota, titulo e descricao oficiais registrados.
- [x] Rotas futuras documentadas.
- [x] Modelo de atualizacao consolidado.
- [x] Modelo de timeline consolidado.
- [x] Modelo de depoimento consolidado.
- [x] Modelo de midia consolidado.
- [x] Regras para fotos reais e autorizacao registradas.
- [x] Estados vazios, pendentes e ausentes documentados.
- [x] Criterios de acessibilidade, SEO, performance, responsividade, privacidade e manutenibilidade registrados.
- [x] Pendencias de implementacao, conteudo real e governanca coletiva mantidas fora do escopo documental da Milestone 6.
