import { useReveal } from "@/hooks/useReveal";

// ─── Interlude band — a dark visual reset between the pale two-column sections ──
export function InterludeBand() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-forest py-24 md:py-32">
      <div className="container text-center">
        <div
          className="uppercase mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(240,240,236,0.55)", fontWeight: 600 }}
        >
          Built for vendors who take their program seriously
        </div>
        <p
          className="font-freight text-ivory mx-auto max-w-3xl"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
        >
          Nothing manual. Nothing missed.
        </p>
      </div>
    </section>
  );
}
