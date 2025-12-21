import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
