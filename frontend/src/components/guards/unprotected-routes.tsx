import { useAuth } from "@/providers/auth-context";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const UnProtectedRoutes = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoutes;
