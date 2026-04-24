import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { C, LOGO_BLACK, LOGIN_URL } from "@/lib/constants";

export interface NavProps {
  /** Which nav link should render in the accent olive color to indicate the active page. */
  activePage?: "vendors" | "designers";
  /** Label for the primary CTA button (desktop + mobile). */
  ctaLabel?: string;
  /** Href for the primary CTA button. */
  ctaHref?: string;
  /** Href for the logo link. */
  logoHref?: string;
  /** Render the Sign in + CTA block inside the mobile menu. */
  showMobileCta?: boolean;
  /** Render the desktop Sign in link. */
  showSignIn?: boolean;
}

export function Nav({
  activePage = "vendors",
  ctaLabel = "Request access",
  ctaHref = "#",
  logoHref,
  showMobileCta = true,
  showSignIn = false,
}: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isPreview = window.location.pathname.startsWith("/preview");
  const prefix = isPreview ? "/preview" : "";
  const resolvedLogoHref = logoHref ?? `${prefix}/`;
  const navLinks: Array<{ label: string; key: "designers" | "vendors"; href: string }> = [
    { label: "For Designers", key: "designers", href: `${prefix}/for-designers` },
    { label: "For Vendors", key: "vendors", href: `${prefix}/` },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `0.5px solid ${C.sageDark}` : "0.5px solid transparent",
      }}
    >
      <div className="container">
        <div
          className="flex items-center justify-between"
          style={{ height: scrolled ? "64px" : "80px", transition: "height 0.3s ease" }}
        >
          <a href={resolvedLogoHref} className="no-underline flex items-center flex-shrink-0">
            <img
              src={LOGO_BLACK}
              alt="Credenza"
              style={{
                height: scrolled ? "36px" : "44px",
                width: "auto",
                maxWidth: "180px",
                objectFit: "contain",
                transition: "height 0.3s ease",
                flexShrink: 0,
              }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = item.key === activePage;
              const baseColor = isActive ? C.olive : C.charcoalMid;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="no-underline transition-colors duration-200"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: baseColor,
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {showSignIn && (
              <a
                href={LOGIN_URL}
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  color: C.charcoalMid,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.forest)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.charcoalMid)}
              >
                Sign in
              </a>
            )}
            <a
              href={ctaHref}
              className="no-underline inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                backgroundColor: C.teal,
                color: C.forest,
                outline: "0.5px solid #99b8bd",
                outlineOffset: "2px",
                borderRadius: "0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = C.teal;
              }}
            >
              {ctaLabel}
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-mobile-menu"
            style={{ color: C.forest }}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="primary-mobile-menu"
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: C.sage }}
        >
          <div className="container py-6 flex flex-col gap-5">
            {navLinks.map((item) => {
              const isActive = item.key === activePage;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="no-underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.82rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: isActive ? C.olive : C.charcoal,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </a>
              );
            })}
            {showMobileCta && (
              <div
                className="flex flex-col gap-3 pt-4 border-t"
                style={{ borderColor: C.sage }}
              >
                {showSignIn && (
                  <a
                    href={LOGIN_URL}
                    className="no-underline text-center py-2.5 px-4"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.82rem",
                      color: C.charcoal,
                      border: `1px solid ${C.sageDark}`,
                      borderRadius: "0",
                    }}
                  >
                    Sign in
                  </a>
                )}
                <a
                  href={ctaHref}
                  className="no-underline text-center py-2.5 px-4 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    backgroundColor: C.teal,
                    color: C.forest,
                    outline: "0.5px solid #99b8bd",
                    outlineOffset: "2px",
                    borderRadius: "0",
                  }}
                >
                  {ctaLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
