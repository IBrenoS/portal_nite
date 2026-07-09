"use client";

import Link from "next/link";
import type { Route } from "next";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Person } from "@/biblioteca/esquemas";
import { PersonAvatar } from "@/components/sections/person-avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PeopleSearchDialogProps = {
  people: Person[];
  className?: string;
};

export function PeopleSearchDialog({
  people,
  className,
}: PeopleSearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (event.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    if (!normalizedQuery) {
      return people;
    }

    return people.filter((person) =>
      [person.name, person.role, person.location ?? "", person.summary]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery),
    );
  }, [people, query]);

  return (
    <>
      <button
        type="button"
        aria-label="Buscar pessoas"
        className={cn(
          buttonVariants({ variant: "quiet", size: "md" }),
          "h-10 w-[200px] justify-between gap-0 rounded-[1rem] px-3 py-0 font-normal",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <SearchIcon aria-hidden="true" className="size-[18px] shrink-0" />
          <span className="truncate">Buscar…</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1">
          <kbd className="inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md border-0 bg-nite-surface-subtle px-1 font-sans text-xs font-normal text-muted-foreground">
            Ctrl
          </kbd>
          <kbd className="inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md border-0 bg-nite-surface-subtle px-1 font-sans text-xs font-normal text-muted-foreground">
            K
          </kbd>
        </span>
      </button>

      {isOpen ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-[1000] bg-background/95 transition-opacity duration-200 ease-out"
            data-people-search-overlay=""
            onClick={closeDialog}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar pessoas"
            className="fixed left-1/2 top-0 z-[1000] max-h-[90vh] w-full max-w-[660px] -translate-x-1/2 translate-y-[25vh] overflow-y-auto rounded-[1.3rem] border border-border bg-background p-0 text-foreground shadow-none focus-visible:outline-none"
          >
            <div
              className="mt-1 flex h-[49px] items-center justify-between border-b border-border px-5 py-1"
              data-people-search-input-wrapper=""
            >
              <div className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  aria-label="Fechar busca"
                  className="cursor-pointer p-0 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={closeDialog}
                >
                  <kbd className="inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md bg-nite-surface-subtle px-1 font-sans text-xs font-normal text-muted-foreground">
                    <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
                  </kbd>
                </button>
                <label htmlFor="people-search-input" className="sr-only">
                  Buscar pessoas
                </label>
                <input
                  ref={inputRef}
                  id="people-search-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Procurando pessoas..."
                  autoFocus
                  aria-autocomplete="list"
                  aria-controls="people-search-list"
                  aria-expanded="true"
                  role="combobox"
                  className="min-h-8 w-full rounded-md bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <kbd className="inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md bg-nite-surface-subtle px-1 font-sans text-xs font-normal text-muted-foreground">
                Esc
              </kbd>
            </div>

            <div
              id="people-search-list"
              className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1.5 scroll-p-2.5"
              data-people-search-list=""
              role="listbox"
              aria-label="Sugestões"
            >
              <div
                aria-hidden="true"
                className="flex min-h-7 select-none items-end px-3 pr-4 text-xs text-muted-foreground"
                data-people-search-group-heading=""
              >
                Pessoas
              </div>
              {filteredPeople.length > 0 ? (
                <ul className="grid gap-1">
                  {filteredPeople.map((person, index) => (
                    <li key={person.slug}>
                      <Link
                        href={`/pessoas/${person.slug}` as Route}
                        className={cn(
                          "relative mx-1 my-1 flex min-h-8 items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-nite-surface-subtle hover:text-foreground focus-visible:bg-nite-surface-subtle focus-visible:text-foreground",
                          index === 0 && "bg-nite-surface text-foreground",
                        )}
                        onClick={closeDialog}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <PersonAvatar
                            person={person}
                            className="size-6 text-xs"
                            imageSizes="1.5rem"
                          />
                          <span className="truncate text-sm font-normal text-muted-foreground transition-colors">
                            {person.name}
                          </span>
                        </span>
                        <span className="shrink-0 truncate text-right text-xs font-normal text-muted-foreground">
                          {person.role}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mx-1 my-1 rounded-xl px-3 py-2 text-sm leading-6 text-muted-foreground">
                  {people.length === 0
                    ? "Ainda nao ha pessoas publicadas para buscar."
                    : "Nenhuma pessoa publicada corresponde a essa busca."}
                </p>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
