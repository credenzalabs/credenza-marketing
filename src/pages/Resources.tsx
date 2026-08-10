import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePageMeta } from "@/hooks/usePageMeta";
import { JOIN_VENDOR_URL } from "@/lib/constants";

// Grouped by audience: the section previously held one designer-side article,
// which left vendors—the people who buy—with nothing to read.
const SECTIONS = [
  {
    audience: "For to-the-trade brands",
    resources: [
      {
        title: "How to Choose Trade Program Software",
        description:
          "An evaluation framework for vendors: what the category covers, the seven criteria that actually separate tools, how to test verification depth and certificate handling, the questions to ask on a demo, and when building in-house makes sense.",
        href: "/resources/how-to-choose-trade-program-software",
        eyebrow: "Buyer's guide",
      },
    ],
  },
  {
    audience: "For interior designers",
    resources: [
      {
        title: "The Interior Designer's Guide to Resale Certificates",
        description:
          "Everything designers need to know about resale certificates: what they are, why vendors require them, state-by-state requirements, common mistakes, and how to manage them across multiple states.",
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
