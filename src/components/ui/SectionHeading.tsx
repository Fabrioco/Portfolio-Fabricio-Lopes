import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-sub sm:text-lg">{text}</p>}
    </div>
  );
}
