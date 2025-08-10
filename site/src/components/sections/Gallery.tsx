"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

type Item = { src: string; alt: string; width?: number; height?: number };
export function Gallery({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((it, i) => (
        <Reveal key={it.src} delay={i * 0.03}>
          <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10 group">
            <Image
              src={it.src}
              alt={it.alt}
              width={it.width ?? 800}
              height={it.height ?? 600}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
