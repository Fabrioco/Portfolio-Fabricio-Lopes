"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { EASE, duration, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

/**
 * Entrada suave de um bloco quando ele entra na viewport.
 * O `data-reveal` permite o fallback de visibilidade sem JavaScript.
 */
export function Reveal({ children, className, delay = 0, y = 24, amount = viewportOnce.amount }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewportOnce, amount }}
      transition={{ duration: duration.reveal, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
