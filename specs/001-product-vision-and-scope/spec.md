# Spec 001 - Product Vision & Scope

## Status

Milestone 1 iniciada oficialmente - base de produto consolidada; governanca coletiva pendente

## Milestone

Milestone 1 - Product Vision & Scope

## Registro oficial da Milestone 1

Status: Em andamento.

Data de inicio oficial: 2026-05-13.

Objetivo desta etapa: validar, revisar e consolidar a Spec 001 como base oficial do produto antes de qualquer avancao para a Spec 002.

Resultado da revisao documental:

- Visao do produto consolidada.
- Escopo do MVP Premium consolidado.
- Publico-alvo e prioridade de experiencia consolidados.
- Personas e jornadas funcionais consolidadas.
- Metricas de sucesso qualitativas consolidadas, sem metas numericas inventadas.
- Riscos e mitigacoes consolidados.
- Diferenca entre MVP, futuro possivel e fora de escopo consolidada.
- Governanca minima de conteudo mantida como Pendente de validacao coletiva.
- ADRs mantidas como Proposto.

## Aprovador oficial

O escopo do MVP Premium e aprovado pelo gestor e desenvolvedor responsavel pelo projeto. Decisoes aprovadas por ele passam a valer como referencia oficial para o Portal NITE.

Excecao: decisoes que dependem do nucleo, como governanca minima de conteudo, permanecem como Pendente de validacao coletiva ate reuniao com o nucleo.

## Objetivo

Consolidar a estrategia do Portal NITE como produto institucional premium.

## Escopo

- Definir visao do produto.
- Definir publicos-alvo.
- Definir conversoes prioritarias.
- Definir escopo do MVP premium.
- Definir fora de escopo.
- Definir riscos e oportunidades.

## Definicao objetiva de MVP premium

O MVP premium do Portal NITE e a menor versao publica que deixa o portal confiavel, navegavel e institucionalmente apresentavel sem depender de dados inventados ou promessas futuras.

Premium nao significa apenas estetica visual. Para o Portal NITE, premium significa clareza, navegacao, credibilidade, acessibilidade, performance, SEO institucional, consistencia visual, movimento controlado, institucionalidade tecnologica, conteudo honesto e governanca leve.

Para ser considerado MVP premium, o portal deve cumprir todos estes criterios:

- Clareza: o usuario entende o que e o NITE rapidamente a partir da home.
- Navegacao: o usuario acessa projetos, contato e oportunidades em ate 2 interacoes.
- Credibilidade: projetos exibem status real, objetivo, stack e responsaveis quando autorizado.
- Acessibilidade: a interface preve foco visivel, contraste adequado, navegacao por teclado e suporte a motion reduzido.
- Performance: a interface e leve, responsiva e revisada em mobile.
- SEO institucional: paginas principais possuem estrutura, titulos e descricoes adequadas para indexacao.
- Consistencia visual: cards, botoes, badges, secoes e CTAs seguem design system.
- Movimento controlado: animacoes guiam atencao, sem distrair.
- Institucionalidade tecnologica: visual moderno, serio e tecnologico, sem parecer infantil ou exagerado.
- Conteudo honesto: nenhum dado ficticio aparece como real.
- Governanca leve: o conteudo preve responsaveis e revisao minima; governanca final permanece Pendente de validacao coletiva com o nucleo.

## MVP, futuro possivel e fora de escopo

### Entra no MVP premium

- Home com narrativa institucional do NITE.
- Arquitetura de informacao e menu principal definidos.
- Rotas publicas essenciais: `/`, `/projetos`, `/projetos/[slug]`, `/oportunidades`, `/atualizacoes` e `/contato`.
- Portfolio inicial de projetos com modelo de dados, status e fallback honesto.
- Pagina de oportunidades com estado coerente, mesmo sem vagas abertas.
- Formulario integrado no proprio portal para oportunidades, como decisao de produto aprovada; backend e detalhes tecnicos ficam como dependencia futura.
- Canal de contato institucional real.
- Tokens visuais, componentes base e padroes de estado.
- Baseline minimo de acessibilidade, SEO e performance.
- Registro de evidencias de validacao por milestone.
- Titulo publico de atualizacoes: NITE em movimento.

### Futuro possivel

- Area autenticada para alunos.
- Dashboard administrativo.
- CMS editorial.
- Acompanhamento de status de processo seletivo apos envio de interesse/curriculo.
- Galeria completa.
- Automacao de publicacao de atualizacoes.
- Metricas avancadas, se houver dados reais validados.
- Rota `/sobre`, caso a secao Sobre da home vire pagina propria.

### Fora de escopo do MVP

- Chat em tempo real.
- Integracao complexa com sistemas internos da universidade.
- Publicacao automatica de posts do Instagram.
- Promessa de resposta automatica em candidatura.
- Dados institucionais nao validados.
- Depoimentos, fotos, responsaveis ou metricas sem autorizacao/validacao.
- Qualquer feature sem spec, criterio de aceitacao e evidencia de conclusao.
- Google Forms ou link externo como canal principal de oportunidades.

Itens de futuro possivel nao estao aprovados automaticamente. Cada um precisa de spec propria e, quando houver decisao relevante, ADR.

## Publico-alvo e prioridade de experiencia

O Portal NITE possui publico amplo.

Publicos contemplados:

- Estudantes.
- Professores.
- Gestores.
- Coordenadores.
- Visitantes institucionais.
- Publico externo.
- Parceiros externos.
- Ex-integrantes.

No MVP Premium, a prioridade de experiencia e permitir que qualquer visitante entenda o NITE, visualize projetos, acompanhe entregas e encontre canais institucionais de contato.

Estudantes, professores, gestores, coordenadores e visitantes institucionais possuem peso primario na experiencia inicial. Parceiros externos e ex-integrantes tambem sao contemplados, mas dependem de mais maturidade de cases, evidencias e depoimentos.

## Personas e jornadas

As personas abaixo sao perfis funcionais aprovados para orientar a experiencia inicial. Nao representam pessoas reais e nao autorizam uso de nomes, depoimentos ou dados institucionais.

| Persona | Objetivo principal | Jornada essencial | Conversao esperada |
|---|---|---|---|
| Estudante de tecnologia | Entender projetos, stacks e formas de participacao | Acessa home, abre projetos, filtra por area/status, le detalhe de projeto, procura oportunidade ou contato | Ver projeto ou acompanhar oportunidade |
| Estudante de outra area | Entender como inovacao e tecnologia conectam com seu curso | Acessa home, entende frentes de atuacao, ve exemplos de projetos, busca atualizacoes | Entender frentes e contatar o NITE |
| Professor | Propor desafio ou conhecer entregas existentes | Acessa home, busca projetos e evidencias, abre contato, procura canal para propor demanda | Contatar/propor desafio |
| Gestor ou coordenador | Avaliar valor institucional e integracao com cursos | Acessa home, ve historico, projetos, status e impacto qualitativo validado | Avaliar credibilidade e abrir contato |
| Visitante institucional | Entender o que e o NITE e sua relevancia | Acessa home, le resumo, ve timeline/atualizacoes, encontra contato | Compreender o nucleo |
| Parceiro externo ou ex-integrante | Ver maturidade, responsaveis autorizados e evidencias | Acessa portfolio, abre projeto, verifica stack/status/evidencias, procura contato | Contatar o nucleo, quando houver cases maduros |

## Metricas de sucesso

As metricas abaixo sao criterios de sucesso aprovados para o MVP Premium. Nao ha metas numericas institucionais inventadas.

| Metrica | Como mede sucesso | Status |
|---|---|---|
| Clareza | Usuario entende o que e o NITE rapidamente a partir da home | Aprovada pelo gestor |
| Navegacao | Usuario acessa projetos, contato e oportunidades em ate 2 interacoes | Aprovada pelo gestor |
| Credibilidade | Projetos exibem status real, objetivo, stack e responsaveis quando autorizado | Aprovada pelo gestor |
| Conteudo honesto | Nenhum placeholder publico aparece como dado real | Aprovada pelo gestor |
| Cobertura de specs | Toda entrega relevante referencia spec e milestone | Aprovada pelo gestor |
| Acessibilidade minima | Fluxos principais funcionam por teclado, foco visivel, contraste e motion reduzido | Aprovada pelo gestor |
| Responsividade/performance | Interface e leve, responsiva e revisada em mobile | Aprovada pelo gestor |
| SEO institucional | Rotas publicas possuem estrutura, titulos e descricoes para indexacao | Aprovada pelo gestor |
| Governanca leve | Conteudo preve responsaveis e revisao minima | Pendente de validacao coletiva |

## Riscos e mitigacao

| Risco | Impacto | Mitigacao |
|---|---|---|
| Conteudo institucional nao validado | Perda de credibilidade | Marcar como pendente de validacao ou remover da entrega publica |
| MVP virar escopo amplo demais | Atraso e retrabalho | Manter separacao entre MVP, futuro possivel e fora de escopo |
| Rotas vazias parecerem quebradas | Experiencia ruim | Criar estados vazios honestos e CTAs reais |
| CTAs sem destino real | Promessa falsa ao usuario | Usar CTAs e destinos aprovados pelo gestor ou retirar o CTA da entrega |
| Identidade visual escura prejudicar leitura | Baixa usabilidade | Validar contraste, tipografia e espacamento |
| Animacoes prejudicarem acessibilidade/performance | Regressao tecnica | Exigir `prefers-reduced-motion` e revisar custo em mobile |
| Projetos sem evidencia parecerem concluidos | Informacao enganosa | Usar status real e fallback honesto |
| ADR proposto ser tratado como aprovado | Decisao prematura | Manter ADRs como Proposto ate revisao explicita |
| Governanca de conteudo ficar indefinida | Conteudo desatualizado ou publicado sem revisao | Manter como Pendente de validacao coletiva e prever responsaveis, revisao e autorizacoes |
| Formulario de oportunidades depender de backend futuro | Canal aprovado pode atrasar implementacao | Registrar decisao de produto aprovada e tratar backend como dependencia tecnica futura |

## Canal de oportunidades

O MVP usara formulario integrado no proprio portal.

- O formulario deve priorizar o uso de e-mail institucional do estudante.
- O canal principal nao sera Google Forms nem link externo.
- O objetivo do formulario e permitir envio de interesse, curriculo ou dados necessarios ao processo seletivo, quando houver oportunidade aberta.
- Backend, armazenamento, notificacao e protecao de dados sao dependencias tecnicas futuras.
- O formulario nao deve ser implementado sem spec tecnica e criterios de aceitacao.

## Governanca minima de conteudo

Status: Pendente de validacao coletiva.

O gestor do projeto nao fechara essa decisao sozinho. A definicao depende de reuniao com o nucleo.

Ate decisao formal, o MVP deve prever:

- Responsaveis por atualizacao.
- Revisao de conteudo antes de publicacao.
- Autorizacao de imagens e depoimentos.
- Autorizacao para exibir responsaveis/equipe.
- Manutencao de status dos projetos.

## Checklist de validacao

- [x] A visao do produto esta clara em ate um paragrafo.
- [x] O documento explica por que o portal nao e apenas uma landing page.
- [x] Todos os publicos citados estao contemplados.
- [x] As conversoes estao priorizadas.
- [x] O MVP nao tenta resolver funcionalidades futuras complexas.
- [x] O documento pode ser usado para orientar decisoes de UX/UI.
- [x] A diferenca entre MVP, futuro possivel e fora de escopo esta clara.
- [x] Personas e jornadas estao documentadas como perfis funcionais.
- [x] Metricas de sucesso estao documentadas sem inventar alvo numerico institucional.
- [x] Riscos e mitigacoes estao documentados.
- [x] A prioridade de experiencia por publico esta documentada.
- [x] O canal de oportunidades esta definido como formulario integrado, com dependencia tecnica futura.
- [x] A governanca minima esta registrada como Pendente de validacao coletiva.

## Criterios de aceitacao

- [x] Dado que um novo colaborador le a spec, quando termina a leitura, entao consegue explicar o objetivo do Portal NITE.
- [x] Dado que uma decisao visual precisa ser tomada, quando consultada a spec, entao existe direcionamento estrategico para justificar a decisao.
- [x] Dado que uma nova feature e proposta, quando comparada ao escopo do MVP, entao e possivel decidir se entra agora ou depois.
- [x] Dado que um item futuro e sugerido, quando comparado a esta spec, entao fica claro se e MVP, futuro possivel ou fora de escopo.
- [x] Dado que uma metrica e usada para validar sucesso, quando revisada, entao nao inventa meta numerica institucional.
- [x] Dado que uma decisao depende do nucleo, quando revisada, entao aparece como Pendente de validacao coletiva.

## Evidencia de validacao da Milestone 1

Revisao documental realizada em 2026-05-13 usando a Spec Mae, esta Spec 001 e `tasks.md` como fonte de verdade.

Esta validacao consolida a Spec 001 como base oficial de produto, mas nao encerra a pendencia externa de governanca minima de conteudo.
