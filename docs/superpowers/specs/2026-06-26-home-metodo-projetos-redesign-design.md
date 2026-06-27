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
- Um único painel técnico apresenta `Recorte`, `Protótipo`, `Evidência` e
  `Circulação`.
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

O papel visual será reproduzido com as famílias já adotadas pelo produto:

- `Sora` nos títulos e destaques do preview;
- `Geist` para texto, controles e metadados;
- `Geist Mono` para arquivos, código, estados e rótulos técnicos.

## Método aplicado

### Cabeçalho

O cabeçalho será centralizado e terá:

1. ícone 3D exclusivo do método;
2. título `Método aplicado`;
3. descrição atual do NITE, sem CTA.

O texto anterior `Antes de virar projeto, uma demanda precisa virar evidência.`
deixa de ser o título principal da seção. Sua ideia permanece representada pelo
painel e pelos textos dos estágios.

### Ícone

O ativo será uma imagem raster gerada especificamente para a seção:

- quatro módulos de metal escuro e vidro fumê;
- eixo central preciso;
- sem letra `N`, envelope ou símbolos dos três projetos;
- fundo transparente ou preto compatível com a cena;
- dimensões de exibição de `170 x 170`;
- exibição estática no desktop e mobile;
- sem animação, inclinação, brilho ou microinteração no wrapper.

O ícone não reutilizará `public/images/oportunidades/n-icon.png`.

### Painel técnico

O painel reproduz a estrutura observada na feature `Develop emails using React`
da Resend sem usar `<canvas>` ou iframe. Toda a interface é DOM React:

- barra superior de 48 px com controles de janela;
- controles segmentados de dispositivo e aparência no desktop;
- lista lateral com ícone `TS`, fonte de `14 px` e os arquivos `recorte.tsx`,
  `prototipo.tsx`, `evidencia.tsx` e `circulacao.tsx`;
- código com numeração de linhas, realce de sintaxe e barras de rolagem vertical
  e horizontal;
- preview do método que muda junto com o arquivo ativo;
- preview sem cabeçalho, assinatura ou numeração adicional;
- aparência escura por padrão e variação clara controlada pelo switch;
- preview mobile limitado a 350 px quando o controle de dispositivo está ativo.

Cada arquivo representa um estágio e preserva seu rótulo, título, descrição e
saída. Clique, foco e teclado atualizam simultaneamente o código e o preview.

### Responsividade

Desktop:

- cabeçalho centralizado;
- painel com largura máxima próxima de `1200 px` e altura de `700 px`;
- navegação vertical de `200 px`;
- código e preview dividem igualmente a área restante;
- switches de dispositivo e aparência ficam na barra superior.

Mobile:

- ícone menor;
- painel com altura de `623 px`;
- navegação se torna horizontal e rolável sem barra nativa visível;
- código e switches são ocultos;
- preview ocupa toda a área restante sem overflow horizontal.

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

- `MethodFeatureIcon`: exibição estática do ícone exclusivo;
- `BuildsCardsGrid`: painel, controlador dos estágios e tablist;
- `MethodCode`: visualização do código do estágio ativo;
- `MethodPreview`: preview responsivo do estágio ativo;
- `ToolbarSwitch`: alternância acessível de dispositivo e aparência;
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

- O painel não usa canvas, WebGL, iframe, vídeo ou Spline.
- Código e preview são renderizados diretamente no DOM.
- As transições se limitam a cor, largura e posição do switch.
- `prefers-reduced-motion` remove essas transições.
- O ícone é carregado como imagem otimizada pelo Next.

## Acessibilidade

- O seletor de método usará `role="tablist"`, `role="tab"` e
  `aria-selected`.
- Setas esquerda e direita moverão o foco entre os estágios.
- Os controles de dispositivo e aparência usarão `role="switch"` e
  `aria-checked`.
- Todos os links `Ver projeto` manterão destino e nome acessível.
- O foco visível usará branco/cinza com contraste adequado na cena escura.
- Imagens dos projetos manterão os textos alternativos do conteúdo.
- O ícone 3D será decorativo e terá `alt=""`.

## Testes

Os testes unitários da home serão atualizados para verificar:

- título e descrição centralizados do método;
- ausência do ícone `N`;
- ausência de canvas e presença do painel DOM;
- quatro tabs acessíveis;
- mudança de estágio por clique, foco e teclado;
- mudança de dispositivo e aparência pelos switches;
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
