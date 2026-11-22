"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Revela o conteúdo ao entrar na viewport (fade + subida curta).
 * Com reduced motion, o conteúdo aparece direto, sem animação.
 */
export function CodeWindow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-reveal
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}
