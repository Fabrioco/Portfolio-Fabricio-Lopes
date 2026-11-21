import { principles } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section id="sobre" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading eyebrow="Como eu trabalho" title="Código é parte da solução. Entender o problema vem antes."
          text="Minha abordagem combina visão de produto e engenharia. Antes de escolher a tecnologia, eu entendo quem usa, onde o processo trava e qual resultado o sistema precisa gerar." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sub">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
