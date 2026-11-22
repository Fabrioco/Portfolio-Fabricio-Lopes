"use client";

import * as React from "react";
import { useReducedMotion, useMotionValue } from "motion/react";
import { m } from "motion/react";

/**
 * Fundo atmosférico do Hero:
 * - Dois blobs de gradiente com drift lento em 20–30s.
 * - Grid com parallax leve no desktop.
 * - Spotlight seguindo o ponteiro (mobile desligado).
 * - Pausado off-screen e reduced motion.
 */
export function HeroAtmosphere() {
  const reduce = useReducedMotion();
  const mx = useMotionValue<number>(0);
  const my = useMotionValue<number>(0);

  // Drift dos blobs (lento)
  const blob1X = useMotionValue<number>(-0.5);
  const blob1Y = useMotionValue<number>(-0.3);

  React.useEffect(() => {
    if (reduce) return;

    const tick1 = setInterval(() => {
      mx.set((mx.get() ?? 0) + 0.008);
      my.set((my.get() ?? 0) + 0.005);
    }, 16);
    const tick2 = setInterval(() => {
      mx.set((mx.get() ?? 0) - 0.005);
      my.set((my.get() ?? 0) - 0.003);
    }, 16);

    return () => {
      clearInterval(tick1);
      clearInterval(tick2);
    };
  }, [reduce]);

  React.useEffect(() => {
    if (reduce) return;

    const handler = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [reduce]);

  // Helpers to read current values safely
  const read = (v: import("motion/react").MotionValue<number>) => (v.get() ?? 0);

  return (
    <m.div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Blob 1 */}
      <m.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, var(--accent-soft), transparent 50%)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${read(mx)}px, ${read(my)}px)`,
          animation: `blob1Drift 24s ease-in-out infinite`,
          opacity: 0.6,
        }}
        className="blob blob-1"
      />
      {/* Blob 2 */}
      <m.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 70% 70%, var(--lime-soft), transparent 50%)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${read(blob1X)}px, ${read(blob1Y)}px)`,
          animation: `blob2Drift 30s ease-in-out infinite`,
          opacity: 0.4,
        }}
        className="blob blob-2"
      />
      {/* Grid overlay */}
      <m.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
          animation: "gridMove 30s linear infinite",
        }}
        className="grid-bg"
      />
      {/* Spotlight cursor-following */}
      <m.div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 65%)",
          pointerEvents: "none",
          opacity: reduce ? 0 : 0.5,
        }}
        className="spotlight"
      />
    </m.div>
  );
}