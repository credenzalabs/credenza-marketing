import { useState } from "react";
import { ChevronDown, Download, Eye, FileText } from "lucide-react";
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

        {/* Certificate health — the product's Exemption Records view. Every
            firm and number here is invented; real designer data stays out. */}
        <div
          className="bg-white pointer-events-none select-none"
          style={{ border: "1px solid #e0dcd4", boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 px-6 md:px-8 pt-7 pb-5 sm:flex-row sm:items-start sm:justify-between" style={{ borderBottom: "1px solid #e0dcd4" }}>
            <div className="max-w-xl">
              <h3 className="font-freight text-charcoal" style={{ fontSize: "1.4rem", letterSpacing: "-0.015em" }}>
                Exemption Records
              </h3>
              <p className="text-charcoal-soft mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", lineHeight: 1.6 }}>
                Every resale and tax-exemption certificate across your program. Designers get renewal reminders 60, 30, and 7 days before expiration—automatically.
              </p>
            </div>
            <span
              className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 text-charcoal"
              style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
            >
              <FileText size={13} /> Tax Audit Export
            </span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-5" style={{ borderBottom: "1px solid #e0dcd4" }}>
            {[
              { label: "Total", value: "312", tone: "#1c1c19" },
              { label: "Signed", value: "305", tone: "#1c1c19" },
              { label: "Expiring Soon", value: "6", tone: "#8B7B2B" },
              { label: "Expired", value: "1", tone: "#6B2D2D" },
              { label: "Auto-Renewable", value: "289", tone: "#1c1c19" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="px-6 py-5"
                style={{ borderRight: i < 4 ? "1px solid #e0dcd4" : "none", borderTop: i >= 2 && i < 4 ? undefined : undefined }}
              >
                <div className="uppercase" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.09em", color: "#6a6a62" }}>
                  {s.label}
                </div>
                <div className="font-freight mt-1.5" style={{ fontSize: "1.9rem", lineHeight: 1, letterSpacing: "-0.02em", color: s.tone }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "640px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e0dcd4" }}>
                  {["Firm", "State", "Form", "Status", "Renewal Reminder", ""].map((h, i) => (
                    <th
                      key={i}
                      className="uppercase text-left px-6 py-3"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#6a6a62", fontWeight: 600 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { firm: "Ellery Vance Interiors", state: "New York", abbr: "NY", form: "ST-120", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: "#3a6e70", renewal: "—" },
                  { firm: "Marisol Ferrer Studio", state: "California", abbr: "CA", form: "CDTFA-230", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: "#3a6e70", renewal: "—" },
                  { firm: "Whitfield & Gray", state: "Florida", abbr: "FL", form: "DR-13", status: "Expiring soon", sub: "Expires Sep 30, 2026", dot: "#8B7B2B", renewal: "Reminder sent · 30 days" },
                  { firm: "Aster Lane Interiors", state: "Texas", abbr: "TX", form: "01-339", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: "#3a6e70", renewal: "—" },
                  { firm: "Peregrine Design Co.", state: "Illinois", abbr: "IL", form: "CRT-61", status: "Signed", sub: "Expires Nov 15, 2026", dot: "#3a6e70", renewal: "Reminder scheduled" },
                ].map((r) => (
                  <tr key={r.firm} style={{ borderBottom: "1px solid #ece9e3" }}>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 500 }}>{r.firm}</span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }}>{r.state}</span>
                      <span className="text-charcoal-soft ml-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem" }}>{r.abbr}</span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }}>{r.form}</span>
                      <span className="block text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem" }}>Generated by Credenza</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: r.dot }} />
                        <span>
                          <span className="block text-charcoal" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>{r.status}</span>
                          <span className="block text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem" }}>{r.sub}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="text-charcoal-soft" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem" }}>{r.renewal}</span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-right">
                      <span className="inline-flex items-center gap-3 text-charcoal-soft">
                        <span className="inline-flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem" }}><Eye size={12} />View</span>
                        <span className="inline-flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem" }}><Download size={12} />Download</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
