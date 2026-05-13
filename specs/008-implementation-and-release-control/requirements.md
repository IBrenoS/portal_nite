# Requirements - Implementation & Release Control

## Status

Milestone 8 iniciada oficialmente - controle de implementacao e release em consolidacao

## Milestone

Milestone 8 - Implementation & Release Control

## Objetivo

Controlar a implementacao incremental do Portal NITE por tasks rastreaveis, criterios objetivos, evidencias e validacao transversal de acessibilidade, SEO, performance, responsividade e conteudo.

Esta Spec consolida requisitos documentais. Nao implementa codigo, nao cria branch, nao cria PR, nao executa testes, nao configura CI/CD, nao aprova ADR e nao inicia implementacao.

## Escopo

- Estrategia de implementacao incremental.
- Ordem recomendada de implementacao.
- Controle por tasks.
- Criterios para iniciar task.
- Criterios para concluir task.
- Evidencias obrigatorias.
- Validacao por spec.
- Checklist de PR.
- Checklist de release.
- Controle de regressao.
- Controle de escopo.
- Relacao entre specs, tasks, codigo e testes.
- Politica para ADRs.
- Politica para conteudo real vs placeholder.
- Estrategia de branch, commit e PR.
- Criterios de aceite da release MVP Premium.

Governanca minima de conteudo permanece Pendente de validacao coletiva. A release deve prever responsaveis por atualizacao, revisao de conteudo, autorizacao de imagens/depoimentos e manutencao de status dos projetos. A regra final depende de reuniao com o nucleo e nao esta aprovada nesta etapa.

## Estrategia de implementacao incremental

### Fase 1 - Base visual e navegacao

- Aplicar tokens visuais.
- Estruturar componentes base.
- Implementar Header.
- Implementar navegacao desktop.
- Implementar navegacao mobile.
- Implementar Footer institucional.

### Fase 2 - Home premium

- Refinar hero.
- Aplicar CTAs aprovados.
- Organizar secao Sobre.
- Organizar frentes de atuacao.
- Organizar destaques de projetos.
- Integrar timeline/resumo.
- Garantir responsividade.

### Fase 3 - Projetos

- Criar `/projetos`.
- Criar `/projetos/[slug]`.
- Criar ProjectCard.
- Criar StatusBadge.
- Criar filtros.
- Aplicar estados vazios.
- Validar SEO e acessibilidade.

### Fase 4 - Oportunidades

- Criar `/oportunidades`.
- Criar estados com/sem processo aberto.
- Preparar formulario documentalmente definido.
- Implementar frontend do formulario somente quando backend/canal estiver decidido.
- Nao prometer resposta automatica.

### Fase 5 - Atualizacoes

- Criar `/atualizacoes`.
- Criar UpdateCard.
- Criar Timeline.
- Usar apenas conteudo validado.
- Nao publicar fotos/depoimentos sem autorizacao.

### Fase 6 - Qualidade e release

- Validar acessibilidade.
- Validar SEO.
- Validar performance.
- Validar responsividade.
- Validar conteudo real.
- Revisar checklist global.
- Preparar release.

## Controle por tasks

- Toda implementacao futura deve partir de uma task rastreavel.
- Toda task deve referenciar spec, milestone e criterio de aceite.
- Uma task deve ter escopo pequeno o suficiente para revisao objetiva.
- Tasks de implementacao nao podem ser marcadas como concluidas sem evidencia objetiva.
- Tasks que dependem de decisao externa devem permanecer abertas ou bloqueadas.
- Tasks que exigem conteudo real inexistente devem prever fallback honesto antes de implementacao.

## Definition of Ready

Uma task so pode iniciar quando:

- Esta vinculada a uma spec.
- Possui objetivo claro.
- Possui escopo delimitado.
- Possui criterios de aceitacao.
- Possui dependencias conhecidas.
- Nao depende de decisao externa pendente.
- Nao exige conteudo real inexistente sem fallback.
- Possui resultado verificavel.
- Possui arquivos provaveis de alteracao identificados.
- Nao contradiz specs anteriores.

## Definition of Done

Uma task so pode ser concluida quando:

- Criterios de aceitacao foram atendidos.
- Implementacao foi validada em desktop.
- Implementacao foi validada em mobile.
- Estados relevantes foram considerados.
- Acessibilidade minima foi verificada.
- Foco visivel foi preservado quando aplicavel.
- Navegacao por teclado foi testada quando aplicavel.
- SEO foi revisado quando aplicavel.
- Performance nao sofreu regressao evidente.
- Nao ha conteudo ficticio apresentado como real.
- Evidencia foi registrada.
- Arquivos alterados foram listados.
- Pendencias foram declaradas.

## Evidencias aceitas

- Print da tela.
- Link de preview/deploy.
- Checklist preenchido.
- Descricao de teste manual.
- Resultado de teste automatizado, quando existir.
- Diff, commit ou PR.
- Validacao de stakeholder.
- Auditoria de acessibilidade, SEO ou performance, quando feita.
- Observacoes de pendencias.

Evidencias so podem ser registradas quando existirem de fato. Nao inventar print, resultado de teste, auditoria, metrica, commit, PR ou validacao.

## Regras anti-alucinacao na implementacao

- Nao criar conteudo institucional ficticio.
- Nao inventar projetos, autores, depoimentos, metricas, datas, fotos ou responsaveis.
- Nao marcar task como concluida sem evidencia.
- Nao implementar rotas futuras sem spec.
- Nao alterar escopo aprovado sem atualizar spec.
- Nao aprovar ADR automaticamente.
- Nao esconder pendencias.
- Nao criar placeholders publicos que parecam conteudo real.
- Nao remover estados vazios, erro, loading ou sucesso por conveniencia.

## Checklist de PR

- PR referencia a spec e task.
- Descricao explica o que foi implementado.
- Arquivos alterados listados.
- Criterios de aceitacao citados.
- Prints ou evidencias anexadas quando visual.
- Validacao desktop/mobile registrada.
- Validacao de teclado/foco registrada quando aplicavel.
- SEO revisado quando aplicavel.
- Nenhum conteudo ficticio publicado como real.
- Pendencias declaradas.

## Checklist de release MVP Premium

- Home revisada.
- Header e navegacao funcionando em desktop/mobile.
- CTAs aprovados funcionando.
- `/projetos` funcionando ou documentadamente planejado para implementacao.
- `/projetos/[slug]` funcionando ou documentadamente planejado.
- `/oportunidades` funcionando com estado coerente.
- `/atualizacoes` funcionando com estado coerente.
- `/contato` funcionando.
- SEO basico aplicado.
- Open Graph aplicado.
- Sitemap/robots avaliados.
- Acessibilidade minima validada.
- Foco visivel validado.
- Responsividade validada.
- Performance revisada.
- Conteudo ficticio removido ou claramente marcado.
- Governanca pendente registrada.
- ADRs necessarias revisadas.
- Pendencias conhecidas documentadas.

## Controle de regressao

- Cada alteracao deve preservar comportamentos aprovados em specs anteriores.
- Mudancas de navegacao devem ser conferidas contra a Spec 002.
- Mudancas visuais devem ser conferidas contra a Spec 003.
- Mudancas em projetos devem ser conferidas contra a Spec 004.
- Mudancas em oportunidades devem ser conferidas contra a Spec 005.
- Mudancas em atualizacoes/timeline devem ser conferidas contra a Spec 006.
- Mudancas em acessibilidade, SEO, performance ou responsividade devem ser conferidas contra a Spec 007.
- Regressao conhecida deve ser registrada como pendencia, nao ocultada.

## Controle de escopo

- Implementar uma task por vez.
- Preferir PRs pequenos.
- Nao misturar redesign global com feature especifica.
- Nao alterar rotas futuras sem spec aprovada.
- Nao alterar tokens sem atualizar Spec 003.
- Nao alterar arquitetura de navegacao sem atualizar Spec 002.
- Nao alterar modelo de projeto sem atualizar Spec 004.
- Nao alterar formulario de oportunidades sem atualizar Spec 005.
- Nao alterar atualizacoes/timeline sem atualizar Spec 006.
- Nao alterar baseline de qualidade sem atualizar Spec 007.

## Relacao entre specs, tasks, codigo e testes

- Spec define intencao, requisitos, design e criterios.
- Task traduz parte da spec em entrega verificavel.
- Codigo implementa a task.
- Teste, revisao manual ou auditoria valida a entrega.
- Evidencia registra o que foi validado.
- Pendencia registra o que ficou fora da entrega.

## Politica de ADRs

- ADRs permanecem Proposto ate a milestone exigir decisao tecnica.
- ADR pode ser aprovado somente quando a decisao tecnica for necessaria para implementacao.
- ADR aprovado deve registrar contexto, decisao, alternativas e consequencias.
- ADR nao pode ser aprovado apenas porque uma spec mencionou o tema.
- Quando uma implementacao depender de ADR Proposto, a ADR deve ser aprovada ou rejeitada antes da mudanca tecnica.

## Politica para conteudo real vs placeholder

- Conteudo real precisa estar validado/autorizado.
- Placeholder publico deve estar claramente sinalizado como placeholder, rascunho ou pendente.
- Placeholder nao pode parecer dado institucional real.
- Projetos, atualizacoes, oportunidades, depoimentos, fotos, autores, datas, metricas e responsaveis nao podem ser inventados.
- Conteudo dependente do nucleo deve permanecer Pendente de validacao coletiva ate decisao formal.

## Estrategia de branch, commit e PR

- Usar branch especifica para uma task ou conjunto pequeno de tasks relacionadas.
- Commits devem ser pequenos e descritivos.
- PR deve referenciar spec, milestone e tasks atendidas.
- PR nao deve misturar mudancas sem relacao direta.
- PR visual deve incluir evidencia visual quando disponivel.
- PR deve declarar validacoes realizadas e pendencias restantes.

## Criterios de aceite da Milestone 8

- [ ] Dado que uma task sera implementada, quando consultada, entao ela esta vinculada a uma spec e possui criterio de aceite.
- [ ] Dado que uma task foi concluida, quando auditada, entao possui evidencia objetiva.
- [ ] Dado que uma PR e aberta, quando revisada, entao cita spec, task, arquivos alterados e validacoes realizadas.
- [ ] Dado que uma rota futura aparece na documentacao, quando implementacao for solicitada, entao ha spec aprovada para ela.
- [ ] Dado que um conteudo real e exibido, quando auditado, entao esta validado/autorizado.
- [ ] Dado que uma release e preparada, quando revisada, entao cumpre checklist de acessibilidade, SEO, performance, responsividade e conteudo.
- [ ] Dado que uma ADR esta como Proposto, quando a implementacao depender dela, entao deve ser aprovada ou rejeitada antes da mudanca tecnica.
- [ ] Dado que uma pendencia depende do nucleo, quando encontrada, entao permanece documentada e nao bloqueia o que nao depende dela.

## Criterios documentais da Milestone 8

- [x] Estrategia incremental de implementacao registrada.
- [x] Definition of Ready registrada.
- [x] Definition of Done registrada.
- [x] Evidencias aceitas registradas.
- [x] Regras anti-alucinacao registradas.
- [x] Checklist de PR registrado.
- [x] Checklist de release registrado.
- [x] Politica de ADRs registrada.
- [x] Politica de implementacao registrada.
- [x] Criterios de aceite da Milestone 8 registrados.
- [x] Pendencias de implementacao, auditoria real e governanca coletiva mantidas fora do escopo documental da Milestone 8.
