import Link from "next/link";
import type { Route } from "next";

import type { Person } from "@/biblioteca/esquemas";
import { PersonAvatar } from "@/components/sections/person-avatar";

type PeopleDirectoryProps = {
  people: Person[];
};

function getPersonListName(person: Person) {
  const nameParts = person.name.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length < 2) {
    return person.name;
  }

  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
}

export function PeopleDirectory({ people }: PeopleDirectoryProps) {
  if (people.length === 0) {
    return (
      <section className="pb-20 sm:pb-28" aria-labelledby="pessoas-vazio">
        <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 text-center sm:px-8">
          <div
            className="rounded-lg border border-border bg-nite-surface-subtle p-6 sm:p-8"
            data-component="people-empty-state"
            data-status="empty"
          >
            <h2
              id="pessoas-vazio"
              className="font-heading text-2xl font-semibold text-foreground"
            >
              Nenhuma pessoa autorizada para publicação está disponível no
              momento.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Nomes, fotos, perfis, depoimentos e registros pessoais só serão
              exibidos depois de validação editorial e autorização explícita.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="pessoas-lista">
      <h2 id="pessoas-lista" className="sr-only">
        Pessoas publicadas
      </h2>
      <ul
        className="relative mx-auto grid h-min w-full max-w-[37rem] grid-cols-3 justify-items-center gap-x-3 gap-y-10 overflow-visible px-4 pb-12 font-resend sm:max-w-[44rem] sm:gap-x-10 sm:gap-y-16 sm:px-6 lg:max-w-[60rem] lg:grid-cols-5 lg:px-0"
        data-component="people-directory-list"
      >
        {people.map((person) => (
          <li key={person.slug}>
            <Link
              href={`/pessoas/${person.slug}` as Route}
              aria-label={[person.name, person.role, person.location]
                .filter(Boolean)
                .join(" ")}
              className="group/person relative flex w-full min-w-0 flex-col items-center justify-center gap-3 outline-offset-[0.625rem] outline-nite-border-strong transition-transform duration-[360ms] ease-nite-out will-change-transform hover:scale-[1.06] focus-visible:scale-[1.06] motion-reduce:transition-none sm:gap-4"
            >
              <PersonAvatar
                person={person}
                className="size-24 group-hover/person:border-nite-border-hover group-hover/person:brightness-110 group-focus-visible/person:border-nite-border-hover max-[559px]:size-[clamp(3rem,15vw,6rem)] sm:size-36"
                imageSizes="(min-width: 640px) 9rem, 6rem"
              />
              <span className="grid w-full min-w-0 max-w-full gap-1 text-center">
                <span className="text-sm font-semibold text-foreground transition-colors duration-300">
                  {getPersonListName(person)}
                </span>
                {person.location ? (
                  <span className="mx-auto max-w-[80%] text-[0.8125rem] text-muted-foreground">
                    {person.location}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
