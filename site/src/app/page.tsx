import Link from "next/link";
import Image from "next/image";
import { LINKS } from "@/lib/site.config";
import { homeFaq } from "./(pages)/home/faq";
import { JsonLd } from "@/components/JsonLd";
import { StatStrip } from "@/components/sections/StatStrip";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { allPosts } from "@/lib/blog";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/sections/Gallery";

export default function Home() {
  const recent = allPosts.slice(0, 3);
  return (
    <div className="home-root">
      {/* Hero: animate on initial page mount and persist */}
      <Reveal mode="mount">
        <section className="container-px mx-auto max-w-6xl pt-16 pb-8 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">Austin Frankel — Student Entrepreneur & iOS Developer</h1>
            <p className="mt-4 text-lg text-neutral-800 dark:text-neutral-300">Creator of Seat Maker; BBYO leader; coding educator in Rye Brook, NY.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={LINKS.appStore} target="_blank" rel="noopener" className="btn-primary h-11 px-6 inline-flex items-center">Download Seat Maker</a>
              <a href="https://www.google.com/maps?q=Rye+Brook,+NY" target="_blank" rel="noopener" className="btn-outline h-11 px-6 inline-flex items-center">Rye Brook, NY</a>
              <a href="https://www.google.com/maps?q=Blind+Brook+High+School" target="_blank" rel="noopener" className="btn-outline h-11 px-6 inline-flex items-center">Blind Brook HS</a>
              <Link href="/ventures/codelab" className="btn-outline h-11 px-6 inline-flex items-center">Book Coding Help</Link>
              <Link href="/contact" className="btn-outline h-11 px-6 inline-flex items-center">Contact</Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
            <img src="/images/austin-headshot.png" alt="Austin headshot" className="w-full h-auto object-cover" />
          </div>
        </section>
      </Reveal>

      {/* Stat strip */}
      <Reveal delay={0.05}>
        <section className="container-px mx-auto max-w-6xl py-6">
          <StatStrip
            items={[
              { label: "Location", value: "Rye Brook, NY" },
              { label: "School", value: "Blind Brook ’26" },
              { label: "BBYO", value: "HVR Mazkir" },
              { label: "Flagship", value: "Seat Maker" },
            ]}
          />
        </section>
      </Reveal>

      {/* Timeline preview removed per request */}

      {/* Ventures preview */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-6xl py-10">
          <h2 className="text-2xl font-semibold">Ventures</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Seat Maker", href: "/ventures/seat-maker", ext: LINKS.seatMakerSite, desc: "Plan seating with drag-and-drop and instant sharing" },
              { title: "CodeLab", href: "/ventures/codelab", desc: "Small-group and 1:1 coding sessions" },
              { title: "Code Assist", href: "/ventures/code-assist", desc: "On-demand debug help and explanations" },
              { title: "Homework Helpers", href: "/ventures/homework-helpers", desc: "Student-led tutoring and mentorship" },
              { title: "Your Honor Ink", href: "/ventures/your-honor-ink", ext: LINKS.yourHonorInkInstagram, desc: "Custom apparel and printing" },
              { title: "BrightLineInsights", href: "/ventures/brightlineinsights", desc: "Student-led research and insights" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={0.15 + i * 0.03}>
                <div className="card p-6 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{c.title}</h3>
                    {c.ext && (
                      <a className="text-xs text-neutral-500 hover:underline" href={c.ext} target="_blank" rel="noopener">Visit</a>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{c.desc}</p>
                  <Link href={c.href} className="mt-3 inline-flex text-sm text-blue-600 dark:text-blue-400 hover:underline">View page</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* How Seat Maker works (gallery) */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-6xl py-10">
          <h2 className="text-2xl font-semibold">How Seat Maker works</h2>
          <p className="mt-2 text-neutral-800 dark:text-neutral-300">A few snapshots from the app — build profiles, plan layouts, and share instantly.</p>
          <div className="mt-6">
            <Gallery
              ratio="3 / 4"
              items={[
                { src: "/images/seatmakerappcover.png", alt: "Seat Maker cover" },
                { src: "/images/seatmakerappcontent1.png", alt: "Build Profiles" },
                { src: "/images/seatmakercontent6.png", alt: "Layouts" },
              ]}
            />
          </div>
        </section>
      </Reveal>

      {/* Recent posts */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-6xl py-10">
          <h2 className="text-2xl font-semibold">Latest posts</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {recent.map((p, i) => (
              <Reveal key={p.slug} delay={0.15 + i * 0.05}>
                <article className="card p-5">
                  <Link href={`/blog/${p.slug}`} className="font-medium hover:underline">{p.title}</Link>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">{p.description}</div>
                  <div className="mt-2 text-xs text-neutral-500">{p.tags.map((t) => `#${t}`).join(" ")}</div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/blog" className="text-sm underline">Browse all posts</Link>
          </div>
        </section>
      </Reveal>

      {/* Testimonials */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-6xl py-10">
          <h2 className="text-2xl font-semibold">What people say</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              { quote: "Seat Maker saved me hours planning my banquet.", author: "Parent Organizer" },
              { quote: "Clear, patient coding help—our son actually enjoys it now!", author: "Student family" },
              { quote: "Responsive and thoughtful—great to collaborate with.", author: "BBYO peer" },
            ].map((t, i) => (
              <Reveal key={t.quote} delay={0.15 + i * 0.04}>
                <div className="card p-5">
                  <p className="italic">“{t.quote}”</p>
                  <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">— {t.author}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* About preview + FAQ */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-3xl py-10">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-3 text-neutral-800 dark:text-neutral-300">
            Austin Frankel is a 17-year-old student entrepreneur from Rye Brook, NY. Creator of Seat Maker, BBYO regional leader, coding educator (CodeLab, Code Assist), Homework Helpers VP, swim instructor, and pianist (BP_Piano). Blind Brook High School ’26.
          </p>
          <div className="mt-4">
            <Link href="/blog" className="text-sm underline">Read the latest posts</Link>
          </div>
        </section>
      </Reveal>

      {/* Follow along */}
      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-6xl py-10">
          <h2 className="text-2xl font-semibold">Follow along</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <a href={LINKS.seatMakerInstagram} target="_blank" rel="noopener" className="card p-6 flex items-center justify-between">
              <div>
                <div className="font-semibold">@seatmakerapp</div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">App updates, tips, and behind-the-scenes.</div>
              </div>
              <span>📷</span>
            </a>
            <a href={LINKS.personalInstagram} target="_blank" rel="noopener" className="card p-6 flex items-center justify-between">
              <div>
                <div className="font-semibold">@austinfrankel1</div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">Personal projects and life updates.</div>
              </div>
              <span>📷</span>
            </a>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="container-px mx-auto max-w-3xl py-10">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-4">
            <FAQAccordion items={homeFaq} />
          </div>
        </section>
      </Reveal>

      <JsonLd json={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homeFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />
    </div>
  );
}
