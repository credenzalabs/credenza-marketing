import { JOIN_VENDOR_URL } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { withCredenzaUtm } from "@/utils/utm";

// ─── Mid-page CTA — full-bleed image band with a deliberate pause ───────────────
export function MidPageCTA() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal relative overflow-hidden">
      <img
        src="/marea-clark-entry.jpg"
        alt="Entry by Marea Clark Interiors"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(33,53,63,0.78)" }} />
      <PhotoCredit
        separator=""
        credits={[
          { text: "© " },
          { text: "Tim Lenz", href: withCredenzaUtm("https://www.timlenzphoto.com/", "photo-credit", "home-mid-cta") },
          { text: "/OTTO (design by " },
          { text: "Marea Clark Interiors", href: withCredenzaUtm("https://www.mareaclarkinteriors.com/", "designer-credit", "home-mid-cta") },
          { text: ")" },
        ]}
      />
      <div className="relative z-10 container">
        <div className="flex flex-col items-center text-center gap-6 py-16 md:py-20">
          <p
            className="font-freight text-ivory"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Your trade program, running itself.
          </p>
          <a
            href={JOIN_VENDOR_URL}
            className="no-underline inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
          >
            Request access
          </a>
        </div>
      </div>
    </section>
  );
}
