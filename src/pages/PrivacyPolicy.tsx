import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy — Credenza",
    description:
      "How Credenza collects, uses, and protects information when you use usecredenza.com and related services.",
    path: "/privacy-policy",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />
      <main className="container pt-32 pb-20 max-w-3xl">
        <h1
          className="font-freight text-charcoal mb-8"
          style={{ fontSize: "2.25rem", letterSpacing: "-0.02em" }}
        >
          Privacy Policy
        </h1>
        <PrivacyPolicyContent />

        {/* Related agreements — kept discoverable here rather than in the global footer */}
        <div className="mt-16 pt-8 border-t border-sage-dark">
          <h2
            className="font-freight text-charcoal mb-4"
            style={{ fontSize: "1.15rem", letterSpacing: "-0.015em" }}
          >
            Related agreements
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/terms-of-use", label: "Terms of Use" },
              { href: "/vendor-agreement", label: "Vendor Agreement" },
              { href: "/dpa", label: "Data Processing Addendum" },
              { href: "/eula", label: "End-User License Agreement" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="no-underline text-charcoal-soft hover:text-charcoal"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
