import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Resale Certificates ─────────────────────────────────────────────────────────

export function CertSection() {
  const ref = useReveal();
  const [activeState, setActiveState] = useState(0);
  const states = [
    { abbr: "NY", form: "ST-120", name: "New York" },
    { abbr: "CA", form: "BOE-230", name: "California" },
    { abbr: "TX", form: "01-339", name: "Texas" },
    { abbr: "FL", form: "DR-13", name: "Florida" },
    { abbr: "IL", form: "CRT-61", name: "Illinois" },
    { abbr: "WA", form: "REV 27 0032", name: "Washington" },
    { abbr: "NJ", form: "ST-3", name: "New Jersey" },
    { abbr: "CO", form: "DR 0563", name: "Colorado" },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white">
      <div className="container">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Resale certificates & tax exemption</Eyebrow>
            <h2
              className="font-freight text-charcoal"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Completed, compliant,
              <br />
              <span className="italic text-olive-mid">and ready to sign.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Other tools pre-fill the vendor name and address—then hand the certificate back to the designer to complete. Credenza validates the data, fills every field, and presents a ready-to-sign document to your client. Effortless—first and every time.
            </p>
          </div>
        </div>

        {/* Comparison strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 border border-sage-dark">
          <div className="p-8 bg-page-white border-r border-sage-dark">
            <div
              className="uppercase text-charcoal-soft font-semibold mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}
            >
              Other tools
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                "Pre-fill vendor name and address only—if at all",
                "Designer downloads and fills in the rest",
                "No validation—bad data goes straight into the cert",
                "Wrong document risk: designer can submit a seller's permit, W-9, or any other form",
                "Exemption scope left to the designer to figure out—often under-claimed",
                "State-issued forms: designer re-uploads to every new vendor",
                "Renewal: same manual process, repeated every 1–3 years",
                "When something's wrong, it's your problem—vendors chase designers for corrections",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-1 w-3 h-3 shrink-0 flex items-center justify-center border border-sage-dark">
                    <X size={7} className="text-charcoal-soft" />
                  </div>
                  <span
                    className="text-charcoal-soft"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.5 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 bg-white">
            <div
              className="uppercase text-teal-mid font-semibold mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}
            >
              Credenza
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                "Every field pre-filled from the designer's verified profile",
                "Tax IDs and EINs verified against state and federal records—not just format-checked",
                "Correct form routed automatically for each designer-vendor intersection",
                "Designer can only submit the right document—wrong forms aren't an option",
                "Maximum exemption applied—designers often don't know which forms they're eligible to use",
                "State-issued forms: upload once, all connected vendors receive it",
                "Renewal: Credenza detects expiry, pre-fills the new cert, sales tax ID re-verified active, designer signs",
                "No-expiry states: business info re-confirmed every 3 years—stale data means a non-compliant certificate",
                "Problems caught before submission—your team never plays middleman",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-1 w-3 h-3 shrink-0 flex items-center justify-center bg-teal-dim border border-teal-border">
                    <Check size={7} className="text-teal-mid" />
                  </div>
                  <span
                    className="text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.5 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: brief features */}
          <div className="lg:col-span-5">
            <h3
              className="font-freight mb-6 text-charcoal italic"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              It's not management—it's strategy.
            </h3>
            <div className="flex flex-col gap-0 border-t border-sage-dark">
              {[
                { title: "Validated businesses, not just collected data", body: "Other tools check formatting—Credenza confirms the business is real, active, and relevant. Invalid data gets caught before it reaches you." },
                { title: "Maximum exemption, every time", body: "Credenza\u2019s Tax Strategy Engine selects the correct (and fewest) forms needed to maximize the designer\u2019s tax exemption where they do business. Designers save more buying from you—and remember who made it easy." },
                { title: "Living compliance", body: "Cert approaching expiration? Credenza requests renewal, re-verifies the tax ID, and revokes the exemption if the designer doesn\u2019t act—so nothing on file goes stale." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b border-sage-dark">
                  <h3
                    className="font-freight mb-2 text-charcoal"
                    style={{ fontSize: "1.05rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-charcoal-mid"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7 }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Static application form mockup with inline verification */}
          <div className="lg:col-span-7 flex items-center">
            <div
              className="bg-white overflow-hidden pointer-events-none select-none scale-[0.85] origin-top-right"
              style={{
                border: "1px solid #e0dcd4",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header */}
              <div className="px-6 pt-7 pb-3">
                <div
                  className="uppercase"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#9a9690", marginBottom: "0.4rem" }}
                >
                  Step 2 of 3
                </div>
                <div
                  className="font-freight font-light"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1A1A", lineHeight: 1.1 }}
                >
                  Your business
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#767676", marginTop: "0.4rem" }}>
                  Tell us about your firm. This is used for trade verification.
                </p>
              </div>

              {/* Form fields */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                  {/* Legal Business Name */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      Legal Business Name<span className="ml-0.5" style={{ color: "#1A1A1A" }}>*</span>
                    </label>
                    <div
                      className="py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      Whitmore Design Group
                    </div>
                  </div>

                  {/* DBA */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      DBA <span className="normal-case tracking-normal" style={{ color: "#C8C4BC" }}>(if different)</span>
                    </label>
                    <div
                      className="py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      Studio Whitmore
                    </div>
                  </div>

                  {/* EIN — with IRS verified + name mismatch warning */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      EIN<span className="ml-0.5" style={{ color: "#1A1A1A" }}>*</span>
                      <span className="normal-case tracking-normal ml-1.5" style={{ color: "#C8C4BC" }}>(if applicable)</span>
                    </label>
                    <div
                      className="py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      47-2819304
                    </div>
                    <p className="mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#7a7a52" }}>
                      ⚠ This EIN is registered to "Whitmore Design LLC" — double-check your business name above.
                    </p>
                  </div>

                  {/* Profession */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      Profession<span className="ml-0.5" style={{ color: "#1A1A1A" }}>*</span>
                    </label>
                    <div
                      className="py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      Interior Designer / Decorator
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      State<span className="ml-0.5" style={{ color: "#1A1A1A" }}>*</span>
                    </label>
                    <div
                      className="flex items-center justify-between py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      Texas (TX)
                      <ChevronDown size={14} style={{ color: "#C8C4BC" }} />
                    </div>
                  </div>

                  {/* TX Tax ID — verified active */}
                  <div>
                    <label
                      className="block mb-1 uppercase font-medium"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: "#666" }}
                    >
                      Sales and Use Tax Permit Number<span className="ml-0.5" style={{ color: "#1A1A1A" }}>*</span>
                    </label>
                    <div
                      className="py-[10px]"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4" }}
                    >
                      32084756218
                    </div>
                    <p className="mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#7a7a52" }}>
                      ✓ Verified active with Texas Comptroller
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
