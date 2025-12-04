import ProtectedRoutes from "@/components/guards/protected-routes";
import type { RouteObject } from "react-router-dom";

export const projectRoutes: RouteObject[] = [
  {
    path: "/projects",
    element: (
      <ProtectedRoutes>
        <div>Dashboard Home</div>
      </ProtectedRoutes>
    ),
  },
];
