import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeLab — small‑group and 1:1 coding sessions",
  description:
    "CodeLab helps students master fundamentals with friendly, hands‑on sessions. Clear explanations, practice projects, and weekly momentum.",
  openGraph: {
    title: "CodeLab — small‑group and 1:1 coding sessions",
    description:
      "CodeLab helps students master fundamentals with friendly, hands‑on sessions. Clear explanations, practice projects, and weekly momentum.",
  },
};

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">CodeLab</h1>
      <p className="mt-3 text-neutral-900 dark:text-neutral-300">
        CodeLab is my small‑group and one‑on‑one coaching program for students who want to
        learn to code with confidence. I focus on fundamentals, real projects, and clear
        explanations that stick. Sessions are approachable and goal‑oriented with weekly
        check‑ins and simple take‑home practice.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">What students learn</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-900 dark:text-neutral-300">
        <li>Problem‑solving habits: breaking tasks down and naming clearly</li>
        <li>Core concepts: variables, loops, functions, data structures</li>
        <li>Project skills: version control, debugging, and reading docs</li>
        <li>Presenting work: short demos and reflective write‑ups</li>
      </ul>
      <h2 className="mt-8 text-2xl font-semibold">Why it works</h2>
      <p className="mt-3 text-neutral-900 dark:text-neutral-300">
        Students learn fastest when they write code and see results. We keep scopes small,
        celebrate wins, and build momentum. I teach naming and structure so code explains
        itself without comments.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <img src="/images/codelab.png" alt="CodeLab demo" className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
        <img src="/images/codelab2.png" alt="CodeLab materials" className="w-full h-auto rounded-xl border border-black/10 dark:border-white/20" />
      </div>
    </div>
  );
} 