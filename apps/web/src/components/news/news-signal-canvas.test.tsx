import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  advanceSignalDust,
  advanceSignalMotion,
  createSignalDust,
  createSignalMotionProfiles,
  createSignalOrbitLayout,
  getSignalPoint,
  NewsSignalCanvas,
} from "@/components/news/news-signal-canvas";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("NewsSignalCanvas geometry", () => {
  it("uses the reference center and exact ten-radius sequence at every viewport", () => {
    const desktop = createSignalOrbitLayout(1920, 958);
    const mobile = createSignalOrbitLayout(390, 844);
    const expectedRadii = [
      150, 277.5, 417.75, 572.025, 741.7275, 928.40025, 1133.740275,
      1359.6143025, 1608.07573275, 1881.383306025,
    ];

    expect(desktop).toHaveLength(10);
    expect(desktop.map((orbit) => orbit.radius)).toEqual(expectedRadii);
    expect(
      desktop.map(({ centerX, centerY, pulseCount }) => ({
        centerX,
        centerY,
        pulseCount,
      })),
    ).toEqual(
      expectedRadii.map(() => ({
        centerX: 960,
        centerY: 1197.5,
        pulseCount: 1,
      })),
    );
    expect(mobile).toHaveLength(10);
    expect(mobile.map((orbit) => orbit.radius)).toEqual(expectedRadii);
    expect(mobile[0]).toMatchObject({ centerX: 195, centerY: 1055 });
  });

  it("draws circular rather than elliptical trajectories", () => {
    const [orbit] = createSignalOrbitLayout(1920, 958);
    const left = getSignalPoint(orbit, 0);
    const quarter = getSignalPoint(orbit, 0.25);
    const apex = getSignalPoint(orbit, 0.5);

    expect(orbit.radius).toBe(150);
    expect(left).toEqual({ x: 810, y: 1197.5 });
    expect(
      Math.hypot(quarter.x - orbit.centerX, quarter.y - orbit.centerY),
    ).toBeCloseTo(150, 10);
    expect(apex.x).toBeCloseTo(960, 10);
    expect(apex.y).toBeCloseTo(1047.5, 10);
  });

  it("places five primary orbit apices before the overlapping card at 1920x958", () => {
    const logicalViewportHeight = 958;
    const stageHeight = 898;
    const cardTopWithinStage = stageHeight - 140;
    const visualScale = stageHeight / logicalViewportHeight;
    const visibleApices = createSignalOrbitLayout(1920, logicalViewportHeight)
      .map((orbit) => getSignalPoint(orbit, 0.5).y * visualScale)
      .filter((apexY) => apexY >= 0 && apexY < cardTopWithinStage);

    expect(visibleApices).toHaveLength(5);
  });

  it("creates deterministic static dust within the visible canvas", () => {
    const first = createSignalDust(1440, 900, 88);
    const second = createSignalDust(1440, 900, 88);

    expect(first).toEqual(second);
    expect(first).toHaveLength(88);
    expect(
      first.every(
        (point) =>
          point.x >= 0 && point.x <= 1440 && point.y >= 0 && point.y <= 900,
      ),
    ).toBe(true);
  });

  it("assigns varied session-seeded speeds without fixed orbit roles", () => {
    const orbits = createSignalOrbitLayout(1440, 900);
    const firstSession = createSignalMotionProfiles(orbits, 1_234);
    const secondSession = createSignalMotionProfiles(orbits, 9_876);

    expect(firstSession).toHaveLength(10);
    expect(
      new Set(firstSession.map((profile) => profile.currentSpeed.toFixed(2)))
        .size,
    ).toBeGreaterThanOrEqual(4);
    expect(
      firstSession.every(
        (profile) =>
          profile.currentSpeed >= 0.65 && profile.currentSpeed <= 1.45,
      ),
    ).toBe(true);
    expect(firstSession.map((profile) => profile.currentSpeed)).not.toEqual(
      secondSession.map((profile) => profile.currentSpeed),
    );
  });

  it("eases a comet toward a new bounded speed instead of jumping", () => {
    const [profile] = createSignalMotionProfiles(
      createSignalOrbitLayout(1440, 900),
      7_654,
    );
    const initialProgress = profile.progress;

    profile.currentSpeed = 1;
    profile.targetSpeed = 1;
    profile.nextSpeedChangeMs = 0;
    advanceSignalMotion(profile, 100, 1_000);

    expect(profile.targetSpeed).toBeGreaterThanOrEqual(0.65);
    expect(profile.targetSpeed).toBeLessThanOrEqual(1.45);
    expect(profile.targetSpeed).not.toBe(1);
    expect(profile.currentSpeed).not.toBe(profile.targetSpeed);
    expect(profile.progress).not.toBe(initialProgress);
    expect(profile.nextSpeedChangeMs).toBeGreaterThanOrEqual(4_500);
    expect(profile.nextSpeedChangeMs).toBeLessThanOrEqual(10_000);
  });

  it("relocates dust only after it has faded out", () => {
    const [point] = createSignalDust(1440, 900, 1);
    const initialPosition = { x: point.x, y: point.y };

    point.phase = "fading-out";
    point.alpha = 0.2;
    point.fadeDurationMs = 1_000;
    advanceSignalDust([point], 1440, 900, 100, 500);
    expect({ x: point.x, y: point.y }).toEqual(initialPosition);

    advanceSignalDust([point], 1440, 900, 1_000, 1_500);
    expect({ x: point.x, y: point.y }).not.toEqual(initialPosition);
    expect(point.phase).toBe("fading-in");
    expect(point.alpha).toBe(0);
  });

  it("keeps the decorative layer inert when the 2d context is unavailable", async () => {
    vi.spyOn(Navigator.prototype, "userAgent", "get").mockReturnValue(
      "Mozilla/5.0",
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    render(<NewsSignalCanvas />);

    const signalLayer = screen.getByTestId("news-signal-canvas");
    await waitFor(() =>
      expect(signalLayer).toHaveAttribute(
        "data-news-signal-motion",
        "unavailable",
      ),
    );
    expect(signalLayer).toHaveAttribute("aria-hidden", "true");
    expect(signalLayer).toHaveClass("pointer-events-none");
  });
});
