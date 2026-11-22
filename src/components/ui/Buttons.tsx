"use client";

import Link from "next/link";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { EASE, duration } from "@/lib/motion";

type Props = { href: string; children: ReactNode; className?: string; external?: boolean };

const MotionLink = m.create(Link);
const base = "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200";
const motionProps = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: duration.micro, ease: EASE },
};

function Anchor({ href, external, className, children, sheen }: Props & { sheen?: boolean }) {
  const content = (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full motion-reduce:hidden"
        />
      )}
      {children}
    </>
  );

  if (external) {
    return (
      <m.a href={href} target="_blank" rel="noopener noreferrer" className={className} {...motionProps}>
        {content}
      </m.a>
    );
  }

  return (
    <MotionLink href={href} className={className} {...motionProps}>
      {content}
    </MotionLink>
  );
}

export function PrimaryButton(p: Props) {
  return <Anchor {...p} sheen className={`${base} bg-accent text-bg hover:brightness-110 max-sm:w-full ${p.className ?? ""}`} />;
}
export function SecondaryButton(p: Props) {
  return <Anchor {...p} className={`${base} border border-line-strong bg-white/[0.02] text-ink hover:border-accent hover:text-accent max-sm:w-full ${p.className ?? ""}`} />;
}
