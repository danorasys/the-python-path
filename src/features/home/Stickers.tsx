import { useEffect, useRef, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import styles from "./Stickers.module.css";

interface Sticker {
  text: string;
  tone: "yellow" | "blue" | "green" | "coral" | "white";
  x: number;
  y: number;
  tilt: number;
  depth: number;
  bob: number;
  enter: number;
  hideOnSmall?: boolean;
}

const STICKERS: Sticker[] = [
  { text: "def", tone: "blue", x: 2, y: 4, tilt: -8, depth: 14, bob: 4.2, enter: 0.9 },
  { text: "print()", tone: "yellow", x: 70, y: 0, tilt: 6, depth: 9, bob: 5.1, enter: 1.05 },
  { text: ">>>", tone: "white", x: 90, y: 42, tilt: -5, depth: 18, bob: 3.8, enter: 1.2, hideOnSmall: true },
  { text: "True", tone: "green", x: 6, y: 86, tilt: 7, depth: 11, bob: 4.6, enter: 1.35 },
  { text: "lambda", tone: "white", x: 76, y: 88, tilt: -8, depth: 20, bob: 3.4, enter: 1.5 },
  { text: "[ ]", tone: "coral", x: 44, y: 94, tilt: 4, depth: 7, bob: 5.6, enter: 1.65, hideOnSmall: true },
];

export function Stickers() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!layer || reducedMotion || !finePointer) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const px = (event.clientX / window.innerWidth - 0.5) * 2;
        const py = (event.clientY / window.innerHeight - 0.5) * 2;
        layer.style.setProperty("--px", px.toFixed(3));
        layer.style.setProperty("--py", py.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      {STICKERS.map((sticker) => (
        <span
          key={sticker.text}
          className={[styles.sticker, sticker.hideOnSmall && styles.hideOnSmall]
            .filter(Boolean)
            .join(" ")}
          style={
            {
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              "--depth": sticker.depth,
            } as CSSProperties
          }
        >
          <span
            className={`${styles.chip} ${styles[sticker.tone]}`}
            style={
              {
                "--tilt": `${sticker.tilt}deg`,
                "--bob": `${sticker.bob}s`,
                "--enter": `${sticker.enter}s`,
              } as CSSProperties
            }
          >
            {sticker.text}
          </span>
        </span>
      ))}
    </div>
  );
}
