import { Check, ChevronDown, Lock } from "lucide-react";

/**
 * A faithful mock of the product's Generate Certificates page (CertGenerator in
 * the trade app): the centered "A few details…" header and the profile form
 * (Profession, DBA, Firm Address, Sales Tax ID, EIN) with the save/encryption
 * footer. Sales-tax-ID verification is surfaced inline the way the product does
 * it.
 *
 * Non-interactive marketing screenshot. The firm and all data are invented.
 */

const C = {
  border: "#e0dcd4",
  charcoal: "#1c1c19",
  grey: "#6a6a62",
  soft: "#9a988f",
  ivory: "#faf9f7",
  green: "#3a6e70",
};

function Label({ children, req, hint }: { children: React.ReactNode; req?: boolean; hint?: string }) {
  return (
    <div className="mb-1.5">
      <span className="uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: C.grey, fontWeight: 600 }}>
        {children}
        {req && <span style={{ color: C.grey }}> *</span>}
      </span>
      {hint && <span className="ml-2" style={{ fontSize: "0.68rem", color: C.soft }}>{hint}</span>}
    </div>
  );
}

function Field({ value, placeholder, select }: { value?: string; placeholder?: string; select?: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-3.5 py-2.5 rounded-[2px] bg-white"
      style={{ border: `1px solid ${C.border}` }}
    >
      <span style={{ fontSize: "0.85rem", color: value ? C.charcoal : C.soft }}>{value ?? placeholder}</span>
      {select && <ChevronDown size={15} style={{ color: C.grey }} />}
    </div>
  );
}

export function GenerateCertMock() {
  return (
    <div
      className="bg-white pointer-events-none select-none"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="px-6 md:px-10 py-10" style={{ fontFamily: "Inter, sans-serif", backgroundColor: C.ivory }}>
        <div className="mx-auto" style={{ maxWidth: "520px" }}>
          {/* Header */}
          <div className="text-center mb-9">
            <div className="uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: C.soft, fontWeight: 600 }}>
              Marisol Ferrer Studio
            </div>
            <h3 className="font-freight mt-3" style={{ fontSize: "1.7rem", lineHeight: 1.15, letterSpacing: "-0.015em", color: C.charcoal }}>
              A few details to generate your first resale certificate.
            </h3>
            <p className="mt-3 mx-auto" style={{ fontSize: "0.85rem", lineHeight: 1.6, color: C.grey, maxWidth: "380px" }}>
              Fill these in once. We'll generate compliant certificates instantly for any state and vendor.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <Label req>Profession</Label>
              <Field value="Interior Designer / Decorator" select />
            </div>

            <div>
              <Label hint="if different from your legal name">DBA</Label>
              <Field placeholder="Doing business as..." />
            </div>

            <div>
              <Label req>Firm Address</Label>
              <div className="space-y-2.5">
                <Field value="1 S Dixie Hwy." />
                <Field placeholder="Suite, floor (optional)" />
                <div className="grid grid-cols-[1fr_auto_auto] gap-2.5">
                  <Field value="West Palm Beach" />
                  <div style={{ width: "92px" }}><Field value="FL" select /></div>
                  <div style={{ width: "92px" }}><Field value="33401" /></div>
                </div>
              </div>
            </div>

            <div>
              <Label req hint="Annual Resale Certificate Number">Sales Tax ID</Label>
              <Field value="85-8018600315-1" />
              <p className="mt-1.5 inline-flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: C.green }}>
                <Check size={12} /> Verified active with the Florida Department of Revenue
              </p>
            </div>

            <div style={{ fontSize: "0.78rem", fontWeight: 500, color: C.green }}>+ Add more states</div>

            <div>
              <Label>EIN</Label>
              <Field value="34-5678905" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-1" style={{ borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "0.75rem", color: C.soft }}>Saved to your profile</span>
              <span className="inline-flex items-center gap-1.5" style={{ fontSize: "0.75rem", color: C.grey }}>
                <Lock size={12} /> Encrypted & never shared without your consent.
              </span>
            </div>

            {/* Generate button */}
            <div className="pt-1">
              <span
                className="flex items-center justify-center w-full px-5 py-3 rounded-[2px]"
                style={{ backgroundColor: C.charcoal, color: "white", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.02em" }}
              >
                Generate certificates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
