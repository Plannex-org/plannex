import type { RouteObject } from "react-router-dom";
import LoginPage from "./views/login-page";
import RegisterPage from "./views/register-page";

export const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
