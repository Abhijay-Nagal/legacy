import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
MODEL = "gemini-3.5-flash"


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Send the PDF to Gemini and get its full text content back."""
    response = client.models.generate_content(
        model=MODEL,
        contents=[
            types.Part.from_bytes(data=pdf_bytes, mime_type="application/pdf"),
            "Extract all text content from this document. "
            "Preserve structure like headings and lists. Return only the text.",
        ],
    )
    return response.text


def ask_gemini(prompt: str) -> str:
    """Generic text prompt to Gemini."""
    response = client.models.generate_content(model=MODEL, contents=prompt)
    return response.text