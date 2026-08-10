import { JOIN_VENDOR_URL } from "@/lib/constants";

// ─── Gallery — closing statement + CTA before the FAQ ──────────────────────────
export function GallerySection() {
  return (
    /* Light, not forest: SecuritySection directly above is already bg-forest,
       so this landed as a tail on that band rather than its own closing beat.
       On linen it reads as a pause before the FAQ. */
    <section className="visible py-16 md:py-20" style={{ backgroundColor: "#fafaf6" }}>
      <div className="container text-center flex flex-col items-center gap-6">
        <p
          className="font-freight text-charcoal md:whitespace-nowrap"
          style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)", lineHeight: 1.4, letterSpacing: "-0.015em" }}
        >
          Your product is considered.{" "}
          <span className="italic text-olive-mid">Your trade program should be too.</span>
        </p>
        <a
          href={JOIN_VENDOR_URL}
          className="no-underline inline-flex items-center justify-center gap-2 mt-4 px-7 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
        >
          Get started
        </a>
      </div>
    </section>
  );
}
