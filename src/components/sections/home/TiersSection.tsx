import { ChevronDown, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Tiers ───────────────────────────────────────────────────────────────────────
export function TiersSection() {
  const ref = useReveal();
  // Example tiers — vendor-defined names and discount levels
  const exampleTiers = [
    { name: "Trade",     discount: "20%",  min: "No minimum" },
    { name: "Preferred", discount: "30%",  min: "$10,000 / yr" },
    { name: "Principal", discount: "40%",  min: "$50,000 / yr" },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-page-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <Eyebrow>Program structure</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Trade pricing,
              <br />
              <span className="italic text-teal">your way.</span>
            </h2>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75 }}
            >
              Net pricing, flat discount, or tiered discounts—Credenza auto-applies the tags you need to power your pricing. Assign designers to the right tier on approval, then upgrade them automatically as their spend grows—measured over the trailing 12 months, this calendar year, or last.
            </p>
          </div>

          {/* Right: product mockup. The table has fixed-width columns, so on
              narrow screens it scrolls inside this box rather than stretching
              the page (which was causing horizontal overflow on mobile). */}
          <div className="min-w-0 overflow-x-auto lg:overflow-visible lg:scale-[0.88] lg:origin-top-right">
            <div
              className="bg-white p-6 sm:p-7 pointer-events-none select-none"
              style={{
                minWidth: "480px",
                border: "1px solid #e0dcd4",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header */}
              <div className="mb-4">
                <h3
                  className="font-freight font-normal"
                  style={{ fontSize: "20px", color: "#1A1A1A", letterSpacing: "0.04em" }}
                >
                  Discount Tiers
                </h3>
              </div>

              {/* Column headers */}
              <div
                className="grid gap-3 items-center px-1 mb-2 uppercase"
                style={{ gridTemplateColumns: "1fr 96px 104px 116px 28px", fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62", letterSpacing: "0.06em" }}
              >
                <span>Label</span>
                <span>Discount %</span>
                <span>Order Min</span>
                <span>Earned at</span>
                <span />
              </div>

              {/* Tier rows */}
              {[
                { label: "Trade", discount: "20", min: "500", earnedAt: null },
                { label: "Preferred", discount: "30", min: "1000", earnedAt: "10,000" },
                { label: "Elite", discount: "40", min: "1500", earnedAt: "50,000" },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="grid gap-3 items-center px-1 py-2.5"
                  style={{
                    gridTemplateColumns: "1fr 96px 104px 116px 28px",
                    borderBottom: "1px solid #f0ede8",
                  }}
                >
                  <input
                    readOnly
                    value={tier.label}
                    className="w-full bg-white"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "1px solid #e0dcd4", padding: "6px 8px" }}
                  />
                  <div className="flex items-center gap-1">
                    <input
                      readOnly
                      value={tier.discount}
                      className="w-full bg-white text-right"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "1px solid #e0dcd4", padding: "6px 8px" }}
                    />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62" }}>%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62" }}>$</span>
                    <input
                      readOnly
                      value={tier.min}
                      className="w-full bg-white"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "1px solid #e0dcd4", padding: "6px 8px" }}
                    />
                  </div>
                  {tier.earnedAt ? (
                    <div className="flex items-center gap-1">
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62" }}>$</span>
                      <input
                        readOnly
                        value={tier.earnedAt}
                        className="w-full bg-white"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "1px solid #e0dcd4", padding: "6px 8px" }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a8a49c", paddingLeft: "2px" }}>On approval</span>
                  )}
                  <button type="button" aria-hidden="true" tabIndex={-1} style={{ color: "#c4c4c4" }}>
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              ))}

              {/* Auto-upgrade by spend */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-3" style={{ borderTop: "1px solid #f0ede8" }}>
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", fontWeight: 500 }}>
                    Auto-upgrade by spend
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62", marginTop: "1px" }}>
                    Promote designers when their spend reaches the next tier.
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1.5" style={{ border: "1px solid #e0dcd4", padding: "5px 8px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A", whiteSpace: "nowrap" }}>Trailing 12 months</span>
                    <ChevronDown size={13} style={{ color: "#6a6a62" }} />
                  </div>
                  <div className="rounded-full relative shrink-0" style={{ width: "34px", height: "20px", backgroundColor: "#A9CFD3" }}>
                    <div className="rounded-full absolute" style={{ width: "16px", height: "16px", backgroundColor: "#fff", top: "2px", right: "2px" }} />
                  </div>
                </div>
              </div>

              <p
                className="mt-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62" }}
              >
                The base tier is auto-assigned on approval. Spend is measured over the trailing 12 months, this calendar year, or last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
