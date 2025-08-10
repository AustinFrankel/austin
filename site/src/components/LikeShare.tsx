"use client";

import { useEffect, useState } from "react";

export function LikeShare({ id, title }: { id: string; title: string }) {
  const storageKey = `liked:${id}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const wasLiked = localStorage.getItem(storageKey) === "1";
    setLiked(wasLiked);
    // Fake count seeded for UI; in a real app, fetch from API
    const seed = Math.abs(Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0)) % 50;
    setCount(10 + seed + (wasLiked ? 1 : 0));
  }, [id, storageKey]);

  function toggleLike() {
    setLiked((v) => {
      const nv = !v;
      localStorage.setItem(storageKey, nv ? "1" : "0");
      setCount((c) => c + (nv ? 1 : -1));
      return nv;
    });
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(url); } catch {}
      alert("Link copied to clipboard");
    }
  }

  return (
    <div className="mt-6 flex items-center gap-3">
      <button onClick={toggleLike} className={`btn-outline h-9 px-3 inline-flex items-center gap-2 ${liked ? "bg-black text-white dark:bg-white dark:text-black" : ""}`} aria-pressed={liked} aria-label="Like this post">
        <span>{liked ? "♥" : "♡"}</span>
        <span className="text-sm">{count}</span>
      </button>
      <button onClick={share} className="btn-outline h-9 px-3 inline-flex items-center gap-2" aria-label="Share this post">
        <span>↗</span>
        <span className="text-sm">Share</span>
      </button>
    </div>
  );
}
