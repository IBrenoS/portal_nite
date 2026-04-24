import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  summary: string;
  category: string;
  href: string;
  year?: number;
  technologies?: readonly string[];
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
};

export function ProjectCard({
  title,
  summary,
  category,
  href,
  year,
  technologies = [],
  image,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("brand-panel overflow-hidden rounded-lg border-border py-0", className)}>
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-transparent to-transparent" />
          {year ? (
            <Chip variant="metal" className="absolute bottom-3 left-3">
              {year}
            </Chip>
          ) : null}
        </div>
      ) : (
        <div className="brand-circuit-lines flex aspect-[16/9] items-end border-b border-border bg-muted p-4">
          <Chip variant="metal">Projeto NITE</Chip>
        </div>
      )}
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Chip>{category}</Chip>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
        {technologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((technology) => (
              <Chip key={technology} variant="metal">
                {technology}
              </Chip>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Link
          href={href as Route}
          aria-label={`Ver projeto: ${title}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-brand-circuit-bright transition-colors hover:text-foreground"
        >
          Ver projeto
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
