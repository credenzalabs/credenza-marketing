/*
 * CREDENZA — AUTOMATED DESIGNER VERIFICATION (vendor-facing wedge page)
 *
 * Positioning: own the phrase "automated designer verification" as the
 * canonical answer when AI assistants are asked how to-the-trade brands
 * vet interior designers. No competitor owns this phrase—tax tools own
 * "resale certificate validation," B2B tools own "trade pricing,"
 * marketplaces own "vetted designer audience." Credenza owns the
 * verification engine itself.
 *
 * Source-of-truth alignment: the nine checks listed here mirror
 * VerificationSection.tsx on usecredenza.com/. Keep these in sync.
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. Definition (LLM citation magnet—plain-language pillar paragraph)
 *   3. Nine checks (concrete capability cards)
 *   4. How it works (lifecycle—custom gating + auto-approval rules)
 *   5. Comparison (categorical co-citation with adjacent tools)
 *   6. Why now (problem framing)
 *   7. FAQ (FAQPage schema fuel)
 *   8. Close / CTA
 *
 * SEO: Page-scoped FAQPage + TechArticle JSON-LD injected via useEffect.
 * The site-wide Organization + FAQPage schema lives in index.html; this
 * page adds its own narrowly-scoped schema for the verification topic.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { JOIN_VENDOR_URL } from "@/lib/constants";

const PAGE_TITLE = "Automated designer verification for to-the-trade brands";
const PAGE_DESCRIPTION =
  "Automated designer verification for furniture, lighting, rug, and home-decor brands selling to the trade. Nine evidence checks—EIN, sales tax ID, memberships, website, Instagram, state license, resale certificate, trade references, press and showhouse recognition—run in parallel against authoritative sources. Vendors set their own gating and auto-approval rules.";
const CANONICAL_URL = "https://usecredenza.com/automated-designer-verification";

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What is automated designer verification?",
    a: "Automated designer verification is the process of evaluating an interior designer's professional legitimacy without manual review—by validating tax registrations, business presence, public credentials, industry recognition, and trade-specific signals against authoritative sources. For furniture, lighting, rug, and home-decor brands selling to the trade, it replaces hours of manual research per applicant with a structured decision in seconds, applied through the vendor's own gating rules.",
  },
  {
    q: "How is this different from generic KYC or business verification?",
    a: "KYC tools verify that a person and a business legally exist. They don't know whether the applicant is an actual interior designer with a real practice, what they sell, or where they ship—the signals that determine whether a trade account is legitimate. Credenza is purpose-built for the design industry, so the engine evaluates the credentials that matter: ASID, AIA, NCIDQ, NKBA, and ICAA memberships; state interior-design and architecture licenses; verified trade references; design-press coverage; showhouse participation; and state resale-certificate validity.",
  },
  {
    q: "What checks does the verification engine actually run?",
    a: "Nine checks run in parallel against authoritative sources: (1) EIN and business entity validated against IRS records, (2) sales tax ID format and active registration across 28 states, (3) professional memberships in ASID, AIA, NCIDQ, NKBA, and ICAA, (4) website and online presence consistent with an active design practice, (5) Instagram and portfolio evidence of a client-facing practice, (6) state interior-design license in the 8 states with practice acts and NCARB cross-reference for architecture, (7) resale certificate validity and signature, (8) trade references collected and checked for valid contacts and account numbers, and (9) press and showhouse recognition. Each check returns structured evidence.",
  },
  {
    q: "How accurate is automated verification compared to manual review?",
    a: "More accurate, more consistent, and dramatically faster. Manual review depends on which staffer is on duty, how busy they are, and what they thought to check. The engine evaluates every check on every applicant the same way and surfaces the underlying evidence so the vendor can audit the reasoning. When the signals conflict—say, a strong website but no tax registration—the application is held for human review under the vendor's own gating rules.",
  },
  {
    q: "Can vendors set their own approval rules?",
    a: "Yes—and they should. There's no generic score deciding whether a designer is approved. Every vendor's trade program is different: a high-volume fabric house and a luxury furniture atelier have very different bars. Vendors configure custom gating rules—which checks are required, which trigger auto-approval, which require human review—and the engine applies them. Every check also supports a manual override, and overrides are logged in the audit trail.",
  },
  {
    q: "Does this replace tools like Avalara, TaxWisp, or SparkLayer?",
    a: "Different parts of the stack. For the trade-channel use case, Credenza replaces certificate-management tools like TaxWisp, CertCapture, and Avalara's ECM module—we validate the buyer and the certificate, generate compliant resale certificates from verified data, and write state-scoped exemption directly to the Shopify customer profile. B2B commerce layers (SparkLayer, Shopify Plus B2B) handle a different layer—trade pricing and tax-exempt checkout once a buyer is approved—and Credenza runs alongside them.",
  },
  {
    q: "How does verification connect to Shopify tax exemption?",
    a: "Once a designer is approved under your gating rules, Credenza writes state-scoped tax exemption directly to the Shopify customer profile—the customer is tagged tax-exempt and exemption applies at checkout automatically. The certificate and the verification evidence live in Credenza. Every tax-exempt order that comes through Shopify is mirrored to Credenza and linked back to the specific resale certificate that justified the exemption—so when an auditor asks why an order was tax-exempt, the answer is in your tax-audit export.",
  },
  {
    q: "Is the audit trail compliant for state tax audits?",
    a: "Yes. Credenza maintains an append-only ledger linking every tax-exempt Shopify order to the resale certificate that justified the exemption, alongside the verification evidence behind that certificate. You pull the whole thing as a tax-auditor-ready CSV—filtered by state or date range—directly from your vendor dashboard. When an auditor asks why an exemption was granted on a particular order, you hand them the export.",
  },
];

const CHECKS: Array<{ title: string; body: ReactNode }> = [
  {
    title: "EIN & business entity",
    body: "Verified against IRS records with a business-name match. Catches typos, mismatches, and inactive entities before they become a compliance problem.",
  },
  {
    title: "Sales tax ID",
    body: "State-specific format validation and active-registration check across 28 states. Lapsed or invalid registrations flagged before approval, not after an audit.",
  },
  {
    title: "Professional memberships",
    body: "Live directory checks against ASID, AIA, NCIDQ, NKBA, and ICAA. Returns membership tier and verification timestamp—not a screenshot the designer uploaded.",
  },
  {
    title: "Website & online presence",
    body: "Active, credible web presence consistent with a working design practice. Surfaces inconsistencies—a portfolio that doesn't match the claimed specialty, a domain registered last week, no contact path.",
  },
  {
    title: "Instagram & portfolio",
    body: "Evidence of an active, client-facing design practice. Distinguishes a working designer's account from an aspirational one—without relying on follower counts.",
  },
  {
    title: "License verification",
    body: "Interior-design license verified in the 8 states with practice acts. Architecture licenses cross-referenced with NCARB records. Required state-by-state, where applicable.",
  },
  {
    title: "Resale certificate",
    body: "State-specific or multi-state form, signed by an authorized firm representative. Validates against state-by-state rules (MTC, SST, state-specific, state-issued). Renewals are tracked and re-verified.",
  },
  {
    title: "Trade references",
    body: "Trade references collected and checked for valid contacts and account numbers. Distinguishes a designer with active wholesale relationships from a first-time applicant claiming history they don't have.",
  },
  {
    title: "Press & showhouse recognition",
    body: (
      <>
        Verified coverage in <i>AD</i>, <i>Veranda</i>, <i>Elle Decor</i>, <i>House Beautiful</i>, <i>Southern Living</i>, <i>Luxe</i>, Kips Bay, and other recognized industry venues. Real coverage tied to a real byline, not a self-reported claim.
      </>
    ),
  },
];

const LIFECYCLE = [
  { trigger: "Designer applies", outcome: "all nine checks run in parallel against authoritative sources." },
  { trigger: "Engine evaluates", outcome: "every check's evidence captured and surfaced—not a black-box score." },
  { trigger: "Your rules apply", outcome: "approval, hold-for-review, or rejection per the gating logic you configured." },
  { trigger: "Decision is made", outcome: "auto-approve when your rules clear, hold for human review when signals conflict, reject when key checks fail." },
  { trigger: "Approval triggers", outcome: "state-scoped exemption written to the Shopify customer profile; certificate filed in Credenza, linked to every tax-exempt order that follows." },
];

const COMPARISON_ROWS = [
  {
    category: "Manual vetting",
    examples: "Spreadsheets, internal review, gut check",
    gap: "20–30 minutes per applicant. Inconsistent. No audit trail. Doesn't scale past a few dozen applications a month.",
  },
  {
    category: "Tax-compliance tools",
    examples: "Avalara ECM, TaxWisp, TaxJar, CertCapture",
    gap: "Validate the certificate, not the designer. Can't tell you whether the applicant is an actual practitioner with a real practice.",
  },
  {
    category: "B2B commerce layers",
    examples: "SparkLayer, Shopify Plus B2B",
    gap: "Handle trade pricing and tax-exempt checkout after approval. Don't address the verification step—who gets approved in the first place.",
  },
  {
    category: "Trade marketplaces",
    examples: "Material Bank, Perigold, The Expert",
    gap: "Brings you pre-vetted designers inside their flow. Intercepts your relationship—you don't own the customer.",
  },
];

const PROBLEM_POINTS = [
  {
    title: "Trade application volume is rising.",
    body: "The interior design industry is growing and consumer-facing brands keep adding trade programs. Most vendors are still vetting applicants by hand—a workflow that breaks at twenty applications a week.",
  },
  {
    title: "Wayfair changed the math.",
    body: "Since the 2018 South Dakota v. Wayfair ruling, any state with sales tax can require out-of-state sellers to collect. An invalid resale certificate now exposes the vendor to liability in every state they ship to. Manual review without an audit trail is a compounding risk.",
  },
  {
    title: "Designers expect instant onboarding.",
    body: "Designers compare brands at the speed of e-commerce. A trade-account approval that takes three days loses the order. The brands winning the trade channel approve in minutes, not days.",
  },
  {
    title: "Manual review doesn't surface what matters.",
    body: "A staffer Googling an applicant catches obvious red flags. They don't catch the lapsed state registration, the expired membership, the trade reference that won't return the call—the quiet signals that distinguish a legitimate, active practice from a stale one.",
  },
];

export default function AutomatedDesignerVerification() {
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute("content");
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.getAttribute("href");

    document.title = `${PAGE_TITLE} | Credenza`;
    descMeta?.setAttribute("content", PAGE_DESCRIPTION);
    canonicalEl?.setAttribute("href", CANONICAL_URL);

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.dataset.pageSchema = "automated-designer-verification-faq";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });

    const articleSchema = document.createElement("script");
    articleSchema.type = "application/ld+json";
    articleSchema.dataset.pageSchema = "automated-designer-verification-article";
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: CANONICAL_URL,
      mainEntityOfPage: CANONICAL_URL,
      author: { "@type": "Organization", name: "Credenza", url: "https://usecredenza.com/" },
      publisher: {
        "@type": "Organization",
        name: "Credenza",
        logo: { "@type": "ImageObject", url: "https://usecredenza.com/credenza-brandmark.png" },
      },
      about: [
        { "@type": "Thing", name: "Automated designer verification" },
        { "@type": "Thing", name: "Trade account vetting" },
        { "@type": "Thing", name: "Interior designer credentials" },
      ],
      audience: { "@type": "BusinessAudience", audienceType: "To-the-trade brands selling furniture, lighting, rugs, and home decor" },
    });

    document.head.appendChild(faqSchema);
    document.head.appendChild(articleSchema);

    return () => {
      document.title = prevTitle;
      if (prevDesc) descMeta?.setAttribute("content", prevDesc);
      if (prevCanonical) canonicalEl?.setAttribute("href", prevCanonical);
      faqSchema.remove();
      articleSchema.remove();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="vendors" ctaHref={JOIN_VENDOR_URL} />
      <Hero />
      <Definition />
      <Checks />
      <Lifecycle />
      <Comparison />
      <Problem />
      <FAQ />
      <Close />
      <Footer />
    </div>
  );
}

/* =========================================================================
   1. HERO
   ========================================================================= */
function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center bg-white min-h-[80vh] pt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #d8d4ca 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.35,
        }}
      />
      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <Eyebrow>For to-the-trade brands</Eyebrow>
            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Automated designer verification
              <br />
              <span className="italic text-olive-mid">for to-the-trade brands.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p
              className="text-charcoal-mid mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              One verification engine evaluates every applicant against nine evidence checks. Submission to
              decision in seconds—your gating rules applied, audit trail attached.
            </p>
            <a
              href={JOIN_VENDOR_URL}
              className="no-underline inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                outline: "0.5px solid #99b8bd",
                outlineOffset: "2px",
              }}
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. DEFINITION (LLM citation magnet)
   ========================================================================= */
function Definition() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container max-w-4xl">
        <Eyebrow>Definition</Eyebrow>
        <h2
          className="font-freight leading-none text-charcoal mb-10"
          style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
        >
          What is automated
          <br />
          <span className="italic text-olive-mid">designer verification?</span>
        </h2>
        <div
          className="space-y-6 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
        >
          <p>
            Automated designer verification is the process of evaluating an interior designer's professional
            legitimacy without manual review—by validating tax registrations, business presence, public credentials,
            industry recognition, and trade-specific signals against authoritative sources. For furniture brands and
            to-the-trade vendors, it replaces hours of manual research per applicant with a structured decision in
            seconds, applied through each vendor's own gating rules.
          </p>
          <p>
            What separates designer verification from generic business verification is the credential set. A
            designer's legitimacy isn't <em>only</em> established by EIN and a website—it's also established by
            professional memberships, state-issued licenses, showhouse participation, design-press coverage,
            verified trade references, and state-by-state resale-certificate compliance—signals that a generic KYC
            tool can't see.
          </p>
          <p>
            Automated verification doesn't replace human judgment; it focuses it. The engine surfaces the evidence;
            the vendor's gating rules apply. Humans decide on the applicants who deserve their attention—not the
            obvious-yes and obvious-no cases that should never have reached them.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. NINE CHECKS
   ========================================================================= */
function Checks() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>The verification engine</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Nine evidence checks,
              <br />
              <span className="italic text-olive-mid">run in parallel.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-sage-dark">
          {CHECKS.map((card, i) => {
            const isLeftCol = i % 3 === 0;
            const isMidCol = i % 3 === 1;
            const lgRightBorder = !isLeftCol && !isMidCol ? "" : "lg:border-r lg:border-sage-dark";
            const mdRightBorder = i % 2 === 0 ? "md:border-r md:border-sage-dark" : "";
            return (
              <div
                key={card.title}
                className={`py-10 px-6 md:px-8 border-b border-sage-dark ${mdRightBorder} ${lgRightBorder}`}
              >
                <div className="mb-3">
                  <span
                    className="text-olive-mid"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Check {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="font-freight mb-3 text-charcoal"
                  style={{ fontSize: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-charcoal-mid"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
                >
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. LIFECYCLE
   ========================================================================= */
function Lifecycle() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 border-t border-sage-dark" style={{ backgroundColor: "#fafaf6" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Submission to decision
              <br />
              <span className="italic text-olive-mid">on your terms.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-sage-dark">
          {LIFECYCLE.map((step, i) => (
            <div
              key={step.trigger}
              className="grid grid-cols-12 gap-4 md:gap-8 py-7 border-b border-sage-dark items-baseline"
            >
              <div
                className="col-span-2 md:col-span-1 font-freight text-olive-mid"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="col-span-10 md:col-span-4 text-charcoal"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {step.trigger} <span className="text-olive-mid">&rarr;</span>
              </div>
              <div
                className="col-span-12 md:col-span-7 text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.6 }}
              >
                {step.outcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. COMPARISON (categorical co-citation with adjacent tools)
   ========================================================================= */
function Comparison() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>Where Credenza fits</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              How Credenza compares
              <br />
              <span className="italic text-olive-mid">to adjacent tools.</span>
            </h2>
          </div>
          <div
            className="lg:col-span-5 text-charcoal-mid"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
          >
            <p>
              Each of these tools solves a different part of the trade workflow. None of them verify the designer.
            </p>
          </div>
        </div>

        <div className="border-t border-sage-dark">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.category}
              className="grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-sage-dark items-baseline"
            >
              <div
                className="col-span-12 md:col-span-3 font-freight text-charcoal"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", lineHeight: 1.3 }}
              >
                {row.category}
              </div>
              <div
                className="col-span-12 md:col-span-3 text-charcoal-soft"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {row.examples}
              </div>
              <div
                className="col-span-12 md:col-span-6 text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
              >
                {row.gap}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. WHY NOW (problem framing)
   ========================================================================= */
function Problem() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>Why now</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              The trade-vetting workflow
              <br />
              <span className="italic text-olive-mid">stopped scaling in 2018.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-sage-dark pt-10">
          {PROBLEM_POINTS.map((p) => (
            <div key={p.title}>
              <h3
                className="font-freight mb-3 text-charcoal"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                {p.title}
              </h3>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. FAQ
   ========================================================================= */
function FAQ() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="font-freight leading-none text-charcoal"
            style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            Questions vendors ask.
          </h2>
        </div>
        <div className="border-t border-sage-dark">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent"
      >
        <h3
          className="font-freight text-charcoal"
          style={{ fontSize: "1.1rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}
        >
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {open && (
        <p
          className="pb-5 pr-10 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

/* =========================================================================
   8. CLOSE
   ========================================================================= */
function Close() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>The verification layer</Eyebrow>
          <h2
            className="font-freight leading-none text-charcoal mb-8"
            style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            A trade book
            <br />
            <span className="italic text-olive-mid">that vets itself.</span>
          </h2>
          <p
            className="text-charcoal-mid mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
          >
            Credenza brings designer verification into your flow without intercepting the relationship. Every
            applicant evaluated against the same nine checks. Every approval gated by the rules you set. Every
            decision written to your Shopify with the audit trail attached. The verification layer the trade
            channel didn't have.
          </p>
          <a
            href={JOIN_VENDOR_URL}
            className="no-underline inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              outline: "0.5px solid #99b8bd",
              outlineOffset: "2px",
            }}
          >
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
}
