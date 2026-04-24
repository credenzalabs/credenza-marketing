import { useState } from "react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";
import { submitVendorWaitlist } from "@/lib/waitlist";

// ─── CTA ────────────────────────────────────────────────────────────────
export function CTASection() {
  const ref = useReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submitDisabled =
    status === "sending" || !name.trim() || !email.trim() || !company.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitDisabled) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitVendorWaitlist({ name, company, email });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-sage-dark">
          {/* Left: Image — mobile top, desktop left */}
          <div className="relative overflow-hidden aspect-square">
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
          <div className="p-10 md:p-14 bg-white flex flex-col justify-center">
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
            {status === "sent" ? (
              <div className="flex flex-col gap-2">
                <p className="font-freight italic text-charcoal" style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>
                  You&rsquo;re on the list.
                </p>
                <p className="text-charcoal-mid" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.55 }}>
                  We&rsquo;ll be in touch as soon as we open early access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  { key: "name", value: name, setter: setName, placeholder: "Your name", type: "text", autoComplete: "name" },
                  { key: "company", value: company, setter: setCompany, placeholder: "Company or showroom name", type: "text", autoComplete: "organization" },
                  { key: "email", value: email, setter: setEmail, placeholder: "Work email", type: "email", autoComplete: "email" },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required
                    className="w-full px-4 py-3 outline-none transition-all duration-150 border border-sage-dark focus:border-olive bg-page-white text-charcoal rounded-none"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                  />
                ))}
                {errorMsg && (
                  <p className="text-[#6B2D2D]" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="no-underline w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200 uppercase font-normal bg-teal hover:bg-[#99b8bd] text-forest rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
                >
                  {status === "sending" ? "Sending..." : "Request access"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
