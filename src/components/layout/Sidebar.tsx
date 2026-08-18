"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Feature = "qa" | "summary" | "flashcard" | null;

export function Sidebar({
  docId,
  activeFeature,
  onSelectFeature,
}: {
  docId: string | null;
  activeFeature: Feature;
  onSelectFeature: (f: Feature) => void;
}) {
  const disabled = docId === null;

  return (
    <aside className="glass flex h-full w-full flex-col gap-8 rounded-2xl p-5 md:w-60">
      <Logo />

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFeature === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectFeature(item.id as Feature)}
              disabled={disabled}
              whileTap={disabled ? {} : { scale: 0.97 }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                disabled
                  ? "cursor-not-allowed opacity-40"
                  : "hover:bg-[var(--color-surface-hover)]",
                isActive && !disabled && "bg-[var(--color-surface-hover)]"
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
            </motion.button>
          );
        })}
      </nav>

      {disabled && (
        <p className="px-1 text-xs text-[var(--color-text-faint)]">
          Upload a PDF to get started.
        </p>
      )}

      <ThemeToggle />
    </aside>
  );
}