"use client";

import Link from "next/link";
import type { Route } from "next";
import { SearchIcon, XIcon } from "lucide-react";
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
      [person.name, person.role, person.location, person.summary]
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
          "h-10 w-[12.5rem] justify-between rounded-[1rem] px-3 font-normal",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
          <span className="truncate">Search…</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.68rem] text-muted-foreground">
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">
            Ctrl
          </kbd>
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">
            K
          </kbd>
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-start bg-background/82 px-4 py-[22svh] backdrop-blur-md sm:place-items-center sm:py-0">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar pessoas"
            className="w-full max-w-[41.25rem] overflow-hidden rounded-[1.3rem] border border-border bg-background shadow-nite-lift"
          >
            <div className="flex min-h-14 items-center gap-3 border-b border-border px-4">
              <SearchIcon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <label htmlFor="people-search-input" className="sr-only">
                Buscar pessoas
              </label>
              <input
                ref={inputRef}
                id="people-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar pessoas autorizadas..."
                autoFocus
                className="min-h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                aria-label="Fechar busca"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-nite-surface-subtle hover:text-foreground"
                onClick={closeDialog}
              >
                <XIcon aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="max-h-[22rem] overflow-y-auto p-3">
              {filteredPeople.length > 0 ? (
                <ul className="grid gap-1">
                  {filteredPeople.map((person) => (
                    <li key={person.slug}>
                      <Link
                        href={`/pessoas/${person.slug}` as Route}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-nite-surface-subtle focus-visible:bg-nite-surface-subtle"
                        onClick={closeDialog}
                      >
                        <PersonAvatar
                          person={person}
                          className="size-10 text-sm"
                        />
                        <span className="grid min-w-0 gap-0.5">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {person.name}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {person.role}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-border bg-nite-surface-subtle p-4 text-sm leading-6 text-muted-foreground">
                  {people.length === 0
                    ? "Ainda nao ha pessoas publicadas para buscar."
                    : "Nenhuma pessoa publicada corresponde a essa busca."}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
