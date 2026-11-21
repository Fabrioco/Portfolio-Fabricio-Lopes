import { headline } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";

const indicators = ["Sistemas completos", "Multi-tenant", "Tempo real", "Sob medida"];

function Code() {
  const k = "text-[#c792ea]", s = "text-accent", p = "text-sub";
  return (
    <div className="relative">
      <div aria-hidden className="glow absolute -inset-10 -z-10" />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-muted">architecture.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 sm:p-6 sm:text-[15px]"><code>
<span className={k}>const</span> <span className="text-ink">solution</span> <span className={p}>= {"{"}</span>{"\n"}
{"  "}<span className="text-ink">product</span><span className={p}>:</span> <span className={s}>&quot;sob medida&quot;</span><span className={p}>,</span>{"\n"}
{"  "}<span className="text-ink">architecture</span><span className={p}>:</span> <span className={s}>&quot;multi-tenant&quot;</span><span className={p}>,</span>{"\n"}
{"  "}<span className="text-ink">experience</span><span className={p}>:</span> <span className={s}>&quot;simples&quot;</span><span className={p}>,</span>{"\n"}
{"  "}<span className="text-ink">impact</span><span className={p}>:</span> <span className={s}>&quot;escalável&quot;</span><span className={p}>,</span>{"\n"}
<span className={p}>{"};"}</span>
        </code></pre>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="rise"><Eyebrow>Desenvolvedor Full-Stack · Brasil</Eyebrow></div>
          <h1 className="rise rise-2 mt-5 font-display text-[46px] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[76px]">{headline}</h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-relaxed text-sub sm:text-lg">
            Construo sistemas web, SaaS multi-tenant e painéis administrativos que organizam operações, reduzem trabalho manual e preparam negócios para crescer.
          </p>
          <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/#projetos">Ver projetos</PrimaryButton>
            <SecondaryButton href="/contato">Quero um sistema para minha empresa</SecondaryButton>
          </div>
          <ul className="rise rise-4 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sub">
            {indicators.map((i) => <li key={i} className="flex items-center gap-2"><span aria-hidden className="h-1 w-1 rounded-full bg-accent" />{i}</li>)}
          </ul>
        </div>
        <div className="rise rise-3"><Code /></div>
      </Container>
    </section>
  );
}
