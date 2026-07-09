import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const personFixture = {
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
  interests: ["Pesquisa aplicada", "Experiencia digital"],
  clubs: ["Leitura", "Prototipacao"],
  links: [
    {
      label: "Portfolio",
      href: "https://example.com/ana",
    },
  ],
  entries: [
    {
      title: "Registro autorizado de projeto",
      date: "2026-05-20",
      category: "projeto",
      description:
        "Registro autorizado usado para validar a grade editorial do perfil.",
      href: "https://example.com/registro",
      image: {
        src: "/images/projetos/programacao-lab-card.png",
        alt: "Imagem autorizada de teste para registro de pessoa.",
      },
    },
    {
      title: "Registro sem link externo",
      date: "2026-05-21",
      category: "pessoal",
      description:
        "Registro autorizado sem destino externo para validar semântica sem link falso.",
    },
  ],
};

afterEach(() => {
  cleanup();
  vi.resetModules();
  vi.doUnmock("@/biblioteca/conteudo");
});

async function renderPeoplePage() {
  const { default: PeoplePage } = await import("@/app/pessoas/page");

  return render(<PeoplePage />);
}

async function renderPersonPage(slug: string) {
  const { default: PersonPage } = await import("@/app/pessoas/[slug]/page");
  const page = await PersonPage({
    params: Promise.resolve({ slug }),
  });

  return render(page);
}

function expectImageSrcToContain(image: HTMLElement, path: string) {
  expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain(path);
}

describe("PeoplePage", () => {
  it("renderiza Breno na listagem com avatar local e destino publico", async () => {
    const { container } = await renderPeoplePage();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Pessoas por trás do NITE",
      }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(main.getByRole("link", { name: "Junte-se a nós" })).toHaveAttribute(
      "href",
      "/oportunidades",
    );
    expect(
      main.getByRole("button", { name: /Buscar pessoas/i }),
    ).toBeInTheDocument();
    expect(
      main.queryByText(
        "Nenhuma pessoa autorizada para publicação está disponível no momento.",
      ),
    ).not.toBeInTheDocument();

    const brenoCard = main.getByRole("link", {
      name: /Breno Cerqueira Software Engineer Salvador, Brasil/i,
    });

    expect(brenoCard).toHaveAttribute("href", "/pessoas/breno-cerqueira");
    const brenoAvatarImage = within(brenoCard).getByAltText(
      "Foto de perfil autorizada de Breno Cerqueira.",
    );
    const brenoAvatar = brenoAvatarImage.closest("span");

    expectImageSrcToContain(
      brenoAvatarImage,
      "/images/pessoas/breno-cerqueira.jpeg",
    );
    expect(brenoAvatar).toHaveClass("size-24", "sm:size-36");
    expect(brenoAvatarImage).toHaveAttribute(
      "sizes",
      "(min-width: 640px) 9rem, 6rem",
    );
    const brenoDisplayName = within(brenoCard).getByText("Breno");
    const brenoLocation = within(brenoCard).getByText("Salvador, Brasil");

    expect(brenoDisplayName).toHaveClass("text-sm", "font-semibold");
    expect(brenoLocation).toHaveClass("max-w-[80%]", "text-[0.8125rem]");
    expect(brenoLocation).not.toHaveClass("text-xs");
    expect(brenoLocation).not.toHaveClass("leading-5");
    expect(
      within(brenoCard).queryByText("Breno Cerqueira"),
    ).not.toBeInTheDocument();
    expect(brenoLocation).toBeInTheDocument();
    const joaoVictorCard = main.getByRole("link", {
      name: /João Victor Dórea Eng. Computação & Automação Industrial Salvador, Brasil/i,
    });

    expect(within(joaoVictorCard).getByText("João Victor")).toBeInTheDocument();
    expect(
      within(joaoVictorCard).queryByText("João Victor Dórea"),
    ).not.toBeInTheDocument();
    expect(
      within(brenoCard).queryByText("Gestor & Software Engineer"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Zeno Rocha")).not.toBeInTheDocument();

    const peopleList = container.querySelector(
      "[data-component='people-directory-list']",
    );

    expect(peopleList).toHaveClass("font-resend");
    expect(peopleList).toHaveClass("grid-cols-3", "lg:grid-cols-5");
    expect(peopleList).toHaveClass("lg:px-0");
    expect(brenoCard).toHaveClass("w-full", "min-w-0");
    expect(brenoCard).not.toHaveClass("w-36", "sm:w-40");
  });

  it("renderiza estado vazio honesto quando nao houver pessoas publicas", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      isPersonPublic: (person: typeof personFixture) =>
        person.public && person.authorized && person.contentState === "real",
      getPublicPeople: () => [],
    }));

    await renderPeoplePage();

    const main = within(screen.getByRole("main"));

    expect(
      main.getByText(
        "Nenhuma pessoa autorizada para publicação está disponível no momento.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("button", { name: /Buscar pessoas/i }),
    ).toBeInTheDocument();
  });

  it("usa tokens de tema na cena principal sem forcar dark mode", async () => {
    const { container } = await renderPeoplePage();
    const main = screen.getByRole("main");
    const pageRoot = main.parentElement;

    expect(pageRoot).not.toHaveAttribute("data-nite-scene", "inverse");
    expect(pageRoot).toHaveClass("bg-background", "text-foreground");
    expect(pageRoot?.getAttribute("style") ?? "").not.toContain(
      "--background:#000",
    );
    expect(main).toHaveClass("bg-background", "text-foreground");
    expect(
      container.querySelector("[style*='--background:#000']"),
    ).not.toBeInTheDocument();
  });

  it("renderiza o trigger de busca com a estilização compacta da referencia", async () => {
    await renderPeoplePage();

    const searchTrigger = screen.getByRole("button", {
      name: /Buscar pessoas/i,
    });
    const shortcuts = searchTrigger.querySelectorAll("kbd");

    expect(searchTrigger).toHaveClass(
      "h-10",
      "w-[200px]",
      "gap-0",
      "justify-between",
      "rounded-[1rem]",
      "px-3",
      "py-0",
      "font-normal",
    );
    expect(within(searchTrigger).getByText("Buscar…")).toBeInTheDocument();
    expect(
      within(searchTrigger).queryByText("Search…"),
    ).not.toBeInTheDocument();
    expect(searchTrigger.querySelector("svg")).toHaveClass("size-[18px]");
    expect(shortcuts).toHaveLength(2);

    for (const shortcut of shortcuts) {
      expect(shortcut).toHaveClass(
        "inline-flex",
        "h-5",
        "min-w-5",
        "items-center",
        "justify-center",
        "rounded-md",
        "border-0",
        "bg-nite-surface-subtle",
        "px-1",
        "font-sans",
        "text-xs",
        "font-normal",
        "text-muted-foreground",
      );
    }
  });

  it("abre a busca por clique e pelo atalho Ctrl+K", async () => {
    const user = userEvent.setup();

    await renderPeoplePage();
    await user.click(screen.getByRole("button", { name: /Buscar pessoas/i }));

    expect(
      screen.getByRole("dialog", { name: "Buscar pessoas" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Procurando pessoas...")).toHaveFocus();
    expect(
      within(screen.getByRole("dialog", { name: "Buscar pessoas" })).getByText(
        "Breno Cerqueira",
      ),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    expect(
      screen.getByRole("dialog", { name: "Buscar pessoas" }),
    ).toBeInTheDocument();
  });

  it("renderiza a busca aberta no padrão visual de command palette", async () => {
    const user = userEvent.setup();
    const { container } = await renderPeoplePage();

    await user.click(screen.getByRole("button", { name: /Buscar pessoas/i }));

    const dialog = screen.getByRole("dialog", { name: "Buscar pessoas" });
    const overlay = container.querySelector("[data-people-search-overlay]");
    const list = container.querySelector("[data-people-search-list]");
    const heading = container.querySelector(
      "[data-people-search-group-heading]",
    );
    const firstResult = within(dialog).getByRole("link", {
      name: /Breno Cerqueira/i,
    });

    expect(overlay).toHaveClass(
      "fixed",
      "inset-0",
      "z-[1000]",
      "bg-background/95",
    );
    expect(overlay?.className).not.toContain("backdrop-blur");
    expect(dialog).toHaveClass(
      "fixed",
      "left-1/2",
      "top-0",
      "z-[1000]",
      "w-full",
      "max-w-[660px]",
      "-translate-x-1/2",
      "translate-y-[25vh]",
      "rounded-[1.3rem]",
      "p-0",
      "shadow-none",
    );
    expect(
      dialog.querySelector("[data-people-search-input-wrapper]"),
    ).toHaveClass(
      "mt-1",
      "h-[49px]",
      "justify-between",
      "border-b",
      "px-5",
      "py-1",
    );
    expect(
      container.querySelector("[data-search-overlay]"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector("[data-search-list]"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector("[data-search-group-heading]"),
    ).not.toBeInTheDocument();
    expect(
      dialog.querySelector("[data-search-input-wrapper]"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar busca" })).toHaveClass(
      "cursor-pointer",
      "p-0",
    );
    expect(screen.getByText("Esc")).toHaveClass(
      "inline-flex",
      "h-5",
      "min-w-5",
      "rounded-md",
      "bg-nite-surface-subtle",
      "px-1",
      "text-xs",
    );
    expect(screen.getByPlaceholderText("Procurando pessoas...")).toHaveClass(
      "min-h-8",
      "py-2",
      "text-base",
      "focus-visible:shadow-none",
    );
    expect(list).toHaveClass(
      "max-h-[300px]",
      "overflow-y-auto",
      "overflow-x-hidden",
      "p-1.5",
    );
    expect(heading).toHaveClass(
      "flex",
      "min-h-7",
      "items-end",
      "px-3",
      "pr-4",
      "text-xs",
    );
    expect(firstResult).toHaveClass(
      "mx-1",
      "my-1",
      "min-h-8",
      "justify-between",
      "gap-3",
      "rounded-xl",
      "px-3",
      "py-2",
      "text-sm",
      "bg-nite-surface",
      "text-foreground",
    );
    expect(
      within(firstResult)
        .getByAltText("Foto de perfil autorizada de Breno Cerqueira.")
        .closest("span"),
    ).toHaveClass("size-6");
  });

  it("renderiza cards autorizados quando houver pessoas publicas", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      isPersonPublic: (person: typeof personFixture) =>
        person.public && person.authorized && person.contentState === "real",
      getPublicPeople: () => [
        personFixture,
        {
          ...personFixture,
          slug: "pessoa-interna",
          name: "Pessoa Interna",
          public: false,
        },
        {
          ...personFixture,
          slug: "pessoa-rascunho",
          name: "Pessoa Rascunho",
          contentState: "draft",
        },
      ],
    }));

    await renderPeoplePage();

    expect(
      screen.getByRole("link", { name: /Ana Silva Coordenadora de inovacao/i }),
    ).toHaveAttribute("href", "/pessoas/ana-silva");
    expect(screen.queryByText("Pessoa Interna")).not.toBeInTheDocument();
    expect(screen.queryByText("Pessoa Rascunho")).not.toBeInTheDocument();
  });

  it("mantem Breno como pessoa publica real e autorizada no conteudo", async () => {
    const { getPeople, getPublicPeople, isPersonPublic } =
      await import("@/biblioteca/conteudo");
    const breno = getPeople().find(
      (person) => person.slug === "breno-cerqueira",
    );

    expect(breno).toMatchObject({
      public: true,
      authorized: true,
      contentState: "real",
      avatar: {
        src: "/images/pessoas/breno-cerqueira.jpeg",
      },
    });
    expect(breno && isPersonPublic(breno)).toBe(true);
    expect(getPublicPeople().map((person) => person.slug)).toContain(
      "breno-cerqueira",
    );
  });
});

describe("PersonPage", () => {
  it("renderiza o perfil real de Breno no padrão visual da Resend", async () => {
    const { container } = await renderPersonPage("breno-cerqueira");
    const { getPeople } = await import("@/biblioteca/conteudo");
    const breno = getPeople().find(
      (person) => person.slug === "breno-cerqueira",
    );

    expect(
      screen.getByRole("link", { name: "Todas as pessoas" }),
    ).toHaveAttribute("href", "/pessoas");
    expect(
      screen.getByRole("heading", { level: 1, name: "Breno Cerqueira" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Breno Cerqueira" }),
    ).toHaveClass("font-resend");
    expect(
      screen.getByRole("heading", { level: 1, name: "Breno Cerqueira" }),
    ).not.toHaveClass("font-heading");
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Salvador, Brasil")).toBeInTheDocument();
    expect(breno?.summary).toBe("Just do it");
    expect(screen.queryByText("Just do it")).not.toBeInTheDocument();
    expectImageSrcToContain(
      screen.getByAltText("Foto de perfil autorizada de Breno Cerqueira."),
      "/images/pessoas/breno-cerqueira.jpeg",
    );
    expect(screen.getByRole("link", { name: "IBrenoS" })).toHaveAttribute(
      "href",
      "https://github.com/IBrenoS",
    );
    expect(
      screen.getByRole("link", { name: "Breno Cerqueira" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/brenocerq/");

    const profileMeta = container.querySelector("[data-person-profile-meta]");
    const profileShell = container.querySelector("[data-person-profile-shell]");

    expect(profileShell).toHaveClass("font-resend");
    expect(profileMeta?.querySelector(".lucide-link")).not.toBeInTheDocument();

    const traitsBlock = screen.getByText("Clubes e interesses").parentElement;

    expect(traitsBlock).toHaveClass("border-t");
    expect(screen.queryByText("Clubs")).not.toBeInTheDocument();

    for (const label of [
      "Clube: Café",
      "Clube: Leitura",
      "Interesse: IA",
      "Interesse: Programação",
    ]) {
      const trait = screen.getByLabelText(label);

      expect(trait).toBeInTheDocument();
      expect(trait).toHaveClass("group/profile-trait");
      expect(trait).not.toHaveClass("group/club-item");
      expect(trait.querySelector("svg")).toBeInTheDocument();
      expect(trait.querySelector("svg")).toHaveClass(
        "group-hover/profile-trait:-rotate-6",
      );
    }

    const registros = within(
      screen.getByRole("region", { name: "Registros relacionados" }),
    );

    for (const label of [
      "Todos",
      "Projetos",
      "Atualizações",
      "Handbook",
      "Pessoal",
    ]) {
      expect(
        registros.getByRole("button", { name: label }),
      ).toBeInTheDocument();
    }

    expect(
      registros.getByText("Nenhum registro publicado neste filtro."),
    ).toBeInTheDocument();
  });

  it("renderiza perfil autorizado com sidebar, filtros e registros", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      isPersonPublic: (person: typeof personFixture) =>
        person.public && person.authorized && person.contentState === "real",
      getPersonBySlug: (slug: string) =>
        slug === personFixture.slug ? personFixture : undefined,
      getPersonSlugs: () => [{ slug: personFixture.slug }],
    }));

    await renderPersonPage(personFixture.slug);

    expect(
      screen.getByRole("link", { name: "Todas as pessoas" }),
    ).toHaveAttribute("href", "/pessoas");
    expect(
      screen.getByRole("heading", { level: 1, name: "Ana Silva" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Coordenadora de inovacao")).toBeInTheDocument();
    expect(screen.getByText("Salvador, BA")).toBeInTheDocument();
    expect(screen.getByText("AS")).toBeInTheDocument();
    expect(screen.queryByText(personFixture.summary)).not.toBeInTheDocument();
    expect(screen.getByText("Clubes e interesses")).toBeInTheDocument();
    expect(screen.getByText("Pesquisa aplicada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Todos" })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(
      within(
        screen.getByRole("region", { name: "Registros relacionados" }),
      ).getByRole("button", { name: "Projetos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Registro autorizado de projeto/i }),
    ).toHaveAttribute("href", "https://example.com/registro");
    expect(
      screen.queryByRole("link", { name: /Registro sem link externo/i }),
    ).not.toBeInTheDocument();
    const unlinkedEntryTitles = screen.getAllByText(
      "Registro sem link externo",
    );

    expect(unlinkedEntryTitles).not.toHaveLength(0);
    expect(
      unlinkedEntryTitles.some((entryTitle) =>
        Boolean(entryTitle.closest("article")),
      ),
    ).toBe(true);
    expect(
      unlinkedEntryTitles.every((entryTitle) => !entryTitle.closest("a")),
    ).toBe(true);
  });

  it("mantem o perfil individual em tokens globais sem ajustes locais questionaveis", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      isPersonPublic: (person: typeof personFixture) =>
        person.public && person.authorized && person.contentState === "real",
      getPersonBySlug: (slug: string) =>
        slug === personFixture.slug ? personFixture : undefined,
      getPersonSlugs: () => [{ slug: personFixture.slug }],
    }));

    await renderPersonPage(personFixture.slug);

    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const source = readFileSync(
      join(process.cwd(), "components", "sections", "person-profile-shell.tsx"),
      "utf8",
    );

    expect(source).not.toContain("lg:min-h-[calc(100svh+160rem)]");
    expect(source).not.toContain("duration-200 ease-linear");
    expect(source).not.toContain("group/club-item");
    expect(source).not.toContain('href={entry.href ?? "#registros-pessoa"}');
    expect(source).toContain("duration-nite-micro");
    expect(source).toContain("ease-nite-out");
    expect(source).toContain("group/profile-trait");
    expect(source).toContain("const entryContent =");
    expect(source).toContain("entry.href ? (");
  });

  it("nao expõe pessoa sem autorizacao publica", async () => {
    vi.doMock("@/biblioteca/conteudo", () => ({
      isPersonPublic: (person: typeof personFixture) =>
        person.public && person.authorized && person.contentState === "real",
      getPersonBySlug: () => ({
        ...personFixture,
        authorized: false,
      }),
      getPersonSlugs: () => [],
    }));

    await renderPersonPage(personFixture.slug);

    expect(screen.queryByText("Ana Silva")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Nao encontramos essa pessoa.",
      }),
    ).toBeInTheDocument();
  });
});
