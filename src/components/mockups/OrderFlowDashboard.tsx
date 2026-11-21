"use client";

import { useState, useEffect, useRef } from "react";

const ORDER_INTERVAL = 2500;
const MOVE_INTERVAL = 3500;
const HIGHLIGHT_DURATION = 800;
const MAX_PRONTOS_ORDERS = 3;

const DETAILS = [
  "2 itens",
  "1 combo",
  "3 itens",
  "1 lanche",
  "2 combos",
];

const COLUMNS_TITLES = ["Novos", "Preparando", "Prontos"];

function getRandomDetail(): string {
  return DETAILS[Math.floor(Math.random() * DETAILS.length)];
}

function generateOrderId(): string {
  return `pedido-${Math.random().toString(36).slice(2, 9)}`;
}

type Order = { id: string; title: string; detail: string };

type Column = { title: string; orders: Order[] };

type ColumnsState = Column[];

export function OrderFlowDashboard() {
  // State: 3 colunas com pedidos
  const [columns, setColumns] = useState<ColumnsState>(() => [
    { title: "Novos", orders: [] },
    { title: "Preparando", orders: [] },
    { title: "Prontos", orders: [] },
  ]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const highlightedRef = useRef<Set<string>>(new Set());
  const newOrderRef = useRef<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsPaused(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Document visibility change
  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Main interval: handles both new orders and moves
  useEffect(() => {
    if (reducedMotion || isPaused) return;

    const handleTick = () => {
      if (reducedMotion || isPaused) return;

      // Add new order to "Novos" (column 0)
      const newId = generateOrderId();
      const detail = getRandomDetail();
      const newOrder: Order = {
        id: newId,
        title: `Pedido #${String(columns[0].orders.length + 1).padStart(3, "0")}`,
        detail,
      };

      // Track new order for enter animation
      newOrderRef.current = newId;

      // Move logic: oldest from each column advances (every MOVE_INTERVAL ms)
      const moveOrders = Date.now() % MOVE_INTERVAL < MOVE_INTERVAL - 100;

      const nextColumns = JSON.parse(JSON.stringify(columns));

      if (moveOrders) {
        const [novos, preparando, prontos] = nextColumns;

        // Move oldest from Novos to Preparando
        if (novos.orders.length > 0) {
          const moved = novos.orders.shift();
          if (moved) {
            preparando.orders.unshift(moved);
            highlightedRef.current.add(moved.id);
          }
        }

        // Move oldest from Preparando to Prontos
        if (preparando.orders.length > 0) {
          const moved = preparando.orders.shift();
          if (moved) {
            prontos.orders.unshift(moved);
            highlightedRef.current.add(moved.id);
          }
        }

        // Enforce max in Prontos (remove oldest if over limit)
        if (prontos.orders.length > MAX_PRONTOS_ORDERS) {
          const excess = prontos.orders.length - MAX_PRONTOS_ORDERS;
          for (let i = 0; i < excess; i++) {
            prontos.orders.shift();
          }
          highlightedRef.current.add("removed");
        }
      }

      // Add new order to the top of Novos
      nextColumns[0].orders.unshift(newOrder);

      // Set highlights - remove after duration
      const newHighlightSet = new Set(
        highlightedRef.current || new Set()
      );
      highlightedRef.current = newHighlightSet;

      // Remove highlights after duration
      setTimeout(() => {
        highlightedRef.current = new Set();
      }, HIGHLIGHT_DURATION);

      setColumns(nextColumns);
    };

    const interval = intervalRef.current;
    const tick = setInterval(handleTick, ORDER_INTERVAL);

    return () => {
      clearInterval(tick);
      if (interval) clearInterval(interval);
    };
  }, [reducedMotion, isPaused, columns]);

  // Reset highlights after duration (defensive)
  useEffect(() => {
    const timeout = setTimeout(() => {
      highlightedRef.current = new Set();
    }, HIGHLIGHT_DURATION);
    return () => clearTimeout(timeout);
  }, [columns]);

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Painel de pedidos do TheOrderFlow com simulação em tempo real"
      style={{
        "--accent": "var(--lime)",
        "--accent-soft": "var(--lime-soft)",
      } as { [key: string]: string }}
      className="overflow-hidden rounded-xl border border-line-strong bg-bg2 p-3 text-[11px] shadow-2xl shadow-black/50 sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-accent">TheOrderFlow</p>
        <span className="flex items-center gap-1.5 text-sub">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />Ao vivo
        </span>
      </div>

      {/* Métricas estatísticas */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {COLUMNS_TITLES.map((title, i) => {
          const col = columns[i];
          const count = col.orders.length;
          return (
            <div
              key={title}
              className="rounded-lg border border-line bg-surface p-2.5"
            >
              <p className="truncate text-muted">{title}</p>
              <p className="mt-1 text-xs capitalize text-sub">
                {count}
              </p>
              <div className="mt-2 h-1.5 w-1/2 rounded bg-accent opacity-60" />
            </div>
          );
        })}
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-2">
        {columns.map((col) => {
          const orders = col.orders;

          return (
            <div
              key={col.title}
              className="rounded-lg border border-line bg-surface p-2 min-h-[260px]"
              style={{ minHeight: "260px" }}
            >
              <p className="mb-2 text-sub font-mono">
                {col.title}{orders.length > 0 ? ` ${orders.length}` : ""}
              </p>

              <ul
                className="space-y-1.5 overflow-y-auto max-h-[230px]"
                style={{ maxHeight: "230px" }}
              >
                {orders.map(order => {
                  const isHighlighted =
                    highlightedRef.current.has(order.id);

                  // Fade + slide enter animation for new orders
                  const isNewOrder = newOrderRef.current === order.id;
                  const enterClasses =
                    isNewOrder
                      ? "opacity-0 translate-y-2 transition-opacity ease-out duration-300 transform translate-y-0"
                      : "";

                  const baseClasses = "rounded-md border border-line bg-elevated p-2 text-ink transition-opacity ease-out duration-300 transform ease-out duration-300";

                  const highlightClasses =
                    isHighlighted ? "border-accent" : "";

                  // Clear the new order ref after the animation completes
                  if (isNewOrder) {
                    newOrderRef.current = null;
                  }

                  return (
                    <li
                      key={order.id}
                      className={[
                        baseClasses,
                        highlightClasses,
                        enterClasses,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="font-medium">{order.title}</span>
                      <span
                        className="text-xs capitalize text-sub ml-1"
                      >
                        {order.detail}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}