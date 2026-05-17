import { cn } from "@/lib/utils";

type UnijorgeBrandTextProps = {
  className?: string;
};

export function UnijorgeBrandText({ className }: UnijorgeBrandTextProps) {
  return (
    <span
      className={cn(
        "unijorge-lit inline-flex items-baseline whitespace-nowrap",
        className,
      )}
      aria-label="UNIJORGE"
    >
      <span
        className="unijorge-lit-word unijorge-lit-word-red"
        aria-hidden="true"
      >
        UNI
      </span>
      <span
        className="unijorge-lit-word unijorge-lit-word-blue"
        aria-hidden="true"
      >
        JORGE
      </span>
    </span>
  );
}
