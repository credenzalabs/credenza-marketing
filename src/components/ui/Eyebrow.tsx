import type React from "react";

const TEAL_MID = "#7aa0a8";
const SAGE_DARK = "#d8d4ca";
const CHARCOAL_SOFT = "#6a6a62";

export function Eyebrow({
  children,
  light = false,
  teal = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  teal?: boolean;
}) {
  const lineColor = light ? "rgba(240,240,236,0.3)" : teal ? TEAL_MID : SAGE_DARK;
  const textColor = light ? "rgba(240,240,236,0.55)" : teal ? TEAL_MID : CHARCOAL_SOFT;
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "2rem", height: "1px", backgroundColor: lineColor, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: textColor,
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    </div>
  );
}
