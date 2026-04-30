/*
 * CREDENZA — FOR DESIGNERS PAGE
 *
 * SECTION ORDER (by current value):
 *   1. Hero — certs + accounts, what you get today
 *   2. Account Management — core feature, works today
 *   3. Tax Strategy & Certs — the killer feature
 *   4. Firm & Team — supporting feature, works today
 *   5. Verified Profile — the foundation for one-click apply
 *   6. The Credenza Network — where it's going (vendors onboarding now)
 *   7. Pricing — free for designers
 *   8. CTA — sign-up link
 *   9. FAQ
 *
 * DESIGN: "Editorial Luxury"—generous whitespace, Freight serif,
 * thin 1px rules, asymmetric layouts, restrained color.
 */

import { useEffect, useState } from "react";
import { ArrowRight, Check, FileText, Shield, Users, Zap, CreditCard, ChevronRight, Copy, Plus } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { withCredenzaUtm } from "@/utils/utm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Nav } from "@/components/ui/Nav";
import { useReveal } from "@/hooks/useReveal";
import { C, JOIN_DESIGNER_URL } from "@/lib/constants";
import { submitDesignerWaitlist } from "@/lib/waitlist";
import { Footer } from "@/components/sections/home/Footer";

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



/* =========================================================================
   1. HERO
   ========================================================================= */
const HERO_IMAGES = [
  {
    src: IMAGES.kavanaughLakeside,
    alt: "Interior by Ellen Kavanaugh Interiors",
    position: "center 40%",
    credits: [
      { text: "© " },
      { text: "Carmel Brantley", href: withCredenzaUtm("https://www.brantleyphotography.com/", "photo-credit", "for-designers-hero") },
      { text: " (design by " },
      { text: "Ellen Kavanaugh Interiors", href: withCredenzaUtm("https://www.ellenkavanaugh.com/", "designer-credit", "for-designers-hero") },
      { text: ")" },
    ],
  },
  {
    src: "/studio-dorion-pound-ridge-hires.jpg",
    alt: "Studio Dorion Pound Ridge entry",
    position: "center center",
    credits: [
      { text: "© " },
      { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "for-designers-hero") },
      { text: " (design by " },
      { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "for-designers-hero") },
      { text: ")" },
    ],
  },
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
      className="relative overflow-hidden flex items-center bg-white min-h-[90vh] pt-16"
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
        backgroundSize: "32px 32px", opacity: 0.35,
      }} />

      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>Trade access, simplified</Eyebrow>

            <h1 className="font-freight mb-8 leading-none text-charcoal" style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", letterSpacing: "-0.03em" }}>
              One place for
              <br />
              every trade account,
              <br />
              <span className="italic text-olive-mid">every resale certificate,</span>
              <br />
              every relationship.
            </h1>

            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden aspect-[4/3]">
              <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ objectPosition: hero.position }} />
            </div>

            <p className="mb-10 text-charcoal-mid max-w-[400px]" style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
              Every trade relationship your firm depends on, organized in one
              dashboard. Generate the right resale certificate for every state,
              and apply to new vendors instantly—so you spend your time
              designing, not filing paperwork.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a href={JOIN_DESIGNER_URL} className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200 font-normal uppercase bg-teal text-forest rounded-none hover:bg-[#99b8bd]"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
              >Get Early Access</a>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: <FileText size={12} />, text: "The right cert for every state, every vendor, every purchase" },
                { icon: <CreditCard size={12} />, text: "Every account, rep, and discount code in one dashboard" },
                { icon: <Zap size={12} />, text: "Apply instantly to vendors on the Credenza platform" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <span className="text-charcoal-soft shrink-0">{item.icon}</span>
                  <span className="text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.02em" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photography — desktop only */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block aspect-square">
            <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover block" style={{ objectPosition: hero.position }} />
            <PhotoCredit credits={hero.credits} separator="" />
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
    <section id="tax-strategy" ref={ref} className="reveal py-24 md:py-36 bg-white">
      <div className="container">
        {/* Section intro — full width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-7">
            <Eyebrow>Tax strategy & resale certificates</Eyebrow>
            <h2 className="font-freight leading-none text-charcoal" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)", letterSpacing: "-0.03em" }}>
              The broadest exemption coverage
              <br />
              <span className="italic text-olive-mid">you're legally entitled to.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Work on a project in another state? Use a workroom across state lines?
              Multi-state tax gets confusing fast—every state has different
              rules, forms, and expirations, and it's easy to leave money on
              the table or check the wrong box.
            </p>
          </div>
        </div>

        {/* Four strategy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-20 border-t border-sage-dark">
          {[
            {
              title: "One registration, many states",
              body: "Did you know a single registration can earn you tax exemption in dozens of states? Whether you're on a sourcing trip to Round Top or shipping out of state, Credenza finds you the broadest tax exemption possible with the fewest possible forms, every time—so you don't pay tax if you don't need to.",
            },
            {
              title: "Filled in, not guessed at",
              body: "We auto-fill legal business name, address, and comprehensive product categories from our to-the-trade vendor directory of 1,500+ brands to build you a compliant blanket certificate in seconds.",
            },
            {
              title: "Always current, never lapsed",
              body: "Every certificate's expiration date is tracked in your vault. For vendors on Credenza, we notify you before anything lapses—so your tax-exempt status never changes because of a missed deadline.",
            },
            {
              title: "Bring your own cert",
              body: "Six states require their own state-issued certificate—AL, FL, LA, NM, TN, WA. Upload yours once—Credenza tracks expirations and keeps it ready to send to any vendor on the Credenza network.",
            },
          ].map((card, i) => (
            <div key={card.title} className={`py-8 md:pr-8 border-b border-sage-dark ${i > 0 ? "md:pl-8" : ""} ${i < 3 ? "md:border-r md:border-sage-dark" : ""}`}>
              <h3 className="font-freight mb-3 text-charcoal" style={{ fontSize: "1.35rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {card.title}
              </h3>
              <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Cert generator mock + stats */}
        <div className="relative">
          <div className="overflow-hidden border border-sage-dark relative" style={{ maxWidth: "900px" }}>
            <img
              src="/cert-generator-engine.png?v=4"
              alt="Credenza cert generator — preview of a Multistate Tax Commission (MTC) certificate for Melton Antiques covering Arizona, Missouri, and New Jersey, pre-filled for H20 Interiors"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 border border-teal-border" style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)" }}>
              <Zap size={12} className="text-teal-mid" />
              <span className="font-semibold uppercase text-teal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Generated in seconds</span>
            </div>
          </div>

          {/* Certificate Vault overlay — static mock */}
          <div
            className="absolute hidden lg:block pointer-events-none select-none bg-white"
            style={{
              width: "480px",
              bottom: "-40px",
              right: "-16px",
              border: "1px solid #e0dcd4",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
              zIndex: 10,
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
            }}
          >
            {/* Vault header */}
            <div className="px-5 pt-5 pb-4">
              <span
                className="uppercase font-semibold"
                style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#9a978f" }}
              >
                Certificate Vault
              </span>
              <h4
                className="font-freight italic"
                style={{ fontSize: "1.15rem", color: "#1A1A1A", letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: "4px" }}
              >
                Your Resale Certificates
              </h4>
              <p style={{ fontSize: "10px", color: "#6a6a62", marginTop: "2px" }}>H2O Interiors</p>
            </div>

            {/* Stats bar */}
            <div className="flex mx-5 mb-4" style={{ border: "1px solid #e0dcd4" }}>
              <div className="flex-1 px-4 py-3" style={{ borderRight: "1px solid #e0dcd4" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield size={10} style={{ color: "#6f6e4b" }} />
                  <span style={{ fontSize: "9px", color: "#6f6e4b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Secured</span>
                </div>
                <div style={{ fontSize: "20px", color: "#1A1A1A", fontWeight: 300 }}>6</div>
                <div style={{ fontSize: "9px", color: "#9a978f" }}>certificates across 4 states, 3 vendors</div>
              </div>
              <div className="px-4 py-3 flex flex-col items-center justify-center" style={{ minWidth: "80px" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield size={10} style={{ color: "#3a6e70" }} />
                  <span style={{ fontSize: "9px", color: "#3a6e70", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Active</span>
                </div>
                <div style={{ fontSize: "20px", color: "#1A1A1A", fontWeight: 300 }}>5</div>
              </div>
            </div>

            {/* Cert rows */}
            <div className="px-5 pb-4">
              {[
                { state: "New York", vendor: "Mercer Lighting", form: "NY ST-120", signed: "Apr 10, 2026", validity: "Valid Until Revoked", categories: "Lighting, Furniture" },
                { state: "New York", vendor: "Atelier Sands", form: "NY ST-120", signed: "Apr 8, 2026", validity: "Valid Until Revoked", categories: "Wallcovering, Fabric" },
                { state: "Connecticut", vendor: "Mercer Lighting", form: "CT CERT-100", signed: "Apr 10, 2026", validity: "Valid Until Revoked", categories: "Lighting, Furniture" },
                { state: "Florida", vendor: "Atelier Sands", form: "FL DR-14", signed: "Jan 15, 2025", validity: "Expires May 2026", categories: "Wallcovering, Fabric", expiring: true },
              ].map((cert, i) => (
                <div
                  key={i}
                  className="py-3"
                  style={{ borderTop: i === 0 ? "1px solid #e0dcd4" : "1px solid #f0ede8" }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span style={{ fontSize: "12px", color: "#1A1A1A", fontWeight: 600 }}>{cert.state}</span>
                    <span style={{ color: "#9a978f" }}>—</span>
                    <span style={{ fontSize: "12px", color: "#1A1A1A" }}>{cert.vendor}</span>
                    <span
                      className="px-1.5 py-0.5"
                      style={{ fontSize: "8px", color: "#6a6a62", border: "1px solid #e0dcd4", textTransform: "uppercase", letterSpacing: "0.03em" }}
                    >
                      {cert.form}
                    </span>
                    <span
                      className="px-1.5 py-0.5"
                      style={{
                        fontSize: "8px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        color: (cert as any).expiring ? "#8B6914" : "#6f6e4b",
                        backgroundColor: (cert as any).expiring ? "rgba(139,105,20,0.08)" : "rgba(111,110,75,0.08)",
                      }}
                    >
                      {(cert as any).expiring ? "Expiring Soon" : "Active"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: "10px", color: "#9a978f" }}>
                    <span>Signed {cert.signed}</span>
                    <span>·</span>
                    <span style={{ color: (cert as any).expiring ? "#8B6914" : "#6f6e4b", fontWeight: 500 }}>{cert.validity}</span>
                    <span>·</span>
                    <span>{cert.categories}</span>
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
   3. ACCOUNT MANAGEMENT
   ========================================================================= */
function AccountManagement() {
  const ref = useReveal();
  return (
    <section id="accounts" ref={ref} className="reveal py-24 md:py-32 bg-page-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Trade account management</Eyebrow>
            <h2 className="font-freight mb-6 text-charcoal" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Every account you hold.
              <br />
              <span className="italic text-olive-mid">One dashboard.</span>
            </h2>
            {/* Mobile-only image after headline */}
            <div className="lg:hidden mb-6 overflow-hidden border border-sage-dark">
              <img src="/trade-accounts-screenshot-crop.png" alt="Trade accounts dashboard" loading="lazy" className="w-full h-auto block" />
            </div>
            <p className="mb-4 text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Vendors, workrooms, installers, fabric houses. No more unruly
              Google Sheets, no more digging through emails for an account
              number, discount code, or your rep's phone number.
            </p>
            <p className="mb-6 text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Info from 1,500+ to-the-trade vendors is already in Credenza—just
              start typing and add them to your dashboard in one click.
            </p>
            <p className="font-freight italic text-charcoal" style={{ fontSize: "1.1rem", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
              Your trade relationships are your business. Now they're organized like it.
            </p>
          </div>

          <div className="lg:col-span-7 hidden lg:block relative">
            {/* Coded trade accounts dashboard mock */}
            <div
              className="overflow-hidden border border-sage-dark pointer-events-none select-none bg-white"
              style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
            >
              {/* Dashboard header */}
              <div className="px-5 pt-5 pb-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-freight font-normal" style={{ fontSize: "20px", color: "#1A1A1A", letterSpacing: "-0.01em" }}>
                      Trade Accounts & Tradespeople
                    </h3>
                    <p style={{ fontSize: "11px", color: "#6a6a62", marginTop: "2px" }}>H2O Interiors</p>
                  </div>
                  <div className="flex gap-0 text-[10px]">
                    <span className="px-2.5 py-1 text-white" style={{ backgroundColor: "#1A1A1A", fontSize: "10px" }}>All (7)</span>
                    <span className="px-2.5 py-1" style={{ border: "1px solid #e0dcd4", color: "#6a6a62", fontSize: "10px" }}>Vendors (6)</span>
                    <span className="px-2.5 py-1" style={{ border: "1px solid #e0dcd4", color: "#6a6a62", fontSize: "10px" }}>Services (1)</span>
                  </div>
                </div>
                <p style={{ fontSize: "11px", color: "#9a978f", marginBottom: "12px" }}>Your vendors, showrooms, and sources—accounts and shops, all in one place.</p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 text-white" style={{ backgroundColor: "#1A1A1A", fontSize: "11px" }}>+ Add Source</span>
                  <span className="inline-flex items-center px-3 py-1.5" style={{ border: "1px solid #e0dcd4", fontSize: "11px", color: "#1A1A1A" }}>Import CSV</span>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 px-2.5 py-1.5" style={{ border: "1px solid #e0dcd4", color: "#b0ada5", fontSize: "11px" }}>Search vendors...</div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5" style={{ border: "1px solid #e0dcd4", color: "#6a6a62", fontSize: "11px" }}>All Types <ChevronRight size={10} className="rotate-90" /></div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5" style={{ border: "1px solid #e0dcd4", color: "#6a6a62", fontSize: "11px" }}>All Categories <ChevronRight size={10} className="rotate-90" /></div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5" style={{ border: "1px solid #e0dcd4", color: "#6a6a62", fontSize: "11px" }}>Sort: Name <ChevronRight size={10} className="rotate-90" /></div>
                </div>

                {/* Tab row */}
                <div className="flex gap-0 border-b border-sage-dark">
                  {["All (7)", "Accounts (4)", "Platform (4)", "Manual (3)", "Active (5)", "Pending (0)", "Favorites (0)"].map((tab, i) => (
                    <span key={tab} className="px-3 py-2" style={{ fontSize: "10px", color: i === 0 ? "#1A1A1A" : "#9a978f", fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? "2px solid #1A1A1A" : "2px solid transparent" }}>{tab}</span>
                  ))}
                </div>
              </div>

              {/* Vendor cards grid */}
              <div className="grid grid-cols-3 gap-0 px-5 py-4">
                {[
                  {
                    name: "Mercer Lighting",
                    tier: "Luxury",
                    verified: true,
                    tags: ["Lighting", "Furniture", "Accessories"],
                    discount: "35%",
                    spend: "$84,200",
                    account: "#ML-10482",
                    rep: "Maria Santos",
                    email: "msantos@mercerlighting.com",
                    phone: "(415) 555-0182",
                    img: "/mercer-lighting-hero.jpg",
                  },
                  {
                    name: "Atelier Sands",
                    tier: "Premium",
                    verified: false,
                    tags: ["Wallcovering", "Fabric"],
                    discount: "20%",
                    spend: "$12,400",
                    account: "#AS-5519",
                    rep: "Lauren Cole",
                    email: "lcole@ateliersands.com",
                    phone: "(561) 555-0347",
                    img: "/atelier-sands-hero.jpg",
                  },
                  {
                    name: "Sunshine Upholstery",
                    tier: "Premium",
                    verified: false,
                    tags: ["Drapery & Workroom"],
                    discount: "",
                    spend: "",
                    account: "",
                    rep: "",
                    email: "",
                    phone: "",
                    img: "",
                  },
                ].map((v) => (
                  <div key={v.name} className="p-3 bg-white flex flex-col" style={{ border: "1px solid #e8e4dd" }}>
                    {/* Card image */}
                    <div className="w-full aspect-[16/9] mb-3 rounded-[1px] overflow-hidden" style={{ backgroundColor: v.img ? undefined : "#b8ccd2" }}>
                      {v.img && <img src={v.img} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="font-freight" style={{ fontSize: "14px", color: "#1A1A1A", letterSpacing: "-0.01em" }}>{v.name}</div>
                    <div style={{ fontSize: "10px", color: "#6a6a62", marginTop: "1px", minHeight: "14px" }}>{v.tier || "\u00A0"}</div>
                    <div style={{ minHeight: "18px" }}>
                      {v.verified && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#3a6e70" }} />
                          <span style={{ fontSize: "9px", color: "#3a6e70", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Credenza Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {v.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.5" style={{ fontSize: "9px", color: "#6a6a62", border: "1px solid #e0dcd4" }}>{t}</span>
                      ))}
                    </div>
                    {/* Stats row — always present for alignment */}
                    <div className="flex items-center gap-3 mt-3 pt-2" style={{ borderTop: "1px solid #f0ede8", minHeight: "44px" }}>
                      {v.discount ? (
                        <>
                          <div>
                            <div className="font-freight" style={{ fontSize: "18px", color: "#1A1A1A" }}>{v.discount}</div>
                            <div style={{ fontSize: "8px", color: "#9a978f", textTransform: "uppercase", letterSpacing: "0.04em" }}>Discount</div>
                          </div>
                          {v.verified && v.spend && (
                            <div>
                              <div style={{ fontSize: "12px", color: "#1A1A1A" }}>{v.spend}</div>
                              <div style={{ fontSize: "8px", color: "#9a978f", textTransform: "uppercase", letterSpacing: "0.04em" }}>YTD Spend</div>
                            </div>
                          )}
                          {v.account && (
                            <div className="whitespace-nowrap">
                              <div style={{ fontSize: "11px", color: "#1A1A1A" }}>{v.account}</div>
                              <div style={{ fontSize: "8px", color: "#9a978f", textTransform: "uppercase", letterSpacing: "0.04em" }}>Account</div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center gap-1" style={{ color: "#3a6e70", fontSize: "10px" }}>
                          Add Details <ArrowRight size={9} />
                        </div>
                      )}
                    </div>
                    {/* Rep / footer row */}
                    <div className="mt-auto pt-2" style={{ borderTop: "1px solid #f0ede8", minHeight: "60px" }}>
                      {v.rep ? (
                        <>
                          <div style={{ fontSize: "8px", color: "#9a978f", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "2px" }}>Sales Rep</div>
                          <div style={{ fontSize: "11px", color: "#1A1A1A", fontWeight: 500 }}>{v.rep}</div>
                          <div style={{ fontSize: "10px", color: "#6a6a62" }}>{v.email}</div>
                          <div style={{ fontSize: "10px", color: "#6a6a62" }}>{v.phone}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span style={{ fontSize: "10px", color: "#3a6e70" }}>Login &rarr;</span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5" style={{ fontSize: "9px", color: "#6a6a62", border: "1px solid #e0dcd4" }}>User <Copy size={8} /></span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5" style={{ fontSize: "9px", color: "#6a6a62", border: "1px solid #e0dcd4" }}>Pass <Copy size={8} /></span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1" style={{ color: "#9a978f", fontSize: "10px" }}>
                          No rep assigned
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* "Add a Vendor" modal overlay — static mock */}
            <div
              className="absolute pointer-events-none select-none bg-white p-6 rounded-[2px]"
              style={{
                width: "340px",
                bottom: "-32px",
                right: "-24px",
                border: "1px solid #e0dcd4",
                boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 10,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className="uppercase font-semibold text-charcoal-soft"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em" }}
                >
                  New Source
                </span>
                <span className="text-charcoal-soft" style={{ fontSize: "14px", lineHeight: 1 }}>&times;</span>
              </div>
              <h4
                className="font-freight text-charcoal mb-4"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}
              >
                Add a Vendor or Source
              </h4>

              {/* Directory search */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield size={11} className="text-olive-mid" />
                  <span
                    className="font-semibold text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
                  >
                    Search our directory
                  </span>
                </div>
                <p
                  className="text-charcoal-soft mb-2.5"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", lineHeight: 1.5 }}
                >
                  1,500+ to-the-trade vendors. Start typing to find and add.
                </p>
                <div
                  className="px-3 py-2 bg-white mb-1"
                  style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#1A1A1A" }}
                >
                  Ben<span style={{ borderRight: "1.5px solid #1A1A1A", marginLeft: "1px" }} />
                </div>
                {/* Typeahead results */}
                <div style={{ border: "1px solid #e0dcd4", borderTop: "none" }}>
                  <div className="flex items-center justify-between px-3 py-2 bg-white" style={{ borderBottom: "1px solid #f0ede8" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#1A1A1A", fontWeight: 500 }}>Bennett & Solis</div>
                      <div style={{ fontSize: "0.6rem", color: "#9a978f" }}>Rugs · Furniture · Lighting</div>
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "#3a6e70" }}>+ Add</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-white">
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#1A1A1A", fontWeight: 500 }}>Benbrook Textiles</div>
                      <div style={{ fontSize: "0.6rem", color: "#9a978f" }}>Fabric · Trim</div>
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "#3a6e70" }}>+ Add</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ backgroundColor: "#e0dcd4" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "#b0ada5" }}>or</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e0dcd4" }} />
              </div>

              {/* Auto-fill section */}
              <div
                className="p-4 mb-4"
                style={{ backgroundColor: "rgba(184,204,210,0.1)", border: "1px solid rgba(184,204,210,0.3)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap size={11} className="text-teal-mid" />
                  <span
                    className="font-semibold text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
                  >
                    Auto-fill from Website
                  </span>
                </div>
                <p
                  className="text-charcoal-soft mb-3"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", lineHeight: 1.5 }}
                >
                  Paste a URL and we'll pull name, categories, address, and trade portal.
                </p>
                <div className="flex gap-2">
                  <div
                    className="flex-1 px-3 py-2 bg-white text-charcoal-soft"
                    style={{
                      border: "1px solid #e0dcd4",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      color: "#b0ada5",
                    }}
                  >
                    e.g. schumacher.com
                  </div>
                  <div
                    className="flex items-center gap-1 px-3 py-2 text-white shrink-0"
                    style={{
                      backgroundColor: "#1A1A1A",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.7rem",
                    }}
                  >
                    Auto-fill <ArrowRight size={10} />
                  </div>
                </div>
              </div>

              <p
                className="text-charcoal-soft text-center"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#b0ada5" }}
              >
                Or fill in manually · <span className="underline">Import via CSV</span>
              </p>
            </div>
          </div>
        </div>

        {/* Supporting points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mt-16 border-t border-sage-dark">
          {[
            { title: "Certs attached to accounts", body: "Every certificate attaches to its vendor automatically. When one expires, the affected accounts surface on your dashboard—so you know when it's time to submit a new one." },
            { title: "Vendor logins, securely stored", body: "Account numbers and portal passwords encrypted in transit and at rest. Copy user name and password with one click. Share access with your team; revoke when someone leaves." },
            { title: "Bring your whole book in one import", body: "Upload a CSV of your existing trade accounts—we match against our directory of 1,500+ brands and auto-fill categories, contact info, and portal links. Migrate decades of vendors in minutes." },
            { title: "Update once, update everywhere", body: "New address, new business name, new team member—change it in your profile and every vendor you're connected with sees the update." },
          ].map((item, i) => (
            <div key={item.title} className={`py-8 md:pr-8 border-b border-sage-dark ${i > 0 ? "md:pl-8" : ""} ${i < 3 ? "md:border-r md:border-sage-dark" : ""}`}>
              <h3 className="font-freight mb-2 text-charcoal" style={{ fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}>{item.title}</h3>
              <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   5. VERIFIED PROFILE — the foundation for one-click apply
   ========================================================================= */
function VerifiedProfile() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-white">
      {/* Full-bleed image with text overlay + profile card mockup */}
      <div className="relative overflow-hidden min-h-[55vh]">
        <img src="/emily-jones-bedroom-nightstand.jpg" alt="Bedroom by Emily Jones Interiors" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Lindsay Salazar", href: withCredenzaUtm("https://www.lindsaysalazar.com/", "photo-credit", "for-designers-verified-profile") },
            { text: " (design by " },
            { text: "Emily Jones Interiors", href: withCredenzaUtm("https://emilyjonesinteriors.com/", "designer-credit", "for-designers-verified-profile") },
            { text: ")" },
          ]}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.92) 0%, rgba(33,53,63,0.7) 50%, rgba(33,53,63,0.2) 100%)` }} />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow light>Your verified profile</Eyebrow>
              <h2 className="font-freight mb-6 text-ivory" style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
                Verified once.
                <br />
                <span className="italic text-teal">Trusted everywhere.</span>
              </h2>
              <p className="max-w-[460px]" style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)" }}>
                Your EIN confirmed against IRS records. Your license validated with the
                state board. Your memberships checked against ASID, NCIDQ, NKBA, and ICAA directories.
                Everything that makes your certificates and applications credible—verified
                once and stored in one place.
              </p>
            </div>

            {/* Real profile screenshot */}
            <div className="lg:col-span-6 lg:col-start-7">
              <img src="/profile-screenshot.png" alt="Trade profile showing business details, memberships, licenses, and trade references" loading="lazy" className="w-full h-auto block ml-auto max-w-[560px]" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Credential grid */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-sage-dark">
          {[
            { label: "EIN number", detail: "Verified against IRS records—building the credibility that gets you approved faster.", badge: "Verified" },
            { label: "Professional licenses", detail: "Interior design licenses checked against state boards in NY, FL, GA, IL, LA, NV, TX, and DC. Architecture licenses validated against NCARB.", badge: "Verified" },
            { label: "Sales tax registrations", detail: "Verified directly with 28 states. Stored so your certificates are always pre-filled correctly.", badge: "Verified" },
            { label: "Professional memberships", detail: "ASID, NCIDQ, NKBA, ICAA—if you're a member, we'll make sure it counts.", badge: "Verified" },
            { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice.", badge: "Verified" },
            { label: "Press recognition & showhouse participation", detail: "Matched against thousands of showhouse participants and press coverage across major design publications.", badge: "Enriched" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 py-5 border-b border-sage-dark">
              <div className="flex items-center justify-center shrink-0 mt-0.5 w-5 h-5 bg-olive-dim border border-olive-border">
                <Check size={10} className="text-olive-mid" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}>{item.label}</span>
                  {item.badge === "Enriched" && (
                    <span className="px-1.5 py-0.5 bg-teal-dim border border-teal-border font-semibold uppercase text-teal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", letterSpacing: "0.06em" }}>Enriched</span>
                  )}
                </div>
                <p className="text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting copy */}
        <div className="mt-14 text-center mx-auto max-w-[640px]">
          <p className="font-freight italic text-charcoal-mid" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
            A license, a membership, a decade of published work, a growing social
            following—however you've built your career, Credenza turns it into a
            profile that speaks for you. As vendors join the network, your verified
            profile travels with you—one click to apply, every time.
          </p>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   4. FIRM & TEAM
   ========================================================================= */
function FirmTeam() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-page-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Built for the whole firm</Eyebrow>
            <h2 className="font-freight mb-6 text-charcoal" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              One account.
              <br />
              <span className="italic text-olive-mid">Everyone on the team.</span>
            </h2>
            {/* Mobile-only image after headline */}
            <div className="lg:hidden mb-6">
              <img src="/team-members-screenshot.png" alt="Team members panel" loading="lazy" className="w-full h-auto block" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
            </div>
            <p className="mb-4 text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Every team member gets their own login. Add a new hire once
              and they have access to every vendor account. Revoke access
              the moment someone leaves.
            </p>

            <div className="border-t border-sage-dark">
              {[
                { icon: <Users size={14} />, title: "Each person, their own login", body: "No shared passwords to rotate when someone leaves." },
                { icon: <Shield size={14} />, title: "Everyone can contribute", body: "Any team member can generate certificates, add vendors and sources, and manage trade accounts." },
                { icon: <Zap size={14} />, title: "Not authorized to sign?", body: "Every resale certificate needs a legally authorized signer. Any team member can draft and pre-fill the cert; route it to the firm owner or another authorized signer to complete in their inbox." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 py-4 border-b border-sage-dark">
                  <div className="flex items-center justify-center shrink-0 mt-0.5 w-6 h-6 bg-teal-dim border border-teal-border">
                    <span className="text-teal-mid">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-charcoal mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }}>{item.title}</div>
                    <div className="text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", lineHeight: 1.55 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team members screenshot — desktop only */}
          <div className="lg:col-span-7 hidden lg:block">
            <img src="/team-members-screenshot.png" alt="Team members panel showing owner and team member roles" loading="lazy" className="w-full h-auto block ml-auto max-w-[620px]" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── One-click apply mock (coded) ─── */
function OneClickApplyMock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white pointer-events-none select-none ${className}`}
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        border: "1px solid #e0dcd4",
        boxShadow: "0 12px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div className="px-8 pt-10 pb-8">
        {/* Eyebrow */}
        <span
          className="uppercase font-semibold"
          style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#9a978f" }}
        >
          Your Credenza profile is ready
        </span>
        <div className="mt-4 mb-5" style={{ width: "2rem", height: "1px", backgroundColor: "#e0dcd4" }} />

        {/* Welcome */}
        <h3
          className="font-freight"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#1A1A1A", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          <span className="italic">Welcome back,</span> Jane.
        </h3>
        <p className="mt-3 mb-8" style={{ fontSize: "13px", color: "#9a978f", lineHeight: 1.5 }}>
          Your trade profile is on file—review and click to submit your application.
        </p>

        {/* Profile card */}
        <div
          className="flex items-center justify-between p-5 mb-8"
          style={{ backgroundColor: "#f7f5f1", border: "1px solid #e8e4dd" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] shrink-0 overflow-hidden" style={{ border: "1px solid #e0dcd4" }}>
              <img src="/h2o-interiors-logo.jpg" alt="H2O Interiors" className="w-full h-full object-cover" />
            </div>
            <div>
              <div style={{ fontSize: "15px", color: "#1A1A1A", fontWeight: 600 }}>H2O Interiors</div>
              <div style={{ fontSize: "12px", color: "#6a6a62", marginTop: "2px" }}>Jane Atwater · jane@h2ointeriors.com</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5">
              <Check size={13} style={{ color: "#3a6e70" }} />
              <span className="uppercase font-semibold" style={{ fontSize: "0.55rem", letterSpacing: "0.08em", color: "#3a6e70" }}>Profile Complete</span>
            </div>
            <div className="mt-1.5" style={{ fontSize: "11px", color: "#6a6a62", textDecoration: "underline" }}>Review your profile</div>
          </div>
        </div>

        {/* Resale certificates */}
        <div className="pb-6 mb-6" style={{ borderBottom: "1px solid #f0ede8" }}>
          <span
            className="uppercase font-semibold"
            style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: "#9a978f" }}
          >
            Resale Certificates
          </span>
          <p className="mt-3" style={{ fontSize: "13px", color: "#1A1A1A", lineHeight: 1.7 }}>
            We'll generate resale certificates automatically. We have your sales tax IDs on file for{" "}
            <strong>2 states</strong>—<span style={{ color: "#3a6e70", textDecoration: "underline" }}>view all states</span>.{" "}
            <span style={{ color: "#3a6e70", textDecoration: "underline" }}>Edit states</span>
          </p>
        </div>

        {/* Tax-exempt */}
        <div className="flex items-center justify-between pb-6 mb-6" style={{ borderBottom: "1px solid #f0ede8" }}>
          <p style={{ fontSize: "13px", color: "#1A1A1A" }}>
            You've elected <strong>tax-exempt purchasing</strong>.
          </p>
          <span style={{ fontSize: "12px", color: "#6a6a62", textDecoration: "underline" }}>Change</span>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-5 mb-10">
          <label className="flex items-start gap-3">
            <div className="w-[18px] h-[18px] shrink-0 mt-0.5" style={{ border: "2px solid #c8c4bc", borderRadius: "3px" }} />
            <span style={{ fontSize: "13px", color: "#1A1A1A", lineHeight: 1.5 }}>
              I agree to Mercer Lighting's <span style={{ textDecoration: "underline" }}>Trade Program Terms</span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <div className="w-[18px] h-[18px] shrink-0 mt-0.5" style={{ border: "2px solid #c8c4bc", borderRadius: "3px" }} />
            <span style={{ fontSize: "13px", color: "#1A1A1A", lineHeight: 1.5 }}>
              Keep me updated on new collections and trade exclusives from Mercer Lighting
            </span>
          </label>
        </div>

        {/* Apply button */}
        <div
          className="flex items-center justify-center gap-2 py-5 uppercase font-semibold"
          style={{
            backgroundColor: "#1A1A1A",
            color: "#ffffff",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
          }}
        >
          Apply to Mercer Lighting <ArrowRight size={14} />
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <span style={{ fontSize: "0.6rem", color: "#b0ada5", letterSpacing: "0.04em" }}>Powered by</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "#9a978f", letterSpacing: "0.04em" }}>Credenza</span>
        </div>
      </div>
    </div>
  );
}


/* =========================================================================
   6. THE CREDENZA NETWORK — where it's going
   ========================================================================= */
function Network() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-forest">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow light>The Credenza network</Eyebrow>
            <h2 className="font-freight mb-6 text-ivory" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              One-click
              <br />
              <span className="italic text-teal">trade access.</span>
            </h2>
            {/* Mobile-only */}
            <div className="lg:hidden mb-6">
              <OneClickApplyMock />
            </div>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(240,240,236,0.7)" }}>
              We're onboarding the first vendor partners now. As they power
              their trade programs with Credenza, your verified profile goes
              with you—no forms, no uploads, no repeat applications.
            </p>
            <p className="font-freight italic mb-8 text-teal" style={{ fontSize: "1.15rem", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
              Set up once. Every new vendor is just one click away.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { title: "Your profile travels with you", body: "Everything you verify stays with your trade profile, portable across every vendor on Credenza." },
                { title: "No forms to fill out", body: "Your verified profile is the application. Skip the re-entry, the re-uploads, the re-explaining." },
                { title: "Approved faster", body: "Vendors on Credenza can automate their approvals—so if your verified profile meets their criteria, you can be approved in under 5 minutes." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-freight mb-1 text-ivory" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(240,240,236,0.55)" }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 hidden lg:flex flex-col gap-0">
            <OneClickApplyMock className="ml-auto max-w-[560px]" />
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   7. PRICING — free for designers
   ========================================================================= */
function Pricing() {
  const ref = useReveal();
  const included = [
    "Unlimited resale certificates for every state",
    "Trade account dashboard with encrypted credentials",
    "CSV import to migrate your whole book in minutes",
    "Verified profile—EIN, sales tax IDs, licenses, memberships",
    "Unlimited team members, no per-seat fees",
    "Automatic expiration tracking for every certificate",
  ];
  return (
    <section id="pricing" ref={ref} className="reveal py-24 md:py-32 bg-page-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-freight leading-none text-charcoal" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)", letterSpacing: "-0.03em" }}>
              Free for designers.
              <br />
              <span className="italic text-olive-mid">Really.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
              No credit card. No trial window. No seat limit. Generate certs,
              manage trade accounts, verify your profile, and invite your whole
              team at no cost to designers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-sage-dark">
          {included.map((item, i) => (
            <div key={item} className={`flex items-start gap-4 py-5 border-b border-sage-dark ${i % 2 === 0 ? "md:pr-8" : "md:pl-8 md:border-l md:border-sage-dark"}`}>
              <div className="flex items-center justify-center shrink-0 mt-0.5 w-5 h-5 bg-olive-dim border border-olive-border">
                <Check size={10} className="text-olive-mid" />
              </div>
              <span className="text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   8. FAQ
   ========================================================================= */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent"
      >
        <h3 className="font-freight text-charcoal" style={{ fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {open && (
        <p
          className="pb-5 pr-10 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

function FAQ() {
  const ref = useReveal();
  const questions = [
    {
      q: "Is Credenza really free for designers?",
      a: "Yes—no credit card, no trial window, no seat limit. Build a profile, generate certs, apply for trade programs, manage trade accounts, and invite your team at no cost to designers. Vendors pay for the platform.",
    },
    {
      q: "Which states do you support?",
      a: "All 46 states with sales tax, plus DC. We auto-fill the official PDF form for 39 states. Six states (AL, FL, LA, NM, TN, WA) require their own state-issued cert—upload yours once and Credenza keeps it ready to send to any vendor on the Credenza network.",
    },
    {
      q: "How do I move my existing account/source list into Credenza?",
      a: "If you're already tracking them in a Google Sheet or spreadsheet, export to CSV and drop it in. We match against our directory of 1,500+ to-the-trade brands and auto-fill categories for easy sourcing, corporate addresses and legal business names for resale certificate generation, and trade portal login links for quick access—your whole book migrated in minutes.",
    },
    {
      q: "Can I add my own vendors?",
      a: "Yes. Any vendor you shop with or tradesperson you work with can be added to your dashboard. If they're in our directory of 1,500+ brands, categories and business info are pre-filled. If not, paste a URL and we'll pull the details, or add them manually in a few fields.",
    },
    {
      q: "Is my trade profile secure?",
      a: "Yes. Sensitive information in your trade profile—your EIN, sales tax IDs, and vendor portal credentials—is encrypted in transit and at rest. Your profile is visible only to team members you authorize. Revoke access the moment someone leaves the firm.",
    },
    {
      q: "Is my vendor list private?",
      a: "Yes. Your trade profile and account details are visible only to you and the team members you authorize. No other designer sees who you work with or what you pay. Your trade profile only reaches a vendor when your firm chooses to apply. Your accounts, discounts, and relationships stay yours.",
    },
  ];
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <section id="faq" ref={ref} className="reveal py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-8">
          <div className="lg:col-span-7">
            <Eyebrow>Frequently asked</Eyebrow>
            <h2 className="font-freight leading-none text-charcoal" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}>
              Fair questions,
              <br />
              <span className="italic text-olive-mid">answered.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-sage-dark">
          {questions.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   9. CTA
   ========================================================================= */
function CTASection() {
  const ref = useReveal();
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submitDisabled =
    status === "sending" || !name.trim() || !firm.trim() || !email.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitDisabled) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitDesignerWaitlist({ name, firm, email });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section ref={ref} className="reveal py-12 md:py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-sage-dark">
          <div className="relative overflow-hidden aspect-square">
            <img
              src="/marea-clark-entry.jpg"
              alt="Entry by Marea Clark"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
            <PhotoCredit
              separator=""
              credits={[
                { text: "© " },
                { text: "Tim Lenz", href: withCredenzaUtm("https://www.timlenzphoto.com/", "photo-credit", "for-designers-cta") },
                { text: "/OTTO (design by " },
                { text: "Marea Clark Interiors", href: withCredenzaUtm("https://www.mareaclarkinteriors.com/", "designer-credit", "for-designers-cta") },
                { text: ")" },
              ]}
            />
          </div>
          <div className="bg-white p-10 md:p-12 lg:p-14 flex flex-col justify-center">
            <Eyebrow>Early access</Eyebrow>
            <h2 className="font-freight mb-3 text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Your verified profile
              <br />
              <span className="italic text-olive-mid">is coming soon.</span>
            </h2>
            <p className="mb-8 text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Every trade relationship you rely on in one considered place.
              Join the waitlist to be among the first.
            </p>

            {status === "sent" ? (
              <div className="flex flex-col gap-2">
                <p className="font-freight italic text-charcoal" style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>
                  You&rsquo;re on the list.
                </p>
                <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.55 }}>
                  We&rsquo;ll be in touch as soon as we open early access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  { key: "name", value: name, setter: setName, placeholder: "Your name", type: "text", autoComplete: "name" },
                  { key: "firm", value: firm, setter: setFirm, placeholder: "Firm or studio name", type: "text", autoComplete: "organization" },
                  { key: "email", value: email, setter: setEmail, placeholder: "Work email", type: "email", autoComplete: "email" },
                ].map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required
                    className="w-full px-4 py-3 outline-none transition-all duration-150 border border-sage-dark focus:border-olive bg-page-white text-charcoal rounded-none"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                  />
                ))}
                {errorMsg && (
                  <p className="text-[#6B2D2D]" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="no-underline w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200 uppercase font-normal bg-teal hover:bg-[#99b8bd] text-forest rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
                >
                  {status === "sending" ? "Sending..." : "Join the waitlist"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   PAGE
   ========================================================================= */
export default function ForDesigners() {
  return (
    <div className="min-h-screen bg-white">
      <Nav activePage="designers" ctaLabel="Get Early Access" ctaHref={JOIN_DESIGNER_URL} showMobileCta={false} />
      <Hero />
      <AccountManagement />
      <TaxStrategy />
      <FirmTeam />
      <VerifiedProfile />
      <Network />
      <Pricing />
      <CTASection />
      <FAQ />
      <Footer />
    </div>
  );
}
