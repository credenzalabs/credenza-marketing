import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C, JOIN_VENDOR_URL } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";

// ─── CTA ────────────────────────────────────────────────────────────────
export function CTASection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-sage-dark">
          {/* Left: Image — mobile top, desktop left */}
          <div className="relative overflow-hidden min-h-[280px]">
            <img
              src="/casita-mural-chair.jpg"
              alt="Painted garden mural with a single chair in a 1920's casita"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 80%" }}
            />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ background: `linear-gradient(to right, transparent 60%, ${C.ivory} 100%)` }}
            />
            <PhotoCredit
              dark
              separator=""
              credits={[
                { text: "© " },
                { text: "Carmel Brantley", href: withCredenzaUtm("https://www.brantleyphotography.com/", "photo-credit", "vendor-cta") },
                { text: " (design by " },
                { text: "Caroline Rafferty Interiors", href: withCredenzaUtm("https://www.carolinerafferty.com/", "designer-credit", "vendor-cta") },
                { text: ")" },
              ]}
            />
          </div>

          {/* Right: Form */}
          <div className="p-10 md:p-14 bg-white">
            <Eyebrow>Early access</Eyebrow>
            <h2
              className="font-freight mb-3 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              The last trade application
              <br />
              <span className="italic text-olive-mid">your clients will ever fill out.</span>
            </h2>
            <p
              className="mb-8 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}
            >
              Credenza is in early access. Join the waitlist and design a
              trade program your clients will thank you for.
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
                  className="w-full px-4 py-3 outline-none transition-all duration-150 border border-sage-dark focus:border-olive bg-page-white text-charcoal rounded-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                  }}
                />
              ))}
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200 uppercase font-normal cursor-pointer bg-teal hover:bg-[#99b8bd] text-forest rounded-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  outline: "0.5px solid #99b8bd",
                  outlineOffset: "2px",
                }}
              >
                Request access
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
