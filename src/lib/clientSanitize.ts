// src/lib/clientSanitize.ts
import DOMPurify from "dompurify";

export function clientSanitize(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
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
      "br",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel", // For links
      "src",
      "alt",
      "width",
      "height",
      "class", // For images
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
}
