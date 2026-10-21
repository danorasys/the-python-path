const TAG_MAP = {
  code: "code",
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  u: "u",
  s: "s",
  sub: "sub",
  sup: "sup",
  small: "small",
  kbd: "kbd",
} as const;

export type InlineTag = (typeof TAG_MAP)[keyof typeof TAG_MAP];

export const INLINE_ICONS = ["check", "cross"] as const;
export type InlineIcon = (typeof INLINE_ICONS)[number];

export type InlineNode =
  | string
  | { tag: "br" }
  | { tag: "icon"; name: InlineIcon }
  | { tag: InlineTag; children: InlineNode[] };

function inlineIconName(tagName: string): InlineIcon | null {
  const name = tagName.startsWith("icon-") ? tagName.slice(5) : "";
  return (INLINE_ICONS as readonly string[]).includes(name) ? (name as InlineIcon) : null;
}

const DROPPED_TAGS = new Set(["script", "style", "template", "iframe", "object"]);

const parseCache = new Map<string, InlineNode[]>();

function isMappedTag(name: string): name is keyof typeof TAG_MAP {
  return Object.hasOwn(TAG_MAP, name);
}

function convert(node: Node): InlineNode[] {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ? [node.textContent] : [];
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return [];

  const name = (node as Element).localName;
  if (name === "br") return [{ tag: "br" }];
  if (DROPPED_TAGS.has(name)) return [];
  const icon = inlineIconName(name);
  if (icon) return [{ tag: "icon", name: icon }];

  const children = Array.from(node.childNodes).flatMap(convert);
  return isMappedTag(name) ? [{ tag: TAG_MAP[name], children }] : children;
}

export function parseInlineHtml(html: string): InlineNode[] {
  if (!/[<&]/.test(html)) return html ? [html] : [];
  const hit = parseCache.get(html);
  if (hit) return hit;

  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const nodes = Array.from(doc.body.childNodes).flatMap(convert);
  parseCache.set(html, nodes);
  return nodes;
}

export function toPlainText(html: string): string {
  const flatten = (nodes: InlineNode[]): string =>
    nodes
      .map((node) => {
        if (typeof node === "string") return node;
        if (node.tag === "br") return " ";
        if (node.tag === "icon") return "";
        return flatten(node.children);
      })
      .join("");
  return flatten(parseInlineHtml(html)).replace(/\s+/g, " ").trim();
}
