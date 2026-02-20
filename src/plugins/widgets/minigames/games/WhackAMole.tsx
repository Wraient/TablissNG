import React, { useRef, useEffect, useCallback } from "react";
import { getCanvasColors } from "./colors";
import { setupHiDpiCanvas } from "./hiDpi";

interface Props {
  onStart: () => void;
  onScore: (score: number) => void;
  onGameOver: (score: number) => void;
}

const CANVAS_W = 320;
const CANVAS_H = 200;
const GRID_COLS = 4;
const GRID_ROWS = 3;
const HOLE_W = 50;
const HOLE_H = 30;
const GAME_DURATION = 20_000;
const MOLE_INTERVAL_MIN = 500;
const MOLE_INTERVAL_MAX = 1200;
const MOLE_VISIBLE_MS = 800;
const EXPIRED_GRACE_MS = 500;

interface Mole {
  col: number;
  row: number;
  showAt: number;
  hideAt: number;
  hit: boolean;
}

const WhackAMole: React.FC<Props> = ({ onStart, onScore, onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef({
    score: 0,
    running: false,
    startTime: 0,
    moles: [] as Mole[],
    animFrame: 0,
    nextMoleTime: 0,
  });

  const getHolePos = useCallback((col: number, row: number) => {
    const gapX = (CANVAS_W - GRID_COLS * HOLE_W) / (GRID_COLS + 1);
    const gapY = (CANVAS_H - 20 - GRID_ROWS * HOLE_H) / (GRID_ROWS + 1);
    return {
      x: gapX + col * (HOLE_W + gapX),
      y: 20 + gapY + row * (HOLE_H + gapY),
    };
  }, []);

  const spawnMole = useCallback((now: number) => {
    const g = gameRef.current;
    const col = Math.floor(Math.random() * GRID_COLS);
    const row = Math.floor(Math.random() * GRID_ROWS);
    // Don't overlap existing active moles
    if (
      g.moles.some(
        (m) => m.col === col && m.row === row && !m.hit && now < m.hideAt,
      )
    ) {
      return;
    }
    g.moles.push({
      col,
      row,
      showAt: now,
      hideAt: now + MOLE_VISIBLE_MS,
      hit: false,
    });
  }, []);

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = setupHiDpiCanvas(canvas, CANVAS_W, CANVAS_H);
      if (!ctx) return;
      const g = gameRef.current;

      const { fg, muted } = getCanvasColors(canvas);

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Holes
      ctx.globalAlpha = 0.12;
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const { x, y } = getHolePos(c, r);
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.ellipse(
            x + HOLE_W / 2,
            y + HOLE_H / 2,
            HOLE_W / 2,
            HOLE_H / 2,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Active moles
      g.moles.forEach((mole) => {
        if (mole.hit || now > mole.hideAt) return;
        const { x, y } = getHolePos(mole.col, mole.row);
        const elapsed = now - mole.showAt;
        const total = mole.hideAt - mole.showAt;
        const progress = elapsed / total;

        // Pop up/down animation
        let scale = 1;
        if (progress < 0.15) scale = progress / 0.15;
        else if (progress > 0.85) scale = (1 - progress) / 0.15;

        ctx.fillStyle = "rgba(255,200,80,0.9)";
        ctx.beginPath();
        const moleR = (Math.min(HOLE_W, HOLE_H) / 2 - 4) * scale;
        ctx.arc(
          x + HOLE_W / 2,
          y + HOLE_H / 2,
          Math.max(0, moleR),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Eyes
        if (moleR > 5) {
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.beginPath();
          ctx.arc(x + HOLE_W / 2 - 4, y + HOLE_H / 2 - 2, 2, 0, Math.PI * 2);
          ctx.arc(x + HOLE_W / 2 + 4, y + HOLE_H / 2 - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Score
      ctx.fillStyle = muted;
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${g.score}`, CANVAS_W - 8, 16);

      // Timer bar
      if (g.running) {
        const remaining = Math.max(0, 1 - (now - g.startTime) / GAME_DURATION);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = fg;
        ctx.fillRect(8, 6, CANVAS_W - 50, 4);
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(${remaining < 0.25 ? 255 : 100},${remaining > 0.25 ? 200 : 100},100,0.8)`;
        ctx.fillRect(8, 6, (CANVAS_W - 50) * remaining, 4);
      }
    },
    [getHolePos],
  );

  const gameLoop = useCallback(
    (timestamp: number) => {
      const g = gameRef.current;
      if (!g.running) {
        draw(timestamp);
        return;
      }

      const elapsed = timestamp - g.startTime;

      // Time's up
      if (elapsed >= GAME_DURATION) {
        g.running = false;
        onGameOver(g.score);
        draw(timestamp);
        return;
      }

      // Spawn moles
      if (timestamp >= g.nextMoleTime) {
        spawnMole(timestamp);
        g.nextMoleTime =
          timestamp +
          MOLE_INTERVAL_MIN +
          Math.random() * (MOLE_INTERVAL_MAX - MOLE_INTERVAL_MIN);
      }

      // Clean old moles (keep active moles and recently expired ones for fade-out)
      g.moles = g.moles.filter((m) => timestamp < m.hideAt + EXPIRED_GRACE_MS);

      draw(timestamp);
      g.animFrame = requestAnimationFrame(gameLoop);
    },
    [draw, onGameOver, spawnMole],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const g = gameRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!g.running) {
        // Start game
        g.score = 0;
        g.moles = [];
        g.running = true;
        g.startTime = performance.now();
        g.nextMoleTime = g.startTime + 300;
        onStart();
        g.animFrame = requestAnimationFrame(gameLoop);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      const now = performance.now();

      for (let i = g.moles.length - 1; i >= 0; i--) {
        const mole = g.moles[i];
        if (mole.hit || now > mole.hideAt) continue;
        const { x, y } = getHolePos(mole.col, mole.row);
        const cx = x + HOLE_W / 2;
        const cy = y + HOLE_H / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        if (dist < HOLE_W / 2) {
          mole.hit = true;
          g.score++;
          onScore(g.score);
          break;
        }
      }
    },
    [gameLoop, getHolePos, onScore],
  );

  useEffect(() => {
    draw(performance.now());
    return () => {
      cancelAnimationFrame(gameRef.current.animFrame);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      onClick={handleClick}
      style={{ cursor: "pointer", display: "block" }}
    />
  );
};

export default WhackAMole;
