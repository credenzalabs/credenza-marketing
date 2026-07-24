import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ExemptionRecordsMock } from "./ExemptionRecordsMock";
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
        {/* Section header — copy left, form mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <Eyebrow>Resale certificates & tax exemption</Eyebrow>
            <h2
              className="font-freight text-charcoal"
              style={{ fontSize: "clamp(1.9rem, 2.9vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Every certificate correct on day one,
              <br />
              <span className="italic text-olive-mid">and current from then on.</span>
            </h2>
            <p
              className="text-charcoal-mid mt-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Fifty states, fifty sets of rules. Filled by hand, resale certificates come back with fields left blank, signatures missing, exemption boxes unchecked or checked wrong, an EIN dropped in the sales-tax-ID field—dozens of ways to end up non-compliant, and no way for your team to keep up with every state. Credenza generates the correct form for every designer-vendor-state combination, pre-fills every field from verified data, and presents a completed document to sign. No room for error.
            </p>
            <a
              href="/resale-certificate-management"
              className="no-underline inline-flex items-center gap-1 mt-6 text-teal-mid transition-colors duration-150 hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Explore resale certificate management →
            </a>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div
              className="bg-white overflow-hidden pointer-events-none select-none scale-[0.85] origin-top"
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
                      ⚠ This EIN is registered to "Whitmore Design LLC"—double-check your business name above.
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

        <ExemptionRecordsMock />
      </div>
    </section>
  );
}
