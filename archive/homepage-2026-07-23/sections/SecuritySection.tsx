import { Check, FileText, Lock, Shield } from "lucide-react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Security ────────────────────────────────────────────────────────────────
export function SecuritySection() {
  const ref = useReveal();
  const pillars = [
    {
      icon: <Lock size={18} className="text-teal" />,
      title: "Encrypted at rest",
      body: "EINs, tax IDs, and sensitive identifiers are encrypted in the database using application-level encryption. All underlying storage is encrypted at rest.",
    },
    {
      icon: <Shield size={18} className="text-teal" />,
      title: "Strict data isolation",
      body: "No designer can see another designer's data. No firm can see another firm's data. Vendors only see designers who apply to their program. Isolation is enforced at the database layer by row-level security.",
    },
    {
      icon: <FileText size={18} className="text-teal" />,
      title: "Immutable audit trail",
      body: "Every certificate issuance, renewal, and application decision is recorded in an append-only log. If you’re ever audited, the record is there—timestamped, tamper-proof, and complete.",
    },
    {
      icon: <Check size={18} className="text-teal" />,
      title: "We never sell your data",
      body: "Credenza does not sell, license, or share designer or vendor data with third parties. Your data is used solely to operate the platform.",
    },
  ];
  return (
    <section
      ref={ref}
      className="reveal bg-forest"
      style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: image */}
        <div className="lg:col-span-5 relative overflow-hidden min-h-[250px]">
          <img
            src="/thomas-loof-ombre-living.jpg"
            alt="Living room by Amy Lau Design"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          <PhotoCredit
            separator=""
            credits={[
              { text: "© " },
              { text: "Thomas Loof", href: withCredenzaUtm("https://www.thomasloof.com/", "photo-credit", "security") },
              { text: " (design by " },
              { text: "Amy Lau Design", href: withCredenzaUtm("https://www.amylaudesign.com/", "designer-credit", "security") },
              { text: ")" },
            ]}
          />
        </div>

        {/* Right: content */}
        <div className="lg:col-span-7 py-20 md:py-28 px-8 lg:px-16">
          <div className="mb-14 max-w-2xl pl-7">
            <Eyebrow light>Data &amp; security</Eyebrow>
            <h2
              className="font-freight text-ivory"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              The data behind trade programs
              <br />
              is tax-sensitive.
              <br />
              <span className="italic text-teal">We treat it that way.</span>
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          >
            {pillars.map((p) => (
              <div key={p.title} className="p-7 bg-forest">
                <div className="mb-4">{p.icon}</div>
                <h3
                  className="font-freight mb-3 text-ivory"
                  style={{ fontSize: "1.1rem", lineHeight: 1.2, letterSpacing: "-0.015em" }}
                >
                  {p.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: "rgba(240,240,236,0.6)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
