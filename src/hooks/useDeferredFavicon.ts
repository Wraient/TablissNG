import { useEffect, useState } from "react";

/**
 * Defers the application of a favicon src URL to prevent favicon
 * network requests/404s from blocking the extension's critical boot
 * sequence, window.onload event, and connection pools.
 */
export function useDeferredFavicon(src: string): string {
  const [deferredSrc, setDeferredSrc] = useState("");

  useEffect(() => {
    let timeoutId: number | null = null;

    const applySrc = () => {
      setDeferredSrc(src);
    };

    if (typeof window.requestIdleCallback === "function") {
      timeoutId = window.requestIdleCallback(applySrc, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(applySrc, src ? 500 : 0);
    }

    return () => {
      if (timeoutId === null) {
        return;
      }

      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(timeoutId);
      } else {
        clearTimeout(timeoutId);
      }
    };
  }, [src]);

  return deferredSrc === src ? deferredSrc : "";
}
