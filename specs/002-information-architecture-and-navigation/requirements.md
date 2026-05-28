# Requirements - Information Architecture & Navigation

## Status

Milestone 2 iniciada oficialmente - arquitetura de informacao em consolidacao

## Milestone

Milestone 2 - Information Architecture & Navigation

## Registro oficial da Milestone 2

Status: Em andamento.

Data de inicio oficial: 2026-05-13.

Objetivo desta etapa: consolidar sitemap, rotas, header, mega menu desktop, menu mobile em camadas, CTAs finais, agrupamentos de menu, regras de navegacao e criterios de aceitacao sem implementar codigo.

Regras preservadas:

- Nao implementar codigo.
- Nao avancar para Spec 003 nesta etapa.
- Manter ADRs como Proposto.
- Manter governanca minima de conteudo como Pendente de validacao coletiva.

## Objetivo

Definir a arquitetura de informacao do portal e uma navegacao escalavel para paginas, projetos, atualizacoes, oportunidades e contato.

## Escopo

- Sitemap.
- Header desktop.
- Mega menu.
- Navegacao mobile.
- Agrupamento de secoes.
- Fluxos principais de navegacao.

## Requisitos complementares

- A navegacao deve separar rotas do MVP de rotas futuras.
- CTAs finais aprovados pelo gestor devem orientar a Spec 002.
- Menu desktop nao pode depender apenas de hover.
- Menu mobile deve funcionar em camadas quando houver grupos: primeira camada com grupos principais e segunda camada com links do grupo selecionado.
- Itens futuros nao devem parecer disponiveis quando ainda nao existem.
- Rotas sem conteudo real devem exibir estado vazio honesto.

## Rotas por fase

## Sitemap do MVP

```txt
/
/projetos
/projetos/[slug]
/oportunidades
/atualizacoes
/contato
Home#sobre
```

### MVP premium

- `/`
- `/projetos`
- `/projetos/[slug]`
- `/oportunidades`
- `/atualizacoes`
- `/contato`
- Secao Sobre na home

### Futuro possivel

- `/sobre`, caso a secao Sobre vire pagina propria
- `/atualizacoes/[slug]`
- `/comunidade`
- `/eventos`
- `/oficinas`
- `/galeria`
- `/oportunidades/[slug]`
- `/candidatura`
- `/contato?tipo=desafio` ou fluxo equivalente para professores/gestores

### Fora de escopo do MVP

- Area autenticada.
- Dashboard administrativo.
- Rotas internas de gestao.
- Fluxo completo de candidatura com acompanhamento.

## Header MVP

Itens principais:

- O NITE.
- Projetos.
- Atualizacoes.
- Oportunidades.
- Contato.

Regra de CTA do header:

- O header nao deve exibir CTA global isolado.
- A rota `/contato` permanece acessivel pelo grupo "Contato" da navegacao.

## Regras de navegacao

- Header desktop deve expor os caminhos principais sem depender apenas de hover.
- MegaMenu desktop deve ser compacto, premium, integrado ao background e agrupar links por intencao do usuario.
- MegaMenu desktop nao deve ser full-width e deve fechar por mouseleave, Escape e clique fora quando aberto.
- Navegacao mobile deve usar menu em camadas para grupos com subitens, sem depender de hover e sem criar scroll horizontal.
- A primeira camada mobile deve conter logo/marca, botao fechar e grupos principais.
- A segunda camada mobile deve conter botao voltar, botao fechar, titulo do grupo e links do grupo.
- Itens futuros podem aparecer apenas como roadmap/pendente, sem parecer funcionalidade pronta.
- Rotas sem conteudo real devem ter estado vazio honesto.
- Foco visivel e obrigatorio para todos os itens interativos.
- Grupos expansivos devem usar botoes reais; navegacao deve usar links reais.
- Controles expansivos devem comunicar estado com `aria-expanded` e `aria-controls` quando aplicavel.
- Menu aberto deve fechar com Escape quando houver interacao implementada.
- Menu aberto deve fechar com clique fora quando houver interacao implementada.
- Sem JavaScript, links principais do MVP devem permanecer acessiveis quando possivel.

## CTAs

Textos oficiais aprovados pelo gestor para a Spec 002:

| Contexto             | CTA                      | Destino                                             | Status                                                                  |
| -------------------- | ------------------------ | --------------------------------------------------- | ----------------------------------------------------------------------- |
| Hero primario        | Explorar projetos        | `/projetos`                                         | Aprovado pelo gestor                                                    |
| Hero secundario      | Conhecer o NITE          | Secao Sobre na home ou rota futura `/sobre`         | Aprovado pelo gestor; `/sobre` e rota futura                            |
| Header               | Sem CTA global isolado   | N/A                                                 | Removido do header em 2026-05-28; contato permanece no grupo Contato    |
| Oportunidades        | Acompanhar oportunidades | `/oportunidades`                                    | Aprovado pelo gestor                                                    |
| Professores/gestores | Propor desafio           | `/contato?tipo=desafio` ou fluxo equivalente futuro | Aprovado pelo gestor; detalhe de fluxo pendente de implementacao futura |

O canal de oportunidades do MVP e formulario integrado no proprio portal. O backend e detalhes tecnicos do formulario sao dependencia futura, sem implementacao nesta spec.

## Atualizacoes

- Nome publico: Atualizacoes.
- Rota: `/atualizacoes`.
- Titulo sugerido da pagina/secao: NITE em movimento.
- Descricao sugerida: Registros, novidades e bastidores das acoes do nucleo.
- Noticias pode ser citado apenas como termo equivalente/contextual, nao como label principal do MVP.

## Checklist de validacao

- [x] O usuario acessa projetos em ate 2 interacoes.
- [x] O usuario acessa contato em ate 2 interacoes.
- [x] O usuario entende onde procurar oportunidades.
- [x] O menu nao fica extenso demais.
- [x] O menu desktop nao depende apenas de hover.
- [x] O menu mobile em camadas e confortavel para toque.
- [x] O menu mobile em camadas nao cria scroll horizontal.
- [x] Todos os itens interativos possuem foco visivel.
- [x] Rotas futuras nao aparecem como funcionalidades prontas.
- [x] CTAs finais aprovados estao documentados com destino planejado.

## Criterios de aceitacao

- [x] Dado que o usuario esta no desktop, quando abre Projetos, entao visualiza links agrupados por tipo de projeto.
- [x] Dado que o usuario esta no mobile, quando toca em um grupo do menu, entao acessa uma segunda camada com os links do grupo selecionado e pode voltar ou fechar o menu.
- [x] Dado que o usuario navega por teclado, quando pressiona Tab, entao todos os links recebem foco visivel.
- [x] Dado que o menu esta aberto, quando o usuario pressiona Escape, entao o menu fecha.
- [x] Dado que o usuario acessa o portal pela primeira vez, quando olha o header, entao entende os caminhos principais do site.
- [x] Dado que uma rota futura aparece no menu, quando o usuario tenta acessar, entao ela nao e apresentada como pronta sem conteudo validado.
- [x] Dado que um CTA aprovado e exibido, quando revisado, entao seu texto e destino seguem a tabela oficial de CTAs.
- [x] Dado que o usuario procura registros do nucleo, quando consulta a navegacao, entao encontra Atualizacoes como label principal do MVP.

## Evidencia de validacao da Milestone 2

Revisao documental realizada em 2026-05-13 usando a Spec Mae, Spec 001 e esta Spec 002 como fonte de verdade.

Esta validacao consolida a arquitetura de informacao e navegacao em nivel documental. O Header final do MVP utiliza MegaMenu desktop compacto e menu mobile em camadas. No mobile, o usuario abre o painel principal, visualiza os grupos principais, acessa uma segunda camada com os links do grupo selecionado e pode voltar ou fechar o menu. Essa decisao substitui a nomenclatura anterior de mobile accordion para o Header final.
