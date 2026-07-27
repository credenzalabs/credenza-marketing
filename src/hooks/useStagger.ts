import { useEffect, useRef } from "react";

/**
 * Reveals a group of items with a unified fade-in + rise, each delayed
 * `step` ms after the previous.
 *
 * Attach the returned ref to the group's container and mark each item with
 * `className="stagger-item" data-stagger`. The items start hidden (see the
 * .stagger-item rules in index.css) and are revealed once, when the container
 * enters the viewport — IntersectionObserver rather than scroll listeners,
 * disconnected after the first hit so nothing re-animates.
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>(step = 80) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The ref'd element is either the group container (items are descendants)
    // or a single item marked directly — support both so a lone element can't
    // silently stay hidden.
    const items = el.matches("[data-stagger]")
      ? [el]
      : Array.from(el.querySelectorAll<HTMLElement>("[data-stagger]"));
    if (!items.length) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.transitionDelay = `${i * step}ms`;
          item.classList.add("is-visible");
        });
        obs.disconnect();
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [step]);
  return ref;
}
