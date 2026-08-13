"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <aside className="glass flex h-full w-60 flex-col gap-8 rounded-2xl p-5">
      <Logo />

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActive(item.id)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                "hover:bg-[var(--color-surface-hover)]",
                isActive && "bg-[var(--color-surface-hover)]"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)]"
                )}
              />
              <span className="font-medium">{item.label}</span>

              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, x: -4 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="ml-auto rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2 py-0.5 text-[10px] font-medium tracking-wide text-[var(--color-text-muted)]"
                  >
                    Soon
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
