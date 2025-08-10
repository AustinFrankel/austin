"use client";

import { useEffect } from "react";

export function CursorGlowClient() {
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let lastY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    const apply = () => {
      document.documentElement.style.setProperty("--mx", `${lastX}px`);
      document.documentElement.style.setProperty("--my", `${lastY}px`);
      rafId = null;
    };

    const queueApply = () => {
      if (rafId == null) rafId = requestAnimationFrame(apply);
    };

    const onPointer = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      queueApply();
    };

    const onMouse = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      queueApply();
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      lastX = t.clientX;
      lastY = t.clientY;
      queueApply();
    };

    // Ensure initial value and on visibility changes
    apply();
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        apply();
      }
    };

    window.addEventListener("pointermove", onPointer, { passive: true, capture: true });
    window.addEventListener("mousemove", onMouse, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouch, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibility, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer, true);
      window.removeEventListener("mousemove", onMouse, true);
      window.removeEventListener("touchmove", onTouch, true);
      document.removeEventListener("visibilitychange", onVisibility, true);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);
  return null;
} 