import ProtectedRoutes from "@/components/guards/protected-routes";
import type { RouteObject } from "react-router-dom";

export const tasksRoutes: RouteObject[] = [
  {
    path: "/tasks",
    element: (
      <ProtectedRoutes>
        <div>Dashboard Home</div>
      </ProtectedRoutes>
    ),
  },
];
