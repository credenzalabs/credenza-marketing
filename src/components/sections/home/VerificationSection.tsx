import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

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
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Eyebrow>Verification engine</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Nine checks.
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>Zero manual follow-up.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Credenza verifies the person behind the paperwork—EINs, tax IDs, licenses, memberships, web presence, press, and more. Nine checks, run in parallel on every applicant, so your team spends their time on the business—not vetting applications.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              The result: a trade program that protects its value—because every member is actually in the trade.
            </p>
            {/* Stat callout */}
            <div
              className="mt-8 flex items-center gap-5 px-5 py-4"
              style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "2.5rem", fontWeight: 700, color: C.tealMid, lineHeight: 1, letterSpacing: "-0.03em", flexShrink: 0 }}>9</div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, color: C.charcoal }}>Automated verification checks</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>Run in parallel on every profile. Expand each check to see what we verify.</div>
              </div>
            </div>
          </div>

          {/* Verification checklist—collapsible accordion */}
          <div className="lg:col-span-7">
            <div className="border p-6" style={{ borderColor: C.sageDark, backgroundColor: "#ffffff" }}>
              {checks.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={item.label} className={i < checks.length - 1 ? "border-b" : ""} style={{ borderColor: C.sageDark }}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 py-4 text-left"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "1.1rem 0" }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: "22px", height: "22px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
                      >
                        <Check size={11} style={{ color: C.tealMid }} />
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: C.charcoal, flex: 1 }}>
                        {item.label}
                      </span>
                      <div
                        className="ml-auto flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 mr-3"
                        style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: "0" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.tealMid }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: C.tealMid, fontWeight: 600, letterSpacing: "0.06em" }}>VERIFIED</span>
                      </div>
                      <ChevronDown
                        size={14}
                        style={{
                          color: C.charcoalSoft,
                          flexShrink: 0,
                          transition: "transform 0.2s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.82rem",
                          color: C.charcoalSoft,
                          lineHeight: 1.65,
                          paddingBottom: "1rem",
                          paddingLeft: "38px",
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
