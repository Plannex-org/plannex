import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";
import { authMockApi } from "../services/auth.mock.ts";
import gradientImg from "@/assets/images/auth-gradient.jpg";
import logo from "@/assets/logo/plannex-logo.svg";

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await authMockApi.login({ email, password });
      login(res.token);
      nav("/projects");
    } catch (error: any) {
      setErr(error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: Gradient */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${gradientImg})` }}
      />

      {/* RIGHT: White panel */}
      <div className="relative bg-white">
        {/* LOGO — properly positioned & bigger */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <img src={logo} alt="Plannex" className="h-12 w-auto" />
        </div>

        {/* Centered form */}
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center text-[#000157]">
              <div className="font-semibold">Login To Your Account</div>
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full rounded-lg bg-[#6366F1] text-white py-3 font-medium">
                Login
              </button>
            </form>

            <div className="text-center text-xs text-black/60">
              don&apos;t have an account?{" "}
              <Link className="text-[#6366F1] underline" to="/auth/register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
