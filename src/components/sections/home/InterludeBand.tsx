import { useReveal } from "@/hooks/useReveal";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Interlude band — a photographic reset between the pale two-column sections ──
export function InterludeBand() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal relative overflow-hidden bg-forest">
      {/* The Caitlin Kah interior, held behind a deep forest scrim so it reads as
          atmosphere and the light text stays legible. */}
      <img
        src="/caitlin-kah-credenza.jpg"
        alt="Interior by Caitlin Kah"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(33,53,63,0.82)" }} />
      <PhotoCredit
        separator=""
        credits={[
          { text: "© " },
          { text: "Abigail Mair", href: withCredenzaUtm("https://www.abigailmairphotography.com/", "photo-credit", "home-interlude") },
          { text: " (design by " },
          { text: "Caitlin Kah", href: withCredenzaUtm("https://www.caitlinkah.com/", "designer-credit", "home-interlude") },
          { text: ")" },
        ]}
      />

      <div className="relative z-10 container text-center py-24 md:py-32">
        <div
          className="uppercase mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(240,240,236,0.6)", fontWeight: 600 }}
        >
          Built for vendors who take their program seriously
        </div>
        <p
          className="font-freight text-ivory mx-auto max-w-3xl"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
        >
          Nothing manual. Nothing missed.
        </p>
      </div>
    </section>
  );
}
