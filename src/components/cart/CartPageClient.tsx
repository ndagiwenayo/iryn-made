"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { updateCartQuantity, removeFromCart } from "@/lib/actions/cart";
import Button from "@/components/ui/Button";
import type { SerializedCartItem } from "@/types";
import { useTransition } from "react";

const FREE_SHIPPING_THRESHOLD = 200000;

export default function CartPageClient({ items }: { items: SerializedCartItem[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const subtotal = items.reduce((sum, item) => {
    const price =
      item.product.isOnSale && item.product.salePrice
        ? item.product.salePrice
        : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 5000;
  const total = subtotal + shipping;
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleUpdate = (itemId: number, newQty: number) => {
    startTransition(async () => {
      await updateCartQuantity(itemId, newQty);
      router.refresh();
    });
  };

  const handleRemove = (itemId: number) => {
    startTransition(async () => {
      await removeFromCart(itemId);
      router.refresh();
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="mb-10">
          <p className="text-kicker text-[#b8953a] mb-3">Your Selection</p>
          <h1 className="font-editorial text-5xl md:text-6xl font-bold leading-[1]">
            Shopping Bag
          </h1>
          <p className="text-sm text-[#8a8a8a] mt-3">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border border-[#e7e5e0] bg-[#fafaf8] py-16 md:py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag className="w-7 h-7 text-[#8a8a8a]" strokeWidth={1.5} />
            </div>
            <h2 className="font-editorial text-3xl font-bold mb-3">
              Your bag is empty
            </h2>
            <p className="text-[#8a8a8a] mb-10 max-w-sm mx-auto">
              Let&apos;s find something beautiful for you. Start with one of our favorites.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-2xl mx-auto mb-8">
              {[
                { label: "New Arrivals", href: "/products", kicker: "Just in" },
                { label: "Bridal", href: "/products?category=bridal-clothes", kicker: "Your day" },
                { label: "Bags", href: "/products?category=bags", kicker: "Accessories" },
                { label: "On Sale", href: "/products?sale=true", kicker: "Last chance", accent: true },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`p-4 md:p-5 border text-left transition-colors ${
                    link.accent
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a] hover:bg-[#b8953a]"
                      : "bg-white border-[#e7e5e0] hover:border-[#0a0a0a]"
                  }`}
                >
                  <p
                    className={`text-[10px] tracking-[0.2em] uppercase mb-2 ${
                      link.accent ? "text-[#D4AF37]" : "text-[#b8953a]"
                    }`}
                  >
                    {link.kicker}
                  </p>
                  <p className="font-editorial text-lg font-bold">{link.label}</p>
                  <p
                    className={`text-[10px] tracking-[0.15em] uppercase mt-3 font-semibold ${
                      link.accent ? "text-white/70" : "text-[#3a3a3a]"
                    }`}
                  >
                    Shop →
                  </p>
                </Link>
              ))}
            </div>
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Browse All Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
            {/* Items */}
            <div className="divide-y divide-[#e7e5e0] border-t border-b border-[#e7e5e0]">
              {items.map((item) => {
                const price =
                  item.product.isOnSale && item.product.salePrice
                    ? item.product.salePrice
                    : item.product.price;
                return (
                  <div key={item.id} className="flex gap-4 md:gap-6 py-6">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="w-24 md:w-32 aspect-[3/4] bg-[#f5f4f0] shrink-0 overflow-hidden"
                    >
                      {item.product.images && item.product.images[0] ? (
                        <img
                          src={item.product.images[0].imagePath}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-editorial font-bold text-black/10">IM</span>
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
                          {item.product.category?.name}
                        </p>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-editorial text-lg md:text-xl font-bold leading-tight hover:text-[#b8953a] transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-[#8a8a8a] mt-2">
                          {formatPrice(price)} each
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#e7e5e0]">
                          <button
                            onClick={() => handleUpdate(item.id, item.quantity - 1)}
                            disabled={pending}
                            className="p-2 hover:bg-[#fafaf8] disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdate(item.id, item.quantity + 1)}
                            disabled={pending}
                            className="p-2 hover:bg-[#fafaf8] disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            {formatPrice(price * item.quantity)}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            disabled={pending}
                            className="text-[#8a8a8a] hover:text-[#c23232] transition-colors"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="h-fit lg:sticky lg:top-32">
              <div className="bg-[#fafaf8] p-6 md:p-8">
                <h2 className="font-editorial text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                {/* Free shipping progress */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="mb-6 pb-6 border-b border-[#e7e5e0]">
                    <p className="text-xs text-[#3a3a3a] mb-2">
                      Add <span className="font-semibold">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</span> for free shipping
                    </p>
                    <div className="w-full h-1 bg-[#e7e5e0] overflow-hidden">
                      <div
                        className="h-full bg-[#b8953a] transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#3a3a3a]">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3a3a3a]">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#e7e5e0] pt-4 flex justify-between text-lg mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-editorial text-2xl font-bold">
                    {formatPrice(total)}
                  </span>
                </div>

                <Link href="/cart/checkout" className="block">
                  <Button size="lg" className="w-full">
                    Checkout <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </Link>
                <Link
                  href="/products"
                  className="block text-center text-[11px] tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-[#0a0a0a] mt-4 font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust marks */}
              <div className="mt-6 space-y-2 text-xs text-[#8a8a8a]">
                <p>✓ Secure MTN MoMo payment</p>
                <p>✓ Free returns within 14 days</p>
                <p>✓ Free shipping over RWF 200,000</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
