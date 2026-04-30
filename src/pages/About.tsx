import { useEffect } from "react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { IMAGES } from "@/components/sections/home/images";
import { JOIN_VENDOR_URL, JOIN_DESIGNER_URL } from "@/lib/constants";

export default function About() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    document.title = "About Credenza";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Credenza is the verified identity platform for the interior design trade. Founded in 2025 and headquartered in West Palm Beach, Florida.",
      );
    return () => {
      document.title = prevTitle;
      if (prevDesc)
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />

      {/* Full-bleed hero image — Nav overlays the top */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh", maxHeight: "75vh" }}>
        <img
          src={IMAGES.sarahBartholomewLivingRoom}
          alt="Living room by Sarah Bartholomew"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        <div className="relative" style={{ minHeight: "60vh" }} />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Melanie Acevedo" },
            { text: " (design by " },
            { text: "Sarah Bartholomew" },
            { text: ")" },
          ]}
        />
      </section>

      <main
        className="container pt-16 md:pt-20 pb-24 max-w-3xl"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <h1
          className="font-freight text-charcoal mb-10"
          style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          About Credenza
        </h1>

        <Prose>
          <p>
            A design firm opening a new account with a to-the-trade brand fills in the same EIN, the same sales tax ID, and the same proofs of business they've submitted 40 times before. A vendor's trade onboarding team opens the application, eyeballs the same websites and details they checked yesterday on someone else, files the certificate in a folder no one else can find where it will quietly expire without anyone noticing, and moves to the next one in the queue.
          </p>
          <p>
            The interior design industry still runs on paperwork. Designers re-prove who they are at every brand. Vendors burn 5–20+ hours a week reviewing the same applicants their competitors already approved, then store the results in disconnected systems that can't be reused—or surfaced in an audit, when missing or expired certificates become tax liability.
          </p>
          <p>
            There's friction on both sides, whether you're a designer juggling 50 vendor accounts or a single-state showroom processing applications by hand. None of it has to be the cost of doing business. That's why we built Credenza.
          </p>
        </Prose>

        <SectionHeading>Real Designers Shouldn't Have to Keep Proving Themselves.</SectionHeading>

        <Prose>
          <p>
            Credenza is the verified identity platform for the interior design trade. Designers create one verified trade profile that travels with them—across every brand, every state, every transaction. Credenza's verification, resale certificate, and onboarding engines turn applications into approved, tax-compliant customers in vendor systems—with or without manual review.
          </p>
          <p>
            We call this <em>verified once, trusted everywhere</em>.
          </p>
        </Prose>

        <SectionHeading>How It Works</SectionHeading>

        <Prose>
          <p>Credenza runs on three engines:</p>
          <p>
            The <strong>trade verification engine</strong> runs up to nine checks to confirm an applicant's trade status and surfaces the information vendors need to decide fast.
          </p>
          <p>
            The <strong>resale certificate engine</strong> generates compliant resale certificate PDFs for designers—eliminating back-and-forth, saving vendor teams hours, and protecting the business in an audit.
          </p>
          <p>
            The <strong>onboarding engine</strong> runs configurable auto-approval rules and onboards approved designers into the vendor's e-commerce system with tax exemption applied at the state level—fast-tracking applicants from application to first order. Certificates are monitored for expiration, renewal reminders sent, and exemption revoked if not renewed.
          </p>
        </Prose>

        <SectionHeading>For Designers</SectionHeading>

        <Prose>
          <p>
            Designers create one verified trade profile to apply across every participating brand, manage every trade account and tradesperson in one dashboard, and generate compliant resale certificates in seconds—for any US vendor.
          </p>
          <p>
            Credenza is free for designers—no credit card, no trial window, no seat limit.
          </p>
        </Prose>

        <SectionHeading>Infrastructure, Not a Marketplace</SectionHeading>

        <Prose>
          <p>
            Credenza is built to empower vendors' direct trade relationships, not intercept them. Designers source directly from the brands they choose. Vendors keep direct relationships with their trade buyers. We handle the verification, compliance, and onboarding work in the middle—and we help you scale with intelligent insights and clean, enriched data while we're at it.
          </p>
        </Prose>

        <SectionHeading>Company</SectionHeading>

        <Prose>
          <p>
            Credenza Labs, Inc. was founded in 2025 and is headquartered in West Palm Beach, Florida. The platform is live for designers today and accepting to-the-trade brands for early access ahead of public launch.
          </p>
        </Prose>

        <SectionHeading>Founder</SectionHeading>

        <Prose>
          <p>
            Julia Atwater founded Credenza after 20 years in the design trade. She first ran into the verification problem as a designer herself—working on projects alongside her mother, an interior designer, and on her own small jobs. Years later, leading sales marketing at Schumacher and advising small and mid-size trade vendors, she watched the other side of the same paperwork pile up for vendors of all shapes and sizes. She started Credenza to solve it once.
          </p>
        </Prose>

        <SectionHeading>Get in Touch</SectionHeading>

        <Prose>
          <p>
            For questions, partnerships, or media inquiries, email{" "}
            <a
              href="mailto:info@usecredenza.com"
              className="underline text-charcoal hover:text-olive-mid"
            >
              info@usecredenza.com
            </a>
            .
          </p>
        </Prose>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CTAButton href={JOIN_DESIGNER_URL} label="For designers" />
          <CTAButton href={JOIN_VENDOR_URL} label="For brands" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-charcoal-mid space-y-4 mb-10"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-freight text-charcoal mt-16 mb-6"
      style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)", letterSpacing: "-0.015em", lineHeight: 1.2 }}
    >
      {children}
    </h2>
  );
}

function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block text-center py-3.5 px-6 transition-colors duration-150 border border-sage-dark hover:bg-page-cream"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.78rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#3a3a34",
      }}
    >
      {label}
    </a>
  );
}
