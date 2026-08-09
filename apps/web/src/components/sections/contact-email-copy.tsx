"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ContactEmailCopyProps = {
  titleId: string;
  label: string;
  email: string;
};

async function copyTextToClipboard(text: string) {
  const clipboard =
    typeof navigator === "undefined" ? undefined : navigator.clipboard;

  if (clipboard?.writeText) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to the selection API below when clipboard permissions fail.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.className = "fixed left-[-9999px] top-0";
  document.body.append(textarea);
  textarea.select();
  const didCopy = document.execCommand("copy");
  textarea.remove();

  return didCopy;
}

export function ContactEmailCopy({
  titleId,
  label,
  email,
}: ContactEmailCopyProps) {
  const [copied, setCopied] = useState(false);
  const [isRowActive, setIsRowActive] = useState(false);
  const isCopyActionVisible = isRowActive || copied;

  return (
    <div className="mb-8">
      <p
        id={titleId}
        className="mb-1 text-sm font-normal leading-5 text-nite-text-secondary"
      >
        {label}
      </p>

      <p
        className="group flex items-center text-sm font-normal leading-6 text-nite-text-primary"
        onBlurCapture={() => setIsRowActive(false)}
        onFocusCapture={() => setIsRowActive(true)}
        onMouseEnter={() => setIsRowActive(true)}
        onMouseLeave={() => setIsRowActive(false)}
      >
        <span className="mr-1">{email}</span>
        <button
          type="button"
          aria-label="Copy to clipboard"
          className={cn(
            "inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-transparent text-nite-text-secondary opacity-100 outline-none transition duration-150 ease-out hover:border-nite-border-soft hover:bg-nite-surface hover:text-nite-text-primary focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-nite-focus group-hover:opacity-100 sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100",
            isCopyActionVisible && "sm:opacity-100",
          )}
          onClick={async () => {
            const didCopy = await copyTextToClipboard(email);

            if (!didCopy) {
              return;
            }

            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
        >
          {copied ? (
            <CheckIcon aria-hidden="true" className="size-4" />
          ) : (
            <CopyIcon aria-hidden="true" className="size-4" />
          )}
        </button>
      </p>

      <span aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado." : ""}
      </span>
    </div>
  );
}
