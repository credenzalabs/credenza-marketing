import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Verification ────────────────────────────────────────────────────────────────
export function VerificationSection() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const checks = [
    { label: "EIN / Business entity", detail: "Verified against IRS records—with business name match." },
    { label: "Sales tax ID", detail: "State-specific format validation and active registration check in 28 states" },
    { label: "Professional memberships", detail: "ASID, AIA, NCIDQ, NKBA, ICAA directories—verified against member records" },
    { label: "Website & online presence", detail: "Active, credible web presence consistent with a working design practice" },
    { label: "Instagram / portfolio", detail: "Evidence of an active, client-facing design practice" },
    { label: "License verification (where required)", detail: "Interior design license verified in the 8 states with practice acts; architecture licenses cross-referenced with NCARB records." },
    { label: "Resale certificates", detail: "State-specific or multi-state form, signed by authorized firm representative" },
    { label: "Trade references", detail: "Verified on and off platform—existing vendor accounts within the Credenza network, plus direct outreach to references outside it" },
    { label: "Press & showhouse recognition", detail: <><i>AD</i>, <i>Veranda</i>, <i>Elle Decor</i>, <i>House Beautiful</i>, <i>Southern Living</i>, <i>Luxe</i>, Kips Bay, and more</> },
  ];

  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Eyebrow>Verification engine</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Nine checks.
              <br />
              <span className="italic text-olive-mid">Zero manual follow-up.</span>
            </h2>
            <p
              className="mb-6 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Credenza verifies the person behind the paperwork—EINs, tax IDs, licenses, memberships, web presence, press, and more. Nine checks, run in parallel on every applicant, so your team spends their time on the business—not vetting applications.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              The result: a trade program with real standards—because every member is actually in the trade.
            </p>
            {/* Stat callout */}
            <div className="mt-8 flex items-center gap-5 px-5 py-4 bg-teal-dim border border-teal-border">
              <div
                className="text-teal-mid font-bold leading-none shrink-0"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "2.5rem", letterSpacing: "-0.03em" }}
              >
                9
              </div>
              <div>
                <div
                  className="text-charcoal font-semibold"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem" }}
                >
                  Automated verification checks
                </div>
                <div
                  className="text-charcoal-soft mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem" }}
                >
                  Run in parallel on every profile. Expand each check to see what we verify.
                </div>
              </div>
            </div>
          </div>

          {/* Verification checklist—collapsible accordion */}
          <div className="lg:col-span-7">
            <div className="border border-sage-dark bg-ivory p-6">
              {checks.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={item.label} className={`border-sage-dark ${i < checks.length - 1 ? "border-b" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`verification-detail-${i}`}
                      className="w-full flex items-center gap-4 text-left bg-transparent border-none cursor-pointer px-0 py-[1.1rem]"
                    >
                      <div aria-hidden="true" className="flex items-center justify-center shrink-0 w-[22px] h-[22px] bg-teal-dim border border-teal-border">
                        <Check size={11} className="text-teal-mid" />
                      </div>
                      <span
                        className="text-charcoal font-semibold flex-1"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                      >
                        {item.label}
                      </span>
                      <div className="ml-auto shrink-0 flex items-center gap-1.5 px-2.5 py-1 mr-3 bg-teal-dim border border-teal-border rounded-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-mid" />
                        <span
                          className="text-teal-mid font-semibold"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", letterSpacing: "0.06em" }}
                        >
                          VERIFIED
                        </span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-charcoal-soft shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`verification-detail-${i}`}
                        className="text-charcoal-soft pb-4 pl-[38px]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.82rem",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
