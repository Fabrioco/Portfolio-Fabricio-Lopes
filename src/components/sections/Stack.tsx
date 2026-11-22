import { technologyGroups } from "@/data/technologies";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyTag } from "@/components/ui/TechnologyTag";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { StackDiagram } from "../motion/StackDiagram";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Stack e capacidades"
            title="Tecnologia é ferramenta. Resultado é o objetivo."
          />
          <Stagger className="mt-10 space-y-6">
            {technologyGroups.map((g) => (
              <StaggerItem key={g.group}>
                <h3 className="mb-3 text-sm font-semibold text-ink">
                  {g.group}
                </h3>
                <Stagger as="ul" className="flex flex-wrap gap-2" amount={0.4}>
                  {g.items.map((i) => (
                    <StaggerItem as="li" key={i}>
                      <TechnologyTag>{i}</TechnologyTag>
                    </StaggerItem>
                  ))}
                </Stagger>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <StackDiagram />
      </Container>
    </section>
  );
}
