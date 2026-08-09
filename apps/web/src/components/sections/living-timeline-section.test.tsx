import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getTimelineNarrativeGraphemes,
  isTimelineImageSequenceReady,
  TimelineImageSequence,
  timelineSequenceImages,
} from "@/components/sections/living-timeline-section";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("LivingTimelineSection", () => {
  it("pausa e retoma a sequência visual sem reiniciar a imagem ativa", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(
      <TimelineImageSequence
        active
        images={timelineSequenceImages}
        intervalMs={5000}
      />,
    );
    const activeImage = () =>
      container
        .querySelector(
          "[data-component='timeline-image-sequence-layer'][data-active='true']",
        )
        ?.getAttribute("data-image-src");

    expect(activeImage()).toContain("timeline-sequence-07-19-combo-nite.jpg");
    act(() => vi.advanceTimersByTime(5000));
    expect(activeImage()).toContain("timeline-sequence-06-18-nite-cimatec.jpg");

    rerender(
      <TimelineImageSequence
        active={false}
        images={timelineSequenceImages}
        intervalMs={5000}
      />,
    );
    act(() => vi.advanceTimersByTime(15000));
    expect(activeImage()).toContain("timeline-sequence-06-18-nite-cimatec.jpg");
  });

  it("segmenta grafemas e libera a sequência no enquadramento correto", () => {
    expect(getTimelineNarrativeGraphemes("e\u0301 ação 👨‍👩‍👧‍👦")).toEqual(
      expect.arrayContaining(["e\u0301", "👨‍👩‍👧‍👦"]),
    );
    expect(isTimelineImageSequenceReady(0.07)).toBe(false);
    expect(isTimelineImageSequenceReady(0.08)).toBe(true);
  });
});
