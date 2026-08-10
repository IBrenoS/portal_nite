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
- estados animáveis do hero e estado equivalente sem movimento;
- navegação entre a home editorial e uma matéria representativa.

O trabalho não inclui código, schemas, dados canônicos, CMS, busca funcional,
comentários, reações, autenticação, compartilhamento, autores, publicação ou
qualquer integração externa.

## 3. Direção visual

A direção aprovada é **Rede de transmissão editorial**.

O Nite News mantém a personalidade “tech institucional de circuito metálico”:
fundo dark-first, superfícies técnicas discretas, bordas sutis, azul elétrico
raro e tipografia sólida. Sora será usada em títulos e Geist na leitura. Geist
Mono será restrita a categorias, datas e metadados.

A página não adotará serifas editoriais, texto em gradiente, neon permanente,
cards brancos genéricos ou estética de dashboard. A referência serve para
hierarquia e ritmo editorial, não como identidade a ser clonada.

## 4. Canvas Rede de transmissão

O hero apresenta a circulação de informação como uma rede em atividade.
Linhas curvas e ortogonais atravessam o campo escuro enquanto pequenos pacotes
editoriais percorrem trajetos entre pontos. Os pacotes podem conter categoria,
horário ou fragmentos tipográficos curtos. Ao alcançar um ponto, ocorre um
pulso ciano breve, sem glow dominante.

O canvas será visualmente diferente da trilha sobre grid usada em Projetos:

- não haverá cobrinha contínua;
- não haverá grade cartesiana dominante;
- múltiplos pacotes independentes sugerirão distribuição de informação;
- o movimento será horizontal e convergente, com pausas e pulsos pontuais;
- o título e a descrição permanecerão legíveis sem depender da animação.

No protótipo, o movimento será representado por estados de um componente
interativo com Smart Animate. Um estado estático documentará o comportamento
esperado com `prefers-reduced-motion`.

## 5. Home editorial

### Hero

- header institucional existente;
- canvas Rede de transmissão em largura total;
- eyebrow “Atualizações”;
- título “Nite News”;
- descrição curta sobre notícias, eventos e comunicados institucionais;
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
- bloco de matérias relacionadas;
- hero Rede de transmissão e seus estados de movimento.

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

## 11. Acessibilidade e movimento

- contraste mínimo WCAG AA;
- hierarquia de títulos coerente;
- foco visível documentado nos componentes interativos;
- áreas de toque adequadas;
- informação nunca dependente apenas de cor ou movimento;
- conteúdo completo disponível no estado estático;
- animação curta, não bloqueante e sem flashes;
- fonte do produto verificada no Figma antes da entrega.

## 12. Validação do arquivo

Antes da entrega, serão verificados:

- estrutura e componentização dos frames;
- uso de Auto Layout nas relações estruturais;
- ausência de textos cortados, sobreposições e placeholders esquecidos;
- consistência entre desktop e mobile;
- navegação Home → matéria → Home;
- estados do hero animado e estático;
- aderência às fontes, cores e linguagem visual do Portal NITE;
- ausência de funcionalidades ou fatos institucionais inventados.

## 13. Critérios de aprovação

O protótipo estará pronto para avaliação quando:

- as quatro telas principais estiverem completas;
- o fluxo editorial estiver navegável em desktop e mobile;
- a home preservar a hierarquia da referência sem copiá-la;
- o canvas comunicar distribuição de notícias e não repetir Projetos;
- a página de matéria sustentar leitura longa com clareza;
- o arquivo estiver componentizado e visualmente validado;
- notas externas identificarem o conteúdo como demonstrativo sem inserir aviso
  dentro da interface.
