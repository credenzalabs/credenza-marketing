import { Check, Lock, Shield } from "lucide-react";

// ─── Security Strip ─────────────────────────────────────────────────────────────
export function SecurityStrip() {
  return (
    <div
      className="bg-forest relative z-40"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container">
        <div
          className="flex items-center justify-center flex-wrap gap-x-8 gap-y-1.5"
          style={{ paddingTop: "0.55rem", paddingBottom: "0.55rem" }}
        >
          {[
            { icon: <Lock size={10} />, text: "Encrypted in transit and at rest" },
            { icon: <Shield size={10} />, text: "SOC 2 Type II in progress" },
            { icon: <Check size={10} />, text: "No data sold. No third-party ad tracking." },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span className="text-teal shrink-0">{item.icon}</span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                  color: "rgba(240,240,236,0.6)",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
