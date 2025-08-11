import Link from "next/link";
import { LINKS, AUTHOR, VENTURES } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30">
      <div className="container-px mx-auto py-14 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="font-semibold text-xl">Austin Frankel</div>
          <p className="text-sm text-neutral-900 dark:text-neutral-300 mt-2 max-w-sm">
            Student entrepreneur & iOS developer from Rye Brook, NY. Creator of Seat Maker; BBYO leader; coding educator (CodeLab, Code Assist).
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={LINKS.appStore} target="_blank" rel="noopener" className="btn-primary h-9 px-4 inline-flex items-center">Download Seat Maker</a>
            <a href={LINKS.seatMakerInstagram} target="_blank" rel="noopener" className="btn-outline h-9 px-4 inline-flex items-center">@seatmakerapp</a>
          </div>
        </div>

        <nav aria-labelledby="footer-explore">
          <div id="footer-explore" className="font-medium">Explore</div>
          <ul className="mt-3 grid gap-2 text-sm">
            <li><Link href="/ventures" className="hover:underline">Ventures</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/timeline" className="hover:underline">Timeline</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
          <div className="mt-4 text-xs text-neutral-900 dark:text-neutral-400">Press</div>
          <ul className="mt-2 grid gap-2 text-sm">
            <li><a href={LINKS.mobileAppDailyReview} target="_blank" rel="noopener" className="hover:underline">MobileAppDaily — Seat Maker Review</a></li>
            <li><a href={LINKS.bbyoArticle} target="_blank" rel="noopener" className="hover:underline">BBYO — Student entrepreneurship story</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-ventures">
          <div id="footer-ventures" className="font-medium">Ventures</div>
          <ul className="mt-3 grid gap-2 text-sm">
            {VENTURES.slice(0, 6).map((v) => (
              <li key={v.slug}>
                <Link href={`/ventures/${v.slug}`} className="hover:underline">{v.name}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link href="/ventures" className="text-sm underline">View all</Link>
          </div>
        </nav>

        <div aria-labelledby="footer-contact">
          <div id="footer-contact" className="font-medium">Contact</div>
          <ul className="mt-3 grid gap-2 text-sm text-neutral-900 dark:text-neutral-300">
            <li>Email: <a suppressHydrationWarning href={`mailto:${AUTHOR.email}`} className="hover:underline">{AUTHOR.email}</a></li>
            <li>Phone: <a suppressHydrationWarning href={`tel:${AUTHOR.phone}`} className="hover:underline">{AUTHOR.phone}</a></li>
            <li>Location: {AUTHOR.location}</li>
          </ul>
          <div className="mt-4 text-xs text-neutral-900 dark:text-neutral-400">Social</div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <a href={LINKS.personalInstagram} target="_blank" rel="noopener" className="btn-outline h-8 px-3 inline-flex items-center">@austinfrankel1</a>
            <a href={LINKS.linkedIn} target="_blank" rel="noopener" className="btn-outline h-8 px-3 inline-flex items-center">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/10">
        <div className="container-px mx-auto py-6 text-xs text-neutral-900 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Austin Frankel • Built with Next.js & Tailwind</div>
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <a href={LINKS.seatMakerSite} target="_blank" rel="noopener" className="hover:underline">Seat Maker</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 