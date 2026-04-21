"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push("/products");
      return;
    }
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative ${mobile ? "w-full" : "hidden md:block w-full max-w-md"}`}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8a] pointer-events-none" strokeWidth={1.5} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, categories..."
        className="w-full pl-10 pr-4 py-2.5 bg-[#f5f4f0] border border-transparent text-sm focus:outline-none focus:border-[#0a0a0a] focus:bg-white transition-colors placeholder:text-[#8a8a8a]"
      />
    </form>
  );
}
