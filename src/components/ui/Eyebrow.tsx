import type React from "react";

const TEAL_MID = "#7aa0a8";
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
  const textColor = light ? "rgba(240,240,236,0.55)" : teal ? TEAL_MID : CHARCOAL_SOFT;
  return (
    <div className="mb-6">
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
