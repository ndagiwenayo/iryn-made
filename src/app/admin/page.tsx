import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, Users, Package, DollarSign, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [
    orderCount,
    pendingOrderCount,
    productCount,
    userCount,
    pendingReviews,
    recentOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: "customer" } }),
    prisma.review.count({ where: { isApproved: false } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { firstName: true, lastName: true } } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { paymentStatus: "paid" },
    }),
  ]);

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(Number(totalRevenue._sum.amount || 0)),
      icon: DollarSign,
      highlight: true,
    },
    {
      label: "Orders",
      value: orderCount,
      sub: `${pendingOrderCount} pending`,
      icon: ShoppingBag,
    },
    {
      label: "Products",
      value: productCount,
      icon: Package,
    },
    {
      label: "Customers",
      value: userCount,
      icon: Users,
    },
    {
      label: "Pending Reviews",
      value: pendingReviews,
      icon: MessageSquare,
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Overview</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-6 border ${
                stat.highlight
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                  : "bg-white border-[#e7e5e0]"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <p className={`text-kicker ${stat.highlight ? "text-[#b8953a]" : "text-[#8a8a8a]"}`}>
                  {stat.label}
                </p>
                <Icon className={`w-5 h-5 ${stat.highlight ? "text-[#b8953a]" : "text-[#0a0a0a]"}`} strokeWidth={1.5} />
              </div>
              <p className="font-editorial text-3xl md:text-4xl font-bold">
                {stat.value}
              </p>
              {stat.sub && (
                <p className={`text-xs mt-2 ${stat.highlight ? "text-white/60" : "text-[#8a8a8a]"}`}>
                  {stat.sub}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="border border-[#e7e5e0] bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-editorial text-2xl font-bold">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-[#0a0a0a] font-semibold link-underline"
          >
            View All →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-[#8a8a8a] text-sm text-center py-8">No orders yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0]">
                <th className="text-left pb-3 font-semibold">Order</th>
                <th className="text-left pb-3 font-semibold">Customer</th>
                <th className="text-left pb-3 font-semibold">Status</th>
                <th className="text-right pb-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#e7e5e0] last:border-0">
                  <td className="py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-mono text-xs hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3">
                    {order.user.firstName} {order.user.lastName}
                  </td>
                  <td className="py-3 capitalize text-[#3a3a3a]">
                    {order.status}
                  </td>
                  <td className="py-3 text-right font-semibold">
                    {formatPrice(Number(order.totalAmount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
