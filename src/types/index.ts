import type { Prisma } from "@prisma/client";

// Serialized types for client components (Decimal -> number, Date -> string)

export type SerializedProduct = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  categoryId: number;
  brandId: number | null;
  productType: string | null;
  price: number;
  salePrice: number | null;
  discountPercentage: number | null;
  isOnSale: boolean;
  rentalPrice: number | null;
  sku: string | null;
  stockQuantity: number;
  isRental: boolean;
  isCustom: boolean;
  isDesigner: boolean;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: SerializedCategory;
  brand?: SerializedBrand | null;
  images?: SerializedProductImage[];
  reviews?: SerializedReview[];
};

export type SerializedCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  _count?: { products: number };
};

export type SerializedBrand = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  isActive: boolean;
};

export type SerializedProductImage = {
  id: number;
  productId: number;
  imagePath: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type SerializedCartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  product: SerializedProduct;
};

export type SerializedOrder = {
  id: number;
  userId: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string | null;
  phone: string;
  email: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items?: SerializedOrderItem[];
  payments?: SerializedPayment[];
};

export type SerializedOrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  isRental: boolean;
  rentalStartDate: string | null;
  rentalEndDate: string | null;
  product?: SerializedProduct;
};

export type SerializedBooking = {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  idNumber: string | null;
  idVerified: boolean;
  productId: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  product?: SerializedProduct;
  payments?: SerializedPayment[];
};

export type SerializedPayment = {
  id: number;
  orderId: number | null;
  bookingId: number | null;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;
  mtnMomoNumber: string | null;
  paymentNotes: string | null;
  createdAt: string;
};

export type SerializedReview = {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  createdAt: string;
  user?: { firstName: string; lastName: string };
};

// Helper to serialize Prisma Decimal to number
export function serializeDecimal(value: Prisma.Decimal | null): number | null {
  if (value === null) return null;
  return Number(value);
}

export function serializeProduct(product: any): SerializedProduct {
  return {
    ...product,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
    rentalPrice: product.rentalPrice ? Number(product.rentalPrice) : null,
    createdAt: product.createdAt?.toISOString?.() ?? product.createdAt,
    updatedAt: product.updatedAt?.toISOString?.() ?? product.updatedAt,
    category: product.category
      ? { ...product.category, createdAt: product.category.createdAt?.toISOString?.() ?? product.category.createdAt }
      : undefined,
    brand: product.brand
      ? { ...product.brand }
      : null,
    images: product.images?.map((img: any) => ({ ...img })) ?? [],
    reviews: product.reviews?.map((r: any) => ({
      ...r,
      createdAt: r.createdAt?.toISOString?.() ?? r.createdAt,
    })) ?? [],
  };
}
