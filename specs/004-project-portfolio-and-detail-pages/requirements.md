# Requirements - Project Portfolio & Detail Pages

## Status

Milestone 4 iniciada oficialmente - portfolio de projetos e paginas individuais em consolidacao

## Milestone

Milestone 4 - Project Portfolio & Detail Pages

## Objetivo

Transformar a secao de projetos em um portfolio institucional robusto, objetivo e escalavel, permitindo que visitantes entendam projetos por nome, area, status, problema, objetivo, stack e proximo passo, sem inventar evidencias ou dados nao autorizados.

## Escopo

- Pagina `/projetos`.
- Rota planejada `/projetos/[slug]`.
- Modelo documental de conteudo de projeto.
- Campos obrigatorios e opcionais aprovados.
- Status de projeto e labels publicas.
- Filtros por area/frente e status.
- Estrutura do ProjectCard.
- Estrutura da pagina individual de projeto.
- Estados vazios, ausentes e pendentes.
- Criterios de acessibilidade, SEO, performance, responsividade e manutenibilidade.

Esta Spec consolida requisitos documentais. Nao cria rotas reais, componentes reais, dados reais, projetos, responsaveis, metricas, depoimentos, imagens, links de repositorio ou links de demo.

Governanca minima de conteudo permanece Pendente de validacao coletiva. O ADR-006 - Modelo de Status de Projetos esta Aceito para liberar ProjectCard, StatusBadge aplicado e portfolio de projetos com a taxonomia abaixo.

## Requisitos funcionais - `/projetos`

- Deve listar projetos por nome, resumo curto, area/frente e status.
- Deve permitir acesso a pagina individual planejada em `/projetos/[slug]`.
- Deve permitir filtro por area/frente.
- Deve permitir filtro por status.
- Deve permitir combinacao de filtro por area/frente e status.
- Deve exibir estado vazio quando nao houver projetos cadastrados.
- Deve exibir estado sem resultados quando filtros nao retornarem projetos.
- Deve sinalizar projetos sem evidencias publicas de forma honesta, sem parecer erro.
- Deve evitar sugerir que projetos em estruturacao estao finalizados.
- Deve manter cards objetivos, escaneaveis e consistentes com a Spec 003.

## Requisitos funcionais - `/projetos/[slug]`

- Deve apresentar nome do projeto, resumo curto, area/frente e status no inicio da pagina.
- Deve explicar problema ou contexto de forma objetiva.
- Deve explicar objetivo de forma compreensivel para publico tecnico e nao tecnico.
- Deve listar stack/tecnologias sem transformar a pagina em documentacao tecnica extensa.
- Deve exibir responsaveis ou equipe apenas quando houver autorizacao.
- Deve informar ultima atualizacao.
- Deve informar proximo passo.
- Deve exibir evidencias, resultado gerado, galeria, documentos, depoimentos, repositorio ou demo somente quando houver material real e autorizado.
- Deve exibir estado honesto quando evidencias publicas estiverem ausentes.
- Deve manter a pagina curta, objetiva e orientada a credibilidade institucional.

## Requisitos nao funcionais

- Acessibilidade: filtros, cards e links devem prever foco visivel, navegacao por teclado e labels compreensiveis.
- Contraste: textos, badges, links e controles devem seguir a baseline visual da Spec 003 e a baseline de acessibilidade da Spec 007.
- SEO institucional: `/projetos` e `/projetos/[slug]` devem prever titulo e descricao adequados para indexacao.
- Responsividade: lista, filtros, cards e pagina individual devem permanecer legiveis e organizados em mobile.
- Performance: a listagem deve ser leve e nao depender de midias pesadas para comunicar valor.
- Manutenibilidade: o conteudo deve seguir modelo claro, com campos obrigatorios, opcionais e condicionais.
- Conteudo honesto: nenhum campo ausente deve ser simulado como real.

## Modelo de projeto

`title` e o campo tecnico documental; a label publica correspondente e "Nome do projeto".

```ts
type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  area: string;
  status: "draft" | "in_progress" | "validated" | "done" | "archived";
  problem: string;
  objective: string;
  stack: string[];
  responsible?: string[];
  updatedAt: string;
  nextStep: string;
  evidences?: Evidence[];
  repositoryUrl?: string;
  demoUrl?: string;
  testimonial?: Testimonial;
  result?: string;
  gallery?: Media[];
  documents?: DocumentLink[];
};
```

## Campos obrigatorios no MVP

- Nome do projeto.
- Resumo curto.
- Area/frente.
- Status.
- Problema ou contexto.
- Objetivo.
- Stack/tecnologias.
- Responsaveis ou equipe, quando autorizado.
- Ultima atualizacao.
- Proximo passo.

Quando responsaveis ou equipe nao tiverem autorizacao de exibicao, o campo deve ser tratado como nao autorizado, oculto ou sinalizado de forma honesta, sem inventar nomes.

## Campos opcionais

- Evidencias visuais.
- Link do repositorio, quando puder ser publico.
- Link de demo, quando existir deploy publico.
- Depoimento, quando houver autorizacao.
- Resultado gerado, quando o projeto ja tiver entrega validada.
- Galeria, quando houver fotos reais autorizadas.
- Documentos anexos, quando houver relatorio publico.

Campos opcionais so devem aparecer quando houver material real, publico e autorizado.

## Status de projeto

| Status tecnico | Label publica   | Uso esperado                                                |
| -------------- | --------------- | ----------------------------------------------------------- |
| `draft`        | Em estruturacao | Projeto ainda sendo organizado, sem parecer finalizado      |
| `in_progress`  | Em andamento    | Projeto ativo ou em desenvolvimento                         |
| `validated`    | Validado        | Projeto revisado ou validado internamente, quando aplicavel |
| `done`         | Finalizado      | Projeto concluido com resultado validado                    |
| `archived`     | Arquivado       | Projeto historico ou sem evolucao ativa                     |

Status devem usar texto e, quando houver cor, icone ou badge visual, nao depender apenas de cor.

## Regras de linguagem

- Nao usar "entregaveis" como secao obrigatoria publica.
- Preferir "Resultado gerado" ou "Evidencias" quando houver material real.
- Projetos em estruturacao devem ser sinalizados de forma honesta.
- Pagina de projeto deve ser objetiva e evitar excesso de texto.
- Informacoes tecnicas devem ser compreensiveis para publicos nao tecnicos.
- Evidencias ausentes nao devem ser simuladas.
- Projetos sem evidencias publicas devem exibir estado honesto, sem parecer erro.
- Responsaveis/equipe so devem aparecer quando houver autorizacao.

## Estados vazios, ausentes e pendentes

- Sem projetos cadastrados: a pagina deve informar que o portfolio ainda esta em estruturacao.
- Sem resultado de filtro: a pagina deve orientar o usuario a limpar filtros ou tentar outro criterio.
- Sem evidencias publicas: o projeto deve informar que evidencias publicas ainda nao estao disponiveis ou autorizadas.
- Sem responsaveis autorizados: o campo deve ser oculto ou indicado como pendente de autorizacao, sem listar nomes.
- Sem repositorio ou demo publica: os links devem ficar ausentes, nao desabilitados de forma confusa.
- Projeto em estruturacao: status, resumo e proximo passo devem comunicar que ainda nao ha conclusao final.

## Checklist de validacao

- [ ] Cada projeto possui titulo claro.
- [ ] Cada projeto possui resumo objetivo.
- [ ] Cada projeto informa area/frente.
- [ ] Cada projeto informa status real.
- [ ] Cada projeto informa problema ou contexto.
- [ ] Cada projeto informa objetivo.
- [ ] Cada projeto informa stack quando aplicavel.
- [ ] Cada projeto informa responsaveis quando autorizado.
- [ ] Cada projeto informa ultima atualizacao.
- [ ] Cada projeto informa proximo passo.
- [ ] Projetos sem evidencias nao fingem possuir entregas.
- [ ] Projetos em estruturacao sao sinalizados com honestidade.
- [ ] Pagina individual nao fica excessivamente longa.
- [ ] Informacoes tecnicas sao compreensiveis para publicos nao tecnicos.
- [ ] Campos obrigatorios do MVP estao presentes ou marcados como nao autorizados quando dependerem de permissao.
- [ ] Campos opcionais so aparecem quando houver material real validado.

## Criterios de aceitacao

- [ ] Dado que o usuario acessa `/projetos`, quando visualiza a pagina, entao consegue identificar projetos por nome, area e status.
- [ ] Dado que o usuario acessa um card de projeto, quando le o resumo, entao entende rapidamente o objetivo geral do projeto.
- [ ] Dado que o usuario abre `/projetos/[slug]`, quando le a pagina, entao entende problema, objetivo, stack, status e proximo passo.
- [ ] Dado que um projeto nao possui evidencias publicas, quando a pagina e exibida, entao o estado informa isso de forma honesta.
- [ ] Dado que o projeto esta em estruturacao, quando exibido, entao nao parece finalizado.
- [ ] Dado que o usuario esta no mobile, quando acessa projetos ou pagina individual, entao o conteudo permanece legivel e organizado.
- [ ] Dado que o usuario usa teclado, quando navega por filtros, cards e links, entao os elementos interativos possuem foco visivel.
- [ ] Dado que o projeto possui informacoes tecnicas, quando exibidas, entao elas sao apresentadas de forma compreensivel para publicos nao tecnicos.
- [ ] Dado que o usuario usa filtros por area e status, quando nao ha resultados, entao a pagina mostra estado sem resultados sem parecer erro.
- [ ] Dado que uma pagina de projeto e indexada, quando revisada para SEO institucional, entao possui titulo e descricao planejados.
- [ ] Dado que campos opcionais nao possuem autorizacao ou material real, quando a pagina e exibida, entao esses campos ficam ausentes ou pendentes sem inventar conteudo.

## Criterios documentais da Milestone 4

- [x] Requisitos de `/projetos` documentados.
- [x] Requisitos de `/projetos/[slug]` documentados.
- [x] Modelo de projeto consolidado.
- [x] Campos obrigatorios e opcionais registrados.
- [x] Status de projeto e labels publicas definidos para o MVP.
- [x] Estados vazios, ausentes e pendentes documentados.
- [x] Criterios de acessibilidade, SEO, performance, responsividade e manutenibilidade registrados.
- [x] Pendencias de implementacao e validacao tecnica mantidas fora do escopo documental da Milestone 4.
