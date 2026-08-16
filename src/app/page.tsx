"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Intro } from "@/components/layout/Intro";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { UploadZone } from "@/features/upload/UploadZone";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!introDone && (
          <Intro key="intro" onComplete={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: introDone ? 0.2 : 0 }}
      >
        <DashboardShell>
          <UploadZone />
        </DashboardShell>
      </motion.div>
    </>
  );
}
