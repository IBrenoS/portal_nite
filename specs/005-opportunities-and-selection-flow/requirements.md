# Requirements - Opportunities & Selection Flow

## Status

Milestone 5 iniciada oficialmente - oportunidades e fluxo inicial de selecao em consolidacao

## Milestone

Milestone 5 - Opportunities & Selection Flow

## Objetivo

Preparar o Portal NITE para funcionar como canal institucional de divulgacao de oportunidades e processos seletivos, com estado claro quando nao houver processo aberto e fluxo inicial de interesse/candidatura quando houver oportunidade validada.

## Escopo

- Pagina `/oportunidades`.
- Estado sem oportunidades abertas.
- Estado com processo seletivo aberto.
- Informacoes minimas de uma oportunidade.
- CTA oficial "Acompanhar oportunidades".
- Fluxo inicial de interesse/candidatura.
- Formulario integrado no proprio portal.
- Uso prioritario de e-mail institucional.
- Envio de curriculo ou dados necessarios ao processo seletivo, quando houver oportunidade aberta.
- Estados vazio, pendente, loading, erro, sucesso e fallback tecnico.
- Criterios de acessibilidade, SEO, performance, responsividade, privacidade e manutenibilidade.

Esta Spec consolida requisitos documentais. Nao cria rota real, componente real, backend, envio de e-mail, processo seletivo, vaga, data, prazo, requisito, responsavel ou canal operacional.

Governanca minima de conteudo permanece Pendente de validacao coletiva. O ADR-005 - Canal de submissao de oportunidades permanece Proposto; a decisao de produto do formulario integrado orienta o MVP, mas nao aprova automaticamente a arquitetura tecnica.

## Decisao de canal

O MVP usara formulario integrado no proprio portal.

- O formulario deve priorizar o uso de e-mail institucional do estudante.
- O canal principal nao sera Google Forms nem link externo.
- O objetivo do formulario e permitir envio de interesse, curriculo ou dados necessarios ao processo seletivo, quando houver oportunidade aberta.
- Backend, armazenamento, notificacao, upload ou link de curriculo, validacao de dominio institucional, protecao de dados e fluxo operacional sao dependencias tecnicas futuras.
- O portal nao deve prometer resposta automatica, aprovacao, acompanhamento completo de candidatura ou area autenticada no MVP.
- Nao implementar formulario sem spec tecnica, criterios de aceitacao e validacao de privacidade/conteudo.

## CTA oficial

| Contexto | Texto | Destino | Status |
|---|---|---|---|
| Area de oportunidades | Acompanhar oportunidades | `/oportunidades` | Aprovado pelo gestor do projeto |
| Estado sem oportunidades abertas | Falar com o NITE | `/contato` | Secundario, quando aplicavel |

## Requisitos funcionais - `/oportunidades`

- Deve exibir estado sem oportunidades abertas quando nao houver processo seletivo confirmado.
- Deve exibir estado com processo aberto apenas quando houver dados validados.
- Deve explicar como acompanhar novas oportunidades pelo portal e canais oficiais.
- Deve evitar parecer pagina quebrada, vazia ou erro quando nao houver processo aberto.
- Deve apresentar areas possiveis de atuacao sem sugerir vaga ativa inexistente.
- Deve usar CTA oficial "Acompanhar oportunidades" com destino `/oportunidades`.
- Pode oferecer CTA secundario "Falar com o NITE" para contato institucional, quando aplicavel.
- Deve prever FAQ futuro como expansao, sem torna-lo requisito obrigatorio do MVP.

## Requisitos funcionais - estado sem oportunidades abertas

- Exibir mensagem clara de que nao ha processo seletivo aberto no momento.
- Orientar o usuario a acompanhar o portal e canais oficiais.
- Informar areas possiveis de atuacao de forma geral, sem anunciar vaga.
- Permitir contato institucional quando fizer sentido.
- Nao exibir formulario de candidatura ativa se nao houver processo aberto.
- Nao inventar datas, prazos, requisitos, responsaveis ou quantidade de vagas.

## Requisitos funcionais - estado com processo aberto

Quando houver processo seletivo aberto e validado, a pagina deve exibir:

- Titulo da oportunidade.
- Area/frente.
- Status.
- Descricao curta.
- Requisitos minimos, quando validados.
- Publico elegivel, quando validado.
- Prazo, somente quando validado.
- Forma de envio.
- Observacoes institucionais.
- Formulario integrado ou instrucao de preenchimento quando backend estiver pronto.

Processo aberto so deve aparecer quando houver confirmacao. Se backend ainda nao estiver pronto, a oportunidade pode explicar a dependencia tecnica sem oferecer envio falso.

## Requisitos funcionais - formulario

O formulario integrado e o canal principal do MVP quando houver oportunidade aberta.

Campos obrigatorios no MVP:

- Nome completo.
- E-mail institucional.
- Curso.
- Area de interesse.
- Aceite/ciencia sobre uso dos dados para contato do processo seletivo.

Campos condicionais ou opcionais:

- Semestre, se aplicavel.
- Link de curriculo.
- Upload de curriculo, dependendo de decisao tecnica futura.
- Mensagem opcional.

Regras do formulario:

- E-mail institucional deve ser priorizado.
- Validacao de dominio pode ser especificada como regra futura se o dominio oficial nao estiver confirmado.
- O formulario deve explicar o que acontece apos o envio.
- O formulario nao deve prometer resposta automatica.
- O formulario nao deve prometer aprovacao ou acompanhamento completo.
- Mensagens de erro devem ser claras.
- Campos obrigatorios devem ser identificados.
- Deve haver estados de loading, sucesso, erro e fallback tecnico.
- O estado de sucesso deve informar apenas recebimento ou proximos passos gerais, sem promessa de aprovacao ou resposta automatica.

## Requisitos nao funcionais

- Acessibilidade: campos, CTAs, cards, banners e mensagens devem prever foco visivel, ordem logica de tabulacao e labels compreensiveis.
- Contraste: textos, mensagens de erro, estados e CTAs devem seguir a baseline visual da Spec 003 e a baseline de acessibilidade da Spec 007.
- SEO institucional: `/oportunidades` deve prever titulo e descricao claros para indexacao.
- Performance: a pagina deve ser leve, sem depender de midia pesada para comunicar o estado de oportunidades.
- Responsividade: conteudo, estados e formulario devem permanecer legiveis e confortaveis em mobile.
- Privacidade: a pagina deve informar que dados enviados serao usados para contato relacionado ao processo seletivo.
- Manutenibilidade: oportunidades e formularios devem seguir modelos documentais claros, com campos obrigatorios, opcionais e dependencias tecnicas explicitas.
- Conteudo honesto: nenhum processo, prazo, requisito, responsavel ou vaga deve ser exibido sem confirmacao.

## Modelo de oportunidade

```ts
type Opportunity = {
  id: string
  slug?: string
  title: string
  area: string
  status: 'closed' | 'open' | 'draft' | 'archived'
  summary: string
  description?: string
  eligibility?: string[]
  requirements?: string[]
  deadline?: string
  formEnabled: boolean
  contactChannel?: string
  updatedAt: string
}
```

## Modelo de formulario

```ts
type OpportunityApplication = {
  fullName: string
  institutionalEmail: string
  course: string
  semester?: string
  interestArea: string
  resumeUrl?: string
  resumeFile?: File
  message?: string
  consentAccepted: boolean
}
```

## Status de oportunidade

| Status tecnico | Label publica | Uso esperado |
|---|---|---|
| `closed` | Sem oportunidades abertas | Estado default quando nao ha processo confirmado |
| `open` | Processo aberto | Processo validado, com informacoes minimas publicaveis |
| `draft` | Em preparacao | Conteudo interno ou pendente, nao anunciado como aberto |
| `archived` | Encerrado | Processo historico ou encerrado, sem candidatura ativa |

Status devem usar texto e, quando houver cor ou icone, nao depender apenas de cor.

## Areas possiveis

- Programacao.
- Dados e IA.
- Robotica.
- UX/UI.
- Automacao.
- Social media.
- Documentacao.
- Experiencia digital.

Areas possiveis indicam frentes de atuacao do nucleo. Elas nao representam vagas abertas sem confirmacao.

## Estados da pagina e do formulario

- Sem oportunidades abertas: estado default quando nao houver processo confirmado.
- Processo aberto: exibido apenas com dados validados.
- Draft/pendente: conteudo interno ou incompleto, nao deve aparecer como oportunidade aberta.
- Loading: usado durante envio ou carregamento de dados.
- Erro: mensagem clara indicando como corrigir ou tentar novamente.
- Sucesso: retorno visual informando recebimento ou proximos passos gerais, sem promessa de resposta automatica.
- Fallback tecnico: quando backend, armazenamento ou notificacao ainda nao estiverem prontos.

## Regras de linguagem e privacidade

- Nao anunciar processo seletivo sem confirmacao.
- Nao inventar datas, prazos, requisitos, responsaveis ou vagas.
- Nao prometer resposta automatica.
- Nao prometer aprovacao.
- Nao prometer acompanhamento completo de candidatura.
- Nao sugerir area autenticada no MVP.
- Explicar que e-mail institucional e priorizado.
- Explicar que dados enviados serao usados para contato relacionado ao processo seletivo.
- Comunicar dependencias tecnicas futuras com clareza, sem parecer erro.
- Manter FAQ como possibilidade futura, nao requisito obrigatorio do MVP.

## Checklist de validacao

- [ ] A pagina nao parece quebrada quando nao ha oportunidades abertas.
- [ ] O usuario entende como acompanhar proximas oportunidades.
- [ ] O usuario entende quais areas podem abrir oportunidades.
- [ ] Nenhum processo seletivo e anunciado sem confirmacao.
- [ ] O CTA "Acompanhar oportunidades" direciona para `/oportunidades`.
- [ ] Quando houver oportunidade aberta, o formulario integrado e o canal principal.
- [ ] O texto nao promete resposta automatica se ela nao existir.
- [ ] O formulario prioriza e-mail institucional.
- [ ] Backend, armazenamento, notificacao e protecao de dados permanecem como dependencias tecnicas futuras.
- [ ] Mensagens de sucesso, erro e fallback nao prometem aprovacao ou acompanhamento completo.

## Criterios de aceitacao

- [ ] Dado que nao ha processo aberto, quando o usuario acessa `/oportunidades`, entao ve uma mensagem clara e a pagina nao parece quebrada.
- [ ] Dado que ha processo aberto, quando o usuario acessa `/oportunidades`, entao ve area, status, requisitos e forma de participacao.
- [ ] Dado que o usuario ve o CTA "Acompanhar oportunidades", quando clica, entao acessa `/oportunidades`.
- [ ] Dado que o usuario preenche o formulario, quando informa e-mail, entao a interface orienta o uso de e-mail institucional.
- [ ] Dado que o backend ainda nao esta definido, quando a spec descreve o formulario, entao marca armazenamento/notificacao como dependencia tecnica futura.
- [ ] Dado que o usuario envia interesse, quando recebe retorno visual, entao a mensagem informa apenas que a solicitacao foi recebida ou orienta proximos passos, sem prometer aprovacao ou resposta automatica.
- [ ] Dado que o usuario usa teclado, quando navega pelos campos do formulario, entao foco visivel e ordem logica sao preservados.
- [ ] Dado que ha erro de preenchimento, quando o usuario tenta enviar, entao mensagens claras indicam como corrigir.
- [ ] Dado que o usuario esta no mobile, quando acessa oportunidades, entao o conteudo e formulario permanecem legiveis e confortaveis.
- [ ] Dado que nao ha processo confirmado, quando a pagina lista areas possiveis, entao nenhuma area parece vaga ativa.
- [ ] Dado que existe prazo de oportunidade, quando exibido, entao ele foi validado previamente.

## Criterios documentais da Milestone 5

- [x] Requisitos de `/oportunidades` documentados.
- [x] Estado sem oportunidades abertas documentado como default sem processo confirmado.
- [x] Estado com processo aberto documentado com campos minimos validados.
- [x] Modelo de oportunidade consolidado.
- [x] Modelo de formulario consolidado.
- [x] Campos obrigatorios e opcionais do formulario registrados.
- [x] Areas possiveis documentadas.
- [x] Regras de linguagem e privacidade registradas.
- [x] Dependencias tecnicas futuras documentadas.
- [x] Pendencias de implementacao mantidas fora do escopo documental da Milestone 5.
