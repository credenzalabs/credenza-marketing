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

  const navLinks = ["For Designers", "For Vendors"];

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
                href={item === "For Designers" ? "/for-designers" : "/"}
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: item === "For Vendors" ? C.olive : C.charcoalMid,
                  fontWeight: item === "For Vendors" ? 600 : 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                onMouseLeave={(e) => (e.currentTarget.style.color = item === "For Vendors" ? C.olive : C.charcoalMid)}
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
              <a key={item} href={item === "For Designers" ? "/for-designers" : "/"} className="no-underline"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: item === "For Vendors" ? C.olive : C.charcoal, fontWeight: item === "For Vendors" ? 600 : 500 }}>
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
            { icon: <Lock size={10} />, text: "Encrypted in transit and at rest" },
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
const HERO_IMAGES = [
  { src: IMAGES.studioDorionBrownstone, alt: "Studio Dorion brownstone", position: "left center", credit: "Design by Studio Dorion · Photo by Ethan Harrington" },
  { src: "/caitlin-kah-credenza.jpg", alt: "Interior by Caitlin Kah Interiors", position: "center center", credit: "Design by Caitlin Kah Interiors · Photo by Carmel Brantley" },
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);
  const hero = HERO_IMAGES[heroIndex];
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
              Every designer pre-vetted. Every certificate compliant. Every customer
              onboarded. Trade verification, tax compliance, and onboarding—built for
              vendors who take their program seriously, and the designers they serve.
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
                { icon: <FileText size={12} />, text: "Compliant resale certificates · Single & multi-state · 46 jurisdictions" },
                { icon: <Shield size={12} />, text: "Verified trade profile · Powered by Credenza" },
                { icon: <Store size={12} />, text: "Shopify integration · Auto-creates & -exempts trade accounts" },
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

          {/* Right: Photography — single rotating image */}
          <div className="lg:col-span-7 overflow-hidden relative" style={{ aspectRatio: "1/1" }}>
            <img
              src={hero.src}
              alt={hero.alt}
              className="w-full h-full object-cover"
              style={{ display: "block", objectPosition: hero.position }}
            />
            <PhotoCredit name={hero.credit} />
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
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.92) 0%, rgba(33,53,63,0.75) 50%, rgba(33,53,63,0.25) 100%)` }}
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
              and your team never have to worry about.
            </p>
          </div>
        </div>
      </div>

      {/* Three pillars below the image */}
      <div style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.sageDark}` }}>
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
              body: <>Designers verify a reusable profile once. Every vendor on the platform benefits. The data is verified. The decision is yours.</>,
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-8"
              style={{
                border: `1px solid ${C.sageDark}`,
                backgroundColor: "#ffffff",
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
    { name: "Lumen & Ash", type: "Lighting & décor" },
    { name: "Harlow & Stone", type: "Fabric & furniture" },
    { name: "Whitfield Textiles", type: "Fabric & trim" },
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
              A designer fills out one profile, gets verified once, and that profile works across every vendor on the platform. No re-entering business information, tax IDs, references, or uploading certs again.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: C.charcoalMid, maxWidth: "460px", marginBottom: "2.5rem" }}>
              Every application after the first is one click—because your best clients shouldn't have to keep proving themselves.
            </p>

            {/* Vendor-side callout */}
            <div
              className="p-5"
              style={{ borderLeft: `3px solid ${C.olive}`, backgroundColor: C.oliveLight }}
            >
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: C.charcoal, fontStyle: "italic" }}>
Higher completion rates. Better data quality. Less friction—because the hard part is already done.
              </p>
            </div>
          </div>

          {/* Right: screenshots */}
          <div className="flex flex-col gap-6">
            <img src="/profile-screenshot.png" alt="Trade profile showing business details, memberships, licenses, and trade references" className="w-full h-auto block" style={{ maxWidth: "560px", marginLeft: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
            <img src="/discover-brands-screenshot.png" alt="Discover more brands on Credenza with one-click apply" className="w-full h-auto block" style={{ maxWidth: "560px", marginLeft: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
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
    { label: "Press & showhouse recognition", detail: <><i>AD</i>, <i>Veranda</i>, <i>Elle Decor</i>, <i>House Beautiful</i>, Kips Bay, and more</> },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
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
              Credenza verifies the person behind the paperwork—cross-referencing Secretary of State records, state licensing boards, NCARB, ASID, and more. Nine checks, run in parallel on every applicant, so your team doesn't have to.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              The result: a trade program that protects its value—because every member is actually in the trade.
            </p>
            {/* Stat callout */}
            <div
              className="mt-8 flex items-center gap-5 px-5 py-4"
              style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "2.5rem", fontWeight: 700, color: C.tealMid, lineHeight: 1, letterSpacing: "-0.03em", flexShrink: 0 }}>9</div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.charcoal }}>Automated verification checks</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>Run in parallel on every profile. Expand each check to see what we verify.</div>
              </div>
            </div>
          </div>

          {/* Verification checklist—collapsible accordion */}
          <div className="lg:col-span-7">
            <div className="border p-6" style={{ borderColor: C.sageDark, backgroundColor: "#ffffff" }}>
              {checks.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={item.label} className={i < checks.length - 1 ? "border-b" : ""} style={{ borderColor: C.sageDark }}>
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
              Completed, compliant,
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>and ready to sign.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Other tools pre-fill the vendor name and address—then hand the certificate back to the designer to complete. Credenza validates the data, fills every field, and presents a ready-to-sign document to your client. Effortless—first and every time.
            </p>
          </div>
        </div>

        {/* Comparison strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12" style={{ border: `1px solid ${C.sageDark}` }}>
          <div className="p-8" style={{ backgroundColor: C.ivory, borderRight: `1px solid ${C.sageDark}` }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoalSoft, fontWeight: 600, marginBottom: "1rem" }}>Other tools</div>
            <div className="flex flex-col gap-2.5">
              {[
                "Pre-fill vendor name and address only—if at all",
                "Designer downloads and fills in the rest",
                "No validation—bad data goes straight into the cert",
                "Wrong document risk: designer can submit a seller's permit, W-9, or any other form",
                "Exemption scope left to the designer to figure out—often under-claimed",
                "State-issued forms: designer re-uploads to every new vendor",
                "Renewal: same manual process, repeated every 1–3 years",
                "When something's wrong, it's your problem—vendors chase designers for corrections",
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
          <div className="p-8" style={{ backgroundColor: "#FFFFFF" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.tealMid, fontWeight: 600, marginBottom: "1rem" }}>Credenza</div>
            <div className="flex flex-col gap-2.5">
              {[
                "Every field pre-filled from the designer's verified profile",
                "Tax IDs and EINs verified against state and federal records—not just format-checked",
                "Correct form routed automatically for each designer-vendor intersection",
                "Designer can only submit the right document—wrong forms aren't an option",
                "Maximum exemption applied—designers often don't know which forms they're eligible to use",
                "State-issued forms: upload once, all connected vendors receive it",
                "Renewal: Credenza detects expiry, pre-fills the new cert, sales tax ID re-verified active, designer signs",
                "No-expiry states: business info re-confirmed every 3 years—stale data means a non-compliant certificate",
                "Problems caught before submission—your team never plays middleman",
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
            <h3 className="font-freight mb-6" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.2, fontStyle: "italic" }}>
              It's not management—it's strategy.
            </h3>
            <div className="flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "Validated businesses, not just collected data", body: "Sales tax IDs, EINs, and business details are verified against authoritative sources—not just for format, but to confirm the business behind the certificate is real and active. Invalid data gets caught before it reaches you." },
                { title: "Maximum exemption, every time", body: "Credenza\u2019s Tax Strategy Engine selects the correct (and fewest) forms needed to maximize the designer\u2019s tax exemption where they do business. Designers save more buying from you—and remember who made it easy." },
                { title: "Living compliance", body: "Cert approaching expiration? Credenza requests renewal, re-verifies the tax ID, and revokes the exemption if the designer doesn\u2019t act—so nothing on file goes stale." },
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
        <img src="/benjamin-vandiver-west-village.webp" alt="West Village interior by Benjamin Vandiver" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.88) 0%, rgba(33,53,63,0.6) 50%, rgba(33,53,63,0.1) 100%)` }} />
        <PhotoCredit name="Design by Benjamin Vandiver · Photo by Joshua McHugh" />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>For vendors & showrooms</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              Your rules. Your approvals.
              <br />
              <span className="italic" style={{ color: C.teal }}>In minutes.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Requirements */}
          <div>
            <h3 className="font-freight mb-4" style={{ fontSize: "2rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Set the bar.
            </h3>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: '15px', lineHeight: 1.75, color: C.charcoalMid }}>
              Every vendor's trade program is different. A high-volume fabric
              house and a luxury furniture atelier have very different bars.
              Credenza lets you configure exactly what's required to apply—
              and what earns a qualified designer faster approval.
            </p>
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "Define your requirements", body: "Require a resale cert, EIN, business license, ASID membership, or any combination. Credenza's application form adapts to what you need—designers see exactly what to submit." },
                { title: "Approved in minutes, not days", body: "Designers who meet your criteria can be approved instantly—nights, weekends, Spring Market. No one waits for a human to come back to the office." },
                { title: "Always in control", body: "Auto-approval is a choice, not a requirement. Review every application manually, auto-approve when your criteria are met, or mix both. Credenza never approves anyone without your explicit rules being satisfied." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <h4 className="font-freight mb-2" style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em" }}>{item.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Approval rules screenshots */}
          <div className="flex flex-col gap-6">
            <img src="/hard-rules-screenshot.png" alt="Hard Rules configuration with EIN Verified condition required for approval" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
            <img src="/conditional-groups-screenshot.png" alt="Conditional Groups with flexible approval paths including website, membership, showhouse, press, Instagram, and trade references" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
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
              a designer is approved, Credenza creates their trade account
              and applies the correct state-level tax exemption. No one on
              your team touches a keyboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <Store size={18} />,
                  title: "Shopify",
                  badge: "Available now",
                  body: "Approved designers become Shopify customers instantly—tagged with your trade pricing and state-level tax exemptions applied. No manual entry. No misapplied exemptions.",
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
                "Tax exemption applied automatically at the state level",
                "Upgrade clients to the next pricing tier with one click as the relationship grows",
                "Cert expirations monitored—renewals requested, exemptions revoked until current",
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
    { name: "Trade",     discount: "20%",  min: "No minimum" },
    { name: "Preferred", discount: "30%",  min: "$10,000 / yr" },
    { name: "Principal", discount: "40%",  min: "$50,000 / yr" },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
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
              Your program, your structure. Define the tier names, discount levels, and order minimums. Credenza enforces them—assigning designers to the right tier automatically on approval.
            </p>
            <p className="mt-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: C.charcoalMid }}>
              One vendor might run two tiers. Another might run five. The structure is yours.
            </p>
          </div>

          {/* Right: product screenshot */}
          <div>
            <img src="/discount-tiers-screenshot.png" alt="Discount Tiers configuration showing Trade, Preferred, and Elite tiers with discount percentages and order minimums" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
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
      body: "Approval rates, revenue, penetration, and growth—tracked automatically. See which firms are ordering, which aren\u2019t, and what\u2019s driving the difference.",
      items: ["Approval rate & time to decision", "Revenue trends & highest-value firms", "Ordering penetration across your network", "After-hours approvals that prove auto-approval works"],
    },
    {
      label: "Designer analytics",
      headline: "Know who you're working with.",
      body: "Every approved designer comes with a verified profile. Segment your trade community by revenue, firm size, profession, credentials, or ordering behavior.",
      items: ["Firm demographics & profession breakdown", "Verification signal coverage", "Ordering vs non-ordering firm comparison", "Approval drivers—what signals predict success"],
    },
    {
      label: "Compliance & geography",
      headline: "Know where your risk is.",
      body: "Certificate health, expiration alerts, and geographic concentration—so you can see compliance gaps before they become audit issues.",
      items: ["Certificate health & expiration tracking", "Nexus coverage gaps", "Designer concentration by state", "Risk alerts surfaced automatically"],
    },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-36" style={{ backgroundColor: C.forest }}>
      <div className="container">
        {/* Section header + dashboard screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
          <div>
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
              Running your program is the floor, not the ceiling. Every application, approval, certificate, and order generates intelligence you can act on.
            </p>
          </div>
          <div>
            <img src="/dashboard-insights.png" alt="Program Insights dashboard" className="w-full h-auto" />
          </div>
        </div>

        {/* Three-column metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-8 md:p-10"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <div
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.tealMid, marginBottom: "1.25rem" }}
              >
                {m.label}
              </div>
              <h3
                className="font-freight mb-4"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", lineHeight: 1.1, color: C.charcoal, letterSpacing: "-0.02em" }}
              >
                {m.headline}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.75, color: C.charcoalMid, marginBottom: "1.5rem" }}>
                {m.body}
              </p>
              <div className="space-y-2">
                {m.items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full" style={{ backgroundColor: C.tealMid }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: C.charcoalSoft, lineHeight: 1.5 }}>{item}</span>
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
  return (
    <section className="visible pt-24 md:pt-32 pb-0" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container text-center">
        <p
          className="font-freight mx-auto"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", color: C.charcoalMid, lineHeight: 1.4, letterSpacing: "-0.015em", maxWidth: "600px", fontStyle: "italic" }}
        >
          Your product is considered. Your trade program should be too.
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
          {/* Left: Image — mobile top, desktop left */}
          <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            <img src="/studio-dorion-pound-ridge-hires.jpg" alt="Studio Dorion Pound Ridge entry" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
            <PhotoCredit name="Design by Studio Dorion · Photo by Ethan Harrington" dark />
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
              The design trade's operating system.
            </p>
          </div>
          {[
            { heading: "Product", links: [{ label: "For Designers", href: "/for-designers" }, { label: "For Vendors", href: "/" }] },
            { heading: "Company", links: [{ label: "Blog", href: "/blog" }] },
            { heading: "Contact", links: [{ label: "info@usecredenza.com", href: "mailto:info@usecredenza.com" }] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.charcoalMid, fontWeight: 600, marginBottom: "1rem" }}>
                {col.heading}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="no-underline transition-colors duration-150"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.charcoalSoft }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}
                  >
                    {link.label}
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
            <button
              type="button"
              onClick={() => (document.getElementById('privacy-modal') as HTMLDialogElement)?.showModal()}
              className="no-underline cursor-pointer bg-transparent border-none p-0"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => (document.getElementById('terms-modal') as HTMLDialogElement)?.showModal()}
              className="no-underline cursor-pointer bg-transparent border-none p-0"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: C.charcoalSoft }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalSoft)}
            >
              Terms
            </button>
          </div>

          {/* Privacy Policy Modal */}
          <dialog
            id="privacy-modal"
            className="backdrop:bg-black/40 p-0 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ border: `1px solid ${C.sageDark}`, backgroundColor: "#ffffff" }}
            onClick={(e) => { if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close(); }}
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-freight" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em" }}>Privacy Policy</h2>
                <button
                  type="button"
                  onClick={() => document.getElementById('privacy-modal')?.closest('dialog')?.close()}
                  className="bg-transparent border-none cursor-pointer text-lg"
                  style={{ color: C.charcoalSoft }}
                >
                  ✕
                </button>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: C.charcoalMid }}>
                <p style={{ color: C.charcoalSoft, marginBottom: "1.5rem" }}>Effective Date: November 8, 2025 · Last Updated: November 8, 2025</p>
                <p className="mb-4">Welcome to Credenza ("Credenza," "we," "our," or "us"). This Privacy Policy explains how we collect, use, and protect information when you visit usecredenza.com or use our related services (collectively, the "Platform").</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>1. Information We Collect</h3>
                <p className="mb-2">We may collect:</p>
                <ul className="mb-4 pl-5" style={{ listStyleType: "disc" }}>
                  <li className="mb-2">Account and contact information you provide—such as your name, company name, email address, and phone number—when you request a demo, create an account, or contact us.</li>
                  <li className="mb-2">Business and compliance information you upload or enter into the Platform, including resale certificates, tax IDs, or professional credentials.</li>
                  <li className="mb-2">Usage data automatically gathered through cookies, analytics tools, and log files (for example: IP address, browser type, and pages visited).</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>2. How We Use Information</h3>
                <p className="mb-2">We use your information to:</p>
                <ul className="mb-4 pl-5" style={{ listStyleType: "disc" }}>
                  <li className="mb-2">Provide, operate, and improve the Credenza Platform.</li>
                  <li className="mb-2">Verify business and professional information you submit.</li>
                  <li className="mb-2">Communicate with you about your account, compliance requirements, and product updates.</li>
                  <li className="mb-2">Analyze Platform performance and user engagement.</li>
                  <li className="mb-2">Comply with applicable laws and protect our rights.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>3. Cookies and Analytics</h3>
                <p className="mb-4">We use cookies and similar technologies to recognize your browser, analyze traffic, and enhance your experience. You can adjust cookie settings in your browser, but some parts of the Platform may not function properly without them.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>4. Sharing of Information</h3>
                <p className="mb-2">We do not sell or rent personal data. We may share information only with:</p>
                <ul className="mb-4 pl-5" style={{ listStyleType: "disc" }}>
                  <li className="mb-2">Service providers who help us host, process, or analyze data under confidentiality agreements.</li>
                  <li className="mb-2">Vendors or partners you choose to connect with through the Platform, to facilitate trade-program verification.</li>
                  <li className="mb-2">Legal authorities if required to comply with law or protect against misuse of the Platform.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>5. Data Retention</h3>
                <p className="mb-4">We retain information as long as your account is active or as needed to provide our services, comply with legal obligations, or resolve disputes. You may request deletion of your data by contacting us.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>6. Security</h3>
                <p className="mb-4">We employ reasonable technical and administrative safeguards to protect your data. However, no online system is completely secure, and we cannot guarantee absolute protection.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>7. Your Rights</h3>
                <p className="mb-4">You may request access, correction, or deletion of your personal data by contacting us. Depending on your location, you may also have additional rights under local privacy laws.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>8. Updates to This Policy</h3>
                <p className="mb-4">We may revise this Privacy Policy periodically. The most current version will always be posted on this page with the updated date.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>9. Contact Us</h3>
                <p>If you have questions about this Privacy Policy or our data practices, please contact:</p>
                <p className="mt-2">Credenza<br />Email: <a href="mailto:info@usecredenza.com" style={{ color: C.tealMid }}>info@usecredenza.com</a><br />Website: usecredenza.com</p>
              </div>
            </div>
          </dialog>

          {/* Terms of Use Modal */}
          <dialog
            id="terms-modal"
            className="backdrop:bg-black/40 p-0 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ border: `1px solid ${C.sageDark}`, backgroundColor: "#ffffff" }}
            onClick={(e) => { if (e.target === e.currentTarget) (e.target as HTMLDialogElement).close(); }}
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-freight" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em" }}>Terms of Use</h2>
                <button
                  type="button"
                  onClick={() => document.getElementById('terms-modal')?.closest('dialog')?.close()}
                  className="bg-transparent border-none cursor-pointer text-lg"
                  style={{ color: C.charcoalSoft }}
                >
                  ✕
                </button>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: C.charcoalMid }}>
                <p style={{ color: C.charcoalSoft, marginBottom: "1.5rem" }}>Effective Date: November 8, 2025 · Last Updated: November 8, 2025</p>
                <p className="mb-4">Welcome to Credenza ("Credenza," "we," "our," or "us"). These Terms of Use ("Terms") govern your access to and use of usecredenza.com and any related services or applications (collectively, the "Platform").</p>
                <p className="mb-4">By accessing or using the Platform, you agree to these Terms. If you do not agree, please do not use Credenza.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>1. Overview</h3>
                <p className="mb-4">Credenza provides identity verification and trade-program management services for the design industry. The Platform is currently in development, and functionality may change without notice.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>2. Eligibility</h3>
                <p className="mb-4">You must be at least 18 years old and capable of entering into a binding contract to use the Platform. By using Credenza, you represent that you meet these requirements.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>3. User Accounts</h3>
                <p className="mb-4">If you create an account, you are responsible for maintaining its confidentiality and for all activities under your account. Notify us immediately of any unauthorized use.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>4. Acceptable Use</h3>
                <p className="mb-2">You agree not to:</p>
                <ul className="mb-4 pl-5" style={{ listStyleType: "disc" }}>
                  <li className="mb-2">Use the Platform for any unlawful purpose or in violation of these Terms.</li>
                  <li className="mb-2">Impersonate any person or entity, or falsely claim an affiliation.</li>
                  <li className="mb-2">Interfere with or disrupt the Platform's operation or servers.</li>
                  <li className="mb-2">Attempt to gain unauthorized access to any part of the Platform.</li>
                </ul>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>5. Intellectual Property</h3>
                <p className="mb-4">All content, trademarks, and data on the Platform—including text, graphics, logos, and software—are owned by Credenza or our licensors. You may not copy, modify, distribute, or create derivative works without our prior written consent.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>6. User Content</h3>
                <p className="mb-4">By submitting information (e.g., documents, certificates, or profile details) to the Platform, you grant Credenza a non-exclusive, worldwide, royalty-free license to use, store, and display that content solely to provide and improve our services.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>7. Disclaimers</h3>
                <p className="mb-4">The Platform is provided "as is" and "as available." We make no warranties, express or implied, regarding its operation, accuracy, or availability. We do not guarantee that the Platform will be error-free or uninterrupted.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>8. Limitation of Liability</h3>
                <p className="mb-4">To the fullest extent permitted by law, Credenza and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>9. Termination</h3>
                <p className="mb-4">We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause or notice, if we believe you have violated these Terms or engaged in conduct harmful to Credenza or other users.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>10. Governing Law and Disputes</h3>
                <p className="mb-4">These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles. Any disputes shall be resolved in the state or federal courts located in Delaware.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>11. Changes to These Terms</h3>
                <p className="mb-4">We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.</p>

                <h3 className="font-freight mt-6 mb-3" style={{ fontSize: "1.05rem", color: C.charcoal }}>12. Contact Information</h3>
                <p>For questions or concerns about these Terms, please contact us at:</p>
                <p className="mt-2">Credenza<br />Email: <a href="mailto:info@usecredenza.com" style={{ color: C.tealMid }}>info@usecredenza.com</a><br />Website: usecredenza.com</p>
              </div>
            </div>
          </dialog>
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
              Your existing trade clients, certificates, and account history come with you—no reapplication required.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              This isn't just for new applicants. Your existing clients come onto the platform with their history intact—and from here, everything stays current automatically.
            </p>
            {/* Timeline callout */}
            <div
              className="mt-10 flex items-center gap-4 px-5 py-4"
              style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "36px", height: "36px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
              >
                <Zap size={16} style={{ color: C.tealMid }} />
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.charcoal, letterSpacing: "-0.01em" }}>
                  Live in hours, not months.
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>
                  Import your roster, close your compliance gaps, and go live—same day.
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
                  body: "Import directly from Shopify or share a list. Credenza groups contacts by firm, deduplicates, matches against existing profiles, and extracts data from your notes, tags, and cert files. Bulk upload your existing certificates—we\u2019ll read each one, match it to the right client, calculate expiration dates, and monitor them from here.",
                },
                {
                  step: "02",
                  title: "Recognize your existing clients",
                  body: "Imported clients are already in your program—no reapplication needed. If a designer joins Credenza on their own or through another vendor, the relationship is already there.",
                },
                {
                  step: "03",
                  title: "Close compliance gaps",
                  body: "Credenza identifies designers without current resale certs and prompts them to generate and sign—so you\u2019re compliant from day one. Want to start fresh? Invite existing clients to connect and submit new certificates with compliant, verified data.",
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
      title: "Encrypted at rest",
      body: "EINs, tax IDs, and sensitive identifiers are encrypted in the database using application-level encryption. All underlying storage is encrypted at rest.",
    },
    {
      icon: <Shield size={18} style={{ color: C.teal }} />,
      title: "Strict data isolation",
      body: "No designer can see another designer's data. No firm can see another firm's data. Vendors only see designers who apply to their program. Isolation is enforced at the database layer by row-level security.",
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: image */}
        <div className="lg:col-span-5 relative overflow-hidden" style={{ minHeight: "250px" }}>
          <img src="/thomas-loof-ombre-living.jpg" alt="Living room by Amy Lau Design" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
          <PhotoCredit name="Design by Amy Lau Design · Photo by Thomas Loof" />
        </div>

        {/* Right: content */}
        <div className="lg:col-span-7 py-20 md:py-28 px-8 lg:px-16">
          <div className="mb-14 max-w-2xl pl-7">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
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
