"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { registerUser } from "@/lib/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await registerUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      username: form.username,
      password: form.password,
      phone: form.phone,
    });

    if (!result.success) {
      setError(result.error || "Registration failed");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.ok) {
      router.push("/");
      router.refresh();
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] grid md:grid-cols-2 bg-white">
      {/* Left - form */}
      <div className="flex items-center justify-center p-6 md:p-10 order-2 md:order-1">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="text-kicker text-[#b8953a] mb-3">Join Us</p>
            <h1 className="font-editorial text-4xl font-bold leading-[1] mb-2">
              Create Account
            </h1>
            <p className="text-sm text-[#8a8a8a]">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#0a0a0a] font-semibold link-underline">
                Sign in
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" value={form.firstName} onChange={handleChange("firstName")} required />
              <Input label="Last Name" value={form.lastName} onChange={handleChange("lastName")} required />
            </div>
            <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
            <Input label="Username" value={form.username} onChange={handleChange("username")} required />
            <Input label="Phone (optional)" type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="+250 78X XXX XXX" />
            <Input label="Password" type="password" value={form.password} onChange={handleChange("password")} required minLength={6} />
            <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} required minLength={6} />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
            <p className="text-[11px] text-[#8a8a8a] text-center">
              By creating an account, you agree to our{" "}
              <Link href="/contact" className="underline">Terms</Link> and{" "}
              <Link href="/contact" className="underline">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right - visual */}
      <div className="hidden md:flex bg-gradient-to-br from-[#faf6f0] via-[#e8dcc8] to-[#c8b896] items-center justify-center p-10 relative overflow-hidden order-1 md:order-2">
        <div className="absolute inset-0">
          <div className="absolute top-[20%] right-[15%] w-56 h-56 rounded-full bg-[#b8953a]/20 blur-3xl" />
          <div className="absolute bottom-[15%] left-[10%] w-48 h-48 rounded-full bg-white/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-kicker text-[#8a6a3a] mb-6">New Here</p>
          <h2 className="font-editorial text-5xl lg:text-6xl font-bold leading-[1] mb-4">
            Join the<br /><em className="italic">IRYN</em> family
          </h2>
          <p className="text-[#3a3a3a] mt-6 max-w-sm mx-auto">
            Get exclusive access to new arrivals, designer rentals, and
            styling services.
          </p>
        </div>
      </div>
    </div>
  );
}
