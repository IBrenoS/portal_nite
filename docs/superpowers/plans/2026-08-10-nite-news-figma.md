# Nite News Figma Prototype Implementation Plan

> **Status:** superado pela direção Radar de Sinais NITE aprovada em 2026-08-10. Este plano preserva o registro da proposta estática, mas não deve ser executado como especificação atual.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar e validar no Figma um protótipo navegável desktop e mobile do Nite News, com home editorial clara, fotográfica e matéria dedicada.

**Architecture:** O arquivo será construído em fases: descoberta, foundations tokenizadas, documentação, componentes locais, composição das quatro telas e prototipagem. As telas usarão instâncias dos componentes e variáveis locais vinculadas aos tokens `--nite-*`; não haverá motion autônomo ou canvas decorativo.

**Tech Stack:** Figma Design, Figma Plugin API via `use_figma`, variables e styles locais, Auto Layout, components/variants e prototyping reactions.

## Global Constraints

- Usar Sora em títulos, Geist em corpo e Geist Mono em labels e metadados; verificar os nomes disponíveis no Figma antes de criar texto.
- Usar o modo claro do design system, cartões brancos, bordas sutis e azul pontual.
- Não inserir banner, badge ou aviso de conteúdo demonstrativo dentro das telas.
- Registrar o caráter demonstrativo somente em notas externas e nomes de páginas/frames.
- Não inventar pessoas, autores, métricas, vagas, eventos confirmados, datas institucionais ou resultados.
- Criar home e matéria em 1440 px e 390 px.
- O fluxo navegável obrigatório é `Home Nite News → matéria → voltar para Nite News` em desktop e mobile.
- Não criar canvas, animação decorativa ou reprodução automática.
- Preservar WCAG AA, áreas de toque de 44 px e foco visível.
- Reutilizar bibliotecas compatíveis quando existirem; reconstruir localmente quando o contrato visual ou de propriedades for incompatível.

---

### Task 1: Criar o arquivo e concluir a descoberta

**Figma objects:**

- Create: arquivo `Portal NITE — Nite News Prototype`
- Inspect: pages, components, variables, text styles, effect styles e libraries
- Create: ledger local `D:\portal_nite\.codex\nite-news-figma-state.json`

**Interfaces:**

- Consumes: tokens e componentes documentados em `docs/design-system.md` e `apps/web/src/app/globals.css`
- Produces: `fileKey`, `fileUrl`, inventário do arquivo, mapa de bibliotecas e gap analysis

- [ ] **Step 1:** Consultar `whoami`; usar automaticamente o único `planKey` ou pausar se houver mais de um.
- [ ] **Step 2:** Criar o arquivo Design no drafts do plano selecionado.
- [ ] **Step 3:** Inspecionar o arquivo vazio com `use_figma` read-only e `get_libraries`.
- [ ] **Step 4:** Confirmar que não existem Code Connect files para `Card`, `SectionHeader`, `SiteHeader` e `SiteFooter` com `rg --files apps/web | rg '\\.figma\\.(ts|tsx|js)$'`.
- [ ] **Step 5:** Pesquisar bibliotecas por `card`, `chip`, `header`, `navigation`, `background`, `text`, `spacing` e `radius` após registrar que a inspeção de telas existentes é N/A para arquivo vazio.
- [ ] **Step 6:** Registrar o gap analysis e o escopo v1: Foundations, Editorial Card, Category Chip, Metadata Row, Section Heading, Back Link e Related Story.

### Task 2: Criar foundations tokenizadas

**Figma objects:**

- Create: collections `NITE Color` (modes Dark/Light) e `NITE Scale` (mode Value)
- Create: paint, text e effect styles locais

**Interfaces:**

- Consumes: `fileKey` e mapa de gaps da Task 1
- Produces: IDs de collections, variables e styles usados por todos os componentes e telas

- [ ] **Step 1:** Verificar Sora, Geist e Geist Mono com `listAvailableFontsAsync`; resolver apenas fallbacks declarados no design system se alguma família não existir.
- [ ] **Step 2:** Criar semantic colors com escopos explícitos: `color/bg`, `color/section`, `color/surface`, `color/surface-subtle`, `color/text/primary`, `color/text/secondary`, `color/text/muted`, `color/border/subtle`, `color/border/hover`, `color/brand/primary`, `color/brand/accent`, `color/focus`.
- [ ] **Step 3:** Criar scales com escopos explícitos: `spacing/8`, `spacing/12`, `spacing/16`, `spacing/24`, `spacing/32`, `spacing/40`, `spacing/64`, `radius/4`, `radius/8`, `radius/12`, `radius/16`, `radius/24`, `radius/full`.
- [ ] **Step 4:** Definir WEB code syntax usando `var(--nite-*)` para colors e os valores documentados para scale variables.
- [ ] **Step 5:** Criar text styles `Display`, `Headline`, `Title`, `Body`, `Body Small`, `Label` e `Metadata` com as famílias verificadas.
- [ ] **Step 6:** Criar effect styles `Lift/Subtle` e `Focus/Ring` usando os valores dark e light documentados.
- [ ] **Step 7:** Validar collections, modes, scopes, code syntax, styles e fontes; registrar resumo numérico.

### Task 3: Criar estrutura e documentação do arquivo

**Figma objects:**

- Create pages: `00 Cover`, `01 Foundations`, `02 Components`, `03 Desktop`, `04 Mobile`, `05 Prototype Notes`

**Interfaces:**

- Consumes: foundation IDs da Task 2
- Produces: pages e documentação visual para componentes e telas

- [ ] **Step 1:** Criar as páginas na ordem definida, com nomes determinísticos.
- [ ] **Step 2:** Montar `00 Cover` com título, descrição, status “Prototype”, escopo desktop/mobile e link textual para a spec local.
- [ ] **Step 3:** Montar `01 Foundations` com swatches dark/light, type specimens, spacing bars e radius samples vinculados às variables.
- [ ] **Step 4:** Montar `05 Prototype Notes` com a nota externa de conteúdo demonstrativo, limitações do protótipo e mapa de navegação.
- [ ] **Step 5:** Validar estrutura com metadata e screenshots de Cover, Foundations e Prototype Notes.

### Task 4: Criar os componentes editoriais

**Figma objects:**

- Create component sets: `Editorial Card`, `Category Chip`, `Metadata Row`, `Section Heading`, `Back Link`, `Related Story`

**Interfaces:**

- Consumes: variables e styles da Task 2; page `02 Components`
- Produces: component/component-set IDs para composição das telas

- [ ] **Step 1:** Criar `Category Chip` com variantes `State=Default|Active` e propriedade TEXT `Label`.
- [ ] **Step 2:** Criar `Metadata Row` com propriedades TEXT `Category`, `Date`, `Read time` e layout responsivo.
- [ ] **Step 3:** Criar `Section Heading` com TEXT `Eyebrow`, `Title`, `Action` e BOOLEAN `Show action`.
- [ ] **Step 4:** Criar `Back Link` com TEXT `Label`, área mínima de 44 px e estados Default/Focus.
- [ ] **Step 5:** Criar `Editorial Card` com variantes `Layout=Feature|Grid|List`, `State=Default|Focus`, propriedades TEXT e slot de imagem.
- [ ] **Step 6:** Criar `Related Story` com imagem, categoria, título e metadados.
- [ ] **Step 7:** Validar cada família individualmente com metadata e screenshot antes de seguir.

### Task 5: Compor as telas desktop

**Figma objects:**

- Create frames: `Desktop / Nite News`, `Desktop / Article`

**Interfaces:**

- Consumes: component IDs da Task 4
- Produces: telas desktop completas em 1440 px

- [ ] **Step 1:** Criar wrappers verticais de 1440 px com header, main e footer.
- [ ] **Step 2:** Compor o hero e a matéria principal em grid editorial 7/5.
- [ ] **Step 3:** Compor `Últimas notícias` em quatro colunas e blocos temáticos com densidades alternadas.
- [ ] **Step 4:** Compor a matéria com retorno, metadata, capa, coluna de leitura de 720 px, contexto e relacionadas.
- [ ] **Step 5:** Usar apenas texto neutro e referências públicas, sem autores, eventos confirmados ou datas factuais inventadas.
- [ ] **Step 6:** Validar hero, destaque, grade, blocos, corpo e relacionadas por screenshots individuais e tela completa.

### Task 6: Compor as telas mobile

**Figma objects:**

- Create frames: `Mobile / Nite News`, `Mobile / Article`

**Interfaces:**

- Consumes: component IDs da Task 4 e hierarquia desktop da Task 5
- Produces: telas mobile completas em 390 px

- [ ] **Step 1:** Criar wrappers de 390 px com padding lateral de 20 px e áreas acionáveis mínimas de 44 px.
- [ ] **Step 2:** Converter o hero, destaque e cards para fluxo de uma coluna, preservando a prioridade editorial.
- [ ] **Step 3:** Criar faixa horizontal de categorias sem depender de hover.
- [ ] **Step 4:** Compor a matéria com capa, leitura, contexto e relacionadas empilhadas.
- [ ] **Step 5:** Validar cada seção e as telas completas em screenshots legíveis.

### Task 7: Configurar navegação

**Figma objects:**

- Mutate: `Desktop / Nite News`, `Desktop / Article`, `Mobile / Nite News`, `Mobile / Article`

**Interfaces:**

- Consumes: quatro telas completas e destinos do fluxo editorial
- Produces: protótipo navegável sem motion autônomo

- [ ] **Step 1:** Remover manual keyframes, animation styles, componentes e instâncias do canvas.
- [ ] **Step 2:** Ligar matéria principal desktop à matéria desktop e `Back Link` à home desktop.
- [ ] **Step 3:** Repetir o fluxo no mobile.
- [ ] **Step 4:** Validar screenshots e reactions; confirmar ausência de motion autônomo.

### Task 8: Executar QA final e entregar

**Figma objects:**

- Inspect all created pages, variables, styles, components e screens

**Interfaces:**

- Consumes: arquivo completo
- Produces: URL final, inventário e relatório de validação

- [ ] **Step 1:** Auditar nomes, duplicatas, placeholders, bindings, font families e node hierarchy.
- [ ] **Step 2:** Auditar contraste, foco, toque mínimo e ausência de animação decorativa.
- [ ] **Step 3:** Capturar screenshots finais das quatro telas e comparar hierarquia desktop/mobile.
- [ ] **Step 4:** Verificar o fluxo Home → Article → Home nos dois breakpoints.
- [ ] **Step 5:** Salvar versão de histórico `Nite News prototype v1` e entregar a URL do arquivo com riscos reais remanescentes.
