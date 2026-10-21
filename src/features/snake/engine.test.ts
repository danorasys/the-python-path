import { describe, expect, it } from "vitest";
import {
  BONUS_POINTS,
  COLS,
  createInitialState,
  createRandom,
  queueDirection,
  randomFreeCell,
  resolveQuiz,
  ROWS,
  step,
  type GameState,
  type Random,
} from "./engine";

function sequence(...values: number[]): Random {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)] ?? 0;
}

const neverBonus: Random = () => 0.99;

function running(overrides: Partial<GameState> = {}): GameState {
  return { ...createInitialState(neverBonus), status: "running", ...overrides };
}

describe("snake engine", () => {
  it("moves one cell in the current direction", () => {
    const state = running({ food: { x: 20, y: 15 } });
    const { state: next, event } = step(state, neverBonus);
    expect(event).toBe("moved");
    expect(next.snake[0]).toEqual({ x: 6, y: 5 });
    expect(next.snake).toHaveLength(3);
  });

  it("does nothing until the game is running", () => {
    const state = createInitialState(neverBonus);
    expect(step(state, neverBonus)).toEqual({ state, event: "none" });
  });

  it("grows and scores when eating, and respawns food off the snake", () => {
    const state = running({ food: { x: 6, y: 5 } });
    const { state: next, event } = step(state, neverBonus);
    expect(event).toBe("ate");
    expect(next.score).toBe(1);
    expect(next.snake).toHaveLength(4);
    expect(next.snake.some((p) => p.x === next.food.x && p.y === next.food.y)).toBe(false);
  });

  it("ignores a turn straight back into the snake", () => {
    const state = running();
    expect(queueDirection(state, "left")).toBe(state);
  });

  it("blocks a 180° turn sneaked in with two quick key presses", () => {
    const state = queueDirection(running(), "up");
    expect(queueDirection(state, "down").queue).toEqual(["up"]);
  });

  it("applies one buffered turn per tick", () => {
    const state = queueDirection(queueDirection(running({ food: { x: 0, y: 0 } }), "up"), "left");
    const first = step(state, neverBonus).state;
    expect(first.direction).toBe("up");
    expect(first.queue).toEqual(["left"]);
    expect(step(first, neverBonus).state.direction).toBe("left");
  });

  it("dies when it hits a wall", () => {
    const state = running({ snake: [{ x: COLS - 1, y: 3 }, { x: COLS - 2, y: 3 }] });
    const { state: next, event } = step(state, neverBonus);
    expect(event).toBe("died");
    expect(next.status).toBe("over");
  });

  it("may move into the cell its tail is leaving", () => {
    const state = running({
      direction: "up",
      snake: [
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 5 },
        { x: 5, y: 5 },
      ],
      food: { x: 0, y: 0 },
    });
    expect(step(state, neverBonus).event).toBe("moved");
  });

  it("dies when it bites its own body", () => {
    const state = running({
      direction: "up",
      snake: [
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
      ],
      food: { x: 0, y: 0 },
    });
    expect(step(state, neverBonus).event).toBe("died");
  });

  it("opens a quiz on a question tile, and pays the bonus only when correct", () => {
    const state = running({ bonus: { x: 6, y: 5 }, food: { x: 0, y: 0 } });
    const { state: quiz, event } = step(state, neverBonus);
    expect(event).toBe("bonus");
    expect(quiz.status).toBe("quiz");
    expect(quiz.bonus).toBeNull();
    expect(resolveQuiz(quiz, true).score).toBe(BONUS_POINTS);
    expect(resolveQuiz(quiz, false).score).toBe(0);
    expect(resolveQuiz(quiz, false).status).toBe("running");
  });

  it("spawns a question tile with the configured chance", () => {
    const state = running({ food: { x: 0, y: 0 } });
    expect(step(state, sequence(0)).state.bonus).not.toBeNull();
    expect(step(state, neverBonus).state.bonus).toBeNull();
  });

  it("finds no free cell on a full board", () => {
    const everyCell = Array.from({ length: COLS * ROWS }, (_, i) => ({
      x: i % COLS,
      y: Math.floor(i / COLS),
    }));
    expect(randomFreeCell(everyCell, neverBonus)).toBeNull();
    expect(ROWS * COLS).toBe(everyCell.length);
  });

  it("produces repeatable sequences from the same seed", () => {
    const a = createRandom(0.42);
    const b = createRandom(0.42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});
