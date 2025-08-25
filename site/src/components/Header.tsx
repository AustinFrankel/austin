"use client";

import Link from "next/link";
import { LINKS } from "@/lib/site.config";
import { DisplayControls } from "@/components/DisplayControls";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-black text-white md:bg-transparent md:text-inherit md:backdrop-blur md:supports-[backdrop-filter]:bg-white/80 md:dark:supports-[backdrop-filter]:bg-black/50 border-b border-black/10 dark:border-white/15 pt-[env(safe-area-inset-top)]">
      <div className="container-px mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-lg hover:opacity-80 active:opacity-70">Austin Frankel</Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {[
            { href: "/ventures", label: "Ventures" },
            { href: "/blog", label: "Blog" },
            { href: "/timeline", label: "Timeline" },
            { href: "/contact", label: "Contact" },
          ].map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "text-[--brand]" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <DisplayControls />
          <a href={LINKS.appStore} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex btn-primary h-9 px-4 items-center">Download</a>
          <Link href="/browse" className="md:hidden h-9 px-4 rounded-full border border-white/30 text-white">Browse</Link>
        </div>
      </div>
    </header>
  );
} 

export function MobileTabBar() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home" },
    { href: "/ventures", label: "Ventures" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-black/10 dark:border-white/15 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/40" aria-label="Bottom">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const active = pathname === it.href || pathname?.startsWith(it.href + "/");
          return (
            <Link key={it.href} href={it.href} className={`py-3 text-center text-sm ${active ? "text-[--brand]" : "text-fg"}`} aria-current={active ? "page" : undefined}>
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}