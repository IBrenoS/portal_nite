---
name: Portal NITE
description: Portal institucional do NITE UNIJORGE para projetos, oportunidades, pessoas e registros públicos.
colors:
  dark-background: "#09090A"
  dark-section: "#0D111C"
  dark-surface: "#18191CE0"
  dark-surface-focus: "#18191CF5"
  dark-text-primary: "#F0F0F0"
  dark-text-secondary: "#A1A4A5"
  dark-text-muted: "#878D8F"
  dark-border-subtle: "#B0C7D925"
  dark-brand-primary: "#2563EB"
  dark-brand-accent: "#38BDF8"
  light-background: "#F4F7FA"
  light-section: "#E8EEF5"
  light-surface: "#FFFFFFEB"
  light-text-primary: "#0B1220"
  light-text-secondary: "#334155"
  light-text-muted: "#5C6878"
  light-brand-primary: "#1D4ED8"
  light-brand-accent: "#0369A1"
typography:
  display:
    fontFamily: "Sora, Bahnschrift, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "0"
  headline:
    fontFamily: "Sora, Bahnschrift, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0"
  title:
    fontFamily: "Sora, Bahnschrift, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "Geist, Bahnschrift, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Geist Mono, Cascadia Mono, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  3xl: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  section-mobile: "40px"
  section-desktop: "64px"
components:
  button-primary:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.xl}"
    padding: "10px 20px"
    height: "44px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text-secondary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  card-default:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input-default:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 12px"
    height: "40px"
  status-badge:
    backgroundColor: "{colors.dark-section}"
    textColor: "{colors.dark-text-secondary}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    height: "28px"
---

# Design System: Portal NITE

## 1. Overview

**Creative North Star: "Circuito Institucional Metalico"**

O sistema visual do Portal NITE trata o núcleo como uma infraestrutura viva de tecnologia aplicada dentro da UNIJORGE. A superfície principal é dark, técnica e contida; a energia vem da logo, do azul elétrico pontual, de imagens reais autorizadas, de movimento funcional e de camadas discretas.

O design parece institucional e tecnológico ao mesmo tempo. Cards, botões, badges, campos, header e footer compartilham bordas sutis, raio contido, contraste alto e foco visível. Cenas de marca podem ser cinematográficas ou fotográficas, mas cada uma sustenta clareza, performance, conteúdo real e movimento reduzido.

O sistema rejeita dados inventados, promessa operacional, rotas futuras que pareçam prontas, neon permanente, glow dominante, texto em gradiente, grid decorativo genérico e landing page genérica de SaaS.

**Key Characteristics:**

- Dark-first com light mode derivado, não paralelo.
- Azul elétrico como acento raro e funcional.
- Cenas específicas podem usar imagem ou uma cor local sem alterar os tokens globais.
- Superfícies técnicas transparentes com borda sutil.
- Tipografia Sora para voz institucional e Geist para leitura.
- Movimento acessível e subordinado à navegação.

## 2. Colors

A paleta é escura, fria e metálica, com azul elétrico reservado para ação, leitura e identidade.

### Primary

- **Azul Elétrico NITE** (`#2563EB` dark, `#1D4ED8` light): identidade, acentos principais e estados de destaque. O azul chama atenção porque aparece pouco.
- **Ciano de Sinal** (`#38BDF8` dark, `#0369A1` light): microdestaques, ícones, labels técnicas e glows pontuais.

### Neutral

- **Preto Núcleo** (`#09090A`): fundo global dark e base da presença institucional.
- **Seção Técnica** (`#0D111C`): bloco extenso quando a página precisa de separação sem linha pesada.
- **Vidro Metálico** (`#18191CE0`): superfícies de menu, campos e painéis.
- **Claro Metálico** (`#F4F7FA`): base light fria e técnica, derivada do dark-first sem virar papel creme.
- **Seção Clara Técnica** (`#E8EEF5`): separação light em azul-cinza suave.
- **Texto Principal** (`#F0F0F0` dark, `#0B1220` light): leitura primária.
- **Texto Secundário** (`#A1A4A5` dark, `#334155` light): descrição, metadados e apoio.
- **Borda Sutil** (`#B0C7D925`): contorno técnico de cards e controles.

### Named Rules

**The Rare Blue Rule.** O azul é um sinal, não uma atmosfera. Se uma dobra inteira fica azulada, a composição perdeu hierarquia.

**The Scoped Scene Rule.** Cores de cena, como o teal `#2DCFBF` do hero de projetos, ficam restritas àquela composição e nunca substituem os tokens globais.

**The Honest Surface Rule.** Superfícies podem ser transparentes, mas texto, placeholder e foco mantêm contraste AA em uso real.

## 3. Typography

**Display Font:** Sora, com Bahnschrift e Segoe UI como fallback.
**Body Font:** Geist, com Bahnschrift e Segoe UI como fallback.
**Label/Mono Font:** Geist Mono, com Cascadia Mono e Consolas como fallback.

**Character:** Sora dá peso institucional aos títulos sem cair em editorial serifado. Geist mantém leitura limpa, técnica e neutra para conteúdo, navegação, formulários e estados.

### Hierarchy

- **Display** (600–700, `clamp(2.75rem, 7vw, 6rem)`, `1.00–1.10`): hero, CTA final e momentos de marca. O teto de `6rem` é absoluto.
- **Headline** (600, `clamp(2rem, 4vw, 3rem)`, `1.1`): seções principais e páginas internas.
- **Title** (500–600, `1.25rem`, `1.25`): cards, grupos de menu e blocos de conteúdo.
- **Body** (400, `1rem`, `1.75`): parágrafos, descrições e conteúdo institucional, com linhas em torno de 65–75ch.
- **Label** (500, `0.75rem`, `0.14em`, uppercase curto): chips, stack, metadados e pequenos sinais de sistema.

### Named Rules

**The Solid Type Rule.** Títulos são sólidos. Texto em gradiente, outline decorativo ou tracking abaixo de `-0.04em` é proibido.

**The No Editorial Costume Rule.** NITE é técnico-institucional, não revista. Não trocar a voz por serifas editoriais, itálicos ornamentais ou grids de magazine sem direção aprovada.

## 4. Elevation

O sistema usa profundidade híbrida: superfícies, bordas e contraste fazem a maior parte do trabalho; sombras aparecem em painéis flutuantes, hover e composições especiais. O padrão é contido, sem ghost-card decorativo.

### Shadow Vocabulary

- **Lift Sutil** (`0 24px 70px rgb(0 0 0 / 0.42)` dark, `0 18px 48px rgb(15 23 42 / 0.14)` light): painéis e superfícies que precisam se destacar do fundo.
- **Ação Glass** (`0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): botões e CTAs em repouso.
- **Ação Hover** (`0 18px 48px rgb(255 255 255 / 0.12)` dark): resposta pontual de CTA, nunca sombra padrão de todos os cards.

### Named Rules

**The Border-First Rule.** Cards e controles usam primeiro borda, superfície e contraste. Sombra forte precisa justificar estado, camada ou cena.

## 5. Components

### Buttons

- **Shape:** `8px` por padrão; CTAs spotlight usam `16px`. Pill fica restrito a chips e badges.
- **Primary / Spotlight:** superfície glass, borda de `2px`, texto claro e hover que inverte contraste.
- **Quiet / Outline / Secondary / Ghost:** preservam hierarquia por borda, superfície e cor; não adicionam sombra decorativa.
- **Invisible / Link:** ações textuais sem caixa, usadas quando a estrutura já fornece contexto.
- **Hover / Focus / Disabled:** transições curtas, ring consistente, deslocamento ativo de `1px` e estado desabilitado explícito.

### Chips

- **Style:** mono curto em caps, raio pill, borda fina e fundo tonal. Chips comunicam área, stack ou categoria curta.
- **State:** badges de status usam texto visível e indicador opcional; a cor nunca é a única informação.

### Cards / Containers

- **Corner Style:** `12px` no primitive; composições de descoberta podem chegar a `24px` quando a cena justifica.
- **Background:** transparente ou `--nite-surface`, nunca card branco genérico no dark.
- **Shadow Strategy:** sem sombra por padrão; hover usa superfície e borda antes de lift.
- **Border:** `--nite-border-subtle` em repouso e `--nite-border-hover` em interação.
- **Internal Padding:** `16px` no primitive; seções compostas respiram conforme a densidade do conteúdo.
- **Structure:** cards aninhados são proibidos; divisões internas usam spacing ou separadores.

### Navigation Goal: Projetos relacionados

A secao `Projetos relacionados` existe para incentivar a continuidade da
navegacao depois que o usuario conclui a leitura de um projeto. Ela nao
reapresenta o catalogo nem resume novamente cada iniciativa.

Seus cards funcionam como convites para descobrir outro projeto e devem permitir
uma decisao rapida, usando somente o contexto necessario para a escolha. A secao
nao compete em peso visual ou densidade de informacao com o conteudo principal
da pagina individual.

### NITE Discovery Frame

O `NITE Discovery Frame` identifica cards de descoberta compacta, como a
variante de projetos relacionados. Ele pertence a mesma familia visual do
Explorer e diferencia contexto por densidade, nunca por uma linguagem paralela.

- **Background:** `--nite-background`.
- **Radius:** `24px`.
- **Border:** `color(display-p3 0.882 0.949 0.996 / 0.183)`, sem borda inferior.
- **Top Signal:** linha unica de `150px` por `1px`, sem blur, com centro em
  `rgba(143, 143, 143, 0.67)`.
- **Border Veil:** gradiente vertical de transparente em `0%` para
  `--nite-background` em `50%` e `100%`, fazendo a borda desaparecer na base.
- **Motion:** zoom discreto somente na capa e realce de CTA/foco; sem lift,
  sombra pesada ou informacao dependente de hover.
- **Accessibility:** foco visivel, conteudo completo sem hover e transicoes
  desativadas quando `prefers-reduced-motion` estiver ativo.

### Inputs / Fields

- **Style:** altura `40px`, raio `12px`, superfície tokenizada e borda soft.
- **Focus:** troca de borda e superfície, com ring por `--nite-focus`.
- **Placeholder:** mantém contraste legível; não usa cinza decorativamente apagado.
- **Error / Disabled:** erro por texto e estado sem depender apenas de vermelho; disabled reduz opacidade e interação.

### Navigation

O header usa marca à esquerda, grupos expansíveis com botões reais no desktop, links reais no MegaMenu e menu mobile em camadas. O MegaMenu é compacto, integrado ao fundo e acessível por teclado; no mobile, funciona como diálogo com trap de foco, voltar e fechar. Itens planejados aparecem como indisponíveis, sem navegação falsa.

### Signature Component

A logo animada NITE é o principal ativo de marca. Ela pode protagonizar a primeira dobra e cenas finais, mas o efeito 3D/elétrico não se repete como decoração. Timeline fotográfica e hero técnico de projetos são cenas específicas, não primitives reutilizáveis.

## 6. Do's and Don'ts

### Do:

- **Do** usar `--nite-*` como contrato canônico para cor, superfície, foco, status e sombra.
- **Do** preservar dark-first e light mode derivado com contraste real.
- **Do** usar azul elétrico para ação, leitura e identidade pontual.
- **Do** restringir cores, grids e imagens de cena ao contexto aprovado, sem promovê-los a token global.
- **Do** manter status, oportunidades, projetos, pessoas e evidências honestos, com texto claro quando algo está pendente.
- **Do** validar teclado, foco, contraste, responsividade e `prefers-reduced-motion` antes de chamar uma entrega de pronta.
- **Do** usar imagens locais autorizadas com texto alternativo significativo.

### Don't:

- **Don't** inventar dados institucionais, métricas, depoimentos, datas, responsáveis, equipes, fotos, resultados, vagas ou evidências.
- **Don't** publicar nomes, imagens, perfis ou vínculos sem autorização explícita.
- **Don't** apresentar placeholders, rotas futuras, formulários futuros ou oportunidades futuras como funcionalidades prontas.
- **Don't** usar neon permanente, glow dominante, texto em gradiente ou grid decorativo genérico; grids só pertencem a cenas técnicas com função definida.
- **Don't** transformar o portal em landing page genérica de SaaS com cards iguais, hero-metric template ou copy inflada.
- **Don't** copiar layout, ativos, textos, imagens ou identidade de referências externas.
- **Don't** depender apenas de cor, ícone ou animação para comunicar estado.
