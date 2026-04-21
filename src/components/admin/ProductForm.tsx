"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions/admin";

type Category = { id: number; name: string };
type Brand = { id: number; name: string };

type Product = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  brandId: number | null;
  productType: string;
  price: number;
  salePrice: number | null;
  isOnSale: boolean;
  discountPercentage: number | null;
  rentalPrice: number | null;
  sku: string;
  stockQuantity: number;
  isRental: boolean;
  isCustom: boolean;
  isDesigner: boolean;
  isActive: boolean;
  featured: boolean;
  imagePath?: string;
};

type Props = {
  product?: Product;
  categories: Category[];
  brands: Brand[];
  hideImageField?: boolean;
};

export default function ProductForm({ product, categories, brands, hideImageField }: Props) {
  const router = useRouter();
  const isEdit = !!product?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Product>({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    categoryId: product?.categoryId || categories[0]?.id || 0,
    brandId: product?.brandId || null,
    productType: product?.productType || "",
    price: product?.price || 0,
    salePrice: product?.salePrice || null,
    isOnSale: product?.isOnSale || false,
    discountPercentage: product?.discountPercentage || null,
    rentalPrice: product?.rentalPrice || null,
    sku: product?.sku || "",
    stockQuantity: product?.stockQuantity || 0,
    isRental: product?.isRental || false,
    isCustom: product?.isCustom || false,
    isDesigner: product?.isDesigner || false,
    isActive: product?.isActive ?? true,
    featured: product?.featured || false,
    imagePath: product?.imagePath || "",
  });

  const handleChange = <K extends keyof Product>(field: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      rentalPrice: form.rentalPrice ? Number(form.rentalPrice) : null,
      discountPercentage: form.discountPercentage ? Number(form.discountPercentage) : null,
      stockQuantity: Number(form.stockQuantity),
      categoryId: Number(form.categoryId),
      brandId: form.brandId ? Number(form.brandId) : null,
    };

    const result = isEdit
      ? await updateProduct(product!.id!, data)
      : await createProduct(data);

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Save failed");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!product?.id) return;
    if (!confirm("Delete this product? This cannot be undone.")) return;

    setLoading(true);
    const result = await deleteProduct(product.id);
    setLoading(false);

    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(result.error || "Delete failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
      <section>
        <h2 className="font-editorial text-xl font-bold mb-5">Basic Information</h2>
        <div className="space-y-4">
          <Input label="Product Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
          <Input label="Slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="Auto-generated from name" />
          <Input label="Short Description" value={form.shortDescription} onChange={(e) => handleChange("shortDescription", e.target.value)} maxLength={500} />
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
              Full Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
          {!hideImageField && (
            <Input label="Image URL (optional, adds as primary if none exists)" value={form.imagePath || ""} onChange={(e) => handleChange("imagePath", e.target.value)} placeholder="/images/products/my-product.jpg or https://..." />
          )}
        </div>
      </section>

      <section>
        <h2 className="font-editorial text-xl font-bold mb-5">Category</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
              Category
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => handleChange("categoryId", Number(e.target.value))}
              required
              className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3a3a3a] mb-2 font-semibold">
              Brand
            </label>
            <select
              value={form.brandId || ""}
              onChange={(e) => handleChange("brandId", e.target.value ? Number(e.target.value) : null)}
              className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            >
              <option value="">None</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-editorial text-xl font-bold mb-5">Pricing</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Price (RWF)" type="number" min={0} value={form.price} onChange={(e) => handleChange("price", Number(e.target.value))} required />
            <Input label="Sale Price (RWF)" type="number" min={0} value={form.salePrice || ""} onChange={(e) => handleChange("salePrice", e.target.value ? Number(e.target.value) : null)} />
          </div>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={form.isOnSale} onChange={(e) => handleChange("isOnSale", e.target.checked)} className="w-4 h-4 accent-[#0a0a0a]" />
            On Sale
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-editorial text-xl font-bold mb-5">Inventory</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input label="SKU" value={form.sku} onChange={(e) => handleChange("sku", e.target.value)} />
          <Input label="Stock Quantity" type="number" min={0} value={form.stockQuantity} onChange={(e) => handleChange("stockQuantity", Number(e.target.value))} required />
        </div>
      </section>

      <section>
        <h2 className="font-editorial text-xl font-bold mb-5">Attributes</h2>
        <div className="space-y-3">
          {[
            { field: "isActive", label: "Active (visible to customers)" },
            { field: "featured", label: "Featured on homepage" },
            { field: "isDesigner", label: "Designer Piece" },
            { field: "isCustom", label: "Custom Made" },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form[field as keyof Product] as boolean}
                onChange={(e) => handleChange(field as keyof Product, e.target.checked as any)}
                className="w-4 h-4 accent-[#0a0a0a]"
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-6 border-t border-[#e7e5e0]">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 text-[#c23232] hover:text-[#a82727] text-[11px] tracking-[0.15em] uppercase font-semibold"
          >
            Delete Product
          </button>
        )}
      </div>
    </form>
  );
}
