# Tasks - Project Portfolio & Detail Pages

- [x] Definir modelo de dados de projeto. Evidencia: Modelo documental consolidado na Spec 004 com `title`, `summary`, `area`, `status`, `problem`, `objective`, `stack`, `updatedAt` e `nextStep`.
- [x] Definir status possiveis de projeto. Evidencia: Status `draft`, `in_progress`, `validated`, `done` e `archived` documentados na Spec 004.
- [x] Definir labels publicas dos status. Evidencia: Labels "Em estruturacao", "Em andamento", "Validado", "Finalizado" e "Arquivado" documentadas na Spec 004.
- [x] Definir requisitos funcionais da pagina `/projetos`. Evidencia: Requisitos de listagem, filtros, grid, navegacao e estados registrados na Spec 004.
- [x] Definir requisitos funcionais da rota `/projetos/[slug]`. Evidencia: Estrutura da pagina individual registrada na Spec 004.
- [x] Definir requisitos nao funcionais. Evidencia: Acessibilidade, SEO, performance, responsividade e manutenibilidade registrados na Spec 004.
- [x] Definir estrutura do ProjectCard. Evidencia: Estrutura informacional e comportamento visual documentados na Spec 004.
- [x] Definir estrutura da pagina individual de projeto. Evidencia: Blocos obrigatorios, opcionais e condicionais documentados na Spec 004.
- [x] Definir campos obrigatorios e opcionais da pagina de projeto. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao e consolidada na Spec 004.
- [x] Definir regra de linguagem para evitar "entregaveis" como secao obrigatoria publica. Evidencia: Regra de linguagem consolidada na Spec 004.
- [x] Definir comportamento de filtros por status. Evidencia: Filtros por status e combinacao de filtros documentados na Spec 004.
- [x] Definir comportamento de filtros por area. Evidencia: Filtros por area/frente e combinacao de filtros documentados na Spec 004.
- [x] Definir estados vazios, ausentes e pendentes. Evidencia: Estados sem projetos, sem resultado, sem evidencias, sem autorizacao e status de projeto documentados na Spec 004.
- [x] Registrar criterios de aceitacao da Milestone 4. Evidencia: Criterios de aceitacao documentados em requirements.md.
- [x] Registrar aprovacao da ADR-006 antes da implementacao de ProjectCard e StatusBadge aplicado. Evidencia: ADR-006 aceita para liberar ProjectCard, StatusBadge aplicado e portfolio de projetos.

- [x] Criar pagina `/projetos`. Evidencia: `app/projetos/page.tsx` criado com metadata institucional, H1 unico, listagem responsiva a partir do JSON existente, `ProjectCard` por item, `StatusBadge` real via ProjectCard e links para os slugs existentes.
- [x] Criar rota `/projetos/[slug]`. Evidencia: `app/projetos/[slug]/page.tsx` existe, usa `generateStaticParams` com slugs do JSON, build gera os slugs atuais e `tests/unit/project-detail-page.test.tsx` cobre renderizacao do detalhe com StatusBadge real.
- [x] Criar componente ProjectCard. Evidencia: `components/sections/project-card.tsx` consolidado com titulo, resumo, area/frente, status, objetivo, proximo passo, stack resumida, ultima atualizacao quando validada, link opcional e fallback honesto sem imagem/evidencia.
- [x] Criar componente ProjectStatusBadge ou aplicar StatusBadge da Spec 003 aos status de projeto. Evidencia: ProjectCard aplica `StatusBadge` real aos status oficiais `draft`, `in_progress`, `validated`, `done` e `archived`, preservando label textual visivel.
- [x] Aplicar ProjectCard na secao de projetos da Home. Evidencia: `ProjectsOperatingSection` substitui o componente legado de status por `ProjectCard`, aplica `StatusBadge` real, mapeia frentes em estruturacao como `draft`, preserva CTA para rotas de detalhe existentes e omite imagem e data publica enquanto nao houver conteudo real validado.
- [x] Migrar status da pagina de detalhe de projeto. Evidencia: `/projetos/[slug]` remove uso do componente legado de status, usa `StatusBadge` real para status oficiais, aplica `ProjectCard` nos projetos relacionados e preserva fallback honesto para frentes sem conteudo real validado.
- [x] Remover componente legado de status de projetos. Evidencia: arquivo antigo removido apos auditoria de usos ativos, mantendo `ProjectCard` e `StatusBadge` como padrao vigente.
- [x] Criar layout da pagina individual de projeto. Evidencia: `/projetos/[slug]` possui cabecalho, breadcrumb, painel lateral de dados, area principal em secoes e bloco de projetos relacionados.
- [x] Criar secao de problema/contexto. Evidencia: pagina individual renderiza secao "Problema e contexto" com cards separados para problema e contexto do JSON.
- [x] Criar secao de objetivo. Evidencia: pagina individual renderiza secao "Objetivo" quando o campo `objective` existe no JSON.
- [x] Criar secao de stack. Evidencia: pagina individual renderiza secao "Stack" quando `technologies` possui itens.
- [x] Criar secao de responsaveis autorizados. Evidencia: pagina individual renderiza "Equipe publica" filtrando `member.public` e exibe fallback honesto quando nao ha autorizacao publica.
- [x] Criar secao de ultima atualizacao. Evidencia: painel lateral exibe data formatada quando `contentState` e real e fallback "Pendente de validacao publica" para frentes em estruturacao.
- [x] Criar secao de proximos passos. Evidencia: pagina individual renderiza secao "Proximo passo" com `project.nextStep`.
- [x] Criar secao de evidencias. Evidencia: pagina individual renderiza "Evidencias e metricas" e usa `EmptyState` quando nao ha metricas ou resultados validados.
- [ ] Criar secao de resultado gerado, quando houver material real validado. Parcial: existe secao condicional "Resultados", mas o conteudo atual do JSON permanece em estruturacao editorial; manter aberta ate haver resultado real validado e autorizado.
- [x] Criar fallback para projeto sem evidencias publicas. Evidencia: ProjectCard, pagina de detalhe e teste `project-detail-page` exibem fallback textual para imagem/evidencia publica indisponivel.
- [x] Criar estado vazio para portfolio sem projetos. Evidencia: `/projetos` renderiza `EmptyState` textual quando a colecao de projetos estiver vazia.
- [x] Criar estado sem resultados para filtros. Evidencia: `/projetos` exibe `EmptyState` textual quando a combinacao de status e area nao retorna cards.
- [x] Implementar filtro por status. Evidencia: `/projetos` usa controles de botao com `aria-pressed`, opcao "Todos", contagens derivadas dos dados e status oficiais da ADR-006.
- [x] Implementar filtro por area. Evidencia: `/projetos` gera opcoes de area a partir das categorias existentes no JSON, inclui opcao "Todas" e combina area com status.
- [x] Validar foco visivel em filtros, cards e links. Evidencia: validacao browser em `/projetos` confirmou foco programatico em filtro e link de card com classes `focus-visible` do sistema.
- [ ] Validar responsividade dos cards. Parcial: auditoria browser confirmou ausencia de scroll horizontal em desktop e mobile, mas responsividade ampla e aceite visual formal permanecem pendentes.
- [ ] Validar leitura em mobile. Parcial: auditoria browser cobriu viewport mobile e ausencia de scroll horizontal, mas leitura mobile completa permanece pendente de validacao dedicada.
- [x] Validar SEO institucional de `/projetos`. Evidencia: pagina define metadata com titulo, descricao, canonical e JSON-LD de breadcrumb para portfolio.
- [x] Validar SEO institucional de `/projetos/[slug]`. Evidencia: pagina individual usa `generateMetadata` com `buildProjectMetadata`, canonical por slug, Open Graph/Twitter por projeto e build validado.
- [ ] Validar que nenhum campo opcional aparece sem autorizacao ou material real. Parcial: listagem, detalhe e testes preservam fallbacks honestos para equipe, evidencias, metricas e datas; validacao completa permanece aberta ate haver conteudo real/autorizado.

## Notas de auditoria e pendencias nao bloqueantes

- Auditoria de fechamento da frente de projetos registrada como aprovada com ressalvas documentais. Evidencia: tasks atualizadas para refletir rota `/projetos`, rota `/projetos/[slug]`, ProjectCard, StatusBadge, filtros, estados, SEO e fallbacks ja implementados.
- Microtask documental executada sem alterar codigo, testes, JSON ou ADRs. Evidencia: apenas este `tasks.md` foi atualizado nesta etapa.
- Pendencia nao bloqueante: avaliar migracao futura do status editorial interno `placeholder` para o modelo ADR-006. Hoje `placeholder` e mapeado para `draft` na UI, sem erro funcional.
- Pendencia nao bloqueante: avaliar decisao futura de UX para breadcrumbs e links de retorno em `/projetos/[slug]`. Hoje apontam para `/#projetos`; revisar se devem apontar para `/projetos`.
- Pendencia nao bloqueante: manter responsividade ampla, leitura mobile completa e aceite visual formal como validacoes futuras antes de release.
