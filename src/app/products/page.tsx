import Link from "next/link";
import prisma from "@/lib/prisma";
import { serializeProduct } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

type SearchParams = Promise<{
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  search?: string;
  sale?: string;
}>;

async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });
}

async function getProducts(params: Awaited<SearchParams>) {
  const where: any = { isActive: true };

  if (params.category) {
    const category = await prisma.category.findUnique({
      where: { slug: params.category },
    });
    if (category) where.categoryId = category.id;
  }

  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) where.price.gte = Number(params.minPrice);
    if (params.maxPrice) where.price.lte = Number(params.maxPrice);
  }

  if (params.search) {
    where.OR = [
      { name: { contains: params.search } },
      { description: { contains: params.search } },
    ];
  }

  if (params.sale === "true") where.isOnSale = true;

  let orderBy: any = { createdAt: "desc" };
  if (params.sort === "price-asc") orderBy = { price: "asc" };
  else if (params.sort === "price-desc") orderBy = { price: "desc" };
  else if (params.sort === "name") orderBy = { name: "asc" };

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy,
  });

  return products.map(serializeProduct);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const activeCategory = params.category
    ? categories.find((c) => c.slug === params.category)
    : null;

  return (
    <div className="bg-white">
      {/* Page hero */}
      <div className="border-b border-[#e7e5e0]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="text-[11px] tracking-[0.15em] uppercase text-[#8a8a8a] mb-4 flex gap-2">
            <Link href="/" className="hover:text-[#0a0a0a]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#0a0a0a]">Shop</Link>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-[#0a0a0a]">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <h1 className="font-editorial text-5xl md:text-7xl font-bold leading-[1] mb-3">
                {activeCategory ? activeCategory.name : "All Products"}
              </h1>
              {activeCategory?.description && (
                <p className="text-[#3a3a3a] max-w-xl">
                  {activeCategory.description}
                </p>
              )}
              {!activeCategory && (
                <p className="text-[#3a3a3a] max-w-xl">
                  Discover the full IRYN Made collection. Handcrafted,
                  curated, and made in Rwanda.
                </p>
              )}
            </div>
            <p className="text-sm text-[#8a8a8a]">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Filters */}
          <aside className="hidden lg:block">
            <ProductFilters
              categories={categories.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                count: c._count.products,
              }))}
            />
          </aside>

          {/* Mobile filter bar */}
          <div className="lg:hidden mb-6">
            <ProductFilters
              mobile
              categories={categories.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                count: c._count.products,
              }))}
            />
          </div>

          {/* Products */}
          <div>
            {products.length === 0 ? (
              <div className="py-20 text-center border border-[#e7e5e0] bg-[#fafaf8]">
                <p className="font-editorial text-2xl mb-2">Nothing here yet</p>
                <p className="text-[#8a8a8a] text-sm mb-6">
                  Try adjusting your filters or browse all products
                </p>
                <Link
                  href="/products"
                  className="inline-block border border-[#0a0a0a] px-6 py-3 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#0a0a0a] hover:text-white transition-colors"
                >
                  View All
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
