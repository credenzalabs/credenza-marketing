import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { useStagger } from "@/hooks/useStagger";

// ─── How It Works ────────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  const ref = useReveal();
  const stepsRef = useStagger(80);
  const steps = [
    {
      num: "01",
      label: "Verify",
      title: "Trade Verification",
      headline:
        "Every applicant verified against official records—IRS, state tax authorities, and professional organizations.",
    },
    {
      num: "02",
      label: "Approve",
      title: "Auto-Approval Rules",
      headline: "Hard requirements and flexible approval paths—qualifying designers approved instantly, the rest routed to manual review.",
    },
    {
      num: "03",
      label: "Onboard",
      title: "Automated Onboarding",
      headline:
        "Trade customer profiles are set up in your store with the right tax exemption and trade pricing—automatically.",
    },
    {
      num: "04",
      label: "Stay Compliant",
      title: "Resale Certificate Management",
      headline:
        "Certificates generated, monitored, renewed—and revoked if they lapse.",
    },
  ];

  return (
    <section ref={ref} className="reveal bg-page-white border-t border-sage-dark">
      <div className="container py-20 md:py-28">
        {/* Section header */}
        <div className="max-w-3xl mb-14">
          <Eyebrow>How it works</Eyebrow>
          <h2
            className="font-freight mb-6 text-charcoal"
            style={{ fontSize: "clamp(1.9rem, 3vw, 2.7rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            From trade application to active account—
            <br />
            <span className="italic text-olive-mid">without a single manual step.</span>
          </h2>
          <p
            className="text-charcoal-mid max-w-[560px]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.8 }}
          >
            Credenza handles the full lifecycle of a trade relationship—verifying trade
            applicants, applying your approval rules, onboarding them into your store, and
            keeping their compliance current—then turns the whole program into sales
            intelligence you can act on.
          </p>
        </div>

        {/* Four numbered steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              data-stagger
              className="stagger-item p-8 border border-sage-dark bg-white"
            >
              <div
                className="font-freight text-charcoal leading-none mb-4"
                style={{ fontSize: "2.5rem", letterSpacing: "-0.03em" }}
              >
                {step.num}
              </div>
              <div
                className="uppercase font-semibold mb-2"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", color: "#3a6e70" }}
              >
                {step.label}
              </div>
              <h3
                className="font-freight mb-3 text-charcoal"
                style={{ fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p
                className="text-charcoal-mid"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
              >
                {step.headline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
