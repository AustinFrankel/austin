"use client";

import { useEffect } from "react";

export function HoverGlowClient() {
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest?.(
        ".btn-primary, .btn-outline, .card"
      ) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--bx", `${x}px`);
      el.style.setProperty("--by", `${y}px`);
    }
    window.addEventListener("pointermove", onMove, { passive: true, capture: true });
    return () => window.removeEventListener("pointermove", onMove, true);
  }, []);
  return null;
} 