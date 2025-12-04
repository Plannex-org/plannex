import type { RouteObject } from "react-router-dom";
import AuthLayout from "./components/auth-layout";
import Login from "./pages/login";
import Register from "./pages/register";
import UnProtectedRoutes from "@/components/guards/unprotected-routes";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: (
      <UnProtectedRoutes>
        <AuthLayout />
      </UnProtectedRoutes>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];
