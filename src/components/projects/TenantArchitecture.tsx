import { Building2, Check } from "lucide-react";
import type { Project } from "@/data/projects";

export function TenantArchitecture({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface p-6 font-mono text-sm">
        <p className="flex items-center gap-2 text-accent"><Building2 aria-hidden size={16} />{project.tenantLabel}</p>
        <ul className="mt-4 space-y-3 border-l border-line-strong pl-5">
          {project.tenants.map((t) => (
            <li key={t} className="relative rounded-lg border border-line bg-elevated p-3">
              <span aria-hidden className="absolute -left-5 top-1/2 h-px w-5 bg-line-strong" />
              <p className="text-ink">{t}</p>
              <p className="mt-1 text-xs text-muted">{project.tenantPoints.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <ul className="grid content-start gap-3">
        {project.architecture.map((a) => (
          <li key={a} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-ink">
            <Check aria-hidden size={18} className="shrink-0 text-accent" />{a}
          </li>
        ))}
      </ul>
    </div>
  );
}
