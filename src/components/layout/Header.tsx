"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/contact";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#stack", label: "Stack" },
  { href: "/#sobre", label: "Sobre" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <Container>
        <nav aria-label="Principal" className="rounded-2xl border border-line-strong bg-bg/70 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={close} aria-label={`${site.name}, página inicial`} className="font-display text-lg font-bold tracking-tight">
              {site.initials}<span className="text-accent">.</span>
            </Link>
            <ul className="hidden items-center gap-8 md:flex">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-sub transition-colors hover:text-ink">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/contato" className="hidden min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-bg hover:brightness-110 md:inline-flex">Vamos conversar</Link>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((v) => !v)}>
              {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
            </button>
          </div>
          {open && (
            <ul id="menu-mobile" className="mt-2 flex flex-col border-t border-line pt-2 md:hidden">
              {[...links, { href: "/contato", label: "Vamos conversar" }].map((l) => (
                <li key={l.href}><Link href={l.href} onClick={close} className="flex min-h-11 items-center text-base text-sub hover:text-ink">{l.label}</Link></li>
              ))}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}
