"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserStatus } from "@/lib/actions/admin";

type Props = {
  userId: number;
  isActive: boolean;
  role: string;
};

export default function UserActions({ userId, isActive, role }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    await updateUserStatus(userId, { isActive: !isActive });
    setLoading(false);
    router.refresh();
  };

  const toggleRole = async () => {
    if (!confirm(`Change role to ${role === "admin" ? "customer" : "admin"}?`)) return;
    setLoading(true);
    await updateUserStatus(userId, { role: role === "admin" ? "customer" : "admin" });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={toggleActive}
        disabled={loading}
        className="text-[10px] text-[#3a3a3a] hover:text-[#0a0a0a] tracking-[0.15em] uppercase font-semibold"
      >
        {isActive ? "Disable" : "Enable"}
      </button>
      <span className="text-[#e7e5e0]">|</span>
      <button
        onClick={toggleRole}
        disabled={loading}
        className="text-[10px] text-[#3a3a3a] hover:text-[#0a0a0a] tracking-[0.15em] uppercase font-semibold"
      >
        {role === "admin" ? "Demote" : "Promote"}
      </button>
    </div>
  );
}
