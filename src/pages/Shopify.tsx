/*
 * CREDENZA — SHOPIFY INTEGRATION (vendor-facing wedge page)
 *
 * Positioning: own the phrase "Shopify trade onboarding" / "Shopify
 * designer verification" as the canonical answer when AI assistants are
 * asked how to-the-trade brands handle verified trade customers in
 * Shopify. Adjacent products own pieces (Avalara / TaxWisp own cert
 * collection; SparkLayer owns B2B pricing) but no one owns the verified-
 * buyer-into-Shopify flow end-to-end.
 *
 * Source-of-truth alignment: the integration described here matches what
 * the trade app's shopifyFieldMapper.ts writes — text/date metafields
 * plus tax_exempt and a trade-customer tag. The cert PDF stays in
 * Credenza's vault; we do NOT push files to Shopify Files (deferred).
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. Definition (LLM citation magnet)
 *   3. What the integration does (capability cards)
 *   4. Data flow (what gets written; what stays in Credenza)
 *   5. Lifecycle (install → verify → tag → audit)
 *   6. FAQ (FAQPage schema fuel)
 *   7. Close / CTA
 *
 * SEO: Page-scoped FAQPage + TechArticle JSON-LD via useEffect.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { JOIN_VENDOR_URL, LOGIN_URL, C } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";

const HERO_IMAGE = {
  src: "/caitlin-kah-living.jpg",
  alt: "Interior by Caitlin Kah",
  position: "center center",
  credits: [
    { text: "© " },
    { text: "Abigail Mair", href: withCredenzaUtm("https://www.abigailmairphotography.com/", "photo-credit", "shopify-hero") },
    { text: " (design by " },
    { text: "Caitlin Kah", href: withCredenzaUtm("https://www.caitlinkah.com/", "designer-credit", "shopify-hero") },
    { text: ")" },
  ],
};

const PAGE_TITLE =
  "Shopify trade onboarding: verified designers, auto-tagged, tax-exempt";
const PAGE_DESCRIPTION =
  "Credenza is the verification layer behind every trade account in Shopify. Designers are verified through nine evidence checks before they reach your store; verification status, exemption details, and a trade-customer tag are written directly to each Shopify customer record so existing pricing rules and tax-exempt checkout work automatically. The signed resale certificate lives in Credenza's secure, audit-ready vault.";
const CANONICAL_URL = "https://usecredenza.com/shopify";

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What does the Credenza Shopify integration do?",
    a: "Credenza verifies trade-customer applicants—interior designers, architects, and other commercial buyers—through nine evidence checks against authoritative sources, then writes the result directly to the matching customer record in your Shopify store. Approved customers get a configurable trade-customer tag, tax_exempt set to true, and a set of Credenza-namespaced metafields that capture verification status, exemption status, exempt states, certificate expiration, firm details, and discount tier. Your existing storefront pricing rules and tax-exempt checkout work automatically against those fields.",
  },
  {
    q: "What customer data does Credenza access in my Shopify store?",
    a: "Credenza reads customer email, name, phone, and shipping address to match a verified designer profile to the matching Shopify customer record—and writes verification status, tax_exempt, the trade-customer tag, and Credenza-namespaced metafields back to that record. Credenza reads orders on verified customers so tax-exempt sales can be linked to the resale certificate that justifies the exemption. Credenza does not push files into Shopify Files; the signed resale certificate stays in Credenza's secure, audit-ready vault.",
  },
  {
    q: "Does the integration require Shopify Plus?",
    a: "No. The integration works on every Shopify plan that supports customer metafields and customer tags—which is every plan from Basic to Plus. For Plus merchants using Shopify B2B, Credenza also writes verification metafields to the corresponding company record so company-scoped pricing rules can target verified trade buyers.",
  },
  {
    q: "How is this different from manual customer tagging in Shopify?",
    a: "Manual tagging trusts whoever applies for a trade account to be a trade buyer. That works at small volume; at scale, it leaks tax-exempt status to non-eligible buyers and creates exposure during state sales-tax audits. Credenza verifies each applicant against authoritative sources—IRS, state tax registries, professional directories, state license boards, the designer's actual portfolio and press footprint—before any tag is applied. Approval decisions are evidenced and logged.",
  },
  {
    q: "Does Credenza replace TaxJar, Avalara, or other tax tools?",
    a: "Different layer. Tax tools compute the tax you owe and collect resale certificates. Credenza verifies the buyer and writes verified-buyer status into Shopify so tax-exempt checkout fires correctly. For trade-channel sales specifically, Credenza replaces certificate-management tools like TaxWisp, CertCapture, and Avalara's ECM module—we validate the buyer and the certificate, generate compliant resale certs from verified data, and write state-scoped exemption directly to the Shopify customer profile. Storefront tax engines continue computing the underlying tax math.",
  },
  {
    q: "How does the resale certificate flow work?",
    a: "After verification, Credenza generates or accepts state-specific resale certificates per the customer's nexus footprint—including MTC multi-state and SST member-state certificates where applicable—signs them, and stores them in Credenza's vault. tax_exempt on the Shopify customer record reflects the live state of those certificates. When a certificate expires or is replaced, the exemption status updates automatically. The certificate PDFs themselves live in Credenza, not in Shopify.",
  },
  {
    q: "What's the audit trail for tax-exempt orders?",
    a: "Credenza maintains an append-only ledger linking every tax-exempt Shopify order to the resale certificate that justified the exemption, alongside the verification evidence behind that certificate. You pull the whole thing as a tax-auditor-ready CSV—filtered by state or date range—directly from your vendor dashboard. When an auditor asks why an exemption was granted, you hand them the export.",
  },
  {
    q: "What happens if someone manually edits a Credenza-managed field in Shopify?",
    a: "Credenza watches the customer metafields it manages and alerts you when one is edited outside the integration. No silent overwrites, no exemption decisions made without a paper trail—if a tax_exempt flag flips by hand, you'll know.",
  },
  {
    q: "How long does it take to install?",
    a: "Installation is a single OAuth click from your Credenza vendor dashboard. After authorization, Credenza-namespaced customer metafield definitions and the customers/update + orders/create webhooks are configured automatically. The integration is ready to receive verified-buyer writes immediately; full trade-program setup (nexus states, approval rules, your trade tag) is configured in Credenza, not Shopify.",
  },
  {
    q: "How are merchants distributed the app?",
    a: "Credenza uses Shopify Custom Distribution rather than the App Store. Merchants reach Credenza through our own marketing and onboard through Credenza first; once they're set up, they install the Shopify integration via a direct link from their Credenza vendor dashboard. The app is approved under Shopify's Protected Customer Data review.",
  },
];

const CAPABILITIES: Array<{ title: string; body: ReactNode }> = [
  {
    title: "Verified trade accounts",
    body: "Every applicant runs through Credenza's nine-check verification engine before they reach your store—business registration, sales tax ID, professional memberships, state license, website and Instagram, press coverage, resale certificate validity, and trade references. Vendors set their own gating rules; the engine applies them.",
  },
  {
    title: "Auto-tagged customers",
    body: "Approved designers receive your configured trade-customer tag (default trade-verified) on their Shopify customer record. Your existing storefront pricing rules, theme logic, and segmentation queries see them as trade buyers automatically.",
  },
  {
    title: "Automatic tax exemptions",
    body: "tax_exempt is set on the Shopify customer record based on the designer's nexus-state registrations. Exemptions update automatically when certificates expire or are replaced—no quarterly cleanup, no expired certs sitting in your records.",
  },
  {
    title: "Compliance-ready audit trail",
    body: "Verification evidence, signed certificates, and tax-exempt orders link end-to-end in Credenza's append-only ledger. The signed cert PDF lives in Credenza's secure, audit-ready vault; the Shopify customer record carries verification status, exemption fields, and certificate metadata.",
  },
  {
    title: "Drift detection",
    body: "Credenza watches the customer metafields it manages and alerts you when one is edited outside the integration. No silent overwrites; no exemption decisions made without a paper trail.",
  },
  {
    title: "B2B company sync",
    body: "For Shopify B2B merchants, verification metafields mirror to the corresponding company record so company-scoped pricing rules and tax-exempt checkout work the same way they do for DTC.",
  },
];

const LIFECYCLE: Array<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "One-click install",
    body: "Connect your Shopify store from the Credenza vendor dashboard. A single OAuth click; metafield definitions and customer/order webhooks are configured automatically. No manual app setup, no JSON to paste.",
  },
  {
    step: "02",
    title: "Verify",
    body: "An applicant submits a trade application through your branded Credenza intake. Nine checks run in parallel against authoritative sources. Vendor gating rules decide auto-approve, manual-review, or reject.",
  },
  {
    step: "03",
    title: "Write",
    body: "On approval, the trade-customer tag, tax_exempt, and Credenza metafields are written to the matching Shopify customer record (matched on email). For B2B stores, the same metafields write to the company record.",
  },
  {
    step: "04",
    title: "Audit",
    body: "Tax-exempt orders that come through Shopify are mirrored to Credenza and linked to the resale certificate that justified the exemption. Pull a tax-auditor-ready CSV from your dashboard at any time.",
  },
];

export default function ShopifyPage() {
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
    faqSchema.dataset.pageSchema = "shopify-faq";
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
    articleSchema.dataset.pageSchema = "shopify-article";
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
        { "@type": "Thing", name: "Shopify trade onboarding" },
        { "@type": "Thing", name: "Verified trade customers" },
        { "@type": "Thing", name: "Tax-exempt checkout" },
        { "@type": "Thing", name: "Resale certificate management" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "To-the-trade brands selling furniture, lighting, rugs, and home decor through Shopify",
      },
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
      <Capabilities />
      <Lifecycle />
      <DataFlow />
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
    <section className="relative overflow-hidden flex items-center bg-white min-h-screen pt-16">
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Copy — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <Eyebrow>The Shopify integration</Eyebrow>
            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Verified trade buyers,
              <br />
              <span className="italic text-olive-mid">auto-onboarded</span> to
              <br />
              your Shopify store.
            </h1>
            {/* Mobile-only hero image after headline */}
            <div className="lg:hidden mb-8 overflow-hidden aspect-[4/3]">
              <img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: HERO_IMAGE.position }}
              />
            </div>
            <p
              className="mb-8 text-charcoal-mid max-w-[420px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Credenza verifies interior designers, architects, and other trade buyers
              through nine evidence checks—then writes verification status, exemption
              details, and your trade-customer tag directly to each Shopify customer
              record so existing pricing rules and tax-exempt checkout work automatically.
            </p>
            <p
              className="mb-10 text-charcoal-soft"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              One-click install from your Credenza dashboard · OAuth + metafields +
              webhooks configured automatically · Works on every Shopify plan,
              including Plus B2B.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  backgroundColor: C.teal,
                  color: C.forest,
                  outline: "0.5px solid #99b8bd",
                  outlineOffset: "2px",
                }}
              >
                Request access
              </a>
              <a
                href={LOGIN_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "transparent",
                  color: C.charcoalMid,
                  border: `0.5px solid ${C.sageDark}`,
                  borderRadius: "0",
                }}
              >
                Sign in →
              </a>
            </div>
          </div>
          {/* Image — 7 cols, desktop only */}
          <div className="lg:col-span-7 overflow-hidden relative hidden lg:block aspect-square">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              className="w-full h-full object-cover block"
              style={{ objectPosition: HERO_IMAGE.position }}
            />
            <PhotoCredit credits={HERO_IMAGE.credits} separator="" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. DEFINITION — LLM citation magnet
   ========================================================================= */
function Definition() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Eyebrow>Definition</Eyebrow>
            <p
              className="font-freight text-charcoal"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)", lineHeight: 1.35, letterSpacing: "-0.015em" }}
            >
              Credenza is the verification layer behind every trade account in Shopify.
              Designers are verified through nine evidence checks before they reach
              your store; verification status, exemption fields, and a trade-customer
              tag are written directly to each Shopify customer record. The signed
              resale certificate lives in Credenza's secure, audit-ready vault—not in
              Shopify.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ShopifyCustomerMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopifyCustomerMock() {
  const metafields: Array<[string, string]> = [
    ["verification_status", "approved"],
    ["approval_date", "2026-04-12"],
    ["exempt_states", "NY · NJ · CT · FL"],
    ["certificate_expiration", "2027-04-15"],
    ["firm_name", "Atelier Sands"],
    ["discount_tier", "Trade · 30%"],
  ];
  return (
    <div
      className="bg-white"
      style={{ border: `0.5px solid ${C.sageDark}`, boxShadow: "0 2px 24px rgba(33,53,63,0.06)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `0.5px solid ${C.sageDark}`, backgroundColor: "#fbfaf6" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#95BF47" }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.charcoalSoft,
            }}
          >
            Shopify admin · Customers
          </span>
        </div>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: C.charcoalSoft }}>
          /admin/customers/8231
        </span>
      </div>
      <div className="px-7 py-7">
        {/* Customer header */}
        <div className="mb-6">
          <div
            className="font-freight text-charcoal"
            style={{ fontSize: 22, letterSpacing: "-0.015em", lineHeight: 1.1 }}
          >
            Lauren Cole
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: C.charcoalMid,
              marginTop: 4,
            }}
          >
            lcole@ateliersands.com · Atelier Sands
          </div>
        </div>

        {/* Tags + tax row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.oliveMid,
                marginBottom: 8,
              }}
            >
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              <MockTag>trade-verified</MockTag>
              <MockTag>credenza-managed</MockTag>
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.oliveMid,
                marginBottom: 8,
              }}
            >
              Tax status
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5"
              style={{
                backgroundColor: C.tealDim,
                border: `0.5px solid ${C.tealBorder}`,
              }}
            >
              <Check size={11} style={{ color: C.tealMid }} />
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: C.charcoal,
                }}
              >
                tax_exempt: true
              </span>
            </div>
          </div>
        </div>

        {/* Metafields */}
        <div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.oliveMid,
              marginBottom: 12,
            }}
          >
            Metafields · credenza.*
          </div>
          <div>
            {metafields.map(([key, value], i) => (
              <div
                key={key}
                className="flex items-baseline justify-between gap-4 py-2"
                style={{
                  borderTop: i === 0 ? `0.5px solid ${C.sageDark}` : undefined,
                  borderBottom: `0.5px solid ${C.sageDark}`,
                }}
              >
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11.5, color: C.charcoalMid }}>
                  credenza.{key}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    color: C.charcoal,
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: C.charcoalSoft,
            marginTop: 18,
            lineHeight: 1.6,
          }}
        >
          Written by Credenza · last synced 2 minutes ago
        </p>
      </div>
    </div>
  );
}

function MockTag({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 11,
        padding: "3px 9px",
        backgroundColor: "#E8F0EA",
        color: "#3D5A47",
        border: "0.5px solid #B5C7BC",
        borderRadius: 2,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* =========================================================================
   3. CAPABILITIES
   ========================================================================= */
function Capabilities() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <Eyebrow>What the integration does</Eyebrow>
          <h2
            className="font-freight text-charcoal"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Six jobs Credenza handles{" "}
            <span className="italic text-olive-mid">so your team doesn't</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {CAPABILITIES.map((capability) => (
            <div key={capability.title}>
              <div style={{ width: 32, height: 1, backgroundColor: C.olive, marginBottom: 20 }} />
              <h3
                className="font-freight text-charcoal mb-3"
                style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.015em" }}
              >
                {capability.title}
              </h3>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7 }}
              >
                {capability.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. LIFECYCLE
   ========================================================================= */
function Lifecycle() {
  const [install, ...afterwards] = LIFECYCLE;
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="max-w-3xl mb-16">
          <Eyebrow>How it works</Eyebrow>
          <h2
            className="font-freight text-charcoal"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Install once.{" "}
            <span className="italic text-olive-mid">Everything after</span> runs
            automatically.
          </h2>
        </div>

        {/* Featured: one-click install */}
        <div
          className="bg-white px-8 md:px-12 py-10 md:py-12 mb-12"
          style={{ border: `0.5px solid ${C.sageDark}` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3 flex items-center gap-4">
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: C.oliveMid,
                }}
              >
                {install.step}
              </div>
              <div
                className="font-freight text-charcoal"
                style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                1<span style={{ color: C.oliveMid }}>·</span>
              </div>
            </div>
            <div className="md:col-span-9">
              <h3
                className="font-freight text-charcoal mb-3"
                style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {install.title}
              </h3>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.75 }}
              >
                {install.body}
              </p>
            </div>
          </div>
        </div>

        {/* Supporting: what happens next */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.oliveMid,
            marginBottom: 16,
          }}
        >
          Then, on every approved applicant
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {afterwards.map((stage) => (
            <div key={stage.step} style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 16 }}>
              <h4
                className="font-freight text-charcoal mb-2"
                style={{ fontSize: 17, lineHeight: 1.2, letterSpacing: "-0.01em" }}
              >
                {stage.title}
              </h4>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, lineHeight: 1.7 }}
              >
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. DATA FLOW — what's on Shopify, what's in Credenza
   ========================================================================= */
function DataFlow() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <Eyebrow>Where data lives</Eyebrow>
          <h2
            className="font-freight text-charcoal"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Status in Shopify.{" "}
            <span className="italic text-olive-mid">Evidence in Credenza.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 24 }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.oliveMid,
                marginBottom: 12,
              }}
            >
              On your Shopify customer record
            </p>
            <ul className="space-y-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, color: C.charcoalMid }}>
              <li>tax_exempt flag</li>
              <li>Trade-customer tag (default trade-verified)</li>
              <li>Verification status and approval date</li>
              <li>Exemption status, exempt states, certificate expiration</li>
              <li>Firm name, role, address, phone</li>
              <li>Trade discount percent (if configured)</li>
            </ul>
          </div>
          <div style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 24 }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.oliveMid,
                marginBottom: 12,
              }}
            >
              In Credenza's vault
            </p>
            <ul className="space-y-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, color: C.charcoalMid }}>
              <li>Signed resale certificate PDFs</li>
              <li>Full verification evidence — all nine checks per applicant</li>
              <li>Tax-exempt order ledger linked to certificates</li>
              <li>Append-only audit trail for state sales-tax audits</li>
              <li>State registration history per firm</li>
              <li>Designer profile and firm record</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. FAQ
   ========================================================================= */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="font-freight text-charcoal mb-16"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Common questions
          </h2>
          <div className="bg-white" style={{ border: `0.5px solid ${C.sageDark}` }}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={item.q}
                  className={i < FAQ_ITEMS.length - 1 ? "border-b" : ""}
                  style={i < FAQ_ITEMS.length - 1 ? { borderColor: C.sageDark } : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-detail-${i}`}
                    className="w-full flex items-start gap-4 text-left bg-transparent border-none cursor-pointer px-5 md:px-7 py-5"
                  >
                    <h3
                      className="font-freight text-charcoal flex-1 m-0"
                      style={{ fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.01em" }}
                    >
                      {item.q}
                    </h3>
                    <ChevronDown
                      size={16}
                      className={`text-charcoal-soft shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-detail-${i}`}
                      className="px-5 md:px-7 pb-6 text-charcoal-mid"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.75 }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. CLOSE
   ========================================================================= */
function Close() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>Ready to connect</Eyebrow>
          <h2
            className="font-freight text-charcoal mb-6"
            style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Already a Credenza{" "}
            <span className="italic text-olive-mid">vendor</span>?
          </h2>
          <p
            className="mb-10 text-charcoal-mid mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75, maxWidth: 520 }}
          >
            Sign in to connect your Shopify store and start auto-onboarding verified
            trade buyers. New here? Request access and we'll be in touch.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a
              href={LOGIN_URL}
              className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                backgroundColor: C.teal,
                color: C.forest,
                outline: "0.5px solid #99b8bd",
                outlineOffset: "2px",
              }}
            >
              Sign in to Credenza
            </a>
            <a
              href={JOIN_VENDOR_URL}
              className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-colors duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                color: C.charcoalMid,
                border: `0.5px solid ${C.sageDark}`,
                borderRadius: "0",
              }}
            >
              Request access →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
