export const COLS = 30;
export const ROWS = 20;
export const TICK_MS = 120;
export const BONUS_CHANCE = 0.05;
export const BONUS_POINTS = 5;

export type Direction = "up" | "down" | "left" | "right";

export interface Point {
  x: number;
  y: number;
}

export type GameStatus = "ready" | "running" | "paused" | "quiz" | "over";

export interface GameState {
  snake: Point[];
  direction: Direction;
  queue: Direction[];
  food: Point;
  bonus: Point | null;
  score: number;
  status: GameStatus;
}

export type StepEvent = "none" | "moved" | "ate" | "bonus" | "died";

export type Random = () => number;

const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const MAX_QUEUED_TURNS = 2;

export function createRandom(seed: number): Random {
  let a = Math.floor(seed * 0xffffffff) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function samePoint(a: Point | null, b: Point | null): boolean {
  return a !== null && b !== null && a.x === b.x && a.y === b.y;
}

export function randomFreeCell(occupied: readonly (Point | null)[], random: Random): Point | null {
  const taken = new Set(occupied.filter((p): p is Point => p !== null).map((p) => p.y * COLS + p.x));
  const free: number[] = [];
  for (let index = 0; index < COLS * ROWS; index++) {
    if (!taken.has(index)) free.push(index);
  }
  const pick = free[Math.floor(random() * free.length)];
  return pick === undefined ? null : { x: pick % COLS, y: Math.floor(pick / COLS) };
}

export function createInitialState(random: Random): GameState {
  const snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];
  return {
    snake,
    direction: "right",
    queue: [],
    food: randomFreeCell(snake, random) ?? { x: COLS - 1, y: ROWS - 1 },
    bonus: null,
    score: 0,
    status: "ready",
  };
}

export function queueDirection(state: GameState, direction: Direction): GameState {
  const last = state.queue.at(-1) ?? state.direction;
  if (direction === last || direction === OPPOSITE[last]) return state;
  if (state.queue.length >= MAX_QUEUED_TURNS) return state;
  return { ...state, queue: [...state.queue, direction] };
}

export function step(state: GameState, random: Random): { state: GameState; event: StepEvent } {
  if (state.status !== "running") return { state, event: "none" };

  const [direction = state.direction, ...queue] = state.queue;
  const head = state.snake[0];
  if (!head) return { state: { ...state, status: "over" }, event: "died" };

  const vector = VECTORS[direction];
  const next = { x: head.x + vector.x, y: head.y + vector.y };
  const eats = samePoint(next, state.food);
  const body = eats ? state.snake : state.snake.slice(0, -1);

  const hitsWall = next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS;
  if (hitsWall || body.some((part) => samePoint(part, next))) {
    return { state: { ...state, direction, queue, status: "over" }, event: "died" };
  }

  const snake = [next, ...body];
  let { food, bonus, score } = state;
  let status: GameStatus = state.status;
  let event: StepEvent = "moved";

  if (eats) {
    score += 1;
    event = "ate";
    const newFood = randomFreeCell([...snake, bonus], random);
    if (!newFood) return { state: { ...state, snake, score, status: "over" }, event: "died" };
    food = newFood;
  }

  if (samePoint(next, bonus)) {
    bonus = null;
    status = "quiz";
    event = "bonus";
  } else if (!bonus && random() < BONUS_CHANCE) {
    bonus = randomFreeCell([...snake, food], random);
  }

  return { state: { snake, direction, queue, food, bonus, score, status }, event };
}

export function resolveQuiz(state: GameState, correct: boolean): GameState {
  if (state.status !== "quiz") return state;
  return {
    ...state,
    status: "running",
    score: state.score + (correct ? BONUS_POINTS : 0),
  };
}
