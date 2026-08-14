import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

export const HOME_FAQ = [
  {
    q: "What is a trade program?",
    a: "A trade program is a vendor's structured offering for interior designers and other trade professionals—typically including discounted pricing, resale tax exemption, customization, dedicated support, complimentary sampling, and a formal application and approval process. It is the interior design industry's name for what most other industries call a wholesale or B2B program: the same wholesale pricing, the same tax-exempt purchasing, the same approval gate, described in the vocabulary of the design trade. Most vendors run their programs manually, through spreadsheets, email, and disconnected tools. Credenza replaces that with a single platform that handles verification, approvals, onboarding, and ongoing compliance automatically—and adds the sales tools to grow it: account segmentation, exportable outreach lists, and product-level insight.",
  },
  {
    q: "Is a trade program the same as a wholesale or B2B program?",
    a: "Substantially, yes—it's the same business relationship under a different name. A furniture, lighting, textile, or rug brand selling to interior designers at wholesale pricing, tax-exempt, through an application and approval process is running what any other industry would call a wholesale or B2B program. The design trade calls it a trade program, and calls the buyers trade customers rather than wholesale accounts. The practical difference is who the buyer is: an interior designer is buying on behalf of a client rather than to stock a store, so approval turns on whether they are a practicing design professional rather than whether they hold a retail license, and the resale certificate has to be valid for the state the goods are shipping to. If you run a wholesale or B2B program for designers, everything on this site applies to you.",
  },
  {
    q: "What is resale certificate management?",
    a: "A resale certificate (also called a resale exemption certificate or sales tax exemption certificate) is a document a designer provides to a vendor to purchase goods tax-exempt for resale to their clients. Vendors are required to collect and maintain valid certificates to support their tax-exempt sales. Resale certificate management is the process of generating the correct certificate for each designer-state-vendor combination, tracking expiration dates, requesting renewals, and revoking tax exemptions when certificates lapse. Credenza handles this entire lifecycle automatically.",
  },
  {
    q: "What is Credenza?",
    a: "Credenza is trade program software for interior design vendors. It handles trade verification, configurable approval rules, designer onboarding, and resale certificate management—eliminating manual review and protecting vendors in an audit. For designers, it's one verified trade profile they use to apply across every participating brand, manage every trade account in one dashboard, and generate compliant resale certificates in seconds.",
  },
  {
    q: "Are you the Credenza that does Web3 or sports?",
    a: "No. Credenza Labs, Inc. is a software platform for the interior design industry. We are unrelated to other companies sharing the Credenza name.",
  },
  {
    q: "Is Credenza a marketplace?",
    a: "No. We're infrastructure—not a marketplace. Credenza is built to empower your trade relationships, not intercept them. Designers source from the brands they choose; vendors keep their direct relationships with their trade buyers.",
  },
  {
    q: "How is Credenza different from Shopify Plus B2B?",
    a: "Credenza complements your commerce stack rather than replacing it. Shopify Plus B2B handles wholesale pricing and tax-exempt checkout once a buyer is approved—Credenza is the identity, verification, and compliance layer that gets buyers approved in the first place. A B2B platform will apply wholesale pricing to whoever you tag as a trade customer; it has no opinion about whether that tag is justified, and it doesn't collect or validate the resale certificate that supports the exemption. Most brands running a wholesale program for designers need both.",
  },
  {
    q: "How is Credenza priced?",
    a: "Designers use Credenza free—no credit card, no trial window, no seat limit. Vendor pricing is an annual or monthly subscription, tiered based on the volume of applications and certificates processed and the features included. We don't take a percentage of sales, transactions, or designer spend. Reach out and we'll help you find the right plan.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-7 text-left cursor-pointer bg-transparent"
      >
        <h3 className="font-freight text-charcoal" style={{ fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {/* Rendered always, hidden with CSS when collapsed. Conditional mounting
          ({open && ...}) kept every answer out of the prerendered HTML, so
          crawlers and answer engines saw the questions and none of the answers
          — and the FAQPage schema asserted text the page did not contain.
          Collapsed-but-present is explicitly fine for Google. */}
      <p
        className={`pb-7 pr-10 text-charcoal-mid ${open ? "" : "hidden"}`}
        style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
      >
        {a}
      </p>
    </div>
  );
}

export function FAQSection() {
  const ref = useReveal();

  // FAQPage markup lives with the questions it describes, not in index.html.
  // Google requires FAQ markup to match content visible on that URL — when this
  // block sat in the static <head>, every prerendered route (including
  // /privacy-policy and /dpa) claimed seven FAQs it never rendered, and
  // /for-designers and /shopify shipped a second, contradictory FAQPage.
  // Generating it from HOME_FAQ also keeps the schema and the copy in lockstep.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "home-faq";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <section id="faq" ref={ref} className="reveal py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-8">
          <div className="lg:col-span-7">
            <Eyebrow>Straight answers</Eyebrow>
            <h2 className="font-freight leading-none text-charcoal" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}>
              Frequently asked
              <br />
              <span className="italic text-olive-mid">questions.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-sage-dark">
          {HOME_FAQ.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
