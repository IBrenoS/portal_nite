# Design - Updates, Community & Timeline

## Direcao de experiencia

A area de Atualizacoes deve funcionar como arquivo institucional organizado do NITE. O Instagram segue como canal de alcance/social media; o portal deve guardar registros relevantes com mais contexto, clareza e rastreabilidade.

A experiencia deve ser mais leve e tecnologica que um portal institucional tradicional, sem parecer informal demais ou infantil.

As decisoes visuais seguem a Spec 003:

- UpdateCards em superficie consistente.
- Timeline com textos curtos e escaneaveis.
- Foco visivel em cards, filtros e links.
- Imagens opcionais com fallback consistente.
- Conteudo legivel em mobile.
- Movimento discreto, nao essencial e compativel com `prefers-reduced-motion`.

## Identidade da secao

- Nome publico: Atualizacoes.
- Rota MVP: `/atualizacoes`.
- Titulo sugerido: NITE em movimento.
- Descricao sugerida: Registros, novidades e bastidores das acoes do nucleo.
- Noticias nao e label principal do MVP; pode aparecer apenas como termo equivalente/contextual.

## Estrutura da pagina `/atualizacoes`

A pagina deve organizar:

- Cabecalho da pagina.
- Descricao curta da area.
- Estado com atualizacoes publicadas.
- Estado sem atualizacoes publicadas.
- Lista ou grid de UpdateCards.
- Agrupamentos simples por categoria, quando houver conteudo suficiente.
- Destaque para registros recentes ou relevantes, quando houver criterio validado.
- Timeline institucional.
- Depoimentos opcionais, apenas quando autorizados.
- Galeria futura, apenas quando houver fotos reais autorizadas.

## Estado com atualizacoes

Quando houver registros publicados, a pagina deve exibir:

- Lista ou grid de atualizacoes.
- Cards com titulo, resumo, categoria e data quando disponivel.
- Imagem opcional, sempre com texto alternativo adequado.
- Fallback visual quando nao houver imagem.
- Relacao com projeto, oportunidade ou marco, quando validada.
- Link futuro para detalhe apenas quando `/atualizacoes/[slug]` estiver implementada.

## Estado sem atualizacoes publicadas

Quando nao houver registros publicados, a pagina deve exibir:

- Mensagem clara informando que ainda nao ha registros publicados.
- Texto institucional que nao pareca erro ou pagina vazia.
- Orientacao para acompanhar canais oficiais, se aplicavel.
- Nenhuma data, evento, oficina, foto ou depoimento inventado.

## UpdateCard

Estrutura informacional:

- Titulo.
- Resumo curto.
- Categoria.
- Data quando disponivel.
- Imagem opcional.
- Texto alternativo quando houver imagem.
- Autor opcional, apenas quando validado.
- Indicacao de projeto relacionado, quando aplicavel e validada.

Comportamento visual:

- Card sem imagem deve continuar consistente.
- Categoria deve funcionar como metadado, nao como promessa de conteudo inexistente.
- Card nao deve parecer link para detalhe enquanto `/atualizacoes/[slug]` nao existir.
- Cards clicaveis futuros devem prever foco visivel.
- Imagem nao deve ser usada como unico meio de comunicar contexto.

## Timeline institucional

Estrutura informacional:

- Periodo ou data.
- Titulo do marco.
- Descricao curta.
- Tipo de marco, quando aplicavel.
- Evidencia opcional, quando houver fonte validada.

Comportamento visual:

- Marcos devem ser apresentados em sequencia compreensivel.
- Textos devem ser curtos.
- Timeline deve permanecer legivel em mobile.
- Evidencia ausente nao deve ser simulada.
- Nenhum marco deve ser inventado.

## Living Timeline Premium

A Living Timeline e a evolucao premium da timeline institucional. O nome interno e `Living Timeline`; o nome publico sugerido deve ser validado entre "Linha do tempo do NITE" e "NITE em evolucao".

Seu papel e construir uma narrativa historica viva do nucleo. Ela nao duplica Projetos, Atualizacoes nem Oportunidades:

- Projetos mostram frentes e iniciativas.
- Atualizacoes mostram registros publicados e movimento recente.
- Oportunidades mostram processos e participacao.
- Living Timeline mostra marcos institucionais em sequencia cronologica validada.

### Conteudo

A experiencia deve aceitar apenas marcos validados: fundacao ou inicio formal, mudancas institucionais, abertura de frentes, maturidade, parcerias autorizadas, eventos institucionais, entregas publicas validadas, publicacoes e reconhecimentos autorizados.

Nao deve exibir projetos como finalizados sem validacao, resultados nao comprovados, datas incertas como oficiais, fotos sem autorizacao, depoimentos sem autorizacao, metricas nao verificadas, eventos ou oficinas nao confirmados, nem conteudo demonstrativo ou placeholder como historico real.

### Desktop

No desktop, a secao pode ganhar protagonismo visual:

- Card ou viewport expandido dentro da pagina.
- Maior area de leitura e foco visual quando a secao entra na viewport.
- Progressao de marcos ligada ao scroll, quando tecnicamente seguro.
- Avanco e retrocesso de marcos pelo scroll.
- Transicoes suaves de entrada e saida.
- Botoes ou controles equivalentes para avancar, voltar e acessar marcos por teclado.
- Saida natural da secao, sem prender o usuario.
- Proibido scroll hijacking agressivo.

### Mobile

No mobile, a Living Timeline deve priorizar leitura:

- Cards verticais ou sequenciais.
- Sem autoplay obrigatorio.
- Sem parallax pesado.
- Sem travar scroll.
- Navegacao simples por toque e teclado.
- Conteudo textual sempre compreensivel sem efeito visual.
- Baixo custo de JavaScript e imagens.

### Motion e reduced motion

Motion e opcional e subordinado ao conteudo. A timeline deve funcionar como lista ou cards estaticos com `prefers-reduced-motion`. Nenhuma informacao pode existir apenas no movimento. Periodos, status e tipos de marco devem ser textuais, foco deve ser visivel, contraste deve seguir AA e a ordem semantica deve permanecer compreensivel.

### Hipoteses tecnicas futuras

A implementacao futura pode avaliar `view-timeline`, `scroll-timeline`, `IntersectionObserver` e Framer Motion, desde que a solucao respeite reduced motion, nao use listeners de scroll pesados e seja validada em desktop, mobile, teclado e performance antes de release.

## Depoimentos

Depoimentos sao opcionais.

Para exibir depoimento, deve haver:

- Pessoa identificada ou contextualizada conforme autorizacao.
- Relacao com o NITE.
- Fala real.
- Autorizacao registrada.
- Imagem opcional, apenas quando autorizada.

Sem autorizacao, o depoimento deve ficar ausente, pendente ou oculto. A pagina nao deve usar falas genericas inventadas.

## Fotos reais e galeria futura

Fotos reais exigem:

- Autorizacao de uso.
- Contexto do registro.
- Texto alternativo.
- Legenda quando ajudar a entender o registro.
- Validacao para nao expor pessoas ou informacoes sem permissao.

Galeria e rota `/galeria` sao futuras. No MVP, fotos podem aparecer como parte de atualizacoes quando houver autorizacao.

## Rotas futuras

As rotas abaixo devem aparecer apenas como roadmap documental, sem parecer funcionalidade pronta:

- `/atualizacoes/[slug]`.
- `/eventos`.
- `/oficinas`.
- `/galeria`.
- `/comunidade`.

## Estados esperados

| Estado                        | Comportamento esperado                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| Sem atualizacoes publicadas   | Informa ausencia de registros sem parecer erro                     |
| Atualizacoes publicadas       | Exibe cards com titulo, resumo, categoria e data quando disponivel |
| Atualizacao sem imagem        | Mantem card consistente com fallback visual                        |
| Imagem sem autorizacao        | Nao exibe a imagem                                                 |
| Depoimento sem autorizacao    | Nao exibe o depoimento                                             |
| Timeline sem marcos validados | Omite timeline ou marca como pendente                              |
| Rota futura                   | Mantem como futura, sem link obrigatorio                           |

## Regras de linguagem

- Usar Atualizacoes como label principal.
- Usar "noticias" apenas como termo contextual/equivalente.
- Manter tom institucional, claro, leve e tecnologico.
- Evitar informalidade excessiva.
- Evitar linguagem infantil.
- Nao inventar eventos, oficinas, fotos, depoimentos, autores, datas ou metricas.
- Nao publicar nomes, falas ou imagens sem autorizacao.
- Datas devem ser claras para evitar que registros antigos parecam atuais.
- Conteudo pendente deve ser sinalizado como pendente ou omitido.

## SEO, responsividade e acessibilidade

- `/atualizacoes` deve prever titulo e descricao institucional.
- Cards, filtros futuros e links devem ser navegaveis por teclado.
- Foco visivel deve seguir a Spec 003.
- Imagens devem ter texto alternativo adequado.
- Cards sem imagem devem manter compreensao e consistencia visual.
- Conteudo deve permanecer legivel em mobile.
- Timeline deve ser compreensivel sem depender de animacao.
- Categorias e estados nao devem depender apenas de cor.
- Validacao final de acessibilidade, SEO e performance deve ocorrer na implementacao e na Spec 007.
