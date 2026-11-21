import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";
import { ContactLinks } from "./ContactLinks";

export function FinalCTA() {
  return (
    <section id="contato" className="scroll-mt-24 py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface p-8 sm:p-14">
          <div aria-hidden className="glow absolute -right-24 -top-24 h-96 w-96" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Precisa de um sistema para o seu negócio? Vamos conversar.</h2>
              <p className="mt-5 max-w-lg text-sub sm:text-lg">Conte o que hoje depende de planilhas, mensagens ou trabalho manual. Vamos transformar isso em uma solução clara e eficiente.</p>
              <div className="mt-8"><PrimaryButton href="/contato">Enviar mensagem</PrimaryButton></div>
            </div>
            <div className="self-center"><ContactLinks /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
