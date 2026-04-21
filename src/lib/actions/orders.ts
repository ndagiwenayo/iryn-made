"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { generateOrderNumber } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  shippingAddress: string;
  billingAddress?: string;
  phone: string;
  email: string;
  notes?: string;
  mtnMomoNumber: string;
  transactionId?: string;
}) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.product.isOnSale && item.product.salePrice
        ? Number(item.product.salePrice)
        : Number(item.product.price);
      return sum + price * item.quantity;
    }, 0);

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: "pending",
        totalAmount,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress || null,
        phone: data.phone,
        email: data.email,
        notes: data.notes || null,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price:
              item.product.isOnSale && item.product.salePrice
                ? item.product.salePrice
                : item.product.price,
          })),
        },
        payments: {
          create: {
            amount: totalAmount,
            paymentMethod: "mtn_momo",
            paymentStatus: "pending",
            mtnMomoNumber: data.mtnMomoNumber,
            transactionId: data.transactionId || null,
          },
        },
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    // Decrement stock
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }

    revalidatePath("/cart");
    revalidatePath("/account/orders");

    return { success: true, orderNumber: order.orderNumber };
  } catch (e) {
    console.error("Create order error", e);
    return { success: false, error: "Failed to place order" };
  }
}
