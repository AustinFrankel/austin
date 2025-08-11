"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/lib/searchIndex";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    function onOpen() { setOpen(true); }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen as EventListener);
    };
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as typeof searchIndex;
    return searchIndex
      .map((r) => ({
        ...r,
        score:
          (r.title.toLowerCase().includes(query) ? 2 : 0) +
          (r.description?.toLowerCase().includes(query) ? 1 : 0) +
          (r.tags?.some((t) => t.toLowerCase().includes(query)) ? 1 : 0),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-start justify-center p-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-3 border-b border-black/5 dark:border-white/10 flex items-center gap-2">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, posts, timeline… (⌘K)"
            className="w-full bg-transparent outline-none px-2 py-2"
            aria-label="Site search"
          />
          <button className="text-sm text-neutral-900 dark:text-neutral-400" onClick={() => setOpen(false)} aria-label="Close">Esc</button>
        </div>
        <ul className="max-h-[60vh] overflow-auto divide-y divide-black/5 dark:divide-white/10">
          {results.length === 0 && (
            <li className="p-4 text-sm text-neutral-900 dark:text-neutral-300">Type to search…</li>
          )}
          {results.map((r) => (
            <li key={r.href} className="hover:bg-black/5 dark:hover:bg-white/5">
              <Link href={r.href} className="block p-4">
                <div className="text-sm text-neutral-900 dark:text-neutral-400">{r.category}</div>
                <div className="font-medium">{r.title}</div>
                {r.description && (
                  <div className="text-sm text-neutral-900 dark:text-neutral-300 line-clamp-2">{r.description}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 