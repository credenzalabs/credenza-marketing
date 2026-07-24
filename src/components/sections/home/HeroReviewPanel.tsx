import { useEffect, useState } from "react";
import {
  BookOpen, Check, CreditCard, ExternalLink, Eye, FileText, Globe, Instagram, Maximize2,
  MapPin, MessageSquareText, Phone, Shield, X, Zap,
} from "lucide-react";

/**
 * The Application Review card, flown in over the hero photograph.
 *
 * Chrome and content are the product's own (the "Application Review" drawer in
 * the trade app): ivory ground, the app's ScoreBadge, the real business-detail
 * grid, the signed resale certificates, and the verification signals with the
 * app's own icons and labels. Carries the full applicant record.
 *
 * The verification rows fly in from the right in sequence; once they've all
 * landed the Auto-approved badge drops into the header. Plays once, then holds.
 * The applicant is invented — real designer data stays out of marketing.
 */

/** The app's ScoreBadge, verbatim. */
function ScoreBadge({
  children, dot, style,
}: {
  children: React.ReactNode;
  dot?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className="inline-flex items-center gap-1 px-2 py-0.5 border rounded-[1px] text-[10px] tracking-wide shrink-0 border-[#1a3640] text-white bg-[#1a3640]"
    >
      {dot && <span className="inline-block w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: "currentColor" }} />}
      {children}
    </span>
  );
}

/** Lightweight positive status — a teal check + muted text, no filled pill.
 *  Keeps the row's result readable without stacking dark badges down the card. */
function Status({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 shrink-0 text-[10px]" style={{ color: "#7aa0a8" }}>
      <Check size={11} className="shrink-0" />
      <span style={{ color: "#8a897f" }}>{children}</span>
    </span>
  );
}

const SIGNALS = [
  { icon: <CreditCard size={13} />, label: "EIN", badge: "Verified" },
  { icon: <FileText size={13} />, label: "Certificate of Authority Number", badge: "Verified" },
  { icon: <Globe size={13} />, label: "Website", badge: "Confirmed" },
  { icon: <Instagram size={13} />, label: "Instagram", badge: "Strong Match" },
  { icon: <BookOpen size={13} />, label: "Professional Membership", badge: "ASID Verified" },
  { icon: <Shield size={13} />, label: "Identity Consistency", badge: "Consistent" },
  { icon: <MessageSquareText size={13} />, label: "Press Coverage", badge: "Featured (4)" },
];

const DETAILS = [
  ["Profession", "Interior Designer"],
  ["Revenue", "$1M–$5M"],
  ["Firm Size", "11"],
  ["EIN", "XX-XXX4821"],
  ["Years in Business", "11"],
  ["Projects/Year", "6–15"],
];

const CERTIFICATES = [
  { state: "NY", ref: "CZ-20260722-hK4nRw" },
  { state: "CA", ref: "CZ-20260722-Qdwxnu" },
];

function Divider() {
  return <div style={{ borderTop: "1px solid #e0dcd4" }} />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9px] uppercase tracking-[0.09em] font-medium" style={{ color: "#6a6a62" }}>
      {children}
    </div>
  );
}

export function HeroReviewPanel() {
  const [shown, setShown] = useState(false);
  const [flown, setFlown] = useState(0); // signal rows that have flown in
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setFlown(SIGNALS.length);
      setApproved(true);
      return;
    }
    // Hold on the bare room for a beat, then let the card and its rows arrive
    // slowly — the photograph should register before the product does.
    const timers = [setTimeout(() => setShown(true), 1400)];
    SIGNALS.forEach((_, i) => {
      timers.push(setTimeout(() => setFlown(i + 1), 2200 + i * 300));
    });
    timers.push(setTimeout(() => setApproved(true), 2200 + SIGNALS.length * 300 + 350));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute right-5 top-6 pointer-events-none select-none"
      style={{
        width: "340px",
        backgroundColor: "#f8f6f1",
        border: "1px solid #e0dcd4",
        boxShadow: "0 18px 50px rgba(0,0,0,0.24), 0 3px 10px rgba(0,0,0,0.10)",
        fontFamily: "Inter, system-ui, sans-serif",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateX(0)" : "translateX(16px)",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid #e0dcd4", backgroundColor: "#f8f6f1" }}
      >
        <span className="text-[10px] uppercase tracking-[0.09em] font-medium" style={{ color: "#6a6a62" }}>
          Application Review
        </span>
        <div className="flex items-center gap-1.5 text-[#6a6a62]">
          <Maximize2 size={12} />
          <X size={13} />
        </div>
      </div>

      <div className="px-4 py-3 space-y-2.5">
        {/* Applicant + decision */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-freight text-[15px] font-semibold text-[#1c1c19] leading-tight">
                Ellery Vance Interiors
              </div>
              <div className="text-[11px] text-[#6a6a62] mt-0.5">
                Ellery Vance, Principal · ellery@elleryvance.com
              </div>
            </div>
            <ScoreBadge
              dot
              style={{
                opacity: approved ? 1 : 0,
                transform: approved ? "scale(1)" : "scale(0.9)",
                transformOrigin: "right center",
                transition: "opacity 320ms ease-out, transform 320ms ease-out",
              }}
            >
              <Zap size={9} />
              Auto-approved
            </ScoreBadge>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-[#6a6a62]">
            <span className="inline-flex items-center gap-1"><MapPin size={10} />New York, NY</span>
            <span className="inline-flex items-center gap-1"><Phone size={10} />(212) 555-0142</span>
          </div>
        </div>

        <Divider />

        {/* Business details */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-1.5">
          {DETAILS.map(([label, value]) => (
            <div key={label}>
              <p className="text-[8.5px] uppercase tracking-[0.07em] text-[#6a6a62] mb-0.5">{label}</p>
              <p className="text-[11px] text-[#1c1c19] leading-tight">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[8.5px] uppercase tracking-[0.07em] text-[#6a6a62] mb-0.5">Tax Exempt States</p>
          <p className="text-[11px] text-[#1c1c19]">NY, CT, NJ, CA</p>
        </div>

        <Divider />

        {/* Certificates */}
        <div className="space-y-1.5">
          <SectionLabel>Certificates</SectionLabel>
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.state}
              className="flex items-center justify-between gap-2 px-2.5 py-1 bg-white border border-[#e0dcd4] rounded-[2px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText size={12} className="text-[#6a6a62] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-[#1c1c19] leading-tight">{cert.state} Certificate</p>
                  <p className="text-[9px] text-[#6a6a62]">{cert.ref}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Status>Signed</Status>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] border border-[#e0dcd4] bg-white text-[#1c1c19] rounded-[1px]">
                  <Eye size={9} />View
                </span>
                <ExternalLink size={10} className="text-[#6a6a62]" />
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Verification signals — each flies in from the right */}
        <div className="space-y-1.5">
          <SectionLabel>Verification Signals</SectionLabel>
          <div className="rounded-[2px] overflow-hidden border border-[#e0dcd4] bg-white">
            {SIGNALS.map((sig, i) => {
              const inView = i < flown;
              return (
                <div
                  key={sig.label}
                  className="flex items-center justify-between gap-2 px-3 py-[0.35rem]"
                  style={{
                    borderBottom: i < SIGNALS.length - 1 ? "1px solid #efeae2" : "none",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(22px)",
                    transition: "opacity 450ms ease-out, transform 450ms ease-out",
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[#6a6a62] shrink-0">{sig.icon}</span>
                    <span className="text-[12px] text-[#1c1c19] truncate">{sig.label}</span>
                  </div>
                  <Status>{sig.badge}</Status>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
