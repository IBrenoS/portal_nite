import Image from "next/image";

import type { Person } from "@/biblioteca/esquemas";
import { cn } from "@/lib/utils";

type PersonAvatarProps = {
  person: Pick<Person, "avatar" | "initials" | "name">;
  className?: string;
  imageSizes?: string;
};

function buildInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PersonAvatar({
  person,
  className,
  imageSizes = "9rem",
}: PersonAvatarProps) {
  const initials = person.initials ?? buildInitials(person.name);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-nite-border-subtle bg-nite-surface-subtle font-heading text-2xl font-semibold text-foreground transition-[border,transform,filter] duration-200 ease-nite-out",
        className,
      )}
    >
      {person.avatar ? (
        <Image
          src={person.avatar.src}
          alt={person.avatar.alt}
          fill
          sizes={imageSizes}
          className="object-cover object-center"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
