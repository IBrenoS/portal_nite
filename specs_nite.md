# specs.md — Redesenho Premium do Portal NITE UniJorge

> **Documento de especificação executável para LLM/IA implementar o novo redesenho do Portal NITE.**
>
> Este documento deve ser tratado como fonte de verdade. A IA não deve simplificar a implementação, trocar decisões por alternativas genéricas, omitir milestones, reduzir motion por conveniência, substituir conteúdo por frases vagas ou entregar apenas ajustes cosméticos. O objetivo é redesenhar a landing page do Portal NITE com qualidade profissional, mantendo legitimidade acadêmica e alcançando uma experiência visual próxima a referências globais de produto, sem transformar o NITE em um “SaaS fake”.

---

## 0. Contexto do projeto

### 0.1 Produto

O projeto é o **Portal NITE**, landing page informativa e institucional-produtizada do **Núcleo de Inovação, Tecnologia e Experiência da UniJorge**.

O portal atual está publicado em:

- `https://portal-nite.vercel.app/`

O código-fonte atual usa:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS;
- GSAP;
- Zod;
- conteúdo em JSON;
- rotas internas de projeto por slug;
- SEO centralizado em `biblioteca/seo.ts`;
- sitemap e robots via App Router;
- testes unitários/e2e já previstos no projeto.

### 0.2 Papel do Portal NITE

O Portal NITE **não deve competir visualmente com o site institucional da UniJorge** e também **não deve copiar seu estilo governamental/institucional tradicional**.

A UniJorge já possui seu próprio site institucional para:

- cursos;
- captação;
- matrícula;
- graduação;
- pós-graduação;
- EAD;
- reputação acadêmica;
- comunicação institucional ampla.

O Portal NITE deve ter outra função:

> Comunicar o NITE como um núcleo vivo de tecnologia aplicada, onde desafios acadêmicos ganham forma como projetos, protótipos, produtos digitais, automações, documentação, oficinas, experimentos e impacto mensurável.

### 0.3 Posicionamento final aprovado

Usar como direção estratégica:

> **O NITE transforma desafios acadêmicos em protótipos, produtos e experiências tecnológicas reais.**

Ou, para hero:

> **Tecnologia aplicada, projetos reais e aprendizagem em movimento.**

A landing deve comunicar:

- tecnologia aplicada;
- projetos reais;
- aprendizado prático;
- movimento contínuo;
- bastidores de criação;
- evolução institucional;
- maturidade visual de produto;
- legitimidade universitária;
- impacto acadêmico.

### 0.4 Risco central a evitar

Não transformar o Portal NITE em um **SaaS fake**.

Isso significa:

- não fingir que o NITE é uma startup global vendendo software;
- não criar dashboards falsos com métricas inventadas;
- não escrever copy genérica de startup;
- não usar “AI-powered”, “workflow”, “scale”, “ship faster” sem conexão real com o núcleo;
- não criar cards bonitos sem evidência concreta;
- não inventar projetos, equipe, resultados ou parceiros;
- não prometer funcionalidades inexistentes;
- não esconder o contexto acadêmico.

A direção correta é:

> **Um núcleo universitário com maturidade visual e operacional de produto.**

---

## 1. Referências visuais e estratégicas

A IA deve estudar as referências abaixo e aplicar apenas os princípios definidos neste documento. Não deve copiar layouts literalmente.

### 1.1 Anthropic

Referência:

- `https://www.anthropic.com/`

Usar como inspiração para:

- postura editorial;
- sobriedade;
- autoridade;
- hero com respiro;
- tipografia forte;
- header limpo;
- navegação espaçada;
- transição da marca no scroll;
- foco em missão e responsabilidade.

Decisão aprovada:

- reproduzir no NITE o princípio do header da Anthropic em que a marca textual completa reduz/colapsa durante o scroll;
- no NITE, a marca deve começar expandida como **wordmark textual com NITE + descriptor UNIJORGE** e colapsar futuramente para a **letra N textual**;
- não usar símbolo circular, ícone decorativo, imagem, PNG ou SVG visual no header antes do texto.

Critério de qualidade:

- a transição precisa parecer premium, suave e intencional;
- não pode causar layout shift;
- o menu não pode “pular” quando a marca colapsa;
- o estado colapsado deve ser reconhecível.

### 1.2 Raycast

Referência:

- `https://www.raycast.com/`

Usar como inspiração para:

- sensação de app;
- modularidade;
- velocidade;
- interface clara;
- cards funcionais;
- microinterações discretas;
- ideia de “um lugar central para acessar ferramentas”.

Aplicação no NITE:

- projetos devem parecer módulos vivos;
- CTAs devem ser diretos;
- áreas do portal devem parecer acionáveis;
- a interface deve ter sensação de produto sem virar produto fictício.

### 1.3 Linear

Referência:

- `https://linear.app/`

Usar como inspiração para:

- organização visual de projetos;
- status;
- progresso;
- operação contínua;
- clareza de fluxo;
- cards com hierarquia forte;
- sensação de sistema vivo.

Aplicação no NITE:

- a seção de projetos deve deixar de ser vitrine genérica;
- cada projeto precisa mostrar status, fase atual, stack, entregáveis, próxima ação e última atualização;
- a landing deve comunicar que o NITE acompanha projetos de ponta a ponta.

### 1.4 Resend

Referência:

- `https://resend.com/`

Usar como inspiração para:

- linguagem developer limpa;
- snippets de código;
- documentação clara;
- blocos técnicos;
- integração entre produto e código;
- interface minimalista e direta.

Aplicação no NITE:

- incluir seção técnica com stack, práticas e snippets demonstrativos quando fizer sentido;
- usar blocos de código como linguagem visual, não como enfeite aleatório;
- mostrar como o NITE constrói: Next.js, TypeScript, IA aplicada, dados, protótipos, documentação, automação.

### 1.5 Síntese aprovada das referências

Aplicar a seguinte síntese:

| Referência | Papel no NITE                                                 |
| ---------- | ------------------------------------------------------------- |
| Anthropic  | Autoridade, sobriedade, missão, header premium e logo morph   |
| Raycast    | Sensação de app, modularidade, atalhos e microinterações      |
| Linear     | Projetos como sistema vivo, status, operação e progresso      |
| Resend     | Camada técnica, snippets, documentação e developer experience |

Frase de direção:

> **Anthropic para autoridade. Raycast para interação. Linear para gestão visual dos projetos. Resend para camada técnica.**

---

## 2. Diretrizes não negociáveis para a IA

A IA deve seguir estas regras durante toda a implementação.

### 2.1 Proibições

- Não entregar apenas troca de textos.
- Não entregar apenas mudanças de cor.
- Não entregar apenas “cards bonitos”.
- Não remover acessibilidade existente.
- Não remover `prefers-reduced-motion`.
- Não usar animações agressivas, longas ou cansativas.
- Não criar conteúdo factual inventado.
- Não adicionar métricas falsas.
- Não indexar páginas placeholder.
- Não esconder que projetos ainda são demonstrativos quando forem demonstrativos.
- Não transformar o NITE em SaaS fake.
- Não substituir planejamento por copy genérica.
- Não deixar TODOs soltos sem motivo.
- Não criar seção sem função narrativa clara.

### 2.2 Obrigatoriedades

- Preservar contexto acadêmico da UniJorge.
- Elevar a experiência visual ao padrão premium definido.
- Implementar header com logo morph inspirado na Anthropic.
- Reorganizar espaçamento do header para parecer premium.
- Redesenhar hero com posicionamento aprovado.
- Redesenhar timeline como scrollytelling/parallax controlado.
- Transformar projetos em sistema vivo, com status e evidências.
- Criar CTAs mais fortes que Instagram.
- Incluir estratégia SEO técnica e editorial.
- Manter performance fluida.
- Manter mobile excelente, não apenas aceitável.
- Rodar validações ao final.

### 2.3 Regra contra genericidade

Toda seção deve responder claramente:

1. O que esta seção comunica?
2. Qual público ela ajuda?
3. Que prova ou ação ela oferece?
4. Como ela reforça o posicionamento do NITE?

Se uma seção não responder essas quatro perguntas, ela não deve existir.

---

## 3. Diagnóstico do estado atual

### 3.1 Pontos fortes atuais

- Identidade escura e tecnológica coerente.
- Azul elétrico conectado ao símbolo do NITE.
- Logo animado forte.
- Base em Next.js App Router.
- Conteúdo separado em JSON.
- Validação de conteúdo com Zod.
- SEO centralizado em `biblioteca/seo.ts`.
- Metadata, Open Graph e Twitter Cards já estruturados.
- JSON-LD inicial para Organization e WebSite.
- Sitemap dinâmico.
- Robots configurado.
- Projeto tem testes e estrutura de qualidade.

### 3.2 Pontos fracos atuais

- Hero ainda comunica de forma genérica.
- Projetos parecem frentes conceituais, não cases vivos.
- Todos os projetos atuais estão com status `placeholder`.
- Timeline é institucional e estática, não uma história em movimento.
- CTAs ainda são fracos para conversão real.
- Instagram recebe peso alto demais como saída final.
- Header parece funcional, mas não premium o suficiente.
- Logo e menu parecem próximos demais.
- A marca do header usa PNG via `BrandMark`, apesar de existir SVG em `public/brand/nite/logo_final.svg`.
- Motion está concentrada no logo principal, não distribuída como linguagem de interface.
- Não há seção forte de processo, stack, changelog real ou participação.
- SEO é tecnicamente bom, mas editorialmente genérico.

### 3.3 Auditoria SEO atual

Arquivos atuais relevantes:

- `biblioteca/seo.ts`
- `biblioteca/site-config.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/layout.tsx`
- `conteudo/projetos/projetos.json`
- `conteudo/linha-do-tempo/eventos.json`

Estado atual identificado:

- `NEXT_PUBLIC_SITE_URL` cai para `http://localhost:3000` quando não configurado.
- Home metadata existe com título e descrição.
- Home usa palavras-chave básicas: NITE, UNIJORGE, inovação, tecnologia, projetos aplicados, educação tecnológica.
- Project metadata existe por projeto.
- Projetos com `status: "placeholder"` recebem `robots: noindex, follow`.
- `getIndexableProjects()` remove placeholders do sitemap.
- Como os três projetos atuais são placeholders, o sitemap tende a indexar apenas a home.
- JSON-LD atual cobre Organization e WebSite.
- Breadcrumb JSON-LD existe para páginas internas.
- Não há schema específico para coleção de projetos, changelog/timeline ou projetos como CreativeWork.
- Não há estratégia explícita de conteúdo por intenção de busca.
- Não há páginas/âncoras com metadata para participação, proposta de projeto ou gestão.
- Não há OG dinâmico por tipo de projeto além da imagem do card.

### 3.4 Decisão SEO

O SEO atual não deve ser descartado. Ele deve ser evoluído.

Manter:

- Metadata API;
- canonical;
- Open Graph;
- Twitter Cards;
- sitemap dinâmico;
- robots;
- noindex para placeholders;
- JSON-LD com escaping seguro;
- BreadcrumbList.

Evoluir:

- conteúdo das metas;
- estrutura de headings;
- schema de projetos;
- OG images por página;
- dados de atualização real;
- páginas indexáveis somente quando houver conteúdo concreto;
- links internos;
- seção de FAQ institucional se houver respostas validadas;
- estratégia de intenção de busca.

---

## 4. Stack e decisões técnicas

### 4.1 Stack atual a preservar

Preservar:

- Next.js App Router;
- TypeScript;
- Tailwind CSS;
- Zod;
- GSAP para animação complexa do logo e cenas especiais;
- estrutura de conteúdo validada;
- testes;
- acessibilidade existente.

### 4.2 Dependência nova obrigatória

Adicionar Motion:

```bash
npm install motion
```

Usar imports assim:

```ts
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
```

Não usar `framer-motion` diretamente.

### 4.3 Divisão de responsabilidades de animação

| Camada                                     | Ferramenta obrigatória                              |
| ------------------------------------------ | --------------------------------------------------- |
| Logo morph no header                       | Motion                                              |
| Reveals de seção                           | Motion                                              |
| Cards, hover, tabs, stagger                | Motion + CSS                                        |
| Timeline scrollytelling/parallax           | GSAP ScrollTrigger ou Motion, conforme complexidade |
| SVG principal cinematográfico já existente | GSAP                                                |
| Estados simples de hover/focus             | CSS/Tailwind                                        |

Regra:

- Motion para microinterações e scroll simples.
- GSAP para cenas especiais, timelines complexas ou pinned sections.

### 4.4 Performance

A IA deve implementar motion com foco em fluidez:

- animar `transform` e `opacity` sempre que possível;
- evitar animar `width`, `height`, `top`, `left` em elementos críticos;
- evitar layout shift;
- usar `will-change` apenas em elementos realmente animados;
- desativar ou simplificar motion com `prefers-reduced-motion`;
- não bloquear LCP com imagens grandes desnecessárias;
- otimizar PNGs pesados;
- preferir AVIF/WebP quando viável;
- revisar `sizes` em imagens com `next/image`;
- não importar GSAP em componentes que não usam GSAP.

---

## 5. Arquitetura de informação final da home

A home deve ser reorganizada nesta ordem:

1. Header premium com logo morph.
2. Hero premium.
3. O que o NITE constrói.
4. Projetos em movimento.
5. Como o NITE funciona.
6. Stack e práticas.
7. Timeline scrollytelling.
8. Changelog / evolução recente.
9. CTAs por público.
10. Footer.

Cada seção deve ter responsabilidade clara.

### 5.1 Header premium

Objetivo:

- parecer mais espaçado, maduro e editorial;
- dar destaque controlado à marca;
- replicar o princípio de colapso da marca visto na Anthropic;
- criar navegação mais premium.

Estado inicial:

```txt
[ NITE ]
[ UNIJORGE ]                                          [ Sobre ] [ Projetos ] [ Processo ] [ Timeline ] [ Participar ]   [ Propor projeto ]
```

Estado após scroll:

```txt
[ N ]                                                 [ Sobre ] [ Projetos ] [ Processo ] [ Timeline ] [ Participar ]   [ Propor projeto ]
```

Requisitos:

- header sticky;
- altura desktop entre `76px` e `88px`;
- altura mobile entre `64px` e `72px`;
- container máximo entre `1120px` e `1240px`;
- logo em slot fixo para evitar deslocamento do menu;
- nav alinhado à direita;
- CTA separado visualmente do menu;
- backdrop blur discreto após scroll;
- borda inferior aparece com mais contraste após scroll;
- estado colapsado da logo textual deve preservar acessibilidade.

Implementação esperada:

- criar `components/layout/site-header.tsx` atualizado ou extrair componentes;
- criar `components/ui/header-logo-morph.tsx`;
- preparar `components/ui/header-logo-morph.tsx` para trabalhar com letras/texto, não com imagem;
- parar de depender do PNG atual no header;
- não usar símbolo circular, imagem ou SVG visual no header.

Critérios de aceite:

- no topo da página, a marca aparece expandida;
- após rolar aproximadamente `72px` a `96px`, o texto da marca desaparece suavemente;
- a letra `N` textual permanece no estado colapsado futuro;
- nav não muda de posição horizontal de forma perceptível;
- não há layout shift;
- em `prefers-reduced-motion`, a mudança deve ser instantânea ou muito simplificada;
- em mobile, usar menu compacto ou reduzir navegação sem sobrepor conteúdo.

### 5.2 Hero premium

Objetivo:

- reposicionar o NITE com clareza;
- reduzir tom genérico;
- mostrar produto/projeto real ou demonstrativo honesto;
- unir identidade tecnológica com legitimidade acadêmica.

Hero copy aprovada:

```txt
Eyebrow:
UNIJORGE / Núcleo de Inovação & Tecnologia

Headline:
Tecnologia aplicada, projetos reais e aprendizagem em movimento.

Subheadline:
O NITE conecta estudantes, professores e gestão para transformar desafios acadêmicos em protótipos, produtos digitais, automações e experiências tecnológicas.

CTAs:
Explorar projetos ativos
Propor um desafio
```

Observação:

- Se ainda não houver projetos ativos reais, o CTA pode ser `Explorar frentes do NITE`, mas a IA deve preferir `Explorar projetos ativos` quando ao menos um projeto tiver conteúdo real e status não-placeholder.

Composição visual:

- esquerda: copy, CTAs, microprovas;
- direita: mockup/painel vivo do NITE;
- fundo escuro com grid sutil e brilho controlado;
- logo principal pode aparecer como elemento visual, mas não deve ser o único protagonista;
- incluir card de projeto/status para aproximar de Linear.

Mockup recomendado:

```txt
Projeto em foco
Software aplicado
Status: em protótipo
Stack: Next.js · TypeScript · IA aplicada
Última atualização: [data real ou “em validação”]
Próximo passo: validação com equipe do núcleo
```

Regra contra fake:

- Se os dados não existirem, usar badge `Demonstrativo` ou `Em estruturação`.
- Não inventar equipe, números, resultados ou entregáveis.

Critérios de aceite:

- hero deve carregar rápido;
- H1 deve ser único na página;
- CTA principal visível acima da dobra em desktop;
- em mobile, copy deve aparecer antes de qualquer elemento visual pesado;
- mockup deve ser legível em desktop e simplificado em mobile;
- motion inicial deve ser sutil e não atrasar interação.

### 5.3 O que o NITE constrói

Substituir a seção genérica “O que é o NITE” por uma seção mais orientada a construção.

Título recomendado:

```txt
O que o NITE constrói
```

Cards obrigatórios:

1. Software aplicado
2. Dados e IA
3. Robótica e prototipagem
4. Experiência digital
5. Automação e processos
6. Oficinas e aprendizagem prática

Cada card deve conter:

- título;
- descrição específica;
- ícone ou símbolo discreto;
- exemplo de saída concreta;
- microinteração no hover.

Exemplo de card:

```txt
Software aplicado
Interfaces, sistemas web e ferramentas digitais para transformar desafios acadêmicos em produtos testáveis.
Saídas: landing pages, dashboards, sistemas internos, protótipos navegáveis.
```

Critérios de aceite:

- não usar descrições abstratas;
- cada card deve mencionar uma saída concreta;
- cards devem usar reveal/stagger discreto;
- design deve parecer premium, não uma grade genérica de benefícios.

### 5.4 Projetos em movimento

Esta deve ser a seção mais importante depois da hero.

Título recomendado:

```txt
Projetos em movimento
```

Descrição recomendada:

```txt
Acompanhe frentes, protótipos e entregas do NITE com contexto, status, stack e próximos passos.
```

Cada card de projeto deve conter obrigatoriamente:

- título;
- status;
- fase atual;
- categoria;
- stack;
- última atualização;
- entregável principal;
- próximo passo;
- indicador se é real, demonstrativo ou em estruturação;
- link para página interna.

Estados permitidos:

```ts
type ProjectStatus =
  | "planejado"
  | "em-descoberta"
  | "em-prototipo"
  | "ativo"
  | "concluido"
  | "placeholder";
```

A IA deve substituir o modelo atual simplificado por um modelo mais operacional.

Schema sugerido:

```ts
type ProjetoNite = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  context: string;
  audience: string[];
  category: string;
  year: number;
  status:
    | "placeholder"
    | "planejado"
    | "em-descoberta"
    | "em-prototipo"
    | "ativo"
    | "concluido";
  currentPhase: string;
  lastUpdated: string;
  nextStep: string;
  coverImage: string;
  alt: string;
  featured: boolean;
  technologies: string[];
  deliverables: Array<{
    type:
      | "demo"
      | "repositorio"
      | "figma"
      | "relatorio"
      | "dashboard"
      | "oficina"
      | "documentacao";
    label: string;
    href?: string;
    status: "disponivel" | "em-validacao" | "interno" | "indisponivel";
  }>;
  metrics: Array<{
    label: string;
    value: string;
    source?: string;
  }>;
  team: Array<{
    name: string;
    role: "estudante" | "professor" | "gestao" | "parceiro" | "equipe";
    public: boolean;
  }>;
  changelog: Array<{
    date: string;
    title: string;
    description: string;
  }>;
  seo: {
    title: string;
    description: string;
  };
  links: Array<{
    label: string;
    href: string;
    type: "externo" | "repositorio" | "documentacao" | "demo" | "figma";
  }>;
};
```

Critérios de aceite:

- se um projeto for placeholder, deve aparecer visualmente como `Em estruturação` ou `Demonstrativo`;
- se um projeto não tiver entregáveis reais, não mostrar link falso;
- páginas placeholder devem continuar `noindex`;
- cards devem parecer próximos da lógica de Linear, mas com linguagem acadêmica;
- o card não deve depender só de imagem; precisa conter dados operacionais.

### 5.5 Como o NITE funciona

Criar seção de processo.

Título recomendado:

```txt
Como o NITE transforma desafios em entregas
```

Etapas obrigatórias:

1. Receber desafio
2. Entender contexto
3. Prototipar solução
4. Validar com usuários/equipe
5. Documentar aprendizado
6. Entregar ou evoluir

Cada etapa deve conter:

- verbo forte;
- descrição curta;
- saída esperada;
- ícone discreto;
- reveal progressivo.

Exemplo:

```txt
01 · Receber desafio
A equipe entende uma demanda acadêmica, institucional ou experimental.
Saída: briefing inicial e critérios de sucesso.
```

Critérios de aceite:

- seção precisa explicar operação do núcleo;
- não usar buzzwords genéricas;
- mostrar processo como algo útil para estudante, professor e gestão.

### 5.6 Stack e práticas

Criar seção com influência de Resend.

Título recomendado:

```txt
Stack, práticas e documentação
```

A seção deve conter:

- cards de tecnologia;
- bloco de código/snippet visual;
- práticas de documentação;
- menção a prototipagem, versionamento, validação e acessibilidade.

Snippet demonstrativo permitido:

```ts
const projeto = {
  frente: "Software aplicado",
  status: "em-prototipo",
  entregavel: "protótipo navegável",
  pratica: "documentar, validar, evoluir",
};
```

Regras:

- snippet deve ser visual e simbólico;
- não fingir ser API real se não existir;
- se usar snippet conceitual, sinalizar como `modelo de trabalho`.

Critérios de aceite:

- seção deve parecer técnica sem excluir público não técnico;
- bloco de código deve ter contraste e legibilidade;
- em mobile, código deve quebrar/rolar sem estourar layout.

### 5.7 Timeline scrollytelling/parallax

Redesenhar a timeline de forma real.

Objetivo:

- transformar a timeline em narrativa rica;
- contar a história do NITE com movimento;
- usar parallax discreto;
- criar sensação fora do comum sem pesar.

Título recomendado:

```txt
A história do NITE em movimento
```

Layout desktop obrigatório:

```txt
[Coluna esquerda sticky]
Eyebrow: Timeline
Título: A história do NITE em movimento
Descrição: Marcos, entregas e aprendizados que mostram a evolução do núcleo.
Indicador visual de progresso

[Coluna direita]
Cards de marcos rolando com parallax discreto
```

Cada marco deve conter:

- ano;
- mês, se houver;
- título;
- descrição;
- categoria;
- evidência;
- impacto;
- relação com projeto, se houver;
- status da fonte: confirmado ou placeholder.

Schema sugerido:

```ts
type TimelineEvent = {
  sequence: number;
  date: string;
  year: number;
  month?: string;
  title: string;
  description: string;
  category: string;
  evidence?: string;
  impact?: string;
  sourceStatus: "placeholder" | "confirmado";
  image?: string;
  alt?: string;
  projectSlug?: string;
};
```

Motion obrigatório:

- progress line vertical;
- cards com reveal suave;
- elementos de fundo com deslocamento leve;
- imagens com parallax entre `6%` e `14%` de deslocamento, nunca exagerado;
- sticky text no desktop;
- fallback vertical simples no mobile;
- desativação/simplificação com `prefers-reduced-motion`.

Critérios de aceite:

- não pode virar efeito cansativo;
- não pode travar scroll;
- não pode usar scroll-jacking agressivo;
- não pode comprometer leitura;
- mobile precisa ficar claro e leve;
- timeline deve contar história, não apenas listar datas.

### 5.8 Changelog / evolução recente

Criar seção separada ou integrada aos projetos.

Objetivo:

- mostrar que o NITE está vivo;
- permitir atualizações periódicas;
- dar base para SEO e credibilidade.

Título recomendado:

```txt
Últimas evoluções
```

Cada item deve conter:

- data;
- título;
- descrição;
- tipo: projeto, oficina, documentação, protótipo, evento, entrega;
- link relacionado se existir.

Regras:

- não inventar atualizações;
- se ainda não houver histórico validado, criar estrutura pronta com conteúdo `Em estruturação`;
- itens placeholder não devem ser indexados como notícias.

Critérios de aceite:

- deve ser fácil adicionar novos itens em JSON/MDX;
- deve aparecer bem em mobile;
- deve ajudar o usuário a perceber evolução real.

### 5.9 CTAs por público

Substituir CTA final centrado em Instagram por CTAs de intenção real.

Título recomendado:

```txt
Escolha como se conectar ao NITE
```

Cards obrigatórios:

1. Sou estudante
   - CTA: `Quero participar do NITE`
2. Sou professor
   - CTA: `Quero propor um desafio`
3. Sou gestor ou parceiro
   - CTA: `Falar com a gestão do núcleo`
4. Quero acompanhar
   - CTA: `Ver projetos ativos` ou `Acompanhar novidades`

Instagram pode continuar no footer ou em card secundário.

Regras:

- Instagram não pode ser o CTA principal da landing;
- CTAs precisam ser claros e específicos;
- se ainda não houver formulário, usar `mailto:` ou link institucional temporário com texto honesto;
- não criar formulário falso sem backend funcional.

Critérios de aceite:

- usuário deve entender qual caminho seguir;
- CTA principal da home não deve depender de rede social;
- seção deve parecer final forte, não rodapé improvisado.

---

## 6. SEO — estratégia final

### 6.1 Objetivo SEO

Fazer o Portal NITE ser encontrado por buscas relacionadas a:

- NITE UniJorge;
- núcleo de inovação UniJorge;
- tecnologia aplicada UniJorge;
- projetos aplicados UniJorge;
- inovação e tecnologia UniJorge;
- robótica educacional UniJorge;
- dados e IA na educação;
- software aplicado em contexto acadêmico;
- projetos de tecnologia universitária em Salvador;
- núcleo de inovação e tecnologia universitário.

### 6.2 Princípios SEO obrigatórios

- Escrever para pessoas primeiro.
- Não fazer keyword stuffing.
- Criar títulos únicos por página.
- Criar meta descriptions específicas.
- Manter canonical por rota.
- Manter noindex para placeholders.
- Indexar somente páginas com conteúdo real, evidência e utilidade.
- Usar headings sem pular hierarquia.
- Usar alt text descritivo e não genérico.
- Usar links internos entre home, projetos e timeline.
- Usar dados estruturados apenas quando representarem o conteúdo real.

### 6.3 Metadata recomendada para home

Título SEO:

```txt
NITE UniJorge | Tecnologia aplicada e projetos reais
```

Meta description:

```txt
Conheça o NITE UniJorge, núcleo de inovação, tecnologia e experiência que transforma desafios acadêmicos em protótipos, projetos digitais e aprendizagem prática.
```

H1:

```txt
Tecnologia aplicada, projetos reais e aprendizagem em movimento.
```

Keywords editoriais de apoio:

- NITE UniJorge;
- núcleo de inovação UniJorge;
- tecnologia aplicada;
- projetos acadêmicos de tecnologia;
- software aplicado;
- robótica educacional;
- dados e IA;
- aprendizagem prática;
- inovação universitária.

### 6.4 Metadata de páginas de projeto

Cada projeto real deve ter:

- `title` entre 45 e 60 caracteres;
- `description` entre 120 e 160 caracteres;
- canonical;
- Open Graph específico;
- Twitter Card específico;
- JSON-LD específico;
- breadcrumb;
- data de atualização real.

Exemplo:

```json
{
  "title": "Software aplicado no NITE UniJorge",
  "description": "Veja como o NITE UniJorge desenvolve protótipos, interfaces e soluções web para transformar desafios acadêmicos em projetos digitais reais."
}
```

### 6.5 Dados estruturados

Manter:

- `Organization`;
- `WebSite`;
- `BreadcrumbList`.

Adicionar quando houver conteúdo suficiente:

- `CollectionPage` para seção/página de projetos;
- `ItemList` para lista de projetos;
- `CreativeWork` para projeto acadêmico/protótipo;
- `SoftwareSourceCode` somente quando houver repositório público real;
- `Event` somente para oficinas/eventos reais com data, local e descrição;
- `FAQPage` somente se houver perguntas e respostas reais, aprovadas e úteis.

Não adicionar schema falso.

### 6.6 Open Graph

Implementar ou revisar:

- `app/opengraph-image.tsx` para imagem dinâmica da home;
- OG específico para projeto quando houver conteúdo real;
- imagem 1200x630;
- alt descritivo;
- título curto;
- evitar poluir imagem com muito texto.

Direção visual do OG:

- fundo preto;
- símbolo NITE;
- azul elétrico discreto;
- título da página;
- assinatura `NITE UniJorge`.

### 6.7 Sitemap

Manter sitemap dinâmico.

Regras:

- home sempre indexável;
- projetos placeholder não entram no sitemap;
- projetos reais entram no sitemap;
- cada item deve ter `lastModified` real;
- usar `lastUpdated` por item, não apenas `siteConfig.lastUpdated` global.

Alteração recomendada:

- adicionar `lastUpdated` em projetos e timeline/changelog;
- ajustar `app/sitemap.ts` para usar a data específica da página quando existir.

### 6.8 Robots

Manter:

```txt
User-agent: *
Allow: /
Sitemap: https://portal-nite.vercel.app/sitemap.xml
```

Garantir:

- `NEXT_PUBLIC_SITE_URL=https://portal-nite.vercel.app` em produção;
- nenhum canonical deve apontar para localhost.

### 6.9 Conteúdo indexável mínimo por projeto

Um projeto só pode sair de `placeholder` quando tiver pelo menos:

- problema/contexto claro;
- descrição específica;
- status real;
- stack real;
- última atualização real;
- ao menos um entregável real ou evidência real;
- próximos passos;
- alt text da imagem;
- metadata SEO única;
- página interna sem copy genérica.

Se não cumprir, manter `placeholder` e `noindex`.

---

## 7. Componentes novos obrigatórios

Criar ou adaptar componentes:

```txt
components/layout/site-header.tsx
components/ui/header-logo-morph.tsx
components/ui/nite-symbol.tsx
components/sections/hero-section.tsx
components/sections/builds-section.tsx
components/sections/project-status-card.tsx
components/sections/projects-operating-section.tsx
components/sections/process-section.tsx
components/sections/stack-section.tsx
components/sections/timeline-scrollytelling.tsx
components/sections/changelog-section.tsx
components/sections/audience-cta-section.tsx
components/ui/reveal.tsx
components/ui/stagger-group.tsx
components/ui/code-snippet.tsx
components/ui/metric-card.tsx
components/ui/status-badge.tsx
```

Regras:

- componentes devem ser pequenos e reutilizáveis;
- não colocar toda a home em `app/page.tsx`;
- `app/page.tsx` deve apenas compor seções;
- componentes com hooks de motion devem usar `"use client"` apenas quando necessário;
- manter Server Components quando possível.

---

## 8. Milestones e tarefas com checkboxes

## Milestone 0 — Preparação, limpeza e baseline técnico

Objetivo: garantir que o projeto está pronto para uma implementação profissional.

Status: aprovado em 2026-05-09 por confirmação humana explícita. A configuração/verificação de `NEXT_PUBLIC_SITE_URL` na Vercel permanece documentada como pendência externa por falta de credenciais locais.

- [x] Remover `node_modules`, `.next`, caches e artefatos de screenshot do pacote/repositório se estiverem versionados ou incluídos indevidamente.
- [x] Confirmar que `.gitignore` cobre `node_modules`, `.next`, coverage, artifacts e caches.
- [x] Rodar `npm ci` em ambiente limpo.
- [x] Rodar `npm run typecheck`.
- [x] Rodar `npm run lint`.
- [x] Rodar `npm run test`.
- [x] Rodar `npm run build`.
- [x] Registrar erros existentes antes de alterar código.
- [ ] Configurar `NEXT_PUBLIC_SITE_URL=https://portal-nite.vercel.app` no ambiente de produção. Bloqueado localmente por ausência de credenciais/projeto Vercel.
- [x] Adicionar `motion` ao projeto com `npm install motion`.
- [x] Confirmar que GSAP continua funcionando após instalação.

Definition of Done:

- projeto instala em ambiente limpo;
- scripts principais rodam ou falhas são documentadas;
- baseline técnico está registrado;
- nenhuma task visual começa antes desta etapa.

---

## Milestone 1 — Design tokens e marca SVG

Objetivo: preparar a base visual premium sem depender de PNG no header.

Status: aprovado em 2026-05-09 por confirmação humana explícita, após correção pontual para restaurar o background neutro e manter o header textual sem símbolo, imagem, PNG ou SVG visual.

- [x] Auditar `public/brand/nite/logo_final.svg`.
- [x] Otimizar SVG com SVGO ou processo equivalente.
- [x] Criar versão compacta do símbolo para header. Após a correção pontual, o símbolo fica apenas como asset/componente preparado, sem uso visual no header.
- [x] Criar `NiteSymbol` como componente ou imagem SVG otimizada.
- [x] Atualizar `biblioteca/brand.ts` para apontar para ativos corretos.
- [x] Definir tokens de cor no Tailwind/CSS.
- [x] Garantir que azul elétrico seja usado como acento, não como ruído visual permanente.
- [x] Definir tokens de motion: duração curta, média, easing e stagger.
- [x] Definir tokens de superfície: background, card, panel, border, glow.

Tokens recomendados:

```txt
Background principal: #03070D
Surface escura: #07111B
Surface elevada: #0B1622
Foreground: #F4F8FB
Muted: #8AA3B5
Electric cyan: #33D4FF
Electric blue: #299DFF
Border cyan soft: rgba(51, 212, 255, 0.14)
Glow cyan: rgba(51, 212, 255, 0.18)
```

Motion tokens:

```txt
Reveal duration: 0.55s a 0.75s
Micro hover: 0.18s a 0.28s
Header logo collapse range: 0px a 96px de scroll
Parallax range: 6% a 14%
Easing: cubic-bezier(0.22, 1, 0.36, 1)
```

Definition of Done:

- header não depende mais de PNG grande;
- símbolo compacto está pronto;
- tokens visuais existem e são reutilizáveis;
- identidade continua fiel ao NITE.

---

## Milestone 2 — Header premium com logo morph

Objetivo: implementar o comportamento validado inspirado na Anthropic.

Status: aprovado em 2026-05-09 por confirmação humana explícita, após validação visual do header, logo morph, transparência, borda sutil e comportamento no scroll.

O header deve seguir o princípio visual da Anthropic: marca textual limpa que colapsa no scroll. A marca não deve usar ícone circular, símbolo decorativo ou imagem. O efeito futuro deve acontecer nas letras, não em uma imagem.

- [x] Reestruturar header com grid ou flex de alta qualidade.
- [x] Garantir slot fixo para logo/marca.
- [x] Separar nav e CTA em grupos visuais distintos.
- [x] Criar `HeaderLogoMorph` com Motion.
- [x] Usar `useScroll` e `useTransform` para colapso da marca.
- [x] Implementar estado expandido: wordmark textual com `NITE` + descriptor `UNIJORGE`.
- [x] Implementar estado colapsado: letra `N` textual.
- [x] Garantir que o header nao use símbolo circular, imagem, PNG, SVG visual ou ícone antes do texto.
- [x] Fazer o efeito futuro acontecer nas letras, não em uma imagem.
- [x] Aplicar blur/borda no header após scroll.
- [x] Garantir que nav não pula horizontalmente.
- [x] Implementar fallback com `useReducedMotion`.
- [x] Ajustar header mobile.
- [x] Atualizar labels ARIA.
- [x] Testar teclado/focus.

Especificação de espaçamento:

```txt
Desktop:
- Header min-height: 80px
- Container max-width: 1180px ou 1240px
- Logo slot: 220px a 260px
- Gap menu: 28px a 36px
- Gap menu -> CTA: 24px a 32px

Mobile:
- Header min-height: 64px a 72px
- Mostrar `NITE` + `UNIJORGE` ou apenas `N` textual conforme espaço
- Não sobrepor conteúdo
```

Definition of Done:

- comportamento de logo morph funciona;
- espaçamento parece premium;
- header é estável e acessível;
- não há layout shift perceptível.

---

## Milestone 3 — Hero premium reposicionada

Objetivo: reorganizar a primeira dobra como uma abertura editorial premium do NITE, com nova copy, CTAs, hierarquia tipográfica forte e integração limpa do logo cinematográfico existente.

Status: aprovado em 2026-05-09 por confirmação humana explícita, após validação visual da hero premium, headline reposicionada, fundo preto preservado, grid/scanline restaurados e remoção das microprovas.

Este milestone **não** é responsável por criar interface operacional, painel, dashboard, card de projeto ou visual de sistema. Ele também não deve tentar representar status, stack, fase, categoria, última atualização ou próximos passos de projetos. Essas responsabilidades pertencem ao **Milestone 5 — Projetos em movimento**.

A responsabilidade do Milestone 3 é limitada a:

- organizar a primeira dobra;
- fortalecer a mensagem;
- melhorar a hierarquia visual;
- integrar o logo cinematográfico de forma limpa;
- garantir que a headline quebre bem;
- preparar a hero como capa editorial premium da landing.

### Responsabilidade narrativa

A hero deve responder imediatamente:

```txt
O que é o NITE e por que isso importa?
```

A hero não deve responder:

```txt
Qual é o status operacional de uma frente ou projeto específico?
```

A hero deve parecer:

```txt
capa de um núcleo acadêmico-tecnológico moderno, sério e premium
```

A hero não deve parecer:

```txt
dashboard SaaS
painel administrativo
card operacional
interface de produto fictícia
template de startup
```

### Tarefas obrigatórias

- [x] Extrair hero para `components/sections/hero-section.tsx`.
- [x] Atualizar `app/page.tsx` para apenas compor a nova `HeroSection`.
- [x] Substituir headline atual pela headline aprovada.
- [x] Substituir subheadline atual pela subheadline aprovada.
- [x] Atualizar CTAs principais.
- [x] Remover microprovas abaixo dos CTAs.
- [x] Reorganizar grid, largura, espaçamento e hierarquia da primeira dobra.
- [x] Controlar a quebra visual da headline no desktop.
- [x] Preservar o `AnimatedNiteLogo` existente.
- [x] Reposicionar o `AnimatedNiteLogo` como visual de apoio integrado, sem poluir a marca.
- [x] Reduzir a dependência visual do logo como único protagonista por meio de copy, hierarquia e CTAs mais fortes.
- [x] Implementar reveal inicial discreto com Motion, se necessário.
- [x] Garantir LCP saudável.
- [x] Garantir versão mobile forte, com copy antes do visual pesado.

### Copy obrigatória

Eyebrow:

```txt
UNIJORGE / Núcleo de Inovação & Tecnologia
```

Headline:

```txt
Tecnologia aplicada, projetos reais e aprendizagem em movimento.
```

Subheadline:

```txt
O NITE conecta estudantes, professores e gestão para transformar desafios acadêmicos em protótipos, produtos digitais, automações e experiências tecnológicas reais.
```

CTAs obrigatórios:

```txt
Primário: Explorar frentes do NITE
Secundário: Propor um desafio
```

Destinos obrigatórios:

```txt
Explorar frentes do NITE -> #projetos
Propor um desafio -> #contato
```

Microprovas:

```txt
Removidas da hero para manter a primeira dobra mais limpa, editorial e menos genérica.
```

### Composição visual obrigatória

Desktop:

```txt
[Coluna esquerda]
Eyebrow
Headline
Subheadline
CTAs

[Coluna direita]
AnimatedNiteLogo existente
Glow sutil
Grid/fundo já existente
Profundidade visual controlada
Nenhuma UI operacional
```

Regras de composição:

- a coluna esquerda deve ter largura suficiente para a headline respirar;
- a coluna direita deve ser uma área visual de identidade, não uma área de dados;
- o `AnimatedNiteLogo` pode ter presença forte, mas deve estar integrado à composição;
- o logo não deve ser usado como suporte para cards, molduras, badges ou interfaces;
- a hero deve ficar mais editorial, limpa e premium, não mais cheia;
- o visual deve se aproximar da sobriedade da Anthropic: tipografia forte, respiro, clareza e confiança.

Permitido na área visual direita:

- `AnimatedNiteLogo`;
- glow radial discreto;
- halo elétrico controlado;
- grid de fundo já existente;
- linhas abstratas muito sutis;
- sombra/profundidade leve;
- ajustes de tamanho, alinhamento e espaçamento do logo.

Proibido na área visual direita:

- card;
- painel;
- dashboard;
- mockup operacional;
- interface fictícia;
- badge;
- status;
- chips de stack;
- categoria;
- última atualização;
- próximo passo;
- métricas;
- dados de projeto;
- cards dentro da logo;
- cards atrás da logo;
- cards sobrepostos à logo;
- moldura complexa envolvendo a logo;
- qualquer UI que pareça produto fictício ou SaaS fake.

### Regra sobre cards

Cards não pertencem ao Milestone 3.

Cards entram em milestones posteriores:

```txt
Milestone 4 -> cards de frentes do NITE
Milestone 5 -> cards operacionais de projetos
Milestone 6 -> cards/etapas de processo
Milestone 10 -> cards por público
```

No Milestone 3, não criar card novo na hero.

### Regra sobre dados de projeto

A hero não deve consumir dados de projeto.

Proibido:

- `focusProject`;
- prop de projeto na `HeroSection`;
- leitura de `featuredProjects` para montar visual da hero;
- status de projeto;
- stack de projeto;
- categoria de projeto;
- última atualização;
- próximo passo;
- badge `Em estruturação`;
- badge `Demonstrativo`;
- badge `Em protótipo`.

Dados de projeto, status, stack, entregáveis e próximos passos pertencem ao Milestone 5.

### Quebra da headline

A headline deve permanecer exatamente:

```txt
Tecnologia aplicada, projetos reais e aprendizagem em movimento.
```

No desktop, não permitir que palavras pequenas fiquem isoladas.

Quebras rejeitadas:

```txt
Tecnologia aplicada,
projetos reais
e
aprendizagem
em
movimento.
```

Quebras desejadas:

```txt
Tecnologia aplicada,
projetos reais e
aprendizagem em movimento.
```

ou:

```txt
Tecnologia aplicada,
projetos reais e aprendizagem
em movimento.
```

Ajustar para isso:

- largura da coluna esquerda;
- `max-width` do H1;
- `font-size`;
- `line-height`;
- grid;
- gap entre colunas;
- responsividade.

Não usar `<br>` fixo se isso prejudicar mobile. Preferir controle por largura, `clamp()` e classes responsivas.

### Motion

Motion permitido somente para reveal discreto da hero.

Permitido:

```ts
import { motion, useReducedMotion } from "motion/react";
```

Não usar:

```ts
framer - motion;
```

Não criar:

- parallax;
- scroll-jacking;
- animação de cards;
- animação sobreposta à logo;
- mudanças no header morph;
- mudanças no GSAP cinematográfico do logo.

`prefers-reduced-motion` deve ser respeitado.

### Arquivos permitidos

Pode alterar somente se necessário:

```txt
app/page.tsx
components/sections/hero-section.tsx
components/ui/reveal.tsx
tests/unit/home-page.test.tsx
tests/e2e/home.spec.ts
documentacao/baseline-m3.md
```

Não alterar:

- header;
- logo morph;
- cards de projeto;
- seção de projetos;
- timeline;
- schema de projetos;
- JSON de projetos;
- SEO/metadata;
- `logo_final.svg`;
- hook GSAP cinematográfico;
- `AGENTS.md`;
- `specs_svg.md`.

### Testes obrigatórios

Atualizar testes para garantir:

- [x] existe apenas um H1 na home;
- [x] H1 contém exatamente `Tecnologia aplicada, projetos reais e aprendizagem em movimento.`;
- [x] CTA primário `Explorar frentes do NITE` existe;
- [x] CTA primário aponta para `#projetos`;
- [x] CTA secundário `Propor um desafio` existe;
- [x] CTA secundário aponta para `#contato`;
- [x] microprova `Projetos aplicados` não existe na hero;
- [x] microprova `Aprendizagem prática` não existe na hero;
- [x] microprova `Tecnologia responsável` não existe na hero;
- [x] hero não contém `Demonstrativo`;
- [x] hero não contém `Em estruturação`;
- [x] hero não contém `Em protótipo`;
- [x] hero não contém `Status`;
- [x] hero não contém `Categoria`;
- [x] hero não contém `Stack`;
- [x] hero não contém `Última atualização`;
- [x] hero não contém `Próximo passo`;
- [x] hero não contém painel operacional;
- [x] hero não contém dashboard;
- [x] hero não contém card novo;
- [x] `AnimatedNiteLogo` continua presente;
- [x] header do Milestone 2 continua funcionando;
- [x] não há scroll horizontal em 390px;
- [x] mobile exibe copy antes do visual pesado.

### Validação obrigatória

Rodar e registrar em `documentacao/baseline-m3.md`:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

Registrar no baseline:

- arquivos alterados;
- comandos executados;
- resultados;
- screenshots desktop e mobile;
- confirmação de que não houve painel, card, dashboard ou status na hero;
- confirmação de que o header não foi alterado;
- confirmação de que `logo_final.svg` não foi alterado;
- confirmação de que o GSAP cinematográfico não foi alterado;
- confirmação de que `framer-motion` não foi usado.

Definition of Done:

- hero comunica imediatamente o novo posicionamento;
- hero funciona como capa editorial premium do NITE;
- hero não cria UI operacional fictícia;
- hero não parece SaaS fake;
- hero não contém cards, painel, dashboard, status ou dados de projeto;
- CTAs são claros;
- hero permanece limpa, sem microprovas genéricas abaixo dos CTAs;
- headline tem quebra visual boa no desktop;
- `AnimatedNiteLogo` está integrado de forma limpa;
- mobile tem leitura excelente;
- acessibilidade e reduced motion são preservados.

---

## Milestone 4 — Seção “O que o NITE constrói”

Objetivo: substituir abstração por saídas concretas.

- [x] Criar `BuildsSection`.
- [x] Remover ou reescrever seção genérica antiga.
- [x] Implementar seis cards obrigatórios.
- [x] Cada card deve ter saída concreta.
- [x] Adicionar reveal/stagger discreto.
- [x] Garantir contraste e legibilidade.
- [x] Evitar ícones genéricos sem função.

Cards obrigatórios:

- [x] Software aplicado
- [x] Dados e IA
- [x] Robótica e prototipagem
- [x] Experiência digital
- [x] Automação e processos
- [x] Oficinas e aprendizagem prática

Definition of Done:

- seção mostra o que o núcleo constrói;
- cada card é específico;
- não há frases vazias.

---

## Milestone 5 — Projetos em movimento

Objetivo: transformar projetos em sistema vivo.

- [x] Atualizar schema de projetos em `biblioteca/esquemas.ts`.
- [x] Atualizar conteúdo em `conteudo/projetos/projetos.json`.
- [x] Atualizar loaders em `biblioteca/conteudo.ts` se necessário (não houve alteração necessária).
- [x] Criar `ProjectStatusCard`.
- [x] Criar `ProjectsOperatingSection`.
- [x] Mostrar status, fase, stack, última atualização, entregável e próximo passo.
- [x] Diferenciar visualmente placeholder, planejado, protótipo, ativo e concluído.
- [x] Atualizar páginas internas de projeto.
- [x] Manter noindex para placeholder.
- [x] Adicionar empty states honestos.
- [x] Não inventar equipe, entregáveis ou métricas.

Definition of Done:

- cards parecem vivos e operacionais;
- páginas internas têm estrutura de case;
- dados são validados por Zod;
- placeholders são honestos e não indexados.

---

## Milestone 6 — Processo do NITE

Objetivo: explicar como o núcleo transforma desafio em entrega.

- [ ] Criar `ProcessSection`.
- [ ] Implementar seis etapas obrigatórias.
- [ ] Cada etapa deve ter saída esperada.
- [ ] Usar visual de fluxo, linha ou cards numerados.
- [ ] Adicionar motion discreto.
- [ ] Garantir compreensão para público não técnico.

Etapas:

- [ ] Receber desafio
- [ ] Entender contexto
- [ ] Prototipar solução
- [ ] Validar com usuários/equipe
- [ ] Documentar aprendizado
- [ ] Entregar ou evoluir

Definition of Done:

- seção responde como o NITE opera;
- linguagem é concreta;
- visual não é genérico.

---

## Milestone 7 — Stack, práticas e documentação

Objetivo: adicionar camada técnica inspirada em Resend.

- [ ] Criar `StackSection`.
- [ ] Criar `CodeSnippet`.
- [ ] Mostrar tecnologias atuais e práticas.
- [ ] Incluir snippet conceitual como modelo de trabalho.
- [ ] Sinalizar quando snippet for demonstrativo.
- [ ] Garantir rolagem horizontal segura para código em mobile.
- [ ] Não fingir API real.

Conteúdo mínimo:

- [ ] Next.js / React
- [ ] TypeScript
- [ ] UI responsiva
- [ ] Dados e IA aplicada
- [ ] Prototipagem
- [ ] Documentação
- [ ] Validação
- [ ] Acessibilidade

Definition of Done:

- seção parece técnica e elegante;
- não exclui público não técnico;
- reforça que o NITE constrói com método.

---

## Milestone 8 — Timeline scrollytelling/parallax

Objetivo: redesenhar timeline como experiência narrativa.

- [ ] Atualizar schema da timeline.
- [ ] Atualizar conteúdo da timeline com campos de evidência e impacto.
- [ ] Criar `TimelineScrollytelling`.
- [ ] Implementar coluna sticky no desktop.
- [ ] Implementar cards roláveis à direita.
- [ ] Implementar progress line.
- [ ] Implementar parallax leve em imagens/fundos.
- [ ] Usar GSAP ScrollTrigger se houver pin/scrub complexo.
- [ ] Usar Motion se forem reveals/parallax simples.
- [ ] Implementar fallback mobile sem pinning pesado.
- [ ] Implementar `prefers-reduced-motion`.
- [ ] Garantir que o scroll natural não seja sequestrado.

Definition of Done:

- timeline parece uma história em movimento;
- parallax é perceptível, mas discreto;
- não há travamento;
- mobile está limpo;
- conteúdo é honesto.

---

## Milestone 9 — Changelog / últimas evoluções

Objetivo: mostrar vida contínua do núcleo.

- [ ] Criar schema de changelog ou reaproveitar timeline com tipo específico.
- [ ] Criar `ChangelogSection`.
- [ ] Criar conteúdo inicial honesto.
- [ ] Não inventar eventos.
- [ ] Se necessário, usar estado `Em estruturação`.
- [ ] Preparar o conteúdo para atualização recorrente.

Tipos permitidos:

- projeto;
- oficina;
- documentação;
- protótipo;
- evento;
- entrega;
- validação.

Definition of Done:

- existe uma área clara para evolução recente;
- conteúdo pode crescer sem refatoração;
- não há notícia falsa.

---

## Milestone 10 — CTAs por público

Objetivo: substituir Instagram como CTA principal por ações úteis.

- [ ] Criar `AudienceCtaSection`.
- [ ] Criar cards por público.
- [ ] Definir links temporários honestos se não houver formulário.
- [ ] Manter Instagram no footer ou como canal secundário.
- [ ] Garantir CTAs acima do rodapé.

Cards obrigatórios:

- [ ] Sou estudante → Quero participar do NITE
- [ ] Sou professor → Quero propor um desafio
- [ ] Sou gestor ou parceiro → Falar com a gestão do núcleo
- [ ] Quero acompanhar → Ver projetos ativos / Acompanhar novidades

Definition of Done:

- CTA final é forte;
- usuário sabe o que fazer;
- Instagram não domina a conversão.

---

## Milestone 11 — SEO técnico e editorial

Objetivo: evoluir SEO sem perder honestidade editorial.

- [ ] Atualizar `biblioteca/seo.ts` com nova metadata da home.
- [ ] Garantir canonical absoluto correto.
- [ ] Garantir `NEXT_PUBLIC_SITE_URL` de produção.
- [ ] Atualizar `siteConfig.description`.
- [ ] Adicionar `lastUpdated` por projeto.
- [ ] Atualizar sitemap para usar datas por página.
- [ ] Criar JSON-LD de `CollectionPage`/`ItemList` para projetos quando aplicável.
- [ ] Criar JSON-LD de `CreativeWork` para projeto real quando aplicável.
- [ ] Manter placeholders como `noindex`.
- [ ] Criar OG dinâmico da home.
- [ ] Criar OG por projeto se houver conteúdo real.
- [ ] Revisar alt text das imagens.
- [ ] Revisar headings da home.
- [ ] Adicionar links internos entre seções.
- [ ] Não usar keyword stuffing.

Definition of Done:

- SEO técnico continua funcionando;
- metadata é mais específica;
- placeholders não entram no Google;
- dados estruturados representam conteúdo real.

---

## Milestone 12 — Performance, acessibilidade e QA

Objetivo: garantir que a experiência premium seja fluida.

- [ ] Rodar `npm run typecheck`.
- [ ] Rodar `npm run lint`.
- [ ] Rodar `npm run test`.
- [ ] Rodar `npm run build`.
- [ ] Rodar testes e2e com Playwright.
- [ ] Testar desktop grande.
- [ ] Testar notebook 1366px.
- [ ] Testar tablet.
- [ ] Testar mobile 390px.
- [ ] Testar navegação por teclado.
- [ ] Testar `prefers-reduced-motion`.
- [ ] Testar foco visível.
- [ ] Testar contraste.
- [ ] Validar sem horizontal scroll.
- [ ] Validar LCP da hero.
- [ ] Validar imagens otimizadas.
- [ ] Ativar ou preparar Vercel Speed Insights se aprovado.
- [ ] Documentar qualquer limitação restante.

Definition of Done:

- build passa;
- motion é fluido;
- acessibilidade não regrediu;
- mobile é excelente;
- a landing parece premium e honesta.

---

## 9. Critérios globais de aceite

A implementação só está concluída quando todos os itens abaixo forem verdadeiros.

- [ ] A landing não parece uma subpágina institucional comum da UniJorge.
- [ ] A landing não parece SaaS fake.
- [ ] A landing parece um núcleo acadêmico com maturidade de produto.
- [ ] Header tem espaçamento premium.
- [ ] Header tem logo morph funcional.
- [ ] Hero tem novo posicionamento aprovado.
- [ ] Projetos parecem vivos, com status e próximos passos.
- [ ] Timeline tem scrollytelling/parallax controlado.
- [ ] CTAs são mais fortes que Instagram.
- [ ] SEO foi evoluído tecnicamente e editorialmente.
- [ ] Placeholders continuam honestos e noindex.
- [ ] Performance continua fluida.
- [ ] Mobile é tratado como experiência principal, não adaptação secundária.
- [ ] Acessibilidade é preservada.
- [ ] O projeto compila.
- [ ] Código está organizado em componentes.

---

## 10. Prompt operacional para a LLM implementadora

Use este prompt como instrução direta para a IA que executará as alterações:

```txt
Você está implementando o redesenho premium do Portal NITE UniJorge. Siga integralmente o arquivo specs.md. Não simplifique a entrega. Não entregue apenas mudanças cosméticas. Não crie conteúdo factual inventado. Não transforme o NITE em SaaS fake. Preserve o contexto acadêmico e implemente a experiência como um núcleo universitário com maturidade visual de produto.

Antes de alterar código, leia:
- app/page.tsx
- components/layout/site-header.tsx
- components/ui/brand-mark.tsx
- biblioteca/brand.ts
- biblioteca/seo.ts
- biblioteca/site-config.ts
- biblioteca/esquemas.ts
- biblioteca/conteudo.ts
- conteudo/projetos/projetos.json
- conteudo/linha-do-tempo/eventos.json

Implemente por milestones. Ao final de cada milestone, valide visualmente e tecnicamente. Use Motion para logo morph e microinterações. Use GSAP apenas para cenas especiais como timeline scrollytelling se necessário. Mantenha reduced motion. Mantenha noindex para placeholders. Execute typecheck, lint, test e build ao final.
```

---

## 11. Referências técnicas pesquisadas

Use estas referências como base técnica. Não copie trechos; aplique os princípios.

### Design/produto

- Anthropic: `https://www.anthropic.com/`
- Raycast: `https://www.raycast.com/`
- Linear: `https://linear.app/`
- Resend: `https://resend.com/`

### Motion

- Motion React useScroll: `https://motion.dev/docs/react-use-scroll`
- Motion React scroll animations: `https://motion.dev/docs/react-scroll-animations`
- Motion React useTransform: `https://motion.dev/docs/react-use-transform`
- GSAP ScrollTrigger: `https://gsap.com/docs/v3/Plugins/ScrollTrigger/`
- CSS scroll-driven animations: `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations`

### SEO

- Google SEO Starter Guide: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Google Structured Data: `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- Google meta tags supported: `https://developers.google.com/search/docs/crawling-indexing/special-tags`
- Google snippets/meta descriptions: `https://developers.google.com/search/docs/appearance/snippet`
- Next.js Metadata and OG images: `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
- Next.js Metadata API learning: `https://nextjs.org/learn/dashboard-app/adding-metadata`

---

## 12. Observações finais

Este redesenho deve ser implementado como evolução real do produto, não como maquiagem visual.

A estética premium só será válida se vier acompanhada de:

- conteúdo mais concreto;
- projetos com status;
- timeline com evidência;
- CTAs úteis;
- SEO honesto;
- performance fluida;
- acessibilidade;
- linguagem acadêmica sem rigidez institucional.

Direção final:

> **Menos vitrine institucional. Mais sistema vivo de projetos aplicados da UniJorge.**
