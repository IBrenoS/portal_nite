# Product

## Register

brand

## Users

O Portal NITE atende estudantes, professores, gestores, coordenadores, visitantes institucionais, público externo, parceiros e ex-integrantes. A experiência pública prioriza quem precisa entender rapidamente o papel do núcleo, explorar projetos e registros, acompanhar oportunidades, conhecer pessoas autorizadas e encontrar canais institucionais de contato.

Estudantes buscam frentes de atuação, tecnologias, participação e prática aplicada. Professores, gestores e coordenadores buscam contexto, credibilidade, histórico, evidências e caminhos claros para propor ou acompanhar demandas. Visitantes externos precisam distinguir conteúdo real, demonstrativo, planejado e ainda em estruturação sem depender de conhecimento interno do NITE.

## Product Purpose

O Portal NITE é a interface pública e institucional do Núcleo de Inovação, Tecnologia e Experiência da UNIJORGE. Ele conecta o núcleo ao ecossistema acadêmico por meio de apresentação institucional, projetos, oportunidades, atualizações, linha do tempo, perfis autorizados e contato, sem depender de conteúdo inventado ou promessas futuras.

Sucesso significa que um visitante entende o que é o NITE pela home, alcança projetos, oportunidades, pessoas e contato em até duas interações, encontra status e limites honestos e acompanha a evolução do núcleo apenas por rotas e dados realmente públicos. Itens planejados permanecem identificados e não simulam uma funcionalidade pronta.

## Brand Personality

Preciso, institucional e elétrico controlado.

A marca deve parecer tecnologia aplicada dentro de uma instituição acadêmica: sofisticada, clara, séria, acessível e viva. Brilho, movimento, imagem e profundidade orientam atenção e identidade; não são decoração constante. A voz é objetiva, confiante e transparente, evitando hipérbole e qualquer promessa operacional que o portal ainda não sustenta.

Direção visual local: “Tech institucional de circuito metálico”, com fundo escuro principal, azul elétrico pontual, superfícies técnicas e a logo NITE como ativo de marca. Referências externas podem informar comportamento, contraste ou composição, mas o portal depende do contrato local `--nite-*` e de ativos próprios.

## Anti-references

- Não inventar dados institucionais, métricas, depoimentos, datas, responsáveis, equipes, fotos, resultados, vagas ou evidências.
- Não publicar nomes, imagens, perfis ou vínculos sem autorização explícita no conteúdo.
- Não apresentar placeholders, rotas futuras, formulários futuros ou oportunidades futuras como funcionalidades prontas.
- Não transformar oportunidades em promessa de aprovação, resposta automática, acompanhamento individual ou candidatura funcional sem fluxo validado.
- Não usar visual infantil, neon permanente, glow dominante, grid decorativo genérico, texto em gradiente ou efeitos que disputem atenção com o conteúdo.
- Não fazer o portal parecer uma landing page genérica de SaaS ou uma coleção de cards equivalentes sem narrativa institucional.
- Não copiar layout, ativos, textos, imagens ou identidade de referências externas; referências servem para comportamento e linguagem visual, não para clonagem.

## Design Principles

1. Conteúdo honesto antes de impacto visual. O portal nunca parece mais maduro, validado ou operacional do que os dados públicos permitem.
2. Institucionalidade tecnológica. O visual comunica inovação aplicada com seriedade acadêmica, sem perder energia de laboratório e construção.
3. Caminhos públicos claros. Projetos, oportunidades, pessoas, atualizações e contato mantêm funções próprias e permanecem acessíveis em até duas interações.
4. Fonte tipada e autorização explícita. Dados institucionais vêm de `@nite/content`; notícias públicas chegam por uma API versionada, passam pelo schema Zod local de `@nite/news` e respeitam o contrato editorial público.
5. Movimento como orientação. Animações guiam leitura, transição e foco; conteúdo e navegação continuam compreensíveis com movimento reduzido ou sem animação.

## Nite News

`/atualizacoes` é o portal editorial público do NITE. A home organiza uma matéria principal, últimas notícias e agenda; os filtros `destaques`, `todas`, `agenda` e `comunidade` são compartilháveis pela URL. Cada bloco editorial aponta para uma página dedicada em `/atualizacoes/[slug]`, com leitura editorial, compartilhamento e matérias relacionadas.

O domínio começa com oito registros locais demonstrativos. Eles permitem validar estrutura, navegação e responsividade, mas não representam comunicação oficial: usam `contentState: "demonstrativo"`, permanecem com `noindex`, não entram no sitemap e não exibem aviso visual por decisão de produto. A publicação indexável exige conteúdo aprovado migrado para `contentState: "real"`; isso não altera a UI nem as rotas.

O CMS editorial é um serviço independente. `publisher` pode criar, editar, pré-visualizar e operar o ciclo `draft | published | archived` de qualquer matéria; `admin` possui as mesmas capacidades e administra memberships. Cada salvamento explícito cria uma revisão imutável, toda transição exige a revisão esperada e o slug fica permanentemente bloqueado depois da primeira publicação. Não há aprovação, agendamento, autosave, exclusão nem histórico navegável no MVP.

O corpo público usa exclusivamente `EditorialDocumentV1`: parágrafos, H2/H3, listas, citações, imagens prontas, negrito, itálico e links seguros. A prévia usa o mesmo renderer da matéria pública, mas fica isolada à revisão autorizada, sem canonical, JSON-LD, compartilhamento ou indexação, e oferece uma saída explícita do Draft Mode.

O Nite News usa o header e o footer institucionais do portal. A home abre com o **Radar de Sinais NITE**, uma cena editorial decorativa em canvas com dez órbitas circulares calculadas nas dimensões lógicas da viewport; o recorte do stage revela cinco linhas principais no desktop de referência. A cena preserva o fundo e ilumina órbitas e pulsos por uma composição azul/ciano localizada, com a matéria principal sobreposta em `90%` da largura e limitada a `1152px`. Ela aparece em todos os filtros; fora de `destaques`, o primeiro resultado na ordenação canônica assume o bloco principal sem ser repetido na grade seguinte.

O halo reutiliza exclusivamente o asset local `projects-hero-light.png`. No dark, a imagem recebe um campo azul com blend `color` e máscara radial, que colore a luminosidade e os traços sem criar uma placa azul nos cantos; no light, o azul a `18%` é recortado diretamente pelo alpha do PNG. O stage usa `90vh` com teto de `672px` no mobile e `calc(100vh - 3.75rem)` no desktop; o destaque cruza sua base em `96px` e `140px`, respectivamente.

O canvas não representa transmissão, métricas ou estado operacional. Os cometas variam de velocidade de forma controlada e a poeira pode desaparecer e reaparecer em outra posição, sempre sem teleporte visível. Texto e matérias permanecem completos sem animação; os filtros continuam compartilháveis pela URL, mas não são exibidos dentro do hero. `prefers-reduced-motion` produz um frame estático, e o renderer pausa quando sai da viewport ou a página fica oculta. A página dedicada da matéria continua fotográfica e focada em leitura, sem repetir a cena. Na vitrine e nas relacionadas, imagens, metadata e texto formam blocos editoriais planos: sem borda, fundo, sombra, escala ou pulso; somente a cor do título pode responder a hover e foco.

## Accessibility & Inclusion

WCAG 2.2 é a referência do projeto, com WCAG AA como mínimo para contraste: 4.5:1 em texto normal e 3:1 em texto grande. Acessibilidade não é modo opcional; legibilidade, foco visível, semântica, navegação por teclado e estados compreensíveis fazem parte do baseline.

Header, MegaMenu, menu mobile, diálogos, CTAs, cards, filtros, formulários e links preservam foco visível, ordem lógica, áreas de toque confortáveis e suporte a `prefers-reduced-motion`. Status, erros, filtros e disponibilidade nunca dependem apenas de cor, ícone ou animação. Imagens usam texto alternativo significativo; nomes, perfis e fotos reais exigem autorização antes de aparecer publicamente.
