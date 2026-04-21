"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { updateProfile } from "@/lib/actions/auth";

type Props = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
    city: user.city,
    postalCode: user.postalCode,
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const result = await updateProfile(form);
    setLoading(false);
    if (result.success) {
      setMessage({ text: "Profile updated", type: "success" });
      router.refresh();
    } else {
      setMessage({ text: result.error || "Update failed", type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Email" value={user.email} disabled />
        <Input label="Username" value={user.username} disabled />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="First Name" value={form.firstName} onChange={handleChange("firstName")} required />
        <Input label="Last Name" value={form.lastName} onChange={handleChange("lastName")} required />
      </div>
      <Input label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="+250 78X XXX XXX" />
      <Input label="Address" value={form.address} onChange={handleChange("address")} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="City" value={form.city} onChange={handleChange("city")} />
        <Input label="Postal Code" value={form.postalCode} onChange={handleChange("postalCode")} />
      </div>
      {message && (
        <div
          className={`text-sm p-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
