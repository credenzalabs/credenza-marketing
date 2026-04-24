import { useEffect, useState } from "react";
import { ChevronDown, FileText, Shield, Store } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { C, JOIN_VENDOR_URL } from "@/lib/constants";
import { IMAGES } from "./images";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Hero ────────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  {
    src: IMAGES.studioDorionBrownstone,
    alt: "Studio Dorion brownstone",
    position: "left center",
    dwellMs: 6000,
    credits: [
      { text: "© " },
      { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "home-hero") },
      { text: " (design by " },
      { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "home-hero") },
      { text: ")" },
    ],
  },
  {
    src: "/caitlin-kah-credenza.jpg",
    alt: "Interior by Caitlin Kah",
    position: "center center",
    dwellMs: 12000,
    credits: [
      { text: "© " },
      { text: "Abigail Mair", href: withCredenzaUtm("https://www.abigailmairphotography.com/", "photo-credit", "home-hero") },
      { text: " (design by " },
      { text: "Caitlin Kah", href: withCredenzaUtm("https://www.caitlinkah.com/", "designer-credit", "home-hero") },
      { text: ")" },
    ],
  },
];

export function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(
      () => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length),
      HERO_IMAGES[heroIndex].dwellMs,
    );
    return () => clearTimeout(timer);
  }, [heroIndex]);
  const hero = HERO_IMAGES[heroIndex];
  const visible = true;

  return (
    <section className="relative overflow-hidden flex items-center min-h-screen pt-16 bg-white">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 py-12 md:py-16">
        {/* Editorial layout: text-heavy left, full-bleed image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* Left: Copy—5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>The Standard for Trade Programs</Eyebrow>

            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              The infrastructure
              <br />
              behind every <span className="italic text-olive-mid">distinguished</span>
              <br />
              trade program.
            </h1>

            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden aspect-[4/3]">
              <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ objectPosition: hero.position }} />
            </div>

            <p
              className="mb-10 text-charcoal-mid max-w-[400px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              Every designer pre-vetted. Every certificate compliant. Every customer
              onboarded. Trade verification, tax compliance, and onboarding—built for
              vendors who take their program seriously, and the designers they serve.
            </p>

            {/* Primary CTA (both breakpoints) + mobile-only ghost "For
                Designers" button so phone visitors can reach the designers
                page without discovering the hamburger. Both stretch
                full-width while stacked (<md) so they match length; at md+
                the ghost is hidden and the primary returns to intrinsic
                width. Ghost mirrors Nav's /preview prefix handling. */}
            <div className="flex flex-col md:flex-row gap-3 mb-12">
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
              >
                Request access
              </a>
              <a
                href={`${typeof window !== "undefined" && window.location.pathname.startsWith("/preview") ? "/preview" : ""}/for-designers`}
                className="md:hidden no-underline inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "transparent",
                  color: C.charcoalMid,
                  border: `0.5px solid ${C.sageDark}`,
                  borderRadius: "0",
                }}
              >
                Are you a designer? →
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
                  <span className="shrink-0 text-charcoal-soft">{item.icon}</span>
                  <span
                    className="text-charcoal-soft"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.02em" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photography — desktop only */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block aspect-square">
            <img
              src={hero.src}
              alt={hero.alt}
              className="w-full h-full object-cover block"
              style={{ objectPosition: hero.position }}
            />
            <PhotoCredit credits={hero.credits} separator="" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-px h-10 bg-sage-dark" />
        <ChevronDown size={14} className="text-charcoal-soft" />
      </div>
    </section>
  );
}
