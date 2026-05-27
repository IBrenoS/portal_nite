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

O token `background.default` foi ajustado de `#0A0A0F` para `#09090a` apos validacao visual, para reduzir a percepcao azulada do fundo dominante e aproximar a base visual de um dark premium neutro/grafite. A decisao mantem a regra de evitar preto absoluto como fundo dominante e preservar o azul como acento de marca.

| Token              | Valor aprovado              | Uso principal                       |
| ------------------ | --------------------------- | ----------------------------------- |
| background.default | `#09090a`                   | Fundo principal                     |
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

## Theme System e Light Mode implementado

Dark mode permanece o baseline principal e homologado do MVP Premium. Light Mode foi implementado no ciclo posterior da Spec 003, junto com o Theme Toggle, sem remover o dark mode homologado.

### Estrategia de tema

- Baseline principal do MVP atual: dark.
- Controle manual de tema implementado com opcoes `Escuro`, `Claro` e `Sistema`.
- A opcao `Sistema` respeita `prefers-color-scheme`.
- A escolha manual do usuario deve ter prioridade sobre a preferencia do sistema.
- `prefers-reduced-motion` deve continuar independente do tema visual.
- `color-scheme` deve acompanhar o tema ativo para controles nativos.

### Tokens light implementados

Os valores abaixo sao o baseline documental do Light Mode implementado. Eles nao removem nem substituem os tokens dark homologados.

| Token light             | Valor aplicado                     | Uso principal                                          |
| ----------------------- | ---------------------------------- | ------------------------------------------------------ |
| background.default      | `#F7F3EA`                          | Fundo principal off-white premium, sem branco absoluto |
| background.section      | `#EFE8DC`                          | Separacao de blocos e secoes                           |
| surface.card            | `#FFFBF5`                          | Cards e superficies principais                         |
| surface.elevated        | `#F2EBDD`                          | MegaMenu, dropdowns e paineis elevados                 |
| surface.soft            | `#EAF1FA`                          | Destaques suaves e secoes pontuais                     |
| border.subtle           | `rgba(17, 24, 39, 0.12)`           | Bordas discretas                                       |
| border.strong           | `rgba(17, 24, 39, 0.22)`           | Bordas com mais presenca                               |
| text.primary            | `#111827`                          | Texto principal                                        |
| text.secondary          | `#334155`                          | Texto secundario                                       |
| text.muted              | `#5B6472`                          | Texto de apoio                                         |
| brand.primary           | `#1D4ED8`                          | CTAs principais e links em light mode                  |
| brand.accent            | `#0369A1`                          | Highlights, icones e microdestaques                    |
| brand.unijorge-red      | `#C24132`                          | Acento institucional UNIJORGE pontual                  |
| brand.glow              | `rgba(29, 78, 216, 0.14)`          | Glow reduzido e nao dominante                          |
| brand.soft              | `rgba(29, 78, 216, 0.10)`          | Destaques suaves                                       |
| brand.unijorge-red-soft | `rgba(194, 65, 50, 0.12)`          | Destaque vermelho suave, sem substituir status de erro |
| focus.ring              | `#1D4ED8`                          | Foco visivel                                           |
| status.draft            | `#475569`                          | Status rascunho/estrutura                              |
| status.progress         | `#0369A1`                          | Status em progresso                                    |
| status.validated        | `#6D28D9`                          | Status validado                                        |
| status.done             | `#047857`                          | Status concluido                                       |
| status.warning          | `#92400E`                          | Status de alerta                                       |
| status.error            | `#BE123C`                          | Status de erro                                         |
| shadow.brand.lift       | `0 18px 48px rgb(15 23 42 / 0.14)` | Elevacao suave em superficies                          |

### Comportamento por componente

- Header e MegaMenu: devem trocar overlays `white/[...]`, bordas translúcidas claras e sombras escuras por tokens de superficie, borda e sombra do tema ativo. MegaMenu deve continuar compacto, acessivel e sem depender apenas de hover.
- Menu mobile em camadas: deve preservar contraste de botoes, foco visivel, leitura de grupos e ausencia de scroll horizontal.
- Button e CTAs: `brand.primary` continua sendo a cor principal. Azul deve ter contraste AA com texto do botao. Vermelho UNIJORGE deve ser reservado para acento institucional pontual, nao para CTA principal nem estados de erro.
- Card, ProjectCard, UpdateCard e OpportunityBanner: devem usar tokens `background`, `card`, `popover`, `muted`, `border`, `foreground` e status tokens; fallbacks sem imagem/evidencia devem continuar honestos e legiveis.
- StatusBadge: deve manter label textual visivel. Cores light de status devem ser recalibradas para contraste AA em texto e borda, sem depender apenas de cor.
- Hero: deve reduzir glow e gradientes para nao transformar azul em fundo dominante no light mode. A logo/efeito visual deve ser validado separadamente para legibilidade em fundo claro.
- Footer: deve preservar landmark `<footer>`, links reais, foco visivel e contraste de texto secundario.

### Validacao e fechamento do escopo MVP

- Light Mode e Theme Toggle estao implementados e fechados na Spec 003, conforme `tasks.md`.
- A infraestrutura de tema existe e o seletor suporta `Escuro`, `Claro` e `Sistema`.
- A auditoria e remocao de dependencias visuais hardcoded de dark mode foi concluida nesta task: hardcodes runtime em Hero, texto metalico de marca, glows de logo e marcadores de timeline foram trocados por tokens/variaveis semanticas; assets SVG/OG/manifest foram preservados como ativos controlados; a cena escura da timeline premium foi preservada como composicao visual isolada e validada em dark/light.
- A validacao de Button, Card, StatusBadge, ProjectCard, UpdateCard e OpportunityBanner em dark/light foi concluida nesta task, mantendo foco visivel, estados textuais e contraste AA nos tokens avaliados.
- A revisao de `themeColor`, manifest e Open Graph foi concluida nesta task; `themeColor` considera dark/light no viewport, manifest usa o dark premium homologado e Open Graph/Twitter permanecem com titulo, descricao e asset gerado existente, sem imagem institucional inventada.
- As melhorias P2 de texto persistente no botao desktop fechado do Theme Toggle e `allowedDevOrigins` para `127.0.0.1` foram descartadas por decisao de escopo MVP; nao foram implementadas e nao permanecem como pendencias ativas.
- A Spec 003 esta fechada para o escopo MVP.

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
- MegaMenu desktop.
- Menu mobile em camadas.
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

O Header final do MVP utiliza MegaMenu desktop compacto e menu mobile em camadas. O MegaMenu deve permanecer compacto, nao full-width, premium e integrado ao background. O menu mobile nao e accordion simples: a primeira camada contem logo/marca, CTA principal, botao fechar e grupos principais; a segunda camada contem botao voltar, botao fechar, titulo do grupo e links do grupo.

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
| MegaMenu             | `groups`, `open`, `activeGroup`                                                          | `desktopCompact`                                                                                                  | closed, open, hover, focus, active                                                                                      |
| MobileLayeredMenu    | `groups`, `open`, `activeGroup`, `onBack`, `onClose`                                     | `mobile`                                                                                                          | closed, open, groupSelected, back, focus, active                                                                        |
| Footer institucional | `links`, `contact`, `social`                                                             | `default`                                                                                                         | default, link focus                                                                                                     |

## Guidelines de motion

- Motion deve ser curta, discreta e nao essencial para compreender conteudo.
- Animacoes devem priorizar opacity, transform e transicoes leves, evitando deslocamentos longos ou efeitos que atrapalhem leitura.
- Hero, menu, timeline e estados interativos podem usar movimento para orientar atencao, desde que o conteudo esteja disponivel sem animacao.
- Motion do MegaMenu desktop e do menu mobile em camadas deve ser curto, funcional, subordinado a navegacao e respeitar `prefers-reduced-motion`.
- Movimento nao deve ser o unico meio de comunicar estado; usar tambem texto, icone, posicao, foco ou estrutura.
- Quando `prefers-reduced-motion` estiver ativo, animacoes nao essenciais devem ser reduzidas ou desativadas.
- Foco por teclado deve permanecer claramente visivel com ou sem motion.

## Regras de uso

- Botoes primarios devem ser reservados para acao principal da tela.
- Botoes secundarios devem apoiar navegacao sem competir com primario.
- Cards clicaveis devem ter foco visivel e area de clique previsivel.
- Header, MegaMenu desktop e menu mobile em camadas devem usar botoes reais para grupos expansivos, links reais para navegacao, foco visivel e controles compreensiveis por toque e teclado.
- Badges de status devem combinar texto e cor.
- Depoimentos, fotos e responsaveis devem ficar ocultos ou pendentes quando nao houver validacao.
- Animacoes devem ser curtas, discretas e nao essenciais para compreender conteudo.
- O termo publico para conteudo de novidades do MVP e Atualizacoes; noticias pode aparecer apenas como termo contextual, nao como label principal.
