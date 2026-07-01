# Hero animado do catálogo de projetos

## Objetivo

Redesenhar a primeira dobra de `/projetos` como um palco técnico para o
catálogo. O hero usará uma grade animada em canvas inspirada no comportamento
observado na página de e-mails transacionais da Resend em 1º de julho de 2026.
O painel real de busca e filtros ocupará o papel de interface em primeiro plano.

A referência externa é apenas um registro visual e técnico da data da
inspeção. A implementação não dependerá do site da Resend e continuará estável
caso a referência mude.

## Direção aprovada

A direção escolhida é `Palco do catálogo`:

1. o título e a descrição atuais ficam centralizados sobre a animação;
2. o canvas ocupa somente o hero;
3. o painel real de busca e filtros cruza a borda inferior do hero;
4. os resultados continuam no fluxo normal abaixo do painel;
5. nenhum texto, dado ou comportamento do catálogo é substituído.

O hero mantém:

- rótulo `Explorer`;
- título `Projetos`;
- descrição `Encontre iniciativas, pesquisas, protótipos e soluções do NITE.`;
- metadados e dados estruturados atuais da rota.

## Paleta

O fundo pertence ao design system do NITE:

- a seção usa `data-nite-scene="inverse"`;
- o fundo é `var(--nite-background)`, resolvido como `#09090A` na cena;
- o canvas permanece transparente para não duplicar ou divergir desse token.

A animação usa a paleta observada na referência, conforme aprovação explícita:

- luz teal: `#2DCFBF`;
- grade: `rgba(170, 170, 170, 0.10)`;
- trilhas: `rgba(255, 255, 255, 0.50)`;
- nós: `rgba(255, 255, 255, 1)`;
- pulsos: branco com opacidade variável até `0.30`.

O teal fica restrito ao hero. Ele não substitui os tokens de marca usados em
links, estados, foco, cards ou outras páginas.

## Composição

### Hero

O hero ocupa aproximadamente `90svh`, limitado a `42rem`, descontando o
header. A altura poderá crescer no mobile somente quando necessário para evitar
sobreposição entre título, descrição e painel.

As camadas, do fundo para a frente, são:

1. fundo `var(--nite-background)`;
2. canvas com grade e trilhas;
3. máscara radial que reduz a animação nas bordas;
4. luz teal central feita com gradiente CSS e `mix-blend-mode`;
5. conteúdo textual;
6. painel de busca e filtros sobreposto à base.

Não serão usados os arquivos `light.png`, `noise.png`,
`screenshot-emails.png`, fontes ou outros ativos da Resend.

### Conteúdo

O conteúdo fica centralizado, com largura de leitura limitada. A tipografia
continua usando Sora, Geist e Geist Mono. Não será introduzida uma serifa para
imitar a referência.

O título terá contraste sólido; não haverá texto teal em grandes áreas. O teal
aparece na luz central e em pontos curtos da animação.

### Painel de filtros

O painel atual de pesquisa, filtros, ordenação, contagem e limpeza permanece
interativo e ligado ao mesmo estado. Ele será puxado para cima por margem
negativa e receberá `data-nite-scene="inverse"` para parecer parte do hero,
inclusive quando o restante da página estiver em modo claro.

O painel substitui visualmente a captura de produto da referência. Não haverá
imagem simulando uma interface.

Os cards de resultado permanecem abaixo, no tema atual da página, sem mudança
de conteúdo, status, links, imagens ou ordem editorial.

## Canvas 2D

### Componente

Um componente cliente isolado, `ProjectsHeroCanvas`, será responsável apenas
pela decoração. Ele não conhecerá projetos, filtros ou rotas.

Contrato:

- renderiza um `<canvas aria-hidden="true">`;
- expõe um marcador estável `data-projects-hero-canvas`;
- ocupa todo o wrapper do hero;
- não recebe foco nem eventos de ponteiro;
- mantém um fallback visual estático no próprio wrapper.

### Desenho

A animação reproduz o princípio observado na referência:

- grade ortogonal com passo base de `20px`;
- sete trilhas iniciadas em posições aleatórias dentro de um anel central;
- cada trilha escolhe movimentos para cima, direita, baixo ou esquerda;
- uma trilha não reutiliza imediatamente pontos já visitados;
- o início recebe um pequeno nó quadrado;
- a cauda perde opacidade por gradiente;
- pulsos ocasionais expandem ao redor do nó;
- trilhas desvanecem e reiniciam sem limpar o conteúdo semântico.

Parâmetros iniciais:

- velocidade: `0.1`;
- probabilidade de reinício por quadro: `0.003`;
- probabilidade de pulso por quadro: `0.001`;
- duração do pulso: `60` quadros;
- tamanho do nó: `3px`;
- raio máximo do pulso: `10px`;
- região de nascimento: entre `30%` e `80%` do menor semieixo.

Esses valores podem ser ajustados durante a validação visual para compensar
diferenças de dimensão e densidade, sem mudar a direção aprovada.

### Dimensionamento e ciclo de vida

- `ResizeObserver` acompanha o tamanho do hero.
- A resolução interna respeita `devicePixelRatio`, limitada para evitar custo
  excessivo em telas de alta densidade.
- O contexto recebe uma transformação absoluta a cada resize; escalas não se
  acumulam.
- `requestAnimationFrame` é cancelado no cleanup.
- `IntersectionObserver` pausa o loop quando o hero sai da área visível.
- A aba oculta também pausa a animação.
- Todos os observers e listeners são removidos no cleanup.

### Movimento reduzido e falhas

Com `prefers-reduced-motion: reduce`, o componente desenha uma grade estática e
uma pequena quantidade de rotas fixas, sem iniciar o loop.

Se o navegador não fornecer contexto 2D:

- o conteúdo textual e os filtros continuam disponíveis;
- o canvas não gera erro;
- uma grade CSS estática permanece visível;
- nenhuma funcionalidade do catálogo depende da decoração.

## Arquitetura

### `app/projetos/page.tsx`

- mantém carregamento server-side de projetos e JSON-LD;
- substitui o cabeçalho simples por um hero semântico;
- posiciona o catálogo abaixo com a sobreposição aprovada;
- não transforma a página inteira em componente cliente.

### `components/sections/projects-hero-canvas.tsx`

- novo componente cliente;
- contém tipos, estado interno das trilhas e ciclo de animação;
- não importa dados do catálogo;
- não usa GSAP, Motion ou dependências adicionais.

### `components/sections/projects-filterable-list.tsx`

- preserva toda a lógica atual de busca, filtros e ordenação;
- recebe apenas alterações estruturais e de classes necessárias para a
  sobreposição;
- aplica a cena inversa somente ao painel de controles;
- mantém cards e estados vazio/sem resultados no tema normal.

### Estilos

Utilidades Tailwind existentes serão preferidas. Regras globais novas só serão
adicionadas quando máscara, fallback ou preferência de movimento não puderem
ser expressos de forma legível no componente.

## Fluxo de dados

O canvas é decorativo e independente:

1. `ProjectsPage` carrega `getProjects()` no servidor;
2. `ProjectsFilterableList` recebe a mesma lista;
3. o estado de filtros permanece local ao componente existente;
4. `ProjectsHeroCanvas` inicia apenas sua animação visual;
5. nenhuma informação de projeto entra no canvas.

Falhas ou pausas no canvas não alteram busca, ordenação, links, contagem ou
renderização dos cards.

## Responsividade

### Desktop

- título centralizado na metade superior;
- canvas cobre toda a primeira dobra;
- painel de filtros sobrepõe a base do hero;
- cards começam após espaço suficiente para o painel;
- a densidade da grade permanece próxima da referência.

### Mobile

- título e descrição mantêm margens laterais de pelo menos `24px`;
- quebra do título é controlada sem reduzir legibilidade;
- painel ocupa quase toda a largura disponível;
- controles mantêm o empilhamento atual;
- a sobreposição não corta a contagem de resultados nem o botão de limpeza;
- cards permanecem em uma coluna.

## Acessibilidade

- o hero mantém um único `h1`;
- o canvas é decorativo e oculto da árvore acessível;
- o fallback também é decorativo;
- contraste de título e descrição segue WCAG AA;
- foco, labels, contagem `aria-live` e teclado dos filtros não mudam;
- a animação não reage ao ponteiro e não interfere na rolagem;
- movimento reduzido elimina o loop contínuo.

## Desempenho

- apenas um canvas é criado;
- o loop desenha sete trilhas e uma grade simples;
- a resolução interna terá limite de densidade;
- a animação pausa fora da viewport e em aba oculta;
- não serão carregados novos arquivos de imagem, vídeo, fonte ou biblioteca;
- o canvas não bloqueia a renderização server-side do conteúdo.

## Testes e validação

### Testes unitários

Atualizar `tests/unit/project-list-page.test.tsx` para verificar:

- hero com cena inversa e conteúdo atual;
- presença do wrapper e do canvas decorativo;
- painel de filtros preservado;
- links, busca, filtros, contagem e estados existentes sem regressão;
- ausência de URLs ou ativos da Resend.

Adicionar teste focado do canvas para verificar:

- fallback quando `getContext("2d")` retorna `null`;
- modo estático com movimento reduzido;
- criação e cleanup de animação, observers e listeners;
- redimensionamento sem acumular transformações.

### Validação estática

Executar:

- testes unitários focados;
- suíte unitária completa;
- `npm run typecheck`;
- `npm run lint`;
- `npm run build`;
- `npm run format:check`.

### Validação visual no navegador

Verificar `/projetos` em:

- desktop escuro;
- desktop claro;
- mobile escuro;
- mobile claro;
- movimento reduzido.

Critérios:

- fundo exatamente integrado ao token NITE;
- teal restrito à animação e luz;
- painel sobreposto sem cortar conteúdo;
- animação suave e sem borrão por escala;
- filtros e cards utilizáveis;
- sem erro de console, hidratação ou overflow horizontal.

## Fora de escopo

- alterar dados, textos, status ou imagens dos projetos;
- redesenhar cards;
- mudar metadados, canonical ou JSON-LD;
- animar a página inteira;
- copiar assets, fontes ou componentes da Resend;
- introduzir WebGL, vídeo ou biblioteca de partículas;
- reutilizar o canvas em outras rotas nesta entrega.

## Critérios de aceite

1. `/projetos` apresenta o novo palco animado antes do catálogo.
2. O fundo vem de `var(--nite-background)` na cena inversa.
3. A luz teal usa `#2DCFBF`.
4. O painel real de filtros ocupa o primeiro plano do hero.
5. Busca, filtros, ordenação, contagem, limpeza e links continuam funcionando.
6. O canvas pausa fora da viewport e respeita movimento reduzido.
7. Falha de canvas mantém uma composição estática utilizável.
8. Desktop e mobile não apresentam corte ou overflow horizontal.
9. Nenhum ativo ou código da Resend é incorporado ao projeto.
10. Testes, typecheck, lint, build e formatação passam.
