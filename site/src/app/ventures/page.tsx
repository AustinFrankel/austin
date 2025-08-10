import Link from "next/link";

export default function Ventures() {
  const items = [
    { name: "Seat Maker", href: "/ventures/seat-maker", desc: "iOS seating charts with drag-and-drop" },
    { name: "CodeLab", href: "/ventures/codelab", desc: "Small‑group and 1:1 coding sessions that build confidence" },
    { name: "Code Assist", href: "/ventures/code-assist", desc: "On‑demand debugging help and friendly explanations" },
    { name: "Homework Helpers", href: "/ventures/homework-helpers", desc: "Student‑led tutoring and mentorship in our community" },
    { name: "Your Honor Ink", href: "/ventures/your-honor-ink", desc: "Custom apparel and printing with quick turnaround" },
    { name: "BrightLineInsights", href: "/ventures/brightlineinsights", desc: "Student‑run research and insights for small orgs" },
  ];
  return (
    <div className="container-px mx-auto max-w-4xl py-10">
      <h1 className="text-3xl font-bold">Ventures</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((v) => (
          <Link key={v.href} href={v.href} className="card p-5 hover:-translate-y-0.5 transition-transform">
            <div className="font-semibold">{v.name}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{v.desc}</div>
            <div className="mt-2 text-blue-600 dark:text-blue-400">View →</div>
          </Link>
        ))}
      </div>
    </div>
  );
} 