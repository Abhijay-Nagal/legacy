"use client";

import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";

export function Intro({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();

  // Reduced motion: show brand briefly, then hand off. No animation.
  const duration = reduce ? 0.4 : 1;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Ambient glow bloom behind the logo */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute h-72 w-72 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.2 292 / 60%), transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0.7], scale: [0.6, 1.2, 1] }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration, ease: "easeOut", delay: reduce ? 0 : 0.3 }}
        onAnimationComplete={() => {
          // Hold on the brand, then trigger the exit handoff.
          setTimeout(onComplete, reduce ? 200 : 900);
        }}
      >
        <Logo className="scale-125" />
      </motion.div>
    </motion.div>
  );
}