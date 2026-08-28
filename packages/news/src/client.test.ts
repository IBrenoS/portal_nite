import { describe, expect, it, vi } from "vitest";

import newsJson from "../data/news.json";
import { createNewsApiClient } from "./client";

describe("client HTTP público de News", () => {
  it("valida a resposta versionada antes de expor artigos", async () => {
    const fetchImplementation = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ version: 1, articles: newsJson }));
    const client = createNewsApiClient({
      baseUrl: "https://cms-api.nite.test/",
      fetch: fetchImplementation,
    });

    await expect(client.listPublishedArticles()).resolves.toHaveLength(8);
    expect(fetchImplementation).toHaveBeenCalledWith(
      "https://cms-api.nite.test/v1/news",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("rejeita versões e payloads incompatíveis", async () => {
    const client = createNewsApiClient({
      baseUrl: "https://cms-api.nite.test",
      fetch: vi
        .fn<typeof fetch>()
        .mockResolvedValue(Response.json({ version: 2, articles: [] })),
    });

    await expect(client.listPublishedArticles()).rejects.toThrow(
      /resposta incompatível/i,
    );
  });

  it("diferencia artigo ausente de falha HTTP", async () => {
    const notFoundClient = createNewsApiClient({
      baseUrl: "https://cms-api.nite.test",
      fetch: vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          Response.json({ error: "not_found" }, { status: 404 }),
        ),
    });
    await expect(
      notFoundClient.getArticleBySlug("materia-ausente"),
    ).resolves.toBeUndefined();

    const unavailableClient = createNewsApiClient({
      baseUrl: "https://cms-api.nite.test",
      fetch: vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          Response.json({ error: "unavailable" }, { status: 503 }),
        ),
    });
    await expect(unavailableClient.listPublishedArticles()).rejects.toThrow(
      /503/,
    );
  });
});
