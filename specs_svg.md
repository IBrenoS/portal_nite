# Specs.md — Transformação GSAP do Hero SVG NITE

## 1. Objetivo

Transformar o bloco visual atual da landing page do NITE em uma experiência hero premium, cinematográfica e tecnológica usando GSAP.

Hoje, a landing possui uma área onde existe um card/div com uma imagem PNG da marca. Essa área deve ser substituída pela versão SVG vetorial do logo final, preservando a composição da página e elevando a percepção visual do hero.

A animação deve transmitir:

- energia;
- eletricidade;
- tecnologia aplicada;
- cérebro/circuito vivo;
- núcleo de inovação;
- conexão entre conhecimento, tecnologia e prática;
- abertura premium, institucional e cinematográfica.

A peça principal será o SVG `logo-final`, com foco na animação do cérebro/circuito, do bocal/bulb e do nome NITE.

---

## 2. Contexto visual da landing

A landing publicada apresenta o NITE como:

> UNIJORGE / Núcleo de Inovação, Tecnologia e Experiência

Headline atual:

> NITE transforma ideias em projetos, aprendizado em prática e tecnologia em impacto.

Texto de apoio atual:

> O NITE é o núcleo que conecta universidade, inovação, prática e desenvolvimento tecnológico em experiências e projetos reais. Explore iniciativas, marcos e frentes de trabalho em uma experiência clara, visual e direta.

A animação GSAP deve reforçar essa narrativa: o NITE como núcleo vivo, energético, tecnológico e conectado.

---

## 3. Local de aplicação

A transformação deve acontecer na área visual principal do hero, no local onde atualmente existe:

- uma `div`/card visual;
- a imagem PNG embutida;
- a representação estática do logo.

A implementação deve substituir esse bloco por um componente animado com SVG inline ou SVG importado de forma controlável pelo DOM.

### Resultado esperado

- O hero deve manter a estrutura geral da landing.
- O SVG deve ocupar o lugar da imagem atual.
- O novo bloco deve parecer integrado ao design existente.
- A animação deve ser visível logo na abertura da página.
- A animação deve continuar com um loop sutil depois da sequência inicial.

---

## 4. Arquivo SVG base

Arquivo visual principal:

```txt
logo_final.svg
```

Arquivo de origem vetorial:

```txt
logo_final.ai
```

IDs/grupos conhecidos no SVG exportado:

```txt
logo-final
└── nite-logo
    ├── brain
    ├── text
    │   ├── text-parte-1
    │   ├── text-parte-2
    │   ├── text-parte-3
    │   └── text-parte-4
    └── bulb
```

IDs principais detectados:

```txt
#logo-final
#nite-logo
#brain
#text
#text-parte-1
#text-parte-2
#text-parte-3
#text-parte-4
#bulb
```

Observação de implementação:

O grupo `brain` contém múltiplos elementos vetoriais internos, incluindo paths, polygons, line, polyline e rect. A animação deve trabalhar com esses elementos internos como partes do circuito cerebral.

Seletores úteis:

```js
const root = container.current.querySelector("#logo-final");
const logo = container.current.querySelector("#nite-logo");
const brain = container.current.querySelector("#brain");
const bulb = container.current.querySelector("#bulb");
const text = container.current.querySelector("#text");

const letters = gsap.utils.toArray("#text > g");
const brainPaths = gsap.utils.toArray("#brain path");
const brainPolygons = gsap.utils.toArray("#brain polygon");
const brainLines = gsap.utils.toArray("#brain line, #brain polyline");
const brainNodes = gsap.utils.toArray("#brain circle, #brain ellipse, #brain rect, #brain polygon");
```

---

## 5. Direção criativa

A animação deve se comportar como uma sequência de ativação tecnológica.

### Conceito

O `bulb` funciona como origem/conector da energia. Ele energiza a composição, envia pulsos para o cérebro, ativa os caminhos internos de circuito e faz o nome NITE reagir ao fluxo elétrico.

### Narrativa visual

1. A tela carrega.
2. O logo aparece de forma premium.
3. O bulb/bocal desperta como fonte de energia.
4. Uma carga elétrica sobe para o cérebro.
5. Circuitos internos acendem em sequência.
6. Pontos e nós do cérebro pulsam.
7. Descargas internas em forma de raio aparecem brevemente.
8. O cérebro atinge um pico luminoso.
9. O nome NITE recebe reflexo/brilho controlado.
10. A animação entra em modo idle loop, com energia viva e sutil.

---

## 6. Tom da animação

A animação deve parecer:

- premium;
- tecnológica;
- elegante;
- cinematográfica;
- precisa;
- institucional;
- futurista;
- sem exagero visual;
- sem aparência de banner piscante;
- sem poluição de efeitos.

### Referência de sensação

A composição deve lembrar uma ativação de sistema neural/cibernético, como se o núcleo estivesse sendo energizado por uma corrente inteligente.

---

## 7. Regras visuais

- Usar azul/ciano como cor primária da energia.
- Preservar a identidade metálica/tecnológica do logo.
- Criar contrastes de brilho com moderação.
- Evitar flicker excessivo.
- Evitar loop muito rápido.
- Priorizar ritmo e intenção.
- O visual deve continuar legível.
- A tipografia NITE não deve perder leitura.
- O cérebro deve ser o centro da atenção visual.
- O bulb deve parecer a origem/conector da energia.

---

## 8. Estratégia técnica

### Biblioteca principal

Usar GSAP como motor principal da animação.

Dependências sugeridas:

```bash
npm install gsap @gsap/react
```

Uso em React/Next:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
```

### Abordagem

A animação deve ser implementada como componente isolado, preferencialmente:

```txt
components/NiteHeroLogo.tsx
```

ou:

```txt
components/AnimatedNiteLogo.tsx
```

O componente deve:

- receber o SVG inline ou importar o SVG de forma que seus IDs sejam acessíveis;
- usar `useRef`;
- usar `useGSAP`;
- escopar seletores dentro do container;
- criar uma timeline principal;
- criar uma timeline idle separada;
- respeitar `prefers-reduced-motion`;
- fazer cleanup corretamente pelo `useGSAP`.

---

## 9. Estrutura recomendada do componente

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AnimatedNiteLogo() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("#nite-logo", { opacity: 1, scale: 1 });
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const logo = "#nite-logo";
        const brain = "#brain";
        const bulb = "#bulb";
        const letters = gsap.utils.toArray("#text > g");
        const brainPaths = gsap.utils.toArray("#brain path");
        const brainNodes = gsap.utils.toArray("#brain circle, #brain ellipse, #brain rect, #brain polygon");
        const brainLines = gsap.utils.toArray("#brain line, #brain polyline");

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out"
          }
        });

        // timeline principal aqui

        const idle = gsap.timeline({
          repeat: -1,
          defaults: {
            ease: "sine.inOut"
          }
        });

        // loop idle aqui

        return () => {
          tl.kill();
          idle.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative">
      {/* SVG inline aqui */}
    </div>
  );
}
```

---

## 10. Timeline principal

### Duração alvo

A abertura cinematográfica deve durar aproximadamente:

```txt
3.2s a 4.5s
```

Depois disso, o logo entra em loop idle.

---

## 11. Sequência cinematográfica

### Fase 1 — Presença inicial

Tempo aproximado:

```txt
0.0s → 0.8s
```

Objetivo:

- introduzir o logo com peso visual;
- evitar entrada simples demais;
- criar sensação de sistema iniciando.

Animações:

- fade in geral;
- leve scale de 0.94 → 1;
- leve `y` de 24 → 0;
- blur/brightness inicial se aplicável;
- opacidade do cérebro menor no início.

Exemplo:

```js
tl.fromTo(
  "#nite-logo",
  {
    opacity: 0,
    scale: 0.94,
    y: 28,
    transformOrigin: "50% 50%"
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.1,
    ease: "power4.out"
  },
  0
);
```

---

### Fase 2 — Despertar do bulb

Tempo aproximado:

```txt
0.35s → 1.4s
```

Objetivo:

- mostrar o bulb/bocal como fonte de energia;
- criar o primeiro pulso da composição;
- preparar o envio de eletricidade para o cérebro.

Animações:

- brilho no bulb;
- aumento de luminosidade;
- pulso curto;
- vibração sutil;
- possível ring/glow externo via CSS filter ou pseudo-layer.

Exemplo:

```js
tl.fromTo(
  "#bulb",
  {
    opacity: 0.65,
    scale: 0.985,
    filter: "brightness(0.75)"
  },
  {
    opacity: 1,
    scale: 1.02,
    filter: "brightness(1.6) drop-shadow(0 0 18px rgba(0, 200, 255, 0.7))",
    duration: 0.7,
    ease: "power2.out"
  },
  0.35
);

tl.to(
  "#bulb",
  {
    scale: 1,
    filter: "brightness(1.15) drop-shadow(0 0 10px rgba(0, 200, 255, 0.45))",
    duration: 0.45,
    ease: "sine.out"
  },
  1.05
);
```

---

### Fase 3 — Energia sobe para o cérebro

Tempo aproximado:

```txt
0.8s → 2.2s
```

Objetivo:

- criar a sensação de corrente elétrica ascendente;
- acender partes internas do cérebro;
- simular caminhos de circuito sendo percorridos.

Estratégia:

- aplicar animações em elementos internos do `#brain`;
- usar stagger com direção ascendente sempre que possível;
- ordenar elementos por posição vertical usando `getBBox().y`;
- animar opacidade, brilho, escala e filtros;
- quando elementos forem stroke, usar `strokeDasharray` e `strokeDashoffset`;
- quando elementos forem fill, animar brightness, opacity, fill e shadow.

Ordenação sugerida:

```js
const orderedBrainParts = gsap.utils
  .toArray("#brain path, #brain polygon, #brain line, #brain polyline, #brain rect")
  .sort((a, b) => {
    const boxA = a.getBBox();
    const boxB = b.getBBox();
    return boxB.y - boxA.y; // de baixo para cima
  });
```

Animação sugerida:

```js
tl.fromTo(
  orderedBrainParts,
  {
    opacity: 0.35,
    filter: "brightness(0.65)"
  },
  {
    opacity: 1,
    filter: "brightness(1.35) drop-shadow(0 0 8px rgba(0, 200, 255, 0.35))",
    duration: 0.9,
    stagger: {
      each: 0.012,
      from: "start"
    },
    ease: "power2.out"
  },
  0.8
);
```

---

### Fase 4 — Circuitos e pontos energizados

Tempo aproximado:

```txt
1.3s → 2.8s
```

Objetivo:

- simular eletricidade percorrendo trilhas;
- fazer os pontinhos/nós acenderem;
- criar sensação de rede neural ativada.

Estratégia:

- detectar elementos pequenos dentro do `#brain`;
- usar `getBBox()` para classificar possíveis nós/pontos;
- animar esses elementos com scale, opacity e glow;
- usar stagger rápido e irregular.

Heurística para detectar pontos/nós:

```js
const brainNodes = gsap.utils.toArray("#brain path, #brain polygon, #brain rect, #brain circle, #brain ellipse")
  .filter((el) => {
    const box = el.getBBox();
    const area = box.width * box.height;
    return area > 2 && area < 900;
  });
```

Animação sugerida:

```js
tl.fromTo(
  brainNodes,
  {
    opacity: 0.35,
    scale: 0.94,
    transformOrigin: "50% 50%",
    filter: "brightness(0.8)"
  },
  {
    opacity: 1,
    scale: 1.08,
    filter: "brightness(1.9) drop-shadow(0 0 10px rgba(0, 220, 255, 0.7))",
    duration: 0.22,
    stagger: {
      each: 0.018,
      from: "random"
    },
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  },
  1.3
);
```

---

### Fase 5 — Descargas internas / raios

Tempo aproximado:

```txt
1.7s → 3.1s
```

Objetivo:

- criar efeitos curtos de raio dentro do cérebro;
- intensificar a sensação de eletricidade;
- gerar um clímax visual sem poluir a composição.

Estratégia:

- selecionar partes internas do brain com aparência de circuito;
- aplicar flashes rápidos;
- criar delays irregulares;
- usar opacidade alta por poucos frames;
- retornar ao estado normal rapidamente.

Exemplo:

```js
const lightningCandidates = gsap.utils.toArray("#brain path, #brain polyline, #brain line")
  .filter((el) => {
    const box = el.getBBox();
    return box.width > 8 || box.height > 8;
  });

tl.to(
  lightningCandidates,
  {
    opacity: 1,
    filter: "brightness(2.4) drop-shadow(0 0 16px rgba(0, 235, 255, 0.95))",
    duration: 0.055,
    stagger: {
      each: 0.018,
      from: "random"
    },
    repeat: 2,
    yoyo: true,
    ease: "steps(1)"
  },
  1.7
);
```

---

### Fase 6 — Pico neural

Tempo aproximado:

```txt
2.4s → 3.3s
```

Objetivo:

- cérebro atinge a ativação completa;
- bulb e cérebro ficam sincronizados;
- transição para a marca textual.

Animações:

- brain com brilho de pico;
- bulb com pulso final;
- leve glow no conjunto;
- estabilização visual.

Exemplo:

```js
tl.to(
  "#brain",
  {
    filter: "brightness(1.55) drop-shadow(0 0 22px rgba(0, 200, 255, 0.45))",
    duration: 0.38,
    ease: "power2.out"
  },
  2.45
);

tl.to(
  "#brain",
  {
    filter: "brightness(1.08) drop-shadow(0 0 8px rgba(0, 200, 255, 0.25))",
    duration: 0.8,
    ease: "sine.out"
  },
  2.85
);
```

---

### Fase 7 — Nome NITE reage ao pulso

Tempo aproximado:

```txt
2.6s → 3.8s
```

Objetivo:

- o nome recebe a energia final;
- reforçar assinatura visual da marca;
- criar leitura premium sem excesso.

Animações:

- letras entram/reagem em sequência;
- shimmer ou brilho metálico;
- leve deslocamento vertical;
- opacidade/brightness;
- stagger por letra.

Mapeamento conhecido:

```txt
#text
├── #text-parte-1
├── #text-parte-2
├── #text-parte-3
└── #text-parte-4
```

Exemplo:

```js
tl.fromTo(
  "#text > g",
  {
    opacity: 0.72,
    y: 10,
    filter: "brightness(0.75)"
  },
  {
    opacity: 1,
    y: 0,
    filter: "brightness(1.35) drop-shadow(0 0 9px rgba(0, 200, 255, 0.28))",
    duration: 0.55,
    stagger: 0.09,
    ease: "power3.out"
  },
  2.65
);

tl.to(
  "#text > g",
  {
    filter: "brightness(1.05)",
    duration: 0.7,
    stagger: 0.04,
    ease: "sine.out"
  },
  3.25
);
```

---

## 12. Loop idle

Depois da abertura, a animação deve continuar viva, mas elegante.

### Regras do idle

- não competir com o conteúdo textual;
- não parecer carregamento;
- não piscar constantemente;
- manter sensação de energia ativa;
- repetir com variação sutil.

### Duração sugerida do loop

```txt
5s a 8s
```

### Elementos do idle

- bulb respirando;
- circuitos com micro-pulsos;
- brain com glow discreto;
- pontos internos acendendo ocasionalmente;
- nome com brilho raro e sutil.

Exemplo:

```js
const idle = gsap.timeline({
  repeat: -1,
  repeatDelay: 0.3,
  defaults: {
    ease: "sine.inOut"
  }
});

idle
  .to("#bulb", {
    filter: "brightness(1.35) drop-shadow(0 0 14px rgba(0, 200, 255, 0.45))",
    duration: 1.4,
    yoyo: true,
    repeat: 1
  })
  .to("#brain", {
    filter: "brightness(1.22) drop-shadow(0 0 13px rgba(0, 200, 255, 0.28))",
    duration: 1.6,
    yoyo: true,
    repeat: 1
  }, "<0.2")
  .to("#text > g", {
    filter: "brightness(1.22) drop-shadow(0 0 6px rgba(0, 200, 255, 0.18))",
    duration: 0.5,
    stagger: 0.06,
    yoyo: true,
    repeat: 1
  }, ">0.6");
```

---

## 13. Técnicas específicas para SVG

### 13.1 Animação por stroke

Quando o elemento interno possuir `stroke`, aplicar:

```js
const strokePaths = gsap.utils.toArray("#brain path, #brain line, #brain polyline")
  .filter((el) => {
    const stroke = window.getComputedStyle(el).stroke;
    return stroke && stroke !== "none";
  });

strokePaths.forEach((path) => {
  const length = path.getTotalLength?.();

  if (!length) return;

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
});
```

Reveal:

```js
tl.to(strokePaths, {
  strokeDashoffset: 0,
  duration: 1.2,
  stagger: 0.025,
  ease: "power2.inOut"
}, 0.9);
```

### 13.2 Animação por fill

Quando o elemento for uma forma preenchida, aplicar:

```js
tl.fromTo(
  fillParts,
  {
    opacity: 0.45,
    filter: "brightness(0.7)"
  },
  {
    opacity: 1,
    filter: "brightness(1.35) drop-shadow(0 0 7px rgba(0, 200, 255, 0.32))",
    duration: 0.65,
    stagger: 0.01
  },
  1
);
```

### 13.3 Ordenação espacial

Para criar energia subindo:

```js
const byVerticalPosition = (items) =>
  items.sort((a, b) => b.getBBox().y - a.getBBox().y);
```

Para energia saindo do bulb, ordenar por distância ao centro do bulb:

```js
const bulbBox = document.querySelector("#bulb").getBBox();
const bulbCenter = {
  x: bulbBox.x + bulbBox.width / 2,
  y: bulbBox.y + bulbBox.height / 2
};

const byDistanceFromBulb = (items) =>
  items.sort((a, b) => {
    const boxA = a.getBBox();
    const boxB = b.getBBox();

    const ax = boxA.x + boxA.width / 2;
    const ay = boxA.y + boxA.height / 2;

    const bx = boxB.x + boxB.width / 2;
    const by = boxB.y + boxB.height / 2;

    const da = Math.hypot(ax - bulbCenter.x, ay - bulbCenter.y);
    const db = Math.hypot(bx - bulbCenter.x, by - bulbCenter.y);

    return da - db;
  });
```

---

## 14. Shimmer no texto

O nome NITE pode receber um shimmer metálico discreto.

Estratégias possíveis:

1. animar brightness por letra;
2. usar overlay/mask;
3. usar gradiente SVG;
4. usar filtro/drop-shadow controlado.

Implementação simples por letra:

```js
const textSweep = gsap.timeline({ repeat: -1, repeatDelay: 6 });

textSweep.to("#text > g", {
  filter: "brightness(1.45) drop-shadow(0 0 8px rgba(0, 200, 255, 0.22))",
  duration: 0.28,
  stagger: 0.08,
  yoyo: true,
  repeat: 1,
  ease: "sine.inOut"
});
```

---

## 15. Background e card visual

A área que contém o SVG deve colaborar com a sensação premium.

Recomendações:

- manter fundo escuro/tecnológico;
- adicionar radial gradient atrás do cérebro;
- usar borda sutil;
- usar glassmorphism leve se combinar com o layout atual;
- evitar card muito opaco;
- permitir que o glow do SVG respire.

Exemplo de wrapper:

```tsx
<div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-slate-950/60 p-6 shadow-2xl">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(0,200,255,0.22),transparent_48%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(0,200,255,0.08))]" />
  <AnimatedNiteLogo />
</div>
```

---

## 16. Responsividade

A animação deve funcionar bem em:

- desktop;
- tablet;
- mobile.

Regras:

- SVG deve usar `width: 100%`;
- preservar `viewBox`;
- evitar dimensões fixas rígidas;
- manter proporção original;
- em mobile, reduzir intensidade de glow;
- em mobile, reduzir quantidade de animação simultânea se necessário.

Exemplo:

```tsx
<div className="mx-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[580px]">
  <AnimatedNiteLogo />
</div>
```

---

## 17. Acessibilidade

Implementar suporte para `prefers-reduced-motion`.

Quando o usuário preferir movimento reduzido:

- não executar timeline cinematográfica;
- renderizar logo em estado final;
- manter apenas brilho estático ou nenhum efeito;
- evitar loops infinitos.

Exemplo:

```js
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  gsap.set("#nite-logo", {
    opacity: 1,
    scale: 1,
    clearProps: "filter"
  });
  return;
}
```

---

## 18. Performance

A animação deve priorizar fluidez.

Regras:

- evitar animar layout;
- preferir `transform`, `opacity` e `filter`;
- usar `will-change` no wrapper com moderação;
- escopar seletores;
- evitar timelines duplicadas;
- limpar timelines ao desmontar;
- não criar loops em excesso;
- testar no mobile;
- reduzir glow se houver queda de performance.

CSS sugerido:

```css
.animated-nite-logo {
  transform-box: fill-box;
  transform-origin: center;
}

.animated-nite-logo svg * {
  vector-effect: non-scaling-stroke;
}
```

---

## 19. Integração no hero

Substituir o bloco visual atual por:

```tsx
<div className="hero-visual">
  <AnimatedNiteLogo />
</div>
```

Garantir que:

- o componente fique no mesmo local da imagem/card atual;
- a altura visual do hero continue equilibrada;
- o texto do hero continue com prioridade de leitura;
- a animação não atrapalhe os CTAs;
- a animação comece quando o componente entrar em tela.

---

## 20. Possível integração com scroll

Opcionalmente, usar ScrollTrigger para:

- iniciar a animação quando o hero estiver visível;
- reduzir intensidade ao sair do viewport;
- pausar idle quando fora da tela;
- reativar quando voltar.

Exemplo conceitual:

```js
ScrollTrigger.create({
  trigger: container.current,
  start: "top 80%",
  onEnter: () => tl.play(),
  onLeave: () => idle.pause(),
  onEnterBack: () => idle.play()
});
```

Se usar ScrollTrigger, instalar/importar:

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
```

---

## 21. Estados esperados

### Estado inicial

- logo invisível ou semi-invisível;
- bulb apagado;
- cérebro com brilho reduzido;
- texto com baixa intensidade.

### Estado durante ativação

- bulb acende primeiro;
- cérebro recebe pulso;
- circuitos internos energizam;
- pontos acendem;
- descargas rápidas aparecem;
- texto reage por último.

### Estado final

- logo totalmente visível;
- cérebro com brilho tecnológico sutil;
- bulb respirando;
- texto legível;
- loop idle discreto.

---

## 22. Critérios de aceite visual

- [ ] O SVG substitui a PNG/card atual no hero.
- [ ] A abertura parece premium e cinematográfica.
- [ ] O bulb comunica claramente a origem da energia.
- [ ] A energia aparenta subir do bulb para o cérebro.
- [ ] O cérebro aparenta conter circuitos vivos/energizados.
- [ ] Existem pulsos ou flashes internos que lembram eletricidade.
- [ ] Pontos/nós internos acendem de forma orgânica.
- [ ] O nome NITE reage ao final da ativação.
- [ ] O loop idle é sutil e elegante.
- [ ] A animação não prejudica leitura da headline.
- [ ] A animação não parece carregamento infinito.
- [ ] A performance continua boa em mobile.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] O código é isolado em componente reutilizável.
- [ ] O cleanup do GSAP está correto.

---

# Milestones

## Milestone 1 — Preparação do SVG e integração base

Objetivo: substituir a imagem atual pelo SVG controlável no DOM.

### Tasks

- [x] Localizar o componente/seção atual do hero.
- [x] Identificar a div/card onde a PNG atual está renderizada.
- [x] Remover a imagem PNG do bloco visual do hero.
- [x] Criar componente `AnimatedNiteLogo`.
- [x] Inserir o SVG `logo-final` inline ou por estratégia que preserve acesso aos IDs.
- [x] Confirmar que os IDs estão presentes no DOM:
  - [x] `#logo-final`
  - [x] `#nite-logo`
  - [x] `#brain`
  - [x] `#text`
  - [x] `#text-parte-1`
  - [x] `#text-parte-2`
  - [x] `#text-parte-3`
  - [x] `#text-parte-4`
  - [x] `#bulb`
- [x] Ajustar wrapper responsivo.
- [x] Preservar proporção do SVG.
- [x] Garantir que o hero continue visualmente equilibrado.

### Definition of Done

- [x] O SVG aparece no local correto.
- [x] A landing continua responsiva.
- [x] Os grupos do SVG podem ser selecionados via JS.
- [x] Nenhuma animação ainda é obrigatória nesta etapa.

---

## Milestone 2 — Setup GSAP em React/Next

Objetivo: preparar o ambiente de animação com GSAP.

### Tasks

- [x] Instalar `gsap`.
- [x] Instalar `@gsap/react`.
- [x] Registrar `useGSAP`.
- [x] Criar `ref` no wrapper.
- [x] Escopar seletores dentro do componente.
- [x] Criar timeline principal.
- [x] Criar timeline idle.
- [x] Implementar cleanup automático.
- [x] Implementar fallback para `prefers-reduced-motion`.

### Definition of Done

- [x] GSAP roda sem erro no client.
- [x] Não há erro de SSR/hydration.
- [x] A timeline é criada apenas uma vez.
- [x] O cleanup funciona ao desmontar o componente.

---

## Milestone 3 — Abertura premium do logo

Objetivo: criar a primeira impressão cinematográfica.

### Tasks

- [x] Animar entrada de `#nite-logo`.
- [x] Aplicar fade in.
- [x] Aplicar scale sutil.
- [x] Aplicar deslocamento vertical sutil.
- [x] Ajustar easing premium.
- [x] Garantir que a entrada não seja lenta demais.
- [x] Garantir que a entrada não seja brusca demais.

### Definition of Done

- [x] A abertura comunica qualidade visual.
- [x] O logo não simplesmente “aparece”.
- [x] O movimento parece intencional e refinado.

---

## Milestone 4 — Ativação do bulb

Objetivo: transformar o bulb/bocal na origem visual da energia.

### Tasks

- [x] Animar `#bulb` antes do cérebro.
- [x] Criar pulso inicial no bulb.
- [x] Aplicar brilho/drop-shadow controlado.
- [x] Aplicar leve scale/vibração.
- [x] Sincronizar bulb com início da energia cerebral.
- [x] Estabilizar bulb após o pulso.

### Definition of Done

- [x] O bulb parece gerar energia.
- [x] O usuário entende visualmente que a energia nasce ali.
- [x] O efeito não fica exagerado.

---

## Milestone 5 — Energia ascendente no cérebro

Objetivo: criar a sensação de eletricidade subindo e ativando o brain.

### Tasks

- [x] Selecionar elementos internos de `#brain`.
- [x] Ordenar elementos por posição vertical com `getBBox()`.
- [x] Criar stagger de baixo para cima.
- [x] Animar opacidade/brightness dos paths.
- [x] Aplicar glow controlado.
- [x] Detectar strokes e aplicar dash animation quando disponível.
- [x] Detectar fills e aplicar animação por brightness/opacidade.
- [x] Ajustar duração para parecer fluxo, não piscada.
- [x] Testar variação de stagger.

### Definition of Done

- [x] A energia aparenta subir do bulb para o cérebro.
- [x] Os circuitos aparentam estar sendo percorridos.
- [x] O cérebro ganha vida visualmente.

---

## Milestone 6 — Pontos, nós e micro-pulsos

Objetivo: energizar os pontinhos e nós do circuito cerebral.

### Tasks

- [x] Criar heurística para detectar elementos pequenos no `#brain`.
- [x] Separar candidatos a pontos/nós por área de `getBBox()`.
- [x] Aplicar scale sutil nos nós.
- [x] Aplicar brightness/glow nos nós.
- [x] Usar stagger irregular.
- [x] Criar pequenos pulsos durante a abertura.
- [x] Criar micro-pulsos ocasionais no idle.
- [x] Ajustar opacidade para não poluir.

### Definition of Done

- [x] Os pontinhos parecem receber carga elétrica.
- [x] A ativação parece orgânica.
- [x] O cérebro parece uma rede neural/circuito vivo.

---

## Milestone 7 — Descargas internas e efeito de raio

Objetivo: criar flashes cinematográficos de eletricidade dentro do cérebro.

### Tasks

- [x] Identificar candidatos a raio entre paths/lines/polylines do `#brain`.
- [x] Aplicar flashes rápidos com duração curta.
- [x] Usar `steps(1)` ou easing seco para descarga.
- [x] Variar timing dos flashes.
- [x] Sincronizar descargas com pico do bulb.
- [x] Garantir que o efeito não prejudique a leitura do logo.
- [x] Reduzir intensidade em mobile se necessário.

### Definition of Done

- [x] Há sensação clara de eletricidade interna.
- [x] Os raios parecem intencionais e cinematográficos.
- [x] O efeito não vira ruído visual.

---

## Milestone 8 — Reação do nome NITE

Objetivo: fazer a tipografia reagir à energia final.

### Tasks

- [x] Selecionar `#text > g`.
- [x] Animar letras separadamente.
- [x] Criar brilho por letra.
- [x] Aplicar shimmer discreto.
- [x] Sincronizar texto após pico do cérebro.
- [x] Retornar texto para estado legível e estável.
- [x] Testar variação de stagger.
- [x] Garantir que o nome permaneça legível.

### Definition of Done

- [x] O nome NITE participa da narrativa.
- [x] As letras reagem ao pulso final.
- [x] O efeito é premium e não chamativo demais.

---

## Milestone 9 — Loop idle

Objetivo: manter o SVG vivo após a abertura.

### Tasks

- [x] Criar timeline idle com `repeat: -1`.
- [x] Adicionar respiração luminosa ao bulb.
- [x] Adicionar glow sutil ao brain.
- [x] Adicionar micro-pulsos em nós internos.
- [x] Adicionar shimmer raro no texto.
- [x] Configurar duração entre 5s e 8s.
- [x] Evitar piscadas repetitivas.
- [x] Pausar ou reduzir idle quando fora de viewport, se aplicável.

### Definition of Done

- [x] O logo continua vivo.
- [x] O loop é elegante.
- [x] O loop não distrai da leitura da página.

---

## Milestone 10 — Polimento visual do card/hero

Objetivo: integrar o SVG animado ao design da landing.

### Tasks

- [x] Ajustar wrapper visual.
- [x] Aplicar radial gradient atrás do cérebro.
- [x] Aplicar borda sutil.
- [x] Ajustar padding.
- [x] Ajustar sombra do card.
- [x] Testar contraste com headline.
- [x] Testar contraste com fundo.
- [x] Garantir que o SVG não fique pequeno demais.
- [x] Garantir que o SVG não domine exageradamente o hero.

### Definition of Done

- [x] O hero parece premium.
- [x] O SVG parece parte nativa do layout.
- [x] O card não parece apenas um container de imagem.

---

## Milestone 11 — Responsividade e acessibilidade

Objetivo: garantir experiência robusta.

### Tasks

- [x] Testar desktop.
- [x] Testar tablet.
- [x] Testar mobile.
- [x] Ajustar escala do SVG por breakpoint.
- [x] Reduzir intensidade de filtros em telas pequenas.
- [x] Implementar `prefers-reduced-motion`.
- [x] Garantir foco e leitura dos CTAs.
- [x] Garantir que animação não cause layout shift.
- [x] Validar contraste visual.

### Definition of Done

- [x] A animação funciona bem em todos os tamanhos.
- [x] Usuários com movimento reduzido recebem versão estática ou simplificada.
- [x] A página continua acessível.

---

## Milestone 12 — Performance e revisão final

Objetivo: entregar uma animação fluida e segura para produção.

### Tasks

- [x] Verificar FPS em desktop.
- [x] Verificar FPS em mobile.
- [x] Reduzir filtros se necessário.
- [x] Confirmar que não há memory leak.
- [x] Confirmar cleanup do GSAP.
- [x] Confirmar ausência de erro no console.
- [x] Confirmar ausência de erro de hydration.
- [x] Testar reload da página.
- [x] Testar navegação entre páginas, se houver.
- [x] Revisar tempo total da abertura.
- [x] Revisar loop idle.
- [x] Fazer ajuste fino de delays/easings.

### Definition of Done

- [x] A animação está estável.
- [x] A performance é aceitável.
- [x] A experiência visual está premium.
- [x] O componente pode ir para produção.

---

# Checklist final de entrega

- [ ] `AnimatedNiteLogo` criado.
- [ ] SVG inserido no hero.
- [ ] PNG antiga removida.
- [ ] IDs principais preservados.
- [ ] Timeline principal implementada.
- [ ] Timeline idle implementada.
- [ ] Bulb energiza primeiro.
- [ ] Brain recebe energia ascendente.
- [ ] Pontos/nós pulsam.
- [ ] Descargas/raios internos aparecem.
- [ ] Texto NITE reage ao final.
- [ ] Loop idle funciona.
- [ ] Hero continua responsivo.
- [ ] `prefers-reduced-motion` implementado.
- [ ] Sem erros no console.
- [ ] Sem problemas de hydration.
- [ ] Performance validada.
- [ ] Resultado visual aprovado como premium/cinematográfico.
