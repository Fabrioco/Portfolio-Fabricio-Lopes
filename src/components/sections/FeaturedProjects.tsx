import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  return (
    <section id="projetos" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading eyebrow="Projetos em destaque" title="Produtos completos, do problema ao painel." />
        <div className="mt-12 space-y-8">
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} />)}
        </div>
      </Container>
    </section>
  );
}
