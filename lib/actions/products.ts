"use server";

import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { deleteImage } from "@/lib/cloudinary";
import type { ProductFormData } from "@/lib/validations/product";

async function requireAuth() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");
}

export async function createProduct(data: ProductFormData) {
  await requireAuth();

  const result = await db
    .insert(products)
    .values({
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      categoryId: data.categoryId || null,
      price: data.price || null,
      isFeatured: data.isFeatured,
      isPublished: data.isPublished,
      displayOrder: data.displayOrder,
    })
    .returning();

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return result[0];
}

export async function updateProduct(id: number, data: ProductFormData) {
  await requireAuth();

  const result = await db
    .update(products)
    .set({
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      categoryId: data.categoryId || null,
      price: data.price || null,
      isFeatured: data.isFeatured,
      isPublished: data.isPublished,
      displayOrder: data.displayOrder,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id))
    .returning();

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath("/");
  return result[0];
}

export async function deleteProduct(id: number) {
  await requireAuth();

  // Delete associated images from Cloudinary
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, id));

  for (const image of images) {
    try {
      await deleteImage(image.cloudinaryPublicId);
    } catch {
      // Continue even if Cloudinary delete fails
    }
  }

  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function toggleProductPublished(id: number, isPublished: boolean) {
  await requireAuth();

  await db
    .update(products)
    .set({ isPublished, updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function toggleProductFeatured(id: number, isFeatured: boolean) {
  await requireAuth();

  await db
    .update(products)
    .set({ isFeatured, updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function addProductImage(
  productId: number,
  imageData: { cloudinaryPublicId: string; url: string; altText?: string; displayOrder?: number }
) {
  await requireAuth();

  const result = await db
    .insert(productImages)
    .values({
      productId,
      cloudinaryPublicId: imageData.cloudinaryPublicId,
      url: imageData.url,
      altText: imageData.altText || null,
      displayOrder: imageData.displayOrder ?? 0,
    })
    .returning();

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return result[0];
}

export async function deleteProductImage(imageId: number) {
  await requireAuth();

  const image = await db
    .select()
    .from(productImages)
    .where(eq(productImages.id, imageId))
    .limit(1);

  if (image[0]) {
    try {
      await deleteImage(image[0].cloudinaryPublicId);
    } catch {
      // Continue even if Cloudinary delete fails
    }
    await db.delete(productImages).where(eq(productImages.id, imageId));
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateImageOrder(images: { id: number; displayOrder: number }[]) {
  await requireAuth();

  for (const img of images) {
    await db
      .update(productImages)
      .set({ displayOrder: img.displayOrder })
      .where(eq(productImages.id, img.id));
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
