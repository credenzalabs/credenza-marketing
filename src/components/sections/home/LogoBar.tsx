import { useReveal } from "@/hooks/useReveal";
import { C } from "@/lib/constants";

// ─── Logo Bar ────────────────────────────────────────────────────────────────────
export function LogoBar() {
  const ref = useReveal();
  const names = ["Kravet", "Holly Hunt", "Schumacher", "Kneedler Fauchère", "Donghia", "Cowtan & Tout", "Brunschwig & Fils", "Lee Jofa"];
  return (
    <section
      ref={ref}
      className="reveal py-10 border-y"
      style={{ borderColor: C.sage, backgroundColor: "#FFFFFF" }}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-5">
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: C.charcoalSoft,
          }}>
            Trusted by
          </span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {names.map((name) => (
              <span
                key={name}
                className="font-freight"
                style={{ fontSize: "1rem", color: C.oliveMid, letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
