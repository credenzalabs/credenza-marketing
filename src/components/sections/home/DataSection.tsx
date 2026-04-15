import { useEffect, useRef, useState } from "react";
import { FileText, MoveRight, Shield, Store } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReveal } from "@/hooks/useReveal";

// ─── Data / Growth ───────────────────────────────────────────────────────────────
// ─── Program Insights Mockup ─────────────────────────────────────────────────
function KpiRingMock({ value, suffix, label, pct, color, sub }: { value: string; suffix?: string; label: string; pct: number; color: string; sub: string }) {
  const size = 36;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div
      className="bg-white px-3 py-2.5 flex items-center gap-2.5 min-w-0"
      style={{ border: "1px solid #ece9e3" }}
    >
      <svg width={size} height={size} className="shrink-0 -rotate-90 mt-0.5">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e4e1d8" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="butt" />
      </svg>
      <div>
        <div className="flex items-baseline gap-0.5">
          <span className="font-freight text-[18px] leading-none" style={{ color: "#1A1A1A" }}>{value}</span>
          {suffix && <span style={{ fontSize: "12px", color: "#a8a49c" }}>{suffix}</span>}
        </div>
        <p
          className="uppercase font-semibold mt-px"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.08em", color: "#a8a49c" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function SparkMock({ label, value, sub, color, points }: { label: string; value: string; sub: string; color: string; points: number[] }) {
  const w = 110;
  const h = 32;
  const max = Math.max(...points, 1);
  const coords = points.map((p, i) => ({
    x: 4 + (i / (points.length - 1)) * (w - 8),
    y: 3 + (1 - p / max) * (h - 6),
  }));
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  return (
    <div
      className="bg-white px-4 py-3.5 relative overflow-hidden"
      style={{ border: "1px solid #ece9e3" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between pl-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MoveRight size={11} style={{ color: "#a8a49c" }} />
            <span
              className="uppercase font-semibold"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.1em", color: "#a8a49c" }}
            >
              {label}
            </span>
          </div>
          <p className="font-freight text-[18px] leading-none" style={{ color: "#1A1A1A" }}>{value}</p>
          <p
            className="mt-1"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#c8c4bc" }}
          >
            {sub}
          </p>
        </div>
        <svg width={w} height={h} className="shrink-0 mt-1">
          <path d={d} fill="none" stroke={color} strokeWidth={1.5} />
          {coords.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 3 : 2} fill={i === coords.length - 1 ? "#3a6e70" : color} stroke="#fff" strokeWidth={1} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function SmallKpiMock({ label, value, sub, color, icon }: { label: string; value: string; sub: string; color: string; icon: React.ReactNode }) {
  return (
    <div
      className="bg-white px-4 py-3.5 relative overflow-hidden"
      style={{ border: "1px solid #ece9e3" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }} />
      <div className="pl-2">
        <div className="flex items-center gap-1.5 mb-1">
          <span style={{ color: "#a8a49c" }}>{icon}</span>
          <span
            className="uppercase font-semibold"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.1em", color: "#a8a49c" }}
          >
            {label}
          </span>
        </div>
        <p className="font-freight text-[18px] leading-none" style={{ color: "#1A1A1A" }}>{value}</p>
        <p
          className="mt-1"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#c8c4bc" }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

function ProgramInsightsMockup() {
  return (
    <div className="p-4" style={{ backgroundColor: "#FAF9F7" }}>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <h3
          className="font-freight font-normal"
          style={{ fontSize: "20px", color: "#1A1A1A" }}
        >
          Program Insights
        </h3>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a8a49c" }}>2,575 approved designers</span>
      </div>

      {/* Hero KPI rings — 5 across */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <KpiRingMock value="2,475" label="Trade" pct={100} color="#A9CFD3" sub="1,701 firms" />
        <KpiRingMock value="82" suffix="%" label="Approval" pct={82} color="#A9CFD3" sub="0.5d avg" />
        <KpiRingMock value="47" suffix="%" label="Auto" pct={47} color="#A9CFD3" sub="323 total" />
        <KpiRingMock value="33" suffix="%" label="Ordering" pct={33} color="#8B8B55" sub="561 ordering" />
      </div>

      {/* Bottom row — 4 cards */}
      <div className="grid grid-cols-4 gap-2">
        <SmallKpiMock label="Revenue" value="$1.29M" sub="626 orders" color="#8B8B55" icon={<Store size={10} />} />
        <SmallKpiMock label="Risk Alerts" value="0" sub="12 nexus gaps" color="#8f2d48" icon={<Shield size={10} />} />
        <SparkMock label="Applications" value="223" sub="last 6 months" color="#A9CFD3" points={[12, 14, 15, 42, 38, 35, 30]} />
        <SmallKpiMock label="Pending" value="7" sub="-12 this month" color="#A9CFD3" icon={<FileText size={10} />} />
      </div>
    </div>
  );
}

function AnimatedChart({ index, colors }: { index: number; colors: { teal: string; tealDark: string; olive: string; border: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pct33 = visible ? 33 : 0;
  const size = 48; const stroke = 4; const r = (size - stroke) / 2; const circ = 2 * Math.PI * r;

  const segments = [
    { label: "Residential", pct: 62, color: colors.teal },
    { label: "Hospitality", pct: 18, color: colors.olive },
    { label: "Commercial", pct: 12, color: colors.tealDark },
    { label: "Other", pct: 8, color: "#c8c4bc" },
  ];

  const states = [
    { name: "California", members: 108, firms: 72, pct: 100 },
    { name: "New York", members: 84, firms: 58, pct: 78 },
    { name: "Texas", members: 56, firms: 39, pct: 52 },
    { name: "Florida", members: 48, firms: 35, pct: 44 },
    { name: "Illinois", members: 36, firms: 27, pct: 33 },
  ];

  return (
    <div
      ref={ref}
      className="mt-auto pt-5 min-h-[140px]"
      style={{ borderTop: `1px solid ${colors.border}` }}
    >
      {index === 0 && (
        <div className="flex items-center gap-4">
          <svg width={size} height={size} className="shrink-0 -rotate-90">
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e4e1d8" strokeWidth={stroke} />
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={colors.olive} strokeWidth={stroke}
              strokeDasharray={circ} strokeDashoffset={circ - (pct33 / 100) * circ} strokeLinecap="butt"
              style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
          </svg>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-freight text-[20px] leading-none text-charcoal">33%</span>
              <span
                className="uppercase font-semibold"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.06em", color: "#a8a49c" }}
              >
                Penetration
              </span>
            </div>
            <p
              className="mt-[3px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#c8c4bc" }}
            >
              561 of 1,701 firms ordering
            </p>
          </div>
        </div>
      )}
      {index === 1 && (
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-freight text-[20px] leading-none text-charcoal">1,701</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a8a49c" }}>firms by focus</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden mb-2 rounded-[1px]">
            {segments.map(s => (
              <div key={s.label} style={{ width: visible ? `${s.pct}%` : "0%", backgroundColor: s.color, transition: "width 1s ease-out" }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {segments.map(s => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5" style={{ backgroundColor: s.color }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#6a6a62" }}>{s.label} {s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {index === 2 && (() => {
        const certSegments = [
          { label: "Current", pct: 96, color: colors.teal },
          { label: "Expiring soon", pct: 3, color: colors.olive },
          { label: "Lapsed", pct: 1, color: "#8f2d48" },
        ];
        return (
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-freight text-[20px] leading-none text-charcoal">96%</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a8a49c" }}>certs current</span>
            </div>
            <div className="flex h-3 w-full overflow-hidden mb-3 rounded-[1px]">
              {certSegments.map(s => (
                <div key={s.label} style={{ width: visible ? `${s.pct}%` : "0%", backgroundColor: s.color, transition: "width 1s ease-out" }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {certSegments.map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: s.color }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#6a6a62" }}>{s.label} {s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export function DataSection() {
  const ref = useReveal();
  const metrics = [
    {
      label: "Program performance",
      headline: "Know your numbers.",
      body: "Approval rates, revenue, penetration, and growth—tracked automatically. See which firms are ordering, which aren\u2019t, and what\u2019s driving the difference.",
      items: ["Approval rate & time to decision", "Revenue trends & highest-value firms", "Ordering penetration across your network"],
    },
    {
      label: "Designer analytics",
      headline: "Know who you're working with.",
      body: "Every approved designer comes with a verified profile. Segment your trade community by revenue, firm size, profession, credentials, or ordering behavior.",
      items: ["Firm demographics & profession breakdown", "Verification signal coverage", "Ordering vs non-ordering firm comparison", "Approval drivers—what signals predict success"],
    },
    {
      label: "Compliance & geography",
      headline: "Know where your risk is.",
      body: "Certificate health, expiration alerts, and geographic concentration—so you can see compliance gaps before they become audit issues.",
      items: ["Certificate health & expiration tracking", "Nexus coverage gaps", "Designer concentration by state", "Risk alerts surfaced automatically"],
    },
  ];
  return (
    <section ref={ref} className="reveal py-24 md:py-36 bg-forest">
      <div className="container">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <Eyebrow light>Program intelligence</Eyebrow>
          <h2
            className="font-freight text-ivory"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.9rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Data that powers
            <br />
            <span className="italic text-teal">your growth.</span>
          </h2>
          <p
            className="mt-5"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(240,240,236,0.65)" }}
          >
            Running your program is the floor, not the ceiling. Every application, approval, certificate, and order generates intelligence you can act on.
          </p>
        </div>

        {/* Three-column metric cards with inline charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m, i) => {
            const chartColors = { teal: "#A9CFD3", tealDark: "#3a6e70", olive: "#8B8B55", border: "#ece9e3" };
            return (
            <div key={i} className="p-8 md:p-10 flex flex-col bg-white">
              {/* Text content first */}
              <div
                className="uppercase text-teal-mid mb-5"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em" }}
              >
                {m.label}
              </div>
              <h3
                className="font-freight mb-4 text-charcoal"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                {m.headline}
              </h3>
              <p
                className="text-charcoal-mid mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.75 }}
              >
                {m.body}
              </p>
              <div className="space-y-2 mb-6">
                {m.items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-teal-mid" />
                    <span
                      className="text-charcoal-soft"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", lineHeight: 1.5 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini chart at bottom — animated on scroll */}
              <AnimatedChart index={i} colors={chartColors} />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
