import { describe, expect, it } from "vitest";

import * as sharedContent from "@nite/content";
import * as adminContent from "@nite/content/admin";
import * as publicContent from "@nite/content/public";

describe("fronteiras publicas de @nite/content", () => {
  it("mantem consultas News apenas na entrada publica", () => {
    expect(publicContent.getPublishedNewsArticles).toBeTypeOf("function");
    expect(publicContent.createDrizzleNewsPublicDataSource).toBeTypeOf(
      "function",
    );
    expect(sharedContent).not.toHaveProperty("getPublishedNewsArticles");
    expect(sharedContent).not.toHaveProperty("articles");
  });

  it("mantem o schema de escrita apenas na entrada administrativa", () => {
    expect(adminContent.articles).toBeDefined();
    expect(adminContent.articleRevisions).toBeDefined();
    expect(adminContent.publishedArticles).toBeDefined();
    expect(publicContent).not.toHaveProperty("articles");
    expect(publicContent).not.toHaveProperty("cmsMemberships");
  });
});
