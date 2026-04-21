"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { createBrand, updateBrand, deleteBrand } from "@/lib/actions/admin-settings";

type Props = {
  brand?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
    website: string;
    isActive: boolean;
  };
};

export default function BrandForm({ brand }: Props) {
  const router = useRouter();
  const isEdit = !!brand?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: brand?.name || "",
    slug: brand?.slug || "",
    description: brand?.description || "",
    logo: brand?.logo || "",
    website: brand?.website || "",
    isActive: brand?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = isEdit
      ? await updateBrand(brand!.id, form)
      : await createBrand(form);

    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed");
      return;
    }
    router.push("/admin/brands");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!brand?.id) return;
    if (!confirm("Delete this brand?")) return;
    setLoading(true);
    const result = await deleteBrand(brand.id);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed to delete");
      return;
    }
    router.push("/admin/brands");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated" />
      <Input label="Website (optional)" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
        />
      </div>
      <ImageUpload
        label="Logo"
        value={form.logo}
        onChange={(url) => setForm({ ...form, logo: url })}
      />
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-[#0a0a0a]" />
        Active
      </label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</div>
      )}

      <div className="flex items-center gap-3 pt-6 border-t border-[#e7e5e0]">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Brand"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 text-[#c23232] hover:text-[#a82727] text-[11px] tracking-[0.15em] uppercase font-semibold"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
