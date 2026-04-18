import { X } from "lucide-react";
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
    <section ref={ref} className="reveal py-24 md:py-32 bg-page-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <Eyebrow>Program structure</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Your tiers.
              <br />
              <span className="italic text-teal">Your rules.</span>
            </h2>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75 }}
            >
              Set a flat discount for everyone, define multiple tiers with different discount levels, or let trade pricing vary by product. Credenza assigns designers to the right tier on approval—and you can upgrade them as the relationship grows.
            </p>
            <p
              className="mt-4 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75 }}
            >
              One vendor might run two tiers. Another might run five. Another might not discount at all. The structure is yours.
            </p>
          </div>

          {/* Right: product mockup */}
          <div className="scale-[0.88] origin-top-right">
            <div
              className="bg-white p-7 pointer-events-none select-none"
              style={{
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
                <p
                  className="mt-1"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62" }}
                >
                  Order minimums are informational—displayed to approved designers but not enforced.
                </p>
              </div>

              {/* Column headers */}
              <div
                className="grid gap-3 items-center px-1 mb-2 uppercase"
                style={{ gridTemplateColumns: "1fr 100px 110px 60px 28px", fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62", letterSpacing: "0.06em" }}
              >
                <span>Label</span>
                <span>Discount %</span>
                <span>Order Min</span>
                <span>Base</span>
                <span />
              </div>

              {/* Tier rows */}
              {[
                { label: "Trade", discount: "20", min: "500", isBase: true },
                { label: "Preferred", discount: "30", min: "1000", isBase: false },
                { label: "Elite", discount: "40", min: "1500", isBase: false },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="grid gap-3 items-center px-1 py-2.5"
                  style={{
                    gridTemplateColumns: "1fr 100px 110px 60px 28px",
                    backgroundColor: tier.isBase ? "rgba(169,207,211,0.05)" : undefined,
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
                  <div className="flex justify-center">
                    <div
                      className="flex items-center justify-center rounded-full w-5 h-5"
                      style={{
                        backgroundColor: tier.isBase ? "#F0F6F7" : "#fff",
                        border: `1px solid ${tier.isBase ? "#A9CFD3" : "#e0dcd4"}`,
                      }}
                    >
                      {tier.isBase && <div className="rounded-full w-2 h-2" style={{ backgroundColor: "#A9CFD3" }} />}
                    </div>
                  </div>
                  <button type="button" aria-hidden="true" tabIndex={-1} style={{ color: "#c4c4c4" }}>
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              ))}

              <p
                className="mt-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6a6a62" }}
              >
                The base tier is auto-assigned when a designer is approved. You can upgrade designers later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
