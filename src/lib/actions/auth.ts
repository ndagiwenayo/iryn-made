"use server";

import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
}) {
  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existing) {
      return {
        success: false,
        error: existing.email === data.email ? "Email already in use" : "Username taken",
      };
    }

    const passwordHash = await hash(data.password, 12);

    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        passwordHash,
        phone: data.phone || null,
        role: "customer",
      },
    });

    return { success: true };
  } catch (e) {
    console.error("Registration error", e);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}) {
  const session = await requireAuth();

  try {
    await prisma.user.update({
      where: { id: Number(session.user.id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        postalCode: data.postalCode || null,
      },
    });

    revalidatePath("/account");
    return { success: true };
  } catch (e) {
    console.error("Profile update error", e);
    return { success: false, error: "Failed to update profile" };
  }
}
