import { LINKS } from "@/lib/site.config";
import { JsonLd } from "@/components/JsonLd";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Gallery } from "@/components/sections/Gallery";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: import("next").Metadata = {
  title: "Your Honor Ink — custom apparel and printing",
  description:
    "Your Honor Ink creates custom apparel and printed materials for school groups and events. Quick quotes, quality prints, and friendly service.",
  openGraph: {
    title: "Your Honor Ink — custom apparel and printing",
    description:
      "Your Honor Ink creates custom apparel and printed materials for school groups and events. Quick quotes, quality prints, and friendly service.",
  },
};

const features = [
  { title: "Custom Apparel", description: "Hoodies, tees, and team gear with clean designs and school-safe placements." },
  { title: "Quick Turnaround", description: "Simple order flows and local pickup to hit event deadlines." },
  { title: "Small-Batch Friendly", description: "Classes, clubs, and small teams without huge minimums." },
  { title: "Proofs First", description: "Share a visual mockup before printing so everyone is aligned." },
  { title: "Bulk + Sizes", description: "Collect sizes and names with a simple sheet so orders don’t stall." },
  { title: "Community Projects", description: "Fundraisers and school events with clear pricing and delivery." },
];

const faq = [
  { q: "What do you print?", a: "Hoodies, tees, long sleeves, and simple merch for schools, clubs, and events." },
  { q: "Minimum order?", a: "We work with small groups. Reach out with quantity and timelines." },
  { q: "Design help?", a: "Yes. Share a reference or theme and we’ll propose a clean layout." },
];

export default function Page() {
  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="text-3xl font-bold">Your Honor Ink</h1>
      <p className="mt-2 text-neutral-800 dark:text-neutral-300">Custom apparel and printing for clubs, teams, and school events. Quick proofs, clear pricing, and on-time delivery.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={LINKS.yourHonorInkSite} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">Website</a>
        <a href={LINKS.yourHonorInkInstagram} target="_blank" rel="noopener" className="rounded-full border border-black/10 dark:border-white/20 h-11 px-6 inline-flex items-center">@yourhonorink</a>
      </div>

      <div className="mt-10">
        <FeatureGrid items={features} />
      </div>

      <div className="mt-10">
          <Gallery
          items={[
            { src: "/images/austin-headshot.jpeg", alt: "Sample merch" },
            { src: "/images/austin-headshot.jpeg", alt: "Sample print" },
            { src: "/images/austin-headshot.jpeg", alt: "Local pickup" },
          ]}
        />
      </div>

      <div className="mt-10 grid gap-4">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <FAQAccordion items={faq} />
      </div>

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Your Honor Ink",
          url: LINKS.yourHonorInkSite,
          sameAs: [LINKS.yourHonorInkInstagram],
        }}
      />
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Ventures", item: "/ventures" },
            { "@type": "ListItem", position: 3, name: "Your Honor Ink", item: "/ventures/your-honor-ink" },
          ],
        }}
      />
    </div>
  );
}