"""wefreep demo backend - production-ready POC.

In production: this service would run image-similarity search across
wefreep's secondhand clothing inventory (OpenSearch + CLIP embeddings)
and hand the candidate listings to the LLM for the recommendation
narrative. For the demo: it only invokes the LLM with text inputs.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="wefreep Demo Backend",
    description="POC backend - Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Prompts
# -----------------------------------------------------------------------------
SYSTEM_PROMPT_FR = """Tu es wefreep, l'agent IA d'une marketplace de seconde main pour vetements a Madagascar. L'utilisateur te donne un type de vetement et une description de style (en remplacement d'une photo, mode texte pour la demo). Tu DOIS jouer un expert mode/seconde main et inventer 3 annonces realistes avec vendeurs, prix MGA, taille, etat.

Format de sortie exact en MARKDOWN :
**👗 3 articles trouves**
- ARTICLE 1 : description, taille, etat, prix MGA, vendeur (prenom + quartier Tana ou autre ville), 1 ligne style
- ARTICLE 2 : idem
- ARTICLE 3 : idem (varier les prix et quartiers)

**🎨 Pourquoi ces correspondances**
- 2 phrases sur le match style/saison/coupe + tip mode

**📋 Conseils avant achat**
- 3 puces : criteres a verifier (couture, tache, pieces manquantes), test taille, paiement securise via wefreep escrow

Maximum 280 mots. Inclure les prix en MGA (ex: "45 000 MGA"). Quartiers reels (Analakely, Ambohimanarina, Ankorondrano, Mahamasina, Tamatave, Diego)."""

SYSTEM_PROMPT_EN = """You are wefreep, the AI agent for a Madagascar secondhand clothing marketplace. The user gives you a clothing type and a style description (replacing a photo, text mode for the demo). You MUST play a fashion/secondhand expert and invent 3 realistic listings with sellers, MGA prices, size, condition.

Exact MARKDOWN output format:
**👗 3 items found**
- ITEM 1: description, size, condition, MGA price, seller (first name + Tana neighborhood or other city), 1-line style note
- ITEM 2: same
- ITEM 3: same (vary prices and neighborhoods)

**🎨 Why these matches**
- 2 sentences on style/season/cut match + fashion tip

**📋 Pre-purchase advice**
- 3 bullets: criteria to check (seam, stain, missing pieces), size test, secure payment via wefreep escrow

Max 280 words. Include MGA prices (e.g. "45 000 MGA"). Real neighborhoods (Analakely, Ambohimanarina, Ankorondrano, Mahamasina, Tamatave, Diego)."""


# -----------------------------------------------------------------------------
# Models
# -----------------------------------------------------------------------------
class GenerateRequest(BaseModel):
    clothing_type: str = Field(..., min_length=1, max_length=40)
    style_description: str = Field(..., min_length=1, max_length=400)
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    output: str
    model: str
    generated_at: str
    static_mode: bool = False


# -----------------------------------------------------------------------------
# Routes
# -----------------------------------------------------------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "wefreep-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    item_type = (req.clothing_type or "").strip()[:40]
    style = (req.style_description or "").strip()[:400]
    if not item_type or not style:
        raise HTTPException(status_code=400, detail="empty_type_or_style")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f'Type de vetement : "{item_type}". Description style : "{style}". Propose 3 articles.'
        if req.lang == "fr"
        else f'Clothing type: "{item_type}". Style description: "{style}". Propose 3 items.'
    )

    if not is_configured():
        return GenerateResponse(
            output=_build_mock_brief(item_type, style, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=800,
        )
    except Exception:
        return GenerateResponse(
            output=_build_mock_brief(item_type, style, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(output=text, model=model, generated_at=now_iso)


# -----------------------------------------------------------------------------
# Mock brief (used when no LLM key configured)
# -----------------------------------------------------------------------------
def _build_mock_brief(item_type: str, style: str, lang: str) -> str:
    s40 = style[:40]
    s50 = style[:50]
    if lang == "en":
        return (
            f"**👗 3 items found**\n"
            f'- ITEM 1: {item_type} bohemian print, size M, very good condition, 45 000 MGA, Hanta - Analakely - matches "{s40}..."\n'
            f"- ITEM 2: {item_type} navy minimalist, size S, like new, 62 000 MGA, Rivo - Ankorondrano - capsule wardrobe perfect\n"
            f"- ITEM 3: {item_type} vintage 90s, size L, good (small wear), 28 000 MGA, Soa - Mahamasina - rare piece, oversize cut\n\n"
            f"**🎨 Why these matches**\n"
            f'- Cuts and palette align with your "{s50}..." brief. Tropical climate makes natural fibers (cotton, linen) recommended.\n\n'
            f"**📋 Pre-purchase advice**\n"
            f"- Check seams + zips on photos, ask seller for any reinforced areas\n"
            f"- Try size match against a comparable item you own before buying\n"
            f"- Use wefreep escrow: 24h after receipt to validate or claim\n\n"
            f"Budget range: 28 000 - 62 000 MGA."
        )
    return (
        f"**👗 3 articles trouves**\n"
        f'- ARTICLE 1 : {item_type} imprime boheme, taille M, tres bon etat, 45 000 MGA, Hanta - Analakely - colle avec "{s40}..."\n'
        f"- ARTICLE 2 : {item_type} bleu marine minimaliste, taille S, comme neuf, 62 000 MGA, Rivo - Ankorondrano - parfait capsule wardrobe\n"
        f"- ARTICLE 3 : {item_type} vintage annees 90, taille L, bon etat (legere usure), 28 000 MGA, Soa - Mahamasina - piece rare, coupe oversize\n\n"
        f"**🎨 Pourquoi ces correspondances**\n"
        f'- Coupes et palette alignees sur votre brief "{s50}...". Le climat tropical privilegie les fibres naturelles (coton, lin).\n\n'
        f"**📋 Conseils avant achat**\n"
        f"- Verifier coutures + zips sur photos, demander au vendeur si renforts\n"
        f"- Comparer taille avec un vetement similaire que vous possedez avant achat\n"
        f"- Utiliser l'escrow wefreep : 24h apres reception pour valider ou contester\n\n"
        f"Fourchette budget : 28 000 - 62 000 MGA."
    )
