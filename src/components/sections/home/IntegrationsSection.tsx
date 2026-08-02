import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES } from "./images";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Integrations ────────────────────────────────────────────────────────────────
export function IntegrationsSection() {
  const ref = useReveal();
  const prefix = window.location.pathname.startsWith("/preview") ? "/preview" : "";
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-page-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden relative aspect-[4/5]">
              <img src={IMAGES.alisonRoseKitchen} alt="Interior installation" loading="lazy" className="w-full h-full object-cover" />
              <PhotoCredit
                separator=""
                credits={[
                  { text: "© " },
                  { text: "Reid Rolls", href: withCredenzaUtm("https://reidrolls.com/", "photo-credit", "integrations") },
                  { text: " (design by " },
                  { text: "Alison Rose NY", href: withCredenzaUtm("https://alisonroseny.com/", "designer-credit", "integrations") },
                  { text: ")" },
                ]}
              />
            </div>

          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Eyebrow>Integrations</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Approval is not the finish line—
              <br />
              <span className="italic text-olive-mid">it's the starting gun.</span>
            </h2>
            <p
              className="mb-8 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              The moment you approve a designer, Credenza creates their trade
              account and applies the correct state-level tax exemption. No one
              on your team touches a keyboard. That same verified record then
              flows into your marketing stack, so the designers you just
              approved are already segmented and reachable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: "Shopify",
                  logo: "/logo-shopify.png",
                  logoHeight: 22,
                  body: "Approved designers become Shopify customers instantly—tagged with your trade pricing and state-level tax exemptions applied. No manual entry. No misapplied exemptions.",
                  href: `${prefix}/shopify`,
                },
                {
                  title: "Klaviyo",
                  logo: "/logo-klaviyo.png",
                  logoHeight: 18,
                  body: "Push any filtered set of trade accounts to a Klaviyo list—dormant, sampling but not buying, new this month—and campaign sends, opens, and clicks come back into each firm's activity feed.",
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white border border-sage-dark">
                  <div className="flex items-center justify-between gap-3 mb-3 min-h-[24px]">
                    <img
                      src={item.logo}
                      alt={item.title}
                      loading="lazy"
                      className="block w-auto max-w-full"
                      style={{ height: item.logoHeight }}
                    />
                    <span
                      className="shrink-0 uppercase font-semibold border py-0.5 px-1.5 text-teal-mid border-teal-border"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Available now
                    </span>
                  </div>
                  <p
                    className="text-charcoal-mid"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65 }}
                  >
                    {item.body}
                  </p>
                  {item.href && (
                    <a
                      href={item.href}
                      className="no-underline inline-flex items-center gap-1 mt-3 text-teal-mid transition-colors duration-150 hover:text-charcoal"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Explore the integration →
                    </a>
                  )}
                </div>
              ))}
            </div>

            <p
              className="text-charcoal-soft"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.65 }}
            >
              Custom e-commerce stacks and ERPs are on the roadmap—if you’re running
              something bespoke, let’s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
