import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getCategories() {
  try {
    return await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder), asc(categories.name));
  } catch (error) {
    console.error("Failed to get categories:", error);
    return [];
  }
}

export async function getActiveCategories() {
  try {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.displayOrder), asc(categories.name));
  } catch (error) {
    console.error("Failed to get active categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error(`Failed to get category by slug: ${slug}`, error);
    return null;
  }
}

export async function getCategoryById(id: number) {
  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error(`Failed to get category by id: ${id}`, error);
    return null;
  }
}

export async function getCategoryCount() {
  try {
    const result = await db.select().from(categories);
    return result.length;
  } catch (error) {
    console.error("Failed to get category count:", error);
    return 0;
  }
}
