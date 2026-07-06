"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  CalendarIcon,
  CodeIcon,
  CoffeeIcon,
  GlobeIcon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useMemo, useState } from "react";

import type { Person, PersonEntryCategory } from "@/biblioteca/esquemas";
import { PersonAvatar } from "@/components/sections/person-avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type PersonProfileShellProps = {
  person: Person;
};

type FilterId = "todos" | PersonEntryCategory;
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type SocialProfile = {
  displayLabel: string;
  Icon: IconComponent;
};

const entryFilters = [
  { id: "todos", label: "Todos" },
  { id: "projeto", label: "Projetos" },
  { id: "atualizacao", label: "Atualizações" },
  { id: "handbook", label: "Handbook" },
  { id: "pessoal", label: "Pessoal" },
] as const satisfies Array<{ id: FilterId; label: string }>;

const entryCategoryLabels = {
  projeto: "Projeto",
  atualizacao: "Atualização",
  handbook: "Handbook",
  pessoal: "Pessoal",
} satisfies Record<PersonEntryCategory, string>;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

function GithubMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.25c-5.39 0-9.75 4.47-9.75 9.96 0 4.4 2.8 8.13 6.68 9.44.49.09.67-.22.67-.48v-1.86c-2.72.61-3.29-1.19-3.29-1.19-.45-1.15-1.09-1.46-1.09-1.46-.89-.62.07-.61.07-.61.98.07 1.5 1.03 1.5 1.03.87 1.52 2.28 1.08 2.84.83.09-.65.34-1.08.62-1.33-2.17-.25-4.45-1.11-4.45-4.95 0-1.09.38-1.99 1-2.69-.1-.25-.44-1.27.1-2.65 0 0 .82-.27 2.68 1.03A9.28 9.28 0 0 1 12 7c.83 0 1.67.11 2.44.33 1.87-1.3 2.68-1.03 2.68-1.03.54 1.38.2 2.4.1 2.65.63.7 1 1.6 1 2.69 0 3.85-2.29 4.69-4.47 4.94.35.31.67.93.67 1.87v2.72c0 .27.18.58.68.48a9.83 9.83 0 0 0 6.65-9.44c0-5.49-4.36-9.96-9.75-9.96Z" />
    </svg>
  );
}

function LinkedinMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.4v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.41h-3.4V9.51h3.26v1.5h.05a3.58 3.58 0 0 1 3.22-1.77c3.45 0 4.08 2.27 4.08 5.21v6ZM6.01 8.01a1.97 1.97 0 1 1 0-3.94 1.97 1.97 0 0 1 0 3.94Zm1.7 12.44h-3.4V9.51h3.4v10.94ZM22.15 1H1.84C1.38 1 1 1.36 1 .82v20.36c0 .46.38.82.84.82h20.31c.47 0 .85-.36.85-.82V1.82c0-.46-.38-.82-.85-.82Z" />
    </svg>
  );
}

function buildSocialProfile(link: Person["links"][number], personName: string) {
  const url = new URL(link.href);
  const hostname = url.hostname.replace(/^www\./, "");

  if (hostname === "github.com") {
    return {
      displayLabel: url.pathname.split("/").filter(Boolean)[0] ?? link.label,
      Icon: GithubMarkIcon,
    } satisfies SocialProfile;
  }

  if (hostname === "linkedin.com") {
    return {
      displayLabel: personName,
      Icon: LinkedinMarkIcon,
    } satisfies SocialProfile;
  }

  return {
    displayLabel: hostname,
    Icon: GlobeIcon,
  } satisfies SocialProfile;
}

function getTraitIcon(label: string) {
  const icons = {
    Café: CoffeeIcon,
    Leitura: BookOpenIcon,
    IA: BrainCircuitIcon,
    Programação: CodeIcon,
  } satisfies Record<string, IconComponent>;

  return icons[label as keyof typeof icons] ?? SparklesIcon;
}

export function PersonProfileShell({ person }: PersonProfileShellProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("todos");
  const profileTraits = [
    ...person.clubs.map((label) => ({ label, type: "Club" })),
    ...person.interests.map((label) => ({ label, type: "Interesse" })),
  ];
  const filteredEntries = useMemo(() => {
    if (activeFilter === "todos") {
      return person.entries;
    }

    return person.entries.filter((entry) => entry.category === activeFilter);
  }, [activeFilter, person.entries]);

  return (
    <div
      className="mb-10 grid w-full gap-12 font-resend lg:min-h-[calc(100svh+160rem)] lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-24"
      data-person-profile-shell=""
    >
      <aside className="group/person relative flex h-fit w-full flex-col lg:sticky lg:top-[4.5rem]">
        <Link
          href={"/pessoas" as Route}
          className="relative inline-flex w-fit items-center gap-1 text-sm font-normal text-muted-foreground transition-colors duration-200 ease-linear hover:text-foreground"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Todas as pessoas
        </Link>

        <PersonAvatar
          person={person}
          className="mt-[1.0625rem] size-24 text-3xl lg:size-[7.375rem]"
          imageSizes="7.375rem"
        />

        <div className="mt-4 grid gap-2">
          <h1 className="font-resend text-[2.25rem] font-normal leading-[1.3] tracking-normal text-foreground">
            {person.name}
          </h1>
          <p className="text-sm font-semibold leading-5 text-foreground">
            {person.role}
          </p>
        </div>

        <dl
          className="mt-4 flex w-full flex-col gap-2 text-[0.8125rem] leading-[1.160714rem] text-muted-foreground"
          data-person-profile-meta=""
        >
          {person.location ? (
            <div className="relative flex w-full items-center justify-start gap-2">
              <MapPinIcon aria-hidden="true" className="size-4 shrink-0" />
              <dt className="sr-only">Localização</dt>
              <dd>{person.location}</dd>
            </div>
          ) : null}
          {person.links.map((link) => {
            const { displayLabel, Icon } = buildSocialProfile(
              link,
              person.name,
            );

            return (
              <div
                key={link.href}
                className="relative flex w-full items-center justify-start gap-2"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <dt className="sr-only">{link.label}</dt>
              <dd>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors duration-200 ease-linear hover:text-foreground"
                >
                  {displayLabel}
                </a>
              </dd>
            </div>
            );
          })}
        </dl>

        {profileTraits.length > 0 ? (
          <div className="mt-5 flex w-full flex-col gap-5 border-t border-border pt-5 text-sm leading-5 text-muted-foreground">
            <p>Clubs</p>
            <ul className="relative flex w-full flex-wrap justify-start gap-2">
              {profileTraits.map((trait) => {
                const Icon = getTraitIcon(trait.label);

                return (
                  <li
                    key={`${trait.type}-${trait.label}`}
                    aria-label={`${trait.type}: ${trait.label}`}
                    className="group/club-item relative flex size-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-nite-surface-subtle p-4 text-muted-foreground transition-colors duration-200 ease-linear hover:border-nite-border-hover hover:text-foreground"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-full transition-transform duration-200 ease-nite-out group-hover/club-item:-rotate-6"
                      strokeWidth={1.75}
                    />
                    <span className="sr-only">{trait.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </aside>

      <section
        className="flex min-w-0 flex-col lg:pt-10"
        aria-labelledby="registros-pessoa"
      >
        <h2 id="registros-pessoa" className="sr-only">
          Registros relacionados
        </h2>
        <div className="mb-10 flex flex-wrap gap-2">
          {entryFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                data-active={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-10 min-w-[2.625rem] items-center justify-center rounded-full border border-border px-3 py-1 text-sm font-semibold leading-6 transition-colors duration-300 ease-nite-out",
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-nite-surface-subtle text-foreground hover:bg-nite-surface-focus",
                )}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredEntries.length > 0 ? (
          <ul className="relative grid h-auto min-h-max grid-cols-1 gap-8 transition-all duration-500 ease-nite-out xl:grid-cols-2 xl:gap-y-16">
            {filteredEntries.map((entry) => (
              <li key={`${entry.category}-${entry.title}-${entry.date}`}>
                <a
                  href={entry.href ?? "#registros-pessoa"}
                  target={entry.href ? "_blank" : undefined}
                  rel={entry.href ? "noreferrer" : undefined}
                  className="group/entry flex h-full flex-col items-stretch gap-4 rounded-sm pb-2 text-sm text-muted-foreground outline-offset-[0.625rem] outline-nite-border-strong transition-[transform,opacity] duration-[360ms] ease-nite-out hover:-translate-y-1 focus-visible:-translate-y-1 motion-reduce:transition-none"
                >
                  <span className="relative block aspect-[1.9] overflow-hidden border border-border bg-nite-surface-subtle">
                    {entry.image ? (
                      <Image
                        src={entry.image.src}
                        alt={entry.image.alt}
                        fill
                        sizes="(min-width: 1024px) 26rem, 100vw"
                        className="object-cover transition duration-300 ease-nite-out group-hover/entry:scale-[1.03]"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center px-5 text-center font-heading text-xl text-muted-foreground">
                        {entry.title}
                      </span>
                    )}
                  </span>

                  <span className="grid gap-1">
                    <span className="text-xs font-medium text-nite-brand-accent">
                      {entryCategoryLabels[entry.category]}
                    </span>
                    <span className="font-semibold text-foreground">
                      {entry.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarIcon aria-hidden="true" className="size-3.5" />
                      {formatDate(entry.date)}
                    </span>
                    <span className="leading-6">{entry.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            className="max-w-[26.5rem]"
            title="Nenhum registro publicado neste filtro."
            description="Registros pessoais, projetos e atualizações só aparecerão aqui depois de validação editorial e autorização pública."
          />
        )}
      </section>
    </div>
  );
}
