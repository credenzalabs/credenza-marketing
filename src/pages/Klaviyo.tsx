/*
 * CREDENZA — KLAVIYO INTEGRATION (vendor-facing wedge page)
 *
 * Positioning: Shopify's page is about getting a verified buyer *in*. This one
 * is about what happens after — the trade account exists, and the question
 * becomes which accounts are needing attention and how to reach them. Klaviyo owns
 * the sending; Credenza owns the reason to send, because it is the only system
 * that combines trade applications, enriched firm data, and order history.
 *
 * Source-of-truth alignment: everything claimed here matches the trade app's
 * implementation, and the specifics are load-bearing —
 *   - Connection is a scoped Klaviyo PRIVATE API KEY (Custom Key, six named
 *     scopes), not OAuth. See KlaviyoSetupGuide.tsx.
 *   - Segment labels and definitions are the real opportunity segments from the
 *     Member Health view (MemberHealth.tsx). Do not invent new ones here.
 *   - Sync is one-shot by default; "sync nightly" is opt-in. Ad-hoc Trade
 *     Directory selections can't be kept in sync because there is no saved
 *     definition to re-derive.
 *   - Engagement flows back HOURLY (cron-klaviyo-activity-sync), not nightly.
 *     The nightly job is the list refresh.
 *
 * TONE: this page sells. The mechanics that exist to keep a vendor out of
 * trouble — marketing-consent handling, per-tenant scoping of a sync, profile
 * counts against Klaviyo billing — are real and correct, and they belong in the
 * product, the docs, and the privacy policy (which covers Klaviyo consent
 * explicitly). They do not belong here: naming a risk to a prospect who wasn't
 * worried about it is how you introduce the objection rather than answer it.
 * Keep this page on what the integration wins them.
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. Core value (why connect them) + SyncModalMock
 *   3. What the integration does (three capabilities)
 *   4. From insight to action (four steps) — dark band
 *   5. Engagement comes back + ActivityFeedMock
 *   6. Use cases
 *   7. FAQ (FAQPage schema fuel, and the definition passage)
 *   8. Close (conversion CTA)
 *
 * SEO: Page-scoped FAQPage + TechArticle JSON-LD via useEffect.
 */

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  FlaskConical,
  HeartHandshake,
  Repeat2,
  RotateCcw,
  Send,
  UserMinus,
  UserX,
  X,
} from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { JOIN_VENDOR_URL, C } from "@/lib/constants";
import { usePageMeta, absoluteUrl } from "@/hooks/usePageMeta";
import { withCredenzaUtm } from "@/utils/utm";

const HERO_IMAGE = {
  src: "/casita-mural-chair.jpg",
  alt: "Painted garden mural with a single chair in a 1920's casita",
  position: "center 88%",
  credits: [
    { text: "© " },
    { text: "Carmel Brantley", href: withCredenzaUtm("https://www.brantleyphotography.com/", "photo-credit", "klaviyo-hero") },
    { text: " (design by " },
    { text: "Caroline Rafferty Interiors", href: withCredenzaUtm("https://www.carolinerafferty.com/", "designer-credit", "klaviyo-hero") },
    { text: ")" },
  ],
};

const PAGE_TITLE = "Credenza + Klaviyo | Sync Trade Accounts & Marketing Segments";
const PAGE_DESCRIPTION =
  "Turn Credenza's ready-made trade opportunity segments into targeted Klaviyo campaigns and see engagement alongside each firm's trade activity.";
const PAGE_PATH = "/integrations/klaviyo";
const CANONICAL_URL = absoluteUrl(PAGE_PATH);

/* A sample of the opportunity segments, verbatim from the Member Health view in
   the vendor dashboard — six is what fits the mock, NOT the whole set. Member
   Health also carries expiring certs among active buyers and top firms by
   revenue, and the Revenue Drivers cohorts (new, reactivated, retained, lapsed)
   are syncable too; the full list is the RPC key table in the
   vendor_klaviyo_list_subscriptions migration. Copy on this page must say "a
   few of them" or similar rather than presenting these as the complete orbit.
   The label and the definition are what a vendor actually sees on that screen,
   so they stay in step. */
const SEGMENTS: Array<{
  label: string;
  detail: string;
  /* Icon and tone mirror the dashboard card exactly — value (teal), ops
     (olive), compliance (rust). Counts and dollar figures are illustrative. */
  Icon: typeof HeartHandshake;
  tone: "tealDark" | "olive" | "compliance";
  firms: number;
  value?: string;
}> = [
  { label: "Dormant VIPs", detail: "Top-quartile buyers with no order or sample in six months", Icon: HeartHandshake, tone: "tealDark", firms: 38, value: "$1.2M" },
  { label: "Recently lapsed", detail: "Bought last period, but not this one", Icon: UserMinus, tone: "tealDark", firms: 24, value: "$486K" },
  { label: "Sampling, not buying", detail: "Requested samples recently, no paid order in six months", Icon: FlaskConical, tone: "tealDark", firms: 51 },
  { label: "One and done", detail: "Bought exactly once—a nudge could earn a second order", Icon: Repeat2, tone: "olive", firms: 67 },
  { label: "Approved, no first order", detail: "Approved 30+ days ago and never placed a paid order", Icon: UserX, tone: "olive", firms: 43 },
  { label: "Reactivated", detail: "Came back and bought again after a six-month lull", Icon: RotateCcw, tone: "tealDark", firms: 17, value: "$540K" },
];

const CAPABILITIES: Array<{ title: string; body: string }> = [
  {
    title: "Ready-made opportunity segments",
    body: "Credenza reads order history against the trade application and enriched firm data behind it—context your store doesn't carry—to surface the accounts needing attention. Sync any of them straight to Klaviyo.",
  },
  {
    title: "Choose the audience, not the logic",
    body: "Start from opportunity segments in Member Health, or filter the Trade Directory yourself. You pick who to activate; Credenza maintains the logic.",
  },
  {
    title: "See engagement in context",
    body: "Opens and clicks flow back onto each firm's record in Credenza, so your sales team sees which campaigns a firm reads—without a seat in your marketing tool.",
  },
];

/* Three beats, one per clause of the section headline — find the opportunity,
   build the audience, run the campaign. A fourth "Credenza closes the loop"
   step used to live here and was cut: the section immediately below is that
   step, at length and with the firm record to show for it. */
const STEPS: Array<{ title: string; body: string }> = [
  {
    title: "Credenza spots the signal.",
    body: "Firms go quiet, sample and stall, get approved and never order. Credenza keeps the segments current.",
  },
  {
    title: "Your team picks the segment.",
    body: "Open an opportunity segment, or filter the Trade Directory yourself. Credenza shows you exactly who's in it.",
  },
  {
    title: "The audience lands in Klaviyo.",
    body: "Push it once for a single campaign, or keep it synced nightly so your flows always fire against a current list.",
  },
];

const USE_CASES: Array<{ title: string; body: string }> = [
  {
    title: "High-value firms gone quiet",
    body: "Identify top-quartile buyers who haven't placed an order or requested a sample in six months, and sync them to a dedicated Klaviyo list for personalized, high-touch re-engagement.",
  },
  {
    title: "Sampling, not buying",
    body: "Target warm accounts that recently requested memos or finish samples but haven't converted to a paid order. Sync the segment and trigger a campaign built to close that specific gap.",
  },
  {
    title: "The one-and-done push",
    body: "Isolate firms that placed exactly one order. Sync them to Klaviyo and send a nurture sequence designed to turn a trial buyer into a repeat trade customer.",
  },
  {
    title: "Approved, no first order",
    body: "Find designers approved 30+ days ago who never placed a paid order. Push them to a campaign that reminds them of their trade pricing, their account manager, and how to order.",
  },
];

/* Answer-engine fuel, and the page's only question-shaped content — a model
   asked "how does Credenza work with Klaviyo" lifts a passage, and without
   these there was none to lift. The first answer doubles as the definition
   paragraph.

   These follow the page's TONE rule, not the product's full surface area:
   consent handling, per-tenant scoping, and Klaviyo profile billing are real,
   correct, and answered in the product and the privacy policy. A prospect
   reading a sales page did not ask about them, and putting them here plants the
   objection instead of answering it. Keep new entries on capability. */
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What does the Credenza Klaviyo integration do?",
    a: "It turns your trade program into audiences you can campaign against. Credenza holds the trade application, the enriched firm record, and the order history for every account in your program, and reads them together to maintain opportunity segments defined in trade terms—Dormant VIPs, Sampling not buying, and Approved no first order are a few of them. Any segment, or any filtered view of your Trade Directory, syncs to a Klaviyo list in a few clicks. Engagement on the campaigns you send then flows back onto each firm's record in Credenza.",
  },
  {
    q: "Which audiences can I send to Klaviyo?",
    a: "Two starting points. Member Health in Insights gives you maintained opportunity segments, defined in trade terms rather than generic ecommerce ones—top-quartile buyers who have gone quiet, firms that sampled without ordering, designers approved 30+ days ago who never placed a first order. The Trade Directory lets you filter your accounts however you like and sync that selection directly. Credenza shows you exactly which firms are in a segment before anything is sent.",
  },
  {
    q: "How do I connect Klaviyo to Credenza?",
    a: "With a private API key created in your own Klaviyo account, under Settings then API keys. Credenza asks for a Custom Key with six named scopes and tells you what each one is for: enough to find or create the list you're syncing to, add profiles to it, and read engagement events back. Setup takes a couple of minutes and you can disconnect at any time.",
  },
  {
    q: "Does a synced list stay current on its own?",
    a: "If you want it to. A push is a one-time snapshot by default, which suits a single targeted campaign. Choosing \"sync this list nightly\" on a maintained segment re-derives it every night and updates the Klaviyo list to match, so an automated flow always fires against a current audience rather than a list that was accurate the week you built it.",
  },
  {
    q: "What comes back from Klaviyo into Credenza?",
    a: "Email engagement—sends, opens, clicks, bounces, and unsubscribes—is pulled hourly and written onto the matching firm's record in Credenza, each event named with the campaign it came from. It appears under Activity on the firm profile, a tab from that firm's team, certificates, and verification.",
  },
  {
    q: "Do I need Shopify connected to use the Klaviyo integration?",
    a: "No—the two integrations are independent and either runs on its own. What the segments do need is a source of order history, since most of them are defined by what a firm has or hasn't bought: Credenza reads orders from your connected store, or from client and order data you import. Audiences built on application and approval state instead—every firm approved this quarter, or any filtered slice of your Trade Directory—work as soon as your trade program is running in Credenza.",
  },
];

export default function KlaviyoPage() {
  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });

  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.dataset.pageSchema = "klaviyo-faq";
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
    articleSchema.dataset.pageSchema = "klaviyo-article";
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Credenza + Klaviyo: sync trade accounts and marketing segments",
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
        { "@type": "Thing", name: "Klaviyo trade segments" },
        { "@type": "Thing", name: "Trade program marketing" },
        { "@type": "Thing", name: "Designer re-engagement campaigns" },
        { "@type": "Thing", name: "Trade account lifecycle" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "To-the-trade brands running a trade program and marketing to interior designers",
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
      <EngagementLoop />
      <UseCases />
      <FAQ />
      <Close />
      <Footer />
    </div>
  );
}

// Eyebrow variant that leads with the Klaviyo wordmark instead of spelling it
// out, matching the rule + small-caps rhythm of the shared <Eyebrow>.
function KlaviyoEyebrow() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "2rem", height: 1, backgroundColor: C.sageDark, flexShrink: 0 }} />
      <img src="/logo-klaviyo.png" alt="Klaviyo" style={{ height: 17 }} className="block w-auto" />
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
          {/* Copy — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
            <KlaviyoEyebrow />
            <h1
              className="font-freight mb-8 leading-none text-charcoal"
              style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Turn trade program
              <br />
              insights into
              <br />
              <span className="italic text-olive-mid">targeted campaigns</span>.
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
              Credenza surfaces the trade accounts needing attention. Send those
              ready-made segments to Klaviyo, then turn program intelligence into
              targeted campaigns and revenue.
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
              Connect with a scoped API key · Push a segment once or keep the list
              synced nightly · Opens and clicks come back to each firm's activity feed.
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
   2. CORE VALUE — why connect them, beside the real sync preview
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
              Approving a designer is the start.{" "}
              <span className="italic text-olive-mid">Growing the account is the job.</span>
            </h2>
            <p
              className="mb-5 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Connecting Klaviyo closes the gap between program insight and marketing
              execution. Because Credenza already combines trade applications, enriched
              firm data, and order history, it can identify commercially meaningful
              audiences your team would otherwise have to define, compile, and maintain
              themselves.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Pick a segment, preview exactly who's in it, and send it to a Klaviyo
              list. No CSV exports, no spreadsheet handoff, no one on your team
              becoming an insights analyst.
            </p>
          </div>
          <div className="lg:col-span-6">
            <SyncModalMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* The pre-sync preview a vendor actually sees: who's already in Klaviyo, who
   isn't, what happens to consent, and the opt-in for a nightly refresh. The
   numbers are illustrative; the panels and the language are the product's. */
function SyncModalMock() {
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
            Insights · Member health
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: C.charcoalSoft }}
        >
          Sync to
          <img src="/logo-klaviyo.png" alt="Klaviyo" style={{ height: 11 }} className="block w-auto" />
        </span>
      </div>

      <div className="px-7 py-7">
        <div
          className="font-freight text-charcoal mb-1"
          style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.015em" }}
        >
          Dormant VIPs
        </div>
        <div
          className="mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          Top-quartile buyers with no order or sample in six months
        </div>

        {/* List name field */}
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
          List name
        </div>
        <div
          className="mb-2"
          style={{
            padding: "8px 11px",
            border: `0.5px solid ${C.sageDark}`,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: C.charcoal,
          }}
        >
          Trade · Dormant VIPs
        </div>
        <div
          className="mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          Creates a new list in your Klaviyo account.
        </div>

        {/* Preview counts */}
        <div
          className="text-charcoal mb-3"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500 }}
        >
          38 firms match this segment
        </div>
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="flex items-start gap-2.5">
            <Check size={14} className="shrink-0" style={{ color: C.tealMid, marginTop: 2 }} />
            <span
              style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.charcoalMid, lineHeight: 1.6 }}
            >
              31 firms are already in your Klaviyo account
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={14} className="shrink-0" style={{ color: C.tealMid, marginTop: 2 }} />
            <span
              style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.charcoalMid, lineHeight: 1.6 }}
            >
              7 new profiles will be created, with firm and contact details
            </span>
          </div>
        </div>

        {/* Nightly sync opt-in */}
        <div className="flex items-start gap-2.5" style={{ paddingTop: 14, borderTop: `0.5px solid ${C.sageDark}` }}>
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 14,
              height: 14,
              backgroundColor: C.charcoal,
              marginTop: 2,
            }}
          >
            <Check size={9} style={{ color: "white" }} />
          </div>
          <div>
            <div
              className="text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, lineHeight: 1.4 }}
            >
              Sync this list nightly
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11.5,
                color: C.charcoalSoft,
                marginTop: 3,
                lineHeight: 1.55,
              }}
            >
              Credenza keeps the list current as firms move in and out of the segment.
            </div>
          </div>
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
            Activate your trade intelligence
            <br />
            <span className="italic text-olive-mid">without rebuilding it.</span>
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

        <div className="mt-20">
          <SegmentsMock />
        </div>
      </div>
    </section>
  );
}

/* The Opportunity segments panel as it appears in the vendor dashboard, rather
   than a marketing paraphrase of it: same card anatomy (tinted icon disc, count
   in the display face, label, revenue at risk, definition underneath, arrow),
   same tone colors, same two-column grid. A vendor should recognize the screen
   before they read a word of it. Mirrors OpportunityCard in MemberHealth.tsx —
   if that card is restyled, restyle this one with it. */
const INSIGHTS = {
  border: "#ece9e3",
  charcoal: "#1A1A1A",
  subtle: "#6b6862",
  muted: "#a8a49c",
  ivory: "#FAF9F7",
  tealDark: "#6BA3A9",
  olive: "#8B8B55",
  compliance: "#b06a4f",
};

function SegmentsMock() {
  return (
    <div
      className="bg-white"
      style={{ border: `0.5px solid ${C.sageDark}`, boxShadow: "0 2px 24px rgba(33,53,63,0.06)" }}
    >
      <div className="px-5 md:px-7 pt-6 pb-7">
        {/* Insights' own tab strip, not an invented window bar: charcoal on the
            active tab with a 2px olive underline, muted elsewhere, over a hairline
            rule. Matches VendorInsights.tsx. */}
        <div className="flex gap-6 mb-7" style={{ borderBottom: `1px solid ${INSIGHTS.border}` }}>
          {[
            { label: "Overview", active: false },
            { label: "Member Health", active: true },
            { label: "Sample Conversion", active: false },
          ].map((tab) => (
            <span
              key={tab.label}
              className="relative pb-3"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: tab.active ? INSIGHTS.charcoal : INSIGHTS.muted,
              }}
            >
              {tab.label}
              {tab.active && (
                <span
                  className="absolute left-0 right-0"
                  style={{ bottom: -1, height: 2, backgroundColor: INSIGHTS.olive }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
          <div
            style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: INSIGHTS.charcoal }}
          >
            Opportunity segments
          </div>
          {/* The member-window control: a small-caps label beside a select.
              Drawn, not functional — it's a picture of the screen. */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: INSIGHTS.muted,
              }}
            >
              Member window
            </span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: INSIGHTS.charcoal,
                backgroundColor: "#fff",
                border: `1px solid ${INSIGHTS.border}`,
                borderRadius: 2,
                padding: "3px 8px",
              }}
            >
              12 months
              <ChevronDown size={11} style={{ color: INSIGHTS.muted }} />
            </span>
          </div>
        </div>
        <div
          className="mb-4"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: INSIGHTS.muted }}
        >
          Accounts needing attention, ranked by commercial relevance. Open any to see the firms.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEGMENTS.map((segment) => (
            <SegmentCard key={segment.label} segment={segment} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SegmentCard({ segment }: { segment: (typeof SEGMENTS)[number] }) {
  const color = INSIGHTS[segment.tone];
  const Icon = segment.Icon;
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5"
      style={{ backgroundColor: "#fff", border: `1px solid ${INSIGHTS.border}` }}
    >
      <span
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{ width: 32, height: 32, marginTop: 2, backgroundColor: `${color}18` }}
      >
        <Icon size={16} strokeWidth={2} style={{ color }} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-freight"
            style={{ fontSize: 27, lineHeight: 1, color: INSIGHTS.charcoal, fontVariantNumeric: "tabular-nums" }}
          >
            {segment.firms}
          </span>
          <span
            style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: INSIGHTS.charcoal }}
          >
            {segment.label}
          </span>
          {segment.value && (
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {segment.value}
            </span>
          )}
        </div>
        <div
          style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.4, color: INSIGHTS.subtle, marginTop: 4 }}
        >
          {segment.detail}
        </div>
      </div>
      <ArrowRight size={14} className="shrink-0" style={{ color, marginTop: 4 }} />
    </div>
  );
}

/* =========================================================================
   4. STEPS — from insight to action
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
          <div style={eyebrowStyle}>From insight to action</div>
          <h2
            className="font-freight"
            style={{
              fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#f0f0ec",
            }}
          >
            Find the opportunity. Build the audience.
            <br />
            <span className="italic" style={{ color: C.teal }}>
              Run the campaign.
            </span>
          </h2>
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12"
          style={{ borderTop: "0.5px solid rgba(240,240,236,0.22)" }}
        >
          {/* The moment the section is actually about: a segment opened, and the
              one button that sends it. */}
          <div className="lg:col-span-6">
            <SegmentModalMock />
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

/* The segment modal a vendor opens off an Opportunity segment card: the firms
   in the cohort, and the footer that acts on all of them. "Sync to List" is the
   entry point to everything else on this page, so it belongs on the page.
   Mirrors SegmentModal.tsx — firm name in teal, value right-aligned and muted,
   Export CSV beside Sync to List, no rule above the footer. */
const SEGMENT_MODAL_ROWS: Array<[string, string]> = [
  ["Hayes & Howe Design", "$84K"],
  ["Marchetti Studio", "$61K"],
  ["Fern & Oak Interiors", "$52K"],
  ["Sutro Design Co.", "$47K"],
  ["Bellweather Interiors", "$39K"],
];

function SegmentModalMock() {
  return (
    <div
      className="w-full max-w-[440px]"
      style={{
        backgroundColor: "#fff",
        border: `1px solid ${INSIGHTS.border}`,
        borderRadius: 3,
        boxShadow: "0 18px 48px rgba(0,0,0,0.28)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 pt-4 pb-3 flex items-start justify-between gap-4"
        style={{ borderBottom: `1px solid ${INSIGHTS.border}` }}
      >
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: INSIGHTS.charcoal }}>
            Dormant VIPs
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: INSIGHTS.subtle, marginTop: 2 }}>
            38 firms · $1.2M
          </div>
        </div>
        <X size={16} className="shrink-0" style={{ color: INSIGHTS.muted }} />
      </div>

      {/* Firms */}
      <div className="px-5 py-1">
        {SEGMENT_MODAL_ROWS.map(([name, value], i) => (
          <div
            key={name}
            className="flex items-center justify-between gap-4 py-2"
            style={{ borderTop: i > 0 ? `1px solid ${INSIGHTS.border}` : undefined }}
          >
            <span
              className="truncate"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: INSIGHTS.tealDark }}
            >
              {name}
            </span>
            <span
              className="shrink-0"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: INSIGHTS.muted,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {value}
            </span>
          </div>
        ))}
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: INSIGHTS.muted, padding: "8px 0" }}>
          Showing the top 5 of 38 by value.
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 flex items-center justify-end gap-2">
        <ModalButton icon={<Download size={12} />}>Export CSV</ModalButton>
        <ModalButton icon={<Send size={12} />}>Sync to List</ModalButton>
      </div>
    </div>
  );
}

function ModalButton({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        fontWeight: 500,
        color: INSIGHTS.charcoal,
        backgroundColor: "#fff",
        border: `1px solid ${INSIGHTS.border}`,
        borderRadius: 2,
        padding: "6px 11px",
      }}
    >
      {icon}
      {children}
    </span>
  );
}

/* =========================================================================
   5. ENGAGEMENT LOOP — what comes back, and where it lands
   ========================================================================= */
function EngagementLoop() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Eyebrow>The loop closes</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              Engagement lands on the account,{" "}
              <span className="italic text-olive-mid">not in a separate report.</span>
            </h2>
            <p
              className="mb-5 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Sends, opens, clicks, bounces, and unsubscribes are pulled from Klaviyo
              every hour and written onto the firm's own record in Credenza, under
              Activity—each one named with the campaign it came from.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Email engagement normally lives in the marketing tool, behind a seat your
              sales side doesn't have. Credenza gives them visibility into it on the
              trade account itself—a tab from the firm's team, its certificates, and its
              verification.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ActivityFeedMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* The Activity tab on a firm's record. Faithful in a way that matters: this
   feed is Klaviyo-only. It renders vendor_firm_activities, whose types are all
   campaign_* — there are no orders, samples, or certificates in it, and the
   labels are the ones ACTIVITY_LABELS defines ("Opened an email", not "Opened
   email"). Mirrors ActivityTab in FirmProfileTabs.tsx. */
const FIRM_TABS = ["Overview", "Team (4)", "Certificates (2)", "Activity", "Verification"];

/* Dot colors are the product's: muted grey for passive events, a green for the
   ones a vendor should notice. */
const ACTIVITY_ROWS: Array<{ label: string; detail: string; when: string; dot: string }> = [
  { label: "Clicked an email", detail: "Spring Collection Preview", when: "Mar 4", dot: "#7A8B6F" },
  { label: "Opened an email", detail: "Spring Collection Preview", when: "Mar 3", dot: "#7A8B6F" },
  { label: "Received an email", detail: "Spring Collection Preview", when: "Mar 3", dot: "#C8C4BC" },
  { label: "Opened an email", detail: "New from the atelier", when: "Feb 19", dot: "#7A8B6F" },
  { label: "Received an email", detail: "New from the atelier", when: "Feb 18", dot: "#C8C4BC" },
];

function ActivityFeedMock() {
  return (
    <div
      className="bg-white"
      style={{ border: `1px solid #E8E8E8`, boxShadow: "0 2px 24px rgba(33,53,63,0.06)" }}
    >
      <div className="px-6 md:px-7 pt-6 pb-7">
        {/* Firm header */}
        <div
          className="font-freight text-charcoal"
          style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.015em" }}
        >
          Hayes &amp; Howe Design
        </div>
        <div
          style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#737373", marginTop: 4 }}
        >
          New York, NY · Approved · Est. 2014
        </div>

        {/* The firm record's own tab strip: charcoal on the active tab over a
            2px teal underline, matching FirmProfilePage.tsx. */}
        <div className="flex mt-6 mb-1 overflow-x-auto" style={{ borderBottom: "1px solid #E8E8E8" }}>
          {FIRM_TABS.map((tab) => {
            const active = tab === "Activity";
            return (
              <span
                key={tab}
                className="px-3 md:px-4 py-2.5 whitespace-nowrap"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? "#1A1A1A" : "#737373",
                  borderBottom: active ? "2px solid #A9CFD3" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {tab}
              </span>
            );
          })}
        </div>

        <div className="pt-5">
          {ACTIVITY_ROWS.map((row, i) => (
            <div
              key={`${row.label}-${row.when}-${i}`}
              className="flex items-start gap-3 py-2.5"
              style={{ borderBottom: i < ACTIVITY_ROWS.length - 1 ? "1px solid #E8E8E8" : undefined }}
            >
              <span
                className="shrink-0"
                style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: row.dot, marginTop: 7 }}
              />
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1A1A1A" }}>
                  {row.label}
                </div>
                <div
                  className="truncate"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#737373", marginTop: 1 }}
                >
                  {row.detail}
                </div>
              </div>
              <span
                className="shrink-0"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#888", marginTop: 2 }}
              >
                {row.when}
              </span>
            </div>
          ))}
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
            Grow your trade channel
            <br />
            <span className="italic text-olive-mid">with targeted segments.</span>
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
                {/* Rendered always, hidden with CSS when collapsed — see the
                    same fix on /shopify. Conditional mounting kept the answers
                    out of the prerendered HTML while the FAQPage schema
                    asserted them. */}
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
   8. CLOSE — conversion CTA
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
              src="/thomas-loof-ombre-living.jpg"
              alt="Living room by Amy Lau Design"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 60%" }}
            />
            <PhotoCredit
              separator=""
              credits={[
                { text: "© " },
                { text: "Thomas Loof", href: withCredenzaUtm("https://www.thomasloof.com/", "photo-credit", "klaviyo-close") },
                { text: " (design by " },
                { text: "Amy Lau Design", href: withCredenzaUtm("https://www.amylaudesign.com/", "designer-credit", "klaviyo-close") },
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
              Ready to put your trade intelligence{" "}
              <span className="italic text-olive-mid">to work?</span>
            </h2>
            <p
              className="mb-9 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Use Credenza's ready-made trade audiences to run more timely, relevant
              campaigns in Klaviyo—and bring the engagement back to the account it
              came from.
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
