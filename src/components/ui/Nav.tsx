import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { C, LOGO_BLACK, LOGIN_URL } from "@/lib/constants";

export interface NavProps {
  /** Which nav link should render in the accent olive color to indicate the active page. */
  activePage?: "vendors" | "designers" | "pricing" | "integrations";
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
  /** Force the Nav background to be solid even at the top of the page (for pages without a hero designed to sit behind a transparent nav). */
  forceSolid?: boolean;
}

export function Nav({
  activePage = "vendors",
  ctaLabel = "Get started",
  ctaHref = "#",
  logoHref,
  showMobileCta = true,
  showSignIn = true,
  forceSolid = false,
}: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isSolid = forceSolid || scrolled;

  const isPreview = window.location.pathname.startsWith("/preview");
  const prefix = isPreview ? "/preview" : "";
  const resolvedLogoHref = logoHref ?? `${prefix}/`;
  const navLinks: Array<{ label: string; key: NonNullable<NavProps["activePage"]>; href: string }> = [
    // Vendors first — they are who we sell to, and "/" is the vendor page.
    { label: "For Vendors", key: "vendors", href: `${prefix}/` },
    { label: "For Designers", key: "designers", href: `${prefix}/for-designers` },
    { label: "Pricing", key: "pricing", href: `${prefix}/pricing` },
  ];
  // The integration pages, which sit under a single "Integrations" nav item
  // rather than eating two top-level slots. Shopify keeps its original /shopify
  // URL — it is indexed and linked to under that path.
  const integrationLinks: Array<{ label: string; href: string; logo: string; logoHeight: number; blurb: string }> = [
    {
      label: "Shopify",
      href: `${prefix}/shopify`,
      logo: "/logo-shopify.png",
      logoHeight: 20,
      blurb: "Verified buyers, tagged and tax-exempt in your store",
    },
    {
      label: "Klaviyo",
      href: `${prefix}/integrations/klaviyo`,
      logo: "/logo-klaviyo.png",
      logoHeight: 16,
      blurb: "Ready-made trade segments, synced to your lists",
    },
  ];
  const integrationsActive = activePage === "integrations";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: isSolid ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: isSolid ? "blur(20px)" : "none",
        borderBottom: isSolid ? `0.5px solid ${C.sageDark}` : "0.5px solid transparent",
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
              const link = (
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
              // Integrations sits between the audience links and Pricing.
              if (item.key !== "pricing") return link;
              return (
                <div key="integrations-and-pricing" className="contents">
                  {/* The flyout is ALWAYS in the DOM and hidden with CSS, never
                      conditionally rendered. scripts/prerender.mjs snapshots the
                      DOM as it stands, so an unmounted menu means every page
                      ships to crawlers with no link to either integration page —
                      which is exactly what happened until this was fixed. Opens
                      on hover and on keyboard focus via group-hover /
                      group-focus-within, so it needs no open state at all. */}
                  <div key="integrations" className="relative group">
                    <a
                      href={`${prefix}/integrations`}
                      className="no-underline flex items-center gap-1.5 transition-colors duration-200"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: integrationsActive ? C.olive : C.charcoalMid,
                        fontWeight: integrationsActive ? 600 : 500,
                      }}
                    >
                      Integrations
                      <ChevronDown
                        size={12}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </a>
                    <div
                      // Sits directly under the trigger with no gap, so the
                      // pointer can travel into it without closing the menu.
                      className="absolute left-0 top-full pt-3 invisible opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                      style={{ width: 300 }}
                    >
                      <div
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `0.5px solid ${C.sageDark}`,
                          boxShadow: "0 8px 28px rgba(33,53,63,0.10)",
                        }}
                      >
                        {integrationLinks.map((integration, i) => (
                          <a
                            key={integration.label}
                            href={integration.href}
                            className="no-underline block px-5 py-4 transition-colors duration-150"
                            style={{
                              borderTop: i > 0 ? `0.5px solid ${C.sageDark}` : undefined,
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "#fbfaf6";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            }}
                          >
                            <img
                              src={integration.logo}
                              alt={integration.label}
                              className="block w-auto mb-2"
                              style={{ height: integration.logoHeight }}
                            />
                            <span
                              className="block"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.78rem",
                                lineHeight: 1.5,
                                color: C.charcoalMid,
                              }}
                            >
                              {integration.blurb}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {link}
                </div>
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
              const link = (
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
              if (item.key !== "pricing") return link;
              // On mobile the integrations are listed inline rather than behind
              // a second tap — two items don't earn a disclosure.
              return (
                <div key="integrations-and-pricing" className="contents">
                  <div key="integrations" className="flex flex-col gap-3">
                    <a
                      href={`${prefix}/integrations`}
                      className="no-underline"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.82rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        color: integrationsActive ? C.olive : C.charcoal,
                        fontWeight: integrationsActive ? 600 : 500,
                      }}
                    >
                      Integrations
                    </a>
                    <div className="flex flex-col gap-3 pl-4" style={{ borderLeft: `1px solid ${C.sage}` }}>
                      {integrationLinks.map((integration) => (
                        <a
                          key={integration.label}
                          href={integration.href}
                          className="no-underline"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.82rem",
                            color: C.charcoalMid,
                            fontWeight: 500,
                          }}
                        >
                          {integration.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  {link}
                </div>
              );
            })}
            {(showSignIn || showMobileCta) && (
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
                {showMobileCta && (
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
