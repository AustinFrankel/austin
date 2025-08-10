import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import { StatStrip } from "@/components/sections/StatStrip";
import dataJson from "@/lib/timeline.data.json";
import type { TimelineItem } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Timeline — milestones and leadership",
  description: "Austin’s milestones across apps, leadership, teaching, and more — smooth, readable, and accessible.",
};

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="text-3xl font-bold">Timeline</h1>
      <p className="mt-2 text-neutral-800 dark:text-neutral-300">Milestones across apps, ventures, leadership, athletics, and music.</p>
      <div className="mt-5">
        <StatStrip
          items={[
            { label: "Students Taught", value: "32" },
            { label: "App Downloads", value: "1,200" },
            { label: "Ventures", value: "6+" },
            { label: "Hours Taught", value: "180" },
          ]}
        />
      </div>
      <div className="mt-6">
        <Timeline items={dataJson as TimelineItem[]} singleVisible />
      </div>
    </div>
  );
}


