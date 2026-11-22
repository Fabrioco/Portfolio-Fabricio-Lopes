import { headline } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { HeroAtmosphere } from "@/components/motion/HeroAtmosphere";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { CodeWindow } from "@/components/motion/CodeWindow";
import { CodeEditor } from "@/components/motion/CodeEditor";

const indicators = [
  "Sistemas completos",
  "Multi-tenant",
  "Tempo real",
  "Sob medida",
];

// Entrada em cascata via CSS (classe .hero-in no globals.css).
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <HeroAtmosphere />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="hero-in">
            <Eyebrow>Desenvolvedor Full-Stack · Brasil</Eyebrow>
          </div>

          <h1 className="mt-5 font-display text-[46px] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[76px]">
            <AnimatedHeadline>{headline}</AnimatedHeadline>
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-sub sm:text-lg"
            style={delay(450)}
          >
            Construo sistemas web, SaaS multi-tenant e painéis administrativos
            que organizam operações, reduzem trabalho manual e preparam negócios
            para crescer.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={delay(600)}
          >
            <PrimaryButton href="/#projetos">Ver projetos</PrimaryButton>
            <SecondaryButton href="/contato">
              Quero um sistema para minha empresa
            </SecondaryButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sub">
            {indicators.map((i, n) => (
              <li
                key={i}
                className="hero-in flex items-center gap-2"
                style={delay(800 + n * 90)}
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <CodeWindow>
          <CodeEditor />
        </CodeWindow>
      </Container>
    </section>
  );
}
