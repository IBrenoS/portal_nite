import { readFileSync } from "node:fs";
import { join } from "node:path";

import { AnimatedNiteLogoClient } from "@/components/ui/animated-nite-logo-client";

type AnimatedNiteLogoProps = {
  className?: string;
};

const logoSvg = readFileSync(join(process.cwd(), "public/brand/nite/logo_final.svg"), "utf8")
  .replace('<?xml version="1.0" encoding="UTF-8"?>', "")
  .replace('<svg id="logo-final"', '<svg id="logo-final" role="img" aria-labelledby="animated-nite-logo-title"')
  .replace(
    "<defs>",
    '<defs><style id="nite-electric-initial-state">#energy-overlay,#spark-heads circle{opacity:0}#energy-main-rise path,#energy-routes path,#electric-arcs path,#text-shimmer-mask path{opacity:0;stroke-dasharray:1200;stroke-dashoffset:1200}#spark-heads circle{transform-box:fill-box;transform-origin:center;transform:scale(0)}</style>',
  )
  .replace("<g id=\"nite-logo\">", "<title id=\"animated-nite-logo-title\">Logo do NITE</title><g id=\"nite-logo\">")
  .replace('<g id="energy-overlay"', '<g id="energy-overlay" style="opacity:0"')
  .replace('id="letter-n"', 'id="text-parte-1"')
  .replace('id="letter-i"', 'id="text-parte-2"')
  .replace('id="letter-t"', 'id="text-parte-3"')
  .replace('id="letter-n-2"', 'id="text-parte-4"');

export function AnimatedNiteLogo({ className }: AnimatedNiteLogoProps) {
  return <AnimatedNiteLogoClient className={className} svgMarkup={logoSvg} />;
}
