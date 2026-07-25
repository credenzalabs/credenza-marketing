import {
  Download, Menu, Minus, MoreVertical, PenLine, Plus, Printer,
  RotateCw, Maximize, Redo2, Undo2, FilePlus2,
} from "lucide-react";

/**
 * A faithful mock of the product's Resale Certificate Engine preview
 * (cert-generator): the "PREVIEW · <vendor>" header with Edit Fields, the plain-
 * language explainer + tax-advice disclaimer, and the PDF viewer rendering a
 * filled-in Uniform Sales & Use Tax Resale Certificate — the finished document a
 * designer reviews and signs.
 *
 * Non-interactive marketing screenshot. The vendor, firm, and all data are
 * invented; real names stay out.
 */

const SERIF = "Georgia, 'Times New Roman', serif";

/** An inline field value on the form: text over an underline, like a filled PDF. */
function Fill({ children, w }: { children: React.ReactNode; w?: string }) {
  return (
    <span
      style={{ borderBottom: "1px solid #1c1c19", paddingBottom: "1px", display: "inline-block", minWidth: w, lineHeight: 1.1 }}
    >
      {children}
    </span>
  );
}

function CheckRow({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-1.5" style={{ fontSize: "0.6rem", color: "#1c1c19" }}>
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: "10px", height: "10px", border: "1px solid #1c1c19", fontSize: "0.55rem", lineHeight: 1, fontWeight: 700 }}
      >
        {checked ? "X" : ""}
      </span>
      {label}
    </div>
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
        <p className="mt-1.5" style={{ fontSize: "0.72rem", lineHeight: 1.55, color: "#9a988f", fontStyle: "italic" }}>
          Credenza does not provide tax advice. Confirm with your accountant if you're unsure whether a state's acceptance rule applies to your situation.
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

        {/* Document — cropped at the bottom like a scrolled PDF page */}
        <div className="px-6 md:px-10 py-8 overflow-hidden" style={{ backgroundColor: "#e9e9ea", maxHeight: "440px" }}>
          <div className="mx-auto bg-white" style={{ maxWidth: "620px", padding: "36px 44px", boxShadow: "0 1px 4px rgba(0,0,0,0.18)", fontFamily: SERIF, color: "#1c1c19" }}>
            <h4 className="text-center" style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.01em" }}>
              UNIFORM SALES &amp; USE TAX RESALE CERTIFICATE — MULTIJURISDICTION
            </h4>
            <p className="mt-3" style={{ fontSize: "0.6rem", lineHeight: 1.5, textAlign: "justify" }}>
              The below-listed states have indicated that this certificate is acceptable as a resale/exemption certificate for sales/use tax, subject to the instructions and notes on pages 2–6. The issuing Buyer and the recipient Seller have the responsibility to determine the proper use of this certificate under applicable laws in each state, as these may change from time to time.
            </p>

            <p className="mt-3" style={{ fontSize: "0.64rem" }}>
              Issued to Seller:&nbsp; <Fill w="180px">Corbel &amp; Co.</Fill>
            </p>
            <p className="mt-2" style={{ fontSize: "0.64rem" }}>
              Address:&nbsp; <Fill w="240px">250 Madison Ave., New York, NY 10001</Fill>
            </p>

            <div className="mt-3 flex gap-6">
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.64rem" }}>I certify that:</p>
                <p className="mt-1" style={{ fontSize: "0.64rem" }}>
                  Name of Firm (Buyer):&nbsp; <Fill w="120px">Marisol Ferrer Studio</Fill>
                </p>
                <p className="mt-1" style={{ fontSize: "0.64rem" }}>
                  Address:&nbsp; <Fill w="150px">1 S Dixie Hwy.</Fill>
                </p>
                <p className="mt-0.5" style={{ fontSize: "0.64rem" }}>
                  <Fill w="150px">West Palm Beach, FL 33401</Fill>
                </p>
              </div>
              <div style={{ width: "170px" }}>
                <p style={{ fontSize: "0.6rem" }}>is engaged or is registered as a</p>
                <div className="mt-1.5 space-y-1">
                  <CheckRow label="Wholesaler" />
                  <CheckRow label="Retailer" checked />
                  <CheckRow label="Manufacturer" />
                  <CheckRow label="Seller" />
                  <CheckRow label="Lessor" />
                  <CheckRow label="Other (Specify)" />
                </div>
              </div>
            </div>

            <p className="mt-3" style={{ fontSize: "0.6rem", lineHeight: 1.5, textAlign: "justify" }}>
              and is registered for sales/use tax with the below-listed states and cities within which Seller would deliver purchases to Buyer, and that any such purchases are for wholesale, resale, or ingredients of a new product to be resold, leased, or rented in the normal course of business.
            </p>

            <p className="mt-2.5" style={{ fontSize: "0.64rem" }}>
              Description of Business:&nbsp; <Fill w="120px">Interior Design</Fill>
            </p>
            <p className="mt-2" style={{ fontSize: "0.64rem", lineHeight: 1.5 }}>
              General description of tangible property or taxable services to be purchased from the Seller:&nbsp;
              <Fill w="220px">home furnishings, furniture, lighting, decor, and accessories</Fill>
            </p>

            {/* State registration table — header + first rows */}
            <table className="w-full mt-3" style={{ borderCollapse: "collapse", fontSize: "0.58rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#dfe6cf" }}>
                  <th style={{ border: "1px solid #1c1c19", padding: "3px 5px", textAlign: "left", width: "48px" }}>State</th>
                  <th style={{ border: "1px solid #1c1c19", padding: "3px 5px", textAlign: "left" }}>State Registration, Seller's Permit, or ID Number of Purchaser</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AZ", "20812255-9"],
                  ["MO", "—"],
                  ["NJ", "—"],
                ].map(([st, id]) => (
                  <tr key={st}>
                    <td style={{ border: "1px solid #1c1c19", padding: "4px 5px" }}>{st}</td>
                    <td style={{ border: "1px solid #1c1c19", padding: "4px 5px" }}>{id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
