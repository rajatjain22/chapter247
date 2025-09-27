"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input/Input";
import Form from "../ui/Form";
import API from "@/utils/API";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username) return "Username is required";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await API.post("/login", { username, password });
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Access your dashboard, manage orders and products. Your data is
            protected with industry‑standard security.
          </p>
        </div>

        <div className="auth-card p-6 sm:p-8">
          <h2 className="mb-6 text-2xl text-center font-semibold text-gray-900 dark:text-white">
            Sign in
          </h2>

          <Form onSubmit={handleSubmit} className="space-y-2">
            <Input
              label="Username"
              name="username"
              id="username"
              placeholder="johndev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={
                error && error.toLowerCase().includes("username")
                  ? error
                  : undefined
              }
              autoFocus
            />

            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="············"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                error && error.toLowerCase().includes("password")
                  ? error
                  : undefined
              }
            />

            {error &&
              !error.toLowerCase().includes("email") &&
              !error.toLowerCase().includes("password") && (
                <div className="mb-2 text-red-600 inline-block text-xs font-medium">
                  {error}
                </div>
              )}

            <Button type="submit" variant="primary" loading={loading}>
              Sign In
            </Button>

            <p className="mb-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700"
              >
                Signup
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
