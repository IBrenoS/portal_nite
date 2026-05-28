# Requirements - Opportunities & Selection Flow

## Status

Milestone 5 fechada para o escopo MVP sem backend - pagina de oportunidades honesta, estado sem oportunidades abertas e estrutura visual futura/inativa do formulario implementados.

## Milestone

Milestone 5 - Opportunities & Selection Flow

## Objetivo

Preparar o Portal NITE para funcionar como canal institucional de divulgacao de oportunidades e processos seletivos, com estado claro quando nao houver processo aberto e fluxo inicial de interesse/candidatura quando houver oportunidade validada.

No escopo MVP sem backend, a Spec 005 fecha a entrega com uma pagina publica honesta em `/oportunidades`, sem processo aberto, sem envio ativo, sem coleta de dados e sem promessa operacional. O formulario integrado permanece aprovado pela ADR-005 como direcao futura, condicionado a decisao tecnica de backend, armazenamento, notificacao, privacidade operacional e conteudo validado.

## Escopo

### Escopo MVP sem backend

- Pagina `/oportunidades`.
- Estado sem oportunidades abertas como experiencia normal, nao erro.
- `OpportunityBanner` aplicado ao estado atual.
- `OpportunityStatus` aplicado com status `closed` e contrato de status `closed | open | draft | archived`.
- Estrutura visual futura/inativa do formulario, sem `<form>`, campos ativos, envio, armazenamento ou notificacao.
- Orientacao publica de que nao ha envio ativo, coleta de dados ou processo aberto.
- Areas possiveis de atuacao apresentadas como possibilidades, nao vagas.
- CTA secundario "Falar com o NITE" quando aplicavel.
- SEO institucional, foco visivel, responsividade mobile e conteudo honesto.

### Escopo futuro/condicional

- Estado com processo seletivo aberto, somente quando houver oportunidade real validada.
- Informacoes minimas de uma oportunidade, somente com conteudo autorizado.
- Formulario integrado funcional no proprio portal, como canal principal futuro aprovado pela ADR-005.
- Uso prioritario de e-mail institucional no formulario funcional.
- Envio de interesse, curriculo ou dados necessarios ao processo seletivo, somente quando houver backend, privacidade operacional e oportunidade aberta validados.
- Estados loading, erro, sucesso e fallback tecnico do formulario funcional.
- Backend, armazenamento, notificacao, protecao de dados, upload/link de curriculo e validacao de dominio institucional como backlog tecnico/institucional futuro.

Esta Spec, no escopo MVP sem backend, cria a rota e componentes de interface necessarios para o estado atual, mas nao cria backend, envio de e-mail, processo seletivo, vaga, data, prazo, requisito, responsavel, canal operacional ativo ou coleta de dados.

Governanca minima de conteudo para oportunidades reais permanece dependente de validacao coletiva. A ADR-005 - Canal de submissao de oportunidades esta Aceito para manter formulario integrado como canal principal futuro, mas nao aprova automaticamente backend, armazenamento, notificacao, privacidade operacional ou arquitetura tecnica.

## Decisao de canal

A ADR-005 aprova formulario integrado no proprio portal como canal principal futuro para oportunidades abertas e validadas. No MVP sem backend, esse canal aparece apenas como estrutura visual futura/inativa.

- O formulario funcional futuro deve priorizar o uso de e-mail institucional do estudante.
- O canal principal nao sera Google Forms, link externo ou WhatsApp.
- O objetivo do formulario funcional futuro e permitir envio de interesse, curriculo ou dados necessarios ao processo seletivo, quando houver oportunidade aberta.
- Backend, armazenamento, notificacao, upload ou link de curriculo, validacao de dominio institucional, protecao de dados e fluxo operacional sao dependencias tecnicas futuras.
- O portal nao deve prometer resposta automatica, aprovacao, acompanhamento completo de candidatura ou area autenticada no MVP.
- Nao implementar formulario sem spec tecnica, criterios de aceitacao e validacao de privacidade/conteudo.
- Enquanto o backend nao existir, nenhum dado deve ser solicitado, capturado, armazenado ou enviado.

## CTA oficial

| Contexto                         | Texto                    | Destino          | Status                          |
| -------------------------------- | ------------------------ | ---------------- | ------------------------------- |
| Area de oportunidades            | Acompanhar oportunidades | `/oportunidades` | Aprovado pelo gestor do projeto |
| Estado sem oportunidades abertas | Falar com o NITE         | `/contato`       | Secundario, quando aplicavel    |

## Requisitos funcionais - `/oportunidades`

- Deve exibir estado sem oportunidades abertas quando nao houver processo seletivo confirmado.
- Deve exibir estado com processo aberto apenas quando houver dados validados.
- Deve explicar como acompanhar novas oportunidades pelo portal e canais oficiais.
- Deve evitar parecer pagina quebrada, vazia ou erro quando nao houver processo aberto.
- Deve apresentar areas possiveis de atuacao sem sugerir vaga ativa inexistente.
- Deve preservar o CTA oficial "Acompanhar oportunidades" com destino `/oportunidades` para entradas que direcionam o usuario a esta area.
- Pode oferecer CTA secundario "Falar com o NITE" para contato institucional, quando aplicavel.
- Deve prever FAQ futuro como expansao, sem torna-lo requisito obrigatorio do MVP.
- No MVP sem backend, deve manter o formulario apenas como preview inativo, sem coleta ou envio.

## Requisitos funcionais - estado sem oportunidades abertas

- Exibir mensagem clara de que nao ha processo seletivo aberto no momento.
- Orientar o usuario a acompanhar o portal e canais oficiais.
- Informar areas possiveis de atuacao de forma geral, sem anunciar vaga.
- Permitir contato institucional quando fizer sentido.
- Nao exibir formulario de candidatura ativa se nao houver processo aberto.
- Nao inventar datas, prazos, requisitos, responsaveis ou quantidade de vagas.

## Requisitos funcionais - estado com processo aberto futuro

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

Este estado depende de oportunidade real validada e nao bloqueia o fechamento do MVP sem backend.

## Requisitos funcionais - formulario funcional futuro

O formulario integrado e o canal principal futuro quando houver oportunidade aberta e backend/privacidade operacional definidos.

Campos obrigatorios previstos para o formulario funcional futuro:

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
- Nenhuma dessas regras autoriza formulario ativo no MVP sem backend.

## Requisitos nao funcionais

- Acessibilidade: campos, CTAs, cards, banners e mensagens devem prever foco visivel, ordem logica de tabulacao e labels compreensiveis.
- Contraste: textos, mensagens de erro, estados e CTAs devem seguir a baseline visual da Spec 003 e a baseline de acessibilidade da Spec 007.
- SEO institucional: `/oportunidades` deve prever titulo e descricao claros para indexacao.
- Performance: a pagina deve ser leve, sem depender de midia pesada para comunicar o estado de oportunidades.
- Responsividade: conteudo, estados e formulario devem permanecer legiveis e confortaveis em mobile.
- Privacidade: enquanto nao houver formulario funcional, a pagina deve informar que nao ha coleta de dados. Quando houver coleta futura, deve explicar finalidade, armazenamento, retencao, acesso e uso dos dados para contato relacionado ao processo seletivo.
- Manutenibilidade: oportunidades e formularios devem seguir modelos documentais claros, com campos obrigatorios, opcionais e dependencias tecnicas explicitas.
- Conteudo honesto: nenhum processo, prazo, requisito, responsavel ou vaga deve ser exibido sem confirmacao.

## Modelo de oportunidade

```ts
type Opportunity = {
  id: string;
  slug?: string;
  title: string;
  area: string;
  status: "closed" | "open" | "draft" | "archived";
  summary: string;
  description?: string;
  eligibility?: string[];
  requirements?: string[];
  deadline?: string;
  formEnabled: boolean;
  contactChannel?: string;
  updatedAt: string;
};
```

## Modelo de formulario

```ts
type OpportunityApplication = {
  fullName: string;
  institutionalEmail: string;
  course: string;
  semester?: string;
  interestArea: string;
  resumeUrl?: string;
  resumeFile?: File;
  message?: string;
  consentAccepted: boolean;
};
```

## Status de oportunidade

| Status tecnico | Label publica             | Uso esperado                                            |
| -------------- | ------------------------- | ------------------------------------------------------- |
| `closed`       | Sem oportunidades abertas | Estado default quando nao ha processo confirmado        |
| `open`         | Processo aberto           | Processo validado, com informacoes minimas publicaveis  |
| `draft`        | Em preparacao             | Conteudo interno ou pendente, nao anunciado como aberto |
| `archived`     | Encerrado                 | Processo historico ou encerrado, sem candidatura ativa  |

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
- Processo aberto: futuro/condicional, exibido apenas com dados validados.
- Draft/pendente: conteudo interno ou incompleto, nao deve aparecer como oportunidade aberta.
- Loading: contrato futuro do formulario funcional durante envio ou carregamento de dados.
- Erro: contrato futuro do formulario funcional, com mensagem clara indicando como corrigir ou tentar novamente.
- Sucesso: contrato futuro do formulario funcional, informando apenas recebimento ou proximos passos gerais, sem promessa de resposta automatica.
- Fallback tecnico: contrato futuro quando backend, armazenamento ou notificacao ainda nao estiverem prontos.

## Regras de linguagem e privacidade

- Nao anunciar processo seletivo sem confirmacao.
- Nao inventar datas, prazos, requisitos, responsaveis ou vagas.
- Nao prometer resposta automatica.
- Nao prometer aprovacao.
- Nao prometer acompanhamento completo de candidatura.
- Nao sugerir area autenticada no MVP.
- Explicar que e-mail institucional e priorizado.
- Explicar, quando houver coleta futura, que dados enviados serao usados para contato relacionado ao processo seletivo.
- Comunicar dependencias tecnicas futuras com clareza, sem parecer erro.
- Manter FAQ como possibilidade futura, nao requisito obrigatorio do MVP.

## Checklist de validacao - MVP sem backend

- [x] A pagina nao parece quebrada quando nao ha oportunidades abertas.
- [x] O usuario entende como acompanhar proximas oportunidades.
- [x] O usuario entende quais areas podem abrir oportunidades sem parecer vaga ativa.
- [x] Nenhum processo seletivo e anunciado sem confirmacao.
- [x] O estado atual usa `OpportunityStatus` com texto publico acessivel.
- [x] O texto nao promete resposta automatica, aprovacao, selecao ou acompanhamento.
- [x] Nao ha formulario funcional, campos ativos, envio, armazenamento ou notificacao.
- [x] Backend, armazenamento, notificacao e protecao de dados permanecem como dependencias tecnicas futuras.
- [x] Leitura mobile e foco visivel foram validados para o estado atual.

## Checklist futuro/condicional

- [ ] Quando houver oportunidade aberta e validada, o formulario integrado sera o canal principal.
- [ ] O formulario funcional futuro deve priorizar e-mail institucional.
- [ ] Mensagens de sucesso, erro e fallback do formulario funcional nao devem prometer aprovacao, resposta automatica ou acompanhamento completo.
- [ ] Prazo, requisitos, responsavel, vaga ou forma de participacao so podem aparecer com validacao previa.

## Criterios de aceitacao - MVP sem backend

- [x] Dado que nao ha processo aberto, quando o usuario acessa `/oportunidades`, entao ve uma mensagem clara e a pagina nao parece quebrada.
- [x] Dado que nao ha processo confirmado, quando a pagina lista areas possiveis, entao nenhuma area parece vaga ativa.
- [x] Dado que o usuario usa teclado, quando navega pelos CTAs e links existentes, entao foco visivel e ordem logica sao preservados.
- [x] Dado que o usuario esta no mobile, quando acessa oportunidades, entao o conteudo permanece legivel e confortavel.
- [x] Dado que o backend ainda nao esta definido, quando a pagina mostra a estrutura futura do formulario, entao deixa claro que nao ha coleta, envio, armazenamento ou notificacao ativa.

## Criterios de aceitacao futuros/condicionais

- [ ] Dado que ha processo aberto validado, quando o usuario acessa `/oportunidades`, entao ve area, status, requisitos e forma de participacao.
- [ ] Dado que o usuario preenche o formulario funcional futuro, quando informa e-mail, entao a interface orienta o uso de e-mail institucional.
- [ ] Dado que o usuario envia interesse em fluxo funcional futuro, quando recebe retorno visual, entao a mensagem informa apenas que a solicitacao foi recebida ou orienta proximos passos, sem prometer aprovacao ou resposta automatica.
- [ ] Dado que ha erro de preenchimento no formulario funcional futuro, quando o usuario tenta enviar, entao mensagens claras indicam como corrigir.
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
- [x] Escopo MVP sem backend fechado sem marcar backend, formulario funcional ou conteudo real como implementados.
