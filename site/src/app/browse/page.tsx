import Link from "next/link";
import Image from "next/image";

const cards = [
  { href: "/", title: "Home", desc: "Overview and latest updates", img: "/images/austin-headshot.png" },
  { href: "/ventures", title: "Ventures", desc: "All projects and services", img: "/images/seatmakerappcover.png" },
  { href: "/blog", title: "Blog", desc: "Articles and notes", img: "/images/seatmakercontent6.png" },
  { href: "/contact", title: "Contact", desc: "Get in touch", img: "/images/austin-headshot.png" },
  { href: "/ventures/seat-maker", title: "Seat Maker", desc: "iOS seating charts", img: "/images/seatmakerappcover.png" },
  { href: "/ventures/codelab", title: "CodeLab", desc: "Small‑group & 1:1 sessions", img: "/images/codelab.png" },
  { href: "/ventures/code-assist", title: "Code Assist", desc: "On‑demand debugging help", img: "/images/seatmakercontent6.png" },
  { href: "/ventures/homework-helpers", title: "Homework Helpers", desc: "Tutoring & mentorship", img: "/images/homeworkhelpers.jpg" },
  { href: "/ventures/your-honor-ink", title: "Your Honor Ink", desc: "Custom apparel", img: "/images/tattoo10.jpg" },
  { href: "/ventures/brightlineinsights", title: "BrightLineInsights", desc: "Research & insights", img: "/images/seatmakerappcontent3.png" },
];

export default function Browse() {
  return (
    <div className="container-px mx-auto max-w-5xl py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Browse</h1>
        <Link href="/" className="btn-outline h-9 px-4">Close</Link>
      </div>
      <input placeholder="Search pages…" className="w-full h-11 px-4 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-neutral-900/60 backdrop-blur outline-none" aria-label="Search pages" />
      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card overflow-hidden group">
            <div className="aspect-[4/3] overflow-hidden">
              <Image src={c.img} alt="" width={800} height={600} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3">
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-muted">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


