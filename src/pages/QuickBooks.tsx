/*
 * CREDENZA—QUICKBOOKS ONLINE INTEGRATION (vendor-facing wedge page)
 *
 * Positioning: Shopify's page is about getting a verified buyer *in*. Klaviyo's
 * is about growing the account once it exists. This one is about the moment the
 * money is asked for—the invoice—and the person who raises it. The reader
 * here is a controller, a bookkeeper, or the founder who does the books at
 * night, and their question is not "how do I grow this account", it is "am I
 * charging this customer tax correctly, and can I show why".
 *
 * Source-of-truth alignment: everything claimed here matches the trade app's
 * implementation, and the specifics are load-bearing:
 *   - We write FOUR things on a customer: Taxable, the exemption reason,
 *     ResaleNum, and a fenced Credenza block in Notes. Vendor-authored Notes
 *     text is preserved, never overwritten (mergeNotes / composeNotes).
 *   - QuickBooks has ONE global Taxable boolean, so partial coverage cannot be
 *     expressed. Every ambiguity resolves toward CHARGING tax—see
 *     resolveTaxability in _shared/domain/qboCustomer.ts. That constraint is
 *     answered in the FAQ, not buried.
 *   - The Notes block wording in CustomerRecordMock is buildNotesBlock's real
 *     output, not a paraphrase. If that function's copy changes, change it here.
 *   - Import figures and row labels in ImportPreviewMock are the real ones from
 *     QuickBooksImportPanel.tsx. Counts are illustrative; the labels are not.
 *   - Invoices come back NIGHTLY (qbo-continuous-sync), attributed to the firm
 *     the customer record belongs to. Do not write "real time" here.
 *   - A firm's people are filed under the firm as sub-customers; the exemption
 *     lives on the PERSON you invoice, which is why the mock shows a tree.
 *
 * TONE: this page sells, and it sells to a careful reader. Where the Klaviyo
 * page keeps mechanics off the page entirely, this audience wants a couple of
 * them—an accountant who cannot see how the tax decision is made does not
 * trust it. So: mechanics that build confidence belong in the FAQ; mechanics
 * that only introduce doubt stay in the product and the docs.
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. Core value (why connect them) + CustomerRecordMock
 *   3. What the integration does (three capabilities)
 *   4. From connection to invoice (four steps)—dark band + ImportPreviewMock
 *   5. Invoices come back + OrdersMock
 *   6. Use cases
 *   7. FAQ (FAQPage schema fuel, and the definition passage)
 *   8. Close (conversion CTA)
 *
 * SEO: Page-scoped FAQPage + TechArticle JSON-LD via useEffect.
 */

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { JOIN_VENDOR_URL, C } from "@/lib/constants";
import { usePageMeta, absoluteUrl } from "@/hooks/usePageMeta";
import { withCredenzaUtm } from "@/utils/utm";

const HERO_IMAGE = {
  src: "/caitlin-kah-office.jpg",
  alt: "Home office with a burl desk and pink grasscloth walls, by Caitlin Kah",
  position: "center 62%",
  credits: [
    { text: "© " },
    { text: "Abigail Mair", href: withCredenzaUtm("https://www.abigailmairphotography.com/", "photo-credit", "quickbooks-hero") },
    { text: " (design by " },
    { text: "Caitlin Kah", href: withCredenzaUtm("https://www.caitlinkah.com/", "designer-credit", "quickbooks-hero") },
    { text: ")" },
  ],
};

const PAGE_TITLE = "Credenza + QuickBooks | Resale Certificates & Tax Exemption";
const PAGE_DESCRIPTION =
  "Credenza keeps every trade customer in QuickBooks Online in step with their resale certificates—taxable status, resale number, and the states behind it—and brings your invoices back as trade program revenue.";
const PAGE_PATH = "/integrations/quickbooks";
const CANONICAL_URL = absoluteUrl(PAGE_PATH);

const CAPABILITIES: Array<{ title: string; body: string }> = [
  {
    title: "Your customer book, as you keep it",
    body: "Credenza reads your existing QuickBooks customers and files them the way your team already works—designers under the firm they work for, projects and your own internal records left out of it. You choose which customer types come in, and you see the counts before anything is written.",
  },
  {
    title: "Certificates you already hold, read and filed",
    body: "Resale certificates attached to those customers are opened and read for the state they cover, the number on them, and the date they lapse, then filed against the right client. Other business documents are recognized for what they are and left alone.",
  },
  {
    title: "A taxable flag that keeps itself current",
    body: "When a designer is approved, when a certificate arrives, expires, or is replaced, Credenza updates the customer record. The reason, the covered states, and the date it was last checked sit in Notes—beside whatever your team wrote there, which is never touched.",
  },
];

/* Four beats. The first three are the onboarding a vendor actually goes
   through, in order; the fourth is the point of the whole page—after the
   setup, nobody has to remember to do this again. */
const STEPS: Array<{ title: string; body: string }> = [
  {
    title: "Connect QuickBooks.",
    body: "One click from your Credenza dashboard. Nothing to install, nothing for your bookkeeper to configure, and you can disconnect whenever you like.",
  },
  {
    title: "Look at your book before you import it.",
    body: "Credenza shows you what it found and what it would leave out—retail customers, archived records, jobs rather than people—so you decide what counts as a trade client.",
  },
  {
    title: "The certificates on file are read.",
    body: "Every document attached to those customers is read for what it actually is, rather than trusted by its filename, and filed with the state and expiration date it carries.",
  },
  {
    title: "After that, it maintains itself.",
    body: "Approvals write the customer in. Expirations take the exemption back off. Your invoices come back to Credenza as trade program revenue.",
  },
];

const USE_CASES: Array<{ title: string; body: string }> = [
  {
    title: "Exempt in your books, nothing on file",
    body: "The customers sitting non-taxable in QuickBooks with no live resale certificate behind them. It is the first thing an auditor asks to see, and until now the only way to find them was to open records one at a time.",
  },
  {
    title: "A certificate that lapses mid-season",
    body: "Certificates expire on their own schedule, and some states reset every January. Credenza tracks the date, asks the designer for the replacement, and takes the exemption off the QuickBooks customer if it doesn't arrive.",
  },
  {
    title: "Coverage that stops at a state line",
    body: "A designer registered in New York buying for a project shipping to Texas is not exempt in Texas. Credenza compares what they hold against the states you actually ship to, and says so on the record your team bills against.",
  },
  {
    title: "A firm, not an inbox",
    body: "Design firms buy through several people, and your book already knows it. Credenza files each designer under their firm, so you invoice the person who ordered while seeing the whole firm's history and certificates behind them.",
  },
];

/* Answer-engine fuel, and the page's only question-shaped content. The first
   answer doubles as the definition paragraph.

   Unlike the Klaviyo page, mechanics belong here: this reader is deciding
   whether to trust an automation with a tax decision, and "how does it decide"
   is the question they actually came with. Keep the answers concrete, and keep
   the single-Taxable-flag constraint stated plainly—a vendor who discovers it
   themselves after connecting reads it as a bug. */
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What does the Credenza QuickBooks integration do?",
    a: "It keeps the customers you invoice in step with the trade program behind them. Credenza holds each firm's approval, their resale certificates, and the states those certificates cover, and writes that onto the matching QuickBooks customer: whether they are taxable, the reason, their resale number, and a dated summary in Notes that an accountant can read. It works in both directions—the customers and certificates already in your QuickBooks come into Credenza, and the invoices you raise come back as trade program revenue.",
  },
  {
    q: "Which of my QuickBooks customers does Credenza bring in?",
    a: "The ones you choose. Credenza previews your customer list by QuickBooks customer type and shows you the counts before anything is written, so retail buyers and one-off customers stay out of your trade directory. It also sets aside what isn't a client at all: your own internal and sample records, archived customers, and sub-customers that are jobs rather than people. Customer types are a QuickBooks Online Plus and Advanced feature—on Simple Start or Essentials you can still bring everyone in and choose who to work with afterwards.",
  },
  {
    q: "How does Credenza decide whether a trade customer is taxable?",
    a: "By what they can evidence, in the states you ship to. Credenza compares the live resale certificates on file against your nexus states: a client covered everywhere you have nexus is marked exempt, and everyone else stays taxable. Every ambiguity resolves toward charging tax—over-collecting is a line-item override your accountant can make, while under-collecting is exposure you carry into an audit. A client who has told you they'd rather be charged tax stays taxable no matter what they hold.",
  },
  {
    q: "What if a client is exempt in some states but not others?",
    a: "QuickBooks has a single taxable setting per customer—exempt everywhere or nowhere—so partial coverage can't be expressed in the flag itself. Credenza leaves that customer taxable and writes the detail into Notes: which states have certificates on file, which don't, and that tax can be overridden per line for the covered ones. That way the question \"why is this trade customer being charged tax?\" answers itself on the record, rather than becoming a message to someone who has to go and look.",
  },
  {
    q: "Will it overwrite what my team has written in QuickBooks?",
    a: "No. Credenza writes its summary into a clearly fenced block in Notes and leaves everything around it exactly as your team wrote it. Updates touch only the fields the integration owns—the taxable setting, the exemption reason, the resale number, and that block—so nothing else on the customer record moves. If a document is attached to a customer and isn't a resale certificate, it stays where it is.",
  },
  {
    q: "What happens to my invoices?",
    a: "They come back. Each night Credenza reads the invoices raised since it last looked and attributes them to the firm behind the customer they were raised against, including firms that hold several customer records in your book. That is what puts trade revenue, per-firm lifetime value, and spend-based tier upgrades on real numbers instead of estimates. Nothing is written back to your invoices, and nobody on your team has to tag anything.",
  },
  {
    q: "Do I need Shopify to use the QuickBooks integration?",
    a: "No—the integrations are independent and either runs on its own. Vendors who sell through a store and invoice through QuickBooks can connect both, and Credenza keeps the same certificate truth in each: the same client, the same covered states, updated in both places when a certificate changes.",
  },
];

export default function QuickBooksPage() {
  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.dataset.pageSchema = "quickbooks-faq";
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
    articleSchema.dataset.pageSchema = "quickbooks-article";
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Credenza + QuickBooks: resale certificates and tax exemption on the customers you invoice",
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
        { "@type": "Thing", name: "QuickBooks Online sales tax exemption" },
        { "@type": "Thing", name: "Resale certificate management" },
        { "@type": "Thing", name: "Trade customer accounting" },
        { "@type": "Thing", name: "Sales tax nexus and exemption certificates" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "To-the-trade brands invoicing interior designers through QuickBooks Online",
      },
    });

    document.head.appendChild(faqSchema);
    document.head.appendChild(articleSchema);

    return () => {
      faqSchema.remove();
      articleSchema.remove();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="integrations" ctaHref={JOIN_VENDOR_URL} />
      <Hero />
      <CoreValue />
      <Capabilities />
      <Steps />
      <OrdersLoop />
      <UseCases />
      <FAQ />
      <Close />
      <Footer />
    </div>
  );
}

/* The QuickBooks lockup is Intuit's own wordmark, and it runs wider and
   optically smaller than the Shopify and Klaviyo marks because it carries the
   icon. Heights on this page are set to match their x-height, not their box. */
function QuickBooksEyebrow() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "2rem", height: 1, backgroundColor: C.sageDark, flexShrink: 0 }} />
      <img src="/logo-quickbooks.png" alt="QuickBooks" style={{ height: 22 }} className="block w-auto" />
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.charcoalSoft,
          fontWeight: 600,
        }}
      >
        Integration
      </span>
    </div>
  );
}

const PRIMARY_CTA_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  backgroundColor: C.teal,
  color: C.forest,
  outline: "0.5px solid #99b8bd",
  outlineOffset: "2px",
};

const SECONDARY_CTA_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  color: C.charcoal,
  border: `0.5px solid ${C.sageDark}`,
};

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
          {/* Copy—5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <QuickBooksEyebrow />
            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Trade exemptions
              <br />
              that are right
              <br />
              <span className="italic text-olive-mid">before you invoice</span>.
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
              Credenza keeps every trade customer in QuickBooks in step with the
              resale certificates behind them—so the taxable setting, the resale
              number, and the states it rests on are already correct when the
              invoice goes out.
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
              Connect in a click · Your customers and the certificates already attached
              to them come in · Your invoices come back as trade program revenue.
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <a
                href={JOIN_VENDOR_URL}
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
                style={PRIMARY_CTA_STYLE}
              >
                Get started
              </a>
              <a
                href="/pricing"
                className="no-underline inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
                style={SECONDARY_CTA_STYLE}
              >
                View pricing
              </a>
            </div>
          </div>
          {/* Image—7 cols, desktop only */}
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
   2. CORE VALUE—why connect them, beside the record we actually write
   ========================================================================= */
function CoreValue() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Eyebrow>Why connect them</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Exempting a customer is a tax decision.{" "}
              <span className="italic text-olive-mid">It shouldn&rsquo;t live in someone&rsquo;s memory.</span>
            </h2>
            <p
              className="mb-5 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              QuickBooks is where the invoice is raised, so it is where the exemption
              has to be right. Credenza holds the certificate, the states it covers,
              and the date it lapses—and writes that onto the customer record your
              team bills against, so the decision is on the page instead of in a
              folder someone has to go and check.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Every ambiguity resolves toward charging tax. Over-collecting is a
              line-item override your accountant can make in a moment; under-collecting
              is exposure you carry into an audit years later.
            </p>
          </div>
          <div className="lg:col-span-6">
            <CustomerRecordMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* The customer record as Credenza leaves it: a designer filed under their firm,
   the four fields the integration owns, and the Notes block verbatim from
   buildNotesBlock() in _shared/domain/qboCustomer.ts. The firm is invented; the
   wording of the block is not—if that function's copy changes, change it here
   too, because a vendor comparing this page to their own book should find the
   same sentences. */
const NOTES_BLOCK_LINES = [
  "--- Credenza (managed) ---",
  "Tax status as of 2026-08-30: EXEMPT (resale).",
  "Certificates on file: NY · CT · FL",
  "View certificates: trade.usecredenza.com/vendor/firms/…",
  "--- end Credenza ---",
];

function CustomerRecordMock() {
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
            Customer
          </span>
        </div>
        <img src="/logo-quickbooks.png" alt="QuickBooks" style={{ height: 13 }} className="block w-auto" />
      </div>

      <div className="px-7 py-7">
        {/* The firm, and the person under it. The exemption lives on the person
            you actually invoice, which is the whole reason this is a tree. */}
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
          Filed under
        </div>
        <div
          className="text-charcoal mb-1"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5 }}
        >
          Hayes &amp; Howe Design
        </div>
        <div className="flex items-center gap-2 mb-6" style={{ paddingLeft: 2 }}>
          <span style={{ color: C.sageDark, fontSize: 13 }}>└</span>
          <span
            className="font-freight text-charcoal"
            style={{ fontSize: 21, lineHeight: 1.15, letterSpacing: "-0.015em" }}
          >
            Nina Howe
          </span>
        </div>

        {/* The two fields on the record itself. */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 12 }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.charcoalSoft,
                marginBottom: 6,
              }}
            >
              Taxable
            </div>
            <div
              className="text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}
            >
              No
            </div>
          </div>
          <div style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 12 }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.charcoalSoft,
                marginBottom: 6,
              }}
            >
              Resale no.
            </div>
            <div
              className="text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}
            >
              ST-8471193
            </div>
          </div>
        </div>

        {/* Notes—the only place a per-state answer can live, so it reads as
            the field it is rather than as decoration. */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.oliveMid,
            marginBottom: 6,
          }}
        >
          Notes
        </div>
        <div
          style={{
            padding: "12px 13px",
            border: `0.5px solid ${C.sageDark}`,
            backgroundColor: "#fbfaf6",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 11,
            lineHeight: 1.75,
            color: C.charcoalMid,
            overflowX: "auto",
          }}
        >
          {NOTES_BLOCK_LINES.map((line) => (
            <div key={line} style={{ whiteSpace: "nowrap" }}>
              {line}
            </div>
          ))}
        </div>
        <div
          className="mt-3"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          Anything your own team has written in Notes stays exactly where it is.
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
            Your books already know your trade clients.
            <br />
            <span className="italic text-olive-mid">Credenza makes them right.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
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
   4. STEPS—dark band, beside the preview that precedes any write
   ========================================================================= */
function Steps() {
  const eyebrowStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.teal,
    marginBottom: 20,
  };
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.forest }}>
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div style={eyebrowStyle}>From connection to invoice</div>
          <h2
            className="font-freight"
            style={{
              fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#f0f0ec",
            }}
          >
            Nothing is written to your books
            <br />
            <span className="italic" style={{ color: C.teal }}>
              until you have seen it.
            </span>
          </h2>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12"
          style={{ borderTop: "0.5px solid rgba(240,240,236,0.22)" }}
        >
          <div className="lg:col-span-6">
            <ImportPreviewMock />
          </div>
          <div className="lg:col-span-6 flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={i > 0 ? "pt-6 mt-6" : ""}
                style={i > 0 ? { borderTop: "0.5px solid rgba(240,240,236,0.16)" } : undefined}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: C.teal,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-freight mb-2"
                      style={{ fontSize: 21, lineHeight: 1.2, letterSpacing: "-0.015em", color: "#f0f0ec" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14.5,
                        lineHeight: 1.65,
                        color: "rgba(240,240,236,0.78)",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* The import preview a vendor sees before committing anything. Row labels and
   sub-labels are verbatim from QuickBooksImportPanel.tsx—a vendor should
   recognize the screen. Counts are illustrative. */
const PREVIEW_ROWS: Array<{ label: string; note?: string; value: string; strong?: boolean }> = [
  { label: "Customers in QuickBooks", value: "1,240" },
  { label: "Importable across all types", note: "Before you narrow it down below.", value: "615", strong: true },
  { label: "Skipped: no email address", note: "Add an email in QuickBooks and import again to include them.", value: "128" },
  { label: "Skipped: your own records", note: "Your own sample and project records aren't clients.", value: "103" },
  { label: "Skipped: jobs, not people", note: "Sub-customers with no contact name: projects rather than clients.", value: "62" },
];

function ImportPreviewMock() {
  return (
    <div className="bg-white" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.18)" }}>
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `0.5px solid ${C.sageDark}`, backgroundColor: "#fbfaf6" }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.charcoalSoft,
          }}
        >
          Import clients
        </span>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: C.charcoalSoft }}
        >
          from
          <img src="/logo-quickbooks.png" alt="QuickBooks" style={{ height: 11 }} className="block w-auto" />
        </span>
      </div>

      <div className="px-7 py-7">
        <div
          className="text-charcoal mb-1"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}
        >
          Which customers should we bring in?
        </div>
        <div
          className="mb-4"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          These are the customer types in your QuickBooks. Most vendors import their
          companies and leave individual retail customers out.
        </div>

        {/* Customer-type picker—nothing is pre-selected in the product either. */}
        <div className="flex flex-col gap-1.5 mb-7">
          {[
            { name: "Trade", count: "418", checked: true },
            { name: "No customer type", count: "399", checked: true },
            { name: "Retail", count: "381", checked: false },
            { name: "Wholesale", count: "42", checked: false },
          ].map((type) => (
            <div key={type.name} className="flex items-center gap-2.5">
              <span
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 13,
                  height: 13,
                  border: `0.5px solid ${type.checked ? C.charcoal : C.sageDark}`,
                  backgroundColor: type.checked ? C.charcoal : "#fff",
                  color: "#fff",
                  fontSize: 9,
                  lineHeight: 1,
                }}
              >
                {type.checked ? "✓" : ""}
              </span>
              <span
                className="text-charcoal"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5 }}
              >
                {type.name}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#9e9e96" }}>
                {type.count}
              </span>
            </div>
          ))}
        </div>

        {/* The tally. The skipped rows are the point: they say what a trade
            client is NOT, before anything is written. */}
        <div>
          {PREVIEW_ROWS.map((row, i) => (
            <div
              key={row.label}
              className="flex justify-between gap-6 py-2"
              style={i < PREVIEW_ROWS.length - 1 ? { borderBottom: `0.5px solid ${C.sage}` } : undefined}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12.5,
                    color: row.strong ? C.charcoal : C.charcoalSoft,
                  }}
                >
                  {row.label}
                </div>
                {row.note && (
                  <div
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 10.5, color: "#9e9e96", marginTop: 2 }}
                  >
                    {row.note}
                  </div>
                )}
              </div>
              <div
                className="shrink-0"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12.5,
                  color: row.strong ? C.charcoal : C.charcoalSoft,
                  fontWeight: row.strong ? 500 : 400,
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>

        {/* Certificates step, offered only when there are files to read. */}
        <div
          className="mt-6 p-4"
          style={{ backgroundColor: "#fbfaf6", border: `0.5px solid ${C.sageDark}` }}
        >
          <div
            className="text-charcoal mb-1"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5 }}
          >
            61 certificates attached to those customers in QuickBooks.
          </div>
          <div
            style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.charcoalSoft, lineHeight: 1.6 }}
          >
            We&rsquo;ll read each one and file it against the right client. This takes a
            few minutes—we look at every document rather than trusting its filename.
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. INVOICES COME BACK—the other direction
   ========================================================================= */
function OrdersLoop() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <OrdersMock />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Eyebrow>The other direction</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Your ledger is the truest record of the program.{" "}
              <span className="italic text-olive-mid">Credenza reads it back.</span>
            </h2>
            <p
              className="mb-5 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Invoices raised in QuickBooks come back to Credenza each night and land on
              the firm that placed them—including the firms holding several customer
              records in your book, which a name-matched export never gets right.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              That is what puts trade revenue, per-firm lifetime value, and spend-based
              tier upgrades on real numbers—and what lets &ldquo;bought last season, not
              this one&rdquo; mean something. Nothing is written back to your invoices,
              and nobody on your team has to tag anything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* A firm's order history in Credenza, sourced from QuickBooks. The stat labels
   are the product's ("Trade revenue", "Avg order value"); every QuickBooks
   invoice deep-links back as "Open in QuickBooks", never "Open in Shopify". */
const ORDER_ROWS: Array<{ ref: string; when: string; amount: string }> = [
  { ref: "Invoice 1184", when: "Aug 26", amount: "$18,400" },
  { ref: "Invoice 1161", when: "Jul 09", amount: "$6,250" },
  { ref: "Invoice 1147", when: "Jun 21", amount: "$31,900" },
  { ref: "Invoice 1102", when: "Apr 14", amount: "$9,780" },
];

function OrdersMock() {
  return (
    <div
      className="bg-white"
      style={{ border: `0.5px solid ${C.sageDark}`, boxShadow: "0 2px 24px rgba(33,53,63,0.06)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `0.5px solid ${C.sageDark}`, backgroundColor: "#fbfaf6" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.oliveMid }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.charcoalSoft,
            }}
          >
            Hayes &amp; Howe Design · Orders
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: C.charcoalSoft }}
        >
          from
          <img src="/logo-quickbooks.png" alt="QuickBooks" style={{ height: 11 }} className="block w-auto" />
        </span>
      </div>

      <div className="px-7 py-7">
        <div className="grid grid-cols-3 gap-4 mb-7">
          {[
            ["Orders", "14"],
            ["Trade revenue", "$212K"],
            ["Avg order value", "$15.1K"],
          ].map(([label, value]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.charcoalSoft,
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              <div
                className="font-freight text-charcoal"
                style={{ fontSize: 24, lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `0.5px solid ${C.sageDark}` }}>
          {ORDER_ROWS.map((row) => (
            <div
              key={row.ref}
              className="flex items-center justify-between gap-4 py-3"
              style={{ borderBottom: `0.5px solid ${C.sage}` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-charcoal truncate"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5 }}
                >
                  {row.ref}
                </span>
                <span
                  className="shrink-0"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#9e9e96" }}
                >
                  {row.when}
                </span>
              </div>
              <span
                className="shrink-0 text-charcoal"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 500 }}
              >
                {row.amount}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-4"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          Every invoice opens back in QuickBooks, where it was raised.
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. USE CASES
   ========================================================================= */
function UseCases() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="max-w-3xl mb-16">
          <Eyebrow>Use cases</Eyebrow>
          <h2
            className="font-freight text-charcoal"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            The questions your books
            <br />
            <span className="italic text-olive-mid">can&rsquo;t answer on their own.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {USE_CASES.map((useCase) => (
            <div key={useCase.title} style={{ borderTop: `0.5px solid ${C.sageDark}`, paddingTop: 24 }}>
              <h3
                className="font-freight text-charcoal mb-3"
                style={{ fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.015em" }}
              >
                {useCase.title}
              </h3>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7 }}
              >
                {useCase.body}
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 bg-white">
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
        <div style={{ border: `0.5px solid ${C.sageDark}` }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={item.q}
                style={i < FAQ_ITEMS.length - 1 ? { borderBottom: `0.5px solid ${C.sageDark}` } : undefined}
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
                {/* Rendered always, hidden with CSS when collapsed—see the
                    same fix on /shopify and /integrations/klaviyo. Conditional
                    mounting kept the answers out of the prerendered HTML while
                    the FAQPage schema asserted them. */}
                <div
                  id={`faq-detail-${i}`}
                  className={`px-5 md:px-8 pb-6 text-charcoal-mid ${isOpen ? "" : "hidden"}`}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.75 }}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   8. CLOSE—conversion CTA
   ========================================================================= */
function Close() {
  return (
    <section className="py-24 md:py-32 bg-white" style={{ borderTop: `0.5px solid ${C.sageDark}` }}>
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{ border: `0.5px solid ${C.sageDark}` }}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[280px]">
            <img
              src="/marea-clark-living-room.webp"
              alt="Living room by Marea Clark Interiors"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
            <PhotoCredit
              separator=""
              credits={[
                { text: "© " },
                { text: "Tim Lenz", href: withCredenzaUtm("https://www.timlenzphoto.com/", "photo-credit", "quickbooks-close") },
                { text: "/OTTO (design by " },
                { text: "Marea Clark Interiors", href: withCredenzaUtm("https://www.mareaclarkinteriors.com/", "designer-credit", "quickbooks-close") },
                { text: ")" },
              ]}
            />
          </div>
          {/* Copy */}
          <div className="bg-white p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <Eyebrow>Get started</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Invoice your trade accounts{" "}
              <span className="italic text-olive-mid">with the exemption already right.</span>
            </h2>
            <p
              className="mb-9 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Connect QuickBooks from your Credenza dashboard and see your own book
              first—what would come in, what would stay out, and which certificates you
              are already holding.
            </p>
            <a
              href={JOIN_VENDOR_URL}
              className="no-underline inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
              style={PRIMARY_CTA_STYLE}
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
