import { useState } from "react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { C, LOGO_BLACK, ACCESS_REQUEST_URL } from "@/lib/constants";

const BG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/studio-dorion-park-slope-brownstone_543060ca.avif";

export default function ComingSoon() {
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(ACCESS_REQUEST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "coming-soon" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#ffffff" }}>
      {/* Mobile: top image */}
      <div className="lg:hidden relative overflow-hidden" style={{ height: "35vh", minHeight: "200px" }}>
        <img
          src={BG_IMAGE}
          alt="Interior by Studio Dorion"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
        />
        <PhotoCredit name="Design by Studio Dorion · Photo by Ethan Harrington" />
      </div>

      {/* Desktop: left image */}
      <div className="hidden lg:block lg:w-1/2 fixed top-0 left-0 bottom-0 overflow-hidden">
        <img
          src={BG_IMAGE}
          alt="Interior by Studio Dorion"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
        />
        <PhotoCredit name="Design by Studio Dorion · Photo by Ethan Harrington" />
      </div>

      {/* Right: content */}
      <div className="w-full lg:w-1/2 lg:ml-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-10 lg:py-16 lg:min-h-screen lg:max-h-screen lg:overflow-hidden">
        <div style={{ maxWidth: "520px" }}>
          <img src={LOGO_BLACK} alt="Credenza" style={{ height: "36px", width: "auto", marginBottom: "3rem", marginTop: "1rem" }} />

          <div
            className="flex items-center gap-2 mb-8"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oliveMid, fontWeight: 600 }}
          >
            <div style={{ width: "1.5rem", height: "1px", backgroundColor: C.sageDark }} />
            Coming soon
          </div>

          <h1
            className="font-freight mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.05, color: C.charcoal, letterSpacing: "-0.03em" }}
          >
            The infrastructure behind every{" "}
            <span className="italic" style={{ color: C.oliveMid }}>distinguished</span>{" "}
            trade program.
          </h1>

          <p
            className="mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: C.charcoalMid }}
          >
            Trade verification, tax compliance, and onboarding—built for
            vendors who take their program seriously, and the designers they serve.
          </p>

          {status === "sent" ? (
            <div className="py-8">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", fontWeight: 600, color: C.charcoal, marginBottom: "0.5rem" }}>
                We've got your request.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: C.charcoalSoft }}>
                We'll be in touch when we launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { placeholder: "Your name", type: "text", key: "name" as const },
                { placeholder: "Work email", type: "email", key: "email" as const },
                { placeholder: "Company", type: "text", key: "company" as const },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                  required
                  className="w-full px-4 py-3 outline-none transition-all duration-150"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    border: `1px solid ${C.sageDark}`,
                    backgroundColor: "#ffffff",
                    color: C.charcoal,
                    borderRadius: "0",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.olive)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.sageDark)}
                />
              ))}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-1 transition-all duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: status === "sending" ? C.sageDark : C.teal,
                  color: C.forest,
                  borderRadius: "0",
                  cursor: status === "sending" ? "default" : "pointer",
                  outline: "0.5px solid #99b8bd",
                  outlineOffset: "2px",
                }}
                onMouseEnter={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.backgroundColor = "#99b8bd"; }}
                onMouseLeave={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.backgroundColor = C.teal; }}
              >
                {status === "sending" ? "Sending..." : "Join the waitlist"}
              </button>
              {status === "error" && (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#b44", textAlign: "center" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

        </div>

        <p
          className="mt-auto pt-12"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: C.charcoalSoft, lineHeight: 1.6 }}
        >
          &copy; 2026 Credenza Labs, Inc.
        </p>
      </div>
    </div>
  );
}
