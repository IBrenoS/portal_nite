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

## Mega menu desktop

Labels principais aprovados para o MVP. Itens futuros podem aparecer apenas quando nao parecerem funcionalidades prontas.

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

## Navegacao mobile em accordion

A navegacao mobile deve usar os mesmos grupos do mega menu desktop:

- O NITE.
- Projetos.
- Atualizacoes.
- Oportunidades.
- Contato.

Cada grupo com subitens deve expandir em accordion. O grupo aberto deve poder ser fechado sem bloquear acesso aos demais grupos. Itens futuros devem ser rotulados como roadmap/pendente quando exibidos.

## CTA por area

| Area | CTA oficial | Destino | Observacao |
|---|---|---|---|
| Hero primario | Explorar projetos | `/projetos` | Texto aprovado pelo gestor |
| Hero secundario | Conhecer o NITE | Secao Sobre na home ou rota futura `/sobre` | `/sobre` nao deve ser implementada automaticamente |
| Header | Falar com o NITE | `/contato` | Texto aprovado pelo gestor |
| Oportunidades | Acompanhar oportunidades | `/oportunidades` | Pagina deve suportar estado sem vagas |
| Professores/gestores | Propor desafio | `/contato?tipo=desafio` ou fluxo equivalente futuro | Fluxo detalhado e implementacao futura |

## Atualizacoes

- Nome publico: Atualizacoes.
- Rota MVP: `/atualizacoes`.
- Titulo sugerido: NITE em movimento.
- Descricao sugerida: Registros, novidades e bastidores das acoes do nucleo.
- Noticias nao e label principal do MVP; pode aparecer apenas como termo equivalente/contextual.

## Estados de navegacao

- Fechado: mostra logo, links principais e CTA principal.
- Aberto desktop: mostra grupos com links, sem depender apenas de hover.
- Aberto mobile: mostra grupos em accordion.
- Hover: reforca item interativo sem depender so de cor.
- Focus: foco visivel obrigatorio.
- Active: indica rota atual.
- Disabled/pendente: usado apenas para item futuro quando for necessario mostrar roadmap; nao deve parecer rota pronta.

## Regras de navegacao

- Header deve permitir acesso a projetos, contato e oportunidades em ate 2 interacoes.
- Mega menu desktop deve organizar links por intencao, nao por estrutura interna do codigo.
- Mobile accordion deve ser confortavel para toque e teclado.
- Escape deve fechar menus abertos quando houver interacao implementada.
- Clique fora deve fechar menus abertos quando houver interacao implementada.
- Links principais do MVP devem continuar acessiveis sem JavaScript quando possivel.
- `/sobre` e `/contato?tipo=desafio` sao planejados/futuros; nao implementar nesta etapa.
