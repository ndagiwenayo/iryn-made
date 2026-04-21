import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SerializedProduct } from "@/types";
import ProductCard from "@/components/ui/ProductCard";

type Props = {
  products: SerializedProduct[];
  title?: string;
  kicker?: string;
  link?: string;
};

export default function FeaturedProducts({
  products,
  title = "Trending Now",
  kicker = "Curated Selection",
  link = "/products",
}: Props) {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-[#fafaf8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
          <div>
            <p className="text-kicker text-[#b8953a] mb-3">{kicker}</p>
            <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
              {title}
            </h2>
          </div>
          <Link
            href={link}
            className="group inline-flex items-center gap-1 text-sm tracking-[0.15em] uppercase font-semibold link-underline"
          >
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
