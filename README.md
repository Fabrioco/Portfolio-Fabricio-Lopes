# Portfólio Full-Stack (Next.js)

    npm install
    npm run dev        # http://localhost:3000
    npm run lint && npm run typecheck && npm run build

## Onde inserir seus dados reais
- `src/data/contact.ts`: nome, iniciais, URL do site, e-mail, WhatsApp, LinkedIn, GitHub e currículo (coloque o PDF em `public/`).
- `src/data/projects.ts`: `demoUrl` e `githubUrl` de cada projeto, métricas reais e textos.
- `src/data/content.ts`: headline principal e alternativas.

## Formulário de contato (Formspree)

O envio do formulário usa o [Formspree](https://formspree.io), sem backend próprio.

1. Crie uma conta em `https://formspree.io` e um novo formulário em **Forms > New form**.
2. Copie o **form ID**: é o trecho final da URL do endpoint, no formato `https://formspree.io/f/{form-id}`.
3. Copie o arquivo de exemplo e preencha a variável:

       cp .env.example .env.local

   Conteúdo do `.env.local`:

       NEXT_PUBLIC_FORMSPREE_ID=seu_form_id

4. Reinicie o servidor de desenvolvimento (`npm run dev`).

Na **Vercel**, adicione a mesma variável em **Settings > Environment Variables** (ambientes Production, Preview e Development) e faça um novo deploy.

Observação: variáveis com prefixo `NEXT_PUBLIC_` ficam visíveis no navegador. Isso é esperado e seguro aqui, pois o form ID do Formspree é público. Não coloque segredos nesse prefixo.
