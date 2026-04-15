import { Zap } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

// ─── Migration ───────────────────────────────────────────────────────────────────────
export function MigrationSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32" style={{ backgroundColor: C.ivory }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <Eyebrow>Onboarding</Eyebrow>
            <h2
              className="font-freight mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.025em" }}
            >
              Your existing clients
              <br />
              <span className="italic" style={{ color: C.oliveMid }}>come with you.</span>
            </h2>
            <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              Your existing trade clients, certificates, and account history come with you—no reapplication required.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}>
              This isn't just for new applicants. Your existing clients come onto the platform with their history intact—and from here, everything stays current automatically.
            </p>
            {/* Timeline callout */}
            <div
              className="mt-10 flex items-center gap-4 px-5 py-4"
              style={{ backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "36px", height: "36px", backgroundColor: C.tealDim, border: `1px solid ${C.tealBorder}` }}
              >
                <Zap size={16} style={{ color: C.tealMid }} />
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.charcoal, letterSpacing: "-0.01em" }}>
                  Live in hours, not months.
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, marginTop: "2px" }}>
                  Import your roster, close your compliance gaps, and go live—same day.
                </div>
              </div>
            </div>
          </div>

          {/* Right: migration steps */}
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-0 border-t" style={{ borderColor: C.sageDark }}>
              {[
                {
                  step: "01",
                  title: "Import your existing roster",
                  body: "Import directly from Shopify or share a list. Credenza groups contacts by firm, deduplicates, matches against existing profiles, and extracts data from your notes, tags, and cert files. Bulk upload your existing certificates—we\u2019ll read each one, match it to the right client, calculate expiration dates, and monitor them from here.",
                },
                {
                  step: "02",
                  title: "Recognize your existing clients",
                  body: "Imported clients are already in your program—no reapplication needed. If a designer joins Credenza on their own or through another vendor, the relationship is already there.",
                },
                {
                  step: "03",
                  title: "Close compliance gaps",
                  body: "Credenza identifies designers without current resale certs and prompts them to generate and sign—so you\u2019re compliant from day one. Want to start fresh? Invite existing clients to connect and submit new certificates with compliant, verified data.",
                },
              ].map((item) => (
                <div key={item.step} className="py-7 border-b" style={{ borderColor: C.sageDark }}>
                  <div className="flex items-start gap-5">
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.85rem",
                        color: C.oliveMid,
                        letterSpacing: "0.06em",
                        fontWeight: 400,
                        flexShrink: 0,
                        paddingTop: "2px",
                        minWidth: "28px",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4
                        className="font-freight mb-2"
                        style={{ fontSize: "1.1rem", color: C.charcoal, letterSpacing: "-0.015em", lineHeight: 1.2 }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.charcoalMid }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
