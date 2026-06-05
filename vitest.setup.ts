import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

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
