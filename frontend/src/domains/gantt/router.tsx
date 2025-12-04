import ProtectedRoutes from "@/components/guards/protected-routes";
import type { RouteObject } from "react-router-dom";

export const ganttRoutes: RouteObject[] = [
  {
    path: "/gantt",
    element: (
      <ProtectedRoutes>
        <div>Dashboard Home</div>
      </ProtectedRoutes>
    ),
  },
];
