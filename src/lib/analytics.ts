declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = "G-6PZS5Z3PCW";

function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", event, params);
}

export function trackPageview(path: string) {
  window.gtag?.("config", GA_ID, { page_path: path });
}

function getLabel(el: HTMLElement): string {
  const explicit = el.getAttribute("data-analytics-label");
  if (explicit) return explicit;
  const text = (el.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 100);
  const aria = el.getAttribute("aria-label");
  if (aria) return aria;
  return "(no label)";
}

function hostnameOf(href: string): string {
  try {
    return new URL(href, window.location.href).hostname;
  } catch {
    return "";
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest("button, a") as HTMLElement | null;
      if (!el) return;

      const label = getLabel(el);

      if (el.tagName === "A") {
        const a = el as HTMLAnchorElement;
        const href = a.href || a.getAttribute("href") || "";
        const host = hostnameOf(href);
        const outbound = !!host && host !== window.location.hostname;
        track("link_click", {
          link_label: label,
          link_url: href,
          link_domain: host,
          outbound,
        });
      } else {
        track("button_click", { button_label: label });
      }
    },
    true
  );

  const milestones = [25, 50, 75, 100];
  let fired = new Set<number>();

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return;
    const pct = (scrollTop / scrollHeight) * 100;
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", {
          percent: m,
          page_path: window.location.pathname,
        });
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const resetScrollMilestones = () => {
    fired = new Set<number>();
  };
  window.addEventListener("popstate", resetScrollMilestones);
  const origPush = history.pushState;
  history.pushState = function (...args) {
    resetScrollMilestones();
    return origPush.apply(this, args as Parameters<typeof origPush>);
  };
}
