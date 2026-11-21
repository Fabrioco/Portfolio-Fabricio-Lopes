import { FileText, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { contact, contactHref, type ContactKey } from "@/data/contact";

const items: { key: ContactKey; label: string; icon: typeof Mail }[] = [
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "email", label: "E-mail", icon: Mail },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "github", label: "GitHub", icon: Github },
  { key: "resumeUrl", label: "Baixar currículo", icon: FileText },
];

export function ContactLinks() {
  void contact;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(({ key, label, icon: Icon }) => {
        const href = contactHref(key);
        const cls = "flex min-h-11 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm";
        return (
          <li key={key}>
            {href ? (
              <a href={href} target={key === "email" ? undefined : "_blank"} rel="noopener noreferrer" className={`${cls} transition-colors hover:border-accent hover:text-accent`}>
                <Icon aria-hidden size={18} />{label}
              </a>
            ) : (
              <span className={`${cls} text-muted`}><Icon aria-hidden size={18} />{label} (a configurar)</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
