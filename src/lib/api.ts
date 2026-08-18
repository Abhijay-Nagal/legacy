const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function uploadPdf(
  file: File
): Promise<{ doc_id: string; filename: string }> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error((await res.json()).detail ?? "Upload failed");
  }

  return res.json();
}

export async function askQa(docId: string, question: string): Promise<string> {
  const res = await fetch(`${BASE}/qa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      doc_id: docId,
      question,
    }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).detail ?? "Q&A failed");
  }

  return (await res.json()).answer;
}

export async function getSummary(docId: string): Promise<string> {
  const res = await fetch(`${BASE}/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc_id: docId }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).detail ?? "Summary failed");
  }

  return (await res.json()).summary;
}

export type Flashcard = {
  question: string;
  answer: string;
};

export async function getFlashcards(docId: string): Promise<Flashcard[]> {
  const res = await fetch(`${BASE}/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc_id: docId }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).detail ?? "Flashcards failed");
  }

  return (await res.json()).flashcards ?? [];
}
