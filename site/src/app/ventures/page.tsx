import Link from "next/link";

export default function Ventures() {
  const items = [
    { name: "Seat Maker", href: "/ventures/seat-maker", desc: "iOS seating charts with drag‑and‑drop", img: "/images/seatmakerappcover.png" },
    { name: "CodeLab", href: "/ventures/codelab", desc: "Small‑group and 1:1 coding sessions", img: "/images/codelab.png" },
    { name: "Code Assist", href: "/ventures/code-assist", desc: "On‑demand debug help and explanations", img: "/images/seatmakercontent9.png" },
    { name: "Homework Helpers", href: "/ventures/homework-helpers", desc: "Student‑led tutoring and mentorship", img: "/images/homeworkhelpers.jpg" },
    { name: "Your Honor Ink", href: "/ventures/your-honor-ink", desc: "Custom apparel and printing", img: "/images/tattoo10.jpg" },
    { name: "BrightLineInsights", href: "/ventures/brightlineinsights", desc: "Student‑run research and insights", img: "/images/seatmakerappcontent3.png" },
  ];
  return (
    <div className="container-px mx-auto max-w-4xl py-10">
      <h1 className="text-3xl font-bold">Ventures</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => (
          <Link key={v.href} href={v.href} className="card overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
              <img src={v.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="font-semibold">{v.name}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">{v.desc}</div>
              <div className="mt-2 text-blue-600 dark:text-blue-400">View page</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 