import ProtectedRoutes from "@/components/guards/protected-routes";
import type { RouteObject } from "react-router-dom";

export const pertRoutes: RouteObject[] = [
  {
    path: "/pert",
    element: (
      <ProtectedRoutes>
        <div>Dashboard Home</div>
      </ProtectedRoutes>
    ),
  },
];
