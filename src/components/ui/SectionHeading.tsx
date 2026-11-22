import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: ReactNode }) {
  return (
    <Stagger className="max-w-3xl">
      {eyebrow && <StaggerItem><Eyebrow>{eyebrow}</Eyebrow></StaggerItem>}
      <StaggerItem><h2 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">{title}</h2></StaggerItem>
      {text && <StaggerItem><p className="mt-5 max-w-2xl text-base leading-relaxed text-sub sm:text-lg">{text}</p></StaggerItem>}
    </Stagger>
  );
}
