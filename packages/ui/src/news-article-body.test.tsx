import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { EditorialDocumentV3, EditorialVideoNode } from "@nite/news";

import { NewsArticleBody } from "./news-article-body";

const description =
  "Estudantes apresentam um projeto em um laboratório do campus.";
const baseVideoAttrs: EditorialVideoNode["attrs"] = {
  mediaId: "30000000-0000-4000-8000-000000000002",
  captionsMediaId: "30000000-0000-4000-8000-000000000003",
  playbackMode: "manual",
  layout: "wide",
  description,
  caption: "Apresentação do projeto interdisciplinar.",
  credit: "Vídeo: Redação NITE",
  src: "https://media.nite.test/editorial.mp4",
  width: 1920,
  height: 1080,
  durationSeconds: 42.5,
  mimeType: "video/mp4",
  captions: {
    src: "https://media.nite.test/editorial.vtt",
    mimeType: "text/vtt",
    srclang: "pt-BR",
    label: "Português",
  },
};

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(
      (query: string) =>
        ({
          matches,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(() => true),
        }) satisfies MediaQueryList,
    ),
  });
}

function createVideoDocument(
  attrs: EditorialVideoNode["attrs"],
): EditorialDocumentV3 {
  return {
    schemaVersion: 3,
    type: "doc",
    content: [{ type: "video", attrs }],
  };
}

function getVideo(container: HTMLElement) {
  const video = container.querySelector("video");
  if (!video) throw new Error("Vídeo editorial não renderizado.");
  return video;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("vídeo no corpo editorial", () => {
  it("reproduz autoplay mudo em loop sem controles e preserva o layout de imagem", async () => {
    setReducedMotion(false);
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const { container } = render(
      <NewsArticleBody
        document={{
          schemaVersion: 3,
          type: "doc",
          content: [
            {
              type: "image",
              attrs: {
                mediaId: "30000000-0000-4000-8000-000000000004",
                src: "https://media.nite.test/editorial.webp",
                width: 1920,
                height: 1080,
                alt: "Estudantes apresentam um projeto no laboratório.",
                layout: "wide",
              },
            },
            {
              type: "video",
              attrs: { ...baseVideoAttrs, playbackMode: "autoplay" },
            },
          ],
        }}
      />,
    );

    const video = getVideo(container);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("loop");
    expect(video).not.toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("poster");
    expect(video).toHaveAttribute("preload", "auto");
    expect(video.muted).toBe(true);
    expect(video.defaultMuted).toBe(true);
    expect(video).toHaveAccessibleDescription(description);
    const figures = container.querySelectorAll("figure");
    expect(figures).toHaveLength(2);
    expect(figures[1]?.className).toBe(figures[0]?.className);
  });

  it("renderiza modo manual com controles, preload metadata e legendas WebVTT padrão", () => {
    setReducedMotion(false);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    const { container } = render(
      <NewsArticleBody document={createVideoDocument(baseVideoAttrs)} />,
    );

    const video = getVideo(container);
    const track = video.querySelector("track");
    const source = video.querySelector("source");
    expect(play).not.toHaveBeenCalled();
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("loop");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(source).toHaveAttribute(
      "src",
      "https://media.nite.test/editorial.mp4",
    );
    expect(source).toHaveAttribute("type", "video/mp4");
    expect(track).toHaveAttribute("kind", "captions");
    expect(track).toHaveAttribute(
      "src",
      "https://media.nite.test/editorial.vtt",
    );
    expect(track).toHaveAttribute("srclang", "pt-BR");
    expect(track).toHaveAttribute("label", "Português");
    expect(track).toHaveAttribute("default");
  });

  it("informa quando o navegador rejeita a reprodução automática", async () => {
    setReducedMotion(false);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      new DOMException("Autoplay blocked", "NotAllowedError"),
    );
    render(
      <NewsArticleBody
        document={createVideoDocument({
          ...baseVideoAttrs,
          playbackMode: "autoplay",
        })}
      />,
    );

    expect(
      await screen.findByText(
        "A reprodução automática foi bloqueada pelo seu navegador.",
      ),
    ).toBeVisible();
  });

  it("não chama play e informa o bloqueio por movimento reduzido", async () => {
    setReducedMotion(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    const { container } = render(
      <NewsArticleBody
        document={createVideoDocument({
          ...baseVideoAttrs,
          playbackMode: "autoplay",
        })}
      />,
    );

    expect(
      await screen.findByText(
        "A reprodução automática foi desativada pela preferência de movimento do seu dispositivo.",
      ),
    ).toBeVisible();
    expect(play).not.toHaveBeenCalled();
    expect(getVideo(container)).not.toHaveAttribute("autoplay");
  });

  it("informa falha de carregamento da mídia", () => {
    setReducedMotion(false);
    const { container } = render(
      <NewsArticleBody document={createVideoDocument(baseVideoAttrs)} />,
    );

    fireEvent.error(getVideo(container));

    expect(
      screen.getByText("Não foi possível carregar o vídeo."),
    ).toBeVisible();
  });
});
