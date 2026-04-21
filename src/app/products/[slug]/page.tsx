import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { serializeProduct } from "@/types";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ReviewSection from "@/components/products/ReviewSection";
import ProductCard from "@/components/ui/ProductCard";
import { getSession } from "@/lib/auth-helpers";

type Params = Promise<{ slug: string }>;

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isApproved: true },
        include: { user: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

async function getRelatedProducts(categoryId: number, currentId: number) {
  const products = await prisma.product.findMany({
    where: { categoryId, id: { not: currentId }, isActive: true },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    take: 4,
  });
  return products.map(serializeProduct);
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Not Found | IRYN Made" };
  return {
    title: `${product.name} | IRYN Made`,
    description: product.shortDescription || product.description?.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product || !product.isActive) notFound();

  const session = await getSession();
  const serialized = serializeProduct(product);
  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-6 pb-20">
        {/* Breadcrumb */}
        <nav className="text-[11px] tracking-[0.15em] uppercase text-[#8a8a8a] mb-6 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#0a0a0a]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0a0a0a]">Shop</Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-[#0a0a0a]"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-[#0a0a0a] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16">
          <ProductImageGallery
            images={serialized.images || []}
            productName={product.name}
          />
          <ProductInfo product={serialized} isLoggedIn={!!session} />
        </div>

        {/* Description */}
        {product.description && (
          <section className="mt-20 md:mt-32 max-w-3xl border-t border-[#e7e5e0] pt-16">
            <p className="text-kicker text-[#b8953a] mb-3">Description</p>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold mb-6">
              About this piece
            </h2>
            <p className="text-[#3a3a3a] leading-relaxed text-base whitespace-pre-line">
              {product.description}
            </p>
          </section>
        )}

        <ReviewSection
          productId={product.id}
          reviews={serialized.reviews || []}
          isLoggedIn={!!session}
        />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[#e7e5e0] bg-[#fafaf8] py-20 md:py-28 px-4 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
              <div>
                <p className="text-kicker text-[#b8953a] mb-3">Complete the Look</p>
                <h2 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">
                  You May Also Like
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
