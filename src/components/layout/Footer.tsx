import Link from "next/link";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { contactHref, site } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const social = [
  { key: "github", label: "GitHub", icon: Github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
] as const;

const linkClass =
  "link-underline inline-flex min-h-11 items-center hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container>
        <Stagger
          className="flex flex-col justify-between gap-4 text-sm text-muted md:flex-row md:items-center"
          stagger={0.1}
          amount={0.5}
        >
          <StaggerItem>
            <p>
              © {new Date().getFullYear()} {site.name}. Todos os direitos
              reservados.
            </p>
          </StaggerItem>

          <StaggerItem>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <li>
                <Link href="/projetos/serviceflow" className={linkClass}>
                  ServiceFlow
                </Link>
              </li>
              <li>
                <Link href="/projetos/theorderflow" className={linkClass}>
                  TheOrderFlow
                </Link>
              </li>
              <li>
                <Link href="/contato" className={linkClass}>
                  Contato
                </Link>
              </li>

              {social.map(({ key, label, icon: Icon }) => {
                const href = contactHref(key);
                if (!href) return null;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:text-accent"
                    >
                      <Icon aria-hidden size={18} />
                    </a>
                  </li>
                );
              })}

              <li>
                <a
                  href="#"
                  className="group inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-ink"
                >
                  Topo
                  <ArrowUp
                    aria-hidden
                    size={14}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>
      </Container>
    </footer>
  );
}
