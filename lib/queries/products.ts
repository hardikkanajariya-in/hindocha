import { db } from "@/lib/db";
import { products, productImages, categories } from "@/lib/db/schema";
import { eq, and, asc, desc, ilike, sql, count } from "drizzle-orm";
import type { ProductWithImages } from "@/lib/db/schema";

const ITEMS_PER_PAGE = 12;

export interface ProductsQueryParams {
  page?: number;
  search?: string;
  categorySlug?: string;
  sort?: "newest" | "oldest" | "name-asc" | "name-desc" | "price-asc" | "price-desc";
  limit?: number;
  publishedOnly?: boolean;
}

export async function getProducts(params: ProductsQueryParams = {}) {
  const {
    page = 1,
    search,
    categorySlug,
    sort = "newest",
    limit = ITEMS_PER_PAGE,
    publishedOnly = true,
  } = params;

  const offset = (page - 1) * limit;

  const conditions = [];
  if (publishedOnly) {
    conditions.push(eq(products.isPublished, true));
  }
  if (search) {
    conditions.push(ilike(products.name, `%${search}%`));
  }

  try {
    let categoryId: number | undefined;
    if (categorySlug) {
      const cat = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, categorySlug))
        .limit(1);
      if (cat[0]) {
        categoryId = cat[0].id;
        conditions.push(eq(products.categoryId, categoryId));
      }
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const sortMap = {
      "newest": desc(products.createdAt),
      "oldest": asc(products.createdAt),
      "name-asc": asc(products.name),
      "name-desc": desc(products.name),
      "price-asc": asc(products.price),
      "price-desc": desc(products.price),
    };

    const [productRows, totalResult] = await Promise.all([
      db
        .select()
        .from(products)
        .where(where)
        .orderBy(sortMap[sort])
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(products)
        .where(where),
    ]);

    const total = totalResult[0]?.count ?? 0;

    // Fetch images for each product
    const productIds = productRows.map((p) => p.id);
    const images =
      productIds.length > 0
        ? await db
            .select()
            .from(productImages)
            .where(sql`${productImages.productId} IN (${sql.join(productIds.map(id => sql`${id}`), sql`, `)})`)
            .orderBy(asc(productImages.displayOrder))
        : [];

    // Fetch categories
    const categoryIds = [...new Set(productRows.map((p) => p.categoryId).filter(Boolean))] as number[];
    const cats =
      categoryIds.length > 0
        ? await db
            .select()
            .from(categories)
            .where(sql`${categories.id} IN (${sql.join(categoryIds.map(id => sql`${id}`), sql`, `)})`)
        : [];

    const productsWithImages: ProductWithImages[] = productRows.map((product) => ({
      ...product,
      images: images.filter((img) => img.productId === product.id),
      category: cats.find((c) => c.id === product.categoryId) ?? null,
    }));

    return {
      products: productsWithImages,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to query products:", error);
    return {
      products: [],
      total: 0,
      totalPages: 0,
      currentPage: page,
    };
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    const product = result[0];
    if (!product) return null;

    const [imgs, cat] = await Promise.all([
      db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product.id))
        .orderBy(asc(productImages.displayOrder)),
      product.categoryId
        ? db
            .select()
            .from(categories)
            .where(eq(categories.id, product.categoryId))
            .limit(1)
        : Promise.resolve([]),
    ]);

    return {
      ...product,
      images: imgs,
      category: cat[0] ?? null,
    };
  } catch (error) {
    console.error(`Failed to get product by slug: ${slug}`, error);
    return null;
  }
}

export async function getProductById(id: number): Promise<ProductWithImages | null> {
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    const product = result[0];
    if (!product) return null;

    const [imgs, cat] = await Promise.all([
      db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product.id))
        .orderBy(asc(productImages.displayOrder)),
      product.categoryId
        ? db
            .select()
            .from(categories)
            .where(eq(categories.id, product.categoryId))
            .limit(1)
        : Promise.resolve([]),
    ]);

    return {
      ...product,
      images: imgs,
      category: cat[0] ?? null,
    };
  } catch (error) {
    console.error(`Failed to get product by id: ${id}`, error);
    return null;
  }
}

export async function getFeaturedProducts(limit = 8) {
  try {
    return await getProducts({
      limit,
      sort: "newest",
      publishedOnly: true,
    }).then((result) => result.products.filter((p) => p.isFeatured).slice(0, limit));
  } catch (error) {
    console.error("Failed to get featured products:", error);
    return [];
  }
}

export async function getRelatedProducts(productId: number, categoryId: number | null, limit = 4) {
  if (!categoryId) return [];

  try {
    const result = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.categoryId, categoryId),
          eq(products.isPublished, true),
          sql`${products.id} != ${productId}`
        )
      )
      .limit(limit);

    const productIds = result.map((p) => p.id);
    const images =
      productIds.length > 0
        ? await db
            .select()
            .from(productImages)
            .where(sql`${productImages.productId} IN (${sql.join(productIds.map(id => sql`${id}`), sql`, `)})`)
            .orderBy(asc(productImages.displayOrder))
        : [];

    const cats = categoryId
      ? await db
          .select()
          .from(categories)
          .where(eq(categories.id, categoryId))
          .limit(1)
      : [];

    return result.map((product) => ({
      ...product,
      images: images.filter((img) => img.productId === product.id),
      category: cats[0] ?? null,
    }));
  } catch (error) {
    console.error("Failed to get related products:", error);
    return [];
  }
}

export async function getProductStats() {
  try {
    const [totalResult, publishedResult, featuredResult] = await Promise.all([
      db.select({ count: count() }).from(products),
      db.select({ count: count() }).from(products).where(eq(products.isPublished, true)),
      db.select({ count: count() }).from(products).where(eq(products.isFeatured, true)),
    ]);

    return {
      total: totalResult[0]?.count ?? 0,
      published: publishedResult[0]?.count ?? 0,
      featured: featuredResult[0]?.count ?? 0,
    };
  } catch (error) {
    console.error("Failed to get product stats:", error);
    return { total: 0, published: 0, featured: 0 };
  }
}

export async function getRecentProducts(limit = 5) {
  try {
    const result = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(limit);

    const productIds = result.map((p) => p.id);
    const images =
      productIds.length > 0
        ? await db
            .select()
            .from(productImages)
            .where(sql`${productImages.productId} IN (${sql.join(productIds.map(id => sql`${id}`), sql`, `)})`)
            .orderBy(asc(productImages.displayOrder))
        : [];

    const categoryIds = [...new Set(result.map((p) => p.categoryId).filter(Boolean))] as number[];
    const cats =
      categoryIds.length > 0
        ? await db
            .select()
            .from(categories)
            .where(sql`${categories.id} IN (${sql.join(categoryIds.map(id => sql`${id}`), sql`, `)})`)
        : [];

    return result.map((product) => ({
      ...product,
      images: images.filter((img) => img.productId === product.id),
      category: cats.find((c) => c.id === product.categoryId) ?? null,
    }));
  } catch (error) {
    console.error("Failed to get recent products:", error);
    return [];
  }
}

export async function getAllProductSlugs() {
  try {
    return await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.isPublished, true));
  } catch (error) {
    console.error("Failed to get all product slugs:", error);
    return [];
  }
}
