"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import type { CategoryFormData } from "@/lib/validations/category";

async function requireAuth() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");
}

export async function createCategory(data: CategoryFormData) {
  await requireAuth();

  const result = await db
    .insert(categories)
    .values({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      image: data.image || null,
      displayOrder: data.displayOrder,
      isActive: data.isActive,
    })
    .returning();

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath("/");
  return result[0];
}

export async function updateCategory(id: number, data: CategoryFormData) {
  await requireAuth();

  const result = await db
    .update(categories)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      image: data.image || null,
      displayOrder: data.displayOrder,
      isActive: data.isActive,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath(`/categories/${data.slug}`);
  revalidatePath("/");
  return result[0];
}

export async function deleteCategory(id: number) {
  await requireAuth();

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath("/");
}

export async function toggleCategoryActive(id: number, isActive: boolean) {
  await requireAuth();

  await db
    .update(categories)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(categories.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath("/");
}
