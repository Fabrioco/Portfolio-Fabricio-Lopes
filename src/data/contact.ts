// Preencha com seus dados reais. Campos vazios aparecem como "a configurar".
export const contact = {
  email: "fabriciooliveiralopes50@gmail.com",
  whatsapp: "5511960168159", // apenas números com DDI, ex.: 5519999999999
  linkedin: "https://www.linkedin.com/in/fabrício-oliveira-lopes-b713892bb", // URL completa
  github: "https://github.com/Fabrioco", // URL completa
  resumeUrl: "/fabricio-lopes-cv.pdf", // ex.: /curriculo.pdf (coloque o arquivo em /public)
};

// Dados do site. Troque quando quiser.
export const site = {
  name: "Fabrício Oliveira Lopes",
  initials: "FL",
  url: "https://portfolio-fabricio-lopes.vercel.app",
  title: "Desenvolvedor Full-Stack | Sistemas web e SaaS multi-tenant",
  description:
    "Construo sistemas web, SaaS multi-tenant e painéis administrativos que organizam operações, reduzem trabalho manual e preparam negócios para crescer.",
};

export type ContactKey = keyof typeof contact;
export function contactHref(key: ContactKey): string | null {
  const v = contact[key].trim();
  if (!v) return null;
  if (key === "email") return `mailto:${v}`;
  if (key === "whatsapp") return `https://wa.me/${v}`;
  return v;
}
