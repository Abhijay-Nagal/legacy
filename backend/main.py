from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os

import store
import gemini_client

app = FastAPI(title="Legacy Backend", version="0.1.0")

# CORS — allow local development and the deployed Vercel frontend
FRONTEND_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://legacy-five-omega.vercel.app",
]

frontend_url = os.environ.get("FRONTEND_URL")

if frontend_url:
    frontend_url = frontend_url.strip().rstrip("/")

    if frontend_url not in FRONTEND_ORIGINS:
        FRONTEND_ORIGINS.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are accepted.",
        )

    try:
        pdf_bytes = await file.read()

        if not pdf_bytes:
            raise HTTPException(
                status_code=400,
                detail="Empty file.",
            )

        if len(pdf_bytes) > 20 * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail="PDF too large (max 20MB).",
            )

        text = gemini_client.extract_text_from_pdf(pdf_bytes)
        doc_id = store.save_doc(file.filename, text)

        return {
            "doc_id": doc_id,
            "filename": file.filename,
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Processing failed: {e}",
        )


# ---- Request models ----

class QARequest(BaseModel):
    doc_id: str
    question: str


class DocRequest(BaseModel):
    doc_id: str


def _load_text(doc_id: str) -> str:
    doc = store.get_doc(doc_id)

    if doc is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found. Upload first.",
        )

    return doc["text"]


@app.post("/qa")
def qa(req: QARequest):
    text = _load_text(req.doc_id)

    prompt = (
        "You are answering questions about the following document. "
        "Answer ONLY from its content. If the answer isn't present, say so.\n\n"
        f"DOCUMENT:\n{text}\n\n"
        f"QUESTION: {req.question}"
    )

    try:
        return {
            "answer": gemini_client.ask_gemini(prompt)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Q&A failed: {e}",
        )


@app.post("/summary")
def summary(req: DocRequest):
    text = _load_text(req.doc_id)

    prompt = (
        "Summarize the following document clearly and concisely, "
        "covering the main points as bullet points.\n\n"
        f"DOCUMENT:\n{text}"
    )

    try:
        return {
            "summary": gemini_client.ask_gemini(prompt)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Summary failed: {e}",
        )


@app.post("/flashcards")
def flashcards(req: DocRequest):
    text = _load_text(req.doc_id)

    prompt = (
        "Create 8 study flashcards from the following document. "
        "Return ONLY a JSON array, each item "
        "{\"question\": \"...\", \"answer\": \"...\"}. "
        "No markdown, no code fences.\n\n"
        f"DOCUMENT:\n{text}"
    )

    try:
        import json

        raw = gemini_client.ask_gemini(prompt).strip()

        # Strip accidental code fences
        if raw.startswith("```"):
            raw = raw.split("```")[1].replace("json", "", 1).strip()

        cards = json.loads(raw)

        return {
            "flashcards": cards
        }

    except json.JSONDecodeError:
        # Fallback: return raw text so the demo doesn't hard-crash
        return {
            "flashcards_raw": raw
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Flashcards failed: {e}",
        )