import Link from "next/link";
import { site } from "@/data/contact";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
        <ul className="flex gap-6">
          <li><Link href="/projetos/serviceflow" className="hover:text-ink">ServiceFlow</Link></li>
          <li><Link href="/projetos/theorderflow" className="hover:text-ink">TheOrderFlow</Link></li>
          <li><Link href="/contato" className="hover:text-ink">Contato</Link></li>
        </ul>
      </Container>
    </footer>
  );
}
