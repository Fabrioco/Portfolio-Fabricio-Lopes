"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Check, Lock } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function TenantArchitecture({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = project.tenants.length;

  // Destaca um tenant por vez enquanto a seção está visível (decorativo).
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % count),
      2400,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce, count]);

  return (
    <div ref={ref}>
      <Stagger className="grid gap-6 lg:grid-cols-2" stagger={0.15}>
        {/* Isolamento por tenant */}
        <StaggerItem className="rounded-2xl border border-line bg-surface p-6 font-mono text-sm">
          <p className="flex items-center gap-2 text-accent">
            <Building2 aria-hidden size={16} />
            {project.tenantLabel}
          </p>
          <ul className="relative mt-4 space-y-3 pl-5">
            <span
              aria-hidden
              className="absolute bottom-3 left-0 top-3 w-px bg-line-strong"
            />
            {project.tenants.map((t, i) => {
              const on = i === active;
              return (
                <li
                  key={t}
                  className={`relative rounded-lg border p-3 transition-colors duration-500 ${
                    on
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-elevated"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute -left-5 top-1/2 h-px w-5 transition-colors duration-500 ${on ? "bg-accent" : "bg-line-strong"}`}
                  />
                  <span
                    aria-hidden
                    className={`absolute -left-[23px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-colors duration-500 ${on ? "bg-accent" : "bg-line-strong"}`}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`transition-colors duration-500 ${on ? "text-ink" : "text-sub"}`}
                    >
                      {t}
                    </p>
                    <Lock
                      aria-hidden
                      size={13}
                      className={`shrink-0 transition-colors duration-500 ${on ? "text-accent" : "text-muted"}`}
                    />
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.tenantPoints.map((p) => (
                      <li
                        key={p}
                        className={`rounded border px-1.5 py-0.5 text-[10px] transition-colors duration-500 ${
                          on
                            ? "border-line-strong text-ink"
                            : "border-line text-muted"
                        }`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </StaggerItem>

        {/* Pontos de arquitetura */}
        <StaggerItem>
          <Stagger
            as="ul"
            className="grid content-start gap-3"
            variant="slide"
            stagger={0.09}
            delay={0.2}
            amount={0.3}
          >
            {project.architecture.map((a) => (
              <StaggerItem
                as="li"
                key={a}
                lift
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-ink transition-colors duration-200 hover:border-accent"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:scale-110">
                  <Check aria-hidden size={14} />
                </span>
                {a}
              </StaggerItem>
            ))}
          </Stagger>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
