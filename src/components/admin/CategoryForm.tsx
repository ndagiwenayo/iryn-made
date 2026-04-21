"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/admin-settings";

type Props = {
  category?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
  };
};

export default function CategoryForm({ category }: Props) {
  const router = useRouter();
  const isEdit = !!category?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    image: category?.image || "",
    isActive: category?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = isEdit
      ? await updateCategory(category!.id, form)
      : await createCategory(form);

    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed");
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!category?.id) return;
    if (!confirm("Delete this category?")) return;
    setLoading(true);
    const result = await deleteCategory(category.id);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed to delete");
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <Input label="Slug (auto from name if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
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
        label="Category Image"
        value={form.image}
        onChange={(url) => setForm({ ...form, image: url })}
      />
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="w-4 h-4 accent-[#0a0a0a]"
        />
        Active (visible to customers)
      </label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</div>
      )}

      <div className="flex items-center gap-3 pt-6 border-t border-[#e7e5e0]">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Category"}
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
