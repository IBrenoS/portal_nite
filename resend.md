# Análise do site Resend (resend.com)

## Resumo

Relatório da inspeção técnica do site Resend (resend.com), realizada página a página
usando o sitemap oficial e inspeção do DOM. O objetivo foi identificar como a identidade
visual e as interações são implementadas (formatos de mídia, uso de canvas/WebGL, fallbacks
e padrões por área do site).

Principais achados:

- Presença de Spline (canvas 3D) na home com fallback em MP4.
- Uso extensivo de pequenos loops MP4 para ícones 3D nas páginas de features, sempre com
  imagem de fallback (JPG/PNG).
- Eventos/campanhas utilizam canvases WebGL2 ou vídeos MP4 para ambientação e interatividade.
- Páginas de produto usam canvases 2D procedurais como fundo abstrato.
- Docs/Blog usam MP4s demonstrativos hospedados em CDN; .webm e glTF são raros ou ausentes.

## Metodologia

- Varredura do sitemap oficial (~804 URLs) e inspeção manual do DOM.
- Verificação de elementos `<canvas>`, `<video>`, formatos de mídia e atributos (`autoplay`,
  `loop`, `muted`, `playsInline`, `poster`).
- Análise do bundle/run-time para identificar uso de Spline, Lottie e shaders WebGL2.

## Visão geral dos recursos detectados

- URLs no sitemap: ~804
- Páginas com vídeos MP4: ~117
- Páginas com `<canvas>`: ~10 (procedural 2D e WebGL2)
- Uso de `.glb`/`.gltf`/`.riv`: não observado
- Uso de `.webm`: isolado, não parte da identidade principal
- Lottie: presente para microinterações, não para a identidade central

## Implementações por área do site

### Home

- Componente principal: cena 3D (cubo) renderizada via Spline em um elemento `<canvas>`.
- Fallback: MP4 short loop (`/static/cube.mp4`) com poster (`/static/cube-fallback.jpg`).
- Ícones 3D das features são apresentados como pequenos vídeos MP4 em loop, silenciosos,
  com atributos `autoplay loop muted playsInline` e poster estático (ex.: `3d-*-fallback.jpg`).

### Páginas de Features

- Cada feature (Email API, Webhooks, CLI, Templates, Broadcasts, Audiences, Automations, Inbound)
  incorpora um vídeo MP4 curto que funciona como ícone animado visual.
- Exemplos:
  - Email API: `/static/landing-page/3d-email-api.mp4` + fallback `api-fallback.jpg`.
  - Templates: `/static/landing-page/3d-templates.mp4` + poster `3d-templates-fallback.jpg`.
  - Outros: `3d-cli.mp4`, `3d-webhooks.mp4`, `3d-smtp.mp4`, etc., sempre com poster.
- Padrão: loops MP4 + imagem de fallback para compatibilidade e desempenho.

### Eventos e campanhas (Resend Forward / Launch Weeks)

- Uso de `<canvas>` com shaders WebGL2 personalizados para efeitos interativos
  (mudança de paleta, deformações com o mouse, parâmetros como scale/spacing/spread).
- Páginas de campanha também usam vídeos MP4 de ambientação (ex.: `launch-week-2/object.mp4`).

### Páginas de Produto

- Páginas como `transactional-emails` e `marketing-emails` usam canvases 2D procedurais
  posicionados como fundo (ex.: PatternGridTrail, PatternCircularOrbit).
- Esses canvases são ambientação visual sem interação (pointer-events: none).

### Docs, Blog e Changelog

- Documentação: vídeos MP4 demonstrativos hospedados em CDN (ex.: mintcdn.com), usados para
  demonstrações de funcionalidades (não parte da identidade 3D principal).
- Blog/Changelog: imagens estáticas; eventos especiais podem conter MP4s de ambientação.

## Segmentação da identidade visual

A Resend aplica diferentes técnicas conforme o contexto:

- Core brand / Home: tons escuros e cena 3D premium via Spline (canvas) com fallback MP4.
- Features: ícones 3D em MP4 (loops curtos) com fallback estático.
- Eventos / Campanhas: shaders WebGL2 ou MP4s temáticos para criar imersão e interatividade.
- Produtos: canvases 2D procedurais para fundos abstratos que remetem a sistemas e fluxo.
- Docs/Blog: MP4s demonstrativos e imagens estáticas — prioridade em compatibilidade.

## Conclusão

A análise indica que a Resend equilibra inovação visual com compatibilidade e desempenho.
Spline e WebGL são usados para a identidade de alto impacto (home, eventos), enquanto MP4s
e posters garantem suporte amplo em features e documentação. Formatos 3D como glTF têm uso
muito limitado; Lottie aparece apenas em microinterações.

## Referências

- https://resend.com/
- https://resend.com/features/email-api
- https://resend.com/features/webhooks
- https://resend.com/features/cli
- https://resend.com/features/templates
- https://resend.com/features/broadcasts
- https://resend.com/features/audiences
- https://resend.com/features/automations
- https://resend.com/features/inbound
- https://resend.com/forward
- https://resend.com/launch-weeks/2
- https://resend.com/products/transactional-emails
- https://resend.com/products/marketing-emails
- https://resend.com/docs/dashboard/broadcasts/introduction


