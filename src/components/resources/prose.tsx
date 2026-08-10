/**
 * Shared long-form article primitives for /resources pages.
 *
 * These started life inside ResaleCertificateGuide.tsx. Extracted when the
 * second guide landed so the two can't drift into looking like different
 * publications — the resources section reads as one editorial surface.
 *
 * TableOfContents and InlineHook take their data as props (the originals
 * closed over module-level constants in the guide file).
 */

import { useState } from "react";
import { Plus } from "lucide-react";

export type TocItem = { id: string; label: string };

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-charcoal-mid space-y-5 mb-10"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
    >
      {children}
    </div>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-freight text-charcoal mt-16 mb-6"
      style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.85rem)", letterSpacing: "-0.02em", lineHeight: 1.2, scrollMarginTop: "100px" }}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-10 mb-4"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1.4,
        color: "#21353f",
      }}
    >
      {children}
    </h3>
  );
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Table of contents">
      <h4
        className="text-charcoal-soft mb-4"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}
      >
        On this page
      </h4>
      <ul className="space-y-2 border-l border-sage-dark">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block pl-4 -ml-px border-l border-transparent hover:border-olive-mid hover:text-charcoal transition-colors duration-150 text-charcoal-soft"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent"
      >
        <h3 className="font-freight text-charcoal" style={{ fontSize: "1.1rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {q}
        </h3>
        <div className={`shrink-0 mt-1 text-charcoal-soft transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <Plus size={20} />
        </div>
      </button>
      {open && (
        <p
          className="pb-5 pr-10 text-charcoal-mid"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export function InlineHook({ href, label }: { href: string; label: string }) {
  return (
    <div className="my-8">
      <a
        href={href}
        className="inline-flex items-baseline gap-1.5 text-olive-mid hover:text-charcoal transition-colors no-underline"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
      >
        <span className="underline decoration-olive-mid/40 underline-offset-4 hover:decoration-current">
          {label}
        </span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="no-underline block text-center py-3.5 px-6 transition-all duration-200 bg-teal hover:bg-[#99b8bd] text-forest rounded-none"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.78rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        outline: "0.5px solid #99b8bd",
        outlineOffset: "2px",
      }}
    >
      {label}
    </a>
  );
}
