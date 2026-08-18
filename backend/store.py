"""In-memory document store. Swap this for MongoDB later
without touching the API layer."""

import uuid

_docs: dict[str, dict] = {}


def save_doc(filename: str, text: str) -> str:
    doc_id = str(uuid.uuid4())
    _docs[doc_id] = {"filename": filename, "text": text}
    return doc_id


def get_doc(doc_id: str) -> dict | None:
    return _docs.get(doc_id)