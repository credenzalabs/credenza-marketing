import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { LegalDoc } from "@/components/legal/LegalDoc";

export default function Dpa() {
  usePageMeta({
    title: "Data Processing Addendum — Credenza",
    description:
      "How Credenza processes personal data on a vendor's behalf as a processor under GDPR, UK GDPR, and CCPA.",
    path: "/dpa",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />
      <main className="container pt-32 pb-20 max-w-3xl">
        <h1
          className="font-freight text-charcoal mb-8"
          style={{ fontSize: "2.25rem", letterSpacing: "-0.02em" }}
        >
          Data Processing Addendum
        </h1>
        <LegalDoc slug="dpa" />
      </main>
      <Footer />
    </div>
  );
}
