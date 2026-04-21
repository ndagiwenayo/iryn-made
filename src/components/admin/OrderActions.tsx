"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus, updatePaymentStatus } from "@/lib/actions/admin";

type Props = {
  orderId: number;
  currentStatus: string;
  paymentId?: number;
  paymentStatus?: string;
};

const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"];

export default function OrderActions({
  orderId,
  currentStatus,
  paymentId,
  paymentStatus,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOrderStatus = async (status: string) => {
    setLoading(true);
    await updateOrderStatus(orderId, status);
    setLoading(false);
    router.refresh();
  };

  const handlePaymentStatus = async (status: string) => {
    if (!paymentId) return;
    setLoading(true);
    await updatePaymentStatus(paymentId, status);
    setLoading(false);
    router.refresh();
  };

  const selectCls = "px-3 py-2 bg-white border border-[#e7e5e0] focus:outline-none focus:border-[#0a0a0a] text-sm capitalize";

  return (
    <div className="flex gap-3 items-end flex-wrap">
      <div>
        <label className="text-[10px] tracking-[0.15em] uppercase text-[#8a8a8a] block mb-1 font-semibold">
          Order Status
        </label>
        <select
          value={currentStatus}
          onChange={(e) => handleOrderStatus(e.target.value)}
          disabled={loading}
          className={selectCls}
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {paymentId && (
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-[#8a8a8a] block mb-1 font-semibold">
            Payment
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => handlePaymentStatus(e.target.value)}
            disabled={loading}
            className={selectCls}
          >
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
