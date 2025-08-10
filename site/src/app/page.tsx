import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <section className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Austin Frankel — Student Entrepreneur & iOS Developer</h1>
          <p className="mt-4 text-lg text-neutral-700">Creator of Seat Maker; BBYO leader; coding educator in Rye Brook, NY.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/ventures/seat-maker" className="inline-flex h-11 px-6 rounded-full bg-black text-white items-center">Seat Maker</a>
            <a href="/ventures/codelab" className="inline-flex h-11 px-6 rounded-full border border-black/10 items-center">Book Coding Help</a>
            <a href="/contact" className="inline-flex h-11 px-6 rounded-full border border-black/10 items-center">Contact</a>
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 overflow-hidden">
          <img src="/images/austin-headshot.jpg" alt="Austin headshot" className="w-full h-auto object-cover" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Ventures</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Seat Maker", href: "/ventures/seat-maker", desc: "Plan seating with drag-and-drop and instant sharing" },
            { title: "CodeLab", href: "/ventures/codelab", desc: "Small-group and 1:1 coding sessions" },
            { title: "Code Assist", href: "/ventures/code-assist", desc: "On-demand debug help and explanations" },
          ].map((v) => (
            <a key={v.title} href={v.href} className="block p-5 rounded-2xl border border-black/10 hover:bg-black/5">
              <div className="font-medium">{v.title}</div>
              <div className="text-sm text-neutral-600">{v.desc}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
