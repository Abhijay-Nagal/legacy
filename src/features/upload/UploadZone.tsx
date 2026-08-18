"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { uploadPdf } from "@/lib/api";

type UploadZoneProps = {
  onUploaded: (docId: string, filename: string) => void;
};

export function UploadZone({ onUploaded }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { doc_id, filename } = await uploadPdf(file);
      onUploaded(doc_id, filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!loading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (loading) return;

    const file = e.dataTransfer.files[0];

    if (file) {
      void handleFile(file);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      void handleFile(file);
    }

    // Allows selecting the same file again after an error.
    e.target.value = "";
  };

  return (
    <motion.div
      role="button"
      tabIndex={loading ? -1 : 0}
      aria-label="Upload a PDF file"
      aria-busy={loading}
      onClick={() => {
        if (!loading) {
          inputRef.current?.click();
        }
      }}
      onKeyDown={(e) => {
        if (
          !loading &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={loading ? undefined : "hover"}
      initial="idle"
      animate={isDragging ? "drag" : "idle"}
      className={cn(
        "group relative flex aspect-square w-full max-w-md cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed p-10 transition-colors outline-none",
        "focus-visible:border-[var(--color-brand-cyan)]",
        loading && "cursor-wait",
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
        disabled={loading}
      />

      {/* Purple glow: hidden on normal hover, retained during drag */}
      <motion.div
        aria-hidden
        variants={{
          idle: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0, scale: 1 },
          drag: { opacity: 0.8, scale: 1.1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute h-48 w-48 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.2 292 / 70%), transparent 70%)",
        }}
      />

      {/* Plus / loading button */}
      <motion.div
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.08 },
          drag: { scale: 1.15 },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="glass flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border-strong)]"
      >
        {loading ? (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-text-faint)] border-t-[var(--color-text)]" />
        ) : (
          <Plus className="h-8 w-8 text-[var(--color-text)]" />
        )}
      </motion.div>

      <div className="relative text-center">
        <p className="font-medium text-[var(--color-text)]">
          {loading
            ? "Processing…"
            : isDragging
              ? "Drop to upload"
              : "Add PDF File Here"}
        </p>

        <p className="mt-1 text-sm text-[var(--color-text-faint)]">
          {loading
            ? "Gemini is reading your PDF"
            : "Drag & drop or click to browse"}
        </p>

        {error && (
          <p className="mt-3 max-w-xs text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </motion.div>
  );
}