import { useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

export const HOME_FAQ = [
  {
    q: "What is Credenza?",
    a: "Credenza is the verified identity platform for interior design's trade market. Designers create one verified trade profile to apply across every participating brand, manage every trade account in one dashboard, and generate compliant resale certificates in seconds. Vendors get automated trade verification, configurable approval rules, and a resale certificate engine that eliminates manual review and protects them in an audit.",
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
    a: "Credenza complements your commerce stack rather than replacing it. Shopify Plus B2B handles trade pricing and tax-exempt checkout once a buyer is approved—Credenza is the identity, verification, and compliance layer that gets buyers approved in the first place.",
  },
  {
    q: "How is Credenza priced?",
    a: "Designers use Credenza free—no credit card, no trial window, no seat limit. Vendor pricing is a monthly subscription, tiered based on the volume of applications and certificates processed and the features included. We don't take a percentage of sales, transactions, or designer spend.",
  },
  {
    q: "Is Credenza live today?",
    a: "Yes for designers—the platform is live and free to use today. To-the-trade brands are joining now ahead of public launch.",
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
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent"
      >
        <h3 className="font-freight text-charcoal" style={{ fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {open && (
        <p
          className="pb-5 pr-10 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export function FAQSection() {
  const ref = useReveal();
  return (
    <section id="faq" ref={ref} className="reveal py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-8">
          <div className="lg:col-span-7">
            <Eyebrow>Frequently asked</Eyebrow>
            <h2 className="font-freight leading-none text-charcoal" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}>
              About Credenza,
              <br />
              <span className="italic text-olive-mid">in plain terms.</span>
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
