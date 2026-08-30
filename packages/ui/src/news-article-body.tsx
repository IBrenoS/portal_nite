import type {
  EditorialContentNode,
  EditorialDocumentV1,
  EditorialTextNode,
} from "@nite/news";
import { isAllowedEditorialLink } from "@nite/news";
import type { ReactNode } from "react";

type NewsArticleBodyProps = {
  document: EditorialDocumentV1;
  className?: string;
};

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
    if (node.type !== "image") return null;
    return (
      <figure key={key} className="grid gap-3">
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          width={node.attrs.width}
          height={node.attrs.height}
          className="h-auto w-full rounded-lg border border-nite-border-subtle"
        />
        <figcaption className="font-mono text-xs text-nite-text-muted">
          {node.attrs.alt}
        </figcaption>
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
