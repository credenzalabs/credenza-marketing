import { useEffect } from "react";
import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";

export default function TermsOfUse() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    document.title = "Terms of Use — Credenza";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "The terms governing your access to and use of usecredenza.com and Credenza's related services.",
      );
    return () => {
      document.title = prevTitle;
      if (prevDesc) document.querySelector('meta[name="description"]')?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Nav ctaHref={JOIN_VENDOR_URL} />
      <main className="container pt-32 pb-20 max-w-3xl">
        <h1
          className="font-freight text-charcoal mb-8"
          style={{ fontSize: "2.25rem", letterSpacing: "-0.02em" }}
        >
          Terms of Use
        </h1>
        <TermsOfUseContent />
      </main>
      <Footer />
    </div>
  );
}
