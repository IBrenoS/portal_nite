export type NiteSvgContractCounts = {
  mainRise: number;
  routes: number;
  arcs: number;
  sparks: number;
  shimmer: number;
  overlays: number;
};

const REQUIRED_NITE_SVG_SELECTORS = [
  "#logo-final",
  "#nite-logo",
  "#bulb",
  "#brain",
  "#text",
  "#energy-overlay",
  "#text-shimmer-mask",
  "#spark-heads",
  "#electric-arcs",
  "#energy-routes",
  "#energy-main-rise",
] as const;

export function validateNiteSvgContract(root: SVGSVGElement | HTMLElement): NiteSvgContractCounts {
  const missing = REQUIRED_NITE_SVG_SELECTORS.filter(
    (selector) => !root.matches(selector) && !root.querySelector(selector),
  );
  const counts = {
    mainRise: root.querySelectorAll("#energy-main-rise path").length,
    routes: root.querySelectorAll("#energy-routes path").length,
    arcs: root.querySelectorAll("#electric-arcs path").length,
    sparks: root.querySelectorAll("#spark-heads circle").length,
    shimmer: root.querySelectorAll("#text-shimmer-mask path").length,
    overlays: root.querySelectorAll("#energy-overlay").length,
  };

  if (missing.length > 0) {
    throw new Error(`[NITE SVG] Missing required selectors: ${missing.join(", ")}`);
  }

  if (counts.overlays !== 1) {
    throw new Error(`[NITE SVG] Expected exactly one #energy-overlay. Found: ${counts.overlays}`);
  }

  if (counts.mainRise < 3) {
    throw new Error("[NITE SVG] Expected at least 3 bulb-to-brain energy paths.");
  }

  if (counts.routes < 8) {
    throw new Error("[NITE SVG] Expected at least 8 brain energy routes.");
  }

  if (counts.arcs < 3) {
    throw new Error("[NITE SVG] Expected at least 3 electric arc paths.");
  }

  if (counts.sparks < 8) {
    throw new Error("[NITE SVG] Expected at least 8 spark nodes.");
  }

  if (counts.shimmer < 2) {
    throw new Error("[NITE SVG] Expected at least 2 NITE shimmer paths.");
  }

  return counts;
}
