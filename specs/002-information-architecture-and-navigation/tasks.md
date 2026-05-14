# Tasks - Information Architecture & Navigation

- [x] Iniciar oficialmente a Milestone 2 - Information Architecture & Navigation. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Consolidar a Spec 002 como base oficial de arquitetura e navegacao. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Criar sitemap oficial do Portal NITE. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir rotas do MVP premium. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Definir rotas futuras. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Definir itens principais do header. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir agrupamentos do mega menu. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir comportamento mobile em accordion. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir CTA principal do header. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Definir CTAs oficiais da home, oportunidades e professores/gestores. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Definir estados de menu aberto, fechado, hover, focus e active. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir comportamento de fechamento com Escape. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir comportamento de clique fora do menu. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Definir comportamento sem JavaScript quando possivel. Evidencia: Revisao documental registrada em 2026-05-13.
- [x] Validar label final de Atualizacoes e rota `/atualizacoes`. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Validar textos finais dos CTAs. Evidencia: Decisao aprovada pelo gestor do projeto em conversa de especificacao.
- [x] Validar quais rotas futuras podem aparecer publicamente sem parecer prontas. Evidencia: Revisao documental registrada em 2026-05-13.

## Implementacao controlada

- [x] Implementar Header shell final do MVP. Evidencia: `components/layout/site-header.tsx` consolidado com logo, links principais, CTA `Falar com o NITE`, estrutura de mega menu desktop e mobile accordion baseada em `biblioteca/navigation.ts`.
- [x] Centralizar configuracao de navegacao do Header. Evidencia: `biblioteca/navigation.ts` registra grupos aprovados da Spec 002, CTA principal, rotas MVP e rotas futuras sem renderizar futuras como funcionalidades prontas.
- [x] Completar comportamento avancado do mega menu desktop. Evidencia: `components/layout/site-header.tsx` implementa abertura por hover/foco/clique, troca entre grupos, fechamento por Escape e clique fora, `aria-expanded`/`aria-controls`, motion controlado e links reais limitados a rotas MVP aprovadas.
- [x] Completar comportamento avancado do menu mobile em camadas. Evidencia: `components/layout/site-header.tsx` implementa camada principal, camada interna por grupo, botao voltar, botao fechar, CTA principal, fechamento por Escape e clique fora, foco visivel e motion reduzido quando aplicavel.
