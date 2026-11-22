"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Linha que se desenha da esquerda para a direita.
 * Precisa estar dentro de um StaggerItem: ela herda o gatilho "visible" do pai.
 */
export function DrawLine({ className = "", delay = 0.2 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <m.span
      aria-hidden
      className={`block origin-left ${className}`}
      variants={
        reduce
          ? undefined
          : {
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8, delay, ease: EASE } },
            }
      }
    />
  );
}