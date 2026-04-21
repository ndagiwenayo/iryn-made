import prisma from "@/lib/prisma";
import { serializeProduct } from "@/types";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import EditorialSection from "@/components/home/EditorialSection";
import EditsSection from "@/components/home/EditsSection";
import Newsletter from "@/components/home/Newsletter";
import Lookbook from "@/components/home/Lookbook";
import ProductCard from "@/components/ui/ProductCard";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true, isActive: true },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
    return products.map(serializeProduct);
  } catch (e) {
    console.error("Failed to load featured products", e);
    return [];
  }
}

async function getNewArrivals() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    return products.map(serializeProduct);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [featured, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
  ]);

  return (
    <>
      <HeroSection />
      <ServicePromises />
      <CategoryGrid />
      <EditsSection />
      {featured.length > 0 && (
        <FeaturedProducts
          products={featured}
          title="Trending Now"
          kicker="Curated Selection"
        />
      )}
      <EditorialSection />
      <Lookbook />
      {newArrivals.length > 0 && (
        <section className="py-20 md:py-28 px-4 lg:px-8 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
              <div>
                <p className="text-kicker text-[#b8953a] mb-3">Just In</p>
                <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
                  New Arrivals
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <Newsletter />
    </>
  );
}
