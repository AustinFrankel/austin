import { Reveal } from "@/components/Reveal";

type Feature = { title: string; description: string };

export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.03}>
          <div className="card p-5 transition-transform hover:-translate-y-1">
            <div className="font-semibold">{f.title}</div>
            <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{f.description}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
} 