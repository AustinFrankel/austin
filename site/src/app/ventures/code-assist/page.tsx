import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Assist — on‑demand debugging and explanations",
  description:
    "Code Assist provides fast, friendly help when you’re stuck. We isolate problems, fix errors, and explain the why so it sticks.",
  openGraph: {
    title: "Code Assist — on‑demand debugging and explanations",
    description:
      "Code Assist provides fast, friendly help when you’re stuck. We isolate problems, fix errors, and explain the why so it sticks.",
  },
};

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Code Assist</h1>
      <p className="mt-3 text-neutral-800 dark:text-neutral-300">
        Code Assist is a flexible help session for students who need a boost. We start with
        the smallest reproducible example, identify the concept, and fix it together. The
        goal is always understanding, not just a quick patch.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">How sessions work</h2>
      <ul className="mt-3 list-disc pl-6 text-neutral-800 dark:text-neutral-300">
        <li>Share the error and a minimal snippet</li>
        <li>We reproduce the issue and model a clean example</li>
        <li>You practice the fix and apply it to your project</li>
        <li>We write a short takeaway so it’s easy to reuse</li>
      </ul>
    </div>
  );
} 