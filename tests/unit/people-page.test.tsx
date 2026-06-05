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
    await renderPeoplePage();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Pessoas por trás do NITE",
      }),
    ).toBeInTheDocument();

    const main = within(screen.getByRole("main"));

    expect(
      main.getByRole("link", { name: "Junte-se a nós" }),
    ).toHaveAttribute("href", "/oportunidades");
    expect(
      main.getByRole("button", { name: /Buscar pessoas/i }),
    ).toBeInTheDocument();
    expect(
      main.queryByText(
        "Nenhuma pessoa autorizada para publicação está disponível no momento.",
      ),
    ).not.toBeInTheDocument();

    const brenoCard = main.getByRole("link", {
      name: /Breno Cerqueira Gestor & Software Engineer Salvador, Brazil/i,
    });

    expect(brenoCard).toHaveAttribute("href", "/pessoas/breno-cerqueira");
    expectImageSrcToContain(
      within(brenoCard).getByAltText(
        "Foto de perfil autorizada de Breno Cerqueira.",
      ),
      "/images/pessoas/breno-cerqueira.jpeg",
    );
    expect(within(brenoCard).getByText("Salvador, Brazil")).toBeInTheDocument();
    expect(
      within(brenoCard).queryByText("Gestor & Software Engineer"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Zeno Rocha")).not.toBeInTheDocument();
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

  it("abre a busca por clique e pelo atalho Ctrl+K", async () => {
    const user = userEvent.setup();

    await renderPeoplePage();
    await user.click(screen.getByRole("button", { name: /Buscar pessoas/i }));

    expect(
      screen.getByRole("dialog", { name: "Buscar pessoas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar pessoas autorizadas..."),
    ).toHaveFocus();
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
    const { getPeople, getPublicPeople, isPersonPublic } = await import(
      "@/biblioteca/conteudo"
    );
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
    expect(screen.getByText("Gestor & Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Salvador, Brazil")).toBeInTheDocument();
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

    expect(profileMeta?.querySelector(".lucide-link")).not.toBeInTheDocument();

    const clubsBlock = screen.getByText("Clubs").parentElement;

    expect(clubsBlock).toHaveClass("border-t");
    expect(screen.queryByText("Clubs e interesses")).not.toBeInTheDocument();

    for (const label of [
      "Club: Café",
      "Club: Leitura",
      "Interesse: IA",
      "Interesse: Programação",
    ]) {
      const trait = screen.getByLabelText(label);

      expect(trait).toBeInTheDocument();
      expect(trait.querySelector("svg")).toBeInTheDocument();
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
      expect(registros.getByRole("button", { name: label })).toBeInTheDocument();
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
    expect(screen.getByText("Clubs")).toBeInTheDocument();
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
