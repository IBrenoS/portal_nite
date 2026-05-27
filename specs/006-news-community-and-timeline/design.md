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

A Living Timeline e a evolucao premium da timeline institucional. O nome interno e `Living Timeline`; o nome publico sugerido para publicacao historica completa deve ser validado entre "Linha do tempo do NITE" e "NITE em evolucao". No shell visual atual da Home, a copy implementada e "Timeline" como eyebrow e "O NITE em trajetoria" como titulo.

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

### Estado real auditado em 2026-05-27

O codigo atual da Home implementa a Living Timeline como shell visual premium, nao como timeline historica completa.

Arquitetura real:

- `app/page.tsx` carrega `getTimelineEvents()` e injeta os eventos em `LivingTimelineSection`.
- `components/sections/living-timeline-section.tsx` e um client component.
- O componente filtra `events` com `sourceStatus === "confirmado"` e expoe a contagem em `data-public-milestones`.
- O componente nao renderiza cards de marco, `TimelineItem`, controles anterior/proximo nem indicador de progresso por marco.
- O link de acao e um `<a>` absoluto cobrindo a composicao visual e apontando para `/atualizacoes`, com `aria-label` textual.
- A arte visual usa `NiteSymbol`, grid visual e textos "Acervo em curadoria" e "Marcos validados" como composicao decorativa marcada com `aria-hidden`.
- O CSS da experiencia vive em `app/globals.css` com classes `timeline-premium-*`.

Interacao e motion reais:

- Desktop: secao com card/viewport expandido, fundo animado de margem/borda/raio e revelacao de textos/asset ao entrar na viewport.
- Mobile: layout responsivo em uma coluna, conteudo centralizado, sem lista/cards de marcos e sem controles especificos.
- Scroll: usa GSAP `ScrollTrigger` com `scrub: 0.8` para progressao visual curta; nao prende o usuario nem troca marcos por scroll.
- Reduced motion: `window.matchMedia("(prefers-reduced-motion: reduce)")` remove a progressao animada via GSAP e o CSS `@media (prefers-reduced-motion: reduce)` deixa os elementos visiveis e reduz transicoes/animacoes.
- Nao ha autoplay.
- Nao ha `IntersectionObserver`.
- Nao ha `view-timeline` nem `scroll-timeline`.

Dados reais:

- O schema atual aceita `sourceStatus: "placeholder" | "confirmado"`.
- O JSON atual nao possui `sourceStatus`, portanto usa o default `placeholder`.
- Como nao ha marcos confirmados, `data-public-milestones` fica `0` e nenhum item demonstrativo e publicado como marco real.
- O campo `isPublic` permanece apenas como proposta de modelo futuro.

Pendencias do estado real:

- Exibir fallback textual explicito quando `data-public-milestones` for `0`.
- Renderizar marcos confirmados com conteudo, periodo, evidencia e midia autorizada.
- Implementar controles reais de anterior/proximo somente quando houver marcos navegaveis.
- Implementar indicador de progresso por marco somente quando houver marcos navegaveis.
- Cobrir reduced motion, teclado/foco da secao, mobile e visual dark/light em testes especificos.
- Validar performance da combinacao `gsap` + `ScrollTrigger` em mobile antes de considerar a experiencia pronta para release com conteudo real.

### Arquitetura tecnica alvo

A arquitetura abaixo permanece alvo para o ciclo com marcos publicos validados. Ela nao representa integralmente o codigo atual:

- `LivingTimelineSection`: secao raiz, heading, descricao, estado sem marcos, escolha entre experiencia desktop/mobile/reduced motion e integracao com dados filtrados.
- `LivingTimelineViewport`: area desktop de protagonismo visual, responsavel por layout expandido e composicao dos marcos ativos, sem controlar o scroll global de forma agressiva.
- `LivingTimelineProgress`: indicador textual/visual de progresso, com estado atual e total de marcos.
- `LivingTimelineMilestone`: card de marco individual, derivado do contrato de `TimelineItem`, com periodo, titulo, resumo, descricao opcional, categoria, evidencia e midia autorizada.
- `LivingTimelineControls`: botoes reais de anterior/proximo e atalhos de teclado quando apropriados.
- `LivingTimelineFallback`: estado honesto quando nao houver marcos publicos validados ou quando reduced motion/suporte tecnico exigir versao estatica.

Essa arquitetura nao cria rota nova e nao substitui `UpdateCard`, `ProjectCard` ou componentes de oportunidades.

### Modelo de dados futuro

O modelo futuro da Living Timeline deve usar, no minimo:

```ts
type LivingTimelineMilestone = {
  id: string;
  title: string;
  periodLabel: string;
  summary: string;
  description?: string;
  sourceStatus: "placeholder" | "rascunho" | "validado" | "confirmado";
  evidence?: {
    label: string;
    href: string;
  };
  category?:
    | "institucional"
    | "frente"
    | "parceria"
    | "evento"
    | "entrega"
    | "publicacao"
    | "reconhecimento";
  media?: Media;
  order: number;
  isPublic: boolean;
};
```

Regras de renderizacao:

- Renderizar publicamente apenas marcos com `isPublic: true` e `sourceStatus` validado/confirmado.
- Manter placeholders fora da UI publica.
- Nao publicar data oficial quando o periodo ainda nao estiver validado.
- Ordenar marcos por `order`, nao por inferencia textual de datas.
- Omitir midia sem autorizacao ou sem alt adequado.

### Estados da experiencia

- Sem marcos publicos validados: mostrar mensagem honesta ou omitir a area imersiva; nunca publicar placeholder.
- Conteudo pendente: sinalizar que a linha do tempo esta em preparacao e depende de marcos validados.
- Com marcos validados: renderizar sequencia completa, navegavel por scroll, controles e teclado.
- Reduced motion: renderizar lista/cards estaticos, sem scroll-driven motion, autoplay ou deslocamentos amplos.
- Falha de suporte tecnico: usar `LivingTimelineFallback` com cards/lista e preservar todo o conteudo.

### Interacao desktop

No desktop, a experiencia recomendada e progressive enhancement:

- A secao ocupa area de protagonismo, mas permanece dentro do fluxo normal da pagina.
- O scroll pode atualizar o marco ativo, progresso e transicoes leves.
- O scroll nunca deve impedir a saida natural da secao.
- Controles anterior/proximo devem permitir navegacao sem depender do scroll.
- Teclado deve operar os controles e permitir acesso a todos os marcos.
- Setas podem ser consideradas apenas quando o foco estiver dentro dos controles ou da regiao da timeline, sem sequestrar navegacao global.
- O indicador de progresso deve ser textual ou ter texto auxiliar, nao apenas cor ou movimento.

### Interacao mobile

No mobile, a implementacao inicial deve preferir simplicidade:

- Lista vertical ou cards sequenciais.
- Controles simples opcionais, sem obrigar uso.
- Sem autoplay obrigatorio.
- Sem parallax pesado.
- Sem travar ou substituir scroll nativo.
- Midias futuras devem usar lazy loading e dimensoes reservadas.
- Blur, glow e sobreposicoes devem ser reduzidos para preservar leitura e performance.

### Estrategia tecnica recomendada

- CSS scroll-driven animations (`view-timeline`/`scroll-timeline`): usar apenas como progressive enhancement quando houver suporte suficiente; nunca como unica forma de acessar conteudo.
- `IntersectionObserver`: estrategia recomendada para ativar marco atual, progresso e fallback, por ter custo controlavel e boa degradacao.
- Framer Motion: permitido apenas para transicoes leves ja compativeis com ADR-003 e `prefers-reduced-motion`.
- JS scroll listeners: evitar. Usar somente se houver necessidade comprovada, com throttle/`requestAnimationFrame`, sem leitura/escrita de layout em loop e com medicao de performance.

Alternativas rejeitadas para primeira implementacao:

- Scroll hijacking com area presa por longo periodo.
- Parallax pesado como experiencia principal.
- Autoplay obrigatorio.
- Dependencia exclusiva de scroll-driven animations.
- Publicacao de dataset demonstrativo como se fosse historico real.

### Requisitos de acessibilidade

- Todos os marcos devem ser alcancaveis por teclado.
- Anterior/proximo devem ser botoes reais.
- Foco visivel deve usar o padrao da Spec 003.
- Headings devem preservar ordem semantica.
- `aria-live` deve ser evitado por padrao; usar apenas se a troca de marco atualizar conteudo critico sem mover foco, e sempre com cautela.
- Periodos, categorias, status e progresso devem ter texto.
- Conteudo completo deve existir no DOM em ordem logica ou possuir fallback estatico equivalente.
- Movimento nao pode ser requisito para compreender informacao.
- Contraste deve seguir WCAG AA.

### Requisitos de performance

- Nao usar listener de scroll pesado.
- Evitar layout thrashing.
- Reservar dimensoes de midia futura.
- Lazy-load de midia abaixo da dobra.
- Reduzir blur, glow e camadas translucidas no mobile.
- Respeitar `prefers-reduced-motion` tambem como reducao de custo.
- Testar em mobile real antes de publicar.

### Estrategia de testes futuros

- Unit: estado sem marcos publicos validados.
- Unit: filtro de `sourceStatus`, `isPublic` e exclusao de `placeholder`.
- Unit: renderizacao de marcos validados com periodo, titulo, resumo e evidencia.
- Unit: reduced motion renderizando lista/cards estaticos.
- Browser/e2e: controles anterior/proximo, teclado, foco e saida natural da secao.
- Browser/e2e: mobile sem travar scroll e sem overflow horizontal.
- Visual: dark/light.
- Visual ou browser: reduced motion.
- Anti-placeholder publico: garantir que conteudo demonstrativo nao aparece como historico real.

### Primeira implementacao segura

A primeira implementacao aceita ausencia de conteudo real sem criar dataset novo e sem inventar marcos. No estado auditado, a Home mostra um shell premium da Living Timeline, filtra placeholders por `sourceStatus`, mantem os eventos demonstrativos fora da UI publica e direciona o usuario para `/atualizacoes`. A publicacao da experiencia com marcos continua dependente de governanca, validacao de conteudo e autorizacao de midia/depoimentos.

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
