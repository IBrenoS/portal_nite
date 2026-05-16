# Plano de Homologação Controlada - MVP Premium Portal NITE

## Status

`Aprovado para homologação controlada`.

Este plano orienta a validação controlada do MVP Premium por stakeholders do NITE/UNIJORGE. Homologação controlada não equivale a publicação ampla, produção final ou aprovação institucional definitiva de conteúdo.

## Objetivo

Validar experiência, clareza, navegação, conteúdo institucional, acessibilidade percebida e adequação ao MVP Premium antes de qualquer decisão de publicação ampla.

## Público Recomendado Para Validação

- Gestor/desenvolvedor do projeto.
- Representantes do núcleo.
- Pelo menos uma pessoa com visão institucional.
- Pelo menos uma pessoa do público-alvo, se possível.

## Rotas MVP a Validar

- `/`
- `/projetos`
- `/projetos/[slug]`
- `/oportunidades`
- `/atualizacoes`
- `/contato`

## Checklist Geral

- [ ] A navegação está clara.
- [ ] Header e Footer estão coerentes entre si.
- [ ] CTAs estão compreensíveis e apontam para destinos esperados.
- [ ] A linguagem é institucional, clara e adequada ao NITE/UNIJORGE.
- [ ] Não há conteúdo fictício apresentado como real.
- [ ] Estados vazios e pendentes são honestos.
- [ ] O visual é compatível com o MVP Premium.
- [ ] A leitura mobile é confortável.
- [ ] O foco visível e o uso por teclado são perceptíveis nos principais controles.
- [ ] Não há links quebrados óbvios nas rotas MVP.
- [ ] Não há scroll horizontal evidente em desktop ou mobile.

## Checklist Por Rota

### Home - `/`

- [ ] O Hero comunica o NITE de forma clara.
- [ ] O CTA `Explorar projetos` faz sentido e leva a `/projetos`.
- [ ] O CTA `Conhecer o NITE` faz sentido e leva à seção Sobre na Home.
- [ ] A timeline pendente está honesta e não parece histórico real validado.
- [ ] A Home não promete projetos finalizados, métricas, eventos, fotos ou resultados sem validação.

### Projetos - `/projetos` e `/projetos/[slug]`

- [ ] Cards comunicam projetos em estruturação corretamente quando aplicável.
- [ ] Status dos projetos são compreensíveis e não dependem apenas de cor.
- [ ] Filtros por status e área são compreensíveis.
- [ ] Estado sem resultados orienta o usuário de forma clara.
- [ ] A página de detalhe é clara sobre problema, objetivo, stack, próximo passo e evidências ausentes.
- [ ] Projetos em estruturação não parecem entregas validadas ou finalizadas.

### Oportunidades - `/oportunidades`

- [ ] O estado sem oportunidades abertas está honesto.
- [ ] O `OpportunityBanner` comunica o estado atual sem parecer erro.
- [ ] O preview do formulário em preparação não parece funcional.
- [ ] O texto deixa claro que envio futuro de interesse ou currículo não garante aprovação.
- [ ] A página não solicita dados pessoais nesta etapa.
- [ ] Não há promessa de resposta automática, candidatura completa ou acompanhamento de candidatura.

### Atualizações - `/atualizacoes`

- [ ] O estado vazio está honesto.
- [ ] A página não parece ter posts, notícias ou registros publicados sem conteúdo real.
- [ ] O nome público `Atualizações` é compreensível.
- [ ] Conteúdos reais continuam condicionados a validação/autorização.
- [ ] A ausência de timeline real, fotos e depoimentos não parece erro da interface.

### Contato - `/contato`

- [ ] A página orienta o contato institucional sem inventar canal.
- [ ] A ausência de formulário funcional está aceitável para homologação controlada.
- [ ] A página não inventa e-mail, telefone, endereço, WhatsApp, responsável, horário ou SLA.
- [ ] CTAs apontam para rotas reais do MVP.
- [ ] A página não solicita dados pessoais.

## Fora do Escopo da Homologação Atual

- Formulário funcional.
- Backend, storage, notificação, provider, webhook ou envio real.
- Timeline real.
- Living Timeline.
- Fotos e depoimentos autorizados.
- Posts reais.
- Governança mínima de conteúdo.
- Rotas futuras.
- Dashboard/admin.
- Autenticação.
- Publicação ampla sem validação institucional.

## Pendências Conhecidas

- ADR-001 permanece `Proposto`.
- Governança mínima de conteúdo permanece `Pendente de validação coletiva`.
- Conteúdo real adicional depende de validação/autorização institucional.
- Backend, storage, notificação e privacidade operacional de oportunidades permanecem pendentes.
- Formulário funcional de oportunidades permanece futuro.
- Timeline real e marcos validados permanecem pendentes.
- Fotos e depoimentos autorizados permanecem pendentes.
- Living Timeline permanece como possibilidade futura, sem implementação no MVP atual.

## Critérios de Aprovação

- [ ] Stakeholders entendem o propósito do portal.
- [ ] Rotas MVP estão navegáveis.
- [ ] Não há confusão entre funcionalidades disponíveis e funcionalidades futuras.
- [ ] Visual é considerado adequado ao MVP Premium.
- [ ] Estados vazios e pendentes são aceitos.
- [ ] Nenhuma informação institucional crítica está faltando para homologação controlada.

## Critérios de Reprovação

- Link quebrado em rota MVP.
- CTA confuso ou com destino incorreto.
- Conteúdo demonstrativo parecendo real.
- Promessa de funcionalidade inexistente.
- Erro visual grave.
- Problema impeditivo em mobile.
- Informação institucional inventada ou inadequada.

## Registro de Feedback

Use uma linha por achado. A triagem deve classificar cada item como `bloqueante`, `ajuste antes de release` ou `melhoria futura`.

| Rota/área | Feedback | Prioridade | Evidência ou contexto | Responsável pela triagem | Decisão |
| --------- | -------- | ---------- | --------------------- | ------------------------ | ------- |
|           |          |            |                       |                          |         |
|           |          |            |                       |                          |         |
|           |          |            |                       |                          |         |

## Observação Sobre Preview/Deploy

Se houver URL de preview, registrar manualmente neste documento após o deploy.

URL de preview: _registrar manualmente, se houver_.

Não inventar URL, data de homologação, nomes de validadores, aprovação institucional, produção final ou governança resolvida.
