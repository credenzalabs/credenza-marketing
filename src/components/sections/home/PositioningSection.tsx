import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";
import { IMAGES } from "./images";

// ─── What Credenza Is ────────────────────────────────────────────────────────────
export function PositioningSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed image with text overlay */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <img
          src={IMAGES.nickOlsonReidRolls}
          alt="Elegant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.92) 0%, rgba(33,53,63,0.75) 50%, rgba(33,53,63,0.25) 100%)` }}
        />
        <PhotoCredit name="Designed by Nick Olsen · Photo by Reid Rolls" />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>What Credenza is</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              <span className="italic" style={{ color: C.teal }}>Infrastructure,</span> not
              <br />
              a marketplace.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
              Your client relationships stay yours. Your margin stays yours.
              Credenza is the trusted identity layer that makes trade programs
              work—the plumbing your designers
              and your team never have to worry about.
            </p>
          </div>
        </div>
      </div>

      {/* Three pillars below the image */}
      <div style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.sageDark}` }}>
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              title: "Your brand. Your relationship.",
              body: "Credenza runs the infrastructure behind your program. Your team focuses on the business, not the paperwork.",
            },
            {
              num: "02",
              title: "Your margin, untouched.",
              body: "We don't take a percentage of sales, transactions, or designer spend.",
            },
            {
              num: "03",
              title: "Verified once. Trusted everywhere.",
              body: <>Designers verify a reusable profile once. Every vendor on the platform benefits. The data is verified. The decision is yours.</>,
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-8"
              style={{
                border: `1px solid ${C.sageDark}`,
                backgroundColor: "#ffffff",
              }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: C.oliveMid, letterSpacing: "0.06em", fontWeight: 400, marginBottom: "1.25rem" }}>
                {item.num}
              </div>
              <h3
                className="font-freight mb-3"
                style={{ fontSize: "1.35rem", color: C.charcoal, lineHeight: 1.2, letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: C.charcoalMid }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
