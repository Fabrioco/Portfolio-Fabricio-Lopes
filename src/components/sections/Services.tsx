import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading eyebrow="Serviços" title="Da ideia à operação, ponta a ponta."
          text="Não entrego apenas telas bonitas. Entendo o processo, desenho a solução e construo o sistema completo para funcionar no dia a dia." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="group bg-surface p-7 transition-colors duration-200 hover:bg-elevated">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <ArrowUpRight aria-hidden size={18} className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-sub">{s.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
