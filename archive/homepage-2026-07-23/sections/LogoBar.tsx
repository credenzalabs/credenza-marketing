import { useReveal } from "@/hooks/useReveal";

// ─── Logo Bar ────────────────────────────────────────────────────────────────────
export function LogoBar() {
  const ref = useReveal();
  const names = ["Kravet", "Holly Hunt", "Schumacher", "Kneedler Fauchère", "Donghia", "Cowtan & Tout", "Brunschwig & Fils", "Lee Jofa"];
  return (
    <section
      ref={ref}
      className="reveal py-10 border-y border-sage bg-white"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-5">
          <span
            className="uppercase text-charcoal-soft"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
            }}
          >
            Trusted by
          </span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {names.map((name) => (
              <span
                key={name}
                className="font-freight text-olive-mid"
                style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
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
