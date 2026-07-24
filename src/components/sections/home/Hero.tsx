import { useEffect, useState } from "react";
import { Check, ChevronDown, FileText, Shield, Store, TrendingUp } from "lucide-react";
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

/** An application clearing itself, above the fold.
 *
 *  The hero promises instant approval, so the card shows the decision rather
 *  than the checklist: an application arrives, four signals resolve in sequence,
 *  and it settles on an automatic approval with the elapsed time. The firm is
 *  invented. Plays once, then holds on the approved state — no looping.
 */
type RowState = "pending" | "checking" | "done";

const HERO_CHECKS = [
  { label: "EIN / business entity", result: "Matched" },
  { label: "Sales tax ID", result: "Active · NY" },
  { label: "Professional memberships", result: "ASID" },
  { label: "Portfolio & press", result: "Verified" },
];

function HeroApplicationCard() {
  const [shown, setShown] = useState(false);
  const [states, setStates] = useState<RowState[]>(() => HERO_CHECKS.map(() => "pending"));
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const setAt = (i: number, s: RowState) =>
      setStates((prev) => prev.map((v, j) => (j === i ? s : v)));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setStates(HERO_CHECKS.map(() => "done"));
      setApproved(true);
      return;
    }

    const timers = [setTimeout(() => setShown(true), 400)];
    HERO_CHECKS.forEach((_, i) => {
      const start = 900 + i * 520;
      timers.push(setTimeout(() => setAt(i, "checking"), start));
      timers.push(setTimeout(() => setAt(i, "done"), start + 420));
    });
    timers.push(setTimeout(() => setApproved(true), 900 + HERO_CHECKS.length * 520 + 300));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute left-6 top-[40%] bg-white pointer-events-none select-none"
      style={{
        width: "320px",
        border: "1px solid #d8d4ca",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 450ms ease-out, transform 450ms ease-out",
      }}
    >
      {/* Applicant */}
      <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #ece9e3" }}>
        <div
          className="flex items-center justify-center shrink-0 w-8 h-8 bg-teal-dim border border-teal-border text-teal-mid font-semibold"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.04em" }}
        >
          EV
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-charcoal font-semibold truncate"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", letterSpacing: "-0.01em" }}
          >
            Ellery Vance Interiors
          </div>
          <div
            className="uppercase mt-0.5"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#a8a49c" }}
          >
            New trade application
          </div>
        </div>
      </div>

      {/* Signals resolving */}
      <div className="px-4 py-1">
        {HERO_CHECKS.map((item, i) => {
          const state = states[i];
          return (
            <div
              key={item.label}
              className="flex items-center gap-2.5 py-[0.55rem]"
              style={{ borderBottom: i < HERO_CHECKS.length - 1 ? "1px solid #f0ede8" : "none" }}
            >
              <span className="flex items-center justify-center shrink-0 w-[15px] h-[15px]">
                {state === "done" ? (
                  <span className="flex items-center justify-center w-full h-full bg-teal-dim border border-teal-border">
                    <Check size={8} className="text-teal-mid" />
                  </span>
                ) : state === "checking" ? (
                  <span
                    className="block w-[11px] h-[11px] rounded-full animate-spin"
                    style={{ border: "1.5px solid #dfe7e9", borderTopColor: "#7aa0a8" }}
                  />
                ) : (
                  <span className="block w-[11px] h-[11px] rounded-full" style={{ border: "1.5px solid #ece9e3" }} />
                )}
              </span>
              <span
                className="flex-1 truncate"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  color: state === "pending" ? "#b8b4ac" : "#2f3336",
                  transition: "color 300ms ease-out",
                }}
              >
                {item.label}
              </span>
              <span
                className="shrink-0 text-teal-mid font-medium"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.64rem",
                  opacity: state === "done" ? 1 : 0,
                  transition: "opacity 300ms ease-out",
                }}
              >
                {item.result}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decision */}
      <div
        style={{
          backgroundColor: "#b8ccd2",
          borderTop: "1px solid #a8bfc6",
          maxHeight: approved ? "76px" : "0px",
          opacity: approved ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 420ms ease-out, opacity 320ms ease-out 100ms",
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Check size={13} className="text-forest shrink-0" />
            <span
              className="text-forest font-semibold flex-1"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", letterSpacing: "-0.01em" }}
            >
              Approved automatically
            </span>
            <span
              className="text-forest shrink-0"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", opacity: 0.7 }}
            >
              1m 12s
            </span>
          </div>
          <div
            className="mt-1 pl-[21px] text-forest"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.63rem", opacity: 0.75 }}
          >
            Trade pricing active &middot; Tax exemption applied
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <Eyebrow>Trade Program Software for Interior Design Vendors & Showrooms</Eyebrow>

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
              Credenza is trade program software for interior design vendors. It handles
              trade verification, designer onboarding, resale certificate management, and
              tax compliance—so your team approves the right designers instantly and
              stays compliant without the manual work.
            </p>

            {/* Primary CTA + ghost "For Designers" button so designers can
                reach their page without hunting the nav. Both stretch
                full-width while stacked (<md) so they match length; at md+
                they sit side-by-side at intrinsic width. */}
            <div className="flex flex-col md:flex-row gap-3 mb-12">
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
              >
                Request access
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

            {/* Trust signals—thin rule style */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <FileText size={12} />, text: "Trade verification · 9 automated checks against IRS, state tax, and professional records" },
                { icon: <Shield size={12} />, text: "Resale certificate management · 46 jurisdictions, generated & monitored" },
                { icon: <Store size={12} />, text: "Automated designer onboarding · Shopify-native, tax exemptions applied instantly" },
                { icon: <TrendingUp size={12} />, text: "Program intelligence · Revenue drivers, member health, and exportable segments" },
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
            <HeroApplicationCard />
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
