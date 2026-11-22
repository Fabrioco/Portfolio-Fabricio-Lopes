import { Code2, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Spotlight } from "@/components/motion/Spotlight";

const cards = [
  {
    icon: Code2,
    title: "Para empresas e recrutadores",
    text: "Arquitetura bem pensada, produto funcional e capacidade de executar do front-end ao banco de dados.",
    items: [
      "Arquitetura e código organizados.",
      "APIs, autenticação e bancos de dados.",
      "Decisões técnicas com contexto.",
    ],
  },
  {
    icon: Store,
    title: "Para negócios e clientes",
    text: "Sistemas que tiram a operação da planilha, reduzem ruído no WhatsApp e deixam a rotina mais simples.",
    items: [
      "Processos centralizados.",
      "Mais controle e produtividade.",
      "Solução preparada para crescer.",
    ],
  },
];

export function Audience() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Para quem é este portfólio"
          title="Dois públicos, o mesmo padrão de entrega."
        />
        <Stagger
          className="mt-12 grid gap-6 lg:grid-cols-2"
          variant="slide"
          stagger={0.18}
        >
          {cards.map((c) => (
            <StaggerItem key={c.title}>
              <Spotlight className="group h-full overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-colors duration-200 hover:border-line-strong sm:p-10">
                <div
                  aria-hidden
                  className="glow absolute -right-20 -top-20 h-64 w-64"
                />
                <c.icon
                  aria-hidden
                  size={28}
                  strokeWidth={1.5}
                  className="relative text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                />
                <h3 className="relative mt-6 font-display text-2xl font-semibold">
                  {c.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-sub">
                  {c.text}
                </p>
                <Stagger
                  as="ul"
                  className="relative mt-6 space-y-2 text-ink"
                  variant="slide"
                  stagger={0.1}
                  delay={0.25}
                  amount={0.4}
                >
                  {c.items.map((i) => (
                    <StaggerItem as="li" key={i} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                      />
                      {i}
                    </StaggerItem>
                  ))}
                </Stagger>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
