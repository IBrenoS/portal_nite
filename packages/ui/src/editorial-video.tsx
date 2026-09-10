"use client";

import type { EditorialVideoNode } from "@nite/news";
import { useEffect, useId, useRef, useState } from "react";

const autoplayBlockedMessage =
  "A reprodução automática foi bloqueada pelo seu navegador.";
const reducedMotionMessage =
  "A reprodução automática foi desativada pela preferência de movimento do seu dispositivo.";
const mediaLoadFailureMessage = "Não foi possível carregar o vídeo.";

type EditorialVideoProps = {
  attrs: EditorialVideoNode["attrs"];
};

function EditorialVideo({ attrs }: EditorialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const descriptionId = useId();
  const statusId = useId();
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const isAutoplay = attrs.playbackMode === "autoplay";

  useEffect(() => {
    if (!isAutoplay) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAutoplayEnabled(false);
      setStatusMessage(reducedMotionMessage);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    let active = true;
    setAutoplayEnabled(true);
    setStatusMessage(undefined);
    video.defaultMuted = true;
    try {
      void video.play().catch(() => {
        if (active) setStatusMessage(autoplayBlockedMessage);
      });
    } catch {
      setStatusMessage(autoplayBlockedMessage);
    }
    return () => {
      active = false;
    };
  }, [isAutoplay]);

  const describedBy = [
    attrs.description ? descriptionId : undefined,
    statusMessage ? statusId : undefined,
  ]
    .filter((id) => id !== undefined)
    .join(" ");

  return (
    <>
      <video
        ref={videoRef}
        width={attrs.width}
        height={attrs.height}
        autoPlay={isAutoplay && autoplayEnabled}
        muted={isAutoplay}
        playsInline={isAutoplay}
        loop={isAutoplay}
        controls={!isAutoplay}
        preload={isAutoplay ? "auto" : "metadata"}
        aria-describedby={describedBy || undefined}
        className="h-auto w-full rounded-lg border border-nite-border-subtle"
        onError={() => setStatusMessage(mediaLoadFailureMessage)}
      >
        <source src={attrs.src} type={attrs.mimeType} />
        {attrs.captions ? (
          <track
            kind="captions"
            src={attrs.captions.src}
            srcLang={attrs.captions.srclang}
            label={attrs.captions.label}
            default={!isAutoplay}
          />
        ) : null}
      </video>
      {attrs.description ? (
        <span id={descriptionId} className="sr-only">
          {attrs.description}
        </span>
      ) : null}
      {statusMessage ? (
        <p
          id={statusId}
          role="status"
          className="font-mono text-xs text-nite-text-muted"
        >
          {statusMessage}
        </p>
      ) : null}
    </>
  );
}

export { EditorialVideo };
