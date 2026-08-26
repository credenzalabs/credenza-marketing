/*
 * CREDENZA — PRICING
 *
 * Exists because "what does it cost" is the shortlisting question, and an
 * assistant answering it will cite whoever has a pricing page. Every claim here
 * is one the site already makes elsewhere (homepage FAQ, /for-designers).
 *
 * VENDOR-FIRST. Vendors are who we sell to, so the vendor plan is the page's
 * primary object and gets full width. "Free for designers" is real and worth
 * stating, but it is already carried by the "No charge to your designers"
 * guarantee and its own FAQ entry — a dedicated band on top of those two said
 * the same thing a third time.
 *
 * NO DOLLAR FIGURES ARE INVENTED. The page answers the structural questions —
 * who pays, how billing works, what moves you between tiers, what is never
 * charged for — which is most of what a buyer and a model need. A "starting at"
 * number is the one thing missing; set STARTING_AT and it renders itself.
 *
 * SEO: FAQPage JSON-LD here. The priced Offers live on the site-wide
 * SoftwareApplication block in index.html rather than a second copy of the same
 * entity on this page.
 */

import { ShieldCheck, Zap, FileText, RefreshCw, LifeBuoy, Plug, ScrollText, TrendingUp, Upload } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { QuoteForm } from "@/components/pricing/QuoteForm";
import { FAQItem } from "@/components/resources/prose";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";
import { withCredenzaUtm } from "@/utils/utm";
import { useEffect } from "react";

const PAGE_TITLE = "Credenza pricing: trade program software for interior design vendors";
const PAGE_DESCRIPTION =
  "Credenza pricing for to-the-trade vendors: full-featured plans start at $499/month, priced on trade application and active certificate volume. No percentage of sales, no setup fee. Free for interior designers.";
const PAGE_PATH = "/pricing";

const STARTING_AT = "$499/month";

/* Credited designer project photography. Credits travel WITH the image —
   photographer and designer both — via the site-wide PhotoCredit tooltip.
   NOTE: the designer differs per photograph, so a credit cannot be carried
   from one file to another. thomas-loof-ombre-living is the only Loof image
   in this repo with a recorded attribution (SecuritySection); the other
   twenty have none, and would need one before use. */
const HERO_IMAGE = {
  src: "/thomas-loof-ombre-living.jpg",
  alt: "Living room by Amy Lau Design",
  objectPosition: "center 60%",
  credits: [
    { text: "© " },
    { text: "Thomas Loof", href: withCredenzaUtm("https://www.thomasloof.com/", "photo-credit", "pricing-hero") },
    { text: " (design by " },
    { text: "Amy Lau Design", href: withCredenzaUtm("https://www.amylaudesign.com/", "designer-credit", "pricing-hero") },
    { text: ")" },
  ],
};

const PLANS_IMAGE = {
  src: "/kavanaugh-lakeside.webp",
  alt: "Interior by Ellen Kavanaugh Interiors",
  objectPosition: "center 40%",
  credits: [
    { text: "© " },
    { text: "Carmel Brantley", href: withCredenzaUtm("https://www.brantleyphotography.com/", "photo-credit", "pricing-plans") },
    { text: " (design by " },
    { text: "Ellen Kavanaugh Interiors", href: withCredenzaUtm("https://www.ellenkavanaugh.com/", "designer-credit", "pricing-plans") },
    { text: ")" },
  ],
};

const VENDOR_INCLUDES = [
  { icon: ShieldCheck, title: "Trade verification", body: "Up to nine evidence checks, combining AI-powered web research with deterministic database lookups against authoritative tax and state sources." },
  { icon: Zap, title: "Auto-approval rules", body: "Approval criteria you configure and change yourself, so qualifying applicants clear in minutes rather than days." },
  { icon: FileText, title: "Resale certificate engine", body: "Compliant certificates across 46 jurisdictions, auto-filling 39 official state forms, matched to your nexus and the ship-to state." },
  { icon: RefreshCw, title: "Resale certificate management", body: "Expiration monitoring, renewal chasing, and automatic revocation of tax exemption when a certificate lapses." },
  { icon: LifeBuoy, title: "Managed service included", body: "We handle applicant follow-up and credential collection when an application needs more information. You retain final approval authority." },
  { icon: Plug, title: "Commerce integration", body: "Approved buyers written into your store with trade tagging and state-scoped tax exemption applied, plus drift detection on every field." },
  { icon: ScrollText, title: "Audit trail", body: "Verification evidence, signed certificates, and tax-exempt orders linked end-to-end, so your business is audit ready." },
  { icon: TrendingUp, title: "Program intelligence", body: "Everything you need to grow the channel: account segmentation, member health, exportable outreach lists, and product-level insight into what your trade channel is buying." },
  { icon: Upload, title: "Migration", body: "Bring an existing book of trade accounts and certificates across rather than starting from an empty dashboard." },
];

const TIER_DRIVERS = [
  { n: "01", title: "Trade applications per month", body: "How many trade applications you process. A brand reviewing a few dozen a month and one reviewing hundreds are not the same business, and shouldn't pay the same." },
  { n: "02", title: "Active resale certificates", body: "How many valid resale certificates we maintain for your accounts. Expired or revoked certificates don't count—you only pay for the active coverage you hold." },
];

const NEVER_CHARGED = [
  { title: "No percentage of sales", body: "We take no cut of sales, transactions, or designer spend. Your trade revenue does not change what you pay us." },
  { title: "No charge to your designers", body: "Your trade customers are never asked to pay to apply to you, hold an account, or produce a certificate." },
  { title: "No marketplace in the middle", body: "Credenza never intercepts or intermediates an order. Designers source from the brands they choose, and the relationship stays direct." },
  { title: "No repricing mid-term", body: "We size the tier against your real numbers before you commit, and revisit it as your program grows rather than moving you without warning." },
  { title: "No surprise upgrades", body: "One busy month during High Point shouldn't change your bill. Nothing upgrades automatically—if sustained volume outgrows your tier, we talk to you first." },
];

const FAQ_ITEMS = [
  {
    q: "How much does Credenza cost?",
    a: "Full-featured plans start at $499/month for growing brands, with tailored options for smaller studios and for enterprise volume. Pricing is set by two numbers: how many trade applications you process per month, and how many active resale certificates we maintain for you. Credenza is free for interior designers and their teams.",
  },
  {
    q: "Is it billed monthly or annually?",
    a: "Either. Annual is paid upfront and monthly is month-to-month. Through October 2026, our founding vendor offer saves you 20% on annual plans. A 14-day trial runs before the first charge.",
  },
  {
    q: "What moves us from one tier to the next?",
    a: "Sustained volume. Nothing upgrades automatically—if your trade applications or active certificates run past your plan for months at a time, we'll talk to you before anything changes, and a single busy month never triggers it.",
  },
  {
    q: "Do you take a percentage of sales or designer spend?",
    a: "No. Credenza does not take a percentage of sales, transactions, or designer spend, and does not mark up or intermediate any order. Your revenue is yours. The subscription is the entire commercial relationship, which means our incentives don't change as your trade channel grows.",
  },
  {
    q: "Is there a setup or implementation fee?",
    a: "No—unlike most certificate and tax-compliance tools, which charge an implementation fee before you are up and running. Connecting Credenza to your commerce platform is a single authorization from your vendor dashboard: not an onboarding project, not a scheduled implementation, not a services engagement. Program setup (your nexus states, approval rules, and trade tag) is configuration you do yourself in Credenza. A custom integration is the only thing we quote separately.",
  },
  {
    q: "What do you need from us to quote a price?",
    a: "Roughly how many trade applications you receive per month, and how many existing certificates and trade customers you have. That's enough to put you in the right tier.",
  },
  {
    q: "Do you use AI to make tax or compliance decisions?",
    a: "No. AI is used in two separate places: reading the details off an uploaded resale certificate, and researching whether a designer is actively practicing during trade verification. On upload it can turn back a certificate that's expired, unreadable, or issued by the wrong state—the designer is told what's wrong and uploads a corrected one. It never approves anyone: EINs, tax IDs, and state permits are verified by lookup, certificates are generated by rule from each state's own form and the regulations governing it, and approval follows the criteria you configure.",
  },
  {
    q: "How is this different from CertCapture or Avalara ECM?",
    a: "Avalara ECM is a capable certificate-management product, but it treats certificates as a standalone step and leaves the error-handling to your team. Credenza is purpose-built for the entire to-the-trade workflow. We generate compliant certificates using the business and tax data already stored in the applicant's Credenza profile, then validate the application. If something is invalid, we handle the outreach to the designer to fix it, so your team doesn't have to be compliance experts. Because that profile is reusable, returning designers can apply to your program without filling out a redundant application. Once approved, Credenza can carry the account into Shopify and Klaviyo.",
  },
  {
    q: "What if we need an integration you don't offer out of the box?",
    a: "Ask. We'd be happy to explore a custom integration with you.",
  },
  {
    q: "How does Credenza compare to paying for a tax-compliance add-on?",
    a: "Certificate storage tools and tax engines price against documents or transactions, and they start once a buyer already exists. Credenza prices against your trade program and covers the step before that — deciding who qualifies as a trade buyer, collecting the right certificate for that buyer and your nexus, and provisioning the account in your store. We don't file or remit your sales tax; we make sure the exemption you're relying on is backed by a valid certificate.",
  },
  {
    q: "Is Credenza really free for designers?",
    a: "Yes. Designers create a verified trade profile, manage every trade account in one dashboard, and generate compliant resale certificates for any US jurisdiction at no cost — no credit card, no trial that expires, no per-seat charge for their team. Vendors fund the platform. Designers being free is what makes a profile worth keeping current and carrying from brand to brand, which is what makes an application arrive complete rather than half-filled.",
  },
];

export default function Pricing() {
  usePageMeta({
    // No "| Credenza" suffix — the title already leads with the brand.
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.dataset.pageSchema = "pricing-faq";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqSchema);
    return () => faqSchema.remove();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="pricing" ctaHref={JOIN_VENDOR_URL} forceSolid />

      {/* Header — vendor framing. Split rather than full bleed: the copy sits
          on white, and the photograph occupies the right half, bleeding to the
          viewport edge on large screens so it doesn't read as a boxed-in
          thumbnail. No scrim needed — nothing is set over the image. */}
      {/* No top padding on the section: the nav is fixed, so the photograph runs
          to the very top of the viewport and the nav sits over its first ~100px.
          Clearance lives on the TEXT column instead, which is the only part that
          must not slide under the bar. */}
      <section className="bg-white">
        {/* 90vh matches the For Designers hero. Home keeps the full screen as
            the front door; the interior pages sit one notch below it, and
            Pricing sits beside For Designers in the nav, so it should read at
            the same weight rather than as a shorter, lighter page. */}
        <div className="grid lg:grid-cols-2 items-stretch gap-10 lg:gap-16 lg:min-h-[90vh]">
          <div className="container lg:ml-auto lg:mr-0 lg:pr-16 lg:max-w-[640px] pt-28 md:pt-32 pb-4 lg:pb-20 lg:pt-32 flex flex-col justify-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1
              className="font-freight leading-none text-charcoal mb-8"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)", letterSpacing: "-0.03em" }}
            >
              Priced on your program,
              <br />
              <span className="italic text-olive-mid">never on your sales.</span>
            </h1>
            <p
              className="text-charcoal-mid max-w-[560px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              A monthly or annual subscription, tiered by your volume of trade applications
              and active resale certificates. We take no percentage of sales, transactions, or designer
              spend&mdash;so a larger order, or a better year, never costs you more.
              {` Full-featured plans start at ${STARTING_AT}.`}
            </p>
          </div>

          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[460px] lg:min-h-[640px] lg:h-full">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: HERO_IMAGE.objectPosition }}
            />
            <PhotoCredit separator="" credits={HERO_IMAGE.credits} />
          </div>
        </div>
      </section>

      {/* What sets your tier */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#fafaf6" }}>
        <div className="container">
          <div className="max-w-2xl mb-12">
            <Eyebrow>How tiers work</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              Two numbers set
              <br />
              <span className="italic text-olive-mid">your tier.</span>
            </h2>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Every tier is the same product&mdash;the full verification and certificate
              engine, and the commerce integration. What changes is the volume your
              program runs and the support that comes with it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-sage-dark">
            {TIER_DRIVERS.map((d, i) => (
              <div
                key={d.n}
                className={`py-8 md:pr-8 border-b border-sage-dark ${i > 0 ? "md:pl-8" : ""} ${i < TIER_DRIVERS.length - 1 ? "md:border-r md:border-sage-dark" : ""}`}
              >
                <span className="font-freight text-olive-mid block mb-3" style={{ fontSize: "1.1rem" }}>
                  {d.n}
                </span>
                <h3
                  className="font-freight text-charcoal mb-2"
                  style={{ fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}
                >
                  {d.title}
                </h3>
                <p
                  className="text-charcoal-mid"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem", lineHeight: 1.7 }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The price anchor.
          Deliberately NOT the full grid. Publishing Pro/Scale/Premier side by
          side anchors the conversation on volume tiers and rules out the
          lighter plans as a sales down-sell; publishing ONE full-featured
          number solves the shortlisting problem without either cost.

          Split like the hero, but mirrored — image LEFT — so the two picture
          sections don't read as the same slide twice. */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2 items-stretch gap-10 lg:gap-16">
          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[460px] lg:min-h-[640px] lg:h-full order-first">
            <img
              src={PLANS_IMAGE.src}
              alt={PLANS_IMAGE.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: PLANS_IMAGE.objectPosition }}
            />
            <PhotoCredit separator="" credits={PLANS_IMAGE.credits} />
          </div>

          <div className="container lg:ml-0 lg:mr-auto lg:pl-16 lg:max-w-[640px] py-16 lg:py-24 flex flex-col justify-center">
            <h2
              className="font-freight text-charcoal mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Full-featured plans start at {STARTING_AT}.
            </h2>
            <p
              className="text-charcoal-mid mb-5"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.98rem", lineHeight: 1.75 }}
            >
              Pro is the entry point for the complete trade-program
              workflow&mdash;automated verification, resale certificate management, Shopify
              and Klaviyo syncing, auto-approval rules, and bulk imports&mdash;for
              up to 75 trade applications per month and 3,000 active certificates. Billed
              monthly, with a 14-day trial before the first charge.
            </p>
            <a
              href={JOIN_VENDOR_URL}
              className="no-underline self-start inline-flex items-center gap-2 mb-8 px-7 py-3 uppercase transition-all duration-200 bg-teal hover:bg-[#99b8bd] text-forest"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
            >
              Request a quote
            </a>
            {/* TIME-BOUND — remove after October 2026. */}
            <div
              className="border-l-2 border-olive-mid pl-4 py-1 mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
            >
              <span className="text-charcoal" style={{ fontWeight: 600 }}>Founding vendor offer:</span>{" "}
              <span className="text-charcoal-mid">
                save 20% on annual plans through October 2026.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Every plan includes — sits with the tier table, since the tiers differ
          in volume and support rather than in what the product does. */}
      <section className="pt-20 md:pt-28 pb-20 md:pb-28 bg-white">
        <div className="container">
          <div className="border-t border-sage-dark pt-8">
            <div
              className="uppercase text-charcoal-soft mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.14em", fontWeight: 600 }}
            >
              Every plan includes
            </div>
            {/* 3x3 — nine features divide evenly into three columns, where
                four left an orphan on the last row. */}
            {/* auto-rows-fr equalises every row's height, so the space between
                rows reads the same all the way down. Without it, a row of
                two-line cards sits in a row sized by a three-line neighbour and
                the gaps look uneven even though the gap value is constant. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 lg:auto-rows-fr">
              {VENDOR_INCLUDES.map((item) => (
                <div key={item.title} className="flex gap-4">
                  {/* shrink-0 so the glyph keeps its size against a two- or
                      three-line body; mt-0.5 optically seats it on the label's
                      cap height rather than its line box. */}
                  <item.icon
                    size={28}
                    strokeWidth={1.25}
                    className="text-olive-mid shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className="font-semibold text-charcoal mb-1"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-charcoal-mid"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", lineHeight: 1.65 }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skinny band closing the feature list — a footnote to what's
              included, which is where "need fewer of these?" actually lands.
              Beside the $499 anchor it was competing with the price. */}
          <div className="mt-14 border-t border-sage-dark pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p
              className="text-charcoal m-0"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 600 }}
            >
              Need fewer features or a custom integration? We&rsquo;ll tailor a plan and
              implementation for you.
            </p>
            <a
              href={JOIN_VENDOR_URL}
              className="shrink-0 inline-flex items-center gap-1.5 text-olive-mid hover:text-charcoal transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Get custom pricing <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* What we never charge for — the one dark band on the page. A list of
          things we DON'T do is the most confident thing here, and inverting it
          breaks the white/linen alternation at the point the eye starts to
          drift. Text treatment matches SecuritySection: ivory headings, teal
          accent, body at 60% ivory. */}
      <section className="py-20 md:py-28 bg-forest">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow light>What we don&rsquo;t charge for</Eyebrow>
              <h2
                className="font-freight leading-none text-ivory"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                The subscription is
                <br />
                <span className="italic text-teal">the whole relationship.</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div style={{ borderTop: "1px solid rgba(240,240,236,0.18)" }}>
                {NEVER_CHARGED.map((item) => (
                  <div key={item.title} className="py-6" style={{ borderBottom: "1px solid rgba(240,240,236,0.18)" }}>
                    <h3
                      className="font-semibold text-ivory mb-1"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(240,240,236,0.6)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <Eyebrow>Pricing questions</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              Straight answers
              <br />
              <span className="italic text-olive-mid">about cost.</span>
            </h2>
          </div>
          <div className="border-t border-sage-dark max-w-3xl">
            {FAQ_ITEMS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Close — photograph beside the form rather than behind it. The form has
          seven fields and a checkbox row; over a scrim that reads as a lot of
          furniture on top of a picture. Side by side, the photograph is a
          photograph and the form is legible on its own ground.

          The right panel stays forest so the form's field styling (light fields
          on dark) is unchanged, and so the page still closes on a dark note. */}
      <section id="quote" className="bg-white" style={{ scrollMarginTop: 96 }}>
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="relative overflow-hidden min-h-[340px] lg:min-h-0 order-first">
            <img
              src="/studio-dorion-pound-ridge-hires.jpg"
              alt="Studio Dorion Pound Ridge entry"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
            <PhotoCredit
              separator=""
              credits={[
                { text: "© " },
                { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "pricing-close") },
                { text: " (design by " },
                { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "pricing-close") },
                { text: ")" },
              ]}
            />
          </div>

          <div className="px-6 sm:px-10 lg:pl-20 lg:pr-14 xl:pl-24 py-16 md:py-24 flex flex-col justify-center" style={{ backgroundColor: "#fafaf6" }}>
            <h2
              className="font-freight leading-none text-charcoal mb-5"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", letterSpacing: "-0.03em" }}
            >
              Tell us your volume;
              <br />
              <span className="italic text-olive-mid">we&rsquo;ll find the right plan.</span>
            </h2>
            <p
              className="mb-10 max-w-[520px] text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.98rem", lineHeight: 1.75 }}
            >
              Roughly how many trade applications you receive per month, and how many
              existing certificates and trade customers you have. That&rsquo;s all we need
              to put a number in front of you.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
