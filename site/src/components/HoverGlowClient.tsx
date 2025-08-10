"use client";

import { useEffect } from "react";

export function HoverGlowClient() {
  useEffect(() => {
    let activeEl: HTMLElement | null = null;

    const setActive = (el: HTMLElement | null) => {
      if (activeEl === el) return;
      if (activeEl) activeEl.removeAttribute("data-glow-active");
      activeEl = el;
      if (activeEl) activeEl.setAttribute("data-glow-active", "");
    };

    function onMove(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest?.(
        ".btn-primary, .btn-outline, .card"
      ) as HTMLElement | null;
      if (!el) {
        setActive(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--bx", `${x}px`);
      el.style.setProperty("--by", `${y}px`);
      setActive(el);
    }

    const onLeave = (e: PointerEvent) => {
      // If the pointer leaves the previously active element entirely
      const t = e.target as HTMLElement | null;
      if (t && activeEl && (t === activeEl || t.contains(activeEl))) return;
      setActive(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true, capture: true });
    window.addEventListener("pointerleave", onLeave, { passive: true, capture: true });
    return () => {
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerleave", onLeave, true);
    };
  }, []);
  return null;
} 