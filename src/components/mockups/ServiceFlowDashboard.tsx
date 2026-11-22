import type { CSSProperties } from "react";
import {
  AlignLeft,
  CalendarDays,
  Check,
  ClipboardList,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Mockup ilustrativo: todos os valores e nomes abaixo são fictícios. */
const tabs = ["Painel", "Clientes", "Ordens de serviço", "Equipe"];

const stats: { label: string; value: string; icon?: LucideIcon }[] = [
  { label: "Ordens abertas", value: "12", icon: ClipboardList },
  { label: "Agendadas para hoje", value: "4", icon: CalendarDays },
  { label: "Em andamento", value: "3", icon: Wrench },
  { label: "Concluídas no mês", value: "28", icon: Check },
  { label: "Faturamento do mês", value: "R$ 18.400" }, // sem ícone: usa o chip "R$"
];

const upcoming = [
  {
    time: "09:00",
    title: "Manutenção preventiva",
    status: "Agendada",
    live: false,
  },
  {
    time: "11:30",
    title: "Instalação de equipamento",
    status: "Em andamento",
    live: true,
  },
  { time: "14:00", title: "Visita técnica", status: "Agendada", live: false },
];

const activity = [
  { text: "Ordem #1042 concluída", when: "há 5 min" },
  { text: "Nova ordem criada", when: "há 32 min" },
  { text: "Equipe atribuída a uma ordem", when: "há 1 h" },
];

export function ServiceFlowDashboard() {
  return (
    <div
      role="img"
      aria-label="Ilustração do painel do ServiceFlow, com dados fictícios"
      style={
        {
          "--accent": "var(--cyan)",
          "--accent-soft": "var(--cyan-soft)",
        } as CSSProperties
      }
      className="overflow-hidden rounded-xl border border-line-strong bg-bg2 text-[11px] shadow-2xl shadow-black/50"
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex items-center gap-1.5 py-2.5 font-display text-xs font-bold text-ink">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent text-bg">
              <AlignLeft aria-hidden size={12} />
            </span>
            ServiceFlow
          </span>
          <ul className="flex min-w-0 gap-3 overflow-hidden">
            {tabs.map((t, i) => (
              <li
                key={t}
                className={`whitespace-nowrap border-b-2 py-2.5 ${
                  i === 0
                    ? "border-accent text-ink"
                    : "border-transparent text-sub"
                } ${i > 1 ? "hidden sm:block" : ""}`}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-sub">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[9px] font-semibold text-accent">
            D
          </span>
          Dono
        </span>
      </div>

      <div className="p-3 sm:p-4">
        {/* Saudação + ação */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold text-ink">
              Olá, bem-vindo de volta
            </p>
            <p className="mt-0.5 truncate text-muted">
              Resumo da sua operação hoje
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-accent px-2.5 py-1.5 font-semibold text-bg">
            Nova ordem
          </span>
        </div>

        {/* Cards de métricas */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-lg border border-line bg-surface p-2.5 last:col-span-2"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-muted">{label}</p>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                  {Icon ? (
                    <Icon aria-hidden size={11} />
                  ) : (
                    <span className="text-[9px] font-bold">R$</span>
                  )}
                </span>
              </div>
              <p className="mt-2 font-display text-base font-semibold tabular-nums text-ink">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Painéis */}
        <div className="mt-2 grid gap-2 md:grid-cols-5">
          <div className="rounded-lg border border-line bg-surface md:col-span-3">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <div>
                <p className="font-medium text-ink">Próximos atendimentos</p>
                <p className="text-muted">Agendadas e em andamento</p>
              </div>
              <span className="text-accent">Ver todas</span>
            </div>
            <ul className="divide-y divide-line">
              {upcoming.map((u) => (
                <li
                  key={u.title}
                  className="flex items-center gap-2.5 px-3 py-2"
                >
                  <span className="font-mono text-muted">{u.time}</span>
                  <span className="min-w-0 flex-1 truncate text-ink">
                    {u.title}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 ${
                      u.live
                        ? "bg-accent-soft text-accent"
                        : "border border-line text-sub"
                    }`}
                  >
                    {u.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-surface md:col-span-2">
            <div className="border-b border-line px-3 py-2">
              <p className="font-medium text-ink">Atividade recente</p>
              <p className="text-muted">Últimas atualizações</p>
            </div>
            <ul className="space-y-2.5 px-3 py-2.5">
              {activity.map((a) => (
                <li key={a.text} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-ink">{a.text}</p>
                    <p className="text-muted">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
