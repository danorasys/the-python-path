import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./SnakeBoard.module.css";
import { COLS, ROWS, type Direction, type GameState, type Point } from "./engine";

const PALETTE = {
  paper: "#f4f8fc",
  grid: "#d6e4f2",
  ink: "#000000",
  body: "#34c47c",
  head: "#1b983a",
  food: "#ff6f59",
  bonus: "#ffd43b",
} as const;

const EYE_OFFSETS: Record<Direction, [Point, Point]> = {
  up: [{ x: 0.3, y: 0.3 }, { x: 0.7, y: 0.3 }],
  down: [{ x: 0.3, y: 0.7 }, { x: 0.7, y: 0.7 }],
  left: [{ x: 0.3, y: 0.3 }, { x: 0.3, y: 0.7 }],
  right: [{ x: 0.7, y: 0.3 }, { x: 0.7, y: 0.7 }],
};

function drawTile(ctx: CanvasRenderingContext2D, point: Point, cell: number, fill: string) {
  const inset = Math.max(1, cell * 0.08);
  const x = point.x * cell + inset;
  const y = point.y * cell + inset;
  const size = cell - inset * 2;
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, size, size);
  ctx.lineWidth = Math.max(1.5, cell * 0.1);
  ctx.strokeStyle = PALETTE.ink;
  ctx.strokeRect(x, y, size, size);
}

function draw(ctx: CanvasRenderingContext2D, state: GameState, cell: number) {
  const width = COLS * cell;
  const height = ROWS * cell;

  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = PALETTE.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 1; x < COLS; x++) {
    ctx.moveTo(x * cell + 0.5, 0);
    ctx.lineTo(x * cell + 0.5, height);
  }
  for (let y = 1; y < ROWS; y++) {
    ctx.moveTo(0, y * cell + 0.5);
    ctx.lineTo(width, y * cell + 0.5);
  }
  ctx.stroke();

  drawTile(ctx, state.food, cell, PALETTE.food);

  if (state.bonus) {
    drawTile(ctx, state.bonus, cell, PALETTE.bonus);
    ctx.fillStyle = PALETTE.ink;
    ctx.font = `800 ${Math.round(cell * 0.62)}px "Bricolage Grotesque Variable", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", (state.bonus.x + 0.5) * cell, (state.bonus.y + 0.54) * cell);
  }

  for (let index = state.snake.length - 1; index >= 0; index--) {
    const part = state.snake[index];
    if (part) drawTile(ctx, part, cell, index === 0 ? PALETTE.head : PALETTE.body);
  }

  const head = state.snake[0];
  if (head) {
    ctx.fillStyle = PALETTE.ink;
    for (const eye of EYE_OFFSETS[state.direction]) {
      ctx.beginPath();
      ctx.arc((head.x + eye.x) * cell, (head.y + eye.y) * cell, cell * 0.09, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const FRAME_EXTRA_PX = 14;

interface SnakeBoardProps {
  state: GameState;
  label: string;
  children?: ReactNode;
}

export function SnakeBoard({ state, label, children }: SnakeBoardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cell, setCell] = useState(22);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setCell(Math.max(8, Math.floor((entry.contentRect.width - FRAME_EXTRA_PX) / COLS)));
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const pixelWidth = COLS * cell * ratio;
    if (canvas.width !== pixelWidth) {
      canvas.width = pixelWidth;
      canvas.height = ROWS * cell * ratio;
      canvas.style.width = `${COLS * cell}px`;
      canvas.style.height = `${ROWS * cell}px`;
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(ctx, state, cell);
  }, [state, cell]);

  return (
    <div ref={wrapperRef} className={styles.sizer}>
      <div className={styles.frame}>
        <canvas ref={canvasRef} role="img" aria-label={label} />
        {children}
      </div>
    </div>
  );
}
