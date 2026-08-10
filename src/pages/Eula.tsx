import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { LegalDoc } from "@/components/legal/LegalDoc";

export default function Eula() {
  usePageMeta({
    title: "End-User License Agreement — Credenza",
    description:
      "The license terms governing use of the Credenza software.",
    path: "/eula",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />
      <main className="container pt-32 pb-20 max-w-3xl">
        <h1
          className="font-freight text-charcoal mb-8"
          style={{ fontSize: "2.25rem", letterSpacing: "-0.02em" }}
        >
          End-User License Agreement
        </h1>
        <LegalDoc slug="eula" />
      </main>
      <Footer />
    </div>
  );
}
