import {
  AlertTriangle, Check, ChevronDown, Clock, Download, Eye, FileText,
  Map as MapIcon, RefreshCw, Search, Shield, X,
} from "lucide-react";

/**
 * A faithful mock of the product's Exemption Records page (VendorCertificates in
 * the trade app): header with Tax Audit Export / Send Reminders, the Coverage
 * Map bar, the five stat cards, the status TabBar (teal top-border active tab,
 * colored count badges), search + filters, and the certificate table with firm
 * avatars, per-row status dots, renewal reminders, and row actions.
 *
 * Non-interactive marketing screenshot. Every firm and number is invented;
 * real designer data stays out.
 */

const C = {
  border: "#e0dcd4",
  charcoal: "#1c1c19",
  grey: "#6a6a62",
  ivory: "#faf9f7",
  duckEgg: "#acc4c5",
  green: "#3a6e70",
  amber: "#7a7a52",
  red: "#8f2d48",
};

const STATS = [
  { icon: <Shield size={15} style={{ color: C.grey }} />, label: "Total", value: "312" },
  { icon: <Check size={15} style={{ color: C.green }} />, label: "Signed", value: "305" },
  { icon: <AlertTriangle size={15} style={{ color: C.amber }} />, label: "Expiring Soon", value: "6" },
  { icon: <X size={15} style={{ color: C.red }} />, label: "Expired", value: "1" },
  { icon: <RefreshCw size={15} style={{ color: C.grey }} />, label: "Auto-Renewable", value: "289" },
];

const TABS = [
  { label: "All", count: "312", badgeBg: "#e0dcd4", badgeText: C.charcoal },
  { label: "Signed", count: "305", badgeBg: "#e8f0f0", badgeText: C.green },
  { label: "Expiring Soon", count: "6", badgeBg: "#f0ede6", badgeText: C.amber },
  { label: "Expired", count: "1", badgeBg: "#f5e8ec", badgeText: C.red },
];

const ROWS = [
  { mono: "EV", firm: "Ellery Vance Interiors", state: "New York", abbr: "NY", form: "ST-120", expires: "N/A", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: C.green, renewal: "Jul 7, 2029" },
  { mono: "MF", firm: "Marisol Ferrer Studio", state: "California", abbr: "CA", form: "CDTFA-230", expires: "N/A", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: C.green, renewal: "Aug 2, 2029" },
  { mono: "WG", firm: "Whitfield & Gray", state: "Florida", abbr: "FL", form: "DR-13", expires: "Sep 30, 2026", status: "Expiring soon", sub: "Renewal pre-filled", dot: C.amber, renewal: "Reminder sent · 30 days" },
  { mono: "AL", firm: "Aster Lane Interiors", state: "Texas", abbr: "TX", form: "01-339", expires: "N/A", status: "Valid until revoked", sub: "Confirmed every 3 yrs", dot: C.green, renewal: "Mar 14, 2029" },
];

function HeaderButton({ icon, children, filled }: { icon: React.ReactNode; children: React.ReactNode; filled?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap rounded-[1px]"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.8rem",
        border: `1px solid ${C.charcoal}`,
        backgroundColor: filled ? C.charcoal : "transparent",
        color: filled ? "white" : C.charcoal,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

export function ExemptionRecordsMock() {
  return (
    <div
      className="bg-white pointer-events-none select-none"
      style={{ border: `1px solid ${C.border}`, boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="p-6 md:p-8" style={{ fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="max-w-xl">
            <h3 className="font-freight" style={{ fontSize: "1.5rem", letterSpacing: "-0.015em", color: C.charcoal }}>
              Exemption Records
            </h3>
            <p className="mt-1" style={{ fontSize: "0.8rem", lineHeight: 1.55, color: C.charcoal }}>
              Manage resale and tax-exemption certificates across your trade program.{" "}
              <span style={{ color: C.grey }}>Designers automatically receive renewal reminders 60, 30, and 7 days before expiration.</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <HeaderButton icon={<FileText size={13} />}>Tax Audit Export</HeaderButton>
            <HeaderButton icon={<Clock size={13} />}>Send Reminders</HeaderButton>
          </div>
        </div>

        {/* Coverage Map bar */}
        <div className="flex items-center gap-2 px-4 py-3 mb-5 rounded-[2px]" style={{ border: `1px solid ${C.border}` }}>
          <MapIcon size={16} style={{ color: C.grey }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: C.charcoal }}>Coverage Map</span>
          <span className="ml-auto" style={{ fontSize: "0.72rem", color: C.grey }}>Expand</span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-4 rounded-[2px]" style={{ border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-1.5">
                {s.icon}
                <span className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: C.grey }}>{s.label}</span>
              </div>
              <div className="font-freight mt-2" style={{ fontSize: "1.7rem", lineHeight: 1, letterSpacing: "-0.02em", color: C.charcoal }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex rounded-[1px] overflow-hidden mb-4" style={{ border: `1px solid ${C.border}` }}>
          {TABS.map((t, i) => {
            const active = i === 0;
            return (
              <div
                key={t.label}
                className="flex flex-1 items-center justify-center gap-2 px-4 py-3 whitespace-nowrap"
                style={{
                  borderRight: i < TABS.length - 1 ? `1px solid ${C.border}` : "none",
                  borderTop: `2px solid ${active ? C.duckEgg : "transparent"}`,
                  fontFamily: "freight-display-pro, Georgia, serif",
                  fontSize: "0.95rem",
                  fontWeight: active ? 550 : 450,
                  color: active ? C.charcoal : C.grey,
                }}
              >
                {t.label}
                <span
                  className="inline-flex items-center justify-center px-1.5 rounded-[2px]"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", fontWeight: 600, minWidth: "18px", height: "16px", backgroundColor: t.badgeBg, color: t.badgeText }}
                >
                  {t.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.grey }} />
            <div className="w-full pl-9 pr-3 py-2 rounded-[1px]" style={{ border: `1px solid ${C.border}`, fontSize: "0.82rem", color: C.grey }}>
              Search by firm, designer, or state...
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[1px]" style={{ border: `1px solid ${C.border}`, fontSize: "0.82rem", color: C.charcoal }}>
            All Certificate Types <ChevronDown size={14} style={{ color: C.grey }} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[1px]" style={{ border: `1px solid ${C.border}`, fontSize: "0.82rem", color: C.charcoal }}>
            All <ChevronDown size={14} style={{ color: C.grey }} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "760px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Firm", "State", "Form", "Expires", "Status", "Renewal Reminder", ""].map((h, i) => (
                  <th key={i} className="uppercase text-left px-4 py-3" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: C.grey, fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.firm} style={{ borderBottom: `1px solid #ece9e3` }}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center shrink-0 rounded-[1px]"
                        style={{ width: "26px", height: "26px", border: `1px solid ${C.border}`, backgroundColor: C.ivory, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.03em", color: C.grey }}
                      >
                        {r.mono}
                      </span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 500, color: C.charcoal }}>{r.firm}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: "0.82rem", color: C.charcoal }}>{r.state}</span>
                    <span className="ml-1.5" style={{ fontSize: "0.7rem", color: C.grey }}>{r.abbr}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: "0.82rem", color: C.charcoal }}>{r.form}</span>
                    <span className="block" style={{ fontSize: "0.68rem", color: C.grey }}>Generated by Credenza</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: "0.8rem", color: C.grey }}>{r.expires}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: r.dot }} />
                      <span>
                        <span className="block" style={{ fontSize: "0.8rem", color: C.charcoal }}>{r.status}</span>
                        <span className="block" style={{ fontSize: "0.68rem", color: C.grey }}>{r.sub}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: "0.78rem", color: C.grey }}>{r.renewal}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <span className="inline-flex items-center gap-3" style={{ color: C.grey }}>
                      <span className="inline-flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Eye size={12} />View</span>
                      <span className="inline-flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Download size={12} />Download</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
