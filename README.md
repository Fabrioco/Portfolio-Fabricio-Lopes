<div align="center">

# Fabrício Oliveira Lopes

**Desenvolvedor Full-Stack** — sistemas web, SaaS multi-tenant e painéis administrativos sob medida.

Transformo processos manuais em sistemas digitais que organizam a operação, reduzem trabalho repetitivo e preparam o negócio para crescer.

<br />

[![Acessar site](https://img.shields.io/badge/Acessar_site-00E5FF?style=for-the-badge&logo=vercel&logoColor=07080B)](https://portfolio-fabricio-lopes.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Fabrioco-07080B?style=for-the-badge&logo=github&logoColor=00E5FF)](https://github.com/Fabrioco)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Fabrício_Lopes-07080B?style=for-the-badge&logo=linkedin&logoColor=A3FF12)](https://www.linkedin.com/in/fabrício-oliveira-lopes-b713892bb)

<br />

![Next.js](https://img.shields.io/badge/Next.js_15-07080B?style=for-the-badge&logo=nextdotjs&logoColor=00E5FF)
![React](https://img.shields.io/badge/React_19-07080B?style=for-the-badge&logo=react&logoColor=00E5FF)
![TypeScript](https://img.shields.io/badge/TypeScript_5-07080B?style=for-the-badge&logo=typescript&logoColor=00E5FF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-07080B?style=for-the-badge&logo=tailwindcss&logoColor=A3FF12)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-07080B?style=for-the-badge&logo=vercel&logoColor=A3FF12)

</div>

<p align="center">
  <a href="https://portfolio-fabricio-lopes.vercel.app">
    <img src="public/og-image.jpg" alt="Prévia do portfólio de Fabrício Oliveira Lopes" width="760" />
  </a>
</p>

## 🚀 Sobre o projeto

Este repositório é o meu portfólio pessoal: uma aplicação **Next.js 15 (App Router)** escrita em **TypeScript**, estilizada com **Tailwind CSS 3** e publicada na **Vercel**.

O site apresenta quem eu sou, os serviços que ofereço e dois produtos completos que desenvolvi — **ServiceFlow** (gestão de serviços) e **TheOrderFlow** (pedidos em tempo real) — com páginas dedicadas que explicam problema, solução, funcionalidades e arquitetura de cada um.

O design usa um tema escuro com acentos em **ciano** (`#00E5FF`) e **lima** (`#A3FF12`), tipografia própria e microinterações discretas.

## ✨ Funcionalidades

- **Página inicial completa** — hero, público-alvo, projetos em destaque, serviços, stack, processo de trabalho e chamada final para contato.
- **Páginas de projeto dinâmicas** — rotas `/projetos/[slug]` geradas estaticamente, com contexto, funcionalidades, arquitetura multi-tenant e métricas.
- **Mockups interativos** — o painel do TheOrderFlow simula um kanban ao vivo (novos pedidos, avanço de colunas e limite de cards), pausando fora da tela, com a aba oculta e respeitando `prefers-reduced-motion`.
- **Formulário de contato** — validação no cliente, proteção contra spam via honeypot, estados de envio e integração com o Formspree.
- **Acessibilidade** — navegação por teclado, `aria-*` nos componentes interativos, foco visível e suporte a movimento reduzido.
- **SEO e compartilhamento** — metadados, OpenGraph/Twitter Cards, JSON-LD (`schema.org/Person`) e imagem OG 1200×630.
- **Responsivo** — layout adaptado de telas pequenas a desktops amplos.

## 🧱 Stack

| Camada | Tecnologias |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 3, PostCSS, Autoprefixer |
| Ícones | lucide-react |
| Fontes | Space Grotesk, Inter e JetBrains Mono via `next/font` |
| Formulário | Formspree (sem backend próprio) |
| Deploy | Vercel |

## 🗂️ Estrutura do projeto

```text
src/
├── app/
│   ├── layout.tsx            # Metadados, fontes, header/footer e JSON-LD
│   ├── page.tsx              # Página inicial
│   ├── globals.css           # Tokens de cor, tema e animações
│   ├── contato/              # Página de contato
│   └── projetos/[slug]/      # Páginas dinâmicas dos projetos
├── components/
│   ├── layout/               # Header e Footer
│   ├── sections/             # Hero, Services, Stack, Process, ContactForm...
│   ├── projects/             # Cards, grid de features e arquitetura
│   ├── mockups/              # Mockups dos produtos (kanban ao vivo etc.)
│   └── ui/                   # Botões, Container, SectionHeading, tags...
└── data/                     # Conteúdo centralizado (contato, projetos, serviços)
```

## ⚙️ Como rodar

**Pré-requisitos:** Node.js 18+ e npm.

```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev
# http://localhost:3000

# Build de produção
npm run build
npm run start
```

## 🔐 Variáveis de ambiente

O formulário de contato usa o [Formspree](https://formspree.io), sem backend próprio.

1. Crie uma conta no Formspree e um novo formulário em **Forms → New form**.
2. Copie o **form ID** — o trecho final do endpoint `https://formspree.io/f/{form-id}`.
3. Crie o arquivo `.env.local` a partir do exemplo e preencha a variável:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_FORMSPREE_ID=seu_form_id
   ```

4. Reinicie o servidor de desenvolvimento.

> Variáveis com prefixo `NEXT_PUBLIC_` ficam visíveis no navegador. Isso é esperado aqui, pois o form ID do Formspree é público — nunca coloque segredos nesse prefixo.

## ☁️ Deploy

O deploy é feito na **Vercel** a partir da branch `main`.

1. Em **Settings → Environment Variables**, cadastre `NEXT_PUBLIC_FORMSPREE_ID` (ambientes Production, Preview e Development).
2. Faça um novo deploy — variáveis `NEXT_PUBLIC_*` são incorporadas no build, então salvar não basta.
3. Se o formulário do Formspree tiver restrição de domínio, adicione o domínio do site em **Settings → Allowed domains**.

**Site em produção:** https://portfolio-fabricio-lopes.vercel.app

## 📜 Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Analisa o código com ESLint |
| `npm run typecheck` | Verifica os tipos com TypeScript |

## ✏️ Personalização

O conteúdo é centralizado em `src/data/`:

- `contact.ts` — nome, URL do site, e-mail, WhatsApp, LinkedIn, GitHub e currículo.
- `projects.ts` — dados dos projetos, links de demo/repositório e textos.
- `services.ts` — serviços oferecidos.
- `technologies.ts` — grupos da stack.
- `content.ts` — headline e princípios de trabalho.

Arquivos estáticos (currículo, imagem OG, favicon) ficam em `public/`.

## 📬 Contato

- **Site:** https://portfolio-fabricio-lopes.vercel.app
- **GitHub:** https://github.com/Fabrioco
- **LinkedIn:** https://www.linkedin.com/in/fabrício-oliveira-lopes-b713892bb

Para propostas e dúvidas, use o formulário em [/contato](https://portfolio-fabricio-lopes.vercel.app/contato).

## 📄 Licença

© Fabrício Oliveira Lopes. Todos os direitos reservados.
