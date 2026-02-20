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
const PADDLE_W = 50;
const PADDLE_H = 7;
const BALL_R = 4;
const MAX_BALL_SPEED = 6;
const BRICK_ROWS = 4;
const BRICK_COLS = 10;
const BRICK_W = 28;
const BRICK_H = 10;
const BRICK_PAD = 3;
const BRICK_TOP = 25;
const BRICK_LEFT =
  (CANVAS_W - (BRICK_W + BRICK_PAD) * BRICK_COLS + BRICK_PAD) / 2;

const COLORS = [
  "rgba(255,100,100,0.85)",
  "rgba(255,180,80,0.85)",
  "rgba(100,200,255,0.85)",
  "rgba(100,255,150,0.85)",
];

interface Brick {
  x: number;
  y: number;
  alive: boolean;
}

const Breakout: React.FC<Props> = ({
  onStart,
  onScore,
  onGameOver,
  paused,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const gameRef = useRef({
    paddleX: CANVAS_W / 2 - PADDLE_W / 2,
    ballX: CANVAS_W / 2,
    ballY: CANVAS_H - 35,
    ballDX: 2.5,
    ballDY: -2.5,
    bricks: [] as Brick[][],
    score: 0,
    running: false,
    keys: {} as Record<string, boolean>,
    animFrame: 0,
  });

  const initBricks = useCallback(() => {
    const bricks: Brick[][] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      bricks[r] = [];
      for (let c = 0; c < BRICK_COLS; c++) {
        bricks[r][c] = {
          x: BRICK_LEFT + c * (BRICK_W + BRICK_PAD),
          y: BRICK_TOP + r * (BRICK_H + BRICK_PAD),
          alive: true,
        };
      }
    }
    return bricks;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupHiDpiCanvas(canvas, CANVAS_W, CANVAS_H);
    if (!ctx) return;
    const g = gameRef.current;

    const { fg, muted } = getCanvasColors(canvas);

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Bricks
    g.bricks.forEach((row, r) => {
      row.forEach((brick) => {
        if (!brick.alive) return;
        ctx.fillStyle = COLORS[r % COLORS.length];
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, BRICK_W, BRICK_H, 2);
        ctx.fill();
      });
    });

    // Paddle
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.roundRect(g.paddleX, CANVAS_H - 16, PADDLE_W, PADDLE_H, 3);
    ctx.fill();

    // Ball
    ctx.beginPath();
    ctx.arc(g.ballX, g.ballY, BALL_R, 0, Math.PI * 2);
    ctx.fillStyle = fg;
    ctx.fill();

    // Score
    ctx.fillStyle = muted;
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${g.score}`, CANVAS_W - 8, 16);
  }, []);

  const update = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    if (pausedRef.current) return;

    // Move paddle
    if (g.keys["arrowleft"] || g.keys["a"]) {
      g.paddleX = Math.max(0, g.paddleX - 5);
    }
    if (g.keys["arrowright"] || g.keys["d"]) {
      g.paddleX = Math.min(CANVAS_W - PADDLE_W, g.paddleX + 5);
    }

    g.ballX += g.ballDX;
    g.ballY += g.ballDY;

    // Wall collisions
    if (g.ballX - BALL_R <= 0 || g.ballX + BALL_R >= CANVAS_W) {
      g.ballDX = -g.ballDX;
      g.ballX = Math.max(BALL_R, Math.min(CANVAS_W - BALL_R, g.ballX));
    }
    if (g.ballY - BALL_R <= 0) {
      g.ballDY = -g.ballDY;
      g.ballY = BALL_R;
    }

    // Paddle
    if (
      g.ballY + BALL_R >= CANVAS_H - 16 &&
      g.ballY + BALL_R <= CANVAS_H - 9 &&
      g.ballX >= g.paddleX &&
      g.ballX <= g.paddleX + PADDLE_W
    ) {
      g.ballDY = -Math.abs(g.ballDY);
      let hitPos = (g.ballX - g.paddleX) / PADDLE_W - 0.5;
      if (Math.abs(hitPos) < 0.05) {
        hitPos = hitPos >= 0 ? 0.05 : -0.05;
      }
      g.ballDX = hitPos * 5;
    }

    // Brick collisions
    let allCleared = true;
    let hitBrick = false;
    g.bricks.forEach((row) => {
      row.forEach((brick) => {
        if (!brick.alive) return;
        allCleared = false;
        if (
          !hitBrick &&
          g.ballX + BALL_R > brick.x &&
          g.ballX - BALL_R < brick.x + BRICK_W &&
          g.ballY + BALL_R > brick.y &&
          g.ballY - BALL_R < brick.y + BRICK_H
        ) {
          brick.alive = false;
          hitBrick = true;
          g.ballDY = -g.ballDY;
          g.score++;
          onScore(g.score);
        }
      });
    });

    // All bricks cleared - reset with more speed, capped at MAX_BALL_SPEED
    if (allCleared) {
      g.bricks = initBricks();
      const speed = Math.hypot(g.ballDX, g.ballDY);
      const targetSpeed = Math.min(speed * 1.1, MAX_BALL_SPEED);
      if (speed > 0 && targetSpeed > speed) {
        const scale = targetSpeed / speed;
        g.ballDX *= scale;
        g.ballDY *= scale;
      }
    }

    // Ball out
    if (g.ballY - BALL_R > CANVAS_H) {
      g.running = false;
      onGameOver(g.score);
    }
  }, [onScore, onGameOver, initBricks]);

  const gameLoop = useCallback(() => {
    update();
    draw();
    gameRef.current.animFrame = requestAnimationFrame(gameLoop);
  }, [update, draw]);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.paddleX = CANVAS_W / 2 - PADDLE_W / 2;
    g.ballX = CANVAS_W / 2;
    g.ballY = CANVAS_H - 35;
    const angle = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
    g.ballDX = Math.sin(angle) * 2.5;
    g.ballDY = -Math.cos(angle) * 2.5;
    g.bricks = initBricks();
    g.score = 0;
    g.running = true;
    setStarted(true);
    onStart();
    g.animFrame = requestAnimationFrame(gameLoop);
  }, [initBricks, onStart, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      gameRef.current.keys[key] = true;
      if (
        gameRef.current.running &&
        ["arrowleft", "arrowright", "a", "d", "w", "s"].includes(key)
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keyup", handleKeyUp, { capture: true });
    gameRef.current.bricks = initBricks();
    draw();

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      cancelAnimationFrame(gameRef.current.animFrame);
    };
  }, [draw, initBricks]);

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

export default Breakout;
