import { useEffect, useState } from "react";
import {
  BookOpen, CreditCard, ExternalLink, Eye, FileText, Globe, Instagram, Maximize2,
  MapPin, MessageSquareText, Phone, RefreshCw, Shield, X,
} from "lucide-react";

/**
 * The Application Review drawer, auto-approved — reproduced from the product
 * itself (components/vendor/ReviewPanel.tsx + review/ReviewHeader.tsx +
 * review/VerificationSummary.tsx in the trade app).
 *
 * Rendered at the drawer's own width and then scaled down as a whole, so this
 * stays a faithful screenshot rather than a marketing approximation: the real
 * ivory drawer ground (#f8f6f1), the real sticky "Application Review" header,
 * the app's own ScoreBadge, the real business-detail grid, and the Verification
 * Signals list with the app's own signal labels and icons.
 *
 * Shows the full applicant record the real drawer shows — contact, links, the
 * business-detail grid including tax-exempt states, the signed resale
 * certificates on file, then the signals. Cropped like a screenshot at the
 * bottom edge, where Portfolio would follow.
 *
 * Because this application was already decided, the drawer renders no
 * Decline/Approve buttons, no A/D keyboard hints, and no rep or discount-tier
 * pickers — the product hides all of those once a decision exists.
 *
 * The applicant is invented; real designer data stays out of marketing.
 */

const PANEL_W = 350; // rendered width over the hero photograph
const TRUE_W = 522; // the drawer's own width
const SCALE = PANEL_W / TRUE_W;

/** The app's ScoreBadge, verbatim. */
function ScoreBadge({
  variant, children, dot, style,
}: {
  variant: "verified" | "muted";
  children: React.ReactNode;
  dot?: boolean;
  style?: React.CSSProperties;
}) {
  const variants = {
    verified: "border-[#1a3640] text-white bg-[#1a3640]",
    muted: "border-[#C8C4BC] text-[#737373] bg-transparent",
  };
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded-[1px] text-[10px] tracking-wide shrink-0 ${variants[variant]}`}
    >
      {dot && (
        <span
          className="inline-block w-[5px] h-[5px] rounded-full shrink-0"
          style={{ backgroundColor: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}

/** Signal icons + labels as the drawer defines them. */
const SIGNALS = [
  {
    icon: <CreditCard size={14} />,
    label: "EIN",
    badge: "Verified",
    detail: "IRS Match found. TIN and Name combination matches IRS EIN records.",
  },
  {
    // The row label is per-state — the field is named differently everywhere.
    // This applicant is a New York firm, so the app labels it "Certificate of
    // Authority Number" (STATE_TAX_ID_NAMES.NY.primaryLabel).
    icon: <FileText size={14} />,
    label: "Certificate of Authority Number",
    badge: "Verified",
    detail: "Ellery Vance Interiors—automatically verified against state records",
  },
  {
    icon: <Globe size={14} />,
    label: "Website",
    badge: "Confirmed",
    detail:
      "Belongs to Ellery Vance Interiors, a New York–based residential design firm—business name, city, and state all match the application.",
  },
  { icon: <Instagram size={14} />, label: "Instagram", badge: "Strong Match", detail: null },
  { icon: <BookOpen size={14} />, label: "Professional Membership", badge: "ASID Verified", detail: null },
  { icon: <Shield size={14} />, label: "Identity Consistency", badge: "Consistent", detail: null },
  { icon: <MessageSquareText size={14} />, label: "Press Coverage", badge: "Featured (4)", detail: null },
];

const DETAILS_ROW_1 = [
  ["Profession", "Interior Designer"],
  ["Revenue", "$1M–$5M"],
  ["Firm Size", "11"],
  ["EIN", "XX-XXX4821"],
];

const DETAILS_ROW_2 = [
  ["Years in Business", "11"],
  ["Projects/Year", "6–15"],
];

const CERTIFICATES = [
  { state: "NY", issued: "7/22/2026", ref: "CZ-20260722-hK4nRw" },
  { state: "CA", issued: "7/22/2026", ref: "CZ-20260722-Qdwxnu" },
];

export function HeroReviewPanel() {
  const [shown, setShown] = useState(false);
  const [revealed, setRevealed] = useState(0); // signal badges settled so far
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setRevealed(SIGNALS.length);
      setDecided(true);
      return;
    }
    const timers = [setTimeout(() => setShown(true), 400)];
    SIGNALS.forEach((_, i) => {
      timers.push(setTimeout(() => setRevealed(i + 1), 900 + i * 90));
    });
    timers.push(setTimeout(() => setDecided(true), 900 + SIGNALS.length * 90 + 260));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute right-0 top-0 pointer-events-none select-none overflow-hidden"
      style={{
        width: `${PANEL_W}px`,
        height: "620px",
        backgroundColor: "#f8f6f1",
        boxShadow: "-8px 0 30px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.22)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateX(0)" : "translateX(18px)",
        transition: "opacity 450ms ease-out, transform 450ms ease-out",
      }}
    >
      <div
        style={{
          width: `${TRUE_W}px`,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Sticky header — decided, so no action buttons or keyboard hints */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ backgroundColor: "#f8f6f1", borderBottom: "1px solid #e0dcd4" }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.08em] font-medium"
            style={{ color: "#6a6a62" }}
          >
            Application Review
          </span>
          <div className="flex items-center gap-1.5 shrink-0 text-[#6a6a62]">
            <Maximize2 size={14} />
            <X size={16} />
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Firm & designer */}
          <div>
            <h2 className="font-freight text-base font-semibold text-[#1c1c19]">
              Ellery Vance Interiors
            </h2>
            <p className="text-[13px] text-[#6a6a62] mt-1">
              Ellery Vance, Principal &middot; ellery@elleryvance.com
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-[#6a6a62]">
              <span>Submitted Jul 22, 2026</span>
              <span>&middot; Referral</span>
              <span style={{ opacity: decided ? 1 : 0, transition: "opacity 300ms ease-out" }}>
                &middot; Decided Jul 22, 2026
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            style={{
              opacity: decided ? 1 : 0,
              transform: decided ? "scale(1)" : "scale(0.97)",
              transformOrigin: "left center",
              transition: "opacity 300ms ease-out, transform 300ms ease-out",
            }}
          >
            <ScoreBadge variant="verified" dot>Auto-approved</ScoreBadge>
          </div>

          {/* Contact & links */}
          <div
            className="py-3 space-y-2"
            style={{ borderTop: "1px solid #e0dcd4", borderBottom: "1px solid #e0dcd4" }}
          >
            <div className="flex items-center gap-4 flex-wrap text-[13px] text-[#6a6a62]">
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} className="shrink-0" />
                118 Crosby St, New York, NY 10012
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone size={12} className="shrink-0" />
                (212) 555-0142
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-[12px] text-[#3a6e70]">
                <Globe size={12} />
                elleryvance.com
                <ExternalLink size={9} />
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] text-[#3a6e70]">
                <Instagram size={12} />
                @elleryvance
                <ExternalLink size={9} />
              </span>
            </div>
          </div>

          {/* Business details */}
          <div className="py-3 space-y-3" style={{ borderBottom: "1px solid #e0dcd4" }}>
            <div className="grid grid-cols-4 gap-3">
              {DETAILS_ROW_1.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a62] mb-0.5">{label}</p>
                  <p className="text-[13px] text-[#1c1c19]">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {DETAILS_ROW_2.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a62] mb-0.5">{label}</p>
                  <p className="text-[13px] text-[#1c1c19]">{value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a62] mb-0.5">
                  Primary Work Focus
                </p>
                <p className="text-[13px] text-[#1c1c19]">Residential</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a62] mb-0.5">
                Tax Exempt States
              </p>
              <p className="text-[13px] text-[#1c1c19]">NY, CT, NJ, CA</p>
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: "#6a6a62" }}>
              Certificates
            </h3>
            <div className="space-y-2">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.state}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-[#e0dcd4] rounded-[2px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText size={14} className="text-[#6a6a62] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[13px] text-[#1c1c19]">{cert.state} Certificate</p>
                      <p className="text-[11px] text-[#6a6a62]">
                        Issued {cert.issued} &middot; {cert.ref}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ScoreBadge variant="verified" dot>Signed</ScoreBadge>
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] border border-[#e0dcd4] bg-white text-[#1c1c19] rounded-[1px]">
                      <Eye size={10} />
                      View
                    </span>
                    <ExternalLink size={11} className="text-[#6a6a62]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification signals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: "#6a6a62" }}>
                Verification Signals
              </h3>
              <span
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] border border-[#e0dcd4] rounded-[1px]"
                style={{ color: "#3a6e70" }}
              >
                <RefreshCw size={10} />
                Re-verify All
              </span>
            </div>
            <div className="rounded-[2px] overflow-hidden border border-[#e0dcd4]">
              {SIGNALS.map((sig, i) => (
                <div
                  key={sig.label}
                  className="px-4 py-2.5 bg-white"
                  style={{ borderBottom: "1px solid #e0dcd4" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[#6a6a62] shrink-0">{sig.icon}</span>
                      <span className="text-[13px] text-[#1c1c19]">{sig.label}</span>
                    </div>
                    <ScoreBadge
                      variant="verified"
                      dot
                      style={{ opacity: i < revealed ? 1 : 0, transition: "opacity 260ms ease-out" }}
                    >
                      {sig.badge}
                    </ScoreBadge>
                  </div>
                  {sig.detail && (
                    <p className="text-[11px] text-[#6a6a62] mt-1 ml-[26px] leading-relaxed">
                      {sig.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Soften the crop at the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(248,246,241,0), #f8f6f1)" }}
      />
    </div>
  );
}
