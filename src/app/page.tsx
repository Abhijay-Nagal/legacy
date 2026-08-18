"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Intro } from "@/components/layout/Intro";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { UploadZone } from "@/features/upload/UploadZone";
import { ResultsPanel } from "@/features/results/ResultsPanel";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [activeFeature, setActiveFeature] = useState<
    "qa" | "summary" | "flashcard" | null
  >(null);

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
        <DashboardShell
          docId={docId}
          activeFeature={activeFeature}
          onSelectFeature={setActiveFeature}
        >
          {docId === null ? (
            <UploadZone
              onUploaded={(uploadedDocId, uploadedName) => {
                setDocId(uploadedDocId);
                setFilename(uploadedName);
              }}
            />
          ) : (
            <ResultsPanel
              docId={docId}
              filename={filename}
              activeFeature={activeFeature}
              onReset={() => {
                setDocId(null);
                setFilename("");
                setActiveFeature(null);
              }}
            />
          )}
        </DashboardShell>
      </motion.div>
    </>
  );
}