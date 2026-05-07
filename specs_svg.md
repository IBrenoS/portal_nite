# Specs SVG — NITE Cinematic Electric System

## 1. Objetivo do documento

Este documento substitui a abordagem anterior de animação baseada em **detecção automática de elementos do SVG** por uma execução com **direção artística, contrato técnico e critérios verificáveis**.

A animação do logo NITE deve deixar de parecer apenas um `glow/pulse` genérico e passar a comunicar, de forma evidente:

> Uma carga elétrica nasce na lâmpada, sobe até o cérebro, percorre rotas neurais/circuitos em forma de rajadas, ativa nós de energia e culmina no nome NITE acendendo com brilho metálico premium.

O resultado esperado deve se aproximar da qualidade percebida em landings premium como Resend, Linear, Raycast e Anthropic: visual limpo, intencional, memorável, com movimento elegante e sem excesso visual.

---

## 2. Problema da versão anterior

A versão anterior falhou porque descrevia uma intenção visual, mas não estabelecia um contrato técnico suficientemente rígido.

O agente interpretou o SVG como uma massa de elementos vetoriais e tentou inferir sozinho quais partes eram circuitos animáveis. Isso produziu um resultado bonito, mas incorreto para a intenção original.

### Problemas identificados

* A animação dependia de heurísticas como `getBBox`, área, proporção e posição.
* Nem todos os circuitos eram considerados elegíveis.
* O efeito visual ficou mais próximo de iluminação suave do que de eletricidade real.
* O cérebro parecia “pulsar” ou “brilhar”, mas não recebia rajadas claras de energia.
* O nome NITE não tinha um clímax visual suficientemente evidente.
* A timeline não tinha uma narrativa cinematográfica clara: origem → condução → descarga → ativação → idle.

### Decisão obrigatória

A partir desta versão, **não usar detecção automática como fonte principal da animação**.

A animação deve usar a camada técnica explícita criada no SVG:

```txt
#energy-overlay
```

Essa camada passa a ser a fonte de verdade para a eletricidade.

---

## 3. Princípio visual

A animação deve ser construída como um sistema em camadas:

```txt
SVG base original
├── #nite-logo
│   ├── #bulb
│   ├── #brain
│   └── #text
└── #energy-overlay
    ├── #energy-main-rise
    ├── #energy-routes
    ├── #electric-arcs
    ├── #spark-heads
    └── #text-shimmer-mask
```

### Regra principal

O SVG original continua sendo a arte base. A camada `#energy-overlay` é responsável por criar a ilusão de eletricidade real.

Não tentar transformar todos os paths originais do cérebro em raios. A eletricidade deve ser desenhada e animada por cima do SVG base usando paths dedicados.

---

## 4. Contrato técnico obrigatório do SVG

Antes de implementar qualquer animação, o agente deve validar a existência dos seletores abaixo.

### Seletores obrigatórios

```txt
#logo-final
#nite-logo
#bulb
#brain
#text
#energy-overlay
#text-shimmer-mask
#spark-heads
#electric-arcs
#energy-routes
#energy-main-rise
```

### Seletores de paths/círculos animáveis

```txt
#energy-main-rise path
#energy-routes path
#electric-arcs path
#spark-heads circle
#text-shimmer-mask path
```

### Atributos obrigatórios esperados

Os elementos de energia devem possuir pelo menos parte destes atributos:

```txt
data-overlay-group
data-route
data-arc
data-spark
data-shimmer
vector-effect="non-scaling-stroke"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
```

### Validação inicial obrigatória

Implementar uma função de validação antes da timeline principal:

```ts
function validateNiteSvgContract(root: SVGSVGElement | HTMLElement) {
  const required = [
    '#logo-final',
    '#nite-logo',
    '#bulb',
    '#brain',
    '#text',
    '#energy-overlay',
    '#text-shimmer-mask',
    '#spark-heads',
    '#electric-arcs',
    '#energy-routes',
    '#energy-main-rise',
  ];

  const missing = required.filter((selector) => !root.querySelector(selector));

  const counts = {
    mainRise: root.querySelectorAll('#energy-main-rise path').length,
    routes: root.querySelectorAll('#energy-routes path').length,
    arcs: root.querySelectorAll('#electric-arcs path').length,
    sparks: root.querySelectorAll('#spark-heads circle').length,
    shimmer: root.querySelectorAll('#text-shimmer-mask path').length,
    overlays: root.querySelectorAll('#energy-overlay').length,
  };

  if (missing.length > 0) {
    throw new Error(`[NITE SVG] Missing required selectors: ${missing.join(', ')}`);
  }

  if (counts.overlays !== 1) {
    throw new Error(`[NITE SVG] Expected exactly one #energy-overlay. Found: ${counts.overlays}`);
  }

  if (counts.mainRise < 3) {
    throw new Error('[NITE SVG] Expected at least 3 bulb-to-brain energy paths.');
  }

  if (counts.routes < 8) {
    throw new Error('[NITE SVG] Expected at least 8 brain energy routes.');
  }

  if (counts.arcs < 3) {
    throw new Error('[NITE SVG] Expected at least 3 electric arc paths.');
  }

  if (counts.sparks < 8) {
    throw new Error('[NITE SVG] Expected at least 8 spark nodes.');
  }

  if (counts.shimmer < 2) {
    throw new Error('[NITE SVG] Expected at least 2 NITE shimmer paths.');
  }

  return counts;
}
```

### Regra de confirmação

Ao iniciar em ambiente de desenvolvimento, imprimir uma confirmação curta:

```ts
console.info('[NITE SVG] Cinematic electric contract validated', counts);
```

Não imprimir logs em produção, exceto erros críticos.

---

## 5. Restrição crítica: SVG precisa estar inline no DOM

A animação GSAP só poderá acessar `#energy-overlay`, `#energy-routes`, `#electric-arcs` e demais seletores se o SVG estiver inline no DOM.

### Permitido

* SVG convertido para componente React.
* SVG injetado como markup inline controlado.
* SVG importado via SVGR, se a configuração preservar IDs.

### Não permitido

* `<img src="/brand/nite/logo_final.svg" />`
* `next/image` renderizando SVG como imagem externa.
* `background-image: url(...)`.

Se o SVG estiver sendo renderizado como imagem, o agente deve primeiro mudar a integração para SVG inline antes de tentar animar.

---

## 6. Estado inicial obrigatório

A camada extra deve existir, mas começar invisível. O usuário não pode ver rotas elétricas estáticas antes da animação.

### Estado inicial exigido

```ts
gsap.set('#energy-overlay', { opacity: 0 });
gsap.set('#energy-main-rise path, #energy-routes path, #electric-arcs path', {
  opacity: 0,
  strokeDasharray: 1,
  strokeDashoffset: 1,
});
gsap.set('#spark-heads circle', {
  opacity: 0,
  scale: 0,
  transformOrigin: 'center center',
});
gsap.set('#text-shimmer-mask path', {
  opacity: 0,
  strokeDasharray: 1,
  strokeDashoffset: 1,
});
```

### Regra

Nenhum elemento de `#energy-overlay` deve aparecer parado no primeiro frame.

Critério de rejeição: se a página carregar com linhas elétricas visíveis antes da animação, a implementação está incorreta.

---

## 7. Verificação de coordenadas e clipping

Alguns elementos da camada elétrica podem encostar nas bordas do `viewBox`, incluindo nós próximos ou parcialmente fora do eixo X.

### Verificação obrigatória

Antes de finalizar, o agente deve validar:

* Se algum `circle` em `#spark-heads` possui `cx < 0`, `cy < 0`, `cx > viewBox.width` ou `cy > viewBox.height`.
* Se algum path de `#energy-routes` ou `#electric-arcs` está sendo cortado pelo container.
* Se o CSS do SVG/container usa `overflow: hidden` e está cortando faíscas.

### Regra visual

Se uma faísca for intencionalmente posicionada na borda, ela pode permanecer assim, mas precisa ser visível de forma elegante. Caso seja cortada de maneira acidental, deve ser reposicionada ou o overflow deve ser ajustado.

### CSS recomendado

```css
.nite-logo-svg,
.nite-logo-svg svg {
  overflow: visible;
}
```

Usar `overflow: visible` apenas se não quebrar o layout da seção hero.

---

## 8. Direção artística da animação

A animação deve ter narrativa clara em quatro atos.

```txt
Ato 1 — Dormant State
Ato 2 — Ignition / lâmpada acorda
Ato 3 — Neural Storm / rajadas no cérebro
Ato 4 — NITE Ascension / texto acende
Ato 5 — Premium Idle Loop
```

A transição deve parecer cinematográfica, não mecânica.

---

## 9. Ato 1 — Dormant State

### Objetivo

Estabelecer a marca em estado frio, elegante e premium.

### Visual

* Logo visível, porém calmo.
* Cérebro com brilho muito sutil.
* Lâmpada levemente presente.
* Texto NITE metálico/prateado, sem brilho exagerado.
* Nenhuma rota elétrica visível.

### Regras

* `#energy-overlay`: opacity 0.
* `#brain`: leve opacidade/brilho, sem pulsação forte.
* `#text`: prata legível, sem cintilação inicial.

---

## 10. Ato 2 — Ignition / lâmpada acorda

### Objetivo

Mostrar claramente que a energia nasce na lâmpada.

### Elementos envolvidos

```txt
#bulb
#energy-main-rise path[data-route^="bulb-to-brain"]
#spark-heads circle perto da base
```

### Movimento esperado

1. A lâmpada dá 2 ou 3 flickers curtos.
2. Surge um brilho interno branco/ciano.
3. Uma carga começa a subir da lâmpada para o cérebro.
4. A energia não deve subir como “barra de loading”. Deve parecer descarga irregular.

### Timings sugeridos

```txt
0.00s – estado frio
0.15s – primeiro flicker curto
0.28s – segundo flicker mais forte
0.42s – início da subida principal
0.70s – energia toca a base do cérebro
```

### GSAP sugerido

```ts
const mainRise = q('#energy-main-rise path');
const bulb = q('#bulb');

intro
  .to(bulb, {
    filter: 'drop-shadow(0 0 12px rgba(125,249,255,.45))',
    duration: 0.08,
    repeat: 2,
    yoyo: true,
    ease: 'steps(2)',
  }, 0.12)
  .to('#energy-overlay', {
    opacity: 1,
    duration: 0.08,
  }, 0.30)
  .fromTo(mainRise,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.45,
      stagger: 0.055,
      ease: 'power3.out',
    },
    0.36
  );
```

---

## 11. Ato 3 — Neural Storm / rajadas no cérebro

### Objetivo

Criar a sensação de raios reais percorrendo os circuitos do cérebro.

### Elementos envolvidos

```txt
#energy-routes path[data-route="primary"]
#energy-routes path[data-route="secondary"]
#energy-routes path[data-route="micro"]
#electric-arcs path[data-arc]
#spark-heads circle[data-spark="node"]
#brain
```

### Regra de movimento

Não acender tudo ao mesmo tempo.

A energia deve se propagar em grupos:

```txt
Grupo 1 — rotas primárias
Grupo 2 — rotas secundárias
Grupo 3 — micro rotas
Grupo 4 — arcos/jumps
Grupo 5 — nós/sparks
```

### Sequência esperada

1. Rotas primárias recebem a primeira descarga.
2. Rotas secundárias respondem com atraso curto.
3. Micro rotas disparam detalhes rápidos.
4. Arcos aparecem como “saltos elétricos” muito breves.
5. Nós piscam e deixam afterglow curto.

### Timing sugerido

```txt
0.70s – rotas primárias começam
0.88s – rotas secundárias entram
1.05s – micro rotas disparam
1.10s – arcos aparecem em rajadas rápidas
1.22s – sparks/nós acendem
1.45s – cérebro atinge pico de energia
1.70s – afterglow começa a decair
```

### Aparência dos raios

O raio deve ser composto por camadas:

```txt
core branco fino
halo ciano maior
afterglow curto
jitter irregular
```

Se houver apenas brilho uniforme, está errado.

### GSAP sugerido

```ts
const routesPrimary = q('#energy-routes path[data-route="primary"]');
const routesSecondary = q('#energy-routes path[data-route="secondary"]');
const routesMicro = q('#energy-routes path[data-route="micro"]');
const arcs = q('#electric-arcs path');
const sparks = q('#spark-heads circle');

intro
  .fromTo(routesPrimary,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.36,
      stagger: { each: 0.045, from: 'start' },
      ease: 'power4.out',
    },
    0.70
  )
  .fromTo(routesSecondary,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 0.85,
      strokeDashoffset: 0,
      duration: 0.32,
      stagger: 0.04,
      ease: 'power3.out',
    },
    0.88
  )
  .fromTo(routesMicro,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 0.75,
      strokeDashoffset: 0,
      duration: 0.22,
      stagger: 0.025,
      ease: 'expo.out',
    },
    1.05
  )
  .fromTo(arcs,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.08,
      stagger: { each: 0.055, from: 'random' },
      ease: 'none',
      yoyo: true,
      repeat: 1,
    },
    1.10
  )
  .fromTo(sparks,
    { opacity: 0, scale: 0.2 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.10,
      stagger: { each: 0.035, from: 'random' },
      ease: 'expo.out',
    },
    1.20
  )
  .to(sparks, {
    opacity: 0.22,
    scale: 0.62,
    duration: 0.55,
    stagger: { each: 0.018, from: 'random' },
    ease: 'power2.out',
  }, 1.42);
```

---

## 12. Ato 4 — NITE Ascension / texto acende

### Objetivo

O nome NITE deve ser o clímax da animação.

A energia no cérebro deve culminar no texto ficando mais vivo, metálico e ascendente.

### Elementos envolvidos

```txt
#text
#text-shimmer-mask path[data-shimmer]
```

### Movimento esperado

* Um shimmer principal atravessa o texto.
* O prata do NITE ganha vida por um instante.
* Bordas recebem glow ciano sutil.
* O brilho decai para um estado premium, sem ficar chamativo demais.

### Timing sugerido

```txt
1.35s – energia atinge pico no cérebro
1.48s – shimmer começa no NITE
1.70s – texto atinge pico metálico
2.05s – decai para estado premium
```

### GSAP sugerido

```ts
const shimmer = q('#text-shimmer-mask path');
const text = q('#text');

intro
  .fromTo(shimmer,
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.52,
      stagger: 0.08,
      ease: 'power3.inOut',
    },
    1.48
  )
  .to(text, {
    filter: 'drop-shadow(0 0 18px rgba(125,249,255,.32)) brightness(1.18)',
    duration: 0.30,
    ease: 'power2.out',
  }, 1.55)
  .to(text, {
    filter: 'drop-shadow(0 0 8px rgba(125,249,255,.14)) brightness(1.04)',
    duration: 0.70,
    ease: 'power2.out',
  }, 1.90)
  .to(shimmer, {
    opacity: 0,
    duration: 0.38,
    ease: 'power2.out',
  }, 2.05);
```

---

## 13. Ato 5 — Premium Idle Loop

### Objetivo

Manter o logo vivo sem parecer loading, banner gamer ou efeito neon excessivo.

### Regras do idle

* O idle deve ser sutil.
* Não repetir a explosão completa o tempo todo.
* Usar micro rajadas ocasionais.
* O cérebro pode respirar levemente.
* O texto NITE pode receber um shimmer raro e discreto.
* A lâmpada pode manter um glow mínimo.

### Timing recomendado

```txt
Loop total: 5s a 8s
Micro descarga: 1 ou 2 por ciclo
Shimmer do texto: no máximo 1 vez a cada 2 ciclos
Sparks simultâneos: no máximo 3
Arcos simultâneos: no máximo 2
```

### GSAP sugerido

```ts
const idle = gsap.timeline({ repeat: -1, paused: true });

idle
  .to('#brain', {
    filter: 'drop-shadow(0 0 8px rgba(125,249,255,.12))',
    duration: 2.2,
    yoyo: true,
    repeat: 1,
    ease: 'sine.inOut',
  }, 0)
  .fromTo('#electric-arcs path',
    { opacity: 0, strokeDashoffset: 1 },
    {
      opacity: 0.85,
      strokeDashoffset: 0,
      duration: 0.07,
      stagger: { each: 0.06, from: 'random' },
      yoyo: true,
      repeat: 1,
      ease: 'none',
    },
    1.6
  )
  .fromTo('#spark-heads circle',
    { opacity: 0, scale: 0.35 },
    {
      opacity: 0.65,
      scale: 0.8,
      duration: 0.10,
      stagger: { amount: 0.20, from: 'random' },
      yoyo: true,
      repeat: 1,
      ease: 'expo.out',
    },
    2.4
  )
  .to({}, { duration: 2.4 });
```

### Critério de qualidade

O idle deve ser percebido como “vivo”, não como “piscando”.

---

## 14. Regras para não animar tudo ao mesmo tempo

A camada `#energy-overlay` é rica e deve ser coreografada.

### Proibição

Não fazer:

```ts
gsap.to('#energy-overlay *', { opacity: 1 });
```

Não fazer:

```ts
gsap.fromTo('path', ...);
```

Não fazer animação global em todos os paths do SVG.

### Permitido

Animar por grupos semânticos:

```ts
#energy-main-rise path
#energy-routes path[data-route="primary"]
#energy-routes path[data-route="secondary"]
#energy-routes path[data-route="micro"]
#electric-arcs path[data-arc="jump"]
#electric-arcs path[data-arc="branch"]
#electric-arcs path[data-arc="micro"]
#spark-heads circle
#text-shimmer-mask path
```

---

## 15. Implementação recomendada no React/Next

### Estrutura esperada

```txt
components/
└── nite/
    ├── NiteLogoCinematic.tsx
    ├── useNiteElectricAnimation.ts
    └── validateNiteSvgContract.ts
```

### Hook recomendado

```ts
export function useNiteElectricAnimation(scopeRef: RefObject<HTMLElement>) {
  useGSAP(() => {
    const root = scopeRef.current;
    if (!root) return;

    const svg = root.querySelector('svg');
    if (!svg) return;

    const counts = validateNiteSvgContract(svg);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      applyReducedMotionState(svg);
      return;
    }

    const q = gsap.utils.selector(svg);

    setupInitialState(q);

    const intro = buildIntroTimeline(q);
    const idle = buildIdleTimeline(q);

    intro.eventCallback('onComplete', () => idle.play());

    return () => {
      intro.kill();
      idle.kill();
    };
  }, { scope: scopeRef });
}
```

---

## 16. Reduced Motion

Se o usuário preferir redução de movimento, não executar raios, flickers ou rajadas.

### Estado recomendado

* Logo estático.
* Lâmpada levemente iluminada.
* Texto NITE um pouco mais vivo.
* Sem loops.
* Sem flicker.

### Implementação sugerida

```ts
function applyReducedMotionState(root: SVGSVGElement | HTMLElement) {
  gsap.set(root.querySelector('#energy-overlay'), { opacity: 0 });
  gsap.set(root.querySelector('#bulb'), {
    filter: 'drop-shadow(0 0 8px rgba(125,249,255,.18))',
  });
  gsap.set(root.querySelector('#text'), {
    filter: 'drop-shadow(0 0 6px rgba(125,249,255,.10)) brightness(1.03)',
  });
}
```

---

## 17. Performance budget

A animação deve ser premium e leve.

### Regras

* Evitar animar centenas de elementos do SVG base.
* Animar principalmente a camada `#energy-overlay`.
* Limitar filtros pesados simultâneos.
* Preferir `opacity`, `strokeDashoffset`, `scale` e `filter` controlado.
* Não usar blur intenso em muitos elementos ao mesmo tempo.
* Não executar idle se o hero estiver fora da viewport.
* Pausar animação quando `document.hidden === true`.

### Limites sugeridos

```txt
Paths elétricos simultâneos no pico: até 12
Sparks simultâneos no pico: até 8
Arcos simultâneos no pico: até 4
Filtros com drop-shadow animados ao mesmo tempo: até 3 grupos
```

---

## 18. Pausa por visibilidade

Implementar pausa com `IntersectionObserver`.

### Regra

* Se o hero/logo sair da viewport, pausar idle.
* Ao voltar, retomar idle suavemente.
* Não reiniciar intro após a primeira execução, exceto se o componente for remontado.

---

## 19. Mobile behavior

O logo animado é um diferencial visual da landing. No mobile, ele não deve ficar escondido ou aparecer tarde demais.

### Regras para mobile

* O SVG deve aparecer completo no primeiro viewport ou muito próximo disso.
* Evitar que CTAs empurrem o logo para fora da área inicial.
* A animação mobile deve ter menos elementos simultâneos, mas manter a narrativa.
* Não remover a eletricidade no mobile; apenas reduzir densidade.

### Reduções recomendadas no mobile

```txt
Rotas primárias: manter todas
Rotas secundárias: usar 2 ou 3
Micro rotas: usar 1 ou 2
Arcos: usar até 2
Sparks simultâneos: até 5
Idle: mais lento e mais sutil
```

### Composição recomendada no mobile

Priorizar o impacto visual:

```txt
Logo / SVG animado
Eyebrow
Headline
Subheadline
CTAs
```

Se o layout atual mantiver headline antes do SVG, garantir que o SVG continue visível sem scroll excessivo.

---

## 20. Critérios de aceite visual

A implementação só deve ser considerada correta se todos os pontos abaixo forem verdadeiros.

### Eletricidade

* É evidente que a energia nasce na lâmpada.
* É evidente que a energia sobe até o cérebro.
* O cérebro recebe rajadas, não apenas glow.
* Há linhas finas de descarga branca/ciano.
* Há arcos ou saltos elétricos breves.
* Há afterglow após a passagem da energia.
* Nem tudo acende ao mesmo tempo.

### Texto NITE

* O nome NITE tem um momento claro de ascensão.
* O prata fica mais vivo no clímax.
* O shimmer é elegante e legível.
* O texto não vira neon exagerado.

### Premium feel

* O movimento parece intencional.
* O loop não parece loading.
* O efeito não parece template genérico.
* A animação reforça a identidade da landing.
* O hero continua limpo e sofisticado.

---

## 21. Critérios de rejeição

Rejeitar a implementação se qualquer item abaixo acontecer.

* O efeito parece apenas brilho suave.
* O cérebro apenas pulsa sem descargas claras.
* A lâmpada não parece a origem da energia.
* O texto NITE não tem clímax perceptível.
* As rotas elétricas aparecem estáticas no carregamento.
* Todos os paths acendem ao mesmo tempo.
* O idle parece piscando, bugado ou agressivo.
* O SVG é renderizado como `<img>` e a animação tenta acessar elementos internos.
* A implementação depende novamente de heurísticas para decidir o que animar.
* O agente anima todos os paths do SVG base indiscriminadamente.
* Elementos importantes da camada elétrica são cortados pelo viewBox/container sem intenção.
* O resultado fica mais “cyberpunk neon” do que “premium tech”.

---

## 22. Checklist técnico obrigatório antes de finalizar

O agente deve confirmar cada item abaixo antes de considerar a tarefa concluída.

```txt
[ ] O SVG está inline no DOM.
[ ] Existe exatamente um #energy-overlay.
[ ] #energy-overlay começa invisível.
[ ] #energy-main-rise contém paths animáveis.
[ ] #energy-routes contém rotas primary, secondary e micro.
[ ] #electric-arcs contém jumps/branches/micro arcs.
[ ] #spark-heads contém nós animáveis.
[ ] #text-shimmer-mask contém paths de shimmer.
[ ] A animação não usa detecção heurística como fonte principal.
[ ] A timeline tem origem na lâmpada.
[ ] A timeline tem rajadas no cérebro.
[ ] A timeline tem clímax no texto NITE.
[ ] O idle é sutil e não parece loading.
[ ] Reduced motion está implementado.
[ ] A animação pausa fora da viewport.
[ ] A animação pausa quando a aba fica oculta.
[ ] Mobile reduz densidade sem remover a narrativa.
[ ] Nenhuma faísca/path relevante é cortado por clipping acidental.
```

---

## 23. Checklist visual obrigatório

O agente deve testar manualmente em desktop e mobile.

### Desktop

```txt
[ ] Primeira impressão parece premium.
[ ] A lâmpada acende antes do cérebro.
[ ] A energia sobe de baixo para cima.
[ ] O cérebro recebe descargas evidentes.
[ ] O texto NITE acende no clímax.
[ ] O loop mantém vida sem exagero.
```

### Mobile

```txt
[ ] O SVG aparece com destaque suficiente.
[ ] A animação não fica minúscula ou escondida.
[ ] A densidade de raios não polui a tela.
[ ] Os CTAs continuam acessíveis.
[ ] Não há queda perceptível de performance.
```

---

## 24. Milestones com tasks e checkboxes

Esta seção existe para transformar a direção artística em execução auditável.

O agente executor deve trabalhar milestone por milestone, marcando mentalmente cada task como concluída antes de avançar. Se uma task bloquear a próxima etapa, ele deve resolver o bloqueio ou reportar explicitamente o motivo.

---

### Milestone 1 — Auditoria inicial do SVG e integração

Objetivo: garantir que o SVG está acessível, inline e com contrato técnico válido antes de qualquer animação.

```txt
[x] Confirmar que o SVG não está sendo renderizado via <img>, next/image ou background-image.
[x] Confirmar que o SVG está inline no DOM e seus IDs são acessíveis por querySelector.
[x] Confirmar a presença de #logo-final.
[x] Confirmar a presença de #nite-logo.
[x] Confirmar a presença de #bulb.
[x] Confirmar a presença de #brain.
[x] Confirmar a presença de #text.
[x] Confirmar a presença de exatamente um #energy-overlay.
[x] Confirmar a presença de #energy-main-rise.
[x] Confirmar a presença de #energy-routes.
[x] Confirmar a presença de #electric-arcs.
[x] Confirmar a presença de #spark-heads.
[x] Confirmar a presença de #text-shimmer-mask.
[x] Implementar validateNiteSvgContract.
[x] Fazer a validação falhar de forma explícita se algum seletor obrigatório não existir.
[x] Não criar fallback heurístico silencioso.
```

Critério de saída:

```txt
[x] O contrato do SVG foi validado em desenvolvimento.
[x] O agente consegue listar counts de rotas, arcos, sparks e shimmer.
[x] Nenhuma animação foi implementada antes da validação do contrato.
```

---

### Milestone 2 — Preparação estrutural da animação

Objetivo: organizar o código para que a timeline seja previsível, testável e fácil de ajustar.

```txt
[x] Criar ou revisar NiteLogoCinematic.tsx.
[x] Criar ou revisar useNiteElectricAnimation.ts.
[x] Criar ou revisar validateNiteSvgContract.ts.
[x] Criar funções separadas para setupInitialState, buildIntroTimeline e buildIdleTimeline.
[x] Usar gsap.utils.selector escopado no SVG ou no container do logo.
[x] Evitar seletores globais fora do escopo do componente.
[x] Garantir cleanup das timelines no unmount.
[x] Garantir que a intro não seja recriada em loop involuntariamente.
```

Critério de saída:

```txt
[x] A animação está encapsulada em hook/componente próprio.
[x] O código não mistura layout da landing com coreografia GSAP.
[x] O cleanup elimina timelines sem vazamento.
```

---

### Milestone 3 — Estado inicial e invisibilidade da camada elétrica

Objetivo: impedir que rotas, arcos, sparks ou shimmer apareçam estáticos antes da animação.

```txt
[x] Definir #energy-overlay com opacity 0 no primeiro frame.
[x] Definir #energy-main-rise path com opacity 0.
[x] Definir #energy-routes path com opacity 0.
[x] Definir #electric-arcs path com opacity 0.
[x] Definir #spark-heads circle com opacity 0 e scale 0.
[x] Definir #text-shimmer-mask path com opacity 0.
[x] Configurar strokeDasharray e strokeDashoffset nos paths animáveis.
[x] Confirmar visualmente que nenhuma linha elétrica aparece parada no carregamento.
```

Critério de saída:

```txt
[x] O primeiro frame é limpo, premium e sem artefatos elétricos estáticos.
[x] A camada elétrica só aparece quando a timeline manda aparecer.
```

---

### Milestone 4 — Ignition da lâmpada

Objetivo: deixar claro que a energia nasce na lâmpada.

```txt
[x] Animar #bulb antes de qualquer descarga no cérebro.
[x] Criar 2 ou 3 flickers curtos e elegantes.
[x] Aplicar glow branco/ciano controlado no bulb.
[x] Evitar flicker agressivo ou com aparência de bug.
[x] Iniciar #energy-main-rise somente depois do primeiro sinal da lâmpada.
[x] Fazer a energia subir da lâmpada para o cérebro.
[x] Evitar aparência de barra de loading vertical.
```

Critério de saída:

```txt
[x] Um usuário consegue perceber que a lâmpada é a fonte da energia.
[x] A subida parece descarga irregular, não preenchimento linear.
```

---

### Milestone 5 — Neural Storm no cérebro

Objetivo: criar rajadas elétricas reais, com propagação e impacto visual.

```txt
[x] Animar primeiro as rotas primary.
[x] Animar depois as rotas secondary.
[x] Animar micro rotas apenas como detalhes rápidos.
[x] Animar electric-arcs como saltos curtos e irregulares.
[x] Animar spark-heads como nós de ativação.
[x] Criar afterglow após a passagem da energia.
[x] Usar stagger com ordem e timing intencionais.
[x] Não acender todas as rotas ao mesmo tempo.
[x] Não animar todos os paths do SVG base.
[x] Não depender de getBBox, área ou heurística para selecionar circuitos principais.
```

Critério de saída:

```txt
[x] O cérebro recebe rajadas evidentes.
[x] O efeito parece eletricidade percorrendo rotas, não apenas brilho difuso.
[x] Há variação entre core, halo, arcs, sparks e afterglow.
```

---

### Milestone 6 — NITE Ascension

Objetivo: transformar o texto NITE no clímax da animação.

```txt
[x] Iniciar o shimmer do texto após o pico do cérebro.
[x] Animar #text-shimmer-mask path com strokeDashoffset.
[x] Aplicar brilho metálico no #text durante o clímax.
[x] Fazer o prata do NITE parecer mais vivo.
[x] Reduzir o brilho após o clímax para um estado premium.
[x] Evitar transformar o texto em neon exagerado.
[x] Garantir que o texto continue legível durante todo o efeito.
```

Critério de saída:

```txt
[x] O nome NITE tem um momento claro de ascensão.
[x] O clímax visual acontece no texto, não apenas no cérebro.
```

---

### Milestone 7 — Premium Idle Loop

Objetivo: manter o logo vivo sem repetir a intro completa e sem parecer loading.

```txt
[x] Criar idle separado da intro.
[x] Iniciar o idle apenas após a conclusão da intro.
[x] Usar micro descargas ocasionais.
[x] Limitar sparks simultâneos no idle.
[x] Limitar arcs simultâneos no idle.
[x] Manter respiração sutil no brain.
[x] Manter glow mínimo no bulb.
[x] Não repetir a tempestade completa a cada ciclo.
[x] Evitar loop com ritmo previsível demais.
[x] Evitar piscadas agressivas.
```

Critério de saída:

```txt
[x] O logo parece vivo.
[x] O idle não parece loading, bug ou efeito chamativo demais.
```

---

### Milestone 8 — Reduced motion, viewport e aba oculta

Objetivo: respeitar acessibilidade e performance.

```txt
[x] Detectar prefers-reduced-motion.
[x] Em reduced motion, não executar flickers, raios, arcs ou loop.
[x] Aplicar estado estático premium em reduced motion.
[x] Implementar IntersectionObserver para pausar idle fora da viewport.
[x] Retomar idle suavemente quando o logo voltar à viewport.
[x] Pausar timelines quando document.hidden for true.
[x] Retomar corretamente quando a aba voltar a ficar visível.
```

Critério de saída:

```txt
[x] A animação respeita reduced motion.
[x] O idle não consome recursos fora da viewport ou com a aba oculta.
```

---

### Milestone 9 — Mobile e responsividade

Objetivo: manter o impacto visual em telas menores sem excesso de densidade.

```txt
[x] Testar a animação em mobile real ou viewport equivalente.
[x] Garantir que o SVG aparece com destaque suficiente no primeiro impacto.
[x] Reduzir densidade de rotas secundárias no mobile.
[x] Reduzir micro rotas no mobile.
[x] Limitar arcs e sparks simultâneos no mobile.
[x] Verificar que CTAs continuam acessíveis.
[x] Verificar que o SVG não fica minúsculo ou escondido.
[x] Verificar que não há queda perceptível de performance.
```

Critério de saída:

```txt
[x] A narrativa lâmpada → cérebro → NITE continua clara no mobile.
[x] A animação mobile é mais leve, mas não perde identidade.
```

---

### Milestone 10 — Validação visual e critérios de rejeição

Objetivo: impedir que a entrega seja aprovada apenas porque “tem animação”.

```txt
[x] Comparar resultado com o objetivo visual deste spec.
[x] Verificar se o efeito ainda parece apenas glow/pulse.
[x] Verificar se a origem da energia está clara.
[x] Verificar se existem raios/arcos perceptíveis.
[x] Verificar se existe afterglow.
[x] Verificar se NITE tem clímax próprio.
[x] Verificar se o idle é premium e discreto.
[x] Verificar se nenhuma rota elétrica aparece estática no primeiro frame.
[x] Verificar se nenhum elemento importante está cortado por clipping.
[x] Verificar se a implementação não voltou a depender de heurísticas.
[x] Rejeitar a entrega se qualquer critério de rejeição da seção 21 acontecer.
```

Critério de saída:

```txt
[x] A implementação pode ser considerada uma assinatura visual premium da landing.
[x] A animação comunica: Ideia → energia → cérebro → inteligência → NITE.
```

---

### Milestone 11 — Confirmação final do agente executor

Objetivo: exigir uma resposta final objetiva de validação.

Ao concluir, o agente executor deve reportar:

```txt
[ ] Arquivos alterados.
[ ] Como o SVG inline foi garantido.
[ ] Resultado da validação do contrato do SVG.
[ ] Como a intro foi dividida em atos.
[ ] Como o idle foi implementado.
[ ] Como reduced motion foi tratado.
[ ] Como viewport/document.hidden foram tratados.
[ ] Como mobile foi ajustado.
[ ] Quais critérios visuais foram validados.
[ ] Quais limitações ou trade-offs permaneceram.
```

Resposta final esperada do executor:

```txt
Implementação concluída somente se:
- o contrato SVG passou;
- a camada elétrica começa invisível;
- a energia nasce na lâmpada;
- há rajadas no cérebro;
- o NITE tem clímax evidente;
- o idle é premium e sutil;
- reduced motion, viewport e mobile foram validados.
```

---

## 25. Resultado esperado

A nova implementação deve transformar o logo NITE em uma peça hero memorável.

A animação deve comunicar:

```txt
Ideia → energia → cérebro → inteligência → NITE
```

A camada `#energy-overlay` deve ser usada como instrumento principal da direção artística.

O resultado final não deve ser apenas “um SVG animado”. Deve parecer uma assinatura visual premium da landing.

---

## 26. Instrução final para o agente executor

Não tente resolver este spec com heurísticas genéricas.

Não tente “melhorar um pouco” a animação antiga.

A tarefa é reconstruir a lógica de animação em torno de um contrato técnico explícito e uma direção artística cinematográfica.

A implementação correta deve seguir esta ordem:

```txt
1. Garantir SVG inline.
2. Validar contrato do SVG.
3. Definir estado inicial invisível da camada elétrica.
4. Construir timeline intro em atos.
5. Construir idle loop premium.
6. Implementar reduced motion.
7. Implementar pausa por viewport/visibilidade.
8. Validar desktop/mobile.
9. Confirmar checklist técnico e visual.
```

Se algum seletor obrigatório não existir, o agente deve parar, reportar o problema e não inventar uma nova heurística silenciosa.

Este spec é a fonte de verdade para a próxima versão da animação NITE.
