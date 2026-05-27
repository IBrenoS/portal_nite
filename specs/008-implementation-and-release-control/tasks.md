# Tasks - Implementation & Release Control

## Documentacao da Milestone 8

- [x] Criar plano de implementacao por fases. Evidencia: Fases 1 a 6 documentadas em requirements.md.
- [x] Registrar ordem recomendada de implementacao. Evidencia: Ordem operacional documentada em design.md.
- [x] Registrar Definition of Ready. Evidencia: Criterios para iniciar task documentados em requirements.md.
- [x] Registrar Definition of Done. Evidencia: Criterios para concluir task documentados em requirements.md.
- [x] Registrar evidencias aceitas. Evidencia: Tipos de evidencia aceitos documentados em requirements.md.
- [x] Registrar regras anti-alucinacao. Evidencia: Regras contra conteudo ficticio, task sem evidencia, rota futura sem spec e ADR automatica documentadas.
- [x] Criar checklist de PR. Evidencia: Checklist documentado em requirements.md e fluxo operacional em design.md.
- [x] Criar checklist de release. Evidencia: Checklist de release MVP Premium documentado em requirements.md e fluxo operacional em design.md.
- [x] Registrar politica de ADRs. Evidencia: ADRs permanecem Proposto ate decisao tecnica necessaria.
- [x] Registrar politica de implementacao. Evidencia: Implementar uma task por vez, PRs pequenos e controle por spec documentados.
- [x] Registrar politica de conteudo real vs placeholder. Evidencia: Conteudo real, placeholder e autorizacoes documentados.
- [x] Registrar controle de regressao. Evidencia: Regras de regressao documentadas em requirements.md e design.md.
- [x] Registrar controle de escopo. Evidencia: Regras para nao alterar specs relacionadas sem atualizacao documentadas.
- [x] Registrar criterios de aceite da Milestone 8. Evidencia: Criterios documentados em requirements.md.
- [x] Criar guia operacional `design.md`. Evidencia: Arquivo criado com fluxo de task, PR, release, pendencias, ADR e regressao.
- [x] Corrigir consistencia documental entre ADRs e specs aprovadas. Evidencia: Milestone 8.1 revisou ADR-001 a ADR-006 sem alterar status Proposto e sem concluir task de implementacao.
- [x] Aprovar ADR necessaria para primeira implementacao controlada. Evidencia: ADR-004 aceita pelo gestor do projeto apos Readiness Audit para orientar a base visual e tokens; naquele momento, ADR-003 nao foi aprovada porque a primeira task nao incluia motion em escala.
- [x] Aprovar ADR necessaria para implementacao do Header final do MVP. Evidencia: ADR-002 aceita pelo gestor do projeto para liberar Header com MegaMenu desktop compacto e menu mobile em camadas, mantendo rotas futuras separadas das rotas MVP.
- [x] Aprovar ADR necessaria para motion controlado do Header final. Evidencia: ADR-003 aceita pelo gestor do projeto para liberar motion controlado no Header, mega menu desktop e menu mobile em camadas, com suporte a `prefers-reduced-motion`.
- [x] Aprovar ADR necessaria para ProjectCard, StatusBadge aplicado e portfolio de projetos. Evidencia: ADR-006 aceita pelo gestor do projeto para liberar o modelo de status `draft`, `in_progress`, `validated`, `done` e `archived` sem inventar dados reais.
- [x] Aprovar ADR necessaria para oportunidades e fluxo de selecao. Evidencia: ADR-005 aceita pelo gestor do projeto para liberar a Spec 005 com formulario integrado como canal principal do MVP, mantendo backend, armazenamento, notificacao e privacidade como dependencias tecnicas futuras.
- [x] Fechar inconsistencia de navegacao MVP para `/contato`. Evidencia: microauditoria de rotas confirmou Header CTA `Falar com o NITE` e Footer apontando para `/contato`, `/contato` renderizando com H1 unico e sem formulario/canal ficticio, rotas MVP respondendo em browser local e build listando `/`, `/projetos`, `/projetos/[slug]`, `/oportunidades`, `/atualizacoes` e `/contato`.
- [x] Executar auditoria reversa da Living Timeline. Evidencia: codigo atual mapeado como shell visual premium na Home com GSAP `ScrollTrigger`, filtro anti-placeholder por `sourceStatus === "confirmado"`, sem marcos reais publicados, sem novas rotas e com pendencias documentadas na Spec 006/007.
- [x] Registrar aceite visual da Living Timeline premium no estado atual. Status: visual aceito com ressalvas de produto/conteudo preservadas. Evidencia: auditoria tecnica confirmou desktop/mobile, dark/light, reduced motion, CTA `/atualizacoes` por foco/teclado, ausencia de placeholder publico, ausencia de autoplay, ausencia de scroll hijacking/travamento e GSAP `ScrollTrigger` sem erro visivel nem loop aparente. O warning dev de reduced motion da lib Motion foi classificado como nao bloqueante para o aceite visual atual.

## Homologação controlada do MVP Premium

- [x] Registrar status final da auditoria de homologacao. Status: Aprovado para homologação controlada. Evidencia: auditoria final curta confirmou ausencia de pendencias bloqueantes conhecidas, copy global sem "projetos reais", snapshot visual da Home atualizado, rotas MVP confirmadas e rotas futuras nao publicadas.
- [x] Registrar fechamento da homologacao controlada atual. Status: Homologação controlada validada/aprovada para o estado atual. Evidencia: feedback inicial aplicado e revalidado; estado homologado definido como MVP Premium em dark mode; atualizacao posterior da Spec 003 concluiu Light Mode e Theme Toggle, preservando o dark mode como baseline principal.

### Fechamento da homologacao controlada atual

- Status: `Homologação controlada validada/aprovada para o estado atual`.
- Estado homologado: `MVP Premium em dark mode`.
- Feedback inicial: aplicado e revalidado.
- Light Mode: na homologacao controlada original, o estado validado era o MVP Premium em dark mode; atualizacao posterior da Spec 003 concluiu Light Mode e Theme Toggle com seletor `Escuro`, `Claro` e `Sistema`.
- O estado atual pode seguir como base para decisao de release ou divulgacao controlada.
- Homologacao controlada nao equivale a publicacao ampla, producao final ou aprovacao institucional definitiva de conteudo.
- Ciclos visuais posteriores ao estado homologado, incluindo revisoes sobre Light Mode ja implementado, devem passar por task propria, testes, validacao de contraste e snapshots proprios quando aplicavel.

### Evidencias tecnicas registradas

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- `npm run test`: passou com 9 arquivos e 38 testes.
- `npx playwright test tests/visual/home.visual.spec.ts --reporter=list`: passou com 1 teste.

### Rotas MVP confirmadas

- `/`.
- `/projetos`.
- `/projetos/[slug]`.
- `/oportunidades`.
- `/atualizacoes`.
- `/contato`.

### Rotas futuras nao publicadas

- `/noticias`.
- `/sobre`.
- `/contato?tipo=desafio` como fluxo dedicado.
- `/atualizacoes/[slug]`.
- `/eventos`.
- `/oficinas`.
- `/galeria`.
- `/comunidade`.

### Pendencias futuras e externas preservadas

- ADR-001 permanece `Proposto`.
- Governança mínima de conteudo permanece `Pendente de validação coletiva`.
- Backend, storage, notificacao e privacidade operacional de oportunidades permanecem pendentes.
- Formulario funcional de oportunidades permanece futuro.
- Timeline historica completa, marcos reais validados, contrato de dados e governanca de conteudo permanecem pendentes.
- Fotos e depoimentos autorizados permanecem pendentes.
- Conteudo real futuro permanece dependente de validacao/autorizacao institucional.
- Spec 003 esta fechada para o escopo MVP: Light Mode, Theme Toggle, auditoria hardcoded de dark mode, validacao de componentes em dark/light e metadados visuais foram concluidos; as duas P2 remanescentes foram removidas do backlog ativo por decisao de escopo, sem implementacao.
- Homologacao controlada nao equivale a publicacao ampla ou producao sem validacao institucional.
- Conteudo real adicional exige validacao/autorizacao antes de publicacao.

## Implementacao futura

- [ ] Revisar backlog de tasks abertas das Specs 003 a 007.
- [ ] Priorizar tasks de base visual e navegacao.
- [ ] Mapear dependencias tecnicas.
- [ ] Revisar ADRs necessarias antes da implementacao.
- [ ] Validar Definition of Ready para a primeira task.
- [ ] Validar Definition of Done para a primeira task.
- [ ] Preparar primeira task de implementacao.
- [ ] Identificar arquivos provaveis de alteracao da primeira task.
- [ ] Criar branch especifica para a primeira task.
- [ ] Criar pull request com referencia a spec.
- [ ] Associar cada PR a tasks especificas.
- [ ] Exigir checklist preenchido antes de merge.
- [ ] Registrar evidencias da implementacao.
- [ ] Testar em ambiente local.
- [ ] Testar em preview/deploy de homologacao, quando existir.
- [ ] Validar rotas principais.
- [ ] Validar responsividade.
- [ ] Validar acessibilidade minima.
- [ ] Validar SEO basico.
- [ ] Validar performance.
- [ ] Validar conteudo institucional.
- [ ] Auditar pendencias externas.
- [ ] Auditar conteudo real vs placeholder.
- [ ] Auditar rotas futuras.
- [ ] Auditar SEO.
- [ ] Auditar acessibilidade.
- [ ] Auditar performance.
- [ ] Auditar responsividade.
- [ ] Registrar pendencias conhecidas.
- [ ] Definir governanca minima de conteudo em reuniao coletiva com o nucleo.
