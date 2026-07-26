import { ChevronDown } from "lucide-react";
import { HeroReviewPanel } from "./HeroReviewPanel";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { C, JOIN_VENDOR_URL } from "@/lib/constants";
import { IMAGES } from "./images";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Hero ────────────────────────────────────────────────────────────────────────
// A single still photograph. The hero used to cross-fade between two images,
// but with the review drawer overlaid on top the page had two things moving at
// once and read as busy — the drawer is the thing worth watching.
const HERO_IMAGE = {
  src: IMAGES.studioDorionBrownstone,
  alt: "Studio Dorion brownstone",
  position: "left center",
  credits: [
    { text: "© " },
    { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "home-hero") },
    { text: " (design by " },
    { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "home-hero") },
    { text: ")" },
  ],
};

export function Hero() {
  const hero = HERO_IMAGE;

  return (
    <section className="relative overflow-hidden flex items-center min-h-screen pt-16 bg-white">
      {/* Subtle dot texture behind the copy */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 py-12 md:py-16">
        {/* Editorial layout: copy left, contained photograph right. The review
            card flies in over the photo. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* Left: Copy—5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>
              Trade Program Software for Interior Design{" "}
              <span className="whitespace-nowrap">Vendors &amp; Showrooms</span>
            </Eyebrow>

            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Your trade program,
              <br />
              <span className="italic text-olive-mid">running itself.</span>
            </h1>

            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden aspect-[4/3]">
              <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" style={{ objectPosition: hero.position }} />
            </div>

            <p
              className="mb-10 text-charcoal-mid max-w-[420px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              Trade verification, designer onboarding, resale certificate management,
              and tax compliance—so your team approves the right designers instantly,
              on your own terms, and stays audit-ready without the manual work.
            </p>

            {/* Primary CTA + ghost "For Designers" button so designers can
                reach their page without hunting the nav. Both stretch
                full-width while stacked (<md) so they match length; at md+
                they sit side-by-side at intrinsic width. */}
            <div className="flex flex-col md:flex-row gap-3">
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
              >
                Get started
              </a>
              <a
                href="https://usecredenza.com/for-designers"
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-colors duration-200"
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
          </div>

          {/* Right: contained square photograph — desktop only. The review card
              flies in over it. */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block aspect-square">
            <img
              src={hero.src}
              alt={hero.alt}
              className="w-full h-full object-cover block"
              style={{ objectPosition: hero.position }}
            />
            <PhotoCredit credits={hero.credits} separator="" />
            <HeroReviewPanel />
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
