---
name: Portal NITE
description: Portal institucional premium para projetos, oportunidades e atualizacoes do NITE UNIJORGE.
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
  light-background: "#F7F3EA"
  light-section: "#EFE8DC"
  light-surface: "#FFFBF5EB"
  light-text-primary: "#111827"
  light-text-secondary: "#334155"
  light-text-muted: "#5B6472"
  light-brand-primary: "#1D4ED8"
  light-brand-accent: "#0369A1"
typography:
  display:
    fontFamily: "Sora, Bahnschrift, Segoe UI, sans-serif"
    fontSize: "clamp(2.35rem, 5vw, 4.5rem)"
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
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
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
    rounded: "{rounded.lg}"
    padding: "10px 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text-secondary}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
    height: "44px"
  card-default:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.md}"
    padding: "16px"
  input-default:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "40px"
---

# Design System: Portal NITE

## 1. Overview

**Creative North Star: "Circuito Institucional Metalico"**

O sistema visual do Portal NITE trata o nucleo como uma infraestrutura viva de tecnologia aplicada dentro da UNIJORGE. A superficie principal e dark, tecnica e contida; a energia vem da logo, do azul eletrico pontual, de motion funcional e de camadas discretas, nao de decoracao espalhada.

O design precisa parecer institucional e tecnologico ao mesmo tempo. Cards, botoes, badges, campos, header e footer compartilham bordas sutis, raio contido, contraste alto e foco visivel. A interface aceita momentos cinematograficos, mas cada momento precisa sustentar clareza, performance e conteudo real.

O sistema rejeita dados inventados, promessa operacional, rotas futuras que parecam prontas, neon permanente, glow dominante, grid decorativo excessivo e landing page generica de SaaS.

**Key Characteristics:**
- Dark-first com light mode derivado, nao paralelo.
- Azul eletrico como acento raro e funcional.
- Superficies tecnicas transparentes com borda sutil.
- Tipografia Sora para voz institucional e Geist para leitura.
- Motion curto, acessivel e subordinado a navegacao.

## 2. Colors

A paleta e escura, fria e metalica, com azul eletrico reservado para acao, leitura e identidade.

### Primary

- **Azul Eletrico NITE** (`#2563EB` dark, `#1D4ED8` light): identidade, acentos principais e estados de destaque. Use com parcimonia; o azul deve chamar atencao porque aparece pouco.
- **Ciano de Sinal** (`#38BDF8` dark, `#0369A1` light): microdestaques, icones, labels tecnicas e glows pontuais.

### Neutral

- **Preto Nucleo** (`#09090A`): fundo global dark e base da presenca premium.
- **Secao Tecnica** (`#0D111C`): bloco extenso quando a pagina precisa de separacao sem linha pesada.
- **Vidro Metalico** (`#18191CE0`): superficies de menu, campos e paineis.
- **Texto Principal** (`#F0F0F0` dark, `#111827` light): leitura primaria.
- **Texto Secundario** (`#A1A4A5` dark, `#334155` light): descricao, metadados e apoio.
- **Borda Sutil** (`#B0C7D925`): contorno tecnico de cards e controles.

### Named Rules

**The Rare Blue Rule.** O azul e um sinal, nao uma atmosfera. Se uma dobra inteira fica azulada, a composicao perdeu hierarquia.

**The Honest Surface Rule.** Superficies podem ser transparentes, mas texto e foco precisam manter contraste AA em uso real.

## 3. Typography

**Display Font:** Sora, com Bahnschrift e Segoe UI como fallback.
**Body Font:** Geist, com Bahnschrift e Segoe UI como fallback.
**Label/Mono Font:** Geist Mono, com Cascadia Mono e Consolas como fallback.

**Character:** Sora da peso institucional aos titulos sem cair em editorial serifado. Geist mantem leitura limpa, tecnica e neutra para conteudo de projeto, navegacao, formularios e estados.

### Hierarchy

- **Display** (600, `clamp(2.35rem, 5vw, 4.5rem)`, `1.04`): hero, CTA final e momentos de marca. Usar `text-wrap: balance` quando houver quebra longa.
- **Headline** (600, `clamp(2rem, 4vw, 3rem)`, `1.1`): secoes principais e paginas internas.
- **Title** (600, `1.25rem`, `1.25`): cards, grupos de menu e blocos de conteudo.
- **Body** (400, `1rem`, `1.75`): paragrafos, descricoes e conteudo institucional. Manter linhas em torno de 65-75ch.
- **Label** (500, `0.75rem`, `0.14em`, uppercase curto): chips, stack, metadados e pequenos sinais de sistema.

### Named Rules

**The No Editorial Costume Rule.** NITE e tecnico-institucional, nao revista. Nao trocar a voz por serifas editoriais, italicos ornamentais ou grids de magazine sem uma spec explicita.

## 4. Elevation

O sistema usa profundidade hibrida: superficies, bordas e contraste fazem a maior parte do trabalho; sombras aparecem como apoio em paineis, hover e composicoes especiais. O default e contido, sem ghost-card decorativo.

### Shadow Vocabulary

- **Lift Sutil** (`0 24px 70px rgb(0 0 0 / 0.42)` dark, `0 18px 48px rgb(15 23 42 / 0.14)` light): paineis e superficies que precisam se destacar do fundo.
- **Acao Glass** (`0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): botoes e CTAs em repouso.
- **Acao Hover** (`0 18px 48px rgb(255 255 255 / 0.12)` dark): resposta pontual de CTA, nunca sombra padrao de todos os cards.

### Named Rules

**The Border-First Rule.** Cards e controles primeiro usam borda, superficie e contraste. Sombra forte precisa justificar estado, camada ou cena.

## 5. Components

### Buttons

- **Shape:** cantos contidos, normalmente `8px`; CTAs especiais podem ir a `16px`, mas nao viram pilulas gigantes por padrao.
- **Primary:** `nite-glass-action`, superficie translucida, borda glass, texto claro e hover que inverte contraste.
- **Hover / Focus:** transicoes curtas, foco por ring consistente e `active:translate-y-px` para feedback minimo.
- **Secondary / Ghost / Link:** preservam hierarquia. Secundarios usam superficie; ghosts usam fundo transparente; links usam azul apenas quando a acao pede sinal forte.

### Chips

- **Style:** caps mono curto, raio full, borda fina e fundo tonal. Chips comunicam area, stack ou status curto; nao carregam paragrafo.
- **State:** quando status importa, texto visivel acompanha qualquer cor.

### Cards / Containers

- **Corner Style:** `12px` como padrao.
- **Background:** transparente ou `--nite-surface`, nunca card branco generico no dark.
- **Shadow Strategy:** sem sombra por default; hover pode usar superficie/borda antes de lift.
- **Border:** `--nite-border-subtle` em repouso e `--nite-border-hover` em interacao.
- **Internal Padding:** `16px` nos primitives; secoes compostas podem respirar mais por contexto.

### Inputs / Fields

- **Style:** `nite-form-field`, altura `40px`, `12px` de raio, superficie tokenizada e borda soft.
- **Focus:** troca de borda, superficie focus e ring por `--nite-focus`.
- **Error / Disabled:** erro por texto e estado sem depender apenas de vermelho; disabled reduz opacidade e interacao.

### Navigation

O header usa marca a esquerda, grupos expansivos com botoes reais no desktop, links reais dentro do MegaMenu e menu mobile em camadas. O MegaMenu e compacto, integrado ao fundo e acessivel por teclado; nao e full-width. No mobile, a primeira camada mostra grupos, a segunda mostra links do grupo com voltar e fechar.

### Signature Component

A logo animada NITE e o principal ativo de marca. Ela pode protagonizar a primeira dobra e cenas finais, mas o efeito 3D/eletrico nao deve ser repetido como decoracao em todo componente.

## 6. Do's and Don'ts

### Do:

- **Do** usar `--nite-*` como contrato canonico para cor, superficie, foco, status e sombra.
- **Do** preservar dark-first e light mode derivado com contraste real.
- **Do** usar azul eletrico para acao, leitura e identidade pontual.
- **Do** manter status, oportunidades, projetos e evidencias honestos, com texto claro quando algo esta pendente.
- **Do** validar teclado, foco, contraste, responsividade e `prefers-reduced-motion` antes de chamar uma entrega de pronta.
- **Do** deixar a logo ser protagonista em cenas de marca, mantendo o restante do sistema mais contido.

### Don't:

- **Don't** inventar dados institucionais, metricas, depoimentos, datas, responsaveis, equipes, fotos, resultados, vagas ou evidencias.
- **Don't** apresentar placeholders, rotas futuras, formularios futuros ou oportunidades futuras como funcionalidades prontas.
- **Don't** usar neon permanente, glow dominante, grid decorativo excessivo ou gradientes competindo com conteudo.
- **Don't** transformar o portal em landing page generica de SaaS com cards iguais, hero-metric template ou copy inflada.
- **Don't** copiar layout, assets, textos, imagens ou identidade de referencias externas.
- **Don't** depender apenas de cor, icone ou animacao para comunicar estado.
