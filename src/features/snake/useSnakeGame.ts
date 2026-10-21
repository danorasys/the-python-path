import { useCallback, useEffect, useReducer, useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../../lib/storage";
import {
  createInitialState,
  createRandom,
  queueDirection,
  resolveQuiz,
  step,
  TICK_MS,
  type Direction,
  type GameState,
} from "./engine";

type Action =
  | { type: "start"; seed: number }
  | { type: "tick"; seed: number }
  | { type: "turn"; direction: Direction }
  | { type: "togglePause" }
  | { type: "resolveQuiz"; correct: boolean };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "start": {
      if (state.status === "ready") return { ...state, status: "running" };
      if (state.status !== "over") return state;
      return { ...createInitialState(createRandom(action.seed)), status: "running" };
    }
    case "tick":
      return step(state, createRandom(action.seed)).state;
    case "turn":
      if (state.status === "running") return queueDirection(state, action.direction);
      if (state.status === "ready") {
        return { ...queueDirection(state, action.direction), status: "running" };
      }
      return state;
    case "togglePause":
      if (state.status === "running") return { ...state, status: "paused" };
      if (state.status === "paused") return { ...state, status: "running" };
      return state;
    case "resolveQuiz":
      return resolveQuiz(state, action.correct);
  }
}

function readBest(): number {
  const saved = Number(readStorage(STORAGE_KEYS.snakeBest));
  return Number.isFinite(saved) && saved > 0 ? saved : 0;
}

export function useSnakeGame() {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(createRandom(Math.random())),
  );
  const [storedBest, setStoredBest] = useState(readBest);
  const best = Math.max(storedBest, state.score);

  useEffect(() => {
    if (state.status !== "running") return;
    const timer = window.setInterval(() => dispatch({ type: "tick", seed: Math.random() }), TICK_MS);
    return () => window.clearInterval(timer);
  }, [state.status]);

  const isOver = state.status === "over";
  useEffect(() => {
    if (!isOver || state.score <= storedBest) return;
    writeStorage(STORAGE_KEYS.snakeBest, String(state.score));
    setStoredBest(state.score);
  }, [isOver, state.score, storedBest]);

  const start = useCallback(() => dispatch({ type: "start", seed: Math.random() }), []);
  const turn = useCallback((direction: Direction) => dispatch({ type: "turn", direction }), []);
  const togglePause = useCallback(() => dispatch({ type: "togglePause" }), []);
  const answerQuiz = useCallback(
    (correct: boolean) => dispatch({ type: "resolveQuiz", correct }),
    [],
  );

  return { state, best, start, turn, togglePause, answerQuiz };
}
