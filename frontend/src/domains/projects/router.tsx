import type { RouteObject } from "react-router-dom";
import ProtectedRoutes from "@/components/guards/protected-routes";
import ProjectsPage from "./views/projects-page";
import ProjectDetailsPage from "./views/project-details-page";

export const projectsRoutes: RouteObject[] = [
  {
    path: "/projects",
    element: (
      <ProtectedRoutes>
        <ProjectsPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <ProtectedRoutes>
        <ProjectDetailsPage />
      </ProtectedRoutes>
    ),
  },
];
