import type { CSSProperties } from "react";

const bars = [38, 55, 44, 70, 62, 85, 74];
const stats = ["Serviços ativos", "Equipes em campo", "Concluídos", "Faturamento"];
const next = ["Manutenção preventiva", "Instalação de equipamento", "Visita técnica"];

/** Mockup ilustrativo: as formas não representam métricas reais. */
export function ServiceFlowDashboard() {
  return (
    <div role="img" aria-label="Ilustração do painel do ServiceFlow" style={{ "--accent": "var(--cyan)", "--accent-soft": "var(--cyan-soft)" } as CSSProperties}
      className="flex overflow-hidden rounded-xl border border-line-strong bg-bg2 text-[11px] shadow-2xl shadow-black/50">
      <aside className="hidden w-32 shrink-0 border-r border-line bg-surface p-3 sm:block">
        <p className="mb-4 font-display text-sm font-bold text-accent">ServiceFlow</p>
        {["Dashboard", "Serviços", "Clientes", "Equipes", "Relatórios"].map((i, n) => (
          <p key={i} className={`mb-1 rounded-md px-2 py-1.5 ${n === 0 ? "bg-accent-soft text-accent" : "text-sub"}`}>{i}</p>
        ))}
      </aside>
      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s} className="rounded-lg border border-line bg-surface p-2.5">
              <p className="truncate text-muted">{s}</p>
              <div className="mt-2 h-2.5 w-2/3 rounded bg-accent opacity-60" />
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-5">
          <div className="rounded-lg border border-line bg-surface p-3 md:col-span-3">
            <p className="text-sub">Serviços da semana</p>
            <div className="mt-3 flex h-24 items-end gap-2">
              {bars.map((h, i) => <div key={i} className="flex-1 rounded-t bg-accent" style={{ height: `${h}%`, opacity: 0.35 + i * 0.09 }} />)}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-3 md:col-span-2">
            <p className="text-sub">Próximos atendimentos</p>
            <ul className="mt-2 space-y-2">
              {next.map((n) => <li key={n} className="flex items-center gap-2 text-ink"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{n}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
