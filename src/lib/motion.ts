import type { Variants } from "motion/react";

/** Easing principal do sistema de movimento. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Durações compartilhadas entre as animações. */
export const duration = {
  micro: 0.18,
  reveal: 0.6,
  choreo: 0.85,
  ambient: 24,
} as const;

/** Configuração padrão para reveals acionados pelo scroll. */
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -80px 0px",
} as const;

/** Entrada padrão de blocos. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: EASE },
  },
};

/** Entrada curta para itens menores e listas densas. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: EASE },
  },
};

/** Container que orquestra a entrada dos filhos em sequência. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
