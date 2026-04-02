/*
 * CREDENZA — FOR DESIGNERS PAGE
 * Design: "Editorial Luxury"—trade infrastructure for the interior design industry (matches Home.tsx)
 *
 * DESIGN PRINCIPLES:
 *   - Generous whitespace—sections breathe, nothing competes
 *   - Large Freight serif at rest—not crammed, not animated to death
 *   - Thin 1px rules as section dividers and eyebrow separators
 *   - Asymmetric layouts—40/60 or 5/7 column splits, never centered grids
 *   - Photography that bleeds—no borders, no rounded corners, no shadows on images
 *   - All-caps spaced Inter for labels, eyebrows, nav items
 *   - Restrained color—ivory base, olive accent, forest for dark sections
 *
 * BRAND COLORS (same tokens as Home.tsx):
 *   --brand-olive:    #6f6e4b — primary accent, hero italic, eyebrows
 *   --brand-teal:     #b8ccd2 — technology/data signal only
 *   --brand-forest:   #21353f — dark sections, primary CTA background
 *   --brand-charcoal: #1c1c19 — primary text
 *   --brand-ivory:    #f0f0ec — page background
 *
 * POSITIONING (designer-facing):
 *   - "Verify once. Recognized everywhere."
 *   - One profile, one cert, works at every Credenza-powered vendor
 *   - Designers own their credentials—not locked to any one vendor
 *   - Resale cert generation: state-specific, signed, tracked
 *   - "The last trade application you'll ever fill out"
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, FileText, Shield, Star, Users, Zap, Menu, X } from "lucide-react";

// ─── Brand tokens (mirrors Home.tsx) ────────────────────────────────────────────
const C = {
  teal:         "#b8ccd2",
  tealMid:      "#7aa0a8",
  tealDim:      "rgba(184,204,210,0.15)",
  tealBorder:   "rgba(184,204,210,0.4)",
  forest:       "#21353f",
  brown:        "#6f6e4b",
  brownDim:     "rgba(111,110,75,0.1)",
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
  oliveLight:   "rgba(111,110,75,0.06)",
  cobalt:       "#7aa0a8",
  cobaltDim:    "rgba(184,204,210,0.08)",
  cobaltBorder: "rgba(184,204,210,0.25)",
};

const LOGO_BLACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/CredenzaLogo_transparent_e1d9cbc2.png";

const IMAGES = {
  coastalLiving:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/coastal_living_room_bd460d9c.png",
  interiorInstallation: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/interior_installation_88a2b194.png",
  luxuryInterior:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/luxury_interior_22ba73a9.png",
  architecturalDetail:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/architectural_detail_3b5faa0a.png",
  residentialSpace:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/residential_space_8175bb89.png",
  coastalDining:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/coastal_dining_86764f0d.png",
};

// ─── Scroll reveal hook ──────────────────────────────────────────────────────────
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

// ─── Eyebrow label ───────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const lineColor = light ? "rgba(240,240,236,0.3)" : C.charcoalSoft;
  const textColor = light ? "rgba(240,240,236,0.55)" : C.charcoalSoft;
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "2rem", height: "1px", backgroundColor: lineColor, flexShrink: 0 }} />
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.68rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: textColor,
        fontWeight: 600,
      }}>
        {children}
      </span>
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────────
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
              <a
                key={item}
                href={item === "For Designers" ? "/for-designers" : "#"}
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: item === "For Designers" ? C.olive : C.charcoalMid,
                  fontWeight: item === "For Designers" ? 600 : 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                onMouseLeave={(e) => (e.currentTarget.style.color = item === "For Designers" ? C.olive : C.charcoalMid)}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="no-underline transition-colors duration-200"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: C.charcoalMid, fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalMid)}
            >
              Sign in
            </a>
            <a
              href="/"
              className="no-underline inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                backgroundColor: C.teal,
                color: C.forest,
                outline: "0.5px solid #99b8bd", outlineOffset: "2px",
                borderRadius: "0",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
            >
              Request access
            </a>
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

// ─── Hero ────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "64px", minHeight: "90vh", display: "flex", alignItems: "center" }}
    >
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.35,
      }} />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* Left: Copy—5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>For interior designers</Eyebrow>

            <h1
              className="font-freight mb-8"
              style={{
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                lineHeight: 1.0,
                color: C.charcoal,
                letterSpacing: "-0.03em",
              }}
            >
              One profile.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Every vendor.</span>
              <br />
              No more paperwork.
            </h1>

            <p
              className="mb-10"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: C.charcoalMid,
                maxWidth: "400px",
              }}
            >
              One Credenza profile. One set of credentials. Recognized at every
              vendor and showroom that runs a Credenza-powered trade program—so
              you spend your time designing, not filling out paperwork.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href="#"
                className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >
                Create your profile <ArrowRight size={14} />
              </a>
              <a
                href="#how-it-works"
                className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoal, border: `1px solid ${C.sageDark}`, borderRadius: "0", backgroundColor: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.forest; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.sageDark; }}
              >
                See how it works
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <Shield size={12} />, text: "Your credentials stay with you—not locked to any vendor" },
                { icon: <FileText size={12} />, text: "Resale certs generated for every state you work in" },
                { icon: <Zap size={12} />, text: "Approved in minutes at every Credenza-powered program" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <span style={{ color: C.charcoalSoft, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, letterSpacing: "0.02em" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photography—7 columns */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-3 h-full">
              {/* Main image—tall */}
              <div
                className="col-span-8 overflow-hidden"
                style={{ aspectRatio: "3/4", position: "relative" }}
              >
                <img
                  src={IMAGES.luxuryInterior}
                  alt="Luxury interior"
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              </div>
              {/* Secondary stack */}
              <div className="col-span-4 flex flex-col gap-3">
                <div className="overflow-hidden flex-1" style={{ minHeight: "0" }}>
                  <img
                    src={IMAGES.architecturalDetail}
                    alt="Architectural detail"
                    className="w-full h-full object-cover"
                    style={{ display: "block", aspectRatio: "1/1" }}
                  />
                </div>
                {/* Verified badge card */}
                <div
                  className="p-4 flex flex-col gap-2"
                  style={{ backgroundColor: C.forest, flexShrink: 0 }}
                >
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(240,240,236,0.45)" }}>
                    Verified Trade Profile
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: C.ivory }}>
                    Studio Whitmore
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.teal }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: C.teal }}>Powered by Credenza</span>
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "rgba(240,240,236,0.4)", marginBottom: "3px" }}>Recognized at</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(240,240,236,0.7)" }}>14 vendors</div>
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

// ─── How It Works ────────────────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useReveal();
  const steps = [
    {
      num: "01",
      title: "Build your profile once",
      body: "Enter your business details, credentials, and memberships. Credenza verifies them directly—against state license boards, ASID and NCIDQ directories, Secretary of State records, and your online presence.",
    },
    {
      num: "02",
      title: "Apply to any vendor in seconds",
      body: "When a vendor runs their trade program on Credenza, your verified profile attaches automatically. No new forms. No document uploads. No waiting for someone to review what you've already proven.",
    },
    {
      num: "03",
      title: "Generate your resale certificates",
      body: "If you want tax exemption, tell Credenza which states you purchase in. We generate the correct state-specific form—NY ST-120, CA BOE-230, TX 01-339, and every other state—pre-filled with your verified information, ready for your authorized signature.",
    },
    {
      num: "04",
      title: "Change once, update everywhere",
      body: "New address, new teammate, new business name—update your profile once and every vendor in the Credenza network gets the change automatically. No emails, no re-applications, no calling each showroom individually.",
    },
    {
      num: "05",
      title: "Stay current without the work",
      body: "Credenza monitors your cert expiration dates and notifies you before anything lapses—so your exemption status never changes because of a paperwork deadline you missed.",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Four steps.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Then you're done.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Complete your profile in just a few minutes.
              After that, every vendor application is a single click.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="grid grid-cols-12 gap-6 py-8 border-b"
                  style={{ borderColor: C.sageDark }}
                >
                  <div className="col-span-2">
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: C.charcoalSoft, fontWeight: 300, letterSpacing: "0.04em" }}>
                      {step.num}
                    </span>
                  </div>
                  <div className="col-span-10">
                    <h3
                      className="font-freight mb-3"
                      style={{ fontSize: "1.25rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.2 }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: C.charcoalMid }}>
                      {step.body}
                    </p>
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

// ─── What Gets Verified ──────────────────────────────────────────────────────────
function WhatGetsVerified() {
  const ref = useReveal();
  const credentials = [
    { label: "Business entity & EIN", detail: "Stored and cross-referenced with Secretary of State registry—so you never have to explain your business structure to a vendor again.", badge: "Required" },
    { label: "Interior designer & architecture license", detail: "Validated against the issuing state board and stored in your profile. Licensed in multiple states? We keep track.", badge: "If applicable" },
    { label: "Sales tax ID", detail: "State-specific format validation and active registration check. Stored so your certs are always pre-filled correctly.", badge: "Required" },
    { label: "Professional memberships", detail: "ASID, AIA, NCIDQ, NKBA, ICAA—verified against member records and attached to your profile as trust signals.", badge: "If applicable" },
    { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice.", badge: "Required" },
    { label: "Instagram / portfolio", detail: "Evidence of an active, client-facing design practice.", badge: "If applicable" },
    { label: "Trade references", detail: "Verified on and off platform—existing vendor accounts within the Credenza network, plus direct outreach to references outside it.", badge: "If applicable" },
    { label: "Press & showhouse recognition", detail: "We actively augment your profile with press coverage and showhouse participation—AD, Veranda, Elle Decor, Kips Bay, and more—to help expedite and bolster approvals.", badge: "We add this" },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#edeae3" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Your credentials</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Verified once.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Trusted everywhere.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Your license, your memberships, your website, your tax ID—stored
              in one place, verified once, and recognized by every vendor in the
              Credenza network. You never have to prove yourself again.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              We also actively augment your profile with press coverage and
              showhouse participation we find on your behalf—so your profile
              gets stronger over time without any extra work from you.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {credentials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-5 py-5 border-b"
                  style={{ borderColor: C.sageDark }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ width: "22px", height: "22px", backgroundColor: C.oliveDim, border: `1px solid ${C.oliveBorder}` }}
                  >
                    <Check size={11} style={{ color: C.oliveMid }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: C.charcoal, marginBottom: "2px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: C.charcoalSoft, lineHeight: 1.5 }}>
                      {item.detail}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 px-2.5 py-1"
                    style={{
                      backgroundColor: item.badge === "Required" ? "rgba(111,110,75,0.08)" : item.badge === "We add this" ? C.tealDim : "transparent",
                      border: `1px solid ${item.badge === "Required" ? C.oliveBorder : item.badge === "We add this" ? C.tealBorder : C.sageDark}`,
                      borderRadius: "0",
                    }}
                  >
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.58rem",
                      color: item.badge === "Required" ? C.olive : item.badge === "We add this" ? C.tealMid : C.charcoalSoft,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                    }}>
                      {item.badge}
                    </span>
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

// ─── Resale Certs ────────────────────────────────────────────────────────────────
function ResaleCerts() {
  const ref = useReveal();
  const [activeState, setActiveState] = useState(0);
  const states = [
    { abbr: "NY", form: "ST-120", name: "New York" },
    { abbr: "CA", form: "BOE-230", name: "California" },
    { abbr: "TX", form: "01-339", name: "Texas" },
    { abbr: "FL", form: "DR-13", name: "Florida" },
    { abbr: "IL", form: "CRT-61", name: "Illinois" },
    { abbr: "WA", form: "REV 27 0032", name: "Washington" },
    { abbr: "NJ", form: "ST-3", name: "New Jersey" },
    { abbr: "CO", form: "DR 0563", name: "Colorado" },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="max-w-2xl mb-16">
          <Eyebrow>Resale certificates</Eyebrow>
          <h2
            className="font-freight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
          >
            Your certs, generated
            <br />
            <span className="italic" style={{ color: C.oliveMid }}>for every state you work in.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Features */}
          <div className="lg:col-span-5 flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
            {[
              {
                title: "State-specific forms, pre-filled",
                body: "Every state has its own form and format. Credenza generates the correct one—NY ST-120, CA BOE-230, TX 01-339—pre-filled with your verified business information.",
              },
              {
                title: "Maximum eligible exemption",
                body: "Credenza determines the correct exemption type and scope for each state—so you don't leave money on the table and vendors receive valid, compliant certs.",
              },
              {
                title: "Tracked for renewal",
                body: "Resale certs expire. Credenza monitors expiration dates and sends you reminders—so your tax compliance stays current without chasing paperwork deadlines.",
              },
              {
                title: "Signed by you, stored securely",
                body: "Resale certificates are legal documents. Credenza enforces that only authorized firm representatives can sign—and stores your executed certs securely in your profile.",
              },
            ].map((item) => (
              <div key={item.title} className="py-7 border-b" style={{ borderColor: C.sageDark }}>
                <h3
                  className="font-freight mb-2"
                  style={{ fontSize: "1.15rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}
                >
                  {item.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Cert mockup */}
          <div className="lg:col-span-7">
            <div style={{ backgroundColor: C.forest, overflow: "hidden" }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#e57373" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ffb74d" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#81c784" }} />
                <span className="ml-2" style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>
                  usecredenza.com/certs
                </span>
              </div>
              <div className="p-6">
                {/* State selector */}
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  Select state
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {states.map((s, i) => (
                    <button
                      key={s.abbr}
                      onClick={() => setActiveState(i)}
                      className="px-2.5 py-1 transition-all duration-150"
                      style={{
                        backgroundColor: activeState === i ? "rgba(184,204,210,0.18)" : "rgba(255,255,255,0.04)",
                        border: activeState === i ? `1px solid ${C.tealBorder}` : "1px solid rgba(255,255,255,0.08)",
                        color: activeState === i ? C.teal : "rgba(255,255,255,0.4)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: activeState === i ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {s.abbr} · {s.form}
                    </button>
                  ))}
                </div>

                {/* Cert preview */}
                <div style={{ backgroundColor: C.white, padding: "1.25rem" }}>
                  <div className="flex items-start justify-between mb-4 pb-3 border-b" style={{ borderColor: C.sage }}>
                    <div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "3px" }}>
                        {states[activeState].name} · Form {states[activeState].form}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: C.charcoal }}>
                        Resale Certificate
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                      <Check size={9} style={{ color: C.teal }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", color: C.teal, fontWeight: 600 }}>Compliant</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Purchaser", value: "Studio Whitmore LLC" },
                      { label: "Seller", value: "Kravet Inc." },
                      { label: "Tax Reg. No.", value: "NY-88-2194-7" },
                      { label: "Cert Date", value: "March 20, 2026" },
                    ].map((f) => (
                      <div key={f.label}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.56rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "2px" }}>{f.label}</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.charcoal, fontWeight: 500 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: C.sage }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.56rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "4px" }}>Authorized signature</div>
                    <div style={{ fontFamily: "cursive", fontSize: "1.5rem", color: C.forest, lineHeight: 1.1, borderBottom: `1px solid ${C.sage}`, paddingBottom: "4px" }}>Jane Whitmore</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.charcoalSoft, marginTop: "3px" }}>Principal, Studio Whitmore LLC · Authorized signer</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>
                    Stored in your profile · tracked for renewal · attaches automatically
                  </span>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5"
                    style={{ backgroundColor: C.teal, color: C.forest, fontFamily: "Inter, sans-serif", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
                  >
                    <FileText size={11} /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Network Effect ──────────────────────────────────────────────────────────────
function NetworkEffect() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed image with text overlay */}
      <div className="relative overflow-hidden" style={{ minHeight: "65vh" }}>
        <img
          src={IMAGES.coastalLiving}
          alt="Elegant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.9) 0%, rgba(33,53,63,0.65) 50%, rgba(33,53,63,0.15) 100%)` }}
        />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>The network effect</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              The last trade application
              <br />
              <span className="italic" style={{ color: C.teal }}>you'll ever fill out.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
              Every vendor that runs their trade program on Credenza already
              recognizes your verified profile. Apply once. Get approved at
              every showroom, fabric house, and furniture atelier in the
              Credenza network—without filling out another form.
            </p>
          </div>
        </div>
      </div>

      {/* Three benefits below */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              title: "Your profile. Your credentials.",
              body: "Everything you verify with Credenza belongs to you—not to any vendor. Your profile travels with you across every program in the network.",
            },
            {
              num: "02",
              title: "No more duplicate paperwork.",
              body: "Every vendor in the Credenza network accepts your verified profile. No new applications, no document re-uploads, no waiting for manual review.",
            },
            {
              num: "03",
              title: "Approved faster, every time.",
              body: "Vendors who use Credenza auto-approve designers who meet their criteria. If your profile is verified, you're often approved in minutes—not days.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-8"
              style={{
                border: `1px solid ${C.sageDark}`,
                backgroundColor: C.white,
              }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: C.charcoalSoft, letterSpacing: "0.06em", fontWeight: 300, marginBottom: "1.25rem" }}>
                {item.num}
              </div>
              <h3
                className="font-freight mb-3"
                style={{ fontSize: "1.35rem", color: C.charcoal, lineHeight: 1.2, letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: C.charcoalMid }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Firm & Team ────────────────────────────────────────────────────────────────
function FirmTeam() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#fdfcf9" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Built for the whole firm</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              One account.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Everyone on the team.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Credenza is built around a firm-and-employee structure. Every team
              member gets their own login—no shared passwords, no 2FA headaches
              when someone's traveling. Everyone has access to the accounts they
              need, with the right level of permissions.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              All order confirmations and updates route to a shared inbox, so
              your bookkeeper or accountant can stay in the loop without needing
              access to everything else.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                {
                  icon: <Users size={14} />,
                  title: "Individual logins for every team member",
                  body: "Each person on your team has their own credentials. No more sharing a single login or dealing with 2FA when someone else is logged in.",
                },
                {
                  icon: <Shield size={14} />,
                  title: "The right access for every role",
                  body: "Designate authorized signers for resale certificates. Give your accountant a read-only view of order history and tax documents. Let junior designers browse and purchase without signing legal documents. Everyone sees exactly what they need.",
                },
                {
                  icon: <FileText size={14} />,
                  title: "Shared order inbox",
                  body: "Order confirmations, shipping updates, and account activity route to a shared inbox. Your bookkeeper or accountant stays in the loop without needing access to the full account.",
                },
                {
                  icon: <Zap size={14} />,
                  title: "One step to add or remove anyone",
                  body: "New hire joins? Add them once and they're on every vendor account. Someone leaves? Revoke access across every program at once—no calling showrooms, no resetting shared passwords.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-5 py-6 border-b"
                  style={{ borderColor: C.sageDark }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ width: "28px", height: "28px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
                  >
                    <span style={{ color: C.tealMid }}>{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: C.charcoal, marginBottom: "4px" }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoalSoft, lineHeight: 1.6 }}>
                      {item.body}
                    </div>
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

// ─── Testimonial ─────────────────────────────────────────────────────────────────
function Testimonial() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.forest }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div style={{ width: "2rem", height: "1px", backgroundColor: C.olive, marginBottom: "2.5rem" }} />
          <blockquote
            className="font-freight mb-8"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)", lineHeight: 1.2, color: C.white, letterSpacing: "-0.02em" }}
          >
            "I used to spend an afternoon filling out trade applications every
            time I found a new vendor. With Credenza, I verified once and now
            every application takes about thirty seconds. It's genuinely changed
            how I approach sourcing."
          </blockquote>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(240,240,236,0.55)", letterSpacing: "0.04em" }}>
            <span style={{ fontWeight: 600, color: "rgba(240,240,236,0.9)" }}>Meredith Calloway</span>
            —Principal, Calloway Interiors · New York
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────────
function CTASection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
          {/* Left: Image */}
          <div className="relative overflow-hidden hidden lg:block" style={{ minHeight: "480px" }}>
            <img src={IMAGES.residentialSpace} alt="Residential space" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
          </div>

          {/* Right: CTA */}
          <div className="p-10 md:p-14" style={{ backgroundColor: "#FFFFFF" }}>
            <Eyebrow>Get started</Eyebrow>
            <h2
              className="font-freight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
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
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 outline-none transition-all duration-150"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    border: `1px solid ${C.sageDark}`,
                    backgroundColor: C.white,
                    color: C.charcoal,
                    borderRadius: "0",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.olive)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageDark)}
                />
              ))}
              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  backgroundColor: C.teal,
                  color: C.forest,
                  borderRadius: "0",
                  cursor: "pointer",
                  outline: "0.5px solid #99b8bd", outlineOffset: "2px",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >
                Join the waitlist <ArrowRight size={14} />
              </button>
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

// ─── Footer ──────────────────────────────────────────────────────────────────────
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
              <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.charcoalMid, fontWeight: 600, marginBottom: "1rem" }}>
                {col.heading}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href={link === "For Designers" ? "/for-designers" : "#"}
                    className="no-underline transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.charcoalSoft }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: C.sage }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}>
            © 2026 Credenza Labs, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="no-underline" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function ForDesigners() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <WhatGetsVerified />
      <ResaleCerts />
      <NetworkEffect />
      <FirmTeam />
      <Testimonial />
      <CTASection />
      <Footer />
    </div>
  );
}
