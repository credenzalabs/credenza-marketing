import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

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
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Resale certificates & tax exemption</Eyebrow>
            <h2
              className="font-freight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Completed, compliant,
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>and ready to sign.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Other tools pre-fill the vendor name and address—then hand the certificate back to the designer to complete. Credenza validates the data, fills every field, and presents a ready-to-sign document to your client. Effortless—first and every time.
            </p>
          </div>
        </div>

        {/* Comparison strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12" style={{ border: `1px solid ${C.sageDark}` }}>
          <div className="p-8" style={{ backgroundColor: C.ivory, borderRight: `1px solid ${C.sageDark}` }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.charcoalSoft, fontWeight: 600, marginBottom: "1rem" }}>Other tools</div>
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
                  <div className="mt-1 w-3 h-3 flex-shrink-0 flex items-center justify-center" style={{ border: `1px solid ${C.sageDark}` }}>
                    <X size={7} style={{ color: C.charcoalSoft }} />
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoalSoft, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8" style={{ backgroundColor: "#FFFFFF" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.tealMid, fontWeight: 600, marginBottom: "1rem" }}>Credenza</div>
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
                  <div className="mt-1 w-3 h-3 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}>
                    <Check size={7} style={{ color: C.tealMid }} />
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: C.charcoal, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: brief features */}
          <div className="lg:col-span-5">
            <h3 className="font-freight mb-6" style={{ fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.2, fontStyle: "italic" }}>
              It's not management—it's strategy.
            </h3>
            <div className="flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "Validated businesses, not just collected data", body: "Other tools check formatting—Credenza confirms the business is real, active, and relevant. Invalid data gets caught before it reaches you." },
                { title: "Maximum exemption, every time", body: "Credenza\u2019s Tax Strategy Engine selects the correct (and fewest) forms needed to maximize the designer\u2019s tax exemption where they do business. Designers save more buying from you—and remember who made it easy." },
                { title: "Living compliance", body: "Cert approaching expiration? Credenza requests renewal, re-verifies the tax ID, and revokes the exemption if the designer doesn\u2019t act—so nothing on file goes stale." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <h3 className="font-freight mb-2" style={{ fontSize: "1.05rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Static application form mockup with inline verification */}
          <div className="lg:col-span-7 flex items-center">
            <div style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #e0dcd4",
              overflow: "hidden",
              boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              pointerEvents: "none" as const,
              userSelect: "none" as const,
              transform: "scale(0.85)",
              transformOrigin: "top right",
            }}>
              {/* Header */}
              <div className="px-6 pt-7 pb-3">
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9a9690", marginBottom: "0.4rem" }}>Step 2 of 3</div>
                <div className="font-freight" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1A1A", fontWeight: 300, lineHeight: 1.1 }}>Your business</div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#767676", marginTop: "0.4rem" }}>Tell us about your firm. This is used for trade verification.</p>
              </div>

              {/* Form fields */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                  {/* Legal Business Name */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      Legal Business Name<span style={{ color: "#1A1A1A", marginLeft: "2px" }}>*</span>
                    </label>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      Whitmore Design Group
                    </div>
                  </div>

                  {/* DBA */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      DBA <span className="normal-case tracking-normal" style={{ color: "#C8C4BC" }}>(if different)</span>
                    </label>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      Studio Whitmore
                    </div>
                  </div>

                  {/* EIN — with IRS verified + name mismatch warning */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      EIN<span style={{ color: "#1A1A1A", marginLeft: "2px" }}>*</span>
                      <span className="normal-case tracking-normal" style={{ color: "#C8C4BC", marginLeft: "6px" }}>(if applicable)</span>
                    </label>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      47-2819304
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", marginTop: "4px", color: "#7a7a52" }}>
                      ⚠ This EIN is registered to "Whitmore Design LLC" — double-check your business name above.
                    </p>
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      Profession<span style={{ color: "#1A1A1A", marginLeft: "2px" }}>*</span>
                    </label>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      Interior Designer / Decorator
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      State<span style={{ color: "#1A1A1A", marginLeft: "2px" }}>*</span>
                    </label>
                    <div className="flex items-center justify-between" style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      Texas (TX)
                      <ChevronDown size={14} style={{ color: "#C8C4BC" }} />
                    </div>
                  </div>

                  {/* TX Tax ID — verified active */}
                  <div>
                    <label className="block mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#666", fontWeight: 500 }}>
                      Sales and Use Tax Permit Number<span style={{ color: "#1A1A1A", marginLeft: "2px" }}>*</span>
                    </label>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A", borderBottom: "1px solid #D4D4D4", padding: "10px 0" }}>
                      32084756218
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", marginTop: "4px", color: "#7a7a52" }}>
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
