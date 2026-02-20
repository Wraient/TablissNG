/**
 * Set up a canvas for hi-DPI rendering.
 * Scales the backing store by devicePixelRatio while keeping
 * the logical (CSS) size at logicalW × logicalH.
 * Returns the 2D context with the DPR scale already applied.
 */
export function setupHiDpiCanvas(
  canvas: HTMLCanvasElement,
  logicalW: number,
  logicalH: number,
): CanvasRenderingContext2D | null {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = logicalW * dpr;
  canvas.height = logicalH * dpr;
  canvas.style.width = `${logicalW}px`;
  canvas.style.height = `${logicalH}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  return ctx;
}
