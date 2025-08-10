"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SafeImg } from "@/components/SafeImg";
import { LikeShare } from "@/components/LikeShare";
import type { BlogPost } from "@/lib/blog";

export type BlogExplorerProps = {
  posts: BlogPost[];
};

type SortBy = "relevance" | "title" | "tagCount";

type TagMode = "any" | "all"; // OR vs AND

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagMode, setTagMode] = useState<TagMode>("any");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(18);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort().slice(0, 20),
    [posts]
  );

  function toggleTag(tag: string) {
    setSelectedTags((cur) =>
      cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]
    );
    setVisible(18);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const scored = posts.map((p) => {
      const inQ = q.length > 0;
      const titleHit = inQ && p.title.toLowerCase().includes(q) ? 2 : 0;
      const descHit = inQ && p.description.toLowerCase().includes(q) ? 1 : 0;
      const tagHit = inQ && p.tags.some((t) => t.toLowerCase().includes(q)) ? 1 : 0;

      return { post: p, score: titleHit + descHit + tagHit };
    });

    let filtered = scored;

    if (selectedTags.length > 0) {
      filtered = filtered.filter(({ post }) => {
        return tagMode === "all"
          ? selectedTags.every((t) => post.tags.includes(t))
          : selectedTags.some((t) => post.tags.includes(t));
      });
    }

    switch (sortBy) {
      case "title":
        filtered.sort((a, b) => a.post.title.localeCompare(b.post.title));
        break;
      case "tagCount":
        filtered.sort((a, b) => b.post.tags.length - a.post.tags.length);
        break;
      default:
        filtered.sort((a, b) => b.score - a.score || a.post.title.localeCompare(b.post.title));
    }

    return filtered.map((f) => f.post);
  }, [posts, query, selectedTags, tagMode, sortBy]);

  const visiblePosts = results.slice(0, visible);

  return (
    <div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto] items-center">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(18);
          }}
          placeholder="Search posts, descriptions, and tags…"
          className="h-11 px-4 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-neutral-900/60 backdrop-blur outline-none"
          aria-label="Search posts"
        />
        <div className="flex items-center gap-2 justify-end">
          <label className="text-sm text-neutral-900 dark:text-neutral-300">Tags:</label>
          <select
            value={tagMode}
            onChange={(e) => setTagMode(e.target.value as TagMode)}
            className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/20 bg-transparent"
            aria-label="Tag filter mode"
          >
            <option value="any">Match any</option>
            <option value="all">Match all</option>
          </select>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <label className="text-sm text-neutral-900 dark:text-neutral-300">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="h-9 px-3 rounded-lg border border-black/10 dark:border-white/20 bg-transparent"
            aria-label="Sort posts"
          >
            <option value="relevance">Relevance</option>
            <option value="title">Title A–Z</option>
            <option value="tagCount">Most tags</option>
          </select>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <button
            className="h-9 px-3 rounded-full btn-outline"
            onClick={() => setCompact((v) => !v)}
            aria-pressed={compact}
            aria-label="Toggle density"
          >
            {compact ? "Comfortable" : "Compact"}
          </button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = selectedTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
                }`}
                aria-pressed={active}
              >
                #{t}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs px-3 py-1 rounded-full btn-outline"
            >
              Clear
            </button>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((p) => (
          <div key={p.slug} className={`group block`}>
            <article className={`card ${compact ? "p-3" : "p-5"} transition-transform group-hover:-translate-y-1`}>
              <Link href={`/blog/${p.slug}`} className="block">
                <div className="mb-3 overflow-hidden rounded-lg border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  <SafeImg src={`/images/posts/${p.slug}.jpg`} className="w-full h-36 object-cover" />
                </div>
                <div className="font-medium group-hover:underline text-neutral-900 dark:text-white">
                  {p.title}
                </div>
                <div className="text-sm text-neutral-900 dark:text-neutral-300">
                  {p.description}
                </div>
                <div className="mt-2 text-xs text-neutral-700 dark:text-neutral-400">
                  {p.tags.slice(0, 3).map((t) => `#${t}`).join(" ")}
                  {p.tags.length > 3 ? " …" : ""}
                </div>
              </Link>
              <LikeShare id={p.slug} title={p.title} />
            </article>
          </div>
        ))}
      </div>

      {visible < results.length && (
        <div className="mt-6 flex justify-center">
          <button
            className="btn-primary h-11 px-6"
            onClick={() => setVisible((v) => v + 18)}
            aria-label="Load more posts"
          >
            Load more
          </button>
        </div>
      )}

      <div className="mt-3 text-sm text-neutral-500">
        Showing {Math.min(visible, results.length)} of {results.length} posts
      </div>
    </div>
  );
} 