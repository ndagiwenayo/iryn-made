"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { createBanner, updateBanner, deleteBanner } from "@/lib/actions/admin-settings";

type Props = {
  banner?: {
    id: number;
    title: string;
    subtitle: string;
    imagePath: string;
    linkUrl: string;
    buttonText: string;
    sortOrder: number;
    isActive: boolean;
  };
};

export default function BannerForm({ banner }: Props) {
  const router = useRouter();
  const isEdit = !!banner?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: banner?.title || "",
    subtitle: banner?.subtitle || "",
    imagePath: banner?.imagePath || "",
    linkUrl: banner?.linkUrl || "",
    buttonText: banner?.buttonText || "",
    sortOrder: banner?.sortOrder || 0,
    isActive: banner?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = isEdit
      ? await updateBanner(banner!.id, form)
      : await createBanner(form);

    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed");
      return;
    }
    router.push("/admin/banners");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!banner?.id) return;
    if (!confirm("Delete this banner?")) return;
    setLoading(true);
    const result = await deleteBanner(banner.id);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Failed");
      return;
    }
    router.push("/admin/banners");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
      <ImageUpload
        label="Banner Image"
        value={form.imagePath}
        onChange={(url) => setForm({ ...form, imagePath: url })}
        aspectRatio="aspect-[16/9]"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Link URL" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} placeholder="/products?category=..." />
        <Input label="Button Text" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} placeholder="Shop Now" />
      </div>
      <Input label="Sort Order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-[#0a0a0a]" />
        Active
      </label>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</div>}

      <div className="flex items-center gap-3 pt-6 border-t border-[#e7e5e0]">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Banner"}
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
