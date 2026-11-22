import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function FeaturedProjects() {
  return (
    <section id="projetos" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading eyebrow="Projetos em destaque" title="Produtos completos, do problema ao painel." />
        <Stagger className="mt-12 space-y-8">
          {projects.map((p, i) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} flip={i % 2 === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
