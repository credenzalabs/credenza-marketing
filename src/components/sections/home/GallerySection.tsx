import { JOIN_VENDOR_URL } from "@/lib/constants";

// ─── Gallery — closing statement + CTA before the FAQ ──────────────────────────
export function GallerySection() {
  return (
    <section className="visible py-24 md:py-32 bg-forest">
      <div className="container text-center flex flex-col items-center gap-8">
        <p
          className="font-freight text-ivory italic max-w-[600px]"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", lineHeight: 1.4, letterSpacing: "-0.015em" }}
        >
          Your product is considered. Your trade program should be too.
        </p>
        <a
          href={JOIN_VENDOR_URL}
          className="no-underline inline-flex items-center justify-center gap-2 px-7 py-3.5 transition-all duration-200 uppercase font-normal rounded-none bg-teal hover:bg-[#99b8bd] text-forest"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", outline: "0.5px solid #99b8bd", outlineOffset: "2px" }}
        >
          Get started
        </a>
      </div>
    </section>
  );
}
