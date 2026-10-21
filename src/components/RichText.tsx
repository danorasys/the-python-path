import { Fragment, memo, type ReactNode } from "react";
import { parseInlineHtml, type InlineIcon, type InlineNode } from "../lib/inlineHtml";
import { Icon, type IconName } from "./ui/Icon";

const ICONS: Record<InlineIcon, IconName> = {
  check: "check",
  cross: "close",
};

function renderNodes(nodes: InlineNode[]): ReactNode[] {
  return nodes.map((node, index) => {
    if (typeof node === "string") return <Fragment key={index}>{node}</Fragment>;
    if (node.tag === "br") return <br key={index} />;
    if (node.tag === "icon") {
      return (
        <Icon key={index} name={ICONS[node.name]} className={`inline-icon inline-icon--${node.name}`} />
      );
    }
    const Tag = node.tag;
    return <Tag key={index}>{renderNodes(node.children)}</Tag>;
  });
}

interface RichTextProps {
  html: string;
}

export const RichText = memo(function RichText({ html }: RichTextProps) {
  return <>{renderNodes(parseInlineHtml(html))}</>;
});
