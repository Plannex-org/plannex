import type { RouteObject } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export const authRoutes: RouteObject[] = [
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
];
