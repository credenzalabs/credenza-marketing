/*
 * WEEK IN DESIGN — newsletter signup page (/week-in-design)
 *
 * A React port of the standalone signup page design: cream left column with the
 * mark, the pitch and a single email field; a five-image grid on the right.
 * Deliberately standalone — no Nav, no Footer, one field, one button, no scroll
 * on desktop. The only exit is the wordmark link back to the site.
 *
 * The design file posted straight to the Loops form endpoint with a plain HTML
 * form. That's swapped for lib/newsletter.ts so a failure can surface Loops'
 * own message ("Please enter a valid email address") instead of a generic
 * string, and so a rate-limit reads as a rate-limit.
 *
 * Styles live in the .wid-* block at the end of src/index.css — the layout
 * needs a media query and focus states, which inline styles can't carry.
 */

import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { subscribeToNewsletter, NewsletterError } from "@/lib/newsletter";

/* The four small tiles plus the wide one that spans both columns. Alt text
   credits the brand and piece, as the design file did: this letter is about
   what's newly available, so naming the work is the point rather than a slip. */
const GRID = [
  { src: "/wid-chinoiserie-wallcovering.jpg", alt: "Milton chinoiserie wallcovering" },
  { src: "/wid-woven-fabric.jpg", alt: "Coraggio x Thomas Lavin fabric" },
  { src: "/wid-block-print-tablecloth.jpg", alt: "Sister Parish x Sharland England tablecloth" },
  { src: "/wid-verdigris-mirror.jpg", alt: "Ngala Trading Victoria Mirror" },
  { src: "/wid-ceramic-vases.jpg", alt: "Hitoshi Kato Shinogi vases" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function WeekInDesign() {
  usePageMeta({
    title: "Week in Design | A Weekly Letter for the Interior Design Trade",
    description:
      "Week in Design is a free Sunday letter for the interior design trade: new collections, market dates, sample sales, and the pieces worth specifying—read in five minutes.",
    path: "/week-in-design",
    ogTitle: "Week in Design — Launches Worth a Look, Trade News to Know",
  });

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      await subscribeToNewsletter({ email, source: "week-in-design" });
      setStatus("sent");
      window.gtag?.("event", "newsletter_signup", { newsletter: "week_in_design" });
    } catch (err) {
      setError(
        err instanceof NewsletterError ? err.message : "Something went wrong, please try again.",
      );
      setStatus("error");
    }
  };

  return (
    <div className="wid-page">
      <div className="wid-left">
        <a href="/" className="wid-brand no-underline" style={{ color: "inherit" }}>
          <img src="/credenza-brandmark.png" alt="" width={44} height={44} />
          <span>Credenza</span>
        </a>

        <div className="wid-body">
          <p className="wid-eyebrow">Sundays</p>
          <h1 className="wid-title">Week in Design</h1>
          <p className="wid-sub">Launches worth a look and trade news to know.</p>
          <p className="wid-lede">
            New collections, market dates, sample sales, and the pieces worth
            specifying—read in five minutes, free.
          </p>

          {status === "sent" ? (
            <>
              <p className="wid-note">You're in. Look for the next issue on Sunday.</p>
              <button
                type="button"
                className="wid-back"
                onClick={() => {
                  setEmail("");
                  setStatus("idle");
                }}
              >
                ← Back
              </button>
            </>
          ) : (
            <>
              <form className="wid-form" onSubmit={handleSubmit}>
                <input
                  className="wid-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="wid-button" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Subscribe"}
                </button>
              </form>
              {status === "error" && (
                <p className="wid-note wid-note-error" role="alert">
                  {error}
                </p>
              )}
              <p className="wid-fine">One email a week. Unsubscribe anytime.</p>
            </>
          )}
        </div>

        <a href="/" className="wid-footer">
          usecredenza.com
        </a>
      </div>

      <div className="wid-grid">
        {GRID.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
        ))}
      </div>
    </div>
  );
}
