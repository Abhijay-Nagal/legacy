"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO(phase-backend): read e.dataTransfer.files here
  };
  const handleSelect = () => {
    // TODO(phase-backend): read inputRef.current?.files here
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Upload a PDF file"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover="hover"
      initial="idle"
      animate={isDragging ? "drag" : "idle"}
      className={cn(
        "group relative flex aspect-square w-full max-w-md cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed p-10 transition-colors outline-none",
        "focus-visible:border-[var(--color-brand-cyan)]",
        isDragging
          ? "border-[var(--color-brand-violet)] bg-[var(--color-surface-hover)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-surface)]"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleSelect}
        className="hidden"
      />

      <motion.div
        aria-hidden
        variants={{
          idle: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0.5, scale: 1 },
          drag: { opacity: 0.8, scale: 1.1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute h-48 w-48 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.2 292 / 70%), transparent 70%)",
        }}
      />

      <motion.div
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.08 },
          drag: { scale: 1.15 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border-strong)]"
      >
        <Plus className="h-8 w-8 text-[var(--color-text)]" />
      </motion.div>

      <div className="relative text-center">
        <p className="font-medium text-[var(--color-text)]">
          {isDragging ? "Drop to upload" : "Add PDF File Here"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-faint)]">
          Drag &amp; drop or click to browse
        </p>
      </div>
    </motion.div>
  );
}
