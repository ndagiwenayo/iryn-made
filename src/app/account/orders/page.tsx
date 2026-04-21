import Link from "next/link";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { formatPrice } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default async function AccountOrdersPage() {
  const session = await requireAuth();

  const orders = await prisma.order.findMany({
    where: { userId: Number(session.user.id) },
    include: {
      items: { include: { product: true } },
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="font-editorial text-3xl font-bold mb-3">My Orders</h2>
      <p className="text-[#8a8a8a] mb-8">
        View and track your purchase history
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16 border border-[#e7e5e0] bg-[#fafaf8]">
          <p className="text-[#3a3a3a] mb-6">You have no orders yet</p>
          <Link
            href="/products"
            className="text-[#0a0a0a] font-semibold text-sm tracking-[0.15em] uppercase link-underline"
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-[#e7e5e0] bg-white p-6">
              <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
                    Order Number
                  </p>
                  <p className="font-mono font-semibold">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
                    Date
                  </p>
                  <p className="text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase border ${
                      statusStyles[order.status] || "bg-[#fafaf8] text-[#3a3a3a] border-[#e7e5e0]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-1">
                    Total
                  </p>
                  <p className="font-semibold text-[#b8953a]">
                    {formatPrice(Number(order.totalAmount))}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#e7e5e0] pt-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a] mb-2">
                  Items ({order.items.length})
                </p>
                <ul className="text-sm space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-[#3a3a3a]">
                      {item.quantity} × {item.product.name}
                    </li>
                  ))}
                </ul>
              </div>
              {order.payments[0] && (
                <div className="border-t border-[#e7e5e0] mt-4 pt-4 text-sm">
                  <span className="text-[#8a8a8a] text-[10px] uppercase tracking-wider">
                    Payment:{" "}
                  </span>
                  <span
                    className={
                      order.payments[0].paymentStatus === "paid"
                        ? "text-green-700 font-medium"
                        : "text-yellow-700 font-medium"
                    }
                  >
                    {order.payments[0].paymentStatus}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
