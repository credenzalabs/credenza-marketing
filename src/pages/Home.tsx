/**
 * CREDENZA HOMEPAGE
 * Section components live in src/components/sections/home/.
 */

import { Nav } from "@/components/ui/Nav";
import { usePageMeta } from "@/hooks/usePageMeta";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Hero } from "@/components/sections/home/Hero";
import { LogoBar } from "@/components/sections/home/LogoBar";
import { HowItWorksSection } from "@/components/sections/home/HowItWorksSection";
import { InterludeBand } from "@/components/sections/home/InterludeBand";
import { MidPageCTA } from "@/components/sections/home/MidPageCTA";
import { PositioningSection } from "@/components/sections/home/PositioningSection";
import { IntegrationsSection } from "@/components/sections/home/IntegrationsSection";
import { VerificationSection } from "@/components/sections/home/VerificationSection";
import { CertSection } from "@/components/sections/home/CertSection";
import { ForVendors } from "@/components/sections/home/ForVendors";
import { TestimonialSection } from "@/components/sections/home/TestimonialSection";
import { DesignerVoicesSection } from "@/components/sections/home/DesignerVoicesSection";
import { TiersSection } from "@/components/sections/home/TiersSection";
import { DataSection } from "@/components/sections/home/DataSection";
import { MigrationSection } from "@/components/sections/home/MigrationSection";
import { SecuritySection } from "@/components/sections/home/SecuritySection";
import { GallerySection } from "@/components/sections/home/GallerySection";
import { CTASection } from "@/components/sections/home/CTASection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { Footer } from "@/components/sections/home/Footer";

export default function Home() {
  usePageMeta({
    // 61 chars. The old title ran 114 and truncated mid-clause in the SERP,
    // losing everything after "Vendors". "Home furnishings brands" replaces
    // "interior design vendors" as the category descriptor: the old phrase
    // bid against supplier directories for designers hunting vendors to buy
    // from — the opposite audience. "Vendor" stays as the reader-noun
    // everywhere in the body copy; only the category label changed.
    title: "Credenza | Trade Program Software for Home Furnishings Brands",
    description:
      "Trade program software for home furnishings brands—wholesale and B2B account approval, designer verification, and resale certificates across 46 jurisdictions.",
    path: "/",
    // og:site_name already renders "Credenza" beside the card title.
    ogTitle: "Trade Program Software for Home Furnishings Brands",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="vendors" ctaHref={JOIN_VENDOR_URL} />
      <Hero />
      <LogoBar />
      <HowItWorksSection />
      <VerificationSection />
      <ForVendors />
      <InterludeBand />
      <TestimonialSection />
      <IntegrationsSection />
      <CertSection />
      <DesignerVoicesSection />
      <DataSection />
      <PositioningSection />
      <TiersSection />
      <MidPageCTA />
      <MigrationSection />
      <SecuritySection />
      {/* PortableIdentitySection removed for now — it's a future (designer-side)
          story; the component still lives in src/components/sections/home/. */}
      {/* Closing statement + CTA, just before the FAQ. */}
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
