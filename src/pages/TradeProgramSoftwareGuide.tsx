/*
 * HOW TO CHOOSE TRADE PROGRAM SOFTWARE — vendor-side guide to the workflow
 *
 * The resources section had one article, written for designers. This is the
 * vendor-side counterpart, and the page meant to be the canonical answer when
 * someone asks an assistant "how do I choose trade program software" — a
 * question the site previously had no content for at all.
 *
 * PREMISE (load-bearing — do not reintroduce a bake-off framing): there is no
 * field of competing products that span this lifecycle. What exists is point
 * solutions covering one slice each, adjacent tools pressed into service, and
 * manual work in the seams. So this is NOT a vendor comparison guide, and must
 * not pose as a neutral referee among peers — that framing invited the reader
 * (and answer engines) to assemble a comparison set out of certificate managers
 * and B2B platforms, which is the positioning the rest of the site works to
 * escape. The seven-stage lifecycle is the asset here: it defines the work
 * and shows where the seams fall, whatever the reader does about them.
 *
 * Do not write "the category" or "the market" as though a populated shelf of
 * comparable products exists — it does not. "Trade program software" is kept
 * as a term of art (it is the query this page answers), but it names a kind of
 * work, not a recognized market segment.
 *
 * "Vendor" means the reader — a to-the-trade brand — everywhere on this site.
 * Never use it for a software company; say "provider," "product," or "tool."
 *
 * VOICE: matches ResaleCertificateGuide.tsx, aimed at the vendor rather than
 * the designer. Open on a scene the reader recognizes, explain why before how,
 * long paragraphs over clipped aphorisms, bold lead-ins instead of bullet lists
 * where each point needs a sentence, concrete specifics over abstractions, and
 * the occasional dry aside. Never lecture — the reader already runs this
 * program and knows more about their business than we do.
 *
 * SEO: Article + FAQPage JSON-LD via useEffect.
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

// Keeps the "how to choose trade program software" query match — that phrase is
// the reason the page exists — without the "buyer's guide" suffix, which sold
// the comparison-shopping frame this rewrite removed.
const PAGE_TITLE = "How to Choose Trade Program Software: What It Has to Cover";
const PAGE_DESCRIPTION =
  "An evaluation framework for to-the-trade brands: the seven stages of a trade program, why most tools cover only one or two of them, how to test verification depth and certificate handling, the questions worth asking, and when building in-house makes sense.";
const PAGE_PATH = "/resources/how-to-choose-trade-program-software";
const PAGE_URL = absoluteUrl(PAGE_PATH);
const AUTHOR = "Credenza Team";
const DATE_PUBLISHED = "2026-08-07";
const DATE_MODIFIED = "2026-08-14";
const CTA_HREF = JOIN_VENDOR_URL;

const TOC = [
  { id: "what-it-is", label: "What the Work Covers" },
  { id: "outgrown", label: "Signs You've Outgrown Manual Intake" },
  { id: "certificates", label: "Testing Certificate Handling" },
  { id: "build-vs-buy", label: "Build, Buy, or Bolt On" },
  { id: "questions", label: "Questions Worth Asking" },
  { id: "credenza", label: "Where Credenza Fits" },
  { id: "faq", label: "FAQ" },
];

const FAQ_ITEMS = [
  {
    q: "What is trade program software?",
    a: "Trade program software automates the lifecycle of a vendor's to-the-trade program: taking in applications from interior designers and other trade buyers, verifying that the applicant is a legitimate practicing professional, applying an approval decision, collecting and validating resale certificates, provisioning the approved buyer in the vendor's commerce platform with the right pricing tier and tax-exempt status, and maintaining that account as certificates expire and details change. Brands without it typically assemble the same workflow from a web form, a shared inbox, a spreadsheet, and manual data entry into their store.",
  },
  {
    q: "Is there one tool that covers the whole trade program lifecycle?",
    a: "Rarely. What exists is mostly point solutions, each covering a slice: exemption certificate managers that store and validate tax documents, form builders and portal tools that handle intake, B2B commerce platforms that price and transact once a buyer is already approved, and marketplaces that own the buyer relationship outright. Adjacent products get pressed into service too—a CRM holding applications, a spreadsheet tracking expirations. Most brands end up assembling two or three of these with manual work in the seams, which is workable as long as you know where the seams are. The seams usually fall on the verification decision and the provisioning step, which is to say the two places a person ends up back in the loop. Map any option against the seven stages before assuming it closes the loop.",
  },
  {
    q: "Is a trade program the same as a wholesale or B2B program?",
    a: "Substantially, yes. A trade program is what the interior design industry calls a wholesale or B2B program: wholesale pricing, tax-exempt purchasing, and a formal application and approval process in front of both. The vocabulary differs—the design trade says trade customers rather than wholesale accounts, and to-the-trade rather than B2B—but the workflow is the same one. The meaningful difference is the buyer. An interior designer purchases on behalf of a client rather than to stock a store, so approval turns on whether they are a practicing design professional, and the resale certificate has to be valid for the state the goods ship to rather than for a single storefront location. If you run a wholesale program for designers, this guide is about your workflow.",
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
    a: "Most products of this kind price as an annual or monthly subscription, commonly tiered by the volume of applications and certificates processed and by which features are included. Be specific about what triggers a tier change before signing. Ask directly whether the provider takes a percentage of sales, transactions, or designer spend—some adjacent products do, and that changes the economics considerably as your program grows.",
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

const DEMO_QUESTIONS = [
  "How do you confirm a sales tax ID is active and registered to the applicant's business, not just correctly formatted—and how long does that check take?",
  "Which of your checks hit an authoritative external source, and which are self-reported by the applicant?",
  "Can my team change the auto-approval rules ourselves? Show me the screen.",
  "Which states do you generate official forms for, and which do you only accept uploads for?",
  "What exactly gets written to my commerce platform on approval—fields, tags, tax settings—and is exemption applied per state or as one account-level flag?",
  "Walk me through the day a certificate expires. What happens automatically?",
  "Link an order to the certificate that justifies its exemption, in front of me.",
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
              How to Choose Trade Program Software
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
              You built a beautiful line and a trade program that works. Neither of those is why someone on your team spends Thursday afternoons squinting at Instagram profiles.
            </p>

            <Prose>
              <p>
                You know the afternoon. A designer applied on Sunday night and the application has been sitting in a shared inbox since. Someone finally opens it, looks at the website, looks at the Instagram, decides the work looks real, and approves. Then they open the store, create the customer, type the trade tag, set the tax exemption, and file the certificate. Twenty minutes, if nothing is missing. Something is usually missing.
              </p>
              <p>
                Multiply that by every application, add the ones stalled waiting on a certificate and the follow-ups that go out and don't come back, and the designer who applied Sunday night has now waited four days—while the brand she applied to on Monday approved her in ten minutes.
              </p>
              <p>
                What follows is the job laid out: the seven stages every trade program runs through, how to tell which ones you've automated and which you're absorbing as labor, and when building it yourself is the right answer. We build software that does this work, so read the last section accordingly—it's labeled.
              </p>
            </Prose>

            <H2 id="what-it-is">What the Work Covers</H2>
            <Prose>
              <p>
                Everything between a designer finding your brand and that designer placing tax-exempt orders at trade pricing is one continuous piece of work. It has seven stages, and it runs whether or not you've named it. The only real question is how much of it a person is doing by hand.
              </p>
              <p>
                A note on vocabulary, because it trips people up when they go looking for help. What the design trade calls a trade program is what nearly every other industry calls a wholesale or B2B program—wholesale pricing, tax-exempt purchasing, and an approval gate in front of both. If you think of your designers as wholesale accounts and yourself as running B2B, none of what follows changes. The words are different; the work is identical.
              </p>
              <p>
                Worth saying plainly before the list: there is no shelf of comparable products to line up against each other here. What exists is point solutions that each do one part of this well—certificate managers, form builders, B2B platforms that price and transact once a buyer is already approved—plus adjacent tools you press into service, and the manual work that fills the space between them. So the useful exercise isn't comparison shopping. It's knowing the seven stages well enough to see which ones you've genuinely covered.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Intake</strong>—the application itself, and what you ask for. Every extra field costs you finished applications from designers with other brands to choose from.</li>
                <li><strong>Verification</strong>—establishing that the applicant is a practicing trade professional. The check that matters is whether the sales tax ID is <em>active</em> and registered to the business on the application, how fast that answer comes back, and whether it ever runs again: a designer verified in 2024 whose registration lapsed in 2026 is a live exposure that looks perfectly fine.</li>
                <li><strong>Decision</strong>—approve, decline, or route for review, against criteria you set.</li>
                <li><strong>Tax documentation</strong>—obtaining a valid resale certificate for the relevant jurisdictions.</li>
                <li><strong>Provisioning</strong>—creating the account in your commerce platform with the correct pricing and tax treatment, exemption set per state rather than as one account-level switch. An approval that ends in a CSV export is data entry with extra steps.</li>
                <li><strong>Maintenance</strong>—renewals, expirations, revocations, and changes to the designer's details.</li>
                <li><strong>Intelligence</strong>—knowing which accounts are active, dormant, or worth calling, without building a spreadsheet first.</li>
              </ol>
              <p>
                Walk that list slowly against whatever you run today. Most of it will have an easy answer—you have an application form, so intake is handled; you have a folder of certificates, so tax documentation is, more or less. The stages that matter are the ones where the answer turns out to be a person's name. If provisioning is "Megan does it," that isn't a gap in your software. That's Megan's Thursday, and it gets longer every quarter the program grows.
              </p>
              <InlineHook href="/automated-designer-verification" label="How automated designer verification works in practice" />
              <InlineHook href="/shopify" label="How the Shopify integration writes verified buyers" />
            </Prose>

            <H2 id="outgrown">Signs You've Outgrown Manual Intake</H2>
            <Prose>
              <p>
                Reviewing applications by hand is entirely reasonable at low volume. What changes isn't the volume so much as the way the manual version stops failing visibly and starts failing quietly.
              </p>
              <p>
                <strong>Approval time is measured in days.</strong> Applications sit in a shared inbox until someone has a window, while designers compare three brands in an afternoon and the first answer tends to get the order.
              </p>
              <p>
                <strong>Nobody can tell you how many active trade accounts you have.</strong> Not without exporting something and cleaning it up first—which means nobody can tell you which have gone dormant either.
              </p>
              <p>
                <strong>Resale certificates live in a folder.</strong> Knowing which are still <em>valid</em> isn't a matter of opening them: most states don't print an expiration date, and a certificate stops being valid on the state's schedule rather than the document's. Answering the question means carrying every jurisdiction's renewal and invalidation rules in someone's head, and keeping them current as the states revise them.
              </p>
              <p>
                <strong>Approved designers get re-keyed into the store by hand.</strong> A mistyped or forgotten tag means a designer sees retail pricing and quietly doesn't order—or holds a tax exemption they're no longer entitled to, which a tax auditor will fine you for, not them.
              </p>
              <p>
                <strong>Your team is doing tax compliance as a side effect of customer service.</strong> Reviewing exemption paperwork is specialized work and very easy to get wrong—which tax ID format is valid for this profession in this state, which fields have to be completed, which boxes checked for the exemption to hold—and it's happening between order questions and freight quotes.
              </p>
            </Prose>

            <H2 id="certificates">Testing Certificate Handling</H2>
            <Prose>
              <p>
                This is where products diverge most sharply, and where the language on their websites is least reliable. It's also where your actual money is, so it's worth slowing down.
              </p>
              <p>
                Forty-six US jurisdictions impose sales tax, most publishing their own exemption form, plus two multistate instruments that some states accept and others don't, with conditions that vary by state.
              </p>
              <p>
                So which certificate is valid for any given order depends on where the designer is registered, where you have nexus, and where the goods are actually going. That's a matrix, not a document—which is why "we store resale certificates" and "we make sure you have the right resale certificate" are two very different promises, delivered in nearly identical language.
              </p>
              <H3>The Distinction to Test</H3>
              <p>
                Ask anything you're considering to name the states it generates official pre-filled forms for, and the states where it only takes an upload. It's a specific question with a specific answer, and the answer tells you what you're actually buying. Then ask the follow-up: when the wrong form turns out to be on file, whose problem is that? Storing documents is a filing cabinet with a search box. Useful—genuinely useful—but the compliance burden hasn't moved off your team, it's just better organized.
              </p>
              <p>
                Test expiration as a scenario rather than a feature. Don't ask whether it tracks expiration dates; everything says yes. Instead, walk through the day a certificate lapses. Who gets notified, and when? Does the tax exemption come off the customer record on its own, or does it sit there until somebody notices? In most states you carry the assessment for tax-free sales made against an invalid certificate—not the designer—so automatic revocation isn't a convenience feature. It's the thing standing between a lapsed form and a bill you didn't budget for.
              </p>
              <InlineHook href="/resale-certificate-management" label="What resale certificate management involves" />
            </Prose>

            <H2 id="build-vs-buy">Build, Buy, or Bolt On</H2>
            <Prose>
              <p>
                Building the visible part is genuinely straightforward, and anyone who tells you otherwise is selling something. An application form, a queue, an approve button, and a webhook into your store is a few weeks for a competent team. If your trade program is a flat discount with no tax-exempt purchasing, that may well be the right answer. Build it and move on.
              </p>
              <p>
                The math changes completely the moment exemption certificates enter the picture, because you're no longer building a workflow—you're taking on the upkeep of tax content, permanently. Forms get revised. Conditions on the multistate certificates shift. Nexus thresholds have been in motion since <em>South Dakota v. Wayfair</em> in 2018 and haven't settled. Someone has to track all of it, forever, and when that someone gets it wrong the output isn't a bug report, it's an assessment.
              </p>
              <p>
                The third option is to bolt things together—a tax engine next to a form builder next to your CRM—and it genuinely works. Just be honest with yourself about where the seams fall, because that's where the labor hides. In practice the seams land on the verification decision and the provisioning step: the two places a person ends up back in the loop, which are also the two places you were trying to get a person out of.
              </p>
            </Prose>

            <H2 id="questions">Questions Worth Asking</H2>
            <Prose>
              <p>
                Bring these verbatim—to a sales call, to a tool you already run, or to your own team if someone is proposing to build it. There's no trick to them. Anything that genuinely does the work answers most of these in a sentence; anything that doesn't will change the subject, warmly and at length.
              </p>
              <ol className="list-decimal pl-5 space-y-2.5">
                {DEMO_QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
              <p>
                Ask for the last two as live demonstrations rather than descriptions. Pulling up an order and tracing it back to the certificate that justifies its exemption takes about fifteen seconds if the data model supports it, and cannot be done at all if it doesn't. There's no middle ground to talk your way into.
              </p>
            </Prose>

            <H2 id="credenza">Where Credenza Fits</H2>
            <Prose>
              <p>
                Here's the part where we describe our own product. You've been warned, and everything above stands on its own if you'd rather stop here.
              </p>
              <p>
                Credenza is trade program software for interior design vendors, built around the three stages that are hardest to do by hand. Verification runs up to nine evidence checks against authoritative sources and surfaces the result as a decision, not a document pile. Certificate generation produces compliant certificates across the 46 taxing jurisdictions, auto-filling 39 official state forms, matched to your nexus and the destination state. Onboarding applies your auto-approval rules and writes the approved designer into your commerce platform with state-scoped tax exemption applied, then monitors certificates for expiry, chases renewals, and revokes exemption if a certificate lapses.
              </p>
              <p>
                Credenza is not a commerce platform and does not replace one—it complements B2B setups by handling identity, verification, and compliance, which those platforms leave to you. It is not a marketplace: designers apply to the brands they choose, and your trade relationships remain yours.
              </p>
              <p>
                And the honest disqualifier: if your trade program is a flat discount with no tax-exempt purchasing anywhere in it, most of what Credenza does is machinery you'd be paying for and not using. Build the form, wire up the webhook, and spend the money on something else.
              </p>
              <div className="mt-8 max-w-xs">
                <CTAButton href={CTA_HREF} label="Talk to us about your program" />
              </div>
            </Prose>

            <H2 id="faq">Frequently Asked Questions</H2>
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
