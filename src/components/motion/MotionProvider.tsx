"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Provider raiz de movimento.
 *
 * - `LazyMotion` carrega apenas as features necessárias (domAnimation).
 * - `strict` garante que os componentes usem `m.*` em vez de `motion.*`,
 *   mantendo o bundle enxuto.
 * - `reducedMotion="user"` respeita a preferência do sistema operacional.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
