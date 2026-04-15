import { C } from "@/lib/constants";

// ─── Gallery ─────────────────────────────────────────────────────────────────────
export function GallerySection() {
  return (
    <section className="visible pt-24 md:pt-32 pb-0" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container text-center">
        <p
          className="font-freight mx-auto"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", color: C.charcoalMid, lineHeight: 1.4, letterSpacing: "-0.015em", maxWidth: "600px", fontStyle: "italic" }}
        >
          Your product is considered. Your trade program should be too.
        </p>
      </div>
    </section>
  );
}
