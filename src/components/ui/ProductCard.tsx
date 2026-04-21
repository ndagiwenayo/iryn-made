"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { SerializedProduct } from "@/types";

type Props = {
  product: SerializedProduct;
  priority?: boolean;
};

function ProductImagePlaceholder({ name }: { name: string }) {
  // Generate a consistent gradient from the product name
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hues = [
    "from-[#f5f4f0] to-[#e7e5e0]",
    "from-[#f0ebe1] to-[#e0d6c0]",
    "from-[#f5ede5] to-[#e6d5c3]",
    "from-[#efeae5] to-[#d8cfc4]",
    "from-[#f6f1ea] to-[#e5ddd0]",
  ];
  const gradient = hues[hash % hues.length];

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="font-editorial text-7xl font-bold text-black/10">IM</span>
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const hasDiscount = product.isOnSale && product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;
  const createdDate = new Date(product.createdAt);
  const daysSinceCreated = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
  const isNew = daysSinceCreated <= 30;

  const primaryImg = product.images?.[0];
  const secondaryImg = product.images?.[1] || primaryImg;

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f4f0] mb-3">
          {primaryImg ? (
            <img
              src={primaryImg.imagePath}
              alt={primaryImg.altText || product.name}
              className="card-image-primary absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <ProductImagePlaceholder name={product.name} />
          )}
          {secondaryImg && secondaryImg !== primaryImg && (
            <img
              src={secondaryImg.imagePath}
              alt={secondaryImg.altText || product.name}
              className="card-image-secondary absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isNew && !hasDiscount && (
              <span className="bg-[#b8953a] text-white text-[10px] font-bold px-2 py-1 tracking-wider">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="bg-[#c23232] text-white text-[10px] font-bold px-2 py-1 tracking-wider">
                -{discountPercent}%
              </span>
            )}
            {product.isDesigner && (
              <span className="bg-white text-[#0a0a0a] text-[10px] font-bold px-2 py-1 tracking-wider border border-[#0a0a0a]">
                DESIGNER
              </span>
            )}
            {product.stockQuantity > 0 && product.stockQuantity <= 3 && (
              <span className="bg-[#0a0a0a] text-white text-[10px] font-bold px-2 py-1 tracking-wider">
                LAST CHANCE
              </span>
            )}
            {product.stockQuantity === 0 && (
              <span className="bg-white/90 text-[#0a0a0a] text-[10px] font-bold px-2 py-1 tracking-wider">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white hover:bg-[#0a0a0a] hover:text-white flex items-center justify-center transition-colors rounded-full shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart
              className="w-4 h-4"
              strokeWidth={1.5}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>

          {/* Quick shop - slides up on hover */}
          {product.stockQuantity > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/products/${product.slug}`;
              }}
              className="w-full py-3 text-[11px] tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-[#0a0a0a] hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              Quick Shop
            </button>
          </div>
          )}
        </div>
      </Link>

      {/* Info below image */}
      <Link href={`/products/${product.slug}`} className="block">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
          {product.brand?.name || product.category?.name}
        </p>
        <h3 className="text-sm text-[#0a0a0a] mb-1 line-clamp-1 group-hover:underline underline-offset-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-[#c23232]">
                {formatPrice(product.salePrice!)}
              </span>
              <span className="text-xs text-[#8a8a8a] line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
