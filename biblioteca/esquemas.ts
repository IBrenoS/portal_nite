import { z } from "zod";

const slugSchema = z
  .string()
  .min(3)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use slugs em minusculas, com hifens e sem acentos.")
  .describe("Identificador legivel usado na URL publica do conteudo.");

const imageSchema = z.object({
  src: z.string().min(1).describe("Caminho publico da imagem, a partir de /public."),
  alt: z.string().min(12).describe("Texto alternativo significativo para leitores de tela."),
});

const seoSchema = z.object({
  title: z.string().min(20).max(60).describe("Titulo SEO curto, sem incluir o nome da marca."),
  description: z.string().min(80).max(160).describe("Meta description unica e clicavel para a pagina."),
});

export const projectStatusValues = ["placeholder", "planejado", "em-andamento", "ativo", "concluido"] as const;
export const timelineSourceStatusValues = ["placeholder", "confirmado"] as const;

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().min(3).describe("Titulo publico do projeto."),
  summary: z.string().min(24).describe("Resumo curto para cards e previews."),
  description: z.string().min(48).describe("Descricao detalhada para pagina interna."),
  category: z.string().min(3).describe("Categoria ou frente institucional do projeto."),
  year: z.number().int().min(2000).max(2100).describe("Ano principal de referencia do projeto."),
  status: z.enum(projectStatusValues).describe("Estado editorial ou operacional do projeto."),
  coverImage: z.string().min(1).describe("Imagem principal do projeto."),
  alt: z.string().min(12).describe("Texto alternativo da imagem principal."),
  featured: z.boolean().default(true).describe("Controla se o projeto aparece na vitrine da home."),
  contentNotice: z.string().min(24).optional().describe("Nota interna opcional sobre revisão do conteúdo."),
  technologies: z.array(z.string().min(1)).default([]).describe("Tecnologias relacionadas ao projeto."),
  gallery: z.array(imageSchema).default([]).describe("Galeria opcional de imagens do projeto."),
  highlights: z.array(z.string().min(12)).default([]).describe("Pontos de destaque para leitura rapida."),
  objective: z.string().min(24).optional().describe("Objetivo institucional ou pedagogico do projeto."),
  results: z.string().min(24).optional().describe("Resultados, evidencias ou entregas do projeto."),
  team: z.array(z.string().min(2)).default([]).describe("Pessoas ou grupos envolvidos quando houver aprovacao."),
  seo: seoSchema.optional().describe("Pacote de metadata por projeto."),
  links: z
    .array(
      z.object({
        label: z.string().min(2).describe("Rotulo publico do link."),
        href: z.string().url().describe("URL externa relacionada ao projeto."),
      }),
    )
    .default([])
    .describe("Links externos aprovados para publicacao."),
});

export const projectCollectionSchema = z.array(projectSchema).min(1);

export const timelineEventSchema = z.object({
  sequence: z.number().int().min(1).describe("Ordem editorial do marco dentro da timeline."),
  year: z.number().int().min(2000).max(2100).describe("Ano do evento na linha do tempo."),
  month: z.string().min(3).optional().describe("Mes textual, quando confirmado."),
  title: z.string().min(3).describe("Titulo curto do marco institucional."),
  description: z.string().min(24).describe("Descricao do marco institucional."),
  category: z.string().min(3).optional().describe("Categoria editorial do evento."),
  sourceStatus: z
    .enum(timelineSourceStatusValues)
    .default("placeholder")
    .describe("Indica o estado de revisão do marco."),
  contentNotice: z.string().min(24).optional().describe("Nota interna opcional sobre revisão do marco."),
  image: z.string().min(1).optional().describe("Imagem opcional relacionada ao evento."),
  alt: z.string().min(12).optional().describe("Texto alternativo da imagem opcional."),
  projectSlug: slugSchema.optional().describe("Slug de projeto relacionado, quando existir."),
});

export const timelineCollectionSchema = z.array(timelineEventSchema).min(1);

export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = (typeof projectStatusValues)[number];
export type TimelineSourceStatus = (typeof timelineSourceStatusValues)[number];
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
