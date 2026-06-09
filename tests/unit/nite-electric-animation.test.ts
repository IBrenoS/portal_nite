import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { getBrainElectricityLoopTargetSets } from "@/components/ui/use-nite-electric-animation";

const createTargets = (count: number, prefix: string) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
  })) as SVGGraphicsElement[];

describe("NITE electric animation brain loop", () => {
  it("uses all brain electricity targets on desktop", () => {
    const targetSets = getBrainElectricityLoopTargetSets({
      isCompactViewport: false,
      energyRoutePrimaryPaths: createTargets(4, "primary"),
      energyRouteSecondaryPaths: createTargets(4, "secondary"),
      energyRouteMicroPaths: createTargets(3, "micro"),
      electricArcJumpPaths: createTargets(2, "jump"),
      electricArcBranchPaths: createTargets(1, "branch"),
      electricArcMicroPaths: createTargets(1, "arc-micro"),
      sparkHeads: createTargets(14, "spark"),
    });

    expect(targetSets.primaryRoutePaths).toHaveLength(4);
    expect(targetSets.secondaryRoutePaths).toHaveLength(4);
    expect(targetSets.microRoutePaths).toHaveLength(3);
    expect(targetSets.jumpArcPaths).toHaveLength(2);
    expect(targetSets.branchArcPaths).toHaveLength(1);
    expect(targetSets.microArcPaths).toHaveLength(1);
    expect(targetSets.sparkHeads).toHaveLength(14);
    expect(targetSets.routePaths).toHaveLength(11);
    expect(targetSets.arcPaths).toHaveLength(4);
  });

  it("limits secondary routes, micro routes, arcs, and spark heads on compact viewports", () => {
    const targetSets = getBrainElectricityLoopTargetSets({
      isCompactViewport: true,
      energyRoutePrimaryPaths: createTargets(4, "primary"),
      energyRouteSecondaryPaths: createTargets(4, "secondary"),
      energyRouteMicroPaths: createTargets(3, "micro"),
      electricArcJumpPaths: createTargets(2, "jump"),
      electricArcBranchPaths: createTargets(2, "branch"),
      electricArcMicroPaths: createTargets(2, "arc-micro"),
      sparkHeads: createTargets(14, "spark"),
    });

    expect(targetSets.primaryRoutePaths).toHaveLength(4);
    expect(targetSets.secondaryRoutePaths).toHaveLength(3);
    expect(targetSets.microRoutePaths).toHaveLength(2);
    expect(targetSets.jumpArcPaths).toHaveLength(1);
    expect(targetSets.branchArcPaths).toHaveLength(1);
    expect(targetSets.microArcPaths).toHaveLength(1);
    expect(targetSets.sparkHeads.map((spark) => spark.id)).toEqual([
      "spark-1",
      "spark-3",
      "spark-6",
      "spark-9",
      "spark-14",
    ]);
  });

  it("keeps loop dash setup dynamic instead of hard-coding a path length", () => {
    const source = readFileSync(
      join(process.cwd(), "components/ui/use-nite-electric-animation.ts"),
      "utf8",
    );

    expect(source).not.toContain("strokeDasharray: 1200");
    expect(source).not.toContain("strokeDashoffset: 1200");
  });
});
