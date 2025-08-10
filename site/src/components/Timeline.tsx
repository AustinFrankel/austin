"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  AppWindow as AppIcon,
  GraduationCap,
  Users,
  Briefcase,
  Trophy,
  Music,
  Activity,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

export type TimelineCategory =
  | "apps"
  | "teaching"
  | "leadership"
  | "ventures"
  | "athletics"
  | "music"
  | "school"
  | "awards";

export type TimelineMedia = { src: string; alt: string };

export type TimelineMetric = { label: string; value: number };

export type TimelineItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: TimelineCategory;
  organization?: string;
  location?: string;
  date: string; // ISO 8601
  endDate?: string; // ISO 8601
  approximate?: boolean;
  href?: string;
  media?: TimelineMedia[];
  metrics?: TimelineMetric[];
};

type Props = {
  items: TimelineItem[];
  className?: string;
  singleVisible?: boolean; // if true, show one item at a time with cinematic transitions
};

const categoryIcon: Record<TimelineCategory, ReactNode> = {
  apps: <AppIcon className="h-4 w-4" aria-hidden />,
  teaching: <Users className="h-4 w-4" aria-hidden />,
  leadership: <Users className="h-4 w-4" aria-hidden />,
  ventures: <Briefcase className="h-4 w-4" aria-hidden />,
  athletics: <Activity className="h-4 w-4" aria-hidden />,
  music: <Music className="h-4 w-4" aria-hidden />,
  school: <GraduationCap className="h-4 w-4" aria-hidden />,
  awards: <Trophy className="h-4 w-4" aria-hidden />,
};

function byDateAsc(a: TimelineItem, b: TimelineItem) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function formatDisplayDate(iso: string, approximate?: boolean) {
  const d = new Date(iso);
  const str = d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
  return `${approximate ? "~" : ""}${str}`;
}

export function Timeline({ items, className, singleVisible = false }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Normalize and group by year
  const sorted = useMemo(() => [...items].sort(byDateAsc), [items]);
  const years = useMemo(() => {
    const groups = new Map<number, TimelineItem[]>();
    for (const it of sorted) {
      const y = new Date(it.date).getFullYear();
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y)!.push(it);
    }
    // ensure each group is sorted within the year
    for (const [y, list] of groups) groups.set(y, [...list].sort(byDateAsc));
    return [...groups.entries()].sort((a, b) => a[0] - b[0]);
  }, [sorted]);

  const yearIds = years.map(([y]) => `year-${y}`);
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  const flatItems = useMemo(() => sorted, [sorted]);
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef<1 | -1>(1);

  // Scroll to hash on mount
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (!hash) return;
    if (!singleVisible) {
      const el = document.querySelector<HTMLElement>(`[data-id="${hash}"]`);
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    } else {
      const idx = flatItems.findIndex((it) => it.id === hash);
      if (idx >= 0) setActiveIndex(idx);
    }
  }, [prefersReducedMotion, flatItems, singleVisible]);

  // Observe sections to update active year and URL hash
  useEffect(() => {
    if (singleVisible) return; // classic mode only
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            const yearAttr = entry.target.getAttribute("data-year");
            if (id) {
              setActiveId(id);
              // Update URL hash without scrolling
              if (typeof window !== "undefined") {
                history.replaceState(null, "", `#${id}`);
              }
            }
            if (yearAttr) {
              const index = yearIds.indexOf(yearAttr);
              if (index !== -1) setActiveYearIndex(index);
            }
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    const nodes: Element[] = [];
    document.querySelectorAll<HTMLElement>("[data-observe='item'], [data-observe='year']").forEach((el) => {
      observer.observe(el);
      nodes.push(el);
    });
    return () => {
      for (const el of nodes) observer.unobserve(el);
      observer.disconnect();
    };
  }, [yearIds, singleVisible]);

  // Progress rail click + scrub
  const isScrubbingRef = useRef(false);
  const railRef = useRef<HTMLDivElement | null>(null);

  const handleScrub = useCallback((clientY: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    if (!singleVisible) {
      const targetIndex = Math.round(ratio * (years.length - 1));
      const targetYearId = yearIds[targetIndex];
      const targetEl = document.querySelector<HTMLElement>(`[data-id='${targetYearId}']`);
      if (targetEl) targetEl.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      const idx = Math.round(ratio * (flatItems.length - 1));
      directionRef.current = idx > activeIndex ? 1 : -1;
      setActiveIndex(idx);
    }
  }, [yearIds, years.length, singleVisible, flatItems.length, activeIndex]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!isScrubbingRef.current) return;
      handleScrub(e.clientY);
    }
    function onUp() { isScrubbingRef.current = false; }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [handleScrub]);

  // Observe scroll markers in singleVisible mode to drive activeIndex
  // Advanced Apple-like scroll mapping: derive index from scroll progress over a long scrollytelling area
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: scrollAreaRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!singleVisible) return;
    const clamped = Math.max(0, Math.min(1, v));
    const idx = Math.round(clamped * (flatItems.length - 1));
    if (idx !== activeIndex) {
      directionRef.current = idx > activeIndex ? 1 : -1;
      setActiveIndex(idx);
    }
  });

  // Keyboard navigation between items
  const focusableItemsRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    if (singleVisible) return;
    focusableItemsRef.current = Array.from(document.querySelectorAll<HTMLElement>("[data-observe='item']"));
  }, [items, singleVisible]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const currentIndex = focusableItemsRef.current.findIndex((el) => el.getAttribute("data-id") === activeId);
    const nextIndex = e.key === "ArrowDown" ? Math.min(focusableItemsRef.current.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
    const nextEl = focusableItemsRef.current[nextIndex];
    if (nextEl) {
      nextEl.focus();
      nextEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    }
  };

  if (singleVisible) {
    // Apple-like scroll: sticky stage with one focused card, driven by markers
    const current = flatItems[activeIndex] ?? flatItems[0];
    const currentYear = new Date(current?.date ?? Date.now()).getFullYear();

    return (
      <section ref={containerRef} aria-label="Timeline" className={className}>
        {/* Sticky year/header */}
        <div className="sticky top-0 z-20 backdrop-blur-sm bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
          <div className="container-px mx-auto max-w-4xl py-2 flex items-center gap-3">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Year</div>
            <div className="text-xl font-semibold" aria-live="polite" aria-atomic>{currentYear}</div>
            <div className="ml-auto text-sm text-neutral-500">{activeIndex + 1}/{flatItems.length}</div>
          </div>
        </div>

        <div className="relative" ref={scrollAreaRef}>
          {/* Stage: sticky container */}
          <div className="sticky top-28 z-10">
            <div className="container-px mx-auto max-w-5xl h-[84vh] sm:h-[80vh] flex items-center justify-center">
              <div className="relative w-full">
                {/* Background flair */}
                <motion.div
                  key={`bg-${current.id}`}
                  className="absolute -inset-6 rounded-[28px]"
                  initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
                  animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{
                    background:
                      "radial-gradient(600px 360px at 30% 20%, rgba(var(--accent),0.15), transparent 60%), radial-gradient(600px 360px at 70% 80%, rgba(var(--accent-2),0.12), transparent 60%)",
                  }}
                />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -60, scale: 1.06, rotateX: -6, filter: "blur(10px)" }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
                  >
                    <TimelineRow item={current} isLast={true} isActive={true} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scroll markers: one per item to drive index, each giving scroll length */}
          <div aria-hidden>
            {flatItems.map((it) => (
              <div key={it.id} className="h-[95vh]" />
            ))}
          </div>
        </div>

        {/* Optional scrub rail */}
        <div className="pointer-events-none fixed right-4 top-24 bottom-24 hidden md:block" aria-hidden>
          <div ref={railRef} className="relative h-full w-2 rounded-full bg-black/10 dark:bg-white/15 pointer-events-auto"
            onPointerDown={(e) => { isScrubbingRef.current = true; handleScrub(e.clientY); }}
          >
            <div className="absolute left-0 top-0 w-2 rounded-full bg-[rgb(var(--accent))]" style={{ height: `${(activeIndex + 1) / (flatItems.length) * 100}%` }} />
          </div>
        </div>
      </section>
    );
  }

  // Classic multi-item timeline
  return (
    <section ref={containerRef} aria-label="Timeline" className={className} onKeyDown={onKeyDown}>
      {/* Sticky year header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
        <div className="container-px mx-auto max-w-3xl py-2 flex items-center gap-3">
          <div className="text-xs uppercase tracking-wide text-neutral-500">Year</div>
          <div className="text-xl font-semibold" aria-live="polite" aria-atomic>
            {years[activeYearIndex]?.[0] ?? new Date(sorted[0]?.date ?? Date.now()).getFullYear()}
          </div>
        </div>
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none fixed right-4 top-24 bottom-24 hidden md:block" aria-hidden>
        <div ref={railRef} className="relative h-full w-2 rounded-full bg-black/10 dark:bg-white/15 pointer-events-auto"
          onPointerDown={(e) => { isScrubbingRef.current = true; handleScrub(e.clientY); }}
          role="presentation"
        >
          {/* filled progress */}
          <div className="absolute left-0 top-0 w-2 rounded-full bg-[rgb(var(--accent))]" style={{ height: `${(activeYearIndex + 1) / years.length * 100}%` }} />
          {/* clickable marks */}
          {years.map(([y], idx) => (
            <button
              key={y}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-900"
              style={{ top: `${(idx / (years.length - 1 || 1)) * 100}%` }}
              onClick={(e) => {
                e.preventDefault();
                const targetEl = document.querySelector<HTMLElement>(`[data-id='year-${y}']`);
                targetEl?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
              }}
              aria-label={`Jump to ${y}`}
              aria-current={idx === activeYearIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Years and items */}
      <div className="container-px mx-auto max-w-6xl py-24">
        <ol className="relative">
          {years.map(([year, list]) => (
            <li
              key={year}
              className="relative"
              data-id={`year-${year}`}
              data-observe="year"
              data-year={`year-${year}`}
              role="region"
              aria-labelledby={`y-${year}`}
            >
              {/* Year label visually hidden (sticky header shows it) */}
              <div className="sr-only" id={`y-${year}`}>{year}</div>

              <ol className="relative border-l border-black/10 dark:border-white/20 ml-4">
                {list.map((it, idx) => (
                  <TimelineRow key={it.id} item={it} isLast={idx === list.length - 1} isActive={activeId === it.id} />
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineRow({ item, isLast, isActive }: { item: TimelineItem; isLast: boolean; isActive: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-25% 0px -35% 0px", amount: 0.3 });

  const icon = categoryIcon[item.category];
  const dateLabel = formatDisplayDate(item.date, item.approximate);
  const endLabel = item.endDate ? formatDisplayDate(item.endDate, item.approximate) : undefined;

  // Alternate orientation left/right for subtle visual cadence
  const isRight = new Date(item.date).getTime() % 2 === 0;

  return (
    <div ref={ref} data-observe="item" data-id={item.id} tabIndex={0} className="group relative pl-10 py-16 outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] rounded-2xl">
      {/* Connector dot */}
      <span className="absolute left-[-7px] top-10 z-[1] inline-flex h-3 w-3 items-center justify-center">
        <span className={`h-3 w-3 rounded-full ${isActive ? "bg-[rgb(var(--accent))]" : "bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/20"}`} />
      </span>

      {/* Connector vertical line with draw animation */}
      {!isLast && (
        <motion.span
          aria-hidden
          className="absolute left-0 top-8 bottom-0 w-px bg-transparent"
          initial={{ scaleY: 0 }}
          animate={inView && !prefersReducedMotion ? { scaleY: 1 } : { scaleY: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        >
          <span className="absolute inset-0 w-px bg-black/10 dark:bg-white/20" />
        </motion.span>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 32 : -32, scale: 0.97 }}
        animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card p-8 md:p-10"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-900">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView && !prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="text-neutral-700 dark:text-neutral-200"
            >
              {icon}
            </motion.span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="font-semibold text-2xl leading-tight">{item.title}</h3>
              {item.subtitle && <span className="text-sm text-neutral-600 dark:text-neutral-300">{item.subtitle}</span>}
            </div>
            <div className="mt-2 text-base text-neutral-600 dark:text-neutral-300">
              <time dateTime={item.date}>{dateLabel}</time>
              {endLabel && <>
                <span aria-hidden> — </span>
                <time dateTime={item.endDate}>{endLabel}</time>
              </>}
              {item.location && (
                <span className="ml-2 inline-flex items-center gap-1 text-neutral-500"><MapPin className="h-3 w-3" aria-hidden />{item.location}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-3 text-[1.05rem] leading-8 text-neutral-900 dark:text-neutral-200">{item.description}</p>
            )}
            {(item.media && item.media.length > 0) && (
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.media.slice(0, 3).map((m, i) => (
                  <motion.img
                    key={m.src}
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full rounded-xl object-cover border border-black/10 dark:border-white/15"
                    initial={{ scale: 0.92, opacity: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                    whileInView={!prefersReducedMotion ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}
            {(item.metrics && item.metrics.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-3">
                {item.metrics.map((m) => (
                  <Counter key={m.label} value={m.value} label={m.label} animate={inView && !prefersReducedMotion} />
                ))}
              </div>
            )}
            {item.href && (
              <a href={item.href} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-1 text-base underline underline-offset-2">
                <LinkIcon className="h-3 w-3" aria-hidden /> Learn more
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Counter({ value, label, animate }: { value: number; label: string; animate: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!animate) { setDisplay(value); return; }
    let raf = 0; const start = performance.now(); const duration = 800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setDisplay(Math.round(value * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);
  return (
    <div className="rounded-md border border-black/10 dark:border-white/20 px-2.5 py-1.5">
      <div className="text-sm font-semibold tabular-nums">{display.toLocaleString()}</div>
      <div className="text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
