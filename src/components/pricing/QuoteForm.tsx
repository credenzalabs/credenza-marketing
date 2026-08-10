import { useState } from "react";
import { submitVendorWaitlist } from "@/lib/waitlist";

/**
 * The /pricing intake form.
 *
 * The page tells a vendor exactly what we need in order to quote them —
 * applications a month, certificates on file, trade customers — so it should
 * ask for those here, rather than send them to a form collecting name, email
 * and company and then open the conversation by emailing the same three
 * questions back.
 *
 * Only name, email and company are required. The sizing fields are optional on
 * purpose: someone who doesn't know their certificate count off-hand must still
 * be able to submit. A required number here trades a lead for a datapoint.
 */

const PLATFORMS = [
  { value: "shopify", label: "Shopify" },
  { value: "netsuite", label: "NetSuite" },
  { value: "adobe_commerce", label: "Adobe Commerce" },
  { value: "quickbooks", label: "QuickBooks" },
  { value: "other", label: "Other" },
];

/* Underline fields, not boxes. The site has no filled inputs anywhere — it's
   thin rules, sharp corners and space — so a bordered box reads as pasted-in
   chrome. A rule under the text is the same gesture as the sage dividers used
   across the page. */
const FIELD_CLASS =
  "w-full bg-transparent border-0 border-b border-sage-dark px-0 py-2.5 text-charcoal placeholder:text-charcoal-soft focus:outline-none focus:border-olive-mid transition-colors";
const FIELD_STYLE = { fontFamily: "Inter, sans-serif", fontSize: "0.95rem" } as const;
const LABEL_STYLE = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
  color: "#6a6a62",
};

/** Digits only — a count field should not accept "about 50ish". */
function toCount(v: string): number | null {
  const digits = v.replace(/[^0-9]/g, "");
  return digits === "" ? null : Number(digits);
}

export function QuoteForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [applications, setApplications] = useState("");
  const [certificates, setCertificates] = useState("");
  const [customers, setCustomers] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const disabled = status === "sending" || !name.trim() || !email.trim() || !company.trim();

  function togglePlatform(value: string) {
    setPlatforms((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitVendorWaitlist({
        name,
        company,
        email,
        source: "pricing_page",
        applicationsPerMonth: toCount(applications),
        activeCertificates: toCount(certificates),
        tradeCustomers: toCount(customers),
        platforms,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <p
        className="text-charcoal max-w-[520px]"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.75 }}
      >
        Thank you&mdash;we have what we need. We&rsquo;ll come back with a number and the
        tier it puts you in.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[560px] text-left">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          className={FIELD_CLASS}
          style={FIELD_STYLE}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-label="Name"
        />
        <input
          className={FIELD_CLASS}
          style={FIELD_STYLE}
          placeholder="Work email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Work email"
        />
      </div>
      <input
        className={`${FIELD_CLASS} mt-3`}
        style={FIELD_STYLE}
        placeholder="Brand"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        aria-label="Brand"
      />

      <div className="mt-7 mb-2.5" style={LABEL_STYLE}>
        Your numbers (optional)
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <input
          className={FIELD_CLASS}
          style={FIELD_STYLE}
          inputMode="numeric"
          placeholder="Applications / mo"
          value={applications}
          onChange={(e) => setApplications(e.target.value)}
          aria-label="Trade applications per month"
        />
        <input
          className={FIELD_CLASS}
          style={FIELD_STYLE}
          inputMode="numeric"
          placeholder="Resale certificates"
          value={certificates}
          onChange={(e) => setCertificates(e.target.value)}
          aria-label="Existing resale certificates"
        />
        <input
          className={FIELD_CLASS}
          style={FIELD_STYLE}
          inputMode="numeric"
          placeholder="Trade customers"
          value={customers}
          onChange={(e) => setCustomers(e.target.value)}
          aria-label="Existing trade customers"
        />
      </div>

      <div className="mt-7 mb-2.5" style={LABEL_STYLE}>
        Your stack
      </div>
      {/* Chips, not checkboxes. A native checkbox is the one piece of browser
          chrome on a page built from rules and type; a bordered toggle is the
          same vocabulary as everything around it. Still checkboxes to the
          accessibility tree — the input is visually hidden, not replaced. */}
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const on = platforms.includes(p.value);
          return (
            <label
              key={p.value}
              className={`inline-flex items-center px-3.5 py-2 cursor-pointer border transition-colors ${
                on
                  ? "border-olive-mid bg-olive-dim text-charcoal"
                  : "border-sage-dark text-charcoal-mid hover:border-olive-mid"
              }`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem" }}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => togglePlatform(p.value)}
                className="sr-only"
              />
              {p.label}
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-9 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 uppercase bg-teal text-forest hover:bg-[#99b8bd] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        /* Hairline sits 2px OUTSIDE the fill, the way the nav's Get started
           button does — an offset outline, not a border on the edge. */
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.72rem",
          fontWeight: 400,
          letterSpacing: "0.1em",
          outline: "0.5px solid #99b8bd",
          outlineOffset: "2px",
          borderRadius: "0",
        }}
      >
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>

      {status === "error" && (
        <p
          className="mt-3"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#9c4b4b" }}
        >
          {errorMsg || "We couldn’t send that just now. Please try again in a moment."}
        </p>
      )}
    </form>
  );
}
