import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES } from "./images";
import { withCredenzaUtm } from "@/utils/utm";

// ─── What Credenza Is ────────────────────────────────────────────────────────────
export function PositioningSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-white">
      {/* Full-bleed image with text overlay */}
      <div className="relative overflow-hidden min-h-[70vh]">
        <img
          src={IMAGES.studioDorionBrownstone}
          alt="Park Slope brownstone interior by Studio Dorion"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.82) 0%, rgba(33,53,63,0.55) 50%, rgba(33,53,63,0.1) 100%)` }}
        />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "positioning") },
            { text: " (design by " },
            { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "positioning") },
            { text: ")" },
          ]}
        />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>What Credenza is</Eyebrow>
            <h2
              className="font-freight mb-6 text-ivory"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              <span className="italic text-teal">Infrastructure,</span> not
              <br />
              a marketplace.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "460px" }}>
              Your relationships. Your margin.
              Credenza is the trusted identity layer that makes trade programs
              work—the plumbing your designers
              and your team never have to worry about.
            </p>
          </div>
        </div>
      </div>

      {/* Three pillars below the image */}
      <div className="bg-page-white border-t border-sage-dark">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "Your brand. Your relationship.",
                body: "Credenza is built to empower your trade relationships, not intercept them. We run the infrastructure—you own the relationship.",
              },
              {
                num: "02",
                title: "Your margin, untouched.",
                body: "We don't take a percentage of sales, transactions, or designer spend.",
              },
              {
                num: "03",
                title: "Your partner. Your roadmap.",
                body: <>Credenza is early, and early vendors shape what we build. Your program's edges, exceptions, and day-to-day friction drive the roadmap. This is just the beginning.</>,
              },
            ].map((item) => (
              <div key={item.num} className="p-8 border border-sage-dark bg-white">
                <div
                  className="text-olive-mid font-normal mb-5"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em" }}
                >
                  {item.num}
                </div>
                <h3
                  className="font-freight mb-3 text-charcoal"
                  style={{ fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-charcoal-mid"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
                >
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
