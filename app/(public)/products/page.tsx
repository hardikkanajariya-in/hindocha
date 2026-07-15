import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import { getActiveCategories } from "@/lib/queries/categories";
import { ProductCard } from "@/components/public/product-card";
import { SearchBar } from "@/components/public/search-bar";
import { Pagination } from "@/components/public/pagination";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { ProductGridSkeleton } from "@/components/public/loading-skeleton";
import { EmptyState } from "@/components/public/empty-state";
import { SectionHeader } from "@/components/public/section-header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete collection of artificial flowers, wedding decorations, pooja items, garlands, torans, and more.",
  alternates: { canonical: "/products" },
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

async function ProductsContent({ searchParams }: { searchParams: ProductsPageProps["searchParams"] }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const categorySlug = params.category || "";
  const sort = (params.sort as "newest" | "oldest" | "name-asc" | "name-desc") || "newest";

  const [result, categories] = await Promise.all([
    getProducts({ page, search, categorySlug, sort }),
    getActiveCategories(),
  ]);

  const searchParamsObj: Record<string, string> = {};
  if (search) searchParamsObj.search = search;
  if (categorySlug) searchParamsObj.category = categorySlug;
  if (sort !== "newest") searchParamsObj.sort = sort;

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              !categorySlug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                categorySlug === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {result.total} product{result.total !== 1 ? "s" : ""} found
        </p>
        <div className="flex gap-2">
          {(
            [
              { value: "newest", label: "Newest" },
              { value: "name-asc", label: "A-Z" },
              { value: "name-desc", label: "Z-A" },
            ] as const
          ).map((option) => (
            <Link
              key={option.value}
              href={`/products?${new URLSearchParams({
                ...searchParamsObj,
                sort: option.value,
              }).toString()}`}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                sort === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {result.products.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              basePath="/products"
              searchParams={searchParamsObj}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title="No products found"
          description={
            search
              ? `No products match "${search}". Try a different search term.`
              : "No products available in this category yet."
          }
        />
      )}
    </>
  );
}

export default async function ProductsPage(props: ProductsPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Products" }]} />
      <SectionHeader
        title="All Products"
        subtitle="Browse our complete collection of decoration items"
      />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
