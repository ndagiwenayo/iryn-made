import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      items: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">All Orders</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Orders</h1>
      </div>

      <div className="border border-[#e7e5e0] bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0] font-semibold">
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-center p-4">Items</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Payment</th>
              <th className="text-right p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[#e7e5e0] last:border-0 hover:bg-[#fafaf8]">
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs hover:underline font-semibold">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="p-4">
                  <p>{order.user.firstName} {order.user.lastName}</p>
                  <p className="text-[10px] text-[#8a8a8a]">{order.user.email}</p>
                </td>
                <td className="p-4 text-[#3a3a3a] text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">{order.items.length}</td>
                <td className="p-4 text-center capitalize text-[#3a3a3a]">{order.status}</td>
                <td className="p-4 text-center">
                  <span className={
                    order.payments[0]?.paymentStatus === "paid"
                      ? "text-green-700 text-[10px] uppercase tracking-wider font-semibold"
                      : "text-[#b8953a] text-[10px] uppercase tracking-wider font-semibold"
                  }>
                    {order.payments[0]?.paymentStatus || "N/A"}
                  </span>
                </td>
                <td className="p-4 text-right font-semibold">
                  {formatPrice(Number(order.totalAmount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center py-16 text-[#8a8a8a]">No orders yet</p>}
      </div>
    </div>
  );
}
