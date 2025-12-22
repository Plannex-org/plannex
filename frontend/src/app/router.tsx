import { authRoutes } from "@/domains/auth/router";
import { dashboardRoutes } from "@/domains/dashboard/router";
import { ganttRoutes } from "@/domains/gantt/router";
import { pertRoutes } from "@/domains/pert/router";
import { projectsRoutes } from "@/domains/projects/router";
import { useRoutes, Navigate } from "react-router-dom";

const Router = () => {
  return useRoutes([
    ...authRoutes,
    ...projectsRoutes,
    ...dashboardRoutes,
    ...ganttRoutes,
    ...pertRoutes,
    { path: "/", element: <Navigate to="/projects" replace /> },
  ]);
};

export default Router;
