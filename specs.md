# specs.md — Portal NITE v2

> Documento de especificação para orientar agentes LLM, desenvolvedores, designers e gestores na evolução do Portal NITE.
>
> Este arquivo deve ser tratado como contrato de escopo, direção de produto, implementação, validação e avanço por milestones. Nenhum agente deve fugir do objetivo aqui definido sem registrar decisão e justificativa.

---

## 0. Identidade do projeto

### Nome do produto

**Portal NITE**

### Nome oficial da marca/núcleo

**NITE**

### Expansão institucional

**Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge**

### URL atual do deploy

https://portal-nite.vercel.app/

### Instituição vinculada

**UniJorge**

A UniJorge possui seu próprio site institucional. O Portal NITE não deve tentar replicar a estrutura, linguagem ou estética do site institucional da universidade. O NITE deve carregar legitimidade institucional, mas com identidade própria, mais tecnológica, experimental e conectada à prática.

### Idioma principal

**Português brasileiro (pt-BR)**

---

## 1. Como usar este documento

Este `specs.md` foi criado para que agentes LLM e humanos consigam implementar a evolução do Portal NITE sem perder o escopo, sem inventar fatos institucionais e sem transformar a landing page em um portal complexo antes da hora.

### Regras obrigatórias para agentes

1. Nenhum agente deve iniciar uma milestone seguinte sem concluir:
   - tarefas obrigatórias da milestone atual;
   - testes definidos na milestone atual;
   - gate de saída da milestone atual.
2. Nenhum agente deve inventar:
   - datas históricas;
   - números de projetos;
   - nomes de projetos reais;
   - resultados;
   - parceiros;
   - integrantes;
   - fatos institucionais não validados.
3. Informações ainda não disponíveis devem ser tratadas como **placeholders substituíveis**, nunca como fatos oficiais.
4. O objetivo é construir uma landing page praticamente finalizada em estrutura, UX, visual, motion, SEO e copy-base, deixando apenas lacunas de conteúdo real para substituição futura.
5. O projeto não deve depender do inventário final dos outros gestores para avançar no design e na implementação.
6. Todo placeholder deve ser rastreável.
7. Todo milestone deve terminar com checklist, testes e gate de validação.
8. O site deve parecer premium, tecnológico e institucional, mas não deve parecer genérico, exageradamente futurista, gamer ou robótico.

### Legenda de checkboxes

- `[ ]` pendente
- `[x]` concluído
- `BLOCKED:` bloqueado, com motivo explícito
- `TODO(nite-content):` conteúdo real pendente
- `TODO(nite-asset):` imagem, mockup, print ou evidência real pendente
- `TODO(nite-approval):` validação institucional pendente
- `NOTE:` observação relevante para próximo agente

---

## 2. Contexto do produto

O Portal NITE é uma landing page informativa para apresentar o NITE, Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge.

O NITE não é o site institucional da UniJorge. A proposta do NITE é apresentar um núcleo com identidade própria, voltado à prática, desenvolvimento, inovação, tecnologias, experimentação, projetos e cultura técnica dentro da universidade.

A landing page atual já possui uma identidade visual escura, tecnológica e baseada no ícone do NITE, mas ainda apresenta sinais de uma versão estática, com copy genérica e imagens conceituais que podem parecer futuristas demais ou pouco conectadas à realidade do núcleo.

A nova versão deve reposicionar o Portal NITE como uma presença digital mais madura, com estética de produto premium, motion discreto, estrutura escalável e narrativa menos genérica.

---

## 3. Problema

A versão atual do Portal NITE comunica a existência do núcleo, mas ainda não entrega plenamente a experiência desejada.

### Problemas principais

- A landing ainda se comporta como um site estático informativo, não como uma experiência digital premium.
- Parte da copy soa genérica, com frases amplas como “tecnologia aplicada”, “inovação”, “aprendizagem prática” e “novas experiências” sem contexto concreto suficiente.
- As imagens atuais são visualmente fortes, mas podem parecer futuristas, robóticas ou genéricas demais.
- A seção de projetos pode parecer uma lista de frentes temáticas, não necessariamente projetos reais consolidados.
- A timeline depende de dados históricos que ainda precisam ser coletados com outros gestores.
- Fotos, prints, protótipos, evidências e resultados reais ainda não estão disponíveis em inventário completo.
- A logo do NITE ainda não está sendo usada como assinatura visual/motion central da experiência.
- O site ainda não alcança o nível de controle visual, microinteração e acabamento observado nas referências globais citadas.

---

## 4. Dor

O gestor responsável precisa evoluir a landing page sem ficar bloqueado pela ausência imediata de materiais reais dos demais gestores.

### Dores práticas

- Não é viável esperar todos os gestores enviarem fotos, projetos, datas, resultados e evidências para só então melhorar o site.
- O projeto precisa avançar agora em estrutura, design, motion, copy, SEO e arquitetura.
- O conteúdo real deve ser plugável no futuro, sem exigir reconstrução do site.
- A landing precisa estar quase finalizada antes do inventário completo de projetos, para que futuramente as lacunas sejam apenas substituições de conteúdo.
- A experiência visual precisa ser forte o suficiente para representar o NITE como núcleo tecnológico, mas ainda segura o suficiente para conviver com a instituição UniJorge.

---

## 5. Solução / objetivo central

Construir uma nova versão do Portal NITE como uma **landing institucional com comportamento de produto digital premium**.

### Objetivo central

Criar uma landing page moderna, responsiva, escalável, institucionalmente segura e visualmente premium para o NITE, com copy mais humana, motion discreto, animação própria da marca, placeholders substituíveis e estrutura pronta para receber projetos, fotos, prints, protótipos, timeline e evidências reais posteriormente.

### Estratégia principal

A implementação deve separar o projeto em três camadas:

#### Camada 1 — Definitiva

Deve ser construída e finalizada agora:

- arquitetura da home;
- componentes;
- design system;
- tokens visuais;
- responsividade;
- motion system;
- animação da logo;
- estrutura de SEO;
- estrutura de rotas;
- templates de seções;
- templates de páginas internas;
- estratégia de placeholders.

#### Camada 2 — Editorial semi-definitiva

Pode ser consolidada agora com boa qualidade:

- nome oficial;
- expansão institucional;
- descrição institucional;
- proposta de valor;
- headlines;
- subtítulos;
- CTAs;
- microcopy;
- tom de voz;
- textos de seção sem dependência de dados históricos específicos.

#### Camada 3 — Factual substituível

Pode usar placeholders agora e ser substituída depois:

- fotos reais;
- mockups reais;
- prints de projetos;
- protótipos;
- datas históricas;
- nomes reais de projetos;
- resultados;
- indicadores;
- parceiros;
- equipe;
- evidências institucionais.

---

## 6. Princípios de produto

### 6.1 Identidade própria, vínculo institucional

O Portal NITE deve ter identidade visual e experiência próprias. A UniJorge deve aparecer como vínculo institucional, não como referência estética principal.

### 6.2 Premium, mas não exagerado

A experiência deve lembrar produtos digitais globais, com motion e visual refinado, mas sem excesso de neon, 3D pesado, estética gamer ou efeitos desnecessários.

### 6.3 Concreto antes de genérico

Toda copy deve evitar frases vazias. Quando não houver dado real, a seção deve ser escrita de forma conceitual, honesta e substituível, sem fingir que existem fatos já confirmados.

### 6.4 Placeholder é estrutura, não mentira

Placeholders são permitidos para validar design, layout, fluxo e experiência. Eles não podem ser publicados como se fossem dados oficiais.

### 6.5 Motion como assinatura, não decoração

A animação da logo e as microinterações devem reforçar a identidade do NITE. Motion deve ter propósito: revelar, orientar, destacar e dar vida à marca.

### 6.6 Escalabilidade sem overengineering

A v2 deve preparar o site para crescer, mas não deve construir CMS, autenticação, dashboard ou portal completo nesta fase.

---

## 7. Sites de referência

Os sites abaixo devem ser usados como referência visual, interativa e narrativa. Eles não devem ser copiados literalmente.

### 7.1 Anthropic

URL: https://www.anthropic.com/

#### O que observar

- clareza editorial;
- autoridade institucional;
- sobriedade visual;
- hierarquia de conteúdo;
- sensação de pesquisa, produto e responsabilidade;
- uso de espaço, contraste e ritmo.

#### Aplicação no NITE

- O NITE deve comunicar seriedade, propósito e maturidade institucional.
- A copy deve ser clara, sem exageros publicitários.
- A experiência deve transmitir confiança e visão de futuro.

---

### 7.2 Raycast

URL: https://www.raycast.com/

#### O que observar

- hero com força visual;
- produto demonstrado na interface;
- sensação de velocidade e produtividade;
- microinterações;
- comunidade e uso real;
- estética de app premium.

#### Aplicação no NITE

- O hero do NITE deve mostrar mais do que texto: deve sugerir um sistema vivo de projetos, frentes e experimentação.
- Mockups podem representar o ecossistema do núcleo enquanto conteúdos reais não estiverem disponíveis.
- Cards e interações devem dar sensação de produto digital, não apenas página institucional.

---

### 7.3 Linear

URL: https://linear.app/

#### O que observar

- mockups refinados;
- grids premium;
- cards com profundidade controlada;
- motion discreto;
- fluxo de produto bem narrado;
- estética escura sofisticada.

#### Aplicação no NITE

- O NITE pode ser apresentado como um sistema de evolução de ideias: explorar, desenvolver, testar e evoluir.
- A página deve ter uma cadência visual precisa, com componentes que pareçam intencionais e bem acabados.
- O site deve usar brilho e profundidade com controle.

---

### 7.4 Resend

URL: https://resend.com/

#### O que observar

- landing developer limpa;
- blocos técnicos;
- snippets;
- motion sutil;
- hero com objeto interativo;
- estética premium sem poluição;
- sensação de produto para desenvolvedores.

#### Aplicação no NITE

- A animação da logo do NITE deve funcionar como o elemento de assinatura visual, assim como o cubo interativo funciona como peça marcante no Resend.
- A landing pode usar snippets ou blocos técnicos conceituais para comunicar cultura developer.
- A interação deve ser refinada, leve e controlada.

---

## 8. Escopo

### 8.1 In scope — v2

- landing page institucional premium;
- nova arquitetura da home;
- hero com animação da logo NITE;
- sistema de motion discreto;
- copy institucional menos genérica;
- SEO base forte;
- seções estruturadas para frentes, método, showcase, projetos/iniciativas e timeline;
- placeholders visuais substituíveis;
- componentes reutilizáveis;
- modelo de conteúdo estruturado;
- páginas internas de projeto/iniciativa;
- tratamento de conteúdo incompleto;
- acessibilidade básica e performance;
- documentação para agentes;
- milestones com testes e gates.

### 8.2 Out of scope — v2

- CMS complexo;
- painel administrativo;
- autenticação;
- área logada para alunos;
- formulário avançado de inscrição;
- fluxo completo de gestão de projetos;
- banco de dados obrigatório;
- internacionalização multilíngue;
- integração com sistemas internos da UniJorge;
- publicação automática de notícias;
- dashboard interno;
- WebGL complexo obrigatório;
- reconstrução do site institucional da UniJorge.

### 8.3 Pode ser preparado, mas não implementado por completo

- módulo futuro de notícias;
- catálogo expandido de projetos;
- área de inscrição;
- CMS headless;
- páginas de equipe;
- área de parceiros;
- documentação técnica pública;
- showcase interativo de protótipos reais.

---

## 9. Público-alvo

### Público primário

- estudantes da UniJorge interessados em tecnologia, desenvolvimento, inovação e projetos;
- gestores e professores da universidade;
- coordenação acadêmica;
- alunos de cursos ligados à tecnologia, engenharia, design, dados, computação e áreas correlatas.

### Público secundário

- parceiros externos;
- comunidade acadêmica;
- visitantes interessados em iniciativas de inovação universitária;
- empresas ou instituições que possam se conectar a projetos futuros;
- candidatos que queiram entender o ecossistema prático da UniJorge.

---

## 10. Posicionamento verbal

### Frase institucional recomendada

O NITE é o Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge — um ambiente voltado à prática, experimentação e construção de soluções, onde tecnologia, colaboração acadêmica e desenvolvimento caminham juntos para transformar aprendizagem em experiência aplicada.

### Mensagem central

**Tecnologia aplicada para transformar aprendizagem em experiência real.**

### Proposta de valor

O NITE aproxima repertório técnico, colaboração acadêmica e construção prática para criar um ambiente onde ideias podem ser exploradas, prototipadas e evoluídas em projetos.

### Tom de voz

- claro;
- contemporâneo;
- institucional sem ser burocrático;
- técnico sem ser hermético;
- inspirador sem ser genérico;
- confiante sem prometer dados não validados;
- humano, direto e preciso.

### Evitar na copy

- “inovação” sem contexto;
- “tecnologia do futuro” sem especificidade;
- “impacto” sem evidência;
- “projetos reais” quando os projetos ainda não estiverem validados;
- frases longas e abstratas;
- linguagem excessivamente governamental;
- tom de startup exagerado ou sem vínculo acadêmico.

---

## 11. Copy base recomendada

### 11.1 Hero — opção principal

#### Headline

**Tecnologia aplicada para transformar aprendizagem em experiência real.**

#### Subheadline

O NITE é o Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge — um espaço para explorar, construir e evoluir projetos com prática, colaboração acadêmica e repertório técnico.

#### CTA primário

**Explorar o NITE**

#### CTA secundário

**Ver frentes de atuação**

---

### 11.2 Hero — alternativa mais produto

#### Headline

**Onde ideias ganham forma, tecnologia ganha contexto e projetos começam a acontecer.**

#### Subheadline

No NITE, desenvolvimento, inovação e tecnologias se encontram em uma experiência pensada para experimentação, prática e evolução contínua dentro da UniJorge.

---

### 11.3 Seção “O que é o NITE”

O NITE é um núcleo da UniJorge dedicado a aproximar formação acadêmica e prática tecnológica. A proposta é criar um ambiente onde estudantes, professores e gestores possam explorar ideias, desenvolver soluções, experimentar tecnologias e transformar conhecimento em experiências aplicadas.

O núcleo não substitui o ambiente institucional da universidade. Ele atua como uma camada de experimentação e desenvolvimento, com identidade própria e foco em prática, projetos e cultura técnica.

---

### 11.4 Seção “Como o NITE trabalha”

#### Explorar

Ideias, demandas e oportunidades são organizadas para entender contexto, viabilidade e caminhos possíveis.

#### Construir

As iniciativas evoluem para protótipos, interfaces, experimentos, fluxos técnicos ou soluções aplicadas.

#### Testar

Cada proposta passa por validações, ajustes e leitura crítica para ganhar consistência antes de avançar.

#### Evoluir

Projetos, aprendizados e entregas podem se transformar em novas frentes, melhorias ou experiências acadêmicas.

---

### 11.5 Seção “Frentes de atuação”

Texto introdutório:

O NITE organiza suas iniciativas em frentes que ajudam a transformar conhecimento técnico em construção prática. Essas frentes funcionam como áreas de experimentação e podem receber projetos, protótipos, estudos e ações desenvolvidas ao longo do tempo.

Frentes iniciais possíveis:

- Desenvolvimento de software;
- Dados e inteligência artificial;
- Robótica e automação;
- Prototipação e interfaces;
- Experiências acadêmicas aplicadas;
- Pesquisa, experimentação e inovação.

> Importante: enquanto os projetos reais não forem inventariados, tratar esses itens como frentes de atuação, não como cases comprovados.

---

### 11.6 Seção “Showcase conceitual”

Texto introdutório:

A experiência do NITE é pensada para conectar ideias, tecnologias e pessoas em torno de soluções. Enquanto os projetos reais são consolidados, esta área pode representar visualmente o tipo de fluxo que o núcleo pretende sustentar: descoberta, prototipação, desenvolvimento e evolução.

---

### 11.7 Seção “Projetos e iniciativas”

Texto introdutório:

Projetos e iniciativas do NITE serão apresentados em uma estrutura preparada para registrar contexto, objetivo, tecnologias, estágio de evolução e resultados. Nesta versão, a experiência já fica pronta para receber conteúdos reais sem exigir reconstrução futura.

### 11.8 CTA final

#### Headline

**Um núcleo em construção contínua.**

#### Texto

O Portal NITE foi pensado para evoluir junto com os projetos, pessoas e tecnologias que fazem parte do núcleo. Acompanhe as próximas atualizações e conheça as frentes que estão moldando essa experiência.

#### CTA

**Acompanhar novidades**

---

## 12. SEO base

### Title recomendado

NITE | Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge

### Meta description recomendada

Conheça o NITE, núcleo da UniJorge dedicado ao desenvolvimento, inovação e tecnologias. Explore frentes de atuação, experiências, projetos e a visão do núcleo para uma formação mais prática e conectada ao futuro.

### Meta description alternativa curta

NITE é o núcleo da UniJorge voltado a desenvolvimento, inovação e tecnologias, com foco em prática, experimentação e construção de soluções.

### Palavras-chave naturais

- NITE;
- Núcleo de Desenvolvimento, Inovação e Tecnologias;
- UniJorge;
- tecnologia aplicada;
- inovação acadêmica;
- desenvolvimento de projetos;
- prática em tecnologia;
- experimentação;
- soluções tecnológicas;
- núcleo universitário;
- desenvolvimento de software;
- dados e inteligência artificial;
- robótica;
- prototipação.

### Regras de SEO

- Usar apenas um `h1` por página.
- Usar heading hierarchy correta.
- Cada página interna deve ter title e description únicos.
- Evitar stuffing de palavras-chave.
- Usar Open Graph e imagem social.
- Criar sitemap e robots.
- Usar canonical.
- Usar JSON-LD quando fizer sentido.
- Garantir alt text significativo para imagens.

---

## 13. Arquitetura da home

A home deve ser construída como uma narrativa progressiva, não apenas como blocos soltos.

### 13.1 Header

Objetivo: permitir navegação simples e reforçar marca.

Itens sugeridos:

- logo NITE;
- O que é;
- Frentes;
- Projetos;
- Timeline;
- Contato/Instagram.

Regras:

- header limpo;
- transparente ou com blur sutil;
- sticky opcional;
- não competir visualmente com o hero;
- foco visível;
- menu mobile acessível.

---

### 13.2 Hero com NITE Ignition

Objetivo: criar a primeira impressão premium da landing.

Deve conter:

- animação da logo do NITE;
- headline forte;
- subheadline clara;
- CTA primário;
- CTA secundário;
- fundo escuro com circuitos discretos;
- brilho controlado;
- possível mockup/painel do ecossistema NITE.

Não deve conter:

- texto genérico demais;
- excesso de partículas;
- neon exagerado;
- animação longa ou pesada;
- promessa factual ainda não validada.

---

### 13.3 O que é o NITE

Objetivo: explicar o núcleo com clareza institucional.

Deve responder:

- o que é o NITE;
- por que existe;
- como se diferencia do site institucional da UniJorge;
- que tipo de experiência busca criar.

---

### 13.4 Como o NITE trabalha

Objetivo: mostrar método e reduzir abstração.

Estrutura sugerida:

1. Explorar;
2. Construir;
3. Testar;
4. Evoluir.

Essa seção pode substituir temporariamente uma timeline histórica quando datas reais ainda não estiverem validadas.

---

### 13.5 Frentes de atuação

Objetivo: apresentar áreas de prática sem depender de projetos reais completos.

Cards sugeridos:

- Desenvolvimento de software;
- Dados e inteligência artificial;
- Robótica e automação;
- Prototipação e interfaces;
- Experiências aplicadas;
- Pesquisa e experimentação.

Cada card deve ter:

- título;
- descrição objetiva;
- ícone ou detalhe visual;
- status opcional;
- placeholder visual substituível.

---

### 13.6 Showcase visual / mockups

Objetivo: trazer sensação de produto premium e reduzir aparência de site estático.

Pode conter:

- painel conceitual “NITE OS”;
- cards de status;
- mini dashboard;
- snippets técnicos;
- mockups abstratos;
- visual de fluxo de projeto;
- chips de tecnologias.

Regras:

- deixar claro internamente que é mockup conceitual;
- não apresentar como sistema real se ainda não existir;
- usar `TODO(nite-asset)` para substituição futura por prints reais.

---

### 13.7 Projetos e iniciativas

Objetivo: preparar a vitrine de projetos reais.

Enquanto o inventário real não estiver completo, usar uma das nomenclaturas:

- “Projetos e iniciativas”;
- “Experiências em construção”;
- “Frentes em destaque”;
- “Ambientes de prática”.

Evitar chamar de “cases” se não houver evidência real.

---

### 13.8 Timeline

Objetivo: mostrar evolução do NITE.

Regra especial:

- Se datas e marcos reais ainda não estiverem validados, usar uma **timeline de processo/jornada**.
- Quando as informações reais forem coletadas, substituir por timeline histórica.

Modo temporário recomendado:

1. Ideia;
2. Exploração;
3. Protótipo;
4. Evolução;
5. Publicação/entrega.

Modo futuro:

- fundação do NITE;
- chamadas oficiais;
- primeiros projetos;
- eventos;
- parcerias;
- entregas;
- marcos acadêmicos.

---

### 13.9 CTA final

Objetivo: fechar a página com continuidade.

Pode direcionar para:

- Instagram;
- contato;
- frentes de atuação;
- projetos;
- futura página de inscrição.

---

### 13.10 Footer

Deve conter:

- marca NITE;
- expansão institucional;
- vínculo com UniJorge;
- links internos;
- canais públicos aprovados;
- aviso simples de que o portal está em evolução, se necessário.

---

## 14. Design system

### Conceito visual

**Tech institucional premium**

A interface deve combinar:

- fundo escuro;
- brilho azul controlado;
- cards sofisticados;
- microinterações suaves;
- detalhes inspirados em circuito;
- interface de produto;
- sobriedade institucional.

### Paleta base sugerida

```css
:root {
  --bg: #04080f;
  --bg-soft: #07101d;
  --surface: #0b1220;
  --surface-elevated: #111b2e;
  --primary: #1e90ff;
  --primary-glow: #29aeff;
  --primary-soft: rgba(30, 144, 255, 0.16);
  --text: #f5f8ff;
  --text-muted: #8c96a8;
  --text-soft: #b7c2d6;
  --border: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(120, 180, 255, 0.28);
  --metal: #c9d1dc;
  --danger: #ff5c7a;
  --success: #65e6a6;
}
```

### Tipografia

Opções recomendadas:

- títulos: `Sora`, `Space Grotesk` ou `Geist`;
- corpo: `Inter` ou `Geist Sans`;
- código/snippets: `JetBrains Mono`, `Geist Mono` ou equivalente.

### Escala de espaçamento

- `4px`
- `8px`
- `12px`
- `16px`
- `24px`
- `32px`
- `48px`
- `64px`
- `96px`
- `128px`

### Raios

- chips: `999px`;
- botões: `12px` a `14px`;
- cards: `16px` a `24px`;
- painéis hero/mockup: `24px` a `32px`.

### Componentes obrigatórios

- [ ] `Header`
- [ ] `MobileNav`
- [ ] `Container`
- [ ] `SectionHeader`
- [ ] `Button`
- [ ] `Chip`
- [ ] `NiteLogoMotion`
- [ ] `HeroSection`
- [ ] `MethodCard`
- [ ] `PracticeAreaCard`
- [ ] `ShowcasePanel`
- [ ] `ProjectCard`
- [ ] `TimelineItem`
- [ ] `CTASection`
- [ ] `Footer`
- [ ] `PlaceholderBadge`
- [ ] `EmptyState`

### Estados obrigatórios

- [ ] default
- [ ] hover
- [ ] active
- [ ] focus-visible
- [ ] disabled
- [ ] loading quando aplicável
- [ ] reduced-motion

---

## 15. Sistema de motion

### Princípios

- Motion deve ser discreto, premium e funcional.
- Evitar animações longas e chamativas.
- Usar reveals suaves, stagger curto, hover controlado e microinterações.
- Respeitar `prefers-reduced-motion`.
- Priorizar CSS/SVG/Framer Motion antes de WebGL.

### Timings sugeridos

- reveals: `400ms` a `700ms`;
- hover: `150ms` a `250ms`;
- hero logo intro: `1200ms` a `2200ms`;
- idle loop: lento, quase imperceptível;
- easing: `easeOut`, `cubic-bezier(0.16, 1, 0.3, 1)` ou equivalente.

### Padrões de animação

#### Section reveal

- opacidade `0 -> 1`;
- translateY `16px -> 0`;
- stagger de `60ms` a `120ms`.

#### Cards

- hover com borda mais clara;
- leve elevação;
- glow local controlado;
- sem deslocamentos bruscos.

#### Botões

- hover com brilho sutil;
- active com scale mínimo;
- focus visível e acessível.

#### Mockups

- movimento leve;
- transições internas suaves;
- sem animação infinita chamativa.

---

## 16. Animação principal — NITE Ignition

A animação da logo deve ser a assinatura visual do Portal NITE.

### Nome conceitual

**NITE Ignition**

### Objetivo

Transformar a logo do NITE em elemento central do hero, usando a metáfora de energia, circuito, lâmpada, cérebro e ativação de ideias.

### Elementos da logo considerados

- lâmpada;
- bocal;
- cérebro;
- nome NITE;
- linhas/circuitos;
- brilho azul;
- fundo transparente/escuro.

### Sequência de entrada recomendada

#### 1. Estado dormente

- logo aparece em baixo contraste;
- contorno suave;
- fundo escuro;
- circuitos quase invisíveis.

#### 2. Energia entrando

- um traço de energia sobe pelo bocal da lâmpada;
- a linha percorre o circuito principal;
- brilho azul discreto acompanha o caminho.

#### 3. Cérebro acendendo

- nós internos do cérebro acendem em sequência;
- linhas internas recebem brilho;
- sensação de processamento/ativação.

#### 4. Lâmpada emitindo luz

- halo suave ao redor da lâmpada;
- glow não deve estourar contraste;
- brilho central controlado.

#### 5. Nome NITE revelado

- letras podem acender em sequência;
- alternativa: varredura luminosa horizontal;
- manter legibilidade absoluta.

#### 6. Estado idle

- brilho respirando levemente;
- pequenos pulsos ocasionais nos circuitos;
- sem parecer animação de loading;
- não distrair da leitura do hero.

### Interação com mouse

Quando o usuário move o mouse sobre a área do hero:

- a logo pode inclinar levemente;
- o brilho pode acompanhar a direção do cursor;
- pontos do cérebro podem reagir de forma sutil;
- o fundo pode ter parallax mínimo.

Ao hover/focus:

- circuitos ficam um pouco mais vivos;
- um scan curto pode percorrer a lâmpada;
- manter controle e sobriedade.

### Requisitos técnicos da animação

- preferir SVG animado;
- usar CSS variables para cor/glow;
- usar Framer Motion/Motion para paths e interações quando necessário;
- respeitar `prefers-reduced-motion`;
- não bloquear renderização do hero;
- não exigir WebGL na v2;
- fallback estático obrigatório.

### Critérios de aceitação

- [ ] A logo permanece reconhecível.
- [ ] A animação carrega rápido.
- [ ] O efeito parece premium, não infantil.
- [ ] O brilho não prejudica leitura.
- [ ] Existe fallback para reduced motion.
- [ ] Existe fallback estático se JS falhar.

---

## 17. Estratégia de placeholders substituíveis

### Objetivo

Permitir que a landing fique praticamente finalizada agora, mesmo sem inventário completo de projetos, fotos, prints, protótipos, datas e evidências.

### Tipos de placeholders permitidos

- imagens conceituais;
- mockups abstratos;
- telas fictícias não factuais;
- nomes internos temporários;
- cards de frentes de atuação;
- timeline de processo;
- blocos visuais de tecnologia;
- snippets conceituais;
- dados com status claro de placeholder no código.

### Tipos de placeholders proibidos em produção sem aprovação

- data de fundação não confirmada;
- número de alunos envolvidos;
- número de projetos;
- nomes de parceiros;
- resultados quantitativos;
- cases apresentados como reais;
- depoimentos fictícios;
- fotos que pareçam pessoas/projetos reais sem autorização;
- logos de empresas/parceiros sem confirmação.

### Padrão de marcação no conteúdo

Todo placeholder deve conter metadados:

```ts
{
  isPlaceholder: true,
  placeholderType: "image" | "copy" | "date" | "project" | "metric" | "timeline",
  replacementStatus: "pending-real-content",
  note: "TODO(nite-content): substituir por conteúdo oficial quando validado"
}
```

### Padrão visual interno opcional

Em ambiente de desenvolvimento ou preview, pode haver badge discreto:

- `Placeholder`
- `Conteúdo pendente`
- `Imagem conceitual`

Em produção pública, badges só devem aparecer se forem intencionais e aprovados.

---

## 18. Modelo de conteúdo

### 18.1 Project / Initiative

```ts
type ProjectStatus =
  | "concept"
  | "in-progress"
  | "prototype"
  | "completed"
  | "paused"
  | "placeholder";

type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  year?: string;
  status: ProjectStatus;
  coverImage: string;
  coverAlt: string;
  technologies?: string[];
  objective?: string;
  process?: string[];
  results?: string;
  team?: string[];
  links?: {
    label: string;
    href: string;
  }[];
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
    isPlaceholder?: boolean;
  }[];
  isPlaceholder?: boolean;
  source?: "official" | "internal-draft" | "conceptual-placeholder";
  notes?: string;
};
```

### 18.2 PracticeArea

```ts
type PracticeArea = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  visual?: string;
  tags?: string[];
  isPlaceholder?: boolean;
};
```

### 18.3 TimelineEvent

```ts
type TimelineEvent = {
  id: string;
  mode: "process" | "historical";
  year?: string;
  month?: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  imageAlt?: string;
  projectSlug?: string;
  isPlaceholder?: boolean;
  source?: "official" | "internal-draft" | "conceptual-placeholder";
};
```

### 18.4 SiteCopy

```ts
type SiteCopy = {
  hero: {
    eyebrow?: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta?: string;
  };
  about: {
    title: string;
    body: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
};
```

---

## 19. Stack recomendada

### Base técnica

- Next.js com App Router;
- TypeScript;
- Tailwind CSS;
- shadcn/ui ou componentes próprios equivalentes;
- Framer Motion ou Motion para animações;
- conteúdo inicial em JSON, TS ou MDX tipado;
- Vercel para deploy.

### Qualidade

- ESLint;
- Prettier;
- TypeScript strict, se possível;
- Vitest para validações de utilitários e schemas;
- Testing Library para componentes críticos;
- Playwright para smoke/e2e;
- Lighthouse para performance/SEO/a11y.

### Scripts mínimos

- [ ] `npm run dev`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run test:e2e`
- [ ] `npm run build`

---

## 20. Arquitetura de pastas sugerida

```txt
app/
  layout.tsx
  page.tsx
  projetos/
    [slug]/
      page.tsx
  not-found.tsx
components/
  brand/
    nite-logo-motion.tsx
  layout/
    header.tsx
    footer.tsx
    container.tsx
  sections/
    hero-section.tsx
    about-section.tsx
    method-section.tsx
    practice-areas-section.tsx
    showcase-section.tsx
    projects-section.tsx
    timeline-section.tsx
    cta-section.tsx
  ui/
    button.tsx
    chip.tsx
    card.tsx
    section-header.tsx
    placeholder-badge.tsx
content/
  site-copy.ts
  practice-areas.ts
  projects.ts
  timeline.ts
lib/
  content.ts
  seo.ts
  schemas.ts
  utils.ts
public/
  images/
    placeholders/
    projetos/
    brand/
  og/
docs/
  decisions.md
  content-inventory.md
  handoff.md
  qa-report.md
```

---

## 21. Requisitos funcionais

### Home

- [ ] Exibir header com navegação clara.
- [ ] Exibir hero com logo animada.
- [ ] Exibir headline e subheadline revisadas.
- [ ] Exibir CTAs funcionais.
- [ ] Explicar o que é o NITE.
- [ ] Exibir método de trabalho.
- [ ] Exibir frentes de atuação.
- [ ] Exibir showcase visual/mockups.
- [ ] Exibir projetos/iniciativas ou placeholders estruturais.
- [ ] Exibir timeline de processo ou histórica, conforme dados disponíveis.
- [ ] Exibir CTA final.
- [ ] Exibir footer com vínculo UniJorge e canais aprovados.

### Projetos/iniciativas

- [ ] Renderizar cards a partir de dados estruturados.
- [ ] Permitir navegação para `/projetos/[slug]`.
- [ ] Renderizar página interna por slug.
- [ ] Tratar campos opcionais sem quebrar layout.
- [ ] Marcar placeholders no código.
- [ ] Gerar metadata por projeto.

### Motion

- [ ] Renderizar animação da logo.
- [ ] Aplicar reveals suaves nas seções.
- [ ] Aplicar hover states em cards e CTAs.
- [ ] Respeitar `prefers-reduced-motion`.
- [ ] Garantir fallback estático.

### Conteúdo

- [ ] Usar nome oficial NITE.
- [ ] Usar expansão correta: Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge.
- [ ] Evitar textos genéricos sem função.
- [ ] Separar frentes de atuação de projetos reais.
- [ ] Evitar dados fictícios apresentados como oficiais.

---

## 22. Requisitos não funcionais

- [ ] Mobile-first.
- [ ] Responsivo em mobile, tablet e desktop.
- [ ] Acessível por teclado.
- [ ] Foco visível.
- [ ] Contraste adequado.
- [ ] Performance adequada em rede móvel comum.
- [ ] Sem layout shifts perceptíveis.
- [ ] Build reproduzível.
- [ ] Código tipado.
- [ ] Componentes reutilizáveis.
- [ ] SEO técnico implementado.
- [ ] Imagens otimizadas.
- [ ] Motion não deve prejudicar performance.

---

## 23. Acessibilidade

### Requisitos

- [ ] Landmarks semânticos: `header`, `main`, `section`, `footer`.
- [ ] Um único `h1` por página.
- [ ] Hierarquia correta de headings.
- [ ] Todos os links e botões com nome acessível.
- [ ] Foco visível em elementos interativos.
- [ ] Navegação por teclado funcional.
- [ ] Alt text significativo em imagens.
- [ ] Animações respeitam `prefers-reduced-motion`.
- [ ] Texto legível em mobile.
- [ ] Contraste validado.

### Critérios mínimos

- Lighthouse Accessibility >= 95 na home.
- Nenhum problema crítico de acessibilidade em inspeção manual básica.
- Nenhum CTA inacessível por teclado.

---

## 24. Performance

### Metas

- Lighthouse Performance >= 90 na home em cenário padrão.
- LCP <= 2.5s como alvo.
- CLS <= 0.1.
- INP <= 200ms quando mensurável.
- Imagens com dimensões definidas.
- Evitar JS pesado no hero.
- Animação da logo deve ter fallback.

### Regras

- Não usar vídeo pesado no hero sem necessidade.
- Não usar WebGL complexo como requisito da v2.
- Evitar bibliotecas grandes para efeitos simples.
- Lazy load em imagens abaixo da dobra.
- Priorizar SVG/CSS para motion da logo.

---

## 25. SEO técnico

### Home

- [ ] Title único.
- [ ] Meta description.
- [ ] Canonical.
- [ ] Open Graph.
- [ ] Twitter/X card.
- [ ] Imagem social.
- [ ] JSON-LD de Organization ou WebSite, se apropriado.
- [ ] Headings hierárquicos.
- [ ] Conteúdo indexável.

### Páginas internas

- [ ] Title único por projeto.
- [ ] Description única por projeto.
- [ ] Breadcrumb visual e/ou JSON-LD quando fizer sentido.
- [ ] Slug legível.
- [ ] Conteúdo suficiente para não parecer página rasa.

### Arquivos

- [ ] `robots.txt`
- [ ] `sitemap.xml`
- [ ] `manifest.webmanifest` opcional
- [ ] `opengraph-image` ou imagem OG equivalente

---

## 26. Agentes e responsabilidades

### Agent A — Product / Planner

Responsável por:

- manter aderência ao spec;
- quebrar escopo;
- organizar milestones;
- registrar decisões;
- impedir desvio de escopo;
- validar se o site continua fiel ao NITE.

### Agent B — UX / Content / SEO

Responsável por:

- copy;
- arquitetura de informação;
- SEO textual;
- labels;
- microcopy;
- placeholders rastreáveis;
- clareza institucional.

### Agent C — UI / Motion

Responsável por:

- design system;
- componentes;
- motion system;
- NITE Ignition;
- acabamento visual;
- responsividade visual.

### Agent D — Frontend / Architecture

Responsável por:

- Next.js;
- TypeScript;
- estrutura de pastas;
- rotas;
- dados estruturados;
- componentes;
- build.

### Agent E — QA / Reviewer

Responsável por:

- testes;
- lint;
- typecheck;
- build;
- Playwright;
- acessibilidade;
- performance;
- checklist final.

### Handoff obrigatório

Ao finalizar qualquer milestone, registrar:

- resumo do que foi feito;
- arquivos alterados;
- checkboxes concluídos;
- testes executados;
- resultado dos testes;
- pendências;
- blockers;
- próximo passo recomendado.

---

## 27. Milestone tracker

- [ ] M0 — Alinhamento final, escopo e decisões base
- [ ] M1 — Auditoria do estado atual e plano de refatoração
- [ ] M2 — Copy, SEO e arquitetura narrativa
- [ ] M3 — Design system e tokens visuais
- [ ] M4 — Motion system e NITE Ignition
- [ ] M5 — Home v2 e seções principais
- [ ] M6 — Conteúdo estruturado e placeholders substituíveis
- [ ] M7 — Projetos, iniciativas e páginas internas
- [ ] M8 — Timeline flexível: processo agora, história depois
- [ ] M9 — SEO técnico, acessibilidade e performance
- [ ] M10 — QA final, validação e handoff

---

# 28. Milestones detalhadas

## M0 — Alinhamento final, escopo e decisões base

### Objetivo

Travar as decisões principais para impedir que agentes fujam do escopo ou reconstruam o projeto com premissas erradas.

### Tarefas

- [ ] Registrar nome oficial: **NITE**.
- [ ] Registrar expansão oficial: **Núcleo de Desenvolvimento, Inovação e Tecnologias da UniJorge**.
- [ ] Registrar que o Portal NITE não deve copiar o site institucional da UniJorge.
- [ ] Registrar que a direção visual é “tech institucional premium”.
- [ ] Registrar que placeholders substituíveis são permitidos.
- [ ] Registrar que fatos institucionais não validados não podem ser inventados.
- [ ] Registrar sites de referência e função de cada um.
- [ ] Registrar que a animação da logo é requisito central da v2.
- [ ] Criar/atualizar `docs/decisions.md`.
- [ ] Criar/atualizar `docs/content-inventory.md` com lacunas conhecidas.

### Testes / validação

- [ ] `docs/decisions.md` existe.
- [ ] `docs/content-inventory.md` existe.
- [ ] Nome NITE está consistente.
- [ ] Expansão institucional está consistente.
- [ ] Escopo in/out está registrado.
- [ ] Referências estão registradas com URLs.
- [ ] Placeholder strategy está registrada.

### Gate de saída

Só avançar se a equipe/agente conseguir explicar em até 5 linhas:

1. o que é o NITE;
2. qual problema a v2 resolve;
3. o que pode ser placeholder;
4. o que não pode ser inventado;
5. qual é a direção visual.

---

## M1 — Auditoria do estado atual e plano de refatoração

### Objetivo

Entender o deploy/código atual antes de alterar estrutura, evitando retrabalho e preservando o que já funciona.

### Tarefas

- [ ] Auditar rotas existentes.
- [ ] Auditar componentes existentes.
- [ ] Auditar copy atual e marcar trechos genéricos.
- [ ] Auditar imagens atuais e marcar assets muito futuristas/genéricos.
- [ ] Auditar SEO atual.
- [ ] Auditar acessibilidade básica.
- [ ] Auditar performance básica.
- [ ] Identificar o que manter.
- [ ] Identificar o que refatorar.
- [ ] Identificar o que remover.
- [ ] Criar plano de refatoração incremental.

### Testes / validação

- [ ] Existe lista de arquivos/componentes atuais relevantes.
- [ ] Existe lista de copies a substituir.
- [ ] Existe lista de assets substituíveis.
- [ ] Existe plano incremental, sem “reescrever tudo” sem necessidade.
- [ ] A navegação atual foi verificada.

### Gate de saída

Só avançar se houver clareza sobre o que será mantido, substituído e criado do zero.

---

## M2 — Copy, SEO e arquitetura narrativa

### Objetivo

Substituir a linguagem genérica por uma narrativa mais clara, humana e alinhada ao NITE.

### Tarefas

- [ ] Definir headline principal.
- [ ] Definir subheadline principal.
- [ ] Definir descrição institucional.
- [ ] Definir copy da seção “O que é o NITE”.
- [ ] Definir copy da seção “Como o NITE trabalha”.
- [ ] Definir copy das frentes de atuação.
- [ ] Definir copy do showcase conceitual.
- [ ] Definir copy de projetos/iniciativas.
- [ ] Definir copy da timeline temporária/processual.
- [ ] Definir CTA final.
- [ ] Definir title e meta description.
- [ ] Definir labels de navegação.
- [ ] Revisar tom de voz.
- [ ] Remover promessas factuais não validadas.

### Testes / validação

- [ ] A home explica o NITE sem depender de frases genéricas.
- [ ] A copy não inventa datas, números ou resultados.
- [ ] O texto usa NITE e UniJorge corretamente.
- [ ] O H1 está definido.
- [ ] A meta description está definida.
- [ ] CTAs são claros.
- [ ] Frentes não são confundidas com projetos reais.

### Gate de saída

Só avançar se a narrativa da home estiver completa o suficiente para ser implementada sem o agente precisar improvisar texto.

---

## M3 — Design system e tokens visuais

### Objetivo

Criar uma base visual consistente, reutilizável e alinhada à estética “tech institucional premium”.

### Tarefas

- [ ] Definir tokens de cor.
- [ ] Definir tokens de tipografia.
- [ ] Definir escala de espaçamento.
- [ ] Definir raios.
- [ ] Definir shadows/glows.
- [ ] Criar estilos globais.
- [ ] Criar `Container`.
- [ ] Criar `Button`.
- [ ] Criar `Chip`.
- [ ] Criar `Card`.
- [ ] Criar `SectionHeader`.
- [ ] Criar `PlaceholderBadge`.
- [ ] Criar estados hover/focus/active/disabled.
- [ ] Criar padrões de fundo escuro e grid/circuito sutil.

### Testes / validação

- [ ] Tokens estão centralizados.
- [ ] Componentes não usam cores hardcoded caóticas.
- [ ] Focus visible existe.
- [ ] Contraste básico é aceitável.
- [ ] Cards e botões têm estados interativos.
- [ ] Visual não parece gamer/neon exagerado.
- [ ] Visual não parece institucional genérico demais.

### Gate de saída

Só avançar se a base visual permitir montar a home sem criar estilos novos a cada seção.

---

## M4 — Motion system e NITE Ignition

### Objetivo

Criar a assinatura de motion do Portal NITE, com foco na animação da logo e microinterações premium.

### Tarefas

- [ ] Preparar logo em SVG utilizável.
- [ ] Separar paths da lâmpada, bocal, cérebro e texto quando possível.
- [ ] Implementar estado inicial estático.
- [ ] Implementar sequência de energia pelo bocal.
- [ ] Implementar ativação do cérebro.
- [ ] Implementar brilho da lâmpada.
- [ ] Implementar revelação do texto NITE.
- [ ] Implementar idle loop discreto.
- [ ] Implementar interação sutil com mouse.
- [ ] Implementar fallback para reduced motion.
- [ ] Implementar fallback estático.
- [ ] Criar padrões de reveal para seções.
- [ ] Criar padrões de hover para cards.

### Testes / validação

- [ ] Animação não quebra sem JavaScript.
- [ ] Reduced motion remove ou simplifica animações.
- [ ] Logo continua legível.
- [ ] Motion não prejudica leitura do hero.
- [ ] Não há travamento perceptível.
- [ ] O efeito parece premium e controlado.
- [ ] A animação reforça a identidade do NITE.

### Gate de saída

Só avançar se o NITE Ignition estiver funcional, performático e com fallback seguro.

---

## M5 — Home v2 e seções principais

### Objetivo

Implementar a nova homepage com arquitetura narrativa completa e acabamento visual coerente.

### Tarefas

- [ ] Implementar header.
- [ ] Implementar hero com NITE Ignition.
- [ ] Implementar seção “O que é o NITE”.
- [ ] Implementar seção “Como o NITE trabalha”.
- [ ] Implementar seção “Frentes de atuação”.
- [ ] Implementar showcase visual/mockup.
- [ ] Implementar seção “Projetos e iniciativas”.
- [ ] Implementar timeline em modo processo.
- [ ] Implementar CTA final.
- [ ] Implementar footer.
- [ ] Aplicar reveals suaves.
- [ ] Garantir responsividade.
- [ ] Garantir navegação por âncoras.

### Testes / validação

- [ ] Home renderiza sem erro.
- [ ] Existe apenas um H1.
- [ ] Navegação por âncoras funciona.
- [ ] Layout mobile está legível.
- [ ] Layout desktop tem hierarquia clara.
- [ ] Hero comunica bem acima da dobra.
- [ ] Nenhuma seção depende de dado real ausente para não quebrar.
- [ ] Copy está coerente com o spec.

### Gate de saída

Só avançar se a home já puder ser apresentada como v2 visual/narrativa, mesmo com placeholders substituíveis.

---

## M6 — Conteúdo estruturado e placeholders substituíveis

### Objetivo

Criar uma camada de conteúdo organizada, tipada e preparada para substituição futura de materiais reais.

### Tarefas

- [ ] Criar schema de `Project`.
- [ ] Criar schema de `PracticeArea`.
- [ ] Criar schema de `TimelineEvent`.
- [ ] Criar schema de `SiteCopy`.
- [ ] Criar dados iniciais em TS/JSON/MDX.
- [ ] Adicionar metadados de placeholder.
- [ ] Criar validação para conteúdo obrigatório.
- [ ] Criar utilitários de leitura de conteúdo.
- [ ] Documentar como substituir imagens e textos depois.
- [ ] Criar `docs/content-inventory.md` com campos pendentes.

### Testes / validação

- [ ] Conteúdo inválido falha de forma explícita.
- [ ] Placeholders têm metadados.
- [ ] Cards renderizam com dados estruturados.
- [ ] Campos opcionais ausentes não quebram layout.
- [ ] Existe documentação de substituição futura.

### Gate de saída

Só avançar se trocar conteúdo futuro não exigir refatorar componentes estruturais.

---

## M7 — Projetos, iniciativas e páginas internas

### Objetivo

Preparar a vitrine de iniciativas e as páginas internas para receber projetos reais futuramente.

### Tarefas

- [ ] Implementar `ProjectCard`.
- [ ] Implementar grid de projetos/iniciativas.
- [ ] Criar rota `/projetos/[slug]`.
- [ ] Criar template de página interna.
- [ ] Exibir título, resumo, descrição, categoria e status.
- [ ] Exibir tecnologias quando houver.
- [ ] Exibir objetivo/processo/resultados quando houver.
- [ ] Exibir galeria quando houver.
- [ ] Criar empty state elegante.
- [ ] Criar tratamento para slug inexistente.
- [ ] Criar metadata por projeto.
- [ ] Criar navegação de retorno.

### Testes / validação

- [ ] Clique no card abre página correta.
- [ ] Slug inexistente retorna 404 ou notFound.
- [ ] Campos opcionais ausentes não quebram layout.
- [ ] Imagens têm alt text.
- [ ] Metadata é única por projeto.
- [ ] Página interna não apresenta placeholder como fato oficial.

### Gate de saída

Só avançar se o sistema de projetos estiver pronto para receber inventário real sem reconstrução.

---

## M8 — Timeline flexível: processo agora, história depois

### Objetivo

Implementar uma timeline que funcione agora como jornada/processo e possa virar timeline histórica quando datas reais forem coletadas.

### Tarefas

- [ ] Criar componente `TimelineItem`.
- [ ] Criar modo `process`.
- [ ] Criar modo `historical`.
- [ ] Renderizar timeline de processo na home.
- [ ] Preparar schema para timeline histórica futura.
- [ ] Evitar datas fictícias.
- [ ] Adicionar notas `TODO(nite-content)` para marcos reais.
- [ ] Garantir responsividade.
- [ ] Garantir motion discreto.

### Testes / validação

- [ ] Timeline processual renderiza sem dados históricos.
- [ ] Timeline histórica aceita datas quando inseridas.
- [ ] Eventos são ordenáveis.
- [ ] Mobile não quebra.
- [ ] Nenhuma data inventada aparece.

### Gate de saída

Só avançar se a timeline resolver o problema atual sem bloquear a landing por falta de dados históricos.

---

## M9 — SEO técnico, acessibilidade e performance

### Objetivo

Endurecer a aplicação para apresentação pública e validação de qualidade.

### Tarefas

- [ ] Implementar metadata da home.
- [ ] Implementar metadata das páginas internas.
- [ ] Implementar canonical.
- [ ] Implementar Open Graph.
- [ ] Implementar imagem social.
- [ ] Implementar sitemap.
- [ ] Implementar robots.
- [ ] Implementar JSON-LD quando apropriado.
- [ ] Revisar headings.
- [ ] Revisar alt texts.
- [ ] Revisar foco visível.
- [ ] Revisar navegação por teclado.
- [ ] Revisar contrastes.
- [ ] Otimizar imagens.
- [ ] Reduzir JS desnecessário.
- [ ] Rodar Lighthouse.

### Testes / validação

- [ ] `npm run lint` passa.
- [ ] `npm run typecheck` passa.
- [ ] `npm run test` passa.
- [ ] `npm run build` passa.
- [ ] Lighthouse Performance >= 90.
- [ ] Lighthouse Accessibility >= 95.
- [ ] Lighthouse SEO >= 95.
- [ ] `robots.txt` acessível.
- [ ] `sitemap.xml` acessível.
- [ ] Não há regressão visual grave.

### Gate de saída

Só avançar se a aplicação estiver tecnicamente pronta para release candidate.

---

## M10 — QA final, validação e handoff

### Objetivo

Finalizar a v2 como release candidate, documentar pendências e garantir que futuras trocas de conteúdo sejam simples.

### Tarefas

- [ ] Executar smoke test completo.
- [ ] Testar home em mobile.
- [ ] Testar home em tablet.
- [ ] Testar home em desktop.
- [ ] Testar navegação por teclado.
- [ ] Testar reduced motion.
- [ ] Testar rotas de projeto.
- [ ] Revisar copy final.
- [ ] Revisar placeholders.
- [ ] Listar assets pendentes.
- [ ] Criar `docs/handoff.md`.
- [ ] Criar `docs/qa-report.md`.
- [ ] Criar backlog de fase 2.
- [ ] Preparar preview para validação dos gestores.

### Testes / validação

- [ ] Fluxo home -> seção -> projeto -> retorno funciona.
- [ ] Não há links quebrados conhecidos.
- [ ] Não há placeholders factuais sem marcação no código.
- [ ] O site pode receber fotos/projetos reais por troca de dados/assets.
- [ ] Documentação explica como substituir conteúdos.
- [ ] Release candidate está deployável.

### Gate de saída

Milestone concluída quando a v2 estiver pronta para apresentação, com pendências limitadas a conteúdo real, assets reais e validação institucional.

---

## 29. Checklist final de release candidate

- [ ] Nome NITE aplicado corretamente.
- [ ] Expansão institucional aplicada corretamente.
- [ ] Portal não copia estética do site institucional da UniJorge.
- [ ] Hero possui animação ou fallback da logo.
- [ ] Copy não soa genérica.
- [ ] Home tem narrativa clara.
- [ ] Frentes de atuação não são confundidas com projetos reais.
- [ ] Placeholders estão rastreados.
- [ ] Projetos/iniciativas estão estruturados.
- [ ] Páginas internas funcionam.
- [ ] Timeline não inventa datas.
- [ ] SEO base implementado.
- [ ] Acessibilidade básica validada.
- [ ] Performance validada.
- [ ] Mobile validado.
- [ ] Desktop validado.
- [ ] Reduced motion validado.
- [ ] Handoff documentado.
- [ ] Backlog fase 2 documentado.

---

## 30. Critérios de sucesso

A v2 será considerada bem-sucedida quando:

- o Portal NITE parecer uma landing institucional premium com comportamento de produto digital;
- a identidade visual do NITE estiver mais forte e autoral;
- a logo animada funcionar como assinatura visual;
- a copy estiver mais concreta, humana e menos genérica;
- a landing não depender do inventário real completo para estar quase finalizada;
- fotos, mockups, prints, timeline e projetos reais puderem ser substituídos depois sem reconstrução;
- gestores conseguirem validar a direção visual e narrativa;
- agentes futuros conseguirem continuar o projeto seguindo este spec sem fugir do escopo.

---

## 31. Backlog fase 2

Itens fora do escopo da v2, mas que podem ser preparados para o futuro:

- [ ] formulário de interesse/inscrição;
- [ ] CMS headless;
- [ ] notícias e atualizações;
- [ ] página completa “Sobre o NITE”;
- [ ] página de equipe;
- [ ] página de parceiros;
- [ ] catálogo completo de projetos;
- [ ] filtros por frente/status/tecnologia;
- [ ] cases reais com resultados;
- [ ] depoimentos reais;
- [ ] área interna para alunos;
- [ ] autenticação;
- [ ] integração com sistemas institucionais;
- [ ] dashboard administrativo;
- [ ] showcase interativo de protótipos;
- [ ] documentação técnica pública de projetos.

---

## 32. Riscos e mitigação

### Risco: aparência premium sem lastro real

Mitigação:

- usar placeholders como estrutura, não como fatos;
- evitar métricas, datas e resultados não validados;
- preparar troca futura de evidências reais.

### Risco: visual futurista ou robótico demais

Mitigação:

- reduzir imagens genéricas;
- usar mockups e painéis mais próximos de produto;
- controlar neon e partículas;
- valorizar clareza, hierarquia e sobriedade.

### Risco: dependência de outros gestores para avançar

Mitigação:

- separar camada definitiva de camada factual substituível;
- construir templates, schemas e placeholders agora;
- deixar pendências de conteúdo isoladas.

### Risco: desvio para portal completo

Mitigação:

- respeitar out of scope;
- registrar novas ideias no backlog fase 2;
- manter v2 como landing premium, não como sistema completo.

### Risco: motion prejudicar performance

Mitigação:

- usar SVG/CSS/Framer Motion com moderação;
- criar fallback estático;
- respeitar reduced motion;
- evitar WebGL complexo na v2.

### Risco: agentes inventarem conteúdo

Mitigação:

- usar placeholders rastreáveis;
- exigir fonte/status nos dados;
- bloquear release de fatos não aprovados.

---

## 33. Definition of Done

Uma tarefa só pode ser marcada como concluída quando:

- foi implementada;
- passou nos testes da milestone;
- não quebrou responsividade;
- não quebrou acessibilidade básica;
- não introduziu dado institucional inventado;
- respeita o design system;
- está alinhada ao escopo v2;
- foi documentada quando necessário.

Uma milestone só pode ser concluída quando:

- todos os checkboxes obrigatórios estão resolvidos;
- testes passaram;
- gate foi satisfeito;
- pendências foram registradas;
- blockers foram explicitados;
- próximo passo está claro.

---

## 34. Próxima ação recomendada

Executar **M0 — Alinhamento final, escopo e decisões base**.

Antes de qualquer implementação, o agente deve criar ou atualizar:

- `docs/decisions.md`;
- `docs/content-inventory.md`.

Esses documentos devem registrar que o objetivo da v2 é finalizar a landing em estrutura, copy, motion, UX, SEO e placeholders substituíveis, deixando apenas a substituição de fotos, prints, protótipos, timeline factual e projetos reais como pendências futuras de conteúdo.
