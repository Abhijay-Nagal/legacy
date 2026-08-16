"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";

function SweepText({
  text,
  className,
  reduce,
  isLight,
}: {
  text: string;
  className?: string;
  reduce: boolean | null;
  isLight: boolean;
}) {
  const base = isLight ? "oklch(0.22 0.03 265)" : "oklch(0.98 0 0)";
  const glint = "oklch(0.62 0.24 300)";

  if (reduce) {
    return (
      <div className={className}>
        <span style={{ color: base }}>{text}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.span
        className="inline-block overflow-visible"
        style={{
          padding: "0.15em 0.05em",
          backgroundImage: `linear-gradient(105deg, ${base} 40%, ${glint} 50%, ${base} 60%)`,
          backgroundSize: "250% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: 1.1,
        }}
        initial={{ backgroundPositionX: "100%" }}
        animate={{ backgroundPositionX: "0%" }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.55 }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function useIsLightTheme() {
  return useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("light"),
    () => false
  );
}

export function Intro({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const isLight = useIsLightTheme();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <motion.div
        className="inline-flex flex-col items-center px-6 py-8 sm:items-start sm:px-16 md:px-24"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setTimeout(onComplete, reduce ? 200 : 1100)}
      >
        {/* Wordmark lockup: glyph = the "L", flush to EGACY */}
        <div className="flex items-end justify-center">
          <motion.div
            className="-mr-4 shrink-0 sm:-mr-6 md:-mr-12"
            initial={reduce ? {} : { filter: "brightness(1)" }}
            animate={
              reduce
                ? {}
                : {
                    filter: [
                      "brightness(1)",
                      "brightness(1.7)",
                      "brightness(1)",
                    ],
                  }
            }
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.55 }}
          >
            <LogoMark className="h-24 w-24 sm:h-36 sm:w-36 md:h-60 md:w-60" />
          </motion.div>

          <SweepText
            text="EGACY"
            className="font-sans text-5xl font-bold tracking-tight sm:text-7xl md:text-[10rem]"
            reduce={reduce}
            isLight={isLight}
          />
        </div>

        {/* Tagline — scales down on mobile, aligns left from small screens up */}
        <SweepText
          text="LEARN. UNDERSTAND. REMEMBER."
          className="mt-4 text-center text-xs font-bold tracking-[0.15em] sm:text-left sm:text-xl sm:tracking-[0.18em] md:text-4xl"
          reduce={reduce}
          isLight={isLight}
        />
      </motion.div>
    </motion.div>
  );
}
