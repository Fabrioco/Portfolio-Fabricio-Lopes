import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroAtmosphere } from "@/components/motion/HeroAtmosphere";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactLinks } from "@/components/sections/ContactLinks";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte o que hoje depende de planilhas, mensagens ou trabalho manual e vamos transformar isso em um sistema.",
};

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <HeroAtmosphere />
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="hero-in">
            <Eyebrow>Contato</Eyebrow>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            <AnimatedHeadline>
              Precisa de um sistema para o seu negócio? Vamos conversar.
            </AnimatedHeadline>
          </h1>
          <p
            className="hero-in mt-6 max-w-lg text-lg text-sub"
            style={delay(450)}
          >
            Conte o que hoje depende de planilhas, mensagens ou trabalho manual.
            Vamos transformar isso em uma solução clara e eficiente.
          </p>
          <div className="hero-in mt-8" style={delay(600)}>
            <ContactLinks />
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
