# Redesign de Método Aplicado e Projetos em Destaque

## Objetivo

Redesenhar as seções `Método aplicado` e `Projetos em destaque` da home para
adotar a linguagem visual observada na Resend em 26 de junho de 2026:
composição monocromática, tipografia editorial, superfícies técnicas contínuas,
bordas discretas, iluminação suave e movimento funcional.

O redesign preserva os títulos, nomes de projetos e estados editoriais
existentes. Nenhum conteúdo em estruturação será renomeado ou apresentado como
entrega validada.

## Direção aprovada

A composição segue a opção `Palco de Produto` revisada:

- `Método aplicado` usa um ícone 3D exclusivo, título e descrição centralizados.
- Um único canvas apresenta `Recorte`, `Protótipo`, `Evidência` e `Circulação`.
- `Projetos em destaque` tem `Software aplicado` como protagonista.
- `Robótica educacional` e `Dados e IA` aparecem como módulos de apoio.
- As três frentes continuam exibindo o estado `Em estruturação`.

## Escopo visual

As duas seções serão cenas escuras autocontidas com
`data-nite-scene="inverse"`. Elas permanecem escuras quando o restante do site
está em light mode, evitando uma adaptação clara que descaracterize a referência
aprovada.

Tokens locais das seções:

- fundo principal: `#000000`;
- fundo secundário: `#050505`;
- texto principal: `#f5f5f5`;
- texto secundário: `#8a8a8a`;
- borda: `rgb(255 255 255 / 0.10)`;
- superfície: `rgb(255 255 255 / 0.025)`;
- estado ativo: branco, sem azul de marca;
- verde neutro apenas em valores técnicos de sucesso.

Não serão usados gradientes coloridos, brilho azul, roxo, sombras pesadas,
cards genéricos ou elementos decorativos sem função.

## Tipografia

A Resend usa fontes comerciais que não estão disponíveis no repositório. A
implementação não fará hotlink nem copiará arquivos de fonte de terceiros.

O papel visual será reproduzido com:

- `Instrument Serif`, via `next/font/google`, nos títulos editoriais dessas duas
  seções;
- `Geist`, já existente no projeto, para texto, controles e metadados;
- `Geist Mono`, já existente, para logs, estados e rótulos técnicos.

A fonte serifada será exposta como `--font-resend-display`. Caso arquivos
licenciados sejam fornecidos posteriormente, a troca ficará isolada no
carregamento da fonte e não exigirá alteração dos componentes.

## Método aplicado

### Cabeçalho

O cabeçalho será centralizado e terá:

1. ícone 3D exclusivo do método;
2. título `Método aplicado`;
3. descrição atual do NITE, sem CTA.

O texto anterior `Antes de virar projeto, uma demanda precisa virar evidência.`
deixa de ser o título principal da seção. Sua ideia permanece representada pelo
canvas e pelos textos dos estágios.

### Ícone

O ativo será uma imagem raster gerada especificamente para a seção:

- quatro módulos de metal escuro e vidro fumê;
- eixo central preciso;
- sem letra `N`, cubo, envelope ou símbolos dos três projetos;
- fundo transparente ou preto compatível com a cena;
- dimensões de exibição próximas de `150 x 150`;
- poster estático com animação de entrada, respiração e inclinação leve no
  wrapper;
- movimento desativado com `prefers-reduced-motion`.

O ícone não reutilizará `public/images/oportunidades/n-icon.png`.

### Canvas

`MethodSystemCanvas` será um canvas 2D decorativo com uma camada HTML acessível
por cima. O canvas desenhará:

- grade de 20 px em baixa opacidade;
- rotas ortogonais entre os quatro estágios;
- trilhas curtas em movimento;
- pontos de atividade e pulsos discretos;
- máscara radial para dissipar linhas nas bordas;
- destaque monocromático do estágio ativo.

A camada HTML apresentará todos os estágios dentro de uma única superfície:

- `Recorte`;
- `Protótipo`;
- `Evidência`;
- `Circulação`.

Cada estágio terá rótulo, título e descrição breve. Um `tablist` inferior
controlará o estado ativo. Clique, foco e teclado atualizarão o canvas e a área
de saída. O conteúdo continuará disponível sem canvas.

### Responsividade

Desktop:

- cabeçalho centralizado;
- canvas com largura máxima próxima de `1200 px`;
- quatro estágios visíveis simultaneamente;
- tablist horizontal na base.

Mobile:

- ícone menor;
- canvas com altura reduzida;
- rótulos dos quatro estágios permanecem visíveis;
- descrição detalhada mostra apenas o estágio ativo;
- tablist permite rolagem horizontal sem esconder o foco.

## Projetos em destaque

### Estrutura

A seção deixa de renderizar três `ProjectCard` equivalentes.

`Software aplicado` será selecionado pelo slug `software-aplicado`, não pela
posição do array. Os demais projetos destacados formarão a grade de apoio.

Estrutura:

1. cabeçalho editorial `Projetos em destaque`;
2. `FeaturedProjectShowcase` em largura total;
3. grade com dois `SupportingProjectModule`;
4. `EmptyState` existente quando não houver projetos.

### Projeto protagonista

O módulo de `Software aplicado` terá:

- mídia larga com interface técnica composta por código, eventos e logs;
- status `Em estruturação`;
- título, resumo e tecnologias;
- link `Ver projeto`;
- borda única e conteúdo dividido por separadores internos;
- sem card aninhado.

Os painéis técnicos serão DOM semântico e decorativo, seguindo o padrão de logs
observado na Resend. Eles não afirmarão métricas, usuários ou entregas reais.

### Módulos de apoio

`Robótica educacional` e `Dados e IA` terão:

- visual próprio derivado das imagens reais já associadas ao projeto;
- tratamento monocromático e máscara escura;
- status, título, resumo, tecnologias e link;
- mesma linguagem de borda e tipografia do protagonista;
- menor altura e densidade que o módulo principal.

Os nomes, slugs, resumos e estados vêm de `conteudo/projetos/projetos.json`.

## Componentes

Componentes previstos:

- `MethodFeatureIcon`: ativo e movimento do ícone exclusivo;
- `MethodSystemCanvas`: desenho procedural 2D;
- `MethodSystemStage`: conteúdo acessível de cada estágio;
- `BuildsCardsGrid`: controlador dos estágios e tablist;
- `FeaturedProjectShowcase`: módulo protagonista;
- `SupportingProjectModule`: módulo de apoio;
- `ProjectStatusLabel`: adaptação visual do status existente.

`ProjectCard` permanece disponível para outras páginas e não será transformado
em um componente específico da home.

## Dados e estados

O fluxo de dados dos projetos permanece server-side:

1. a home carrega os projetos destacados;
2. `ProjectsOperatingSection` identifica `software-aplicado`;
3. o protagonista e os módulos de apoio recebem o mesmo objeto `Project`;
4. links continuam apontando para `/projetos/[slug]`.

Não haverá dados simulados que indiquem resultados reais. Logs e código da mídia
do protagonista serão exemplos visuais genéricos, marcados como decorativos para
tecnologia assistiva.

## Movimento e desempenho

- O canvas usa `requestAnimationFrame` e limita o pixel ratio a `2`.
- `ResizeObserver` ajusta o canvas sem listeners globais de layout.
- A animação pausa quando a seção não está visível.
- `prefers-reduced-motion` renderiza um frame estático.
- O ícone é carregado como imagem otimizada pelo Next.
- Não será introduzido WebGL ou Spline nessas seções.
- O canvas é decorativo; a interação pertence aos controles HTML.

## Acessibilidade

- O canvas terá `aria-hidden="true"`.
- O seletor de método usará `role="tablist"`, `role="tab"` e
  `aria-selected`.
- Setas esquerda e direita moverão o foco entre os estágios.
- Todos os links `Ver projeto` manterão destino e nome acessível.
- O foco visível usará branco/cinza com contraste adequado na cena escura.
- Imagens dos projetos manterão os textos alternativos do conteúdo.
- O ícone 3D será decorativo e terá `alt=""`.

## Testes

Os testes unitários da home serão atualizados para verificar:

- título e descrição centralizados do método;
- ausência do ícone `N`;
- presença do canvas e fallback HTML;
- quatro tabs acessíveis;
- mudança de estágio por clique, foco e teclado;
- ausência de três cards genéricos equivalentes;
- presença de um protagonista e dois módulos de apoio;
- seleção do protagonista pelo slug;
- manutenção dos três estados `Em estruturação`;
- manutenção dos três links `Ver projeto`;
- textos e nomes de projeto sem renomeação.

Também serão executados:

- `npm run test`;
- `npm run typecheck`;
- `npm run lint`;
- captura visual desktop e mobile no Chrome escolhido pelo usuário.

## Fora de escopo

- alterar páginas individuais de projeto;
- publicar entregáveis ou resultados ainda não validados;
- substituir a paleta global do portal;
- introduzir fontes comerciais sem licença;
- copiar logotipo, textos, ícones ou ativos proprietários da Resend;
- adicionar WebGL às seções;
- renomear conteúdo placeholder ou em estruturação.
