# Nite News — design do protótipo navegável

Data: 2026-08-10

Status: aprovado para prototipação no Figma

Escopo: experiência editorial desktop e mobile; nenhuma implementação no portal

## 1. Objetivo

Criar no Figma uma proposta definitiva para o Nite News, transformando a rota
`/atualizacoes` em um portal editorial público e conduzindo o usuário de uma
home de notícias para uma página dedicada em `/atualizacoes/[slug]`.

O protótipo deve organizar matérias com hierarquia semelhante à referência
visual fornecida: destaque principal, notícias recentes e blocos temáticos. A
composição será reinterpretada com o design system do Portal NITE, sem copiar
layout, identidade, imagens ou conteúdo da referência.

## 2. Limites do escopo

O arquivo do Figma incluirá:

- home editorial desktop em 1440 px;
- matéria dedicada desktop em 1440 px;
- home editorial mobile em 390 px;
- matéria dedicada mobile em 390 px;
- componentes reutilizáveis necessários ao protótipo;
- composição editorial estática, clara e orientada por fotografia;
- navegação entre a home editorial e uma matéria representativa.

O trabalho não inclui código, schemas, dados canônicos, CMS, busca funcional,
comentários, reações, autenticação, compartilhamento, autores, publicação ou
qualquer integração externa.

## 3. Direção visual

A direção revisada é **portal editorial claro e fotográfico**, com composição
fortemente orientada pela referência aprovada.

O Nite News usa fundo claro, cartões brancos, bordas discretas, imagens em
proporções jornalísticas e hierarquia tipográfica de alto contraste. Sora
permanece nos títulos, Geist na leitura e Geist Mono em categorias, datas e
metadados, preservando a identidade do Portal NITE sem reproduzir a marca ou o
conteúdo da referência.

O conceito “Rede de transmissão editorial”, o canvas e o motion autônomo de
quatro segundos foram removidos do escopo. A experiência não depende de
elemento cenográfico animado; a prioridade é a leitura das notícias.

## 4. Composição editorial estática

A abertura da home usa um bloco introdutório curto, categorias e uma matéria
principal em duas colunas no desktop. Imagens editoriais demonstrativas
organizam o ritmo visual da manchete, da grade de últimas notícias e da agenda.

Na matéria dedicada, uma capa fotográfica ampla substitui qualquer canvas. A
imagem introduz o conteúdo e conduz diretamente à coluna de leitura. Não haverá
animação autônoma; somente as transições funcionais do protótipo entre home e
matéria permanecem.

## 5. Home editorial

### Hero

- header institucional existente;
- bloco introdutório claro e compacto;
- eyebrow “Bem-vindo ao Nite News”;
- descrição curta sobre notícias, eventos e comunidade universitária;
- chips de categoria discretos após a apresentação.

Não haverá banner, badge ou aviso de conteúdo demonstrativo dentro da interface.
Essa condição será registrada apenas em notas externas aos frames e na
documentação do arquivo do Figma.

### Destaque principal

Composição assimétrica em duas colunas no desktop: imagem de maior peso visual
e bloco editorial com categoria, título, resumo, metadados e indicação de
leitura. Todo o bloco será acionável e levará à matéria dedicada.

No mobile, imagem e texto formarão uma única coluna, preservando o título antes
dos cards secundários.

### Últimas notícias

Grade de quatro cards no desktop e lista vertical no mobile. Cada card terá
imagem, categoria, título, resumo curto opcional e metadados. O design usará
bordas e contraste de superfície antes de sombra ou elevação.

### Blocos editoriais

As seções previstas são:

- Universidade;
- Eventos;
- Projetos e pesquisa;
- Comunicados.

As seções alternarão densidade e proporção para evitar uma coleção de cards
equivalentes. A primeira versão do protótipo poderá representar apenas os
blocos necessários para demonstrar o sistema completo sem sugerir volume real
de publicações.

## 6. Página dedicada da matéria

A rota editorial seguirá a estrutura:

1. retorno para Nite News;
2. categoria;
3. título;
4. resumo editorial;
5. data e tempo estimado de leitura;
6. capa ampla;
7. coluna de leitura com aproximadamente 720 px no desktop;
8. subtítulos e blocos de mídia opcionais;
9. bloco de contexto institucional;
10. matérias relacionadas;
11. footer institucional.

Comentários, curtidas, perfis de autor e controles de compartilhamento não serão
desenhados como funcionalidades prontas.

## 7. Conteúdo do protótipo

O conteúdo usado para preencher os layouts será demonstrativo e não será
tratado como publicação real. A interface não exibirá um banner de aviso. A
condição demonstrativa ficará explícita nos nomes das páginas, nas notas do
arquivo e nas anotações colocadas fora das telas navegáveis.

Textos e imagens não deverão inventar pessoas, autorizações, métricas, vagas,
datas, eventos confirmados ou resultados institucionais. Quando necessário,
serão usados títulos editoriais neutros ou referências já públicas do projeto,
sem convertê-las em alegações jornalísticas.

## 8. Componentes do Figma

O arquivo deverá conter componentes reutilizáveis para:

- card editorial, com variações de destaque, grade e lista;
- chip de categoria;
- metadados da matéria;
- cabeçalho de seção;
- link de retorno;
- bloco de matérias relacionadas.

Header, footer, botões, tokens, variáveis e estilos existentes deverão ser
reutilizados quando estiverem disponíveis em bibliotecas acessíveis. Novos
componentes locais devem seguir a nomenclatura e os tokens do Portal NITE.

## 9. Responsividade

O desktop usa grid editorial de 12 colunas e largura de 1440 px. O mobile usa
390 px, padding lateral confortável, uma coluna principal e categorias em faixa
horizontal rolável.

No mobile:

- a matéria principal mantém prioridade sobre a lista recente;
- cards não dependem de hover;
- imagens preservam recorte editorial e texto alternativo previsto;
- áreas acionáveis mantêm no mínimo 44 px;
- a coluna da matéria evita linhas longas e controles comprimidos.

## 10. Navegação do protótipo

O fluxo principal será:

`Home Nite News → matéria em destaque → página editorial → voltar para Nite News`

O fluxo existirá em desktop e mobile. Somente elementos com destino configurado
serão apresentados como interativos. Cards sem tela de destino não deverão
simular uma navegação completa.

## 11. Acessibilidade e interação

- contraste mínimo WCAG AA;
- hierarquia de títulos coerente;
- foco visível documentado nos componentes interativos;
- áreas de toque adequadas;
- informação nunca dependente apenas de cor;
- ausência de animação decorativa ou reprodução automática;
- transições de navegação curtas, não bloqueantes e sem flashes;
- fonte do produto verificada no Figma antes da entrega.

## 12. Validação do arquivo

Antes da entrega, serão verificados:

- estrutura e componentização dos frames;
- uso de Auto Layout nas relações estruturais;
- ausência de textos cortados, sobreposições e placeholders esquecidos;
- consistência entre desktop e mobile;
- navegação Home → matéria → Home;
- ausência do canvas e de motion autônomo;
- aderência às fontes, cores e linguagem visual do Portal NITE;
- ausência de funcionalidades ou fatos institucionais inventados.

## 13. Critérios de aprovação

O protótipo estará pronto para avaliação quando:

- as quatro telas principais estiverem completas;
- o fluxo editorial estiver navegável em desktop e mobile;
- a home preservar a hierarquia editorial da referência sem copiar sua marca;
- a composição clara e fotográfica priorizar notícias e leitura;
- a página de matéria sustentar leitura longa com clareza;
- o arquivo estiver componentizado e visualmente validado;
- notas externas identificarem o conteúdo como demonstrativo sem inserir aviso
  dentro da interface.
