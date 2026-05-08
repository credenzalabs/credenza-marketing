import { Instagram, Linkedin } from "lucide-react";
import { LOGO_BLACK } from "@/lib/constants";

// ─── Footer ──────────────────────────────────────────────────────────────────────
export function Footer() {
  const prefix = window.location.pathname.startsWith("/preview") ? "/preview" : "";
  return (
    <footer className="border-t border-sage bg-white">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <img src={LOGO_BLACK} alt="Credenza" loading="lazy" className="h-8 w-auto mb-4" />
            <p
              className="text-charcoal-soft max-w-[240px]"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", lineHeight: 1.7 }}
            >
              Trade access, simplified.
            </p>
          </div>
          {[
            { heading: "Product", links: [{ label: "For Designers", href: `${prefix}/for-designers` }, { label: "For Vendors", href: `${prefix}/` }] },
            { heading: "Company", links: [{ label: "About", href: `${prefix}/about` }, { label: "Resources", href: `${prefix}/resources` }] },
            { heading: "Contact", links: [{ label: "info@usecredenza.com", href: "mailto:info@usecredenza.com" }] },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                className="uppercase font-semibold text-charcoal-mid mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em" }}
              >
                {col.heading}
              </h4>
              <div className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="no-underline transition-colors duration-150 text-charcoal-soft hover:text-charcoal"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </a>
                ))}
                {col.heading === "Contact" && (
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://www.instagram.com/usecredenza"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-charcoal-soft hover:text-charcoal transition-colors duration-150"
                    >
                      <Instagram className="h-4 w-4" strokeWidth={1} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/usecredenza/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-charcoal-soft hover:text-charcoal transition-colors duration-150"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={1} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-sage">
          <p
            className="text-charcoal-soft"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
          >
            © 2026 Credenza Labs, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              className="no-underline text-charcoal-soft hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
            >
              Privacy
            </a>
            <a
              href="/terms-of-use"
              className="no-underline text-charcoal-soft hover:text-charcoal"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
            >
              Terms
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
