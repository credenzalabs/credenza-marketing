import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

// ─── CTA ────────────────────────────────────────────────────────────────
export function CTASection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: `1px solid ${C.sageDark}` }}>
          {/* Left: Image — mobile top, desktop left */}
          <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            <img src="/studio-dorion-pound-ridge-hires.jpg" alt="Studio Dorion Pound Ridge entry" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }} />
            <PhotoCredit name="Design by Studio Dorion · Photo by Ethan Harrington" dark />
          </div>

          {/* Right: Form */}
          <div className="p-10 md:p-14" style={{ backgroundColor: "#FFFFFF" }}>
            <Eyebrow>Early access</Eyebrow>
            <h2
              className="font-freight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              The last trade application
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>your clients will ever fill out.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.charcoalMid }}>
              Credenza is in early access. Join the waitlist and we'll work
              with you to launch a trade program your clients will actually
              thank you for.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { placeholder: "Your name", type: "text" },
                { placeholder: "Work email", type: "email" },
                { placeholder: "Company or showroom name", type: "text" },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 outline-none transition-all duration-150"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    border: `1px solid ${C.sageDark}`,
                    backgroundColor: C.white,
                    color: C.charcoal,
                    borderRadius: "0",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.olive)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageDark)}
                />
              ))}
              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  backgroundColor: C.teal,
                  color: C.forest,
                  borderRadius: "0",
                  cursor: "pointer",
                  outline: "0.5px solid #99b8bd", outlineOffset: "2px",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >
                Request access
              </button>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, textAlign: "center" as const, marginTop: "0.25rem" }}>
                We'll reach out within 48 hours to schedule a brief call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
