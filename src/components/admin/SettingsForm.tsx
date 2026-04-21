"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { updateSettings } from "@/lib/actions/admin-settings";

type Setting = {
  id: number;
  key: string;
  value: string;
  label: string | null;
  group: string | null;
};

type Props = { settings: Setting[] };

const groupLabels: Record<string, string> = {
  business: "Business",
  contact: "Contact Info",
  payment: "Payment",
  shipping: "Shipping",
  homepage: "Homepage Copy",
};

export default function SettingsForm({ settings }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value]))
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const grouped: Record<string, Setting[]> = {};
  for (const s of settings) {
    const g = s.group || "other";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(s);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const result = await updateSettings(values);
    setLoading(false);
    if (result.success) {
      setMessage({ text: "Settings saved", type: "success" });
      router.refresh();
    } else {
      setMessage({ text: result.error || "Save failed", type: "error" });
    }
  };

  const isLongText = (key: string) =>
    key.includes("description") || key.includes("subtitle") || key === "promo_message" || key.includes("message");

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
      {Object.entries(grouped).map(([groupKey, items]) => (
        <section key={groupKey} className="border border-[#e7e5e0] bg-white p-6">
          <h2 className="font-editorial text-xl font-bold mb-5">
            {groupLabels[groupKey] || groupKey}
          </h2>
          <div className="space-y-4">
            {items.map((s) => (
              <div key={s.key}>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
                  {s.label || s.key}
                </label>
                {isLongText(s.key) ? (
                  <textarea
                    value={values[s.key]}
                    onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[s.key]}
                    onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
                  />
                )}
                <p className="text-[10px] text-[#8a8a8a] mt-1 font-mono">{s.key}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {message && (
        <div
          className={`p-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="sticky bottom-4 bg-white border border-[#0a0a0a] p-4 flex items-center justify-between">
        <p className="text-sm text-[#8a8a8a]">Changes apply to the live site</p>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </form>
  );
}
