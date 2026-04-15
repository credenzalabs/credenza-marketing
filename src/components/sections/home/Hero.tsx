import { useEffect, useState } from "react";
import { ChevronDown, FileText, Shield, Store } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { C } from "@/lib/constants";
import { IMAGES } from "./images";

// ─── Hero ────────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  { src: IMAGES.studioDorionBrownstone, alt: "Studio Dorion brownstone", position: "left center", credit: "Design by Studio Dorion · Photo by Ethan Harrington" },
  { src: "/caitlin-kah-credenza.jpg", alt: "Interior by Caitlin Kah Interiors", position: "center center", credit: "Design by Caitlin Kah Interiors · Photo by Carmel Brantley" },
];

export function Hero() {
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

            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ objectPosition: hero.position }} />
            </div>

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

          {/* Right: Photography — desktop only */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block" style={{ aspectRatio: "1/1" }}>
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
