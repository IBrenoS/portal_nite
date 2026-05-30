import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type NiteSymbolProps = Omit<SVGProps<SVGSVGElement>, "children" | "title"> & {
  title?: string;
};

export function NiteSymbol({ className, title, ...props }: NiteSymbolProps) {
  const accessibilityProps = title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      {...accessibilityProps}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      focusable="false"
      className={cn("block h-full w-full", className)}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M32 6.75c-10.84 0-19.63 8.53-19.63 19.05 0 7.18 4.06 13.45 10.07 16.7v5.38h19.12V42.5c6.01-3.25 10.07-9.52 10.07-16.7C51.63 15.28 42.84 6.75 32 6.75Z"
        fill="currentColor"
        opacity="0.12"
        stroke="currentColor"
        strokeWidth="2.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M24.35 48.02h15.3M25.92 53.08h12.16M28.4 58h7.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.35"
        opacity="0.78"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M21.5 25.75c0-5.6 4.77-10.14 10.64-10.14 5.62 0 10.36 4.28 10.36 9.74 0 4.64-3.31 8.53-7.83 9.56v5.02h-5.34v-5.06c-4.48-1.1-7.83-4.86-7.83-9.12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
        opacity="0.86"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M31.92 15.98v8.57m0 0-5.06 3.18m5.06-3.18 5.22 3.18m-5.22-3.18v10.92m-5.06-7.74v5.05m10.28-5.05v5.05"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="31.92" cy="24.55" r="2.45" fill="currentColor" />
      <circle
        cx="26.86"
        cy="27.73"
        r="1.78"
        fill="currentColor"
        opacity="0.9"
      />
      <circle
        cx="37.14"
        cy="27.73"
        r="1.78"
        fill="currentColor"
        opacity="0.9"
      />
      <circle
        cx="26.86"
        cy="32.78"
        r="1.45"
        fill="currentColor"
        opacity="0.72"
      />
      <circle
        cx="37.14"
        cy="32.78"
        r="1.45"
        fill="currentColor"
        opacity="0.72"
      />
      <path
        d="M18.7 18.62c1.9-3.48 5.1-6.12 8.95-7.25M45.18 18.62c-1.86-3.48-5.06-6.12-8.9-7.25M18.44 34.88c1.45 2.63 3.63 4.78 6.25 6.17M45.56 34.88c-1.45 2.63-3.63 4.78-6.25 6.17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.65"
        opacity="0.42"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
