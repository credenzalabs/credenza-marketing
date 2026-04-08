/*
 * CREDENZA — FOR DESIGNERS PAGE
 *
 * SECTION ORDER (by current value):
 *   1. Hero — certs + accounts, what you get today
 *   2. Account Management — core feature, works today
 *   3. Tax Strategy & Certs — the killer feature
 *   4. Verified Profile — why everything is stronger
 *   5. Firm & Team — supporting feature
 *   6. The Credenza Network — where it's going
 *   7. CTA — early access waitlist
 *
 * DESIGN: "Editorial Luxury"—generous whitespace, Freight serif,
 * thin 1px rules, asymmetric layouts, restrained color.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, Shield, Users, Zap, Menu, X, CreditCard, ChevronRight } from "lucide-react";

const C = {
  teal:         "#b8ccd2",
  tealMid:      "#7aa0a8",
  tealDim:      "rgba(184,204,210,0.15)",
  tealBorder:   "rgba(184,204,210,0.4)",
  forest:       "#21353f",
  charcoal:     "#1c1c19",
  charcoalMid:  "#3a3a34",
  charcoalSoft: "#6a6a62",
  ivory:        "#f0f0ec",
  sage:         "#e4e1d8",
  sageDark:     "#d8d4ca",
  white:        "#f0f0ec",
  olive:        "#6f6e4b",
  oliveMid:     "#8a8a5e",
  oliveDim:     "rgba(111,110,75,0.10)",
  oliveBorder:  "rgba(111,110,75,0.28)",
};

const LOGO_BLACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/CredenzaLogo_transparent_e1d9cbc2.png";

const IMAGES = {
  coastalLiving:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/coastal_living_room_bd460d9c.png",
  luxuryInterior:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/luxury_interior_22ba73a9.png",
  architecturalDetail:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/architectural_detail_3b5faa0a.png",
  residentialSpace:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/residential_space_8175bb89.png",
  coastalDining:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/coastal_dining_86764f0d.png",
};

// --- Scroll reveal ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// --- Eyebrow ---
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const lineColor = light ? "rgba(240,240,236,0.3)" : C.charcoalSoft;
  const textColor = light ? "rgba(240,240,236,0.55)" : C.charcoalSoft;
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "2rem", height: "1px", backgroundColor: lineColor, flexShrink: 0 }} />
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em",
        textTransform: "uppercase" as const, color: textColor, fontWeight: 600,
      }}>
        {children}
      </span>
    </div>
  );
}

// --- Navigation ---
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = ["For Designers", "For Vendors", "Integrations", "Pricing"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `0.5px solid ${C.sageDark}` : "0.5px solid transparent",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: scrolled ? "64px" : "80px", transition: "height 0.3s ease" }}>
          <a href="/" className="no-underline flex items-center flex-shrink-0">
            <img src={LOGO_BLACK} alt="Credenza" style={{ height: scrolled ? "36px" : "44px", width: "auto", maxWidth: "180px", objectFit: "contain", transition: "height 0.3s ease", flexShrink: 0 }} />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item} href={item === "For Designers" ? "/for-designers" : "#"}
                className="no-underline transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: item === "For Designers" ? C.olive : C.charcoalMid, fontWeight: item === "For Designers" ? 600 : 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                onMouseLeave={(e) => (e.currentTarget.style.color = item === "For Designers" ? C.olive : C.charcoalMid)}
              >{item}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="no-underline transition-colors duration-200"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: C.charcoalMid, fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalMid)}
            >Sign in</a>
            <a href="/" className="no-underline inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
            >Request access</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.forest }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: "#FFFFFF", borderColor: C.sage }}>
          <div className="container py-6 flex flex-col gap-5">
            {navLinks.map((item) => (
              <a key={item} href={item === "For Designers" ? "/for-designers" : "#"} className="no-underline"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: item === "For Designers" ? C.olive : C.charcoal, fontWeight: 500 }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


/* =========================================================================
   1. HERO
   ========================================================================= */
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "64px", minHeight: "90vh", display: "flex", alignItems: "center" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
        backgroundSize: "32px 32px", opacity: 0.35,
      }} />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>For interior designers</Eyebrow>

            <h1 className="font-freight mb-8" style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", lineHeight: 1.0, color: C.charcoal, letterSpacing: "-0.03em" }}>
              One place for
              <br />
              every trade account,
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>every certificate,</span>
              <br />
              every vendor.
            </h1>

            <p className="mb-10" style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: C.charcoalMid, maxWidth: "400px" }}>
              Manage your trade accounts, generate resale certificates engineered
              for maximum tax exemption wherever you do business, and apply instantly to
              vendors on the Credenza platform—so you spend your time designing,
              not filing paperwork.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a href="#" className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >Create your profile <ArrowRight size={14} /></a>
              <a href="#accounts" className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoal, border: `1px solid ${C.sageDark}`, borderRadius: "0", backgroundColor: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.forest; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.sageDark; }}
              >See how it works</a>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: <FileText size={12} />, text: "Certs engineered for maximum exemption wherever you buy" },
                { icon: <CreditCard size={12} />, text: "Every account, rep, and discount code in one dashboard" },
                { icon: <Zap size={12} />, text: "Apply instantly to vendors on the Credenza platform" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <span style={{ color: C.charcoalSoft, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, letterSpacing: "0.02em" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photography */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-3 h-full">
              <div className="col-span-8 overflow-hidden" style={{ aspectRatio: "3/4", position: "relative" }}>
                <img src={IMAGES.luxuryInterior} alt="Luxury interior" className="w-full h-full object-cover" style={{ display: "block" }} />
              </div>
              <div className="col-span-4 flex flex-col gap-3">
                <div className="overflow-hidden flex-1" style={{ minHeight: "0" }}>
                  <img src={IMAGES.architecturalDetail} alt="Architectural detail" className="w-full h-full object-cover" style={{ display: "block", aspectRatio: "1/1" }} />
                </div>
                <div className="p-4 flex flex-col gap-2" style={{ backgroundColor: C.forest, flexShrink: 0 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(240,240,236,0.45)" }}>Verified Trade Profile</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: C.ivory }}>Studio Whitmore</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.teal }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: C.teal }}>Powered by Credenza</span>
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "rgba(240,240,236,0.4)", marginBottom: "3px" }}>Tax-exempt in</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(240,240,236,0.7)" }}>12 states</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   2. TAX STRATEGY & CERTIFICATES — the killer feature
   ========================================================================= */
function TaxStrategy() {
  const ref = useReveal();
  const [activeState, setActiveState] = useState(0);
  const states = [
    { abbr: "NY", form: "ST-120", name: "New York" },
    { abbr: "CA", form: "BOE-230", name: "California" },
    { abbr: "TX", form: "01-339", name: "Texas" },
    { abbr: "GA", form: "ST-5", name: "Georgia" },
    { abbr: "IL", form: "CRT-61", name: "Illinois" },
    { abbr: "NJ", form: "ST-3", name: "New Jersey" },
    { abbr: "CO", form: "DR 0563", name: "Colorado" },
    { abbr: "PA", form: "REV-1220", name: "Pennsylvania" },
  ];

  return (
    <section id="tax-strategy" ref={ref} className="reveal py-24 md:py-36" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        {/* Section intro — full width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-7">
            <Eyebrow>Tax strategy & resale certificates</Eyebrow>
            <h2 className="font-freight" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)", lineHeight: 1.0, color: C.charcoal, letterSpacing: "-0.03em" }}>
              The broadest exemption coverage
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>you're legally entitled to.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Every state has different rules. Credenza's tax strategy engine evaluates your
              registrations and determines the optimal path—so you claim every exemption
              you're entitled to, with the right form, filled out correctly.
            </p>
          </div>
        </div>

        {/* Three strategy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 border-t" style={{ borderColor: C.sageDark }}>
          {[
            {
              title: "Your registrations, maximized",
              body: "Registered in one MTC member state? That single registration may cover purchases in dozens of others. Credenza identifies where your existing registrations already give you coverage—so you don't register state-by-state when you don't have to.",
            },
            {
              title: "The right form, the right exemption",
              body: "Each state has its own form, its own exemption categories, and its own rules about what qualifies. Credenza generates the correct form with the correct exemption type and scope—no guessing which box to check.",
            },
            {
              title: "Always current, never lapsed",
              body: "Resale certificates expire. Credenza monitors every expiration date and notifies you before anything lapses—so your tax-exempt status never changes because of a deadline you missed.",
            },
          ].map((card, i) => (
            <div key={card.title} className="py-8 pr-8 border-b" style={{ borderColor: C.sageDark, borderRight: i < 2 ? `1px solid ${C.sageDark}` : "none", paddingLeft: i > 0 ? "2rem" : "0" }}>
              <h3 className="font-freight mb-3" style={{ fontSize: "1.35rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Cert generator mockup — full width */}
        <div style={{ backgroundColor: C.forest, overflow: "hidden" }}>
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2">
              <FileText size={13} style={{ color: C.teal }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.ivory }}>Certificate Generator</span>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)" }}>
              {states[activeState].name} ({activeState + 1} of {states.length})
            </span>
          </div>

          {/* State tabs */}
          <div className="flex gap-0 border-b overflow-x-auto" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {states.map((s, i) => (
              <button key={s.abbr} onClick={() => setActiveState(i)}
                className="px-4 py-2.5 transition-all duration-150 flex-shrink-0"
                style={{
                  backgroundColor: activeState === i ? "rgba(184,204,210,0.12)" : "transparent",
                  borderBottom: activeState === i ? `2px solid ${C.teal}` : "2px solid transparent",
                  color: activeState === i ? C.teal : "rgba(255,255,255,0.35)",
                  fontFamily: "Inter, sans-serif", fontSize: "0.68rem",
                  fontWeight: activeState === i ? 600 : 400, letterSpacing: "0.04em", cursor: "pointer",
                }}
              >{s.abbr}</button>
            ))}
          </div>

          {/* Split: preview + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* PDF preview */}
            <div className="lg:col-span-8 p-6 md:p-8">
              <div style={{ backgroundColor: C.white, padding: "1.5rem" }}>
                <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: C.sage }}>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "4px" }}>
                      {states[activeState].name} &middot; Form {states[activeState].form}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 700, color: C.charcoal }}>Resale Certificate</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                    <Check size={9} style={{ color: C.teal }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", color: C.teal, fontWeight: 600 }}>Compliant</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { label: "Purchaser", value: "Studio Whitmore LLC" },
                    { label: "Seller", value: "Whitfield & Co." },
                    { label: "Tax Reg. No.", value: "NY-88-2194-7" },
                    { label: "Exemption type", value: "Resale — tangible personal property" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.56rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "2px" }}>{f.label}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoal, fontWeight: 500 }}>{f.value}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t" style={{ borderColor: C.sage }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.56rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "6px" }}>Authorized signature</div>
                  <div style={{ fontFamily: "cursive", fontSize: "1.6rem", color: C.forest, lineHeight: 1.1, borderBottom: `1px solid ${C.sage}`, paddingBottom: "4px" }}>Jane Whitmore</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: C.charcoalSoft, marginTop: "4px" }}>Principal, Studio Whitmore LLC</div>
                </div>
              </div>
            </div>

            {/* Field sidebar */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l p-5 md:p-6 flex flex-col gap-3.5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                Edit fields
              </div>
              {[
                { label: "Vendor", value: "Whitfield & Co." },
                { label: "Goods / services", value: "Fabrics, furniture, trimmings" },
                { label: "Business type", value: "LLC" },
                { label: "State tax ID", value: "NY-88-2194-7" },
                { label: "Title", value: "Principal" },
                { label: "Date", value: "March 20, 2026" },
              ].map((f) => (
                <div key={f.label}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "2px" }}>{f.label}</div>
                  <div className="px-2.5 py-1.5" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.7)" }}>{f.value}</span>
                  </div>
                </div>
              ))}
              <div className="mt-auto pt-4 flex gap-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5"
                  style={{ backgroundColor: C.teal, color: C.forest, fontFamily: "Inter, sans-serif", fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                  <FileText size={11} /> Download
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5"
                  style={{ backgroundColor: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "Inter, sans-serif", fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                  Send to vendor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b" style={{ borderColor: C.sageDark }}>
          {[
            { stat: "39", label: "state forms supported" },
            { stat: "45", label: "taxable states covered" },
            { stat: "MTC + SST", label: "cross-state strategies" },
            { stat: "Auto", label: "expiration monitoring" },
          ].map((item, i) => (
            <div key={item.label} className="py-6" style={{ borderRight: i < 3 ? `1px solid ${C.sageDark}` : "none", paddingLeft: i > 0 ? "1.5rem" : "0", paddingRight: "1.5rem" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1.5rem", fontWeight: 300, color: C.charcoal, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{item.stat}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: C.charcoalSoft, letterSpacing: "0.02em" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   3. ACCOUNT MANAGEMENT
   ========================================================================= */
function AccountManagement() {
  const ref = useReveal();
  return (
    <section id="accounts" ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#edeae3" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Trade account management</Eyebrow>
            <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}>
              Every account you hold.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>One dashboard.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              No more digging through emails to find an account number,
              discount code, or your rep's phone number. Credenza gives
              your whole firm a single view of every trade relationship.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Account dashboard mockup */}
            <div style={{ border: `1px solid ${C.sageDark}`, backgroundColor: "#FFFFFF", overflow: "hidden" }}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: C.sageDark }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", fontWeight: 600, color: C.charcoal, letterSpacing: "0.04em" }}>Trade Accounts</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.charcoalSoft }}>4 active accounts</span>
              </div>

              {/* Account rows */}
              {[
                { vendor: "Whitfield & Co.", rep: "Sarah Chen", status: "Active", discount: "Trade Net 30", cert: "NY, CA, TX" },
                { vendor: "Harmon Textiles", rep: "James Liu", status: "Active", discount: "40% off MSRP", cert: "NY, NJ" },
                { vendor: "Bellworth Home", rep: "Maria Santos", status: "Active", discount: "Trade pricing", cert: "CA, IL, GA" },
                { vendor: "Linden & Park", rep: "Unassigned", status: "Pending", discount: "--", cert: "NY" },
              ].map((row, i) => (
                <div key={row.vendor} className="grid grid-cols-12 gap-3 items-center px-5 py-3.5 border-b" style={{ borderColor: i < 3 ? C.sage : "transparent" }}>
                  <div className="col-span-3">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.charcoal }}>{row.vendor}</div>
                  </div>
                  <div className="col-span-2">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.52rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1px" }}>Rep</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: row.rep === "Unassigned" ? C.charcoalSoft : C.charcoal }}>{row.rep}</div>
                  </div>
                  <div className="col-span-2">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.52rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1px" }}>Discount</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: C.charcoal }}>{row.discount}</div>
                  </div>
                  <div className="col-span-2">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.52rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1px" }}>Certs on file</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: C.charcoal }}>{row.cert}</div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5" style={{
                      backgroundColor: row.status === "Active" ? C.oliveDim : C.tealDim,
                      border: `1px solid ${row.status === "Active" ? C.oliveBorder : C.tealBorder}`,
                    }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: row.status === "Active" ? C.olive : C.tealMid }}>{row.status}</span>
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <ChevronRight size={14} style={{ color: C.charcoalSoft }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supporting points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border-t" style={{ borderColor: C.sageDark }}>
          {[
            { title: "Certs attached to accounts", body: "When you generate a resale certificate, it links to the right vendor. When a cert expires, you know which accounts are affected." },
            { title: "Rep info at your fingertips", body: "Your assigned sales rep, their direct line, their email—synced from the vendor and always current. No more hunting through old emails." },
            { title: "Update once, update everywhere", body: "New address, new business name, new team member—change it in your profile and every vendor in the network sees the update." },
          ].map((item, i) => (
            <div key={item.title} className="py-8 pr-8" style={{ borderBottom: `1px solid ${C.sageDark}`, borderRight: i < 2 ? `1px solid ${C.sageDark}` : "none", paddingLeft: i > 0 ? "2rem" : "0" }}>
              <h3 className="font-freight mb-2" style={{ fontSize: "1.15rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{item.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   4. VERIFIED PROFILE — why everything is stronger
   ========================================================================= */
function VerifiedProfile() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed image with text overlay */}
      <div className="relative overflow-hidden" style={{ minHeight: "55vh" }}>
        <img src={IMAGES.coastalLiving} alt="Interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.92) 0%, rgba(33,53,63,0.7) 50%, rgba(33,53,63,0.2) 100%)` }} />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>Your verified profile</Eyebrow>
            <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}>
              Verified once.
              <br />
              <span className="italic" style={{ color: C.teal }}>Stronger over time.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
              Your EIN confirmed against IRS records. Your license validated with the
              state board. Your memberships checked against ASID and NCIDQ directories.
              Everything that makes your certificates and applications credible—verified
              once and stored in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Credential grid */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t" style={{ borderColor: C.sageDark }}>
          {[
            { label: "Business entity & EIN", detail: "Verified against IRS records via TINCheck—confirming your EIN matches your business name.", badge: "Verified" },
            { label: "State professional license", detail: "Validated directly against state license boards in NY, FL, GA, IL, LA, NV, TX, and DC.", badge: "Verified" },
            { label: "Sales tax registrations", detail: "State-specific format validation. Stored so your certificates are always pre-filled correctly.", badge: "Verified" },
            { label: "Professional memberships", detail: "ASID, AIA, NCIDQ, NKBA, ICAA—checked against member directories.", badge: "Verified" },
            { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice.", badge: "Verified" },
            { label: "Showhouse & press recognition", detail: "Matched against our database of 960+ showhouse participants and press coverage across 16 design publications.", badge: "We add this" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-start gap-4 py-5 border-b" style={{ borderColor: C.sageDark, paddingRight: i % 2 === 0 ? "2rem" : "0", paddingLeft: i % 2 === 1 ? "2rem" : "0", borderRight: i % 2 === 0 ? `1px solid ${C.sageDark}` : "none" }}>
              <div className="flex items-center justify-center flex-shrink-0 mt-0.5" style={{ width: "20px", height: "20px", backgroundColor: item.badge === "We add this" ? C.tealDim : C.oliveDim, border: `1px solid ${item.badge === "We add this" ? C.tealBorder : C.oliveBorder}` }}>
                <Check size={10} style={{ color: item.badge === "We add this" ? C.tealMid : C.oliveMid }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: C.charcoal }}>{item.label}</span>
                  {item.badge === "We add this" && (
                    <span className="px-1.5 py-0.5" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}`, fontFamily: "Inter, sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.tealMid }}>We add this</span>
                  )}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.charcoalSoft, lineHeight: 1.5 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   5. FIRM & TEAM
   ========================================================================= */
function FirmTeam() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#fdfcf9" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Built for the whole firm</Eyebrow>
            <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}>
              One account.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Everyone on the team.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Every team member gets their own login with the right level
              of access. Order notifications route to your firm's shared
              contact email. Add or remove anyone in one step.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                { icon: <Users size={14} />, title: "Individual logins, no shared passwords", body: "Each person has their own credentials. No 2FA headaches when someone's traveling, no guessing who's logged in." },
                { icon: <Shield size={14} />, title: "The right access for every role", body: "Designate authorized signers for resale certificates. Give your accountant read-only access to tax documents. Let junior designers browse without signing legal documents." },
                { icon: <Zap size={14} />, title: "One step to add or remove anyone", body: "New hire? Add them once and they see every vendor account. Someone leaves? Revoke access across every program at once." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <div className="flex items-center justify-center flex-shrink-0 mt-0.5" style={{ width: "28px", height: "28px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                    <span style={{ color: C.tealMid }}>{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: C.charcoal, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoalSoft, lineHeight: 1.6 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   6. THE CREDENZA NETWORK — where it's going
   ========================================================================= */
function Network() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.forest }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow light>The Credenza network</Eyebrow>
            <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}>
              Apply once.
              <br />
              <span className="italic" style={{ color: C.teal }}>Recognized everywhere.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(240,240,236,0.7)" }}>
              Credenza is building a network of vendors who run their trade programs
              on our platform. As vendors join, your verified profile and certificates
              attach automatically—no new forms, no document uploads. Check the
              vendor's terms and click Apply.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(240,240,236,0.7)" }}>
              The profile and certificates you build today will work at every vendor
              that joins the network tomorrow.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-0 border-t" style={{ borderColor: "rgba(240,240,236,0.12)" }}>
            {[
              { title: "Your profile travels with you", body: "Everything you verify with Credenza belongs to you—not to any vendor. Your credentials, your certificates, your account history." },
              { title: "One click to apply", body: "When a vendor runs their trade program on Credenza, applying means checking their terms and clicking a button. Your verified profile does the rest." },
              { title: "Approved faster", body: "Vendors who use Credenza set their own approval criteria. If your verified profile meets them, you're often approved in minutes—not days." },
            ].map((item) => (
              <div key={item.title} className="py-6 border-b" style={{ borderColor: "rgba(240,240,236,0.12)" }}>
                <h3 className="font-freight mb-2" style={{ fontSize: "1.25rem", color: C.white, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(240,240,236,0.55)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   7. CTA
   ========================================================================= */
function CTASection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
          <div className="relative overflow-hidden hidden lg:block" style={{ minHeight: "480px" }}>
            <img src={IMAGES.residentialSpace} alt="Residential space" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
          </div>

          <div className="p-10 md:p-14" style={{ backgroundColor: "#FFFFFF" }}>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="font-freight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}>
              Your verified profile
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>starts here.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.charcoalMid }}>
              Credenza is in early access. Join the waitlist and we'll reach out
              to get your profile set up—so you're ready the moment your first
              Credenza-powered vendor goes live.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { placeholder: "Your name", type: "text" },
                { placeholder: "Work email", type: "email" },
                { placeholder: "Firm name", type: "text" },
              ].map((field) => (
                <input key={field.placeholder} type={field.type} placeholder={field.placeholder}
                  className="w-full px-4 py-3 outline-none transition-all duration-150"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", border: `1px solid ${C.sageDark}`, backgroundColor: C.white, color: C.charcoal, borderRadius: "0" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.olive)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageDark)}
                />
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, borderRadius: "0", cursor: "pointer", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >Join the waitlist <ArrowRight size={14} /></button>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, textAlign: "center" as const, marginTop: "0.25rem" }}>
                We'll reach out within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   FOOTER
   ========================================================================= */
function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: C.sage, backgroundColor: "#FFFFFF" }}>
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <img src={LOGO_BLACK} alt="Credenza" style={{ height: "32px", width: "auto", marginBottom: "1rem" }} />
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: C.charcoalSoft, maxWidth: "240px" }}>
              The standard for trade programs in interior design.
            </p>
          </div>
          {[
            { heading: "Product", links: ["For Designers", "For Vendors", "Integrations", "Pricing"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { heading: "Resources", links: ["Documentation", "Status", "Support"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.charcoalMid, fontWeight: 600, marginBottom: "1rem" }}>{col.heading}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href={link === "For Designers" ? "/for-designers" : "#"} className="no-underline transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.charcoalSoft }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: C.sage }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}>&copy; 2026 Credenza Labs, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="no-underline" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


/* =========================================================================
   PAGE
   ========================================================================= */
export default function ForDesigners() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav />
      <Hero />
      <AccountManagement />
      <TaxStrategy />
      <VerifiedProfile />
      <FirmTeam />
      <Network />
      <CTASection />
      <Footer />
    </div>
  );
}
