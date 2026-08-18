"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { askQa, getSummary, getFlashcards, type Flashcard } from "@/lib/api";

type Feature = "qa" | "summary" | "flashcard" | null;

export function ResultsPanel({
  docId,
  filename,
  activeFeature,
  onReset,
}: {
  docId: string;
  filename: string;
  activeFeature: Feature;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-2">
      <div className="flex items-center justify-between">
        <span className="truncate text-sm text-[var(--color-text-muted)]">
          {filename}
        </span>
        <button
          onClick={onReset}
          className="glass-hover rounded-lg px-3 py-1.5 text-sm font-medium"
        >
          Upload another
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeFeature === null && (
          <div className="flex h-full items-center justify-center text-[var(--color-text-faint)]">
            Pick a feature from the sidebar to begin.
          </div>
        )}
        {activeFeature === "qa" && <QAView docId={docId} />}
        {activeFeature === "summary" && <SummaryView docId={docId} />}
        {activeFeature === "flashcard" && <FlashcardView docId={docId} />}
      </div>
    </div>
  );
}

function QAView({ docId }: { docId: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      setAnswer(await askQa(docId, question));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Q&A failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask a question about the document…"
          className="glass flex-1 rounded-xl px-4 py-3 outline-none"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="glass-hover rounded-xl px-5 py-3 font-medium disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Ask"}
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 whitespace-pre-wrap"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

function SummaryView({ docId }: { docId: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setSummary(await getSummary(docId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Summary failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={generate}
        disabled={loading}
        className="glass-hover self-start rounded-xl px-5 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Summarizing…" : "Generate summary"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 whitespace-pre-wrap"
        >
          {summary}
        </motion.div>
      )}
    </div>
  );
}

function FlashcardView({ docId }: { docId: string }) {
  const [cards, setCards] = useState<Flashcard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setCards(await getFlashcards(docId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Flashcards failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={generate}
        disabled={loading}
        className="glass-hover self-start rounded-xl px-5 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Generating…" : "Generate flashcards"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {cards && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards.map((card, i) => (
            <FlashcardItem key={i} card={card} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FlashcardItem({ card, index }: { card: Flashcard; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => setFlipped((f) => !f)}
      className="glass glass-hover min-h-28 rounded-xl p-4 text-left"
    >
      <p className="text-xs tracking-wide text-[var(--color-text-faint)] uppercase">
        {flipped ? "Answer" : "Question"}
      </p>
      <p className="mt-1 font-medium">
        {flipped ? card.answer : card.question}
      </p>
    </motion.button>
  );
}
