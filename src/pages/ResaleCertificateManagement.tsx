/*
 * CREDENZA — RESALE CERTIFICATE MANAGEMENT (vendor-facing)
 *
 * Positioning: replaces a vendor's resale certificate add-on
 * (CertCapture, Shopify exemption module, Avalara ECM, TaxJar)
 * with a workflow purpose-built for the to-the-trade channel.
 *
 * SECTION ORDER:
 *   1. Hero
 *   2. What Credenza offers (6 capability cards)
 *   3. Integrations (Shopify-first)
 *   4. How it works (numbered lifecycle)
 *   5. The Problem (scannable industry context)
 *   6. FAQ
 *   7. Close / CTA
 */

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/home/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C, JOIN_VENDOR_URL } from "@/lib/constants";

const PAGE_TITLE = "Resale certificate management for the to-the-trade channel";
const PAGE_DESCRIPTION =
  "Resale certificate management built for to-the-trade brands. Verified designer profiles, compliant certificates pre-attached at trade-account application, state-scoped exemption written directly to the Shopify customer profile.";

export default function ResaleCertificateManagement() {
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute("content");
    document.title = `${PAGE_TITLE} | Credenza`;
    descMeta?.setAttribute("content", PAGE_DESCRIPTION);
    return () => {
      document.title = prevTitle;
      if (prevDesc) descMeta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav activePage="vendors" ctaHref={JOIN_VENDOR_URL} />
      <Hero />
      <Capabilities />
      <Integrations />
      <Difference />
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
          backgroundImage: `radial-gradient(circle, ${C.sageDark} 1px, transparent 1px)`,
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
              Resale certificate management
              <br />
              <span className="italic text-olive-mid">built for interior design.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p
              className="text-charcoal-mid mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
            >
              Verified designer profiles. Compliant certificates pre-attached at trade-account application.
              State-scoped exemption written directly to the Shopify customer profile.
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
   5. THE PROBLEM (industry context, scannable)
   ========================================================================= */
const PROBLEM_POINTS = [
  {
    title: "The buyer is self-taught.",
    body: "Most designers run small practices without an in-house accountant. Resale-certificate compliance was built for enterprise tax teams, not one-person studios — the mistakes aren't carelessness, they're a system mismatch.",
  },
  {
    title: "User error compounds it.",
    body: "Blurry phone photos. Last year's PDF resent. The wrong state's form. The wrong entity name. The certificate stack you're managing is full of quiet errors no validator can catch upstream.",
  },
  {
    title: "Existing tools can't fix it.",
    body: "CertCapture, Avalara ECM, Shopify's exemption module, TaxJar — they store documents and validate fields. They don't know who the designer is, what they sell, or where they ship.",
  },
  {
    title: "The exposure is real.",
    body: "Under good-faith rules, an invalid certificate shifts liability — vendor first, designer second. A trade book of quietly lapsed certificates is compounding tax risk you can't always see.",
  },
];

function Problem() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>Why this is broken</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              The trade-account workflow
              <br />
              <span className="italic text-olive-mid">runs on certificate guesswork.</span>
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
   6. FAQ
   ========================================================================= */
const FAQ_ITEMS = [
  {
    q: "How is this different from CertCapture or Avalara ECM?",
    a: "Those tools store and validate certificates uploaded by buyers. Credenza generates the certificate from verified buyer data—sales tax IDs, EIN, registrations—prefilled correctly for the right state and vendor, and writes state-scoped exemption back to the Shopify customer profile when approved.",
  },
  {
    q: "Does this work if my buyers aren't already on Credenza?",
    a: "Yes. Designers can create a Credenza profile during your trade-account application, complete verification, and have a compliant certificate generated in the same flow. They keep the profile and reuse it for every other vendor.",
  },
  {
    q: "What if I'm not on Shopify?",
    a: "Native Shopify integration is live today. We're rolling out support for additional commerce platforms—tell us what you use and we'll share timelines.",
  },
  {
    q: "Is the certificate generation actually compliant for all 46 states?",
    a: "Yes. The engine handles MTC, SST, state-specific forms, and state-issued certificates. For the six states that issue certificates directly to the buyer (AL, FL, LA, NM, TN, WA), Credenza guides the designer through retrieval and tracks expirations.",
  },
  {
    q: "What does the audit trail look like?",
    a: "Every certificate, every renewal, every state—searchable, exportable, tied to the Shopify customer profile. When an auditor calls, the records live where the customer lives. No separate document vault to reconcile.",
  },
  {
    q: "What's the implementation lift?",
    a: "Native Shopify integration is a one-time install. Most vendors are live within a few days. No engineering work required on your side beyond the install.",
  },
];

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
   3. WHAT CREDENZA OFFERS
   ========================================================================= */
const CAPABILITIES = [
  {
    title: "Verified designer profiles",
    body: "Designers maintain a single Credenza profile—legal entity name, state tax IDs, registrations—verified at signup and kept current. You receive vetted applicants, not raw form submissions.",
  },
  {
    title: "Generated from verified data, not user-typed fields",
    body: "Credenza already has the designer's verified sales tax ID, EIN, legal entity name, and state registrations on file. The engine pairs that with their profession and shipping destinations to generate the right form for all 46 sales-tax states—MTC, SST, state-specific, or state-issued—prefilled correctly. No “please upload your cert” follow-ups. No blurry phone photos. No last year's PDF in this year's application.",
  },
  {
    title: "Pre-attached at application time",
    body: "When a designer applies for a trade account, their compliant certificate arrives with the application. No follow-up email. No “please send your resale cert.”",
  },
  {
    title: "State-scoped exemption on the Shopify customer profile",
    body: "When a designer is approved, Credenza applies exemption on the customer record for each state they're certified in—and the certificate is stored on the same profile, so the audit trail lives where the customer lives. No manual tagging, no all-or-nothing flag, no ops person flipping settings after every approval.",
    highlight: true,
  },
  {
    title: "Renewal lifecycle managed for you",
    body: "Credenza tracks expirations by vendor and state, prompts the designer before lapse, pre-fills the renewal, and pushes the new certificate to your customer profile when it's signed.",
  },
  {
    title: "Audit-ready records",
    body: "Every certificate, every renewal, every state—searchable, exportable, tied to the customer profile in Shopify. When the auditor calls, the records are where they're supposed to be.",
  },
];

function Capabilities() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <Eyebrow>What Credenza offers</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Built end-to-end for the
              <br />
              <span className="italic text-olive-mid">trade-channel exemption workflow.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-sage-dark">
          {CAPABILITIES.map((card, i) => {
            const isLeftCol = i % 3 === 0;
            const isMidCol = i % 3 === 1;
            const lgRightBorder = !isLeftCol && !isMidCol ? "" : "lg:border-r lg:border-sage-dark";
            const mdRightBorder = i % 2 === 0 ? "md:border-r md:border-sage-dark" : "";
            return (
              <div
                key={card.title}
                className={`py-10 px-6 md:px-8 border-b border-sage-dark ${mdRightBorder} ${lgRightBorder} ${
                  card.highlight ? "bg-teal-dim" : ""
                }`}
              >
                {card.highlight && (
                  <div className="mb-3">
                    <span
                      className="text-teal-mid"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Only on Credenza
                    </span>
                  </div>
                )}
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
   4. HOW IT WORKS
   ========================================================================= */
const LOOP_STEPS = [
  { trigger: "A designer applies", outcome: "their certificate is already attached." },
  { trigger: "You approve", outcome: "state-scoped exemption is live on the Shopify customer profile." },
  { trigger: "A certificate expires", outcome: "it's pre-filled and re-signed before it lapses." },
  { trigger: "An audit arrives", outcome: "the records are tied to the customer." },
];

function Difference() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Other tools store the certificate.
              <br />
              <span className="italic text-olive-mid">Credenza acts on it.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-sage-dark">
          {LOOP_STEPS.map((step, i) => (
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
   3. INTEGRATIONS
   ========================================================================= */
function Integrations() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 border-t border-sage-dark" style={{ backgroundColor: "#fafaf6" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-6">
            <Eyebrow>Integrations</Eyebrow>
            <h2
              className="font-freight leading-none text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Native Shopify integration.
              <br />
              <span className="italic text-olive-mid">More on the way.</span>
            </h2>
          </div>
          <div
            className="lg:col-span-6 space-y-4 text-charcoal-mid"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
          >
            <ul className="space-y-3">
              <li className="flex items-baseline gap-3">
                <span className="text-olive-mid shrink-0">&rarr;</span>
                <span>State-scoped exemption written directly to the customer profile</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-olive-mid shrink-0">&rarr;</span>
                <span>Certificate stored on the same customer record</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-olive-mid shrink-0">&rarr;</span>
                <span>Renewal pushed automatically when signed</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-olive-mid shrink-0">&rarr;</span>
                <span>Audit trail tied to the customer, not a separate vault</span>
              </li>
            </ul>
            <p className="text-charcoal-soft pt-2" style={{ fontSize: "0.92rem" }}>
              Additional commerce platforms in development. Tell us what you use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. CLOSE
   ========================================================================= */
function Close() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white border-t border-sage-dark">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow>The network</Eyebrow>
          <h2
            className="font-freight leading-none text-charcoal mb-8"
            style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            A certificate workflow
            <br />
            <span className="italic text-olive-mid">that compounds.</span>
          </h2>
          <p
            className="text-charcoal-mid mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
          >
            1,500+ to-the-trade brands. An active designer network maintaining verified profiles. The more
            vendors join, the more designer profiles arrive verified, the cleaner your trade book gets.
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
