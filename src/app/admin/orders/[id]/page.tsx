import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import OrderActions from "@/components/admin/OrderActions";

type Params = Promise<{ id: string }>;

export default async function AdminOrderDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      items: { include: { product: true } },
      payments: true,
    },
  });

  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-xs tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-[#0a0a0a] mb-6 inline-block font-semibold"
      >
        ← Back to Orders
      </Link>
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Order Details</p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1] mb-2">
            {order.orderNumber}
          </h1>
          <p className="text-sm text-[#8a8a8a]">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <OrderActions
          orderId={order.id}
          currentStatus={order.status}
          paymentId={order.payments[0]?.id}
          paymentStatus={order.payments[0]?.paymentStatus}
        />
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <section className="border border-[#e7e5e0] bg-white p-6">
            <h2 className="font-editorial text-xl font-bold mb-5">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-4 border-b border-[#e7e5e0] last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-[#8a8a8a]">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(Number(item.price) * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="pt-4 border-t border-[#e7e5e0] flex justify-between items-baseline">
                <span className="font-semibold">Total</span>
                <span className="font-editorial text-2xl font-bold">
                  {formatPrice(Number(order.totalAmount))}
                </span>
              </div>
            </div>
          </section>

          {order.payments[0] && (
            <section className="border border-[#e7e5e0] bg-white p-6">
              <h2 className="font-editorial text-xl font-bold mb-5">Payment</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#8a8a8a]">Method</dt>
                  <dd className="uppercase">{order.payments[0].paymentMethod}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#8a8a8a]">Status</dt>
                  <dd className="capitalize">{order.payments[0].paymentStatus}</dd>
                </div>
                {order.payments[0].mtnMomoNumber && (
                  <div className="flex justify-between">
                    <dt className="text-[#8a8a8a]">MoMo Number</dt>
                    <dd className="font-mono">{order.payments[0].mtnMomoNumber}</dd>
                  </div>
                )}
                {order.payments[0].transactionId && (
                  <div className="flex justify-between">
                    <dt className="text-[#8a8a8a]">Transaction ID</dt>
                    <dd className="font-mono">{order.payments[0].transactionId}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="border border-[#e7e5e0] bg-white p-6">
            <h3 className="text-ui-small text-[#0a0a0a] mb-3">Customer</h3>
            <p>{order.user.firstName} {order.user.lastName}</p>
            <p className="text-sm text-[#3a3a3a]">{order.email}</p>
            <p className="text-sm text-[#3a3a3a]">{order.phone}</p>
          </section>

          <section className="border border-[#e7e5e0] bg-white p-6">
            <h3 className="text-ui-small text-[#0a0a0a] mb-3">Shipping Address</h3>
            <p className="text-sm whitespace-pre-line text-[#3a3a3a]">
              {order.shippingAddress}
            </p>
          </section>

          {order.notes && (
            <section className="border border-[#e7e5e0] bg-white p-6">
              <h3 className="text-ui-small text-[#0a0a0a] mb-3">Notes</h3>
              <p className="text-sm text-[#3a3a3a] whitespace-pre-line">{order.notes}</p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
