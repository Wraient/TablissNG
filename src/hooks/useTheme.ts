import { useValue } from "../lib/db/react";
import { db } from "../db/state";
import { useSystemTheme } from "./";

export function useTheme() {
  const preference = useValue(db, "themePreference");
  const systemIsDark = useSystemTheme();

  return {
    preference,
    isDark: preference === "system" ? systemIsDark : preference === "dark",
  };
}
