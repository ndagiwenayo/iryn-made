import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_IMAGES } from "@/lib/instagram";

const categories = [
  {
    name: "Women",
    slug: "women",
    tagline: "Everyday elegance",
    image: CATEGORY_IMAGES.women,
  },
  {
    name: "Bridal",
    slug: "bridal-clothes",
    tagline: "Your moment",
    image: CATEGORY_IMAGES["bridal-clothes"],
    featured: true,
  },
  {
    name: "Men",
    slug: "men",
    tagline: "Tailored sharp",
    image: CATEGORY_IMAGES.men,
  },
  {
    name: "Bags",
    slug: "bags",
    tagline: "Signature pieces",
    image: CATEGORY_IMAGES.bags,
  },
  {
    name: "Kids",
    slug: "kids",
    tagline: "Little looks",
    image: CATEGORY_IMAGES.kids,
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
          <div>
            <p className="text-kicker text-[#b8953a] mb-3">The Collections</p>
            <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
              Shop by <em className="italic">Category</em>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm tracking-[0.15em] uppercase font-semibold link-underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group relative overflow-hidden bg-[#0a0a0a] ${
                cat.featured
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:row-span-2 md:col-span-2"
                  : "aspect-[3/4]"
              }`}
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between text-white">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-1 md:mb-2">
                    {cat.tagline}
                  </p>
                  <h3
                    className={`font-editorial font-bold leading-none ${
                      cat.featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-3 md:mt-4 text-xs tracking-[0.15em] uppercase font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                    Shop Now <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
