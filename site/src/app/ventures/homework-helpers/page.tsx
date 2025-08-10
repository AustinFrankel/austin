import type { Metadata } from "next";

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

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Homework Helpers</h1>
      <p className="mt-3 text-neutral-800 dark:text-neutral-300">
        Homework Helpers organizes student volunteers to support younger learners with
        homework, planning, and confidence. We focus on routines that make school feel
        manageable—checklists, time boxing, and celebrating progress.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <img src="/images/homeworkhelpers.jpg" alt="Homework Helpers" className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
        <img src="/images/homeworkhelpers2.jpg" alt="Homework Helpers team" className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold">Program pillars</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-800 dark:text-neutral-300">
        <li>Consistency: weekly check‑ins build trust</li>
        <li>Clarity: simple goals and visible plans</li>
        <li>Kindness: encouragement and practical tips</li>
      </ul>
    </div>
  );
} 