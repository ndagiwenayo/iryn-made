"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Minus, Plus, Truck, Package, RefreshCw, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { addToCart } from "@/lib/actions/cart";
import type { SerializedProduct } from "@/types";

type Props = {
  product: SerializedProduct;
  isLoggedIn: boolean;
};

export default function ProductInfo({ product, isLoggedIn }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const hasDiscount = product.isOnSale && product.salePrice;
  const displayPrice = hasDiscount ? product.salePrice! : product.price;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=/products/${product.slug}`);
      return;
    }
    setLoading(true);
    setMessage(null);
    const result = await addToCart(product.id, quantity);
    setLoading(false);
    if (result.success) {
      setMessage({ text: "Added to your bag", type: "success" });
      router.refresh();
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ text: result.error || "Failed to add", type: "error" });
    }
  };

  return (
    <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
      {/* Brand + Name */}
      <div>
        <p className="text-kicker text-[#b8953a] mb-2">
          {product.brand?.name || product.category?.name}
        </p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1.05] mb-3">
          {product.name}
        </h1>
        {product.shortDescription && (
          <p className="text-[#3a3a3a] leading-relaxed">
            {product.shortDescription}
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isDesigner && (
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 bg-[#0a0a0a] text-white">
            Designer
          </span>
        )}
        {product.isCustom && (
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 border border-[#0a0a0a]">
            Custom Made
          </span>
        )}
      </div>

      {/* Price */}
      <div className="py-4 border-y border-[#e7e5e0]">
        <div className="flex items-baseline gap-3">
          <p className="font-editorial text-4xl font-bold">
            {formatPrice(displayPrice)}
          </p>
          {hasDiscount && (
            <>
              <p className="text-lg text-[#8a8a8a] line-through">
                {formatPrice(product.price)}
              </p>
              <span className="text-xs bg-[#c23232] text-white px-2 py-0.5 font-bold">
                -{Math.round((1 - product.salePrice! / product.price) * 100)}%
              </span>
            </>
          )}
        </div>
        {hasDiscount && (
          <p className="text-xs text-[#c23232] mt-1">
            You save {formatPrice(product.price - product.salePrice!)}
          </p>
        )}
      </div>

      {/* Stock */}
      <div className="text-xs">
        {product.stockQuantity > 10 ? (
          <span className="text-green-700">In Stock</span>
        ) : product.stockQuantity > 0 ? (
          <span className="text-[#b8953a]">Only {product.stockQuantity} left</span>
        ) : (
          <span className="text-[#c23232]">Out of Stock</span>
        )}
      </div>

      {/* Quantity + CTA */}
      {product.stockQuantity > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#8a8a8a]">Qty</span>
            <div className="flex items-center border border-[#e7e5e0]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-[#fafaf8]"
                aria-label="Decrease"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                className="p-2.5 hover:bg-[#fafaf8]"
                aria-label="Increase"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0a0a0a] text-white py-4 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8953a] transition-colors disabled:opacity-60"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              {loading ? "Adding..." : "Add to Bag"}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-14 flex items-center justify-center border border-[#0a0a0a] transition-colors ${
                wishlisted ? "bg-[#0a0a0a] text-white" : "hover:bg-[#fafaf8]"
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>
          {message && (
            <div
              className={`text-sm p-3 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      )}

      {/* Perks */}
      <div className="border-t border-[#e7e5e0] pt-6 space-y-3">
        {[
          { icon: Truck, text: "Free shipping on orders over RWF 200,000" },
          { icon: Package, text: "Handcrafted in Kigali" },
          { icon: RefreshCw, text: "Easy returns within 14 days" },
          { icon: Shield, text: "Authenticity guaranteed" },
        ].map((perk, i) => {
          const Icon = perk.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-xs text-[#3a3a3a]">
              <Icon className="w-4 h-4 text-[#b8953a] shrink-0" strokeWidth={1.5} />
              <span>{perk.text}</span>
            </div>
          );
        })}
      </div>

      {/* SKU */}
      {product.sku && (
        <p className="text-[10px] text-[#8a8a8a] tracking-wider uppercase">
          SKU: {product.sku}
        </p>
      )}
    </div>
  );
}
