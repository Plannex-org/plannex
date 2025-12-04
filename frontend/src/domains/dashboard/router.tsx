import ProtectedRoutes from "@/components/guards/protected-routes";
import type { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <div>Dashboard Home</div>
      </ProtectedRoutes>
    ),
  },
];
