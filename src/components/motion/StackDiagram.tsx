"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

const C = 200; // centro do viewBox 400x400
const R = 128; // raio do anel

const nodes = [
  { label: "Interface", x: C, y: C - R, pos: "left-1/2 top-[18%]" },
  { label: "API", x: C + R, y: C, pos: "left-[82%] top-1/2" },
  { label: "Dados", x: C, y: C + R, pos: "left-1/2 top-[82%]" },
  { label: "Infraestrutura", x: C - R, y: C, pos: "left-[18%] top-1/2" },
] as const;

export function StackDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const shown = useInView(ref, { once: true, amount: 0.35 }); // dispara a entrada
  const visible = useInView(ref, { amount: 0.2 }); // pausa os loops fora da tela
  const on = shown || !!reduce;
  const live = shown && visible && !reduce;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Diagrama: núcleo Full-Stack conectado a Interface, API, Dados e Infraestrutura"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div aria-hidden className="glow absolute inset-0" />

      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
      >
        {/* Anel pontilhado + satélite, em rotação lenta (CSS .orbit) */}
        <g className="orbit">
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeDasharray="3 6"
          />
          <circle cx={C + R} cy={C} r="3" fill="var(--accent)" opacity="0.7" />
        </g>

        {/* Linhas se desenhando */}
        {nodes.map((n, i) => (
          <m.line
            key={n.label}
            x1={C}
            y1={C}
            x2={n.x}
            y2={n.y}
            stroke="var(--accent)"
            strokeOpacity={0.4}
            strokeWidth={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE }}
          />
        ))}

        {/* Pontos de dados percorrendo as linhas */}
        {live &&
          nodes.map((n, i) => (
            <m.circle
              key={`p-${n.label}`}
              r={3}
              fill="var(--accent)"
              initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{ cx: [C, n.x], cy: [C, n.y], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.8,
                times: [0, 0.15, 0.85, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2.4,
                delay: 1.4 + i * 0.7,
              }}
            />
          ))}
      </svg>

      {/* Núcleo: o wrapper posiciona, o m.div anima (evita conflito de transform) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <m.div
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={on ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-accent bg-surface text-center sm:h-28 sm:w-28"
        >
          {live && (
            <m.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-accent"
              initial={{ scale: 1, opacity: 0.45 }}
              animate={{ scale: 1.55, opacity: 0 }}
              transition={{ duration: 2.8, ease: "easeOut", repeat: Infinity }}
            />
          )}
          <span className="font-display text-sm font-semibold sm:text-base">
            Full-Stack
          </span>
          <span className="px-2 text-[9px] leading-tight text-sub sm:text-[10px]">
            estratégia + execução
          </span>
        </m.div>
      </div>

      {/* Nós */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          className={`absolute ${n.pos} -translate-x-1/2 -translate-y-1/2`}
        >
          <m.span
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={on ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.12, ease: EASE }}
            className="block whitespace-nowrap rounded-lg border border-line-strong bg-elevated px-2.5 py-1.5 font-mono text-[11px] transition-colors duration-200 hover:border-accent hover:text-accent sm:px-3 sm:text-xs"
          >
            {n.label}
          </m.span>
        </div>
      ))}
    </div>
  );
}
