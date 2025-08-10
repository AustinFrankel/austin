import type { Metadata } from "next";
import { LINKS } from "@/lib/site.config";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Gallery } from "@/components/sections/Gallery";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

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

const features = [
  { title: "Short Surveys", description: "Lightweight forms with clear questions and fast turnaround." },
  { title: "Friendly Interviews", description: "Approachable conversations that surface real insights." },
  { title: "Actionable Summaries", description: "One‑page briefs with recommendations and next steps." },
  { title: "Community Focus", description: "Students helping clubs and small orgs learn from their audience." },
  { title: "Flexible Channels", description: "Email, DMs, QR links, and on‑site conversations." },
  { title: "Ethical & Private", description: "Clear intents, opt‑outs, and simple anonymization." },
];

const faq = [
  { q: "Who do you work with?", a: "Clubs, youth groups, school events, and small teams who need quick feedback." },
  { q: "What do deliverables look like?", a: "A one‑page PDF with a few key charts and 3‑5 recommended actions." },
  { q: "How fast is the cycle?", a: "Usually 1–2 weeks from kickoff to insights, depending on audience size." },
];

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">BrightLineInsights</h1>
      <p className="mt-3 text-neutral-900 dark:text-neutral-300">
        Student‑run research that helps small orgs learn fast with short surveys, friendly interviews,
        and one‑page summaries.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={LINKS.brightlineInsightsSite} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">Website</a>
        <a href={LINKS.brightlineInsightsAlt} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">Alt site</a>
      </div>

      <div className="mt-10">
        <FeatureGrid items={features} />
      </div>

      <div className="mt-10">
        <Gallery
          items={[
            { src: "/images/seatmakerappcontent3.png", alt: "Survey snapshot" },
            { src: "/images/seatmakerappcontent4.png", alt: "Interview notes" },
            { src: "/images/seatmakerappcontent5.png", alt: "Summary sample" },
          ]}
        />
      </div>

      <div className="mt-10 grid gap-4">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <FAQAccordion items={faq} />
      </div>
    </div>
  );
} 