# Design - Opportunities & Selection Flow

## Direcao de experiencia

A pagina de oportunidades deve funcionar mesmo quando nao houver processo aberto. O estado sem oportunidades abertas e parte normal da experiencia, nao erro, placeholder vazio ou promessa de vaga futura.

As decisoes visuais seguem a Spec 003:

- CTAs com hierarquia clara.
- OpportunityBanner ou OpportunityCard em superficie consistente.
- Status com texto e apoio visual.
- Foco visivel em links, controles e campos.
- Mensagens de erro e sucesso legiveis.
- Conteudo confortavel em mobile.

## Estrutura da pagina `/oportunidades`

A pagina deve organizar:

- Cabecalho da pagina.
- Texto curto explicando a area de oportunidades.
- CTA oficial "Acompanhar oportunidades".
- Estado sem oportunidades abertas.
- Estado com processo aberto, quando houver dados validados.
- Areas possiveis de atuacao.
- Formulario integrado, somente quando houver oportunidade aberta e fluxo tecnico definido.
- Disclaimer de privacidade e uso dos dados.
- FAQ futuro como expansao, sem obrigatoriedade no MVP.

## Estado sem oportunidades abertas

Este e o estado default quando nao houver processo seletivo confirmado.

Deve conter:

- Mensagem clara informando que nao ha processo seletivo aberto no momento.
- Orientacao para acompanhar o portal e canais oficiais.
- Areas possiveis de atuacao, sem parecer que existem vagas abertas.
- CTA secundario "Falar com o NITE", se aplicavel.
- Linguagem tranquila e institucional, sem parecer pagina quebrada.

Nao deve conter:

- Formulario de candidatura ativa.
- Datas, prazos, requisitos ou quantidade de vagas inventadas.
- Promessa de abertura futura.
- Promessa de resposta automatica.

## Estado com processo aberto

Quando houver oportunidade validada, a pagina deve mostrar:

- Titulo da oportunidade.
- Area/frente.
- Status.
- Descricao curta.
- Requisitos minimos, quando validados.
- Publico elegivel, quando validado.
- Prazo, somente quando validado.
- Forma de envio.
- Observacoes institucionais.
- Formulario integrado ou instrucao clara quando o backend ainda estiver pendente.

Oportunidade aberta deve ser objetiva e escaneavel. Conteudo longo, regras completas e documentos extensos devem ser evitados no MVP, salvo quando forem material oficial validado.

## OpportunityBanner ou OpportunityCard

Estrutura informacional:

- Titulo.
- Area/frente.
- Status.
- Resumo curto.
- Requisitos minimos, quando validados.
- Prazo, somente quando validado.
- CTA para manifestar interesse ou acompanhar.
- Estado sem vagas quando nao houver processo aberto.

Comportamento visual:

- Status deve usar texto e pode usar cor/icone como apoio.
- O card/banner nao deve parecer clicavel se nao houver acao disponivel.
- CTA deve ficar claro quando o formulario estiver disponivel.
- Estado sem vagas deve parecer informativo, nao erro.
- Foco visivel deve existir em links e CTAs.

## Formulario integrado

O formulario deve aparecer apenas quando houver oportunidade aberta e condicao tecnica definida para envio.

Campos obrigatorios:

- Nome completo.
- E-mail institucional.
- Curso.
- Area de interesse.
- Aceite/ciencia sobre uso dos dados para contato do processo seletivo.

Campos condicionais ou opcionais:

- Semestre.
- Link de curriculo.
- Upload de curriculo.
- Mensagem opcional.

Regras visuais e de interacao:

- Campos obrigatorios devem ser identificados.
- E-mail institucional deve ser orientado de forma clara.
- Validacao de dominio institucional fica como regra futura ate dominio oficial ser confirmado.
- Mensagens de erro devem aparecer proximas ao campo relacionado.
- Loading deve bloquear duplo envio sem esconder contexto.
- Sucesso deve informar recebimento ou proximos passos gerais, sem prometer aprovacao ou resposta automatica.
- Erro deve explicar como corrigir ou tentar novamente.
- Fallback tecnico deve informar que envio ainda depende de backend, armazenamento ou notificacao.

## Estados esperados

| Estado | Comportamento esperado |
|---|---|
| Sem oportunidades abertas | Informa ausencia de processo aberto e orienta acompanhamento |
| Processo aberto | Mostra dados validados, forma de participacao e formulario quando disponivel |
| Draft/pendente | Nao aparece como oportunidade aberta |
| Loading | Indica processamento sem perder contexto |
| Erro | Mostra mensagem clara e recuperavel |
| Sucesso | Confirma recebimento ou orienta proximos passos, sem promessa automatica |
| Fallback tecnico | Informa dependencia de backend, armazenamento ou notificacao |

## Areas possiveis

- Programacao.
- Dados e IA.
- Robotica.
- UX/UI.
- Automacao.
- Social media.
- Documentacao.
- Experiencia digital.

As areas indicam possibilidades de atuacao. Elas nao devem ser apresentadas como vagas abertas sem processo confirmado.

## Regras de linguagem

- Nao anunciar processo seletivo sem confirmacao.
- Nao inventar datas, prazos, requisitos, responsaveis ou vagas.
- Nao prometer resposta automatica.
- Nao prometer aprovacao.
- Nao prometer acompanhamento completo.
- Nao sugerir area autenticada no MVP.
- Priorizar frases curtas e institucionais.
- Explicar informacoes tecnicas do formulario em linguagem simples.
- Comunicar dependencia tecnica futura sem parecer falha da pagina.

## Privacidade e ciencia do usuario

- O formulario deve pedir aceite/ciencia para uso dos dados no contato do processo seletivo.
- A pagina deve explicar que os dados enviados servem para contato relacionado a oportunidades.
- A spec tecnica futura deve definir armazenamento, notificacao, retencao e protecao de dados antes da implementacao.
- Nenhum dado pessoal deve ser coletado sem finalidade explicita.

## SEO, responsividade e acessibilidade

- `/oportunidades` deve prever titulo e descricao institucional.
- A pagina deve ser compreensivel no estado sem oportunidades abertas.
- CTAs, campos e mensagens devem ser navegaveis por teclado.
- Foco visivel deve seguir a Spec 003.
- Mensagens de erro nao devem depender apenas de cor.
- Conteudo e formulario devem permanecer legiveis em mobile.
- Campos devem ter labels claras.
- Pagina e formulario devem continuar compreensiveis sem animacao.

## FAQ futuro

FAQ pode ser adicionada futuramente para explicar como participar, requisitos comuns e etapas do processo. No MVP, FAQ nao e requisito obrigatorio e nao deve substituir informacoes validadas de uma oportunidade aberta.
