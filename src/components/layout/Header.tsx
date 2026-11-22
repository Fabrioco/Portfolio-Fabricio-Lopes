"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { EASE } from "@/lib/motion";

const links = [
  { href: "/#projetos", label: "Projetos", id: "projetos" },
  { href: "/#servicos", label: "Serviços", id: "servicos" },
  { href: "/#stack", label: "Stack", id: "stack" },
  { href: "/#sobre", label: "Sobre", id: "sobre" },
];

const mobileLinks = [
  ...links,
  { href: "/contato", label: "Vamos conversar", id: "contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const visibleSections = useRef(new Set<string>());

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  // Link ativo: usa a ordem das seções no documento, não a ordem de entrada no Set.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      visibleSections.current.clear();
      return;
    }

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            visibleSections.current.add(entry.target.id);
          else visibleSections.current.delete(entry.target.id);
        }
        setActive(
          sections.find((s) => visibleSections.current.has(s.id))?.id ?? null,
        );
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Fecha o menu ao mudar de rota (inclui botão voltar do navegador).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fecha com Esc enquanto estiver aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Ao chegar no breakpoint desktop, o menu mobile não deve ficar "aberto" por baixo.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <Container>
        <nav
          aria-label="Principal"
          data-scrolled={scrolled ? "true" : undefined}
          className={`nav-surface relative overflow-hidden rounded-2xl border border-line-strong backdrop-blur-xl transition-[padding,box-shadow] duration-300 ease-expo ${
            scrolled ? "py-2 shadow-xl shadow-black/25" : "py-2.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={close}
              aria-label={`${site.initials}, ${site.name}, página inicial`}
              className="font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
            >
              {site.initials}
              <span className="text-accent">.</span>
            </Link>

            <ul className="hidden items-center gap-8 md:flex">
              {links.map((l) => {
                const isActive = pathname === "/" && active === l.id;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-active={isActive ? "true" : undefined}
                      aria-current={isActive ? "location" : undefined}
                      className={`link-underline text-sm transition-colors ${isActive ? "text-ink" : "text-sub hover:text-ink"}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/contato"
              aria-current={pathname === "/contato" ? "page" : undefined}
              className="hidden min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-bg transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] md:inline-flex"
            >
              Vamos conversar
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/5 md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X aria-hidden size={22} />
              ) : (
                <Menu aria-hidden size={22} />
              )}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <m.ul
                id="menu-mobile"
                key="menu-mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
                className="overflow-hidden md:hidden"
              >
                {mobileLinks.map((l, i) => {
                  const isPage = pathname === l.href;
                  const isActive = pathname === "/" && active === l.id;
                  return (
                    <li
                      key={l.href}
                      className={
                        i === 0 ? "mt-2 border-t border-line pt-2" : undefined
                      }
                    >
                      <Link
                        href={l.href}
                        onClick={close}
                        aria-current={
                          isPage ? "page" : isActive ? "location" : undefined
                        }
                        className={`flex min-h-11 items-center text-base transition-colors ${
                          isActive || isPage
                            ? "text-accent"
                            : "text-sub hover:text-ink"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </m.ul>
            )}
          </AnimatePresence>

          <ScrollProgress />
        </nav>
      </Container>
    </header>
  );
}
