# Tasks - Visual Identity & Design System

- [x] Definir paleta final do portal. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Definir tokens de cor. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Definir escala tipografica. Evidencia: Defaults documentais do MVP registrados na Spec 003.
- [x] Definir fonte para titulos. Evidencia: Uso da fonte atual do projeto ou fallback sans-serif registrado como orientacao do MVP.
- [x] Definir fonte para corpo de texto. Evidencia: Uso da fonte atual do projeto ou fallback sans-serif registrado como orientacao do MVP.
- [x] Definir uso de fonte mono para tags tecnicas, se aplicavel. Evidencia: Uso limitado a tags tecnicas, stack e metadados curtos registrado na Spec 003.
- [x] Definir espacamentos padrao. Evidencia: Espacamento base de secoes registrado como default documental do MVP.
- [x] Definir grid/layout base. Evidencia: Largura maxima recomendada e estrutura de superficies registradas na Spec 003.
- [x] Definir raio de borda padrao. Evidencia: Raios 8px e 12px registrados como defaults documentais do MVP.
- [x] Definir sombras. Evidencia: Uso discreto e secundario a superficies, bordas e contraste registrado na Spec 003.
- [x] Definir bordas. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Definir padroes de background. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Definir quando usar grid visual. Evidencia: Uso moderado, intencional e nao dominante registrado na Spec 003.
- [x] Definir quando usar glow. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Criar componente Button. Evidencia: componente base consolidado em `components/ui/button.tsx` com variantes `primary`, `secondary`, `ghost`, `outline` e `link`, tamanhos `sm`, `md` e `lg`, foco visivel, disabled e loading preservando nome acessivel.
- [x] Criar componente Card. Evidencia: componente base consolidado em `components/ui/card.tsx` com estrutura `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` e `CardFooter`, variantes `default`, `elevated`, `subtle` e `interactive`, foco visivel em cards interativos e preservacao de semantica para `div`, `a` e `button`.
- [x] Criar componente StatusBadge. Evidencia: componente base consolidado em `components/ui/status-badge.tsx` com variantes `soft` e `outline`, tamanhos `sm` e `md`, status gerais e status de projeto da Spec 004 mapeados com label textual visivel e icone decorativo opcional.
- [x] Criar componente SectionHeader. Evidencia: componente base consolidado em `components/sections/section-header.tsx` com `eyebrow`, `title`, `description`, `as`, `align`, `actions` e `children`, heading semantico configuravel com `h2` como padrao e alinhamentos `left` e `center`.
- [x] Criar componente Hero. Evidencia: `components/sections/hero-section.tsx` consolidado com H1 unico, copy institucional sem prometer projeto validado, CTAs oficiais `Explorar projetos` -> `/projetos` e `Conhecer o NITE` -> `#sobre`, logo animada com motion reduzivel, foco visivel herdado dos botoes e sem reintroduzir grid decorativo.
- [x] Criar componente ProjectCard. Evidencia: componente consolidado em `components/sections/project-card.tsx` usando `Card` base, `StatusBadge` real para status oficiais da ADR-006, fallback honesto sem imagem/evidencia, heading configuravel e estados interativo/nao interativo sem `div` clicavel.
- [x] Criar componente TimelineItem. Evidencia: componente consolidado em `components/sections/timeline-item.tsx` com API estrutural para titulo, descricao, rotulo temporal, categoria, status, href opcional, heading configuravel, fallback sem evidencia e compatibilidade com a timeline existente da Home.
- [x] Criar componente UpdateCard. Evidencia: componente consolidado em `components/sections/update-card.tsx` usando `Card` base, categoria textual, heading configuravel, imagem opcional com alt, fallback honesto sem imagem, data/autor opcionais e sem `div` clicavel.
- [x] Criar componente OpportunityBanner. Evidencia: componente consolidado em `components/sections/opportunity-banner.tsx` usando `Card` base, CTA como link real com estilo do `Button`, status textual visivel para `closed`, `open` e `info`, icone decorativo e heading configuravel.
- [x] Criar componente Header. Evidencia: Header shell consolidado em `components/layout/site-header.tsx` com logo, links principais, CTA primario, superficies/tokens oficiais, MegaMenu desktop compacto e menu mobile em camadas.
- [x] Criar componente MegaMenu. Evidencia: `components/layout/site-header.tsx` implementa painel desktop com superficies dark premium, borda sutil, estados aberto/ativo, foco visivel e transicao discreta respeitando reduced motion.
- [x] Criar componente MobileLayeredMenu/menu mobile em camadas. Evidencia: `components/layout/site-header.tsx` implementa menu mobile em camadas com grupo principal, detalhe por grupo, voltar, fechar, CTA, foco visivel e transicao reduzivel.
- [x] Criar componente Footer institucional. Evidencia: componente consolidado em `components/layout/site-footer.tsx` com `<footer>`, navegacao institucional via links reais para rotas MVP existentes incluindo `/contato`, canais publicos vindos de `siteConfig`, nota honesta de validacao/autorizacao institucional e foco visivel nos links.
- [x] Documentar estados: default, hover, focus, active, disabled e loading. Evidencia: Estados obrigatorios registrados na tabela de contrato de design da Spec 003.
- [x] Definir guidelines de animacao. Evidencia: Guidelines de motion registradas na Spec 003.
- [x] Definir suporte a prefers-reduced-motion. Evidencia: Suporte a motion reduzido registrado como adaptacao adicional na Spec 003.
- [x] Definir e aprovar valores finais de tokens visuais do MVP Premium. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Ajustar `background.default` apos validacao visual. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto para atualizar o token de `#0A0A0F` para `#09090a`, reduzindo a percepcao azulada do fundo dominante e aproximando a base visual de um dark premium neutro/grafite.
- [x] Definir estrategia documental de Light Mode / Theme System. Evidencia: dark mode homologado mantido como baseline principal; light mode registrado como evolucao planejada para ciclo posterior, com toggle manual, opcao Sistema, tokens light propostos, criterios AA e snapshots dedicados antes de implementacao.
- [x] Implementar base runtime do Light Mode sem toggle manual. Evidencia: tokens light adicionados em `app/globals.css` com remapeamento por `@media (prefers-color-scheme: light)`, dark homologado mantido como fallback `#09090a`, light baseline `#F7F3EA` e `app/layout.tsx` ajustado para declarar `color-scheme` `dark light` e `themeColor` por preferencia do sistema.
- [x] Registrar baseline de contraste visual para tokens. Evidencia: Decisao aprovada pelo gestor/desenvolvedor do projeto em conversa de especificacao.
- [x] Validar API minima dos componentes base antes de implementacao ampla. Evidencia: API minima consolidada como contrato de design, sem implementacao de codigo.
- [x] Validar variantes e estados obrigatorios de cada componente. Evidencia: Variantes e estados obrigatorios consolidados como contrato de design.
- [x] Registrar criterios visuais objetivos de MVP Premium. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.

## Planejamento futuro - Light Mode / Theme System

- [x] Implementar infraestrutura de tema sem alterar o dark mode homologado. Evidencia: base runtime adicionada com tokens CSS light, ativacao automatica por `prefers-color-scheme`, dark baseline preservado em `#09090a`, light baseline validado em `#F7F3EA` e ausencia de `ThemeProvider` externo.
- [x] Definir controle manual de tema com opcoes `Escuro`, `Claro` e `Sistema`. Evidencia: `components/ui/theme-toggle.tsx` implementa controle por radios acessiveis, `system`/`light`/`dark` foram validados, `localStorage` persiste a chave `nite-theme`, `app/layout.tsx` aplica bootstrap `beforeInteractive` antes da hidratacao e `components/layout/site-header.tsx` exibe o controle no Header desktop e no menu mobile.
- [x] Aplicar tokens light em CSS apenas apos revisao de contraste. Evidencia: tokens light aplicados em `app/globals.css` com body light validado em `#F7F3EA`, body dark preservado em `#09090a`, Hero H1, CTA primario, Header, MegaMenu, cards, superficies e filtros refinados em ciclos controlados.
- [ ] Auditar e remover dependencias visuais hardcoded de dark mode, como `white/[...]`, sombras escuras e gradientes sobre fundo escuro.
- [x] Validar Header, MegaMenu e menu mobile em dark/light, desktop/mobile e teclado. Evidencia: auditoria final do ciclo confirmou Header, MegaMenu, menu mobile e Theme Toggle em dark/light sem bloqueios; foco visivel preservado; ressalva P2 nao bloqueante mantida para contencao de foco do menu mobile.
- [ ] Validar Button, Card, StatusBadge, ProjectCard, UpdateCard e OpportunityBanner em dark/light.
- [x] Criar snapshots visuais dedicados para dark e light. Evidencia: `tests/visual/home.visual.spec.ts` separado em casos explicitos `home visual baseline - dark` e `home visual baseline - light`, com snapshots nomeados `home-dark-chromium-win32.png` e `home-light-chromium-win32.png`, tema fixado por `colorScheme`, reduced motion e estabilizacao de overlay/fontes/scroll; snapshots `home-dark` e `home-light` passaram apos atualizacao de baseline intencional do Header/Theme Toggle.
- [x] Fechar ciclo Light Mode + Theme Toggle. Status: concluido com ressalvas P2 nao bloqueantes. Evidencia: `prefers-color-scheme` preservado, `system`/`light`/`dark` validados, `localStorage` `nite-theme` validado, bootstrap `beforeInteractive` ativo, ausencia de `ThemeProvider` externo, snapshots `home-dark` e `home-light` passando, e gates `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test -- tests/unit/design-system.test.tsx tests/unit/home-page.test.tsx` e `npx playwright test tests/visual/home.visual.spec.ts --reporter=list` passando. Nao ha bloqueio restante para considerar Light Mode + Theme Toggle concluido na Spec 003.
- [ ] Revisar `themeColor`, manifest e Open Graph em task propria.

### Pendencias P2 nao bloqueantes preservadas

- [ ] P2 nao bloqueante: melhorar texto persistente do estado no botao desktop fechado do Theme Toggle; estado atual fica comunicado principalmente por icone e `aria-label`.
- [x] P2 nao bloqueante: conter o foco dentro do menu mobile enquanto o overlay estiver aberto, evitando que Tab avance para conteudo atras do overlay. Evidencia: `components/layout/site-header.tsx` adiciona contencao de foco no dialog mobile, circula `Tab`/`Shift+Tab`, preserva Escape/Fechar/Voltar e devolve foco ao botao Menu ao fechar; validado por teste unitario e browser mobile.
- [ ] P2 nao bloqueante: configurar `allowedDevOrigins` para `127.0.0.1` no ambiente dev, evitando erro de HMR/WebSocket fora de `localhost`.
