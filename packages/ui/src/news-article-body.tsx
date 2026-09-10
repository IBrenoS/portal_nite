import type {
  EditorialContentNode,
  EditorialDocument,
  EditorialTextNode,
} from "@nite/news";
import { isAllowedEditorialLink } from "@nite/news";
import type { ReactNode } from "react";

import { EditorialVideo } from "./editorial-video";

type NewsArticleBodyProps = {
  document: EditorialDocument;
  className?: string;
};

const editorialLayoutClassNames = {
  normal: "w-full",
  wide: "relative left-1/2 w-[min(calc(100vw-2rem),64rem)] -translate-x-1/2 sm:w-[min(calc(100vw-4rem),64rem)]",
  full: "relative left-1/2 w-[min(calc(100vw-2rem),80rem)] -translate-x-1/2 sm:w-[min(calc(100vw-4rem),80rem)]",
} as const;

function renderText(node: EditorialTextNode, key: string): ReactNode {
  let result: ReactNode = node.text;
  for (const [index, mark] of (node.marks ?? []).entries()) {
    const markKey = `${key}-mark-${index}`;
    if (mark.type === "bold") result = <strong key={markKey}>{result}</strong>;
    if (mark.type === "italic") result = <em key={markKey}>{result}</em>;
    if (mark.type === "link" && isAllowedEditorialLink(mark.attrs.href)) {
      result = (
        <a
          key={markKey}
          href={mark.attrs.href}
          rel={
            mark.attrs.href.startsWith("/") ||
            mark.attrs.href.startsWith("mailto:")
              ? undefined
              : "noopener noreferrer"
          }
        >
          {result}
        </a>
      );
    }
  }
  return result;
}

function renderNodes(
  nodes: readonly EditorialContentNode[],
  prefix: string,
): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${prefix}-${index}`;
    if (node.type === "paragraph")
      return (
        <p key={key}>
          {node.content.map((text, textIndex) =>
            renderText(text, `${key}-${textIndex}`),
          )}
        </p>
      );
    if (node.type === "heading") {
      const content = node.content.map((text, textIndex) =>
        renderText(text, `${key}-${textIndex}`),
      );
      return node.attrs.level === 2 ? (
        <h2
          key={key}
          className="pt-5 font-heading text-2xl leading-tight font-semibold text-nite-text-primary sm:text-3xl"
        >
          {content}
        </h2>
      ) : (
        <h3
          key={key}
          className="pt-3 font-heading text-xl leading-tight font-semibold text-nite-text-primary sm:text-2xl"
        >
          {content}
        </h3>
      );
    }
    if (node.type === "blockquote")
      return (
        <blockquote
          key={key}
          className="my-3 border-l-2 border-nite-brand-accent py-2 pl-6 font-heading text-xl leading-8 font-medium text-nite-text-primary sm:pl-8 sm:text-2xl sm:leading-9"
        >
          {renderNodes(node.content, key)}
        </blockquote>
      );
    if (node.type === "bulletList" || node.type === "orderedList") {
      const items = node.content.map((item, itemIndex) => (
        <li key={`${key}-${itemIndex}`}>
          {renderNodes(item.content, `${key}-${itemIndex}`)}
        </li>
      ));
      return node.type === "bulletList" ? (
        <ul key={key} className="grid list-disc gap-3 pl-6">
          {items}
        </ul>
      ) : (
        <ol key={key} className="grid list-decimal gap-3 pl-6">
          {items}
        </ol>
      );
    }
    if (node.type === "video") {
      return (
        <figure
          key={key}
          data-editorial-layout={node.attrs.layout}
          className={`grid gap-3 ${editorialLayoutClassNames[node.attrs.layout]}`}
        >
          <EditorialVideo attrs={node.attrs} />
          {node.attrs.caption || node.attrs.credit ? (
            <figcaption className="flex flex-col gap-1 font-mono text-xs text-nite-text-muted sm:flex-row sm:justify-between">
              {node.attrs.caption ? <span>{node.attrs.caption}</span> : null}
              {node.attrs.credit ? <span>{node.attrs.credit}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    if (node.type !== "image") return null;
    const layout = "layout" in node.attrs ? node.attrs.layout : "normal";
    const caption = "caption" in node.attrs ? node.attrs.caption : undefined;
    const credit = "credit" in node.attrs ? node.attrs.credit : undefined;
    const layoutClassName = editorialLayoutClassNames[layout];
    return (
      <figure
        key={key}
        data-editorial-layout={layout}
        className={`grid gap-3 ${layoutClassName}`}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          width={node.attrs.width}
          height={node.attrs.height}
          className="h-auto w-full rounded-lg border border-nite-border-subtle"
        />
        {caption || credit ? (
          <figcaption className="flex flex-col gap-1 font-mono text-xs text-nite-text-muted sm:flex-row sm:justify-between">
            {caption ? <span>{caption}</span> : null}
            {credit ? <span>{credit}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    );
  });
}

function NewsArticleBody({ document, className }: NewsArticleBodyProps) {
  return (
    <div
      className={
        className ??
        "grid gap-7 text-[1.0625rem] leading-8 text-nite-text-secondary sm:text-lg sm:leading-9"
      }
    >
      {renderNodes(document.content, "editorial")}
    </div>
  );
}

export { NewsArticleBody };
export type { NewsArticleBodyProps };
