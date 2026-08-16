"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "legacy_theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");

    // Intentional synchronization with the theme applied by the anti-flash script.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isLight ? "light" : "dark");

    // Intentional client-mount flag for hydration-safe theme UI.

    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    setTheme(next);

    document.documentElement.classList.toggle("light", next === "light");

    localStorage.setItem(KEY, next);
  };

  return { theme, toggle, mounted };
}
