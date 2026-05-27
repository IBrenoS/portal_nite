# Tasks - Accessibility, SEO & Performance Baseline

## Documentacao da baseline

- [x] Consolidar baseline transversal de acessibilidade. Evidencia: Requisitos de contraste, teclado, foco, semantica, imagens, formularios, estados e motion registrados na Spec 007.
- [x] Consolidar baseline transversal de SEO. Evidencia: Requisitos por rota MVP, headings, conteudo indexavel, Open Graph, sitemap, robots, canonical e slugs registrados na Spec 007.
- [x] Consolidar baseline transversal de performance. Evidencia: Requisitos de imagens, SVGs, animacoes, fontes, JavaScript, lazy loading, layout shift e Core Web Vitals registrados na Spec 007.
- [x] Consolidar baseline transversal de responsividade. Evidencia: Requisitos para mobile pequeno, tablets, desktop, touch, cards, formularios, menus e timeline registrados na Spec 007.
- [x] Mapear rotas MVP com baseline obrigatoria. Evidencia: `/`, `/#sobre`, `/projetos`, `/projetos/[slug]`, `/oportunidades`, `/atualizacoes` e `/contato` documentadas.
- [x] Mapear rotas futuras sem implementacao. Evidencia: `/sobre`, `/atualizacoes/[slug]`, `/comunidade`, `/eventos`, `/oficinas`, `/galeria`, `/oportunidades/[slug]`, `/candidatura` e `/contato?tipo=desafio` documentadas.
- [x] Registrar WCAG 2.2 e WCAG AA como referencia. Evidencia: Contraste 4.5:1 para texto normal e 3:1 para texto grande documentado.
- [x] Registrar Core Web Vitals como referencia. Evidencia: LCP, INP e CLS documentados sem metricas inventadas.
- [x] Registrar criterio contra metricas inventadas. Evidencia: Pontuacoes Lighthouse, Core Web Vitals, trafego e resultados medidos proibidos sem auditoria real.
- [x] Registrar criterios globais de aceite. Evidencia: Criterios documentados em requirements.md.
- [x] Registrar politica de status das ADRs. Evidencia: O status vigente das ADRs permanece nos arquivos em `docs/adr`; esta spec nao aprova ADR automaticamente.

## Acessibilidade - implementacao futura

- [ ] Validar contraste dos tokens em uso real.
- [ ] Validar navegacao por teclado.
- [ ] Validar foco visivel.
- [ ] Validar suporte a `prefers-reduced-motion`.
- [ ] Validar labels de formulario.
- [ ] Validar mensagens de erro, loading, sucesso e fallback.
- [ ] Validar texto alternativo de imagens informativas.
- [ ] Validar tratamento de imagens decorativas.
- [ ] Validar icones e SVGs funcionais com nome acessivel ou label.
- [ ] Validar que status nao dependem apenas de cor.
- [ ] Validar headings em ordem logica.
- [ ] Validar landmarks semanticos.
- [x] Validar header, MegaMenu desktop e menu mobile em camadas por teclado. Evidencia: menu mobile em camadas validado com contencao de foco `Tab`/`Shift+Tab`, Escape, Fechar, Voltar e Theme Toggle interno; Header/MegaMenu desktop preservados sem alteracao de comportamento.
- [ ] Validar cards de projeto, atualizacao e oportunidade por teclado.
- [ ] Validar filtros por teclado e estado ativo acessivel.
- [x] Validar Living Timeline sem dependencia de animacao. Evidencia: auditoria Browser/Playwright confirmou que, com `prefers-reduced-motion: reduce`, titulo, descricao, asset e CTA permanecem visiveis, a progressao animada e reduzida/removida, e o CTA `/atualizacoes` segue operavel por foco e teclado.

## SEO - implementacao futura

- [ ] Definir title padrao.
- [ ] Definir description padrao.
- [ ] Definir metadados por rota.
- [ ] Definir titles por rota.
- [ ] Definir descriptions por rota.
- [ ] Implementar Open Graph.
- [ ] Definir imagem Open Graph adequada, quando disponivel.
- [ ] Implementar sitemap.
- [ ] Implementar `robots.txt`, se aplicavel.
- [ ] Validar canonical, se aplicavel.
- [ ] Validar slugs e URLs claras.
- [ ] Garantir H1 unico por pagina.
- [ ] Garantir conteudo textual indexavel.
- [ ] Validar SEO de `/`.
- [ ] Validar SEO de `/projetos`.
- [ ] Validar SEO de `/projetos/[slug]`.
- [ ] Validar SEO de `/oportunidades`.
- [ ] Validar SEO de `/atualizacoes`.
- [ ] Validar SEO de `/contato`.
- [ ] Avaliar schema para organizacao, atualizacao ou evento apenas se houver necessidade tecnica futura.

## Performance - implementacao futura

- [ ] Otimizar imagens.
- [ ] Revisar dimensoes e reserva de layout para imagens.
- [ ] Revisar SVGs.
- [ ] Revisar impacto de animacoes, incluindo GSAP `ScrollTrigger` da Living Timeline. Nota: aceite visual atual confirmou ausencia de erro, travamento, scroll horizontal e loop visivel; medicao real de performance e Core Web Vitals segue pendente.
- [ ] Revisar fontes.
- [ ] Reduzir JavaScript nao essencial.
- [ ] Usar lazy loading quando aplicavel.
- [ ] Validar layout shift.
- [ ] Validar carregamento inicial.
- [ ] Validar interacao com filtros.
- [ ] Validar interacao com menus.
- [ ] Validar interacao com formularios.
- [ ] Medir LCP em auditoria real.
- [ ] Medir INP em auditoria real.
- [ ] Medir CLS em auditoria real.
- [ ] Registrar resultados medidos apenas apos auditoria real.

## Responsividade - implementacao futura

- [ ] Validar mobile pequeno.
- [ ] Validar tablets.
- [ ] Validar desktop.
- [ ] Validar navegacao touch.
- [ ] Validar cards.
- [ ] Validar formularios.
- [ ] Validar menus.
- [x] Validar Living Timeline em mobile no estado visual atual. Evidencia: Browser em 390px confirmou layout em uma coluna, textos legiveis, CTA acessivel, sem scroll horizontal, dark/light coerentes e sem console errors relevantes. Custo medido de motion/glow segue pendente em performance.
- [ ] Validar ausencia de corte relevante em rotas MVP.
- [ ] Validar leitura e hierarquia visual em mobile real.

## Estados e release - implementacao futura

- [ ] Validar estados vazios.
- [ ] Validar estados de erro.
- [ ] Validar estados de loading.
- [ ] Validar estados de sucesso.
- [ ] Validar preview social de paginas MVP.
- [ ] Validar que rotas futuras nao aparecem como paginas reais antes da implementacao.
- [ ] Executar auditoria manual antes da release.
- [ ] Executar revisao final de acessibilidade antes da release.
- [ ] Executar revisao final de SEO antes da release.
- [ ] Executar revisao final de performance antes da release.
- [ ] Executar revisao final de responsividade antes da release.
