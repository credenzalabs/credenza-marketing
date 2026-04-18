import { Settings, Store } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES } from "./images";

// ─── Integrations ────────────────────────────────────────────────────────────────
export function IntegrationsSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-ivory">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden relative aspect-[4/5]">
              <img src={IMAGES.alisonRoseKitchen} alt="Interior installation" loading="lazy" className="w-full h-full object-cover" />
              <PhotoCredit name="Designed by Alison Rose NY · Photo by Reid Rolls" />
            </div>

          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Eyebrow>Integrations</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Approved. Active.
              <br />
              <span className="italic text-olive-mid">No manual steps.</span>
            </h2>
            <p
              className="mb-8 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Approval is not the finish line—it’s the starting gun. The moment
              you approve a designer, Credenza creates their trade account
              and applies the correct state-level tax exemption. No one on
              your team touches a keyboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <Store size={18} />,
                  title: "Shopify",
                  badge: "Available now",
                  body: "Approved designers become Shopify customers instantly—tagged with your trade pricing and state-level tax exemptions applied. No manual entry. No misapplied exemptions.",
                },
                {
                  icon: <Settings size={18} />,
                  title: "Custom stacks & ERPs",
                  badge: "Coming soon",
                  body: "Direct integrations for custom e-commerce stacks and ERP systems are on the roadmap. If you’re running something bespoke, let’s talk—we’re building this with early partners.",
                },
              ].map((item) => {
                const available = item.badge === "Available now";
                return (
                  <div key={item.title} className="p-5 bg-white border border-sage-dark">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-charcoal-soft">{item.icon}</span>
                      <span
                        className={`uppercase font-semibold border py-0.5 px-1.5 ${available ? "text-teal-mid border-teal-border" : "text-charcoal-soft border-sage-dark"}`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.58rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <div
                      className="font-freight mb-2 text-charcoal"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.015em" }}
                    >
                      {item.title}
                    </div>
                    <p
                      className="text-charcoal-mid"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65 }}
                    >
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                "Shopify customer account created on approval",
                "Tax exemption applied automatically at the state level",
                "Upgrade clients to the next pricing tier with one click as the relationship grows",
                "Cert expirations monitored—renewals requested, exemptions revoked until current",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 shrink-0 bg-teal-mid" />
                  <span
                    className="text-charcoal-mid"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
