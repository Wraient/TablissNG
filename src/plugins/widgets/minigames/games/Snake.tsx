import React, { useRef, useEffect, useCallback, useState } from "react";
import { getCanvasColors } from "./colors";
import { setupHiDpiCanvas } from "./hiDpi";

interface Props {
  onStart: () => void;
  onScore: (score: number) => void;
  onGameOver: (score: number) => void;
  paused: boolean;
}

const CANVAS_W = 320;
const CANVAS_H = 200;
const CELL = 10;
const COLS = CANVAS_W / CELL;
const ROWS = CANVAS_H / CELL;
const TICK_MS = 110;
const MIN_TICK_MS = 50;

type Point = { x: number; y: number };

const Snake: React.FC<Props> = ({ onStart, onScore, onGameOver, paused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const gameRef = useRef({
    snake: [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }] as Point[],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 0, y: 0 } as Point,
    score: 0,
    running: false,
    tickMs: TICK_MS,
    timer: null as ReturnType<typeof setInterval> | null,
  });

  const placeFood = useCallback(() => {
    const g = gameRef.current;
    const occupied = new Set(g.snake.map((s) => s.y * COLS + s.x));
    const free: Point[] = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (!occupied.has(y * COLS + x)) free.push({ x, y });
      }
    }
    if (free.length === 0) return false;
    g.food = free[Math.floor(Math.random() * free.length)];
    return true;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupHiDpiCanvas(canvas, CANVAS_W, CANVAS_H);
    if (!ctx) return;
    const g = gameRef.current;

    const { fg, muted } = getCanvasColors(canvas);

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Food
    ctx.fillStyle = "rgba(255,100,100,0.9)";
    ctx.beginPath();
    ctx.arc(
      g.food.x * CELL + CELL / 2,
      g.food.y * CELL + CELL / 2,
      CELL / 2 - 1,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Snake
    g.snake.forEach((seg, i) => {
      const alpha = 1 - (i / g.snake.length) * 0.5;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Score
    ctx.fillStyle = muted;
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${g.score}`, CANVAS_W - 8, 16);
  }, []);

  const tick = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    if (pausedRef.current) return;

    g.dir = g.nextDir;
    const head = {
      x: g.snake[0].x + g.dir.x,
      y: g.snake[0].y + g.dir.y,
    };

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      g.running = false;
      onGameOver(g.score);
      return;
    }

    // Self collision
    if (g.snake.some((s) => s.x === head.x && s.y === head.y)) {
      g.running = false;
      onGameOver(g.score);
      return;
    }

    g.snake.unshift(head);

    // Eat food
    if (head.x === g.food.x && head.y === g.food.y) {
      g.score++;
      onScore(g.score);
      if (!placeFood()) {
        g.snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
        g.dir = { x: 1, y: 0 };
        g.nextDir = { x: 1, y: 0 };
        g.tickMs = Math.max(MIN_TICK_MS, Math.round(g.tickMs * 0.85));
        if (g.timer !== null) clearInterval(g.timer);
        g.timer = setInterval(tick, g.tickMs);
        placeFood();
      }
    } else {
      g.snake.pop();
    }

    draw();
  }, [draw, onScore, onGameOver, placeFood]);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    if (g.timer !== null) clearInterval(g.timer);
    g.snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    g.dir = { x: 1, y: 0 };
    g.nextDir = { x: 1, y: 0 };
    g.score = 0;
    g.running = true;
    g.tickMs = TICK_MS;
    placeFood();
    draw();
    g.timer = setInterval(tick, g.tickMs);
    setStarted(true);
    onStart();
  }, [tick, draw, placeFood, onStart]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const g = gameRef.current;
      const key = e.key.toLowerCase();
      const map: Record<string, Point> = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };
      if (g.running && map[key]) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const newDir = map[key];
        // Prevent reversing
        if (newDir.x !== -g.dir.x || newDir.y !== -g.dir.y) {
          g.nextDir = newDir;
        }
      }
    };
    window.addEventListener("keydown", handleKey, { capture: true });
    draw();
    return () => {
      window.removeEventListener("keydown", handleKey, { capture: true });
      if (gameRef.current.timer !== null) clearInterval(gameRef.current.timer);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      onClick={started ? undefined : startGame}
      style={{
        cursor: started ? "default" : "pointer",
        display: "block",
      }}
    />
  );
};

export default Snake;
