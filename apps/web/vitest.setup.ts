import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import type { ImageProps } from "next/image";
import { vi } from "vitest";

process.env.NITE_NEWS_SOURCE = "static";

vi.mock("server-only", () => ({}));

const createFontMock = (name: string) => () => ({
  className: `${name}-font`,
  style: { fontFamily: name },
  variable: `${name}-variable`,
});

vi.mock("next/font/google", () => ({
  Geist: createFontMock("geist"),
  Geist_Mono: createFontMock("geist-mono"),
  Inter: createFontMock("inter"),
  Sora: createFontMock("sora"),
}));

const nextImageOnlyProps = [
  "blurDataURL",
  "fill",
  "loader",
  "onLoadingComplete",
  "overrideSrc",
  "placeholder",
  "preload",
  "priority",
  "quality",
  "unoptimized",
] as const;

function NextImageMock({ alt, src, ...props }: ImageProps) {
  const imageProps: Record<string, unknown> = { ...props };

  for (const property of nextImageOnlyProps) {
    delete imageProps[property];
  }

  return createElement("img", {
    ...imageProps,
    alt,
    src:
      typeof src === "string"
        ? src
        : "default" in src
          ? src.default.src
          : src.src,
  });
}

vi.mock("next/image", () => ({
  default: NextImageMock,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
