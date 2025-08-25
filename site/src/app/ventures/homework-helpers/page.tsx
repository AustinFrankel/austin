import type { Metadata } from "next";
import Image from "next/image";
import { LINKS } from "@/lib/site.config";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Gallery } from "@/components/sections/Gallery";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "Homework Helpers — student‑led tutoring and mentorship",
  description:
    "Homework Helpers connects younger learners with approachable high‑school mentors for consistent support and study habits.",
  openGraph: {
    title: "Homework Helpers — student‑led tutoring and mentorship",
    description:
      "Homework Helpers connects younger learners with approachable high‑school mentors for consistent support and study habits.",
  },
};

const features = [
  { title: "Consistent Mentoring", description: "Weekly sessions with approachable high‑school tutors build trust and momentum." },
  { title: "Homework Planning", description: "Simple checklists and time‑boxing make assignments manageable." },
  { title: "Study Habits", description: "Note‑taking, recall practice, and problem‑solving strategies that stick." },
  { title: "Flexible Scheduling", description: "Short, focused blocks fit around sports and activities." },
  { title: "Friendly Tutors", description: "Students learn best with peers who encourage and explain clearly." },
  { title: "Progress Tracking", description: "Small wins each week—parents see clear notes and takeaways." },
];

const faq = [
  { q: "What subjects?", a: "Math, science, ELA, and study skills. We match students to tutors they click with." },
  { q: "Meeting format?", a: "In‑person or online—short weekly blocks with a simple agenda and follow‑up notes." },
  { q: "How to join?", a: "Share your grade, subjects, and availability. We’ll propose a plan and start next week." },
];

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white"><span className="text-bg">Homework Helpers</span></h1>
      <p className="mt-3 text-neutral-900 dark:text-neutral-300"><span className="text-bg">Homework Helpers organizes student volunteers to support younger learners with homework, planning, and confidence. We focus on routines that make school feel manageable—checklists, time boxing, and celebrating progress.</span></p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={LINKS.homeworkHelpersSite} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">Website</a>
      </div>

      <div className="mt-8">
        <FeatureGrid items={features} />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Image src="/images/homeworkhelpers.jpg" alt="Homework Helpers" width={1200} height={800} className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
        <Image src="/images/homeworkhelpers2.jpg" alt="Homework Helpers team" width={1200} height={800} className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
      </div>
      <div className="mt-10 grid gap-4">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <FAQAccordion items={faq} />
      </div>
    </div>
  );
} 