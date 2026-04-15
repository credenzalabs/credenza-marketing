import { Zap } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Migration ───────────────────────────────────────────────────────────────────────
export function MigrationSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 md:py-32 bg-ivory">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <Eyebrow>Onboarding</Eyebrow>
            <h2
              className="font-freight mb-6 text-charcoal"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            >
              Your existing clients
              <br />
              <span className="italic text-olive-mid">come with you.</span>
            </h2>
            <p
              className="mb-6 text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Your existing trade clients, certificates, and account history come with you—no reapplication required.
            </p>
            <p
              className="text-charcoal-mid"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              This isn't just for new applicants. Your existing clients come onto the platform with their history intact—and from here, everything stays current automatically.
            </p>
            {/* Timeline callout */}
            <div className="mt-10 flex items-center gap-4 px-5 py-4 bg-teal-dim border border-teal-border">
              <div className="flex items-center justify-center shrink-0 w-9 h-9 bg-teal-dim border border-teal-border">
                <Zap size={16} className="text-teal-mid" />
              </div>
              <div>
                <div
                  className="text-charcoal font-bold"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", letterSpacing: "-0.01em" }}
                >
                  Live in hours, not months.
                </div>
                <div
                  className="text-charcoal-soft mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem" }}
                >
                  Import your roster, close your compliance gaps, and go live—same day.
                </div>
              </div>
            </div>
          </div>

          {/* Right: migration steps */}
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-0 border-t border-sage-dark">
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
                <div key={item.step} className="py-7 border-b border-sage-dark">
                  <div className="flex items-start gap-5">
                    <div
                      className="text-olive-mid font-normal shrink-0 min-w-7 pt-0.5"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.85rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4
                        className="font-freight mb-2 text-charcoal"
                        style={{ fontSize: "1.1rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}
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
