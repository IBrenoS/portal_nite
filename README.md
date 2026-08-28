# Portal NITE

Portal institucional responsivo do Núcleo de Inovação, Tecnologia e Experiência da UNIJORGE. O repositório usa npm workspaces e Turbo para manter a aplicação web e o conteúdo tipado em limites explícitos.

## Requisitos

- Node.js 20.9.0 ou superior
- npm 11.6.2

Instale as dependências na raiz:

```bash
npm ci
```

## Workspaces

```text
apps/web/          aplicação Next.js, UI, assets e testes de navegador
packages/content/  dados públicos, schemas Zod, tipos e consultas
packages/news/     contrato consumidor, client HTTP e fixture de notícias
packages/ui/       tokens, primitives e renderer exclusivos do Portal
docs/              produto, design system, arquitetura e specs ativas
```

`@nite/content`, `@nite/news` e `@nite/ui` são as entradas públicas dos packages do Portal. A aplicação não deve usar imports profundos nem caminhos físicos entre workspaces.

## Comandos

Execute os comandos públicos a partir da raiz:

| Comando                         | Finalidade                                      |
| ------------------------------- | ----------------------------------------------- |
| `npm run dev`                   | inicia o portal em modo de desenvolvimento      |
| `npm run build`                 | gera o build de produção                        |
| `npm run start`                 | inicia o build do workspace web                 |
| `npm run lint`                  | executa ESLint em todos os workspaces           |
| `npm run typecheck`             | valida tipos em todos os workspaces             |
| `npm run test`                  | executa os testes unitários em paralelo         |
| `npm run test:affected`         | executa testes dos workspaces afetados          |
| `npm run test:visual -- --list` | lista os casos Playwright sem executá-los       |
| `npm run test:visual`           | executa a suíte visual manual                   |
| `npm run test:visual:update`    | atualiza snapshots visuais intencionalmente     |
| `npm run format`                | formata arquivos com Prettier                   |
| `npm run format:check`          | verifica formatação sem escrever                |
| `npm run check:deadcode`        | detecta arquivos, exports e dependências mortos |
| `npm run check`                 | executa a validação rotineira completa          |

## Execução dirigida

Use o filtro do npm para limitar uma verificação a um workspace:

```bash
npm run test --workspace=@nite/content
npm run typecheck --workspace=@nite/web
npm run test --workspace=@nite/web -- src/app/page.test.tsx
```

Durante a implementação, comece pelo teste ou workspace afetado. Execute `npm run check` ao alterar contratos compartilhados, configuração, dependências ou antes de concluir uma entrega. A suíte Playwright é intencionalmente manual e não faz parte do `check` rotineiro.

## Documentação

- [Arquitetura](docs/architecture.md)
- [Produto](docs/product.md)
- [Design system](docs/design-system.md)
- [Specs de referência](docs/superpowers/specs/)
