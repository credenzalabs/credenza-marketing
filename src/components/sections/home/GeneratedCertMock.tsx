import {
  Download, Menu, Minus, MoreVertical, PenLine, Plus, Printer,
  RotateCw, Maximize, Redo2, Undo2, FilePlus2,
} from "lucide-react";

/**
 * A faithful mock of the product's Resale Certificate Engine preview
 * (cert-generator): the "PREVIEW · <vendor>" header with Edit Fields, the plain-
 * language explainer, the PDF viewer toolbar, and the genuine MTC Uniform Sales
 * & Use Tax Resale Certificate rendered from the real form (public/mtc-form.png,
 * exported from the product's own state-forms/MTC.pdf) with Credenza's filled
 * values overlaid — the finished document a designer reviews and signs.
 *
 * Non-interactive marketing screenshot. The vendor, firm, and all data are
 * invented; real names stay out.
 */

const SERIF = "Georgia, 'Times New Roman', serif";

// The rendered MTC page is drawn at a fixed width so the overlaid values keep
// their positions; the aspect ratio matches the source PNG (1700×2200).
const PAGE_W = 560;
const PAGE_H = Math.round((PAGE_W * 2200) / 1700);

/** A filled value overlaid on the blank MTC form, positioned as a % of the page. */
function Val({ left, top, children, size = 9 }: { left: number; top: number; children: React.ReactNode; size?: number }) {
  return (
    <span
      className="absolute whitespace-nowrap"
      style={{ left: `${left}%`, top: `${top}%`, fontFamily: SERIF, fontSize: `${size}px`, color: "#1a1a1a", lineHeight: 1 }}
    >
      {children}
    </span>
  );
}

export function GeneratedCertMock() {
  return (
    <div
      className="bg-white pointer-events-none select-none"
      style={{ border: "1px solid #e0dcd4", boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="px-6 md:px-8 pt-7 pb-0" style={{ fontFamily: "Inter, sans-serif" }}>
        {/* Preview header */}
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <div className="uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#6a6a62" }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", color: "#7aa0a8", marginRight: "0.5rem" }}>01</span>
            Preview · Corbel &amp; Co.
          </div>
          <span className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: "#7aa0a8", fontWeight: 600 }}>
            Edit fields
          </span>
        </div>

        <h3 className="font-freight" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em", color: "#1c1c19" }}>
          1 MTC (AZ, MO, NJ) certificate for Corbel &amp; Co.
        </h3>
        <p className="mt-2" style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "#6a6a62" }}>
          Based on your Arizona registration, we generated a Multistate Tax Commission (MTC) certificate for use in Arizona, Missouri, and New Jersey—states that let out-of-state resellers use the MTC format to claim valid exemptions.
        </p>
      </div>

      {/* PDF viewer */}
      <div className="mt-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2" style={{ backgroundColor: "#323639", color: "rgba(255,255,255,0.85)" }}>
          <Menu size={15} />
          <span className="flex items-center gap-2" style={{ fontSize: "0.72rem" }}>
            <span className="px-1.5 py-0.5 rounded-[2px]" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>1</span>
            / 9
          </span>
          <span className="flex items-center gap-2 ml-2">
            <Minus size={14} />
            <span className="px-1.5 py-0.5 rounded-[2px]" style={{ backgroundColor: "rgba(255,255,255,0.12)", fontSize: "0.7rem" }}>78%</span>
            <Plus size={14} />
          </span>
          <span className="flex items-center gap-3 ml-1">
            <Maximize size={14} />
            <RotateCw size={14} />
          </span>
          <span className="w-px h-4 mx-1" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <PenLine size={14} />
          <span className="flex items-center gap-3 ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Undo2 size={14} />
            <Redo2 size={14} />
          </span>
          <span className="flex items-center gap-3 ml-auto">
            <FilePlus2 size={14} />
            <Download size={14} />
            <Printer size={14} />
            <MoreVertical size={14} />
          </span>
        </div>

        {/* Document — the genuine MTC form, cropped at the bottom like a scrolled PDF */}
        <div className="flex justify-center overflow-x-auto overflow-y-hidden" style={{ backgroundColor: "#e9e9ea", padding: "20px 16px 0", maxHeight: "470px" }}>
          <div className="relative shrink-0" style={{ width: `${PAGE_W}px`, height: `${PAGE_H}px`, boxShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
            <img src="/mtc-form.png" alt="Uniform Sales & Use Tax Resale Certificate — Multijurisdiction" className="block w-full h-full" />
            {/* Filled values, positioned over the blank form */}
            <Val left={16.5} top={15.2}>Corbel &amp; Co.</Val>
            <Val left={12.5} top={17.9}>250 Madison Ave., New York, NY 10001</Val>
            <Val left={22} top={22.2}>Marisol Ferrer Studio</Val>
            <Val left={12.5} top={23.6}>1 S Dixie Hwy.</Val>
            <Val left={6} top={26.7}>West Palm Beach, FL 33401</Val>
            <Val left={54.3} top={24.3} size={10}>X</Val>
            <Val left={20.8} top={37.2}>Interior Design</Val>
            <Val left={6} top={42.8}>home furnishings, furniture, lighting, decor &amp; accessories</Val>
            <Val left={22} top={51.9} size={8}>20812255-9</Val>
          </div>
        </div>
      </div>
    </div>
  );
}
