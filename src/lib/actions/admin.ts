"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type ProductFormData = {
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  categoryId: number;
  brandId?: number | null;
  productType?: string;
  price: number;
  salePrice?: number | null;
  isOnSale: boolean;
  discountPercentage?: number | null;
  rentalPrice?: number | null;
  sku?: string;
  stockQuantity: number;
  isRental: boolean;
  isCustom: boolean;
  isDesigner: boolean;
  isActive: boolean;
  featured: boolean;
  imagePath?: string;
};

export async function createProduct(data: ProductFormData) {
  await requireAdmin();

  try {
    const slug = data.slug || slugify(data.name);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        shortDescription: data.shortDescription || null,
        categoryId: data.categoryId,
        brandId: data.brandId || null,
        productType: data.productType || null,
        price: data.price,
        salePrice: data.salePrice || null,
        isOnSale: data.isOnSale,
        discountPercentage: data.discountPercentage || null,
        rentalPrice: data.rentalPrice || null,
        sku: data.sku || null,
        stockQuantity: data.stockQuantity,
        isRental: data.isRental,
        isCustom: data.isCustom,
        isDesigner: data.isDesigner,
        isActive: data.isActive,
        featured: data.featured,
      },
    });

    if (data.imagePath) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imagePath: data.imagePath,
          altText: data.name,
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, productId: product.id };
  } catch (e) {
    console.error("Create product error", e);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: number, data: ProductFormData) {
  await requireAdmin();

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description || null,
        shortDescription: data.shortDescription || null,
        categoryId: data.categoryId,
        brandId: data.brandId || null,
        productType: data.productType || null,
        price: data.price,
        salePrice: data.salePrice || null,
        isOnSale: data.isOnSale,
        discountPercentage: data.discountPercentage || null,
        rentalPrice: data.rentalPrice || null,
        sku: data.sku || null,
        stockQuantity: data.stockQuantity,
        isRental: data.isRental,
        isCustom: data.isCustom,
        isDesigner: data.isDesigner,
        isActive: data.isActive,
        featured: data.featured,
      },
    });

    if (data.imagePath) {
      const existing = await prisma.productImage.findFirst({
        where: { productId: id, isPrimary: true },
      });
      if (existing) {
        await prisma.productImage.update({
          where: { id: existing.id },
          data: { imagePath: data.imagePath },
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: id,
            imagePath: data.imagePath,
            altText: data.name,
            isPrimary: true,
            sortOrder: 0,
          },
        });
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true };
  } catch (e) {
    console.error("Update product error", e);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: number) {
  await requireAdmin();

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (e) {
    console.error("Delete product error", e);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  await requireAdmin();

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update order" };
  }
}

export async function updatePaymentStatus(paymentId: number, status: string) {
  await requireAdmin();

  try {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { paymentStatus: status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update payment" };
  }
}

export async function updateUserStatus(
  userId: number,
  updates: { isActive?: boolean; role?: string }
) {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: updates,
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to update user" };
  }
}

export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
}) {
  await requireAdmin();

  try {
    await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description || null,
      },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (e) {
    return { success: false, error: "Failed to create category" };
  }
}
