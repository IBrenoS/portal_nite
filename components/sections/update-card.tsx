import type { Route } from "next";
import Image from "next/image";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ImageOffIcon,
  UserRoundIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type UpdateCardCategory =
  | "bastidores"
  | "evento"
  | "oficina"
  | "projeto"
  | "comunidade"
  | "marco"
  | "oportunidade"
  | "registro";

type UpdateCardHeadingLevel = "h2" | "h3" | "h4";

type UpdateCardImage = {
  src: string;
  alt: string;
};

type UpdateCardProps = {
  title: string;
  summary: string;
  category?: UpdateCardCategory;
  publishedAt?: string;
  author?: string;
  image?: UpdateCardImage;
  href?: Route | string;
  headingLevel?: UpdateCardHeadingLevel;
  className?: string;
};

const updateCategoryLabels = {
  bastidores: "Bastidores",
  evento: "Evento",
  oficina: "Oficina",
  projeto: "Projeto",
  comunidade: "Comunidade",
  marco: "Marco institucional",
  oportunidade: "Oportunidade",
  registro: "Registro",
} satisfies Record<UpdateCardCategory, string>;

function UpdateCard({
  title,
  summary,
  category,
  publishedAt,
  author,
  image,
  href,
  headingLevel = "h3",
  className,
}: UpdateCardProps) {
  const Heading = headingLevel;
  const CardRoot = href ? LinkedUpdateCardRoot : StaticUpdateCardRoot;
  const hasMetadata = Boolean(publishedAt || author);

  return (
    <CardRoot href={href} className={className}>
      <UpdateCardMedia image={image} />

      <CardHeader className="gap-3">
        {category ? (
          <span
            data-slot="update-card-category"
            className="w-fit rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            {updateCategoryLabels[category]}
          </span>
        ) : null}

        <CardTitle>
          <Heading className="font-heading text-xl font-semibold leading-snug text-foreground">
            {title}
          </Heading>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid flex-1 gap-4">
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>

        {hasMetadata ? (
          <dl className="grid gap-2 text-sm">
            {publishedAt ? (
              <div className="flex gap-2 rounded-lg border border-border bg-background/42 p-3">
                <CalendarDaysIcon
                  className="mt-0.5 size-4 shrink-0 text-brand-circuit-bright"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Data
                  </dt>
                  <dd className="mt-1 leading-6 text-foreground">
                    {publishedAt}
                  </dd>
                </div>
              </div>
            ) : null}

            {author ? (
              <div className="flex gap-2 rounded-lg border border-border bg-background/42 p-3">
                <UserRoundIcon
                  className="mt-0.5 size-4 shrink-0 text-brand-circuit-bright"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Autor
                  </dt>
                  <dd className="mt-1 leading-6 text-foreground">{author}</dd>
                </div>
              </div>
            ) : null}
          </dl>
        ) : null}
      </CardContent>

      {href ? (
        <CardFooter>
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-circuit-bright transition-colors group-hover/card:text-foreground">
            Abrir atualização
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </span>
        </CardFooter>
      ) : null}
    </CardRoot>
  );
}

function LinkedUpdateCardRoot({
  href,
  className,
  children,
}: {
  href?: Route | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      as="a"
      href={href ?? "#"}
      variant="interactive"
      data-component="update-card"
      className={cn("min-h-full rounded-lg py-0", className)}
    >
      {children}
    </Card>
  );
}

function StaticUpdateCardRoot({
  className,
  children,
}: {
  href?: Route | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      data-component="update-card"
      className={cn("min-h-full rounded-lg py-0", className)}
    >
      {children}
    </Card>
  );
}

function UpdateCardMedia({ image }: { image?: UpdateCardImage }) {
  if (image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-brand-micro ease-brand-out group-hover/card:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/12 to-transparent" />
      </div>
    );
  }

  return (
    <div
      data-slot="update-card-media-fallback"
      className="grid aspect-[16/9] place-items-center border-b border-border bg-muted/70 p-5 text-center"
    >
      <div className="grid justify-items-center gap-3">
        <span
          className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
          aria-hidden="true"
        >
          <ImageOffIcon className="size-5" />
        </span>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          Imagem não publicada. O card permanece sem mídia até haver arquivo
          autorizado.
        </p>
      </div>
    </div>
  );
}

export { UpdateCard, updateCategoryLabels };
export type {
  UpdateCardCategory,
  UpdateCardHeadingLevel,
  UpdateCardImage,
  UpdateCardProps,
};
