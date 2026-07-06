import { describe, expect, it } from "vitest";

import {
  getIndexablePeople,
  getIndexableProjects,
  getPeople,
  getPersonBySlug,
  getPersonSlugs,
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
  getPublicPeople,
  getTimelineEvents,
} from "@/biblioteca/conteudo";
import {
  peopleCollectionSchema,
  personContentStateValues,
  projectCollectionSchema,
  projectContentStateValues,
  projectStatusValues,
  timelineCollectionSchema,
  type Person,
} from "@/biblioteca/esquemas";

describe("conteudo estruturado", () => {
  it("carrega projetos validados e localizaveis por slug", () => {
    const projects = getProjects();

    expect(projects).toHaveLength(3);
    expect(getProjectSlugs()).toEqual([
      { slug: "software-aplicado" },
      { slug: "robotica-educacional" },
      { slug: "dados-e-ia" },
    ]);
    expect(getProjectBySlug("software-aplicado")?.title).toBe(
      "Software aplicado",
    );
  });

  it("mantem projetos atuais como placeholders operacionais e nao indexaveis", () => {
    const projects = getProjects();

    expect(projectStatusValues).toEqual([
      "placeholder",
      "planejado",
      "em-descoberta",
      "em-prototipo",
      "ativo",
      "concluido",
    ]);
    expect(projectContentStateValues).toEqual([
      "real",
      "demonstrativo",
      "em-estruturacao",
    ]);
    expect(projects.map((project) => project.status)).toEqual([
      "placeholder",
      "placeholder",
      "placeholder",
    ]);
    expect(projects.map((project) => project.contentState)).toEqual([
      "em-estruturacao",
      "em-estruturacao",
      "em-estruturacao",
    ]);
    expect(
      projects.every((project) => project.lastUpdated === "2026-05-11"),
    ).toBe(true);
    expect(
      projects.every(
        (project) => project.currentPhase === "Mapeamento da frente",
      ),
    ).toBe(true);
    expect(projects.map((project) => project.illustration?.src)).toEqual([
      "/images/projetos/ilustracao-software-aplicado.webp",
      "/images/projetos/ilustracao-robotica-educacional.webp",
      "/images/projetos/ilustracao-dados-e-ia.webp",
    ]);
    expect(
      projects.every((project) => {
        const illustration = project.illustration;

        return Boolean(
          illustration &&
            illustration.alt.includes("Ilustração editorial") &&
            illustration.src !== project.coverImage,
        );
      }),
    ).toBe(true);
    expect(projects.every((project) => project.nextStep.length > 12)).toBe(
      true,
    );
    expect(projects.every((project) => project.deliverables.length === 0)).toBe(
      true,
    );
    expect(projects.every((project) => project.metrics.length === 0)).toBe(
      true,
    );
    expect(projects.every((project) => project.team.length === 0)).toBe(true);
    expect(projects.every((project) => project.changelog.length === 0)).toBe(
      true,
    );
    expect(getIndexableProjects()).toEqual([]);
  });

  it("ordena eventos da timeline por ano e sequencia editorial", () => {
    const events = getTimelineEvents();

    expect(events.map((event) => event.sequence)).toEqual([1, 2, 3]);
    expect(events.map((event) => event.year)).toEqual([2026, 2026, 2026]);
    expect(events.map((event) => event.title)).toEqual([
      "Estruturação do NITE",
      "Primeiros projetos aplicados",
      "Vitrine para a comunidade",
    ]);
    expect(events.map((event) => event.sourceStatus)).toEqual([
      "placeholder",
      "placeholder",
      "placeholder",
    ]);
    expect(events.map((event) => event.contentNotice)).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("remove placeholders do conjunto indexavel para sitemap", () => {
    expect(getIndexableProjects()).toEqual([]);
  });

  it("carrega colecao de pessoas autorizadas e indexaveis", () => {
    const expectedPeopleSlugs = [
      "breno-cerqueira",
      "raquel-santana",
      "joao-victor-dorea",
      "aiza-barretto",
      "igor-jeronimo",
      "marcus-vinicius-da-silva-santos",
      "cecilia-brito",
      "caua-oliveira",
      "paulo-henrique-espirito-santo-de-almeida",
      "guilherme-machado-duarte",
      "renan-pires-andrade",
      "vitor-dos-anjos-silva-de-araujo",
      "santhiago-santos",
      "william-silva-lago",
      "caio-guilherme-viterbo",
      "joao-gilberto-de-lima-freitas",
    ];

    expect(personContentStateValues).toEqual(["real", "em-estruturacao"]);
    expect(getPeople().map((person) => person.slug)).toEqual(
      expectedPeopleSlugs,
    );
    expect(getPersonSlugs()).toEqual(
      expectedPeopleSlugs.map((slug) => ({ slug })),
    );
    expect(getPersonBySlug("breno-cerqueira")).toMatchObject({
      public: true,
      authorized: true,
      contentState: "real",
    });
    expect(getPersonBySlug("joao-gilberto-de-lima-freitas")).toMatchObject({
      role: "Ciência da Computação",
      location: "Feira de Santana, Brasil",
    });
    expect(getPersonBySlug("aiza-barretto")?.location).toBeUndefined();
    expect(
      getPersonBySlug("vitor-dos-anjos-silva-de-araujo")?.location,
    ).toBeUndefined();
    expect(getPersonBySlug("ana-silva")).toBeUndefined();
    expect(getPublicPeople().map((person) => person.slug)).toEqual(
      expectedPeopleSlugs,
    );
    expect(getIndexablePeople().map((person) => person.slug)).toEqual(
      expectedPeopleSlugs,
    );
  });

  it("filtra pessoas publicas e indexaveis somente quando ha autorizacao", () => {
    const publicPerson = {
      slug: "ana-silva",
      name: "Ana Silva",
      role: "Coordenadora de inovacao",
      location: "Salvador, BA",
      summary:
        "Perfil autorizado para validar a exibicao publica da pagina de pessoas.",
      public: true,
      authorized: true,
      contentState: "real",
      initials: "AS",
      interests: ["Pesquisa aplicada"],
      clubs: ["Leitura"],
      links: [],
      entries: [],
    } satisfies Person;
    const privatePerson = {
      ...publicPerson,
      slug: "pessoa-interna",
      name: "Pessoa Interna",
      public: false,
    } satisfies Person;
    const unauthorizedPerson = {
      ...publicPerson,
      slug: "pessoa-sem-autorizacao",
      name: "Pessoa Sem Autorizacao",
      authorized: false,
    } satisfies Person;
    const draftPerson = {
      ...publicPerson,
      slug: "pessoa-em-estruturacao",
      name: "Pessoa Em Estruturacao",
      contentState: "em-estruturacao",
    } satisfies Person;
    const people = [
      publicPerson,
      privatePerson,
      unauthorizedPerson,
      draftPerson,
    ];

    expect(getPublicPeople(people)).toEqual([publicPerson, draftPerson]);
    expect(getIndexablePeople(people)).toEqual([publicPerson]);
  });

  it("falha explicitamente quando projeto nao cumpre schema", () => {
    expect(() =>
      projectCollectionSchema.parse([{ slug: "Slug Invalido" }]),
    ).toThrow();
  });

  it("falha explicitamente quando pessoa nao cumpre schema", () => {
    expect(() =>
      peopleCollectionSchema.parse([{ slug: "Nome Invalido" }]),
    ).toThrow();
  });

  it("falha explicitamente quando timeline nao cumpre schema", () => {
    expect(() => timelineCollectionSchema.parse([{ year: "2026" }])).toThrow();
  });
});
