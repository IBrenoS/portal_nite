import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  summary: string;
  category: string;
  status: string;
  href: string;
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
};

export function ProjectCard({ title, summary, category, status, href, image, className }: ProjectCardProps) {
  return (
    <Card className={cn("brand-panel rounded-lg border-border py-0", className)}>
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 480px" className="object-cover" />
        </div>
      ) : (
        <div className="brand-circuit-lines flex aspect-[16/9] items-end border-b border-border bg-muted p-4">
          <Chip variant="metal">Imagem pendente</Chip>
        </div>
      )}
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Chip>{category}</Chip>
          <Chip variant="quiet">{status}</Chip>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
      </CardContent>
      <CardFooter>
        <a
          href={href}
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground"
        >
          Ver projeto
          <ArrowRightIcon aria-hidden="true" />
        </a>
      </CardFooter>
    </Card>
  );
}
