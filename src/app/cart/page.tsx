import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { serializeProduct } from "@/types";
import CartPageClient from "@/components/cart/CartPageClient";

export default async function CartPage() {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          category: true,
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = cartItems.map((item) => ({
    id: item.id,
    userId: item.userId,
    productId: item.productId,
    quantity: item.quantity,
    createdAt: item.createdAt.toISOString(),
    product: serializeProduct(item.product),
  }));

  return <CartPageClient items={items} />;
}
