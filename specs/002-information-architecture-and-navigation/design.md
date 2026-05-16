# Design - Information Architecture & Navigation

## Estrutura recomendada

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

## Rotas futuras possiveis

Itens abaixo nao devem parecer funcionalidades prontas enquanto nao houver spec e implementacao correspondentes.

```txt
/sobre
/atualizacoes/[slug]
/comunidade
/eventos
/oficinas
/galeria
/oportunidades/[slug]
/candidatura
/contato?tipo=desafio
```

## Header MVP

Itens principais:

- O NITE.
- Projetos.
- Atualizacoes.
- Oportunidades.
- Contato.

CTA principal:

- Falar com o NITE -> `/contato`.

## MegaMenu desktop

Labels principais aprovados para o MVP. Itens futuros podem aparecer apenas quando nao parecerem funcionalidades prontas.

O MegaMenu desktop do Header final deve ser compacto, premium, integrado ao background e acessivel. O painel nao deve ser full-width; deve usar botoes reais para grupos expansivos, links reais para navegacao, foco visivel e estado expandido comunicado com `aria-expanded`/`aria-controls` quando aplicavel. O menu deve fechar por mouseleave, Escape e clique fora.

### O NITE

- Sobre
- Missao
- Frentes de atuacao
- Timeline

### Projetos

- Todos os projetos
- Software aplicado
- Dados e IA
- Robotica
- Experiencia digital
- Automacao

### Atualizacoes

- NITE em movimento
- Registros
- Bastidores

Itens futuros/roadmap:

- Eventos
- Oficinas
- Depoimentos
- Galeria

### Oportunidades

- Como participar
- Processos abertos
- Enviar curriculo

Item futuro/roadmap:

- Perguntas frequentes

### Contato

- Falar com o NITE
- Propor desafio
- E-mail
- Instagram

## Menu mobile em camadas

A navegacao mobile deve usar os mesmos grupos do mega menu desktop:

- O NITE.
- Projetos.
- Atualizacoes.
- Oportunidades.
- Contato.

O menu mobile nao e accordion simples. O usuario abre o painel principal, visualiza os grupos principais, acessa uma segunda camada com os links do grupo selecionado e pode voltar ou fechar o menu.

A primeira camada mobile deve conter logo/marca, CTA principal, botao fechar e grupos principais. A segunda camada mobile deve conter botao voltar, botao fechar, titulo do grupo e links do grupo. O menu deve ser confortavel para toque, nao depender de hover, nao criar scroll horizontal e preservar foco visivel. Itens futuros devem ser rotulados como roadmap/pendente quando exibidos.

## CTA por area

| Area                 | CTA oficial              | Destino                                             | Observacao                                         |
| -------------------- | ------------------------ | --------------------------------------------------- | -------------------------------------------------- |
| Hero primario        | Explorar projetos        | `/projetos`                                         | Texto aprovado pelo gestor                         |
| Hero secundario      | Conhecer o NITE          | Secao Sobre na home ou rota futura `/sobre`         | `/sobre` nao deve ser implementada automaticamente |
| Header               | Falar com o NITE         | `/contato`                                          | Texto aprovado pelo gestor                         |
| Oportunidades        | Acompanhar oportunidades | `/oportunidades`                                    | Pagina deve suportar estado sem vagas              |
| Professores/gestores | Propor desafio           | `/contato?tipo=desafio` ou fluxo equivalente futuro | Fluxo detalhado e implementacao futura             |

## Atualizacoes

- Nome publico: Atualizacoes.
- Rota MVP: `/atualizacoes`.
- Titulo sugerido: NITE em movimento.
- Descricao sugerida: Registros, novidades e bastidores das acoes do nucleo.
- Noticias nao e label principal do MVP; pode aparecer apenas como termo equivalente/contextual.

## Estados de navegacao

- Fechado: mostra logo, links principais e CTA principal.
- Aberto desktop: mostra grupos com links, sem depender apenas de hover.
- Aberto mobile: mostra primeira camada com grupos principais e segunda camada com links do grupo selecionado.
- Hover: reforca item interativo sem depender so de cor.
- Focus: foco visivel obrigatorio.
- Active: indica rota atual.
- Disabled/pendente: usado apenas para item futuro quando for necessario mostrar roadmap; nao deve parecer rota pronta.

## Regras de navegacao

- Header deve permitir acesso a projetos, contato e oportunidades em ate 2 interacoes.
- MegaMenu desktop deve organizar links por intencao, nao por estrutura interna do codigo.
- Menu mobile em camadas deve ser confortavel para toque e teclado.
- Escape deve fechar menus abertos quando houver interacao implementada.
- Clique fora deve fechar menus abertos quando houver interacao implementada.
- Links principais do MVP devem continuar acessiveis sem JavaScript quando possivel.
- `/sobre` e `/contato?tipo=desafio` sao planejados/futuros; nao implementar nesta etapa.
