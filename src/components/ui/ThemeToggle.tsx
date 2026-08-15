"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="glass-hover flex items-center gap-3 rounded-xl px-4 py-3 text-left"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5 text-[var(--color-text-muted)]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5 text-[var(--color-accent)]" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <span className="font-medium">{theme === "dark" ? "Dark" : "Light"}</span>
    </motion.button>
  );
}
