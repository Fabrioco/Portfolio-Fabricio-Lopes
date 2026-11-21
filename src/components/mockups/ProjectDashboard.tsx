import type { Project } from "@/data/projects";
import { ServiceFlowDashboard } from "./ServiceFlowDashboard";
import { OrderFlowDashboard } from "./OrderFlowDashboard";

export function ProjectDashboard({ slug }: { slug: Project["slug"] }) {
  return slug === "serviceflow" ? <ServiceFlowDashboard /> : <OrderFlowDashboard />;
}
