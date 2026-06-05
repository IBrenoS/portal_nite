# Design: rota "Como participar" em Oportunidades

## Estado

Aprovado em design section-by-section em 2026-06-05.

Esta especificação consolida a página dedicada que será aberta pelo card "Processos / Como participar" em `/oportunidades`. A referência visual foi verificada nesta sessão nas páginas públicas da Resend, especialmente `https://resend.com/about` e `https://resend.com/philosophy`. Como essas páginas externas podem mudar, a implementação deve seguir as decisões registradas aqui, não uma inspeção futura implícita.

## Objetivo

Criar a rota dedicada `/oportunidades/como-participar` para explicar como estudantes se aproximam do núcleo de desenvolvimento do NITE.

A página não deve funcionar como aviso de status, lista de vagas, formulário de inscrição, FAQ ou justificativa institucional. Ela deve ser uma peça editorial premium sobre entrada, repertório, ritmo e contexto de projeto.

## Fluxo aprovado

Na página `/oportunidades`, o card "Processos / Como participar" deve deixar de apontar para `#open-positions` e passar a navegar para `/oportunidades/como-participar`.

A página nova não deve adicionar outro CTA principal no corpo. A ação já aconteceu quando o usuário escolheu "Como participar". O conteúdo deve responder ao clique com uma explicação madura do processo, sem conduzir para uma segunda ação artificial.

## Tom editorial

Usar linguagem institucional, confiante e objetiva. Evitar termos que soem como desculpa, autodefesa ou promessa operacional.

Evitar:

- "filosofia", por ficar literal demais em relação à Resend.
- "frente" como palavra recorrente. Quando a ideia for ponto de entrada, usar "contexto de projeto", "trilha de atuação", "campo de construção" ou "projeto".
- "sem promessa", "sem formulário", "sem vaga" e variações no corpo da nova página.
- Linguagem de edital, FAQ, política pública ou status operacional.

Usar:

- "caminho de entrada"
- "aproximação"
- "repertório"
- "ritmo"
- "contexto de projeto"
- "sinais de prontidão"
- "continuidade"
- "memória compartilhada"

## Estrutura da página

### 1. Hero

Referência principal: Resend `/about`.

Estrutura visual:

- fundo preto do projeto;
- grid pontilhado ou perspectiva sutil ao fundo;
- ícone 3D central com o símbolo do NITE;
- título editorial em escala grande;
- texto curto de apoio;
- sem CTA primário.

Texto aprovado:

- Título: "O caminho para construir com o NITE"
- Apoio: "Como estudantes se aproximam do núcleo, desenvolvem repertório e entram em projetos com orientação, ritmo e responsabilidade."

O hero deve parecer uma adaptação fiel da primeira dobra da Resend, mas com identidade NITE.

### 2. Bloco narrativo

Referência principal: Resend `/about`, seção "Our story".

Estrutura visual:

- título central;
- coluna estreita de leitura, aproximadamente 480px;
- texto editorial pausado;
- palavras fortes em destaque, sem transformar a seção em lista.

Título aprovado:

- "O caminho de entrada"

Mensagem:

Entrar no NITE começa antes de uma seleção formal. O estudante se aproxima quando entende que o núcleo trabalha com problemas reais, colaboração entre áreas e entregas que precisam de continuidade. A narrativa deve reforçar método, curiosidade técnica, responsabilidade com o grupo e aprendizado em ciclos curtos.

### 3. Objeto 3D do processo

Referência principal: Resend `/about`, ícone 3D central, reinterpretado como objeto de processo.

Estrutura visual:

- abandonar card grande genérico ou infográfico plano;
- criar um objeto 3D premium com núcleo metálico "N";
- usar órbitas, camadas, grid em perspectiva, feixe de luz e nós flutuantes;
- a composição deve parecer um sistema visual, não uma tabela.

Título aprovado:

- "Da aproximação ao projeto"

Etapas aprovadas:

1. Aproximação: conhecer o núcleo e seus campos de atuação.
2. Repertório: organizar base técnica e disponibilidade.
3. Compatibilidade: encontrar contexto, momento e ritmo.
4. Integração: entrar em ciclos de entrega e revisão.

Legenda conceitual:

"De aproximação a integração, o processo é apresentado como um sistema de maturidade: o estudante se aproxima, ganha repertório, encontra compatibilidade e passa a atuar no ritmo de projeto do núcleo."

### 4. Sinais de prontidão

Referência principal: Resend `/philosophy`.

Estrutura visual:

- hero editorial com teclas 3D translúcidas;
- copiar a lógica das teclas da Resend, mas usar as letras `S`, `Y`, `N`, `C`;
- o conceito visual é `SYNC`;
- abaixo, princípios numerados em slabs escuros: número gigante no painel esquerdo, título grande, texto denso à direita;
- não usar cards de benefício.

Título aprovado:

- "Sinais de prontidão"

Texto do hero:

"Entrar no NITE não é escolher um rótulo. É encontrar sincronia entre interesse, repertório, ritmo e contexto de projeto."

Legenda do objeto:

"SYNC representa o ponto em que curiosidade, entrega e necessidade do projeto passam a trabalhar na mesma direção."

Princípios aprovados:

1. "Interesse vira construção."
   - O primeiro sinal não é dominar tudo. É transformar curiosidade em movimento: observar uma demanda, pesquisar, testar uma hipótese e voltar com algo que possa ser discutido.
   - O NITE olha para esse gesto porque ele revela autonomia inicial, critério de aprendizado e vontade de aproximar estudo de projeto real.

2. "Ritmo sustenta evolução."
   - Ideias boas não seguram um projeto sozinhas. O que cria confiança é a capacidade de manter combinados, aparecer nas revisões e comunicar progresso antes que o trabalho dependa de cobrança.
   - Participar do núcleo pede continuidade, leitura de prioridade e maturidade para dizer onde avançou, onde travou e o que precisa de decisão.

3. "Registro cria continuidade."
   - Projeto sério deixa rastro. Código, protótipo, decisão técnica, experimento, dado e processo precisam ser compreendidos por quem chega depois.
   - No NITE, registro não é formalidade. É uma forma de transformar execução em memória compartilhada, reduzindo retrabalho e aumentando a qualidade do que o grupo consegue manter.

4. "Contexto define onde começar."
   - Desenvolvimento, dados, IA, UX, automação, robótica e documentação pedem repertórios diferentes. A entrada fica mais forte quando o estudante entende qual problema está diante dele, não apenas qual área parece mais interessante.
   - Por isso, o processo observa compatibilidade entre pessoa, momento e contexto de projeto. O melhor lugar para começar é aquele em que o estudante cresce e o núcleo ganha contribuição real.

## Implementação esperada

Criar `app/oportunidades/como-participar/page.tsx`.

Atualizar `app/oportunidades/page.tsx` para trocar o link do card "Processos / Como participar" de `#open-positions` para `/oportunidades/como-participar`.

Usar os componentes globais já existentes:

- `SiteHeader`
- `SiteFooter`
- `Container`
- `NiteSymbol`
- utilitários `cn`
- tokens `bg-nite-background`, `text-nite-text-primary`, `text-nite-text-secondary`, `font-heading`, bordas e superfícies do design system

Não criar uma landing page genérica, não adicionar formulário e não adicionar CTA principal dentro da nova página.

## Design system

A página deve usar tokens do projeto sempre que possível. Efeitos específicos do objeto 3D podem usar classes locais ou CSS module, mas não devem introduzir uma paleta paralela.

Se o efeito `SYNC` ou o objeto 3D for extraído para componente reutilizável, o componente deve ser autocontido e aceitar letras/conteúdo por props. Se ficar restrito a esta página, manter o escopo local para evitar abstração prematura.

## Responsividade

Desktop:

- hero centralizado com objeto 3D acima ou abaixo do título, sem sobrepor texto;
- seções narrativas com largura estreita para leitura;
- slabs numerados em duas colunas na seção "Sinais de prontidão".

Mobile:

- objeto 3D deve reduzir escala sem cortar letras;
- seções numeradas devem empilhar painel e texto;
- textos devem manter line-height confortável e sem overflow horizontal;
- não usar fonte escalada por viewport fora dos limites já definidos.

## SEO e acessibilidade

Adicionar `metadata` específica para a rota:

- título: "Como participar | Oportunidades | NITE"
- descrição: "Entenda como estudantes se aproximam do núcleo de desenvolvimento do NITE, ganham repertório e passam a atuar em projetos com ritmo e responsabilidade."
- canonical: `/oportunidades/como-participar`

Adicionar breadcrumb JSON-LD:

- Início
- Oportunidades
- Como participar

Objetos visuais 3D puramente decorativos devem usar `aria-hidden="true"`. O conteúdo textual essencial deve estar no HTML, não apenas em imagens ou pseudo-elementos.

## Verificação

Após implementação:

- rodar lint ou teste focado disponível no projeto;
- verificar em navegador a rota `/oportunidades`;
- clicar no card "Processos / Como participar" e confirmar navegação para `/oportunidades/como-participar`;
- verificar a nova rota em desktop e mobile;
- confirmar que a nova página não possui CTA principal adicional;
- confirmar que os termos "filosofia" e "frente" não aparecem no conteúdo visível da nova página;
- confirmar que `SYNC` renderiza como `S`, `Y`, `N`, `C`.

## Fora de escopo

- Formulário de inscrição.
- Backend de oportunidades.
- Cadastro, autenticação ou coleta de dados pessoais.
- Alterar o estado "Oportunidades abertas" além do link que inicia este fluxo.
- Criar páginas adicionais para cada etapa.
