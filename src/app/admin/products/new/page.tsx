import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Add Product</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">
          New Product
        </h1>
      </div>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
