# Requirements - Accessibility, SEO & Performance Baseline

## Status

Milestone 7 iniciada oficialmente - baseline transversal de acessibilidade, SEO, performance e responsividade em consolidacao

## Milestone

Milestone 7 - Accessibility, SEO & Performance Baseline

## Objetivo

Definir a baseline transversal de acessibilidade, SEO, performance, responsividade, semantica e qualidade tecnica para todas as rotas e componentes do Portal NITE.

Esta Spec consolida requisitos documentais. Nao implementa codigo, nao cria `sitemap.xml`, `robots.txt`, `metadata.ts`, analytics, Search Console, Lighthouse, backend ou servicos externos.

## Escopo

- Acessibilidade visual e estrutural.
- Contraste minimo como baseline universal de legibilidade.
- Navegacao por teclado.
- Foco visivel.
- Semantica HTML.
- Headings e landmarks.
- Imagens e textos alternativos.
- Formularios acessiveis.
- Estados de loading, erro, vazio e sucesso.
- Suporte a `prefers-reduced-motion`.
- SEO institucional.
- Metadados por rota.
- Open Graph.
- Sitemap e `robots.txt`, quando implementados.
- Estrutura semantica indexavel.
- Performance e Core Web Vitals.
- Otimizacao de imagens e SVGs.
- Responsividade.
- Criterios de aceite globais.
- Checklist transversal para implementacao futura.

Governanca minima de conteudo permanece Pendente de validacao coletiva. O status vigente das ADRs permanece definido nos proprios arquivos em `docs/adr`; esta baseline orienta o MVP, mas nao aprova automaticamente decisoes tecnicas.

## Referencias

- WCAG 2.2 como referencia de acessibilidade.
- WCAG AA como referencia minima de contraste:
  - 4.5:1 para texto normal.
  - 3:1 para texto grande.
- Core Web Vitals como referencia de performance:
  - LCP para carregamento do conteudo principal.
  - INP para resposta as interacoes.
  - CLS para estabilidade visual.

Core Web Vitals devem ser tratados como indicadores de qualidade. Pontuacoes Lighthouse, resultados medidos, trafego ou metas numericas institucionais nao devem ser inventados. Quando necessario, valores futuros devem ser registrados como meta candidata ou alvo recomendado, nunca como dado medido.

## Rotas MVP com baseline obrigatoria

| Rota               | Baseline obrigatoria                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `/`                | Acessibilidade, SEO institucional, performance, responsividade, Open Graph planejado         |
| `/#sobre`          | Heading claro, foco preservado ao navegar por ancora, conteudo textual indexavel             |
| `/projetos`        | Filtros acessiveis, cards com foco visivel, SEO de portfolio, estado vazio/sem resultado     |
| `/projetos/[slug]` | Conteudo semantico por projeto, status acessivel, SEO por projeto, imagens opcionais com alt |
| `/oportunidades`   | Estados claros, formulario acessivel quando houver, SEO, privacidade e mobile                |
| `/atualizacoes`    | Cards e timeline acessiveis, alt text, SEO, estado vazio e mobile                            |
| `/contato`         | Formas de contato claras, labels quando houver formulario, SEO institucional e foco visivel  |

## Rotas futuras documentadas

As rotas abaixo permanecem documentadas como futuras e nao devem ser implementadas por esta milestone:

- `/sobre`.
- `/atualizacoes/[slug]`.
- `/comunidade`.
- `/eventos`.
- `/oficinas`.
- `/galeria`.
- `/oportunidades/[slug]`.
- `/candidatura`.
- `/contato?tipo=desafio`.

Quando forem implementadas, devem herdar a mesma baseline transversal.

## Requisitos de acessibilidade - textos e contraste

- Contraste minimo e baseline universal de legibilidade, nao modo acessivel opcional.
- Textos principais, secundarios, muted, links, botoes, badges e estados interativos devem respeitar contraste adequado.
- A aplicacao de tokens visuais deve ser validada em uso real, nao apenas no valor isolado.
- Conteudo base deve ser legivel sem depender de preferencia ativada pelo usuario.
- Tamanho, espacamento e hierarquia visual devem sustentar leitura em desktop e mobile.

## Requisitos de acessibilidade - botoes, links e CTAs

- Botoes, links e CTAs devem ser identificaveis como elementos interativos.
- Todo elemento interativo deve ter foco visivel.
- Hover nao pode ser o unico indicador de interacao.
- Links devem ter texto compreensivel fora do contexto visual.
- CTAs principais e secundarios devem manter hierarquia clara.
- Estados disabled, loading e active devem ser comunicados por texto, atributo, estrutura ou label, nao apenas cor.

## Requisitos de acessibilidade - header, MegaMenu e menu mobile em camadas

- Header, MegaMenu desktop e menu mobile em camadas devem ser navegaveis por teclado.
- Ordem de foco deve seguir a ordem visual/logica da navegacao.
- Estado aberto/fechado deve ser compreensivel para tecnologias assistivas na implementacao.
- Escape, clique fora e fechamento por navegacao devem ser considerados na implementacao.
- MegaMenu desktop deve fechar por mouseleave, Escape e clique fora.
- Menu mobile em camadas deve funcionar com toque e teclado, sem prender o usuario.
- Menu mobile em camadas nao deve depender de hover nem criar scroll horizontal.
- A primeira camada mobile deve conter logo/marca, CTA principal, botao fechar e grupos principais.
- A segunda camada mobile deve conter botao voltar, botao fechar, titulo do grupo e links do grupo.
- Controles expansivos devem seguir o padrao de disclosure navigation do W3C APG: botoes reais, estado expandido comunicado e conteudo expansivel previsivel.
- Nao usar `role="menu"` ou `role="menubar"` sem necessidade.
- Grupos expansivos devem usar botoes reais; navegacao deve usar links reais.
- `aria-expanded` e `aria-controls` devem ser usados quando aplicavel.
- Links ativos devem ser comunicados sem depender apenas de cor.

## Requisitos de acessibilidade - cards

- ProjectCard, UpdateCard e OpportunityBanner/Card devem ter estrutura previsivel.
- Cards clicaveis devem ter foco visivel e area de clique clara.
- Cards sem imagem, sem evidencia ou sem conteudo autorizado devem manter consistencia visual e mensagem honesta.
- Status em cards deve usar texto ou label alem de cor.
- Cards nao clicaveis nao devem parecer interativos.

## Requisitos de acessibilidade - filtros

- Filtros por area, status ou categoria devem ser operaveis por teclado.
- Filtros ativos devem ser comunicados por texto, estado ou label, nao apenas cor.
- Estado sem resultado deve explicar o que aconteceu e como ajustar a busca/filtro.
- Ordem de tabulacao deve permitir entrar, alterar e sair dos filtros sem perda de contexto.

## Requisitos de acessibilidade - formularios

- Campos devem possuir labels claras.
- Campos obrigatorios devem ser identificados.
- Mensagens de erro devem indicar o campo afetado e como corrigir.
- Estados loading, sucesso, erro e fallback devem ter texto claro.
- Formularios nao devem prometer resposta automatica, aprovacao ou acompanhamento completo se isso nao existir.
- E-mail institucional em oportunidades deve ser orientado com clareza.
- Consentimento/aceite deve explicar finalidade do uso dos dados.

## Requisitos de acessibilidade - imagens, icones e SVGs

- Imagens informativas devem possuir texto alternativo adequado.
- Imagens decorativas devem ser tratadas como decorativas na implementacao.
- SVGs e icones funcionais precisam ter nome acessivel ou label equivalente.
- Icones decorativos nao devem gerar ruido semantico.
- Fotos reais so podem aparecer com autorizacao e contexto.
- Imagens nao podem ser o unico meio de comunicar informacao essencial.

## Requisitos de acessibilidade - timeline

- Timeline deve ser compreensivel em ordem logica.
- Marcos devem ter data/periodo, titulo e descricao curta quando publicados.
- Timeline nao deve depender de animacao para ser compreendida.
- Evidencias ausentes nao devem ser simuladas.
- Em mobile, a ordem dos marcos deve permanecer clara.

## Requisitos de acessibilidade - estados

- Estados vazios devem explicar ausencia de conteudo e proximo passo.
- Estados de erro devem explicar o problema e como tentar corrigir.
- Estados loading devem indicar processamento sem esconder contexto essencial.
- Estados de sucesso devem informar resultado sem prometer mais do que o sistema entrega.
- Nenhum estado deve depender apenas de cor, animacao ou icone.

## Requisitos de acessibilidade - teclado, foco e motion

- Header, CTAs, cards, filtros, menus, menu mobile em camadas, formularios e links devem ser navegaveis por teclado.
- Foco visivel deve usar o token aprovado `focus.ring` ou equivalente consistente.
- Foco nao deve ficar escondido por overlays, menus ou animacoes.
- `prefers-reduced-motion` deve reduzir ou desativar animacoes nao essenciais.
- Animacoes nao devem bloquear leitura, navegacao ou interacao.
- Movimento nao deve ser o unico meio de comunicar estado.

## Requisitos de SEO - rotas MVP

| Rota               | Requisito SEO                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `/`                | Title e description institucionais, H1 unico, conteudo textual sobre o NITE               |
| `/projetos`        | Title e description de portfolio, texto indexavel e headings por secao                    |
| `/projetos/[slug]` | Title e description por projeto, slug claro, conteudo textual do projeto                  |
| `/oportunidades`   | Title e description de oportunidades, estado sem oportunidades indexavel sem parecer erro |
| `/atualizacoes`    | Title e description de atualizacoes, cards com texto indexavel                            |
| `/contato`         | Title e description de contato, informacoes institucionais claras                         |
| `/#sobre`          | Secao com heading claro e conteudo textual compreensivel                                  |

## Requisitos de SEO - estrutura

- Cada pagina MVP deve possuir H1 unico.
- Headings devem seguir ordem logica.
- Conteudo principal deve ser textual e indexavel.
- Titles e descriptions devem ser especificos por rota.
- Open Graph deve ser planejado para compartilhamento social.
- Sitemap deve ser implementado futuramente quando rotas estiverem reais.
- `robots.txt` deve ser implementado futuramente se aplicavel.
- Canonical deve ser definido quando houver risco de URL duplicada ou variacao equivalente.
- Slugs e URLs devem ser claros, consistentes e estaveis.
- Rotas futuras nao devem aparecer como paginas reais ate implementacao.

## Requisitos de performance

- Imagens devem ser otimizadas antes de uso em producao.
- Imagens fora da area inicial devem considerar lazy loading quando aplicavel.
- SVGs devem ser revisados para evitar complexidade desnecessaria.
- Animacoes devem ser leves e nao bloquear leitura, navegacao ou interacao.
- Fontes devem ser revisadas para custo, fallback e estabilidade visual.
- JavaScript nao essencial deve ser reduzido.
- Menus, filtros e formularios devem responder de forma perceptivelmente rapida.
- Layout shift deve ser prevenido com dimensoes estaveis para imagens, cards e blocos de conteudo.
- Mobile real deve ser validado antes de release.
- LCP, INP e CLS devem ser medidos na implementacao e auditoria, sem registrar resultado ficticio.

## Requisitos de responsividade

- Mobile pequeno deve manter leitura, navegacao e CTAs sem corte relevante.
- Tablets devem manter grid, cards e formularios organizados.
- Desktop deve preservar largura de leitura e hierarquia visual.
- Navegacao touch deve ter areas de toque confortaveis.
- Cards devem reorganizar conteudo sem quebrar metadados ou CTAs.
- Formularios devem empilhar campos de forma legivel em mobile.
- Menus e menu mobile em camadas devem abrir/fechar sem cobrir conteudo de forma incoerente.
- Timeline deve permanecer legivel sem depender de layout horizontal amplo.

## Criterios objetivos de MVP Premium

Premium nao significa apenas estetica visual. A baseline tecnica do MVP deve garantir:

- Clareza: a home permite entender rapidamente o que e o NITE.
- Navegacao: projetos, contato e oportunidades acessiveis em ate 2 interacoes.
- Acessibilidade: foco visivel, contraste adequado, navegacao por teclado e suporte a motion reduzido.
- Performance: interface leve, responsiva e revisada em mobile.
- SEO institucional: paginas principais com estrutura, titulos e descricoes adequadas para indexacao.
- Movimento controlado: animacoes guiam atencao sem distrair.
- Conteudo honesto: nenhum dado ficticio aparece como real.

## Criterios de aceite globais

- [ ] Dado que o usuario navega por teclado, quando percorre header, CTAs, cards, filtros e formularios, entao todos os elementos interativos recebem foco visivel.
- [ ] Dado que uma pagina possui imagens informativas, quando exibidas, entao cada imagem possui texto alternativo adequado.
- [ ] Dado que um elemento usa cor para indicar status, quando exibido, entao tambem ha texto, icone ou label, nao apenas cor.
- [ ] Dado que o usuario prefere movimento reduzido, quando acessa o portal, entao animacoes nao essenciais sao reduzidas ou desativadas.
- [ ] Dado que o usuario acessa o portal no mobile, quando navega pelas rotas MVP, entao o conteudo permanece legivel e sem corte relevante.
- [ ] Dado que uma pagina MVP e compartilhada, quando exibida em preview social, entao possui titulo, descricao e imagem adequada, quando disponivel.
- [ ] Dado que uma pagina MVP e indexavel, quando analisada, entao possui H1 unico, headings organizados e conteudo textual compreensivel.
- [ ] Dado que o portal usa animacoes, quando carregado em dispositivo comum, entao as animacoes nao bloqueiam leitura, navegacao ou interacao.
- [ ] Dado que uma pagina possui estado vazio, erro, loading ou sucesso, quando exibida, entao o usuario entende o que aconteceu e qual proximo passo.
- [ ] Dado que um formulario e exibido, quando o usuario interage, entao campos possuem labels, mensagens claras e validacao compreensivel.
- [ ] Dado que o portal usa tokens visuais, quando aplicados, entao os textos principais respeitam contraste adequado.

## Criterios documentais da Milestone 7

- [x] Baseline de acessibilidade documentada.
- [x] Baseline de SEO documentada.
- [x] Baseline de performance documentada.
- [x] Baseline de responsividade documentada.
- [x] Rotas MVP e rotas futuras mapeadas.
- [x] WCAG 2.2 e WCAG AA registradas como referencia.
- [x] Core Web Vitals registrados como referencia sem metricas inventadas.
- [x] Criterios globais de aceite registrados.
- [x] Pendencias de implementacao, medicao real, auditoria tecnica e governanca coletiva mantidas fora do escopo documental da Milestone 7.
