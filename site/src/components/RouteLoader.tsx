"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function RouteLoader() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    function start() {
      setActive(true);
      setProgress(8);
      cancelAnimationFrame(raf);
      const tick = () => {
        setProgress((p) => (p < 95 ? p + (97 - p) * 0.05 : p));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    function done() {
      cancelAnimationFrame(raf);
      setProgress(100);
      setTimeout(() => { setActive(false); setProgress(0); }, 250);
    }

    const handleStart = () => start();
    const handleDone = () => done();

    const rtr = router as typeof router & {
      push: typeof router.push;
      replace: typeof router.replace;
    };

    const origPush = rtr.push.bind(router) as typeof router.push;
    const origReplace = rtr.replace.bind(router) as typeof router.replace;

    rtr.push = ((...args: Parameters<typeof router.push>) => {
      handleStart();
      const res = origPush(...args);
      handleDone();
      return res;
    }) as typeof router.push;

    rtr.replace = ((...args: Parameters<typeof router.replace>) => {
      handleStart();
      const res = origReplace(...args);
      handleDone();
      return res;
    }) as typeof router.replace;

    return () => { cancelAnimationFrame(raf); };
  }, [router]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div className="absolute left-0 top-0 h-1 bg-[rgba(var(--accent),0.9)]" style={{ width: `${Math.max(10, progress)}%` }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 60px rgba(0,0,0,.2) inset" }} />
          <div className="absolute inset-2 rounded-full bg-[rgba(255,255,255,.04)] backdrop-blur" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-[rgba(var(--accent),0.5)] border-t-[rgba(var(--accent),1)]" />
          <div className="absolute inset-3 animate-spin-rev rounded-full border-2 border-[rgba(var(--accent),0.2)] border-b-[rgba(var(--accent),0.9)]" />
        </div>
      </div>
    </div>
  );
} 