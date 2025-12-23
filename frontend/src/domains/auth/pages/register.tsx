import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";
import { authMockApi } from "../services/auth.mock.ts";
import gradientImg from "@/assets/images/auth-gradient.jpg";
import logo from "@/assets/logo/plannex-logo.svg";

export default function RegisterPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }
    try {
      const res = await authMockApi.register({ name, email, password });
      login(res.token);
      nav("/projects");
    } catch (error: any) {
      setErr(error?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: White panel */}
      <div className="relative bg-white">
        {/* LOGO — properly positioned & bigger */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <img src={logo} alt="Plannex" className="h-12 w-auto" />
        </div>

        {/* Centered form */}
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center text-[#000157]">
              <div className="font-semibold">Create Your Account</div>
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                placeholder="Confirm password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button className="w-full rounded-lg bg-[#6366F1] text-white py-3 font-medium">
                Sign up
              </button>
            </form>

            <div className="text-center text-xs text-black/60">
              already have an account?{" "}
              <Link className="text-[#6366F1] underline" to="/auth/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Gradient */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${gradientImg})` }}
      />
    </div>
  );
}
