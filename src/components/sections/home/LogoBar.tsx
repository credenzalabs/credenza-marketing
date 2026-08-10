import { useReveal } from "@/hooks/useReveal";

// ─── Logo Bar ────────────────────────────────────────────────────────────────────
//
// NOT PUBLISHED. Not rendered on any page — see the commented-out <LogoBar />
// in Home.tsx. Do not uncomment it until there are enough real brands to carry
// the section.
//
// This list previously held eight well-known house names that were never
// customers, sitting under a "Trusted by" heading. Under `names` goes only a
// brand that is genuinely a Credenza customer AND has agreed to be named —
// this is an endorsement claim, so an unpermissioned name is a real problem
// even if it's accurate.
export function LogoBar() {
  const ref = useReveal();
  const names = ["Sister Parish"];
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
