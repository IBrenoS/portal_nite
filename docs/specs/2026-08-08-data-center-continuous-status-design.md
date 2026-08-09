# Status contínuo do Data Center

## Objetivo

Remover a apresentação duplicada de status no topo das páginas de projeto e representar o Data Center como uma frente ativa que permanece em evolução, sem declarar que seu conteúdo editorial já está completo.

## Decisão de produto

- O grupo que combina o status operacional e o estado editorial no topo da página de detalhe será removido de todas as páginas de projeto. O painel de acompanhamento continuará sendo a fonte visível de status.
- O Data Center passará de `status: "placeholder"` para `status: "ativo"`.
- No painel de acompanhamento do Data Center, o status operacional será exibido como **“Em evolução contínua”**.
- O `contentState` do Data Center continuará como `"em-estruturacao"`. Esse campo representa a maturidade editorial do conteúdo, não a condição operacional do Data Center.
- Os demais projetos manterão seus dados e rótulos atuais.

## Implementação

### Dados

Atualizar somente o campo `status` do projeto `data-center` em `packages/content/data/projects.json`. Nenhum contrato, enum ou schema novo será criado, pois `ativo` já expressa corretamente o estado operacional.

### Página de detalhe

Remover o bloco de badges localizado entre o breadcrumb e o título em `apps/web/src/app/projetos/[slug]/page.tsx`.

O `StatusBadge` do painel lateral continuará usando o tom derivado de `project.status`. Para o slug `data-center`, receberá o rótulo específico `Em evolução contínua`; os demais projetos continuarão usando os rótulos padrão do design system.

Essa exceção de apresentação não altera o significado global de `in_progress` nem renomeia o status de outros projetos.

## Fluxo de dados

1. O conteúdo carrega o Data Center com `status: "ativo"` e `contentState: "em-estruturacao"`.
2. A página converte `ativo` para o tom visual `in_progress` existente.
3. O painel lateral identifica o Data Center e exibe `Em evolução contínua`.
4. A prontidão editorial continua sendo determinada exclusivamente por `contentState === "real"`; portanto, entregáveis, métricas e evidências não validadas permanecem ocultos.

## Testes e validação

- Atualizar o teste unitário da página de detalhe para comprovar que o Data Center não exibe o grupo de badges no topo.
- Verificar que há exatamente um status visível na página e que seu texto é `Em evolução contínua`.
- Verificar que o Data Center é carregado com status operacional `ativo` e mantém `contentState: "em-estruturacao"`.
- Executar o teste direcionado da página de detalhe, typecheck e lint dos arquivos modificados.
- Recarregar `http://localhost:3000/projetos/data-center` e confirmar visualmente a ausência do grupo superior e o novo status no painel.

## Fora de escopo

- Reescrever a descrição, área, stack, fase atual ou próximos passos do Data Center.
- Publicar entregáveis, métricas, equipe ou evidências ainda não validadas.
- Alterar os status dos projetos Jogos Embarcados e Dados e IA.
- Criar um novo valor de status no schema compartilhado.
