"use client";

import { useEffect, useState } from "react";

function seededBaseline(slug: string): number {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  // 80–480 baseline
  return 80 + (hash % 400);
}

export function ViewCounter({ slug }: { slug: string }) {
  const key = `views:${slug}`;
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    // increment view count once per session
    const sessionKey = `viewed:${slug}:${new Date().toDateString()}`;
    const baseline = seededBaseline(slug);
    const stored = parseInt(localStorage.getItem(key) || "0", 10) || 0;
    let next = stored;
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "1");
      next = stored + 1;
      localStorage.setItem(key, String(next));
    }
    setViews(baseline + next);
  }, [slug, key]);

  return (
    <div className="text-xs text-neutral-500">{views.toLocaleString()} views</div>
  );
}
