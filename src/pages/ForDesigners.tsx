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
import { ArrowRight, Check, FileText, Info, Shield, Users, Zap, Menu, X, CreditCard, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  // Credited designer project photography
  alisonRoseKitchen:         "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/alison-rose-kitchen_ed131ff5.jpg",
  emilyJanakLivingRoom:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/emily-janak-living-room_5497e677.webp",
  emilyJanakDining:          "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/emily-janak-dining_06074056.webp",
  carolineGidiereBedroom:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/cg-overhill-bedroom_b4b2c11c.jpg",
  benjaminVandiverKitchen:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/benjamin-vandiver-kitchen_799e82d1.webp",
  nickOlsonReidRolls:        "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/nick-olson-reid-rolls_d58f9523.webp",
  kavanaughLakeside:         "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/kavanaugh-lakeside_2007c26c.webp",
};

// --- Photo credit tooltip ---
function PhotoCredit({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="absolute bottom-3 right-3 z-20 flex items-center justify-center"
          style={{
            width: "22px", height: "22px", borderRadius: "50%",
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
        style={{
          fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.06em",
          textTransform: "uppercase", padding: "4px 8px",
          background: "rgba(26,26,26,0.85)", color: "rgba(255,255,255,0.85)",
          border: "none", borderRadius: "0", backdropFilter: "blur(4px)",
        }}
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}

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
              <a key={item} href={item === "For Designers" ? "/for-designers" : "/"}
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
            >Get Started</a>
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
const HERO_IMAGES = [
  { src: IMAGES.kavanaughLakeside, alt: "Interior by Ellen Kavanaugh", position: "center 40%", credit: "Ellen Kavanaugh Interiors" },
  { src: "/marea-clark-entry.webp", alt: "Entry by Marea Clark", position: "center center", credit: "Marea Clark Interiors" },
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);
  const hero = HERO_IMAGES[heroIndex];
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
            <Eyebrow>Trade access, simplified</Eyebrow>

            <h1 className="font-freight mb-8" style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", lineHeight: 1.0, color: C.charcoal, letterSpacing: "-0.03em" }}>
              One place for
              <br />
              every trade account,
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>every certificate,</span>
              <br />
              every vendor.
            </h1>

            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ objectPosition: hero.position }} />
            </div>

            <p className="mb-10" style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: C.charcoalMid, maxWidth: "400px" }}>
              Your vendors, workrooms, installers, and every trade relationship
              your firm depends on—organized in one dashboard. Generate the right
              resale certificate for every state, and apply to new vendors
              instantly—so you spend your time designing, not filing paperwork.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a href="#" className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: C.teal, color: C.forest, outline: "0.5px solid #99b8bd", outlineOffset: "2px", borderRadius: "0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >Get Started—It's Free <ArrowRight size={14} /></a>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: <FileText size={12} />, text: "The right cert for every state, every vendor, every purchase" },
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

          {/* Photography — desktop only */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block" style={{ aspectRatio: "1/1" }}>
            <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ display: "block", objectPosition: hero.position }} />
            <PhotoCredit name={hero.credit} />
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
              Every state has different rules, different forms, different exemptions.
              Credenza evaluates your registrations, finds the optimal path, and
              generates the right certificate—so you never leave money on the table
              or wonder if you checked the wrong box.
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
            <div key={card.title} className="py-8 md:pr-8 border-b" style={{ borderColor: C.sageDark, paddingLeft: 0 }}>
              <h3 className="font-freight mb-3" style={{ fontSize: "1.35rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Cert generator screenshot + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start" style={{ border: `1px solid ${C.sageDark}` }}>
          <div className="lg:col-span-9 overflow-hidden">
            <img src="/cert-generator-screenshot.png" alt="Resale certificate generator showing a New York ST-120 form with vendor selection, state registration grid, and digital signing" className="w-full h-auto block" />
          </div>
          <div className="lg:col-span-3 flex flex-col h-full" style={{ borderLeft: `1px solid ${C.sageDark}` }}>
            {[
              { stat: "39", label: "state forms supported" },
              { stat: "45", label: "taxable states covered" },
              { stat: "MTC + SST", label: "cross-state strategies" },
              { stat: "Auto", label: "expiration monitoring" },
            ].map((item, i) => (
              <div key={item.label} className="flex-1 px-6 py-6" style={{ borderBottom: i < 3 ? `1px solid ${C.sageDark}` : "none" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1.5rem", fontWeight: 300, color: C.charcoal, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{item.stat}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: C.charcoalSoft, letterSpacing: "0.02em" }}>{item.label}</div>
              </div>
            ))}
          </div>
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
    <section id="accounts" ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Trade account management</Eyebrow>
            <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}>
              Every account you hold.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>One dashboard.</span>
            </h2>
            {/* Mobile-only image after headline */}
            <div className="lg:hidden mb-6 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
              <img src="/trade-accounts-screenshot.png" alt="Trade accounts dashboard" className="w-full h-auto block" />
            </div>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Vendors, workrooms, installers, fabric houses—every trade
              relationship your firm has, in one place. No more digging
              through emails for an account number, discount code, or
              your rep's phone number.
            </p>
            <p className="font-freight italic" style={{ fontSize: "1.1rem", lineHeight: 1.5, color: C.charcoal, letterSpacing: "-0.01em" }}>
              Your trade relationships are your business. Now they're organized like it.
            </p>
          </div>

          <div className="lg:col-span-7 hidden lg:block">
            <div className="overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
              <img src="/trade-accounts-screenshot.png" alt="Trade accounts dashboard" className="w-full h-auto block" />
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
            <div key={item.title} className="py-8 md:pr-8" style={{ borderBottom: `1px solid ${C.sageDark}`, borderRight: i < 2 ? `1px solid ${C.sageDark}` : "none", paddingLeft: 0 }}>
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
      {/* Full-bleed image with text overlay + profile card mockup */}
      <div className="relative overflow-hidden" style={{ minHeight: "55vh" }}>
        <img src="/emily-jones-nightstand.webp" alt="Bedroom by Emily Jones Interiors" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
        <PhotoCredit name="Emily Jones Interiors" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.92) 0%, rgba(33,53,63,0.7) 50%, rgba(33,53,63,0.2) 100%)` }} />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow light>Your verified profile</Eyebrow>
              <h2 className="font-freight mb-6" style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}>
                Verified once.
                <br />
                <span className="italic" style={{ color: C.teal }}>Trusted everywhere.</span>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
                Your EIN confirmed against IRS records. Your license validated with the
                state board. Your memberships checked against ASID and NCIDQ directories.
                Everything that makes your certificates and applications credible—verified
                once and stored in one place.
              </p>
            </div>

            {/* Real profile screenshot */}
            <div className="lg:col-span-6 lg:col-start-7">
              <img src="/profile-screenshot.png" alt="Trade profile showing business details, memberships, licenses, and trade references" className="w-full h-auto block" style={{ maxWidth: "560px", marginLeft: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Credential grid */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t" style={{ borderColor: C.sageDark }}>
          {[
            { label: "EIN number", detail: "Verified against IRS records—building the credibility that gets you approved faster.", badge: "Verified" },
            { label: "Professional licenses", detail: "Interior design licenses checked against state boards in NY, FL, GA, IL, LA, NV, TX, and DC. Architecture licenses validated against NCARB.", badge: "Verified" },
            { label: "Sales tax registrations", detail: "Verified directly with 28 states. Stored so your certificates are always pre-filled correctly.", badge: "Verified" },
            { label: "Professional memberships", detail: "ASID, AIA, NCIDQ, NKBA, ICAA—if you're a member, we'll make sure it counts.", badge: "Verified" },
            { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice.", badge: "Verified" },
            { label: "Press recognition & showhouse participation", detail: "Matched against thousands of showhouse participants and press coverage across major design publications.", badge: "Enriched" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-start gap-4 py-5 border-b" style={{ borderColor: C.sageDark }}>
              <div className="flex items-center justify-center flex-shrink-0 mt-0.5" style={{ width: "20px", height: "20px", backgroundColor: C.oliveDim, border: `1px solid ${C.oliveBorder}` }}>
                <Check size={10} style={{ color: C.oliveMid }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: C.charcoal }}>{item.label}</span>
                  {item.badge === "Enriched" && (
                    <span className="px-1.5 py-0.5" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}`, fontFamily: "Inter, sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.tealMid }}>Enriched</span>
                  )}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.charcoalSoft, lineHeight: 1.5 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting copy */}
        <div className="mt-14 text-center mx-auto" style={{ maxWidth: "640px" }}>
          <p className="font-freight italic" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", lineHeight: 1.5, color: C.charcoalMid, letterSpacing: "-0.01em" }}>
            A license, a membership, a decade of published work, a growing social
            following—however you've built your career, Credenza turns it into a
            profile that speaks for you. Prove yourself once. Never again.
          </p>
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
            {/* Mobile-only image after headline */}
            <div className="lg:hidden mb-6">
              <img src="/team-members-screenshot.png" alt="Team members panel" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
            </div>
            <p className="mb-4" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Every team member gets their own login with the right level
              of access. Add or remove anyone in one step—and every vendor
              in the network sees the change instantly.
            </p>

            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                { icon: <Users size={14} />, title: "Individual logins, no shared passwords", body: "Each person has their own credentials. No 2FA headaches when someone's traveling." },
                { icon: <Shield size={14} />, title: "Everyone can contribute", body: "Any team member can generate certificates, add vendors and sources, and manage trade accounts. Each signer attests their authority per state requirements." },
                { icon: <Zap size={14} />, title: "One step to add or remove anyone", body: "New hire? Add them once. Someone leaves? Revoke access across every program at once." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 py-4 border-b" style={{ borderColor: C.sageDark }}>
                  <div className="flex items-center justify-center flex-shrink-0 mt-0.5" style={{ width: "24px", height: "24px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                    <span style={{ color: C.tealMid }}>{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 600, color: C.charcoal, marginBottom: "2px" }}>{item.title}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: C.charcoalSoft, lineHeight: 1.55 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team members screenshot — desktop only */}
          <div className="lg:col-span-7 hidden lg:block">
            <img src="/team-members-screenshot.png" alt="Team members panel showing owner and team member roles" className="w-full h-auto block" style={{ maxWidth: "620px", marginLeft: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
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
              One-click
              <br />
              <span className="italic" style={{ color: C.teal }}>trade access.</span>
            </h2>
            {/* Mobile-only image after headline */}
            <div className="lg:hidden mb-6">
              <img src="/one-click-apply-screenshot.png" alt="One-click trade application" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)" }} />
            </div>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(240,240,236,0.7)" }}>
              Credenza is building a network of vendors whose trade programs are
              powered by Credenza. As vendors join, your verified profile goes with you
              automatically—no new forms, no document uploads, no repeat
              applications. One click and you're in.
            </p>
            <p className="font-freight italic mb-8" style={{ fontSize: "1.15rem", lineHeight: 1.5, color: C.teal, letterSpacing: "-0.01em" }}>
              Set up once. Every new vendor is just one click away.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { title: "Your profile travels with you", body: "Everything you verify with Credenza is securely stored to reuse with any vendor. Your next vendor application could be one click." },
                { title: "Just click Apply", body: "When a vendor powers its program with Credenza, your next application is one click. No forms, no uploads." },
                { title: "Approved faster", body: "Approved in minutes, not days. Your verified profile can be matched against vendor criteria automatically—no back-and-forth, no waiting." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-freight mb-1" style={{ fontSize: "1.1rem", color: C.white, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(240,240,236,0.55)" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 hidden lg:flex flex-col gap-0">
            {/* One-click apply screenshot — desktop only */}
            <div>
              <img src="/one-click-apply-screenshot.png" alt="One-click trade application showing verified profile and express apply flow" className="w-full h-auto block" style={{ maxWidth: "560px", marginLeft: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   7. CTA
   ========================================================================= */
const ACCESS_REQUEST_URL = "https://hdcyqdxksgnexbtfxsdk.supabase.co/functions/v1/vendor-request-access";

function CTASection() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(ACCESS_REQUEST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), company: form.company.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
          <div className="relative overflow-hidden" style={{ minHeight: "250px" }}>
            <img src="/sarah-bartholomew-living-room.webp" alt="Living room by Sarah Bartholomew" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "15% center" }} />
            <PhotoCredit name="Design by Sarah Bartholomew Design. Photo by Melanie Acevedo" />
            <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
          </div>

          <div className="p-10 md:p-14" style={{ backgroundColor: "#FFFFFF" }}>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="font-freight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}>
              Your verified profile
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>starts here.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.charcoalMid }}>
              Credenza is in early access. Request access and we'll help you
              set up your profile—so you're ready the moment you need it.
            </p>

            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="flex items-center justify-center" style={{ width: "40px", height: "40px", backgroundColor: C.oliveDim, border: `1px solid ${C.oliveBorder}` }}>
                  <Check size={18} style={{ color: C.oliveMid }} />
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", fontWeight: 600, color: C.charcoal }}>We've got your request.</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoalSoft }}>We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  { placeholder: "Your name", type: "text", key: "name" as const },
                  { placeholder: "Work email", type: "email", key: "email" as const },
                  { placeholder: "Firm name", type: "text", key: "company" as const },
                ].map((field) => (
                  <input key={field.placeholder} type={field.type} placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    required
                    className="w-full px-4 py-3 outline-none transition-all duration-150"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", border: `1px solid ${C.sageDark}`, backgroundColor: C.white, color: C.charcoal, borderRadius: "0" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.olive)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.sageDark)}
                  />
                ))}
                <button type="submit" disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, backgroundColor: status === "sending" ? C.sageDark : C.teal, color: C.forest, borderRadius: "0", cursor: status === "sending" ? "default" : "pointer", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
                  onMouseEnter={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                  onMouseLeave={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
                >{status === "sending" ? "Sending..." : "Get Started\u2014It's Free"} {status !== "sending" && <ArrowRight size={14} />}</button>
                {status === "error" && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#b44", textAlign: "center" as const }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
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
              The design trade's operating system.
            </p>
          </div>
          {[
            { heading: "Product", links: ["For Designers", "For Vendors"] },
            { heading: "Company", links: ["Blog"] },
            { heading: "Contact", links: ["info@usecredenza.com"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.charcoalMid, fontWeight: 600, marginBottom: "1rem" }}>{col.heading}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href={link === "For Designers" ? "/for-designers" : link === "For Vendors" ? "/" : link === "Blog" ? "/blog" : link.includes("@") ? `mailto:${link}` : "#"} className="no-underline transition-colors duration-150"
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
