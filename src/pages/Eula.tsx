import { useEffect } from "react";
import { Nav } from "@/components/ui/Nav";
import { JOIN_VENDOR_URL } from "@/lib/constants";
import { Footer } from "@/components/sections/home/Footer";
import { LegalDoc } from "@/components/legal/LegalDoc";

export default function Eula() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    document.title = "End-User License Agreement — Credenza";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "The license terms governing use of the Credenza software.",
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
          End-User License Agreement
        </h1>
        <LegalDoc slug="eula" />
      </main>
      <Footer />
    </div>
  );
}
