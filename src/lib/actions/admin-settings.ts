"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { invalidateSettingsCache } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

// ========== Settings ==========
export async function updateSettings(settings: Record<string, string>) {
  await requireAdmin();
  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.update({
        where: { key },
        data: { value },
      });
    }
    invalidateSettingsCache();
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to update settings" };
  }
}

// ========== Categories ==========
export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}) {
  await requireAdmin();
  try {
    const slug = data.slug || slugify(data.name);
    await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to create" };
  }
}

export async function updateCategory(
  id: number,
  data: { name: string; slug?: string; description?: string; image?: string; isActive: boolean }
) {
  await requireAdmin();
  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description || null,
        image: data.image || null,
        isActive: data.isActive,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to update" };
  }
}

export async function deleteCategory(id: number) {
  await requireAdmin();
  try {
    const count = await prisma.product.count({ where: { categoryId: id } });
    if (count > 0) {
      return { success: false, error: `Cannot delete — ${count} products use this category` };
    }
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to delete" };
  }
}

// ========== Brands ==========
export async function createBrand(data: {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
}) {
  await requireAdmin();
  try {
    const slug = data.slug || slugify(data.name);
    await prisma.brand.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        logo: data.logo || null,
        website: data.website || null,
      },
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to create" };
  }
}

export async function updateBrand(
  id: number,
  data: { name: string; slug?: string; description?: string; logo?: string; website?: string; isActive: boolean }
) {
  await requireAdmin();
  try {
    await prisma.brand.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description || null,
        logo: data.logo || null,
        website: data.website || null,
        isActive: data.isActive,
      },
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to update" };
  }
}

export async function deleteBrand(id: number) {
  await requireAdmin();
  try {
    await prisma.brand.delete({ where: { id } });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to delete" };
  }
}

// ========== Banners ==========
export async function createBanner(data: {
  title: string;
  subtitle?: string;
  imagePath: string;
  linkUrl?: string;
  buttonText?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  try {
    await prisma.banner.create({
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        imagePath: data.imagePath,
        linkUrl: data.linkUrl || null,
        buttonText: data.buttonText || null,
        sortOrder: data.sortOrder || 0,
      },
    });
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to create" };
  }
}

export async function updateBanner(
  id: number,
  data: {
    title: string;
    subtitle?: string;
    imagePath: string;
    linkUrl?: string;
    buttonText?: string;
    sortOrder?: number;
    isActive: boolean;
  }
) {
  await requireAdmin();
  try {
    await prisma.banner.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        imagePath: data.imagePath,
        linkUrl: data.linkUrl || null,
        buttonText: data.buttonText || null,
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive,
      },
    });
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to update" };
  }
}

export async function deleteBanner(id: number) {
  await requireAdmin();
  try {
    await prisma.banner.delete({ where: { id } });
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to delete" };
  }
}

// ========== Product Images ==========
export async function addProductImage(productId: number, imagePath: string, altText?: string) {
  await requireAdmin();
  try {
    const count = await prisma.productImage.count({ where: { productId } });
    await prisma.productImage.create({
      data: {
        productId,
        imagePath,
        altText: altText || null,
        isPrimary: count === 0,
        sortOrder: count,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to add image" };
  }
}

export async function deleteProductImage(imageId: number) {
  await requireAdmin();
  try {
    const img = await prisma.productImage.findUnique({ where: { id: imageId } });
    if (!img) return { success: false, error: "Not found" };
    await prisma.productImage.delete({ where: { id: imageId } });

    if (img.isPrimary) {
      const next = await prisma.productImage.findFirst({
        where: { productId: img.productId },
        orderBy: { sortOrder: "asc" },
      });
      if (next) {
        await prisma.productImage.update({
          where: { id: next.id },
          data: { isPrimary: true },
        });
      }
    }
    revalidatePath(`/admin/products/${img.productId}/edit`);
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to delete" };
  }
}

export async function setPrimaryProductImage(imageId: number) {
  await requireAdmin();
  try {
    const img = await prisma.productImage.findUnique({ where: { id: imageId } });
    if (!img) return { success: false, error: "Not found" };
    await prisma.productImage.updateMany({
      where: { productId: img.productId },
      data: { isPrimary: false },
    });
    await prisma.productImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    });
    revalidatePath(`/admin/products/${img.productId}/edit`);
    revalidatePath("/products");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed" };
  }
}

// ========== Reviews ==========
export async function approveReview(reviewId: number) {
  await requireAdmin();
  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: { isApproved: true },
    });
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed" };
  }
}

export async function deleteReview(reviewId: number) {
  await requireAdmin();
  try {
    await prisma.review.delete({ where: { id: reviewId } });
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed" };
  }
}
