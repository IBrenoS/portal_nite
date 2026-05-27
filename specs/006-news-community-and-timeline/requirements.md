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

## Living Timeline Premium

Nome interno: `Living Timeline`.

Nome publico sugerido originalmente, a validar antes de uma publicacao historica completa: "Linha do tempo do NITE" ou "NITE em evolucao".

Na implementacao atual auditada, a Home usa o eyebrow publico "Timeline" e o titulo "O NITE em trajetoria". Essa copy descreve a secao visual premium atual, mas nao aprova publicacao de marcos historicos sem validacao.

A Living Timeline e uma narrativa institucional viva. Ela nao e feed de noticias, nao e lista de projetos e nao substitui a pagina de oportunidades. Seu papel e mostrar a evolucao historica e institucional do NITE por marcos validados, com contexto suficiente para reforcar credibilidade, continuidade e maturidade.

### Diferenca entre areas

- Projetos: portfolio de frentes, iniciativas e projetos com status proprio.
- Atualizacoes: registros publicados, noticias/contextos e movimento recente quando houver conteudo validado.
- Oportunidades: processos, participacao e estados de selecao.
- Living Timeline: narrativa historica/cronologica institucional, com marcos que explicam evolucao e maturidade do nucleo.

### Conteudo permitido

A Living Timeline pode exibir apenas marcos validados e autorizados, como:

- Fundacao ou inicio formal do nucleo.
- Mudancas institucionais relevantes.
- Abertura de frentes de atuacao.
- Marcos de maturidade.
- Parcerias autorizadas.
- Eventos institucionais relevantes.
- Entregas publicas validadas.
- Publicacoes ou reconhecimentos autorizados.

### Conteudo proibido sem validacao

A Living Timeline nao pode publicar:

- Projetos como se fossem finalizados sem validacao.
- Resultados nao comprovados.
- Datas incertas como datas oficiais.
- Fotos sem autorizacao.
- Depoimentos sem autorizacao.
- Metricas nao verificadas.
- Eventos ou oficinas nao confirmados.
- Conteudo demonstrativo ou placeholder como se fosse historico real.

### Comportamento desktop desejado

No desktop, a Living Timeline deve ter protagonismo visual:

- Secao premium com card ou viewport expandido.
- Ao entrar na area, a timeline ganha mais presenca na viewport sem esconder o restante da pagina.
- Progressao de marcos pode estar ligada ao scroll.
- Scroll pode avancar ou retroceder marcos, desde que o usuario mantenha controle.
- Transicoes suaves podem orientar entrada e saida de marcos.
- Scroll hijacking agressivo e proibido.
- A experiencia nao deve prender o usuario indefinidamente na secao.
- Deve existir fallback de navegacao por botoes e teclado.

### Comportamento mobile desejado

No mobile, a experiencia deve ser simples e leve:

- Sem autoplay obrigatorio.
- Sem parallax pesado.
- Sem travar o scroll do usuario.
- Leitura vertical ou cards sequenciais.
- Navegacao simples por toque e teclado.
- Baixo custo de performance.
- Conteudo textual acima do efeito visual.

### Motion, acessibilidade e reduced motion

- Respeitar `prefers-reduced-motion`.
- Em reduced motion, exibir a timeline como lista ou cards estaticos.
- Todos os marcos devem ser acessiveis por teclado.
- Periodos, status e tipos de marco devem ser textuais.
- Nenhuma informacao pode depender apenas de animacao, scroll ou parallax.
- Foco visivel deve ser preservado.
- Contraste deve seguir WCAG AA e Specs 003/007.
- A ordem semantica deve permitir leitura completa sem executar animacao.

### Estrategia tecnica futura

A implementacao futura deve ser validada antes de publicar e pode considerar:

- CSS scroll-driven animations, como `view-timeline` ou `scroll-timeline`, quando houver suporte suficiente.
- `IntersectionObserver` para ativacao, progresso e fallback sem listeners de scroll pesados.
- Framer Motion apenas se continuar no stack e com suporte claro a `prefers-reduced-motion`.
- Evitar listeners de scroll caros ou atualizacoes por frame sem necessidade.
- Validar desktop, mobile, teclado, reduced motion e performance antes de release.

Quando nao houver marcos validados, a Living Timeline deve manter o fallback honesto ja previsto: estado pendente ou omissao da timeline, sem marcos ficticios.

### Estado implementado auditado em 2026-05-27

A Home ja renderiza `LivingTimelineSection` como uma secao visual premium. A implementacao atual:

- Usa `conteudo/linha-do-tempo/eventos.json` via `getTimelineEvents()`.
- Filtra marcos publicos por `sourceStatus === "confirmado"`.
- Nao usa `isPublic`, pois esse campo ainda nao existe no schema/runtime atual.
- Nao renderiza `TimelineItem` nem cards de marco enquanto nao houver marcos confirmados.
- Nao publica os eventos demonstrativos do JSON como historico real.
- Exibe uma composicao institucional com titulo "O NITE em trajetoria", CTA visual "Continuar leitura" e link real para `/atualizacoes`.
- Usa `data-public-milestones` para expor a contagem de marcos confirmados no DOM.
- Usa GSAP com `ScrollTrigger` para transicao de entrada/protagonismo visual da secao.
- Nao usa `IntersectionObserver`, `view-timeline` ou `scroll-timeline`.
- Nao possui autoplay nem scroll hijacking com travamento da pagina.
- Possui tratamento de `prefers-reduced-motion` para remover a progressao animada e manter o conteudo visivel.

Esta implementacao deve ser tratada como shell premium da Living Timeline, nao como timeline historica completa. Permanecem pendentes: fallback textual explicito para zero marcos, renderizacao de marcos validados, controles anterior/proximo, indicador de progresso por marco, validacao de teclado/foco especifica da secao, teste de reduced motion, teste visual dark/light e validacao de performance/mobile antes de publicar conteudo historico real.

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
  id: string;
  slug?: string;
  title: string;
  summary: string;
  category:
    | "bastidores"
    | "evento"
    | "oficina"
    | "projeto"
    | "comunidade"
    | "marco"
    | "oportunidade"
    | "registro";
  publishedAt?: string;
  image?: Media;
  author?: string;
  relatedProjectSlug?: string;
  content?: string;
  status: "draft" | "published" | "archived";
};
```

## Modelo de marco da timeline

```ts
type TimelineMilestone = {
  id: string;
  title: string;
  period: string;
  description: string;
  type?:
    | "estruturacao"
    | "projeto"
    | "evento"
    | "oficina"
    | "publicacao"
    | "marco";
  evidenceUrl?: string;
};
```

## Modelo de depoimento

```ts
type Testimonial = {
  id: string;
  personName: string;
  roleOrRelation: string;
  quote: string;
  authorized: boolean;
  image?: Media;
  publishedAt?: string;
};
```

## Modelo de midia

```ts
type Media = {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  authorized: boolean;
};
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

| Status tecnico | Label publica | Uso esperado                               |
| -------------- | ------------- | ------------------------------------------ |
| `draft`        | Em preparacao | Conteudo interno ou pendente de validacao  |
| `published`    | Publicado     | Conteudo validado e publicavel             |
| `archived`     | Arquivado     | Conteudo historico ou retirado de destaque |

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
