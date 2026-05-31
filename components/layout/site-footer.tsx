import { headerNavigationGroups } from "@/biblioteca/navigation";
import { siteConfig } from "@/biblioteca/site-config";
import { UnijorgeBrandText } from "@/components/ui/unijorge-brand-text";
import { cn } from "@/lib/utils";

const currentYear = 2026;

const instagramChannel = siteConfig.publicChannels.find(
  (channel) => channel.label === "Instagram",
);

const footerNavigationGroups = headerNavigationGroups.map((group) => ({
  id: group.id,
  label: group.label,
  items: group.items.filter((item) => item.status === "mvp" && !item.external),
}));

type SiteFooterProps = {
  className?: string;
  variant?: "plain" | "wordmark";
};

export function SiteFooter({
  className,
  variant = "plain",
}: SiteFooterProps = {}) {
  const hasWordmarkTransition = variant === "wordmark";

  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-background",
        hasWordmarkTransition &&
          "z-20 border-t border-nite-border-subtle sm:-mt-[7vh]",
        className,
      )}
      data-footer-variant={variant}
      data-surface="clean"
    >
      {hasWordmarkTransition ? (
        <>
          <div
            aria-hidden="true"
            className="nite-footer-transition-divider pointer-events-none absolute left-1/2 top-0 h-px w-[40%] max-w-full -translate-x-1/2 -translate-y-1/2"
            data-footer-transition-divider=""
          />
          <div
            aria-hidden="true"
            className="nite-footer-transition-glow pointer-events-none absolute -top-1 left-1/2 h-[100px] w-[70%] max-w-full -translate-x-1/2 -translate-y-1/2 md:h-[300px]"
            data-footer-transition-glow=""
          />
        </>
      ) : null}

      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-36 text-sm text-muted-foreground md:max-w-7xl md:min-h-[39.75rem] md:flex-row md:gap-8">
        <div className="flex min-w-48 flex-col items-start justify-start gap-8 md:min-w-[18.75rem]">
          <UnijorgeBrandText className="text-sm font-semibold uppercase tracking-[0.18em]" />

          {instagramChannel ? (
            <nav aria-label="Redes sociais">
              <a
                href={instagramChannel.href}
                aria-label={instagramChannel.ariaLabel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-nite-border-soft text-nite-text-secondary transition-colors hover:border-nite-border-hover hover:text-nite-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <InstagramIcon className="size-4" />
              </a>
            </nav>
          ) : null}

          <p className="text-xs">© {currentYear} NITE UNIJORGE.</p>
        </div>

        <nav
          aria-label="Navegação institucional do rodapé"
          className="grid w-full grid-cols-2 gap-8 lg:grid-cols-5"
        >
          {footerNavigationGroups.map((group) => (
            <div key={group.id}>
              <p className="font-heading text-sm font-semibold text-foreground">
                {group.label}
              </p>
              <ul className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <li key={`${group.id}-${item.label}`}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}
