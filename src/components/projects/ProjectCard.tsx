import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectDashboard } from "@/components/mockups/ProjectDashboard";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/motion/Tilt";

export function ProjectCard({ project, flip }: { project: Project; flip?: boolean }) {
  return (
    <article style={{ "--accent": project.accent, "--accent-soft": project.accentSoft } as CSSProperties}
      className="group grid items-center gap-8 rounded-3xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong sm:p-10 lg:grid-cols-2 lg:gap-12">
      <div className={flip ? "lg:order-2" : ""}>
        <Eyebrow>{project.category}</Eyebrow>
        <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2 font-display text-xl text-ink">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-sub">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">{project.tags.map((t) => <li key={t}><TechnologyTag>{t}</TechnologyTag></li>)}</ul>
        <Link href={`/projetos/${project.slug}`} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">
          Ver case completo <ArrowRight aria-hidden size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <Tilt className="min-w-0"><ProjectDashboard slug={project.slug} /></Tilt>
    </article>
  );
}
