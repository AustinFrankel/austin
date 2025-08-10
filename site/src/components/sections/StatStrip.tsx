export function StatStrip({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border border-black/10 dark:border-white/20 p-4 text-center">
          <div className="text-xs uppercase tracking-wide text-neutral-500">{it.label}</div>
          <div className="mt-1 font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
