export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f.title} className="bg-surface p-6">
          <h3 className="font-display text-lg font-semibold">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-sub">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}
