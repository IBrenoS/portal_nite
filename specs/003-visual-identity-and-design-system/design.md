# Design - Visual Identity & Design System

## Direcao visual

O portal deve transmitir:

- Inovacao.
- Tecnologia aplicada.
- Institucionalidade.
- Confianca.
- Acessibilidade.
- Sofisticacao.
- Clareza.

## Decisoes visuais consolidadas

- Manter a logo animada como ativo de marca.
- Manter o azul tecnologico como cor primaria.
- Suavizar o fundo escuro, evitando preto absoluto dominante.
- Usar grid e glow com moderacao.
- Padronizar cards, botoes, badges e secoes.
- Reduzir ruido visual.
- Criar tokens de design.

## Tokens visuais aprovados

Decisao aprovada pelo gestor/desenvolvedor do projeto: o Portal NITE adotara uma paleta dark premium, tecnologica e institucional, com fundo escuro suave, superficies elevadas, azul como cor primaria e ciano como destaque. O preto absoluto nao sera usado como fundo dominante. Grid, glow e gradientes devem ser usados com moderacao e intencao.

O token `background.default` foi ajustado de `#080A12` para `#0A0A0F` apos validacao visual, para reduzir a percepcao azulada do fundo dominante e aproximar a base visual de um dark premium neutro/grafite. A decisao mantem a regra de evitar preto absoluto como fundo dominante e preservar o azul como acento de marca.

| Token              | Valor aprovado              | Uso principal                       |
| ------------------ | --------------------------- | ----------------------------------- |
| background.default | `#0A0A0F`                   | Fundo principal                     |
| background.section | `#0D111C`                   | Separacao de blocos e secoes        |
| surface.card       | `#121826`                   | Cards                               |
| surface.elevated   | `#172033`                   | Mega menu, dropdowns e paineis      |
| surface.soft       | `#F3F6FA`                   | Secoes claras pontuais              |
| border.subtle      | `rgba(255, 255, 255, 0.08)` | Bordas discretas                    |
| border.strong      | `rgba(255, 255, 255, 0.16)` | Bordas com mais presenca            |
| text.primary       | `#F4F7FB`                   | Texto principal                     |
| text.secondary     | `#AAB4C3`                   | Texto secundario                    |
| text.muted         | `#758195`                   | Texto de apoio                      |
| brand.primary      | `#2563EB`                   | CTAs principais e identidade        |
| brand.accent       | `#38BDF8`                   | Highlights, icones e microdestaques |
| brand.glow         | `rgba(56, 189, 248, 0.22)`  | Glow de baixa intensidade           |
| brand.soft         | `rgba(37, 99, 235, 0.12)`   | Destaques suaves                    |
| focus.ring         | `#7DD3FC`                   | Foco visivel                        |
| status.draft       | `#94A3B8`                   | Status rascunho                     |
| status.progress    | `#38BDF8`                   | Status em progresso                 |
| status.validated   | `#A78BFA`                   | Status validado                     |
| status.done        | `#34D399`                   | Status concluido                    |
| status.warning     | `#FBBF24`                   | Status de alerta                    |
| status.error       | `#FB7185`                   | Status de erro                      |

## Regras de uso dos tokens

- `background.default` deve ser o fundo principal.
- `background.section` deve separar blocos e secoes.
- `surface.card` deve ser usado em cards.
- `surface.elevated` deve ser usado em mega menu, dropdowns e paineis.
- `surface.soft` pode ser usado apenas em secoes claras pontuais.
- `brand.primary` deve ser usado para CTAs principais e elementos de identidade.
- `brand.accent` deve ser usado para highlights, icones e microdestaques.
- `brand.glow` deve ser usado com baixa intensidade, apenas em hero, timeline ou elementos especiais.
- `focus.ring` deve ser usado para foco visivel.
- Status colors devem ser usadas junto com texto ou icone, nunca como unico meio de comunicacao.
- A paleta deve respeitar contraste minimo recomendado para acessibilidade.

## Backgrounds, superficies e profundidade

- O fundo principal do portal deve usar `background.default`, com `background.section` para separar blocos extensos.
- Cards devem usar `surface.card` e manter estrutura visual consistente entre listas, detalhes e chamadas institucionais.
- Mega menu, dropdowns e paineis devem usar `surface.elevated` para diferenciar camadas interativas.
- `surface.soft` deve aparecer apenas em secoes claras pontuais e com revisao de contraste especifica.
- Bordas devem ser discretas por padrao, usando `border.subtle`; `border.strong` deve ficar reservado para enfase, divisao clara ou estados ativos.
- Sombras, quando usadas, devem ser discretas e secundarias em relacao a superficie, borda e contraste.
- Glow deve ser aplicado em baixa intensidade, apenas em hero, timeline ou elementos especiais.
- Grid visual e gradientes devem apoiar orientacao e profundidade, sem virar fundo dominante nem competir com conteudo.

## Regra de acessibilidade visual

- Contraste minimo e baseline universal de legibilidade, nao modo especial de acessibilidade.
- A paleta oficial deve nascer respeitando contraste adequado para textos, botoes, badges, links e estados interativos.
- Usar WCAG 2.2 nivel AA como referencia: contraste minimo de 4.5:1 para texto normal e 3:1 para texto grande.
- Esses criterios devem orientar os tokens desde a Spec 003, antes da implementacao.
- A validacao final de contraste por componente sera feita na implementacao e na baseline de acessibilidade.
- O conteudo base deve ser legivel sem depender de preferencia ativada pelo usuario.
- Preferencias como `prefers-reduced-motion` sao adaptacao adicional, nao substituicao da legibilidade padrao.

## Tipografia, escala e layout do MVP

| Item                 | Default documental do MVP                                               | Status                       |
| -------------------- | ----------------------------------------------------------------------- | ---------------------------- |
| Fonte de corpo       | Fonte atual do projeto ou fallback sans-serif                           | Aprovado para orientar o MVP |
| Fonte de titulo      | Fonte atual do projeto ou fallback sans-serif                           | Aprovado para orientar o MVP |
| Fonte mono           | Usar apenas em tags tecnicas, stack e metadados curtos, se aplicavel    | Aprovado para orientar o MVP |
| Raio pequeno         | `8px`                                                                   | Aprovado para orientar o MVP |
| Raio medio           | `12px`                                                                  | Aprovado para orientar o MVP |
| Grid max-width       | `1120px` a `1200px`                                                     | Aprovado para orientar o MVP |
| Espacamento de secao | `64px` desktop, `40px` mobile                                           | Aprovado para orientar o MVP |
| Glow                 | Uso pontual, nunca como fundo dominante                                 | Aprovado para orientar o MVP |
| Motion               | Curta, discreta, nao essencial e adaptavel por `prefers-reduced-motion` | Aprovado para orientar o MVP |

Esses valores sao defaults documentais para a implementacao do MVP. A validacao final de legibilidade, densidade e contraste por componente deve ocorrer durante a implementacao e na baseline de acessibilidade.

## Componentes base

- Header.
- Mega menu.
- Mobile accordion.
- Hero section.
- Button/CTA.
- Card generico.
- ProjectCard.
- UpdateCard.
- OpportunityBanner.
- StatusBadge.
- Timeline item.
- SectionHeader.
- Footer institucional.

## API, variantes e estados dos componentes

APIs abaixo sao contrato de design da Spec 003, nao implementacao de codigo. Os nomes representam responsabilidade visual e de conteudo; a implementacao podera adaptar nomes tecnicos sem mudar o comportamento aprovado.

| Componente           | API minima de design                                                                     | Variantes                                                                                                         | Estados obrigatorios                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Button               | `label`, `href` ou `onAction`, `variant`, `size`, `disabled`, `loading`                  | `primary`, `secondary`, `ghost`, `outline`, `link`                                                                | default, hover, focus, active, disabled, loading                                                                        |
| Card                 | `title`, `summary`, `href` ou `onAction`, `variant`, `size`, `disabled`, `media`, `meta` | `default`, `elevated`, `subtle`, `interactive`                                                                    | default, hover/focus quando interativo, active quando aplicavel, disabled/aria-disabled, fallback sem conteudo validado |
| Hero                 | `title`, `description`, `primaryCta`, `secondaryCta`, `visualState`                      | `home`, `compact`                                                                                                 | default, foco nos CTAs, fallback sem motion                                                                             |
| StatusBadge          | `status`, `label` opcional, `size`, `variant`, `icon` opcional                           | `soft`, `outline`; status `draft`, `progress`, `in_progress`, `validated`, `done`, `warning`, `error`, `archived` | default, label textual visivel, icone decorativo opcional, sem foco por padrao, sem depender so de cor                  |
| SectionHeader        | `eyebrow`, `title`, `description`, `as`, `align`, `actions`                              | `left`, `center`                                                                                                  | default, heading semantico configuravel, actions com foco quando interativas                                            |
| ProjectCard          | `title`, `summary`, `area`, `status`, `href`, `stack` opcional                           | `compact`, `featured`                                                                                             | default, hover, focus, active quando aplicavel, fallback sem evidencia                                                  |
| TimelineItem         | `date`, `title`, `description`, `evidence` opcional                                      | `default`, `highlight`                                                                                            | default, fallback sem evidencia                                                                                         |
| UpdateCard           | `title`, `date`, `summary`, `href`, `image` opcional                                     | `default`, `compact`                                                                                              | default, hover, focus, fallback sem imagem                                                                              |
| OpportunityBanner    | `status`, `title`, `description`, `cta`                                                  | `open`, `closed`, `future`                                                                                        | default, estado sem vagas, CTA pendente                                                                                 |
| Header               | `links`, `ctaPrimary`, `ctaSecondary`, `activePath`                                      | `desktop`, `mobile`                                                                                               | closed, open, hover, focus, active                                                                                      |
| MegaMenu             | `groups`, `open`, `activeGroup`                                                          | `desktop`, `mobileAccordion`                                                                                      | closed, open, hover, focus, active                                                                                      |
| Footer institucional | `links`, `contact`, `social`                                                             | `default`                                                                                                         | default, link focus                                                                                                     |

## Guidelines de motion

- Motion deve ser curta, discreta e nao essencial para compreender conteudo.
- Animacoes devem priorizar opacity, transform e transicoes leves, evitando deslocamentos longos ou efeitos que atrapalhem leitura.
- Hero, menu, timeline e estados interativos podem usar movimento para orientar atencao, desde que o conteudo esteja disponivel sem animacao.
- Movimento nao deve ser o unico meio de comunicar estado; usar tambem texto, icone, posicao, foco ou estrutura.
- Quando `prefers-reduced-motion` estiver ativo, animacoes nao essenciais devem ser reduzidas ou desativadas.
- Foco por teclado deve permanecer claramente visivel com ou sem motion.

## Regras de uso

- Botoes primarios devem ser reservados para acao principal da tela.
- Botoes secundarios devem apoiar navegacao sem competir com primario.
- Cards clicaveis devem ter foco visivel e area de clique previsivel.
- Badges de status devem combinar texto e cor.
- Depoimentos, fotos e responsaveis devem ficar ocultos ou pendentes quando nao houver validacao.
- Animacoes devem ser curtas, discretas e nao essenciais para compreender conteudo.
- O termo publico para conteudo de novidades do MVP e Atualizacoes; noticias pode aparecer apenas como termo contextual, nao como label principal.
