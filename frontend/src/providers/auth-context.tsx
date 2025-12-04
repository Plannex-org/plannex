/* eslint-disable react-refresh/only-export-components */
import React from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("authToken")
  );

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
