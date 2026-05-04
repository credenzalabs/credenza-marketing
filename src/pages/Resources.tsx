import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JOIN_VENDOR_URL } from "@/lib/constants";

const RESOURCES = [
  {
    title: "The Interior Designer's Guide to Resale Certificates",
    description:
      "Everything designers need to know about resale certificates: what they are, why vendors require them, state-by-state requirements, common mistakes, and how to manage them across multiple states.",
    href: "/resources/interior-designer-resale-certificate-guide",
    eyebrow: "Guide",
  },
];

export default function Resources() {
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute("content");
    document.title = "Resources | Credenza";
    descMeta?.setAttribute(
      "content",
      "Guides for interior designers and to-the-trade brands navigating trade verification, resale certificate compliance, and tax-exempt purchasing.",
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) descMeta?.setAttribute("content", prevDesc);
    };
  }, []);

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

        <div className="border-t border-sage-dark">
          {RESOURCES.map((r) => (
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
              <h2
                className="font-freight text-charcoal mb-3 group-hover:text-olive-mid transition-colors duration-150"
                style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                {r.title}
              </h2>
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
      </main>
      <Footer />
    </div>
  );
}
