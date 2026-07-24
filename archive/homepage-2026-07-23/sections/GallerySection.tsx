// ─── Gallery ─────────────────────────────────────────────────────────────────────
export function GallerySection() {
  return (
    <section className="visible pt-24 md:pt-32 pb-0 bg-white">
      <div className="container text-center">
        <p
          className="font-freight mx-auto text-charcoal-mid italic max-w-[600px]"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)", lineHeight: 1.4, letterSpacing: "-0.015em" }}
        >
          Your product is considered. Your trade program should be too.
        </p>
      </div>
    </section>
  );
}
