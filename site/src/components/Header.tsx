"use client";

import Link from "next/link";
import { LINKS } from "@/lib/site.config";
import { DisplayControls } from "@/components/DisplayControls";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-black/5 dark:border-white/10">
      <div className="container-px mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-lg hover:opacity-80 active:opacity-70">Austin Frankel</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/timeline" className="nav-link">Timeline</Link>
          <Link href="/ventures/seat-maker" className="nav-link">Ventures</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <DisplayControls />
          <a href={LINKS.appStore} target="_blank" rel="noopener" className="hidden sm:inline-flex btn-primary h-9 px-4 items-center">Download</a>
        </div>
      </div>
    </header>
  );
} 