/*
 * CREDENZA — INTEGRATIONS INDEX
 *
 * Exists because /integrations/klaviyo implied a parent that didn't exist.
 * vercel.json rewrites every unmatched path to "/", so /integrations returned
 * 200 with the homepage shell AND `index, follow` — a soft 404 on a URL segment
 * that looks like a real section. A crawler that walks up from the Klaviyo page
 * (they do) landed on a page claiming to be the homepage.
 *
 * It earns its place beyond that: it is the one page that links to every
 * integration, so each one is two hops from the homepage rather than dependent
 * on a single card. Add an integration page → add it to INTEGRATIONS here, to
 * the Nav flyout, and to the ROUTES table in scripts/prerender.mjs.
 *
 * SEO: CollectionPage JSON-LD listing the integrations as an ItemList, which is
 * what this page actually is.
 */

import { useEffect } from "react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { JOIN_VENDOR_URL, C } from "@/lib/constants";
import { usePageMeta, absoluteUrl } from "@/hooks/usePageMeta";
import { withCredenzaUtm } from "@/utils/utm";

// Kept short enough that " | Credenza" still fits inside a ~60-char SERP title.
const PAGE_TITLE = "Integrations: Shopify, Klaviyo and QuickBooks for trade";
const PAGE_DESCRIPTION =
  "Credenza connects your trade program to the tools you already run. Shopify gets verified buyers, trade tags, and state-scoped tax exemption; Klaviyo gets ready-made trade segments; QuickBooks gets resale certificates and exemption on the customers you invoice.";
const PAGE_PATH = "/integrations";
const CANONICAL_URL = absoluteUrl(PAGE_PATH);

const INTEGRATIONS: Array<{
  name: string;
  logo: string;
  logoHeight: number;
  href: string;
  headline: string;
  body: string;
  points: string[];
}> = [
  {
    name: "Shopify",
    logo: "/logo-shopify.png",
    logoHeight: 24,
    href: "/shopify",
    headline: "Verified buyers, onboarded to your store.",
    body: "Credenza verifies each trade applicant, then creates the customer profile in Shopify—or updates the one already there—with verification status, exemption details, and your trade-customer tag.",
    points: [
      "Trade-customer tag your pricing rules already read",
      "Tax exemption scoped to the states a designer is registered in",
      "Certificate expirations tracked, exemptions revoked and reinstated automatically",
      "Works on every Shopify plan, including Plus B2B",
    ],
  },
  {
    name: "Klaviyo",
    logo: "/logo-klaviyo.png",
    logoHeight: 18,
    href: "/integrations/klaviyo",
    headline: "Trade segments, ready to campaign against.",
    body: "Credenza reads order history against the trade application and enriched firm data behind it to surface the accounts needing attention, then syncs any of them straight to a Klaviyo list.",
    points: [
      "Opportunity segments maintained for you, defined in trade terms",
      "Push a segment once, or keep the list synced nightly",
      "Opens and clicks return to each firm's record in Credenza",
      "Your sales team sees engagement without a seat in your marketing tool",
    ],
  },
  {
    name: "QuickBooks",
    // Intuit's lockup carries the icon, so it needs more box height than the
    // Shopify and Klaviyo wordmarks to read at the same optical size.
    logo: "/logo-quickbooks.png",
    logoHeight: 26,
    href: "/integrations/quickbooks",
    headline: "The exemption right, before you invoice.",
    body: "Credenza keeps each trade customer in QuickBooks in step with the resale certificates behind them, and reads back the invoices you raise as trade program revenue.",
    points: [
      "Taxable status, resale number, and covered states on the customer record",
      "Certificates already attached to your customers read and filed",
      "Designers filed under the firm they work for, projects left out of it",
      "Invoices return nightly as per-firm revenue and lifetime value",
    ],
  },
];

export default function IntegrationsPage() {
  usePageMeta({
    title: `${PAGE_TITLE} | Credenza`,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });

  useEffect(() => {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.pageSchema = "integrations-collection";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: CANONICAL_URL,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: INTEGRATIONS.map((integration, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Credenza + ${integration.name}`,
          url: absoluteUrl(integration.href),
        })),
      },
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="integrations" ctaHref={JOIN_VENDOR_URL} forceSolid />
      <Header />
      <Cards />
      <Close />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-20" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>Integrations</Eyebrow>
          <h1
            className="font-freight mb-6 text-charcoal"
            style={{ fontSize: "clamp(2.2rem, 3.4vw, 3.2rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            Credenza connects to the tools
            <br />
            <span className="italic text-olive-mid">you already run.</span>
          </h1>
          <p
            className="text-charcoal-mid"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 640 }}
          >
            Verification, certificates, and program intelligence are only useful where
            your team already spends its day. Credenza writes verified trade accounts
            into your store, keeps the exemption right in your books, and turns what it
            knows about them into audiences your marketing can act on.
          </p>
        </div>
      </div>
    </section>
  );
}

function Cards() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {INTEGRATIONS.map((integration) => (
            <a
              key={integration.name}
              href={integration.href}
              className="no-underline block p-7 md:p-8 transition-colors duration-200"
              style={{ border: `0.5px solid ${C.sageDark}`, backgroundColor: "#fff" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#fbfaf6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-6 min-h-[28px]">
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="block w-auto"
                  style={{ height: integration.logoHeight }}
                />
                <span
                  className="shrink-0 uppercase font-semibold border py-0.5 px-1.5 text-teal-mid border-teal-border"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.08em" }}
                >
                  Available now
                </span>
              </div>
              <h2
                className="font-freight text-charcoal mb-4"
                style={{ fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {integration.headline}
              </h2>
              <p
                className="text-charcoal-mid mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7 }}
              >
                {integration.body}
              </p>
              <ul
                className="space-y-2.5 mb-7"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.6, color: C.charcoalMid }}
              >
                {integration.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      className="shrink-0"
                      style={{ width: 4, height: 4, borderRadius: 999, backgroundColor: C.oliveMid, marginTop: 8 }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <span
                className="inline-flex items-center gap-1 text-teal-mid"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Explore the integration →
              </span>
            </a>
          ))}
        </div>

        <p
          className="text-charcoal-soft mt-10"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 640 }}
        >
          Custom e-commerce stacks and ERPs are on the roadmap—if you&rsquo;re running
          something bespoke, let&rsquo;s talk.
        </p>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="py-20 md:py-28 bg-white" style={{ borderTop: `0.5px solid ${C.sageDark}` }}>
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{ border: `0.5px solid ${C.sageDark}` }}
        >
          <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[280px]">
            <img
              src="/marea-clark-entry.webp"
              alt="Entry by Marea Clark Interiors"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
            <PhotoCredit
              separator=""
              credits={[
                { text: "© " },
                { text: "Tim Lenz", href: withCredenzaUtm("https://www.timlenzphoto.com/", "photo-credit", "integrations-close") },
                { text: "/OTTO (design by " },
                { text: "Marea Clark Interiors", href: withCredenzaUtm("https://www.mareaclarkinteriors.com/", "designer-credit", "integrations-close") },
                { text: ")" },
              ]}
            />
          </div>
          <div className="bg-white p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <Eyebrow>Get started</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              One trade program,{" "}
              <span className="italic text-olive-mid">wired into your stack.</span>
            </h2>
            <p
              className="mb-9 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Connect from your Credenza dashboard. Nothing to install in your theme,
              and nothing for your team to keep in sync by hand.
            </p>
            <a
              href={JOIN_VENDOR_URL}
              className="no-underline inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none"
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
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
