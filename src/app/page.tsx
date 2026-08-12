"use client";

import { AnimatePresence, motion } from "motion/react";
import { Intro } from "@/components/layout/Intro";
import { useIntroSeen } from "@/lib/useIntroSeen";

export default function Home() {
  const { seen, markSeen } = useIntroSeen();

  if (seen === null) return <div className="min-h-screen bg-[var(--color-bg)]" />;

  return (
    <>
      <AnimatePresence mode="wait">
        {!seen && <Intro key="intro" onComplete={markSeen} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: seen ? 1 : 0 }}
        transition={{ duration: 0.6, delay: seen ? 0.2 : 0 }}
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-text-muted">Dashboard coming in Phase 3.</p>
      </motion.main>
    </>
  );
}