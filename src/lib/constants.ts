export const C = {
  teal:         "#b8ccd2",
  tealLight:    "#d8e8ec",
  tealMid:      "#7aa0a8",
  tealDim:      "rgba(184,204,210,0.15)",
  tealBorder:   "rgba(184,204,210,0.4)",
  forest:       "#21353f",
  forestDim:    "rgba(33,53,63,0.06)",
  forestBorder: "rgba(33,53,63,0.18)",
  brown:        "#6f6e4b",
  brownLight:   "#dddec4",
  brownDim:     "rgba(111,110,75,0.1)",
  charcoal:     "#1c1c19",
  charcoalMid:  "#3a3a34",
  charcoalSoft: "#6a6a62",
  ivory:        "#f0f0ec",
  pageWhite:    "#fdfcf9",
  sage:         "#e4e1d8",
  sageDark:     "#d8d4ca",
  white:        "#f0f0ec",
  olive:        "#6f6e4b",
  oliveMid:     "#8a8a5e",
  oliveDim:     "rgba(111,110,75,0.1)",
  oliveBorder:  "rgba(111,110,75,0.3)",
  oliveLight:   "#dddec4",
  cobalt:       "#7aa0a8",
  cobaltDim:    "rgba(184,204,210,0.08)",
  cobaltBorder: "rgba(184,204,210,0.25)",
};

export const LOGO_BLACK =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663400666768/au946vH5rjwmQAZ5wCBePX/CredenzaLogo_transparent_e1d9cbc2.png";

export const ACCESS_REQUEST_URL = import.meta.env.VITE_ACCESS_REQUEST_URL as string;

/** Root URL of the Credenza app (cert tool / designer dashboard). Used for
 *  "Sign in" and "Join" links out of marketing. Env-driven so we can point
 *  at local, preview, or production without a code change. Falls back to
 *  https://usecredenza.com for production if unset. */
export const APP_URL =
  (import.meta.env.VITE_APP_URL as string | undefined) ?? "https://usecredenza.com";
const appBase = APP_URL.replace(/\/$/, "");
export const LOGIN_URL = `${appBase}/login`;
export const JOIN_VENDOR_URL = `${appBase}/join/vendor`;
// Points at the lightweight waitlist form while designer early access is
// closed. Marketing's vercel.json rewrites /waitlist to the cert-tool
// project so the URL stays on usecredenza.com. Flip to `/join/designer`
// when we open full early access.
export const JOIN_DESIGNER_URL = `${appBase}/waitlist`;
