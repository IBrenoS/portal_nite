"use client";

import { useState } from "react";
import { Share2Icon } from "lucide-react";

export type ShareArticleButtonProps = {
  title: string;
  url: string;
};

export function ShareArticleButton({ title, url }: ShareArticleButtonProps) {
  const [status, setStatus] = useState("");

  const shareArticle = async () => {
    setStatus("");

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setStatus("Link copiado");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setStatus("Não foi possível compartilhar");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={shareArticle}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-nite-border-soft px-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-nite-text-secondary outline-none transition-colors hover:border-nite-border-hover hover:bg-nite-surface-subtle hover:text-nite-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Compartilhar matéria"
      >
        Compartilhar
        <Share2Icon aria-hidden="true" className="size-4" />
      </button>
      <span
        role="status"
        aria-live="polite"
        className="text-sm text-nite-text-muted"
      >
        {status}
      </span>
    </div>
  );
}
