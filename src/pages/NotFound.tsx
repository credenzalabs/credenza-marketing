import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const C = {
  midnight: "#21353f",
  sky:      "#b8ccd2",
  ink:      "#1c1c19",
  charcoal: "#3a3a34",
  stone:    "#6a6a62",
  linen:    "#f0f0ec",
  bone:     "#e4e1d8",
  olive:    "#6f6e4b",
};

export default function NotFound() {
  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex";
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.linen }}>
      <div className="text-center max-w-md mx-auto px-6">
        <div
          className="font-freight"
          style={{ fontSize: "6rem", lineHeight: 1, color: C.bone, letterSpacing: "-0.04em" }}
        >
          404
        </div>
        <h1
          className="font-freight mb-4"
          style={{ fontSize: "2rem", lineHeight: 1.1, color: C.ink, letterSpacing: "-0.025em" }}
        >
          Page not found.
        </h1>
        <p
          className="mb-8"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.stone }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="no-underline inline-flex items-center gap-2 px-6 py-3.5 transition-all duration-200"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.72rem",
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            backgroundColor: C.sky,
            color: C.midnight,
            outline: "0.5px solid #99b8bd", outlineOffset: "2px",
            borderRadius: "0",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.sky; }}
        >
          Back to home <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
