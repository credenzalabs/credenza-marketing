import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePageMeta } from "@/hooks/usePageMeta";
import { JOIN_VENDOR_URL } from "@/lib/constants";

// Grouped by audience. The vendor-side section is empty again: the trade
// program software guide was unrouted on 2026-08-15 because it read as
// generated rather than reported — a bad look anywhere, and a worse one for a
// company that sells verification. src/pages/TradeProgramSoftwareGuide.tsx is
// still in the repo; the parts worth keeping came from Julia's corrections and
// should be the seed of a rebuild from real source, not a rewrite of the prose.
const SECTIONS = [
  {
    audience: "For interior designers",
    resources: [
      {
        title: "Resale Certificates for Interior Designers: State by State",
        description:
          "Which states require their own form, which accept the MTC or SST certificate, and which issue one to you—plus the mistakes that get a certificate rejected.",
        href: "/resources/interior-designer-resale-certificate-guide",
        eyebrow: "Guide",
      },
    ],
  },
];

export default function Resources() {
  usePageMeta({
    title: "Resources | Credenza",
    description:
      "Guides for interior designers and to-the-trade brands navigating trade verification, resale certificate compliance, and tax-exempt purchasing.",
    path: "/resources",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav forceSolid ctaHref={JOIN_VENDOR_URL} />
      <main
        className="container pt-32 pb-24 max-w-3xl"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="mb-6">
          <Eyebrow>Resources</Eyebrow>
        </div>
        <h1
          className="font-freight text-charcoal mb-6"
          style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          Guides for the interior design trade.
        </h1>
        <p
          className="text-charcoal-mid mb-16"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
        >
          Long-form guides for designers and to-the-trade brands working through trade verification, resale certificate compliance, and tax-exempt purchasing.
        </p>

        {SECTIONS.map((section) => (
        <section key={section.audience} className="mb-14 last:mb-0">
        <h2
          className="text-charcoal-soft mb-1"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}
        >
          {section.audience}
        </h2>
        <div className="border-t border-sage-dark">
          {section.resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              className="block py-8 border-b border-sage-dark group no-underline"
            >
              <div className="mb-2">
                <span
                  className="text-olive-mid"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  {r.eyebrow}
                </span>
              </div>
              <h3
                className="font-freight text-charcoal mb-3 group-hover:text-olive-mid transition-colors duration-150"
                style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                {r.title}
              </h3>
              <p
                className="text-charcoal-mid mb-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
              >
                {r.description}
              </p>
              <span
                className="inline-flex items-center gap-2 text-charcoal"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Read guide <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
        </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
