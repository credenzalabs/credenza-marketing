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
 * the trade app's shopifyFieldMapper.ts writes — text/date/URL metafields
 * in the credenza.* namespace, state-scoped tax exemption identifiers
 * (US_{STATE}_RESELLER_EXEMPTION), and a vendor-configured trade-customer
 * tag plus Credenza-managed prefixed tags. The cert PDF stays in
 * Credenza's vault; we write a URL pointer back to it, not the file.
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. Definition (LLM citation magnet) + ShopifyCustomerMock
 *   3. What the integration does (capability cards)
 *   4. Install (one-click install story) + InstallMock
 *   5. Data flow (what gets written; what stays in Credenza)
 *   6. FAQ (FAQPage schema fuel) — full-width accordion
 *
 * SEO: Page-scoped FAQPage + TechArticle JSON-LD via useEffect.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Check, ChevronDown, Pencil, X } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { JOIN_VENDOR_URL, LOGIN_URL, C } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";

const HERO_IMAGE = {
  src: "/caitlin-kah-credenza.jpg",
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
    a: "Credenza verifies trade-customer applicants—interior designers, architects, and other commercial buyers—through nine evidence checks against authoritative sources, then writes the result directly to the matching customer record in your Shopify store. Approved customers get a configurable trade-customer tag, state-scoped tax exemptions (one per nexus state, e.g. US_NY_RESELLER_EXEMPTION), and a set of Credenza-namespaced metafields that capture trade status, exemption status, exempt-states index, certificate expiration, firm details, and discount percent. Your existing storefront pricing rules and tax-exempt checkout work automatically against those fields.",
  },
  {
    q: "What customer data does Credenza access in my Shopify store?",
    a: "Credenza reads customer email, name, phone, and shipping address to match a verified designer profile to the matching Shopify customer record—and writes trade status, state-scoped tax exemptions, the trade-customer tag, and Credenza-namespaced metafields back to that record. Credenza reads orders on verified customers so tax-exempt sales can be linked to the resale certificate that justifies the exemption. Credenza does not push files into Shopify Files; the signed resale certificate stays in Credenza's secure, audit-ready vault.",
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
    q: "Can I customize the approval rules?",
    a: "Yes. Each vendor sets their own gating: which of the nine checks are required, which combinations auto-approve, which route to manual review, and which auto-reject. Require state license verification in regions with practice acts; demand active ASID membership for premium tiers; gate on resale certificate quality; build any rule that maps to the nine checks. Credenza's engine runs the checks on every applicant; your rules decide what to do with the result. Rule changes are versioned and don't retroactively re-decide prior approvals.",
  },
  {
    q: "Does Credenza replace TaxJar, Avalara, or other tax tools?",
    a: "Different layer. Tax tools compute the tax you owe and collect resale certificates. Credenza verifies the buyer and writes per-state tax exemptions into Shopify so tax-exempt checkout fires correctly in exactly the states the buyer is registered in—and only those. For trade-channel sales specifically, Credenza replaces certificate-management tools like TaxWisp, CertCapture, and Avalara's ECM module—we validate the buyer and the certificate, generate compliant resale certs from verified data, and write state-scoped exemption directly to the Shopify customer profile. Storefront tax engines continue computing the underlying tax math.",
  },
  {
    q: "How does the resale certificate flow work?",
    a: "After verification, Credenza generates or accepts state-specific resale certificates per the customer's nexus footprint—including MTC multi-state and SST member-state certificates where applicable—signs them, and stores them in Credenza's vault. The state-scoped tax exemptions written to the Shopify customer record reflect the live state of those certificates. When a certificate expires or is replaced, the exemption set updates automatically. The certificate PDFs themselves live in Credenza, not in Shopify—the Shopify customer record carries a URL pointer back to the vault.",
  },
  {
    q: "What's the audit trail for tax-exempt orders?",
    a: "Credenza maintains an append-only ledger linking every tax-exempt Shopify order to the resale certificate that justified the exemption, alongside the verification evidence behind that certificate. You pull the whole thing as a tax-auditor-ready CSV—filtered by state or date range—directly from your vendor dashboard. When an auditor asks why an exemption was granted, you hand them the export.",
  },
  {
    q: "What happens if someone manually edits a Credenza-managed field in Shopify?",
    a: "Credenza watches the customer metafields and tax exemptions it manages and alerts you when one is edited outside the integration. No silent overwrites, no exemption decisions made without a paper trail—if a state exemption is removed by hand, you'll know.",
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
    title: "Verified trade accounts, on your rules",
    body: "Every applicant runs through Credenza's nine-check verification engine. You set the gating—auto-approve, manual review, or reject—and Credenza applies your rules consistently on every application.",
  },
  {
    title: "Auto-tagged customers",
    body: "Approved designers receive your configured trade-customer tag (default trade-verified) on their Shopify customer record. Your existing storefront pricing rules, theme logic, and segmentation queries see them as trade buyers automatically.",
  },
  {
    title: "State-scoped tax exemptions",
    body: "Tax-exempt checkout fires only in the states where the designer is registered—never as a blanket override. Exemptions are revoked automatically when a certificate expires and reinstated when it's renewed, so quarterly cert cleanup and expired exemptions sitting in your customer records become someone else's problem.",
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

const INSTALL_AUTO_SETUP: Array<{ label: string; detail: string }> = [
  { label: "Credenza-managed customer fields", detail: "Created with the right types and definitions" },
  { label: "Live sync of customer + order changes", detail: "Approvals, exemptions, and orders kept in step" },
  { label: "Your trade-customer tag, ready to use", detail: "Storefront pricing rules see verified buyers instantly" },
  { label: "Audit-ready order ↔ certificate ledger", detail: "Every exempt sale linked to the certificate behind it" },
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
              including Shopify Plus B2B.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
              resale certificate lives in Credenza's secure, audit-ready vault.
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

// Shopify customer admin sidebar — three stacked panels showing what
// Credenza writes to each customer record.
// Shopify customer admin sidebar — three stacked panels showing what
// Credenza writes to each customer record (contact + address +
// marketing consent + tax details in the Customer card, plus
// Metafields and Tags).
function ShopifyCustomerMock() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
        gap: 10,
        alignItems: "start",
      }}
    >
      <CustomerCard />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MetafieldsCard />
        <TagsCard />
      </div>
    </div>
  );
}

const SHOPIFY_CARD_STYLE: React.CSSProperties = {
  backgroundColor: "white",
  border: "1px solid #e1e3e5",
  borderRadius: 10,
  padding: 14,
};

const SHOPIFY_HEADER_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: "#1c1c1c",
};

const SHOPIFY_PILL_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 11,
  padding: "2px 8px",
  backgroundColor: "#f1f1f1",
  color: "#1c1c1c",
  border: "1px solid #e1e3e5",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

function MetafieldsCard() {
  // The three most marketing-relevant metafields: state of the trade
  // verification, whether tax exemptions are active, and the specific
  // states they apply in.
  const fields: Array<[string, string]> = [
    ["exempt states index", "CT,FL,NJ,NY"],
    ["exemption status", "active"],
    ["trade status", "approved"],
  ];
  return (
    <div style={SHOPIFY_CARD_STYLE}>
      <div className="flex items-center justify-between mb-2.5">
        <span style={SHOPIFY_HEADER_STYLE}>Metafields</span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11.5,
            color: "#1c1c1c",
            fontWeight: 500,
          }}
        >
          View all
        </span>
      </div>
      <div>
        {fields.map(([label, value]) => (
          <MetafieldRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

function MetafieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="grid items-center gap-3 py-1"
      style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)" }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11.5,
          color: "#1c1c1c",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          padding: "5px 10px",
          backgroundColor: "white",
          border: "1px solid #c5c5c5",
          borderRadius: 6,
          fontFamily: "Inter, sans-serif",
          fontSize: 11.5,
          color: "#1c1c1c",
          minHeight: 26,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TagsCard() {
  // Real tags produced by generateShopifyTags for an approved principal
  // with active exemption, state+MTC coverage, 30% discount, plus the
  // vendor-configured trade-customer tag.
  const tags = [
    "credenza",
    "cr-firm-a3f8e9b2",
    "cr-role-owner",
    "cr-trade-approved",
    "cr-exemption-active",
    "cr-state+mtc",
    "cr-discount-30-off",
    "trade-verified",
  ];
  return (
    <div style={SHOPIFY_CARD_STYLE}>
      <div className="flex items-center justify-between mb-2">
        <span style={SHOPIFY_HEADER_STYLE}>Tags</span>
        <Pencil size={12} style={{ color: "#6d7175" }} />
      </div>
      <div
        style={{
          padding: "5px 10px",
          backgroundColor: "white",
          border: "1px solid #c5c5c5",
          borderRadius: 6,
          minHeight: 26,
          marginBottom: 7,
        }}
      />
      <div className="flex flex-wrap gap-1">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1" style={SHOPIFY_PILL_STYLE}>
            {t}
            <X size={9} style={{ color: "#6d7175" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function CustomerCard() {
  const states = [
    "New York reseller",
    "New Jersey reseller",
    "Connecticut reseller",
    "Florida reseller",
  ];
  const subheadingStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 11.5,
    fontWeight: 600,
    color: "#1c1c1c",
    marginBottom: 6,
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 11.5,
    color: "#1c1c1c",
    lineHeight: 1.5,
  };
  return (
    <div style={SHOPIFY_CARD_STYLE}>
      <div className="flex items-center justify-between mb-3">
        <span style={SHOPIFY_HEADER_STYLE}>Customer</span>
        <span style={{ color: "#6d7175", fontSize: 14, lineHeight: 1, letterSpacing: "0.05em" }}>···</span>
      </div>

      {/* Contact information */}
      <div className="mb-3">
        <div style={subheadingStyle}>Contact information</div>
        <div style={{ ...bodyStyle, color: "#005bd3" }}>lauren@hayeshowedesign.com</div>
        <div style={bodyStyle}>+1 (212) 555-0147</div>
        <div style={{ ...bodyStyle, color: "#6d7175" }}>Will receive notifications in English</div>
      </div>

      {/* Default address */}
      <div className="mb-3">
        <div style={subheadingStyle}>Default address</div>
        <div style={bodyStyle}>Lauren Cole</div>
        <div style={bodyStyle}>Hayes &amp; Howe Design</div>
        <div style={bodyStyle}>184 Franklin Street</div>
        <div style={bodyStyle}>New York NY 10013</div>
        <div style={bodyStyle}>United States</div>
        <div style={bodyStyle}>+1 (212) 555-0147</div>
      </div>

      {/* Marketing */}
      <div className="mb-3">
        <div style={subheadingStyle}>Marketing</div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className="inline-flex items-center gap-1.5"
            style={{ ...SHOPIFY_PILL_STYLE, padding: "3px 10px" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, backgroundColor: "#1e7d4e", display: "inline-block" }} />
            Email
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ ...SHOPIFY_PILL_STYLE, padding: "3px 10px" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, border: "1px solid #c5c5c5", display: "inline-block" }} />
            SMS
          </span>
        </div>
      </div>

      {/* Tax details */}
      <div>
        <div style={subheadingStyle}>Tax details</div>
        <div style={{ ...bodyStyle, marginBottom: 6 }}>Collect tax unless exemptions apply</div>
        <div className="flex flex-wrap gap-1">
          {states.map((s) => (
            <span key={s} style={SHOPIFY_PILL_STYLE}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
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
   4. INSTALL — one-click install story + InstallMock
   ========================================================================= */
function Lifecycle() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Install</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              One OAuth click.
              <br />
              <span className="italic text-olive-mid">Zero JSON.</span>
            </h2>
            <p
              className="mb-5 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Open Credenza, click <em>Connect Shopify</em>, authorize. That's the install.
              Credenza handles everything else behind the scenes—the customer fields it writes
              to, the live sync of approvals back to your store, the tags your storefront rules
              read, and the audit trail that links every tax-exempt order to the certificate
              that justified it.
            </p>
            <p
              className="text-charcoal-soft"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.7,
              }}
            >
              No app to download. No theme code to edit. Works on every Shopify plan, including Shopify Plus B2B.
            </p>
          </div>
          <div className="lg:col-span-7">
            <InstallMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallMock() {
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
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.tealMid }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.charcoalSoft,
            }}
          >
            Credenza · Vendor dashboard · Integrations
          </span>
        </div>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: C.charcoalSoft }}>
          /vendor/integrations/shopify
        </span>
      </div>

      <div className="px-7 py-8">
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
          Shopify
        </div>
        <div className="flex items-start gap-6 mb-7">
          <div className="flex-1">
            <div
              className="font-freight text-charcoal mb-1"
              style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.015em" }}
            >
              Connect your Shopify store
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: C.charcoalMid,
                lineHeight: 1.6,
              }}
            >
              Credenza will authorize via OAuth, configure metafields and webhooks,
              and start mirroring verified buyers to your store.
            </div>
          </div>
          <div
            className="inline-flex items-center justify-center gap-2 px-5 py-3 shrink-0"
            style={{
              backgroundColor: C.charcoal,
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 999, backgroundColor: "white" }} />
            Connect Shopify
          </div>
        </div>

        {/* Auto-setup list */}
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
            Configured automatically on connect
          </div>
          <div style={{ border: `0.5px solid ${C.sageDark}` }}>
            {INSTALL_AUTO_SETUP.map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-3 px-4 py-3"
                style={{
                  borderTop: i > 0 ? `0.5px solid ${C.sageDark}` : undefined,
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: C.tealDim,
                    border: `0.5px solid ${C.tealBorder}`,
                    marginTop: 2,
                  }}
                >
                  <Check size={9} style={{ color: C.tealMid }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11.5,
                      color: C.charcoalSoft,
                      marginTop: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {row.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
              <li>Tax-exempt checkout, scoped to the designer's registered states</li>
              <li>Your trade-customer tag, plus Credenza-managed tags for segmentation</li>
              <li>Trade status (approved / pending / revoked) and approval date</li>
              <li>Exemption status, registered states, certificate expiration</li>
              <li>Firm name, role, address, phone</li>
              <li>Link back to the signed resale certificate in Credenza's vault</li>
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
              <li>EIN and sales tax IDs, stored encrypted</li>
              <li>Signed resale certificate PDFs</li>
              <li>Full verification evidence—all nine checks per applicant</li>
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
        <div className="max-w-3xl mb-16">
          <Eyebrow>Reference</Eyebrow>
          <h2
            className="font-freight text-charcoal"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            Frequently asked questions
          </h2>
        </div>
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
                  className="w-full flex items-start gap-4 text-left bg-transparent border-none cursor-pointer px-5 md:px-8 py-5"
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
                    className="px-5 md:px-8 pb-6 text-charcoal-mid"
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
    </section>
  );
}

