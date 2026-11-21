import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string; external?: boolean };
const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200";

function Anchor({ href, external, className, children }: Props) {
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

export function PrimaryButton(p: Props) {
  return <Anchor {...p} className={`${base} bg-accent text-bg hover:brightness-110 max-sm:w-full ${p.className ?? ""}`} />;
}
export function SecondaryButton(p: Props) {
  return <Anchor {...p} className={`${base} border border-line-strong bg-white/[0.02] text-ink hover:border-accent hover:text-accent max-sm:w-full ${p.className ?? ""}`} />;
}
