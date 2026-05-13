# Design - Accessibility, SEO & Performance Baseline

## Direcao operacional

Esta baseline deve ser usada como guia de validacao antes de implementar ou liberar qualquer rota do MVP. Ela nao substitui auditoria real; organiza o que precisa ser verificado em implementacao.

## Estrutura semantica

- Cada pagina deve ter um H1 unico e representativo.
- Headings devem seguir ordem logica.
- Conteudo principal deve ficar em landmark apropriado.
- Header, navegacao, main e footer devem ser semanticamente distinguiveis.
- Secoes longas devem ter headings claros.
- Conteudo textual relevante deve ser indexavel e nao depender apenas de imagens, canvas ou animacao.

## Foco e teclado

- Header, mega menu, accordion mobile, CTAs, cards clicaveis, filtros, formularios e links devem funcionar por teclado.
- Foco visivel deve ser claro e consistente.
- Foco nao deve ficar oculto atras de overlays, menus ou elementos fixos.
- Ordem de tabulacao deve seguir a leitura esperada.
- Estados aberto/fechado de menus e accordions devem ser claros na implementacao.
- Usuario deve conseguir sair de menus, overlays e formularios sem perder contexto.

## Contraste e tokens

- Contraste e baseline universal de legibilidade.
- WCAG 2.2 e WCAG AA devem orientar revisao visual.
- Referencia minima: 4.5:1 para texto normal e 3:1 para texto grande.
- Tokens aprovados na Spec 003 devem ser validados em uso real.
- Textos, links, botoes, badges, estados e mensagens devem ser testados em seus fundos reais.
- Cor nao deve ser o unico meio de comunicar status, erro, sucesso, filtro ativo ou link ativo.

## Imagens, icones e SVGs

- Imagens informativas precisam de texto alternativo adequado.
- Imagens decorativas devem ser tratadas como decorativas.
- Fotos reais exigem autorizacao e contexto.
- Icones funcionais precisam de nome acessivel ou label equivalente.
- SVGs devem ser revisados para peso, complexidade e semantica.
- Imagens devem possuir dimensoes ou reserva de layout para reduzir layout shift.
- Galeria e midias futuras devem herdar a mesma baseline.

## Formularios

- Campos devem possuir labels claros.
- Campos obrigatorios devem ser identificados.
- Ajuda, erro e sucesso devem ser legiveis e associados ao contexto certo.
- Validacao deve explicar como corrigir.
- Loading nao deve apagar dados do usuario nem esconder contexto.
- Sucesso deve informar o que aconteceu sem prometer resposta automatica quando ela nao existir.
- Consentimento deve explicar finalidade dos dados.

## Estados de interface

- Estado vazio deve explicar ausencia de conteudo e proximo passo.
- Estado sem resultado deve orientar ajuste de filtro ou busca.
- Estado de erro deve explicar problema e recuperacao.
- Estado loading deve indicar processamento sem bloquear compreensao da pagina.
- Estado sucesso deve confirmar o resultado real entregue.
- Estados devem ser compreensiveis sem depender apenas de cor, icone ou movimento.

## Motion e reduced motion

- Movimento deve ser curto, discreto e nao essencial.
- Animacoes nao devem bloquear leitura, navegacao ou interacao.
- `prefers-reduced-motion` deve reduzir ou desativar animacoes nao essenciais.
- Conteudo principal deve estar disponivel sem animacao.
- Foco por teclado deve permanecer visivel com ou sem motion.
- Timeline, hero, menus e microinteracoes devem preservar contexto quando motion for reduzido.

## SEO institucional

- Cada rota MVP deve prever title e description especificos.
- H1 deve refletir o tema principal da pagina.
- Headings devem organizar o conteudo.
- Conteudo textual deve ser compreensivel e indexavel.
- Open Graph deve ser planejado para compartilhamento social.
- Sitemap deve ser implementado futuramente quando rotas reais estiverem definidas.
- `robots.txt` deve ser implementado futuramente se aplicavel.
- Canonical deve ser usado quando houver risco de duplicidade.
- Slugs devem ser claros, estaveis e coerentes com a rota.

## Metadados por rota MVP

| Rota | Metadados planejados |
|---|---|
| `/` | Title e description do Portal NITE, imagem OG institucional quando disponivel |
| `/#sobre` | Ancora com heading claro dentro da home |
| `/projetos` | Title e description para portfolio de projetos |
| `/projetos/[slug]` | Title e description derivados de nome e resumo do projeto |
| `/oportunidades` | Title e description para oportunidades, com estado sem oportunidades indexavel |
| `/atualizacoes` | Title e description para registros, novidades e bastidores |
| `/contato` | Title e description para contato institucional |

Metadados planejados nao sao arquivos tecnicos implementados nesta milestone.

## Open Graph, sitemap e robots

- Open Graph deve prever titulo, descricao e imagem adequada quando disponivel.
- Imagem OG nao deve usar foto real sem autorizacao.
- Sitemap deve refletir apenas rotas reais quando implementado.
- Rotas futuras nao devem entrar como paginas reais antes da implementacao.
- `robots.txt` deve ser definido quando houver necessidade tecnica ou politica de indexacao.

## Performance

- Core Web Vitals sao referencia de qualidade: LCP, INP e CLS.
- LCP deve orientar revisao do conteudo principal carregado.
- INP deve orientar revisao de menus, filtros, formularios e CTAs.
- CLS deve orientar reserva de espaco para imagens, cards, menus e conteudo dinamico.
- Imagens devem ser otimizadas e dimensionadas.
- SVGs devem ser simples o suficiente para o uso real.
- Fontes devem ter fallback e custo revisado.
- JavaScript nao essencial deve ser reduzido.
- Lazy loading deve ser usado quando aplicavel.
- Animacoes devem ser revisadas em dispositivo comum e mobile real.

Nenhuma pontuacao Lighthouse, medicao de Core Web Vitals ou dado de trafego deve ser registrado sem auditoria real.

## Responsividade

- Mobile pequeno deve ser validado como experiencia principal, nao adaptacao secundaria.
- Tablets devem manter cards, filtros e formularios organizados.
- Desktop deve preservar largura de leitura e hierarquia.
- Navegacao touch deve ter areas de toque confortaveis.
- Menus e accordions devem abrir sem cobrir conteudo de forma incoerente.
- Cards devem manter estrutura e metadados legiveis.
- Formularios devem empilhar campos sem perda de labels, mensagens ou CTAs.
- Timeline deve permanecer compreensivel em layout vertical.

## Checklist de validacao

- [ ] Navegacao por teclado funciona em rotas MVP.
- [ ] Foco visivel aparece em todos os elementos interativos.
- [ ] Contraste dos tokens aplicados foi validado em uso real.
- [ ] Headings e landmarks foram revisados.
- [ ] Imagens informativas possuem alt adequado.
- [ ] Icones/SVGs funcionais possuem nome acessivel ou label.
- [ ] Formularios possuem labels, mensagens claras e estados compreensiveis.
- [ ] Estados vazio, erro, loading e sucesso indicam proximo passo.
- [ ] Reduced motion reduz ou desativa animacoes nao essenciais.
- [ ] Titles e descriptions existem por rota MVP.
- [ ] Open Graph foi implementado e revisado quando disponivel.
- [ ] Sitemap reflete apenas rotas reais quando implementado.
- [ ] `robots.txt` foi definido quando aplicavel.
- [ ] Layout mobile real foi validado.
- [ ] Imagens, SVGs, fontes e animacoes tiveram custo revisado.
- [ ] Auditoria manual pre-release foi executada.
