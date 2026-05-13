# Spec Mae - Portal NITE SDD

## Status

Draft

## Fonte inicial

Este documento foi derivado de `specs.md`, revisao de 2026-05-12.

## Aprovacao de produto

O escopo do MVP Premium e aprovado pelo gestor e desenvolvedor responsavel pelo projeto. Decisoes aprovadas por ele passam a valer como referencia oficial para o Portal NITE.

Os tokens visuais finais do MVP Premium foram aprovados pelo gestor/desenvolvedor do projeto e estao documentados na Spec 003.

Excecao: decisoes que dependem do nucleo, especialmente governanca minima de conteudo, permanecem como Pendente de validacao coletiva ate reuniao com o nucleo.

## Proposito

Definir a estrutura de Spec-Driven Development para evolucao do Portal NITE, consolidando requisitos de produto, UX, UI, acessibilidade, SEO, performance, governanca de conteudo, milestones e tasks rastreaveis.

Cada melhoria relevante deve nascer de uma especificacao clara, com objetivo, escopo, criterios de aceitacao e tarefas verificaveis.

## Principio central

No Portal NITE, a especificacao deve ser a fonte de verdade do produto.

- Nenhuma funcionalidade relevante deve ser implementada sem spec.
- Nenhuma alteracao visual relevante deve ser feita sem ligacao com UX, identidade ou objetivo institucional.
- Nenhuma task deve ser marcada como concluida sem evidencia objetiva.
- Nenhuma entrega deve ser considerada finalizada apenas porque parece pronta.
- Toda entrega deve estar vinculada a requisitos, criterios de aceitacao e Definition of Done.

## Visao do produto

O Portal NITE e a interface publica e institucional do Nucleo de Inovacao, Tecnologia e Experiencia da UNIJORGE.

Seu objetivo e funcionar como a principal ponte digital entre o nucleo e o ecossistema academico, permitindo que estudantes, professores, coordenadores, parceiros externos e visitantes institucionais acompanhem projetos, conhecam entregas, entendam a historia do nucleo, acessem oportunidades e entrem em contato com o NITE.

O portal deve evoluir de uma landing page institucional para uma plataforma viva de portfolio, documentacao, credibilidade, comunicacao e relacionamento.

## Objetivos do produto

- Consolidar a presenca digital institucional do NITE.
- Apresentar o nucleo como referencia em inovacao aplicada dentro da UNIJORGE.
- Exibir projetos desenvolvidos ou em desenvolvimento por estudantes e colaboradores.
- Organizar a historia do nucleo por meio de timeline e registros.
- Preparar o portal para futuras oportunidades e processos seletivos.
- Reduzir dependencia exclusiva de WhatsApp, e-mail e Instagram para comunicacao institucional.
- Melhorar usabilidade, acessibilidade, SEO, performance e credibilidade.
- Criar uma base escalavel para projetos, atualizacoes, depoimentos e oportunidades.

## Fora de escopo nesta fase

- Area autenticada para alunos.
- Dashboard administrativo completo.
- CMS avancado obrigatorio.
- Sistema completo de acompanhamento de candidatura.
- Chat em tempo real.
- Integracao complexa com sistemas internos da universidade.
- Publicacao automatica de posts do Instagram.
- Metricas institucionais avancadas sem dados reais validados.

## Publicos-alvo

- Estudantes de tecnologia: buscam projetos, stacks, participacao, oportunidades e impacto profissional.
- Estudantes de outras areas: buscam compreender como tecnologia, inovacao e experiencia se conectam aos seus cursos.
- Professores: buscam propor desafios, conhecer projetos e acompanhar resultados.
- Gestores: buscam compreender valor institucional, maturidade das entregas e caminhos de contato.
- Coordenadores: buscam valor institucional, visibilidade academica, historico e integracao com cursos.
- Parceiros externos e publico externo: buscam credibilidade, portfolio, responsaveis, maturidade tecnica, evidencias e contato.
- Ex-integrantes: buscam acompanhar evolucao do nucleo, registros e projetos.
- Visitantes institucionais: buscam entender o que e o NITE, sua historia, frentes de atuacao e relevancia.

No MVP Premium, estudantes, professores, gestores, coordenadores e visitantes institucionais possuem peso primario na experiencia inicial. Parceiros externos e ex-integrantes sao contemplados, mas dependem de mais maturidade de cases, evidencias e depoimentos.

## Conversoes prioritarias

Conversoes atuais:

- Acompanhar entregas.
- Ver portfolio de projetos.
- Conhecer frentes de atuacao.
- Entender a historia do NITE.
- Contatar o nucleo.

Conversoes futuras:

- Candidatar-se a oportunidades abertas.
- Enviar curriculo pelo portal.
- Acompanhar status inicial de processo seletivo.
- Propor desafios academicos.
- Acessar atualizacoes, eventos e registros do nucleo.

## Specs filhas

- `001-product-vision-and-scope`
- `002-information-architecture-and-navigation`
- `003-visual-identity-and-design-system`
- `004-project-portfolio-and-detail-pages`
- `005-opportunities-and-selection-flow`
- `006-news-community-and-timeline`
- `007-accessibility-seo-performance-baseline`
- `008-implementation-and-release-control`

## ADRs relacionados

- `docs/adr/001-content-source.md`
- `docs/adr/002-routing-strategy.md`
- `docs/adr/003-animation-strategy.md`
- `docs/adr/004-accessibility-baseline.md`
- `docs/adr/005-opportunities-submission-channel.md`
- `docs/adr/006-project-status-model.md`

Todos os ADRs relacionados estao como Proposto ate revisao explicita. Nenhum ADR deve ser tratado como Aceito automaticamente.

ADRs serao aprovadas somente quando a milestone correspondente exigir a decisao tecnica:

- Fonte de conteudo: decidir quando entrar em projetos, atualizacoes e governanca de conteudo.
- Estrategia de rotas: decidir ao iniciar arquitetura de informacao.
- Estrategia de animacoes: decidir na Spec 003.
- Baseline de acessibilidade: decidir na baseline de qualidade.
- Canal de oportunidades: decisao de produto aprovada para formulario integrado; detalhes tecnicos ainda dependem de implementacao futura.
- Modelo de status de projetos: decidir ao iniciar portfolio de projetos.

## Pendencias estrategicas conhecidas

- Validar valores-alvo das metricas de sucesso.
- Fechar API, variantes e estados dos componentes antes de implementacao ampla.
- Separar continuamente MVP, futuro possivel e fora de escopo em novas specs.
- Definir governanca minima de conteudo em reuniao com o nucleo.

## Governanca minima de conteudo

Status: Pendente de validacao coletiva.

O gestor do projeto nao fechara esta decisao sozinho. Ate decisao formal do nucleo, toda spec que lidar com conteudo deve prever:

- Responsavel por atualizacao.
- Revisao minima de conteudo antes de publicacao.
- Autorizacao para uso de imagens, depoimentos e nomes.
- Manutencao de status dos projetos.
- Remocao ou sinalizacao de conteudo sem validacao.

## Regra de rastreabilidade

Toda implementacao futura deve referenciar:

- Uma spec.
- Uma milestone.
- Uma lista de tasks verificaveis.
- Criterios de aceitacao.
- Evidencias de conclusao.
- ADR aplicavel, quando a entrega depender de decisao tecnica ou de produto.
