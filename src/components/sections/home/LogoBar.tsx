import { useReveal } from "@/hooks/useReveal";

// ─── Logo Bar ────────────────────────────────────────────────────────────────────
//
// Under `BRANDS` goes only a brand that is genuinely a Credenza customer AND has
// agreed to be named — "Trusted by" is an endorsement claim, so an
// unpermissioned name is a real problem even if it's accurate. The list once
// held eight well-known house names that were never customers; that is the
// mistake this comment exists to prevent. All four brands currently listed are
// signed customers (confirmed 2026-10-12). Using a brand's logo raises the same
// question twice over: drop in the asset the brand supplies to partners, not
// one lifted off their site.
//
// A brand with no `logo` falls back to its name set in freight, so the bar
// stays shippable while assets are still being collected.
//
// Logos are normalised by height, not width, and desaturated — four marks at
// four different weights and colours otherwise read as a ransom note. `height`
// is per-brand because a tall stacked mark and a long wordmark look wrong at
// the same pixel height; tune it by eye against the others.
type Brand = {
  name: string;
  logo?: string;
  /** Rendered height in px. Tune per mark so optical weight matches. */
  height?: number;
  /** Intrinsic file dimensions — set both to reserve space and avoid CLS. */
  intrinsic?: { width: number; height: number };
};

const BRANDS: Brand[] = [
  {
    name: "Sister Parish Design",
    logo: "/logo-sister-parish.png",
    height: 22,
    intrinsic: { width: 1782, height: 239 },
  },
  {
    name: "Sunbrella",
    logo: "/logo-sunbrella.svg",
    height: 30,
    intrinsic: { width: 160, height: 42 },
  },
  {
    name: "Ro Sham Beaux",
    logo: "/logo-ro-sham-beaux.png",
    height: 19,
    intrinsic: { width: 1942, height: 246 },
  },
  {
    name: "Aqualille",
    logo: "/logo-aqualille.png",
    height: 23,
    intrinsic: { width: 4035, height: 1011 },
  },
];

export function LogoBar() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-12 bg-forest">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <span
            className="uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              color: "rgba(240,240,236,0.55)",
            }}
          >
            Trusted by
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {BRANDS.map((brand) =>
              brand.logo ? (
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  width={brand.intrinsic?.width}
                  height={brand.intrinsic?.height}
                  className="w-auto"
                  style={{
                    height: `${brand.height ?? 24}px`,
                    filter: "brightness(0) invert(1)",
                    opacity: 0.8,
                  }}
                />
              ) : (
                <span
                  key={brand.name}
                  className="font-freight"
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    color: "rgba(240,240,236,0.75)",
                  }}
                >
                  {brand.name}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
