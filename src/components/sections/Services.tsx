import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Spotlight } from "@/components/motion/Spotlight";

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="Serviços"
          title="Da ideia à operação, ponta a ponta."
          text="Não entrego apenas telas bonitas. Entendo o processo, desenho a solução e construo o sistema completo para funcionar no dia a dia."
        />
        <Stagger
          as="ul"
          stagger={0.06}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="bg-surface">
              <Spotlight className="group h-full p-7 transition-colors duration-200 hover:bg-elevated">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted transition-colors duration-200 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sub">
                  {s.text}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
