"use client";

import { useState } from "react";

type Theme = "light" | "dark";

const KEY = "legacy_theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    return document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
  });

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    setTheme(next);

    document.documentElement.classList.toggle("light", next === "light");

    localStorage.setItem(KEY, next);
  };

  return { theme, toggle };
}
