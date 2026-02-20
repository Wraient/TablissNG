export function getCanvasColors(canvas: HTMLCanvasElement) {
  const style = getComputedStyle(canvas);
  const fg = style.getPropertyValue("--text-heading").trim() || "#ffffff";
  const muted = style.getPropertyValue("--text-muted").trim() || "#888888";
  const border = style.getPropertyValue("--border-light").trim() || "#333333";
  return { fg, muted, border };
}
