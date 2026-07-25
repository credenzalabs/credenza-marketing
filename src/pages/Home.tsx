/**
 * CREDENZA HOMEPAGE
 * Section components live in src/components/sections/home/.
 */

import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Hero } from "@/components/sections/home/Hero";
import { HowItWorksSection } from "@/components/sections/home/HowItWorksSection";
import { InterludeBand } from "@/components/sections/home/InterludeBand";
import { MidPageCTA } from "@/components/sections/home/MidPageCTA";
import { PositioningSection } from "@/components/sections/home/PositioningSection";
import { PortableIdentitySection } from "@/components/sections/home/PortableIdentitySection";
import { IntegrationsSection } from "@/components/sections/home/IntegrationsSection";
import { VerificationSection } from "@/components/sections/home/VerificationSection";
import { CertSection } from "@/components/sections/home/CertSection";
import { ForVendors } from "@/components/sections/home/ForVendors";
import { TiersSection } from "@/components/sections/home/TiersSection";
import { DataSection } from "@/components/sections/home/DataSection";
import { MigrationSection } from "@/components/sections/home/MigrationSection";
import { SecuritySection } from "@/components/sections/home/SecuritySection";
import { GallerySection } from "@/components/sections/home/GallerySection";
import { CTASection } from "@/components/sections/home/CTASection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { Footer } from "@/components/sections/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="vendors" ctaHref={JOIN_VENDOR_URL} />
      <Hero />
      {/* <LogoBar /> — hidden until we have customers */}
      <HowItWorksSection />
      <VerificationSection />
      <ForVendors />
      <InterludeBand />
      <IntegrationsSection />
      <CertSection />
      <DataSection />
      <PositioningSection />
      <TiersSection />
      <MidPageCTA />
      <MigrationSection />
      <SecuritySection />
      {/* Portable identity: the designer-side story lands after the vendor case
          is made, not before it. */}
      <PortableIdentitySection />
      {/* Closing statement + CTA, just before the FAQ. */}
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
