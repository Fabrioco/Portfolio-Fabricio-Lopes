"use client";

import { createContext, useContext, type ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { EASE, viewportOnce } from "@/lib/motion";

const tags = {
  div: m.div,
  ul: m.ul,
  li: m.li,
  article: m.article,
  section: m.section,
} as const;

type Tag = keyof typeof tags;

export type StaggerVariant = "fadeUp" | "blur" | "scale" | "pop" | "slide";

const spring = { type: "spring", stiffness: 380, damping: 26 } as const;
const bounce = { type: "spring", stiffness: 420, damping: 20 } as const;

const itemVariants: Record<StaggerVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: spring },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.6, y: 8 },
    visible: { opacity: 1, scale: 1, y: 0, transition: bounce },
  },
  slide: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  },
};

// Sem movimento: o item já nasce visível.
const still: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

const VariantContext = createContext<StaggerVariant>("fadeUp");

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Espera antes do primeiro item (s). */
  delay?: number;
  /** Intervalo entre itens (s). */
  stagger?: number;
  /** Quanto do container precisa estar visível para disparar (0 a 1). */
  amount?: number;
  /** Estilo de entrada dos itens. */
  variant?: StaggerVariant;
};

/**
 * Container que anima os filhos em sequência.
 * Use junto com `StaggerItem`.
 */
export function Stagger({
  children,
  className,
  as = "div",
  delay = 0.05,
  stagger = 0.08,
  amount = viewportOnce.amount,
  variant = "fadeUp",
}: StaggerProps) {
  const Component = tags[as] as typeof m.div;

  return (
    <VariantContext.Provider value={variant}>
      <Component
        data-reveal
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          ...viewportOnce,
          amount,
          margin: "0px 0px 200px 0px",
        }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {children}
      </Component>
    </VariantContext.Provider>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Sobe um pouco no hover. */
  lift?: boolean;
};

/** Item de uma sequência criada por `Stagger`. */
export function StaggerItem({
  children,
  className,
  as = "div",
  lift = false,
}: StaggerItemProps) {
  const variant = useContext(VariantContext);
  const reduce = useReducedMotion();
  const Component = tags[as] as typeof m.div;

  return (
    <Component
      data-reveal
      className={className}
      variants={reduce ? still : itemVariants[variant]}
      whileHover={
        lift && !reduce ? { y: -3, transition: { duration: 0.2 } } : undefined
      }
    >
      {children}
    </Component>
  );
}
