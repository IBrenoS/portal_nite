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
4. Fonte tipada e autorização explícita. Dados institucionais vêm de `@nite/content`; notícias públicas chegam pela API versionada do CMS, passam pelo schema Zod local de `@nite/news` e respeitam o contrato editorial público.
5. Movimento como orientação. Animações guiam leitura, transição e foco; conteúdo e navegação continuam compreensíveis com movimento reduzido ou sem animação.

## Nite News

`/atualizacoes` é o portal editorial público do NITE. A home organiza uma matéria principal, últimas notícias e agenda; os filtros `destaques`, `todas`, `agenda` e `comunidade` são compartilháveis pela URL. Cada bloco editorial aponta para uma página dedicada em `/atualizacoes/[slug]`, com leitura editorial, compartilhamento e matérias relacionadas.

O domínio começa com oito registros locais demonstrativos. Eles permitem validar estrutura, navegação e responsividade, mas não representam comunicação oficial: usam `contentState: "demonstrativo"`, permanecem com `noindex`, não entram no sitemap e não exibem aviso visual por decisão de produto. A publicação indexável exige conteúdo aprovado migrado para `contentState: "real"`; isso não altera a UI nem as rotas.

### CMS editorial

O CMS próprio é uma aplicação administrativa e um repositório independentes do portal público. Ele pertence ao ecossistema NITE, mas não compartilha workspaces, packages, lockfile ou imports com o Portal. Rascunhos, histórico, permissões, auditoria e operação editorial não são capacidades nem dados do `apps/web`.

O MVP editorial possui três papéis (`admin`, `editor` e `author`) e três estados de artigo (`draft`, `published` e `archived`). Cada salvamento explícito cria uma revisão imutável; publicar fixa uma revisão específica. `author` edita apenas matérias próprias e não publica; `editor` e `admin` podem publicar. Conflitos preservam o texto local e exigem recarga antes de novo salvamento.

O acesso usa Microsoft Entra ID e membership por `tid + oid`; e-mail nunca concede permissão. O primeiro admin depende de um `oid` explicitamente configurado. O editor cobre título, resumo, slug, categoria, assinatura, tempo de leitura, evento, destaque, capa, SEO e blocos de parágrafo, subtítulo e citação. O slug pode mudar enquanto a matéria é rascunho e fica estável após a primeira publicação. O histórico abre previews autenticados com um renderer próprio do CMS, compatível com o mesmo formato HTTP consumido pelo Portal.

A mídia entra por upload direto ao R2, permanece privada em `incoming/` durante a validação e só ganha chave pública após processamento WebP. Agendamento, revisão formal, autosave, exclusão permanente, recuperação visual de versões e colaboração simultânea continuam fora do MVP.

Os oito registros demonstrativos continuam apenas como suporte explícito para testes, desenvolvimento local e rollback. Eles não serão importados como comunicação oficial. O Portal usa a API pública versionada do CMS quando `NITE_NEWS_SOURCE=api`; o corte em produção só ocorre depois que API, autenticação, conteúdo aprovado, rollback e operação editorial forem validados em homologação.

A publicação pública é assíncrona após o commit editorial: a confirmação do CMS significa que artigo, revisão publicada, auditoria e evento durável foram persistidos. A atualização do portal normalmente é disparada logo após a resposta e tem uma varredura agendada como recuperação; indisponibilidade temporária do portal não desfaz a publicação nem perde o evento.

O Nite News usa o header e o footer institucionais do portal. A home abre com o **Radar de Sinais NITE**, uma cena editorial decorativa em canvas com dez órbitas circulares calculadas nas dimensões lógicas da viewport; o recorte do stage revela cinco linhas principais no desktop de referência. A cena preserva o fundo e ilumina órbitas e pulsos por uma composição azul/ciano localizada, com a matéria principal sobreposta em `90%` da largura e limitada a `1152px`. Ela aparece em todos os filtros; fora de `destaques`, o primeiro resultado na ordenação canônica assume o bloco principal sem ser repetido na grade seguinte.

O halo reutiliza exclusivamente o asset local `projects-hero-light.png`. No dark, a imagem recebe um campo azul com blend `color` e máscara radial, que colore a luminosidade e os traços sem criar uma placa azul nos cantos; no light, o azul a `18%` é recortado diretamente pelo alpha do PNG. O stage usa `90vh` com teto de `672px` no mobile e `calc(100vh - 3.75rem)` no desktop; o destaque cruza sua base em `96px` e `140px`, respectivamente.

O canvas não representa transmissão, métricas ou estado operacional. Os cometas variam de velocidade de forma controlada e a poeira pode desaparecer e reaparecer em outra posição, sempre sem teleporte visível. Texto e matérias permanecem completos sem animação; os filtros continuam compartilháveis pela URL, mas não são exibidos dentro do hero. `prefers-reduced-motion` produz um frame estático, e o renderer pausa quando sai da viewport ou a página fica oculta. A página dedicada da matéria continua fotográfica e focada em leitura, sem repetir a cena. Na vitrine e nas relacionadas, imagens, metadata e texto formam blocos editoriais planos: sem borda, fundo, sombra, escala ou pulso; somente a cor do título pode responder a hover e foco.

## Accessibility & Inclusion

WCAG 2.2 é a referência do projeto, com WCAG AA como mínimo para contraste: 4.5:1 em texto normal e 3:1 em texto grande. Acessibilidade não é modo opcional; legibilidade, foco visível, semântica, navegação por teclado e estados compreensíveis fazem parte do baseline.

Header, MegaMenu, menu mobile, diálogos, CTAs, cards, filtros, formulários e links preservam foco visível, ordem lógica, áreas de toque confortáveis e suporte a `prefers-reduced-motion`. Status, erros, filtros e disponibilidade nunca dependem apenas de cor, ícone ou animação. Imagens usam texto alternativo significativo; nomes, perfis e fotos reais exigem autorização antes de aparecer publicamente.

No painel, labels persistentes, mensagens de erro, confirmação explícita de publicação e estado de salvamento textual são obrigatórios. Permissão negada e conflito de versão devem ser estados compreensíveis; esconder controles no cliente não substitui autorização no servidor.
