import { technologyGroups } from "@/data/technologies";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";

const nodes = ["Interface", "API", "Dados", "Infraestrutura"];

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Stack e capacidades" title="Tecnologia é ferramenta. Resultado é o objetivo." />
          <div className="mt-10 space-y-6">
            {technologyGroups.map((g) => (
              <div key={g.group}>
                <h3 className="mb-3 text-sm font-semibold text-ink">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">{g.items.map((i) => <li key={i}><TechnologyTag>{i}</TechnologyTag></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div role="img" aria-label="Diagrama: núcleo Full-Stack conectado a Interface, API, Dados e Infraestrutura" className="relative mx-auto aspect-square w-full max-w-md">
          <div aria-hidden className="glow absolute inset-0" />
          <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,.1)" strokeDasharray="3 6" />
            {[[200, 50], [350, 200], [200, 350], [50, 200]].map(([x, y]) => <line key={`${x}${y}`} x1="200" y1="200" x2={x} y2={y} stroke="rgba(0,229,255,.35)" />)}
          </svg>
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent bg-surface text-center">
            <span className="font-display font-semibold">Full-Stack</span>
            <span className="text-[10px] text-sub">estratégia + execução</span>
          </div>
          {nodes.map((n, i) => {
            const pos = ["left-1/2 top-[12.5%]", "left-[87.5%] top-1/2", "left-1/2 top-[87.5%]", "left-[12.5%] top-1/2"][i];
            return <span key={n} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line-strong bg-elevated px-3 py-1.5 font-mono text-xs`}>{n}</span>;
          })}
        </div>
      </Container>
    </section>
  );
}
