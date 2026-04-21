"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

type Props = {
  categories: Category[];
  mobile?: boolean;
};

function FilterContent({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activeSort = searchParams.get("sort") || "";
  const activeSale = searchParams.get("sale") === "true";
  const activeMinPrice = searchParams.get("minPrice") || "";
  const activeMaxPrice = searchParams.get("maxPrice") || "";

  const [minPrice, setMinPrice] = useState(activeMinPrice);
  const [maxPrice, setMaxPrice] = useState(activeMaxPrice);

  useEffect(() => {
    setMinPrice(activeMinPrice);
    setMaxPrice(activeMaxPrice);
  }, [activeMinPrice, activeMaxPrice]);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/products?${params.toString()}`);
  };

  const applyPriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    router.push(`/products?${params.toString()}`);
  };

  const clearAll = () => router.push("/products");

  const hasActive =
    activeCategory || activeSort || activeSale || activeMinPrice || activeMaxPrice;

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <label className="text-ui-small text-[#0a0a0a] mb-3 block">Sort</label>
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => updateParam("sort", e.target.value || null)}
            className="w-full appearance-none bg-white border border-[#e7e5e0] px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#0a0a0a] cursor-pointer"
          >
            <option value="">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-[#e7e5e0] pt-8">
        <h3 className="text-ui-small text-[#0a0a0a] mb-4">Category</h3>
        <ul className="space-y-2.5">
          <li>
            <button
              onClick={() => updateParam("category", null)}
              className={`text-sm text-left transition-colors flex justify-between w-full ${
                !activeCategory ? "text-[#0a0a0a] font-semibold" : "text-[#3a3a3a] hover:text-[#0a0a0a]"
              }`}
            >
              <span>All</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateParam("category", cat.slug)}
                className={`text-sm text-left transition-colors flex justify-between w-full ${
                  activeCategory === cat.slug
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-[#3a3a3a] hover:text-[#0a0a0a]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[#8a8a8a]">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="border-t border-[#e7e5e0] pt-8">
        <h3 className="text-ui-small text-[#0a0a0a] mb-4">Price (RWF)</h3>
        <form onSubmit={applyPriceFilter} className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            />
            <span className="text-[#8a8a8a]">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#0a0a0a] text-white text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8953a] transition-colors"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Type */}
      <div className="border-t border-[#e7e5e0] pt-8">
        <h3 className="text-ui-small text-[#0a0a0a] mb-4">Shop by</h3>
        <label className="flex items-center gap-3 text-sm cursor-pointer group">
          <input
            type="checkbox"
            checked={activeSale}
            onChange={(e) => updateParam("sale", e.target.checked ? "true" : null)}
            className="w-4 h-4 accent-[#0a0a0a]"
          />
          <span className={activeSale ? "text-[#c23232] font-semibold" : "text-[#3a3a3a] group-hover:text-[#0a0a0a]"}>
            On sale
          </span>
        </label>
      </div>

      {hasActive && (
        <div className="border-t border-[#e7e5e0] pt-6">
          <button
            onClick={clearAll}
            className="text-xs text-[#c23232] hover:underline tracking-wider uppercase"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductFilters({ categories, mobile }: Props) {
  const [open, setOpen] = useState(false);

  if (!mobile) return <FilterContent categories={categories} />;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 border border-[#0a0a0a] px-4 py-3 text-sm tracking-[0.15em] uppercase font-semibold"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filter & Sort
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-[90%] max-w-sm bg-white overflow-y-auto animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#e7e5e0] px-5 py-4 flex items-center justify-between">
              <h2 className="font-editorial text-xl font-bold">Filters</h2>
              <button onClick={() => setOpen(false)} className="p-2 -mr-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-6">
              <FilterContent categories={categories} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
