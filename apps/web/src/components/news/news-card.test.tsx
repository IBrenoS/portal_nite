import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { getFeaturedNewsArticle, type NewsArticle } from "@nite/news";
import { NewsCard } from "@/components/news/news-card";

let article: NewsArticle;

beforeAll(async () => {
  const featuredArticle = await getFeaturedNewsArticle();

  if (!featuredArticle) {
    throw new Error("News card fixture not found.");
  }

  article = featuredArticle;
});

afterEach(() => {
  cleanup();
});

describe("NewsCard", () => {
  it.each(["lead", "standard", "compact"] as const)(
    "renders %s as a flat editorial block without animated media",
    (layout) => {
      render(<NewsCard article={article} layout={layout} />);

      const link = screen.getByRole("link", {
        name: new RegExp(article.title),
      });
      const card = link.querySelector("article");
      const image = screen.getByAltText(article.cover.alt);

      expect(card).toHaveAttribute("data-news-card-surface", "flat");
      expect(card).not.toHaveClass(
        "border",
        "bg-nite-surface",
        "rounded-xl",
        "transition-colors",
      );
      expect(image).toHaveAttribute("data-news-card-image", "");
      expect(image).toHaveClass("object-cover", "rounded-lg");
      expect(image.className).not.toMatch(
        /transition|group-hover:scale|motion-reduce:group-hover:scale/,
      );
      expect(link).toHaveClass("focus-visible:ring-3");
    },
  );

  it("keeps the compact variant image above its concise editorial copy", () => {
    render(<NewsCard article={article} layout="compact" />);

    const card = screen.getByRole("article");

    expect(card).toHaveClass("flex", "flex-col");
    expect(card).not.toHaveClass("grid-cols-[8.5rem_1fr]");
    expect(screen.queryByText(article.summary)).not.toBeInTheDocument();
  });
});
