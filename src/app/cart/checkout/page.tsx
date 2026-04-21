import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { serializeProduct } from "@/types";
import CheckoutForm from "@/components/cart/CheckoutForm";

export default async function CheckoutPage() {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  const [cartItems, user, settings] = await Promise.all([
    prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: { orderBy: { sortOrder: "asc" }, take: 1 },
          },
        },
      },
    }),
    prisma.user.findUnique({ where: { id: userId } }),
    getSettings(),
  ]);

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const items = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: serializeProduct(item.product),
  }));

  return (
    <CheckoutForm
      items={items}
      user={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: user?.city || "",
        postalCode: user?.postalCode || "",
      }}
      momoNumber={settings.momo_number || "+250 78X XXX XXX"}
      freeShippingThreshold={Number(settings.free_shipping_threshold) || 200000}
      standardShipping={Number(settings.standard_shipping_fee) || 5000}
    />
  );
}
