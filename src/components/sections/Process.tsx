import { principles } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Spotlight } from "@/components/motion/Spotlight";
import { DrawLine } from "@/components/motion/DrawLine";

export function Process() {
  return (
    <section id="sobre" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="Como eu trabalho"
          title="Código é parte da solução. Entender o problema vem antes."
          text="Minha abordagem combina visão de produto e engenharia. Antes de escolher a tecnologia, eu entendo quem usa, onde o processo trava e qual resultado o sistema precisa gerar."
        />
        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.12}>
          {principles.map((p, i) => (
            <StaggerItem as="li" key={p.title}>
              <Spotlight className="group h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-200 hover:border-line-strong">
                <DrawLine className="absolute inset-x-0 top-0 h-px bg-accent opacity-60" delay={0.2 + i * 0.1} />
                <span className="font-mono text-xs text-muted transition-colors duration-200 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sub">{p.text}</p>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}