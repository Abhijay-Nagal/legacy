"use client";

import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";

export function Intro({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <motion.div
        className="px-6"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduce ? 0.3 : 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        onAnimationComplete={() => setTimeout(onComplete, reduce ? 200 : 900)}
      >
        <Logo showTagline className="scale-110" />
      </motion.div>
    </motion.div>
  );
}
