# Design - Project Portfolio & Detail Pages

## Direcao de experiencia

O portfolio deve ser uma area de credibilidade institucional, nao uma vitrine inflada. O usuario deve conseguir escanear projetos rapidamente, entender o que cada projeto busca resolver e abrir detalhes sem encontrar texto excessivo ou evidencias simuladas.

As decisoes visuais seguem a Spec 003:

- Cards em superficie consistente.
- Status com texto e apoio visual.
- Foco visivel em filtros, cards e links.
- Conteudo legivel em mobile.
- Movimento discreto, nao essencial e compativel com `prefers-reduced-motion`.

## Pagina `/projetos`

A pagina de portfolio deve organizar:

- Titulo da pagina.
- Descricao curta do portfolio.
- Filtros por area/frente.
- Filtros por status.
- Lista ou grid responsivo de ProjectCards.
- Estado vazio quando nao houver projetos.
- Estado sem resultados quando filtros nao retornarem cards.

Cada item da lista deve priorizar:

- Nome do projeto.
- Resumo curto.
- Area/frente.
- Status.
- Stack resumida quando ajudar a leitura.
- Ultima atualizacao quando util para contexto.
- CTA ou link para `/projetos/[slug]`.

## Filtros por area e status

- Filtros devem ser controles acessiveis por teclado.
- Area/frente e status podem ser usados separadamente ou combinados.
- Filtros ativos devem possuir estado visual claro.
- O usuario deve conseguir limpar ou trocar filtros sem perder contexto.
- Quando nao houver resultado, a pagina deve informar que nenhum projeto corresponde aos filtros atuais.
- Filtros nao devem ocultar informacao essencial nem sugerir areas/status sem projeto real cadastrado.

## ProjectCard

O ProjectCard deve ser consistente com o contrato de design da Spec 003.

Estrutura informacional:

- Nome do projeto.
- Resumo curto.
- Area/frente.
- Status com label publica.
- Stack resumida, quando aplicavel.
- Ultima atualizacao, quando util.
- Indicacao honesta quando nao houver evidencias publicas.
- Link para pagina individual.

Comportamento visual:

- Card clicavel deve ter foco visivel.
- Hover nao deve ser o unico sinal de interacao.
- Status deve usar texto e pode usar cor/icone como apoio.
- Projeto em estruturacao deve parecer ativo ou pendente, nao finalizado.
- Ausencia de evidencias deve ser comunicada sem tratar como erro.

## Pagina individual `/projetos/[slug]`

A pagina individual deve ser objetiva e organizada em blocos curtos.

Estrutura recomendada:

1. Cabecalho do projeto: nome, resumo, area/frente e status.
2. Contexto: problema ou contexto que motivou o projeto.
3. Objetivo: o que o projeto busca resolver ou entregar.
4. Stack/tecnologias: lista compreensivel, sem excesso tecnico.
5. Responsaveis/equipe: exibido apenas quando autorizado.
6. Ultima atualizacao: data ou referencia temporal validada.
7. Proximo passo: acao, etapa ou direcao atual do projeto.
8. Evidencias ou resultado gerado: exibidos apenas quando houver material real.
9. Links publicos: repositorio, demo ou documentos, somente quando autorizados.

Campos opcionais devem aparecer depois dos campos obrigatorios e apenas quando houver material real:

- Evidencias visuais.
- Link do repositorio.
- Link de demo.
- Depoimento.
- Resultado gerado.
- Galeria.
- Documentos anexos.

## Tratamento de conteudo ausente

- Evidencias ausentes: informar que ainda nao ha evidencia publica disponivel ou autorizada.
- Responsaveis sem autorizacao: ocultar o bloco ou sinalizar como pendente de autorizacao coletiva.
- Repositorio sem permissao publica: nao exibir link.
- Demo inexistente: nao exibir link.
- Depoimento sem autorizacao: nao exibir depoimento.
- Resultado ainda nao validado: nao apresentar como resultado gerado.
- Projeto em estruturacao: status e proximo passo devem comunicar o estado real.

## Linguagem e densidade

- Nao usar "entregaveis" como secao obrigatoria publica.
- Preferir "Resultado gerado" ou "Evidencias" quando houver material real.
- Evitar paragrafos longos.
- Explicar stack e termos tecnicos em linguagem compreensivel.
- Priorizar clareza sobre detalhamento tecnico.
- Nao transformar a pagina em relatorio extenso.
- Nao publicar nomes, imagens, links ou depoimentos sem autorizacao.

## SEO, responsividade e acessibilidade

- `/projetos` deve prever titulo e descricao institucional.
- Cada `/projetos/[slug]` deve prever titulo e descricao baseados no nome e resumo do projeto.
- Cards, filtros e links devem ser navegaveis por teclado.
- Foco visivel deve seguir a Spec 003.
- Badges de status devem respeitar contraste e nao depender so de cor.
- Mobile deve empilhar filtros e blocos de conteudo sem cortar informacao.
- Midias opcionais devem ter alternativa textual quando forem implementadas.
- Paginas devem permanecer compreensiveis sem animacao.

## Estados esperados

| Estado | Comportamento esperado |
|---|---|
| Sem projetos | Informar que o portfolio esta em estruturacao |
| Sem resultado de filtro | Informar que nenhum projeto corresponde aos filtros atuais |
| Sem evidencias publicas | Mostrar estado honesto sem simular imagem, demo ou resultado |
| Sem responsaveis autorizados | Ocultar ou marcar como pendente, sem inventar nomes |
| Projeto `draft` | Comunicar "Em estruturacao" e destacar proximo passo |
| Projeto `in_progress` | Comunicar "Em andamento" e contexto atual |
| Projeto `validated` | Comunicar "Validado" quando houver validacao real |
| Projeto `done` | Comunicar "Finalizado" somente quando houver conclusao validada |
| Projeto `archived` | Comunicar "Arquivado" como historico ou sem evolucao ativa |

## Regras de consistencia

- A pagina `/projetos` deve estar acessivel a partir da navegacao aprovada na Spec 002.
- ProjectCard deve seguir os tokens e estados definidos na Spec 003.
- As paginas individuais devem reforcar conteudo honesto definido na Spec 001.
- Validacao final de acessibilidade, SEO e performance deve ocorrer na implementacao e na Spec 007.
