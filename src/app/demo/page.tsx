"use client";
import { useState } from "react";

const PRODUCT = "wefreep";

const PAL = {
  bg: "#FFFAF5",
  bg2: "#FEEFDA",
  surface: "rgba(0,0,0,0.035)",
  surfaceHover: "rgba(0,0,0,0.06)",
  border: "rgba(0,0,0,0.08)",
  txt1: "#1F1408",
  txt2: "#5A4525",
  txt3: "#9A8460",
  accent: "#059669",
  accentSoft: "rgba(5,150,105,0.10)",
  accentBorder: "rgba(5,150,105,0.30)",
  accentGlow: "rgba(5,150,105,0.15)",
  navBg: "rgba(255,250,245,0.85)",
};

const ITEM_TYPES_FR = ["Robe", "T-shirt", "Jean", "Veste", "Pull", "Chemise", "Jupe", "Manteau", "Short", "Combinaison"];
const ITEM_TYPES_EN = ["Dress", "T-shirt", "Jeans", "Jacket", "Sweater", "Shirt", "Skirt", "Coat", "Shorts", "Jumpsuit"];

export default function DemoPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [itemType, setItemType] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [staticMode, setStaticMode] = useState(false);

  const itemList = lang === "fr" ? ITEM_TYPES_FR : ITEM_TYPES_EN;

  const t = lang === "fr" ? {
    back: "Retour", title: "Demo", sub: PRODUCT + " - marketplace seconde main Madagascar",
    desc: "Selectionnez un type de vetement et decrivez le style recherche (a la place d'une photo). L'agent IA propose 3 articles realistes avec vendeurs. Aucune annonce reelle - POC qui montre la logique de recherche par photo en production.",
    inputLabel: "Recherche style",
    placeholderType: "Type de vetement",
    placeholderStyle: "Description du style (ex: robe d'ete fluide, motif fleuri, manches courtes, beige ou pastel)",
    generate: "Trouver mes 3 articles", generating: "Recherche en cours...",
    outputTitle: "Articles trouves", emptyHint: "Les articles s'affichent ici une fois generes.",
    contactSeller: "Contacter le vendeur", reserveItem: "Reserver via escrow", checkRating: "Voir notes vendeur",
    contactMock: "Vendeur contacte sur la messagerie wefreep (mode demo, pas de message envoye)",
    reserveMock: "Article reserve via escrow (mode demo, pas de paiement reel)",
    ratingMock: "Notes vendeur affichees (mode demo, pas de base reelle)",
    fallback: "Mode statique : la cle LLM sera ajoutee au prochain deploiement.",
    poweredBy: "Modele :",
    note: "DEMO POC - aucune annonce reelle, aucune recherche par photo reelle. L'IA invente les articles pour la demonstration. En production, recherche par photo via vision model.",
  } : {
    back: "Back", title: "Demo", sub: PRODUCT + " - Madagascar secondhand marketplace",
    desc: "Select a clothing type and describe the style (instead of a photo). The AI agent suggests 3 realistic listings with sellers. No real listings - POC showing photo search production logic.",
    inputLabel: "Style search",
    placeholderType: "Clothing type",
    placeholderStyle: "Style description (e.g. flowing summer dress, floral print, short sleeves, beige or pastel)",
    generate: "Find my 3 items", generating: "Searching...",
    outputTitle: "Items found", emptyHint: "Items will appear here once generated.",
    contactSeller: "Contact seller", reserveItem: "Reserve via escrow", checkRating: "View seller ratings",
    contactMock: "Seller contacted on wefreep messaging (demo mode, no real message)",
    reserveMock: "Item reserved via escrow (demo mode, no real payment)",
    ratingMock: "Seller ratings displayed (demo mode, no real database)",
    fallback: "Static mode: LLM key will be added at next deploy.",
    poweredBy: "Model:",
    note: "DEMO POC - no real listings, no real photo search. The AI invents items for demonstration. In production, photo search via vision model.",
  };

  async function generate() {
    setError(""); setOutput(""); setModel(""); setStaticMode(false);
    if (!itemType.trim() || !style.trim()) {
      setError(lang === "fr" ? "Selectionnez un type et decrivez le style." : "Select a type and describe the style.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, style, lang }),
      });
      const j = await r.json();
      if (j.error === "llm_not_configured") {
        setOutput(j.mockOutput || ""); setStaticMode(true);
      } else if (j.error) {
        setError(j.message || j.error);
      } else {
        setOutput(j.output || ""); setModel(j.model || "");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }

  return (
    <div style={{ minHeight: "100vh", background: PAL.bg, color: PAL.txt1, display: "flex", flexDirection: "column" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .wk-input { width: 100%; padding: 12px 14px; border-radius: 10px; background: ${PAL.surface}; border: 1px solid ${PAL.border}; color: ${PAL.txt1}; font-family: inherit; font-size: 14px; transition: border-color .2s, background .2s; }
        .wk-input:focus { outline: none; border-color: ${PAL.accent}; background: ${PAL.surfaceHover}; }
        .wk-btn-primary { background: ${PAL.accent}; color: #FFFFFF; border: none; border-radius: 10px; padding: 13px 22px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; display: inline-flex; align-items: center; gap: 8px; }
        .wk-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
        .wk-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .wk-btn-ghost { background: ${PAL.surface}; color: ${PAL.txt1}; border: 1px solid ${PAL.border}; border-radius: 10px; padding: 9px 14px; font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: background .2s, border-color .2s; display: inline-flex; align-items: center; gap: 6px; }
        .wk-btn-ghost:hover { background: ${PAL.surfaceHover}; border-color: ${PAL.accentBorder}; }
        .wk-md p, .wk-md ul { margin: 0 0 10px; }
        .wk-md ul { padding-left: 18px; }
        .wk-md li { margin-bottom: 4px; line-height: 1.65; }
        .wk-md strong { color: ${PAL.accent}; font-weight: 700; display: block; margin-top: 10px; margin-bottom: 4px; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; }
        @media (max-width: 768px) { .demo-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <nav style={{ padding: "16px 32px", borderBottom: `1px solid ${PAL.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: PAL.navBg, backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <a href="/" style={{ color: PAL.accent, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          {"<- "}{t.back} {PRODUCT}<span style={{ color: PAL.accent }}>.</span>
        </a>
        <div style={{ display: "inline-flex", border: `1px solid ${PAL.border}`, borderRadius: 100, padding: 2, background: PAL.surface }}>
          <button onClick={() => setLang("fr")} style={{ background: lang === "fr" ? PAL.accent : "transparent", color: lang === "fr" ? "#FFFFFF" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>FR</button>
          <button onClick={() => setLang("en")} style={{ background: lang === "en" ? PAL.accent : "transparent", color: lang === "en" ? "#FFFFFF" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>EN</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, margin: "0 0 6px" }}>
          {t.title} - <em style={{ fontStyle: "italic", color: PAL.accent }}>{PRODUCT}</em>
        </h1>
        <p style={{ color: PAL.txt2, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 720, margin: "0 0 6px" }}>{t.sub}</p>
        <p style={{ color: PAL.txt3, fontSize: "0.78rem", lineHeight: 1.55, maxWidth: 720, margin: "0 0 28px" }}>{t.desc}</p>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
          <section style={{ background: PAL.surface, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22 }}>
            <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 14px" }}>{t.inputLabel}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              <select className="wk-input" value={itemType} onChange={(e) => setItemType(e.target.value)} style={{ appearance: "none", cursor: "pointer" }}>
                <option value="" style={{ background: PAL.bg }}>{t.placeholderType}</option>
                {itemList.map((s) => <option key={s} value={s} style={{ background: PAL.bg }}>{s}</option>)}
              </select>
              <textarea className="wk-input" value={style} onChange={(e) => setStyle(e.target.value)} placeholder={t.placeholderStyle} rows={5} style={{ resize: "vertical", fontFamily: "inherit" }} />
            </div>
            <button className="wk-btn-primary" disabled={loading} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "* " + t.generating : "+ " + t.generate}
            </button>
            {error && <div style={{ marginTop: 12, color: "#B91C1C", fontSize: 13, padding: "8px 12px", background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.3)", borderRadius: 8 }}>{error}</div>}
            <p style={{ color: PAL.txt3, fontSize: 11, lineHeight: 1.5, marginTop: 18, marginBottom: 0, paddingTop: 14, borderTop: `1px solid ${PAL.border}` }}>{t.note}</p>
          </section>

          <section style={{ background: PAL.bg2, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22, minHeight: 420, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: output ? "#22C55E" : PAL.txt3 }} />
                {t.outputTitle}
              </h2>
              {model && <span style={{ fontSize: 10, color: PAL.txt3, fontFamily: "monospace" }}>{t.poweredBy} {model}</span>}
            </div>

            {!output ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: PAL.txt3, fontSize: 14, textAlign: "center", padding: 30 }}>
                {t.emptyHint}
              </div>
            ) : (
              <div className="wk-md" style={{ color: PAL.txt1, fontSize: 14, lineHeight: 1.7, flex: 1 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }} />
            )}

            {output && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${PAL.border}` }}>
                <button className="wk-btn-ghost" onClick={() => showToast(t.contactMock)}>{t.contactSeller}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.reserveMock)}>{t.reserveItem}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.ratingMock)}>{t.checkRating}</button>
              </div>
            )}
            {staticMode && <div style={{ marginTop: 14, color: PAL.txt3, fontSize: 12, fontStyle: "italic" }}>{t.fallback}</div>}
          </section>
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: PAL.bg2, border: `1px solid ${PAL.accentBorder}`, borderRadius: 12, padding: "12px 20px", color: PAL.txt1, fontSize: 13, fontWeight: 600, zIndex: 50, backdropFilter: "blur(20px)", boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}>
          {"v "}{toast}
        </div>
      )}
    </div>
  );
}

function renderMarkdown(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks: string[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      blocks.push("<ul>" + listBuf.map((l) => `<li>${l}</li>`).join("") + "</ul>");
      listBuf = [];
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }
    if (line.startsWith("- ")) {
      listBuf.push(esc(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList();
      blocks.push(`<strong>${esc(line.slice(2, -2))}</strong>`);
    } else {
      flushList();
      blocks.push(`<p>${esc(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`);
    }
  }
  flushList();
  return blocks.join("");
}
