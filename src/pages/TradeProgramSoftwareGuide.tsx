/*
 * HOW TO CHOOSE TRADE PROGRAM SOFTWARE — vendor-side buyer's guide
 *
 * The resources section had one article, written for designers. This is the
 * vendor-side counterpart, and the page meant to be the canonical answer when
 * someone asks an assistant "how do I choose trade program software" — a
 * question the site previously had no content for at all.
 *
 * Written as a genuine evaluation framework, not a feature list: the criteria
 * and demo questions apply to any tool in the category. The Credenza section is
 * fenced off and labeled so the buyer knows where the neutral guidance ends.
 *
 * SEO: Article (named Person author) + FAQPage JSON-LD via useEffect.
 */

import { useEffect } from "react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { IMAGES } from "@/components/sections/home/images";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { withCredenzaUtm } from "@/utils/utm";
import { usePageMeta, absoluteUrl, SITE_URL } from "@/hooks/usePageMeta";
import {
  Prose,
  H2,
  H3,
  FAQItem,
  TableOfContents,
  InlineHook,
  CTAButton,
} from "@/components/resources/prose";

const PAGE_TITLE = "How to choose trade program software: a buyer's guide";
const PAGE_DESCRIPTION =
  "An evaluation framework for to-the-trade brands: what trade program software covers, the seven criteria that actually separate tools, how to test verification depth and certificate handling, the questions to ask on a demo, and when building in-house makes sense.";
const PAGE_PATH = "/resources/how-to-choose-trade-program-software";
const PAGE_URL = absoluteUrl(PAGE_PATH);
const AUTHOR = "Credenza Team";
const DATE_PUBLISHED = "2026-08-07";
const DATE_MODIFIED = "2026-08-07";
const CTA_HREF = JOIN_VENDOR_URL;

const TOC = [
  { id: "what-it-is", label: "What the category covers" },
  { id: "outgrown", label: "Signs you've outgrown manual intake" },
  { id: "criteria", label: "Seven evaluation criteria" },
  { id: "verification", label: "Testing verification depth" },
  { id: "certificates", label: "Testing certificate handling" },
  { id: "integration", label: "Testing commerce integration" },
  { id: "build-vs-buy", label: "Build, buy, or bolt on" },
  { id: "questions", label: "Questions to ask on a demo" },
  { id: "credenza", label: "Where Credenza fits" },
  { id: "faq", label: "FAQ" },
];

const FAQ_ITEMS = [
  {
    q: "What is trade program software?",
    a: "Trade program software automates the lifecycle of a vendor's to-the-trade program: taking in applications from interior designers and other trade buyers, verifying that the applicant is a legitimate practicing professional, applying an approval decision, collecting and validating resale certificates, provisioning the approved buyer in the vendor's commerce platform with the right pricing tier and tax-exempt status, and maintaining that account as certificates expire and details change. Brands without it typically assemble the same workflow from a web form, a shared inbox, a spreadsheet, and manual data entry into their store.",
  },
  {
    q: "How is trade program software different from B2B e-commerce software?",
    a: "They solve adjacent problems and most brands need both. B2B e-commerce handles what happens after a buyer is approved: tiered price lists, company accounts, purchase orders, net terms, and tax-exempt checkout. Trade program software handles what happens before: deciding whether this applicant is a real designer who qualifies for those prices at all, collecting the documentation that legally supports the tax exemption, and provisioning the account. A B2B platform will happily apply trade pricing to whoever you tag as a trade customer—it has no opinion about whether that tag is justified.",
  },
  {
    q: "Do I need trade program software if I already sell on Shopify?",
    a: "Shopify gives you the mechanisms—customer tags, metafields, state-level tax exemptions, and on Plus, B2B company records and catalogs. It does not decide who should receive them. If your team is reviewing trade applications by hand and then keying the results into the customer record, the gap that software fills is that review and provisioning step, not the storefront.",
  },
  {
    q: "What should trade verification actually check?",
    a: "Ask any tool to distinguish between what it collects and what it verifies against an authoritative source. Meaningful checks include business entity registration and EIN, state sales tax registration, professional association membership, an active business website, a portfolio or social presence showing real completed work, occupational licensure where the state requires it, a valid resale certificate, trade references, and press or showhouse recognition. A form that merely stores an uploaded document has collected evidence; it has not verified anything.",
  },
  {
    q: "How is trade program software usually priced?",
    a: "Most tools in the category price as an annual or monthly subscription, commonly tiered by the volume of applications and certificates processed and by which features are included. Be specific about what triggers a tier change before signing. Ask directly whether the vendor takes a percentage of sales, transactions, or designer spend—some adjacent products do, and that changes the economics considerably as your program grows.",
  },
  {
    q: "Can we just build this in-house?",
    a: "The application form and approval queue are genuinely easy to build. The durable cost is the compliance surface underneath: 46 US jurisdictions impose sales tax, most publish their own exemption certificate forms, the rules governing which form is valid for a given buyer-vendor-state combination change, and economic nexus thresholds have shifted continuously since South Dakota v. Wayfair in 2018. Building makes sense if your trade program is a flat discount with no tax-exempt purchasing. If exemption certificates are involved, you are committing to maintaining tax content indefinitely.",
  },
  {
    q: "What happens if a designer's resale certificate expires?",
    a: "In most states the vendor—not the buyer—carries the exposure. If you continue selling tax-free against a lapsed certificate, the assessment for uncollected tax, plus penalties and interest, generally lands on you. Any tool you evaluate should track expiration dates per certificate, notify the buyer ahead of the lapse, and be able to remove the tax exemption from the commerce platform automatically when a certificate is not renewed. Ask specifically whether revocation is automatic or a task on someone's list.",
  },
  {
    q: "How fast should trade account approval be?",
    a: "Fast enough that you do not lose the order. Designers specify at the speed of e-commerce and compare brands in the same session; an approval measured in days competes against brands that approve in minutes. The practical target is instant approval for applicants who clearly meet your criteria, with human review reserved for genuine edge cases—which requires that your rules be explicit enough to encode.",
  },
];

const CRITERIA = [
  {
    n: "01",
    title: "Verification depth and evidence trail",
    body: "Does the tool verify against authoritative sources, or does it collect uploads and route them to a human? Ask what evidence is retained per decision, and whether you could reconstruct why a given applicant was approved two years later.",
  },
  {
    n: "02",
    title: "Decision automation you control",
    body: "Auto-approval is only useful if the criteria are yours to set and change. Ask whether rules are configurable by your team without vendor involvement, and what happens to an applicant who narrowly misses one.",
  },
  {
    n: "03",
    title: "Certificate generation, not just storage",
    body: "Storing an uploaded PDF is filing. Generating the correct state form, pre-filled and matched to your nexus, is compliance work. These are very different products that describe themselves with similar language.",
  },
  {
    n: "04",
    title: "Write-back to your commerce platform",
    body: "An approval that ends in a CSV export is a half-finished workflow. Ask what gets written to the customer record, whether tax exemption is applied per state, and whether the connection stays live after the initial provisioning.",
  },
  {
    n: "05",
    title: "Audit defensibility",
    body: "Assume a state auditor asks you to justify three years of tax-exempt sales to one designer. Ask to see how the tool links the order, the exemption, and the certificate that supports it—as an exercise during the demo, not as a description.",
  },
  {
    n: "06",
    title: "The applicant's experience",
    body: "Every field you ask for costs you completed applications from designers who have other brands to choose from. Ask what a first-time applicant actually fills in, and what a designer who has already been verified elsewhere has to repeat.",
  },
  {
    n: "07",
    title: "Program intelligence",
    body: "Once intake is automated, the program becomes a sales channel you can manage. Ask what you can segment on, what you can export for outreach, and whether you can tell an active account from a dormant one without a spreadsheet.",
  },
];

const DEMO_QUESTIONS = [
  "Which of your checks hit an authoritative external source, and which are self-reported by the applicant?",
  "Show me the evidence retained for a single approved applicant, as an auditor would see it.",
  "Can my team change the auto-approval rules ourselves? Show me the screen.",
  "Which states do you generate official forms for, and which do you only accept uploads for?",
  "How do you decide which certificate form is valid for a given designer, my nexus, and the ship-to state?",
  "What exactly gets written to my commerce platform on approval—fields, tags, tax settings?",
  "Is tax exemption applied per state, or as a single account-level flag?",
  "What happens if someone on my team edits one of those fields by hand?",
  "Walk me through the day a certificate expires. What happens automatically?",
  "Link an order to the certificate that justifies its exemption, in front of me.",
  "How do you price, and what specifically moves us to the next tier?",
  "Do you take any percentage of sales, transactions, or designer spend?",
];

export default function TradeProgramSoftwareGuide() {
  usePageMeta({
    title: `${PAGE_TITLE} | Credenza`,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });

  useEffect(() => {
    const articleSchema = document.createElement("script");
    articleSchema.type = "application/ld+json";
    articleSchema.dataset.pageSchema = "trade-program-software-article";
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      author: {
        "@type": "Organization",
        name: "Credenza Labs, Inc.",
        url: `${SITE_URL}/`,
      },
      publisher: {
        "@type": "Organization",
        name: "Credenza Labs, Inc.",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/credenza-brandmark.png`,
        },
      },
      mainEntityOfPage: PAGE_URL,
      about: [
        { "@type": "Thing", name: "Trade program software" },
        { "@type": "Thing", name: "Trade customer verification" },
        { "@type": "Thing", name: "Resale certificate compliance" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "To-the-trade brands selling furniture, lighting, rugs, textiles, and home decor",
      },
    });

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.dataset.pageSchema = "trade-program-software-faq";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });

    document.head.appendChild(articleSchema);
    document.head.appendChild(faqSchema);
    return () => {
      articleSchema.remove();
      faqSchema.remove();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="vendors" forceSolid ctaHref={JOIN_VENDOR_URL} />

      {/* Full-bleed hero image */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh", maxHeight: "75vh" }}>
        <img
          src={IMAGES.studioDorionBrownstone}
          alt="Park Slope brownstone interior by Studio Dorion"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div className="relative" style={{ minHeight: "60vh" }} />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Ethan Herrington", href: withCredenzaUtm("https://ethanherrington.com/", "photo-credit", "resources-trade-program-software-guide") },
            { text: " (design by " },
            { text: "Studio Dorion", href: withCredenzaUtm("https://www.studiodorion.com/", "designer-credit", "resources-trade-program-software-guide") },
            { text: ")" },
          ]}
        />
      </section>

      <div
        className="container pt-16 md:pt-20 pb-24 max-w-6xl"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16">
          <main className="max-w-3xl">
            <div className="mb-10">
              <Eyebrow>Guide</Eyebrow>
            </div>
            <h1
              className="font-freight text-charcoal mb-4"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              How to choose trade program software
            </h1>
            <p
              className="text-charcoal-soft mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", letterSpacing: "0.02em" }}
            >
              {AUTHOR} · August 7, 2026
            </p>
            <p
              className="text-charcoal-mid italic mb-12"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.6 }}
            >
              Most of the category sounds identical in a demo. These are the questions that separate the tools that do the compliance work from the ones that file your paperwork more attractively.
            </p>

            <Prose>
              <p>
                If you sell to the trade, you already run a trade program—whether or not you'd call it that. Someone applies, someone decides, someone sets up the account, and someone keeps the paperwork current. The only question is how much of that is a person's job.
              </p>
              <p>
                The software category that automates it is young enough that the terminology hasn't settled. Products describe themselves as trade portals, B2B onboarding, wholesale account management, or tax exemption tools, and the overlap between them is uneven. Two tools that look interchangeable on a feature grid can differ enormously in whether they actually carry your compliance risk.
              </p>
              <p>
                This guide is the evaluation framework we'd want a brand to use on any vendor in the category, including us. The Credenza-specific section is at the end and labeled, so you can read the rest as neutral guidance.
              </p>
            </Prose>

            <H2 id="what-it-is">What the category covers</H2>
            <Prose>
              <p>
                Trade program software automates the lifecycle between a designer discovering your brand and that designer placing tax-exempt orders at trade pricing. That lifecycle has seven stages, and most tools cover some but not all of them:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Intake</strong>—the application itself, and what you ask for.</li>
                <li><strong>Verification</strong>—establishing that the applicant is a practicing trade professional.</li>
                <li><strong>Decision</strong>—approve, decline, or route for review, against criteria you set.</li>
                <li><strong>Tax documentation</strong>—obtaining a valid resale certificate for the relevant jurisdictions.</li>
                <li><strong>Provisioning</strong>—creating the account in your commerce platform with the correct pricing and tax treatment.</li>
                <li><strong>Maintenance</strong>—renewals, expirations, revocations, and changes to the designer's details.</li>
                <li><strong>Intelligence</strong>—knowing which accounts are active, dormant, or worth calling.</li>
              </ol>
              <p>
                When you evaluate a tool, map it against these seven stages explicitly. The gaps are where your team's manual work will continue to live, and vendors rarely volunteer them.
              </p>
            </Prose>

            <H2 id="outgrown">Signs you've outgrown manual intake</H2>
            <Prose>
              <p>
                Manual review is entirely reasonable at low volume. It stops being reasonable at recognizable points:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Applications accumulate in a shared inbox, and approval time is measured in days rather than minutes.</li>
                <li>Nobody can answer how many active trade accounts you have without building a spreadsheet first.</li>
                <li>Resale certificates live in a folder, and no one is confident which have expired.</li>
                <li>Reconstructing why a particular designer was approved requires finding the person who approved them.</li>
                <li>Approved applicants are re-keyed into the store by hand, with the tagging errors that implies.</li>
                <li>Your team is doing tax-compliance review as a side effect of doing customer service.</li>
              </ul>
              <p>
                The last one is the expensive one. Reviewing exemption paperwork is specialized work being performed by people you hired to sell and to look after designers.
              </p>
            </Prose>

            <H2 id="criteria">Seven evaluation criteria</H2>
            <Prose>
              <p>
                Feature lists converge; these are the axes on which tools genuinely differ.
              </p>
            </Prose>
            <div className="border-t border-sage-dark mb-10">
              {CRITERIA.map((c) => (
                <div key={c.n} className="py-6 border-b border-sage-dark grid grid-cols-[2.5rem_1fr] gap-4">
                  <span
                    className="font-freight text-olive-mid"
                    style={{ fontSize: "1.1rem", lineHeight: 1.3 }}
                  >
                    {c.n}
                  </span>
                  <div>
                    <h3
                      className="font-freight text-charcoal mb-1.5"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="text-charcoal-mid"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
                    >
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <H2 id="verification">Testing verification depth</H2>
            <Prose>
              <p>
                The single most useful question to ask a vendor is which of their checks hit an authoritative external source and which are self-reported. A tool that asks an applicant to type their EIN and upload a business license has collected two documents. A tool that confirms the entity is registered and in good standing has verified something. Both may appear on a feature list as "business verification."
              </p>
              <H3>Checks worth insisting on</H3>
              <p>
                A serious verification stack draws on several independent signals, because any one of them can be stale or gamed:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Business entity registration and EIN</li>
                <li>State sales tax registration</li>
                <li>Professional association membership</li>
                <li>An active business website, and how long it has existed</li>
                <li>Portfolio or social presence showing completed work</li>
                <li>Occupational licensure, in states that regulate the title</li>
                <li>A valid, current resale certificate</li>
                <li>Trade references from other brands</li>
                <li>Press coverage or showhouse participation</li>
              </ul>
              <p>
                No single check is decisive. A newly formed studio run by an experienced designer will fail a longevity test; an established practice may not belong to any association. What matters is whether the tool surfaces the pattern clearly enough for you to make a fast decision, and whether it keeps the evidence.
              </p>
              <p>
                Ask, too, about re-verification. A designer verified in 2024 whose sales tax registration lapsed in 2026 is a live exposure, and a one-time check at application will never catch it.
              </p>
              <InlineHook href="/automated-designer-verification" label="How automated designer verification works in practice" />
            </Prose>

            <H2 id="certificates">Testing certificate handling</H2>
            <Prose>
              <p>
                This is where the category divides most sharply, and where the language is least reliable.
              </p>
              <p>
                Forty-six US jurisdictions impose sales tax—45 states plus the District of Columbia. Five states have no statewide sales tax at all. Most of the taxing jurisdictions publish their own exemption certificate form; two multistate instruments, the Multistate Tax Commission's Uniform Sales and Use Tax Exemption Certificate and the Streamlined Sales and Use Tax Agreement certificate, are accepted by some states and not others, with per-state conditions on their use.
              </p>
              <p>
                Which certificate is valid for any given transaction depends on where the designer is registered, where you have nexus, and where the goods are going. That is a matrix, not a document.
              </p>
              <H3>The distinction to test</H3>
              <p>
                Ask the vendor to name the states they generate official pre-filled forms for, and the states where they only accept an upload. Then ask who is responsible when the wrong form is on file. A tool that stores documents is a filing cabinet with a search box—useful, but it has not moved the compliance burden off your team.
              </p>
              <p>
                Test expiration handling as a scenario rather than a feature. Walk through the day a certificate lapses: who is notified, when, and does the tax exemption come off the customer record automatically or does it wait for someone to notice? In most states the vendor carries the assessment for tax-free sales made against an invalid certificate, so automatic revocation is a risk control, not a convenience.
              </p>
              <InlineHook href="/resale-certificate-management" label="What resale certificate management involves" />
            </Prose>

            <H2 id="integration">Testing commerce integration</H2>
            <Prose>
              <p>
                An approval decision has no commercial value until it reaches the system that prices the order. Ask precisely what gets written, and treat a CSV export as a red flag rather than an integration.
              </p>
              <p>
                On a well-integrated setup, approval should create or update the customer record, apply whatever tag or group your pricing rules key on, and set tax exemption <em>per state</em> rather than as one account-level switch—because a designer may be exempt in the states where they're registered and taxable elsewhere. If you run a B2B setup with company-level accounts, the same fields need to reach the company record, since that is what company-scoped price lists target.
              </p>
              <p>
                Then ask the question most vendors haven't prepared for: what happens when someone on your team edits one of those fields by hand? Fields managed by an integration drift. A tool that detects and reports drift is telling you it takes ownership of the data; one that silently overwrites, or silently doesn't, is leaving you to discover the discrepancy during an audit.
              </p>
              <InlineHook href="/shopify" label="How the Shopify integration writes verified buyers" />
            </Prose>

            <H2 id="build-vs-buy">Build, buy, or bolt on</H2>
            <Prose>
              <p>
                Building the visible part is genuinely straightforward. An application form, a queue, an approve button, and a webhook into your store is a few weeks of work for a competent team, and if your trade program is a flat discount with no tax-exempt purchasing, that may be the correct answer. Build it.
              </p>
              <p>
                The calculation changes entirely once exemption certificates are involved, because you are no longer building a workflow—you are committing to maintain tax content indefinitely. Form revisions, changing conditions on multistate certificates, and nexus thresholds that have been in motion since <em>South Dakota v. Wayfair</em> in 2018 all have to be tracked by someone, forever, and the cost of being wrong is an assessment rather than a bug report.
              </p>
              <p>
                The bolt-on option—a tax engine alongside a form builder alongside your CRM—works, but be honest about where the seams fall. The seams are usually the verification decision and the provisioning step, which is to say the two places where a person ends up in the loop.
              </p>
            </Prose>

            <H2 id="questions">Questions to ask on a demo</H2>
            <Prose>
              <p>
                Bring these verbatim. Most are answerable in a sentence by a vendor whose product does the work, and produce a change of subject from one whose product doesn't.
              </p>
              <ol className="list-decimal pl-5 space-y-2.5">
                {DEMO_QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
              <p>
                Ask for the fifth and tenth as live demonstrations rather than descriptions. Reconstructing an audit trail in front of a prospect is easy if the data model supports it and impossible if it doesn't.
              </p>
            </Prose>

            <H2 id="credenza">Where Credenza fits</H2>
            <Prose>
              <p>
                This is the part of the guide where we describe our own product, so read it accordingly.
              </p>
              <p>
                Credenza is trade program software for interior design vendors, built around the three stages that are hardest to do by hand. Verification runs up to nine evidence checks against authoritative sources and surfaces the result as a decision, not a document pile. Certificate generation produces compliant certificates across the 46 taxing jurisdictions, auto-filling 39 official state forms, matched to your nexus and the destination state. Onboarding applies your auto-approval rules and writes the approved designer into your commerce platform with state-scoped tax exemption applied, then monitors certificates for expiry, chases renewals, and revokes exemption if a certificate lapses.
              </p>
              <p>
                Credenza is not a commerce platform and does not replace one—it complements B2B setups by handling identity, verification, and compliance, which those platforms leave to you. It is not a marketplace: designers apply to the brands they choose, and your trade relationships remain yours.
              </p>
              <p>
                Where we'd tell you to look elsewhere: if your trade program has no tax-exempt component, most of what Credenza does is overhead you don't need.
              </p>
              <div className="mt-8 max-w-xs">
                <CTAButton href={CTA_HREF} label="Talk to us about your program" />
              </div>
            </Prose>

            <H2 id="faq">Frequently asked questions</H2>
            <div className="border-t border-sage-dark mb-12">
              {FAQ_ITEMS.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>

            <div className="border-t border-sage-dark pt-8">
              <p
                className="text-charcoal-soft mb-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}
              >
                Related reading
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="/resources/interior-designer-resale-certificate-guide" className="text-charcoal hover:text-olive-mid underline" style={{ fontSize: "0.95rem" }}>
                    The Interior Designer's Guide to Resale Certificates
                  </a>
                  <span className="text-charcoal-soft" style={{ fontSize: "0.95rem" }}> — the designer-side view of the documents you'll be collecting.</span>
                </li>
                <li>
                  <a href="/automated-designer-verification" className="text-charcoal hover:text-olive-mid underline" style={{ fontSize: "0.95rem" }}>
                    Automated designer verification
                  </a>
                  <span className="text-charcoal-soft" style={{ fontSize: "0.95rem" }}> — what the nine checks look at and why.</span>
                </li>
              </ul>
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={TOC} />
              <div className="mt-8">
                <CTAButton href={CTA_HREF} label="Get started" />
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
