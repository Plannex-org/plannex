/* eslint-disable react-refresh/only-export-components */
import React from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = React.useState<string | null>(
    localStorage.getItem("authToken")
  );

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) localStorage.setItem("authToken", newToken);
    else localStorage.removeItem("authToken");
  };

  const login = (newToken: string) => setToken(newToken);
  const logout = () => setToken(null);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
