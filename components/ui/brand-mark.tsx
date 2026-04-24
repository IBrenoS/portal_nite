import Image from "next/image";

import { brandAssets } from "@/biblioteca/brand";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

export function BrandMark({ className, priority = false }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden rounded-full border border-brand-circuit-bright/40 bg-black shadow-[0_0_24px_rgb(51_212_255_/_0.18)]",
        className,
      )}
    >
      <Image
        src={brandAssets.logoReference}
        alt="Logo do NITE com cerebro em circuito azul e tipografia metalica."
        fill
        priority={priority}
        sizes="(max-width: 768px) 88px, 220px"
        className="object-cover object-[center_48%]"
      />
    </span>
  );
}
