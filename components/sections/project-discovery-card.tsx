"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ImageOffIcon } from "lucide-react";

import {
  StatusBadge,
  type StatusBadgeStatus,
} from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

type ProjectDiscoveryStatus = Extract<
  StatusBadgeStatus,
  "draft" | "in_progress" | "validated" | "done" | "archived"
>;

type ProjectDiscoveryCover = {
  alt: string;
  src: string;
};

type ProjectDiscoveryCardItem = {
  href: Route;
  title: string;
  summary: string;
  category: string;
  status: ProjectDiscoveryStatus;
  statusLabel: string;
  stack: readonly string[];
  cover?: ProjectDiscoveryCover;
};

type ProjectDiscoveryCardProps = {
  item: ProjectDiscoveryCardItem;
  onNavigate?: () => void;
  relatedImageFadeClassName?: string;
  variant: "catalog" | "related";
};

function ProjectDiscoveryCard({
  item,
  onNavigate,
  relatedImageFadeClassName,
  variant,
}: ProjectDiscoveryCardProps) {
  const isRelated = variant === "related";
  const visibleStack = item.stack.slice(0, 3);

  return (
    <Link
      href={item.href}
      data-card-family="project-discovery"
      data-card-variant={variant}
      data-component={
        variant === "catalog"
          ? "project-explorer-card"
          : "project-discovery-card"
      }
      data-project-status={item.status}
      draggable={isRelated ? false : undefined}
      onClick={onNavigate}
      onDragStart={isRelated ? (event) => event.preventDefault() : undefined}
      className={cn(
        "group/card flex text-left outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        variant === "catalog" &&
          "min-h-full flex-col overflow-hidden rounded-2xl border border-nite-border-subtle bg-transparent transition-[background-color,border-color,box-shadow] duration-nite-micro ease-nite-out hover:border-nite-border-hover hover:bg-nite-surface-subtle/55 hover:shadow-nite-lift focus-visible:border-ring motion-reduce:transition-none",
        isRelated &&
          "relative z-10 h-full flex-col overflow-hidden rounded-3xl focus-visible:outline-none",
      )}
    >
      <ProjectDiscoveryVisual
        cover={item.cover}
        relatedImageFadeClassName={relatedImageFadeClassName}
        title={item.title}
        variant={variant}
      />

      <div
        data-component={isRelated ? "related-project-card-content" : undefined}
        className={cn(
          "flex-1 p-4",
          variant === "catalog" && "grid gap-4",
          isRelated && "flex flex-col gap-3",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex min-h-6 items-center rounded-full border border-nite-border-subtle px-2.5 py-1 text-xs leading-none text-nite-text-secondary",
              isRelated
                ? "bg-[var(--related-chip-background)]"
                : "bg-nite-surface-subtle",
            )}
          >
            {item.category}
          </span>
          <StatusBadge
            status={item.status}
            label={item.statusLabel}
            tone="quiet"
            showIndicator={false}
            size="sm"
          />
        </div>

        <div className="grid gap-2">
          <h3 className="overflow-hidden font-heading text-lg font-semibold leading-7 text-nite-text-primary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {item.title}
          </h3>
          <p className="overflow-hidden text-sm leading-6 text-nite-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {item.summary}
          </p>
        </div>

        {visibleStack.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {visibleStack.map((technology) => (
              <span
                key={technology}
                className="inline-flex min-h-7 items-center rounded-md border border-nite-border-subtle bg-transparent px-2.5 py-1 text-xs leading-none text-nite-text-secondary"
              >
                {technology}
              </span>
            ))}
          </div>
        ) : null}

        <span className="inline-flex min-h-9 items-center gap-2 pt-1 text-sm font-semibold text-nite-text-secondary transition-colors group-hover/card:text-nite-brand-accent group-focus-visible/card:text-nite-brand-accent motion-reduce:transition-none">
          Ver projeto
          <ArrowRightIcon
            className="size-4 transition-transform group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function ProjectDiscoveryVisual({
  cover,
  relatedImageFadeClassName,
  title,
  variant,
}: {
  cover?: ProjectDiscoveryCover;
  relatedImageFadeClassName?: string;
  title: string;
  variant: ProjectDiscoveryCardProps["variant"];
}) {
  const isRelated = variant === "related";

  if (!cover) {
    return (
      <div
        data-component={isRelated ? "related-project-card-visual" : undefined}
        className={cn(
          "relative grid place-items-center overflow-hidden bg-nite-section p-5 text-center",
          variant === "catalog" && "aspect-[16/9]",
          isRelated && "aspect-[50/27]",
        )}
      >
        <div className="grid justify-items-center gap-3">
          <span
            className="inline-flex size-10 items-center justify-center rounded-md border border-nite-border-subtle text-nite-text-muted"
            aria-hidden="true"
          >
            <ImageOffIcon className="size-5" />
          </span>
          <p className="max-w-xs text-sm leading-6 text-nite-text-secondary">
            Imagem pública indisponível para {title}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-component={isRelated ? "related-project-card-visual" : undefined}
      className={cn(
        "relative overflow-hidden bg-nite-section",
        variant === "catalog" && "aspect-[16/9]",
        isRelated && "aspect-[50/27]",
      )}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={
          variant === "catalog"
            ? "(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
            : "(max-width: 640px) 86vw, 352px"
        }
        draggable={isRelated ? false : undefined}
        className={cn(
          "object-cover transition-transform ease-nite-out motion-reduce:transition-none",
          variant === "catalog" &&
            "duration-300 group-hover/card:scale-[1.035] motion-reduce:group-hover/card:scale-100",
          isRelated &&
            "duration-nite-micro group-hover/card:scale-[1.025] group-focus-visible/card:scale-[1.025] motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-visible/card:scale-100",
        )}
      />
      {variant === "catalog" ? (
        <div
          className="absolute inset-0 hidden bg-[linear-gradient(180deg,transparent_48%,var(--nite-background)_116%)] dark:block"
          aria-hidden="true"
        />
      ) : (
        <div
          data-component="related-project-card-image-fade"
          className={cn(
            "pointer-events-none absolute inset-0",
            relatedImageFadeClassName,
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export { ProjectDiscoveryCard };
export type {
  ProjectDiscoveryCardItem,
  ProjectDiscoveryCover,
  ProjectDiscoveryStatus,
};
