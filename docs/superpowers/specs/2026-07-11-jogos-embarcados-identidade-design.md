# Identidade e capa de Jogos Embarcados

## Objetivo

Substituir a identidade anterior do projeto por `Jogos Embarcados`, aplicar a fotografia fornecida em todos os espaços dedicados à capa do projeto e migrar a URL sem quebrar acessos antigos.

## Escopo aprovado

- Alterar o título público para `Jogos Embarcados`.
- Alterar o slug canônico para `jogos-embarcados`.
- Redirecionar permanentemente `/projetos/robotica-educacional` para `/projetos/jogos-embarcados`.
- Copiar `C:/Users/breno/Downloads/pedra_papel_tesoura-enhanced.png` para a pasta pública de imagens de projetos com nome coerente com a nova identidade.
- Usar a nova imagem como `coverImage`, ilustração e item de galeria, garantindo sua exibição na homepage, listagem, projetos relacionados, página interna e metadados sociais sempre que esses espaços consumirem a imagem do projeto.
- Remover todas as ocorrências públicas e internas do nome anterior, incluindo variações sem acento e referências em testes ativos.
- Atualizar textos alternativos e metadados mínimos para o nome `Jogos Embarcados` e para o objeto fotografado.

## Conteúdo adiado

A nova narrativa ainda será fornecida. Nesta etapa não serão inventados nem redefinidos resumo, descrição, problema, contexto, público, categoria, tecnologias, destaques, objetivo, resultados ou demais informações editoriais. Valores existentes que não contenham o nome antigo serão preservados temporariamente. Quando um campo contiver o nome antigo, somente essa identificação será substituída por uma formulação mínima e neutra, sem ampliar afirmações sobre o projeto.

## Fonte de dados e renderização

O registro em `conteudo/projetos/projetos.json` continuará como fonte única para título, slug e imagens. Componentes que já consomem `coverImage`, `illustration` ou `gallery` não receberão caminhos duplicados. O mapeamento visual por slug será atualizado apenas se necessário para preservar o comportamento atual do componente.

## Migração de rota

A nova rota será canônica. A rota antiga será tratada explicitamente com redirecionamento permanente no App Router, preservando parâmetros irrelevantes apenas conforme o comportamento padrão do Next.js. Não haverá dois registros de projeto.

## Verificação

Os testes deverão provar, primeiro em vermelho e depois em verde, que:

- `Jogos Embarcados` aparece nos pontos públicos relevantes;
- o caminho da nova imagem é usado em todos os slots de capa derivados do conteúdo;
- a URL canônica usa `jogos-embarcados`;
- a URL antiga redireciona permanentemente;
- nenhuma ocorrência do nome anterior permanece nos arquivos ativos ou na documentação do repositório;
- schema, typecheck, lint, testes e build permanecem válidos.

## Fora de escopo

- Criar a narrativa definitiva de Jogos Embarcados.
- Redesenhar componentes de projetos.
- Alterar a taxonomia global de categorias.
- Modificar mudanças locais já existentes e não relacionadas.
