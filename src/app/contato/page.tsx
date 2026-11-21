import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactLinks } from "@/components/sections/ContactLinks";

export const metadata: Metadata = { title: "Contato", description: "Conte o que hoje depende de planilhas, mensagens ou trabalho manual e vamos transformar isso em um sistema." };

export default function ContactPage() {
  return (
    <section className="relative pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="grid-bg absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Contato</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">Precisa de um sistema para o seu negócio? Vamos conversar.</h1>
          <p className="mt-6 max-w-lg text-lg text-sub">Conte o que hoje depende de planilhas, mensagens ou trabalho manual. Vamos transformar isso em uma solução clara e eficiente.</p>
          <div className="mt-8"><ContactLinks /></div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
