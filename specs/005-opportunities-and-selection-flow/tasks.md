# Tasks - Opportunities & Selection Flow

## Status final do MVP sem backend

- [x] Fechar Spec 005 para o escopo MVP sem backend. Evidencia: `/oportunidades` existe com estado "sem oportunidades abertas", `OpportunityBanner`, `OpportunityStatus`, preview inativo do formulario, SEO, foco visivel, mobile validado e sem fluxo real de envio/coleta.

## Concluido no MVP sem backend

- [x] Definir requisitos funcionais da pagina `/oportunidades`. Evidencia: Requisitos documentados na Spec 005.
- [x] Definir estado "sem oportunidades abertas". Evidencia: Estado default sem processo confirmado documentado e implementado.
- [x] Definir estado "processo aberto". Evidencia: Estado com processo aberto documentado como futuro/condicional, com campos minimos validados antes de publicacao.
- [x] Definir informacoes minimas de uma oportunidade. Evidencia: Titulo, area, status, resumo, requisitos, elegibilidade, prazo validado, forma de envio e observacoes institucionais documentados como contrato futuro.
- [x] Definir modelo documental de oportunidade. Evidencia: `Opportunity` consolidado em `requirements.md`.
- [x] Definir modelo documental do formulario. Evidencia: `OpportunityApplication` consolidado em `requirements.md` como contrato futuro.
- [x] Definir campos obrigatorios do formulario. Evidencia: Nome completo, e-mail institucional, curso, area de interesse e aceite/ciencia registrados para o formulario funcional futuro.
- [x] Definir campos opcionais/condicionais do formulario. Evidencia: Semestre, link de curriculo, upload de curriculo e mensagem opcional registrados como decisoes futuras/condicionais.
- [x] Definir areas possiveis: Programacao, Dados e IA, Robotica, UX/UI, Automacao, Social media, Documentacao e Experiencia digital. Evidencia: Areas documentadas e exibidas como possibilidades, sem anunciar vaga ativa.
- [x] Definir CTA principal da area: "Acompanhar oportunidades". Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao; no estado sem oportunidades abertas, o CTA secundario seguro e "Falar com o NITE".
- [x] Definir CTA secundario "Falar com o NITE" quando aplicavel. Evidencia: CTA secundario documentado e aplicado para estado sem oportunidades abertas.
- [x] Definir canal principal de envio como formulario integrado no portal. Evidencia: ADR-005 aceita formulario integrado como canal principal futuro, sem ativar envio no MVP sem backend.
- [x] Registrar que Google Forms, link externo e WhatsApp nao sao canal principal no MVP. Evidencia: Regra documentada na Spec 005 e consolidada na ADR-005 aceita.
- [x] Definir backend, armazenamento, notificacao e protecao de dados como dependencias tecnicas futuras. Evidencia: Dependencias registradas sem implementacao.
- [x] Definir upload/link de curriculo como decisao tecnica futura. Evidencia: Campos condicionais documentados na Spec 005, sem upload/link ativo.
- [x] Definir validacao de dominio institucional como regra futura. Evidencia: Dominio oficial ainda nao confirmado, regra documentada como futura/condicional.
- [x] Definir estados loading, erro, sucesso e fallback tecnico. Evidencia: Estados documentados como contrato futuro do formulario funcional.
- [x] Definir regras de linguagem e privacidade. Evidencia: Regras contra promessa automatica, aprovacao, acompanhamento completo e coleta sem finalidade registradas.
- [x] Registrar criterios de aceitacao da Milestone 5. Evidencia: Criterios separados entre MVP sem backend e futuros/condicionais em `requirements.md`.
- [x] Registrar aprovacao da ADR-005 antes da implementacao da Spec 005. Evidencia: ADR-005 aceita pelo gestor do projeto para liberar formulario integrado como canal principal futuro, mantendo backend, armazenamento, notificacao e privacidade como dependencias tecnicas futuras.
- [x] Criar pagina `/oportunidades`. Evidencia: `app/oportunidades/page.tsx` criado com estado inicial, metadata e renderizacao testada em `tests/unit/opportunities-page.test.tsx`.
- [x] Criar componente OpportunityBanner ou OpportunityCard. Evidencia: `OpportunityBanner` consolidado em `components/sections/opportunity-banner.tsx`, aplicado em `/oportunidades` para o estado sem oportunidades abertas e validado em testes unitarios.
- [x] Criar componente OpportunityStatus. Evidencia: `components/sections/opportunity-status.tsx` criado com union `closed | open | draft | archived`, labels publicos textuais, icone decorativo e aplicacao no `OpportunityBanner`.
- [x] Preparar estrutura visual futura do formulario integrado sem envio real. Evidencia: `OpportunityInterestFormPreview` consolidado em `components/sections/opportunity-interest-form-preview.tsx`, aplicado em `/oportunidades`, sem `<form>`, sem campos ativos, sem envio e validado em testes unitarios.
- [x] Implementar estado sem oportunidades abertas. Evidencia: `/oportunidades` exibe mensagem textual "No momento, nao ha oportunidades abertas.", CTA seguro para `/contato` e nao renderiza formulario real.
- [x] Validar foco visivel em CTAs, campos e mensagens existentes. Evidencia: validacao manual em `/oportunidades` confirmou foco visivel por teclado no skip link, navegacao, theme toggle, CTA "Falar com o NITE" do header/banner e links do rodape; nao ha campos ativos nesta etapa.
- [x] Validar leitura e conforto em mobile. Evidencia: validacao em viewport 390x844 confirmou ausencia de overflow horizontal, status legivel, CTA com area confortavel de toque, banner sem compressao e leitura em dark/light.
- [x] Validar SEO institucional de `/oportunidades`. Evidencia: metadata basica com title, description, canonical, Open Graph/Twitter e breadcrumb JSON-LD.
- [x] Validar que nenhum processo, data, prazo, requisito, responsavel ou vaga aparece sem confirmacao. Evidencia: teste unitario confirma estado sem vagas, ausencia de formulario real e ausencia de textos de vaga/prazo/responsavel/automacao.

## Backlog tecnico futuro

As tarefas abaixo permanecem registradas para evolucao futura, mas nao sao pendencias ativas nem bloqueiam o fechamento do MVP sem backend.

- Criar formulario integrado funcional. Motivo: depende de backend/canal tecnico, privacidade operacional e oportunidade aberta validada.
- Implementar validacao de campos obrigatorios. Motivo: depende de formulario funcional.
- Implementar orientacao de e-mail institucional no formulario. Motivo: a pagina atual ja orienta e-mail institucional quando aplicavel; a orientacao programatica em campo depende de formulario funcional.
- Implementar estado loading do formulario. Motivo: depende de fluxo real de envio/carregamento.
- Implementar estado de sucesso do formulario sem promessa de resposta automatica. Motivo: depende de envio funcional e politica de retorno validada.
- Implementar estado de erro com mensagens claras. Motivo: depende de validacao/envio funcional.
- Implementar fallback tecnico quando backend nao estiver disponivel. Motivo: depende de arquitetura tecnica futura do formulario.
- Definir backend do formulario em spec tecnica futura. Motivo: decisao tecnica futura, nao incluida no MVP sem backend.
- Definir armazenamento dos dados em spec tecnica futura. Motivo: depende de arquitetura, privacidade e retencao.
- Definir notificacao operacional em spec tecnica futura. Motivo: depende de fluxo operacional e decisao tecnica futura.
- Definir upload ou link de curriculo em spec tecnica futura. Motivo: depende de decisao tecnica, privacidade e seguranca.
- Definir protecao, retencao e acesso aos dados em spec tecnica futura. Motivo: depende de governanca de dados antes de qualquer coleta.

## Dependente de conteudo real validado

As tarefas abaixo sao futuras/condicionais e nao devem ser atendidas com conteudo ficticio.

- Definir dominio institucional oficial para validacao, se aplicavel. Motivo: depende de decisao institucional validada.
- Implementar estado com processo aberto. Motivo: depende de oportunidade real validada, com area, status, requisitos, forma de participacao e demais informacoes publicaveis.
- Criar secao "Como participar", quando houver conteudo validado. Motivo: depende de orientacao institucional real do processo.
- Criar FAQ futura, se houver perguntas validadas. Motivo: depende de perguntas e respostas reais aprovadas.

## Removido do backlog ativo do MVP sem backend

- Formulario funcional, backend, armazenamento, notificacao, upload/link de curriculo, validacao de campos, dominio institucional, estado com processo aberto, secao "Como participar" e FAQ futura foram removidos do backlog ativo do MVP sem backend por decisao de escopo. Permanecem registrados acima como backlog tecnico futuro ou dependentes de conteudo real validado, sem serem marcados como implementados.
