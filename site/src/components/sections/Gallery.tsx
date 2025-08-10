"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";

type Item = { src: string; alt: string; width?: number; height?: number };
type Props = { items: Item[]; ratio?: string };

export function Gallery({ items, ratio = "4 / 3" }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((it, i) => (
        <Reveal key={`${it.src}-${i}`} delay={i * 0.03}>
          <div
            className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10 group bg-black/5 dark:bg-white/5"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={it.src}
              alt={it.alt}
              width={it.width ?? 1200}
              height={it.height ?? 900}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              unoptimized
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
