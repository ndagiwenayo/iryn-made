"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number, quantity: number = 1) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return { success: false, error: "Product not found" };
    if (product.isRental) {
      return {
        success: false,
        error: "This is a rental item. Please use the booking flow.",
      };
    }
    if (product.stockQuantity < quantity) {
      return { success: false, error: "Not enough stock" };
    }

    await prisma.cartItem.upsert({
      where: {
        unique_cart_item: { userId, productId },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    revalidatePath("/cart");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error("Add to cart error", e);
    return { success: false, error: "Failed to add to cart" };
  }
}

export async function updateCartQuantity(cartItemId: number, quantity: number) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  if (quantity < 1) {
    return removeFromCart(cartItemId);
  }

  try {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item || item.userId !== userId) {
      return { success: false, error: "Not authorized" };
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    revalidatePath("/cart");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error("Update cart error", e);
    return { success: false, error: "Failed to update cart" };
  }
}

export async function removeFromCart(cartItemId: number) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  try {
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item || item.userId !== userId) {
      return { success: false, error: "Not authorized" };
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    revalidatePath("/cart");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error("Remove from cart error", e);
    return { success: false, error: "Failed to remove item" };
  }
}
