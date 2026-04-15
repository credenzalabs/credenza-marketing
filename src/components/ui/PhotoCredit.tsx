import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PhotoCredit({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
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
          <Info size={12} color={dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)"} />
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
        {name}
      </TooltipContent>
    </Tooltip>
  );
}
