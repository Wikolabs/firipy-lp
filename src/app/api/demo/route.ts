import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es wefreep, l'agent IA d'une marketplace de seconde main pour vetements a Madagascar. L'utilisateur te donne un type de vetement et une description de style (en remplacement d'une photo, mode texte pour la demo). Tu DOIS jouer un expert mode/seconde main et inventer 3 annonces realistes avec vendeurs, prix MGA, taille, etat.

Format de sortie exact en MARKDOWN :
**👗 3 articles trouves**
- ARTICLE 1 : description, taille, etat, prix MGA, vendeur (prenom + quartier Tana ou autre ville), 1 ligne style
- ARTICLE 2 : idem
- ARTICLE 3 : idem (varier les prix et quartiers)

**🎨 Pourquoi ces correspondances**
- 2 phrases sur le match style/saison/coupe + tip mode

**📋 Conseils avant achat**
- 3 puces : criteres a verifier (couture, tache, pieces manquantes), test taille, paiement securise via wefreep escrow

Maximum 280 mots. Inclure les prix en MGA (ex: "45 000 MGA"). Quartiers reels (Analakely, Ambohimanarina, Ankorondrano, Mahamasina, Tamatave, Diego).`;

const SYSTEM_PROMPT_EN = `You are wefreep, the AI agent for a Madagascar secondhand clothing marketplace. The user gives you a clothing type and a style description (replacing a photo, text mode for the demo). You MUST play a fashion/secondhand expert and invent 3 realistic listings with sellers, MGA prices, size, condition.

Exact MARKDOWN output format:
**👗 3 items found**
- ITEM 1: description, size, condition, MGA price, seller (first name + Tana neighborhood or other city), 1-line style note
- ITEM 2: same
- ITEM 3: same (vary prices and neighborhoods)

**🎨 Why these matches**
- 2 sentences on style/season/cut match + fashion tip

**📋 Pre-purchase advice**
- 3 bullets: criteria to check (seam, stain, missing pieces), size test, secure payment via wefreep escrow

Max 280 words. Include MGA prices (e.g. "45 000 MGA"). Real neighborhoods (Analakely, Ambohimanarina, Ankorondrano, Mahamasina, Tamatave, Diego).`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const itemType: string = typeof body.itemType === "string" ? body.itemType.trim().slice(0, 40) : "";
    const style: string = typeof body.style === "string" ? body.style.trim().slice(0, 400) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!itemType || !style) {
      return NextResponse.json(
        { error: lang === "fr" ? "Selectionnez un type et decrivez le style." : "Select a type and describe the style." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique - la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode - LLM key will be configured at next deploy.",
          mockOutput: buildMock(itemType, style, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Type de vetement : "${itemType}". Description style : "${style}". Propose 3 articles.`
      : `Clothing type: "${itemType}". Style description: "${style}". Propose 3 items.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      800
    );

    return NextResponse.json({ output: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMock(itemType: string, style: string, lang: "fr" | "en"): string {
  if (lang === "en") {
    return `**👗 3 items found**\n- ITEM 1: ${itemType} bohemian print, size M, very good condition, 45 000 MGA, Hanta - Analakely - matches "${style.slice(0, 40)}..."\n- ITEM 2: ${itemType} navy minimalist, size S, like new, 62 000 MGA, Rivo - Ankorondrano - capsule wardrobe perfect\n- ITEM 3: ${itemType} vintage 90s, size L, good (small wear), 28 000 MGA, Soa - Mahamasina - rare piece, oversize cut\n\n**🎨 Why these matches**\n- Cuts and palette align with your "${style.slice(0, 50)}..." brief. Tropical climate makes natural fibers (cotton, linen) recommended.\n\n**📋 Pre-purchase advice**\n- Check seams + zips on photos, ask seller for any reinforced areas\n- Try size match against a comparable item you own before buying\n- Use wefreep escrow: 24h after receipt to validate or claim\n\nBudget range: 28 000 - 62 000 MGA.`;
  }
  return `**👗 3 articles trouves**\n- ARTICLE 1 : ${itemType} imprime boheme, taille M, tres bon etat, 45 000 MGA, Hanta - Analakely - colle avec "${style.slice(0, 40)}..."\n- ARTICLE 2 : ${itemType} bleu marine minimaliste, taille S, comme neuf, 62 000 MGA, Rivo - Ankorondrano - parfait capsule wardrobe\n- ARTICLE 3 : ${itemType} vintage annees 90, taille L, bon etat (legere usure), 28 000 MGA, Soa - Mahamasina - piece rare, coupe oversize\n\n**🎨 Pourquoi ces correspondances**\n- Coupes et palette alignees sur votre brief "${style.slice(0, 50)}...". Le climat tropical privilegie les fibres naturelles (coton, lin).\n\n**📋 Conseils avant achat**\n- Verifier coutures + zips sur photos, demander au vendeur si renforts\n- Comparer taille avec un vetement similaire que vous possedez avant achat\n- Utiliser l'escrow wefreep : 24h apres reception pour valider ou contester\n\nFourchette budget : 28 000 - 62 000 MGA.`;
}
