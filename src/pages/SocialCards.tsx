/*
 * SOCIAL CARDS — vendor-facing promoted-post creative
 *
 * Renders LinkedIn 1:1 (1080×1080) and Instagram 4:5 (1080×1350) variants
 * at exact pixel dimensions for screenshot capture. Not linked from nav or
 * sitemap. To export: open /social-cards in a Retina display at 100% zoom,
 * then Cmd+Shift+4 → Space → click the card. macOS captures at 2x device
 * pixels, so a 1080-wide card exports as 2160px (downsample to 1080 if the
 * platform requires it).
 *
 * Layout mirrors Checkr's promoted-post format: midnight canvas, wordmark
 * top-left, two-line Freight Display headline, sky CTA pill, product
 * dashboard anchored bottom-right with overflow.
 */

import { Link } from "react-router-dom";

const HEADLINE_LINE_1 = "Designer verification,";
const HEADLINE_LINE_2 = "done right.";
const CTA_LABEL = "Get started";
const DASHBOARD_SRC = "/dashboard-insights.png";

type CardProps = {
  width: number;
  height: number;
  label: string;
};

function SocialCard({ width, height, label }: CardProps) {
  // Scale the headline to the canvas height so 1:1 and 4:5 stay visually consistent.
  const headlineSize = Math.round(height * 0.095);
  const wordmarkSize = Math.round(height * 0.058);
  const ctaFontSize = Math.round(height * 0.0185);
  const padding = Math.round(width * 0.075);

  // Dashboard image overflows the right edge by ~12% to mimic the Checkr
  // composition where the product UI bleeds off-canvas.
  const dashboardWidth = Math.round(width * 1.12);
  const dashboardBottom = Math.round(height * -0.04);
  const dashboardRight = Math.round(width * -0.12);

  return (
    <div className="flex flex-col items-start gap-3">
      <div
        className="text-[11px] uppercase tracking-[0.18em] text-[#6a6a62]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label} · {width}×{height}
      </div>
      <div
        className="relative overflow-hidden shadow-[0_20px_60px_rgba(28,28,25,0.18)]"
        style={{
          width,
          height,
          backgroundColor: "#21353f",
          borderRadius: 4,
        }}
      >
        {/* Subtle dot-grid texture, matches site .dot-grid */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(184, 204, 210, 0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Wordmark — rendered as Freight Display text (matches the actual logo) */}
        <div
          className="absolute"
          style={{
            top: padding,
            left: padding,
            fontFamily: "'freight-display-pro', Georgia, serif",
            fontWeight: 700,
            fontSize: wordmarkSize,
            color: "#f0f0ec",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          credenza
        </div>

        {/* Headline */}
        <div
          className="absolute"
          style={{
            left: padding,
            top: Math.round(height * 0.36),
            fontFamily: "'freight-display-pro', Georgia, serif",
            fontWeight: 400,
            fontSize: headlineSize,
            color: "#f0f0ec",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          <div>{HEADLINE_LINE_1}</div>
          <div>{HEADLINE_LINE_2}</div>
        </div>

        {/* CTA pill — sky bg, midnight text, arrow icon */}
        <div
          className="absolute inline-flex items-center"
          style={{
            left: padding,
            top: Math.round(height * 0.36 + headlineSize * 2.45),
            backgroundColor: "#b8ccd2",
            color: "#21353f",
            fontFamily: "Inter, sans-serif",
            fontSize: ctaFontSize,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: `${Math.round(ctaFontSize * 0.95)}px ${Math.round(ctaFontSize * 1.9)}px`,
            borderRadius: 999,
            gap: Math.round(ctaFontSize * 0.5),
          }}
        >
          <span>{CTA_LABEL}</span>
          <span style={{ fontSize: ctaFontSize * 1.1, lineHeight: 1 }}>→</span>
        </div>

        {/* Dashboard product UI — anchored bottom-right, bleeds off-canvas */}
        <div
          className="absolute"
          style={{
            right: dashboardRight,
            bottom: dashboardBottom,
            width: dashboardWidth,
          }}
        >
          {/* Soft glow behind the dashboard so the white card pops on dark bg */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(216,212,202,0.18)",
              borderRadius: 6,
            }}
          />
          <img
            src={DASHBOARD_SRC}
            alt=""
            className="block w-full"
            style={{
              borderRadius: 6,
              transform: "rotate(-2deg)",
              transformOrigin: "bottom right",
            }}
          />
        </div>

        {/* Olive vertical rule — Credenza editorial accent */}
        <div
          className="absolute"
          style={{
            left: padding,
            top: Math.round(height * 0.32),
            width: 2,
            height: Math.round(height * 0.04),
            backgroundColor: "#6f6e4b",
          }}
        />
      </div>
    </div>
  );
}

export default function SocialCards() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#f0f0ec", padding: "48px" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="mb-10">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.18em] text-[#6a6a62] hover:text-[#1c1c19]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ← back to site
          </Link>
          <h1
            className="mt-4"
            style={{
              fontFamily: "'freight-display-pro', Georgia, serif",
              fontWeight: 400,
              fontSize: 44,
              letterSpacing: "-0.02em",
              color: "#1c1c19",
            }}
          >
            Social cards — vendor
          </h1>
          <p
            className="mt-2 max-w-[640px]"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#6a6a62",
            }}
          >
            Promoted-post creative for LinkedIn and Instagram. To export, take a screenshot
            at 100% zoom — macOS captures at 2× device pixels, so a 1080-wide card exports
            at 2160px (downsample if the platform requires exactly 1080).
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <SocialCard width={1080} height={1080} label="LinkedIn feed" />
          <SocialCard width={1080} height={1350} label="Instagram feed" />
        </div>
      </div>
    </div>
  );
}
