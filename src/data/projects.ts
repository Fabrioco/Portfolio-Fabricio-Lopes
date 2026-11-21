export type Project = {
  slug: "serviceflow" | "theorderflow";
  name: string;
  category: string;
  tagline: string;
  description: string;
  summary: string;
  accent: string;
  accentSoft: string;
  tags: string[];
  meta: { label: string; value: string }[];
  problem: string;
  solution: string;
  features: { title: string; text: string }[];
  tenantLabel: string;
  tenants: string[];
  tenantPoints: string[];
  architecture: string[];
  metricIdeas: string[];
  demoUrl: string;
  githubUrl: string;
  next: "serviceflow" | "theorderflow";
};

export const projects: Project[] = [
  {
    slug: "serviceflow",
    name: "ServiceFlow",
    category: "SaaS de gestão de serviços",
    tagline: "Toda a operação da empresa em um só fluxo.",
    description:
      "Uma plataforma multi-tenant que centraliza a operação, organiza a rotina e cria uma base segura para a empresa crescer.",
    summary:
      "Plataforma para empresas prestadoras de serviços organizarem clientes, agenda, equipes e histórico em um único sistema.",
    accent: "var(--cyan)",
    accentSoft: "var(--cyan-soft)",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "JWT"],
    meta: [
      { label: "Produto", value: "SaaS B2B" },
      { label: "Arquitetura", value: "Multi-tenant" },
      { label: "Atuação", value: "Full-Stack" },
      { label: "Status", value: "Em evolução" },
    ],
    problem:
      "Empresas prestadoras de serviços ainda dependem de papel, planilhas e WhatsApp para organizar clientes, agenda, equipes e histórico.",
    solution:
      "ServiceFlow centraliza a operação em um sistema multi-tenant, com painel administrativo, gestão de clientes, serviços, equipes e acompanhamento das atividades.",
    features: [
      {
        title: "Dashboard operacional",
        text: "Visão do dia: serviços ativos, equipes em campo e concluídos.",
      },
      {
        title: "Agenda e serviços",
        text: "Ordens de serviço com responsável, status e prazo.",
      },
      {
        title: "Clientes e histórico",
        text: "Cada atendimento registrado e fácil de consultar.",
      },
      {
        title: "Equipes e permissões",
        text: "Cada pessoa acessa apenas o que o seu papel permite.",
      },
      { title: "Relatórios", text: "Dados da operação prontos para decisão." },
      {
        title: "Administração da empresa",
        text: "Configurações, usuários e dados de cada organização.",
      },
    ],
    tenantLabel: "ServiceFlow",
    tenants: ["Empresa A", "Empresa B", "Empresa C"],
    tenantPoints: [
      "Usuários próprios",
      "Dados isolados",
      "Configurações próprias",
      "Permissões próprias",
    ],
    architecture: [
      "Autenticação e permissões",
      "Contexto por organização",
      "API com regras de acesso",
      "Banco de dados estruturado",
    ],
    metricIdeas: [
      "Empresas ativas",
      "Serviços registrados",
      "Tempo médio de atendimento",
    ],
    demoUrl: "https://serviceflow-two.vercel.app/",
    githubUrl: "https://github.com/Fabrioco/serviceflow",
    next: "theorderflow",
  },
  {
    slug: "theorderflow",
    name: "TheOrderFlow",
    category: "Pedidos em tempo real",
    tagline: "Do cardápio à cozinha, sem perder nenhum pedido.",
    description:
      "Um painel de pedidos em tempo real com cardápio digital próprio para cada operação, status claros e gestão centralizada.",
    summary:
      "Painel de pedidos em tempo real e cardápio digital para lanchonetes que hoje dependem do WhatsApp.",
    accent: "var(--lime)",
    accentSoft: "var(--lime-soft)",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "WebSockets",
      "PostgreSQL",
      "Docker",
    ],
    meta: [
      { label: "Produto", value: "SaaS B2B" },
      { label: "Arquitetura", value: "Multi-tenant" },
      { label: "Atuação", value: "Full-Stack" },
      { label: "Status", value: "Em evolução" },
    ],
    problem:
      "Lanchonetes perdem pedidos, misturam informações e têm dificuldade de controle quando dependem exclusivamente do WhatsApp.",
    solution:
      "TheOrderFlow oferece um painel de pedidos em tempo real e um cardápio digital próprio para cada lanchonete.",
    features: [
      {
        title: "Pedidos em tempo real",
        text: "O pedido aparece na cozinha no instante em que é feito.",
      },
      {
        title: "Kanban de status",
        text: "Novos, preparando e prontos em um quadro claro.",
      },
      {
        title: "Cardápio digital",
        text: "Cada lanchonete com o seu próprio cardápio e endereço.",
      },
      {
        title: "Produtos e categorias",
        text: "Cadastro simples, com preços e disponibilidade.",
      },
      {
        title: "Notificações",
        text: "Avisos de novos pedidos e mudanças de status.",
      },
      {
        title: "Administração multi-tenant",
        text: "Vários estabelecimentos, cada um com seus dados.",
      },
    ],
    tenantLabel: "TheOrderFlow",
    tenants: ["Lanchonete A", "Lanchonete B", "Lanchonete C"],
    tenantPoints: [
      "Cardápio próprio",
      "Pedidos isolados",
      "Usuários próprios",
      "Configurações próprias",
    ],
    architecture: [
      "Atualização em tempo real",
      "WebSockets",
      "Isolamento por lanchonete",
      "Fluxo de status",
      "Painel administrativo",
      "Experiência otimizada para operações rápidas",
    ],
    metricIdeas: [
      "Pedidos por dia",
      "Tempo médio de preparo",
      "Estabelecimentos ativos",
    ],
    demoUrl: "https://orderflow-coral.vercel.app/",
    githubUrl: "https://github.com/Fabrioco/OrderFlow-Web",
    next: "serviceflow",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
