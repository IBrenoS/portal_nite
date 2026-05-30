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
- Usar preto absoluto como dark global e superficies transparentes com bordas sutis.
- Usar grid e glow com moderacao.
- Padronizar cards, botoes, badges e secoes.
- Reduzir ruido visual.
- Criar tokens de design.

## Tokens visuais aprovados

Decisao aprovada pelo gestor/desenvolvedor em 2026-05-30: o Portal NITE adota um unico contrato `--nite-*`, inspirado na linguagem publica da Resend observada na mesma data. A referencia externa nao e dependencia de runtime.

| Token                    | Dark aprovado                       | Light adaptado                      | Uso principal                     |
| ------------------------ | ----------------------------------- | ---------------------------------- | --------------------------------- |
| `--nite-background`      | `#000000`                           | `#F7F3EA`                          | Fundo global                      |
| `--nite-section`         | `#09090A`                           | `#EFE8DC`                          | Blocos extensos                   |
| `--nite-surface`         | `rgb(24 25 28 / 0.88)`              | `rgb(255 251 245 / 0.92)`         | Paineis e campos                  |
| `--nite-surface-focus`   | `rgb(24 25 28 / 0.96)`              | `rgb(255 251 245 / 0.98)`         | Campo em foco                     |
| `--nite-text-primary`    | `#F0F0F0`                           | `#111827`                          | Texto principal                   |
| `--nite-text-secondary`  | `#A1A4A5`                           | `#334155`                          | Texto secundario                  |
| `--nite-text-muted`      | `#878D8F`                           | `#5B6472`                          | Metadados e apoio                 |
| `--nite-border-subtle`   | `rgb(176 199 217 / 0.145)`          | `rgb(17 24 39 / 0.14)`            | Bordas de cards transparentes     |
| `--nite-border-hover`    | `rgb(217 237 254 / 0.26)`           | `rgb(29 78 216 / 0.38)`           | Hover de superficies interativas  |
| `--nite-focus`           | `rgb(255 255 255 / 0.3)`            | `rgb(29 78 216 / 0.34)`           | Foco visivel                      |
| `--nite-brand-primary`   | `#2563EB`                           | `#1D4ED8`                          | Identidade e acentos principais   |
| `--nite-brand-accent`    | `#38BDF8`                           | `#0369A1`                          | Icones e microdestaques           |
| `--nite-brand-glow`      | `rgb(56 189 248 / 0.22)`            | `rgb(29 78 216 / 0.14)`           | Glow pontual                      |

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

Os valores light sao adaptacoes locais para leitura e contraste. A Resend nao publica um conjunto oficial de tokens light extraido para este projeto. O runtime mantem somente `system | light | dark`, com resolucao para `light` ou `dark`.

### Comportamento por componente

- Header e MegaMenu: devem trocar overlays `white/[...]`, bordas translúcidas claras e sombras escuras por tokens de superficie, borda e sombra do tema ativo. MegaMenu deve continuar compacto, acessivel e sem depender apenas de hover.
- Menu mobile em camadas: deve preservar contraste de botoes, foco visivel, leitura de grupos e ausencia de scroll horizontal.
- Button e CTAs: a variante primaria usa `nite-glass-action`; azul permanece como acento de marca e nao como bloco dominante.
- Card, ProjectCard, UpdateCard e OpportunityBanner: cards compartilhados usam superficie transparente e `--nite-border-subtle`; fallbacks sem imagem/evidencia devem continuar honestos e legiveis.
- StatusBadge: deve manter label textual visivel. Cores light de status devem ser recalibradas para contraste AA em texto e borda, sem depender apenas de cor.
- Hero: deve reduzir glow e gradientes para nao transformar azul em fundo dominante no light mode. A logo/efeito visual deve ser validado separadamente para legibilidade em fundo claro.
- Footer: deve preservar landmark `<footer>`, links reais, foco visivel e contraste de texto secundario.

### Contrato canonico NITE inspirado na Resend

A referencia publica da Resend observada em 2026-05-30 e dark-first. O Portal NITE incorpora sua gramatica visual em um unico namespace local, sem manter variante Resend paralela.

Utilitarios consolidados:

- `nite-gradient-text`: gradiente editorial adaptado ao tema.
- `nite-glass-action`: CTA translucido com hover, focus e disabled semanticos.
- `nite-form-field`: campo de formulario com superficie, placeholder e foco semanticos.
- `nite-panel`: painel compartilhado baseado na superficie canonica.
- `data-nite-scene`: escopo explicito para timeline premium, logo eletrica, wordmark final e composicoes inversas.

Aliases shadcn/Tailwind como `--background`, `--card`, `--primary` e `--ring` sao derivados exclusivamente de `--nite-*`.

### Validacao e fechamento do escopo MVP

- Light Mode e Theme Toggle estao implementados e fechados na Spec 003, conforme `tasks.md`.
- A infraestrutura de tema existe e o seletor suporta `Escuro`, `Claro` e `Sistema`.
- A auditoria e remocao de dependencias visuais hardcoded de dark mode foi concluida nesta task: hardcodes runtime em Hero, texto metalico de marca, glows de logo e marcadores de timeline foram trocados por tokens/variaveis semanticas; assets SVG/OG/manifest foram preservados como ativos controlados; a cena escura da timeline premium foi preservada como composicao visual isolada e validada em dark/light.
- A validacao de Button, Card, StatusBadge, ProjectCard, UpdateCard e OpportunityBanner em dark/light foi concluida nesta task, mantendo foco visivel, estados textuais e contraste AA nos tokens avaliados.
- A revisao de `themeColor`, manifest e Open Graph foi concluida nesta task; `themeColor` considera `#000000` no dark e `#F7F3EA` no light, manifest usa o mesmo dark global e Open Graph preserva a identidade NITE com acentos azuis.
- As melhorias P2 de texto persistente no botao desktop fechado do Theme Toggle e `allowedDevOrigins` para `127.0.0.1` foram descartadas por decisao de escopo MVP; nao foram implementadas e nao permanecem como pendencias ativas.
- A Spec 003 esta fechada para o escopo MVP.

## Regras de uso dos tokens

- `--nite-background` deve ser o fundo global.
- `--nite-section` pode diferenciar blocos extensos sem depender de linhas horizontais entre secoes.
- `--nite-surface` e `--nite-surface-elevated` devem sustentar campos, MegaMenu, dropdowns e paineis.
- Cards compartilhados devem ser transparentes com `--nite-border-subtle`.
- `--nite-brand-primary` deve ser usado para identidade e acentos principais.
- `--nite-brand-accent` deve ser usado para highlights, icones e microdestaques.
- `--nite-brand-glow` deve ser usado com baixa intensidade, apenas em hero, timeline ou elementos especiais.
- `--nite-focus` deve ser usado para foco visivel.
- Status colors devem ser usadas junto com texto ou icone, nunca como unico meio de comunicacao.
- A paleta deve respeitar contraste minimo recomendado para acessibilidade.

## Backgrounds, superficies e profundidade

- O fundo principal do portal deve usar `--nite-background`, com `--nite-section` apenas quando um bloco extenso precisar de fundo alternativo.
- Cards devem ser transparentes e manter estrutura consistente entre listas, detalhes e chamadas institucionais.
- Mega menu, dropdowns, paineis e campos devem usar `--nite-surface-*` para diferenciar camadas interativas.
- Bordas devem ser discretas por padrao, usando `--nite-border-subtle` em componentes, cards e controles; linhas horizontais nao devem ser usadas como divisor padrao entre secoes.
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
| Fonte de corpo       | Geist para corpo, controles, cards, menus e logo                        | Implementado                 |
| Fonte de heading     | Sora para headings e displays editoriais                                | Implementado                 |
| Fonte mono           | Geist Mono para tags tecnicas, stack e metadados curtos                 | Implementado                 |
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
- Input.
- Textarea.
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
| Input                | props nativas de `input`, `className`                                                     | campo compartilhado                                                                                                | default, placeholder, focus, disabled, invalid                                                                          |
| Textarea             | props nativas de `textarea`, `className`                                                  | campo compartilhado                                                                                                | default, placeholder, focus, disabled, invalid                                                                          |
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
