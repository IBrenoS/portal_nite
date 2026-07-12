# Paridade do spotlight do ícone com a Resend

## Objetivo

Eliminar a quina retangular visível quando o spotlight alcança as bordas do
ícone no hero de “Como participar”, preservando integralmente o PNG, a placa,
o movimento 3D e o comportamento de ponteiro existente.

## Evidência e causa raiz

A implementação atual da Resend em `https://resend.com/about` foi inspecionada
e testada interativamente nos quatro cantos do ícone.

Tanto a Resend quanto o NITE usam:

- um frame de aproximadamente `250 × 255px` com `overflow: hidden`;
- um spotlight móvel com `mix-blend-mode: soft-light`;
- um `radial-gradient` de raio `100px`;
- o mesmo mapeamento de posição global do ponteiro;
- rotação do plano em 3D.

A diferença relevante está no tamanho da camada móvel do spotlight:

- Resend: `250 × 250px`;
- NITE: `200 × 200px`.

No NITE, o diâmetro do gradiente e a camada têm os mesmos `200px`. O gradiente
chega à borda física da camada, e o recorte do frame torna essa borda visível
em determinadas posições. Na Resend, os `250px` deixam `25px` transparentes
entre o fim do gradiente e cada borda da camada. O frame continua existindo,
mas recorta pixels que já estão totalmente transparentes.

## Solução aprovada

Alterar somente a largura e a altura inline da camada
`data-component="premium-icon-light"` de `200px` para `250px`.

Devem permanecer inalterados:

- `public/images/oportunidades/n-icon.png`;
- a placa e o conteúdo visual do PNG;
- o frame e seu `overflow-hidden`;
- o raio de `100px` do gradiente;
- `mix-blend-mode: soft-light`;
- `top: -100px` e `left: -100px`;
- o cálculo de `--pointer-x` e `--pointer-y`;
- a rotação 3D e a escala da imagem;
- a ordem visual e a composição atual do hero.

Não serão adicionados máscara, `clip-path`, novo asset ou reconstrução da
imagem.

## Verificação

1. Adicionar uma asserção de regressão ao teste unitário existente para exigir
   uma camada de spotlight com `250px` de largura e altura, mantendo o gradiente
   de `100px` e o modo de mistura `soft-light`.
2. Executar o teste direcionado da página.
3. Executar typecheck e lint proporcionais ao componente alterado.
4. Verificar visualmente o hero em desktop, movimentando o ponteiro para os
   quatro cantos da placa e confirmando que nenhuma linha ou quina retangular
   aparece.
5. Confirmar que o PNG, a placa, a escala e o movimento 3D não sofreram
   alterações.

## Critério de aceite

O spotlight deve alcançar os quatro cantos da placa e dissipar-se de forma
contínua, sem revelar qualquer limite retangular, mantendo o mesmo princípio de
implementação e o mesmo resultado visual observado na Resend.
