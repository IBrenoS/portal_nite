import { z } from "zod";

const slugSchema = z
  .string()
  .min(3)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use slugs em minusculas, com hifens e sem acentos.",
  )
  .describe("Identificador legivel usado na URL publica do conteudo.");

const imageSchema = z.object({
  src: z
    .string()
    .min(1)
    .describe("Caminho publico da imagem, a partir de /public."),
  alt: z
    .string()
    .min(12)
    .describe("Texto alternativo significativo para leitores de tela."),
});

const seoSchema = z.object({
  title: z
    .string()
    .min(20)
    .max(60)
    .describe("Titulo SEO curto, sem incluir o nome da marca."),
  description: z
    .string()
    .min(80)
    .max(160)
    .describe("Meta description unica e clicavel para a pagina."),
});

export const projectStatusValues = [
  "placeholder",
  "planejado",
  "em-descoberta",
  "em-prototipo",
  "ativo",
  "concluido",
] as const;
export const projectContentStateValues = [
  "real",
  "demonstrativo",
  "em-estruturacao",
] as const;
export const projectDeliverableTypeValues = [
  "demo",
  "repositorio",
  "figma",
  "relatorio",
  "dashboard",
  "oficina",
  "documentacao",
] as const;
export const projectDeliverableStatusValues = [
  "disponivel",
  "em-validacao",
  "interno",
  "indisponivel",
] as const;
export const projectTeamRoleValues = [
  "estudante",
  "professor",
  "gestao",
  "parceiro",
  "equipe",
] as const;
export const projectLinkTypeValues = [
  "externo",
  "repositorio",
  "documentacao",
  "demo",
  "figma",
] as const;
export const timelineSourceStatusValues = [
  "placeholder",
  "confirmado",
] as const;
export const personContentStateValues = ["real", "em-estruturacao"] as const;
export const personEntryCategoryValues = [
  "projeto",
  "atualizacao",
  "handbook",
  "pessoal",
] as const;

const personLinkSchema = z.object({
  label: z.string().min(2).describe("Rotulo publico do link da pessoa."),
  href: z.string().url().describe("URL externa autorizada da pessoa."),
});

const personEntrySchema = z.object({
  title: z.string().min(3).describe("Titulo publico do registro relacionado."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .describe("Data ISO do registro."),
  category: z
    .enum(personEntryCategoryValues)
    .describe("Categoria usada nos filtros do perfil."),
  description: z
    .string()
    .min(12)
    .describe("Descricao curta do registro relacionado."),
  href: z.string().url().optional().describe("URL publica do registro."),
  image: imageSchema
    .optional()
    .describe("Imagem autorizada relacionada ao registro."),
});

export const personSchema = z.object({
  slug: slugSchema,
  name: z.string().min(2).describe("Nome publico autorizado da pessoa."),
  listName: z
    .string()
    .min(2)
    .max(32)
    .optional()
    .describe("Nome curto exibido na grade publica de pessoas."),
  role: z.string().min(3).describe("Funcao, papel ou frente principal."),
  location: z
    .string()
    .min(3)
    .optional()
    .describe("Localidade publica autorizada da pessoa."),
  summary: z
    .string()
    .min(5)
    .describe("Resumo autorizado usado no perfil e na busca."),
  public: z.boolean().describe("Controla se a pessoa pode aparecer no portal."),
  authorized: z
    .boolean()
    .describe("Confirma autorizacao de nome, foto e dados publicos."),
  contentState: z
    .enum(personContentStateValues)
    .describe("Estado editorial do perfil publico da pessoa."),
  initials: z
    .string()
    .min(1)
    .max(3)
    .optional()
    .describe("Fallback visual quando nao ha foto autorizada."),
  avatar: imageSchema
    .optional()
    .describe("Foto publica autorizada da pessoa, quando existir."),
  interests: z
    .array(z.string().min(2))
    .default([])
    .describe("Interesses publicos autorizados."),
  clubs: z
    .array(z.string().min(2))
    .default([])
    .describe("Clubes ou afinidades publicas autorizadas."),
  links: z
    .array(personLinkSchema)
    .default([])
    .describe("Links externos autorizados da pessoa."),
  entries: z
    .array(personEntrySchema)
    .default([])
    .describe("Registros publicos relacionados a pessoa."),
  seo: seoSchema.optional().describe("Pacote de metadata por pessoa."),
});

export const peopleCollectionSchema = z.array(personSchema);

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().min(3).describe("Titulo publico do projeto."),
  summary: z.string().min(24).describe("Resumo curto para cards e previews."),
  description: z
    .string()
    .min(48)
    .describe("Descricao detalhada para pagina interna."),
  problem: z
    .string()
    .min(24)
    .describe("Problema, oportunidade ou frente que o projeto investiga."),
  context: z
    .string()
    .min(24)
    .describe("Contexto academico e operacional do projeto."),
  audience: z
    .array(z.string().min(3))
    .default([])
    .describe("Publicos beneficiados ou envolvidos."),
  category: z
    .string()
    .min(3)
    .describe("Categoria ou frente institucional do projeto."),
  year: z
    .number()
    .int()
    .min(2000)
    .max(2100)
    .describe("Ano principal de referencia do projeto."),
  status: z
    .enum(projectStatusValues)
    .describe("Estado editorial ou operacional do projeto."),
  contentState: z
    .enum(projectContentStateValues)
    .describe(
      "Indica se o conteudo e real, demonstrativo ou ainda em estruturacao.",
    ),
  currentPhase: z
    .string()
    .min(3)
    .describe("Fase atual exibida nos cards e na pagina interna."),
  lastUpdated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .describe("Data ISO da ultima atualizacao editorial validada."),
  nextStep: z
    .string()
    .min(12)
    .describe("Proxima acao honesta prevista para a frente ou projeto."),
  coverImage: z.string().min(1).describe("Imagem principal do projeto."),
  coverImagePublic: z
    .boolean()
    .default(false)
    .describe("Autoriza o uso da capa em metadados e compartilhamentos."),
  alt: z.string().min(12).describe("Texto alternativo da imagem principal."),
  illustration: imageSchema
    .optional()
    .describe(
      "Ilustração editorial neutra para frentes ainda sem evidência pública validada.",
    ),
  featured: z
    .boolean()
    .default(true)
    .describe("Controla se o projeto aparece na vitrine da home."),
  contentNotice: z
    .string()
    .min(24)
    .optional()
    .describe("Nota interna opcional sobre revisão do conteúdo."),
  technologies: z
    .array(z.string().min(1))
    .default([])
    .describe("Tecnologias relacionadas ao projeto."),
  deliverables: z
    .array(
      z.object({
        type: z
          .enum(projectDeliverableTypeValues)
          .describe("Tipo do entregavel ou evidencia."),
        label: z.string().min(3).describe("Rotulo publico do entregavel."),
        href: z
          .string()
          .url()
          .optional()
          .describe("URL publica quando o entregavel estiver disponivel."),
        status: z
          .enum(projectDeliverableStatusValues)
          .describe("Estado atual do entregavel."),
      }),
    )
    .default([])
    .describe("Entregaveis reais ou estados honestos de validacao."),
  metrics: z
    .array(
      z.object({
        label: z.string().min(3).describe("Nome publico da metrica."),
        value: z.string().min(1).describe("Valor publicado da metrica."),
        source: z
          .string()
          .min(3)
          .optional()
          .describe("Origem da metrica, quando houver."),
      }),
    )
    .default([])
    .describe(
      "Metricas publicas aprovadas; deve ficar vazio sem evidencia real.",
    ),
  team: z
    .array(
      z.object({
        name: z
          .string()
          .min(2)
          .describe("Nome publico do participante ou grupo."),
        role: z
          .enum(projectTeamRoleValues)
          .describe("Papel do participante no projeto."),
        public: z
          .boolean()
          .describe(
            "Controla se a pessoa ou grupo pode aparecer publicamente.",
          ),
      }),
    )
    .default([])
    .describe("Equipe publica aprovada; deve ficar vazia sem autorizacao."),
  changelog: z
    .array(
      z.object({
        date: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .describe("Data ISO do registro."),
        title: z.string().min(3).describe("Titulo do registro."),
        description: z
          .string()
          .min(12)
          .describe("Descricao curta da evolucao."),
      }),
    )
    .default([])
    .describe("Evolucoes publicas aprovadas para o projeto."),
  gallery: z
    .array(imageSchema)
    .default([])
    .describe("Galeria opcional de imagens do projeto."),
  highlights: z
    .array(z.string().min(12))
    .default([])
    .describe("Pontos de destaque para leitura rapida."),
  objective: z
    .string()
    .min(24)
    .optional()
    .describe("Objetivo institucional ou pedagogico do projeto."),
  results: z
    .string()
    .min(24)
    .optional()
    .describe("Resultados, evidencias ou entregas do projeto."),
  seo: seoSchema.optional().describe("Pacote de metadata por projeto."),
  links: z
    .array(
      z.object({
        label: z.string().min(2).describe("Rotulo publico do link."),
        href: z.string().url().describe("URL externa relacionada ao projeto."),
        type: z.enum(projectLinkTypeValues).describe("Tipo do link aprovado."),
      }),
    )
    .default([])
    .describe("Links externos aprovados para publicacao."),
});

export const projectCollectionSchema = z.array(projectSchema).min(1);

export const timelineEventSchema = z.object({
  sequence: z
    .number()
    .int()
    .min(1)
    .describe("Ordem editorial do marco dentro da timeline."),
  year: z
    .number()
    .int()
    .min(2000)
    .max(2100)
    .describe("Ano do evento na linha do tempo."),
  month: z
    .string()
    .min(3)
    .optional()
    .describe("Mes textual, quando confirmado."),
  title: z.string().min(3).describe("Titulo curto do marco institucional."),
  description: z.string().min(24).describe("Descricao do marco institucional."),
  category: z
    .string()
    .min(3)
    .optional()
    .describe("Categoria editorial do evento."),
  sourceStatus: z
    .enum(timelineSourceStatusValues)
    .default("placeholder")
    .describe("Indica o estado de revisão do marco."),
  contentNotice: z
    .string()
    .min(24)
    .optional()
    .describe("Nota interna opcional sobre revisão do marco."),
  image: z
    .string()
    .min(1)
    .optional()
    .describe("Imagem opcional relacionada ao evento."),
  alt: z
    .string()
    .min(12)
    .optional()
    .describe("Texto alternativo da imagem opcional."),
  projectSlug: slugSchema
    .optional()
    .describe("Slug de projeto relacionado, quando existir."),
});

export const timelineCollectionSchema = z.array(timelineEventSchema).min(1);

export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = (typeof projectStatusValues)[number];
export type ProjectContentState = (typeof projectContentStateValues)[number];
export type ProjectDeliverableStatus =
  (typeof projectDeliverableStatusValues)[number];
export type ProjectDeliverableType =
  (typeof projectDeliverableTypeValues)[number];
export type ProjectLinkType = (typeof projectLinkTypeValues)[number];
export type ProjectTeamRole = (typeof projectTeamRoleValues)[number];
export type TimelineSourceStatus = (typeof timelineSourceStatusValues)[number];
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type PersonContentState = (typeof personContentStateValues)[number];
export type PersonEntryCategory = (typeof personEntryCategoryValues)[number];
export type Person = z.infer<typeof personSchema>;
