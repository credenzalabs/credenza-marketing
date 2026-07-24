import { useEffect, useState } from "react";
import {
  BookOpen, CreditCard, FileText, Globe, Instagram, Maximize2,
  MessageSquareText, Shield, X, Zap,
} from "lucide-react";

/**
 * A compact Application Review card that flies in over the hero photograph.
 *
 * The chrome is the product's own (the "Application Review" drawer from the
 * trade app): ivory ground, the app's ScoreBadge, the real signal icons and
 * labels. Trimmed to the moment that matters in a hero — the applicant, the
 * verification signals, and the automatic approval. Each signal row flies in
 * from the right in sequence; once they've all landed the Auto-approved badge
 * drops in. Plays once, then holds.
 *
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

const SIGNALS = [
  { icon: <CreditCard size={13} />, label: "EIN", badge: "Verified" },
  { icon: <FileText size={13} />, label: "Certificate of Authority Number", badge: "Verified" },
  { icon: <Globe size={13} />, label: "Website", badge: "Confirmed" },
  { icon: <Instagram size={13} />, label: "Instagram", badge: "Strong Match" },
  { icon: <BookOpen size={13} />, label: "Professional Membership", badge: "ASID Verified" },
  { icon: <Shield size={13} />, label: "Identity Consistency", badge: "Consistent" },
  { icon: <MessageSquareText size={13} />, label: "Press Coverage", badge: "Featured (4)" },
];

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
    const timers = [setTimeout(() => setShown(true), 350)];
    SIGNALS.forEach((_, i) => {
      timers.push(setTimeout(() => setFlown(i + 1), 800 + i * 150));
    });
    timers.push(setTimeout(() => setApproved(true), 800 + SIGNALS.length * 150 + 250));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute right-5 bottom-5 pointer-events-none select-none"
      style={{
        width: "330px",
        backgroundColor: "#f8f6f1",
        border: "1px solid #e0dcd4",
        boxShadow: "0 18px 50px rgba(0,0,0,0.24), 0 3px 10px rgba(0,0,0,0.10)",
        fontFamily: "Inter, system-ui, sans-serif",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid #e0dcd4" }}
      >
        <span className="text-[10px] uppercase tracking-[0.09em] font-medium" style={{ color: "#6a6a62" }}>
          Application Review
        </span>
        <div className="flex items-center gap-1.5 text-[#6a6a62]">
          <Maximize2 size={12} />
          <X size={13} />
        </div>
      </div>

      <div className="px-4 py-3.5">
        {/* Applicant + decision */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="font-freight text-[15px] font-semibold text-[#1c1c19] leading-tight">
              Ellery Vance Interiors
            </div>
            <div className="text-[11px] text-[#6a6a62] mt-0.5">Ellery Vance, Principal</div>
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

        {/* Verification signals — each flies in from the right */}
        <div className="text-[9px] uppercase tracking-[0.09em] font-medium mb-2" style={{ color: "#6a6a62" }}>
          Verification Signals
        </div>
        <div className="rounded-[2px] overflow-hidden border border-[#e0dcd4] bg-white">
          {SIGNALS.map((sig, i) => {
            const inView = i < flown;
            return (
              <div
                key={sig.label}
                className="flex items-center justify-between gap-2 px-3 py-[0.45rem]"
                style={{
                  borderBottom: i < SIGNALS.length - 1 ? "1px solid #efeae2" : "none",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(22px)",
                  transition: "opacity 300ms ease-out, transform 300ms ease-out",
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[#6a6a62] shrink-0">{sig.icon}</span>
                  <span className="text-[12px] text-[#1c1c19] truncate">{sig.label}</span>
                </div>
                <ScoreBadge dot>{sig.badge}</ScoreBadge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
