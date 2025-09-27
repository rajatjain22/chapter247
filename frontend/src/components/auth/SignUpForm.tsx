"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/input/Input";
import Form from "../ui/Form";
import API from "@/utils/API";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username) return "Username is required";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
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
      await API.post("/signup", { username, password, firstName, lastName });
      toast.success("Signed up successfully!");
      router.push("/signin");
    } catch (err) {
      toast.error("Failed to sign up. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Join the platform
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Manage products, orders and your dashboard. It only takes a minute to get started.
          </p>
        </div>

        <div className="auth-card p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl text-center font-semibold text-gray-900 dark:text-white">
            Sign Up
          </h2>

          <Form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="First Name"
              name="firstName"
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              label="Last Name"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Input
              label="Username"
              name="username"
              id="username"
              placeholder="Johndev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error.toLowerCase().includes("username") ? error : undefined}
            />

            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="············"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.toLowerCase().includes("password") ? error : undefined}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="············"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error.toLowerCase().includes("confirmPassword") ? error : undefined}
            />

            {error &&
              !["username", "email", "password", "confirmPassword"].some((key) =>
                error.toLowerCase().includes(key)
              ) && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

            <Button type="submit" variant="primary" loading={loading}>
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:text-blue-700">
                Sign In
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
