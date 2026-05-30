# Requirements - Visual Identity & Design System

## Status

Milestone 3 concluida para o escopo MVP - identidade visual e design system fechados

## Milestone

Milestone 3 - Visual Identity & Design System

## Objetivo

Consolidar um unico design system NITE premium, inspirado na linguagem publica da Resend e sem camadas paralelas de tokens ou componentes.

## Decisao visual aprovada

Decisao aprovada pelo gestor/desenvolvedor em 2026-05-30: o Portal NITE adota um unico namespace canonico `--nite-*`. O dark global usa `#000000`, o light global preserva `#F7F3EA`, azul permanece como acento de marca e ciano como microdestaque.

Grid, glow e gradientes devem ser usados com moderacao. Cards compartilhados sao transparentes com borda sutil; CTAs primarios usam glass action.

## Estado atual de Light Mode / Theme System

O dark mode homologado permanece como baseline principal do MVP Premium. O ciclo posterior de Light Mode e Theme Toggle foi implementado e fechado na Spec 003, sem remover o dark mode homologado.

O theme system implementado suporta tema manual e preferencia do sistema, com comportamento registrado em `tasks.md`:

- Manter dark como baseline principal e fallback homologado.
- Oferecer controle manual de tema com opcoes `Escuro`, `Claro` e `Sistema`.
- Permitir opcao "Sistema" para respeitar `prefers-color-scheme`.
- Persistir a escolha manual do usuario sem substituir `prefers-reduced-motion`.
- Preservar `prefers-reduced-motion` como decisao independente de tema visual.

Light Mode e Theme Toggle nao sao mais itens futuros nesta Spec. A infraestrutura de tema ja existe e esta concluida.

O light mode usa fundo off-white premium, levemente quente/neutro, sem branco absoluto como fundo dominante. A identidade deve continuar institucional, tecnologica e premium, preservando azul como acento de marca e vermelho UNIJORGE como acento institucional pontual, nao como fundo dominante nem substituto do CTA principal.

Tokens light foram documentados e aplicados na implementacao. A validacao de Button, Card, StatusBadge, ProjectCard, UpdateCard e OpportunityBanner em dark/light foi concluida, assim como a revisao de `themeColor`, manifest e Open Graph em task propria. A auditoria de dependencias visuais hardcoded de dark mode foi concluida em task propria, com correcoes pontuais no Hero, texto metalico de marca, glows de logo e marcadores de timeline, alem da preservacao justificada de assets controlados e da cena escura isolada da timeline premium.

## Design system NITE canonico

A referencia publica da Resend observada em 2026-05-30 orienta contraste, bordas sutis, acoes glass e campos contidos. Como a referencia externa pode mudar, o codigo final depende exclusivamente do contrato local `--nite-*`.

- Usar `--nite-background`, `--nite-surface-*`, `--nite-text-*`, `--nite-border-*`, `--nite-action-*`, `--nite-focus`, `--nite-status-*` e `--nite-brand-*`.
- Derivar aliases shadcn/Tailwind como `--background`, `--card`, `--primary` e `--ring` exclusivamente de `--nite-*`.
- Tratar os valores light como adaptacao local para legibilidade e contraste, nao como tokens oficiais publicados pela Resend.
- Reutilizar `Button`, `Card`, `Input`, `Textarea`, `Chip`, `StatusBadge` e `EmptyState` em vez de reconstruir receitas em JSX.
- Isolar composicoes autorais com `data-nite-scene`, sem permitir que cenas definam variantes globais paralelas.

As melhorias P2 antes registradas para texto persistente do botao desktop fechado do Theme Toggle e `allowedDevOrigins` para `127.0.0.1` foram removidas do escopo MVP por decisao tecnica. Elas nao foram implementadas, nao permanecem no backlog ativo da Spec 003 e nao bloqueiam producao, acessibilidade essencial, SEO, performance, conteudo institucional nem o funcionamento publico do Portal NITE.

Governanca minima de conteudo permanece Pendente de validacao coletiva. O status vigente das ADRs permanece definido nos proprios arquivos em `docs/adr`; esta spec nao aprova ADR automaticamente.

## Requisitos de experiencia

- A identidade deve parecer conectada ao NITE.
- O fundo escuro nao deve prejudicar leitura.
- O azul deve ser usado como destaque, nao como excesso visual.
- Cards devem seguir padrao consistente.
- Botoes devem possuir hierarquia clara.
- Elementos clicaveis devem ser reconheciveis.
- O design deve parecer institucional e tecnologico ao mesmo tempo.
- Animacoes nao devem prejudicar leitura.
- Deve haver estado visual de foco para teclado.
- Premium nao significa apenas estetica visual: a interface deve sustentar clareza, credibilidade, acessibilidade, performance e conteudo honesto.
- O visual deve ser moderno, serio e tecnologico, sem parecer infantil ou exagerado.
- Animacoes devem guiar atencao, nao distrair.
- Cards, botoes, badges, secoes e CTAs devem seguir design system consistente.
- A paleta oficial deve ser dark premium, tecnologica e institucional.
- O dark global deve usar `#000000`; blocos extensos podem usar `--nite-section`.
- Grid, glow e gradientes devem ser usados com moderacao e intencao.
- A experiencia visual deve partir dos tokens finais aprovados na Spec 003.
- O design system deve sustentar uma leitura premium sem depender de dados reais ainda nao validados.

## Requisitos de tipografia, layout e superficies

- Corpo, controles, cards, menus e logo devem usar Geist.
- Headings e displays editoriais devem usar Sora.
- Geist Mono pode ser usada apenas em tags tecnicas, stack, metadados ou pequenos marcadores.
- O layout base deve usar largura maxima recomendada entre 1120px e 1200px para conteudo principal.
- O espacamento recomendado de secoes deve partir de 64px no desktop e 40px no mobile, com ajuste responsivo quando necessario.
- O raio de borda recomendado deve usar 8px para controles/cards compactos e 12px para superficies maiores.
- Superficies devem diferenciar fundo principal, blocos de secao, cards e paineis elevados sem excesso de contraste decorativo.
- Glow, grid visual e gradientes devem ser pontuais e nao devem competir com conteudo, CTAs ou estados de foco.

## Requisitos de acessibilidade visual

- Contraste minimo e baseline universal de legibilidade, nao modo especial de acessibilidade.
- A paleta oficial deve nascer respeitando contraste adequado para textos, botoes, badges, links e estados interativos.
- Usar WCAG 2.2 nivel AA como referencia: contraste minimo de 4.5:1 para texto normal e 3:1 para texto grande.
- Esses criterios devem orientar os tokens desde a Spec 003, antes da implementacao.
- A validacao final de contraste por componente sera feita na implementacao e na baseline de acessibilidade.
- O conteudo base deve ser legivel sem depender de preferencia ativada pelo usuario.
- Preferencias como `prefers-reduced-motion` sao adaptacao adicional, nao substituicao da legibilidade padrao.

## Requisitos de componentes

- Componentes base devem possuir variantes documentadas antes de implementacao ampla.
- Componentes interativos devem cobrir estados default, hover, focus, active, disabled e loading quando aplicavel.
- Componentes de conteudo devem possuir fallback para ausencia de dado validado.
- Componentes que exibem status devem evitar depender apenas de cor.
- Componentes animados devem respeitar `prefers-reduced-motion`.
- Tokens visuais finais do MVP Premium devem seguir a paleta aprovada pelo gestor/desenvolvedor do projeto.
- A Spec 003 deve documentar como contrato de design, antes de implementacao, os componentes base: Header, MegaMenu desktop, menu mobile em camadas, Hero, Button/CTA, Card, ProjectCard, UpdateCard, OpportunityBanner, StatusBadge, TimelineItem, SectionHeader e Footer institucional.
- O Header final deve usar MegaMenu desktop compacto, premium e integrado ao background, alem de menu mobile em camadas com primeira camada de grupos e segunda camada de links por grupo.
- Componentes com conteudo dependente de autorizacao devem prever estado `pending`, oculto ou fallback honesto.

## Requisitos de movimento

- Motion deve ser suporte visual nao essencial.
- Animacoes devem guiar atencao sem distrair, atrasar leitura ou esconder conteudo.
- Movimento nao deve ser o unico meio de comunicar estado, progresso ou feedback.
- Transicoes devem ser discretas e compativeis com navegacao por teclado.
- Quando `prefers-reduced-motion` estiver ativo, animacoes nao essenciais devem ser reduzidas ou desativadas.
- A legibilidade base nao deve depender de preferencia do usuario; `prefers-reduced-motion` e adaptacao adicional.

## Criterios de aceitacao

- [ ] Dado que o usuario visualiza a home, quando observa os componentes, entao percebe consistencia visual entre secoes.
- [ ] Dado que um card e exibido, quando comparado a outro card do mesmo tipo, entao ambos seguem a mesma estrutura visual.
- [ ] Dado que o usuario usa teclado, quando navega pelos botoes, entao o foco visual e claramente perceptivel.
- [ ] Dado que o usuario prefere movimento reduzido, quando acessa o portal, entao animacoes nao essenciais sao reduzidas ou desativadas.
- [ ] Dado que um componente base e usado, quando revisado, entao sua variante e estado estao documentados.
- [ ] Dado que um token visual e aplicado, quando revisado, entao seu valor segue a paleta final aprovada.
- [ ] Dado que a interface e revisada como MVP Premium, quando avaliada visualmente, entao parece institucional, tecnologica, seria e consistente.
- [ ] Dado que ha movimento na interface, quando o usuario consome o conteudo, entao a animacao guia atencao sem distrair.
- [ ] Dado que texto, botao, badge, link ou estado interativo e exibido, quando revisado, entao respeita contraste minimo recomendado pela WCAG 2.2 nivel AA.

## Criterios documentais da Milestone 3

- [x] Direcao visual premium, tecnologica e institucional registrada como decisao aprovada.
- [x] Tokens visuais finais registrados na Spec 003.
- [x] Contraste minimo registrado como baseline universal de legibilidade.
- [x] Tipografia, layout, superficies, glow, grid visual e motion definidos em nivel de design.
- [x] Componentes base, variantes e estados documentados como contrato de design.
- [x] Pendencias de implementacao e validacao tecnica mantidas fora do escopo documental da Milestone 3.
