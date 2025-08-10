import Link from "next/link";
import Image from "next/image";
import { Gallery } from "@/components/sections/Gallery";
import { Timeline } from "@/components/Timeline";
import dataJson from "@/lib/timeline.data.json";
import type { TimelineItem } from "@/components/Timeline";
import { LINKS } from "@/lib/site.config";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export default function About() {

  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">About Austin</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-[160px_1fr] items-start">
        <div className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
          <Image
            src="/images/austin-headshot.jpg"
            alt="Austin Frankel headshot"
            width={800}
            height={1000}
            className="w-full h-auto object-cover"
            priority
            unoptimized
          />
        </div>
        <div>
          <p className="text-neutral-800 dark:text-neutral-300">
            I’m a student entrepreneur from Rye Brook, NY, focused on practical products that help families, schools, and small events. I built Seat Maker, an iOS app for fast, touch‑first seating charts with drag‑and‑drop and instant sharing. I also lead and teach in my community—BBYO leadership, Homework Helpers, CodeLab small groups, and Code Assist 1:1 sessions. My approach is simple: ship quickly, learn from real users, and keep interfaces clear and reachable on mobile.
          </p>
          <p className="mt-3 text-neutral-800 dark:text-neutral-300">
            Outside of tech, I work as a swim instructor/lifeguard and post music as BP_Piano. Balancing school and projects means short cycles, honest release notes, and weekly check‑ins with users. I like small details—thumb reach zones, forgiving gestures, and helpful empty states—that make software feel friendly.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Highlights</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-800 dark:text-neutral-300">
        <li>Seat Maker featured and used for mitzvahs, banquets, and school events</li>
        <li>CodeLab & Code Assist: hands‑on coaching that builds confidence</li>
        <li>BBYO HVR Mazkir: communications, programming, and community projects</li>
        <li>Homework Helpers VP: organizing student tutors for younger learners</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Values</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-800 dark:text-neutral-300">
        <li>Ship quickly and talk to real users every week</li>
        <li>Design for clarity and reachability (especially on mobile)</li>
        <li>Measure with analytics and interviews</li>
        <li>Teach what I learn and give back to my community</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Gallery</h2>
      <div className="mt-3">
        <Gallery
          items={[
            { src: "/images/seatmaker-laptop.jpg", alt: "Seat Maker on laptop" },
            { src: "/images/seatmaker-build-profiles.png", alt: "Build Profiles screenshot" },
            { src: "/images/seatmaker-export-share.png", alt: "Export & Share screenshot" },
          ]}
        />
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Timeline</h2>
      <div className="mt-3">
        <Timeline items={dataJson as TimelineItem[]} singleVisible={false} />
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Press & Links</h2>
      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        <a href={LINKS.mobileAppDailyReview} target="_blank" rel="noopener" className="card p-4">MobileAppDaily — Seat Maker Review</a>
        <a href={LINKS.bbyoArticle} target="_blank" rel="noopener" className="card p-4">BBYO — How BBYO helped me build a top-ranked app</a>
        <a href={LINKS.seatMakerInstagram} target="_blank" rel="noopener" className="card p-4">Instagram — @seatmakerapp</a>
        <a href={LINKS.personalInstagram} target="_blank" rel="noopener" className="card p-4">Instagram — @austinfrankel1</a>
      </div>

      <div className="mt-8">
        <Link href="/contact" className="inline-flex rounded-full border border-black/10 dark:border-white/20 h-11 px-6 items-center">Get in touch</Link>
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FAQAccordion
            items={[
              { q: "Why did you build Seat Maker?", a: "Friends and families needed an easy way to plan banquets and mitzvahs on their phones." },
              { q: "How do you balance school and projects?", a: "Short weekly goals, TestFlight cycles, and honest release notes." },
              { q: "How do you teach?", a: "Diagnose → Model → Practice → Reflect. Students leave with a reusable takeaway." },
            ]}
          />
        </div>
      </div>
    </div>
  );
} 