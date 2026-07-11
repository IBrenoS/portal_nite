# Jogos Embarcados Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renomear o projeto para Jogos Embarcados, publicar a fotografia fornecida em todos os slots de capa e migrar a URL com redirecionamento permanente.

**Architecture:** `conteudo/projetos/projetos.json` permanece como fonte única da identidade e das imagens. O mesmo arquivo público será referenciado por `coverImage`, `illustration.src` e `gallery[0].src`; o slug canônico será atualizado nos consumidores e `next.config.ts` manterá compatibilidade com as URLs anteriores.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Vitest 4, Testing Library, JSON validado com Zod.

## Global Constraints

- O nome público e interno correto é `Jogos Embarcados`.
- Nenhuma ocorrência do nome anterior pode permanecer no repositório.
- A narrativa definitiva, a categoria, as tecnologias e os demais dados editoriais não serão inventados nesta etapa.
- A nova imagem deve aparecer em todos os slots de capa derivados de `coverImage`, `illustration` e `gallery`.
- `/projetos/robotica-educacional` deve redirecionar permanentemente para `/projetos/jogos-embarcados`.
- Alterações locais preexistentes em `components/sections/people-directory.tsx`, `tests/unit/people-page.test.tsx` e `resend.md` não podem ser modificadas nem incluídas nos commits desta implementação.

## File Structure

- Create: `public/images/projetos/jogos-embarcados.png` — cópia byte a byte da fotografia aprovada.
- Modify: `conteudo/projetos/projetos.json` — fonte canônica de nome, slug, caminhos de imagem e textos mínimos sem o nome anterior.
- Modify: `components/sections/project-showcase.tsx` — preserva o identificador visual atual sob o novo slug.
- Modify: `next.config.ts` — redireciona os dois caminhos legados para a URL canônica.
- Modify: `tests/unit/home-page.test.tsx` — protege nome, slug e capa na homepage.
- Modify: `tests/unit/project-list-page.test.tsx` — protege nome, slug e capa no catálogo.
- Modify: `tests/unit/project-detail-page.test.tsx` — protege nome, imagem principal e relacionados na página interna.
- Create: `tests/unit/project-identity.test.ts` — protege o registro canônico, todos os slots de imagem e ausência do nome anterior no conteúdo ativo.
- Create: `tests/unit/next-config.test.ts` — protege os redirecionamentos permanentes.
- Modify: `docs/superpowers/specs/2026-06-26-home-metodo-projetos-redesign-design.md` — remove menções históricas ao nome anterior sem alterar a decisão arquitetural documentada.

---

### Task 1: Contrato canônico de identidade e imagem

**Files:**
- Create: `tests/unit/project-identity.test.ts`
- Modify: `conteudo/projetos/projetos.json`
- Create: `public/images/projetos/jogos-embarcados.png`

**Interfaces:**
- Consumes: array JSON de projetos validado pelo loader existente.
- Produces: registro com `slug: "jogos-embarcados"`, `title: "Jogos Embarcados"` e `/images/projetos/jogos-embarcados.png` nos três slots de imagem.

- [ ] **Step 1: Escrever o teste de identidade que falha**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type ProjectRecord = {
  slug: string;
  title: string;
  coverImage: string;
  illustration?: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
  seo?: { title: string; description: string };
};

const projects = JSON.parse(
  readFileSync(resolve(process.cwd(), "conteudo/projetos/projetos.json"), "utf8"),
) as ProjectRecord[];

describe("identidade de Jogos Embarcados", () => {
  it("usa o novo nome, slug e a mesma capa em todos os slots", () => {
    const project = projects.find(({ slug }) => slug === "jogos-embarcados");
    const cover = "/images/projetos/jogos-embarcados.png";

    expect(project).toBeDefined();
    expect(project?.title).toBe("Jogos Embarcados");
    expect(project?.coverImage).toBe(cover);
    expect(project?.illustration?.src).toBe(cover);
    expect(project?.gallery.map(({ src }) => src)).toContain(cover);
    expect(project?.seo?.title).toContain("Jogos Embarcados");
  });

  it("não mantém o nome anterior no conteúdo de projetos", () => {
    const serialized = JSON.stringify(projects);
    expect(serialized).not.toMatch(/rob[oó]tica\s+educacional/i);
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar RED**

Run: `npm test -- tests/unit/project-identity.test.ts`

Expected: FAIL porque o registro `jogos-embarcados` ainda não existe.

- [ ] **Step 3: Copiar a imagem aprovada e conferir integridade**

Run: `Copy-Item -LiteralPath 'C:\Users\breno\Downloads\pedra_papel_tesoura-enhanced.png' -Destination 'D:\portal_nite\public\images\projetos\jogos-embarcados.png'`

Run: `Get-FileHash 'C:\Users\breno\Downloads\pedra_papel_tesoura-enhanced.png','D:\portal_nite\public\images\projetos\jogos-embarcados.png'`

Expected: os dois arquivos apresentam o mesmo SHA-256.

- [ ] **Step 4: Atualizar minimamente o registro de conteúdo**

No segundo objeto de `conteudo/projetos/projetos.json`:

```json
{
  "slug": "jogos-embarcados",
  "title": "Jogos Embarcados",
  "coverImage": "/images/projetos/jogos-embarcados.png",
  "alt": "Jogo embarcado de pedra, papel e tesoura com três comandos iluminados sobre uma bancada.",
  "illustration": {
    "src": "/images/projetos/jogos-embarcados.png",
    "alt": "Jogo embarcado de pedra, papel e tesoura com peças de mão e botões iluminados."
  },
  "gallery": [
    {
      "src": "/images/projetos/jogos-embarcados.png",
      "alt": "Protótipo de pedra, papel e tesoura com botões vermelho, verde e azul."
    }
  ],
  "seo": {
    "title": "Jogos Embarcados no NITE",
    "description": "Conheça Jogos Embarcados no NITE. A narrativa completa do projeto está em atualização editorial."
  }
}
```

Preservar todos os demais campos e valores do objeto. Na `description` que contém o nome anterior, substituir apenas a identificação inicial por `Jogos Embarcados`; não reescrever os demais campos.

- [ ] **Step 5: Rodar o teste e confirmar GREEN**

Run: `npm test -- tests/unit/project-identity.test.ts`

Expected: 2 testes PASS.

- [ ] **Step 6: Commitar somente o contrato de conteúdo e a imagem**

```powershell
git add -- tests/unit/project-identity.test.ts conteudo/projetos/projetos.json public/images/projetos/jogos-embarcados.png
git commit -m "feat: renomeia projeto para jogos embarcados"
```

### Task 2: Consumidores públicos da nova identidade

**Files:**
- Modify: `tests/unit/home-page.test.tsx`
- Modify: `tests/unit/project-list-page.test.tsx`
- Modify: `tests/unit/project-detail-page.test.tsx`
- Modify: `components/sections/project-showcase.tsx`

**Interfaces:**
- Consumes: registro `jogos-embarcados` da Task 1.
- Produces: links para `/projetos/jogos-embarcados`, título novo e imagem pública em homepage, catálogo e página interna.

- [ ] **Step 1: Atualizar os testes de comportamento público antes do consumidor**

Em `tests/unit/project-list-page.test.tsx`, substituir as três consultas pelo título novo e exigir:

```ts
expect(
  main.getByRole("link", { name: /Jogos Embarcados/i }),
).toHaveAttribute("href", "/projetos/jogos-embarcados");

const embeddedGamesCard = main
  .getByRole("link", { name: /Jogos Embarcados/i })
  .closest("[data-slot='card']");
expect(embeddedGamesCard?.querySelector("img")).toHaveAttribute(
  "src",
  expect.stringContaining("jogos-embarcados.png"),
);
```

Em `tests/unit/project-detail-page.test.tsx`, substituir o título relacionado e adicionar:

```ts
expect(
  related.getByRole("heading", { level: 3, name: "Jogos Embarcados" }),
).toBeInTheDocument();
```

Em `tests/unit/home-page.test.tsx`, localizar o showcase pelo título e adicionar:

```ts
const embeddedGamesTitle = screen.getByRole("heading", {
  level: 3,
  name: "Jogos Embarcados",
});
const embeddedGamesRow = embeddedGamesTitle.closest("[data-project-showcase-row]");
expect(embeddedGamesRow?.querySelector("[data-project-cover-image]"))
  .toHaveAttribute("src", expect.stringContaining("jogos-embarcados.png"));
expect(
  embeddedGamesRow?.querySelector("[data-project-visual='robotics-lab']"),
).toBeInTheDocument();
```

- [ ] **Step 2: Rodar os testes e confirmar RED**

Run: `npm test -- tests/unit/home-page.test.tsx tests/unit/project-list-page.test.tsx tests/unit/project-detail-page.test.tsx`

Expected: FAIL no contrato `data-project-visual='robotics-lab'` porque o mapa ainda usa o slug anterior; quaisquer falhas de seletores devem ser ajustadas sem reduzir o contrato observado.

- [ ] **Step 3: Atualizar o mapeamento visual do showcase**

Em `components/sections/project-showcase.tsx`:

```ts
const visualBySlug: Record<string, ProjectVisual> = {
  "software-aplicado": "code-workbench",
  "jogos-embarcados": "robotics-lab",
  "dados-e-ia": "analytics-dashboard",
};
```

- [ ] **Step 4: Rodar os testes e confirmar GREEN**

Run: `npm test -- tests/unit/home-page.test.tsx tests/unit/project-list-page.test.tsx tests/unit/project-detail-page.test.tsx`

Expected: todos os testes dos três arquivos PASS.

- [ ] **Step 5: Commitar consumidores e testes**

```powershell
git add -- components/sections/project-showcase.tsx tests/unit/home-page.test.tsx tests/unit/project-list-page.test.tsx tests/unit/project-detail-page.test.tsx
git commit -m "test: protege capa de jogos embarcados"
```

### Task 3: Redirecionamentos permanentes

**Files:**
- Create: `tests/unit/next-config.test.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: API `redirects()` do `NextConfig`.
- Produces: redirects permanentes da rota anterior e da rota demonstrativa anterior para `/projetos/jogos-embarcados`.

- [ ] **Step 1: Escrever o teste de redirecionamentos**

```ts
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("redirecionamentos de Jogos Embarcados", () => {
  it("redireciona permanentemente as URLs anteriores", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/projetos/robotica-educacional",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
        {
          source: "/projetos/robotica-educacional-demonstrativo",
          destination: "/projetos/jogos-embarcados",
          permanent: true,
        },
      ]),
    );
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar RED**

Run: `npm test -- tests/unit/next-config.test.ts`

Expected: FAIL porque não existe redirect da rota anterior e o demonstrativo ainda aponta para o destino antigo.

- [ ] **Step 3: Implementar redirects mínimos**

Em `next.config.ts`, substituir o redirect demonstrativo anterior e adicionar o canônico:

```ts
{
  source: "/projetos/robotica-educacional",
  destination: "/projetos/jogos-embarcados",
  permanent: true,
},
{
  source: "/projetos/robotica-educacional-demonstrativo",
  destination: "/projetos/jogos-embarcados",
  permanent: true,
},
```

- [ ] **Step 4: Rodar o teste e confirmar GREEN**

Run: `npm test -- tests/unit/next-config.test.ts`

Expected: 1 teste PASS.

- [ ] **Step 5: Commitar redirects e teste**

```powershell
git add -- next.config.ts tests/unit/next-config.test.ts
git commit -m "fix: redireciona projeto renomeado"
```

### Task 4: Limpeza integral do nome anterior e verificação

**Files:**
- Modify: `docs/superpowers/specs/2026-06-26-home-metodo-projetos-redesign-design.md`
- Modify, only if still matched: active tests or documentation reported by the repository scan.

**Interfaces:**
- Consumes: estado final das Tasks 1–3.
- Produces: repositório sem o nome anterior e cadeia completa de validação verde.

- [ ] **Step 1: Fazer a varredura que deve falhar antes da limpeza documental**

Run: `rg -n -i "rob[oó]tica\s+educacional" . -g '!node_modules/**' -g '!.next/**'`

Expected: encontra ao menos `docs/superpowers/specs/2026-06-26-home-metodo-projetos-redesign-design.md`; não deve encontrar o conteúdo ativo já migrado.

- [ ] **Step 2: Substituir referências documentais pelo nome novo**

Em `docs/superpowers/specs/2026-06-26-home-metodo-projetos-redesign-design.md`, substituir somente o nome anterior por `Jogos Embarcados`, preservando o restante do texto histórico.

- [ ] **Step 3: Confirmar ausência do nome anterior**

Run: `rg -n -i "rob[oó]tica\s+educacional" . -g '!node_modules/**' -g '!.next/**'`

Expected: exit code 1 e nenhuma saída.

- [ ] **Step 4: Verificar integridade da imagem e diff**

Run: `Get-FileHash 'C:\Users\breno\Downloads\pedra_papel_tesoura-enhanced.png','D:\portal_nite\public\images\projetos\jogos-embarcados.png'`

Expected: SHA-256 idênticos.

Run: `git diff --check HEAD~3..HEAD`

Expected: exit code 0, sem erros de whitespace.

- [ ] **Step 5: Rodar a cadeia completa de validação**

Run: `npm test`

Expected: exit code 0, zero testes falhando.

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 e geração da rota `/projetos/jogos-embarcados`.

- [ ] **Step 6: Commitar a limpeza documental**

```powershell
git add -- docs/superpowers/specs/2026-06-26-home-metodo-projetos-redesign-design.md
git commit -m "docs: atualiza nome de jogos embarcados"
```

- [ ] **Step 7: Revisar o escopo final sem incluir alterações locais alheias**

Run: `git status --short --branch`

Expected: continuam visíveis apenas as alterações locais preexistentes em `components/sections/people-directory.tsx`, `tests/unit/people-page.test.tsx` e `resend.md`; todos os arquivos desta implementação estão commitados.
