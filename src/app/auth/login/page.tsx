"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="••••••••"
      />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">
          {error}
        </div>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] grid md:grid-cols-2 bg-white">
      {/* Left - visual */}
      <div className="hidden md:flex bg-gradient-to-br from-[#f5ede5] via-[#e8dcc8] to-[#c8b896] items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[15%] w-48 h-48 rounded-full bg-[#b8953a]/20 blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-56 h-56 rounded-full bg-white/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-kicker text-[#8a6a3a] mb-6">Welcome Back</p>
          <h2 className="font-editorial text-5xl lg:text-6xl font-bold leading-[1] mb-4">
            Good to see<br />you <em className="italic">again</em>
          </h2>
          <p className="text-[#3a3a3a] mt-6 max-w-sm mx-auto">
            Your closet awaits. Continue exploring luxury handcrafted fashion.
          </p>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="text-kicker text-[#b8953a] mb-3">Account Access</p>
            <h1 className="font-editorial text-4xl font-bold leading-[1] mb-2">
              Sign In
            </h1>
            <p className="text-sm text-[#8a8a8a]">
              New to IRYN Made?{" "}
              <Link href="/auth/register" className="text-[#0a0a0a] font-semibold link-underline">
                Create an account
              </Link>
            </p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
