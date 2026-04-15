import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Portable Identity ─────────────────────────────────────────────────────────
export function PortableIdentitySection() {
  const ref = useReveal();
  const vendors = [
    { name: "Vanthorpe & Co.", type: "Furniture atelier" },
    { name: "Hive Modern", type: "Showroom" },
    { name: "Lumen & Ash", type: "Lighting & décor" },
    { name: "Harlow & Stone", type: "Fabric & furniture" },
    { name: "Whitfield Textiles", type: "Fabric & trim" },
  ];
  return (
    <section ref={ref} className="reveal bg-ivory border-t border-sage-dark">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div>
            <Eyebrow>Portable identity</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              One profile.
              <br />
              <span className="italic text-olive-mid">Every vendor.</span>
              <br />
              Always current.
            </h2>
            <p
              className="text-charcoal-mid max-w-[460px] mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
            >
              A designer fills out one profile, gets verified once, and that profile works across every vendor on the platform. No re-entering business information, tax IDs, references, or uploading certs again.
            </p>
            <p
              className="text-charcoal-mid max-w-[460px] mb-10"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
            >
              Every application after the first is one click—because your best clients shouldn't have to keep proving themselves.
            </p>

            {/* Vendor-side callout */}
            <div className="p-5 border-l-[3px] border-olive bg-olive-light">
              <p
                className="text-charcoal italic"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}
              >
                Higher completion rates. Better data quality. Less friction—because the hard part is already done.
              </p>
            </div>
          </div>

          {/* Right: screenshots */}
          <div className="flex flex-col gap-6">
            <img
              src="/profile-screenshot.png"
              alt="Trade profile showing business details, memberships, licenses, and trade references"
              className="w-full h-auto block max-w-[560px] ml-auto"
              style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
            />
            <img
              src="/discover-brands-screenshot.png"
              alt="Discover more brands on Credenza with one-click apply"
              className="w-full h-auto block max-w-[560px] ml-auto"
              style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
