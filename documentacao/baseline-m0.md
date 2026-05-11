# Baseline tecnico - Milestone 0

Data/hora local: 2026-05-09T00:28:30.7372473-03:00  
Timezone: America/Bahia  
Workspace: `D:\portal_nite`

## Escopo executado

Milestone 0 - Preparacao, limpeza e baseline tecnico.

Regras respeitadas:

- Nenhuma mudanca visual foi feita.
- Nenhum componente visual foi alterado.
- `motion` foi instalado, mas nao foi usado em nenhum componente.
- Nenhum `.env` versionado foi criado.
- `AGENTS.md`, `specs_svg.md` e `specs_nite.md` nao foram alterados por esta execucao.
- Falhas e avisos foram tratados como baseline; nenhuma refatoracao corretiva foi feita.
- O milestone foi marcado como aprovado somente apos confirmacao humana explicita em 2026-05-09.

## Estado inicial do Git

Comandos executados antes de alterar arquivos:

```txt
git status --short
 M AGENTS.md
 M artifacts/dev-server-m8.out.log
 M specs_svg.md
?? specs_nite.md

git branch --show-current
main

git rev-parse --short HEAD
88c27bf
```

`git ls-files artifacts` confirmou que `artifacts/**` estava versionado antes da limpeza.

## Ambiente

```txt
node --version
v24.12.0

npm --version
11.6.2

npm ls motion gsap --depth=0
portal_nite@0.1.0 D:\portal_nite
+-- gsap@3.15.0
`-- motion@12.38.0
```

## Limpeza e ignores

- `.gitignore` atualizado para cobrir `/artifacts` e `/.cache`.
- `.prettierignore` atualizado para cobrir `artifacts` e `.cache`.
- `artifacts/**` removido apenas do controle de versao com `git rm --cached -r -- artifacts`.
- Arquivos locais em `artifacts/**` foram preservados no disco.
- Apos a remocao do indice, `git ls-files artifacts` retornou vazio.

## Comandos e resultados

### Rodada inicial, antes de instalar `motion`

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm ci` | Passou | Instalou 719 pacotes. NPM reportou 6 vulnerabilidades: 5 moderadas e 1 alta. Nenhuma correcao automatica foi aplicada. |
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | `eslint .` sem erros. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |

### Instalacao de `motion`

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm install motion` | Passou | Instalou `motion@12.38.0`; NPM manteve o aviso de 6 vulnerabilidades. |
| Remocao de `node_modules` | Passou | Caminho resolvido e validado dentro do workspace antes da remocao. `Test-Path` retornou `False`. |

### Rodada limpa, depois de atualizar o lockfile

| Comando | Resultado | Observacoes |
|---|---:|---|
| `npm ci` | Passou | Instalou 723 pacotes a partir do lockfile atualizado. NPM reportou 6 vulnerabilidades: 5 moderadas e 1 alta. |
| `npm run typecheck` | Passou | `tsc --noEmit` sem erros. |
| `npm run lint` | Passou | `eslint .` sem erros. |
| `npm run test` | Passou | 4 arquivos de teste passaram; 10 testes passaram. |
| `npm run build` | Passou | Next.js 16.2.4 compilou e gerou 11 paginas estaticas. |

## GSAP

GSAP permaneceu integro para o escopo do Milestone 0:

- `gsap@3.15.0` continua instalado.
- Os checks e o build passaram antes e depois da instalacao de `motion`.
- Nao houve erro de build, TypeScript, lint ou teste relacionado a GSAP.

## Vercel e `NEXT_PUBLIC_SITE_URL`

Status: bloqueado por credenciais ausentes no ambiente local.

Comandos/verificacoes:

```txt
Test-Path .vercel/project.json
NO_VERCEL_PROJECT_JSON

Get-Command vercel
C:\Users\breno\AppData\Roaming\npm\vercel.ps1

$env:VERCEL_TOKEN
NO_VERCEL_TOKEN_ENV

vercel whoami
Vercel CLI 50.1.3
Error: No existing credentials found. Please run `vercel login` or pass "--token"
```

Resultado:

- Nao foi possivel verificar nem configurar a variavel de producao `NEXT_PUBLIC_SITE_URL=https://portal-nite.vercel.app` neste ambiente.
- Nao foi criado `.env` versionado.
- Acao humana pendente: autenticar na Vercel e configurar/verificar a variavel no ambiente de producao do projeto.

Passo manual sugerido:

```txt
vercel login
vercel link
vercel env ls production
vercel env add NEXT_PUBLIC_SITE_URL production
```

Valor esperado:

```txt
NEXT_PUBLIC_SITE_URL=https://portal-nite.vercel.app
```

## Status final

- Baseline tecnico registrado.
- Dependencia `motion` adicionada e validada por `npm ci`.
- `artifacts/**` deixou de ser versionado e passou a ser tratado como artefato local ignorado.
- Todos os checks obrigatorios passaram.
- A unica pendencia e a verificacao/configuracao da variavel de producao na Vercel por falta de credenciais locais.
- O Milestone 0 foi aprovado por confirmacao humana explicita em 2026-05-09.

## Aprovacao humana

Data/hora local: 2026-05-09T01:21:50-03:00

Confirmacao recebida:

```txt
Milestone 0 e Milestone 1 aprovados!
```

Status:

- Milestone 0 aprovado.
- A pendencia de Vercel permanece documentada como bloqueio externo por falta de credenciais locais.
