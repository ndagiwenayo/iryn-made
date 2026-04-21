import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import ProductImagesManager from "@/components/admin/ProductImagesManager";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const productId = Number(id);

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Edit Product</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">{product.name}</h1>
      </div>

      {/* Image manager on top */}
      <div className="mb-10 max-w-3xl">
        <ProductImagesManager
          productId={product.id}
          images={product.images.map((img) => ({
            id: img.id,
            imagePath: img.imagePath,
            altText: img.altText,
            isPrimary: img.isPrimary,
            sortOrder: img.sortOrder,
          }))}
        />
      </div>

      {/* Product fields form */}
      <ProductForm
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description || "",
          shortDescription: product.shortDescription || "",
          categoryId: product.categoryId,
          brandId: product.brandId,
          productType: product.productType || "",
          price: Number(product.price),
          salePrice: product.salePrice ? Number(product.salePrice) : null,
          isOnSale: product.isOnSale,
          discountPercentage: product.discountPercentage,
          rentalPrice: product.rentalPrice ? Number(product.rentalPrice) : null,
          sku: product.sku || "",
          stockQuantity: product.stockQuantity,
          isRental: product.isRental,
          isCustom: product.isCustom,
          isDesigner: product.isDesigner,
          isActive: product.isActive,
          featured: product.featured,
        }}
        categories={categories}
        brands={brands}
        hideImageField
      />
    </div>
  );
}
