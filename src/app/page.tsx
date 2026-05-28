export default function Home() {
  const primary = "#059669";
  const bgLight = "#ecfdf5";

  const metrics = [
    { value: "IA Vision", label: "recherche par photo" },
    { value: "Prix juste", label: "estimation automatique" },
    { value: "24/7", label: "disponible" },
    { value: "Madagascar", label: "marché local" },
  ];

  const features = [
    {
      icon: "📸",
      title: "Cherchez par photo",
      desc: "Prenez en photo une tenue que vous aimez, wefreep.com trouve les pièces similaires disponibles dans toute la friperie malgache. Style, couleur, coupe — l'IA comprend votre goût.",
    },
    {
      icon: "💰",
      title: "Prix juste garanti",
      desc: "L'IA analyse le marché local et propose le prix équitable pour chaque article. Vendeurs : maximisez vos ventes. Acheteurs : ne payez jamais trop cher.",
    },
    {
      icon: "🎨",
      title: "Style personnel",
      desc: "wefreep.com apprend vos préférences et vous suggère des tenues cohérentes avec votre style. Composez des looks complets depuis les stocks de friperie disponibles à Madagascar.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Publiez ou cherchez",
      desc: "Vendeur : photographiez vos articles, l'IA les décrit et les prix automatiquement. Acheteur : décrivez ce que vous cherchez ou chargez une photo.",
    },
    {
      num: "02",
      title: "L'IA fait le matching",
      desc: "wefreep.com croise les stocks disponibles avec vos critères de style, taille, budget et localisation. Résultats pertinents en moins d'une seconde.",
    },
    {
      num: "03",
      title: "Achetez en confiance",
      desc: "Messagerie intégrée, estimation de condition de l'article par l'IA, et système de notation vendeur. Votre friperie en ligne, fiable et simple.",
    },
  ];

  return (
    <main style={{ fontFamily: "var(--font-body)" }}>
      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #a7f3d0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: primary }}>
            wefreep.com
          </span>
          <a
            href="https://calendly.com/wikolabs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: primary, color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}
          >
            Demander une démo
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${bgLight} 0%, #fff 60%)`, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", background: "#d1fae5", color: primary, borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Marketplace friperie · IA Made in Madagascar
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, color: "#111", marginBottom: 20 }}>
            La friperie malgache<br />
            <span style={{ color: primary }}>réinventée par l&apos;IA.</span>
          </h1>
          <p style={{ color: "#555", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 620, margin: "0 auto 36px" }}>
            Trouvez votre style. Vendez ce que vous n&apos;utilisez plus. L&apos;intelligence artificielle au service du marché de la friperie à Madagascar.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <a
              href="http://187.124.167.18:3057"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: primary, color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              Lancer la démo →
            </a>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#fff", color: primary, padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", border: `2px solid ${primary}` }}
            >
              Demander une démo
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20wefreep.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              WhatsApp
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ background: "#fff", border: "1px solid #a7f3d0", borderRadius: 12, padding: "20px 16px", boxShadow: "0 2px 8px rgba(5,150,105,0.06)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: primary }}>{m.value}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 48 }}>
            Ce que wefreep.com fait pour vous
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: bgLight, border: "1px solid #a7f3d0", borderRadius: 16, padding: "32px 28px" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#111", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: bgLight, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 48 }}>
            Comment ça fonctionne
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: "#fff", border: "1px solid #a7f3d0", borderRadius: 16, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 900, color: "#6ee7b7", minWidth: 56 }}>{s.num}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#111", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#555", lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 16 }}>
            Essayez maintenant
          </h2>
          <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 40 }}>
            Interface live — cherchez un vêtement par description ou par photo, directement ici.
          </p>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 48px rgba(5,150,105,0.12)", border: "1px solid #a7f3d0" }}>
            <iframe
              src="http://187.124.167.18:3057"
              style={{ width: "100%", height: 700, border: "none", display: "block" }}
              title="wefreep.com — Marketplace friperie IA"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: primary, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
            Mode durable. Prix accessible. Made in Madagascar.
          </h2>
          <p style={{ color: "#a7f3d0", fontSize: 17, marginBottom: 40 }}>
            Trouvez votre style. Vendez ce que vous n&apos;utilisez plus.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="http://187.124.167.18:3057"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#fff", color: primary, padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              Lancer la démo →
            </a>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,255,255,0.6)" }}
            >
              Demander une démo
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20wefreep.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: primary }}>wefreep.com</span>
          <p style={{ color: "#999", marginTop: 12, fontSize: 14 }}>
            by{" "}
            <a href="https://wikolabs.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "none" }}>
              Wikolabs
            </a>
          </p>
          <p style={{ color: "#777", marginTop: 8, fontSize: 13, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:team@wikolabs.com" style={{ color: "#aaa", textDecoration: "none" }}>team@wikolabs.com</a>
            <span>·</span>
            <a href="tel:+261386626100" style={{ color: "#aaa", textDecoration: "none" }}>+261 38 66 261 00</a>
            <span>·</span>
            <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>Prendre RDV</a>
          </p>
          <p style={{ color: "#555", marginTop: 8, fontSize: 13 }}>© {new Date().getFullYear()} Wikolabs. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
