import { ChevronDown } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES } from "./images";
import { withCredenzaUtm } from "@/utils/utm";

// ─── For Vendors ─────────────────────────────────────────────────────────────────
export function ForVendors() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal bg-white">
      {/* Full-bleed header image */}
      <div className="relative overflow-hidden min-h-[70vh]">
        <img
          src={IMAGES.nickOlsonReidRolls}
          alt="Elegant interior by Nick Olsen"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(33,53,63,0.82) 0%, rgba(33,53,63,0.55) 50%, rgba(33,53,63,0.1) 100%)` }}
        />
        <PhotoCredit
          separator=""
          credits={[
            { text: "© " },
            { text: "Reid Rolls", href: withCredenzaUtm("https://reidrolls.com/", "photo-credit", "for-vendors-hero") },
            { text: " (design by " },
            { text: "Nick Olsen", href: withCredenzaUtm("https://nickolsenstyle.com/", "designer-credit", "for-vendors-hero") },
            { text: ")" },
          ]}
        />
        <div className="relative z-10 container py-24 md:py-32">
          <div className="max-w-xl">
            <Eyebrow light>For vendors & showrooms</Eyebrow>
            <h2
              className="font-freight mb-6 text-ivory"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Your rules. Your approvals.
              <br />
              <span className="italic text-teal">In minutes.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Requirements */}
          <div>
            <h3
              className="font-freight mb-4 text-charcoal"
              style={{ fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Set the bar.
            </h3>
            <p
              className="mb-8 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: '15px', lineHeight: 1.75 }}
            >
              Every vendor's trade program is different. A high-volume fabric
              house and a luxury furniture atelier have very different bars.
              Credenza lets you configure exactly what's required to
              apply—and what earns a qualified designer faster approval.
            </p>
            <div className="border-t border-sage-dark">
              {[
                { title: "Define your requirements", body: "Require a resale cert, EIN, business license, ASID membership, or any combination. Credenza's application form adapts to what you need—designers see exactly what to submit." },
                { title: "Approved in minutes, not days", body: "Designers who meet your criteria can be approved instantly—nights, weekends, Spring Market. No one waits for a human to come back to the office." },
                { title: "Always in control", body: "Auto-approval is a choice, not a requirement. Review every application manually, auto-approve when your criteria are met, or mix both. Credenza never approves anyone without your explicit rules being satisfied." },
              ].map((item) => (
                <div key={item.title} className="py-6 border-b border-sage-dark">
                  <h4
                    className="font-freight mb-2 text-charcoal"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.015em" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-charcoal-mid"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Approval rules mockups */}
          <div className="flex flex-col gap-3 scale-[0.88] origin-top-right">
            {/* Hard Rules */}
            <div
              className="bg-white p-5 rounded-[2px] pointer-events-none select-none"
              style={{
                border: "1px solid #e0dcd4",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-freight font-normal"
                  style={{ fontSize: "20px", letterSpacing: "0.04em", color: "#1A1A1A" }}
                >
                  Hard Rules
                </h3>
                <span
                  className="inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide rounded-[1px]"
                  style={{ border: "1px solid #6B2D2D", color: "#6B2D2D", backgroundColor: "rgba(107,45,45,0.04)" }}
                >
                  Required for Approval
                </span>
              </div>
              <p
                className="mb-7"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6a6a62", lineHeight: 1.6 }}
              >
                Every rule must pass for auto-approval. If any hard rule fails, the application is sent to manual review.
              </p>

              {/* Row 1: EIN Verified / is true */}
              <div
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: "1px solid #f0ede8" }}
              >
                <span
                  className="w-7 shrink-0"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62" }}
                >
                  If
                </span>
                <div
                  className="flex-1 flex items-center justify-between px-2 py-1.5"
                  style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}
                >
                  EIN Verified <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                </div>
                <div
                  className="flex items-center justify-between px-2 py-1.5 w-20 shrink-0"
                  style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}
                >
                  is true <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                </div>
              </div>


              <div className="mt-6">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-white"
                  style={{ backgroundColor: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: "13px" }}
                >
                  + Add a hard rule
                </div>
              </div>
            </div>

            {/* Conditional Groups */}
            <div
              className="bg-white p-5 rounded-[2px] pointer-events-none select-none"
              style={{
                border: "1px solid #e0dcd4",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-freight font-normal"
                  style={{ fontSize: "20px", letterSpacing: "0.04em", color: "#1A1A1A" }}
                >
                  Conditional Groups
                </h3>
                <span
                  className="inline-flex items-center px-2 py-0.5 text-[10px] tracking-wide rounded-[1px]"
                  style={{ border: "1px solid #8B7B2B", color: "#8B7B2B" }}
                >
                  Flexible
                </span>
              </div>
              <p
                className="mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6a6a62", lineHeight: 1.6 }}
              >
                Flexible paths to approval. Click the <em>and</em> / <em>or</em> between rows to switch how they combine. If any group passes, the application is auto-approved. Groups are connected by OR—create multiple groups for different approval paths.
              </p>

              {/* Group 1 label */}
              <div className="mb-5">
                <span
                  className="font-freight pb-1 inline-block"
                  style={{ fontSize: "16px", color: "#6a6a62", borderBottom: "1px solid #e0dcd4" }}
                >
                  Group 1
                </span>
              </div>

              {[
                { connector: "If", dashed: false, field: "Website Confirms Design Firm", op: "is true" },
                { connector: "or", dashed: true, field: "Verified Professional Membership/Accreditation", op: "is true" },
                { connector: "or", dashed: true, field: "Showhouse Participant", op: "is true" },
                { connector: "or", dashed: true, field: "Has Press Feature", op: "is true" },
                { connector: "or", dashed: true, field: "Trade Reference Count", op: "≥ 3" },
              ].map((rule, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5"
                  style={{ borderBottom: "1px solid #f0ede8" }}
                >
                  {rule.dashed ? (
                    <span
                      className="px-1.5 py-0.5 text-[11px] shrink-0 text-center font-medium rounded-[1px] min-w-7"
                      style={{ border: "1.5px dashed #A9CFD3", color: "#3a6e70", fontFamily: "Inter, sans-serif" }}
                    >
                      {rule.connector}
                    </span>
                  ) : (
                    <span
                      className="shrink-0 min-w-7"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6a6a62" }}
                    >
                      {rule.connector}
                    </span>
                  )}
                  <div
                    className="flex-1 flex items-center justify-between px-2 py-1.5"
                    style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}
                  >
                    {rule.field} <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                  </div>
                  <div
                    className="flex items-center justify-between px-2 py-1.5 w-20 shrink-0"
                    style={{ border: "1px solid #e0dcd4", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}
                  >
                    {rule.op} <ChevronDown size={14} style={{ color: "#c8c4bc" }} />
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-white"
                  style={{ backgroundColor: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: "13px" }}
                >
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
