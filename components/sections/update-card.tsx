import type { Route } from "next";
import Image from "next/image";
import { CalendarDaysIcon, UserRoundIcon } from "lucide-react";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DomainCardCta,
  DomainCardMediaFallback,
  DomainCardRoot,
  MetadataPanel,
} from "@/components/ui/domain-card";

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
  const hasMetadata = Boolean(publishedAt || author);

  return (
    <DomainCardRoot component="update-card" href={href} className={className}>
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
              <MetadataPanel className="flex gap-2">
                <CalendarDaysIcon
                  className="mt-0.5 size-4 shrink-0 text-nite-brand-accent"
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
              </MetadataPanel>
            ) : null}

            {author ? (
              <MetadataPanel className="flex gap-2">
                <UserRoundIcon
                  className="mt-0.5 size-4 shrink-0 text-nite-brand-accent"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Autor
                  </dt>
                  <dd className="mt-1 leading-6 text-foreground">{author}</dd>
                </div>
              </MetadataPanel>
            ) : null}
          </dl>
        ) : null}
      </CardContent>

      {href ? (
        <CardFooter>
          <DomainCardCta>Abrir atualização</DomainCardCta>
        </CardFooter>
      ) : null}
    </DomainCardRoot>
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
          className="object-cover transition-transform duration-nite-micro ease-nite-out group-hover/card:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/12 to-transparent" />
      </div>
    );
  }

  return (
    <DomainCardMediaFallback slot="update-card-media-fallback">
      Imagem não publicada. O card permanece sem mídia até haver arquivo
      autorizado.
    </DomainCardMediaFallback>
  );
}

export { UpdateCard, updateCategoryLabels };
export type {
  UpdateCardCategory,
  UpdateCardHeadingLevel,
  UpdateCardImage,
  UpdateCardProps,
};
