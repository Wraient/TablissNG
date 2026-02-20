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
const PADDLE_W = 60;
const PADDLE_H = 8;
const BALL_R = 5;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 3;
const SPEED_INCREMENT = 0.15;

const Pong: React.FC<Props> = ({ onStart, onScore, onGameOver, paused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const gameRef = useRef({
    paddleX: CANVAS_W / 2 - PADDLE_W / 2,
    ballX: CANVAS_W / 2,
    ballY: CANVAS_H / 2,
    ballDX: INITIAL_BALL_SPEED,
    ballDY: -INITIAL_BALL_SPEED,
    score: 0,
    running: false,
    keys: {} as Record<string, boolean>,
    animFrame: 0,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupHiDpiCanvas(canvas, CANVAS_W, CANVAS_H);
    if (!ctx) return;
    const g = gameRef.current;

    const { fg, muted } = getCanvasColors(canvas);

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Paddle
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.roundRect(g.paddleX, CANVAS_H - 18, PADDLE_W, PADDLE_H, 4);
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
      g.paddleX = Math.max(0, g.paddleX - PADDLE_SPEED);
    }
    if (g.keys["arrowright"] || g.keys["d"]) {
      g.paddleX = Math.min(CANVAS_W - PADDLE_W, g.paddleX + PADDLE_SPEED);
    }

    // Move ball
    g.ballX += g.ballDX;
    g.ballY += g.ballDY;

    // Wall collisions (left/right)
    if (g.ballX - BALL_R <= 0 || g.ballX + BALL_R >= CANVAS_W) {
      g.ballDX = -g.ballDX;
      g.ballX = Math.max(BALL_R, Math.min(CANVAS_W - BALL_R, g.ballX));
    }

    // Top wall
    if (g.ballY - BALL_R <= 0) {
      g.ballDY = -g.ballDY;
      g.ballY = BALL_R;
    }

    // Paddle collision
    if (
      g.ballY + BALL_R >= CANVAS_H - 18 &&
      g.ballY + BALL_R <= CANVAS_H - 10 &&
      g.ballX >= g.paddleX &&
      g.ballX <= g.paddleX + PADDLE_W
    ) {
      g.ballDY = -Math.abs(g.ballDY);
      // Add angle based on where ball hits paddle
      const hitPos = (g.ballX - g.paddleX) / PADDLE_W - 0.5;
      g.ballDX = hitPos * 6;
      g.score++;
      // Speed up slightly
      const speed = INITIAL_BALL_SPEED + g.score * SPEED_INCREMENT;
      const angle = Math.atan2(g.ballDY, g.ballDX);
      g.ballDX = Math.cos(angle) * speed;
      g.ballDY = Math.sin(angle) * speed;
      onScore(g.score);
    }

    // Ball out of bounds
    if (g.ballY - BALL_R > CANVAS_H) {
      g.running = false;
      onGameOver(g.score);
    }
  }, [onScore, onGameOver]);

  const gameLoop = useCallback(() => {
    update();
    draw();
    gameRef.current.animFrame = requestAnimationFrame(gameLoop);
  }, [update, draw]);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.paddleX = CANVAS_W / 2 - PADDLE_W / 2;
    g.ballX = CANVAS_W / 2;
    g.ballY = CANVAS_H / 2;
    const angle = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
    g.ballDX = Math.sin(angle) * INITIAL_BALL_SPEED;
    g.ballDY = -Math.cos(angle) * INITIAL_BALL_SPEED;
    g.score = 0;
    g.running = true;
    setStarted(true);
    onStart();
    g.animFrame = requestAnimationFrame(gameLoop);
  }, [onStart, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      gameRef.current.keys[key] = true;
      if (
        gameRef.current.running &&
        [
          "arrowleft",
          "arrowright",
          "arrowup",
          "arrowdown",
          "a",
          "d",
          "w",
          "s",
        ].includes(key)
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
    draw();

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      cancelAnimationFrame(gameRef.current.animFrame);
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

export default Pong;
