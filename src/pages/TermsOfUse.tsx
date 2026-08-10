import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";

export default function TermsOfUse() {
  usePageMeta({
    title: "Terms of Use — Credenza",
    description:
      "The terms governing your access to and use of usecredenza.com and Credenza's related services.",
    path: "/terms-of-use",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />
      <main className="container pt-32 pb-20 max-w-3xl">
        <h1
          className="font-freight text-charcoal mb-8"
          style={{ fontSize: "2.25rem", letterSpacing: "-0.02em" }}
        >
          Terms of Use
        </h1>
        <TermsOfUseContent />
      </main>
      <Footer />
    </div>
  );
}
