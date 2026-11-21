import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { ProjectDashboard } from "@/components/mockups/ProjectDashboard";
import { FeatureGrid } from "@/components/projects/FeatureGrid";
import { TenantArchitecture } from "@/components/projects/TenantArchitecture";
import { FinalCTA } from "@/components/sections/FinalCTA";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.name}: ${p.category}`, description: p.summary };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = getProject(p.next)!;

  return (
    <div style={{ "--accent": p.accent, "--accent-soft": p.accentSoft } as CSSProperties}>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <Container>
          <Link href="/#projetos" className="inline-flex min-h-11 items-center gap-2 text-sm text-sub hover:text-ink"><ArrowLeft aria-hidden size={16} />Voltar aos projetos</Link>
          <div className="mt-4"><Eyebrow>{p.category}</Eyebrow></div>
          <h1 className="mt-3 font-display text-[46px] font-semibold leading-none tracking-tight sm:text-7xl">{p.name}</h1>
          <p className="mt-4 font-display text-2xl text-ink">{p.tagline}</p>
          <p className="mt-4 max-w-2xl text-lg text-sub">{p.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {p.demoUrl ? <PrimaryButton href={p.demoUrl} external><ExternalLink aria-hidden size={16} />Ver demonstração</PrimaryButton> : <PrimaryButton href="/contato">Solicitar demonstração</PrimaryButton>}
            {p.githubUrl ? <SecondaryButton href={p.githubUrl} external><Github aria-hidden size={16} />GitHub</SecondaryButton> : null}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 lg:grid-cols-4">
            {p.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{m.label}</dt>
                <dd className="mt-1.5">{m.label === "Status" ? <StatusBadge>{m.value}</StatusBadge> : m.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14"><ProjectDashboard slug={p.slug} /></div>
          <ul className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t}><TechnologyTag>{t}</TechnologyTag></li>)}</ul>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-8">
            <Eyebrow>Problema</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed">{p.problem}</p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-surface p-8">
            <Eyebrow>Solução</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed">{p.solution}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Recursos" title="O que o sistema entrega." />
          <div className="mt-10"><FeatureGrid items={p.features} /></div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Arquitetura" title="Cada empresa em seu próprio espaço." />
          <div className="mt-10"><TenantArchitecture project={p} /></div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Métricas" title="Resultados reais entram aqui." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {p.metricIdeas.map((m) => (
              <li key={m} className="rounded-2xl border border-dashed border-line-strong p-6">
                <p className="font-mono text-sm text-accent">[inserir métrica real]</p>
                <p className="mt-2 text-sub">{m}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Link href={`/projetos/${next.slug}`} style={{ "--accent": next.accent } as CSSProperties}
            className="group flex items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent sm:p-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Próximo projeto</p>
              <p className="mt-2 font-display text-3xl font-semibold sm:text-5xl">{next.name}</p>
              <p className="mt-2 text-sub">{next.tagline}</p>
            </div>
            <ArrowRight aria-hidden size={32} className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-2" />
          </Link>
        </Container>
      </section>

      <FinalCTA />
    </div>
  );
}
