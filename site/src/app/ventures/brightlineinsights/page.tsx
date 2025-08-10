import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrightLineInsights — student‑run research and insights",
  description:
    "BrightLineInsights helps small organizations learn from their community with lightweight surveys, interviews, and clear summaries.",
  openGraph: {
    title: "BrightLineInsights — student‑run research and insights",
    description:
      "BrightLineInsights helps small organizations learn from their community with lightweight surveys, interviews, and clear summaries.",
  },
};

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">BrightLineInsights</h1>
      <p className="mt-3 text-neutral-800 dark:text-neutral-300">
        BrightLineInsights is a student‑run research group that gathers practical feedback
        for small organizations—youth groups, clubs, and local events. We synthesize what
        matters and recommend small changes that improve the experience.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Methods</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-800 dark:text-neutral-300">
        <li>Short, targeted surveys with clear questions</li>
        <li>Friendly interviews and field notes</li>
        <li>One‑page summaries with recommended actions</li>
      </ul>
    </div>
  );
} 