import { RichText } from "../../components/RichText";
import { Callout } from "../../components/ui/Callout";
import { dataUrl } from "../../content/loader";
import type { ContentBlock } from "../../content/types";
import { decodeEntities } from "../../lib/entities";
import { toPlainText } from "../../lib/inlineHtml";
import { CodeBlock } from "./CodeBlock";
import { Collapsible } from "./Collapsible";
import styles from "./ContentBlocks.module.css";
import { TryItButton } from "./TryItButton";

interface ContentBlocksProps {
  blocks: ContentBlock[];
  interactive?: boolean;
}

function imageSrc(src: string): string {
  return /^(https?:)?\/\//.test(src) ? src : dataUrl(src.replace(/^(\.\.\/|\.\/)+/, ""));
}

function Block({ block, interactive }: { block: ContentBlock; interactive: boolean }) {
  switch (block.type) {
    case "subtitle1":
      return (
        <h2 className={styles.h2}>
          <RichText html={block.text} />
        </h2>
      );
    case "subtitle2":
      return (
        <h3 className={styles.h3}>
          <RichText html={block.text} />
        </h3>
      );
    case "subtitle3":
      return (
        <h4 className={styles.h4}>
          <RichText html={block.text} />
        </h4>
      );
    case "subtitle4":
      return (
        <h5 className={styles.h5}>
          <RichText html={block.text} />
        </h5>
      );
    case "paragraph":
      return (
        <p>
          <RichText html={block.text} />
        </p>
      );
    case "note":
    case "tip":
      return (
        <Callout tone={block.type} icon={block.type === "note" ? "pin" : "bulb"}>
          {block.title && (
            <strong className={styles.calloutTitle}>
              <RichText html={block.title} />
            </strong>
          )}
          <ContentBlocks blocks={block.content} interactive={interactive} />
        </Callout>
      );
    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText html={item} />
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={decodeEntities(block.text)} language={block.language} />;
    case "test-button":
      return interactive ? (
        <TryItButton label={block.text} code={block.code} className={styles.tryIt} />
      ) : null;
    case "image":
      return (
        <figure className={styles.figure}>
          <img src={imageSrc(block.src)} alt={block.caption ?? ""} loading="lazy" />
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr className={styles.divider} />;
    case "collapsible":
      return (
        <Collapsible title={block.title}>
          <ContentBlocks blocks={block.content} interactive={interactive} />
        </Collapsible>
      );
    case "table":
      return (
        <div className={styles.tableBlock}>
          {block.title && (
            <h3 className={styles.tableTitle}>
              <RichText html={block.title} />
            </h3>
          )}
          <div
            className={styles.tableScroll}
            tabIndex={0}
            role={block.title ? "region" : undefined}
            aria-label={block.title ? toPlainText(block.title) : undefined}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  {block.headers.map((header, index) => (
                    <th key={index} scope="col">
                      <RichText html={header} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        <RichText html={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
  }
}

export function ContentBlocks({ blocks, interactive = true }: ContentBlocksProps) {
  return (
    <div className={styles.flow}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} interactive={interactive} />
      ))}
    </div>
  );
}
