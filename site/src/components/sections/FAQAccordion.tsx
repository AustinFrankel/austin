"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Item = { q: string; a: string };

type FAQProps = { items: Item[] };

export function FAQAccordion({ items }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/20 overflow-hidden">
      {items.map((it, idx) => {
        const open = openIdx === idx;
        return (
          <div key={idx} className="border-b last:border-b-0 border-black/5 dark:border-white/10">
            <button
              className="w-full text-left p-4 group flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => setOpenIdx(open ? null : idx)}
              aria-expanded={open}
              aria-controls={`faq-${idx}`}
            >
              <span className="font-medium">{it.q}</span>
              <span className={`ml-3 text-neutral-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>⌄</span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-4 pb-4 text-neutral-700 dark:text-neutral-300">
                    {it.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
