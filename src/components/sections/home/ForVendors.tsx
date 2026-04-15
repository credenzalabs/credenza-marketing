import { ChevronDown } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

// ─── For Vendors ─────────────────────────────────────────────────────────────────
export function ForVendors() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Full-bleed header image */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <img src="/benjamin-vandiver-west-village.webp" alt="West Village interior by Benjamin Vandiver" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(33,53,63,0.88) 0%, rgba(33,53,63,0.6) 50%, rgba(33,53,63,0.1) 100%)` }} />
        <PhotoCredit name="Design by Benjamin Vandiver · Photo by Joshua McHugh" />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>For vendors & showrooms</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, color: C.white, letterSpacing: "-0.025em" }}
            >
              Your rules. Your approvals.
              <br />
              <span className="italic" style={{ color: C.teal }}>In minutes.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Requirements */}
          <div>
            <h3 className="font-freight mb-4" style={{ fontSize: "2rem", color: C.charcoal, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Set the bar.
            </h3>
            <p className="mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: '15px', lineHeight: 1.75, color: C.charcoalMid }}>
              Every vendor's trade program is different. A high-volume fabric
              house and a luxury furniture atelier have very different bars.
              Credenza lets you configure exactly what's required to apply—
              and what earns a qualified designer faster approval.
            </p>
            <div className="border-t" style={{ borderColor: C.sageDark }}>
              {[
                { title: "Define your requirements", body: "Require a resale cert, EIN, business license, ASID membership, or any combination. Credenza's application form adapts to what you need—designers see exactly what to submit." },
                { title: "Approved in minutes, not days", body: "Designers who meet your criteria can be approved instantly—nights, weekends, Spring Market. No one waits for a human to come back to the office." },
                { title: "Always in control", body: "Auto-approval is a choice, not a requirement. Review every application manually, auto-approve when your criteria are met, or mix both. Credenza never approves anyone without your explicit rules being satisfied." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b" style={{ borderColor: C.sageDark }}>
                  <h4 className="font-freight mb-2" style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em" }}>{item.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Approval rules mockups */}
          <div className="flex flex-col gap-3" style={{ transform: "scale(0.88)", transformOrigin: "top right" }}>
            {/* Hard Rules */}
            <div style={{ backgroundColor: "#fff", border: "1px solid #e0dcd4", borderRadius: "2px", padding: "1.25rem", boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)", pointerEvents: "none" as const, userSelect: "none" as const }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-freight" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "0.04em", color: "#1A1A1A" }}>Hard Rules</h3>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide" style={{ border: "1px solid #6B2D2D", color: "#6B2D2D", backgroundColor: "rgba(107,45,45,0.04)", borderRadius: "1px" }}>Required for Approval</span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6a6a62", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                Every rule must pass for auto-approval. If any hard rule fails, the application is sent to manual review.
              </p>

              {/* Row 1: EIN Verified / is true */}
              <div className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid #f0ede8" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62", width: "28px", flexShrink: 0 }}>If</span>
                <div className="flex-1 flex items-center justify-between px-2 py-1.5" style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}>
                  EIN Verified <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                </div>
                <div className="flex items-center justify-between px-2 py-1.5" style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A", width: "80px", flexShrink: 0 }}>
                  is true <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                </div>
              </div>


              <div className="mt-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: "#1A1A1A", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                  + Add a hard rule
                </div>
              </div>
            </div>

            {/* Conditional Groups */}
            <div style={{ backgroundColor: "#fff", border: "1px solid #e0dcd4", borderRadius: "2px", padding: "1.25rem", boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)", pointerEvents: "none" as const, userSelect: "none" as const }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-freight" style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "0.04em", color: "#1A1A1A" }}>Conditional Groups</h3>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide" style={{ border: "1px solid #8B7B2B", color: "#8B7B2B", borderRadius: "1px" }}>Flexible</span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6a6a62", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Flexible paths to approval. Click the <em>and</em> / <em>or</em> between rows to switch how they combine. If any group passes, the application is auto-approved. Groups are connected by OR—create multiple groups for different approval paths.
              </p>

              {/* Group 1 label */}
              <div className="mb-5">
                <span className="font-freight pb-1" style={{ fontSize: "16px", color: "#6a6a62", borderBottom: "1px solid #e0dcd4", display: "inline-block" }}>Group 1</span>
              </div>

              {[
                { connector: "If", dashed: false, field: "Website Confirms Design Firm", op: "is true" },
                { connector: "or", dashed: true, field: "Verified Professional Membership/Accreditation", op: "is true" },
                { connector: "or", dashed: true, field: "Showhouse Participant", op: "is true" },
                { connector: "or", dashed: true, field: "Has Press Feature", op: "is true" },
                { connector: "or", dashed: true, field: "Trade Reference Count", op: "≥ 3" },
              ].map((rule, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid #f0ede8" }}>
                  {rule.dashed ? (
                    <span className="px-1.5 py-0.5 text-[11px] flex-shrink-0 text-center" style={{ border: "1.5px dashed #A9CFD3", color: "#3a6e70", fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: "1px", minWidth: "28px" }}>{rule.connector}</span>
                  ) : (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62", minWidth: "28px", flexShrink: 0 }}>{rule.connector}</span>
                  )}
                  <div className="flex-1 flex items-center justify-between px-2 py-1.5" style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}>
                    {rule.field} <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                  </div>
                  <div className="flex items-center justify-between px-2 py-1.5" style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A", width: "80px", flexShrink: 0 }}>
                    {rule.op} <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: "#1A1A1A", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                  + Add a rule
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
