"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/lib/actions/orders";
import type { SerializedProduct } from "@/types";

type CartItem = {
  id: number;
  quantity: number;
  product: SerializedProduct;
};

type Props = {
  items: CartItem[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  momoNumber: string;
  freeShippingThreshold: number;
  standardShipping: number;
};

export default function CheckoutForm({ items, user, momoNumber, freeShippingThreshold, standardShipping }: Props) {
  const FREE_SHIPPING_THRESHOLD = freeShippingThreshold;
  const MOMO_NUMBER = momoNumber;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city || "Kigali",
    postalCode: user.postalCode,
    mtnMomoNumber: user.phone,
    transactionId: "",
    notes: "",
  });

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.isOnSale && item.product.salePrice
      ? item.product.salePrice
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : standardShipping;
  const total = subtotal + shipping;

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const shippingAddress = `${form.firstName} ${form.lastName}\n${form.address}\n${form.city}${form.postalCode ? `, ${form.postalCode}` : ""}`;

    const result = await createOrder({
      shippingAddress,
      phone: form.phone,
      email: form.email,
      notes: form.notes,
      mtnMomoNumber: form.mtnMomoNumber,
      transactionId: form.transactionId,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to place order");
      return;
    }

    router.push(`/cart/checkout/confirmation?order=${result.orderNumber}`);
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 md:py-16">
        <Link
          href="/cart"
          className="text-xs tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-[#0a0a0a] mb-6 inline-flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Bag
        </Link>
        <div className="mb-10">
          <p className="text-kicker text-[#b8953a] mb-3">Checkout</p>
          <h1 className="font-editorial text-5xl md:text-6xl font-bold leading-[1]">
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">
          <div className="space-y-10">
            {/* Shipping */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-xs font-bold">1</span>
                <h2 className="font-editorial text-2xl font-bold">Shipping Details</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="First Name" value={form.firstName} onChange={handleChange("firstName")} required />
                  <Input label="Last Name" value={form.lastName} onChange={handleChange("lastName")} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
                  <Input label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} required placeholder="+250 78X XXX XXX" />
                </div>
                <Input label="Address" value={form.address} onChange={handleChange("address")} required placeholder="Street, building, apartment" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City" value={form.city} onChange={handleChange("city")} required />
                  <Input label="Postal Code" value={form.postalCode} onChange={handleChange("postalCode")} />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-xs font-bold">2</span>
                <h2 className="font-editorial text-2xl font-bold">Payment</h2>
              </div>
              <div className="bg-[#fafaf8] border-l-2 border-[#b8953a] p-5 mb-4">
                <p className="text-kicker text-[#b8953a] mb-3">MTN Mobile Money</p>
                <ol className="text-sm text-[#3a3a3a] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Send <span className="font-semibold text-[#0a0a0a]">{formatPrice(total)}</span> to{" "}
                    <span className="font-mono font-semibold text-[#0a0a0a]">{MOMO_NUMBER}</span>
                  </li>
                  <li>Enter your details below from the confirmation SMS</li>
                  <li>We verify and confirm your order within 24 hours</li>
                </ol>
              </div>
              <div className="space-y-4">
                <Input label="Your MoMo Number" type="tel" value={form.mtnMomoNumber} onChange={handleChange("mtnMomoNumber")} required />
                <Input label="Transaction ID (optional)" value={form.transactionId} onChange={handleChange("transactionId")} placeholder="From MTN SMS" />
              </div>
            </section>

            {/* Notes */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-xs font-bold">3</span>
                <h2 className="font-editorial text-2xl font-bold">Notes <span className="text-sm font-normal text-[#8a8a8a]">(optional)</span></h2>
              </div>
              <textarea
                value={form.notes}
                onChange={handleChange("notes")}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-[#e7e5e0] text-sm focus:outline-none focus:border-[#0a0a0a]"
                placeholder="Delivery instructions, special requests..."
              />
            </section>
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-32">
            <div className="bg-[#fafaf8] p-6 md:p-8">
              <h2 className="font-editorial text-2xl font-bold mb-6">Your Order</h2>
              <div className="space-y-4 max-h-72 overflow-y-auto mb-6">
                {items.map((item) => {
                  const price = item.product.isOnSale && item.product.salePrice
                    ? item.product.salePrice
                    : item.product.price;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-20 bg-white shrink-0 overflow-hidden">
                        {item.product.images?.[0] ? (
                          <img src={item.product.images[0].imagePath} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#f5f4f0]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1 font-medium">{item.product.name}</p>
                        <p className="text-xs text-[#8a8a8a]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(price * item.quantity)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#e7e5e0] pt-4 space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#3a3a3a]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3a3a3a]">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="border-t border-[#e7e5e0] pt-4 flex justify-between items-baseline mb-6">
                <span className="font-semibold">Total</span>
                <span className="font-editorial text-2xl font-bold">{formatPrice(total)}</span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 mb-4">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
              <p className="text-[11px] text-[#8a8a8a] text-center mt-4">
                By placing your order, you agree to our terms of service
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
