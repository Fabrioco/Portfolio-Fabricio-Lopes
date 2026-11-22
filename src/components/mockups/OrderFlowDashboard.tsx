"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Order = { id: string; num: number; detail: string };
type Cols = Order[][];
type Move = readonly [from: 0 | 1, to: 1 | 2];
type Ghost = {
  id: string;
  num: number;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  moving: boolean;
};

const TITLES = ["Novos", "Preparando", "Prontos"] as const;
const CAPS = [4, 3, 3] as const; // capacidade por coluna
const DETAILS = [
  "2 itens",
  "1 combo",
  "3 itens",
  "1 lanche",
  "2 combos",
] as const;
const MOVE_MS = 800; // duração do arrasto (cursor e card andam juntos)
const GRAB = { x: 22, y: 16 }; // ponto do card onde o cursor "segura"

const mk = (num: number): Order => ({
  id: `o${num}`,
  num,
  detail: DETAILS[num % DETAILS.length],
});

// Topo = mais novo, base = mais antigo. Também é o estado estático do reduced motion.
const SEED: Cols = [[mk(103), mk(102)], [mk(101)], [mk(100)]];

/** Escolhe a próxima movimentação, alternando entre "avançar" e "receber". */
function pickMove(cols: Cols, forwardFirst: boolean): Move | null {
  const forward: Move = [1, 2];
  const intake: Move = [0, 1];
  const options = forwardFirst ? [forward, intake] : [intake, forward];
  return (
    options.find(
      ([f, t]) => cols[f].length > 0 && (t !== 1 || cols[1].length < CAPS[1]),
    ) ?? null
  );
}

/** Move o pedido MAIS ANTIGO (último da lista) para o topo da coluna de destino. */
function moved(cols: Cols, from: number, to: number): Cols {
  const order = cols[from][cols[from].length - 1];
  return cols.map((c, i) =>
    i === from ? c.slice(0, -1) : i === to ? [order, ...c] : c,
  );
}

export function OrderFlowDashboard() {
  const [cols, setCols] = useState<Cols>(SEED);
  const [stats, setStats] = useState({ total: 4, delivered: 0 });
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [cursor, setCursor] = useState({
    x: 160,
    y: 190,
    down: false,
    visible: false,
  });
  const [overCol, setOverCol] = useState<number | null>(null);
  const [enterId, setEnterId] = useState<string | null>(null);
  const [settleId, setSettleId] = useState<string | null>(null);
  const [leavingId, setLeavingId] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<Cols>(SEED); // fonte da verdade para o "diretor" assíncrono
  const counter = useRef(104);
  const gate = useRef({ inView: false, tab: true });
  const prevPos = useRef(new Map<string, { col: string; top: number }>());

  // Pausa: fora da tela ou aba oculta (um único lugar controla os dois).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        gate.current.inView = e.isIntersecting;
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    const onVis = () => {
      gate.current.tab = document.visibilityState === "visible";
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // FLIP: cards que continuam na mesma coluna deslizam até a nova posição.
  useLayoutEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const next = new Map<string, { col: string; top: number }>();
    wrap.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
      const id = el.dataset.card ?? "";
      const col = el.dataset.col ?? "";
      const top = el.offsetTop;
      const prev = prevPos.current.get(id);
      if (
        prev &&
        prev.col === col &&
        Math.abs(prev.top - top) > 1 &&
        typeof el.animate === "function"
      ) {
        el.animate(
          [
            { transform: `translateY(${prev.top - top}px)` },
            { transform: "translateY(0)" },
          ],
          { duration: 260, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
      }
      next.set(id, { col, top });
    });
    prevPos.current = next;
  }, [cols]);

  // "Diretor": roteiro sequencial de chegadas e arrastos.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let forwardFirst = false;

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    // Espera `ms` e, se estiver pausado, segura até voltar. Retorna false se desmontou.
    const step = async (ms: number) => {
      await sleep(ms);
      while (!cancelled && !(gate.current.inView && gate.current.tab))
        await sleep(250);
      return !cancelled;
    };
    const apply = (next: Cols) => {
      colsRef.current = next;
      setCols(next);
    };

    const arrive = async () => {
      const cur = colsRef.current;
      if (cur[0].length >= CAPS[0]) return true;
      const order = mk(counter.current++);
      apply([[order, ...cur[0]], cur[1], cur[2]]);
      setEnterId(order.id);
      setStats((s) => ({ ...s, total: s.total + 1 }));
      const ok = await step(400);
      setEnterId(null);
      return ok;
    };

    const runDrag = async ([from, to]: Move) => {
      const wrap = wrapperRef.current;
      const src = colsRef.current[from];
      if (!wrap || !src.length) return true;
      const order = src[src.length - 1]; // o mais antigo
      const card = wrap.querySelector<HTMLElement>(`[data-card="${order.id}"]`);
      const list = wrap.querySelector<HTMLElement>(`[data-list="${to}"]`);
      if (!card || !list) return true;

      const w = wrap.getBoundingClientRect();
      const ox = w.left + wrap.clientLeft;
      const oy = w.top + wrap.clientTop;
      const c = card.getBoundingClientRect();
      const l = list.getBoundingClientRect();
      const a = { x: c.left - ox, y: c.top - oy }; // origem
      const b = { x: l.left - ox, y: l.top - oy }; // topo da coluna de destino

      // 1) cursor vai até o card
      setCursor({
        x: a.x + GRAB.x,
        y: a.y + GRAB.y,
        down: false,
        visible: true,
      });
      if (!(await step(MOVE_MS + 100))) return false;

      // 2) pressiona: o card vira "fantasma" levantado
      setGhost({
        id: order.id,
        num: order.num,
        detail: order.detail,
        x: a.x,
        y: a.y,
        w: c.width,
        h: c.height,
        moving: false,
      });
      setCursor((p) => ({ ...p, down: true }));
      if (!(await step(180))) return false;

      // 3) arrasta até a coluna de destino
      setGhost((g) => (g ? { ...g, x: b.x, y: b.y, moving: true } : g));
      setCursor({
        x: b.x + GRAB.x,
        y: b.y + GRAB.y,
        down: true,
        visible: true,
      });
      if (!(await step(MOVE_MS * 0.55))) return false;
      setOverCol(to);
      if (!(await step(MOVE_MS * 0.45))) return false;

      // 4) solta
      apply(moved(colsRef.current, from, to));
      setGhost(null);
      setOverCol(null);
      setSettleId(order.id);
      setCursor((p) => ({ ...p, down: false }));
      if (!(await step(500))) return false;

      // Prontos cheio: o mais antigo sai (entregue)
      const done = colsRef.current[2];
      if (done.length > CAPS[2]) {
        const oldest = done[done.length - 1];
        setLeavingId(oldest.id);
        if (!(await step(350))) return false;
        apply(
          colsRef.current.map((col, i) =>
            i === 2 ? col.filter((o) => o.id !== oldest.id) : col,
          ),
        );
        setLeavingId(null);
        setStats((s) => ({ ...s, delivered: s.delivered + 1 }));
      }
      setSettleId(null);
      return true;
    };

    const run = async () => {
      if (!(await step(1200))) return;
      while (!cancelled) {
        if (!(await arrive())) return;
        if (!(await step(500))) return;
        forwardFirst = !forwardFirst;
        const mv = pickMove(colsRef.current, forwardFirst);
        if (mv && !(await runDrag(mv))) return;
        if (!(await step(900))) return;
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics = [
    { label: "Pedidos do dia", value: stats.total },
    { label: "Na fila", value: cols[0].length + cols[1].length },
    { label: "Entregues", value: stats.delivered },
  ];

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label="Ilustração do painel de pedidos do TheOrderFlow com simulação em tempo real"
      style={
        {
          "--accent": "var(--lime)",
          "--accent-soft": "var(--lime-soft)",
        } as CSSProperties
      }
      className="relative overflow-hidden rounded-xl border border-line-strong bg-bg2 p-3 text-[11px] shadow-2xl shadow-black/50 sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-accent">
          TheOrderFlow
        </p>
        <span className="flex items-center gap-1.5 text-sub">
          <span
            aria-hidden
            className="live-dot h-1.5 w-1.5 rounded-full bg-accent"
          />
          Ao vivo
        </span>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-line bg-surface p-2.5"
          >
            <p className="truncate text-muted">{m.label}</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-ink">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cols.map((orders, ci) => (
          <div
            key={TITLES[ci]}
            className={`rounded-lg border bg-surface p-2 transition-colors duration-200 ${
              overCol === ci ? "border-accent" : "border-line"
            }`}
          >
            <p className="mb-2 flex items-center justify-between font-mono text-sub">
              <span>{TITLES[ci]}</span>
              <span className="tabular-nums text-muted">{orders.length}</span>
            </p>
            <ul
              data-list={ci}
              className="relative h-[206px] space-y-1.5 overflow-hidden"
            >
              {orders.map((o) => {
                const dragging = ghost?.id === o.id;
                const state = dragging
                  ? "border-dashed border-line-strong opacity-40"
                  : settleId === o.id
                    ? "kb-settle border-accent"
                    : "border-line";
                return (
                  <li
                    key={o.id}
                    data-card={o.id}
                    data-col={ci}
                    className={`h-[46px] rounded-md border bg-elevated px-2 py-1.5 text-ink transition-colors duration-300 ${state} ${
                      enterId === o.id ? "kb-enter" : ""
                    } ${leavingId === o.id ? "kb-leave" : ""}`}
                  >
                    <p className="truncate font-medium">Pedido #{o.num}</p>
                    <p className="truncate text-sub">{o.detail}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Card sendo arrastado */}
      {ghost && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20"
          style={{
            width: ghost.w,
            height: ghost.h,
            transform: `translate3d(${ghost.x}px, ${ghost.y}px, 0)`,
            transition: ghost.moving
              ? `transform ${MOVE_MS}ms cubic-bezier(0.45, 0, 0.2, 1)`
              : "none",
            willChange: "transform",
          }}
        >
          <div
            className="h-full rounded-md border border-accent bg-elevated px-2 py-1.5 text-ink shadow-xl shadow-black/60 transition-transform duration-150"
            style={{
              transform: ghost.moving
                ? "rotate(-2deg) scale(1.04)"
                : "scale(1.02)",
            }}
          >
            <p className="truncate font-medium">Pedido #{ghost.num}</p>
            <p className="truncate text-sub">{ghost.detail}</p>
          </div>
        </div>
      )}

      {/* Cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30"
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          opacity: cursor.visible ? 1 : 0,
          transition: `transform ${MOVE_MS}ms cubic-bezier(0.45, 0, 0.2, 1), opacity 200ms`,
        }}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-transform duration-150"
          style={{
            transform: cursor.down ? "scale(0.85)" : "scale(1)",
            transformOrigin: "2px 2px",
          }}
        >
          <path
            d="M2 1.5v11l3-2.8 2.2 4.6 1.9-.9-2.2-4.5H11.5z"
            fill="#fff"
            stroke="#07080b"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
