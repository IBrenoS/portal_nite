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
- [x] Registrar que ADR-004 permanece Proposto. Evidencia: ADRs mantidas como contexto, sem aprovacao automatica.

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
- [ ] Validar header, mega menu e accordion mobile por teclado.
- [ ] Validar cards de projeto, atualizacao e oportunidade por teclado.
- [ ] Validar filtros por teclado e estado ativo acessivel.
- [ ] Validar timeline sem dependencia de animacao.

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
- [ ] Revisar impacto de animacoes.
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
- [ ] Validar timeline.
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
