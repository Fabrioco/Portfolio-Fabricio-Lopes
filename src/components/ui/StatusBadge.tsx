export function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-accent-soft px-3 py-1 text-xs text-ink">
      <span aria-hidden className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
