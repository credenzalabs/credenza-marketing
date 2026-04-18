import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type CreditSegment = { text: string; href?: string };

interface PhotoCreditProps {
  /** Plain-text fallback (existing usage). */
  name?: string;
  /** Structured credits with optional per-segment links. Takes precedence over `name`. */
  credits?: CreditSegment[];
  /** Separator between segments. Default " · " for backwards compat. Pass
   *  "" to render segments back-to-back when the credit reads as a sentence
   *  with inline links (e.g. "© Tim Lenz/OTTO (design by Marea Clark…)"). */
  separator?: string;
  dark?: boolean;
}

export function PhotoCredit({ name, credits, separator = " · ", dark = false }: PhotoCreditProps) {
  const plainText = credits ? credits.map((c) => c.text).join(separator) : name ?? "";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Photo credit: ${plainText}`}
          className="absolute bottom-3 right-3 z-20 flex items-center justify-center"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: dark ? "1px solid rgba(0,0,0,0.2)" : "1px solid rgba(255,255,255,0.35)",
            background: dark ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.25)",
            cursor: "default",
          }}
        >
          <Info size={12} aria-hidden="true" color={dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)"} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        sideOffset={6}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "4px 8px",
          background: "rgba(26,26,26,0.85)",
          color: "rgba(255,255,255,0.85)",
          border: "none",
          borderRadius: "0",
          backdropFilter: "blur(4px)",
        }}
      >
        {credits ? (
          <span>
            {credits.map((segment, i) => (
              <span key={i}>
                {i > 0 && separator}
                {segment.href ? (
                  <a
                    href={segment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px", textDecorationColor: "rgba(255,255,255,0.35)" }}
                  >
                    {segment.text}
                  </a>
                ) : (
                  segment.text
                )}
              </span>
            ))}
          </span>
        ) : (
          name
        )}
      </TooltipContent>
    </Tooltip>
  );
}
