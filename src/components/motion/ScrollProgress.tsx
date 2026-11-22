"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Barra fina de progresso de leitura no topo da navegação. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-4 bottom-0 h-px origin-left rounded-full bg-accent/80 shadow-[0_0_8px_var(--accent)]"
    />
  );
}
