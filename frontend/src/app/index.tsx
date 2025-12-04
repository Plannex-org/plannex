import { AuthProvider } from "@/providers/auth-context";
import Router from "./router";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
