import { Eyebrow } from "@/components/ui/Eyebrow";
import { GeneratedCertMock } from "./GeneratedCertMock";
import { useReveal } from "@/hooks/useReveal";

// ─── Resale Certificates ─────────────────────────────────────────────────────────

export function CertSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white">
      <div className="container">
        {/* Section header — copy left, form mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <Eyebrow>Resale certificates & tax exemption</Eyebrow>
            <h2
              className="font-freight text-charcoal"
              style={{ fontSize: "clamp(1.6rem, 2.35vw, 2.3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Every resale certificate correct on day one,
              <br />
              <span className="italic text-olive-mid">and current from then on.</span>
            </h2>
            <p
              className="text-charcoal-mid mt-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Filled by hand, resale certificates come back wrong—blank fields, missing signatures, exemption boxes unchecked or checked incorrectly, an EIN in the sales-tax-ID line. Dozens of ways to be non-compliant—and no team can keep up with 50 states' rules and forms.
            </p>
            <p
              className="text-charcoal-mid mt-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Credenza's <span className="font-semibold text-charcoal">Resale Certificate Engine</span> generates the right form for every designer, vendor, and state, pre-fills it from verifiable data, and presents a finished document to sign. No room for error.
            </p>
            <p
              className="text-charcoal-mid mt-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              From there, every certificate stays current—Credenza tracks expiration dates, re-verifies tax IDs, requests renewals before they lapse, and revokes exemptions that fall out of compliance.
            </p>
            <a
              href="/resale-certificate-management"
              className="no-underline inline-flex items-center gap-1 mt-6 text-teal-mid transition-colors duration-150 hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Explore resale certificate management →
            </a>
          </div>
          <GeneratedCertMock />
        </div>
      </div>
    </section>
  );
}
