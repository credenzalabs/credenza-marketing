/**
 * CREDENZA HOMEPAGE
 * Design: "Editorial Luxury"—trade infrastructure for the interior design industry
 *
 * DESIGN PRINCIPLES:
 *   - Generous whitespace—sections breathe, nothing competes
 *   - Large Freight serif at rest—not crammed, not animated to death
 *   - Thin 1px rules as section dividers and eyebrow separators
 *   - Asymmetric layouts—40/60 or 5/7 column splits, never centered grids
 *   - Photography that bleeds—no borders, no rounded corners, no shadows on images
 *   - All-caps spaced Inter for labels, eyebrows, nav items
 *   - Restrained color—ivory base, teal accent, forest for dark sections
 *   - Micro-animations: fade-up on scroll only, no bouncing or spinning
 *
 * BRAND COLORS:
   *   --brand-olive:    #6f6e4b —primary accent, hero italic, eyebrows, CTA hover
   *   --brand-teal:     #b8ccd2 —technology/data signal, DataSection, Powered by Credenza badge
 *   --brand-forest:   #21353f —dark sections, primary CTA background
 *   --brand-brown:    #6f6e4b —warm secondary, editorial accents
 *   --brand-charcoal: #1c1c19 —primary text
 *   --brand-ivory:    #f0f0ec —page background
 *   --brand-sage:     #e4e1d8 —secondary surface / thin borders
   *   NOTE: Olive replaces teal as primary accent; teal is now reserved for data/tech contexts
   *   NOTE: Cobalt #7aa0a8 is used ONLY for verified status badges—not a brand color
 *
 * FONTS:
 *   Headlines: freight-display-pro (Adobe Fonts Typekit—vqm2hhx)
 *   Body/UI:   Inter (Google Fonts)
 *
 * POSITIONING:
 *   - CO-BRANDED infrastructure—"Secure Trade Profile · Powered by Credenza"
 *   - NOT white-label, NOT a marketplace, never takes margin or client relationships
 *   - NETWORK EFFECT—one verified profile, recognized across every vendor
 *   - "The last trade application they'll ever fill out"
 *   - Shopify + ERP integration—approved designers become active trade accounts automatically
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, FileText, Info, Lock, Menu, Shield, X, Zap, Store, Settings, MoveRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ─── Photo Credit Tooltip ─────────────────────────────────────────────────────
function PhotoCredit({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="absolute bottom-3 right-3 z-20 flex items-center justify-center"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: dark ? "1px solid rgba(0,0,0,0.2)" : "1px solid rgba(255,255,255,0.35)",
            background: dark ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.25)",
            cursor: "default",
          }}
        >
          <Info size={12} color={dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)"} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        sideOffset={6}
        className=""
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "4px 8px",
          background: "rgba(26,26,26,0.85)",
          color: "rgba(255,255,255,0.85)",
          border: "none",
          borderRadius: "0",
          backdropFilter: "blur(4px)",
        }}
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── Brand tokens ────────────────────────────────────────────────────────────────
const C = {
  teal:         "#b8ccd2",
  tealLight:    "#d8e8ec",
  tealMid:      "#7aa0a8",
  tealDim:      "rgba(184,204,210,0.15)",
  tealBorder:   "rgba(184,204,210,0.4)",
  forest:       "#21353f",
  forestDim:    "rgba(33,53,63,0.06)",
  forestBorder: "rgba(33,53,63,0.18)",
  brown:        "#6f6e4b",
  brownLight:   "#dddec4",
  brownDim:     "rgba(111,110,75,0.1)",
  charcoal:     "#1c1c19",
  charcoalMid:  "#3a3a34",
  charcoalSoft: "#6a6a62",
  ivory:        "#f0f0ec",
  pageWhite:     "#fdfcf9",
  sage:         "#e4e1d8",
  sageDark:     "#d8d4ca",
  white:        "#f0f0ec",
  // Olive — editorial accent (hero italic, eyebrows, CTA hover)
  olive:        "#6f6e4b",
  oliveMid:     "#8a8a5e",
  oliveDim:     "rgba(111,110,75,0.1)",
  oliveBorder:  "rgba(111,110,75,0.3)",
  oliveLight:   "#dddec4",
  // Status only—NOT a brand color
  cobalt:       "#7aa0a8",
  cobaltDim:    "rgba(184,204,210,0.08)",
  cobaltBorder: "rgba(184,204,210,0.25)",
};

const LOGO_BLACK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/CredenzaLogo_transparent_e1d9cbc2.png";

const IMAGES = {
  // Emily Janak Interiors — hero pair
  emilyJanakLivingRoom:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/emily-janak-living-room_5497e677.webp",
  emilyJanakDining:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/emily-janak-dining_06074056.webp",
  emilyJanakCabin:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/emily-janak-cabin_844af761.webp",
  // Studio Dorion — hero pair
  studioDorionBrownstone: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/studio-dorion-park-slope-brownstone_543060ca.avif",
  studioDorionNoho:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/studio-dorion-noho-apartment_77856e33.avif",
  // Alison Rose — kitchen detail (Arch Digest)
  alisonRoseKitchen:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/alison-rose-kitchen_ed131ff5.jpg",
  // Benjamin Vandiver — Hamptons living room + Nashville bedroom
  benjaminVandiverHamptons:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/benjamin-vandiver-hamptons_3659a357.jpg",
  benjaminVandiverNashville: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/benjamin-vandiver-nashville-bedroom_d7543bc9.jpg",
  // Nick Olson — colorful living room
  nickOlsonReidRolls:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/nick-olson-reid-rolls_d58f9523.webp",
  // Caroline Gidiere — Overhill project
  carolineGidiereBedroom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/cg-overhill-bedroom_b4b2c11c.jpg",
  carolineGidiereSitting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/cg-overhill-sitting_d02cf9fa.webp",
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
function Eyebrow({ children, light = false, teal = false }: { children: React.ReactNode; light?: boolean; teal?: boolean }) {
  const lineColor = light ? "rgba(240,240,236,0.3)" : teal ? C.tealMid : C.sageDark;
  const textColor = light ? "rgba(240,240,236,0.55)" : teal ? C.tealMid : C.charcoalSoft;
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

  const navLinks = ["For Designers", "For Vendors", "Pricing"];

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
                  color: C.charcoalMid,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalMid)}
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
              href="#"
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
              <a key={item} href="#" className="no-underline"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.charcoal, fontWeight: 500 }}>
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: C.sage }}>
              <a href="#" className="no-underline text-center py-2.5 px-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoal, border: `1px solid ${C.sageDark}`, borderRadius: "0" }}>
                Sign in
              </a>
              <a href="#" className="no-underline text-center py-2.5 px-4 flex items-center justify-center gap-2"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}>
                Request access
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Security Strip ─────────────────────────────────────────────────────────────
function SecurityStrip() {
  return (
    <div
      style={{
        backgroundColor: C.forest,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 40,
      }}
    >
      <div className="container">
        <div
          className="flex items-center justify-center flex-wrap gap-x-8 gap-y-1.5"
          style={{ paddingTop: "0.55rem", paddingBottom: "0.55rem" }}
        >
          {[
            { icon: <Lock size={10} />, text: "Bank-level encryption · All data in transit and at rest" },
            { icon: <Shield size={10} />, text: "SOC 2 Type II in progress" },
            { icon: <Check size={10} />, text: "No data sold. No third-party ad tracking." },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span style={{ color: C.teal, flexShrink: 0 }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                  color: "rgba(240,240,236,0.6)",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────────
const HERO_FIRMS = [
  { name: "Studio Dorion", location: "New York, NY", main: IMAGES.studioDorionBrownstone, secondary: IMAGES.studioDorionNoho },
  { name: "Emily Janak Interiors", location: "Jackson, WY", main: IMAGES.emilyJanakLivingRoom, secondary: IMAGES.emilyJanakDining },
  { name: "Caroline Gidiere Design", location: "Birmingham, AL", main: IMAGES.carolineGidiereSitting, secondary: IMAGES.carolineGidiereBedroom },
];

function Hero() {
  const [firm] = useState(() => HERO_FIRMS[Math.floor(Math.random() * HERO_FIRMS.length)]);
  const visible = true;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.35,
      }} />

      <div className="container relative z-10 py-12 md:py-16">
        {/* Editorial layout: text-heavy left, full-bleed image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch" style={{ alignItems: "stretch" }}>

          {/* Left: Copy—5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>The Standard for Trade Programs</Eyebrow>

            <h1
              className="font-freight mb-8"
              style={{
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                lineHeight: 1.0,
                color: C.charcoal,
                letterSpacing: "-0.03em",
              }}
            >
              The infrastructure
              <br />
              behind every <span className="italic" style={{ color: C.oliveMid }}>distinguished</span>
              <br />
              trade program.
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
              Trade verification, onboarding, and exemption compliance, built for
              vendors who take their program seriously—and the designers they serve.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href="#"
                className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >
                Request access
              </a>
              <a
                href="#"
                className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoal, border: `1px solid ${C.sageDark}`, borderRadius: "0", backgroundColor: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.forest; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.sageDark; }}
              >
                See how it works
              </a>
            </div>

            {/* Trust signals—thin rule style */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <FileText size={12} />, text: "Compliant resale certs · All 50 states · State-specific forms" },
                { icon: <Shield size={12} />, text: "Verified Trade Profile · Powered by Credenza" },
                { icon: <Store size={12} />, text: "Shopify & ERP integration · Auto-creates trade accounts" },
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

          {/* Right: Photography—side by side */}
          <div className="lg:col-span-7 flex">
            <div className="grid grid-cols-7 gap-3 flex-1">
              {/* Main image—fills full height of left copy column */}
              <div className="col-span-4 overflow-hidden" style={{ minHeight: "400px" }}>
                <img
                  src={firm.main}
                  alt={`${firm.name} project`}
                  className="w-full h-full object-cover"
                  style={{ transform: "scale(1.02)", objectPosition: "left center" }}
                />
              </div>

              {/* Secondary image + caption below, 3 cols */}
              <div className="col-span-3 flex flex-col">
                <div className="overflow-hidden flex-1" style={{ minHeight: "300px" }}>
                  <img
                    src={firm.secondary}
                    alt={`${firm.name} interior`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verified profile card — full width, left aligned */}
                <div style={{
                  marginTop: "0.75rem",
                  border: `1px solid ${C.sageDark}`,
                  padding: "0.75rem 0.875rem",
                  backgroundColor: C.ivory,
                  /* card uses ivory */
                }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.tealMid, marginBottom: "0.3rem" }}>
                    Verified Trade Profile
                  </div>
                  <div className="font-freight" style={{ fontSize: "1rem", color: C.charcoal, lineHeight: 1.2, marginBottom: "0.35rem" }}>
                    {firm.name}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: C.tealMid }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.55rem", color: C.charcoalSoft, letterSpacing: "0.03em" }}>Powered by Credenza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div style={{ width: "1px", height: "40px", backgroundColor: C.sageDark }} />
        <ChevronDown size={14} style={{ color: C.charcoalSoft }} />
      </div>
    </section>
  );
}

// ─── Logo Bar ────────────────────────────────────────────────────────────────────
function LogoBar() {
  const ref = useReveal();
  const names = ["Kravet", "Holly Hunt", "Schumacher", "Kneedler Fauchère", "Donghia", "Cowtan & Tout", "Brunschwig & Fils", "Lee Jofa"];
  return (
    <section
      ref={ref}
      className="reveal py-10 border-y"
      style={{ borderColor: C.sage, backgroundColor: "#FFFFFF" }}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-5">
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: C.charcoalSoft,
          }}>
            Trusted by
          </span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {names.map((name) => (
              <span
                key={name}
                className="font-freight"
                style={{ fontSize: "1rem", color: C.oliveMid, letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── What Credenza Is ────────────────────────────────────────────────────────────
function PositioningSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed image with text overlay */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <img
          src={IMAGES.nickOlsonReidRolls}
          alt="Elegant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.88) 0%, rgba(33,53,63,0.6) 50%, rgba(33,53,63,0.1) 100%)` }}
        />
        <PhotoCredit name="Designed by Nick Olsen · Photo by Reid Rolls" />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>What Credenza is</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              <span className="italic" style={{ color: C.teal }}>Infrastructure,</span> not
              <br />
              a marketplace.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
              Your client relationships stay yours. Your margin stays yours.
              Credenza is the trusted identity layer that makes trade programs
              work—the plumbing your designers
              and your team never have to think about.
            </p>
          </div>
        </div>
      </div>

      {/* Three pillars below the image */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              title: "Your brand. Your relationship.",
              body: "Credenza runs the infrastructure behind your program. Your team focuses on the business, not the paperwork.",
            },
            {
              num: "02",
              title: "Your margin, untouched.",
              body: "We don't take a percentage of sales, transactions, or designer spend.",
            },
            {
              num: "03",
              title: "Verified once. Trusted everywhere.",
              body: <>We pre-verify credentials so your team can say yes—<em>fast.</em></>,
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
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: C.oliveMid, letterSpacing: "0.06em", fontWeight: 400, marginBottom: "1.25rem" }}>
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

// ─── Portable Identity ─────────────────────────────────────────────────────────
function PortableIdentitySection() {
  const ref = useReveal();
  const vendors = [
    { name: "Vanthorpe & Co.", type: "Furniture atelier" },
    { name: "Hive Modern", type: "Showroom" },
    { name: "Arteriors", type: "Lighting & décor" },
    { name: "Holly Hunt", type: "Fabric & furniture" },
    { name: "Kravet", type: "Fabric & trim" },
  ];
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.sageDark}` }}>
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div>
            <Eyebrow>Portable identity</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              One profile.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Every vendor.</span>
              <br />
              Always current.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: C.charcoalMid, maxWidth: "460px", marginBottom: "2rem" }}>
              A designer fills out one profile, gets verified once, and that profile works across every vendor on the platform. No re-entering business information, tax IDs, references, or uploading certs again. At renewal, Credenza re-verifies the sales tax ID is still active before re-generating the new certificate.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: C.charcoalMid, maxWidth: "460px", marginBottom: "2.5rem" }}>
              The second application is one click. The third is one click. Every application after the first is one click—because the profile is already verified.
            </p>

            {/* Vendor-side callout */}
            <div
              className="p-5"
              style={{ borderLeft: `3px solid ${C.olive}`, backgroundColor: C.oliveLight }}
            >
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: C.charcoal, fontStyle: "italic" }}>
Your designers already have verified profiles when they apply. Higher completion rates. Better data quality. Less friction—because the hard part is already done.
              </p>
            </div>
          </div>

          {/* Right: profile card traveling across vendors */}
          <div className="flex flex-col gap-4">

            {/* Profile card */}
            <div
              className="p-5 mb-2"
              style={{ backgroundColor: C.forest, border: `1px solid rgba(255,255,255,0.08)` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.teal, marginBottom: "0.4rem" }}>Verified Trade Profile</div>
                  <div style={{ fontFamily: "'freight-display-pro', Georgia, serif", fontSize: "1.3rem", color: C.white, letterSpacing: "-0.01em" }}>Studio Whitmore LLC</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(240,240,236,0.5)", marginTop: "0.2rem" }}>Interior Design · New York, NY</div>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1"
                  style={{ backgroundColor: "rgba(184,204,210,0.15)", border: `1px solid ${C.tealBorder}` }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.teal }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.teal }}>Verified</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "EIN", value: "47-2819304", verified: true },
                  { label: "Sales Tax ID", value: "NY-88-2194-7", verified: true },
                  { label: "ASID", value: "Member #88241", verified: true },
                  { label: "Resale Cert", value: "NY ST-120 · on file", verified: true },
                ].map((f) => (
                  <div key={f.label} className="px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderLeft: `2px solid ${C.tealBorder}` }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(240,240,236,0.4)", marginBottom: "0.2rem" }}>{f.label}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.white }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor application rows */}
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoalSoft, marginBottom: "0.25rem", paddingLeft: "0.25rem" }}>Applied to</div>
            <div className="flex flex-col gap-2">
              {vendors.map((v, i) => (
                <div
                  key={v.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.sageDark}` }}
                >
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.charcoal, fontWeight: 500 }}>{v.name}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft }}>{v.type}</div>
                  </div>
                  {i === 0 ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.cobaltDim, border: `1px solid ${C.cobaltBorder}` }}>
                      <Check size={10} style={{ color: C.cobalt }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.cobalt }}>Approved</span>
                    </div>
                  ) : i === 1 ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.cobaltDim, border: `1px solid ${C.cobaltBorder}` }}>
                      <Check size={10} style={{ color: C.cobalt }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.cobalt }}>Approved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.oliveDim, border: `1px solid ${C.oliveBorder}` }}>
                      <Zap size={10} style={{ color: C.oliveMid }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.oliveMid }}>Express apply</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", lineHeight: 1.6, color: C.charcoalSoft, paddingLeft: "0.25rem", marginTop: "0.25rem" }}>
              Full profile verified once at application. Sales tax ID re-verified at each renewal. Every subsequent application uses the same verified data—no re-entry, no re-upload.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Verification ────────────────────────────────────────────────────────────────
function VerificationSection() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const checks = [
    { label: "EIN / Business entity", detail: "Cross-referenced with Secretary of State registry" },
    { label: "Sales tax ID", detail: "State-specific format validation and active registration check in available states" },
    { label: "Professional memberships", detail: "ASID, AIA, NCIDQ, NKBA, ICAA directories—verified against member records" },
    { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice" },
    { label: "Instagram / portfolio", detail: "Evidence of an active, client-facing design practice" },
    { label: "License verification (where required)", detail: "Interior design license verified in the 8 states with practice acts; architecture licenses cross-referenced with NCARB records. Tax permit verification active in 21+ states. Not a blanket check—coverage is state-specific and clearly scoped." },
    { label: "Resale certificates", detail: "State-specific or multi-state form, signed by authorized firm representative" },
    { label: "Trade references", detail: "Verified on and off platform—existing vendor accounts within the Credenza network, plus direct outreach to references outside it" },
    { label: "Press & showhouse recognition", detail: "AD, Veranda, Elle Decor, Kips Bay Decorator Show House, and more" },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#edeae3" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Eyebrow>Verification engine</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Nine checks.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Zero manual follow-up.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Generic document tools store what you send them. Credenza
              verifies it—cross-referencing Secretary of State records,
              state licensing boards, NCARB, ASID, and more. Every check
              runs in parallel, so a complete verification takes minutes,
              not days of back-and-forth.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              The result: a verified profile your team can trust on sight—
              and a designer who never has to prove themselves again.
            </p>
            {/* Stat callout */}
            <div
              className="mt-8 flex items-center gap-5 px-5 py-4"
              style={{ backgroundColor: "#edeae3", border: `1px solid ${C.sageDark}` }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "2.5rem", fontWeight: 700, color: C.oliveMid, lineHeight: 1, letterSpacing: "-0.03em", flexShrink: 0 }}>9</div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.charcoal }}>Automated verification checks</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>Run in parallel on every profile. Expand each check below to see what we verify.</div>
              </div>
            </div>
          </div>

          {/* Verification checklist—collapsible accordion */}
          <div className="lg:col-span-7">
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {checks.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={item.label} className="border-b" style={{ borderColor: C.sageDark }}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 py-4 text-left"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "1.1rem 0" }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: "22px", height: "22px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
                      >
                        <Check size={11} style={{ color: C.tealMid }} />
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: C.charcoal, flex: 1 }}>
                        {item.label}
                      </span>
                      <div
                        className="ml-auto flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 mr-3"
                        style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: "0" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.tealMid }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.tealMid, fontWeight: 600, letterSpacing: "0.06em" }}>VERIFIED</span>
                      </div>
                      <ChevronDown
                        size={14}
                        style={{
                          color: C.charcoalSoft,
                          flexShrink: 0,
                          transition: "transform 0.2s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.82rem",
                          color: C.charcoalSoft,
                          lineHeight: 1.65,
                          paddingBottom: "1rem",
                          paddingLeft: "38px",
                        }}
                      >
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Resale Certificates ─────────────────────────────────────────────────────────
function CertSection() {
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
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Resale certificates & tax exemption</Eyebrow>
            <h2
              className="font-freight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Just sign.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Everything else is already done.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Other tools send a pre-filled form with the vendor’s name and address—then hand it back to the designer to complete. Credenza fills every field, validates the data before it enters the certificate, and presents a ready-to-sign document. First time and every renewal.
            </p>
          </div>
        </div>

        {/* Comparison strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-12" style={{ backgroundColor: C.sageDark }}>
          <div className="p-6" style={{ backgroundColor: C.ivory }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoalSoft, marginBottom: "0.75rem" }}>Other tools</div>
            <div className="flex flex-col gap-2.5">
              {[
                "Pre-fill vendor name and address only",
                "Designer downloads and fills in the rest",
                "No validation—bad data goes straight into the cert",
                "Wrong document risk: designer can submit a seller's permit, W-9, or any other form",
                "Exemption scope left to the designer to figure out—often under-claimed",
                "Upload states: designer re-uploads to every new vendor",
                "Renewal: same manual process, repeated every 1–3 years",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-1 w-3 h-3 flex-shrink-0 flex items-center justify-center" style={{ border: `1px solid ${C.sageDark}` }}>
                    <X size={7} style={{ color: C.charcoalSoft }} />
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoalSoft, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6" style={{ backgroundColor: "#FFFFFF" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.tealMid, marginBottom: "0.75rem" }}>Credenza</div>
            <div className="flex flex-col gap-2.5">
              {[
                "Every field pre-filled from the designer's verified profile",
                "Sales tax ID validated before it enters the certificate",
                "Correct form routed automatically for each designer-vendor intersection",
                "Designer can only submit the right document—wrong forms aren't an option",
                "Maximum exemption applied—designers often don't know which forms they're eligible to use",
                "Upload states: upload once, all connected vendors receive it",
                "Renewal: Credenza detects expiry, pre-fills the new cert, sales tax ID re-verified active, designer signs",
                "No-expiry states: business info confirmed every 3 years—closed firms don't keep trade pricing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-1 w-3 h-3 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                    <Check size={7} style={{ color: C.tealMid }} />
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoal, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: brief features */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "46 sales-tax states covered", body: "Every state-specific form—NY ST-120, CA BOE-230, TX 01-339, and all others—generated with the correct format, fields, and exemption scope." },
                { title: "Validated data, not just collected data", body: "Sales tax IDs, EINs, and entity names are verified against authoritative sources before they appear in any certificate. Invalid data never reaches a vendor." },
                { title: "The right form, every time—no exceptions", body: "Credenza determines the correct form for each designer-vendor intersection and routes accordingly. Designers are never presented with the wrong document type. A seller\u2019s permit, a W-9, a generic exemption form—none of those can be submitted in place of the correct resale certificate." },
                { title: "Maximum exemption, every time", body: "Most designers don\u2019t know which exemption forms they\u2019re eligible to use in each state. Credenza does. It selects the correct exemption form for the designer\u2019s situation and applies the broadest scope they\u2019re entitled to—so they\u2019re never under-exempted because of a knowledge gap." },
                { title: "Signed by authorized representatives only", body: "Resale certs are legal documents signed under penalty of perjury. Credenza enforces signing authority—only firm owners and designated signers can execute them." },
                { title: "Living compliance", body: "Entity name change? New product category? Credenza detects the gap and requests a fresh cert automatically. For states with no certificate expiration, Credenza confirms business information is still current every three years—protecting your margin from firms that have closed and your liability from certs tied to a defunct business." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <h3 className="font-freight mb-2" style={{ fontSize: "1.05rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
                </div>
              ))}
            </div>
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
                  usecredenza.com/generate
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
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pb-3 border-b" style={{ borderColor: C.sage }}>
                    <div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "3px" }}>
                        {states[activeState].name} · Form {states[activeState].form}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: C.charcoal }}>
                        Resale Certificate
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: C.cobaltDim, border: `1px solid ${C.cobaltBorder}` }}>
                      <Check size={9} style={{ color: C.cobalt }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", color: C.cobalt, fontWeight: 600 }}>Compliant</span>
                    </div>
                  </div>

                  {/* All fields — fully filled, each with a validated badge */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                    {[
                      { label: "Purchaser", value: "Studio Whitmore LLC", validated: true },
                      { label: "Seller", value: "Vanthorpe & Co.", validated: false },
                      { label: "EIN", value: "47-2819304", validated: true },
                      { label: "Sales Tax ID", value: "NY-88-2194-7", validated: true },
                      { label: "Business address", value: "142 W 26th St, New York NY", validated: true },
                      { label: "Cert Date", value: "March 20, 2026", validated: false },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="flex items-center gap-1 mb-0.5">
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.54rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{f.label}</div>
                          {f.validated && (
                            <div className="flex items-center gap-0.5" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}`, padding: "0px 4px" }}>
                              <Check size={6} style={{ color: C.tealMid }} />
                              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: C.tealMid, fontWeight: 600, letterSpacing: "0.04em" }}>validated</span>
                            </div>
                          )}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.charcoal, fontWeight: 500 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Signature area */}
                  <div className="pt-3 border-t" style={{ borderColor: C.sage }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.56rem", color: C.charcoalSoft, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "4px" }}>Authorized signature</div>
                    <div style={{ fontFamily: "cursive", fontSize: "1.5rem", color: C.forest, lineHeight: 1.1, borderBottom: `1px solid ${C.sage}`, paddingBottom: "4px" }}>Elsie de Wolfe</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.charcoalSoft, marginTop: "3px" }}>Principal, Studio de Wolfe LLC · Authorized signer</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.tealMid }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                      Stored in profile · all connected vendors receive this cert
                    </span>
                  </div>
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

// ─── For Vendors ─────────────────────────────────────────────────────────────────
function ForVendors() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed header image */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/bunny-williams-bedroom_fb34ed35.webp" alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.88) 0%, rgba(33,53,63,0.6) 50%, rgba(33,53,63,0.1) 100%)` }} />
        <PhotoCredit name="Designed by Bunny Williams · Photo by Reid Rolls" />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>For vendors & showrooms</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              Your rules. Your approvals.
              <br />
              <span className="italic" style={{ color: C.teal }}>Your program.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Requirements */}
          <div>
            <h3 className="font-freight mb-4" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Set exactly what you require.
            </h3>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: '15px', lineHeight: 1.75, color: C.charcoalMid }}>
              Every vendor's trade program is different. A high-volume fabric
              house and a luxury furniture atelier have very different bars.
              Credenza lets you configure exactly what's required to apply—
              and what earns a deserving designer faster approval.
            </p>
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "Set your own application requirements", body: "Require a resale cert, EIN, business license, ASID membership, or any combination. Credenza's form adapts to your rules—designers see your requirements clearly." },
                { title: "Define auto-approval conditions", body: "Designers who meet your criteria are approved in minutes—not days, not weeks. Nights and weekends included. No one waits for a human to come back to the office." },
                { title: "Always in control", body: "Auto-approval is a choice, not a requirement. You can review every application manually, turn on auto-approval for designers who meet your criteria, or mix both. Credenza never approves anyone without your explicit criteria being met." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <h4 className="font-freight mb-2" style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em" }}>{item.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Auto-approval mockup */}
          <div>
            <h3 className="font-freight mb-4" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Approved in minutes, not days.
            </h3>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: '13px', lineHeight: 1.75, color: C.charcoalMid }}>
              When a designer meets your criteria, Credenza's rule engine
              evaluates their verified profile instantly and notifies both
              parties—no inbox required.
            </p>

            {/* Rule engine mockup */}
            <div style={{ backgroundColor: C.forest, overflow: "hidden" }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>
                  Approval rules · Your program
                </div>
              </div>
              <div className="p-5">
                {/* Rule conditions */}
                <div className="mb-4">
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
                    Auto-approve when all conditions are met:
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "ASID membership verified", status: "pass" },
                      { label: "License verified (practice-act state)", status: "pass" },
                      { label: "EIN matches Secretary of State", status: "pass" },
                      { label: "Valid sales tax ID", status: "pass" },
                    ].map((rule) => (
                      <div key={rule.label} className="flex items-center gap-3 px-3 py-2.5"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: rule.status === "pass" ? "rgba(184,204,210,0.2)" : "rgba(107,114,128,0.15)",
                            border: rule.status === "pass" ? `1px solid ${C.tealBorder}` : "1px solid rgba(107,114,128,0.3)",
                          }}>
                          <Check size={9} style={{ color: rule.status === "pass" ? C.teal : C.charcoalSoft }} />
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>{rule.label}</span>
                        {rule.status === "optional" && (
                          <span className="ml-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.charcoalSoft }}>optional</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="flex items-center gap-3 px-4 py-3 mt-2"
                  style={{ backgroundColor: "rgba(184,204,210,0.12)", border: `1px solid ${C.tealBorder}` }}>
                  <Zap size={14} style={{ color: C.teal, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.teal }}>
                      Auto-approved · 4 minutes after submission
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>
                      Trade account created
                    </div>
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

// ─── Integrations ────────────────────────────────────────────────────────────────
function IntegrationsSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden relative" style={{ aspectRatio: "4/5" }}>
              <img src={IMAGES.alisonRoseKitchen} alt="Interior installation" className="w-full h-full object-cover" />
              <PhotoCredit name="Designed by Alison Rose NY · Photo by Reid Rolls" />
            </div>

          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Eyebrow>Integrations</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Approved. Active.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>No manual steps.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Approval is not the finish line—it’s the starting gun. The moment
              a designer is approved, Credenza creates their customer account,
              applies the correct state-level tax exemption, and sets their
              trade pricing tier. No one on your team touches a keyboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <Store size={18} />,
                  title: "Shopify",
                  badge: "Available now",
                  body: "Approved designers become Shopify customers instantly—tagged with your trade pricing, state-level tax exemptions applied, and placed in the correct tier. No CSV exports. No manual customer creation.",
                },
                {
                  icon: <Settings size={18} />,
                  title: "Custom stacks & ERPs",
                  badge: "Coming soon",
                  body: "Direct integrations for custom e-commerce stacks and ERP systems are on the roadmap. If you’re running something bespoke, let’s talk—we’re building this with early partners.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5"
                  style={{ backgroundColor: C.ivory, border: `1px solid ${C.sageDark}` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span style={{ color: C.charcoalSoft }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        color: item.badge === "Available now" ? C.tealMid : C.charcoalSoft,
                        fontWeight: 600,
                        border: `1px solid ${item.badge === "Available now" ? C.tealBorder : C.sageDark}`,
                        padding: "2px 6px",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="font-freight mb-2" style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em" }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65, color: C.charcoalMid }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                "Shopify customer account created on approval",
                "State-level tax exemption applied at the correct rate",
                "Trade pricing tier set based on your program rules",
                "Cert expiration tracked—exemptions updated on renewal",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 flex-shrink-0" style={{ backgroundColor: C.tealMid }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: C.charcoalMid }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tiers ───────────────────────────────────────────────────────────────────────
function TiersSection() {
  const ref = useReveal();
  // Example tiers — vendor-defined names and discount levels
  const exampleTiers = [
    { name: "Trade",     discount: "20%",  min: "No minimum",    note: "Standard application" },
    { name: "Preferred", discount: "30%",  min: "$10,000 / yr",  note: "Vendor-reviewed" },
    { name: "Principal", discount: "40%",  min: "$50,000 / yr",  note: "Invite only" },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <Eyebrow>Program structure</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Your tiers.
              <br />
              <span className="italic" style={{ color: C.teal }}>Your rules.</span>
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Your program, your structure. Define the tier names, discount levels, and order minimums. Credenza enforces them—placing designers automatically on approval.
            </p>
            <p className="mt-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: C.charcoalMid }}>
              One vendor might run two tiers. Another might run five. The structure is yours.
            </p>
          </div>

          {/* Right: example program config mockup */}
          <div className="lg:col-span-7">
            {/* Mockup header */}
            <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: C.charcoal, borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.tealBorder }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" }}>Program configuration · Example</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>Credenza Admin</span>
            </div>

            {/* Tier rows */}
            <div style={{ backgroundColor: C.charcoal }}>
              {/* Column headers */}
              <div className="grid px-5 py-2" style={{ gridTemplateColumns: "1fr 80px 120px 1fr", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Tier name", "Discount", "Min. spend", "Placement"].map(h => (
                  <span key={h} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>{h}</span>
                ))}
              </div>
              {exampleTiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className="grid px-5 py-4 items-center"
                  style={{
                    gridTemplateColumns: "1fr 80px 120px 1fr",
                    borderBottom: i < exampleTiers.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span className="font-freight" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}>{tier.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.teal, fontWeight: 600 }}>{tier.discount}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{tier.min}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>{tier.note}</span>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: C.charcoal, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.tealBorder }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>Designers are placed automatically on approval. Tier names, discounts, and thresholds are yours to define.</span>
            </div>

            {/* Callout below */}
            <p className="mt-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft, lineHeight: 1.6 }}>
              The tiers above are illustrative. Your program might look entirely different—and that's the point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Data / Growth ───────────────────────────────────────────────────────────────
function DataSection() {
  const ref = useReveal();
  const metrics = [
    {
      label: "Program performance",
      headline: "Know your numbers.",
      body: "Approval rates, time-to-decision, auto-approval volume, and month-over-month growth—tracked automatically so you always know how your program is performing.",
      items: ["Approval rate & avg. days to decision", "Auto-approval volume", "Monthly new approvals + cumulative growth", "Pending review queue"],
    },
    {
      label: "Designer analytics",
      headline: "Know who you're working with.",
      body: "Every approved designer comes with a profile: firm size, annual revenue, audience, credentials, and geographic market. Segment your trade community by tier, activity, or value.",
      items: ["VIP accounts—high-revenue or large firms", "New & active approvals (last 30 days)", "Dormant accounts with no certs on file", "Audience size and portfolio signals"],
    },
    {
      label: "Market intelligence",
      headline: "Know where your market is.",
      body: "See where your approved designers are concentrated by state, identify nexus coverage gaps before they become compliance issues, and understand the geographic shape of your trade community.",
      items: ["Geographic concentration by state", "Firms per region", "Nexus states without cert coverage", "Compliance health across your network"],
    },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-36" style={{ backgroundColor: C.forest }}>
      <div className="container">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <Eyebrow light>Program intelligence</Eyebrow>
          <h2
            className="font-freight"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.9rem)", lineHeight: 1.05, color: C.ivory, letterSpacing: "-0.025em" }}
          >
            Data that powers
            <br />
            <span className="italic" style={{ color: C.teal }}>your growth.</span>
          </h2>
          <p className="mt-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(240,240,236,0.65)" }}>
            Running your program is the floor, not the ceiling. Every application, approval, and certificate generates intelligence you can act on.
          </p>
        </div>

        {/* Three-column metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-8 md:p-10"
              style={{
                backgroundColor: i === 1 ? "rgba(184,204,210,0.06)" : C.forest,
                outline: i !== 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
              }}
            >
              <div
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.teal, marginBottom: "1.25rem" }}
              >
                {m.label}
              </div>
              <h3
                className="font-freight mb-4"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", lineHeight: 1.1, color: C.ivory, letterSpacing: "-0.02em" }}
              >
                {m.headline}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(240,240,236,0.6)", marginBottom: "1.5rem" }}>
                {m.body}
              </p>
              <div className="space-y-2">
                {m.items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full" style={{ backgroundColor: C.teal }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(240,240,236,0.75)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────────
function GallerySection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-width masonry-style gallery—no padding, edge to edge */}
      <div className="grid grid-cols-12 gap-1" style={{ height: "55vh", minHeight: "340px" }}>
        <div className="col-span-12 md:col-span-7 overflow-hidden h-full relative">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/kavanaugh-lakeside_2007c26c.webp" alt="Kavanaugh Lakeside interior" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          <PhotoCredit name="Designed by Ellen Kavanaugh" />
        </div>
        <div className="col-span-12 md:col-span-5 overflow-hidden h-full relative">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/kavanaugh-ocean-dining_d7523c68.webp" alt="Kavanaugh Ocean dining room" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          <PhotoCredit name="Designed by Ellen Kavanaugh" />
        </div>
      </div>
      <div className="container py-12 text-center">
        <p
          className="font-freight mx-auto"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", color: C.charcoalMid, lineHeight: 1.4, letterSpacing: "-0.015em", maxWidth: "600px", fontStyle: "italic" }}
        >
          Infrastructure worthy of the work it supports.
        </p>
      </div>
    </section>
  );
}
// ─── CTA ────────────────────────────────────────────────────────────────
function CTASection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
          {/* Left: Image */}
          <div className="relative overflow-hidden hidden lg:block" style={{ minHeight: "480px" }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/benjamin-vandiver-kitchen_799e82d1.webp" alt="Benjamin Vandiver West Village kitchen" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
            <PhotoCredit name="Designed by Benjamin Vandiver" dark />
          </div>

          {/* Right: Form */}
          <div className="p-10 md:p-14" style={{ backgroundColor: "#FFFFFF" }}>
            <Eyebrow>Early access</Eyebrow>
            <h2
              className="font-freight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              The last trade application
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>your clients will ever fill out.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.charcoalMid }}>
              Credenza is in early access. Join the waitlist and we'll work
              with you to launch a trade program your clients will actually
              thank you for.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { placeholder: "Your name", type: "text" },
                { placeholder: "Work email", type: "email" },
                { placeholder: "Company or showroom name", type: "text" },
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
                Request access
              </button>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, textAlign: "center" as const, marginTop: "0.25rem" }}>
                We'll reach out within 48 hours to schedule a brief call.
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
            { heading: "Product", links: ["For Designers", "For Vendors", "Pricing"] },
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
                    href="#"
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

// ─── Migration ───────────────────────────────────────────────────────────────────────
function MigrationSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <Eyebrow>Onboarding</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Your existing clients
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>come with you.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Credenza imports your existing approved designer list, maps each client to
              a verified profile, and generates any missing resale certificates—so your
              relationships carry over intact and your designers don't have to start over.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              You're not replacing a program. You're putting the right infrastructure
              under the client relationships you've already built.
            </p>
            {/* Timeline callout */}
            <div
              className="mt-10 flex items-center gap-4 px-5 py-4"
              style={{ backgroundColor: C.white, border: `1px solid ${C.sageDark}` }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "36px", height: "36px", backgroundColor: C.oliveDim, border: `1px solid ${C.oliveBorder}` }}
              >
                <Zap size={16} style={{ color: C.oliveMid }} />
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.charcoal, letterSpacing: "-0.01em" }}>
                  Live in hours, not months.
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>
                  Import your roster, configure your rules, and launch—same day.
                </div>
              </div>
            </div>
          </div>

          {/* Right: migration steps */}
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
              {[
                {
                  step: "01",
                  title: "Import your existing roster",
                  body: "Share your current approved designer list. We map every contact to a verified Credenza profile—or flag the ones that need fresh verification.",
                },
                {
                  step: "02",
                  title: "Configure your program rules",
                  body: "Set your tiers, discount levels, auto-approval criteria, and application requirements. Takes an afternoon, not a quarter.",
                },
                {
                  step: "03",
                  title: "Generate missing certificates",
                  body: "Credenza identifies any designers in your program without current resale certs and requests them automatically—so your compliance file is complete from launch.",
                },
                {
                  step: "04",
                  title: "Connect your Shopify store",
                  body: "Your approved designers become active Shopify customers with trade pricing and tax exemptions applied. No manual customer creation. No spreadsheet.",
                },
              ].map((item) => (
                <div key={item.step} className="py-7 border-b" style={{ borderColor: C.sageDark }}>
                  <div className="flex items-start gap-5">
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.85rem",
                        color: C.oliveMid,
                        letterSpacing: "0.06em",
                        fontWeight: 400,
                        flexShrink: 0,
                        paddingTop: "2px",
                        minWidth: "28px",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4
                        className="font-freight mb-2"
                        style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>
                        {item.body}
                      </p>
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

// ─── Security ────────────────────────────────────────────────────────────────
function SecuritySection() {
  const ref = useReveal();
  const pillars = [
    {
      icon: <Lock size={18} style={{ color: C.teal }} />,
      title: "Bank-level encryption at rest",
      body: "EINs, tax IDs, and sensitive identifiers are encrypted in the database. Keys are stored in a hardware-secured vault—not in code, not in environment variables.",
    },
    {
      icon: <Shield size={18} style={{ color: C.teal }} />,
      title: "Strict data isolation",
      body: "No designer can see another designer's data. No firm can see another firm's data. Isolation is enforced at the database layer by row-level security—not application logic.",
    },
    {
      icon: <FileText size={18} style={{ color: C.teal }} />,
      title: "Immutable audit trail",
      body: "Every certificate issuance, renewal, and application decision is recorded in an append-only log. If you’re ever audited, the record is there—timestamped, tamper-proof, and complete.",
    },
    {
      icon: <Check size={18} style={{ color: C.teal }} />,
      title: "We never sell your data",
      body: "Credenza does not sell, license, or share designer or vendor data with third parties. Your data is used solely to operate the platform.",
    },
  ];
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: C.forest, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div className="container py-20 md:py-28">
        {/* Headline */}
        <div className="mb-14 max-w-2xl">
          <Eyebrow light>Data &amp; security</Eyebrow>
          <h2
            className="font-freight"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)", lineHeight: 1.08, color: C.white, letterSpacing: "-0.025em" }}
          >
            The data behind trade programs
            <br />
            is tax-sensitive.
            <br />
            <span className="italic" style={{ color: C.teal }}>We treat it that way.</span>
          </h2>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-7"
              style={{ backgroundColor: C.forest }}
            >
              <div className="mb-4">{p.icon}</div>
              <h3
                className="font-freight mb-3"
                style={{ fontSize: "1.1rem", color: C.white, lineHeight: 1.2, letterSpacing: "-0.015em" }}
              >
                {p.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(240,240,236,0.6)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav />
      <Hero />
      {/* <LogoBar /> — hidden until we have customers */}
      <PositioningSection />
      <PortableIdentitySection />
      <IntegrationsSection />
      <VerificationSection />
      <CertSection />
      <ForVendors />
      <TiersSection />
      <DataSection />
      <MigrationSection />
      <SecuritySection />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  );
}
