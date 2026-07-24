import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";
import { useStagger } from "@/hooks/useStagger";
import { RotateCcw, TrendingUp, UserMinus, UserPlus } from "lucide-react";

// ─── Program Intelligence ─────────────────────────────────────────────────────
// A single, faithful "Program Insights" dashboard mock (fictional data) beside
// short copy on the four things the product surfaces.

function Kpi({ value, suffix, label, sub, pct, color }: { value: string; suffix?: string; label: string; sub?: string; pct?: number; color: string }) {
  const size = 34;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="bg-white px-3 py-2.5 flex items-center gap-2 min-w-0" style={{ border: "1px solid #ece9e3" }}>
      {pct !== undefined && (
        <svg width={size} height={size} className="shrink-0 -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e4e1d8" strokeWidth={stroke} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} strokeLinecap="butt" />
        </svg>
      )}
      <div className="min-w-0">
        <div className="flex items-baseline gap-0.5">
          <span className="font-freight leading-none" style={{ fontSize: "17px", color: "#1A1A1A" }}>{value}</span>
          {suffix && <span style={{ fontSize: "11px", color: "#a8a49c" }}>{suffix}</span>}
        </div>
        <p className="uppercase" style={{ fontFamily: "Inter, sans-serif", fontSize: "8.5px", letterSpacing: "0.06em", color: "#a8a49c", marginTop: "2px" }}>{label}</p>
        {sub && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#c8c4bc", marginTop: "1px" }}>{sub}</p>}
      </div>
    </div>
  );
}

function WhatChangedRows() {
  const rows = [
    { Icon: UserPlus, label: "New buyers", sub: "58 firms · first order", mag: 88, value: "+$88K", positive: true },
    { Icon: RotateCcw, label: "Reactivated", sub: "29 firms · returned", mag: 54, value: "+$54K", positive: true },
    { Icon: TrendingUp, label: "Retained growth", sub: "13 firms · $31K→$47K", mag: 16, value: "+$16K", positive: true },
    { Icon: UserMinus, label: "Lapsed", sub: "34 firms · no order", mag: 44, value: "−$44K", positive: false },
  ];
  const maxMag = 88;
  const teal = "#7aa0a8";
  const maroon = "#8f2d48";
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => {
        const half = (r.mag / maxMag) * 50;
        const color = r.positive ? teal : maroon;
        const Icon = r.Icon;
        return (
          <div key={r.label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 shrink-0" style={{ width: "128px" }}>
              <Icon size={13} style={{ color }} className="shrink-0" />
              <div className="min-w-0">
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#1A1A1A", fontWeight: 600, lineHeight: 1.15 }}>{r.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#a8a49c", lineHeight: 1.2 }}>{r.sub}</div>
              </div>
            </div>
            <div className="relative flex-1" style={{ height: "16px" }}>
              <div className="absolute top-0 bottom-0" style={{ left: "50%", width: "1px", backgroundColor: "#d8d4ca" }} />
              <div
                className="absolute"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "11px",
                  backgroundColor: color,
                  width: `${half}%`,
                  ...(r.positive ? { left: "50%" } : { right: "50%" }),
                }}
              />
            </div>
            <span className="shrink-0 text-right" style={{ width: "64px", fontFamily: "Inter, sans-serif", fontSize: "11px", color, fontWeight: 500 }}>{r.value} →</span>
          </div>
        );
      })}
    </div>
  );
}

function StateBars() {
  const rows = [
    { label: "New York", pct: 100, value: "214" },
    { label: "Connecticut", pct: 78, value: "168" },
    { label: "Texas", pct: 71, value: "152" },
    { label: "California", pct: 66, value: "141" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-2">
          <span className="shrink-0 text-right" style={{ width: "72px", fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#6a6a62" }}>{r.label}</span>
          <div className="flex-1 overflow-hidden" style={{ height: "9px", backgroundColor: "#ece9e3" }}>
            <div style={{ width: `${r.pct}%`, height: "100%", backgroundColor: "#7aa0a8" }} />
          </div>
          <span className="shrink-0 text-right" style={{ width: "30px", fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#1A1A1A" }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="uppercase mb-2.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.1em", color: "#a8a49c" }}>
      {children}
    </div>
  );
}

function InsightsDashboard() {
  const certSegments = [
    { pct: 97, color: "#A9CFD3" },
    { pct: 2, color: "#8B8B55" },
    { pct: 1, color: "#8f2d48" },
  ];
  return (
    <div
      className="pointer-events-none select-none overflow-hidden"
      style={{ backgroundColor: "#FAF9F7", border: "1px solid #e0dcd4", boxShadow: "0 16px 56px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.08)" }}
    >
      {/* Header + tabs */}
      <div className="px-5 pt-5">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <span className="font-freight font-light" style={{ fontSize: "19px", color: "#1A1A1A" }}>Program Insights</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a8a49c" }}>Last 12 months · 1,240 designers</span>
        </div>
        <div className="flex items-center gap-5" style={{ borderBottom: "1px solid #ece9e3" }}>
          {[
            { label: "Overview", active: true },
            { label: "Member Health", active: false },
            { label: "Sample Conversion", active: false },
          ].map((t) => (
            <span
              key={t.label}
              className="pb-2.5"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                color: t.active ? "#1A1A1A" : "#a8a49c",
                fontWeight: t.active ? 600 : 400,
                borderBottom: t.active ? "2px solid #8B8B55" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="px-5 pt-5 pb-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Kpi value="$198K" label="Trade revenue" sub="+136%" color="#8B8B55" />
        <Kpi value="312" label="Active firms" sub="+110%" color="#A9CFD3" />
        <Kpi value="22" suffix="%" label="Repeat rate" pct={22} color="#A9CFD3" />
        <Kpi value="25" suffix="%" label="Penetration" pct={25} color="#8B8B55" />
      </div>

      {/* What changed */}
      <div className="px-5 py-4" style={{ borderTop: "1px solid #ece9e3" }}>
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <SectionLabel>What changed</SectionLabel>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px" }}>
            <span style={{ color: "#a8a49c" }}>$84K → </span>
            <span style={{ color: "#1A1A1A" }}>$198K</span>
            <span style={{ color: "#3a6e70" }}> · +$114K</span>
          </span>
        </div>
        <WhatChangedRows />
      </div>

      {/* Cert health + geography */}
      <div className="px-5 py-4 grid grid-cols-2 gap-5" style={{ borderTop: "1px solid #ece9e3" }}>
        <div>
          <SectionLabel>Certificate health</SectionLabel>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-freight leading-none" style={{ fontSize: "18px", color: "#1A1A1A" }}>97%</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a8a49c" }}>current</span>
          </div>
          <div className="flex overflow-hidden" style={{ height: "10px" }}>
            {certSegments.map((s, i) => (
              <div key={i} style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Designers by state</SectionLabel>
          <StateBars />
        </div>
      </div>
    </div>
  );
}

export function DataSection() {
  const ref = useReveal();
  const dashRef = useStagger();
  const capabilities = [
    {
      label: "Program performance",
      desc: "Revenue, active firms, repeat rate, and penetration—tracked period-over-period, with the drivers behind every move.",
    },
    {
      label: "Member health",
      desc: "Your trade audience ranked into prioritized, exportable segments—dormant VIPs, lapsed buyers, and one-and-done firms, each by name.",
    },
    {
      label: "Product intelligence",
      desc: "For brands that sample: which products convert from sample to paid order, and how long the nurture takes.",
    },
    {
      label: "Compliance & geography",
      desc: "Certificate health and where your designers concentrate relative to your nexus states—before they become audit issues.",
    },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-36 bg-forest">
      <div className="container">
        {/* Section header */}
        <div className="mb-14 max-w-3xl">
          <Eyebrow light>Program intelligence</Eyebrow>
          <h2
            className="font-freight text-ivory"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.9rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Stop reporting on your program—
            <br />
            <span className="italic text-teal">start growing it.</span>
          </h2>
          <p
            className="mt-5 max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(240,240,236,0.65)" }}
          >
            Every application, approval, certificate, and order generates intelligence you can act on. Credenza surfaces it as specific numbers, named accounts, and named products—not just a dashboard.
          </p>
        </div>

        {/* Capabilities — copy first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 mb-14">
          {capabilities.map((c) => (
            <div key={c.label} style={{ borderTop: "1px solid rgba(240,240,236,0.12)" }} className="pt-5">
              <div
                className="uppercase mb-2"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#A9CFD3" }}
              >
                {c.label}
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(240,240,236,0.72)" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width dashboard — the proof moment */}
        <div ref={dashRef} className="stagger-item" data-stagger>
          <InsightsDashboard />
        </div>
      </div>
    </section>
  );
}
