// src/lib/sanitizeHtml.ts
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as never);

interface SanitizeOptions {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  ALLOW_DATA_ATTR?: boolean;
  ALLOW_UNKNOWN_PROTOCOLS?: boolean;
}

export function sanitizeHtml(
  dirty: string,
  options: SanitizeOptions = {}
): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: options.ALLOWED_TAGS || [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "strong",
      "em",
      "blockquote",
      "img",
      "figure",
      "div",
      "span",
    ],
    ALLOWED_ATTR: options.ALLOWED_ATTR || [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "width",
      "height",
      "class",
    ],
    ALLOW_DATA_ATTR: options.ALLOW_DATA_ATTR || false,
    ALLOW_UNKNOWN_PROTOCOLS: options.ALLOW_UNKNOWN_PROTOCOLS || false,
  });
}
