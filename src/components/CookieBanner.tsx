import { useEffect, useState } from "react";

const STORAGE_KEY = "credenza.cookie-consent";
type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* ignore */
  }
}

function updateConsent(choice: Choice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readChoice()) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    writeChoice("granted");
    updateConsent("granted");
    setVisible(false);
  };

  const decline = () => {
    writeChoice("denied");
    updateConsent("denied");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 720,
        margin: "0 auto",
        background: "#fdfcf9",
        color: "#21353f",
        border: "1px solid rgba(33,53,63,0.18)",
        borderRadius: 12,
        boxShadow: "0 12px 40px rgba(33,53,63,0.15)",
        padding: "18px 20px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 14,
        lineHeight: 1.5,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 14,
        justifyContent: "space-between",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 300px", minWidth: 240 }}>
        We use cookies to understand how visitors use Credenza and to improve
        the experience. You can accept or decline analytics cookies at any time.
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          onClick={decline}
          data-analytics-label="Cookie banner — Decline"
          style={{
            background: "transparent",
            color: "#21353f",
            border: "1px solid rgba(33,53,63,0.3)",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          data-analytics-label="Cookie banner — Accept"
          style={{
            background: "#21353f",
            color: "#f0f0ec",
            border: "1px solid #21353f",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
